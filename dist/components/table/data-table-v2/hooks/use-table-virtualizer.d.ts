import { VirtualItem } from '@tanstack/react-virtual';
import { VirtualConfig } from '../types';
import * as React from "react";
interface UseTableVirtualizerOptions {
    /** virtual prop 원본 (boolean | VirtualConfig | undefined) */
    virtual: boolean | VirtualConfig | undefined;
    /** 행 개수 */
    count: number;
    /** 스크롤 컨테이너 ref */
    scrollContainerRef: React.RefObject<HTMLElement | null>;
    /**
     * rowGrouping 이 있는 경우 group head 인덱스 → span. head 는 viewport 밖이어도 강제 렌더 대상.
     * 없으면 null.
     */
    rowSpanMap: Map<number, Map<PropertyKey, number>> | null;
    /**
     * 인덱스 → 행 식별자. 측정한 행 높이를 **인덱스가 아니라 행 기준**으로 기억하기 위해 쓴다.
     *
     * 없으면 라이브러리 기본값(인덱스)이 쓰이는데, 필터/정렬로 데이터가 바뀌면 그 자리에
     * 이전 행의 높이가 남는다. 확장행처럼 높이가 큰 행이 있던 자리에 빈 공간이 생긴다.
     */
    getItemKey?: (index: number) => string | number;
    /**
     * 데이터가 바뀐 것을 알리는 값 (보통 data 배열 참조).
     * 바뀌면 측정한 행 높이 캐시를 비운다.
     */
    dataVersion?: unknown;
}
/**
 * 행 가상화 훅 — `@tanstack/react-virtual` 래핑 + v2 rowGrouping 조합 지원.
 *
 * 동작:
 * - `virtual` false/undefined → isVirtual=false, virtualizer=null (전체 렌더)
 * - `virtual` true/객체 → useVirtualizer 호출, viewport + overscan 만 렌더
 *
 * rowGrouping 조합 (`rowSpanMap` 전달 시):
 * - viewport 안의 middle row 가 있는데 그 그룹의 head 가 viewport 밖이면 병합 셀이 안 그려짐
 * - 해결: 각 visible middle row 의 head 인덱스를 계산해 `visibleIndices` 에 추가로 포함
 * - 반환된 `visibleIndices` 는 virtualItems.index 의 super-set. row 렌더 시 이 집합 기준
 *
 * 반환:
 * - `isVirtual`: 실제 가상화 적용 여부
 * - `virtualizer`: TanStack virtualizer 인스턴스 (가상화 ON 시), 아니면 null
 * - `virtualItems`: viewport 안 items + overscan (원본)
 * - `renderIndices`: 실제 렌더할 데이터 인덱스 정렬 배열 (virtualItems + group heads 강제 포함)
 * - `getItemStart(idx)`: idx 의 top 위치 (virtualizer 로부터). rowGrouping 강제 head 도 계산 가능
 * - `getItemSize(idx)`: idx 의 높이
 * - `totalSize`: 전체 스크롤 높이
 */
export declare function useTableVirtualizer({ virtual, count, scrollContainerRef, rowSpanMap, getItemKey, dataVersion, }: UseTableVirtualizerOptions): {
    isVirtual: boolean;
    virtualizer: import('@tanstack/virtual-core').Virtualizer<HTMLElement, Element> | null;
    virtualItems: VirtualItem[];
    renderIndices: number[];
    getItemStart: (idx: number) => number;
    getItemSize: (idx: number) => number;
    totalSize: number;
};
export {};
