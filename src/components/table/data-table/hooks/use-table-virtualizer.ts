import * as React from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

import type { VirtualConfig } from "../types"

interface UseTableVirtualizerOptions {
  /** virtual prop 원본 (boolean | VirtualConfig | undefined) */
  virtual: boolean | VirtualConfig | undefined
  /** 가상화와 비호환되는 기능 활성 여부 — 활성 시 가상화 강제 OFF */
  disabledReason: string | null
  /** 행 개수 */
  count: number
  /** 스크롤 컨테이너 ref (가상화 스크롤 영역 측정용) */
  scrollContainerRef: React.RefObject<HTMLElement | null>
}

const DEFAULT_OVERSCAN = 5
const DEFAULT_ESTIMATE_SIZE = 40

/**
 * DataTable 의 행 가상화 훅
 * - virtual 옵션 정규화
 * - 비호환 기능 감지 시 강제 OFF
 * - useVirtualizer 호출 (가상화 ON 일 때만 의미 있는 결과 반환)
 *
 * 반환:
 * - isVirtual: 실제 가상화 적용 여부
 * - virtualizer: TanStack virtualizer 인스턴스 (가상화 ON 시), 아니면 null
 */
export function useTableVirtualizer({
  virtual,
  disabledReason,
  count,
  scrollContainerRef,
}: UseTableVirtualizerOptions) {
  // virtual 옵션 정규화 — boolean / 객체 / undefined 처리
  const config = React.useMemo<VirtualConfig | null>(() => {
    if (virtual === true) return {}
    if (virtual && typeof virtual === "object") return virtual
    return null // false 또는 undefined
  }, [virtual])

  const isVirtual = config !== null && disabledReason === null

  const overscan = config?.overscan ?? DEFAULT_OVERSCAN
  const estimateSize = config?.estimateSize ?? DEFAULT_ESTIMATE_SIZE

  const virtualizer = useVirtualizer({
    count: isVirtual ? count : 0,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => estimateSize,
    overscan,
    // 행 높이를 정수 픽셀로 라운딩 — sub-pixel 누적 오차 감소
    measureElement: (element) => {
      const rect = element.getBoundingClientRect()
      return Math.round(rect.height)
    },
  })

  return {
    isVirtual,
    virtualizer: isVirtual ? virtualizer : null,
  }
}
