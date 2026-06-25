import { jsxs as r, jsx as e } from "react/jsx-runtime";
import * as p from "react";
import { ResponsiveContainer as R, RadialBarChart as k, PolarAngleAxis as A, RadialBar as C } from "recharts";
import { cn as w } from "../lib/utils.mjs";
const $ = "var(--color-primary)", O = "var(--color-slate-200)";
function B({
  title: l,
  value: d,
  max: h = 100,
  color: i = $,
  caption: n,
  badge: a,
  size: t = 200,
  innerRadiusRatio: m = 0.3,
  showTrack: u = !0,
  animated: f = !0,
  className: b,
  ...g
}) {
  const c = p.useId(), v = p.useMemo(() => [{ name: "value", value: d }], [d]), o = t / 2, s = t / 2, x = s * m, y = s - x;
  return /* @__PURE__ */ r(
    "div",
    {
      className: w(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-2",
        b
      ),
      ...g,
      children: [
        l && /* @__PURE__ */ e("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: l }),
        /* @__PURE__ */ r("div", { className: "relative", style: { width: t, height: o }, children: [
          /* @__PURE__ */ e(R, { width: t, height: o, children: /* @__PURE__ */ r(
            k,
            {
              data: v,
              innerRadius: x,
              outerRadius: s,
              barSize: y,
              startAngle: 180,
              endAngle: 0,
              cy: "100%",
              children: [
                /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ r("linearGradient", { id: c, x1: "0", y1: "0", x2: "1", y2: "0", children: [
                  /* @__PURE__ */ e("stop", { offset: "0%", stopColor: i, stopOpacity: 0.9 }),
                  /* @__PURE__ */ e("stop", { offset: "100%", stopColor: i, stopOpacity: 0.3 })
                ] }) }),
                /* @__PURE__ */ e(A, { type: "number", domain: [0, h], tick: !1 }),
                /* @__PURE__ */ e(
                  C,
                  {
                    dataKey: "value",
                    fill: `url(#${c})`,
                    background: u ? { fill: O } : !1,
                    cornerRadius: 0,
                    isAnimationActive: f
                  }
                )
              ]
            }
          ) }),
          a != null && /* @__PURE__ */ e(
            "div",
            {
              className: "absolute flex items-center justify-center whitespace-nowrap border border-slate-200 bg-white/50 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400",
              style: {
                // 우측 상단 — 아치 상단과 살짝 겹치도록
                right: `${t * 0.07}px`,
                top: `${o * 0.09}px`,
                minWidth: `${t * 0.15}px`,
                height: `${t * 0.13}px`,
                padding: `0 ${t * 0.04}px`,
                borderRadius: `${t * 0.04}px`,
                boxShadow: "4px 4px 10px 0 var(--color-border)"
              },
              children: a
            }
          )
        ] }),
        n && /* @__PURE__ */ e("div", { className: "text-xs text-slate-700 dark:text-slate-100", children: n })
      ]
    }
  );
}
export {
  B as GaugeChart
};
//# sourceMappingURL=gauge-chart.mjs.map
