import { jsxs as s, jsx as r } from "react/jsx-runtime";
import * as l from "react";
import { ResponsiveContainer as W, RadialBarChart as $, PolarAngleAxis as q, Tooltip as J, RadialBar as Q, Cell as V } from "recharts";
import { cn as X } from "../lib/utils.mjs";
import { ChartLegend as Y } from "./chart-legend.mjs";
const R = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
  "var(--color-muted-foreground)"
], Z = "var(--color-slate-100)";
function re({
  data: h,
  max: M = 100,
  size: d = 240,
  barSize: v = 6,
  barGap: y = 2,
  showTrack: E = !1,
  centerLabel: I,
  centerSubLabel: A,
  centerLabelFormatter: x,
  centerSubLabelFormatter: f,
  legend: o,
  tooltipLabel: p,
  tooltipFormatter: k,
  onActiveChange: b,
  animated: L = !0,
  className: w,
  ...T
}) {
  const [j, m] = l.useState(null), [B, S] = l.useState(null), c = j ?? B, n = l.useMemo(
    () => h.map((e, t) => ({
      ...e,
      color: e.color ?? R[t % R.length]
    })),
    [h]
  ), _ = l.useMemo(
    () => n.map((e) => ({
      name: e.name,
      value: e.value
    })),
    [n]
  ), i = l.useRef(b);
  l.useEffect(() => {
    i.current = b;
  }), l.useEffect(() => {
    var t;
    const e = c !== null ? n[c] : null;
    (t = i.current) == null || t.call(i, e);
  }, [c, n]);
  const C = l.useMemo(() => {
    if (o != null && o.length)
      return o.map((e, t) => {
        var a;
        return {
          label: e.label,
          color: e.color ?? ((a = n[t]) == null ? void 0 : a.color)
        };
      });
  }, [o, n]), g = d / 2 - 8, P = v + y, D = Math.max(g - n.length * P, 8), K = l.useCallback(
    (e, t) => m(t),
    []
  ), O = l.useCallback(() => m(null), []), G = l.useCallback(
    (e, t) => S((a) => a === t ? null : t),
    []
  ), H = l.useCallback(() => m(null), []);
  return /* @__PURE__ */ s(
    "div",
    {
      className: X(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4",
        w
      ),
      ...T,
      children: [
        C && /* @__PURE__ */ r(Y, { items: C }),
        /* @__PURE__ */ s(
          "div",
          {
            className: "relative flex items-center justify-center",
            style: { width: "100%", height: d },
            onMouseLeave: H,
            children: [
              /* @__PURE__ */ r(W, { width: d, height: d, children: /* @__PURE__ */ s(
                $,
                {
                  data: _,
                  innerRadius: D,
                  outerRadius: g,
                  barSize: v,
                  startAngle: -90,
                  endAngle: 270,
                  children: [
                    /* @__PURE__ */ r(q, { type: "number", domain: [0, M], tick: !1 }),
                    /* @__PURE__ */ r(
                      J,
                      {
                        cursor: { fill: "transparent", stroke: "transparent" },
                        wrapperStyle: { zIndex: 50, pointerEvents: "none" },
                        content: ({ active: e, payload: t }) => {
                          if (!e || !(t != null && t.length)) return null;
                          const a = t[0], N = a.value, u = n.find((U) => U.name === a.payload.name);
                          return u ? /* @__PURE__ */ s("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                            p && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: p }),
                            /* @__PURE__ */ s("div", { className: "flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100", children: [
                              /* @__PURE__ */ r(
                                "span",
                                {
                                  "aria-hidden": !0,
                                  className: "size-2 rounded-full shrink-0",
                                  style: { backgroundColor: u.color }
                                }
                              ),
                              /* @__PURE__ */ r("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: u.name }),
                              /* @__PURE__ */ r("span", { className: "font-medium", children: k ? k(N, u) : N })
                            ] })
                          ] }) : null;
                        }
                      }
                    ),
                    /* @__PURE__ */ r(
                      Q,
                      {
                        dataKey: "value",
                        background: E ? { fill: Z } : !1,
                        cornerRadius: 0,
                        isAnimationActive: L,
                        onMouseEnter: K,
                        onMouseLeave: O,
                        onClick: G,
                        style: { cursor: "pointer" },
                        children: n.map((e) => /* @__PURE__ */ r(V, { fill: e.color }, e.name))
                      }
                    )
                  ]
                }
              ) }),
              (() => {
                const e = c !== null ? n[c] : null, t = x ? x(e) : e ? `${e.value}` : I, a = f ? f(e) : e ? e.name : A;
                return !t && !a ? null : /* @__PURE__ */ s("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-0", children: [
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
  re as RadialChart
};
//# sourceMappingURL=radial-chart.mjs.map
