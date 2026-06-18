import { jsx as r, jsxs as n } from "react/jsx-runtime";
import * as N from "react";
import { ResponsiveContainer as S, LineChart as E, CartesianGrid as w, XAxis as O, YAxis as A, Tooltip as _, Line as z } from "recharts";
import { cn as D } from "../lib/utils.mjs";
const u = [
  "var(--color-primary)",
  "var(--color-muted-foreground)",
  "var(--color-green-500)",
  "var(--color-red-500)"
], W = "var(--color-border)", f = "var(--color-muted-foreground)", h = "var(--color-muted-foreground)", X = "var(--color-primary)";
function U({
  data: k,
  xKey: x,
  lines: s,
  height: v = 240,
  tooltipLabel: l,
  tooltipFormatter: i,
  showXAxis: g = !0,
  showYAxis: p = !0,
  showGrid: b = !0,
  showDots: K = !0,
  curveType: L = "linear",
  className: R,
  ...T
}) {
  const d = N.useMemo(
    () => s.map((e, t) => ({
      ...e,
      color: e.color ?? u[t % u.length]
    })),
    [s]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      className: D(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4",
        R
      ),
      ...T,
      children: /* @__PURE__ */ r(S, { width: "100%", height: v, children: /* @__PURE__ */ n(E, { data: k, margin: { top: 12, right: 12, left: -8, bottom: 0 }, children: [
        b && /* @__PURE__ */ r(
          w,
          {
            stroke: W,
            strokeDasharray: "0",
            horizontal: !0,
            vertical: !1
          }
        ),
        g && /* @__PURE__ */ r(
          O,
          {
            dataKey: x,
            stroke: f,
            tickLine: !1,
            axisLine: !1,
            tick: { fontSize: 12, fill: h }
          }
        ),
        p && /* @__PURE__ */ r(
          A,
          {
            stroke: f,
            tickLine: !1,
            axisLine: !1,
            tick: { fontSize: 12, fill: h },
            width: 32
          }
        ),
        /* @__PURE__ */ r(
          _,
          {
            cursor: { stroke: X, strokeWidth: 1 },
            content: ({ active: e, payload: t }) => {
              var c;
              if (!e || !(t != null && t.length)) return null;
              const y = ((c = t[0]) == null ? void 0 : c.payload) ?? {};
              return /* @__PURE__ */ n("div", { className: "rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md", children: [
                l && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: l }),
                /* @__PURE__ */ r("div", { className: "flex flex-col gap-1", children: t.map((o) => {
                  const a = d.find((C) => C.dataKey === o.dataKey);
                  if (!a) return null;
                  const m = o.value;
                  return /* @__PURE__ */ n(
                    "div",
                    {
                      className: "flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100",
                      children: [
                        /* @__PURE__ */ r(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: "size-2 rounded-full shrink-0",
                            style: { backgroundColor: a.color }
                          }
                        ),
                        t.length > 1 && a.name && /* @__PURE__ */ r("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: a.name }),
                        /* @__PURE__ */ r("span", { className: "font-medium", children: i ? i(m, a, y) : m })
                      ]
                    },
                    String(o.dataKey)
                  );
                }) })
              ] });
            }
          }
        ),
        d.map((e) => /* @__PURE__ */ r(
          z,
          {
            type: L,
            dataKey: e.dataKey,
            stroke: e.color,
            strokeWidth: 2,
            dot: K ? {
              r: 3,
              fill: e.color,
              stroke: "none",
              strokeWidth: 0
            } : !1,
            activeDot: { r: 5, fill: e.color, stroke: "none", strokeWidth: 0 },
            name: e.name ?? e.dataKey
          },
          e.dataKey
        ))
      ] }) })
    }
  );
}
export {
  U as LineChart
};
//# sourceMappingURL=line-chart.mjs.map
