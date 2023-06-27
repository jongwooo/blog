---
date: 2023-06-27 18:00:00
title: 워크플로우의 중복 줄이기
keywords: workflow, GitHub Actions, Reusable Workflow, 재사용, 추상화, 워크플로우
---

여러 저장소에서 비슷한 워크플로우를 사용한다고 가정해 봅시다.
만약 워크플로우의 요구사항이 변경된다면, 모든 저장소에서 워크플로우를 수정해야 합니다.
이는 유지보수를 어렵게 만들고 실수를 유발할 수 있습니다.

각 저장소에서 워크플로우를 수정하는 대신, 재사용할 수 있는 워크플로우로 추상화하여 중복을 줄이고 유지보수를 쉽게 할 수 있습니다.

이번 글에서는 GitHub Actions에서 제공하는 [Reusable Workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows)를
활용하여 워크플로우의 중복을 줄이는 방법을 소개합니다.

## TL;DR

GitHub Actions의 **Reusable Workflow**를 통해 워크플로우의 중복을 줄일 수 있습니다.

## 재사용 가능한 워크플로우로 중복 줄이기

워크플로우를 작성하다 보면, 여러 저장소에서 비슷한 워크플로우를 사용하는 경우가 있습니다.

예를 들어, [actions](https://github.com/actions)에서 제공하는 대부분의 action은 `check-dist.yml`이라는 워크플로우를 사용하여 `dist/` 디렉토리의 변경 사항을
확인합니다.

만약 `check-dist.yml` 워크플로우의 요구사항이 변경된다면, 모든 저장소에서 워크플로우를 수정해야 합니다.
각 저장소에서 워크플로우를 수정하는 대신, 재사용할 수 있는 워크플로우로 추상화하여 코드의 중복을 줄일 수 있습니다.

### 재사용 가능한 워크플로우 만들기

[actions/reusable-workflows](https://github.com/actions/reusable-workflows) 저장소의 `check-dist.yml` 워크플로우를 살펴봅시다.

```yaml
# actions/reusable-workflows/.github/workflows/check-dist.yml
name: Check dist

on:
  workflow_call:
    inputs:
      dist-path:
        description: "Optional input to set a path to the dist folder. If it's not set, it defaults to './dist'"
        required: false
        type: string
        default: "./dist"
      node-version:
        description: "Optional input to set the version of Node.js used to build a project. The input syntax corresponds to the setup-node's one"
        required: false
        type: string
        default: "16.x"
      node-caching:
        description: "Optional input to set up caching for the setup-node action. The input syntax corresponds to the setup-node's one. Set to an empty string if caching isn't needed"
        required: false
        type: string
        default: "npm"
    jobs:
      check-dist:
        runs-on: ubuntu-latest

        steps:
        # ...
```

위의 워크플로우와 같이 `workflow_call` 이벤트를 사용하여 워크플로우를 재사용할 수 있습니다.
`workflow_call` 이벤트는 다른 워크플로우에서 호출할 수 있는 워크플로우를 정의합니다.

`workflow_call` 이벤트는 `inputs`, `secrets`, `outputs`를 통해 워크플로우에 전달할 수 있는 입력, Secrets, 출력을 정의할 수 있습니다.

**Inputs**

`workflow_call` 이벤트는 `inputs`를 통해 워크플로우에 전달할 수 있는 입력을 정의할 수 있습니다.
`inputs`는 선택적으로 정의할 수 있으며, `default`를 통해 기본값을 지정할 수 있습니다.

```yaml
on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: "16.x"
      node-caching:
        required: false
        type: string
        default: "npm"
```

아래 예시는 입력 받은 `node-version`과 `node-caching`을 통해 Node.js를 설치하는 step입니다.

```yaml
- name: Setup Node.js ${{ inputs.node-version }}
  uses: actions/setup-node@v3
  with:
    node-version: ${{ inputs.node-version }}
    cache: ${{ inputs.node-caching }}
```

**Secrets**

`workflow_call` 이벤트는 `secrets`를 통해 워크플로우에 전달할 수 있는 Secrets를 정의할 수 있습니다.

```yaml
on:
  workflow_call:
    secrets:
      ACCESS_TOKEN:
        required: true
```

**Outputs**

`workflow_call` 이벤트는 `outputs`를 통해 워크플로우의 출력을 정의할 수 있습니다.
`outputs`도 선택적으로 정의할 수 있습니다.

```yaml
on:
  workflow_call:
    outputs:
      diff:
        description: "The diff between the expected and actual dist/ directories"
```

### 재사용 가능한 워크플로우 호출하기

`workflow_call` 이벤트를 통해 정의한 워크플로우는 `uses` 키워드를 통해 호출할 수 있습니다.
아래의 예시는 `actions/reusable-workflows` 저장소의 `check-dist.yml` 워크플로우를 호출하는 예시입니다.

```yaml
# .github/workflows/check-dist.yml
name: Check dist
# ...
jobs:
  call-check-dist:
    name: Check dist/
    uses: actions/reusable-workflows/.github/workflows/check-dist.yml@main
    with:
      node-version: 14.x
```

**Inherit secrets**

만약, 같은 Organization이나 Enterprise에서 워크플로우를 호출한다면 `secret: inherit`와 같이 Secrets를 암시적으로 전달할 수 있습니다.

```yaml
jobs:
  call-check-dist:
    name: Check dist/
    uses: actions/reusable-workflows/.github/workflows/check-dist.yml@main
    secrets: inherit
```

**Matrix strategy**

`matrix strategy`를 통해 여러 입력값을 전달할 수 있습니다.

```yaml
jobs:
  ReusableMatrixJobForDeployment:
    strategy:
      matrix:
        target: [dev, stage, prod]
    uses: octo-org/example-repo/.github/workflows/deployment.yml@main
    with:
      target: ${{ matrix.target }}
```

**Nesting reusable workflow**

최상위 워크플로우에서 최대 3개의 재사용 가능한 워크플로우를 중첩하여 호출할 수 있습니다.

```yaml
name: Reusable workflow

on:
  workflow_call:

jobs:
  call-another-reusable:
    uses: octo-org/example-repo/.github/workflows/another-reusable.yml@v1
```

## 마치며

재사용 가능한 워크플로우를 활용하면, 코드의 중복을 줄이고 유지보수를 쉽게 할 수 있습니다.
[Reusable Workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows)를 활용하여 더 큰 프로젝트와 더 많은 서비스에서
사용할 수 있도록 워크플로우를 추상화해보세요.

## 참고 링크

- [Reusing workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [How to start using reusable workflows with GitHub Actions](https://github.blog/2022-02-10-using-reusable-workflows-github-actions/)
