# DataTable v2 개발 진행 문서

DataTable v2 (SDS-28 epic) 는 v1 의 근본적 한계 (HTML `<table>` 기반이라 pinned 컬럼 스크롤 시 깜빡임, 대용량 데이터 처리, 헤더/기능 확장성 제약) 를 해결하기 위한 재설계 라이브러리이다.

v1 은 유지한 채 v2 를 병행 배포하고, 사용처가 점진적으로 v2 로 이관하는 전략.

## 컴포넌트 위치

```
src/components/table/data-table-v2/
├── index.ts                          # public export (제한적)
├── types.ts                          # 모든 public/internal 타입
├── data-table-v2.tsx                 # 메인 컴포넌트 (헤더/바디/컨트롤 셀 렌더링)
├── data-table-v2-row.tsx             # 행 렌더링 (React.memo)
├── data-table-v2-default-edit.tsx    # 기본 셀 편집기 (Input)
├── data-table-v2-column-separator.tsx # 컬럼 사이 세로 구분선/리사이즈 핸들
├── data-table-v2-sortable-header-cell.tsx # 드래그 가능한 헤더 셀 wrapper
└── hooks/
    ├── use-cell-edit.ts       # 셀 편집 상태 hook (rowId + columnKey + editValue + error)
    ├── use-column-reorder.ts  # @dnd-kit 기반 컬럼 재정렬
    ├── use-column-resize.ts   # 컬럼 폭 리사이즈
    ├── use-row-expansion.ts   # 확장행 상태
    └── use-row-selection.ts   # 행 선택 상태 (Shift+Click 범위 선택 지원)
```

Storybook: `stories/DataTableV2.stories.tsx`

## 브랜치 전략

- **Epic**: SDS-28
- **통합 브랜치**: `feat/SDS-28-datatable-v2` (main 기반)
- **하위 티켓**: 각각 `feat/SDS-{number}` (통합 브랜치 기반)
- **머지 흐름**: 각 sub-task → 통합 브랜치 → (모든 스코프 완료 후) main

각 하위 티켓은 통합 브랜치에서 시작해서 자체 브랜치로 작업 후 non-fast-forward merge (`--no-ff`) 로 통합 브랜치에 흡수됨.

## 완료된 하위 티켓

### SDS-29 — 코어 구조

- `<div role="grid">` + `role="row"` + `role="gridcell"` 기반
- 절대좌표 배치 (translate3d) 로 행 배치
- ResizeObserver 로 실제 행 높이 측정
- 스타일은 v1 과 동일하게 정렬 (테마 토큰 재사용)

### SDS-30 — 컬럼 정렬 + 다중 정렬 + headerGroups

- `sortable: true` 컬럼 → 헤더 클릭으로 asc/desc/해제 순환
- `multiSort` 활성화 시 헤더 클릭이 정렬 상태에 누적됨 (v1 방식 유지 — 별도 modifier 키 필요 없음). 각 컬럼별로 asc → desc → 제거 순환. 다중 정렬 시 우선순위 번호 표시
- `headerGroups` 배열 지정 시 2행 헤더 (그룹 헤더 + 컬럼 헤더)
- HeaderGroups 그룹 행 아래 가로 구분선

### SDS-31 — pinned 컬럼

- `pinned: "left" | "right"` 로 컬럼 고정
- CSS `position: sticky` 활용
- 좌우 각각 offset 누적 계산 (`computePinnedOffsets`)
- 스크롤 시에만 pinned 경계에 shadow 표시 (MUI DataGrid 스타일)

### SDS-32 — 컬럼 리사이즈 + 재정렬 + 셀 구조 리팩터

- `resizable: true` + `columnWidths` (controlled) + `onColumnResize`
- `columnReorderable: true` + `columnOrder` (controlled) + `onColumnReorder`
- @dnd-kit 기반 (v1 과 동일 라이브러리)
- pinned 컬럼은 재정렬 대상 제외 (sticky offset 이 컬럼 순서에 종속)
- 드래그는 헤더 좌측 **전용 핸들**에만 걸림 → 정렬 클릭과 충돌 없음 (5px 이상 드래그해야 시작)
  - SDS-32 당시 sortable 컬럼도 제외했으나 근거가 없어 SDS-39 에서 해제
- 셀 구조 리팩터: 헤더 셀에 별도 content container 도입 → 향후 필터/메뉴 등 확장 여지 확보

### SDS-33 — 행 선택 + 클릭 + rowClassName + 확장행

- `selectable: true` → 좌측 체크박스 컬럼 자동 추가
- `selectedIds` (controlled) / `defaultSelectedIds` (uncontrolled) / `onSelectionChange`
- Shift + Click 로 범위 선택 지원 (v1 과 동일)
- `onRowClick` → 셀 편집/버튼 클릭과 분리 (`data-no-row-click` 속성으로 이벤트 필터링)
- `rowClassName?: (row) => string` 로 행별 추가 클래스
- `expandable` config 로 확장행 지원

### SDS-34 — 셀 편집

- `editable: true` 컬럼 클릭 시 편집 모드 진입
- 기본 편집기: `DataTableV2DefaultEdit` (Input, Enter 저장 / Escape 취소 / blur 저장)
- 커스텀 편집기: `editComponent` (예: Select) — `EditComponentProps` 타입 사용
- 저장 전 검증: `validate(value, row): true | string`
- `onCellChange(rowId, columnKey, newValue)` 콜백 (validate 통과 시만 호출)
- `useCellEdit` hook 이 편집 상태 관리 (rowId + columnKey + editValue + error)
- 편집 중 셀은 EditComp 을 JSX 로 렌더 (React hooks 규칙 준수)

### SDS-35 — rowActions + loading + emptyMessage + maxHeight

- `rowActions.onRowDelete` + `showDelete` → **각 행 왼쪽** (체크박스/확장 뒤, 데이터 컬럼 앞) 에 삭제 아이콘 컬럼 자동 추가
- `rowActions.onRowAdd` + `showAdd` → **하단** 새 행에 추가 아이콘 (삭제 컬럼과 동일 위치)
- `loading: boolean` + `loadingMode: "splash" | "skeleton"` (기본 splash) + `loadingContent` (커스텀 우선)
- splash/커스텀 로딩은 `sticky left-0 + width: visibleWidth` 로 가로 스크롤 시 가시 영역 중앙 유지
- skeleton 은 컬럼 폭에 맞춰 `min-h-9` 셀 구조로 렌더 (Skeleton width `"70%"` 로 컬럼 비례)
- `emptyMessage: React.ReactNode` (기본: "데이터가 없습니다.") — 같은 sticky 패턴 적용
- `maxHeight` 은 SDS-31 무렵부터 지원되어 온 prop (재확인만)

