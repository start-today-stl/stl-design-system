import { jsx as s, jsxs as g } from "react/jsx-runtime";
import * as o from "react";
import { useSensors as Ke, useSensor as Pe, PointerSensor as Ie, DndContext as Ee } from "@dnd-kit/core";
import { SortableContext as Te, horizontalListSortingStrategy as ze } from "@dnd-kit/sortable";
import { cn as p } from "../../../lib/utils.mjs";
import { DataTableV2ColumnSeparator as ne } from "./data-table-v2-column-separator.mjs";
import { DataTableV2Row as Ae } from "./data-table-v2-row.mjs";
import { DataTableV2SortableHeaderCell as Be } from "./data-table-v2-sortable-header-cell.mjs";
import { useColumnResize as He } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as je } from "./hooks/use-column-reorder.mjs";
const Fe = 40, A = 120, z = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function re({ direction: n, active: l }) {
  return /* @__PURE__ */ s(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: p(
        "transition-colors",
        l ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        n === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ s("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
}
function Oe(n, l, h) {
  const f = n.find((c) => c.column === l);
  return h ? f ? f.direction === "asc" ? n.map(
    (c) => c.column === l ? { column: l, direction: "desc" } : c
  ) : n.filter((c) => c.column !== l) : [...n, { column: l, direction: "asc" }] : f ? f.direction === "asc" ? [{ column: l, direction: "desc" }] : [] : [{ column: l, direction: "asc" }];
}
function Ve(n) {
  const l = new Array(n.length).fill(-1), h = new Array(n.length).fill(-1);
  let f = 0;
  for (let a = 0; a < n.length; a++)
    n[a].pinned === "left" && (l[a] = f, f += _(n[a]));
  let c = 0;
  for (let a = n.length - 1; a >= 0; a--)
    n[a].pinned === "right" && (h[a] = c, c += _(n[a]));
  return { left: l, right: h };
}
function _(n) {
  return typeof n.width == "number" ? n.width : typeof n.minWidth == "number" ? n.minWidth : A;
}
function $e(n) {
  return n.reduce((l, h) => l + _(h), 0);
}
function tt({
  data: n,
  columns: l,
  headerGroups: h,
  sortState: f,
  onSortChange: c,
  multiSort: a = !1,
  resizable: S = !1,
  columnWidths: ie,
  onColumnResize: se,
  columnReorderable: v = !1,
  columnOrder: oe,
  onColumnReorder: de,
  maxHeight: R,
  estimateRowHeight: B = Fe,
  className: le
}) {
  const { orderedColumns: W, handleColumnDragEnd: H } = je({
    columns: l,
    columnReorderable: v,
    columnOrder: oe,
    onColumnReorder: de
  }), { getColumnWidth: j, handleResizeStart: ae, resizingKey: ce } = He({
    resizable: S,
    columnWidths: ie,
    onColumnResize: se
  }), d = o.useMemo(() => S ? W.map((e) => {
    const t = j(e);
    return t !== void 0 ? { ...e, width: t } : e;
  }) : W, [W, S, j]), { left: M, right: D } = o.useMemo(
    () => Ve(d),
    [d]
  ), F = o.useMemo(() => $e(d), [d]), w = o.useMemo(
    () => f ?? [],
    [f]
  ), he = o.useCallback(
    (e) => {
      const t = w.findIndex((i) => i.column === e);
      return t < 0 ? { direction: null, priority: void 0 } : {
        direction: w[t].direction,
        priority: a && w.length > 1 ? t + 1 : void 0
      };
    },
    [w, a]
  ), fe = o.useCallback(
    (e) => {
      c && c(Oe(w, e, a));
    },
    [w, a, c]
  ), O = o.useMemo(
    () => d.some((e) => typeof e.width != "number"),
    [d]
  ), ue = o.useMemo(
    () => v ? d.filter((e) => !e.pinned && !e.sortable).map((e) => String(e.accessorKey)) : [],
    [d, v]
  ), me = Ke(
    Pe(Ie, { activationConstraint: { distance: 5 } })
  ), ge = o.useCallback(
    (e) => H(e),
    [H]
  ), [V, pe] = o.useState(/* @__PURE__ */ new Map()), xe = o.useCallback((e, t) => {
    pe((r) => {
      if (r.get(e) === t) return r;
      const i = new Map(r);
      return i.set(e, t), i;
    });
  }, []), $ = o.useMemo(() => {
    const e = new Array(n.length + 1);
    e[0] = 0;
    for (let t = 0; t < n.length; t++) {
      const r = V.get(n[t].id) ?? B;
      e[t + 1] = e[t] + r;
    }
    return e;
  }, [n, V, B]), ye = $[n.length], [ve, we] = o.useState(null), U = o.useRef(null), [K, be] = o.useState(!1), [P, ke] = o.useState(!1);
  o.useEffect(() => {
    const e = U.current;
    if (!e) return;
    const t = () => {
      be(e.scrollLeft > 0), ke(e.scrollLeft + e.clientWidth < e.scrollWidth - 1);
    };
    t(), e.addEventListener("scroll", t, { passive: !0 });
    const r = new ResizeObserver(t);
    return r.observe(e), () => {
      e.removeEventListener("scroll", t), r.disconnect();
    };
  }, []);
  const N = o.useMemo(
    () => d.filter((e) => !e.pinned),
    [d]
  ), b = o.useMemo(() => {
    if (!h || h.length === 0) return null;
    const e = [];
    let t = 0;
    for (; t < N.length; ) {
      const r = N[t], i = h.find((u) => u.columns[0] === r.accessorKey);
      if (i) {
        const u = i.columns.reduce((x, y) => {
          const m = N.find((C) => C.accessorKey === y);
          return x + (m ? _(m) : A);
        }, 0);
        e.push({
          kind: "group",
          key: `group-${String(r.accessorKey)}`,
          width: u,
          group: i
        }), t += i.columns.length;
      } else
        e.push({
          kind: "placeholder",
          key: `middle-empty-${String(r.accessorKey)}`,
          col: r
        }), t += 1;
    }
    return e;
  }, [N, h]), G = b !== null && b.length > 0, Ce = G ? 2 : 1, I = "bg-slate-100 dark:bg-slate-800", Y = (e, t) => {
    const r = e.id ?? String(e.accessorKey), i = he(e.accessorKey), u = typeof e.width == "number" ? e.width : void 0, x = typeof e.minWidth == "number" ? e.minWidth : void 0, y = e.pinned === "left", m = e.pinned === "right", C = y || m, Se = t === T && K, Ne = t === k && P, Le = t === k, _e = v && !C && !e.sortable, Re = ce === e.accessorKey, We = t === d.length - 1, J = p(
      "relative flex min-h-9",
      u !== void 0 && "shrink-0",
      C && "sticky z-20",
      C && I,
      Se && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      Ne && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      e.sortable && "select-none",
      Le && "ml-auto"
    ), Q = {
      width: u,
      minWidth: x,
      flex: u === void 0 ? "1 1 0" : void 0,
      left: y ? M[t] : void 0,
      right: m ? D[t] : void 0
    }, X = p(
      "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
      z[e.align ?? "left"]
    ), ee = e.sortable ? /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        className: p(
          "flex w-full items-center gap-1 cursor-pointer",
          // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
          e.align === "right" ? "flex-row-reverse justify-start" : z[e.align ?? "left"]
        ),
        onClick: () => fe(e.accessorKey),
        children: [
          e.header,
          /* @__PURE__ */ g("span", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ g("span", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ s(re, { direction: "up", active: i.direction === "asc" }),
              /* @__PURE__ */ s(re, { direction: "down", active: i.direction === "desc" })
            ] }),
            i.priority !== void 0 && /* @__PURE__ */ s("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: i.priority })
          ] })
        ]
      }
    ) : e.header, te = !We && /* @__PURE__ */ s(
      ne,
      {
        resizable: S,
        isResizing: Re,
        onResizeStart: (De) => ae(De, e)
      }
    ), Me = e.sortable ? i.direction === "asc" ? "ascending" : i.direction === "desc" ? "descending" : "none" : void 0;
    return _e ? /* @__PURE__ */ g(
      Be,
      {
        id: String(e.accessorKey),
        className: J,
        style: Q,
        children: [
          /* @__PURE__ */ s("div", { className: X, children: ee }),
          te
        ]
      },
      r
    ) : /* @__PURE__ */ g(
      "div",
      {
        role: "columnheader",
        className: J,
        style: Q,
        "aria-sort": Me,
        children: [
          /* @__PURE__ */ s("div", { className: X, children: ee }),
          te
        ]
      },
      r
    );
  }, Z = (e, t) => {
    const r = typeof e.width == "number" ? e.width : A, i = e.pinned === "left";
    return /* @__PURE__ */ s(
      "div",
      {
        className: p(
          "shrink-0 sticky z-20",
          I,
          t === k && "ml-auto",
          t === T && K && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          t === k && P && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: r,
          left: i ? M[t] : void 0,
          right: i ? void 0 : D[t]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, L = d.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "left"), E = d.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "right"), T = L.length ? L[L.length - 1].i : -1, k = E.length ? E[0].i : -1, q = /* @__PURE__ */ s(
    "div",
    {
      role: "grid",
      "aria-rowcount": n.length + Ce,
      "aria-colcount": d.length,
      className: p(
        // flex-1 컬럼 있으면 컨테이너 폭 채워서 그 컬럼이 자라게. 없으면 콘텐츠 폭 (빈 공간 없음).
        O ? "w-full" : "w-fit max-w-full",
        "overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        le
      ),
      children: /* @__PURE__ */ s(
        "div",
        {
          ref: U,
          className: "overflow-auto",
          style: { maxHeight: typeof R == "number" ? `${R}px` : R },
          children: /* @__PURE__ */ g("div", { style: { minWidth: F }, children: [
            /* @__PURE__ */ g(
              "div",
              {
                className: p(
                  "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
                  I
                ),
                children: [
                  G && b && /* @__PURE__ */ g(
                    "div",
                    {
                      role: "row",
                      className: "flex border-b border-slate-200 dark:border-slate-700",
                      children: [
                        L.map(({ c: e, i: t }) => Z(e, t)),
                        b.map((e, t) => {
                          if (e.kind === "group") {
                            let x = -1;
                            for (let m = b.length - 1; m >= 0; m--)
                              if (b[m].kind === "group") {
                                x = m;
                                break;
                              }
                            const y = t === x;
                            return /* @__PURE__ */ g(
                              "div",
                              {
                                role: "columnheader",
                                className: "relative flex min-h-9 shrink-0",
                                style: { width: e.width },
                                children: [
                                  /* @__PURE__ */ s(
                                    "div",
                                    {
                                      className: p(
                                        "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                                        z[e.group.align ?? "center"]
                                      ),
                                      children: e.group.header
                                    }
                                  ),
                                  !y && /* @__PURE__ */ s(ne, {})
                                ]
                              },
                              e.key
                            );
                          }
                          const r = e.col, i = typeof r.width == "number" ? r.width : void 0, u = typeof r.minWidth == "number" ? r.minWidth : void 0;
                          return /* @__PURE__ */ s(
                            "div",
                            {
                              className: p(
                                "min-h-9",
                                i === void 0 ? "flex-1" : "shrink-0"
                              ),
                              style: { width: i, minWidth: u }
                            },
                            e.key
                          );
                        }),
                        E.map(({ c: e, i: t }) => Z(e, t))
                      ]
                    }
                  ),
                  v ? /* @__PURE__ */ s(
                    Te,
                    {
                      items: ue,
                      strategy: ze,
                      children: /* @__PURE__ */ g("div", { role: "row", className: "flex", children: [
                        d.map((e, t) => Y(e, t)),
                        k === -1 && !O && /* @__PURE__ */ s("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
                      ] })
                    }
                  ) : /* @__PURE__ */ s("div", { role: "row", className: "flex", children: d.map((e, t) => Y(e, t)) })
                ]
              }
            ),
            /* @__PURE__ */ s("div", { className: "relative", style: { height: ye }, children: n.map((e, t) => /* @__PURE__ */ s(
              Ae,
              {
                row: e,
                columns: d,
                leftOffsets: M,
                rightOffsets: D,
                lastLeftPinnedIdx: T,
                firstRightPinnedIdx: k,
                showLeftShadow: K,
                showRightShadow: P,
                totalWidth: F,
                translateY: $[t],
                isHovered: ve === e.id,
                onHover: we,
                onHeightChange: xe
              },
              e.id
            )) })
          ] })
        }
      )
    }
  );
  return v ? /* @__PURE__ */ s(Ee, { sensors: me, onDragEnd: ge, children: q }) : q;
}
export {
  tt as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
