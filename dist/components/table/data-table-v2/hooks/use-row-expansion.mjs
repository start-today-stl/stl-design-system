import * as n from "react";
function C({
  data: w,
  expandable: e
}) {
  const [d, l] = n.useState(
    () => new Set((e == null ? void 0 : e.defaultExpandedRowIds) ?? [])
  ), s = n.useMemo(() => e ? e.expandedRowIds ? new Set(e.expandedRowIds) : d : /* @__PURE__ */ new Set(), [e, d]), r = n.useCallback(
    (t) => {
      e != null && e.onExpandedChange ? e.onExpandedChange(Array.from(t)) : l(t);
    },
    [e]
  ), u = n.useCallback(
    (t) => e ? e.rowExpandable ? e.rowExpandable(t) : !0 : !1,
    [e]
  ), S = n.useCallback(
    (t) => s.has(t),
    [s]
  ), o = n.useMemo(
    () => e ? w.filter(u) : [],
    [e, w, u]
  ), f = o.length > 0 && o.every((t) => s.has(t.id)), i = n.useRef(s);
  i.current = s;
  const R = n.useRef(f);
  R.current = f;
  const E = n.useRef(o);
  E.current = o;
  const m = n.useCallback(
    (t) => {
      const c = new Set(i.current);
      c.has(t) ? c.delete(t) : c.add(t), r(c);
    },
    [r]
  ), g = n.useCallback(() => {
    R.current ? r(/* @__PURE__ */ new Set()) : r(new Set(E.current.map((t) => t.id)));
  }, [r]);
  return { expandedSet: s, isExpanded: S, canExpand: u, allExpanded: f, toggleRow: m, toggleAll: g };
}
export {
  C as useRowExpansion
};
//# sourceMappingURL=use-row-expansion.mjs.map
