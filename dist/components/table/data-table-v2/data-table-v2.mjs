import { jsx as l, jsxs as g } from "react/jsx-runtime";
import * as d from "react";
import { cn as u } from "../../../lib/utils.mjs";
import { DataTableV2Row as se } from "./data-table-v2-row.mjs";
const oe = 40, B = 120, $ = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function F({ direction: n, active: r }) {
  return /* @__PURE__ */ l(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: u(
        "transition-colors",
        r ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        n === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ l("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
}
function de(n, r, a) {
  const h = n.find((c) => c.column === r);
  return a ? h ? h.direction === "asc" ? n.map(
    (c) => c.column === r ? { column: r, direction: "desc" } : c
  ) : n.filter((c) => c.column !== r) : [...n, { column: r, direction: "asc" }] : h ? h.direction === "asc" ? [{ column: r, direction: "desc" }] : [] : [{ column: r, direction: "asc" }];
}
function le(n) {
  const r = new Array(n.length).fill(-1), a = new Array(n.length).fill(-1);
  let h = 0;
  for (let o = 0; o < n.length; o++)
    n[o].pinned === "left" && (r[o] = h, h += _(n[o]));
  let c = 0;
  for (let o = n.length - 1; o >= 0; o--)
    n[o].pinned === "right" && (a[o] = c, c += _(n[o]));
  return { left: r, right: a };
}
function _(n) {
  return typeof n.width == "number" ? n.width : typeof n.minWidth == "number" ? n.minWidth : B;
}
function ce(n) {
  return n.reduce((r, a) => r + _(a), 0);
}
function ue({
  data: n,
  columns: r,
  headerGroups: a,
  sortState: h,
  onSortChange: c,
  multiSort: o = !1,
  maxHeight: L,
  estimateRowHeight: H = oe,
  className: U
}) {
  const { left: N, right: C } = d.useMemo(
    () => le(r),
    [r]
  ), K = d.useMemo(() => ce(r), [r]), p = d.useMemo(
    () => h ?? [],
    [h]
  ), V = d.useCallback(
    (e) => {
      const t = p.findIndex((s) => s.column === e);
      return t < 0 ? { direction: null, priority: void 0 } : {
        direction: p[t].direction,
        priority: o && p.length > 1 ? t + 1 : void 0
      };
    },
    [p, o]
  ), Y = d.useCallback(
    (e) => {
      c && c(de(p, e, o));
    },
    [p, o, c]
  ), [P, Z] = d.useState(/* @__PURE__ */ new Map()), q = d.useCallback((e, t) => {
    Z((i) => {
      if (i.get(e) === t) return i;
      const s = new Map(i);
      return s.set(e, t), s;
    });
  }, []), E = d.useMemo(() => {
    const e = new Array(n.length + 1);
    e[0] = 0;
    for (let t = 0; t < n.length; t++) {
      const i = P.get(n[t].id) ?? H;
      e[t + 1] = e[t] + i;
    }
    return e;
  }, [n, P, H]), J = E[n.length], [Q, X] = d.useState(null), T = d.useRef(null), [W, G] = d.useState(!1), [R, ee] = d.useState(!1);
  d.useEffect(() => {
    const e = T.current;
    if (!e) return;
    const t = () => {
      G(e.scrollLeft > 0), ee(e.scrollLeft + e.clientWidth < e.scrollWidth - 1);
    };
    t(), e.addEventListener("scroll", t, { passive: !0 });
    const i = new ResizeObserver(t);
    return i.observe(e), () => {
      e.removeEventListener("scroll", t), i.disconnect();
    };
  }, []);
  const x = d.useMemo(
    () => r.filter((e) => !e.pinned),
    [r]
  ), y = d.useMemo(() => {
    if (!a || a.length === 0) return null;
    const e = [];
    let t = 0;
    for (; t < x.length; ) {
      const i = x[t], s = a.find((f) => f.columns[0] === i.accessorKey);
      if (s) {
        const f = s.columns.reduce((w, v) => {
          const m = x.find((k) => k.accessorKey === v);
          return w + (m ? _(m) : B);
        }, 0);
        e.push({
          kind: "group",
          key: `group-${String(i.accessorKey)}`,
          width: f,
          group: s
        }), t += s.columns.length;
      } else
        e.push({
          kind: "placeholder",
          key: `middle-empty-${String(i.accessorKey)}`,
          col: i
        }), t += 1;
    }
    return e;
  }, [x, a]), j = y !== null && y.length > 0, te = j ? 2 : 1, S = "bg-slate-100 dark:bg-slate-800", ne = (e, t) => {
    const i = e.id ?? String(e.accessorKey), s = V(e.accessorKey), f = typeof e.width == "number" ? e.width : void 0, w = typeof e.minWidth == "number" ? e.minWidth : void 0, v = e.pinned === "left", m = e.pinned === "right", k = v || m, re = t === A && W, ie = t === I && R, D = u(
      "flex min-h-9 items-center pl-3 pr-1.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
      f !== void 0 && "shrink-0",
      $[e.align ?? "left"],
      k && "sticky z-20",
      k && S,
      re && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      ie && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
    ), O = {
      width: f,
      minWidth: w,
      flex: f === void 0 ? "1 1 0" : void 0,
      left: v ? N[t] : void 0,
      right: m ? C[t] : void 0
    };
    return e.sortable ? /* @__PURE__ */ l(
      "div",
      {
        role: "columnheader",
        className: u(D, "select-none"),
        style: O,
        "aria-sort": s.direction === "asc" ? "ascending" : s.direction === "desc" ? "descending" : "none",
        children: /* @__PURE__ */ g(
          "button",
          {
            type: "button",
            className: "flex w-full items-center gap-1 text-left cursor-pointer",
            onClick: () => Y(e.accessorKey),
            children: [
              e.header,
              /* @__PURE__ */ g("span", { className: "flex items-center gap-0.5", children: [
                /* @__PURE__ */ g("span", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ l(F, { direction: "up", active: s.direction === "asc" }),
                  /* @__PURE__ */ l(F, { direction: "down", active: s.direction === "desc" })
                ] }),
                s.priority !== void 0 && /* @__PURE__ */ l("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: s.priority })
              ] })
            ]
          }
        )
      },
      i
    ) : /* @__PURE__ */ l("div", { role: "columnheader", className: D, style: O, children: e.header }, i);
  }, z = (e, t) => {
    const i = typeof e.width == "number" ? e.width : B, s = e.pinned === "left";
    return /* @__PURE__ */ l(
      "div",
      {
        className: u(
          "shrink-0 sticky z-20",
          S,
          t === A && W && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          t === I && R && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: i,
          left: s ? N[t] : void 0,
          right: s ? void 0 : C[t]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, b = r.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "left"), M = r.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "right"), A = b.length ? b[b.length - 1].i : -1, I = M.length ? M[0].i : -1;
  return /* @__PURE__ */ l(
    "div",
    {
      role: "grid",
      "aria-rowcount": n.length + te,
      "aria-colcount": r.length,
      className: u(
        "w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        U
      ),
      children: /* @__PURE__ */ l(
        "div",
        {
          ref: T,
          className: "overflow-auto",
          style: { maxHeight: typeof L == "number" ? `${L}px` : L },
          children: /* @__PURE__ */ g("div", { style: { minWidth: K }, children: [
            /* @__PURE__ */ g(
              "div",
              {
                className: u(
                  "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
                  S
                ),
                children: [
                  j && y && /* @__PURE__ */ g(
                    "div",
                    {
                      role: "row",
                      className: "flex border-b border-slate-200 dark:border-slate-700",
                      children: [
                        b.map(({ c: e, i: t }) => z(e, t)),
                        y.map((e) => {
                          if (e.kind === "group")
                            return /* @__PURE__ */ l(
                              "div",
                              {
                                role: "columnheader",
                                className: u(
                                  "shrink-0 flex min-h-9 items-center pl-3 pr-1.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700 last:border-r-0",
                                  $[e.group.align ?? "center"]
                                ),
                                style: { width: e.width },
                                children: e.group.header
                              },
                              e.key
                            );
                          const t = e.col, i = typeof t.width == "number" ? t.width : void 0, s = typeof t.minWidth == "number" ? t.minWidth : void 0;
                          return /* @__PURE__ */ l(
                            "div",
                            {
                              className: u(
                                "min-h-9",
                                i === void 0 ? "flex-1" : "shrink-0"
                              ),
                              style: { width: i, minWidth: s }
                            },
                            e.key
                          );
                        }),
                        M.map(({ c: e, i: t }) => z(e, t))
                      ]
                    }
                  ),
                  /* @__PURE__ */ l("div", { role: "row", className: "flex", children: r.map((e, t) => ne(e, t)) })
                ]
              }
            ),
            /* @__PURE__ */ l("div", { className: "relative", style: { height: J }, children: n.map((e, t) => /* @__PURE__ */ l(
              se,
              {
                row: e,
                columns: r,
                leftOffsets: N,
                rightOffsets: C,
                lastLeftPinnedIdx: A,
                firstRightPinnedIdx: I,
                showLeftShadow: W,
                showRightShadow: R,
                totalWidth: K,
                translateY: E[t],
                isHovered: Q === e.id,
                onHover: X,
                onHeightChange: q
              },
              e.id
            )) })
          ] })
        }
      )
    }
  );
}
export {
  ue as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
