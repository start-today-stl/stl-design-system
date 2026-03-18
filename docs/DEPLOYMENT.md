# CI/CD 설정 가이드

## 개요

이 프로젝트는 GitHub Actions를 통해 CI/CD를 운영합니다.

| 워크플로우 | 파일 | 용도 |
|-----------|------|------|
| CI | `.github/workflows/ci.yml` | 타입 체크, 테스트, 빌드 검증 |
| Deploy | `.github/workflows/deploy.yml` | Vercel 자동 배포 |

---

## CI (Continuous Integration)

### 트리거

- `main` 브랜치에 push
- `main` 브랜치로의 Pull Request

### 실행 단계

1. **TypeScript 타입 체크** - `tsc --noEmit`
2. **테스트 실행** - `npm run test:run` (Vitest)
3. **빌드 검증** - `npm run build`

---

## Vercel 배포

### 배포 방식

Vercel의 기본 Git 연동 대신 **Deploy Hook + GitHub Actions** 방식을 사용합니다.

> Vercel Git 연동 시 webhook이 자동 생성되지 않는 이슈가 있어 이 방식을 채택했습니다.

### 동작 흐름

```
main 브랜치 push → GitHub Actions 트리거 → Deploy Hook 호출 → Vercel 빌드 시작
```

### 설정 방법

#### 1. Vercel Deploy Hook 생성

1. [Vercel 대시보드](https://vercel.com) → 프로젝트 선택
2. **Settings** → **Git** → **Deploy Hooks**
3. Hook 이름 입력 (예: `github-actions`) 후 생성
4. 생성된 URL 복사 (형식: `https://api.vercel.com/v1/integrations/deploy/...`)

#### 2. GitHub Secret 등록

1. GitHub 저장소 → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭
3. Name: `VERCEL_DEPLOY_HOOK`
4. Secret: 복사한 Deploy Hook URL 붙여넣기
5. **Add secret** 클릭

### Vercel 프로젝트 설정

| 설정 | 값 |
|------|-----|
| Framework Preset | Other |
| Build Command | `npm run build-storybook` |
| Output Directory | `storybook-static` |
| Install Command | `npm install` |

---

## 트러블슈팅

### Vercel 자동 배포가 안 될 때

1. GitHub Secrets에 `VERCEL_DEPLOY_HOOK`이 등록되어 있는지 확인
2. Deploy Hook URL이 유효한지 확인 (Vercel 대시보드에서 재생성 가능)
3. GitHub Actions 탭에서 워크플로우 실행 로그 확인

### CI 실패 시

1. **타입 에러**: `npx tsc -p tsconfig.build.json --noEmit` 로컬에서 확인
2. **테스트 실패**: `npm run test:run` 로컬에서 확인
3. **빌드 실패**: `npm run build` 로컬에서 확인

---

## 워크플로우 파일

- CI: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)
- Deploy: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)
