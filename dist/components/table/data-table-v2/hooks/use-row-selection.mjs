import * as t from "react";
function q({
  data: l,
  selectable: R,
  selectedIds: f,
  defaultSelectedIds: g,
  onSelectionChange: i
}) {
  const [m, h] = t.useState(
    () => new Set(g ?? [])
  ), n = t.useMemo(() => R ? f ? new Set(f) : m : /* @__PURE__ */ new Set(), [R, f, m]), r = t.useRef(null), s = t.useCallback(
    (e) => {
      i ? i(Array.from(e)) : h(e);
    },
    [i]
  ), p = t.useCallback(
    (e) => n.has(e),
    [n]
  ), u = l.length > 0 && l.every((e) => n.has(e.id)), y = !u && l.some((e) => n.has(e.id)), w = t.useRef(n);
  w.current = n;
  const a = t.useRef(l);
  a.current = l;
  const k = t.useRef(u);
  k.current = u;
  const C = t.useCallback(
    (e, o, v) => {
      const c = new Set(w.current), b = c.has(e);
      if (v && r.current !== null) {
        const [M, j] = r.current < o ? [r.current, o] : [o, r.current];
        for (let S = M; S <= j; S++) {
          const d = a.current[S];
          d && (b ? c.delete(d.id) : c.add(d.id));
        }
      } else
        b ? c.delete(e) : c.add(e);
      r.current = o, s(c);
    },
    [s]
  ), A = t.useCallback(() => {
    k.current ? s(/* @__PURE__ */ new Set()) : s(new Set(a.current.map((e) => e.id))), r.current = null;
  }, [s]);
  return { selectedSet: n, isSelected: p, allSelected: u, someSelected: y, toggleRow: C, toggleAll: A };
}
export {
  q as useRowSelection
};
//# sourceMappingURL=use-row-selection.mjs.map
