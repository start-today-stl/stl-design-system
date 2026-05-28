/**
 * 데이터 테이블 순수 헬퍼 함수
 * - 컴포넌트나 hook에서 사용하는 stateless 유틸리티 모음
 */
/** 컬럼 정렬을 Tailwind 클래스로 변환 */
export declare function getAlignClass(align?: "left" | "center" | "right"): string;
/** number | string → px 단위 문자열 */
export declare function toPxString(value: string | number): string;
/** 컬럼 너비를 number로 변환 (width 우선, 없으면 minWidth) */
export declare function getNumericColumnWidth(col: {
    width?: string | number;
    minWidth?: string | number;
}): number;
