import { jsx as t, jsxs as s } from "react/jsx-runtime";
import * as A from "react";
import { ResponsiveContainer as R, AreaChart as w, CartesianGrid as L, XAxis as T, YAxis as S, Tooltip as D, Area as E } from "recharts";
import { cn as I } from "../lib/utils.mjs";
const K = "var(--color-primary)", N = "var(--color-border)", l = "var(--color-muted-foreground)", c = "var(--color-muted-foreground)";
function G({
  data: f,
  xKey: h,
  yKey: u,
  height: k = 240,
  tooltipLabel: i,
  tooltipFormatter: a,
  showXAxis: m = !0,
  showYAxis: x = !0,
  showGrid: p = !0,
  showDots: v = !0,
  curveType: b = "linear",
  color: e = K,
  className: g,
  ...O
}) {
  const o = A.useId();
  return /* @__PURE__ */ t(
    "div",
    {
      className: I(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4",
        g
      ),
      ...O,
      children: /* @__PURE__ */ t(R, { width: "100%", height: k, children: /* @__PURE__ */ s(w, { data: f, margin: { top: 12, right: 12, left: -8, bottom: 0 }, children: [
        /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ s("linearGradient", { id: o, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ t("stop", { offset: "0%", stopColor: e, stopOpacity: 0.4 }),
          /* @__PURE__ */ t("stop", { offset: "100%", stopColor: e, stopOpacity: 0.04 })
        ] }) }),
        p && /* @__PURE__ */ t(
          L,
          {
            stroke: N,
            strokeDasharray: "0",
            horizontal: !0,
            vertical: !1
          }
        ),
        m && /* @__PURE__ */ t(
          T,
          {
            dataKey: h,
            stroke: l,
            tickLine: !1,
            axisLine: !1,
            tick: { fontSize: 12, fill: c }
          }
        ),
        x && /* @__PURE__ */ t(
          S,
          {
            stroke: l,
            tickLine: !1,
            axisLine: !1,
            tick: { fontSize: 12, fill: c },
            width: 32
          }
        ),
        /* @__PURE__ */ t(
          D,
          {
            cursor: { stroke: e, strokeWidth: 1 },
            content: ({ active: C, payload: r }) => {
              if (!C || !(r != null && r.length)) return null;
              const n = r[0], d = n.value, y = n.payload;
              return /* @__PURE__ */ s("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                i && /* @__PURE__ */ t("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: i }),
                /* @__PURE__ */ t("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: a ? a(d, y) : d })
              ] });
            }
          }
        ),
        /* @__PURE__ */ t(
          E,
          {
            type: b,
            dataKey: u,
            stroke: e,
            strokeWidth: 2,
            fill: `url(#${o})`,
            dot: v ? {
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
