import * as n from "react";
function b({
  filterState: a,
  defaultFilterState: l,
  onFilterChange: e
}) {
  const [i, u] = n.useState(l ?? {}), r = a ?? i, o = n.useCallback(
    (s, t) => {
      const c = { ...r };
      t === void 0 || t === "" || Array.isArray(t) && t.length === 0 ? delete c[s] : c[s] = t, a || u(c), e == null || e(c);
    },
    [r, a, e]
  ), f = n.useCallback(
    (s) => r[s],
    [r]
  ), A = n.useCallback(
    (s) => {
      const t = r[s];
      return !(t == null || t === "" || Array.isArray(t) && t.length === 0);
    },
    [r]
  );
  return {
    filterState: r,
    setColumnFilter: o,
    getColumnFilter: f,
    hasActiveFilter: A
  };
}
export {
  b as useFilter
};
//# sourceMappingURL=use-filter.mjs.map
