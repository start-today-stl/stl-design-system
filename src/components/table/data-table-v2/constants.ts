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
  // hover 배경은 헤더 배경(slate-50 / slate-900) 과 동일 톤으로 맞춘다
  "hover:bg-slate-50 dark:hover:bg-slate-800",
  "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
  "data-[state=selected]:hover:bg-blue-100 dark:data-[state=selected]:hover:bg-blue-950",
].join(" ")

/**
 * 위와 같은 색을 자손에서 표현한 것.
 *
 * 기본색을 반드시 포함해야 한다. 빼면 레이어가 `transparent`(= rgba(0,0,0,0), 검정)
 * 에서 전환을 시작해서 중간 프레임이 어두워지고, 행 배경과의 경계가 보인다.
 * 사용처 강조색이 있으면 tailwind-merge 가 이 기본색을 대체하며, 그때는 셀 자신의
 * 불투명 바탕(`STICKY_CELL_BASE_BG`)이 뒤를 받쳐준다.
 */
export const ROW_BG_DESCENDANT = [
  "bg-white dark:bg-slate-900",
  // hover 배경은 헤더와 동일 톤 (ROW_BG_SELF 와 대칭)
  "group-hover:bg-slate-50 dark:group-hover:bg-slate-800",
  "group-[[data-state=selected]]:bg-blue-50 dark:group-[[data-state=selected]]:bg-blue-900",
  "group-[[data-state=selected]:hover]:bg-blue-100 dark:group-[[data-state=selected]:hover]:bg-blue-950",
].join(" ")

/**
 * sticky 셀 뒤에 까는 불투명 바탕.
 *
 * 사용처 강조색이 반투명일 수 있어서(예: `dark:bg-red-500/15`) 셀 배경만으로는
 * 스크롤되는 내용이 비친다. 이 레이어가 뒤를 막는다.
 * 상태 색은 셀 **자신의 background** 가 담당한다 — 자식 레이어로 그리면
 * 서브픽셀에서 셀 박스와 어긋나 전환 중 경계가 스친다.
 */
export const STICKY_CELL_BASE_BG = "bg-white dark:bg-slate-900"
