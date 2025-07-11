---
date: 2025-07-11 13:00:00
title: Jitter가 적용된 Exponential Backoff로 안정적인 재시도 구현하기
keywords: Exponential Backoff, Jitter, 재시도, 백오프, AWS DynamoDB, Go, 분산 시스템, 멀티 스레드, Thundering Herd, 안정성, 장애 복구
---

분산 시스템에서 외부 API나 데이터베이스 호출이 실패했을 때, 어떻게 재시도해야 할까요?
단순히 즉시 재시도하거나 고정된 간격으로 재시도하는 것은 시스템에 더 큰 부하를 줄 수 있습니다.
이번 글에서는 **Jitter**를 적용한 **Exponential Backoff** 알고리즘을 사용해, 분산 시스템에서 **안정적이고 효율적인 재시도 로직**을 어떻게 구현할 수 있는지 알아보겠습니다.

<!-- end -->

## TL;DR

- 외부 서비스 호출 실패 시 즉시 재시도하는 것은 시스템에 부하가 집중될 수 있습니다
- Exponential Backoff는 재시도 간격을 지수적으로 증가시켜 부하를 분산시킵니다
- 하지만 여러 클라이언트가 동시에 실패하면 같은 시간에 재시도하는 Thundering Herd 문제가 발생할 수 있습니다
- Jitter를 추가하여 재시도 시간에 무작위성을 부여하면 부하를 더 효과적으로 분산할 수 있습니다

## Exponential Backoff란?

**Exponential Backoff**는 재시도 간격을 지수적으로 증가시키는 알고리즘입니다.
첫 번째 재시도는 짧은 지연 후에 시도하고, 실패할 때마다 지연 시간을 2배씩 늘려나갑니다.

```
1차 재시도: 100ms 후
2차 재시도: 200ms 후  
3차 재시도: 400ms 후
4차 재시도: 800ms 후
...
```

이 방식의 장점은 일시적인 장애에는 빠르게 복구하고, 지속적인 장애에는 시스템 부하를 줄여주는 것입니다.

## Jitter가 필요한 이유: Thundering Herd 문제

