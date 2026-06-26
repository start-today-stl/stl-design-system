import { jsxs as n, jsx as l } from "react/jsx-runtime";
import * as s from "react";
import { ResponsiveContainer as O, PieChart as Q, Tooltip as V, Pie as X, Cell as Y } from "recharts";
import { cn as f } from "../lib/utils.mjs";
const L = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
  "var(--color-muted-foreground)"
];
function ee({
  title: b,
  data: k,
  size: r = 220,
  innerRadiusRatio: P = 0.75,
  centerLabel: R,
  centerSubLabel: j,
  centerLabelFormatter: g,
  centerSubLabelFormatter: N,
  legend: d,
  legendPosition: M = "bottom",
  badge: m,
  tooltipLabel: w,
  tooltipFormatter: C,
  onActiveChange: y,
  animated: T = !0,
  className: _,
  ...A
}) {
  const [K, h] = s.useState(null), [W, B] = s.useState(null), i = K ?? W, a = s.useMemo(
    () => k.map((t, e) => ({
      ...t,
      color: t.color ?? L[e % L.length]
    })),
    [k]
  ), u = s.useRef(y);
  s.useEffect(() => {
    u.current = y;
  }), s.useEffect(() => {
    var e;
    const t = i !== null ? a[i] : null;
    (e = u.current) == null || e.call(u, t);
  }, [i, a]);
  const E = s.useMemo(() => {
    if (d != null && d.length)
      return d.map((t, e) => {
        var o;
        return {
          label: t.label,
          color: t.color ?? ((o = a[e]) == null ? void 0 : o.color)
        };
      });
  }, [d, a]), I = r / 2 - 8, D = I * P, G = s.useCallback(
    (t, e) => h(e),
    []
  ), H = s.useCallback(() => h(null), []), U = s.useCallback(
    (t, e) => B((o) => o === e ? null : e),
    []
  ), q = s.useCallback(() => h(null), []), S = M === "bottom", c = i !== null ? a[i] : null, p = g ? g(c) : c ? `${c.value}` : R, v = N ? N(c) : c ? c.name : j;
  return /* @__PURE__ */ n(
    "div",
    {
      className: f(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-3",
        _
      ),
      ...A,
      children: [
        b && /* @__PURE__ */ l("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: b }),
        /* @__PURE__ */ n(
          "div",
          {
            className: f(
              "flex",
              S ? "flex-col items-center gap-3" : "flex-row items-center gap-4"
            ),
            children: [
              /* @__PURE__ */ n(
                "div",
                {
                  className: "relative shrink-0",
                  style: { width: r, height: r },
                  onMouseLeave: q,
                  children: [
                    /* @__PURE__ */ l(O, { width: r, height: r, children: /* @__PURE__ */ n(Q, { children: [
                      /* @__PURE__ */ l(
                        V,
                        {
                          cursor: !1,
                          wrapperStyle: { zIndex: 50, pointerEvents: "none" },
                          content: ({ active: t, payload: e }) => {
                            if (!t || !(e != null && e.length)) return null;
                            const o = e[0], $ = o.value, x = a.find((J) => J.name === o.name);
                            return x ? /* @__PURE__ */ n("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                              w && /* @__PURE__ */ l("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: w }),
                              /* @__PURE__ */ n("div", { className: "flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100", children: [
                                /* @__PURE__ */ l(
                                  "span",
                                  {
                                    "aria-hidden": !0,
                                    className: "size-2 rounded-full shrink-0",
                                    style: { backgroundColor: x.color }
                                  }
                                ),
                                /* @__PURE__ */ l("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: x.name }),
                                /* @__PURE__ */ l("span", { className: "font-medium", children: C ? C($, x) : $ })
                              ] })
                            ] }) : null;
                          }
                        }
                      ),
                      /* @__PURE__ */ l(
                        X,
                        {
                          data: a,
                          dataKey: "value",
                          nameKey: "name",
                          cx: "50%",
                          cy: "50%",
                          innerRadius: D,
                          outerRadius: I,
                          isAnimationActive: T,
                          onMouseEnter: G,
                          onMouseLeave: H,
                          onClick: U,
                          style: { cursor: "pointer" },
                          children: a.map((t) => /* @__PURE__ */ l(Y, { fill: t.color, stroke: "none" }, t.name))
                        }
                      )
                    ] }) }),
                    (p || v) && /* @__PURE__ */ n("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-0", children: [
                      p && /* @__PURE__ */ l(
                        "div",
                        {
                          className: "text-3xl text-slate-700 dark:text-slate-100",
                          style: { fontFamily: '"STL Gothic R", sans-serif' },
                          children: p
                        }
                      ),
                      v && /* @__PURE__ */ l("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: v })
                    ] }),
                    m != null && /* @__PURE__ */ l(
                      "div",
                      {
                        className: "absolute flex items-center justify-center whitespace-nowrap border border-slate-200 bg-white/50 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400",
                        style: {
                          right: `${r * 0.07}px`,
                          top: `${r * 0.07}px`,
                          minWidth: `${r * 0.15}px`,
                          height: `${r * 0.13}px`,
                          padding: `0 ${r * 0.04}px`,
                          borderRadius: `${r * 0.04}px`,
                          boxShadow: "4px 4px 10px 0 var(--color-border)"
                        },
                        children: m
                      }
                    )
                  ]
                }
              ),
              E && /* @__PURE__ */ l(
                "div",
                {
                  className: f(
                    S ? "flex flex-row flex-wrap items-center justify-center gap-3" : "flex flex-col gap-2"
                  ),
                  children: E.map((t, e) => /* @__PURE__ */ n(
                    "div",
                    {
                      className: "flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300",
                      children: [
                        /* @__PURE__ */ l(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: "size-2 rounded-full shrink-0",
                            style: { backgroundColor: t.color }
                          }
                        ),
                        /* @__PURE__ */ l("span", { children: t.label })
                      ]
                    },
                    e
                  ))
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  ee as PieChart
};
//# sourceMappingURL=pie-chart.mjs.map
