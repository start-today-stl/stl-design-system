import { jsx as r, jsxs as o } from "react/jsx-runtime";
import * as C from "react";
import { ResponsiveContainer as I, AreaChart as w, CartesianGrid as L, XAxis as S, YAxis as T, Tooltip as K, Area as _ } from "recharts";
import { cn as E } from "../lib/utils.mjs";
const e = "var(--color-primary)", d = "var(--color-primary)", N = "var(--color-border)", c = "var(--color-muted-foreground)", f = "var(--color-muted-foreground)";
function G({
  data: h,
  xKey: m,
  yKey: u,
  height: k = 240,
  tooltipLabel: s,
  tooltipFormatter: i,
  showXAxis: p = !0,
  showYAxis: x = !0,
  showGrid: v = !0,
  showDots: b = !0,
  curveType: R = "linear",
  className: g,
  ...y
}) {
  const a = C.useId();
  return /* @__PURE__ */ r(
    "div",
    {
      className: E(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4",
        g
      ),
      ...y,
      children: /* @__PURE__ */ r(I, { width: "100%", height: k, children: /* @__PURE__ */ o(w, { data: h, margin: { top: 12, right: 12, left: -8, bottom: 0 }, children: [
        /* @__PURE__ */ r("defs", { children: /* @__PURE__ */ o("linearGradient", { id: a, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ r("stop", { offset: "0%", stopColor: d, stopOpacity: 0.4 }),
          /* @__PURE__ */ r("stop", { offset: "100%", stopColor: d, stopOpacity: 0.04 })
        ] }) }),
        v && /* @__PURE__ */ r(
          L,
          {
            stroke: N,
            strokeDasharray: "0",
            horizontal: !0,
            vertical: !1
          }
        ),
        p && /* @__PURE__ */ r(
          S,
          {
            dataKey: m,
            stroke: c,
            tickLine: !1,
            axisLine: !1,
            tick: { fontSize: 12, fill: f }
          }
        ),
        x && /* @__PURE__ */ r(
          T,
          {
            stroke: c,
            tickLine: !1,
            axisLine: !1,
            tick: { fontSize: 12, fill: f },
            width: 32
          }
        ),
        /* @__PURE__ */ r(
          K,
          {
            cursor: { stroke: e, strokeWidth: 1 },
            content: ({ active: A, payload: t }) => {
              if (!A || !(t != null && t.length)) return null;
              const l = t[0], n = l.value, O = l.payload;
              return /* @__PURE__ */ o("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                s && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: s }),
                /* @__PURE__ */ r("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: i ? i(n, O) : n })
              ] });
            }
          }
        ),
        /* @__PURE__ */ r(
          _,
          {
            type: R,
            dataKey: u,
            stroke: e,
            strokeWidth: 2,
            fill: `url(#${a})`,
            dot: b ? {
              r: 3,
              fill: e,
              stroke: "none",
              strokeWidth: 0,
              fillOpacity: 1
            } : !1,
            activeDot: { r: 5, fill: e, stroke: "none", strokeWidth: 0, fillOpacity: 1 }
          }
        )
      ] }) })
    }
  );
}
export {
  G as AreaChart
};
//# sourceMappingURL=area-chart.mjs.map
