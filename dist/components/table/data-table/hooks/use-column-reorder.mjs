import * as o from "react";
import { arrayMove as I } from "@dnd-kit/sortable";
function p({
  columns: i,
  columnReorderable: f,
  columnOrder: u,
  onColumnReorder: g
}) {
  const [x, l] = o.useState(
    () => i.map((e) => e.accessorKey)
  );
  o.useEffect(() => {
    !f || u || l((e) => {
      const r = i.map((t) => t.accessorKey), s = e.filter((t) => r.includes(t)), a = r.filter((t) => !s.includes(t)), d = [...s, ...a];
      return d.length === e.length && d.every((t, c) => t === e[c]) ? e : d;
    });
  }, [i, f, u]);
  const n = u ?? x, y = o.useMemo(() => f ? n.map((e) => i.find((r) => r.accessorKey === e)).filter((e) => e !== void 0) : i, [i, n, f]), C = o.useCallback(
    (e) => {
      const { active: r, over: s } = e;
      if (!s || r.id === s.id) return;
      const a = n.findIndex((c) => String(c) === r.id), d = n.findIndex((c) => String(c) === s.id);
      if (a === -1 || d === -1) return;
      const t = I(n, a, d);
      g ? g(t) : l(t);
    },
    [n, g]
  );
  return { orderedColumns: y, currentColumnOrder: n, handleColumnDragEnd: C };
}
export {
  p as useColumnReorder
};
//# sourceMappingURL=use-column-reorder.mjs.map
