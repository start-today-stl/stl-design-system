import { jsxs as m, jsx as o } from "react/jsx-runtime";
import * as f from "react";
import { ResponsiveContainer as _, BarChart as D, CartesianGrid as F, XAxis as X, YAxis as j, Tooltip as B, Bar as K, Cell as q } from "recharts";
import { cn as H } from "../lib/utils.mjs";
import { ChartLegend as M } from "./chart-legend.mjs";
const U = "var(--color-primary)", Y = "var(--color-border)", y = "var(--color-muted-foreground)", A = "var(--color-muted-foreground)";
function W({
  data: i,
  xKey: x,
  yKey: v,
  orientation: I = "vertical",
  height: z = 240,
  color: l = U,
  colorBy: h,
  gradient: b = !0,
  highlightMax: p = !1,
  tooltipLabel: k,
  tooltipFormatter: C,
  showXAxis: E = !0,
  showYAxis: N = !0,
  showGrid: S = !0,
  barRadius: c = 0,
  legend: n,
  className: T,
  ...R
}) {
  const $ = f.useId(), t = I === "horizontal", g = f.useMemo(() => {
    if (!p) return -1;
    let r = -1 / 0, e = -1;
    return i.forEach((s, u) => {
      const a = Number(s[v]);
      Number.isFinite(a) && a > r && (r = a, e = u);
    }), e;
  }, [i, v, p]), w = (r, e) => h ? h(r, e) : l, d = f.useMemo(() => {
    const r = /* @__PURE__ */ new Set();
    return i.forEach((e, s) => r.add(w(e, s))), Array.from(r);
  }, [i, l, h]), O = (r) => `${$}-${d.indexOf(r)}`, G = (r, e) => {
    const s = w(r, e);
    return p && e === g ? s : b ? `url(#${O(s)})` : s;
  }, L = f.useMemo(() => {
    if (n != null && n.length)
      return n.map((r, e) => ({
        label: r.label,
        color: r.color ?? d[e] ?? l
      }));
  }, [n, d, l]);
  return /* @__PURE__ */ m(
    "div",
    {
      className: H(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4",
        T
      ),
      ...R,
      children: [
        L && /* @__PURE__ */ o(M, { items: L }),
        /* @__PURE__ */ o(_, { width: "100%", height: z, children: /* @__PURE__ */ m(
          D,
          {
            data: i,
            layout: t ? "vertical" : "horizontal",
            margin: { top: 12, right: 12, left: -8, bottom: 0 },
            children: [
              b && /* @__PURE__ */ o("defs", { children: d.map((r) => /* @__PURE__ */ m(
                "linearGradient",
                {
                  id: O(r),
                  x1: "0",
                  y1: "0",
                  x2: t ? "1" : "0",
                  y2: t ? "0" : "1",
                  children: [
                    /* @__PURE__ */ o("stop", { offset: "0%", stopColor: r, stopOpacity: t ? 0.2 : 0.9 }),
                    /* @__PURE__ */ o("stop", { offset: "100%", stopColor: r, stopOpacity: t ? 0.9 : 0.2 })
                  ]
                },
                r
              )) }),
              S && /* @__PURE__ */ o(
                F,
                {
                  stroke: Y,
                  strokeDasharray: "0",
                  horizontal: !t,
                  vertical: t
                }
              ),
              E && /* @__PURE__ */ o(
                X,
                {
                  type: t ? "number" : "category",
                  dataKey: t ? void 0 : x,
                  stroke: y,
                  tickLine: !1,
                  axisLine: !1,
                  tick: { fontSize: 12, fill: A }
                }
              ),
              N && /* @__PURE__ */ o(
                j,
                {
                  type: t ? "category" : "number",
                  dataKey: t ? x : void 0,
                  stroke: y,
                  tickLine: !1,
                  axisLine: !1,
                  tick: { fontSize: 12, fill: A },
                  width: t ? 64 : 32
                }
              ),
              /* @__PURE__ */ o(
                B,
                {
                  cursor: { fill: "var(--color-muted)", opacity: 0.5 },
                  content: ({ active: r, payload: e }) => {
                    if (!r || !(e != null && e.length)) return null;
                    const s = e[0], u = s.value, a = s.payload;
                    return /* @__PURE__ */ m("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                      k && /* @__PURE__ */ o("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: k }),
                      /* @__PURE__ */ o("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: C ? C(u, a) : u })
                    ] });
                  }
                }
              ),
              /* @__PURE__ */ o(
                K,
                {
                  dataKey: v,
                  radius: t ? [0, c, c, 0] : [c, c, 0, 0],
                  isAnimationActive: !0,
                  children: i.map((r, e) => /* @__PURE__ */ o(q, { fill: G(r, e) }, `cell-${e}`))
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
  W as BarChart
};
//# sourceMappingURL=bar-chart.mjs.map
