import { jsxs as n, jsx as r } from "react/jsx-runtime";
import * as l from "react";
import { ResponsiveContainer as $, RadialBarChart as q, PolarAngleAxis as J, Tooltip as Q, RadialBar as V, Cell as X } from "recharts";
import { cn as Y } from "../lib/utils.mjs";
import { ChartLegend as Z } from "./chart-legend.mjs";
const M = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
  "var(--color-muted-foreground)"
], z = "var(--color-slate-100)";
function le({
  title: x,
  data: h,
  max: y = 100,
  size: d = 240,
  barSize: v = 6,
  barGap: E = 2,
  showTrack: I = !1,
  centerLabel: A,
  centerSubLabel: L,
  centerLabelFormatter: f,
  centerSubLabelFormatter: p,
  legend: o,
  tooltipLabel: k,
  tooltipFormatter: b,
  onActiveChange: g,
  animated: w = !0,
  className: T,
  ...j
}) {
  const [B, m] = l.useState(null), [S, _] = l.useState(null), c = B ?? S, s = l.useMemo(
    () => h.map((e, t) => ({
      ...e,
      color: e.color ?? M[t % M.length]
    })),
    [h]
  ), P = l.useMemo(
    () => s.map((e) => ({
      name: e.name,
      value: e.value
    })),
    [s]
  ), i = l.useRef(g);
  l.useEffect(() => {
    i.current = g;
  }), l.useEffect(() => {
    var t;
    const e = c !== null ? s[c] : null;
    (t = i.current) == null || t.call(i, e);
  }, [c, s]);
  const C = l.useMemo(() => {
    if (o != null && o.length)
      return o.map((e, t) => {
        var a;
        return {
          label: e.label,
          color: e.color ?? ((a = s[t]) == null ? void 0 : a.color)
        };
      });
  }, [o, s]), N = d / 2 - 8, D = v + E, K = Math.max(N - s.length * D, 8), O = l.useCallback(
    (e, t) => m(t),
    []
  ), G = l.useCallback(() => m(null), []), H = l.useCallback(
    (e, t) => _((a) => a === t ? null : t),
    []
  ), U = l.useCallback(() => m(null), []);
  return /* @__PURE__ */ n(
    "div",
    {
      className: Y(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-3",
        T
      ),
      ...j,
      children: [
        x && /* @__PURE__ */ r("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: x }),
        C && /* @__PURE__ */ r(Z, { items: C }),
        /* @__PURE__ */ n(
          "div",
          {
            className: "relative flex items-center justify-center",
            style: { width: "100%", height: d },
            onMouseLeave: U,
            children: [
              /* @__PURE__ */ r($, { width: d, height: d, children: /* @__PURE__ */ n(
                q,
                {
                  data: P,
                  innerRadius: K,
                  outerRadius: N,
                  barSize: v,
                  startAngle: -90,
                  endAngle: 270,
                  children: [
                    /* @__PURE__ */ r(J, { type: "number", domain: [0, y], tick: !1 }),
                    /* @__PURE__ */ r(
                      Q,
                      {
                        cursor: { fill: "transparent", stroke: "transparent" },
                        wrapperStyle: { zIndex: 50, pointerEvents: "none" },
                        content: ({ active: e, payload: t }) => {
                          if (!e || !(t != null && t.length)) return null;
                          const a = t[0], R = a.value, u = s.find((W) => W.name === a.payload.name);
                          return u ? /* @__PURE__ */ n("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                            k && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: k }),
                            /* @__PURE__ */ n("div", { className: "flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100", children: [
                              /* @__PURE__ */ r(
                                "span",
                                {
                                  "aria-hidden": !0,
                                  className: "size-2 rounded-full shrink-0",
                                  style: { backgroundColor: u.color }
                                }
                              ),
                              /* @__PURE__ */ r("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: u.name }),
                              /* @__PURE__ */ r("span", { className: "font-medium", children: b ? b(R, u) : R })
                            ] })
                          ] }) : null;
                        }
                      }
                    ),
                    /* @__PURE__ */ r(
                      V,
                      {
                        dataKey: "value",
                        background: I ? { fill: z } : !1,
                        cornerRadius: 0,
                        isAnimationActive: w,
                        onMouseEnter: O,
                        onMouseLeave: G,
                        onClick: H,
                        style: { cursor: "pointer" },
                        children: s.map((e) => /* @__PURE__ */ r(X, { fill: e.color }, e.name))
                      }
                    )
                  ]
                }
              ) }),
              (() => {
                const e = c !== null ? s[c] : null, t = f ? f(e) : e ? `${e.value}` : A, a = p ? p(e) : e ? e.name : L;
                return !t && !a ? null : /* @__PURE__ */ n("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-0", children: [
                  t && /* @__PURE__ */ r(
                    "div",
                    {
                      className: "text-3xl text-slate-700 dark:text-slate-100",
                      style: { fontFamily: '"STL Gothic R", sans-serif' },
                      children: t
                    }
                  ),
                  a && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: a })
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
  le as RadialChart
};
//# sourceMappingURL=radial-chart.mjs.map
