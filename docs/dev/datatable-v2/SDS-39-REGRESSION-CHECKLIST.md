# SDS-39 회귀 검증 체크리스트

DataTable v2 (SDS-28 epic) 통합 후 회귀 점검용. 2026-08-05 작성.

**검증 대상 커밋**: `db23c34` (`feat/SDS-39`, main 반영분 + v2 전체 흡수)

## ⚠️ 진행 순서 — SDS-47 이후에 헤더 항목을 본다

2026-08-05 에 순서를 `39 → 40 → 47` 에서 **`47 → 39 → 40`** 으로 뒤집었다.

SDS-47(헤더 렌더 분리)은 정렬·필터·리사이즈·재정렬·선택·확장을 전부 재검증해야 하는
변경이다. 회귀 검증을 먼저 끝내면 SDS-47 직후 같은 항목을 두 번 보게 된다.

**SDS-47 과 병행해도 되는 항목** (헤더 무관):

- 셀 편집 / 행 재정렬 / 가상화 스크롤 / rowGrouping
- Loading / EmptyData / RowActions / Expandable / OnRowClick / RowClassName
- main 반영분 (사이드바 210px, RefreshIcon, Radio size)
- 크로스 브라우저 중 사이드바 스크롤바 항목

**SDS-47 이후로 미룰 항목** (헤더 의존):

- 정렬 / 다중 정렬 / 헤더 그룹 / 컬럼 필터 / 리사이즈 / 컬럼 재정렬
- KitchenSink 전반
- 크로스 브라우저 중 pinned sticky 항목

## 자동 검증 (완료)

| 항목 | 결과 |
|---|---|
| `npx tsc -p tsconfig.build.json --noEmit` | 통과 (exit 0) |
| `npm run test:run` | **76 파일 / 564 테스트 통과** |
| `npm run build` | 성공, dist 갱신됨 |

> Vitest 는 Storybook 스토리를 Chromium 에서 자동 렌더하고 a11y 검증까지 수행한다.
> 다만 **클릭·드래그·편집 같은 인터랙션과 시각적 정합성은 잡지 못한다.** 아래 수동 확인 필요.

## 수동 확인 — DataTable v2 (28개 스토리)

### 기본 렌더

- [ ] `Basic` — 헤더/바디 정렬, 컬럼 폭
- [ ] `Scrollable` — maxHeight 내부 스크롤, 헤더 sticky 유지
- [ ] `VariableRowHeight` — 행 높이가 제각각일 때 겹침/빈틈 없음

### 정렬 / 헤더

- [ ] `Sortable` — asc → desc → 해제 순환
- [ ] `MultiSort` — **클릭할 때마다 정렬 누적** (Shift 아님), 우선순위 번호 표시
- [ ] `HeaderGroups` — 2행 헤더, 그룹 경계선

### 고정 / 리사이즈 / 재정렬

- [ ] `PinnedColumns` — 가로 스크롤 시 좌우 고정, 경계 shadow
- [ ] `Resizable` — 드래그로 폭 변경, **최소폭 도달 후 계속 드래그해도 리렌더 멈춤** (SDS-39 수정)
- [ ] `Reorderable` — **컬럼 드래그 중 바디 행이 리렌더되지 않음** (SDS-39 수정)
- [ ] `ResizableAndReorderable` — 두 기능 동시

### 선택 / 클릭 / 확장

- [ ] `Selectable` — 개별/전체 선택, Shift+클릭 범위 선택
- [ ] `OnRowClick` — 행 클릭 콜백. 체크박스/버튼 클릭 시엔 발화 안 함
- [ ] `RowClassName` — 행별 클래스 적용
- [ ] `Expandable` — 확장/축소, 전체 펼치기

### 셀 편집 (SDS-39 에서 구조 변경 — 중점 확인)

- [ ] `EditableCells` 셀 클릭 → **아래 행들이 밀리지 않음** (편집기 높이 = 셀 높이 36px)
- [ ] 타이핑 → 헤더가 리렌더되지 않음
- [ ] Enter 저장 → **편집한 행만** 리렌더
- [ ] Escape → 원래 값 복원
- [ ] 역할(Select) 편집 → 드롭다운에서 옵션 선택 시 정상 저장 (`onChange`+`onComplete` 동일 tick)
- [ ] 역할(Select) 편집 → **드롭다운 열린 채 바깥 클릭** → 드롭다운 닫히고 편집 종료
- [ ] 이름(Input) 편집 → 바깥 클릭 → 저장 후 종료
- [ ] 점수에 `abc` / `200` → 에러 메시지 표시 + 편집 유지, 값 고치면 에러 해제
- [ ] 에러 시에만 행 높이가 늘어남 (의도된 동작)

