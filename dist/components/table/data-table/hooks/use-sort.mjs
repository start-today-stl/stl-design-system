import * as o from "react";
function u({
  sortState: n,
  onSortChange: t,
  multiSort: s
}) {
  const c = o.useMemo(() => {
    if (!n) return [];
    if (!Array.isArray(n)) {
      const e = n;
      return e.column && e.direction ? [e] : [];
    }
    return n.filter((e) => e.column && e.direction);
  }, [n]), l = o.useCallback(
    (e) => {
      if (!t) return;
      const r = c.find((i) => i.column === e);
      if (s) {
        let i;
        r ? r.direction === "asc" ? i = c.map(
          (d) => d.column === e ? { column: e, direction: "desc" } : d
        ) : i = c.filter((d) => d.column !== e) : i = [...c, { column: e, direction: "asc" }], t(i);
      } else {
        let i;
        r ? r.direction === "asc" ? i = [{ column: e, direction: "desc" }] : r.direction === "desc" ? i = [] : i = [{ column: e, direction: "asc" }] : i = [{ column: e, direction: "asc" }], t(i);
      }
    },
    [c, s, t]
  ), f = o.useCallback(
    (e) => {
      const r = c.find((i) => i.column === e);
      return (r == null ? void 0 : r.direction) ?? null;
    },
    [c]
  ), a = o.useCallback(
    (e) => {
      if (!s || c.length <= 1) return;
      const r = c.findIndex((i) => i.column === e);
      return r === -1 ? void 0 : r + 1;
    },
    [c, s]
  );
  return { sortStateArray: c, handleSort: l, getSortDirection: f, getSortPriority: a };
}
export {
  u as useSort
};
//# sourceMappingURL=use-sort.mjs.map
