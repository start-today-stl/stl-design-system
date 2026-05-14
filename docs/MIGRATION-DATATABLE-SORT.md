# DataTable sortState 마이그레이션 가이드

## 변경 사항

`sortState`와 `onSortChange`가 **항상 배열(`SortState<T>[]`)**을 받도록 변경되었습니다.

### Before

```tsx
const [sortState, setSortState] = useState<SortState<User>>({
  column: null,
  direction: null,
})

<DataTable
  columns={columns}
  data={sortedData}
  sortState={sortState}
  onSortChange={setSortState}
/>
```

### After

```tsx
const [sortState, setSortState] = useState<SortState<User>[]>([])

<DataTable
  columns={columns}
  data={sortedData}
  sortState={sortState}
  onSortChange={setSortState}
/>
```

## 데이터 정렬 로직 변경

### Before (단일 정렬)

```tsx
const sortedData = [...data].sort((a, b) => {
  if (!sortState.column || !sortState.direction) return 0;
  const aValue = a[sortState.column];
  const bValue = b[sortState.column];
  const comparison = String(aValue).localeCompare(String(bValue));
  return sortState.direction === "asc" ? comparison : -comparison;
});
```

### After (배열 기반, 다중 정렬 자동 지원)

```tsx
const sortedData = [...data].sort((a, b) => {
  for (const sort of sortState) {
    if (!sort.column || !sort.direction) continue;
    const aValue = a[sort.column];
    const bValue = b[sort.column];
    const comparison = String(aValue).localeCompare(String(bValue));
    if (comparison !== 0) {
      return sort.direction === "asc" ? comparison : -comparison;
    }
  }
  return 0;
});
```

> 단일 정렬만 쓰는 경우엔 `sortState[0]`만 사용해도 됩니다.

## API 컴포지션

- 기본 (단일 정렬, 기존과 동일한 UX): `<DataTable sortState={arr} onSortChange={setArr} />`
  - 클릭 시 그 컬럼만 정렬, asc → desc → 해제 순환
- 다중 정렬: `<DataTable multiSort sortState={arr} onSortChange={setArr} />`
  - 클릭 시 정렬 추가/순환, 우선순위 번호 표시
