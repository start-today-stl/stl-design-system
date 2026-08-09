# DataTable 개발 진행 문서

이 문서는 DataTable 컴포넌트 개발 진행 상황을 추적합니다.

## 컴포넌트 구조

```
DataTable 관련 컴포넌트
├── table.tsx           # 기본 빌딩 블록 (Table, TableRow, TableCell 등)
├── data-table.tsx      # 상위 컴포넌트 (columns/data 패턴)
├── table-toolbar.tsx   # 툴바 (카운트, 액션 버튼)
└── pagination.tsx      # 페이지네이션, 페이지 사이즈 선택
```

## 기능 현황

### 완료된 기능 ✅

| 기능 | 파일 | 설명 |
|------|------|------|
| 기본 테이블 | `table.tsx` | Table, TableHeader, TableBody, TableRow, TableHead, TableCell |
| 정렬 가능 헤더 | `table.tsx` | TableSortableHead (asc → desc → null 순환) |
| DataTable | `data-table.tsx` | columns/data 패턴, 선택, 정렬 통합 |
| 체크박스 선택 | `data-table.tsx` | 전체 선택, 개별 선택, indeterminate 상태 |
| 커스텀 셀 렌더러 | `data-table.tsx` | column.cell로 커스텀 렌더링 |
| 페이지네이션 | `pagination.tsx` | Pagination, PageSizeSelector |
| 툴바 | `table-toolbar.tsx` | 총 개수, 선택 개수, 액션 버튼 영역 |
| 가로 스크롤 | `table.tsx` | overflow-auto 적용 |
| **Editable (셀 편집)** | `data-table.tsx` | editable, editComponent, onCellChange |
| **Editable Validation (셀 검증)** | `data-table.tsx` | validate 함수로 저장 전 검증 |
| **Expandable Row (확장 가능한 행)** | `data-table.tsx` | expandable, expandedRowRender, rowExpandable |
| **Sticky Column (고정 컬럼)** | `data-table.tsx` | sticky: "left" \| "right", 그림자 효과 |
| **컬럼 리사이징** | `data-table.tsx` | resizable, columnWidths, onColumnResize |
| **컬럼 순서 변경** | `data-table.tsx` | columnReorderable, columnOrder, onColumnReorder (@dnd-kit) |
| **로우 순서 변경** | `data-table.tsx` | rowReorderable, onRowReorder (@dnd-kit) |

### 추가 예정 기능 🔧

#### 1. ~~Editable (셀 편집)~~ ✅ 완료 (2026-02-10)

- [x] DataTableColumn에 `editable` 속성 추가
- [x] DataTableColumn에 `editComponent` 속성 추가 (커스텀 에디터)
- [x] DataTable에 `onCellChange` 콜백 추가
- [x] 기본 에디터: Input (텍스트)
- [x] 커스텀 에디터 지원: Select 등
- [x] Storybook 예제 추가 (`Editable`, `EditableWithCustomEditor`)

**사용 예시:**
```tsx
const columns: DataTableColumn<Order>[] = [
  { accessorKey: "name", header: "이름", editable: true },
  {
    accessorKey: "status",
    header: "상태",
    editable: true,
    editComponent: ({ value, onChange, onComplete }) => (
      <Select
        value={value}
        onValueChange={(v) => { onChange(v); onComplete(); }}
        options={statusOptions}
      />
    )
  },
]

<DataTable
  columns={columns}
  data={data}
  onCellChange={(rowId, columnKey, newValue) => {
    // 로우별 즉시 저장 또는 로컬 상태 업데이트
  }}
/>
```

**저장 방식 (각 시스템에서 결정):**
- 로우별 즉시 저장: `onCellChange`에서 바로 API 호출
- 전체 한번에 저장: `onCellChange`에서 로컬 상태만 업데이트 → 별도 "저장" 버튼

**셀 검증 (Validation):** ✅ 완료 (2026-02-10)

- [x] DataTableColumn에 `validate` 속성 추가
- [x] 검증 실패 시 에러 메시지 표시 (빨간 테두리 + 메시지)
- [x] 검증 통과 전까지 `onCellChange` 호출 차단
- [x] 값 변경 시 에러 상태 자동 초기화
- [x] Storybook 예제 추가 (`EditableWithValidation`)

```tsx
const columns: DataTableColumn<Order>[] = [
  {
    accessorKey: "name",
    header: "이름",
    editable: true,
    validate: (value) => {
      if (!value || String(value).trim() === "") return "필수 입력"
      if (String(value).length < 2) return "2자 이상 입력"
      return true  // 검증 통과
    },
  },
  {
    accessorKey: "email",
    header: "이메일",
    editable: true,
    validate: (value) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!regex.test(String(value))) return "올바른 이메일 형식이 아닙니다"
      return true
    },
  },
]
```