### SDS-36 — rowReorderable (드래그 핸들 + @dnd-kit 통합)

- `rowReorderable: boolean` + `onRowReorder(newData)` 콜백
- @dnd-kit 기반 (v1 과 동일 라이브러리). `use-row-reorder.ts` hook 이 arrayMove + onRowReorder 발화
- 각 행 왼쪽 최상단에 드래그 핸들 컬럼 자동 추가 (32px, DragHandleIcon)
- 드래그 활성화 노드는 핸들만 (`setActivatorNodeRef` + listeners). 셀 클릭/편집과 충돌 없음
- 컬럼 재정렬 + 행 재정렬 병행: sortable id prefix (`row-{id}` vs accessorKey) 로 라우팅
- 좌측 컨트롤 컬럼 순서: [드래그 핸들] → [체크박스] → [확장] → [삭제] → [데이터 컬럼]
- **중요 아키텍처 변경**: Row 배치 방식을 `transform: translate3d(0, translateY, 0)` → `top: translateY` 로 전환. dnd-kit sortable 이 각 행의 layout 좌표(offsetTop)를 기반으로 sibling shift/collision 을 계산하는데, transform 만 쓰면 모든 행의 layout 좌표가 0 이라 dnd-kit 이 실시간 shift 를 정상적으로 못 함. `top` 을 쓰면 offsetTop 이 서로 다르게 잡혀서 dnd-kit 표준 경로대로 동작. transform 프로퍼티는 dnd-kit 이 드래그/시프트 전용으로 사용
- 성능 영향: 스크롤 중 재배치가 아니라 데이터/높이 변경 시에만 top 갱신되므로 실질 차이 미미. 가상화(SDS-38)와도 충돌 없음

### SDS-42 — 컬럼 헤더 필터 (프리셋 + 커스텀 컴포넌트)

- Column config 에 `filter?: FilterConfig<T>` 추가 (discriminated union)
- 프리셋 5종: `text`, `select`, `multiSelect`, `dateRange`, `numberRange`
- 커스텀 이스케이프 해치: `{ type: "custom", component: (props: FilterComponentProps<T>) => ReactNode }` — DS 컴포넌트 자유 조합 가능
- Props: `filterState` (controlled) / `defaultFilterState` (uncontrolled) / `onFilterChange` 콜백
- v2 는 필터 로직 직접 실행 안 함 → 상태 변경 시 콜백만 발화 (sortState/selectedIds 패턴과 동일). 서버 사이드 필터 전제
- 헤더 UI: 헤더명 우측에 필터 아이콘, 활성 필터 있을 때 파란 도트 인디케이터, 클릭 시 Popover 오픈
- Popover 는 DS 의 기존 `Popover` 재사용. 바깥 클릭 / Esc 시 자동 닫힘. `onClose` 콜백 제공
- **헤더 셀 layout 3슬롯 리팩터**: `[헤더명 + 정렬 인디케이터]` · `[필터 아이콘]` · `[미래 확장 슬롯]`. `alignClass` 는 슬롯 1 내부에만 적용해서 필터 아이콘 위치 무관
- 컨텐츠 오버플로우 시 헤더명 truncate, 정렬 화살표 shrink-0, 슬롯 1 overflow-hidden 으로 필터 아이콘이 밀리지 않도록 함
- 필터 버튼: h-6 w-6 (24×24 히트 영역, min-h-9 헤더 안에 딱 맞음), FilterIcon 20px, hover:bg-slate-200/60 로 클릭 어피던스
- **부산물 fix**:
  - flex 컬럼 리사이즈 시 startWidth 를 실제 렌더 폭 (offsetWidth) 로 측정. 기존 fallback 150 fallback 때문에 flex 컬럼 리사이즈 시 확 줄어드는 버그가 있었음 (SDS-32 잠재 버그)
  - 헤더 셀 모두에 `headerBg` 적용 (기존엔 pinned 셀만). right pinned 없는 케이스에서 우측 gap 방어

### SDS-43 — 컬럼 리사이즈 UX (AG Grid 기본 모드)

- **최종 방식**: 독립 리사이즈. 대상 컬럼만 폭 변경, 다른 컬럼은 현재 폭 그대로 유지 (AG Grid 기본 모드 동일). shrink 시 우측에 여백 생기고 grow 시 스크롤 확장.
- **최초 접근 폐기**: neighbor absorption (우측 이웃 흡수, 총폭 유지) 방식 초기 시도. "리사이즈된 컬럼이 다른 컬럼 폭에 영향 주는 게 UX 상 이상하다" 사용자 피드백으로 방향 전환. AG Grid 기본 동작 (독립) 이 표준이고 이해하기 쉬움
- **flex 컬럼 스냅샷**: 최초 리사이즈 순간 헤더 행의 `[data-column-key]` 셀들 `offsetWidth` 를 읽어 `internalWidths` 에 저장. 이후 flex 컬럼도 fixed 로 취급 → 리사이즈 시 다른 flex 컬럼이 자동 재분배되는 것 방지 (이게 없으면 대상만 바꿔도 flex 컬럼들이 남은 공간 재계산해서 폭 흔들림)
- **`col.minWidth` 존중**: 리사이즈 하한 = `max(50px, col.minWidth)`. 기존엔 하드코딩 50px 만 사용해서 CSS min-width 와 어긋나 총폭이 튀는 버그 있었음 (예: 컬럼 min 120, 훅이 50 으로 계산 → 훅 sum ≠ 실제 DOM sum → 스크롤 이상 확장)
- **row border 통합**: 각 셀의 `border-b` 를 row inner div 하나로 통합. shrink 로 우측 여백 생겨도 여백까지 하단 라인 연속. 마지막 row 는 border-b 생략 (외곽 컨테이너 border-bottom 과 겹쳐 2px 두꺼워 보이는 것 방지)
- **grid outer 항상 `w-full`**: 기존 `hasFlexColumn ? "w-full" : "w-fit max-w-full"` 분기 제거. 리사이즈로 모든 컬럼이 fixed 되고 총폭 < 컨테이너인 상황에서 테이블 자체가 shrink 하는 것 방지
- **data-column-key**: 헤더 셀 (`data-table-v2.tsx` 데이터 셀 + `data-table-v2-sortable-header-cell.tsx` 드래그 셀) 에 `data-column-key={accessorKey}` 부여. 훅이 스냅샷 시 컬럼 매핑 용도

### SDS-37 — rowGrouping (셀 병합)

