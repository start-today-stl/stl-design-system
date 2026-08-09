# DataTable 가상화 (Phase 2) 작업 계획

작업 시작일: 2026-05-30
대상: `stl-design-system` 의 `DataTable` 컴포넌트
관련 사용처: `cms-front` 의 B2C 출고관리 (1000행), 그 외 가상화 활성화할 페이지들

## 브랜치 전략

- **Epic (Jira)**: SDS-3
- **통합 브랜치**: `feat/SDS-3-datatable-virtualization` (main 기반)
- **하위 작업 브랜치**: `feat/SDS-4` ~ `feat/SDS-9` (통합 브랜치 기반)
- **머지 흐름**: 각 sub-task PR → 통합 브랜치 → (모두 완료 후) main

| Sub-task | Jira | 브랜치 | 상태 |
|---------|------|--------|------|
| 1. 가상화 코어 도입 | SDS-4 | `feat/SDS-4` | ✅ 구현 완료 (커밋 대기) |
| 2. 기능 호환 (sticky/selectable/sortable/expandable) | SDS-5 | `feat/SDS-5` | ✅ 구현 완료 (커밋 대기) |
| 3. 비호환 케이스 안전 처리 (rowGrouping/DnD) | SDS-6 | `feat/SDS-6` | ✅ 구현 완료 (커밋 대기) |
| 4. Storybook 스토리 + 회귀 점검 | SDS-7 | `feat/SDS-7` | ✅ 구현 완료 (커밋 대기) |
| 5. B2cOutbound 페이지 적용 | SDS-8 | `feat/SDS-8` | ⬜ |
| 6. 성능 측정 + 문서화 | SDS-9 | `feat/SDS-9` | ⬜ |

## API 디자인 결정

```ts
type VirtualConfig = {
  overscan?: number       // 화면 밖 추가 렌더 행 (default 5)
  estimateSize?: number   // 행 추정 높이 px (default 40)
}

type DataTableProps<T> = {
  virtual?: boolean | VirtualConfig
  // ...
}

// 사용 예시
<DataTable virtual />                                    // 단순 ON
<DataTable virtual={{ overscan: 10, estimateSize: 50 }}/> // 옵션 튜닝
<DataTable virtual={false} />                            // OFF (또는 prop 생략)
```

**선택 이유**:
- `virtual` (Ant 와 유사한 짧은 이름) + 옵션 객체 = 단순/복잡 둘 다 깔끔
- 90% 케이스가 단순 ON 이므로 가장 흔한 사용이 가장 짧음
- 기본 OFF — 기존 사용처 회귀 없음

## 의존성

- `@tanstack/react-virtual` ^3.13.26 (검증된 가벼운 가상화 라이브러리, table 지원 명시)


## 배경

- DataTable Phase 1 (props 안정화 + 메모이제이션 fix) 으로 "관련 없는 state 변경" 의 cascade 깜빡임은 해결
- 하지만 셀 클릭 / 정렬 / 확장 같이 데이터 자체와 관련된 인터랙션은 1000행 전부 재렌더 발생
- 백엔드가 다중 검색 위해 GET → POST 전환 예정, 운영팀이 한 번에 큰 페이지 사이즈 (500/1000) 로 조회
- 가상화 (windowing) 로 보이는 행만 렌더링 → DOM 노드 63k → ~3k 예상

## Phase 0 (baseline) 핵심 수치

| 시나리오 | INP | 비고 |
|---------|-----|------|
| 초기 마운트 (1000행) | LCP 1.80s | 요소 렌더링 지연 1.79s |
| 스크롤 | 708ms | 가장 느린 프레임 750ms |
| 정렬 클릭 | 1,657ms | 처리 1.46s |
| 체크박스 1개 | 3,522ms | 단일 long task 4초 |
| 확장행 1개 | 3,846ms | 처리 3.48s |
| DOM 노드 | 63,041 | - |

상세: `docs/dev/perf/virtualization-baseline.md`

---

## 체크리스트

### ① 사전 설계 & 의존성

- [ ] `@tanstack/react-virtual` API 학습 + 핵심 패턴 정리
  - `useVirtualizer` 옵션, `measureElement` (variable height), windowing 메커니즘
- [ ] 디자인시스템 DataTable 의 가상화 호환 범위 결정
- [ ] API 디자인 확정 — 예:
  ```ts
  interface VirtualizationConfig {
    enabled: boolean
    overscan?: number      // 화면 밖 추가 렌더 행 수 (default 5)
    estimateSize?: number  // 행 기본 높이 추정 (default 40)
  }
  ```
