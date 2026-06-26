import { jsxs as f, jsx as o } from "react/jsx-runtime";
import * as d from "react";
import { cn as Q } from "../lib/utils.mjs";
const F = 40, X = 0, C = 12, c = 12, J = 28, K = 0;
function Y({
  title: M,
  data: n,
  height: p = 200,
  boxWidth: W,
  yDomain: m,
  yTickFormatter: _,
  upperColor: G = "var(--color-blue-200)",
  lowerColor: R = "var(--color-slate-300)",
  activeUpperColor: A = "var(--color-blue-500)",
  showGrid: E = !0,
  showYAxis: I = !1,
  showXAxis: w = !1,
  tooltipFormatter: D,
  className: H,
  ...q
}) {
  const [l, T] = d.useState(null), b = d.useRef(null), [x, B] = d.useState(0);
  d.useEffect(() => {
    if (!b.current) return;
    const e = b.current, t = new ResizeObserver((r) => {
      for (const s of r)
        B(s.contentRect.width);
    });
    return t.observe(e), () => t.disconnect();
  }, []);
  const [S, g] = d.useMemo(() => {
    if (m) return m;
    if (!n.length) return [0, 1];
    let e = 1 / 0, t = -1 / 0;
    for (const s of n)
      e = Math.min(e, s.min ?? s.q1), t = Math.max(t, s.max ?? s.q3);
    const r = (t - e) * 0.05 || 1;
    return [e - r, t + r];
  }, [n, m]), v = I ? F : X, $ = w ? J : K, L = Math.max(0, x - v - C), i = Math.max(0, p - c - $), k = g - S || 1, h = (e) => c + (g - e) / k * i, a = n.length > 0 ? L / n.length : 0, y = W ?? Math.max(2, a * 0.5), u = (e) => v + a * e + a / 2;
  return /* @__PURE__ */ f(
    "div",
    {
      ref: b,
      className: Q(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-3",
        H
      ),
      ...q,
      children: [
        M && /* @__PURE__ */ o("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: M }),
        /* @__PURE__ */ f("div", { className: "relative", style: { height: `${p}px` }, children: [
          x > 0 && /* @__PURE__ */ f(
            "svg",
            {
              width: x,
              height: p,
              onMouseLeave: () => T(null),
              style: { display: "block" },
              children: [
                I && /* @__PURE__ */ o("g", { children: [0, 0.25, 0.5, 0.75, 1].map((e) => {
                  const t = g - e * k, r = c + e * i;
                  return /* @__PURE__ */ o(
                    "text",
                    {
                      x: v - 6,
                      y: r + 3,
                      textAnchor: "end",
                      fontSize: "10",
                      fill: "var(--color-muted-foreground)",
                      className: "tabular-nums",
                      children: _ ? _(t) : t.toFixed(0)
                    },
                    e
                  );
                }) }),
                E && n.map((e, t) => {
                  const r = u(t);
                  return /* @__PURE__ */ o(
                    "line",
                    {
                      x1: r,
                      y1: c,
                      x2: r,
                      y2: c + i,
                      stroke: "var(--color-border)",
                      strokeWidth: 0.5
                    },
                    `grid-${t}`
                  );
                }),
                n.map((e, t) => {
                  const r = u(t), s = l === t, j = h(e.q1), N = h(e.median), O = h(e.q3), P = y / 2, z = s ? A : G;
                  return /* @__PURE__ */ f("g", { children: [
                    /* @__PURE__ */ o(
                      "rect",
                      {
                        x: r - P,
                        y: O,
                        width: y,
                        height: Math.max(0, N - O),
                        fill: z,
                        style: s ? { filter: "drop-shadow(4px 4px 10px rgba(0,0,0,0.08))" } : void 0
                      }
                    ),
                    /* @__PURE__ */ o(
                      "rect",
                      {
                        x: r - P,
                        y: N,
                        width: y,
                        height: Math.max(0, j - N),
                        fill: R,
                        fillOpacity: 0.5
                      }
                    ),
                    /* @__PURE__ */ o(
                      "rect",
                      {
                        x: r - a / 2,
                        y: c,
                        width: a,
                        height: i,
                        fill: "transparent",
                        onMouseEnter: () => T(t),
                        style: { cursor: "pointer" }
                      }
                    )
                  ] }, t);
                }),
                w && /* @__PURE__ */ o("g", { children: n.map((e, t) => /* @__PURE__ */ o(
                  "text",
                  {
                    x: u(t),
                    y: c + i + 18,
                    textAnchor: "middle",
                    fontSize: "10",
                    fill: "var(--color-muted-foreground)",
                    className: "tabular-nums",
                    children: e.name
                  },
                  `xlabel-${t}`
                )) })
              ]
            }
          ),
          l !== null && n[l] && x > 0 && /* @__PURE__ */ o(
            "div",
            {
              className: "pointer-events-none absolute -translate-x-1/2 -translate-y-full flex items-center justify-center whitespace-nowrap border border-slate-200 bg-white/50 backdrop-blur-[12px] text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400",
              style: {
                left: `${u(l)}px`,
                top: `${h(n[l].q3) - 6}px`,
                minWidth: "33px",
                height: "28.6px",
                padding: "0 8.8px",
                borderRadius: "8.8px",
                boxShadow: "4px 4px 10px 0 var(--color-border)"
              },
              children: D ? D(n[l]) : n[l].median
            }
          )
        ] })
      ]
    }
  );
}
export {
  Y as BoxPlot
};
//# sourceMappingURL=box-plot.mjs.map
