import { jsx as r, jsxs as o } from "react/jsx-runtime";
import * as I from "react";
import { ResponsiveContainer as O, AreaChart as w, CartesianGrid as L, XAxis as S, YAxis as T, Tooltip as K, Area as _ } from "recharts";
import { cn as E } from "../lib/utils.mjs";
const t = "var(--color-primary)", d = "var(--color-primary)", N = "var(--color-border)", c = "var(--color-muted-foreground)", f = "var(--color-muted-foreground)";
function X({
  data: m,
  xKey: u,
  yKey: h,
  height: k = 240,
  tooltipLabel: s,
  tooltipFormatter: a,
  showXAxis: x = !0,
  showYAxis: p = !0,
  showGrid: v = !0,
  showDots: b = !0,
  curveType: R = "linear",
  className: g,
  ...A
}) {
  const i = I.useId();
  return /* @__PURE__ */ r(
    "div",
    {
      className: E(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4",
        g
      ),
      ...A,
      children: /* @__PURE__ */ r(O, { width: "100%", height: k, children: /* @__PURE__ */ o(w, { data: m, margin: { top: 12, right: 12, left: -8, bottom: 0 }, children: [
        /* @__PURE__ */ r("defs", { children: /* @__PURE__ */ o("linearGradient", { id: i, x1: "0", y1: "0", x2: "0", y2: "1", children: [
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
        x && /* @__PURE__ */ r(
          S,
          {
            dataKey: u,
            stroke: c,
            tickLine: !1,
            axisLine: !1,
            tick: { fontSize: 12, fill: f }
          }
        ),
        p && /* @__PURE__ */ r(
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
            cursor: { stroke: t, strokeWidth: 1 },
            content: ({ active: C, payload: e }) => {
              if (!C || !(e != null && e.length)) return null;
              const n = e[0], l = n.value, y = n.payload;
              return /* @__PURE__ */ o("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                s && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: s }),
                /* @__PURE__ */ r("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: a ? a(l, y) : l })
              ] });
            }
          }
        ),
        /* @__PURE__ */ r(
          _,
          {
            type: R,
            dataKey: h,
            stroke: t,
            strokeWidth: 2,
            fill: `url(#${i})`,
            dot: b ? {
              r: 3,
              fill: t,
              stroke: "none"
            } : !1,
            activeDot: { r: 5, fill: t, stroke: "none" }
          }
        )
      ] }) })
    }
  );
}
export {
  X as AreaChart
};
//# sourceMappingURL=area-chart.mjs.map
