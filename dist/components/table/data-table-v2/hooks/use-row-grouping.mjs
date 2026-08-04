import * as f from "react";
function V({
  data: n,
  rowGrouping: s
}) {
  const { rowSpanMap: u, middleRowSet: i } = f.useMemo(() => {
    if (!s) return { rowSpanMap: null, middleRowSet: null };
    const r = Array.isArray(s.groupBy) ? s.groupBy : [s.groupBy], p = s.mergeColumns ?? r, o = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set();
    for (const a of p) {
      let t = 0;
      for (; t < n.length; ) {
        const g = r.map((e) => n[t][e]), y = n[t][a];
        let l = 1;
        for (let e = t + 1; e < n.length; e++) {
          const M = r.map((c) => n[e][c]), S = n[e][a];
          if (g.every((c, R) => c === M[R]) && y === S)
            l++;
          else
            break;
        }
        o.has(t) || o.set(t, /* @__PURE__ */ new Map()), o.get(t).set(a, l);
        for (let e = t; e < t + l - 1; e++)
          m.add(e);
        for (let e = t + 1; e < t + l; e++)
          o.has(e) || o.set(e, /* @__PURE__ */ new Map()), o.get(e).set(a, 0);
        t += l;
      }
    }
    return { rowSpanMap: o, middleRowSet: m };
  }, [n, s]), w = f.useCallback(
    (r, p) => {
      if (!u) return;
      const o = u.get(r);
      if (o)
        return o.get(p);
    },
    [u]
  );
  return { rowSpanMap: u, middleRowSet: i, getRowSpan: w };
}
export {
  V as useRowGrouping
};
//# sourceMappingURL=use-row-grouping.mjs.map