- [ ] `@tanstack/react-virtual` 설치 (stl-design-system)
- [ ] peer dependency 영향 점검

### ② 가상화 코어 구현 (DataTable 내부) — SDS-4 ✅

- [x] DataTable props 에 `virtual?: boolean | VirtualConfig` 추가 (types.ts)
- [x] 기본 OFF (회귀 방지) — `virtual` 안 들어오면 기존 로직 그대로
- [x] `useTableVirtualizer` 훅 작성 (옵션 정규화 + 비호환 감지 + virtualizer 호출)
- [x] `useVirtualizer` 호출 (scrollContainerRef 기반)
- [x] 가상화 ON 분기: `virtualizer.getVirtualItems()` 로 보이는 행만 렌더
- [x] spacer-row 패턴 — `<TableRow>` with height (paddingTop / paddingBottom) 로 스크롤 영역 유지
- [x] vite.config 에 `@tanstack/*` external 처리 (dist 에 번들 안 함)
- [x] 빌드 / TypeScript 통과

**SDS-4 범위 제한:**
- 가변 높이 (variable height, measureElement) 미지원 — 모든 행이 estimateSize px 로 가정
- 따라서 확장행 (expandable) 이 있어도 펼친 높이는 가상화 계산에 반영 안 됨 → SDS-5 에서 처리
- 사용자가 명시적으로 활성화 (`virtual` prop) 안 하면 영향 없음 — 기존 사용처 회귀 0

### ③ 호환성 처리 (기능별) — SDS-5 ✅

- [x] **DataTableBodyRow forwardRef-like 구현** — `rowRef` + `dataIndex` prop 추가, TableRow 의 ref 와 data-index 로 연결
- [x] **measureElement 통합** — virtualizer.measureElement 를 rowRef 로 전달, 변경되는 행 높이 추적
- [x] **sticky 헤더** — CSS `position: sticky` 그대로 동작 (코드 변경 없음, virtualization 과 직교)
- [x] **sticky 컬럼 (left/right)** — `<td>` 단위 sticky 그대로 동작 (코드 변경 없음)
- [x] **selectable / selectedIds** — 가상 행만 isSelected 평가 (데이터 레벨, 자동)
- [x] **sortable** — 정렬은 데이터 레벨, virtualizer 자동 재계산
- [x] **확장행 (expandable)** — 기본 동작. 단, 확장 row 자체의 높이는 virtualizer 가 추적 안 함 (한계 — 아래 참고)
- [x] **rowReorderable** — SDS-4 에서 자동 OFF + dev 경고 처리됨
- [x] **rowGrouping (rowSpan)** — SDS-4 에서 자동 OFF + dev 경고 처리됨
- [x] **columnReorderable** — 컬럼 가상화 아니고 행 가상화라 영향 없음, 기존 동작 유지

**알려진 한계:**
- 확장행 (`expandable.expandedRowRender`) 의 펼침 영역은 별도 `<TableRow>` 로 렌더되어 virtualizer 가 측정 안 함. 여러 행 펼친 채 스크롤하면 위치 계산이 약간 부정확할 수 있음. 단일 펼침 (전형적 사용 패턴) 에선 체감 차이 없음.
- 사용자가 `virtual` 활성화 시 스크롤 컨테이너에 명시적 높이 (`maxHeight` 또는 flex 레이아웃) 가 필요. 없으면 wrapper 가 무한 성장해 가상화 효과 없음.

### 호환성 검증 표 (SDS-6) — 전 기능 점검 완료

