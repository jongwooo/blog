---
date: 2024-03-17 23:00:00
title: gwctl get command 개발기
keywords: 쿠버네티스, Kubernetes, k8s, Gateway API, gwctl, CLI, 개발기, 오픈소스, 의존관계 주입, DI, Dependency Injection, Go, Golang
---

쿠버네티스 내 Gateway API 프로젝트에서 API 리소스를 관리하는 CLI 도구인
[gwctl](https://github.com/kubernetes-sigs/gateway-api/tree/main/gwctl)의 기능 개발에 기여자로 참여했습니다.
이 글에서는 Gateway API 프로젝트와 gwctl을 소개하고, 기여 과정에서 경험한 내용을 공유합니다.

## TL;DR

- gwctl은 Gateway API 리소스를 관리하는 CLI 도구입니다.
- gwctl의 `get` 명령을 구현하며 경험한 내용을 공유합니다.

## Gateway API와 gwctl

[Gateway API](https://gateway-api.sigs.k8s.io/)는 쿠버네티스의 서비스 네트워킹을 개선하고
표준화하기 위한 [SIG-Network](https://github.com/kubernetes/community/tree/master/sig-network)의 프로젝트입니다.

[gwctl](https://github.com/kubernetes-sigs/gateway-api/tree/main/gwctl)은 이러한 Gateway API의 리소스를 관리하는 CLI 도구입니다.
Gateway API v1.0 릴리즈에 포함된 gwctl은 아직 초기 버전이며, 새로운 기능을 지속적으로 추가하고 있습니다.

## Implement basic `get` command support

[GEP-2722](https://gateway-api.sigs.k8s.io/geps/gep-2722/)에서 제안된 스펙에 따라, 리소스의 정보를 테이블 형식으로 출력하는 `get` 명령을 구현했습니다.

프로젝트를 진행하던 중, 리소스의 경과 시간을 출력하는 `AGE` 필드를 구현하는 과정에서 어려움이 있었습니다.
처음에는 함수 내에서 추출한 현재 시간과 생성 시간의 차를 계산하여 경과 시간을 출력하고자 했습니다.

```go
age := duration.HumanDuration(time.Since(namespaceNode.Namespace.CreationTimestamp.Time))
```

하지만 테스트 과정에서 함수가 `time.Since()`에 의존하게 되는 것을 알게 되었습니다.

### 실행할 때마다 항상 다른 결과를 반환하는 코드 테스트하기

현재 시간은 제어할 수 없고, 항상 다른 값이어서 실행할 때마다 결과가 달라지는 문제가 있었습니다.
이는 코드의 결합도를 증가시켜 테스트를 어렵게 하기 때문에 실행할 때마다 동일한 결과를 반환하는 함수로 전환이 필요했습니다.

코드의 결합도를 낮추기 위해 고민하던 중,
전공 시간에 배운 [의존관계 주입(Dependency Injection)](https://tecoble.techcourse.co.kr/post/2021-04-27-dependency-injection/)을
적용하는 아이디어가 떠올랐습니다.

Clock 인터페이스를 선언하고, 가상 시간을 설정하는 구조체를 의존성으로 주입하는 것이었습니다.
의존관계를 가진 모듈을 함수 내부에서 생성하는 대신 외부에서 주입함으로써 문제를 해결할 수 있다고 판단했습니다.

### 아이디어를 코드에 적용해보자

기존 `Printer` 구조체에 `Clock` 인터페이스를 추가했습니다.

```go
type GatewaysPrinter struct {
    Out   io.Writer
 	Clock clock.Clock
}
```

테스트 코드에서는 fakeClock을 사용하여 가상 시간을 설정할 수 있습니다.

```go
fakeClock := testingclock.NewFakeClock(time.Now())
objects := []runtime.Object{
    &gatewayv1.GatewayClass{
        ObjectMeta: metav1.ObjectMeta{
            Name: "foo-gateway",
            CreationTimestamp: metav1.Time{
                Time: fakeClock.Now().Add(-24 * time.Hour),
            },
        },
    },
}

gwPrinter := &printer.GatewaysPrinter{Out: params.Out, Clock: fakeClock}
```

실제 코드에서는 다음과 같이 realClock을 사용합니다.

```go
realClock := clock.RealClock{}
gwPrinter := &printer.GatewaysPrinter{Out: params.Out, Clock: realClock}
```

결과적으로 인터페이스가 제공하는 함수를 통해 시간을 추출하게 되어 테스트가 용이해지고, 코드의 유연성도 확보할 수 있었습니다.

## 마치며

오픈소스는 기술에 대한 안목을 키우고, 다양한 경험을 쌓을 수 있는 좋은 놀이터가 될 수 있습니다.
이 글을 읽고 오픈소스 기여에 관심이 생기셨다면, 작은 기여부터 시작해보시는 것은 어떨까요?

## 참고 링크

- [Gateway API](https://gateway-api.sigs.k8s.io/)
- [New Experimental Features in Gateway API v1.0](https://kubernetes.io/blog/2023/11/28/gateway-api-ga/)
- [의존관계 주입(Dependency Injection) 쉽게 이해하기](https://tecoble.techcourse.co.kr/post/2021-04-27-dependency-injection/)
