import * as d from "react";
function A({
  sortState: t,
  onSortChange: n,
  multiSort: s,
  shouldWarn: l
}) {
  const c = d.useMemo(() => {
    if (!t) return [];
    if (!Array.isArray(t)) {
      l && console.warn(
        "[DataTable] sortState는 배열(SortState<T>[])이어야 합니다. 마이그레이션 가이드: docs/MIGRATION-DATATABLE-SORT.md"
      );
      const e = t;
      return e.column && e.direction ? [e] : [];
    }
    return t.filter((e) => e.column && e.direction);
  }, [t, l]), a = d.useCallback(
    (e) => {
      if (!n) return;
      const r = c.find((i) => i.column === e);
      if (s) {
        let i;
        r ? r.direction === "asc" ? i = c.map(
          (o) => o.column === e ? { column: e, direction: "desc" } : o
        ) : i = c.filter((o) => o.column !== e) : i = [...c, { column: e, direction: "asc" }], n(i);
      } else {
        let i;
        r ? r.direction === "asc" ? i = [{ column: e, direction: "desc" }] : r.direction === "desc" ? i = [] : i = [{ column: e, direction: "asc" }] : i = [{ column: e, direction: "asc" }], n(i);
      }
    },
    [c, s, n]
  ), f = d.useCallback(
    (e) => {
      const r = c.find((i) => i.column === e);
      return (r == null ? void 0 : r.direction) ?? null;
    },
    [c]
  ), u = d.useCallback(
    (e) => {
      if (!s || c.length <= 1) return;
      const r = c.findIndex((i) => i.column === e);
      return r === -1 ? void 0 : r + 1;
    },
    [c, s]
  );
  return { sortStateArray: c, handleSort: a, getSortDirection: f, getSortPriority: u };
}
export {
  A as useSort
};
//# sourceMappingURL=use-sort.mjs.map