| 기능 | 가상화 ON 시 동작 | 조치 |
|------|------------------|------|
| `rowReorderable` (행 DnD) | 비호환 | SDS-4: 자동 OFF + dev 경고 |
| `rowGrouping` (rowSpan) | 비호환 | SDS-4: 자동 OFF + dev 경고 |
| `headerGroups` (다중 헤더) | 호환 ✅ | thead 영역, 가상화는 tbody 만 → 영향 없음 |
| `loading` 상태 | 호환 ✅ | loading 분기에서 splash/skeleton 렌더, 가상화 분기 미실행 |
| 빈 데이터 (`data.length === 0`) | 호환 ✅ | empty 분기에서 emptyMessage 렌더, 가상화 분기 미실행 |
| `rowActions.showAdd` (행 추가 버튼) | 호환 ✅ | tbody 의 마지막 행으로 spacer 뒤에 렌더, 가상화 영역 밖 |
| sticky 헤더 | 호환 ✅ | thead 의 CSS sticky 와 wrapper 스크롤은 직교 |
| sticky 컬럼 (left/right) | 호환 ✅ | `<td>` 단위 sticky 라 행 단위 가상화와 독립 |
| `selectable` / `selectedIds` | 호환 ✅ | 데이터 레벨, 가상 행만 isSelected 평가 |
| `sortable` / `sortState` | 호환 ✅ | 정렬은 데이터 레벨, virtualizer 자동 재계산 |
| `resizable` (컬럼 리사이즈) | 호환 ✅ | 컬럼 width 의 CSS 변경, 행 가상화와 무관 |
| `columnReorderable` (컬럼 DnD) | 호환 ✅ | 컬럼 순서 변경, 행 가상화와 무관 |
| `expandable` (확장행) | 부분 호환 ⚠️ | 동작은 하지만 확장 영역 높이는 virtualizer 측정 밖 — 한계 명시 |
| 셀 편집 (`onCellChange`) | 호환 ✅ | 데이터 레벨, 가상화 무관 |
| 스크롤 컨테이너 높이 없음 | 동작 안 함 | SDS-6: dev 경고 출력 (`useTableVirtualizer` 에서 RAF 로 체크) |

### ④ 검증 (회귀 점검)

- [ ] 빌드 통과 (`npm run build`)
- [ ] TypeScript 통과 (`tsc --noEmit`)
- [ ] Storybook 의 기존 DataTable 스토리 전부 동작 (가상화 OFF 기본값이라 회귀 없어야 함)
- [ ] Storybook 가상화 스토리 신규 추가
  - [ ] 일반 (1000 행) — 기본 시나리오
  - [ ] sticky 컬럼 + selectable
  - [ ] 확장행
  - [ ] sortable
  - [ ] 10000 행 (스트레스 테스트)

### ⑤ B2cOutbound 페이지 적용

- [ ] `B2cOutboundDataTable.tsx` 에 `virtualization={{ enabled: true }}` 추가
- [ ] 동작 검증:
  - [ ] 1000행 로드 후 스크롤 부드러운지
  - [ ] sticky 헤더/컬럼 유지
  - [ ] 체크박스 동작 + 다른 행 영향 없는지
  - [ ] 정렬 클릭 후 정렬 결과 정상
  - [ ] 행 확장 동작 (variable height 정확한지)
  - [ ] 페이지 사이즈 변경 후 정상 동작

### ⑥ 성능 측정 (Phase 0 와 비교)

- [ ] 측정 1: 초기 마운트
- [ ] 측정 2: 스크롤
- [ ] 측정 3: 정렬 클릭
- [ ] 측정 4: 체크박스 1개
- [ ] 측정 5: 확장 1개
- [ ] 총 DOM 노드 수 (예상: 63k → ~3k)
- [ ] `virtualization-baseline.md` 에 Phase 2 결과 추가 + 비교표

### ⑦ 문서화 + 릴리즈

- [ ] `DATATABLE-PERF-RETRO.md` 에 가상화 섹션 추가 (or 새 retrospective 문서)
- [ ] 디자인시스템 PR 작성 (변경 사항 + 측정 결과 + 사용 예시)
- [ ] CMS 측 적용 PR 작성 (`virtualization={{ enabled: true }}` 추가)
- [ ] 머지 후 다른 DataTable 사용처 회귀 모니터링

### ⑧ 프론트팀 공유

- [ ] AS-IS / TO-BE 정리 (어제 Phase 1 공유처럼)
- [ ] 가상화 사용 가이드 (언제 활성화할지, 호환 안 되는 기능 안내)

---

## 예상 일정

| 단계 | 시간 |
|------|------|
| ① 설계 + 의존성 | 0.5일 |
| ② 코어 구현 | 0.5~1일 |
| ③ 호환성 | 0.5~1일 |
| ④ 검증 | 0.5일 |
| ⑤ 페이지 적용 | 0.5일 |
| ⑥ 성능 측정 | 0.5일 |
| ⑦ 문서 + PR | 0.5일 |
| **총** | **3~4일** |

---

## 리스크 / 사전 고려사항

