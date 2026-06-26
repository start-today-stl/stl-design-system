import { jsxs as o, jsx as r } from "react/jsx-runtime";
import * as S from "react";
import { ResponsiveContainer as E, LineChart as w, CartesianGrid as O, XAxis as A, YAxis as _, Tooltip as z, Line as D } from "recharts";
import { cn as W } from "../lib/utils.mjs";
const u = [
  "var(--color-primary)",
  "var(--color-muted-foreground)",
  "var(--color-green-500)",
  "var(--color-red-500)"
], X = "var(--color-border)", h = "var(--color-muted-foreground)", x = "var(--color-muted-foreground)", j = "var(--color-primary)";
function M({
  title: l,
  data: k,
  xKey: v,
  lines: n,
  height: g = 240,
  tooltipLabel: d,
  tooltipFormatter: i,
  showXAxis: p = !0,
  showYAxis: b = !0,
  showGrid: K = !0,
  showDots: L = !0,
  curveType: N = "linear",
  className: R,
  ...T
}) {
  const c = S.useMemo(
    () => n.map((e, t) => ({
      ...e,
      color: e.color ?? u[t % u.length]
    })),
    [n]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      className: W(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-3",
        R
      ),
      ...T,
      children: [
        l && /* @__PURE__ */ r("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: l }),
        /* @__PURE__ */ r(E, { width: "100%", height: g, children: /* @__PURE__ */ o(w, { data: k, margin: { top: 12, right: 12, left: -8, bottom: 0 }, children: [
          K && /* @__PURE__ */ r(
            O,
            {
              stroke: X,
              strokeDasharray: "0",
              horizontal: !0,
              vertical: !1
            }
          ),
          p && /* @__PURE__ */ r(
            A,
            {
              dataKey: v,
              stroke: h,
              tickLine: !1,
              axisLine: !1,
              tick: { fontSize: 12, fill: x }
            }
          ),
          b && /* @__PURE__ */ r(
            _,
            {
              stroke: h,
              tickLine: !1,
              axisLine: !1,
              tick: { fontSize: 12, fill: x },
              width: 32
            }
          ),
          /* @__PURE__ */ r(
            z,
            {
              cursor: { stroke: j, strokeWidth: 1 },
              content: ({ active: e, payload: t }) => {
                var m;
                if (!e || !(t != null && t.length)) return null;
                const y = ((m = t[0]) == null ? void 0 : m.payload) ?? {};
                return /* @__PURE__ */ o("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                  d && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: d }),
                  /* @__PURE__ */ r("div", { className: "flex flex-col gap-1", children: t.map((s) => {
                    const a = c.find((C) => C.dataKey === s.dataKey);
                    if (!a) return null;
                    const f = s.value;
                    return /* @__PURE__ */ o(
                      "div",
                      {
                        className: "flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100",
                        children: [
                          /* @__PURE__ */ r(
                            "span",
                            {
                              "aria-hidden": !0,
                              className: "size-2 rounded-full shrink-0",
                              style: { backgroundColor: a.color }
                            }
                          ),
                          t.length > 1 && a.name && /* @__PURE__ */ r("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: a.name }),
                          /* @__PURE__ */ r("span", { className: "font-medium", children: i ? i(f, a, y) : f })
                        ]
                      },
                      String(s.dataKey)
                    );
                  }) })
                ] });
              }
            }
          ),
          c.map((e) => /* @__PURE__ */ r(
            D,
            {
              type: N,
              dataKey: e.dataKey,
              stroke: e.color,
              strokeWidth: 2,
              dot: L ? {
                r: 3,
                fill: e.color,
                stroke: "none",
                strokeWidth: 0
              } : !1,
              activeDot: { r: 5, fill: e.color, stroke: "none", strokeWidth: 0 },
              name: e.name ?? e.dataKey
            },
            e.dataKey
          ))
        ] }) })
      ]
    }
  );
}
export {
  M as LineChart
};
//# sourceMappingURL=line-chart.mjs.map