- v1 API 그대로 이식: `rowGrouping: { groupBy: keyof T | keyof T[]; mergeColumns?: (keyof T)[] }`
- **useRowGrouping** (v1 로직 이식): `groupBy` 값이 연속으로 같은 데이터 행들을 그룹으로 판정. `mergeColumns` (기본: groupBy) 에 해당하는 셀들에 대해 rowSpanMap 계산 (head=span 값, middle=0). 순수 데이터 기반이라 렌더 여부와 독립 → 가상화 결합 시 middle row 렌더 안 되도 head span 계산 정상
- **v2 렌더 방식** (div/absolute 배치용, v1 의 HTML rowSpan 대체):
  - `span === 0` (middle) 셀: flex 폭 유지 placeholder. 컨텐츠/border 없음. 다른 셀 정렬 유지
  - `span > 1` (head) 셀: 셀 outer 는 row height 유지, 컨텐츠를 `absolute top-0 height=spanHeight z-[5] bgClass border-b` 로 세로 확장. 이후 middle rows 의 병합 영역을 opaque 하게 커버 (border 자동 가려짐)
- **row border 처리**: SDS-43 의 row inner border-b 유지 (SDS-37 이 처음엔 middle row 통째 스킵 했다가 v1 반사적 이식이 부작용이었음을 발견 → 원복). 병합 영역은 head 셀 wrapper (z-[5], opaque bg) 가 자동으로 row border 를 시각 커버 → non-merged 셀 사이엔 정상 border, 병합 영역엔 border 없음. v1 look 재현하면서 SDS-43 의 empty 우측 border 도 유지
- **rowReorderable 자동 OFF**: rowGrouping 활성 시 강제 비활성 (v1 정책 동일. 병합 셀 드래그 시 레이아웃 붕괴)
- **그룹 hover**: middle row hover 시에도 head 셀 highlight. Parent 에서 `hoveredRowIndex` 계산 → `getGroupHovered(rowIndex, colKey)` 로 head 셀이 자기 그룹의 어느 row 라도 hover 중인지 판정 (v1 `groupCellHovered` 이식)
- **가상화 (SDS-38) 대비**: middle row 렌더 안 돼도 head 셀만 렌더되면 spanHeight 계산 (positions prefix sum 활용) + wrapper 세로 확장으로 병합 셀 그려짐. SDS-38 에서 "그룹 head overscan" 만 추가하면 조합 완성 예정
- 스토리: `RowGrouping` (기본), `RowGroupingWithSelection` (+ selectable + rowActions)

### SDS-38 — 가상화 (@tanstack/react-virtual) + WAI-ARIA + 리렌더 최적화

**가상화**:
- v1 이 이미 쓰던 `@tanstack/react-virtual` v3 재사용
- Prop: `virtual?: boolean | VirtualConfig` (기본 OFF, opt-in). `VirtualConfig = { overscan?, estimateSize? }`
- `useTableVirtualizer` 훅 — virtualizer 인스턴스 + `renderIndices` (viewport + overscan + rowGrouping 조합 시 그룹 head 강제 추가) + `getItemStart` / `getItemSize` 노출
- **rowGrouping 조합**: 각 visible middle row 의 head 인덱스를 `renderIndices` 에 추가로 포함 → 병합 셀 시각 유지. 그룹이 overscan 초과 크기면 시각 잘림 가능성 있으나 대부분 케이스 커버
- **가상화 OFF 시 side effect 없음**: `getScrollElement: () => (isVirtual ? scrollContainerRef.current : null)` — null 반환하면 virtualizer 가 scroll listener 부착 안 함 → 가로 스크롤 등 무관 이벤트로 인한 parent 리렌더 완전 방지
- Row 에 `measureRef={virtualizer.measureElement}` + `dataIndex={i}` 전달 → 자동 높이 측정 + virtualizer 정합

**ARIA grid 접근성**:
- `aria-rowindex` — 각 row (header 포함, 1-indexed). 가상화 시에도 데이터 인덱스 기준으로 부여 → 스크린리더가 "N번째 row" 정확히 인식
- `aria-colcount` — 기존엔 데이터 컬럼 수만 셌음. 컨트롤 셀 (drag/checkbox/expand/delete) 포함으로 수정 → 표준 grid 패턴 준수

**리렌더 최적화** (v1 대비 부재했던 것들 fix):
- **`SortableContext` 조건부 렌더**: `rowReorderable` 활성 시에만 감쌈. 항상 감싸면 useSortable 이 context subscribe 해서 모든 parent 리렌더마다 모든 row 리렌더 (React.memo 로 못 막음 — memo 는 props 만 비교, context 변경은 별개)
- **사용자 콜백 `useStableCallback` 흡수** (13개): 사용처가 inline arrow/object 로 넘겨도 라이브러리 내부에서 ref 로 흡수 → row memo 무효화 방지. v1 의 useStableCallback / useStableObject 유틸을 v2 로 복사
- **useRowSelection/useRowExpansion 내부 state 를 ref 로 흡수**: `toggleRow`/`toggleAll` 콜백이 선택/확장 상태 변경마다 rebind 되던 것 방지 (deps 에 state 안 걸리게)
- **useFilter 내부 state 를 ref 로 흡수**: `setColumnFilter`/`getColumnFilter`/`hasActiveFilter` 필터 변경마다 rebind 되던 것 방지 → 필터 클릭 시 다른 컬럼 필터 셀 리렌더 X
- **Row bg 를 CSS 기반**: `bg-white hover:bg-slate-100 group-hover:bg-slate-100` — state 무관. 이전엔 `isHovered` state 로 하다 hover 마다 parent 리렌더 유발했음. Non-grouped 는 `onHover` 도 조건부 미전달 → hover 시 리렌더 0회
- **Pinned shadow → CSS `group-data-[scrolled-*=true]/scroll:` + imperative DOM data-attr**: 가로 스크롤 시 React state 업데이트 없이 CSS 로 shadow 반응. 이전엔 `scrolledLeft`/`scrolledRight` state → 가로 스크롤마다 모든 row 리렌더
- **파생 배열 useMemo 로 안정화**: `leftPinnedCols`/`rightPinnedCols`/`lastLeftPinnedIdx`/`firstRightPinnedIdx` 를 useMemo 로 감싸서 렌더마다 새 배열 생성 방지
- **Separator/SortArrow/FilterCell React.memo + stable callback API**: 인라인 arrow 로 넘어가던 `onResizeStart`/`onChange` 를 (parent 의 stable useCallback ref) + (per-cell key: column/columnKey) 조합으로 리팩터. 각 memo'd 컴포넌트가 자기 관련 상태 변경 시에만 리렌더
- **`getRowSpanHeight` positions 를 ref 로 흡수**: 가상화 스크롤 중 새 row 측정되면 heights → positions 자주 변경됨. 콜백을 positions dep 로 하면 매번 새 ref 로 rebind → viewport 안 row 도 리렌더. ref 로 흡수 시 값은 호출 시 최신
- **`getGroupHovered`** 는 `hoveredRowIndex` dep 유지 (unstable): grouped 케이스는 hover 시 head 셀 색 반영 위해 리렌더 필요. Non-grouped 는 어차피 hoveredId state 업데이트 없어 리렌더 0회. 대용량 grouped 는 UX 부적합 (tree grouping 다른 방식 써야) — 태생적으로 소량 데이터라 all 리렌더 허용