1. **variable height (확장행)** — 가장 까다로움. `measureElement` 가 정확히 작동하지 않으면 스크롤 위치 점프 가능
2. **sticky 컬럼 + 가상화 충돌** — sticky 는 부모 컨테이너의 overflow 와 상호작용. 가상화 컨테이너 구조 신중히
3. **rowGrouping (rowSpan) 비호환** — 솔직히 가상화 라이브러리들이 rowSpan 잘 지원 안 함. 사용처가 적으면 가상화 OFF 분기 + 경고로 충분
4. **드래그앤드롭 비호환** — Floating 행 드래그 + 가상화는 매우 어려움. 사용처가 있는지 확인 필요 (현재 DataTable rowReorderable 사용처 점검)
5. **회귀** — 기존 사용처들이 영향 안 받게 가상화 기본 OFF 절대 유지

---

## 작업 후 후속 (별도 티켓)

- 100~500 행 대 페이지에 가상화 점진 적용 (사용처 검증 필요)
- rowGrouping + 가상화 호환 (라이브러리 커스터마이징 또는 별도 컴포넌트)
- 컬럼 가상화 (horizontal virtualization) — 컬럼 수 매우 많은 케이스

---

## DataTable v2 — `<div>` 기반 그리드 재설계 (별도 epic 후보)

### 배경
현재 DataTable 은 semantic `<table>` 기반 + CSS `position: sticky` 로 sticky 컬럼 구현.
가상화 적용 시 브라우저의 CSS sticky 처리 (GPU 합성 + sub-pixel transform) 와 1px border rendering 이 충돌하여
**스크롤 중 sticky 셀의 행 사이 border 가 가끔 사라지는 깜빡임 현상** 발생.

### 근거 (알려진 브라우저 한계)
- [Mozilla Bug #1585378](https://bugzilla.mozilla.org/show_bug.cgi?id=1585378) — CSS position: sticky causes flicker while scrolling
- [Mozilla Bug #1658119](https://bugzilla.mozilla.org/show_bug.cgi?id=1658119) — sticky table cells lose their border
- [Angular components #21576](https://github.com/angular/components/issues/21576) — 같은 sticky header flickering
- [codestudy.net 분석](https://www.codestudy.net/blog/border-style-do-not-work-with-sticky-position-element/) — border + sticky 가 실패하는 4가지 원인

### 산업 표준 해결책 (검증 사례)
표준 `<table>` 로 가상화 + sticky 둘 다 깔끔하게 처리하는 라이브러리는 사실상 없음. 모두 `<div>` 기반 grid 로 가상화 + sticky 구현:
- **AG Grid** — nested `<div>` + 자체 layout / virtualisation 엔진
- **MUI DataGrid** — `<div>` + `position: absolute` + 자체 virtualization
- **TanStack 공식 sticky 예시** — `<div>` + transform + 별도 sticky container

### 현재 (Phase 2) 의 단기 처리
- Table wrapper bg 를 sticky 셀 bg (`bg-slate-100` / `dark:bg-slate-800`) 와 동일하게
- gap 자체는 존재하나 색이 같아 시각적으로 안 보임
- 운영 환경 배포 가능 수준

### v2 의 목표
- `<table>` → `<div role="grid">` 구조 전환
- 행 위치는 `position: absolute; transform: translateY(...)` 로 JS 제어 (Math.round 적용 → sub-pixel 없음)
- sticky 컬럼은 가상화와 독립된 별도 container (CSS sticky 의존 X)
- 모든 기존 기능 재구현: 정렬 / 행 선택 / 확장행 / 셀 편집 / 컬럼/행 reorder / 헤더 그룹 / rowGrouping (rowSpan)
- 외부 API (`<DataTable>` props 시그니처) 는 유지하여 사용처 영향 최소화
- 접근성 — `role="grid"`, `role="row"`, `role="gridcell"`, `aria-rowcount` 등 ARIA 그리드 패턴 적용

### 예상 작업량
- **1.5~2주** (낙관적), **2~3주** (회귀 점검 / 사용처 검증 포함)
- 회귀 위험 매우 높음 → 모든 DataTable 스토리 + 사용처 (CMS / FEMS / LMS 등) 검증 필요

### 우선순위 결정 시 고려
- 운영 시스템에서 sticky + 1000+ 행 페이지가 얼마나 많은가
- 깜빡임 현상에 대한 운영팀 / 사용자 컴플레인 빈도
- 다른 우선 작업과의 일정 경쟁
