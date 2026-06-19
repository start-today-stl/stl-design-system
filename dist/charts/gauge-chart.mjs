import { jsxs as r, jsx as e } from "react/jsx-runtime";
import * as p from "react";
import { ResponsiveContainer as y, RadialBarChart as R, PolarAngleAxis as k, RadialBar as A } from "recharts";
import { cn as C } from "../lib/utils.mjs";
const w = "var(--color-primary)", $ = "var(--color-slate-200)";
function L({
  value: s,
  max: x = 100,
  color: i = w,
  caption: d,
  badge: a,
  size: t = 200,
  innerRadiusRatio: h = 0.3,
  showTrack: m = !0,
  animated: u = !0,
  className: f,
  ...b
}) {
  const n = p.useId(), g = p.useMemo(() => [{ name: "value", value: s }], [s]), o = t / 2, l = t / 2, c = l * h, v = l - c;
  return /* @__PURE__ */ r(
    "div",
    {
      className: C(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-2",
        f
      ),
      ...b,
      children: [
        /* @__PURE__ */ r("div", { className: "relative", style: { width: t, height: o }, children: [
          /* @__PURE__ */ e(y, { width: t, height: o, children: /* @__PURE__ */ r(
            R,
            {
              data: g,
              innerRadius: c,
              outerRadius: l,
              barSize: v,
              startAngle: 180,
              endAngle: 0,
              cy: "100%",
              children: [
                /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ r("linearGradient", { id: n, x1: "0", y1: "0", x2: "1", y2: "0", children: [
                  /* @__PURE__ */ e("stop", { offset: "0%", stopColor: i, stopOpacity: 0.9 }),
                  /* @__PURE__ */ e("stop", { offset: "100%", stopColor: i, stopOpacity: 0.3 })
                ] }) }),
                /* @__PURE__ */ e(k, { type: "number", domain: [0, x], tick: !1 }),
                /* @__PURE__ */ e(
                  A,
                  {
                    dataKey: "value",
                    fill: `url(#${n})`,
                    background: m ? { fill: $ } : !1,
                    cornerRadius: 0,
                    isAnimationActive: u
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
        d && /* @__PURE__ */ e("div", { className: "text-xs text-slate-700 dark:text-slate-100", children: d })
      ]
    }
  );
}
export {
  L as GaugeChart
};
//# sourceMappingURL=gauge-chart.mjs.map
