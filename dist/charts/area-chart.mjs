import { jsxs as s, jsx as e } from "react/jsx-runtime";
import * as R from "react";
import { ResponsiveContainer as w, AreaChart as L, CartesianGrid as T, XAxis as N, YAxis as S, Tooltip as D, Area as E } from "recharts";
import { cn as I } from "../lib/utils.mjs";
const K = "var(--color-primary)", W = "var(--color-border)", c = "var(--color-muted-foreground)", f = "var(--color-muted-foreground)";
function X({
  title: a,
  data: m,
  xKey: h,
  yKey: u,
  height: k = 240,
  tooltipLabel: i,
  tooltipFormatter: o,
  showXAxis: x = !0,
  showYAxis: p = !0,
  showGrid: v = !0,
  showDots: b = !0,
  curveType: g = "linear",
  color: t = K,
  className: O,
  ...C
}) {
  const l = R.useId();
  return /* @__PURE__ */ s(
    "div",
    {
      className: I(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-3",
        O
      ),
      ...C,
      children: [
        a && /* @__PURE__ */ e("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: a }),
        /* @__PURE__ */ e(w, { width: "100%", height: k, children: /* @__PURE__ */ s(L, { data: m, margin: { top: 12, right: 12, left: -8, bottom: 0 }, children: [
          /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ s("linearGradient", { id: l, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ e("stop", { offset: "0%", stopColor: t, stopOpacity: 0.4 }),
            /* @__PURE__ */ e("stop", { offset: "100%", stopColor: t, stopOpacity: 0.04 })
          ] }) }),
          v && /* @__PURE__ */ e(
            T,
            {
              stroke: W,
              strokeDasharray: "0",
              horizontal: !0,
              vertical: !1
            }
          ),
          x && /* @__PURE__ */ e(
            N,
            {
              dataKey: h,
              stroke: c,
              tickLine: !1,
              axisLine: !1,
              tick: { fontSize: 12, fill: f }
            }
          ),
          p && /* @__PURE__ */ e(
            S,
            {
              stroke: c,
              tickLine: !1,
              axisLine: !1,
              tick: { fontSize: 12, fill: f },
              width: 32
            }
          ),
          /* @__PURE__ */ e(
            D,
            {
              cursor: { stroke: t, strokeWidth: 1 },
              content: ({ active: y, payload: r }) => {
                if (!y || !(r != null && r.length)) return null;
                const d = r[0], n = d.value, A = d.payload;
                return /* @__PURE__ */ s("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                  i && /* @__PURE__ */ e("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: i }),
                  /* @__PURE__ */ e("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: o ? o(n, A) : n })
                ] });
              }
            }
          ),
          /* @__PURE__ */ e(
            E,
            {
              type: g,
              dataKey: u,
              stroke: t,
              strokeWidth: 2,
              fill: `url(#${l})`,
              dot: b ? {
                r: 3,
                fill: t,
                stroke: "none",
                strokeWidth: 0,
                fillOpacity: 1
              } : !1,
              activeDot: { r: 5, fill: t, stroke: "none", strokeWidth: 0, fillOpacity: 1 }
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  X as AreaChart
};
//# sourceMappingURL=area-chart.mjs.map