**저장/취소 동작:**
- Enter: 검증 후 저장
- Escape 또는 다른 곳 클릭: 취소 (원래 값으로 복원)

**InputField 검증과의 차이점:**
- InputField: 실시간 검증, 필드 수준 에러 표시
- DataTable validate: 저장 시점 검증, 셀 수준 에러 표시

#### 2. ~~Expandable Row (확장 가능한 행)~~ ✅ 완료 (2026-02-10)

- [x] DataTable에 `expandable` 속성 추가 (ExpandableConfig 인터페이스)
- [x] `expandedRowRender` 함수로 확장 영역 커스터마이징
- [x] `rowExpandable` 함수로 확장 가능 여부 결정
- [x] 펼침/접힘 상태 관리 (제어/비제어 모드 지원)
- [x] 확장 영역 스타일링 (회색 배경)
- [x] Storybook 예제 추가 (`Expandable`, `ExpandableWithSelection`)

**사용 예시:**
```tsx
<DataTable
  columns={columns}
  data={data}
  expandable={{
    expandedRowRender: (row) => (
      <DataTable columns={detailColumns} data={row.details} />
    ),
    rowExpandable: (row) => row.details?.length > 0,
    // 선택적: 제어 컴포넌트로 사용
    // expandedRowIds: [1, 2],
    // onExpandedChange: (ids) => setExpandedIds(ids),
  }}
/>
```

**참고:** CMS 와이어프레임 (`docs/스크린샷 2026-02-10 오후 5.17.22.png`)

#### 3. ~~고정 컬럼 (Sticky Column)~~ ✅ 완료 (2026-02-11)

- [x] DataTableColumn에 `sticky` 속성 추가 (`left` | `right`)
- [x] CSS sticky position 적용
- [x] 가로 스크롤 시 고정 컬럼 유지
- [x] 고정 컬럼 그림자 효과
- [x] 선택/확장 컬럼도 자동 고정 (왼쪽 sticky 컬럼이 있을 때)
- [x] 선택된 행의 sticky 컬럼 배경색 처리
- [x] Storybook 예제 추가 (`StickyColumn`, `StickyColumnWithSelection`)

**사용 예시:**
```tsx
const columns: DataTableColumn<Order>[] = [
  { accessorKey: "id", header: "ID", width: 100, sticky: "left" },
  { accessorKey: "name", header: "이름", width: 150, sticky: "left" },
  // ... 다른 컬럼들 (스크롤됨)
  { accessorKey: "actions", header: "액션", width: 150, sticky: "right" },
]
```

**주의사항:**
- sticky 컬럼에는 `width` 속성을 명시적으로 지정해야 합니다
- 왼쪽 고정 컬럼이 있으면 체크박스/확장 아이콘 컬럼도 자동으로 고정됩니다

#### 4. ~~컬럼 리사이징~~ ✅ 완료 (2026-02-12)

- [x] DataTable에 `resizable` 속성 추가
- [x] DataTable에 `columnWidths` 속성 추가 (제어 컴포넌트)
- [x] DataTable에 `onColumnResize` 콜백 추가
- [x] 컬럼 헤더 우측에 리사이즈 핸들 추가
- [x] 마우스 드래그로 너비 조절
- [x] 최소 너비 제한 (50px)
- [x] Storybook 예제 추가 (`Resizable`, `ResizableControlled`)

**사용 예시:**
```tsx
// 비제어 컴포넌트 (간단한 사용)
<DataTable
  columns={columns}
  data={data}
  resizable
/>

// 제어 컴포넌트 (너비 상태 외부 관리)
const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
  name: 150,
  email: 200,
})

<DataTable
  columns={columns}
  data={data}
  resizable
  columnWidths={columnWidths}
  onColumnResize={(columnKey, newWidth) => {
    setColumnWidths(prev => ({ ...prev, [String(columnKey)]: newWidth }))
    // 선택적: localStorage 저장
  }}
/>
```

**동작 방식:**
- 컬럼 헤더 우측 가장자리에 마우스를 올리면 파란색 핸들 표시
- 드래그하여 너비 조절 (최소 50px)
- 드래그 중 텍스트 선택 방지 및 col-resize 커서

#### 5. ~~컬럼 순서 변경 (드래그 앤 드롭)~~ ✅ 완료 (2026-02-12)

