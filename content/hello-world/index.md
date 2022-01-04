---
date: 2021-12-27 01:30:00
title: 블로그를 시작하며
description: Hello World!
---

예전부터 생각하고 있던 `기술 블로그`를 시작하게 되었습니다. 새롭게 블로그를 만들면서 [Gatsby](https://www.gatsbyjs.com)를 사용하였는데 개발 과정에서 있었던 일들을 이야기해 보려 합니다.

## Gatsby로 우여곡절 끝에 블로그 만들기

사실 지금의 블로그는 여러 실패를 거쳐 탄생했습니다. 처음엔 동아리에서 Jekyll을 사용해 만들었던 [기술 블로그](https://likelionmyongji.github.io)를 조금 수정해서 사용하려 했습니다. 하지만 Ruby를 잘 알지 못했던 터라 원하는 기능을 추가하기엔 어려움이 있었습니다.

그러다 React 기반의 정적 사이트 생성기인 Gatsby를 알게 되었고, 평소에 React를 공부하고 있던 저는 Gatsby에 발을 들이게 됩니다.

### 삽질의 시작

Gatsby로 블로그를 만드는 방법으로는 아래 세 가지가 있습니다.

-   직접 구현하기
-   스타터 템플릿 활용하기
-   Gatsby 테마 사용하기

처음에 제가 시도한 방법은 바로 Gatsby 테마를 사용하는 것이었습니다. 테마를 선택하고 개발을 하다 보니 아무래도 제 코드 스타일과 달라 영 마음에 들지 않았습니다. 그래서 테마를 과감하게 포기하고 삽질을 하더라도 직접 구현해 보기로 했습니다.

## 블로그를 만들면서

블로그를 만들면서 Gatsby의 기본 스타터 템플릿인 [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog)를 많이 참고했습니다. 기본 구조는 비슷하게 가져가면서 조금씩 바꾸어 보았습니다.

### Hook으로 데이터 가져오기

기본적으로 Gatsby에서 사이트 metadata를 가져오는 방식은 아래와 같습니다.

```jsx
const ProfileCard = () => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        author
                        description
                    }
                }
            }
        `,
    )

    return (
        <ProfileCardWrapper>
            <Author>{site.siteMetadata.author}</Author>
            <Description>{site.siteMetadata.description}</Description>
        </ProfileCardWrapper>
    )
}
```

위의 코드는 간단한 예시이지만 실제 코드에서는 쿼리의 양이 생각보다 길었고 비슷한 쿼리를 많은 파일에서 불필요하게 반복하고 있었습니다.

metadata를 호출하는 부분을 `react hook`으로 만들어 불필요한 코드 반복을 줄였습니다.

```jsx
const ProfileCard = () => {
    const { author, description } = useSiteMetaData()

    return (
        <ProfileCardWrapper>
            <Author>{author}</Author>
            <Description>{description}</Description>
        </ProfileCardWrapper>
    )
}
```

### Utterances로 댓글 달기

[Utterances](https://utteranc.es)는 GitHub Issue 기반으로 댓글을 작성할 수 있게 해줍니다. 기술 블로그 특성상 블로그에 방문하는 사람들 대부분이 Github 계정을 가지고 있을 가능성이 높고, Issue 기반으로 댓글이 등록되므로 메일로 알림을 받을 수 있어 Utterances를 선택하게 되었습니다.

![Utterances](./utterances.png "[Utterances](https://utteranc.es)로 구현한 댓글 기능")

### Github Action으로 배포하기

Utterances로 댓글을 관리하기 때문에 댓글 Issue를 관리하기 위해 레포지토리를 아래와 같이 분리하였습니다.

-   개발을 하고 댓글 Issue를 관리하는 **blog** 레포지토리
-   실제로 사이트가 배포되는 **jongwooo.github.io** 레포지토리

[gatsby-gh-pages-action](https://github.com/enriikke/gatsby-gh-pages-action)를 통해 쉽게 레포지토리를 분리할 수 있었습니다. 아래는 배포를 위해 만든 workflow 파일입니다.

```yml
name: Deploy

on:
    push:

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v1
            - uses: enriikke/gatsby-gh-pages-action@v2
              with:
                  access-token: ${{ secrets.ACCESS_TOKEN }}
                  deploy-branch: main
                  deploy-repo: jongwooo.github.io
```

## 마치며

이번에 `블로그`를 만들어 보면서 많은 삽질을 했고, 값진 경험이었다고 생각합니다. 이러한 경험을 되새겨보고, 더 나아가 비슷한 고민이 있는 분들께 도움이 되고자 블로그를 시작하게 되었습니다. 아직 초보 개발자라 미흡한 점이 많지만 공부하고 배운다는 마음가짐으로 작성하겠습니다.
