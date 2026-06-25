import { jsxs as u, jsx as t } from "react/jsx-runtime";
import * as f from "react";
import { ResponsiveContainer as D, BarChart as F, CartesianGrid as X, XAxis as j, YAxis as B, Tooltip as K, Bar as q, Cell as H } from "recharts";
import { cn as M } from "../lib/utils.mjs";
import { ChartLegend as U } from "./chart-legend.mjs";
const Y = "var(--color-primary)", J = "var(--color-border)", A = "var(--color-muted-foreground)", I = "var(--color-muted-foreground)";
function Z({
  title: p,
  data: i,
  xKey: b,
  yKey: v,
  orientation: N = "vertical",
  height: z = 240,
  color: l = Y,
  colorBy: x,
  gradient: k = !0,
  highlightMax: h = !1,
  tooltipLabel: C,
  tooltipFormatter: w,
  showXAxis: E = !0,
  showYAxis: S = !0,
  showGrid: T = !0,
  barRadius: c = 0,
  legend: n,
  className: g,
  ...R
}) {
  const $ = f.useId(), o = N === "horizontal", G = f.useMemo(() => {
    if (!h) return -1;
    let r = -1 / 0, e = -1;
    return i.forEach((s, m) => {
      const a = Number(s[v]);
      Number.isFinite(a) && a > r && (r = a, e = m);
    }), e;
  }, [i, v, h]), O = (r, e) => x ? x(r, e) : l, d = f.useMemo(() => {
    const r = /* @__PURE__ */ new Set();
    return i.forEach((e, s) => r.add(O(e, s))), Array.from(r);
  }, [i, l, x]), L = (r) => `${$}-${d.indexOf(r)}`, _ = (r, e) => {
    const s = O(r, e);
    return h && e === G ? s : k ? `url(#${L(s)})` : s;
  }, y = f.useMemo(() => {
    if (n != null && n.length)
      return n.map((r, e) => ({
        label: r.label,
        color: r.color ?? d[e] ?? l
      }));
  }, [n, d, l]);
  return /* @__PURE__ */ u(
    "div",
    {
      className: M(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-3",
        g
      ),
      ...R,
      children: [
        p && /* @__PURE__ */ t("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: p }),
        y && /* @__PURE__ */ t(U, { items: y }),
        /* @__PURE__ */ t(D, { width: "100%", height: z, children: /* @__PURE__ */ u(
          F,
          {
            data: i,
            layout: o ? "vertical" : "horizontal",
            margin: { top: 12, right: 12, left: -8, bottom: 0 },
            children: [
              k && /* @__PURE__ */ t("defs", { children: d.map((r) => /* @__PURE__ */ u(
                "linearGradient",
                {
                  id: L(r),
                  x1: "0",
                  y1: "0",
                  x2: o ? "1" : "0",
                  y2: o ? "0" : "1",
                  children: [
                    /* @__PURE__ */ t("stop", { offset: "0%", stopColor: r, stopOpacity: o ? 0.2 : 0.9 }),
                    /* @__PURE__ */ t("stop", { offset: "100%", stopColor: r, stopOpacity: o ? 0.9 : 0.2 })
                  ]
                },
                r
              )) }),
              T && /* @__PURE__ */ t(
                X,
                {
                  stroke: J,
                  strokeDasharray: "0",
                  horizontal: !o,
                  vertical: o
                }
              ),
              E && /* @__PURE__ */ t(
                j,
                {
                  type: o ? "number" : "category",
                  dataKey: o ? void 0 : b,
                  stroke: A,
                  tickLine: !1,
                  axisLine: !1,
                  tick: { fontSize: 12, fill: I }
                }
              ),
              S && /* @__PURE__ */ t(
                B,
                {
                  type: o ? "category" : "number",
                  dataKey: o ? b : void 0,
                  stroke: A,
                  tickLine: !1,
                  axisLine: !1,
                  tick: { fontSize: 12, fill: I },
                  width: o ? 64 : 32
                }
              ),
              /* @__PURE__ */ t(
                K,
                {
                  cursor: { fill: "var(--color-muted)", opacity: 0.5 },
                  content: ({ active: r, payload: e }) => {
                    if (!r || !(e != null && e.length)) return null;
                    const s = e[0], m = s.value, a = s.payload;
                    return /* @__PURE__ */ u("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                      C && /* @__PURE__ */ t("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: C }),
                      /* @__PURE__ */ t("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: w ? w(m, a) : m })
                    ] });
                  }
                }
              ),
              /* @__PURE__ */ t(
                q,
                {
                  dataKey: v,
                  radius: o ? [0, c, c, 0] : [c, c, 0, 0],
                  isAnimationActive: !0,
                  children: i.map((r, e) => /* @__PURE__ */ t(H, { fill: _(r, e) }, `cell-${e}`))
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
export {
  Z as BarChart
};
//# sourceMappingURL=bar-chart.mjs.map