### 행 액션 / 상태

- [ ] `RowActions` — 삭제 아이콘(행 왼쪽), 하단 추가 버튼
- [ ] `Loading` — splash / skeleton / 커스텀. **가로 스크롤해도 가시 영역 중앙 유지**
- [ ] `EmptyData` — 기본 메시지 / 커스텀

### 행 재정렬 (SDS-39 에서 `useSortable` 위치 이동 — 중점 확인)

- [ ] `RowReorderable` — 핸들 드래그로 순서 변경, 드롭 시 반영
- [ ] `RowReorderableWithSelection` — 선택 상태 유지된 채 재정렬

### 필터

- [ ] `ColumnFilterPresets` — text / select / multiSelect / dateRange / numberRange 5종
- [ ] `ColumnFilterCustom` — 커스텀 컴포넌트
- [ ] `ColumnFilterWithSort` — 정렬 + 필터 동시
- [ ] 팝오버 바깥 클릭 / Esc 로 닫힘, 활성 필터 도트 표시

### 그룹핑 / 가상화

- [ ] `RowGrouping` — 셀 병합, 그룹 hover 시 head 셀 함께 highlight
- [ ] `RowGroupingWithSelection` — 병합 + 선택 + rowActions
- [ ] `Virtualized` (10k rows) — 스크롤 부드러움, 행 겹침 없음
- [ ] `VirtualizedWithConfig` — overscan / estimateSize 커스텀
- [ ] `VirtualizedWithRowGrouping` — 스크롤 중 병합 셀 유지

## 수동 확인 — main 반영분 (오늘 배포)

- [ ] `Layout` — 사이드바 폭 210px, 메뉴 텍스트 안 잘림
- [ ] 사이드바 스크롤바 — 우측 끝에서 4px, 두께 4px, **hover 시에만 노출**
- [ ] 접기/펴기 화살표 방향 (펼침 ◀ / 접힘 ▶)
- [ ] 접힘(88px) 상태 로고 중앙 정렬
- [ ] `Icons` — RefreshIcon 렌더
- [ ] `RadioGroup` → `Sizes` — sm/md/lg, 기본이 md(16px)

## 크로스 브라우저

코드상 브라우저별 차이가 실제로 발생하는 지점만 추렸다.

### Firefox

- [ ] **사이드바 스크롤바** — `::-webkit-scrollbar` 계열이 전부 무시된다.
      Firefox 는 `scrollbar-width: thin` + `scrollbar-color` 만 적용되므로
      **두께 4px / 4px 여백 / 완전 둥근 모서리가 재현되지 않는다.** hover 시 색 변화만 동작.
      → 허용 가능한 저하인지 판단 필요 (막대가 조금 두껍게 보임)
- [ ] 테이블 가로/세로 스크롤바도 동일하게 Firefox 기본 형태
- [ ] pinned 컬럼 sticky 동작

### Safari

- [ ] **pinned 컬럼** (`position: sticky` 34곳) — Safari 는 sticky 관련 렌더 이슈가 잦다.
      가로 스크롤 시 깜빡임/어긋남 없는지 중점 확인
- [ ] **가상화 스크롤** — 관성 스크롤(momentum)에서 행 위치 어긋남 없는지
- [ ] 셀 편집 시 Input autofocus 동작
- [ ] `background-clip: padding-box` 스크롤바 thumb 여백 (webkit 계열이므로 동작해야 함)

### Chrome

- [ ] 기준 브라우저. 위 전 항목

## 실사용처 확인 (CMS)

- [ ] 패키지 재설치 후 사이드바 폭 210px 반영, 하드코딩된 폭 없는지
- [ ] 라디오 크기 변경(12→16px) 영향 확인
- [ ] 검색폼 초기화 버튼 RefreshIcon 교체 (CMS 작업)
- [ ] v2 를 사용하는 페이지가 있다면 위 v2 항목 재확인

## 알려진 동작 (회귀 아님 — 체크 시 오판 주의)

### 가상화 ON 시 헤더 리렌더

`KitchenSink` 처럼 `virtual` 이 켜진 스토리는 **가로/세로 스크롤 시 헤더가 리렌더된다.**
Profiler 하이라이트에서만 보이고 DOM 변화·레이아웃 변화는 없다.

원인은 `@tanstack/react-virtual` 의 스크롤 리스너가 축을 구분하지 못하는 것.
**v1 은 가상화 여부와 무관하게 리스너를 붙이므로 v2 가 오히려 개선된 상태다. 신규 회귀가 아니다.**

