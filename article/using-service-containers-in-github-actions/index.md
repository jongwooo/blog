---
date: 2023-07-31 23:59:59
title: GitHub Actions에서 Service Container 사용하기
keywords: GitHub Actions, Service Container, Application Test, Database, Memory Cache, 애플리케이션 테스트, 데이터베이스, 메모리 캐시, 서비스 컨테이너, 워크플로우
---

워크플로우에서 애플리케이션을 테스트할 때, 데이터베이스나 메모리 캐시 등의 도구를 사용해야 하는 경우가 있습니다.
이런 경우, 워크플로우에서 직접 도구를 설치하고 구성하는 대신
[Service Container](https://docs.github.com/ko/actions/using-containerized-services/about-service-containers)를 사용하여
손쉽게 구성할 수 있습니다.
이번 글에서는 GitHub Actions에서 제공하는 Service Container에 대해 소개합니다.

## TL;DR

GitHub Actions의 **Service Container**를 통해 데이터베이스, 메모리 캐시 및 기타 도구를 워크플로우에 구성할 수 있습니다.

## Service Container

GitHub Actions에서 [Service Container](https://docs.github.com/ko/actions/using-containerized-services/about-service-containers)는
백그라운드에서 시작되고 실행되어 워크플로우의 job이나 step에서 필요한 서비스나 리소스를 제공하는 컨테이너입니다.

Service Container는 데이터베이스, 메시지 브로커 또는 기타 서비스와 같이 job이나 step이 의존하는 외부 서비스를 실행할 때 유용합니다.

Service Container를 백그라운드에서 별도의 컨테이너로 실행함으로써 워크플로우 step이 수행해야 하는 작업에 집중할 수 있으면서도
필요한 서비스에 대한 액세스 권한을 유지할 수 있습니다.

### Service Container 정의하기

워크플로우에서 Service Container를 사용하려면 아래와 같이 `jobs.<job_id>.services`를 정의해야 합니다.

```yaml
services:
  myservice1:
    image: ghcr.io/owner/myservice1
  myservice2:
    image: ghcr.io/owner/myservice2
```

위의 예시에서 `myservice1`과 `myservice2`는 서비스의 이름입니다.

**`jobs.<job_id>.services.<service_id>.image`**

Service Container를 실행하는 데 사용할 Docker 이미지를 지정합니다.
값은 Docker Hub 이미지 이름 또는 레지스트리 이름일 수 있습니다.

```yaml
services:
  myservice1:
    image: ghcr.io/owner/myservice1
```

**`jobs.<job_id>.services.<service_id>.credentials`**

이미지의 컨테이너 레지스트리에서 이미지를 가져오기 위해 인증이 필요한 경우,
`username`과 `password`를 설정하여 인증 정보를 제공할 수 있습니다.

```yaml
credentials:
  username: ${{ github.actor }}
  password: ${{ secrets.github_token }}
```

**`jobs.<job_id>.services.<service_id>.env`**

Service Container에 전달할 환경 변수를 설정합니다.

```yaml
env:
  MY_VAR: my_value
```

**`jobs.<job_id>.services.<service_id>.ports`**

서비스 컨테이너에 노출할 포트의 범위를 설정합니다.

```yaml
ports:
  - 6379:6379
```

이때, 포트는 컨테이너에서 임의로 지정할 수 있습니다.

```yaml
ports:
  - 6379/tcp # 컨테이너에서 임의로 지정
```

워크플로우에서 `${{ job.services.nginx.ports['6379'] }}` 컨텍스트를 사용하여
Service Container 포트에 액세스할 수 있습니다.

```yaml
- name: Check redis port
  run: echo ${{ job.services.nginx.ports['6379'] }}
```

**`jobs.<job_id>.services.<service_id>.volumes`**

Service Container에 마운트할 볼륨을 설정합니다.
볼륨을 사용하여 service 또는 job의 여러 step 간에 데이터를 공유할 수 있습니다.

```yaml
volumes:
  - my_docker_volume:/volume_mount
  - /data/my_data
  - /source/directory:/destination/directory
```

**`jobs.<job_id>.services.<service_id>.options`**

Service Container를 실행할 때 Docker에 전달할 옵션을 설정합니다.
이때, `--network` 옵션은 지원하지 않습니다.

```yaml
options: >-
  --health-cmd "redis-cli ping"
  --health-interval 10s
  --health-timeout 5s
  --health-retries 5
```

### Service Container 예시

아래의 예시는 Redis Service Container를 정의하는 예시입니다.

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      redis:
        image: redis
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379/tcp
```

## 마치며

[Service Container](https://docs.github.com/ko/actions/using-containerized-services/about-service-containers)를 사용하면
워크플로우에서 데이터베이스, 메모리 캐시 및 기타 도구를 손쉽게 구성할 수 있습니다.
만약 GitHub Actions에서 애플리케이션 테스트를 계획하고 있다면, 위의 예시를 참고하여 적용해보시는 것을 추천드립니다.

## 참고 링크

- [About service containers](https://docs.github.com/en/actions/using-containerized-services/about-service-containers)
- [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Creating Redis service containers](https://docs.github.com/en/actions/using-containerized-services/creating-redis-service-containers)
