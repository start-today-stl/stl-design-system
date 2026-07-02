import { jsxs as x, jsx as o } from "react/jsx-runtime";
import * as a from "react";
import { cn as f } from "../../../lib/utils.mjs";
import { DataTableV2Row as y } from "./data-table-v2-row.mjs";
const w = 40;
function k(t) {
  const n = (i) => typeof i == "number" ? `${i}px` : i;
  return t.width !== void 0 ? n(t.width) : t.minWidth !== void 0 ? `minmax(${n(t.minWidth)}, 1fr)` : "1fr";
}
const v = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function N({
  data: t,
  columns: n,
  maxHeight: i,
  estimateRowHeight: l = w,
  className: g
}) {
  const d = a.useMemo(
    () => n.map(k).join(" "),
    [n]
  ), [c, u] = a.useState(/* @__PURE__ */ new Map()), p = a.useCallback((e, r) => {
    u((s) => {
      if (s.get(e) === r) return s;
      const m = new Map(s);
      return m.set(e, r), m;
    });
  }, []), h = a.useMemo(() => {
    const e = new Array(t.length + 1);
    e[0] = 0;
    for (let r = 0; r < t.length; r++) {
      const s = c.get(t[r].id) ?? l;
      e[r + 1] = e[r] + s;
    }
    return e;
  }, [t, c, l]), b = h[t.length];
  return /* @__PURE__ */ x(
    "div",
    {
      role: "grid",
      "aria-rowcount": t.length + 1,
      "aria-colcount": n.length,
      className: f(
        "w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        g
      ),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            role: "row",
            className: "grid border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800",
            style: { gridTemplateColumns: d },
            children: n.map((e) => {
              const r = e.id ?? String(e.accessorKey);
              return /* @__PURE__ */ o(
                "div",
                {
                  role: "columnheader",
                  className: f(
                    "flex items-center px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200",
                    v[e.align ?? "left"]
                  ),
                  children: e.header
                },
                r
              );
            })
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            className: "relative overflow-auto",
            style: { maxHeight: typeof i == "number" ? `${i}px` : i },
            children: /* @__PURE__ */ o("div", { className: "relative", style: { height: `${b}px` }, children: t.map((e, r) => /* @__PURE__ */ o(
              y,
              {
                row: e,
                columns: n,
                gridTemplateColumns: d,
                translateY: h[r],
                onHeightChange: p
              },
              e.id
            )) })
          }
        )
      ]
    }
  );
}
export {
  N as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
