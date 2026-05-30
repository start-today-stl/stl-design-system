import { VirtualConfig } from '../types';
import * as React from "react";
interface UseTableVirtualizerOptions {
    /** virtual prop 원본 (boolean | VirtualConfig | undefined) */
    virtual: boolean | VirtualConfig | undefined;
    /** 가상화와 비호환되는 기능 활성 여부 — 활성 시 가상화 강제 OFF */
    disabledReason: string | null;
    /** 행 개수 */
    count: number;
    /** 스크롤 컨테이너 ref (가상화 스크롤 영역 측정용) */
    scrollContainerRef: React.RefObject<HTMLElement | null>;
    /** dev 환경에서 경고 출력할지 */
    shouldWarn: boolean;
}
/**
 * DataTable 의 행 가상화 훅
 * - virtual 옵션 정규화
 * - 비호환 기능 감지 시 강제 OFF + 경고
 * - useVirtualizer 호출 (가상화 ON 일 때만 의미 있는 결과 반환)
 *
 * 반환:
 * - isVirtual: 실제 가상화 적용 여부
 * - virtualizer: TanStack virtualizer 인스턴스 (가상화 ON 시), 아니면 null
 */
export declare function useTableVirtualizer({ virtual, disabledReason, count, scrollContainerRef, shouldWarn, }: UseTableVirtualizerOptions): {
    isVirtual: boolean;
    virtualizer: import('@tanstack/virtual-core').Virtualizer<HTMLElement, Element> | null;
};
export {};
