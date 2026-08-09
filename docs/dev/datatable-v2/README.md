# DataTable v2 (SDS-28) 문서 모음

이 폴더만 통째로 옮기면 다른 머신에서도 DataTable v2 작업을 이어갈 수 있도록 모아둔 것이다.

> `docs/dev` 는 `.gitignore` 대상이라 **저장소에 올라가지 않는다.**
> 머신 간 이동은 수동 복사로 한다.

## 어디부터 읽나

| 순서 | 문서 | 내용 |
|---|---|---|
| 1 | `HANDOFF-2026-08-03.md` | 인수인계. 진행 상황, 브랜치 전략, 주의사항, AG Grid 도입 검토 부록 |
| 2 | `DATA-TABLE-V2-DEVELOPMENT.md` | **핵심 문서.** 아키텍처 결정, 티켓별 스코프, gotcha, 알려진 제약, 남은 티켓 |
| 3 | `SDS-39-REGRESSION-CHECKLIST.md` | 회귀 검증 체크리스트 (진행 중) |

## 참고용 (v1)

| 문서 | 내용 |
|---|---|
| `DATA-TABLE-DEVELOPMENT.md` | v1 개발 문서. **SDS-40 마이그레이션 가이드 작성 시 v1 기능 전수 목록으로 사용** |
| `PLAN-datatable-virtualization.md` | SDS-3 에픽 (v1 대상 가상화). 문서 끝의 "DataTable v2 — `<div>` 기반 그리드 재설계" 절이 **이 에픽의 출발점** |

읽을 일은 드물지만, v2 문서가 둘 다 참조하고 SDS-40 에서 실제로 필요해서 함께 넣었다.

## 이 폴더 밖에 있는 관련 문서

DataTable 전용이 아니라 `docs/dev` 에 남겨둔 것들:

- `docs/dev/perf/` — v1 시절 실사용처(CMS/LMS) 성능 측정 기록. **끝난 작업의 기록이라 v2 개발엔 불필요**
- `docs/dev/CSS-ENTRY-POINTS.md` — tokens.css / globals.css 역할 분담
- `docs/dev/PLAN.md` — 프로젝트 전반
- `docs/dev/VERSION-MANAGEMENT.md` — 버전 관리
- `docs/dev/DESIGN-SYSTEM-REVIEW.md` — 초기 리뷰 (오래됨)

## 새 머신에서 작업 시작할 때

```
docs/dev/datatable-v2/HANDOFF-2026-08-03.md 를 먼저 읽고,
이어서 docs/dev/datatable-v2/DATA-TABLE-V2-DEVELOPMENT.md 도 읽어줘.
진행 상황이랑 주의사항 파악되면 요약해서 확인시켜주고 다음 지시 기다려.
에픽은 SDS-28 (DataTable v2), 진행 중인 티켓은 SDS-39 (회귀 검증) 이야.
```

Node 22 필요 (Storybook 10 / Vitest 4 가 ≥20.19 요구):

```bash
nvm use 22
```
