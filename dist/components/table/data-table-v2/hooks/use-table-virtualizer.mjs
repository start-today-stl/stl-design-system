import * as i from "react";
import { useVirtualizer as b } from "@tanstack/react-virtual";
const g = 5, h = 40;
function k({
  virtual: c,
  count: l,
  scrollContainerRef: A,
  rowSpanMap: m,
  getItemKey: z,
  dataVersion: C
}) {
  const o = i.useMemo(() => c === !0 ? {} : c && typeof c == "object" ? c : null, [c]), t = o !== null, T = (o == null ? void 0 : o.overscan) ?? g, u = (o == null ? void 0 : o.estimateSize) ?? h, s = b({
    count: t ? l : 0,
    // 비가상화 시 null 반환 → virtualizer 가 scroll listener 부착 안 함 →
    // 스크롤 시 parent 리렌더 방지 (없으면 가로 스크롤할 때도 헤더/필터/정렬 리렌더됨)
    getScrollElement: () => t ? A.current : null,
    estimateSize: () => u,
    overscan: T,
    // 측정 캐시를 행 기준으로 (위 getItemKey 주석 참고)
    ...z ? { getItemKey: z } : {},
    // 행 높이를 정수 픽셀로 라운딩 — sub-pixel 누적 오차 감소
    measureElement: (r) => {
      const e = r.getBoundingClientRect();
      return Math.round(e.height);
    }
  }), a = t ? s.getVirtualItems() : [], d = i.useMemo(() => {
    if (!t) {
      const e = new Array(l);
      for (let n = 0; n < l; n++) e[n] = n;
      return e;
    }
    if (!m) return a.map((e) => e.index);
    const r = /* @__PURE__ */ new Set();
    for (const e of a) r.add(e.index);
    for (const e of a) {
      const n = e.index;
      m.forEach((V, f) => {
        f > n || V.forEach((S) => {
          S > 1 && n >= f && n < f + S && r.add(f);
        });
      });
    }
    return Array.from(r).sort((e, n) => e - n);
  }, [t, a, m, l]), y = i.useCallback(
    (r) => {
      if (!t) return 0;
      const e = s.measurementsCache[r];
      return (e == null ? void 0 : e.start) ?? r * u;
    },
    [t, s, u]
  ), R = i.useCallback(
    (r) => {
      if (!t) return u;
      const e = s.measurementsCache[r];
      return (e == null ? void 0 : e.size) ?? u;
    },
    [t, s, u]
  ), E = i.useRef(null);
  return i.useLayoutEffect(() => {
    if (!t) return;
    const r = C ?? l;
    E.current !== r && (E.current = r, s.measure());
  }), {
    isVirtual: t,
    virtualizer: t ? s : null,
    virtualItems: a,
    renderIndices: d,
    getItemStart: y,
    getItemSize: R,
    totalSize: t ? s.getTotalSize() : 0
  };
}
export {
  k as useTableVirtualizer
};
//# sourceMappingURL=use-table-virtualizer.mjs.map
