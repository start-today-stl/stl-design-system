import * as k from "react";
import { cn as u } from "../../../../lib/utils.mjs";
import { DRAG_HANDLE_WIDTH as w, CHECKBOX_WIDTH as I, EXPAND_WIDTH as K } from "../types.mjs";
function A({
  columns: s,
  selectable: c,
  expandable: n,
  rowReorderable: l
}) {
  const p = k.useMemo(
    () => s.some((i) => i.sticky === "left"),
    [s]
  );
  return { getStickyStyles: k.useMemo(() => {
    const i = (t) => {
      const e = t.width ?? t.minWidth;
      if (typeof e == "number") return e;
      const o = parseInt(String(e), 10);
      return Number.isFinite(o) ? o : 150;
    }, m = s.filter((t) => t.sticky === "left"), a = s.filter((t) => t.sticky === "right"), W = l ? w : 0, S = c ? I : 0, x = n ? K : 0, C = W + S + x, f = /* @__PURE__ */ new Map();
    let g = C;
    for (const t of m)
      f.set(t.accessorKey, g), g += i(t);
    const y = /* @__PURE__ */ new Map();
    let h = 0;
    for (let t = a.length - 1; t >= 0; t--) {
      const e = a[t];
      y.set(e.accessorKey, h), h += i(e);
    }
    return (t, e, o, D) => {
      if (!t.sticky) return { style: {}, className: "" };
      const r = `${i(t)}px`, d = {
        position: "sticky",
        zIndex: e ? 20 : 10,
        width: r,
        minWidth: r,
        maxWidth: r
      }, b = D ?? o;
      if (t.sticky === "left") {
        const P = f.get(t.accessorKey) ?? 0;
        return {
          style: { ...d, left: `${P}px` },
          className: u(
            "transition-colors",
            e ? "bg-slate-100 dark:bg-slate-800" : b ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
          )
        };
      }
      const N = y.get(t.accessorKey) ?? 0;
      return {
        style: { ...d, right: `${N}px` },
        className: u(
          "transition-colors",
          e ? "bg-slate-100 dark:bg-slate-800" : b ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
        )
      };
    };
  }, [s, c, n, l]), hasLeftStickyColumns: p };
}
export {
  A as useStickyStyles
};
//# sourceMappingURL=use-sticky-styles.mjs.map
