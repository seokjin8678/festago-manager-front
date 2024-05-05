# 페스타고 관리자 페이지

[페스타고](https://github.com/woowacourse-teams/2023-festa-go) 어플리케이션의 관리자 전용 페이지 입니다.

## 개발 언어, 프레임워크
Vue 3 + TypeScript + Vite

## 실행 방법

### 1. VITE_API_URL 경로 수정
```yml
# ./env.development
# 예시
VITE_API_URL = localhost:8080/
```

### 2. Docker build & run 
```bash
docker build -t front .

docker compose up -d 
```

### 2-1. node, npm 설치가 되어 있다면
`npm install` 의존성 설치 뒤 (한 번만)

`npm run dev` 실행
