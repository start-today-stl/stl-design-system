import { jsx as n, jsxs as f, Fragment as Xt } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as Jt, useSensor as Yt, PointerSensor as Zt, DndContext as qt, closestCenter as Qt } from "@dnd-kit/core";
import { SortableContext as Ke, horizontalListSortingStrategy as At, verticalListSortingStrategy as er } from "@dnd-kit/sortable";
import { cn as d } from "../../../lib/utils.mjs";
import { Checkbox as tr } from "../../ui/checkbox.mjs";
import { Skeleton as he } from "../../ui/skeleton.mjs";
import { SplashScreen as rr } from "../../ui/splash-screen.mjs";
import { DownIcon as nr } from "../../../icons/DownIcon.mjs";
import { RightIcon as ir } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as sr } from "../../../icons/RowAddIcon.mjs";
import { DataTableV2FilterCell as lr } from "./data-table-v2-filter-cell.mjs";
import { useFilter as or } from "./hooks/use-filter.mjs";
import { useRowReorder as dr } from "./hooks/use-row-reorder.mjs";
import { DataTableV2ColumnSeparator as Te } from "./data-table-v2-column-separator.mjs";
import { DataTableV2Row as ar } from "./data-table-v2-row.mjs";
import { DataTableV2SortableHeaderCell as cr } from "./data-table-v2-sortable-header-cell.mjs";
import { useCellEdit as hr } from "./hooks/use-cell-edit.mjs";
import { useColumnResize as mr } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as fr } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as ur } from "./hooks/use-row-expansion.mjs";
import { useRowGrouping as gr } from "./hooks/use-row-grouping.mjs";
import { useRowSelection as pr } from "./hooks/use-row-selection.mjs";
import { useStableCallback as g } from "./hooks/use-stable-callback.mjs";
import { useTableVirtualizer as yr } from "./hooks/use-table-virtualizer.mjs";
const vr = 40, fe = 120, b = 40, T = 40, M = 40, P = 32, xr = 5, me = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
}, Me = l.memo(function({
  direction: m,
  active: p
}) {
  return /* @__PURE__ */ n(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: d(
        "transition-colors",
        p ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        m === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ n("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
});
function wr(i, m, p) {
  const C = i.find((y) => y.column === m);
  return p ? C ? C.direction === "asc" ? i.map(
    (y) => y.column === m ? { column: m, direction: "desc" } : y
  ) : i.filter((y) => y.column !== m) : [...i, { column: m, direction: "asc" }] : C ? C.direction === "asc" ? [{ column: m, direction: "desc" }] : [] : [{ column: m, direction: "asc" }];
}
function Cr(i, m = 0, p = 0) {
  const C = new Array(i.length).fill(-1), y = new Array(i.length).fill(-1);
  let R = m;
  for (let u = 0; u < i.length; u++)
    i[u].pinned === "left" && (C[u] = R, R += Z(i[u]));
  let S = p;
  for (let u = i.length - 1; u >= 0; u--)
    i[u].pinned === "right" && (y[u] = S, S += Z(i[u]));
  return { left: C, right: y };
}
function Z(i) {
  return typeof i.width == "number" ? i.width : typeof i.minWidth == "number" ? i.minWidth : fe;
}
function kr(i) {
  return i.reduce((m, p) => m + Z(p), 0);
}
function Xr({
  data: i,
  columns: m,
  headerGroups: p,
  sortState: C,
  onSortChange: y,
  multiSort: R = !1,
  resizable: S = !1,
  columnWidths: u,
  onColumnResize: Pe,
  columnReorderable: I = !1,
  columnOrder: je,
  onColumnReorder: Fe,
  selectable: v = !1,
  selectedIds: Be,
  defaultSelectedIds: Ve,
  onSelectionChange: $e,
  onRowClick: Ue,
  rowClassName: Ge,
  expandable: o,
  onCellChange: Xe,
  rowActions: c,
  loading: ue = !1,
  loadingMode: Je = "splash",
  loadingContent: ge,
  emptyMessage: Ye = "데이터가 없습니다.",
  rowReorderable: Ze = !1,
  onRowReorder: qe,
  filterState: Qe,
  defaultFilterState: Ae,
  onFilterChange: et,
  maxHeight: q,
  estimateRowHeight: pe = vr,
  rowGrouping: Q,
  virtual: tt,
  className: rt
}) {
  const x = Q ? !1 : Ze, L = (c == null ? void 0 : c.showDelete) ?? !!(c != null && c.onRowDelete), nt = (c == null ? void 0 : c.showAdd) ?? !!(c != null && c.onRowAdd), it = g(c == null ? void 0 : c.onRowDelete), A = g(c == null ? void 0 : c.onRowAdd), st = g(Ue), ee = g(Ge), lt = g(Xe), ye = g(o == null ? void 0 : o.expandedRowRender), ot = g($e), te = g(y), dt = g(et), at = g(Pe), ct = g(Fe), ht = g(qe), ve = g(o == null ? void 0 : o.onExpandedChange), { orderedColumns: re, handleColumnDragEnd: xe } = fr({
    columns: m,
    columnReorderable: I,
    columnOrder: je,
    onColumnReorder: ct
  }), { getColumnWidth: we, handleResizeStart: mt, resizingKey: ft } = mr({
    resizable: S,
    columnWidths: u,
    onColumnResize: at
  }), a = l.useMemo(() => S ? re.map((e) => {
    const t = we(e);
    return t !== void 0 ? { ...e, width: t } : e;
  }) : re, [re, S, we]), E = x ? P : 0, j = E + (v ? b : 0) + (o ? T : 0), V = j + (L ? M : 0), { left: ne, right: ie } = l.useMemo(
    () => Cr(a, V),
    [a, V]
  ), Ce = l.useMemo(
    () => kr(a) + V,
    [a, V]
  ), F = pr({
    data: i,
    selectable: v,
    selectedIds: Be,
    defaultSelectedIds: Ve,
    onSelectionChange: ot
  }), ut = l.useMemo(
    () => o ? { ...o, onExpandedChange: ve } : void 0,
    [o, ve]
  ), W = ur({ data: i, expandable: ut }), N = hr({ onCellChange: lt }), { handleRowDragEnd: ke } = dr({ data: i, onRowReorder: ht }), { rowSpanMap: gt, getRowSpan: B } = gr({ data: i, rowGrouping: Q }), se = or({ filterState: Qe, defaultFilterState: Ae, onFilterChange: dt }), O = l.useMemo(
    () => C ?? [],
    [C]
  ), pt = l.useCallback(
    (e) => {
      const t = O.findIndex((s) => s.column === e);
      return t < 0 ? { direction: null, priority: void 0 } : {
        direction: O[t].direction,
        priority: R && O.length > 1 ? t + 1 : void 0
      };
    },
    [O, R]
  ), yt = l.useCallback(
    (e) => {
      te && te(wr(O, e, R));
    },
    [O, R, te]
  ), be = l.useMemo(
    () => a.some((e) => typeof e.width != "number"),
    [a]
  ), vt = l.useMemo(
    () => I ? a.filter((e) => !e.pinned && !e.sortable).map((e) => String(e.accessorKey)) : [],
    [a, I]
  ), xt = Jt(
    Yt(Zt, { activationConstraint: { distance: 5 } })
  ), wt = l.useCallback(
    (e) => {
      String(e.active.id).startsWith("row-") ? ke(e) : xe(e);
    },
    [xe, ke]
  ), Ct = l.useMemo(
    () => x ? i.map((e) => `row-${e.id}`) : [],
    [i, x]
  ), [Ne, kt] = l.useState(/* @__PURE__ */ new Map()), bt = l.useCallback((e, t) => {
    kt((r) => {
      if (r.get(e) === t) return r;
      const s = new Map(r);
      return s.set(e, t), s;
    });
  }, []), $ = l.useMemo(() => {
    const e = new Array(i.length + 1);
    e[0] = 0;
    for (let t = 0; t < i.length; t++) {
      const r = Ne.get(i[t].id) ?? pe;
      e[t + 1] = e[t] + r;
    }
    return e;
  }, [i, Ne, pe]), Nt = $[i.length], [le, Rt] = l.useState(null), U = l.useMemo(() => le === null ? -1 : i.findIndex((e) => e.id === le), [le, i]), St = l.useCallback(
    (e, t) => {
      if (U < 0) return !1;
      const r = B(e, t);
      return r === void 0 || r <= 1 ? !1 : U >= e && U < e + r;
    },
    [U, B]
  ), oe = l.useRef($);
  oe.current = $;
  const Et = l.useCallback(
    (e, t) => {
      const r = B(e, t);
      if (!(r === void 0 || r <= 1))
        return oe.current[e + r] - oe.current[e];
    },
    [B]
  ), de = l.useRef(null), {
    isVirtual: G,
    virtualizer: Re,
    renderIndices: Wt,
    getItemStart: zt,
    totalSize: _t
  } = yr({
    virtual: tt,
    count: i.length,
    scrollContainerRef: de,
    rowSpanMap: gt
  }), [H, Dt] = l.useState(0);
  l.useEffect(() => {
    const e = de.current;
    if (!e) return;
    const t = () => {
      const s = e.scrollLeft > 0, h = e.scrollLeft + e.clientWidth < e.scrollWidth - 1;
      e.dataset.scrolledLeft = s ? "true" : "false", e.dataset.scrolledRight = h ? "true" : "false", Dt(e.clientWidth);
    };
    t(), e.addEventListener("scroll", t, { passive: !0 });
    const r = new ResizeObserver(t);
    return r.observe(e), () => {
      e.removeEventListener("scroll", t), r.disconnect();
    };
  }, []);
  const X = l.useMemo(
    () => a.filter((e) => !e.pinned),
    [a]
  ), K = l.useMemo(() => {
    if (!p || p.length === 0) return null;
    const e = [];
    let t = 0;
    for (; t < X.length; ) {
      const r = X[t], s = p.find((h) => h.columns[0] === r.accessorKey);
      if (s) {
        const h = s.columns.reduce((_, D) => {
          const k = X.find((Y) => Y.accessorKey === D);
          return _ + (k ? Z(k) : fe);
        }, 0);
        e.push({
          kind: "group",
          key: `group-${String(r.accessorKey)}`,
          width: h,
          group: s
        }), t += s.columns.length;
      } else
        e.push({
          kind: "placeholder",
          key: `middle-empty-${String(r.accessorKey)}`,
          col: r
        }), t += 1;
    }
    return e;
  }, [X, p]), Se = K !== null && K.length > 0, J = Se ? 2 : 1, w = "bg-slate-100 dark:bg-slate-800", Ee = (e, t) => {
    const r = e.id ?? String(e.accessorKey), s = pt(e.accessorKey), h = typeof e.width == "number" ? e.width : void 0, _ = typeof e.minWidth == "number" ? e.minWidth : void 0, D = e.pinned === "left", k = e.pinned === "right", Y = D || k, Mt = t === ae, Pt = t === z, jt = t === z, Ft = I && !Y && !e.sortable, Bt = ft === e.accessorKey, Vt = t === a.length - 1, Ie = d(
      "relative flex min-h-9",
      h !== void 0 && "shrink-0",
      Y && "sticky z-20",
      w,
      Mt && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      Pt && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      e.sortable && "select-none",
      jt && "ml-auto"
    ), Le = {
      width: h,
      minWidth: _,
      flex: h === void 0 ? "1 1 0" : void 0,
      left: D ? ne[t] : void 0,
      right: k ? ie[t] : void 0
    }, $t = e.sortable ? /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: d(
          "flex w-full min-w-0 items-center gap-1 cursor-pointer",
          // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
          e.align === "right" ? "flex-row-reverse justify-start" : me[e.align ?? "left"]
        ),
        onClick: () => yt(e.accessorKey),
        children: [
          /* @__PURE__ */ n("span", { className: "min-w-0 truncate", children: e.header }),
          /* @__PURE__ */ f("span", { className: "flex shrink-0 items-center gap-0.5", children: [
            /* @__PURE__ */ f("span", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ n(Me, { direction: "up", active: s.direction === "asc" }),
              /* @__PURE__ */ n(Me, { direction: "down", active: s.direction === "desc" })
            ] }),
            s.priority !== void 0 && /* @__PURE__ */ n("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: s.priority })
          ] })
        ]
      }
    ) : /* @__PURE__ */ n("span", { className: "min-w-0 truncate", children: e.header }), ce = String(e.accessorKey), Ut = e.filter ? /* @__PURE__ */ n(
      lr,
      {
        column: e,
        filter: e.filter,
        value: se.getColumnFilter(ce),
        active: se.hasActiveFilter(ce),
        onChange: se.setColumnFilter,
        columnKey: ce
      }
    ) : null, Oe = /* @__PURE__ */ f(
      "div",
      {
        className: d(
          "flex-1 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 min-w-0",
          e.align === "right" && "flex-row-reverse"
        ),
        children: [
          /* @__PURE__ */ n(
            "div",
            {
              className: d(
                "flex-1 flex items-center gap-1 min-w-0 overflow-hidden",
                me[e.align ?? "left"]
              ),
              children: $t
            }
          ),
          Ut
        ]
      }
    ), He = !Vt && /* @__PURE__ */ n(
      Te,
      {
        resizable: S,
        isResizing: Bt,
        onResizeStart: mt,
        column: e
      }
    ), Gt = e.sortable ? s.direction === "asc" ? "ascending" : s.direction === "desc" ? "descending" : "none" : void 0;
    return Ft ? /* @__PURE__ */ f(
      cr,
      {
        id: String(e.accessorKey),
        className: Ie,
        style: Le,
        dataColumnKey: String(e.accessorKey),
        children: [
          Oe,
          He
        ]
      },
      r
    ) : /* @__PURE__ */ f(
      "div",
      {
        role: "columnheader",
        "data-column-key": String(e.accessorKey),
        className: Ie,
        style: Le,
        "aria-sort": Gt,
        children: [
          Oe,
          He
        ]
      },
      r
    );
  }, We = (e, t) => {
    const r = typeof e.width == "number" ? e.width : fe, s = e.pinned === "left";
    return /* @__PURE__ */ n(
      "div",
      {
        className: d(
          "shrink-0 sticky z-20",
          w,
          t === z && "ml-auto",
          t === ae && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          t === z && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: r,
          left: s ? ne[t] : void 0,
          right: s ? void 0 : ie[t]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, It = (o == null ? void 0 : o.showExpandAll) ?? !0, ze = () => {
    const e = [];
    return x && e.push(
      /* @__PURE__ */ n(
        "div",
        {
          role: "columnheader",
          className: d("shrink-0 sticky z-20 min-h-9", w),
          style: { width: P, left: 0 },
          "aria-label": "행 순서 변경",
          children: /* @__PURE__ */ n("span", { className: "sr-only", children: "행 순서 변경" })
        },
        "ctrl-header-drag-handle"
      )
    ), v && e.push(
      /* @__PURE__ */ n(
        "div",
        {
          role: "columnheader",
          className: d("shrink-0 sticky z-20 flex items-center justify-center min-h-9", w),
          style: {
            width: b,
            left: E
          },
          children: /* @__PURE__ */ n(
            tr,
            {
              checked: F.allSelected,
              indeterminate: F.someSelected,
              onCheckedChange: () => F.toggleAll(),
              "aria-label": "전체 선택"
            }
          )
        },
        "ctrl-header-select"
      )
    ), o && e.push(
      /* @__PURE__ */ n(
        "div",
        {
          role: "columnheader",
          className: d("shrink-0 sticky z-20 flex items-center justify-center min-h-9", w),
          style: {
            width: T,
            left: E + (v ? b : 0)
          },
          children: It && /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: W.toggleAll,
              className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
              "aria-label": W.allExpanded ? "모두 접기" : "모두 펼치기",
              children: W.allExpanded ? /* @__PURE__ */ n(nr, { size: 24 }) : /* @__PURE__ */ n(ir, { size: 24 })
            }
          )
        },
        "ctrl-header-expand"
      )
    ), e;
  }, _e = () => L ? /* @__PURE__ */ n(
    "div",
    {
      role: "columnheader",
      className: d(
        "shrink-0 sticky z-20 flex items-center justify-center min-h-9",
        w
      ),
      style: { width: M, left: j },
      "aria-label": "행 삭제",
      children: /* @__PURE__ */ n("span", { className: "sr-only", children: "행 삭제" })
    },
    "ctrl-header-delete"
  ) : null, Lt = () => L ? /* @__PURE__ */ n(
    "div",
    {
      className: d("shrink-0 sticky z-20 min-h-9", w),
      style: { width: M, left: j }
    },
    "ctrl-ph-delete"
  ) : null, Ot = () => {
    const e = [];
    return x && e.push(
      /* @__PURE__ */ n(
        "div",
        {
          className: d("shrink-0 sticky z-20 min-h-9", w),
          style: { width: P, left: 0 }
        },
        "ctrl-ph-drag-handle"
      )
    ), v && e.push(
      /* @__PURE__ */ n(
        "div",
        {
          className: d("shrink-0 sticky z-20 min-h-9", w),
          style: { width: b, left: E }
        },
        "ctrl-ph-select"
      )
    ), o && e.push(
      /* @__PURE__ */ n(
        "div",
        {
          className: d("shrink-0 sticky z-20 min-h-9", w),
          style: {
            width: T,
            left: E + (v ? b : 0)
          }
        },
        "ctrl-ph-expand"
      )
    ), e;
  }, { leftPinnedCols: Ht, rightPinnedCols: Kt, lastLeftPinnedIdx: ae, firstRightPinnedIdx: z } = l.useMemo(() => {
    const e = a.map((r, s) => ({ c: r, i: s })).filter(({ c: r }) => r.pinned === "left"), t = a.map((r, s) => ({ c: r, i: s })).filter(({ c: r }) => r.pinned === "right");
    return {
      leftPinnedCols: e,
      rightPinnedCols: t,
      lastLeftPinnedIdx: e.length ? e[e.length - 1].i : -1,
      firstRightPinnedIdx: t.length ? t[0].i : -1
    };
  }, [a]), Tt = a.length + (x ? 1 : 0) + (v ? 1 : 0) + (o ? 1 : 0) + (L ? 1 : 0), De = /* @__PURE__ */ n(
    "div",
    {
      role: "grid",
      "aria-rowcount": i.length + J,
      "aria-colcount": Tt,
      className: d(
        // 항상 컨테이너 폭 유지. 리사이즈로 모든 컬럼 fixed 로 전환돼도 테이블 자체는 shrink 안 함.
        // 빈 영역은 셀 bg (SDS-42 에서 모든 셀에 headerBg 적용) 로 시각 커버.
        "w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        rt
      ),
      children: /* @__PURE__ */ n(
        "div",
        {
          ref: de,
          className: "overflow-auto group/scroll",
          style: { maxHeight: typeof q == "number" ? `${q}px` : q },
          "data-scrolled-left": "false",
          "data-scrolled-right": "false",
          children: /* @__PURE__ */ f("div", { style: { minWidth: Ce }, children: [
            /* @__PURE__ */ f(
              "div",
              {
                className: d(
                  "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
                  w
                ),
                children: [
                  Se && K && /* @__PURE__ */ f(
                    "div",
                    {
                      role: "row",
                      "aria-rowindex": 1,
                      className: "flex border-b border-slate-200 dark:border-slate-700",
                      children: [
                        Ot(),
                        Lt(),
                        Ht.map(({ c: e, i: t }) => We(e, t)),
                        K.map((e, t) => {
                          if (e.kind === "group") {
                            let _ = -1;
                            for (let k = K.length - 1; k >= 0; k--)
                              if (K[k].kind === "group") {
                                _ = k;
                                break;
                              }
                            const D = t === _;
                            return /* @__PURE__ */ f(
                              "div",
                              {
                                role: "columnheader",
                                className: "relative flex min-h-9 shrink-0",
                                style: { width: e.width },
                                children: [
                                  /* @__PURE__ */ n(
                                    "div",
                                    {
                                      className: d(
                                        "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                                        me[e.group.align ?? "center"]
                                      ),
                                      children: e.group.header
                                    }
                                  ),
                                  !D && /* @__PURE__ */ n(Te, {})
                                ]
                              },
                              e.key
                            );
                          }
                          const r = e.col, s = typeof r.width == "number" ? r.width : void 0, h = typeof r.minWidth == "number" ? r.minWidth : void 0;
                          return /* @__PURE__ */ n(
                            "div",
                            {
                              className: d(
                                "min-h-9",
                                s === void 0 ? "flex-1" : "shrink-0"
                              ),
                              style: { width: s, minWidth: h }
                            },
                            e.key
                          );
                        }),
                        Kt.map(({ c: e, i: t }) => We(e, t))
                      ]
                    }
                  ),
                  I ? /* @__PURE__ */ n(
                    Ke,
                    {
                      items: vt,
                      strategy: At,
                      children: /* @__PURE__ */ f("div", { role: "row", "aria-rowindex": J, className: "flex", children: [
                        ze(),
                        _e(),
                        a.map((e, t) => Ee(e, t)),
                        z === -1 && !be && /* @__PURE__ */ n("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
                      ] })
                    }
                  ) : /* @__PURE__ */ f("div", { role: "row", "aria-rowindex": J, className: "flex", children: [
                    ze(),
                    _e(),
                    a.map((e, t) => Ee(e, t)),
                    z === -1 && !be && /* @__PURE__ */ n("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
                  ] })
                ]
              }
            ),
            ue ? ge ? (
              // 커스텀 로딩 — 가로 스크롤 시 가시 영역 중앙에 표시
              /* @__PURE__ */ n(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: H ? { width: H } : void 0,
                  children: ge
                }
              )
            ) : Je === "skeleton" ? (
              // 스켈레톤 — 각 컬럼 폭에 맞춰 셀 구조로 렌더
              /* @__PURE__ */ n("div", { children: Array.from({ length: xr }).map((e, t) => /* @__PURE__ */ f(
                "div",
                {
                  role: "row",
                  className: "flex border-b border-slate-200 dark:border-slate-700 min-h-9",
                  children: [
                    x && /* @__PURE__ */ n(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: P }
                      }
                    ),
                    v && /* @__PURE__ */ n(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: b },
                        children: /* @__PURE__ */ n(he, { width: 16, height: 16 })
                      }
                    ),
                    o && /* @__PURE__ */ n(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: T },
                        children: /* @__PURE__ */ n(he, { width: 16, height: 16 })
                      }
                    ),
                    L && /* @__PURE__ */ n(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: M }
                      }
                    ),
                    a.map((r) => {
                      const s = typeof r.width == "number" ? r.width : void 0, h = typeof r.minWidth == "number" ? r.minWidth : void 0;
                      return /* @__PURE__ */ n(
                        "div",
                        {
                          role: "gridcell",
                          className: d(
                            "flex items-center px-3 py-1.5",
                            s === void 0 ? "flex-1" : "shrink-0"
                          ),
                          style: { width: s, minWidth: h },
                          children: /* @__PURE__ */ n(he, { height: 16, width: "70%" })
                        },
                        r.id ?? String(r.accessorKey)
                      );
                    })
                  ]
                },
                t
              )) })
            ) : (
              // 기본 splash — 가로 스크롤 시 가시 영역 중앙에 표시
              /* @__PURE__ */ n(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: H ? { width: H } : void 0,
                  children: /* @__PURE__ */ n(rr, { size: "lg" })
                }
              )
            ) : i.length === 0 ? /* @__PURE__ */ n(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center min-h-32 py-8 text-sm text-slate-500 dark:text-slate-400",
                style: H ? { width: H } : void 0,
                children: Ye
              }
            ) : (
              // 가상화 ON 시 컨테이너 높이 = virtualizer.totalSize, OFF 시 = positions 기반 totalHeight
              /* @__PURE__ */ n(
                "div",
                {
                  className: "relative",
                  style: { height: G ? _t : Nt },
                  children: (() => {
                    const e = Wt.map((t) => {
                      var s, h;
                      const r = i[t];
                      return /* @__PURE__ */ n(
                        ar,
                        {
                          row: r,
                          rowIndex: t,
                          columns: a,
                          leftOffsets: ne,
                          rightOffsets: ie,
                          lastLeftPinnedIdx: ae,
                          firstRightPinnedIdx: z,
                          totalWidth: Ce,
                          translateY: G ? zt(t) : $[t],
                          onHover: Q ? Rt : void 0,
                          onHeightChange: bt,
                          measureRef: G && Re ? Re.measureElement : void 0,
                          dataIndex: G ? t : void 0,
                          selectable: v,
                          isSelected: F.isSelected(r.id),
                          onToggleSelect: F.toggleRow,
                          checkboxColWidth: b,
                          expandable: !!o,
                          isExpanded: W.isExpanded(r.id),
                          canExpand: W.canExpand(r),
                          onToggleExpand: W.toggleRow,
                          expandedContent: o && W.isExpanded(r.id) && ye ? ye(r) : null,
                          expandColWidth: T,
                          onRowClick: st,
                          extraClassName: ee == null ? void 0 : ee(r),
                          editingColumnKey: ((s = N.editing) == null ? void 0 : s.rowId) === r.id ? N.editing.columnKey : null,
                          editingError: ((h = N.editing) == null ? void 0 : h.rowId) === r.id ? N.editing.error : void 0,
                          onStartEdit: N.startEdit,
                          onCompleteEdit: N.completeEdit,
                          onCancelEdit: N.cancelEdit,
                          onClearEditError: N.clearError,
                          showRowDelete: L,
                          onRowDelete: it,
                          rowActionsColWidth: M,
                          rowActionsColLeftOffset: j,
                          rowReorderable: x,
                          dragHandleColWidth: P,
                          isLast: t === i.length - 1,
                          getRowSpan: B,
                          getRowSpanHeight: Et,
                          getGroupHovered: St,
                          ariaRowIndex: J + t + 1
                        },
                        r.id
                      );
                    });
                    return x ? /* @__PURE__ */ n(
                      Ke,
                      {
                        items: Ct,
                        strategy: er,
                        children: e
                      }
                    ) : /* @__PURE__ */ n(Xt, { children: e });
                  })()
                }
              )
            ),
            nt && !ue && /* @__PURE__ */ f(
              "div",
              {
                role: "row",
                className: "flex bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                children: [
                  x && /* @__PURE__ */ n(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: { width: P, left: 0 }
                    }
                  ),
                  v && /* @__PURE__ */ n(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: b,
                        left: E
                      }
                    }
                  ),
                  o && /* @__PURE__ */ n(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: T,
                        left: E + (v ? b : 0)
                      }
                    }
                  ),
                  /* @__PURE__ */ n(
                    "div",
                    {
                      role: "gridcell",
                      className: d(
                        "shrink-0 sticky z-10 flex items-center justify-center bg-white dark:bg-slate-900 min-h-9"
                      ),
                      style: { width: M, left: j },
                      children: /* @__PURE__ */ n(
                        "button",
                        {
                          type: "button",
                          onClick: () => A == null ? void 0 : A(),
                          className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                          "aria-label": "행 추가",
                          children: /* @__PURE__ */ n(sr, { size: 20 })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ n("div", { role: "gridcell", "aria-hidden": !0, className: "flex-1 min-h-9" })
                ]
              }
            )
          ] })
        }
      )
    }
  );
  return I || x ? /* @__PURE__ */ n(
    qt,
    {
      sensors: xt,
      collisionDetection: Qt,
      onDragEnd: wt,
      children: De
    }
  ) : De;
}
export {
  Xr as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
