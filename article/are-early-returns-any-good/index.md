---
date: 2023-05-07 11:20:00
title: Early Return은 과연 좋은가?
keywords: Early Return, Return Early, Early Return 장점, Early Return 단점
---

코드를 살펴 보던 중, 아래와 같이 불필요하게 중첩된 조건문을 발견하였습니다.

```go
if objKey, keyExist := s.fileKeyMapping[e.fileName]; keyExist {
    pod, podExist, err := s.store.GetByKey(objKey)
    if err != nil {
        return err
    } else if !podExist {
        return fmt.Errorf("the pod with key %s doesn't exist in cache", objKey)
    } else {
        if err = s.store.Delete(pod); err != nil {
            return fmt.Errorf("failed to remove deleted pod from cache: %v", err)
        }
        delete(s.fileKeyMapping, e.fileName)
    }
}
```

위 코드를 아래와 같이 Early Return하는 코드로 변경하였습니다.

```go
if objKey, keyExist := s.fileKeyMapping[e.fileName]; keyExist {
    pod, podExist, err := s.store.GetByKey(objKey)
    if err != nil {
        return err
    }
    if !podExist {
        return fmt.Errorf("the pod with key %s doesn't exist in cache", objKey)
    }
    if err = s.store.Delete(pod); err != nil {
        return fmt.Errorf("failed to remove deleted pod from cache: %v", err)
    }
    delete(s.fileKeyMapping, e.fileName)
}
```

Early Return은 함수에서 조건문을 만족할 때 일찍 반환하는 것을 의미합니다.

위의 변경사항을 커밋하여 풀 리퀘스트를 생성하니, 리뷰어께서 아래와 같은 [의견](https://github.com/kubernetes/kubernetes/pull/117731#issuecomment-1534548573)을 남겨주셨습니다.

> I think an early return pattern improves code readability by reducing the number of nested conditional statements.
>
> But using if-else blocks can sometimes make the code clearer, especially if the nested statements are not too complex. However, the approach may also lead to spaghetti code that is difficult to refactor or maintain in the long run.

리뷰어의 의견을 보고, Early Return이 과연 좋은 것인지에 대해 고민해보았습니다.

## Early Return은 과연 좋은가?

Early Return은 아래와 같은 장점과 단점이 있습니다.

### Early Return의 장점

Early Return은 들여쓰기를 줄여 코드를 간결하고 읽기 쉽게 만들어 줍니다.

```go
if someCondition {
    if someOtherCondition {
        if someOtherOtherCondition {
            // countlessly nested if statements
        }
    }
}
```

또한 유효하지 않은 경우를 먼저 처리하여(bouncer pattern) 함수의 "진짜" 본문에 집중할 수 있게 합니다.

```go
func someFunc() error {
    if err := someValidation(); err != nil {
        return fmt.Errorf("some validation error: %s", err)
    }

    // do something
    return nil
}
```

### Early Return의 단점

반면에, Early Return은 함수의 반환이 여러 곳으로 흩어지게 되어 함수의 복잡도를 높이고, 오히려 가독성을 떨어뜨릴 수 있습니다.
예를 들어 200줄이 넘는 함수에 여러 `return`문이 무작위로 존재한다면 읽기 쉬운 코드라고 할 수 없습니다.

```go
if someCondition {
    return
}
// do something
if someOtherCondition {
    return
}
// do something
if someOtherOtherCondition {
    return
}
// do something
if someOtherOtherOtherCondition {
    return
}
// ...
```

## 마치며

> As the logic here is clear, this is OK. The change is valid and LGTM.

Early Return은 들여쓰기를 줄여 코드를 간결하고 읽기 쉽게 만드는 좋은 방법입니다.
그러나 이 방법이 매번 적용될 수 있다는 의미는 아닙니다.

때때로 Early Return은 함수의 복잡도를 증가시키고 코드를 더 복잡하게 만들 수 있습니다.
그리고 리뷰어의 의견에서처럼, 간결한 코드에서는 오히려 `if-else`문이 더 명확할 수 있습니다.

따라서, 읽기 쉬운 코드를 작성하기 위해서는 상황에 맞게 적절한 패턴을 선택하는 것이 중요합니다.
무조건적인 Early Return보다는 맥락을 고려해야 합니다.

## 참고 링크

- [Return Early Pattern](https://medium.com/swlh/return-early-pattern-3d18a41bba8)
- [Effective Go: Control Structures](https://golang.org/doc/effective_go#control-structures)
- [Reducing nesting in Go functions with early returns](https://danp.net/posts/reducing-go-nesting/)
