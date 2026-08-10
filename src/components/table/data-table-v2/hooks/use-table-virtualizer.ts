import * as React from "react"
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual"

import type { VirtualConfig } from "../types"

interface UseTableVirtualizerOptions {
  /** virtual prop 원본 (boolean | VirtualConfig | undefined) */
  virtual: boolean | VirtualConfig | undefined
  /** 행 개수 */
  count: number
  /** 스크롤 컨테이너 ref */
  scrollContainerRef: React.RefObject<HTMLElement | null>
  /**
   * rowGrouping 이 있는 경우 group head 인덱스 → span. head 는 viewport 밖이어도 강제 렌더 대상.
   * 없으면 null.
   */
  rowSpanMap: Map<number, Map<PropertyKey, number>> | null
  /**
   * 인덱스 → 행 식별자. 측정한 행 높이를 **인덱스가 아니라 행 기준**으로 기억하기 위해 쓴다.
   *
   * 없으면 라이브러리 기본값(인덱스)이 쓰이는데, 필터/정렬로 데이터가 바뀌면 그 자리에
   * 이전 행의 높이가 남는다. 확장행처럼 높이가 큰 행이 있던 자리에 빈 공간이 생긴다.
   */
  getItemKey?: (index: number) => string | number
}

const DEFAULT_OVERSCAN = 5
const DEFAULT_ESTIMATE_SIZE = 40

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
export function useTableVirtualizer({
  virtual,
  count,
  scrollContainerRef,
  rowSpanMap,
  getItemKey,
}: UseTableVirtualizerOptions) {
  const config = React.useMemo<VirtualConfig | null>(() => {
    if (virtual === true) return {}
    if (virtual && typeof virtual === "object") return virtual
    return null
  }, [virtual])

  const isVirtual = config !== null

  const overscan = config?.overscan ?? DEFAULT_OVERSCAN
  const estimateSize = config?.estimateSize ?? DEFAULT_ESTIMATE_SIZE

  const virtualizer = useVirtualizer({
    count: isVirtual ? count : 0,
    // 비가상화 시 null 반환 → virtualizer 가 scroll listener 부착 안 함 →
    // 스크롤 시 parent 리렌더 방지 (없으면 가로 스크롤할 때도 헤더/필터/정렬 리렌더됨)
    getScrollElement: () => (isVirtual ? scrollContainerRef.current : null),
    estimateSize: () => estimateSize,
    overscan,
    // 측정 캐시를 행 기준으로 (위 getItemKey 주석 참고)
    ...(getItemKey ? { getItemKey } : {}),
    // 행 높이를 정수 픽셀로 라운딩 — sub-pixel 누적 오차 감소
    measureElement: (element) => {
      const rect = element.getBoundingClientRect()
      return Math.round(rect.height)
    },
  })

  const virtualItems: VirtualItem[] = isVirtual ? virtualizer.getVirtualItems() : []

  // rowGrouping 조합: 각 visible row 가 그룹 middle 이면 head 인덱스도 렌더 대상에 추가.
  // rowSpanMap 에서 head 는 span>1 를 가지고, middle 은 span=0. head 찾으려면
  // (rowSpanMap 이 head 만 span>1 로 저장하므로) 역방향으로 순회하며 span>1 있는지 확인.
  // 성능 완화: rowSpanMap 이 있을 때만 이 작업.
  const renderIndices = React.useMemo<number[]>(() => {
    if (!isVirtual) {
      const all = new Array<number>(count)
      for (let i = 0; i < count; i++) all[i] = i
      return all
    }
    if (!rowSpanMap) return virtualItems.map((v) => v.index)

    const set = new Set<number>()
    for (const v of virtualItems) set.add(v.index)

    // 각 visible index 에 대해 소속 그룹 head 찾기
    for (const v of virtualItems) {
      const idx = v.index
      // 이 idx 가 어느 head 의 span 범위에 속하는지 역방향 탐색.
      // 최적화: 첫 span>1 발견 시 그 head 의 span 범위에 idx 가 있으면 add, 아니면 계속.
      // 단순 구현 — rowSpanMap 을 head→span 인 것만 순회.
      // (head 는 자기 자신도 span>1 이면 이미 v.index === head 인 케이스 포함)
      // rowSpanMap 은 sparse (head 만 span>1 저장). 순회하며 idx 를 포함하는 head 찾기.
      // O(H) per visible row, H = head 개수. count 대비 작음.
      rowSpanMap.forEach((colMap, headIdx) => {
        if (headIdx > idx) return
        colMap.forEach((span) => {
          if (span > 1 && idx >= headIdx && idx < headIdx + span) {
            set.add(headIdx)
          }
        })
      })
    }

    return Array.from(set).sort((a, b) => a - b)
  }, [isVirtual, virtualItems, rowSpanMap, count])

  // 인덱스 → 캐시된 top 위치 (virtualizer 활성 시). 강제 렌더 head 는
  // virtualizer.measurementsCache 에서 조회 (동일 count 기반).
  const getItemStart = React.useCallback(
    (idx: number): number => {
      if (!isVirtual) return 0 // 비가상화 시 이 함수 사용 안 함 (외부 positions 사용)
      const measurement = virtualizer.measurementsCache[idx]
      return measurement?.start ?? idx * estimateSize
    },
    [isVirtual, virtualizer, estimateSize]
  )

  const getItemSize = React.useCallback(
    (idx: number): number => {
      if (!isVirtual) return estimateSize
      const measurement = virtualizer.measurementsCache[idx]
      return measurement?.size ?? estimateSize
    },
    [isVirtual, virtualizer, estimateSize]
  )

  return {
    isVirtual,
    virtualizer: isVirtual ? virtualizer : null,
    virtualItems,
    renderIndices,
    getItemStart,
    getItemSize,
    totalSize: isVirtual ? virtualizer.getTotalSize() : 0,
  }
}