- [x] `@dnd-kit` 라이브러리 설치 (`@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`)
- [x] DataTable에 `columnReorderable` 속성 추가
- [x] DataTable에 `columnOrder` 속성 추가 (제어 컴포넌트)
- [x] DataTable에 `onColumnReorder` 콜백 추가
- [x] 헤더 드래그로 컬럼 순서 변경
- [x] Storybook 예제 추가 (`ColumnReorderable`, `ColumnReorderableControlled`, `ColumnReorderableWithFeatures`)

**사용 예시:**
```tsx
// 비제어 컴포넌트 (간단한 사용)
<DataTable
  columns={columns}
  data={data}
  columnReorderable
/>

// 제어 컴포넌트 (순서 상태 외부 관리)
const [columnOrder, setColumnOrder] = useState<(keyof Data)[]>([
  "name", "email", "role", "status"
])

<DataTable
  columns={columns}
  data={data}
  columnReorderable
  columnOrder={columnOrder}
  onColumnReorder={(newOrder) => {
    setColumnOrder(newOrder)
    // 선택적: localStorage 저장
  }}
/>
```

**주의사항:**
- `sortable` 컬럼과 `sticky` 컬럼은 드래그 불가
- 5px 이상 드래그해야 드래그 시작 (클릭과 구분)
- 드래그 중 컬럼은 반투명하게 표시

#### 6. ~~로우 순서 변경 (드래그 앤 드롭)~~ ✅ 완료 (2026-02-17)

- [x] `@dnd-kit` 라이브러리 사용
- [x] DataTable에 `rowReorderable` 속성 추가
- [x] DataTable에 `onRowReorder` 콜백 추가
- [x] 로우 드래그 핸들 추가 (왼쪽 첫 번째 컬럼)
- [x] 로우 드래그로 순서 변경 (세로 방향)
- [x] Storybook 예제 추가 (`RowReorderable`, `RowReorderableWithSelection`)

**사용 예시:**
```tsx
<DataTable
  columns={columns}
  data={data}
  rowReorderable
  onRowReorder={(newData) => {
    setData(newData)
    // 선택적: API로 순서 저장
  }}
/>
```

**동작 방식:**
- 로우 왼쪽에 드래그 핸들(≡ 아이콘) 표시
- 핸들을 드래그하여 로우 순서 변경
- 드래그 중인 로우는 반투명하게 표시
- `selectable`와 함께 사용 가능

**주의사항:**
- `rowReorderable`와 `columnReorderable`를 함께 사용할 수 있음
- 드래그 핸들이 있는 경우 sticky 컬럼 위치 계산에 포함됨

## 라이브러리 의존성

| 기능 | 라이브러리 | 비고 |
|------|-----------|------|
| 기본 기능 | 없음 | 직접 구현 |
| 드래그 앤 드롭 | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | 컬럼/로우 순서 변경 (설치됨 ✅) |

**@dnd-kit 선정 이유:**
- 가볍다 (~10kb gzipped)
- 터치/키보드/스크린리더 지원
- React 전용으로 설계
- 활발한 유지보수

## 작업 순서

1. ~~**Editable**~~ ✅ - 핵심 기능, CMS에서 필수
2. ~~**Expandable Row**~~ ✅ - CMS 와이어프레임에 있음
3. ~~**고정 컬럼**~~ ✅ - CSS만으로 구현 가능
4. ~~**컬럼 리사이징**~~ ✅ - 직접 구현 가능
5. ~~**컬럼 순서 변경**~~ ✅ - @dnd-kit 사용
6. ~~**로우 순서 변경**~~ ✅ - @dnd-kit 사용

**🎉 모든 계획된 기능 완료!**

## 스타일 가이드

### 테이블 Figma 스펙 (현재 적용됨)

| 요소 | 값 |
|------|-----|
| 헤더 배경색 | `#eaedf1` (dark: `slate-800`) |
| 로우 구분선 | `#f4f6f8` (dark: `slate-700`) |
| 헤더/셀 높이 | `h-9` (36px) |
| 패딩 | `pl-3 pr-1.5 py-1.5` (12px, 6px, 6px) |
| 텍스트 색상 | `#798698` (dark: `slate-400`) |
| 헤더 하단 보더 | `slate-200` (dark: `slate-700`) |
| 선택된 로우 배경 | `blue-50` (dark: `blue-950/30`) |

## 참고 자료

- CMS 와이어프레임: `docs/스크린샷 2026-02-10 오후 5.17.22.png`
- Storybook: `stories/DataTable.stories.tsx`
