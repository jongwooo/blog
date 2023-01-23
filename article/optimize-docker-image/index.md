---
date: 2023-01-23 01:30:00
title: Docker 이미지 최적화
keywords: Docker, 도커, Dockerfile, Docker 이미지, Docker 이미지 최적화
---

Docker 컨테이너는 애플리케이션을 개발, 테스트, 배포하는데 유용하게 사용됩니다.
하지만 Docker 이미지의 용량이 클 경우 다운로드, 저장, 배포가 느려지고 네트워크 부하가 증가할 수 있습니다.
이럴 경우에는 Docker 이미지를 최적화하여 이미지 크기를 줄이는 것이 좋습니다.
이 글에서는 Docker 이미지를 최적화하는 방법에 대해 알아보겠습니다.

## TL;DR

> Node.js 애플리케이션을 기준으로 설명합니다.

Docker 이미지를 최적화하는 방법은 다음과 같습니다.

1. 더 작은 Base 이미지를 사용합니다.
2. 멀티 스테이지 빌드를 활용합니다.
3. 불필요한 레이어의 수를 줄입니다.
4. Production Dependencies만 설치합니다.
5. 불필요한 패키지를 설치하지 않습니다.
6. apt cache를 삭제합니다.
7. `.dockerignore` 를 활용합니다.
8. 애플리케이션 데이터를 별도 볼륨으로 분리합니다.

## Docker 이미지를 최적화하는 방법

### 더 작은 Base 이미지의 사용

Base 이미지에는 필요 없는 패키지나 파일이 포함되어 있을 수 있습니다.
이러한 경우에는 작은 Base 이미지를 사용하는 것이 좋습니다.
예를 들어, `ubuntu:latest` 이미지는 **29.02MB** 이지만 `alpine:latest` 이미지는 **3.21MB** 입니다.
그러나 경량화된 이미지를 사용할 경우, 애플리케이션 실행에 필요한 패키지나 파일이 빠져 있을 수 있으니 주의가 필요합니다.

### 멀티 스테이지 빌드

[멀티 스테이지 빌드](https://docs.docker.com/build/building/multi-stage/)는 Dockerfile에 여러 개의 `FROM` 명령을 사용하여 이미지를 빌드하는 방법입니다.
이 방법을 활용하면 빌드에 필요한 패키지나 파일은 빌드 이미지에만 포함되고, 최종 이미지에는 포함되지 않습니다.

아래는 Node.js 애플리케이션을 빌드하고 Nginx를 사용하여 배포하는 Dockerfile입니다.

```dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.3-alpine as production
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 불필요한 레이어의 수를 줄이기

Docker 이미지는 여러 개의 레이어로 구성되어 있습니다.
이 레이어는 이미지를 빌드할 때 Dockerfile에 정의된 `RUN`, `COPY`, `FROM` 명령문이 실행되면서 생성됩니다.
각 레이어는 이미지를 빌드하는 시간을 늘리고 이미지의 크기를 증가시킬 수 있습니다.
따라서 불필요한 레이어를 최소화하는 것이 좋습니다.

아래의 Dockerfile은 3개의 레이어를 생성합니다.

```dockerfile
FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install vim net-tools dnsutils -y
```

이러한 레이어를 하나의 레이어로 합치는 것이 좋습니다.

```dockerfile
FROM ubuntu:latest

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install vim net-tools dnsutils -y
```

### Production Dependencies만 설치하기

애플리케이션을 빌드할 때는 개발용 패키지나 파일이 필요하지 않습니다.
이때 `npm install` 명령에 `--production` 옵션을 사용하면 production dependencies만 설치할 수 있습니다.

```bash
npm install --production
```

수동으로 development dependencies를 제거하는 방법도 있습니다.

```bash
npm prune --production
```

위 명령어를 실행하면 devDependencies에 명시된 모든 패키지를 제거합니다.
Dockerfile에서 아래와 같이 활용할 수 있습니다.

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm ci && \
    npm run build && \
    npm prune --production
```

### 불필요한 패키지 설치하지 않기

Dockerfile에서 `RUN` 명령문을 사용할 때는 불필요한 패키지의 설치를 피해야 합니다.
예를 들어, `apt-get`을 사용할 때 `--no-install-recommends` 옵션을 사용하면 추천 패키지를 설치하지 않습니다.

```dockerfile
RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y --no-install-recommends netcat
```

### apt cache 삭제하기

`apt-get`을 사용할 때 `/var/lib/apt/lists/*` 디렉토리에 캐시가 저장됩니다.
이 캐시는 이미지를 빌드할 때 불필요한 용량을 차지하게 됩니다.
따라서 `apt-get`을 사용할 때는 캐시를 삭제하는 것이 좋습니다.

```dockerfile
RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y --no-install-recommends netcat && \
    rm -rf /var/lib/apt/lists/*
```

### `.dockerignore` 활용하기

`.dockerignore` 파일을 사용하면 이미지를 빌드할 때 불필요한 파일이나 디렉토리를 제외할 수 있습니다.
아래는 Node.js 애플리케이션을 빌드할 때 불필요한 파일을 제외하는 예시입니다.

```dockerignore
# .dockerignore
node_modules
npm-debug.log
```

### 애플리케이션 데이터를 별도 볼륨으로 분리

이미지에 애플리케이션의 데이터를 저장하면 이미지의 크기가 커질 수 있습니다.
이럴 경우 별도의 [볼륨](https://docs.docker.com/storage/volumes/)을 사용하는 것이 좋습니다.
볼륨은 컨테이너에 저장된 데이터를 외부 파일 시스템에 저장하는 기능으로, 컨테이너 재시작, 이미지 업그레이드 등에도 데이터를 유지할 수 있습니다.

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm ci && \
    npm run build && \
    npm prune --production

VOLUME /app/data

CMD ["node", "dist/index.js"]
```

## 마치며

> There is no silver bullet.

불행히도, Docker 이미지의 크기를 획기적으로 줄일 수 있는 "은탄환"은 존재하지 않습니다.
그러므로 위에서 살펴본 방법 외에도 여러 기법들을 적용해보는 지속적인 노력이 필요합니다.

## 참고 링크

-   [Volumes | Docker Documentation](https://docs.docker.com/engine/reference/builder/#volume)
-   [Multi-stage builds | Docker Documentation](https://docs.docker.com/develop/develop-images/multistage-build/)
-   [Best practices for writing Dockerfiles | Docker Documentation](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
-   [How to Reduce Docker Image Size: 6 Optimization Methods](https://devopscube.com/reduce-docker-image-size/)
