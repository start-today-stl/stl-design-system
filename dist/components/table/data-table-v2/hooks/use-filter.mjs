import * as e from "react";
function b({
  filterState: u,
  defaultFilterState: f,
  onFilterChange: l
}) {
  const [A, R] = e.useState(f ?? {}), o = u ?? A, n = e.useRef(o);
  n.current = o;
  const a = e.useRef(!!u);
  a.current = !!u;
  const s = e.useRef(l);
  s.current = l;
  const d = e.useCallback(
    (r, t) => {
      var i;
      const c = { ...n.current };
      t === void 0 || t === "" || Array.isArray(t) && t.length === 0 ? delete c[r] : c[r] = t, a.current || R(c), (i = s.current) == null || i.call(s, c);
    },
    []
  ), C = e.useCallback(
    (r) => n.current[r],
    []
  ), S = e.useCallback((r) => {
    const t = n.current[r];
    return !(t == null || t === "" || Array.isArray(t) && t.length === 0);
  }, []);
  return {
    filterState: o,
    setColumnFilter: d,
    getColumnFilter: C,
    hasActiveFilter: S
  };
}
export {
  b as useFilter
};
//# sourceMappingURL=use-filter.mjs.map
