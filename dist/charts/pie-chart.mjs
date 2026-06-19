import { jsxs as o, jsx as r } from "react/jsx-runtime";
import * as s from "react";
import { ResponsiveContainer as J, PieChart as O, Tooltip as Q, Pie as V, Cell as X } from "recharts";
import { cn as S } from "../lib/utils.mjs";
const $ = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
  "var(--color-muted-foreground)"
];
function z({
  data: f,
  size: l = 220,
  innerRadiusRatio: L = 0.75,
  centerLabel: P,
  centerSubLabel: R,
  centerLabelFormatter: b,
  centerSubLabelFormatter: k,
  legend: d,
  legendPosition: j = "bottom",
  badge: m,
  tooltipLabel: g,
  tooltipFormatter: N,
  onActiveChange: w,
  animated: M = !0,
  className: T,
  ..._
}) {
  const [A, h] = s.useState(null), [K, W] = s.useState(null), i = A ?? K, n = s.useMemo(
    () => f.map((t, e) => ({
      ...t,
      color: t.color ?? $[e % $.length]
    })),
    [f]
  ), u = s.useRef(w);
  s.useEffect(() => {
    u.current = w;
  }), s.useEffect(() => {
    var e;
    const t = i !== null ? n[i] : null;
    (e = u.current) == null || e.call(u, t);
  }, [i, n]);
  const C = s.useMemo(() => {
    if (d != null && d.length)
      return d.map((t, e) => {
        var a;
        return {
          label: t.label,
          color: t.color ?? ((a = n[e]) == null ? void 0 : a.color)
        };
      });
  }, [d, n]), y = l / 2 - 8, B = y * L, D = s.useCallback(
    (t, e) => h(e),
    []
  ), G = s.useCallback(() => h(null), []), H = s.useCallback(
    (t, e) => W((a) => a === e ? null : e),
    []
  ), U = s.useCallback(() => h(null), []), E = j === "bottom", c = i !== null ? n[i] : null, p = b ? b(c) : c ? `${c.value}` : P, v = k ? k(c) : c ? c.name : R;
  return /* @__PURE__ */ o(
    "div",
    {
      className: S(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex",
        E ? "flex-col items-center gap-3" : "flex-row items-center gap-4",
        T
      ),
      ..._,
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: "relative shrink-0",
            style: { width: l, height: l },
            onMouseLeave: U,
            children: [
              /* @__PURE__ */ r(J, { width: l, height: l, children: /* @__PURE__ */ o(O, { children: [
                /* @__PURE__ */ r(
                  Q,
                  {
                    cursor: !1,
                    wrapperStyle: { zIndex: 50, pointerEvents: "none" },
                    content: ({ active: t, payload: e }) => {
                      if (!t || !(e != null && e.length)) return null;
                      const a = e[0], I = a.value, x = n.find((q) => q.name === a.name);
                      return x ? /* @__PURE__ */ o("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                        g && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: g }),
                        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100", children: [
                          /* @__PURE__ */ r(
                            "span",
                            {
                              "aria-hidden": !0,
                              className: "size-2 rounded-full shrink-0",
                              style: { backgroundColor: x.color }
                            }
                          ),
                          /* @__PURE__ */ r("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: x.name }),
                          /* @__PURE__ */ r("span", { className: "font-medium", children: N ? N(I, x) : I })
                        ] })
                      ] }) : null;
                    }
                  }
                ),
                /* @__PURE__ */ r(
                  V,
                  {
                    data: n,
                    dataKey: "value",
                    nameKey: "name",
                    cx: "50%",
                    cy: "50%",
                    innerRadius: B,
                    outerRadius: y,
                    isAnimationActive: M,
                    onMouseEnter: D,
                    onMouseLeave: G,
                    onClick: H,
                    style: { cursor: "pointer" },
                    children: n.map((t) => /* @__PURE__ */ r(X, { fill: t.color, stroke: "none" }, t.name))
                  }
                )
              ] }) }),
              (p || v) && /* @__PURE__ */ o("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-0", children: [
                p && /* @__PURE__ */ r(
                  "div",
                  {
                    className: "text-3xl text-slate-700 dark:text-slate-100",
                    style: { fontFamily: '"STL Gothic R", sans-serif' },
                    children: p
                  }
                ),
                v && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: v })
              ] }),
              m != null && /* @__PURE__ */ r(
                "div",
                {
                  className: "absolute flex items-center justify-center whitespace-nowrap border border-slate-200 bg-white/50 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400",
                  style: {
                    right: `${l * 0.07}px`,
                    top: `${l * 0.07}px`,
                    minWidth: `${l * 0.15}px`,
                    height: `${l * 0.13}px`,
                    padding: `0 ${l * 0.04}px`,
                    borderRadius: `${l * 0.04}px`,
                    boxShadow: "4px 4px 10px 0 var(--color-border)"
                  },
                  children: m
                }
              )
            ]
          }
        ),
        C && /* @__PURE__ */ r(
          "div",
          {
            className: S(
              E ? "flex flex-row flex-wrap items-center justify-center gap-3" : "flex flex-col gap-2"
            ),
            children: C.map((t, e) => /* @__PURE__ */ o(
              "div",
              {
                className: "flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300",
                children: [
                  /* @__PURE__ */ r(
                    "span",
                    {
                      "aria-hidden": !0,
                      className: "size-2 rounded-full shrink-0",
                      style: { backgroundColor: t.color }
                    }
                  ),
                  /* @__PURE__ */ r("span", { children: t.label })
                ]
              },
              e
            ))
          }
        )
      ]
    }
  );
}
export {
  z as PieChart
};
//# sourceMappingURL=pie-chart.mjs.map
