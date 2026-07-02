import { jsx as o } from "react/jsx-runtime";
import * as n from "react";
import { cn as u } from "../../../lib/utils.mjs";
const b = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function m({
  row: r,
  columns: l,
  gridTemplateColumns: i,
  translateY: c,
  onHeightChange: d
}) {
  const a = n.useRef(null);
  return n.useLayoutEffect(() => {
    const e = a.current;
    if (!e) return;
    const s = () => d(r.id, e.offsetHeight);
    s();
    const t = new ResizeObserver(s);
    return t.observe(e), () => t.disconnect();
  }, [r.id]), /* @__PURE__ */ o(
    "div",
    {
      ref: a,
      role: "row",
      className: "absolute left-0 right-0 top-0 grid bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
      style: {
        gridTemplateColumns: i,
        transform: `translate3d(0, ${Math.round(c)}px, 0)`
      },
      children: l.map((e) => {
        const s = e.id ?? String(e.accessorKey), t = r[e.accessorKey], f = e.cell ? e.cell(t, r) : t;
        return /* @__PURE__ */ o(
          "div",
          {
            role: "gridcell",
            className: u(
              "flex min-h-9 items-center pl-3 pr-1.5 py-1.5 text-xs text-slate-900 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700",
              b[e.align ?? "left"]
            ),
            children: f
          },
          s
        );
      })
    }
  );
}
const p = n.memo(m);
export {
  p as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
