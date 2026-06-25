import { jsxs as c, jsx as t } from "react/jsx-runtime";
import * as m from "react";
import { ResponsiveContainer as W, ScatterChart as Y, CartesianGrid as U, XAxis as Z, YAxis as q, ZAxis as B, Tooltip as H, ReferenceLine as J, Scatter as Q } from "recharts";
import { cn as V } from "../lib/utils.mjs";
import { ChartLegend as F } from "./chart-legend.mjs";
const y = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
  "var(--color-muted-foreground)"
], z = "var(--color-border)", N = "var(--color-border)", C = "var(--color-muted-foreground)";
function oe({
  title: p,
  series: v,
  height: M = 280,
  pointSize: d = 8,
  activePointSize: L = 16,
  pointColor: A,
  xDomain: R,
  yDomain: S,
  xTickFormatter: x,
  yTickFormatter: f,
  showXAxis: w = !0,
  showYAxis: E = !0,
  showGrid: O = !0,
  trendLine: I = !0,
  trendLineFrom: T,
  trendLineTo: _,
  legend: h,
  tooltipLabel: g,
  tooltipFormatter: k,
  className: D,
  ...G
}) {
  const o = m.useMemo(
    () => v.map((e, r) => ({
      ...e,
      color: e.color ?? y[r % y.length]
    })),
    [v]
  ), b = m.useMemo(() => {
    if (h)
      return h.map((e, r) => {
        var l;
        return {
          label: e.label,
          color: e.color ?? ((l = o[r]) == null ? void 0 : l.color)
        };
      });
    if (!(o.length <= 1))
      return o.map((e) => ({ label: e.name, color: e.color }));
  }, [h, o]), s = m.useMemo(
    () => o.flatMap((e) => e.data),
    [o]
  );
  s.length && Math.min(...s.map((e) => e.x));
  const K = s.length ? Math.max(...s.map((e) => e.x)) : 1;
  s.length && Math.min(...s.map((e) => e.y));
  const X = s.length ? Math.max(...s.map((e) => e.y)) : 1, $ = T ?? { x: 0, y: 0 }, P = _ ?? { x: K, y: X }, j = m.useId(), u = o.map(
    (e, r) => `${j}-scatter-active-${r}`
  );
  return /* @__PURE__ */ c(
    "div",
    {
      className: V(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-3",
        D
      ),
      ...G,
      children: [
        p && /* @__PURE__ */ t("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: p }),
        b && /* @__PURE__ */ t(F, { items: b }),
        /* @__PURE__ */ t(W, { width: "100%", height: M, children: /* @__PURE__ */ c(Y, { margin: { top: 12, right: 12, left: -8, bottom: 0 }, children: [
          /* @__PURE__ */ t("defs", { children: o.map((e, r) => /* @__PURE__ */ c(
            "linearGradient",
            {
              id: u[r],
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [
                /* @__PURE__ */ t("stop", { offset: "0%", stopColor: e.color }),
                /* @__PURE__ */ t("stop", { offset: "100%", stopColor: "var(--color-blue-200)" })
              ]
            },
            u[r]
          )) }),
          O && /* @__PURE__ */ t(
            U,
            {
              stroke: z,
              strokeDasharray: "0",
              strokeWidth: 0.5
            }
          ),
          w && /* @__PURE__ */ t(
            Z,
            {
              type: "number",
              dataKey: "x",
              domain: R,
              stroke: N,
              tickLine: !1,
              axisLine: !1,
              tick: { fontSize: 12, fill: C },
              tickFormatter: x
            }
          ),
          E && /* @__PURE__ */ t(
            q,
            {
              type: "number",
              dataKey: "y",
              domain: S,
              stroke: N,
              tickLine: !1,
              axisLine: !1,
              tick: { fontSize: 12, fill: C },
              tickFormatter: f,
              width: 40
            }
          ),
          /* @__PURE__ */ t(B, { type: "number", range: [d * d, d * d] }),
          /* @__PURE__ */ t(
            H,
            {
              cursor: { stroke: "transparent" },
              isAnimationActive: !1,
              content: ({ active: e, payload: r }) => {
                if (!e || !(r != null && r.length)) return null;
                const l = r[0], a = l.payload, n = l.name ?? "";
                return /* @__PURE__ */ c("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                  g && /* @__PURE__ */ t("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: g }),
                  k ? /* @__PURE__ */ t("div", { className: "text-sm text-slate-700 dark:text-slate-100", children: k(a, n) }) : /* @__PURE__ */ c("div", { className: "flex flex-col gap-0.5 text-sm text-slate-700 dark:text-slate-100", children: [
                    o.length > 1 && /* @__PURE__ */ t("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: n }),
                    a.name && /* @__PURE__ */ t("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: a.name }),
                    /* @__PURE__ */ c("div", { className: "flex gap-3 font-medium", children: [
                      /* @__PURE__ */ c("span", { children: [
                        /* @__PURE__ */ t("span", { className: "text-slate-500 dark:text-slate-400 mr-1", children: "x:" }),
                        x ? x(a.x) : a.x
                      ] }),
                      /* @__PURE__ */ c("span", { children: [
                        /* @__PURE__ */ t("span", { className: "text-slate-500 dark:text-slate-400 mr-1", children: "y:" }),
                        f ? f(a.y) : a.y
                      ] })
                    ] })
                  ] })
                ] });
              }
            }
          ),
          I && /* @__PURE__ */ t(
            J,
            {
              ifOverflow: "extendDomain",
              segment: [$, P],
              stroke: "var(--color-border)",
              strokeWidth: 0.5
            }
          ),
          o.map((e, r) => {
            const l = A ?? "var(--color-muted-foreground)";
            return /* @__PURE__ */ t(
              Q,
              {
                name: e.name,
                data: e.data,
                fill: l,
                shape: (a) => {
                  const { cx: n, cy: i } = a;
                  return n === void 0 || i === void 0 ? /* @__PURE__ */ t("g", {}) : /* @__PURE__ */ t(
                    "circle",
                    {
                      cx: n,
                      cy: i,
                      r: d / 2,
                      fill: l,
                      fillOpacity: 0.5
                    }
                  );
                },
                activeShape: (a) => {
                  const { cx: n, cy: i } = a;
                  return n === void 0 || i === void 0 ? /* @__PURE__ */ t("g", {}) : /* @__PURE__ */ t(
                    "circle",
                    {
                      cx: n,
                      cy: i,
                      r: L / 2,
                      fill: `url(#${u[r]})`
                    }
                  );
                }
              },
              e.name
            );
          })
        ] }) })
      ]
    }
  );
}
export {
  oe as ScatterChart
};
//# sourceMappingURL=scatter-chart.mjs.map
