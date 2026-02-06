# STL Design System

STL 서비스를 위한 React 컴포넌트 라이브러리

## 프로젝트 구조

```
src/
├── assets/          # 폰트 등 정적 리소스
├── components/      # UI 컴포넌트
│   └── ui/          # 기본 UI 컴포넌트 (Button, Input, Badge 등)
├── config/          # 설정 파일
├── dashboard/       # 대시보드 컴포넌트 (StatCard, VisitTag 등)
├── icons/           # 아이콘 컴포넌트
├── layout/          # 레이아웃 컴포넌트 (AppShell, Header, Sidebar 등)
├── lib/             # 유틸리티 함수
├── styles/          # CSS 파일 (globals.css, tokens.css)
└── tokens/          # 디자인 토큰
```

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | Vite 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run storybook` | Storybook 실행 (포트 6006) |
| `npm run build-storybook` | Storybook 빌드 |
| `npm run test` | Vitest 테스트 실행 (watch 모드) |
| `npm run test:run` | Vitest 테스트 1회 실행 |
| `npm run test:coverage` | 테스트 커버리지 리포트 |

## 기술 스택

- **Framework**: React 18
- **Styling**: Tailwind CSS 4
- **Build**: Vite + vite-plugin-dts
- **Testing**: Vitest + Playwright
- **Documentation**: Storybook

## 사용 가이드

프로젝트에 디자인 시스템을 적용하는 방법은 [GETTING-STARTED.md](GETTING-STARTED.md)를 참고하세요.
