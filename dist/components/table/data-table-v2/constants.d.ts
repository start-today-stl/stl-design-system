/**
 * DataTable v2 공용 상수.
 *
 * 헤더(`data-table-v2-header.tsx`)와 본체(`data-table-v2.tsx`)가 같은 값을 써야 해서
 * 별도 파일로 분리했다. 한쪽만 고치면 헤더와 바디의 컬럼 폭/offset 이 어긋난다.
 */
/** width/minWidth 둘 다 없는 컬럼의 기본 폭 */
export declare const DEFAULT_COL_WIDTH = 120;
/** 좌측 컨트롤 컬럼 폭 (왼쪽부터: 드래그 핸들 → 체크박스 → 확장 → 삭제) */
export declare const DRAG_HANDLE_COL_WIDTH = 32;
export declare const CHECKBOX_COL_WIDTH = 40;
export declare const EXPAND_COL_WIDTH = 40;
export declare const ROW_ACTIONS_WIDTH = 40;
/** align 값 → flex/text 정렬 클래스 */
export declare const alignClass: {
    readonly left: "text-left justify-start";
    readonly center: "text-center justify-center";
    readonly right: "text-right justify-end";
};
