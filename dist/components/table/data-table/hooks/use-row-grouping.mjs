import * as i from "react";
function A({
  data: n,
  rowGrouping: o,
  hoveredRowIndex: c,
  selectedIds: m
}) {
  const { rowSpanMap: a, middleRowSet: C } = i.useMemo(() => {
    if (!o) return { rowSpanMap: null, middleRowSet: null };
    const s = Array.isArray(o.groupBy) ? o.groupBy : [o.groupBy], r = o.mergeColumns ?? s, t = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set();
    for (const p of r) {
      let l = 0;
      for (; l < n.length; ) {
        const k = s.map((e) => n[l][e]), V = n[l][p];
        let u = 1;
        for (let e = l + 1; e < n.length; e++) {
          const w = s.map((f) => n[e][f]), b = n[e][p];
          if (k.every((f, B) => f === w[B]) && V === b)
            u++;
          else
            break;
        }
        t.has(l) || t.set(l, /* @__PURE__ */ new Map()), t.get(l).set(p, u);
        for (let e = l; e < l + u - 1; e++)
          g.add(e);
        for (let e = l + 1; e < l + u; e++)
          t.has(e) || t.set(e, /* @__PURE__ */ new Map()), t.get(e).set(p, 0);
        l += u;
      }
    }
    return { rowSpanMap: t, middleRowSet: g };
  }, [n, o]), y = i.useCallback(
    (s, r) => {
      if (!a) return;
      const t = a.get(s);
      if (t)
        return t.get(r);
    },
    [a]
  ), M = i.useCallback(
    (s, r) => c === null ? !1 : c >= s && c < s + r,
    [c]
  ), S = i.useCallback(
    (s, r) => {
      for (let t = s; t < s + r; t++)
        if (t < n.length && m.includes(n[t].id))
          return !0;
      return !1;
    },
    [n, m]
  );
  return { rowSpanMap: a, middleRowSet: C, getRowSpan: y, isGroupCellHovered: M, isGroupCellSelected: S };
}
export {
  A as useRowGrouping
};
//# sourceMappingURL=use-row-grouping.mjs.map
