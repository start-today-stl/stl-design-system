import * as n from "react";
function v({
  data: t,
  selectable: m,
  selectedIds: i,
  defaultSelectedIds: k,
  onSelectionChange: f
}) {
  const [d, R] = n.useState(
    () => new Set(k ?? [])
  ), l = n.useMemo(() => m ? i ? new Set(i) : d : /* @__PURE__ */ new Set(), [m, i, d]), s = n.useRef(null), r = n.useCallback(
    (e) => {
      f ? f(Array.from(e)) : R(e);
    },
    [f]
  ), b = n.useCallback(
    (e) => l.has(e),
    [l]
  ), u = t.length > 0 && t.every((e) => l.has(e.id)), g = !u && t.some((e) => l.has(e.id)), h = n.useCallback(
    (e, o, y) => {
      const c = new Set(l), w = c.has(e);
      if (y && s.current !== null) {
        const [C, A] = s.current < o ? [s.current, o] : [o, s.current];
        for (let S = C; S <= A; S++) {
          const a = t[S];
          a && (w ? c.delete(a.id) : c.add(a.id));
        }
      } else
        w ? c.delete(e) : c.add(e);
      s.current = o, r(c);
    },
    [l, t, r]
  ), p = n.useCallback(() => {
    r(u ? /* @__PURE__ */ new Set() : new Set(t.map((e) => e.id))), s.current = null;
  }, [u, t, r]);
  return { selectedSet: l, isSelected: b, allSelected: u, someSelected: g, toggleRow: h, toggleAll: p };
}
export {
  v as useRowSelection
};
//# sourceMappingURL=use-row-selection.mjs.map
