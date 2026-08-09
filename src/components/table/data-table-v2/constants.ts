/**
 * DataTable v2 공용 상수.
 *
 * 헤더(`data-table-v2-header.tsx`)와 본체(`data-table-v2.tsx`)가 같은 값을 써야 해서
 * 별도 파일로 분리했다. 한쪽만 고치면 헤더와 바디의 컬럼 폭/offset 이 어긋난다.
 */

/** width/minWidth 둘 다 없는 컬럼의 기본 폭 */
export const DEFAULT_COL_WIDTH = 120

/** 좌측 컨트롤 컬럼 폭 (왼쪽부터: 드래그 핸들 → 체크박스 → 확장 → 삭제) */
export const DRAG_HANDLE_COL_WIDTH = 32
export const CHECKBOX_COL_WIDTH = 40
export const EXPAND_COL_WIDTH = 40
export const ROW_ACTIONS_WIDTH = 40

/** align 값 → flex/text 정렬 클래스 */
export const alignClass = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
} as const

/**
 * 행 배경색 (기본 / hover / 선택 / 선택+hover).
 *
 * **같은 색 결정을 두 형태로 쓴다. 반드시 함께 고칠 것.**
 * - `ROW_BG_SELF`: 행 자신에게 적용 (`hover:`, `data-[state=selected]:`)
 * - `ROW_BG_DESCENDANT`: 행의 자손인 sticky 셀 배경 레이어에 적용
 *   (`group-hover:`, `group-[[data-state=selected]]:`)
 *
 * 어긋나면 pinned 컬럼만 색이 다르거나 전환 타이밍이 달라진다. 실제로 그렇게 세 번 깨졌다.
 *
 * 선택+hover 는 같은 그룹의 변이를 두 개 겹칠 수 없어서
 * (`group-hover:group-data-[...]:` 는 조상이 둘인 잘못된 셀렉터가 된다)
 * arbitrary group 변이로 한 셀렉터에 담는다. 이 셀렉터는 명시도가
 * hover/선택 단독보다 높아 선언 순서와 무관하게 이긴다.
 */
export const ROW_BG_SELF = [
  "bg-white dark:bg-slate-900",
  "hover:bg-slate-100 dark:hover:bg-slate-800",
  "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
  "data-[state=selected]:hover:bg-blue-100 dark:data-[state=selected]:hover:bg-blue-950",
].join(" ")

/**
 * 위와 같은 색을 자손에서 표현한 것. 기본 배경(`bg-white`)은 빠져 있는데,
 * sticky 셀 자신이 불투명 바탕을 갖고 이 레이어는 그 위에 얹히기 때문이다.
 */
export const ROW_BG_DESCENDANT = [
  "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
  "group-[[data-state=selected]]:bg-blue-50 dark:group-[[data-state=selected]]:bg-blue-900",
  "group-[[data-state=selected]:hover]:bg-blue-100 dark:group-[[data-state=selected]:hover]:bg-blue-950",
].join(" ")

/** sticky 셀 불투명 바탕 — 스크롤되는 내용을 덮어야 하므로 반드시 불투명 */
export const STICKY_CELL_BASE_BG = "bg-white dark:bg-slate-900"
