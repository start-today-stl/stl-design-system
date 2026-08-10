import * as t from "react";
function x({
  data: f,
  expandable: r
}) {
  const [l, E] = t.useState(
    () => new Set((r == null ? void 0 : r.defaultExpandedRowIds) ?? [])
  ), s = t.useMemo(() => r ? r.expandedRowIds ? new Set(r.expandedRowIds) : l : /* @__PURE__ */ new Set(), [r, l]), u = t.useRef(r);
  u.current = r;
  const o = t.useCallback((e) => {
    const n = u.current;
    n != null && n.onExpandedChange ? n.onExpandedChange(Array.from(e)) : E(e);
  }, []), a = t.useCallback((e) => {
    const n = u.current;
    return n ? n.rowExpandable ? n.rowExpandable(e) : !0 : !1;
  }, []), p = t.useCallback(
    (e) => s.has(e),
    [s]
  ), c = t.useMemo(
    () => r ? f.filter(a) : [],
    [r, f, a]
  ), d = c.length > 0 && c.every((e) => s.has(e.id)), R = t.useRef(s);
  R.current = s;
  const w = t.useRef(d);
  w.current = d;
  const i = t.useRef(c);
  i.current = c;
  const S = t.useCallback(
    (e) => {
      const n = new Set(R.current);
      n.has(e) ? n.delete(e) : n.add(e), o(n);
    },
    [o]
  ), m = t.useCallback(() => {
    w.current ? o(/* @__PURE__ */ new Set()) : o(new Set(i.current.map((e) => e.id)));
  }, [o]);
  return { expandedSet: s, isExpanded: p, canExpand: a, allExpanded: d, toggleRow: S, toggleAll: m };
}
export {
  x as useRowExpansion
};
//# sourceMappingURL=use-row-expansion.mjs.map
