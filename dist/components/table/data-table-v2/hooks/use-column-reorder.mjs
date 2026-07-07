import * as o from "react";
import { arrayMove as h } from "@dnd-kit/sortable";
function K({
  columns: i,
  columnReorderable: a,
  columnOrder: u,
  onColumnReorder: x
}) {
  const [g, y] = o.useState(
    () => i.map((t) => t.accessorKey)
  );
  o.useEffect(() => {
    !a || u || y((t) => {
      const r = i.map((e) => e.accessorKey), s = t.filter((e) => r.includes(e)), c = r.filter((e) => !s.includes(e)), d = [...s, ...c];
      return d.length === t.length && d.every((e, f) => e === t[f]) ? t : d;
    });
  }, [i, a, u]);
  const n = u ?? g, I = o.useMemo(() => a ? n.map((t) => i.find((r) => r.accessorKey === t)).filter((t) => t !== void 0) : i, [i, n, a]), p = o.useCallback(
    (t) => {
      const { active: r, over: s } = t;
      if (!s || r.id === s.id) return;
      const c = n.findIndex((f) => String(f) === r.id), d = n.findIndex((f) => String(f) === s.id);
      if (c < 0 || d < 0) return;
      const e = h(n, c, d);
      x ? x(e) : y(e);
    },
    [n, x]
  );
  return { orderedColumns: I, currentOrder: n, handleColumnDragEnd: p };
}
export {
  K as useColumnReorder
};
//# sourceMappingURL=use-column-reorder.mjs.map
