import * as u from "react";
import { cn as p } from "../../../../lib/utils.mjs";
import { DRAG_HANDLE_WIDTH as I, CHECKBOX_WIDTH as K, EXPAND_WIDTH as H } from "../types.mjs";
function E({
  columns: s,
  selectable: c,
  expandable: n,
  rowReorderable: a
}) {
  const m = u.useMemo(
    () => s.some((r) => r.sticky === "left"),
    [s]
  );
  return { getStickyStyles: u.useMemo(() => {
    const r = (t) => {
      const e = t.width ?? t.minWidth;
      if (typeof e == "number") return e;
      const o = parseInt(String(e), 10);
      return Number.isFinite(o) ? o : 150;
    }, W = s.filter((t) => t.sticky === "left"), l = s.filter((t) => t.sticky === "right"), S = a ? I : 0, x = c ? K : 0, C = n ? H : 0, D = S + x + C, f = /* @__PURE__ */ new Map();
    let g = D;
    for (const t of W)
      f.set(t.accessorKey, g), g += r(t);
    const d = /* @__PURE__ */ new Map();
    let y = 0;
    for (let t = l.length - 1; t >= 0; t--) {
      const e = l[t];
      d.set(e.accessorKey, y), y += r(e);
    }
    return (t, e, o, N) => {
      if (!t.sticky) return { style: {}, className: "" };
      const i = `${r(t)}px`, b = {
        position: "sticky",
        zIndex: e ? 20 : 10,
        width: i,
        minWidth: i,
        maxWidth: i
      }, h = N ?? o, k = "!border-b !border-slate-300 dark:!border-slate-600";
      if (t.sticky === "left") {
        const w = f.get(t.accessorKey) ?? 0;
        return {
          style: { ...b, left: `${w}px` },
          className: p(
            "transition-colors",
            k,
            e ? "bg-slate-100 dark:bg-slate-800" : h ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
          )
        };
      }
      const P = d.get(t.accessorKey) ?? 0;
      return {
        style: { ...b, right: `${P}px` },
        className: p(
          "transition-colors",
          k,
          e ? "bg-slate-100 dark:bg-slate-800" : h ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
        )
      };
    };
  }, [s, c, n, a]), hasLeftStickyColumns: m };
}
export {
  E as useStickyStyles
};
//# sourceMappingURL=use-sticky-styles.mjs.map
