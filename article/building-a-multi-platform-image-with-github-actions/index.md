---
date: 2023-03-16 03:30:00
title: GitHub Actions에서 멀티 플랫폼 이미지 빌드하기
keywords: GitHub Actions, Docker, 도커, multi-platform, 멀티 플랫폼, Buildx, QEMU
---

멀티 플랫폼 이미지를 빌드한다는 것은 하나의 Dockerfile로 여러 플랫폼에서 실행 가능한 Docker 이미지를 생성하는 것을 의미합니다.
빌드된 이미지는 arm64, armv7, amd64, ppc64le, s390x 등의 여러 플랫폼에서 실행 가능하며, 이를 통해 다양한 플랫폼에서 동일한 이미지를 실행할 수 있습니다.

GitHub Actions에서는 [Docker](https://github.com/docker)에서 제공하는 여러 Action을 활용하여 멀티 플랫폼 이미지를 간단하게 빌드할 수 있습니다.
이번 글에서는 GitHub Actions에서 멀티 플랫폼 이미지를 빌드하는 방법을 소개합니다.

## TL;DR

Docker에서 제공하는 여러 Action을 활용하여 멀티 플랫폼 이미지를 빌드할 수 있습니다.

## GitHub Actions에서 멀티 플랫폼 이미지 빌드하기

GitHub Actions에서 멀티 플랫폼 이미지를 빌드하기 위해서는 아래의 Action을 사용합니다.

- [docker/setup-qemu-action](https://github.com/docker/setup-qemu-action)
- [docker/setup-buildx-action](https://github.com/docker/setup-buildx-action)
- [docker/build-push-action](https://github.com/docker/build-push-action)

### setup-qemu-action

`setup-qemu-action`은 멀티 플랫폼 이미지를 빌드하기 위해 필요한 [QEMU](https://www.qemu.org)를 설치합니다.
QEMU는 오픈소스 하이퍼 바이저로, 다른 플랫폼에서 동작하는 애플리케이션을 실행하기 위한 에뮬레이터로 사용됩니다.

```yaml
- name: Set up QEMU
  uses: docker/setup-qemu-action@v2
```

### setup-buildx-action

`setup-buildx-action`은 멀티 플랫폼 이미지를 빌드하기 위해 필요한 [Buildx](https://github.com/docker/buildx)를 설치합니다.
Buildx는 Docker 19.03 버전부터 기본으로 제공되는 Docker CLI 확장 플러그인으로, 여러 다른 플랫폼용으로 빌드할 수 있는 기능을 포함합니다.

```yaml
- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v2
```

### build-push-action

`build-push-action`을 사용하면 Docker 이미지를 빌드하고 Container Registry에 푸시할 수 있습니다.
이때, `platform` 옵션에 플랫폼을 명시하여 해당하는 플랫폼에서 실행 가능한 이미지를 빌드할 수 있습니다.

아래의 예시에서는 `linux/amd64`, `linux/arm64`, `linux/arm/v7` 플랫폼을 지원하는 이미지를 빌드합니다.
이때, Dockerfile의 `FROM` 명령어에 지정한 Base 이미지는 각각의 플랫폼에서 실행 가능한 이미지여야 합니다.

```yaml
- name: Build and push
  uses: docker/build-push-action@v4
  with:
    context: .
    push: true
    tags: user/repo:latest
    platforms: |
      linux/amd64
      linux/arm64
      linux/arm/v7
```

전체적인 예시는 아래와 같습니다.

```yaml
name: Build a multi-platform image and push to Docker Hub

on:
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Docker hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: user/repo:latest
          platforms: |
            linux/amd64
            linux/arm64
            linux/arm/v7
```

## 마치며

기술이 발전하면서 다양한 플랫폼을 지원하는 것은 더욱 중요해지고 있습니다.
여러 플랫폼에서 동일한 애플리케이션을 실행할 수 있도록 도와주는 멀티 플랫폼 이미지는 이러한 필요성을 충족시키는 좋은 방법입니다.

하지만 멀티 플랫폼 이미지를 빌드하기 위해서는 여러 플랫폼에서 실행 가능한 Base 이미지를 선택해야 한다는 점을 유의해야 합니다.
다시 말해, 어떤 플랫폼을 지원해야 하는가에 대한 충분한 고민이 필요합니다.

## 참고 링크

- [Docker Buildx로 Multi-Archtecture Image 빌드하기](https://meetup.nhncloud.com/posts/255)
- [Multi-platform image with GitHub Actions](https://docs.docker.com/build/ci/github-actions/multi-platform/)
