import * as e from "react";
function S({
  data: w,
  expandable: t
}) {
  const [f, E] = e.useState(
    () => new Set((t == null ? void 0 : t.defaultExpandedRowIds) ?? [])
  ), o = e.useMemo(() => t ? t.expandedRowIds ? new Set(t.expandedRowIds) : f : /* @__PURE__ */ new Set(), [t, f]), n = e.useCallback(
    (s) => {
      t != null && t.onExpandedChange ? t.onExpandedChange(Array.from(s)) : E(s);
    },
    [t]
  ), u = e.useCallback(
    (s) => t ? t.rowExpandable ? t.rowExpandable(s) : !0 : !1,
    [t]
  ), d = e.useCallback(
    (s) => o.has(s),
    [o]
  ), r = e.useMemo(
    () => t ? w.filter(u) : [],
    [t, w, u]
  ), i = r.length > 0 && r.every((s) => o.has(s.id)), l = e.useCallback(
    (s) => {
      const c = new Set(o);
      c.has(s) ? c.delete(s) : c.add(s), n(c);
    },
    [o, n]
  ), m = e.useCallback(() => {
    n(i ? /* @__PURE__ */ new Set() : new Set(r.map((s) => s.id)));
  }, [i, r, n]);
  return { expandedSet: o, isExpanded: d, canExpand: u, allExpanded: i, toggleRow: l, toggleAll: m };
}
export {
  S as useRowExpansion
};
//# sourceMappingURL=use-row-expansion.mjs.map
