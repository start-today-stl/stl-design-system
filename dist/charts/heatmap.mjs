import { jsxs as l, jsx as t } from "react/jsx-runtime";
import * as f from "react";
import { cn as U } from "../lib/utils.mjs";
const q = () => "Sort Deep Blue";
function L({
  title: p,
  data: d,
  xLabels: c,
  yLabels: x,
  color: u = "var(--color-primary)",
  cellSize: a = 15,
  cellGap: n = 0,
  max: h,
  min: g = 0,
  minOpacity: m = 0.05,
  maxOpacity: v = 1,
  showLegend: j = !0,
  legendSteps: N = 6,
  legendLabel: D = q,
  showXAxis: H = !0,
  showYAxis: k = !0,
  tooltipFormatter: y,
  className: R,
  ..._
}) {
  const [r, w] = f.useState(null), A = f.useMemo(() => {
    if (h !== void 0) return h;
    let s = -1 / 0;
    for (const e of d)
      for (const o of e)
        o > s && (s = o);
    return s === -1 / 0 ? 1 : s;
  }, [d, h]) - g || 1, B = (s) => {
    const e = Math.max(0, Math.min(1, (s - g) / A));
    return m + e * (v - m);
  }, b = c.length, M = x.length, T = b * a + (b - 1) * n, W = M * a + (M - 1) * n, C = f.useRef(null);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: C,
      className: U(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-3",
        R
      ),
      ..._,
      children: [
        p && /* @__PURE__ */ t("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-100", children: p }),
        /* @__PURE__ */ l("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ l("div", { className: "flex flex-col gap-1 flex-1", children: [
            /* @__PURE__ */ l("div", { className: "flex gap-1", children: [
              k && /* @__PURE__ */ t(
                "div",
                {
                  className: "flex flex-col text-[10px] text-slate-500 dark:text-slate-400 tabular-nums",
                  style: { gap: `${n}px` },
                  children: x.map((s, e) => /* @__PURE__ */ t(
                    "div",
                    {
                      className: "flex items-center justify-end pr-1",
                      style: { height: `${a}px`, minWidth: "16px" },
                      children: s
                    },
                    e
                  ))
                }
              ),
              /* @__PURE__ */ l("div", { className: "relative", children: [
                /* @__PURE__ */ t(
                  "svg",
                  {
                    width: T,
                    height: W,
                    onMouseLeave: () => w(null),
                    style: { display: "block" },
                    children: d.map(
                      (s, e) => s.map((o, i) => {
                        const $ = i * (a + n), E = e * (a + n);
                        return /* @__PURE__ */ t(
                          "rect",
                          {
                            x: $,
                            y: E,
                            width: a,
                            height: a,
                            fill: u,
                            fillOpacity: B(o),
                            onMouseEnter: () => w({ row: e, col: i, x: $, y: E }),
                            style: { cursor: "pointer" }
                          },
                          `${e}-${i}`
                        );
                      })
                    )
                  }
                ),
                r && /* @__PURE__ */ t(
                  "div",
                  {
                    className: "pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md whitespace-nowrap z-10",
                    style: {
                      left: `${r.x + a / 2}px`,
                      top: `${r.y - 4}px`
                    },
                    children: y ? /* @__PURE__ */ t("div", { className: "text-sm text-slate-700 dark:text-slate-100", children: y(
                      d[r.row][r.col],
                      c[r.col],
                      x[r.row]
                    ) }) : /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5 text-sm text-slate-700 dark:text-slate-100", children: [
                      /* @__PURE__ */ l("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: [
                        x[r.row],
                        " / ",
                        c[r.col]
                      ] }),
                      /* @__PURE__ */ t("span", { className: "font-medium", children: d[r.row][r.col] })
                    ] })
                  }
                )
              ] })
            ] }),
            H && /* @__PURE__ */ t("div", { className: "flex gap-1", style: { marginLeft: k ? "20px" : 0 }, children: /* @__PURE__ */ t(
              "div",
              {
                className: "flex text-[10px] text-slate-500 dark:text-slate-400 tabular-nums",
                style: { gap: `${n}px` },
                children: c.map((s, e) => /* @__PURE__ */ t(
                  "div",
                  {
                    className: "flex items-center justify-center",
                    style: { width: `${a}px` },
                    children: s
                  },
                  e
                ))
              }
            ) })
          ] }),
          j && /* @__PURE__ */ t("div", { className: "flex flex-col gap-1 shrink-0", children: Array.from({ length: N }, (s, e) => {
            const o = 1 - e / Math.max(1, N - 1), i = m + o * (v - m);
            return /* @__PURE__ */ l("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ t(
                "span",
                {
                  "aria-hidden": !0,
                  className: "block size-2.5 rounded-full shrink-0",
                  style: { backgroundColor: u, opacity: i }
                }
              ),
              /* @__PURE__ */ t("span", { className: "text-[9px] text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap", children: D(e) })
            ] }, e);
          }) })
        ] })
      ]
    }
  );
}
export {
  L as Heatmap
};
//# sourceMappingURL=heatmap.mjs.map
