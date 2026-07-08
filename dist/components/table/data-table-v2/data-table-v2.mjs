import { jsx as i, jsxs as u } from "react/jsx-runtime";
import * as o from "react";
import { useSensors as Xe, useSensor as Ge, PointerSensor as Ye, DndContext as Ze } from "@dnd-kit/core";
import { SortableContext as qe, horizontalListSortingStrategy as Je } from "@dnd-kit/sortable";
import { cn as h } from "../../../lib/utils.mjs";
import { Checkbox as Qe } from "../../ui/checkbox.mjs";
import { DownIcon as et } from "../../../icons/DownIcon.mjs";
import { RightIcon as tt } from "../../../icons/RightIcon.mjs";
import { DataTableV2ColumnSeparator as he } from "./data-table-v2-column-separator.mjs";
import { DataTableV2Row as nt } from "./data-table-v2-row.mjs";
import { DataTableV2SortableHeaderCell as it } from "./data-table-v2-sortable-header-cell.mjs";
import { useColumnResize as st } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as rt } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as ot } from "./hooks/use-row-expansion.mjs";
import { useRowSelection as lt } from "./hooks/use-row-selection.mjs";
const dt = 40, U = 120, L = 40, A = 40, $ = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function fe({ direction: n, active: c }) {
  return /* @__PURE__ */ i(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: h(
        "transition-colors",
        c ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        n === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ i("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
}
function ct(n, c, f) {
  const m = n.find((a) => a.column === c);
  return f ? m ? m.direction === "asc" ? n.map(
    (a) => a.column === c ? { column: c, direction: "desc" } : a
  ) : n.filter((a) => a.column !== c) : [...n, { column: c, direction: "asc" }] : m ? m.direction === "asc" ? [{ column: c, direction: "desc" }] : [] : [{ column: c, direction: "asc" }];
}
function at(n, c = 0) {
  const f = new Array(n.length).fill(-1), m = new Array(n.length).fill(-1);
  let a = c;
  for (let d = 0; d < n.length; d++)
    n[d].pinned === "left" && (f[d] = a, a += H(n[d]));
  let y = 0;
  for (let d = n.length - 1; d >= 0; d--)
    n[d].pinned === "right" && (m[d] = y, y += H(n[d]));
  return { left: f, right: m };
}
function H(n) {
  return typeof n.width == "number" ? n.width : typeof n.minWidth == "number" ? n.minWidth : U;
}
function ht(n) {
  return n.reduce((c, f) => c + H(f), 0);
}
function Rt({
  data: n,
  columns: c,
  headerGroups: f,
  sortState: m,
  onSortChange: a,
  multiSort: y = !1,
  resizable: d = !1,
  columnWidths: ue,
  onColumnResize: me,
  columnReorderable: S = !1,
  columnOrder: ge,
  onColumnReorder: pe,
  selectable: v = !1,
  selectedIds: xe,
  defaultSelectedIds: ye,
  onSelectionChange: ve,
  onRowClick: we,
  rowClassName: M,
  expandable: g,
  maxHeight: P,
  estimateRowHeight: X = dt,
  className: ke
}) {
  const { orderedColumns: T, handleColumnDragEnd: G } = rt({
    columns: c,
    columnReorderable: S,
    columnOrder: ge,
    onColumnReorder: pe
  }), { getColumnWidth: Y, handleResizeStart: Ce, resizingKey: be } = st({
    resizable: d,
    columnWidths: ue,
    onColumnResize: me
  }), l = o.useMemo(() => d ? T.map((e) => {
    const t = Y(e);
    return t !== void 0 ? { ...e, width: t } : e;
  }) : T, [T, d, Y]), D = (v ? L : 0) + (g ? A : 0), { left: K, right: B } = o.useMemo(
    () => at(l, D),
    [l, D]
  ), Z = o.useMemo(
    () => ht(l) + D,
    [l, D]
  ), _ = lt({
    data: n,
    selectable: v,
    selectedIds: xe,
    defaultSelectedIds: ye,
    onSelectionChange: ve
  }), w = ot({ data: n, expandable: g }), N = o.useMemo(
    () => m ?? [],
    [m]
  ), Se = o.useCallback(
    (e) => {
      const t = N.findIndex((r) => r.column === e);
      return t < 0 ? { direction: null, priority: void 0 } : {
        direction: N[t].direction,
        priority: y && N.length > 1 ? t + 1 : void 0
      };
    },
    [N, y]
  ), Ne = o.useCallback(
    (e) => {
      a && a(ct(N, e, y));
    },
    [N, y, a]
  ), q = o.useMemo(
    () => l.some((e) => typeof e.width != "number"),
    [l]
  ), Re = o.useMemo(
    () => S ? l.filter((e) => !e.pinned && !e.sortable).map((e) => String(e.accessorKey)) : [],
    [l, S]
  ), Ee = Xe(
    Ge(Ye, { activationConstraint: { distance: 5 } })
  ), Le = o.useCallback(
    (e) => G(e),
    [G]
  ), [J, _e] = o.useState(/* @__PURE__ */ new Map()), We = o.useCallback((e, t) => {
    _e((s) => {
      if (s.get(e) === t) return s;
      const r = new Map(s);
      return r.set(e, t), r;
    });
  }, []), Q = o.useMemo(() => {
    const e = new Array(n.length + 1);
    e[0] = 0;
    for (let t = 0; t < n.length; t++) {
      const s = J.get(n[t].id) ?? X;
      e[t + 1] = e[t] + s;
    }
    return e;
  }, [n, J, X]), De = Q[n.length], [Ie, ze] = o.useState(null), ee = o.useRef(null), [j, Ae] = o.useState(!1), [O, He] = o.useState(!1);
  o.useEffect(() => {
    const e = ee.current;
    if (!e) return;
    const t = () => {
      Ae(e.scrollLeft > 0), He(e.scrollLeft + e.clientWidth < e.scrollWidth - 1);
    };
    t(), e.addEventListener("scroll", t, { passive: !0 });
    const s = new ResizeObserver(t);
    return s.observe(e), () => {
      e.removeEventListener("scroll", t), s.disconnect();
    };
  }, []);
  const I = o.useMemo(
    () => l.filter((e) => !e.pinned),
    [l]
  ), R = o.useMemo(() => {
    if (!f || f.length === 0) return null;
    const e = [];
    let t = 0;
    for (; t < I.length; ) {
      const s = I[t], r = f.find((p) => p.columns[0] === s.accessorKey);
      if (r) {
        const p = r.columns.reduce((C, b) => {
          const x = I.find((W) => W.accessorKey === b);
          return C + (x ? H(x) : U);
        }, 0);
        e.push({
          kind: "group",
          key: `group-${String(s.accessorKey)}`,
          width: p,
          group: r
        }), t += r.columns.length;
      } else
        e.push({
          kind: "placeholder",
          key: `middle-empty-${String(s.accessorKey)}`,
          col: s
        }), t += 1;
    }
    return e;
  }, [I, f]), te = R !== null && R.length > 0, Me = te ? 2 : 1, k = "bg-slate-100 dark:bg-slate-800", ne = (e, t) => {
    const s = e.id ?? String(e.accessorKey), r = Se(e.accessorKey), p = typeof e.width == "number" ? e.width : void 0, C = typeof e.minWidth == "number" ? e.minWidth : void 0, b = e.pinned === "left", x = e.pinned === "right", W = b || x, Ke = t === V && j, Be = t === E && O, je = t === E, Oe = S && !W && !e.sortable, Fe = be === e.accessorKey, Ve = t === l.length - 1, oe = h(
      "relative flex min-h-9",
      p !== void 0 && "shrink-0",
      W && "sticky z-20",
      W && k,
      Ke && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      Be && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      e.sortable && "select-none",
      je && "ml-auto"
    ), le = {
      width: p,
      minWidth: C,
      flex: p === void 0 ? "1 1 0" : void 0,
      left: b ? K[t] : void 0,
      right: x ? B[t] : void 0
    }, de = h(
      "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
      $[e.align ?? "left"]
    ), ce = e.sortable ? /* @__PURE__ */ u(
      "button",
      {
        type: "button",
        className: h(
          "flex w-full items-center gap-1 cursor-pointer",
          // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
          e.align === "right" ? "flex-row-reverse justify-start" : $[e.align ?? "left"]
        ),
        onClick: () => Ne(e.accessorKey),
        children: [
          e.header,
          /* @__PURE__ */ u("span", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ u("span", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ i(fe, { direction: "up", active: r.direction === "asc" }),
              /* @__PURE__ */ i(fe, { direction: "down", active: r.direction === "desc" })
            ] }),
            r.priority !== void 0 && /* @__PURE__ */ i("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: r.priority })
          ] })
        ]
      }
    ) : e.header, ae = !Ve && /* @__PURE__ */ i(
      he,
      {
        resizable: d,
        isResizing: Fe,
        onResizeStart: (Ue) => Ce(Ue, e)
      }
    ), $e = e.sortable ? r.direction === "asc" ? "ascending" : r.direction === "desc" ? "descending" : "none" : void 0;
    return Oe ? /* @__PURE__ */ u(
      it,
      {
        id: String(e.accessorKey),
        className: oe,
        style: le,
        children: [
          /* @__PURE__ */ i("div", { className: de, children: ce }),
          ae
        ]
      },
      s
    ) : /* @__PURE__ */ u(
      "div",
      {
        role: "columnheader",
        className: oe,
        style: le,
        "aria-sort": $e,
        children: [
          /* @__PURE__ */ i("div", { className: de, children: ce }),
          ae
        ]
      },
      s
    );
  }, ie = (e, t) => {
    const s = typeof e.width == "number" ? e.width : U, r = e.pinned === "left";
    return /* @__PURE__ */ i(
      "div",
      {
        className: h(
          "shrink-0 sticky z-20",
          k,
          t === E && "ml-auto",
          t === V && j && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          t === E && O && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: s,
          left: r ? K[t] : void 0,
          right: r ? void 0 : B[t]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, Pe = (g == null ? void 0 : g.showExpandAll) ?? !0, se = () => {
    const e = [];
    return v && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          role: "columnheader",
          className: h("shrink-0 sticky z-20 flex items-center justify-center min-h-9", k),
          style: { width: L, left: 0 },
          children: /* @__PURE__ */ i(
            Qe,
            {
              checked: _.allSelected,
              indeterminate: _.someSelected,
              onCheckedChange: () => _.toggleAll(),
              "aria-label": "전체 선택"
            }
          )
        },
        "ctrl-header-select"
      )
    ), g && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          role: "columnheader",
          className: h("shrink-0 sticky z-20 flex items-center justify-center min-h-9", k),
          style: {
            width: A,
            left: v ? L : 0
          },
          children: Pe && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: w.toggleAll,
              className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
              "aria-label": w.allExpanded ? "모두 접기" : "모두 펼치기",
              children: w.allExpanded ? /* @__PURE__ */ i(et, { size: 24 }) : /* @__PURE__ */ i(tt, { size: 24 })
            }
          )
        },
        "ctrl-header-expand"
      )
    ), e;
  }, Te = () => {
    const e = [];
    return v && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: h("shrink-0 sticky z-20 min-h-9", k),
          style: { width: L, left: 0 }
        },
        "ctrl-ph-select"
      )
    ), g && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: h("shrink-0 sticky z-20 min-h-9", k),
          style: {
            width: A,
            left: v ? L : 0
          }
        },
        "ctrl-ph-expand"
      )
    ), e;
  }, z = l.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "left"), F = l.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "right"), V = z.length ? z[z.length - 1].i : -1, E = F.length ? F[0].i : -1, re = /* @__PURE__ */ i(
    "div",
    {
      role: "grid",
      "aria-rowcount": n.length + Me,
      "aria-colcount": l.length,
      className: h(
        // flex-1 컬럼 있으면 컨테이너 폭 채워서 그 컬럼이 자라게. 없으면 콘텐츠 폭 (빈 공간 없음).
        q ? "w-full" : "w-fit max-w-full",
        "overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        ke
      ),
      children: /* @__PURE__ */ i(
        "div",
        {
          ref: ee,
          className: "overflow-auto",
          style: { maxHeight: typeof P == "number" ? `${P}px` : P },
          children: /* @__PURE__ */ u("div", { style: { minWidth: Z }, children: [
            /* @__PURE__ */ u(
              "div",
              {
                className: h(
                  "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
                  k
                ),
                children: [
                  te && R && /* @__PURE__ */ u(
                    "div",
                    {
                      role: "row",
                      className: "flex border-b border-slate-200 dark:border-slate-700",
                      children: [
                        Te(),
                        z.map(({ c: e, i: t }) => ie(e, t)),
                        R.map((e, t) => {
                          if (e.kind === "group") {
                            let C = -1;
                            for (let x = R.length - 1; x >= 0; x--)
                              if (R[x].kind === "group") {
                                C = x;
                                break;
                              }
                            const b = t === C;
                            return /* @__PURE__ */ u(
                              "div",
                              {
                                role: "columnheader",
                                className: "relative flex min-h-9 shrink-0",
                                style: { width: e.width },
                                children: [
                                  /* @__PURE__ */ i(
                                    "div",
                                    {
                                      className: h(
                                        "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                                        $[e.group.align ?? "center"]
                                      ),
                                      children: e.group.header
                                    }
                                  ),
                                  !b && /* @__PURE__ */ i(he, {})
                                ]
                              },
                              e.key
                            );
                          }
                          const s = e.col, r = typeof s.width == "number" ? s.width : void 0, p = typeof s.minWidth == "number" ? s.minWidth : void 0;
                          return /* @__PURE__ */ i(
                            "div",
                            {
                              className: h(
                                "min-h-9",
                                r === void 0 ? "flex-1" : "shrink-0"
                              ),
                              style: { width: r, minWidth: p }
                            },
                            e.key
                          );
                        }),
                        F.map(({ c: e, i: t }) => ie(e, t))
                      ]
                    }
                  ),
                  S ? /* @__PURE__ */ i(
                    qe,
                    {
                      items: Re,
                      strategy: Je,
                      children: /* @__PURE__ */ u("div", { role: "row", className: "flex", children: [
                        se(),
                        l.map((e, t) => ne(e, t)),
                        E === -1 && !q && /* @__PURE__ */ i("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
                      ] })
                    }
                  ) : /* @__PURE__ */ u("div", { role: "row", className: "flex", children: [
                    se(),
                    l.map((e, t) => ne(e, t))
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ i("div", { className: "relative", style: { height: De }, children: n.map((e, t) => /* @__PURE__ */ i(
              nt,
              {
                row: e,
                rowIndex: t,
                columns: l,
                leftOffsets: K,
                rightOffsets: B,
                lastLeftPinnedIdx: V,
                firstRightPinnedIdx: E,
                showLeftShadow: j,
                showRightShadow: O,
                totalWidth: Z,
                translateY: Q[t],
                isHovered: Ie === e.id,
                onHover: ze,
                onHeightChange: We,
                selectable: v,
                isSelected: _.isSelected(e.id),
                onToggleSelect: _.toggleRow,
                checkboxColWidth: L,
                expandable: !!g,
                isExpanded: w.isExpanded(e.id),
                canExpand: w.canExpand(e),
                onToggleExpand: w.toggleRow,
                expandedContent: g && w.isExpanded(e.id) ? g.expandedRowRender(e) : null,
                expandColWidth: A,
                onRowClick: we,
                extraClassName: M == null ? void 0 : M(e)
              },
              e.id
            )) })
          ] })
        }
      )
    }
  );
  return S ? /* @__PURE__ */ i(Ze, { sensors: Ee, onDragEnd: Le, children: re }) : re;
}
export {
  Rt as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
