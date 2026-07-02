import { jsxs as m, jsx as a } from "react/jsx-runtime";
import * as d from "react";
import { cn as h } from "../../../lib/utils.mjs";
import { DataTableV2Row as D } from "./data-table-v2-row.mjs";
const E = 40;
function H(r) {
  const t = (i) => typeof i == "number" ? `${i}px` : i;
  return r.width !== void 0 ? t(r.width) : r.minWidth !== void 0 ? `minmax(${t(r.minWidth)}, 1fr)` : "1fr";
}
const k = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function N({ direction: r, active: t }) {
  return /* @__PURE__ */ a(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: h(
        "transition-colors",
        t ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        r === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ a("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
}
function K(r, t, i) {
  const l = r.find((s) => s.column === t);
  return i ? l ? l.direction === "asc" ? r.map(
    (s) => s.column === t ? { column: t, direction: "desc" } : s
  ) : r.filter((s) => s.column !== t) : [...r, { column: t, direction: "asc" }] : l ? l.direction === "asc" ? [{ column: t, direction: "desc" }] : [] : [{ column: t, direction: "asc" }];
}
function S(r, t) {
  const i = [];
  for (const l of t) {
    if (l.columns.length === 0) continue;
    const s = r.findIndex((u) => u.accessorKey === l.columns[0]);
    s < 0 || i.push({ startCol: s + 1, span: l.columns.length, group: l });
  }
  return i;
}
function V({
  data: r,
  columns: t,
  headerGroups: i,
  sortState: l,
  onSortChange: s,
  multiSort: u = !1,
  maxHeight: p,
  estimateRowHeight: x = E,
  className: C
}) {
  const g = d.useMemo(
    () => t.map(H).join(" "),
    [t]
  ), f = d.useMemo(
    () => l ?? [],
    [l]
  ), M = d.useCallback(
    (e) => {
      const n = f.findIndex((c) => c.column === e);
      return n < 0 ? { direction: null, priority: void 0 } : {
        direction: f[n].direction,
        priority: u && f.length > 1 ? n + 1 : void 0
      };
    },
    [f, u]
  ), T = d.useCallback(
    (e) => {
      s && s(K(f, e, u));
    },
    [f, u, s]
  ), b = d.useMemo(
    () => i && i.length > 0 ? S(t, i) : [],
    [t, i]
  ), w = b.length > 0, [y, j] = d.useState(/* @__PURE__ */ new Map()), I = d.useCallback((e, n) => {
    j((o) => {
      if (o.get(e) === n) return o;
      const c = new Map(o);
      return c.set(e, n), c;
    });
  }, []), v = d.useMemo(() => {
    const e = new Array(r.length + 1);
    e[0] = 0;
    for (let n = 0; n < r.length; n++) {
      const o = y.get(r[n].id) ?? x;
      e[n + 1] = e[n] + o;
    }
    return e;
  }, [r, y, x]), $ = v[r.length], A = w ? 2 : 1;
  return /* @__PURE__ */ m(
    "div",
    {
      role: "grid",
      "aria-rowcount": r.length + A,
      "aria-colcount": t.length,
      className: h(
        "w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm",
        "bg-white dark:bg-slate-900",
        C
      ),
      children: [
        /* @__PURE__ */ m("div", { className: "border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800", children: [
          w && /* @__PURE__ */ a(
            "div",
            {
              role: "row",
              className: "grid border-b border-slate-200 dark:border-slate-700",
              style: { gridTemplateColumns: g },
              children: b.map((e, n) => /* @__PURE__ */ a(
                "div",
                {
                  role: "columnheader",
                  className: h(
                    "flex min-h-9 items-center pl-3 pr-1.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700 last:border-r-0",
                    k[e.group.align ?? "center"]
                  ),
                  style: {
                    gridColumnStart: e.startCol,
                    gridColumnEnd: `span ${e.span}`
                  },
                  children: e.group.header
                },
                n
              ))
            }
          ),
          /* @__PURE__ */ a("div", { role: "row", className: "grid", style: { gridTemplateColumns: g }, children: t.map((e) => {
            const n = e.id ?? String(e.accessorKey), o = M(e.accessorKey), c = h(
              "flex min-h-9 items-center pl-3 pr-1.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
              k[e.align ?? "left"]
            );
            return e.sortable ? /* @__PURE__ */ a(
              "div",
              {
                role: "columnheader",
                className: h(c, "select-none"),
                "aria-sort": o.direction === "asc" ? "ascending" : o.direction === "desc" ? "descending" : "none",
                children: /* @__PURE__ */ m(
                  "button",
                  {
                    type: "button",
                    className: "flex w-full items-center gap-1 text-left cursor-pointer",
                    onClick: () => T(e.accessorKey),
                    children: [
                      e.header,
                      /* @__PURE__ */ m("span", { className: "flex items-center gap-0.5", children: [
                        /* @__PURE__ */ m("span", { className: "flex flex-col gap-0.5", children: [
                          /* @__PURE__ */ a(N, { direction: "up", active: o.direction === "asc" }),
                          /* @__PURE__ */ a(N, { direction: "down", active: o.direction === "desc" })
                        ] }),
                        o.priority !== void 0 && /* @__PURE__ */ a("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: o.priority })
                      ] })
                    ]
                  }
                )
              },
              n
            ) : /* @__PURE__ */ a("div", { role: "columnheader", className: c, children: e.header }, n);
          }) })
        ] }),
        /* @__PURE__ */ a(
          "div",
          {
            className: "relative overflow-auto",
            style: { maxHeight: typeof p == "number" ? `${p}px` : p },
            children: /* @__PURE__ */ a("div", { className: "relative", style: { height: `${$}px` }, children: r.map((e, n) => /* @__PURE__ */ a(
              D,
              {
                row: e,
                columns: t,
                gridTemplateColumns: g,
                translateY: v[n],
                onHeightChange: I
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
  V as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
