import { DataTableV2Props } from './types';
/**
 * DataTable v2 — div role=grid 기반 그리드 컨테이너.
 *
 * SDS-29 (코어 구조):
 * - 3-layer 구조 (outer wrapper / header / body scroller)
 * - 절대좌표 기반 행 배치 (position absolute + transform translate3d + Math.round)
 * - ResizeObserver 로 각 행 실제 높이 측정 후 다음 행 위치 재계산
 *
 * 후속 티켓에서 확장 예정:
 * - SDS-30 컬럼 정렬 / headerGroups
 * - SDS-31 sticky 컬럼 (별도 container)
 * - SDS-32 컬럼 리사이즈 / 재정렬
 * - SDS-33 행 선택 / 클릭 / 확장행
 * - SDS-34 셀 편집
 * - SDS-35 rowActions / loading / emptyMessage
 * - SDS-36 rowReorderable + 가상화 호환
 * - SDS-37 rowGrouping + 가상화 호환
 * - SDS-38 가상화 통합 + WAI-ARIA grid 접근성
 */
export declare function DataTableV2<T extends {
    id: string | number;
}>({ data, columns, maxHeight, estimateRowHeight, className, }: DataTableV2Props<T>): import("react/jsx-runtime").JSX.Element;
