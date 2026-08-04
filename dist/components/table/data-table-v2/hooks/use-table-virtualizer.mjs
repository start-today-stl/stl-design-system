import * as m from "react";
import { useVirtualizer as g } from "@tanstack/react-virtual";
const V = 5, b = 40;
function I({
  virtual: c,
  count: l,
  scrollContainerRef: E,
  rowSpanMap: f
}) {
  const s = m.useMemo(() => c === !0 ? {} : c && typeof c == "object" ? c : null, [c]), t = s !== null, S = (s == null ? void 0 : s.overscan) ?? V, i = (s == null ? void 0 : s.estimateSize) ?? b, o = g({
    count: t ? l : 0,
    // 비가상화 시 null 반환 → virtualizer 가 scroll listener 부착 안 함 →
    // 스크롤 시 parent 리렌더 방지 (없으면 가로 스크롤할 때도 헤더/필터/정렬 리렌더됨)
    getScrollElement: () => t ? E.current : null,
    estimateSize: () => i,
    overscan: S,
    // 행 높이를 정수 픽셀로 라운딩 — sub-pixel 누적 오차 감소
    measureElement: (r) => {
      const e = r.getBoundingClientRect();
      return Math.round(e.height);
    }
  }), u = t ? o.getVirtualItems() : [], A = m.useMemo(() => {
    if (!t) {
      const e = new Array(l);
      for (let n = 0; n < l; n++) e[n] = n;
      return e;
    }
    if (!f) return u.map((e) => e.index);
    const r = /* @__PURE__ */ new Set();
    for (const e of u) r.add(e.index);
    for (const e of u) {
      const n = e.index;
      f.forEach((d, a) => {
        a > n || d.forEach((z) => {
          z > 1 && n >= a && n < a + z && r.add(a);
        });
      });
    }
    return Array.from(r).sort((e, n) => e - n);
  }, [t, u, f, l]), C = m.useCallback(
    (r) => {
      if (!t) return 0;
      const e = o.measurementsCache[r];
      return (e == null ? void 0 : e.start) ?? r * i;
    },
    [t, o, i]
  ), T = m.useCallback(
    (r) => {
      if (!t) return i;
      const e = o.measurementsCache[r];
      return (e == null ? void 0 : e.size) ?? i;
    },
    [t, o, i]
  );
  return {
    isVirtual: t,
    virtualizer: t ? o : null,
    virtualItems: u,
    renderIndices: A,
    getItemStart: C,
    getItemSize: T,
    totalSize: t ? o.getTotalSize() : 0
  };
}
export {
  I as useTableVirtualizer
};
//# sourceMappingURL=use-table-virtualizer.mjs.map
