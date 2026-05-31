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
  /** dev 환경에서 경고 출력할지 */
  shouldWarn: boolean
}

const DEFAULT_OVERSCAN = 5
const DEFAULT_ESTIMATE_SIZE = 40

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
export function useTableVirtualizer({
  virtual,
  disabledReason,
  count,
  scrollContainerRef,
  shouldWarn,
}: UseTableVirtualizerOptions) {
  // virtual 옵션 정규화 — boolean / 객체 / undefined 처리
  const config = React.useMemo<VirtualConfig | null>(() => {
    if (virtual === true) return {}
    if (virtual && typeof virtual === "object") return virtual
    return null // false 또는 undefined
  }, [virtual])

  // 비호환 기능 활성 시 강제 OFF + 경고 (dev 환경에서만 1회)
  const warnedRef = React.useRef(false)
  React.useEffect(() => {
    if (!shouldWarn) return
    if (config === null) {
      warnedRef.current = false
      return
    }
    if (!disabledReason) {
      warnedRef.current = false
      return
    }
    if (warnedRef.current) return
    warnedRef.current = true
    console.warn(
      `[DataTable] virtual 옵션이 활성화되었으나 ${disabledReason} 와(과) 동시 사용 불가하여 가상화가 비활성화됩니다.`,
    )
  }, [config, disabledReason, shouldWarn])

  const isVirtual = config !== null && disabledReason === null

  const overscan = config?.overscan ?? DEFAULT_OVERSCAN
  const estimateSize = config?.estimateSize ?? DEFAULT_ESTIMATE_SIZE

  const virtualizer = useVirtualizer({
    count: isVirtual ? count : 0,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => estimateSize,
    overscan,
    // 행 높이를 정수 픽셀로 라운딩 — sub-pixel 누적 오차 감소
    // (sticky 셀 border 깜빡임은 별개의 브라우저 한계로 완전 해결 불가하나
    //  Table wrapper bg 매칭으로 시각적으로 안 보이게 처리됨)
    measureElement: (element) => {
      const rect = element.getBoundingClientRect()
      return Math.round(rect.height)
    },
  })

  // 스크롤 컨테이너에 명시적 높이가 없으면 가상화 효과 없음 → dev 경고
  // (wrapper 가 scrollable 영역을 가져야 useVirtualizer 가 정상 작동)
  const scrollWarnedRef = React.useRef(false)
  React.useEffect(() => {
    if (!shouldWarn || !isVirtual) {
      scrollWarnedRef.current = false
      return
    }
    if (scrollWarnedRef.current) return
    const el = scrollContainerRef.current
    if (!el) return
    // 마운트 직후 1 tick 늦게 측정 (레이아웃 완료 후)
    const id = window.requestAnimationFrame(() => {
      if (scrollWarnedRef.current) return
      const isScrollable = el.scrollHeight > el.clientHeight + 1
      const hasHeight = el.clientHeight > 0
      if (!hasHeight) {
        scrollWarnedRef.current = true
        console.warn(
          "[DataTable] virtual 활성화되었으나 스크롤 컨테이너의 높이가 0입니다. " +
          "maxHeight prop 또는 부모 flex 레이아웃으로 높이 제약을 지정해주세요.",
        )
      } else if (!isScrollable && count > 30) {
        scrollWarnedRef.current = true
        console.warn(
          "[DataTable] virtual 활성화되었으나 스크롤이 발생하지 않습니다. " +
          "데이터 행 수에 비해 컨테이너 높이가 충분히 작은지 확인해주세요 (maxHeight 등).",
        )
      }
    })
    return () => window.cancelAnimationFrame(id)
  }, [isVirtual, count, scrollContainerRef, shouldWarn])

  return {
    isVirtual,
    virtualizer: isVirtual ? virtualizer : null,
  }
}