**실측 결과** (Console 로그 기준):
- Idle / hover / 필터 아이콘 클릭 (팝오버 열기): parent 리렌더 0회
- 옵션 클릭 (filter state 변경): parent 리렌더 1회
- 체크박스 클릭: 클릭한 row 만 리렌더
- 필터 클릭: 해당 컬럼 filter cell 만 리렌더, 다른 컬럼 O, body row X
- 가로 스크롤: 0 리렌더 (CSS 만) — **단, 가상화 OFF 일 때만. 아래 정정 참고**
- 세로 스크롤 (가상화): 새로 진입하는 row 만 리렌더

> **정정 (SDS-39, 2026-08-05)**: 위 "가로 스크롤 0 리렌더"는 **가상화 OFF 기준**이었다.
> 가상화 ON 이면 스크롤 리스너가 붙고, 이 리스너는 **축을 구분하지 못한다.**
> 가로 스크롤에도 `isScrolling` 이 토글되어 parent 리렌더가 발생한다.
> 행은 `React.memo` 로 방어되지만 **헤더는 인라인 JSX 라 매번 다시 그려진다.**
> 상세는 아래 "알려진 제약 — 가상화 시 헤더 리렌더" 참고.

**참고 함정**: React DevTools Profiler 는 recording 중 발생한 모든 React commit 을 aggregate 로 보여줌 (Radix Popover 내부 컴포넌트들 + Storybook Strict Mode 이중 렌더 등 포함) → 실제 우리 컴포넌트 리렌더보다 훨씬 많이 보임. 정확한 검증은 console.log 실측.

- 스토리: `Virtualized` (10k rows), `VirtualizedWithConfig` (overscan/estimateSize 커스텀), `VirtualizedWithRowGrouping` (500 rows × 100 그룹)

## Public API (`index.ts`)

```ts
export { DataTableV2 } from "./data-table-v2"
export type {
  DataTableV2Column,
  DataTableV2Props,
  EditComponentProps,
} from "./types"
```

`HeaderGroup`, `SortState`, `ValidationResult`, `RowActionsConfig` 등은 **v1 과 이름이 같아서** star export 로는 내보낼 수 없다.
대신 `src/components/table/index.ts` 에서 **`DataTableV2` 접두사를 붙여** 내보낸다
(`DataTableV2SortState`, `DataTableV2HeaderGroup`, `DataTableV2FilterConfig` 등).

처음에는 아예 내보내지 않고 "필요하면 하위 경로로 직접 import" 로 두었는데,
CMS 이관 때 문제가 됐다 (2026-08-09). 사용처가 `stl-design-system/dist/components/table/data-table-v2/types`
같은 내부 경로를 파고들어야 했고, 실제로는 v1 타입을 그대로 쓰다가 빌드가 깨졌다.

`src/components/table/index.ts` 에서도 v2 는 명시적 named export:

```ts
// v1 은 star export
export * from './data-table'
// v2 는 v1 과 이름 겹치는 타입 제외하고 명시적으로
export { DataTableV2 } from './data-table-v2'
export type { DataTableV2Column, DataTableV2Props } from './data-table-v2'
```

## 아키텍처 결정

### 왜 `<div>` 기반인가

v1 은 `<table>` 이라 아래 근본 문제가 있었음:

- pinned 컬럼: `position: sticky` on `<td>` 는 브라우저별 깜빡임/누락 이슈 (Chromium 특히 심함)
- 헤더 확장 (2행 이상, 필터/메뉴 추가): rowSpan/colSpan 조합이 복잡, 스타일링 제약
- 가상화: `<tbody>` 는 `position: relative` 가 안정적으로 안 먹음 → 절대좌표 배치 불가

`<div role="grid">` 로 재설계하면:
- pinned = sticky div (안정적)
- 헤더 = 자유롭게 flex/grid 조합
- 가상화 = `absolute + translateY` 로 자연스럽게 windowing

### 왜 절대좌표 배치인가

행 각각을 `position: absolute` + `top` 으로 배치한다.

**초기에는 `transform: translate3d` 였다가 두 번 바뀌었다.**

| 시점 | 방식 | 바꾼 이유 |
|---|---|---|
| SDS-29 | `transform` | compositor layer 처리로 스크롤 중 리페인트 최소화 |
| SDS-36 | `top` (prop) | dnd-kit 이 드래그 요소에 자기 transform 을 적용 → 충돌 |
| SDS-49 | `top` (DOM 직접) | top 을 prop 으로 넘기면 한 행의 높이 변화가 아래 행 전부를 리렌더 |

현재는 `useLayoutEffect` 에서 DOM 에 직접 쓴다.

각 행 높이는 `useLayoutEffect + ResizeObserver` 로 실측 → `heights` Map 에 저장 → `positions` 배열 재계산 (누적 합계). 초기 높이는 `estimateRowHeight` (기본 40px) 사용.

### React.memo + 제네릭 함수 컴포넌트

`DataTableV2Row` 는 `React.memo(DataTableV2RowInner)` 로 감쌌는데, 이 과정에서 제네릭이 소실됨. `as typeof DataTableV2RowInner` cast 로는 props 개수/복잡도에 따라 TS 가 제네릭을 constraint 로 fallback 시키는 경우가 있음.

**해결책**: 명시적 제네릭 함수 타입 별칭:

```ts
type DataTableV2RowComponent = <T extends { id: string | number }>(
  props: DataTableV2RowProps<T>
) => React.ReactElement | null

export const DataTableV2Row = React.memo(DataTableV2RowInner) as DataTableV2RowComponent
```

**추가 주의**: Row 컴포넌트에 새 required prop 을 추가하면, 콜사이트 (`data-table-v2.tsx` 내부 `<DataTableV2Row ...>`) 에 반드시 함께 넘겨야 함. 안 넘기면 TS 가 T 를 base constraint `{ id: string | number }` 로 fix 하고 다른 props 도 줄줄이 타입 에러 뿜음.