**SDS-47** 로 분리했으며, **CMS 검색폼 → 컬럼 필터 이관보다 먼저** 끝내야 한다.
상세: `DATA-TABLE-V2-DEVELOPMENT.md` → "알려진 제약 — 가상화 시 헤더 리렌더 (SDS-47)"

### 그룹 헤더에 폭 미지정 컬럼이 섞이면 경계 어긋남

현재 재현되는 스토리 없음 (`HeaderGroups` / `KitchenSink` 모두 그룹 컬럼이 고정폭). 별도 티켓.

## SDS-39 에서 수정한 것 (재검증 필요)

- [ ] **sortable 컬럼 재정렬 허용** — `reorderableIds` / `isDraggable` 에서 `!c.sortable` 제거.
      드래그는 좌측 전용 핸들, 정렬은 헤더 클릭으로 분리돼 충돌 없음.
      `Reorderable` 스토리의 이름/점수 컬럼에 `sortable: true` 추가함
  - [ ] 헤더 텍스트 클릭 → 정렬만 (순서 안 바뀜)
  - [ ] 핸들 드래그 → 재정렬만 (정렬 안 걸림). **드래그 놓은 직후 정렬이 딸려 걸리지 않는지**
  - [ ] `aria-sort` 유지 (`DataTableV2SortableHeaderCell` 에 `ariaSort` prop 추가함)
- [ ] **헤더 그룹 스팬을 run 기반으로 재계산** — 재정렬로 인접성이 깨져도 그룹이 사라지거나
      경계가 어긋나지 않음. 그룹이 갈라지면 헤더도 갈라져 각각 그려짐 (AG Grid 와 동일)
  - [ ] `KitchenSink` 에서 상품 하위(`상품명`/`수량`)를 금액 사이로 이동 → 상품 그룹 유지,
        옮긴 컬럼 위에 `상품` 그룹 헤더가 하나 더 생김
  - [ ] **리사이즈로 폭을 크게 바꾼 뒤 이동** → 그룹 경계와 하위 헤더 경계 일치
  - [ ] 원래 자리로 되돌리면 그룹이 다시 하나로 합쳐짐
  - [x] `KitchenSink` 에서 확인 완료 (2026-08-05) — 그룹이 갈라져 각각 그려짐
  - [ ] `HeaderGroups` 스토리 (재정렬 없는 기본 케이스) 변화 없음
- [ ] **그룹 헤더 구분선을 그룹 경계 기준으로 변경** — 기존엔 그룹 셀 우측에만 넣고
      마지막 그룹은 생략했다. 이제 그룹의 **시작 경계에도** 구분선이 들어간다
      (`DataTableV2ColumnSeparator` 에 `side="left"` 추가)
  - [ ] 비그룹 컬럼 뒤에 그룹이 시작될 때 그룹 **왼쪽**에 구분선
  - [ ] 그룹끼리 붙어 있을 때 구분선이 **한 줄만** (좌/우 중복 아님)
  - [ ] 그룹 뒤에 비그룹 컬럼이 올 때 그룹 **오른쪽**에 구분선
  - [ ] 행 맨 앞/맨 끝에서는 테이블 테두리와 겹치는 구분선이 생기지 않음
  - [x] 선 위치 확인 완료 (2026-08-05)
  - [ ] `HeaderGroups` 스토리 (pinned/컨트롤 컬럼 없음) 에서 첫 그룹 왼쪽 선 없음
- [ ] **자동 스크롤을 드래그 축에 맞춤** — dnd-kit 기본 threshold 가 `{x:0.2, y:0.2}` 라
      컬럼을 살짝 위로 당기기만 해도 바디가 세로 스크롤됐다.
      끌고 있는 대상에 따라 컬럼=가로만 / 행=세로만 스크롤하도록 변경
  - [ ] `Reorderable` — 컬럼을 헤더 위쪽으로 당겨도 **바디가 세로 스크롤되지 않음**
  - [ ] `KitchenSink` — 컬럼을 좌/우 끝으로 끌면 **가로 스크롤은 정상 동작**
  - [ ] `RowReorderable` — 행을 위/아래 끝으로 끌면 **세로 스크롤 정상 동작**
  - [ ] 드래그 도중 Esc 로 취소해도 상태가 남지 않음 (`onDragCancel`)

## 발견 사항 기록

| 항목 | 브라우저 | 증상 | 처리 |
|---|---|---|---|
| | | | |
