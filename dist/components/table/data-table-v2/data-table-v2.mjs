import { jsxs as x, jsx as o } from "react/jsx-runtime";
import * as a from "react";
import { cn as f } from "../../../lib/utils.mjs";
import { DataTableV2Row as w } from "./data-table-v2-row.mjs";
const y = 40;
function k(t) {
  const n = (s) => typeof s == "number" ? `${s}px` : s;
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
  maxHeight: s,
  estimateRowHeight: l = y,
  className: u
}) {
  const d = a.useMemo(
    () => n.map(k).join(" "),
    [n]
  ), [c, g] = a.useState(/* @__PURE__ */ new Map()), p = a.useCallback((e, r) => {
    g((i) => {
      if (i.get(e) === r) return i;
      const m = new Map(i);
      return m.set(e, r), m;
    });
  }, []), h = a.useMemo(() => {
    const e = new Array(t.length + 1);
    e[0] = 0;
    for (let r = 0; r < t.length; r++) {
      const i = c.get(t[r].id) ?? l;
      e[r + 1] = e[r] + i;
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
        "w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm",
        "bg-white dark:bg-slate-900",
        u
      ),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            role: "row",
            className: "grid border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800",
            style: { gridTemplateColumns: d },
            children: n.map((e) => {
              const r = e.id ?? String(e.accessorKey);
              return /* @__PURE__ */ o(
                "div",
                {
                  role: "columnheader",
                  className: f(
                    "flex min-h-9 items-center pl-3 pr-1.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
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
            style: { maxHeight: typeof s == "number" ? `${s}px` : s },
            children: /* @__PURE__ */ o("div", { className: "relative", style: { height: `${b}px` }, children: t.map((e, r) => /* @__PURE__ */ o(
              w,
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