## 주요 상수

`data-table-v2.tsx` 상단:

| 상수 | 값 | 용도 |
|------|----|----|
| `DEFAULT_ESTIMATE` | 40 | 행 초기 높이 (px) |
| `DEFAULT_COL_WIDTH` | 120 | width 미지정 컬럼 최소 필요폭 |
| `CHECKBOX_COL_WIDTH` | 40 | 체크박스 컬럼 폭 |
| `EXPAND_COL_WIDTH` | 40 | 확장 컬럼 폭 |
| `ROW_ACTIONS_WIDTH` | 40 | 행 삭제 아이콘 컬럼 폭 |
| `SKELETON_ROW_COUNT` | 5 | 스켈레톤 모드 행 개수 |

## 좌측 컨트롤 컬럼 순서 (왼쪽부터)

1. 체크박스 (selectable)
2. 확장 (expandable)
3. 행 삭제 (showRowDelete)
4. 데이터 컬럼들
5. right pinned 데이터 컬럼들

각 컨트롤 컬럼은 sticky left 위치. `computePinnedOffsets(columns, leftBaseOffset)` 의 `leftBaseOffset` 은 위 컨트롤 컬럼 폭의 합 (`controlColsWidth`) 이며, 이를 통해 pinned 데이터 컬럼의 sticky offset 이 자동 정렬됨.

`rowActionsColLeftOffset` = `(selectable ? CHECKBOX_COL_WIDTH : 0) + (expandable ? EXPAND_COL_WIDTH : 0)` — 삭제 컬럼의 left 값.

## Loading / Empty 시각 정렬

가로 스크롤 시 로딩/빈 메시지가 스크롤에 따라 이동하지 않고 **가시 영역 중앙에 유지** 되어야 함 (v1 초기에 이 문제가 있어서 별도 수정한 이력 있음).

구현:
- `scrollRef.current.clientWidth` 를 `visibleWidth` state 로 추적 (ResizeObserver + scroll 이벤트)
- 로딩/빈 컨테이너에 `sticky left-0 + width: visibleWidth` 적용
- 스크롤 위치와 무관하게 항상 가시 영역 안에 정렬됨

**skeleton 은 예외**: 실제 데이터 행처럼 컬럼 폭에 맞춰 렌더되므로 sticky 처리 안 함. 스크롤하면 스크롤과 함께 이동.

## 주의사항 / Gotcha

### 1. v1/v2 타입 이름 충돌 → `DataTableV2` 접두사로 export
`HeaderGroup`, `SortState`, `ValidationResult`, `RowActionsConfig`, `EditComponentProps` 는 v1/v2 양쪽에 존재.
`src/components/table/index.ts` 에서 `SortState as DataTableV2SortState` 식으로 접두사를 붙여 내보낸다.

**`SortState` 는 이름만 겹치는 게 아니라 정의가 다르다.**

| | v1 | v2 |
|---|---|---|
| `column` | `keyof T \| null` | `keyof T` |

v1 은 "정렬 없음"을 `column: null` 로 표현했고, v2 는 해제 시 배열에서 항목을 뺀다.
그래서 사용처가 v1 의 `SortState` 를 그대로 v2 에 넘기면 타입 에러가 난다.
CMS 이관 중 실제로 발생했으며, **`tsc --noEmit` 은 통과하고 `npm run build` 에서만 잡혔다.**

### 2. React.memo Row 에 prop 추가 시
반드시 콜사이트에 함께 넘겨야 함. 안 넘기면 TS 가 T 를 constraint 로 fallback 하고 여러 prop 타입 에러가 폭포수처럼 나옴 → 원인을 찾기 어려울 수 있음.

### 3. dist/ 는 커밋 대상
Git URL 직접 설치 방식이라 `dist/` 도 저장소에 커밋됨 (`.gitignore` 에서 제외됨). 배포 전 반드시 `npm run build` 실행 후 dist 함께 커밋.

### 4. 커밋 메시지에 AI 서명 금지
`Co-Authored-By: Claude ...`, `🤖 Generated with ...` 등 넣지 않음. 사용자가 명시적으로 요청한 경우만 예외.

### 5. Skeleton 폭 계산 방식
`<Skeleton width="70%" height={16} />` — 컬럼 폭의 70% (v1 은 `min(col.width * 0.6, 150)` px 고정값이었지만, v2 는 flex 컬럼에서 스켈레톤이 너무 짧게 나오는 문제 있어서 % 로 변경). 계산 특별한 근거는 없고 시각적으로 "글자보다 조금 짧게" 관행.

### 6. 행 액션 위치는 왼쪽 (v1 일관성)
- v1: showRowDelete 셀은 checkbox/expand 뒤, 데이터 컬럼 앞 (왼쪽)
- v2 초기 구현은 오른쪽으로 갔다가 v1 일관성 관점에서 왼쪽으로 재정렬 (SDS-35 fix)
- 하단 add row 버튼도 같은 위치 (왼쪽) 에 배치

### 7. loading + 데이터 없음 조합
`loading=true` 이면 emptyMessage 대신 로딩 UI 표시. 데이터가 있어도 로딩 중이면 데이터 안 보임 (스켈레톤 or splash).

### 8. columns 는 안정 참조 — **컬럼을 만드는 입력값까지**
매 render 마다 새 배열/새 컬럼 객체를 넘기면 memoization 이 무의미해짐. 사용처에서 `useMemo` 또는 상수 정의.

컬럼을 `useMemo` 로 감쌌어도 **그 dep 이 불안정하면 소용없다.** 필터 옵션 같은 걸 인라인
객체로 넘기면 체크박스 하나에 모든 행이 리렌더된다 (CMS 이관 중 실제 발생).

### 9. `TableContainer` 안에 넣을 때는 `bordered={false}`
`bordered` 기본값이 `true` 라 테두리가 두 겹으로 그려진다.

## ~~알려진 제약~~ 해결됨 — 가상화 시 헤더 리렌더 (SDS-47)

**발견**: SDS-39 회귀 검증 중 `KitchenSink` 스토리에서. (2026-08-05)
**티켓**: SDS-47 (SDS-28 하위). **2026-08-06 완료** — 아래는 원인 분석 기록.

### 증상

`virtual` 이 켜져 있으면 스크롤할 때 헤더 전체가 리렌더된다.

