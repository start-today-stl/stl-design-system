import { jsx as o } from "react/jsx-runtime";
import * as n from "react";
import { cn as u } from "../../../lib/utils.mjs";
const m = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function x({
  row: r,
  columns: l,
  gridTemplateColumns: c,
  translateY: i,
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
      className: "absolute left-0 right-0 top-0 grid border-b border-slate-100 dark:border-slate-700",
      style: {
        gridTemplateColumns: c,
        transform: `translate3d(0, ${Math.round(i)}px, 0)`
      },
      children: l.map((e) => {
        const s = e.id ?? String(e.accessorKey), t = r[e.accessorKey], f = e.cell ? e.cell(t, r) : t;
        return /* @__PURE__ */ o(
          "div",
          {
            role: "gridcell",
            className: u(
              "flex items-center px-3 py-2 text-sm text-slate-700 dark:text-slate-200",
              m[e.align ?? "left"]
            ),
            children: f
          },
          s
        );
      })
    }
  );
}
const g = n.memo(x);
export {
  g as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
