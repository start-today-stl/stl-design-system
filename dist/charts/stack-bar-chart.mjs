import { jsxs as u, jsx as t } from "react/jsx-runtime";
import * as K from "react";
import { ResponsiveContainer as B, BarChart as D, CartesianGrid as G, XAxis as X, YAxis as $, Tooltip as j, Bar as F, Rectangle as M } from "recharts";
import { cn as H } from "../lib/utils.mjs";
import { ChartLegend as P } from "./chart-legend.mjs";
const L = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)"
], U = "var(--color-border)", T = "var(--color-muted-foreground)", R = "var(--color-muted-foreground)", Y = "stack", q = (i, v, a, h) => (p) => {
  const d = p.payload, n = v.filter((y) => Number((d == null ? void 0 : d[y]) ?? 0) > 0), s = n[0] === i, l = n[n.length - 1] === i;
  return /* @__PURE__ */ t(M, { ...p, radius: h ? [
    s ? a : 0,
    // top-left
    l ? a : 0,
    // top-right
    l ? a : 0,
    // bottom-right
    s ? a : 0
    // bottom-left
  ] : [
    l ? a : 0,
    // top-left
    l ? a : 0,
    // top-right
    s ? a : 0,
    // bottom-right
    s ? a : 0
    // bottom-left
  ] });
};
function Z({
  title: i,
  data: v,
  xKey: a,
  bars: h,
  orientation: p = "vertical",
  height: d = 240,
  gradient: n = !0,
  barRadius: s = 0,
  tooltipLabel: l,
  tooltipFormatter: k,
  showXAxis: y = !0,
  showYAxis: z = !0,
  showGrid: I = !0,
  legend: m,
  className: w,
  ...A
}) {
  const E = K.useId(), r = p === "horizontal", c = K.useMemo(
    () => h.map((e, o) => ({
      ...e,
      color: e.color ?? L[o % L.length]
    })),
    [h]
  ), b = (e) => `${E}-${e}`, C = K.useMemo(() => {
    if (m != null && m.length)
      return m.map((e, o) => {
        var x;
        return {
          label: e.label,
          color: e.color ?? ((x = c[o]) == null ? void 0 : x.color)
        };
      });
  }, [m, c]), O = c.map((e) => e.dataKey);
  return /* @__PURE__ */ u(
    "div",
    {
      className: H(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-3",
        w
      ),
      ...A,
      children: [
        i && /* @__PURE__ */ t("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: i }),
        C && /* @__PURE__ */ t(P, { items: C }),
        /* @__PURE__ */ t(B, { width: "100%", height: d, children: /* @__PURE__ */ u(
          D,
          {
            data: v,
            layout: r ? "vertical" : "horizontal",
            margin: { top: 12, right: 12, left: -8, bottom: 0 },
            children: [
              n && /* @__PURE__ */ t("defs", { children: c.map((e) => /* @__PURE__ */ u(
                "linearGradient",
                {
                  id: b(e.dataKey),
                  x1: "0",
                  y1: "0",
                  x2: r ? "1" : "0",
                  y2: r ? "0" : "1",
                  children: [
                    /* @__PURE__ */ t("stop", { offset: "0%", stopColor: e.color, stopOpacity: r ? 0.2 : 0.9 }),
                    /* @__PURE__ */ t("stop", { offset: "100%", stopColor: e.color, stopOpacity: r ? 0.9 : 0.2 })
                  ]
                },
                e.dataKey
              )) }),
              I && /* @__PURE__ */ t(
                G,
                {
                  stroke: U,
                  strokeDasharray: "0",
                  horizontal: !r,
                  vertical: r
                }
              ),
              y && /* @__PURE__ */ t(
                X,
                {
                  type: r ? "number" : "category",
                  dataKey: r ? void 0 : a,
                  stroke: T,
                  tickLine: !1,
                  axisLine: !1,
                  tick: { fontSize: 12, fill: R }
                }
              ),
              z && /* @__PURE__ */ t(
                $,
                {
                  type: r ? "category" : "number",
                  dataKey: r ? a : void 0,
                  stroke: T,
                  tickLine: !1,
                  axisLine: !1,
                  tick: { fontSize: 12, fill: R },
                  width: r ? 64 : 32
                }
              ),
              /* @__PURE__ */ t(
                j,
                {
                  cursor: { fill: "var(--color-muted)", opacity: 0.5 },
                  content: ({ active: e, payload: o }) => {
                    var N;
                    if (!e || !(o != null && o.length)) return null;
                    const x = ((N = o[0]) == null ? void 0 : N.payload) ?? {};
                    return /* @__PURE__ */ u("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                      l && /* @__PURE__ */ t("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: l }),
                      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1", children: o.map((g) => {
                        const f = c.find((_) => _.dataKey === g.dataKey);
                        if (!f) return null;
                        const S = g.value;
                        return /* @__PURE__ */ u(
                          "div",
                          {
                            className: "flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100",
                            children: [
                              /* @__PURE__ */ t(
                                "span",
                                {
                                  "aria-hidden": !0,
                                  className: "size-2 rounded-full shrink-0",
                                  style: { backgroundColor: f.color }
                                }
                              ),
                              f.name && /* @__PURE__ */ t("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: f.name }),
                              /* @__PURE__ */ t("span", { className: "font-medium", children: k ? k(S, f, x) : S })
                            ]
                          },
                          String(g.dataKey)
                        );
                      }) })
                    ] });
                  }
                }
              ),
              c.map((e) => /* @__PURE__ */ t(
                F,
                {
                  dataKey: e.dataKey,
                  stackId: Y,
                  fill: n ? `url(#${b(e.dataKey)})` : e.color,
                  name: e.name ?? e.dataKey,
                  shape: s > 0 ? q(e.dataKey, O, s, r) : void 0
                },
                e.dataKey
              ))
            ]
          }
        ) })
      ]
    }
  );
}
export {
  Z as StackBarChart
};
//# sourceMappingURL=stack-bar-chart.mjs.map