| 스크롤 | notify 트리거 | 헤더 리렌더 빈도 |
|---|---|---|
| 가로 | `isScrolling` 토글만 | 제스처당 2회 (시작 시 / 멈추고 150ms 뒤) |
| 세로 | `isScrolling` + `range.startIndex/endIndex` 변경 | **행 하나 지나갈 때마다** |

`HeaderGroups` / `ColumnFilterWithSort` 등 가상화 OFF 스토리는 리스너가 아예 안 붙어서 증상이 없다.
KitchenSink 가 `virtual` + 가로 오버플로를 동시에 가진 첫 스토리라 여기서 처음 드러났다.

### 원인

`@tanstack/virtual-core` 3.16 의 스크롤 리스너는 **축을 구분하지 못한다.**
가로로 밀어도 발화하고, `scrollTop` 이 그대로여도 콜백을 부른다.
콜백 안에서 `isScrolling = true` 가 되고, `maybeNotify` 가
`[isScrolling, range.startIndex, range.endIndex]` 로 메모돼 있어 이 값이 바뀌는 순간 notify 가 나간다.

→ DataTableV2 리렌더 → 행은 `React.memo` 로 살아남지만 **헤더는 인라인 JSX 라 전부 다시 그려진다.**

세로 스크롤에서 parent 리렌더 자체는 **불가피하다** (새 행을 그려야 하니까).
불가피하지 않은 건 헤더가 거기 딸려간다는 점이다.

### AG Grid 는 왜 안 깜빡이나

헤더와 바디가 **별개의 DOM 컨테이너 + 별개의 렌더 트리**다.
헤더는 자체 컨트롤러가 컬럼 상태(순서/폭/정렬/필터) 변경 시에만 갱신하고,
가로 스크롤은 바디의 `scrollLeft` 를 읽어 헤더에 imperative 하게 transform 을 먹여 동기화한다.
바디의 가상화 상태가 헤더 렌더에 도달할 경로가 없다.

우리 v2 는 헤더·바디가 하나의 스크롤 컨테이너, 하나의 React 컴포넌트 안에 있다.
**즉 "가상화면 어쩔 수 없다"가 아니라 구조 차이다.**

### v1 대비

**v2 가 이미 v1 보다 낫다. 신규 회귀가 아니다.**

```ts
// v1 (src/components/table/data-table/hooks/use-table-virtualizer.ts)
getScrollElement: () => scrollContainerRef.current,                       // 무조건 부착
// v2
getScrollElement: () => (isVirtual ? scrollContainerRef.current : null),  // 가상화 시에만
```

v1 은 가상화 여부와 무관하게 리스너를 붙이므로, 현재 CMS 의 모든 테이블이
가로/세로 아무 스크롤에나 헤더를 리렌더하고 있다.

### 실제 원인은 두 겹이었다 (2026-08-06 작업 기록)

헤더를 memo 로 분리한 뒤에도 `KitchenSink` 는 스크롤 시 계속 깜빡였다.
`Virtualized` 스토리는 멀쩡했다. 차이는 `columnReorderable` 이었다.

헤더 컴포넌트는 리렌더되지 않고 있었고, 깜빡인 것은 **그 안의 드래그 가능한 헤더 셀**이었다.

```js
// @dnd-kit/core — 옵션 객체를 dep 으로 메모한다
function useSensor(sensor, options) {
  return useMemo(() => ({ sensor, options: options ?? {} }), [sensor, options])
}
```

우리가 인라인 객체 리터럴을 넘기고 있었다.

```
인라인 객체 → sensors 새 배열 → activators 재계산
  → DndContext internal context 값 변경
  → useSortable 구독자 전부 리렌더 (React.memo 로 못 막음)
```

`POINTER_SENSOR_OPTIONS` 를 모듈 상수로 빼서 해결.
**부수 효과**: `rowReorderable` 을 쓰는 테이블의 행 리렌더도 함께 사라진다.

**교훈**: dnd-kit 에 넘기는 옵션 객체·배열은 전부 모듈 상수나 `useMemo` 로.
memo 를 아무리 잘 걸어도 context 구독은 뚫린다.

### 해결안 (SDS-47)

| 안 | 내용 | 판정 |
|---|---|---|
| ① `observeElementOffset` 교체 | `useVirtualizer` 옵션으로 덮어쓰기 가능 (기본값 뒤 `...options` 스프레드). `scrollTop` 이 실제로 바뀐 경우에만 콜백 | **부분 해결.** 가로만 막고 세로는 그대로. 게다가 라이브러리 내부 재구현이라 버전업 시 깨질 위험 |
| ② 헤더 행을 독립 렌더 단위로 분리 | memo 컴포넌트 추출 또는 `useMemo` 로 element 고정 | **채택.** 가로/세로 둘 다 해결. AG Grid 와 같은 지점에 도달 |

②의 난점: 헤더가 아래 전부를 클로저로 물고 있어서 `renderHeaderCell` 부터 안정화해야 한다.

| 의존 | 변경 시점 |
|---|---|
| `columns` (리사이즈·재정렬 반영본) | 리사이즈 / 재정렬 |
| 정렬 상태 (`getSortInfo`) | 헤더 클릭 |
| 필터 상태 (`getColumnFilter`, `hasActiveFilter`) | 필터 조작 |
| `resizingKey`, `handleResizeStart` | 리사이즈 중 |
| `leftOffsets` / `rightOffsets` | 컬럼 폭 변화 |
| `headerGroupCells` | 위와 연동 |
| 전체선택 체크박스 | 행 선택 |
| 확장 전체펼치기 | 확장 |

**위험**: dep 을 빠뜨리면 화면이 깨지는 게 아니라 *필터를 눌렀는데 헤더가 안 바뀌는* 식으로
조용히 틀어진다. 테스트 565개는 스토리 렌더와 a11y 만 잡고 이런 stale 상태는 **못 잡는다.**
정렬·필터·리사이즈·재정렬·선택·확장을 전부 수동 재검증해야 한다.

### 왜 별도 티켓인가

SDS-39 는 회귀 검증 티켓이라 성격이 다르다. 검증 중에 헤더 구조를 리팩터하면
"무엇을 검증한 것인가"가 흐려진다. 코드 변경은 SDS-47 에서, 검증은 SDS-39 에서 한다.

v1 에도 있던 동작이라 이번 배포의 신규 회귀는 아니다. 다만 아래 이유로 이번 배포에 포함한다.

### 우선순위 — CMS 필터 이관보다 **먼저** 끝나야 함 (블로커)

처음엔 "여유될 때"로 봤으나, CMS 계획을 확인하고 판단이 바뀌었다.

