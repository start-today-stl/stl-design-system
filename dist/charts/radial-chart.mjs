import { jsxs as a, jsx as r } from "react/jsx-runtime";
import * as s from "react";
import { ResponsiveContainer as D, RadialBarChart as K, PolarAngleAxis as O, Tooltip as G, RadialBar as H, Cell as U } from "recharts";
import { cn as $ } from "../lib/utils.mjs";
import { ChartLegend as q } from "./chart-legend.mjs";
const R = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
  "var(--color-muted-foreground)"
], J = "var(--color-slate-100)";
function Y({
  data: m,
  max: C = 100,
  size: i = 240,
  barSize: v = 6,
  barGap: y = 2,
  showTrack: A = !1,
  centerLabel: I,
  centerSubLabel: M,
  centerLabelFormatter: x,
  centerSubLabelFormatter: h,
  legend: o,
  tooltipLabel: f,
  tooltipFormatter: p,
  onActiveChange: k,
  className: w,
  ...E
}) {
  const [T, u] = s.useState(null), [L, j] = s.useState(null), c = T ?? L, l = s.useMemo(
    () => m.map((e, t) => ({
      ...e,
      color: e.color ?? R[t % R.length]
    })),
    [m]
  ), S = s.useMemo(
    () => l.map((e) => ({
      name: e.name,
      value: e.value
    })),
    [l]
  );
  s.useEffect(() => {
    if (!k) return;
    const e = c !== null ? l[c] : null;
    k(e);
  }, [c]);
  const b = s.useMemo(() => {
    if (o != null && o.length)
      return o.map((e, t) => {
        var n;
        return {
          label: e.label,
          color: e.color ?? ((n = l[t]) == null ? void 0 : n.color)
        };
      });
  }, [o, l]), g = i / 2 - 8, _ = v + y, B = Math.max(g - l.length * _, 8);
  return /* @__PURE__ */ a(
    "div",
    {
      className: $(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4",
        w
      ),
      ...E,
      children: [
        b && /* @__PURE__ */ r(q, { items: b }),
        /* @__PURE__ */ a(
          "div",
          {
            className: "relative flex items-center justify-center",
            style: { width: "100%", height: i },
            onMouseLeave: () => u(null),
            children: [
              /* @__PURE__ */ r(D, { width: i, height: i, children: /* @__PURE__ */ a(
                K,
                {
                  data: S,
                  innerRadius: B,
                  outerRadius: g,
                  barSize: v,
                  startAngle: -90,
                  endAngle: 270,
                  children: [
                    /* @__PURE__ */ r(O, { type: "number", domain: [0, C], tick: !1 }),
                    /* @__PURE__ */ r(
                      G,
                      {
                        cursor: { fill: "transparent", stroke: "transparent" },
                        wrapperStyle: { zIndex: 50, pointerEvents: "none" },
                        content: ({ active: e, payload: t }) => {
                          if (!e || !(t != null && t.length)) return null;
                          const n = t[0], N = n.value, d = l.find((P) => P.name === n.payload.name);
                          return d ? /* @__PURE__ */ a("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                            f && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: f }),
                            /* @__PURE__ */ a("div", { className: "flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100", children: [
                              /* @__PURE__ */ r(
                                "span",
                                {
                                  "aria-hidden": !0,
                                  className: "size-2 rounded-full shrink-0",
                                  style: { backgroundColor: d.color }
                                }
                              ),
                              /* @__PURE__ */ r("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: d.name }),
                              /* @__PURE__ */ r("span", { className: "font-medium", children: p ? p(N, d) : N })
                            ] })
                          ] }) : null;
                        }
                      }
                    ),
                    /* @__PURE__ */ r(
                      H,
                      {
                        dataKey: "value",
                        background: A ? { fill: J } : !1,
                        cornerRadius: 0,
                        isAnimationActive: !1,
                        onMouseEnter: (e, t) => u(t),
                        onMouseLeave: () => u(null),
                        onClick: (e, t) => j((n) => n === t ? null : t),
                        style: { cursor: "pointer" },
                        children: l.map((e) => /* @__PURE__ */ r(U, { fill: e.color }, e.name))
                      }
                    )
                  ]
                }
              ) }),
              (() => {
                const e = c !== null ? l[c] : null, t = x ? x(e) : e ? `${e.value}` : I, n = h ? h(e) : e ? e.name : M;
                return !t && !n ? null : /* @__PURE__ */ a("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-0", children: [
                  t && /* @__PURE__ */ r(
                    "div",
                    {
                      className: "text-3xl text-slate-700 dark:text-slate-100",
                      style: { fontFamily: '"STL Gothic R", sans-serif' },
                      children: t
                    }
                  ),
                  n && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: n })
                ] });
              })()
            ]
          }
        )
      ]
    }
  );
}
export {
  Y as RadialChart
};
//# sourceMappingURL=radial-chart.mjs.map