하지만 Exponential Backoff만으로는 충분하지 않습니다.
여러 클라이언트가 동시에 실패하면 모두 같은 시간에 재시도하게 되어 [Thundering Herd](https://en.wikipedia.org/wiki/Thundering_herd_problem) 현상이 발생할 수 있습니다.

### 자율주행차와 주차장 입구 문제

Thundering Herd 현상을 이해하기 쉽게 설명하기 위해, 자율주행차가 하나의 주차장 입구에 진입하려는 상황에 비유해보겠습니다:

![자율주행차과 주차장 입구 문제](thundering-herd.png "자율주행차과 주차장 입구 문제")

**100대의 자율주행차가 하나의 주차장 입구로 진입하려고 합니다.**
모든 차량이 동일한 AI 시스템과 재시도 로직을 가지고 있어서, 입구가 막혔을 때 모두 같은 시간(예: 5초) 후에 다시 시도하도록 프로그래밍되어 있습니다.

우연히 어느 시점에 모든 차량이 동시에 진입을 시도한다면, 어떻게 될까요?

```
시간 0초: 100대 차량이 동시에 입구 진입 시도 → 병목으로 인해 실패
시간 5초: 100대 차량이 모두 동시에 재시도 → 여전히 병목, 실패  
시간 10초: 100대 차량이 모두 동시에 재시도 → 계속 실패
...
```

결과적으로 **모든 차량이 계속 대기 상태**가 지속되며, 입구의 병목 현상이 해결되지 않습니다.

### 분산 시스템에서의 실제 예시

예를 들어, 100개의 클라이언트가 동시에 API를 호출했다가 모두 실패했다고 가정해봅시다:

```
시간 0초: 100개 클라이언트가 동시에 API 호출 → 실패
시간 100ms: 100개 클라이언트가 모두 동시에 1차 재시도 → 실패
시간 200ms: 100개 클라이언트가 모두 동시에 2차 재시도 → 실패
시간 400ms: 100개 클라이언트가 모두 동시에 3차 재시도 → 실패
...
```

이는 서버에 순간적으로 큰 부하를 주어 장애를 더 악화시킬 수 있습니다.

### 멀티 스레드 환경에서의 예시

단일 애플리케이션 내에서도 같은 문제가 발생할 수 있습니다:

```go
// 100개의 고루틴이 동시에 데이터베이스 연결 시도
for i := 0; i < 100; i++ {
    go func() {
        for attempt := 0; attempt < maxRetries; attempt++ {
            if conn, err := db.Connect(); err == nil {
                // 성공
                return
            }
            // 모든 고루틴이 동시에 같은 시간만큼 대기
            time.Sleep(time.Duration(math.Pow(2, float64(attempt))) * 100 * time.Millisecond)
        }
    }()
}
```

데이터베이스 연결 풀이 고갈되거나 네트워크 문제가 발생했을 때, 100개의 고루틴이 모두 동시에 재시도하면 다음과 같은 문제가 발생할 수 있습니다:

- 데이터베이스 서버에 순간적으로 큰 부하
- 연결 풀 경합 악화
- 메모리 및 CPU 리소스 낭비

**Jitter**는 이 문제를 해결하기 위해 백오프 시간에 무작위성을 추가합니다.
마치 자율주행차들이 각각 다른 시간(3~7초 사이)에 재시도하도록 하여 입구 혼잡을 자연스럽게 분산시키는 것과 같습니다.

## Go로 구현한 Jitter가 적용된 Exponential Backoff

[mongo2dynamo](https://github.com/dutymate/mongo2dynamo) 프로젝트에서 재시도 로직을 구현할 때 다음과 같은 고민들이 있었습니다:

1. 재시도 간격이 너무 짧으면 서버에 부하가 집중될 수 있음
2. 간격이 너무 길면 사용자 경험이 나빠질 수 있음
3. 모든 클라이언트가 동시에 재시도하면 Thundering Herd 문제가 발생할 수 있음

이러한 문제들을 해결하기 위해서는 다음과 같은 전략이 필요했습니다:

- 초기 재시도 간격을 적절히 설정하여 서버 부하 분산
- 최대 재시도 시간을 제한하여 사용자 경험 보장
- Jitter를 통한 재시도 시간 분산으로 Thundering Herd 방지

아래는 제가 실제로 구현한 코드를 기반으로 개선한 버전입니다:

### 필요한 상수 정의

```go
const (
    batchSize = 25
    baseDelay = 100 * time.Millisecond
    maxDelay  = 30 * time.Second
)

// 전역 랜덤 소스 (Jitter 계산용)
var randomSource = rand.New(rand.NewSource(time.Now().UnixNano()))
```

위에서 정의한 상수들의 의미를 자세히 살펴보겠습니다.

먼저 `baseDelay`는 재시도할 때 기다리는 기본 시간을 의미합니다.
100밀리초로 설정했는데, 이는 첫 번째 재시도에서 사용되는 기준 시간입니다.
너무 짧지도, 너무 길지도 않은 적절한 값으로 선택했습니다.

`maxDelay`는 재시도 간격이 무한정 커지는 것을 방지하기 위한 상한선입니다.
30초로 설정했는데, 이보다 더 오래 기다리면 사용자 경험이 나빠질 수 있기 때문입니다.

마지막으로 `randomSource`는 무작위 숫자를 생성하기 위한 도구입니다.
Go 언어에서 기본으로 제공하는 rand 패키지를 사용할 수도 있지만, 이는 여러 고루틴에서 동시에 사용할 때 성능이 저하될 수 있습니다.
왜냐하면 기본 rand 패키지는 내부적으로 뮤텍스(mutex)를 사용하여 동시 접근을 막기 때문입니다.

### Jitter가 적용된 백오프 시간 계산

```go
func calculateBackoffWithJitter(attempt int) time.Duration {
    // 지수 백오프 계산 (2^attempt * baseDelay)
    exponentialDelay := time.Duration(1<<attempt) * baseDelay

    // 최대 지연 시간으로 제한
    if exponentialDelay > maxDelay {
        exponentialDelay = maxDelay
    }

    // Jitter 적용 (0.5 ~ 1.5 범위)
    jitter := 0.5 + randomSource.Float64()*1.0
    jitteredDelay := min(time.Duration(float64(exponentialDelay)*jitter), maxDelay)

    return jitteredDelay
}
```

Jitter는 0.5에서 1.5 사이의 무작위 값을 곱하여 재시도 시간을 분산시킵니다.
위 코드에서는 다음과 같이 구현했습니다:

```go
jitter := 0.5 + randomSource.Float64()*1.0
```

이러한 범위를 선택한 데에는 몇 가지 중요한 이유가 있습니다.
우선 최소값을 0.5배로 설정하여 일시적인 장애 상황에서 빠르게 복구할 수 있도록 했습니다.

반대로 최대값은 1.5배로 설정하여 지연 시간을 50% 더 늘릴 수 있게 했는데, 이는 여러 클라이언트가 동시에 재시도하는 상황에서 충돌을 방지하는 데 도움이 됩니다.

또한 이 범위 내에서 균등하게 분포된 난수를 사용함으로써, 여러 클라이언트의 재시도 시간이 자연스럽게 분산되도록 했습니다.
이를 통해 시스템에 가해지는 부하를 효과적으로 분산시킬 수 있습니다.

### 실제 재시도 로직

```go
func (l *DynamoLoader) batchWrite(ctx context.Context, writeRequests []types.WriteRequest) error {
    var lastUnprocessed []types.WriteRequest
    
    for attempt := 0; attempt < l.maxRetries; attempt++ {
        input := &dynamodb.BatchWriteItemInput{
            RequestItems: map[string][]types.WriteRequest{
                l.table: writeRequests,
            },
        }
        
        output, err := l.client.BatchWriteItem(ctx, input)
        if err != nil {
            return &common.DatabaseOperationError{
                Database: "DynamoDB",
                Op:       "batch write",
                Reason:   err.Error(),
                Err:      err,
            }
        }
        
        unprocessed := output.UnprocessedItems[l.table]
        if len(unprocessed) == 0 {
            return nil // 모든 아이템이 성공적으로 처리됨
        }
        
        // 재시도 준비
        writeRequests = unprocessed
        lastUnprocessed = unprocessed
        
        // Jitter가 적용된 Exponential Backoff
        backoffDuration := calculateBackoffWithJitter(attempt)
        time.Sleep(backoffDuration)
    }
    
    // 최대 재시도 횟수 초과 시 에러 반환
    if len(lastUnprocessed) > 0 {
        return &common.DatabaseOperationError{
            Database: "DynamoDB",
            Op:       "batch write (unprocessed items)",
            Reason:   fmt.Sprintf("failed to process all items after %d retries", l.maxRetries),
            Err:      fmt.Errorf("unprocessed items: %v", lastUnprocessed),
        }
    }

    return nil
}
```

DynamoDB [BatchWriteItem API](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html)는 한 번에 도큐먼트 25개까지만 처리할 수 있습니다.
이보다 많은 도큐먼트를 처리하려면 여러 번 나누어서 호출해야 합니다.

또한 일부 아이템이 처리되지 않은 경우 UnprocessedItems를 반환하는데, 이는 다음과 같은 상황에서 발생할 수 있습니다:

- 프로비저닝된 처리량 초과
- 일시적인 네트워크 문제
- 내부 서버 오류

위 코드에서는 UnprocessedItems가 있는 경우 Jitter가 적용된 Exponential Backoff로 재시도하여 안정적으로 처리합니다.

## 실제 동작 예시

3번의 재시도 시나리오를 살펴보겠습니다:

```
시도 0: 즉시 실행 → 실패
시도 1: 50~150ms 후 재시도 → 실패  
시도 2: 100~300ms 후 재시도 → 실패
시도 3: 200~600ms 후 재시도 → 성공
```

같은 시간에 실패한 다른 클라이언트들은 각각 다른 지연 시간을 갖게 되어 서버 부하가 분산됩니다.

## 마치며

Jitter가 적용된 Exponential Backoff는 분산 시스템에서 안정적인 재시도를 구현하는 핵심 패턴입니다.
단순해 보이지만 Thundering Herd 문제, 최대 지연 시간 제한, 적절한 Jitter 범위 설정 등 고려할 요소들이 많습니다.

이 패턴은 DynamoDB뿐만 아니라 다양한 외부 서비스 호출에서 활용할 수 있습니다.
AWS SDK, 데이터베이스 연결, HTTP API 호출 등에서 안정성을 높이는 데 도움이 될 것입니다.

운영 환경에서는 재시도 로직이 얼마나 효과적으로 동작하는지 모니터링하고, 메트릭 기반으로 baseDelay, maxDelay, maxRetries 등을 조정하는 것이 안정성과 사용자 경험을 모두 만족시키는 핵심입니다.

## 참고 링크

- [Thundering herd problem](https://en.wikipedia.org/wiki/Thundering_herd_problem)
- [Exponential Backoff And Jitter - AWS Architecture Blog](https://aws.amazon.com/ko/blogs/architecture/exponential-backoff-and-jitter/)
- [시간 제한, 재시도 및 지터를 사용한 백오프 - Amazon Builders' Library](https://aws.amazon.com/ko/builders-library/timeouts-retries-and-backoff-with-jitter/)
- [BatchWriteItem - Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html)