**이번 CMS 작업 자체가 필터 이관이다.** 지시 사항은 "검색폼이 있는 모든 페이지의 테이블에
필터를 넣고, 검색폼의 필터 성격 검색은 전부 테이블로 옮길 것". 즉 SDS-47 을 미루면
이번 배포 직후 성능 문제로 다시 열게 된다.

`b2c-order` 는 CMS 최대 폭 테이블이고 (컬럼 **29개**, sticky 좌우, pageSize 기본 500 / 최대 1000,
현재 가상화 없음), `B2cOrderSearchForm` 의 필드 **11개**가 전부 컬럼 필터로 들어온다.

그러면 29컬럼 헤더 안에 **Radix Popover 트리거 11개**가 상주하고, 500~1000행이라 가상화도 필수다.
→ 세로 스크롤 중 행 하나 지나갈 때마다 이 헤더 전체가 리렌더된다.

### SDS-39 보다도 **먼저** 해야 한다

당초 `39 → 40 → 47` 로 잡았으나 뒤집었다.

SDS-47 은 정렬·필터·리사이즈·재정렬·선택·확장을 전부 수동 재검증해야 하는 변경이다.
회귀 검증을 먼저 끝내면 SDS-47 직후에 **같은 항목을 두 번 보게 된다.**
최종 코드로 한 번만 검증하는 게 맞다.

```
SDS-47 헤더 렌더 분리   ← 여기
   ↓
SDS-39 회귀 검증  (최종 코드로 한 번만)
   ↓
SDS-40 마이그레이션 가이드
   ↓
통합 브랜치 → main 머지 + npm run build + dist 커밋
   ↓
CMS: v2 전환 + 검색폼 → 컬럼 필터 이관 → 배포
```

**병행 가능**: SDS-47 작업 중에도 헤더와 무관한 항목은 검증할 수 있다.
셀 편집 / 행 재정렬 / 가상화 스크롤 / rowGrouping / Loading / EmptyData / RowActions /
main 반영분(사이드바·RefreshIcon·Radio). 헤더 관련 항목만 SDS-47 이후로 미룬다.

### 참고 — 지금 컬럼 필터가 없다면 비용은 작다

DOM 이 안 바뀌므로 (헤더 내용·폭 동일) React reconciliation 만 일어나고 layout/paint 는 없다.
필터 없는 헤더 셀은 텍스트 + 정렬 화살표뿐이라 29개여도 체감되지 않는다.
비용은 **컬럼 수에 선형 비례하고, Popover 를 쓰는 필터 셀이 지배적**이다.

측정법: Profiler recording → 가장 오래 걸린 커밋 선택 → flame graph 에서 헤더 self time 과
커밋 total duration 비교. 커밋 total 이 16ms 이하면 프레임은 안 떨어진다.

### 함께 발견 — 폭 지정 없는 컬럼이 그룹에 섞이면 어긋남

그룹 헤더 셀 폭은 `colMinNeeded` 로 **고정 px** 계산인데, 하위 헤더 셀은 `width` 가 없으면
`flex: 1 1 0` 으로 늘어난다. 그룹에 폭 미지정 컬럼이 섞이면 그룹과 하위 경계가 어긋난다.

현재 재현되는 스토리는 없다 (`HeaderGroups` / `KitchenSink` 모두 그룹 컬럼이 전부 고정폭).
고치려면 그룹 셀에 `flexGrow` = run 내 flex 컬럼 수, `flexBasis` = 고정폭 합을 주면 된다.
재현 스토리부터 만들어야 하므로 별도 티켓.

## 미해결 — 필터 팝오버 열 때 전 행 리렌더

**발견**: CMS 관리자 메뉴 이관 중 고객사관리에서. (2026-08-10)

### 증상

컬럼 헤더의 필터 아이콘을 **클릭해서 팝오버를 여는 것만으로** 전 행이 다시 그려진다.
값을 고르지 않아도 그렇다. (값 선택 시 리렌더는 정상 — 조회 조건이 바뀌어 새 데이터가 온다.)

| 사용처 | 재현 |
|---|---|
| CMS 고객사관리 (`admin/client`) | **재현됨** |
| CMS 상품 목록 (`goods`) | 재현 안 됨 |

둘 다 `virtual` + `selectable` + select 필터로 props 구성은 같다.
눈에 띄는 차이는 **컬럼 폭 구성**이다 — 고객사관리는 6개 중 5개가 고정 `width`,
상품 목록은 대부분 `minWidth`(가변).

### 확인한 것

- 팝오버 open 은 `DataTableV2FilterCell` 의 **로컬 state** 다. 행에 닿을 경로가 없어야 한다
- 행이 받는 props 중 폭과 얽힌 건 `visibleWidth` 뿐이고, 이건 **확장행 폭 계산 전용**이다.
  컨테이너 `clientWidth` 가 바뀌면 갱신되고 → 전 행이 다시 그려진다.
  고객사관리는 확장행이 없어 값이 쓰이지도 않는데 리렌더 트리거로만 작용한다
- DS `Popover` 는 `modal` 이 아니라 Radix 스크롤 락은 없다

### 가설 (미검증)

팝오버가 열리며 트리거 버튼 상태(`data-state=open`)가 바뀌고, 고정폭이라 여유가 없는
헤더 셀의 측정값이 흔들려 → 루트 리렌더 → 전 행. **확인 안 됐다.**

### 다음에 할 일

**DS 와 사용처 어느 쪽 원인인지부터 가른다.**

1. **DS 재현 스토리** — 고정폭 6컬럼 + select 필터 + `virtual` + `selectable`.
   행 렌더 횟수를 세고 팝오버를 열어본다. 여기서 재현되면 DS 문제다
2. **재현 안 되면 사용처를 본다** — CMS `admin/client` 에서 테이블에 넘기는 props 를
   하나씩 상품 목록과 맞춰가며 이분 탐색. 컬럼 폭부터 바꿔본다
3. DS 문제로 확정되면 **확장행이 없는 테이블에는 `visibleWidth` 를 내려보내지 않는 것**이
   1차 후보다 (`expandable ? visibleWidth : 0`). 값의 용도가 확장행뿐이라 부작용이 없다

**기능 문제는 아니다** — 필터·정렬·선택 모두 정상 동작한다. 성능/체감 이슈다.

## 스토리 목록 (`stories/DataTableV2.stories.tsx`) — 29개

- Basic
- Scrollable (maxHeight)
- VariableRowHeight
- Sortable / MultiSort
- HeaderGroups
- PinnedColumns
- Resizable / Reorderable / ResizableAndReorderable
  - Reorderable 은 sortable 컬럼 포함 (SDS-39 에서 제약 해제)
