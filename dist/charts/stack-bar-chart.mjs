import { jsxs as f, jsx as e } from "react/jsx-runtime";
import * as K from "react";
import { ResponsiveContainer as _, BarChart as B, CartesianGrid as D, XAxis as G, YAxis as X, Tooltip as $, Bar as j, Rectangle as F } from "recharts";
import { cn as M } from "../lib/utils.mjs";
import { ChartLegend as H } from "./chart-legend.mjs";
const N = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)"
], P = "var(--color-border)", T = "var(--color-muted-foreground)", R = "var(--color-muted-foreground)", U = "stack", Y = (u, h, o, x) => (p) => {
  const n = p.payload, c = h.filter((y) => Number((n == null ? void 0 : n[y]) ?? 0) > 0), s = c[0] === u, l = c[c.length - 1] === u;
  return /* @__PURE__ */ e(F, { ...p, radius: x ? [
    s ? o : 0,
    // top-left
    l ? o : 0,
    // top-right
    l ? o : 0,
    // bottom-right
    s ? o : 0
    // bottom-left
  ] : [
    l ? o : 0,
    // top-left
    l ? o : 0,
    // top-right
    s ? o : 0,
    // bottom-right
    s ? o : 0
    // bottom-left
  ] });
};
function W({
  data: u,
  xKey: h,
  bars: o,
  orientation: x = "vertical",
  height: p = 240,
  gradient: n = !0,
  barRadius: c = 0,
  tooltipLabel: s,
  tooltipFormatter: l,
  showXAxis: g = !0,
  showYAxis: y = !0,
  showGrid: z = !0,
  legend: d,
  className: I,
  ...w
}) {
  const A = K.useId(), r = x === "horizontal", i = K.useMemo(
    () => o.map((t, a) => ({
      ...t,
      color: t.color ?? N[a % N.length]
    })),
    [o]
  ), b = (t) => `${A}-${t}`, C = K.useMemo(() => {
    if (d != null && d.length)
      return d.map((t, a) => {
        var v;
        return {
          label: t.label,
          color: t.color ?? ((v = i[a]) == null ? void 0 : v.color)
        };
      });
  }, [d, i]), E = i.map((t) => t.dataKey);
  return /* @__PURE__ */ f(
    "div",
    {
      className: M(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4",
        I
      ),
      ...w,
      children: [
        C && /* @__PURE__ */ e(H, { items: C }),
        /* @__PURE__ */ e(_, { width: "100%", height: p, children: /* @__PURE__ */ f(
          B,
          {
            data: u,
            layout: r ? "vertical" : "horizontal",
            margin: { top: 12, right: 12, left: -8, bottom: 0 },
            children: [
              n && /* @__PURE__ */ e("defs", { children: i.map((t) => /* @__PURE__ */ f(
                "linearGradient",
                {
                  id: b(t.dataKey),
                  x1: "0",
                  y1: "0",
                  x2: r ? "1" : "0",
                  y2: r ? "0" : "1",
                  children: [
                    /* @__PURE__ */ e("stop", { offset: "0%", stopColor: t.color, stopOpacity: r ? 0.2 : 0.9 }),
                    /* @__PURE__ */ e("stop", { offset: "100%", stopColor: t.color, stopOpacity: r ? 0.9 : 0.2 })
                  ]
                },
                t.dataKey
              )) }),
              z && /* @__PURE__ */ e(
                D,
                {
                  stroke: P,
                  strokeDasharray: "0",
                  horizontal: !r,
                  vertical: r
                }
              ),
              g && /* @__PURE__ */ e(
                G,
                {
                  type: r ? "number" : "category",
                  dataKey: r ? void 0 : h,
                  stroke: T,
                  tickLine: !1,
                  axisLine: !1,
                  tick: { fontSize: 12, fill: R }
                }
              ),
              y && /* @__PURE__ */ e(
                X,
                {
                  type: r ? "category" : "number",
                  dataKey: r ? h : void 0,
                  stroke: T,
                  tickLine: !1,
                  axisLine: !1,
                  tick: { fontSize: 12, fill: R },
                  width: r ? 64 : 32
                }
              ),
              /* @__PURE__ */ e(
                $,
                {
                  cursor: { fill: "var(--color-muted)", opacity: 0.5 },
                  content: ({ active: t, payload: a }) => {
                    var S;
                    if (!t || !(a != null && a.length)) return null;
                    const v = ((S = a[0]) == null ? void 0 : S.payload) ?? {};
                    return /* @__PURE__ */ f("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                      s && /* @__PURE__ */ e("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: s }),
                      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1", children: a.map((k) => {
                        const m = i.find((O) => O.dataKey === k.dataKey);
                        if (!m) return null;
                        const L = k.value;
                        return /* @__PURE__ */ f(
                          "div",
                          {
                            className: "flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100",
                            children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  "aria-hidden": !0,
                                  className: "size-2 rounded-full shrink-0",
                                  style: { backgroundColor: m.color }
                                }
                              ),
                              m.name && /* @__PURE__ */ e("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: m.name }),
                              /* @__PURE__ */ e("span", { className: "font-medium", children: l ? l(L, m, v) : L })
                            ]
                          },
                          String(k.dataKey)
                        );
                      }) })
                    ] });
                  }
                }
              ),
              i.map((t) => /* @__PURE__ */ e(
                j,
                {
                  dataKey: t.dataKey,
                  stackId: U,
                  fill: n ? `url(#${b(t.dataKey)})` : t.color,
                  name: t.name ?? t.dataKey,
                  shape: c > 0 ? Y(t.dataKey, E, c, r) : void 0
                },
                t.dataKey
              ))
            ]
          }
        ) })
      ]
    }
  );
}
export {
  W as StackBarChart
};
//# sourceMappingURL=stack-bar-chart.mjs.map
