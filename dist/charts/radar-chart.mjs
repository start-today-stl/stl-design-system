import { jsxs as s, jsx as t } from "react/jsx-runtime";
import * as d from "react";
import { ResponsiveContainer as I, RadarChart as L, PolarGrid as G, PolarAngleAxis as P, PolarRadiusAxis as T, Tooltip as j, Radar as N } from "recharts";
import { cn as W } from "../lib/utils.mjs";
import { ChartLegend as $ } from "./chart-legend.mjs";
const x = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
  "var(--color-muted-foreground)"
];
function U({
  title: n,
  data: b,
  series: c,
  max: k = 100,
  size: a = 280,
  showGrid: g = !0,
  showRadiusAxis: y = !1,
  showAxisLabels: R = !1,
  showDots: f = !0,
  gradient: u = !0,
  fillOpacity: w = 0.3,
  legend: i,
  tooltipLabel: D,
  tooltipFormatter: m,
  animated: S = !0,
  className: A,
  ...C
}) {
  const h = d.useId(), l = d.useMemo(
    () => c.map((r, e) => {
      const o = r.color ?? x[e % x.length];
      return {
        ...r,
        color: o,
        // 첫번째 시리즈만 피그마 정확 매칭, 그 외엔 series color 단색
        fillStart: e === 0 ? "var(--color-blue-500)" : o,
        fillEnd: e === 0 ? "var(--color-blue-200)" : o,
        strokeStart: e === 0 ? "var(--color-blue-500)" : o,
        strokeEnd: e === 0 ? "var(--color-slate-200)" : o,
        fillGradientId: `${h}-radar-fill-${e}`
        // strokeGradientId는 hoveredIndex 변경 시 강제 갱신을 위해 따로 useMemo에서 계산
      };
    }),
    [c, h]
  ), p = d.useMemo(() => {
    if (i)
      return i.map((r, e) => {
        var o;
        return {
          label: r.label,
          color: r.color ?? ((o = l[e]) == null ? void 0 : o.color)
        };
      });
    if (!(l.length <= 1))
      return l.map((r) => ({ label: r.name, color: r.color }));
  }, [i, l]);
  return /* @__PURE__ */ s(
    "div",
    {
      className: W(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-3",
        A
      ),
      ...C,
      children: [
        n && /* @__PURE__ */ t("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: n }),
        p && /* @__PURE__ */ t($, { items: p }),
        /* @__PURE__ */ t(
          "div",
          {
            className: "relative flex items-center justify-center",
            style: { width: "100%", height: a },
            children: /* @__PURE__ */ t(I, { width: a, height: a, children: /* @__PURE__ */ s(L, { data: b, outerRadius: "75%", children: [
              /* @__PURE__ */ t("defs", { children: l.map((r) => /* @__PURE__ */ s(
                "radialGradient",
                {
                  id: r.fillGradientId,
                  cx: "50%",
                  cy: "50%",
                  r: "50%",
                  children: [
                    /* @__PURE__ */ t("stop", { offset: "0%", stopColor: r.fillStart }),
                    /* @__PURE__ */ t("stop", { offset: "89.42%", stopColor: r.fillEnd })
                  ]
                },
                r.fillGradientId
              )) }),
              g && /* @__PURE__ */ t(
                G,
                {
                  gridType: "circle",
                  radialLines: !1,
                  stroke: "var(--color-slate-200)"
                }
              ),
              /* @__PURE__ */ t(
                P,
                {
                  dataKey: "axis",
                  tick: R ? { fill: "var(--color-muted-foreground)", fontSize: 11 } : !1
                }
              ),
              /* @__PURE__ */ t(
                T,
                {
                  domain: [0, k],
                  angle: 90,
                  tick: y ? { fill: "var(--color-muted-foreground)", fontSize: 10 } : !1,
                  axisLine: !1
                }
              ),
              /* @__PURE__ */ t(
                j,
                {
                  cursor: { stroke: "var(--color-slate-300)", strokeDasharray: "3 3" },
                  wrapperStyle: { zIndex: 50, pointerEvents: "none" },
                  content: ({ active: r, payload: e }) => {
                    if (!r || !(e != null && e.length)) return null;
                    const o = e[0], v = o.value, E = o.name ?? "";
                    return /* @__PURE__ */ t(
                      "div",
                      {
                        className: "flex items-center justify-center whitespace-nowrap border border-slate-200 bg-white/50 backdrop-blur-[12px] text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400",
                        style: {
                          // PieChart badge 기본 사이즈(size=220) 절대값과 동일
                          minWidth: "33px",
                          height: "28.6px",
                          padding: "0 8.8px",
                          borderRadius: "8.8px",
                          boxShadow: "4px 4px 10px 0 var(--color-border)"
                        },
                        children: m ? m(v, E) : v
                      }
                    );
                  }
                }
              ),
              l.map((r) => /* @__PURE__ */ t(
                N,
                {
                  name: r.name,
                  dataKey: r.key,
                  stroke: "var(--color-slate-200)",
                  strokeWidth: 1.5,
                  fill: u ? `url(#${r.fillGradientId})` : r.color,
                  fillOpacity: u ? 0.5 : w,
                  dot: f ? { r: 2, fill: "var(--color-slate-600)", stroke: "var(--color-slate-600)", strokeWidth: 0 } : !1,
                  activeDot: f ? { r: 4, fill: "var(--color-blue-500)", stroke: "white", strokeWidth: 1 } : !1,
                  isAnimationActive: S
                },
                r.key
              ))
            ] }) })
          }
        )
      ]
    }
  );
}
export {
  U as RadarChart
};
//# sourceMappingURL=radar-chart.mjs.map