- Selectable
- OnRowClick
- RowClassName
- EditableCells (Select 커스텀 편집기 포함)
- Expandable
- Loading (splash / skeleton / 커스텀 loadingContent, splash 는 가로 스크롤 케이스)
- EmptyData (기본 메시지 / 커스텀 emptyMessage)
- RowActions (add + delete)
- RowReorderable / RowReorderableWithSelection
- ColumnFilterPresets (text/select/multiSelect/dateRange/numberRange) / ColumnFilterCustom / ColumnFilterWithSort
- RowGrouping / RowGroupingWithSelection
- Virtualized (10k) / VirtualizedWithConfig / VirtualizedWithRowGrouping
- **KitchenSink** (SDS-39 추가) — 전 기능 결합 데모. 5000행 가상화 + pinned 좌측 2컬럼
  + 헤더그룹 3개 + 필터 5종 + 셀 편집 + 리사이즈 + 컬럼 재정렬 + 선택 + multiSort.
  rowGrouping 만 제외 (가상화 조합 시 근사 지원이라 데모에서 뺌).
  AG Grid 데모와 같은 구성으로 호환성을 한 화면에서 확인하는 용도

**KitchenSink 로 확인된 제약 3가지**:
1. 그룹 헤더에는 필터를 넣을 수 없다 — `HeaderGroup<T>` 는 `header`/`columns`/`align` 뿐이고
   그룹 셀 렌더에 `FilterCell` 이 없다. 필터는 자식(컬럼) 헤더에만
2. `headerGroups` 는 pinned 아닌 컬럼에만 적용된다 (`middleCols = columns.filter((c) => !c.pinned)`)
3. 가상화 ON 이면 스크롤 시 헤더가 리렌더된다 → 위 "알려진 제약" 참고

## 남은 하위 티켓

| Ticket | 스코프 | 세부 |
|--------|-------|------|
| ~~SDS-47~~ **완료** | 헤더 렌더 분리 | 가상화 시 헤더가 스크롤마다 리렌더되는 문제. **이번 CMS 작업이 필터 이관이라 블로커.** 회귀 검증(39)보다도 먼저 — 안 그러면 같은 항목을 두 번 검증하게 됨. 상세는 위 "알려진 제약 — 가상화 시 헤더 리렌더" |
| **SDS-39 (다음 착수)** | 회귀 검증 | 모든 스토리 + 실제 사용처(CMS/LMS 등) 대상 회귀 점검. 크로스 브라우저 (Chrome/Firefox/Safari) 확인. 헤더 무관 항목은 SDS-47 과 병행 가능 |
| SDS-40 | 문서화 + 릴리즈 + 프론트팀 공유 | v1 → v2 마이그레이션 가이드, breaking change 정리, 슬랙/컨플루언스 공지 |
| [신규 필요] | 필터 팝오버 열 때 전 행 리렌더 | **원인 미확정 (DS / 사용처 양쪽 미배제).** 위 "미해결 — 필터 팝오버 열 때 전 행 리렌더" 참고. 이번 배포 대상 아님 |
| [신규 필요] | 그룹 헤더 flex 폭 대응 | 폭 미지정 컬럼이 헤더 그룹에 섞이면 경계 어긋남. 현재 재현 스토리 없음. 이번 배포 대상 아님 |

에픽 완료 후 통합 브랜치를 main 에 머지.

### 진행 순서: ~~47~~ → 39 → 40 → main 머지 → (CMS) v2 전환 + 필터 이관

- ~~**47 헤더 렌더 분리**~~ 완료 (2026-08-06)
- **39 회귀** (최종 코드로 한 번만. 헤더 무관 항목은 47 과 병행)
- **40 문서화 + 릴리즈**

> **CMS 이관은 릴리즈를 기다리지 않고 통합 브랜치를 물고 먼저 진행했다.**
> 2026-08-10 기준 **목록 페이지 25개 전부 완료** (필터 컬럼 이관 16, v2 교체만 9).
> 이관 중 드러난 DS 결함은 그때그때 이 브랜치에 반영했다 — 셀 레이아웃(v1 패리티),
> 헤더 그룹 폭, 고정 컬럼 배경, 필터 팝오버 위치/스크롤, 종속 필터 `emptyMessage`,
> 컬럼 필터 `searchable`, 가상화 `getItemKey` 등.
> 이관 기록은 CMS 저장소 `docs/dev/datatable-v2/README.md` 참고.
> 릴리즈 후 CMS 의존성을 main 으로 되돌려야 한다.

당초 `39 → 40 → 47` 이었으나 2026-08-05 에 뒤집었다. 이유는 위
"알려진 제약 — 가상화 시 헤더 리렌더" 의 우선순위 절 참고.

### SDS-38 rowGrouping + 가상화 조합 참고

업계 조사 결과: rowSpan 셀 병합 + 가상화 조합은 대부분 라이브러리 미지원. AG Grid/MUI/TanStack 은 tree grouping (expand/collapse) 방식이라 우회. Syncfusion 이 2025 년에야 row/column merging 추가. react-window 는 architectural limitation 으로 명시. v2 는 이 조합을 그룹 head overscan 확장 방식으로 근사 지원 (완벽하진 않지만 대부분 케이스 커버).

**v1 과 다른 점**: v1 은 rowGrouping/rowReorderable 이 활성화되면 가상화를 자동 OFF (dev 경고 출력) — 즉 조합을 명시적으로 포기. v2 는 처음부터 div/grid + top 배치로 설계된 이유가 이 조합을 풀기 위함이므로, 자동 OFF 방식은 채택하지 않는다. (SDS-36 rowReorderable / SDS-37 rowGrouping / SDS-38 가상화 모두 이 방식으로 구현 완료).

## 병행 이슈

**상용 그리드 도입 검토 (진행 중)**: AG Grid Enterprise 도입 검토가 병행 논의 중. 결정에 따라 v2 개발 방향이 바뀔 수 있음 — 예: v2 는 경량 테이블 포지션으로 유지, 대용량/엑셀 UX 케이스는 상용 그리드로 전환. 상세는 `HANDOFF-2026-08-03.md` 부록 참고.

## 관련 문서

- v1 개발 문서: `docs/dev/datatable-v2/DATA-TABLE-DEVELOPMENT.md`
- 가상화 에픽 (v1 대상): `docs/dev/datatable-v2/PLAN-datatable-virtualization.md`
- 프로젝트 전반: `docs/dev/PLAN.md`
- 버전 관리: `docs/dev/VERSION-MANAGEMENT.md`
- 프로젝트 지침: 저장소 루트의 `.claude/CLAUDE.md` (자동 로드)
