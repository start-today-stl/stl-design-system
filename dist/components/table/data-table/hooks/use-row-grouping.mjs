import * as c from "react";
function K({
  data: l,
  rowGrouping: r,
  hoveredRowIndex: f,
  selectedIds: C
}) {
  const { rowSpanMap: p, middleRowSet: M } = c.useMemo(() => {
    if (!r) return { rowSpanMap: null, middleRowSet: null };
    const n = Array.isArray(r.groupBy) ? r.groupBy : [r.groupBy], u = r.mergeColumns ?? n, t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set();
    for (const i of u) {
      let s = 0;
      for (; s < l.length; ) {
        const R = n.map((e) => l[s][e]), V = l[s][i];
        let a = 1;
        for (let e = s + 1; e < l.length; e++) {
          const b = n.map((m) => l[e][m]), B = l[e][i];
          if (R.every((m, h) => m === b[h]) && V === B)
            a++;
          else
            break;
        }
        t.has(s) || t.set(s, /* @__PURE__ */ new Map()), t.get(s).set(i, a);
        for (let e = s; e < s + a - 1; e++)
          o.add(e);
        for (let e = s + 1; e < s + a; e++)
          t.has(e) || t.set(e, /* @__PURE__ */ new Map()), t.get(e).set(i, 0);
        s += a;
      }
    }
    return { rowSpanMap: t, middleRowSet: o };
  }, [l, r]), S = c.useCallback(
    (n, u) => {
      if (!p) return;
      const t = p.get(n);
      if (t)
        return t.get(u);
    },
    [p]
  ), g = c.useCallback(
    (n, u) => f === null ? !1 : f >= n && f < n + u,
    [f]
  ), y = c.useRef(l);
  y.current = l;
  const k = c.useCallback(
    (n, u) => {
      if (!r) return !1;
      const t = y.current;
      for (let o = n; o < n + u; o++)
        if (o < t.length && C.includes(t[o].id))
          return !0;
      return !1;
    },
    [C, r]
  );
  return { rowSpanMap: p, middleRowSet: M, getRowSpan: S, isGroupCellHovered: g, isGroupCellSelected: k };
}
export {
  K as useRowGrouping
};
//# sourceMappingURL=use-row-grouping.mjs.map
