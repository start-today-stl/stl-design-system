import * as l from "react";
import { arrayMove as g } from "@dnd-kit/sortable";
function p({
  data: n,
  onRowReorder: i
}) {
  return { handleRowDragEnd: l.useCallback(
    (a) => {
      const { active: e, over: t } = a;
      if (!t || e.id === t.id) return;
      const s = String(e.id).replace(/^row-/, ""), o = String(t.id).replace(/^row-/, ""), c = n.findIndex((r) => String(r.id) === s), d = n.findIndex((r) => String(r.id) === o);
      if (c === -1 || d === -1) return;
      const f = g(n, c, d);
      i == null || i(f);
    },
    [n, i]
  ) };
}
export {
  p as useRowReorder
};
//# sourceMappingURL=use-row-reorder.mjs.map
