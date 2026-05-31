import * as React from "react"

/**
 * 사용자 prop 으로 받은 작은 객체를 deep compare 후 같은 내용이면 이전 ref 를 유지.
 * 사용처가 inline 으로 `{ groupBy: "region" }` 같은 객체를 매 render 마다 새로 만들어도
 * 내용이 같으면 stable ref 로 흡수해 ctx 무효화를 막는다.
 *
 * 비교 방식: 1-depth shallow + 배열 한 단계.
 * - 함수 prop 이 있는 객체 (rowActions 등) 는 매번 새 ref 일 가능성이 커서 부적합.
 *   → 그런 객체는 함수만 따로 useStableCallback 으로 흡수하고, 객체 자체는 ctx 에 안 넣음.
 */
export function useStableObject<T>(value: T): T {
  const ref = React.useRef(value)
  if (value === ref.current) return ref.current
  if (shallowPlusArrays(value, ref.current)) {
    return ref.current
  }
  ref.current = value
  return value
}

function shallowPlusArrays(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return false
  const ao = a as Record<string, unknown>
  const bo = b as Record<string, unknown>
  const aKeys = Object.keys(ao)
  const bKeys = Object.keys(bo)
  if (aKeys.length !== bKeys.length) return false
  for (const k of aKeys) {
    const av = ao[k]
    const bv = bo[k]
    if (av === bv) continue
    if (Array.isArray(av) && Array.isArray(bv)) {
      if (av.length !== bv.length) return false
      for (let i = 0; i < av.length; i++) {
        if (av[i] !== bv[i]) return false
      }
      continue
    }
    return false
  }
  return true
}
