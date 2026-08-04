import { jsx as i, jsxs as f } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as _t, useSensor as Dt, PointerSensor as Lt, DndContext as zt, closestCenter as Ht } from "@dnd-kit/core";
import { SortableContext as He, horizontalListSortingStrategy as It, verticalListSortingStrategy as Kt } from "@dnd-kit/sortable";
import { cn as o } from "../../../lib/utils.mjs";
import { Checkbox as Tt } from "../../ui/checkbox.mjs";
import { Skeleton as ae } from "../../ui/skeleton.mjs";
import { SplashScreen as jt } from "../../ui/splash-screen.mjs";
import { DownIcon as Mt } from "../../../icons/DownIcon.mjs";
import { RightIcon as Ot } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as Pt } from "../../../icons/RowAddIcon.mjs";
import { DataTableV2FilterCell as Ft } from "./data-table-v2-filter-cell.mjs";
import { useFilter as Bt } from "./hooks/use-filter.mjs";
import { useRowReorder as Vt } from "./hooks/use-row-reorder.mjs";
import { DataTableV2ColumnSeparator as Ie } from "./data-table-v2-column-separator.mjs";
import { DataTableV2Row as $t } from "./data-table-v2-row.mjs";
import { DataTableV2SortableHeaderCell as Gt } from "./data-table-v2-sortable-header-cell.mjs";
import { useCellEdit as Ut } from "./hooks/use-cell-edit.mjs";
import { useColumnResize as Xt } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as Yt } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as Zt } from "./hooks/use-row-expansion.mjs";
import { useRowGrouping as qt } from "./hooks/use-row-grouping.mjs";
import { useRowSelection as Jt } from "./hooks/use-row-selection.mjs";
const Qt = 40, he = 120, N = 40, K = 40, T = 40, j = 32, At = 5, ce = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function Ke({ direction: n, active: h }) {
  return /* @__PURE__ */ i(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: o(
        "transition-colors",
        h ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        n === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ i("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
}
function ei(n, h, x) {
  const v = n.find((m) => m.column === h);
  return x ? v ? v.direction === "asc" ? n.map(
    (m) => m.column === h ? { column: h, direction: "desc" } : m
  ) : n.filter((m) => m.column !== h) : [...n, { column: h, direction: "asc" }] : v ? v.direction === "asc" ? [{ column: h, direction: "desc" }] : [] : [{ column: h, direction: "asc" }];
}
function ti(n, h = 0, x = 0) {
  const v = new Array(n.length).fill(-1), m = new Array(n.length).fill(-1);
  let S = h;
  for (let u = 0; u < n.length; u++)
    n[u].pinned === "left" && (v[u] = S, S += Z(n[u]));
  let R = x;
  for (let u = n.length - 1; u >= 0; u--)
    n[u].pinned === "right" && (m[u] = R, R += Z(n[u]));
  return { left: v, right: m };
}
function Z(n) {
  return typeof n.width == "number" ? n.width : typeof n.minWidth == "number" ? n.minWidth : he;
}
function ii(n) {
  return n.reduce((h, x) => h + Z(x), 0);
}
function Si({
  data: n,
  columns: h,
  headerGroups: x,
  sortState: v,
  onSortChange: m,
  multiSort: S = !1,
  resizable: R = !1,
  columnWidths: u,
  onColumnResize: Te,
  columnReorderable: L = !1,
  columnOrder: je,
  onColumnReorder: Me,
  selectable: k = !1,
  selectedIds: Oe,
  defaultSelectedIds: Pe,
  onSelectionChange: Fe,
  onRowClick: Be,
  rowClassName: q,
  expandable: g,
  onCellChange: Ve,
  rowActions: d,
  loading: fe = !1,
  loadingMode: $e = "splash",
  loadingContent: me,
  emptyMessage: Ge = "데이터가 없습니다.",
  rowReorderable: Ue = !1,
  onRowReorder: Xe,
  filterState: Ye,
  defaultFilterState: Ze,
  onFilterChange: qe,
  maxHeight: J,
  estimateRowHeight: ue = Qt,
  rowGrouping: ge,
  className: Je
}) {
  const C = ge ? !1 : Ue, M = (d == null ? void 0 : d.showDelete) ?? !!(d != null && d.onRowDelete), Qe = (d == null ? void 0 : d.showAdd) ?? !!(d != null && d.onRowAdd), Ae = d == null ? void 0 : d.onRowDelete, Q = d == null ? void 0 : d.onRowAdd, { orderedColumns: A, handleColumnDragEnd: pe } = Yt({
    columns: h,
    columnReorderable: L,
    columnOrder: je,
    onColumnReorder: Me
  }), { getColumnWidth: ye, handleResizeStart: et, resizingKey: tt } = Xt({
    resizable: R,
    columnWidths: u,
    onColumnResize: Te
  }), a = l.useMemo(() => R ? A.map((e) => {
    const t = ye(e);
    return t !== void 0 ? { ...e, width: t } : e;
  }) : A, [A, R, ye]), E = C ? j : 0, O = E + (k ? N : 0) + (g ? K : 0), F = O + (M ? T : 0), { left: ee, right: te } = l.useMemo(
    () => ti(a, F),
    [a, F]
  ), xe = l.useMemo(
    () => ii(a) + F,
    [a, F]
  ), P = Jt({
    data: n,
    selectable: k,
    selectedIds: Oe,
    defaultSelectedIds: Pe,
    onSelectionChange: Fe
  }), W = Zt({ data: n, expandable: g }), b = Ut({ onCellChange: Ve }), { handleRowDragEnd: ve } = Vt({ data: n, onRowReorder: Xe }), { getRowSpan: B } = qt({ data: n, rowGrouping: ge }), ie = Bt({ filterState: Ye, defaultFilterState: Ze, onFilterChange: qe }), z = l.useMemo(
    () => v ?? [],
    [v]
  ), it = l.useCallback(
    (e) => {
      const t = z.findIndex((s) => s.column === e);
      return t < 0 ? { direction: null, priority: void 0 } : {
        direction: z[t].direction,
        priority: S && z.length > 1 ? t + 1 : void 0
      };
    },
    [z, S]
  ), nt = l.useCallback(
    (e) => {
      m && m(ei(z, e, S));
    },
    [z, S, m]
  ), ke = l.useMemo(
    () => a.some((e) => typeof e.width != "number"),
    [a]
  ), rt = l.useMemo(
    () => L ? a.filter((e) => !e.pinned && !e.sortable).map((e) => String(e.accessorKey)) : [],
    [a, L]
  ), st = _t(
    Dt(Lt, { activationConstraint: { distance: 5 } })
  ), lt = l.useCallback(
    (e) => {
      String(e.active.id).startsWith("row-") ? ve(e) : pe(e);
    },
    [pe, ve]
  ), ot = l.useMemo(
    () => C ? n.map((e) => `row-${e.id}`) : [],
    [n, C]
  ), [we, dt] = l.useState(/* @__PURE__ */ new Map()), at = l.useCallback((e, t) => {
    dt((r) => {
      if (r.get(e) === t) return r;
      const s = new Map(r);
      return s.set(e, t), s;
    });
  }, []), V = l.useMemo(() => {
    const e = new Array(n.length + 1);
    e[0] = 0;
    for (let t = 0; t < n.length; t++) {
      const r = we.get(n[t].id) ?? ue;
      e[t + 1] = e[t] + r;
    }
    return e;
  }, [n, we, ue]), ct = V[n.length], [$, ht] = l.useState(null), G = l.useMemo(() => $ === null ? -1 : n.findIndex((e) => e.id === $), [$, n]), ft = l.useCallback(
    (e, t) => {
      if (G < 0) return !1;
      const r = B(e, t);
      return r === void 0 || r <= 1 ? !1 : G >= e && G < e + r;
    },
    [G, B]
  ), Ce = l.useRef(null), [ne, mt] = l.useState(!1), [re, ut] = l.useState(!1), [H, gt] = l.useState(0);
  l.useEffect(() => {
    const e = Ce.current;
    if (!e) return;
    const t = () => {
      mt(e.scrollLeft > 0), ut(e.scrollLeft + e.clientWidth < e.scrollWidth - 1), gt(e.clientWidth);
    };
    t(), e.addEventListener("scroll", t, { passive: !0 });
    const r = new ResizeObserver(t);
    return r.observe(e), () => {
      e.removeEventListener("scroll", t), r.disconnect();
    };
  }, []);
  const U = l.useMemo(
    () => a.filter((e) => !e.pinned),
    [a]
  ), I = l.useMemo(() => {
    if (!x || x.length === 0) return null;
    const e = [];
    let t = 0;
    for (; t < U.length; ) {
      const r = U[t], s = x.find((c) => c.columns[0] === r.accessorKey);
      if (s) {
        const c = s.columns.reduce((y, D) => {
          const w = U.find((Y) => Y.accessorKey === D);
          return y + (w ? Z(w) : he);
        }, 0);
        e.push({
          kind: "group",
          key: `group-${String(r.accessorKey)}`,
          width: c,
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
  }, [U, x]), be = I !== null && I.length > 0, pt = be ? 2 : 1, p = "bg-slate-100 dark:bg-slate-800", Ne = (e, t) => {
    const r = e.id ?? String(e.accessorKey), s = it(e.accessorKey), c = typeof e.width == "number" ? e.width : void 0, y = typeof e.minWidth == "number" ? e.minWidth : void 0, D = e.pinned === "left", w = e.pinned === "right", Y = D || w, kt = t === le && ne, wt = t === _ && re, Ct = t === _, bt = L && !Y && !e.sortable, Nt = tt === e.accessorKey, St = t === a.length - 1, _e = o(
      "relative flex min-h-9",
      c !== void 0 && "shrink-0",
      Y && "sticky z-20",
      p,
      kt && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      wt && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      e.sortable && "select-none",
      Ct && "ml-auto"
    ), De = {
      width: c,
      minWidth: y,
      flex: c === void 0 ? "1 1 0" : void 0,
      left: D ? ee[t] : void 0,
      right: w ? te[t] : void 0
    }, Rt = e.sortable ? /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: o(
          "flex w-full min-w-0 items-center gap-1 cursor-pointer",
          // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
          e.align === "right" ? "flex-row-reverse justify-start" : ce[e.align ?? "left"]
        ),
        onClick: () => nt(e.accessorKey),
        children: [
          /* @__PURE__ */ i("span", { className: "min-w-0 truncate", children: e.header }),
          /* @__PURE__ */ f("span", { className: "flex shrink-0 items-center gap-0.5", children: [
            /* @__PURE__ */ f("span", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ i(Ke, { direction: "up", active: s.direction === "asc" }),
              /* @__PURE__ */ i(Ke, { direction: "down", active: s.direction === "desc" })
            ] }),
            s.priority !== void 0 && /* @__PURE__ */ i("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: s.priority })
          ] })
        ]
      }
    ) : /* @__PURE__ */ i("span", { className: "min-w-0 truncate", children: e.header }), oe = String(e.accessorKey), Et = e.filter ? /* @__PURE__ */ i(
      Ft,
      {
        column: e,
        filter: e.filter,
        value: ie.getColumnFilter(oe),
        active: ie.hasActiveFilter(oe),
        onChange: (de) => ie.setColumnFilter(oe, de)
      }
    ) : null, Le = /* @__PURE__ */ f(
      "div",
      {
        className: o(
          "flex-1 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 min-w-0",
          e.align === "right" && "flex-row-reverse"
        ),
        children: [
          /* @__PURE__ */ i(
            "div",
            {
              className: o(
                "flex-1 flex items-center gap-1 min-w-0 overflow-hidden",
                ce[e.align ?? "left"]
              ),
              children: Rt
            }
          ),
          Et
        ]
      }
    ), ze = !St && /* @__PURE__ */ i(
      Ie,
      {
        resizable: R,
        isResizing: Nt,
        onResizeStart: (de) => et(de, e)
      }
    ), Wt = e.sortable ? s.direction === "asc" ? "ascending" : s.direction === "desc" ? "descending" : "none" : void 0;
    return bt ? /* @__PURE__ */ f(
      Gt,
      {
        id: String(e.accessorKey),
        className: _e,
        style: De,
        dataColumnKey: String(e.accessorKey),
        children: [
          Le,
          ze
        ]
      },
      r
    ) : /* @__PURE__ */ f(
      "div",
      {
        role: "columnheader",
        "data-column-key": String(e.accessorKey),
        className: _e,
        style: De,
        "aria-sort": Wt,
        children: [
          Le,
          ze
        ]
      },
      r
    );
  }, Se = (e, t) => {
    const r = typeof e.width == "number" ? e.width : he, s = e.pinned === "left";
    return /* @__PURE__ */ i(
      "div",
      {
        className: o(
          "shrink-0 sticky z-20",
          p,
          t === _ && "ml-auto",
          t === le && ne && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          t === _ && re && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: r,
          left: s ? ee[t] : void 0,
          right: s ? void 0 : te[t]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, yt = (g == null ? void 0 : g.showExpandAll) ?? !0, Re = () => {
    const e = [];
    return C && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          role: "columnheader",
          className: o("shrink-0 sticky z-20 min-h-9", p),
          style: { width: j, left: 0 },
          "aria-label": "행 순서 변경",
          children: /* @__PURE__ */ i("span", { className: "sr-only", children: "행 순서 변경" })
        },
        "ctrl-header-drag-handle"
      )
    ), k && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          role: "columnheader",
          className: o("shrink-0 sticky z-20 flex items-center justify-center min-h-9", p),
          style: {
            width: N,
            left: E
          },
          children: /* @__PURE__ */ i(
            Tt,
            {
              checked: P.allSelected,
              indeterminate: P.someSelected,
              onCheckedChange: () => P.toggleAll(),
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
          className: o("shrink-0 sticky z-20 flex items-center justify-center min-h-9", p),
          style: {
            width: K,
            left: E + (k ? N : 0)
          },
          children: yt && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: W.toggleAll,
              className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
              "aria-label": W.allExpanded ? "모두 접기" : "모두 펼치기",
              children: W.allExpanded ? /* @__PURE__ */ i(Mt, { size: 24 }) : /* @__PURE__ */ i(Ot, { size: 24 })
            }
          )
        },
        "ctrl-header-expand"
      )
    ), e;
  }, Ee = () => M ? /* @__PURE__ */ i(
    "div",
    {
      role: "columnheader",
      className: o(
        "shrink-0 sticky z-20 flex items-center justify-center min-h-9",
        p
      ),
      style: { width: T, left: O },
      "aria-label": "행 삭제",
      children: /* @__PURE__ */ i("span", { className: "sr-only", children: "행 삭제" })
    },
    "ctrl-header-delete"
  ) : null, xt = () => M ? /* @__PURE__ */ i(
    "div",
    {
      className: o("shrink-0 sticky z-20 min-h-9", p),
      style: { width: T, left: O }
    },
    "ctrl-ph-delete"
  ) : null, vt = () => {
    const e = [];
    return C && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: o("shrink-0 sticky z-20 min-h-9", p),
          style: { width: j, left: 0 }
        },
        "ctrl-ph-drag-handle"
      )
    ), k && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: o("shrink-0 sticky z-20 min-h-9", p),
          style: { width: N, left: E }
        },
        "ctrl-ph-select"
      )
    ), g && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: o("shrink-0 sticky z-20 min-h-9", p),
          style: {
            width: K,
            left: E + (k ? N : 0)
          }
        },
        "ctrl-ph-expand"
      )
    ), e;
  }, X = a.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "left"), se = a.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "right"), le = X.length ? X[X.length - 1].i : -1, _ = se.length ? se[0].i : -1, We = /* @__PURE__ */ i(
    "div",
    {
      role: "grid",
      "aria-rowcount": n.length + pt,
      "aria-colcount": a.length,
      className: o(
        // 항상 컨테이너 폭 유지. 리사이즈로 모든 컬럼 fixed 로 전환돼도 테이블 자체는 shrink 안 함.
        // 빈 영역은 셀 bg (SDS-42 에서 모든 셀에 headerBg 적용) 로 시각 커버.
        "w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        Je
      ),
      children: /* @__PURE__ */ i(
        "div",
        {
          ref: Ce,
          className: "overflow-auto",
          style: { maxHeight: typeof J == "number" ? `${J}px` : J },
          children: /* @__PURE__ */ f("div", { style: { minWidth: xe }, children: [
            /* @__PURE__ */ f(
              "div",
              {
                className: o(
                  "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
                  p
                ),
                children: [
                  be && I && /* @__PURE__ */ f(
                    "div",
                    {
                      role: "row",
                      className: "flex border-b border-slate-200 dark:border-slate-700",
                      children: [
                        vt(),
                        xt(),
                        X.map(({ c: e, i: t }) => Se(e, t)),
                        I.map((e, t) => {
                          if (e.kind === "group") {
                            let y = -1;
                            for (let w = I.length - 1; w >= 0; w--)
                              if (I[w].kind === "group") {
                                y = w;
                                break;
                              }
                            const D = t === y;
                            return /* @__PURE__ */ f(
                              "div",
                              {
                                role: "columnheader",
                                className: "relative flex min-h-9 shrink-0",
                                style: { width: e.width },
                                children: [
                                  /* @__PURE__ */ i(
                                    "div",
                                    {
                                      className: o(
                                        "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                                        ce[e.group.align ?? "center"]
                                      ),
                                      children: e.group.header
                                    }
                                  ),
                                  !D && /* @__PURE__ */ i(Ie, {})
                                ]
                              },
                              e.key
                            );
                          }
                          const r = e.col, s = typeof r.width == "number" ? r.width : void 0, c = typeof r.minWidth == "number" ? r.minWidth : void 0;
                          return /* @__PURE__ */ i(
                            "div",
                            {
                              className: o(
                                "min-h-9",
                                s === void 0 ? "flex-1" : "shrink-0"
                              ),
                              style: { width: s, minWidth: c }
                            },
                            e.key
                          );
                        }),
                        se.map(({ c: e, i: t }) => Se(e, t))
                      ]
                    }
                  ),
                  L ? /* @__PURE__ */ i(
                    He,
                    {
                      items: rt,
                      strategy: It,
                      children: /* @__PURE__ */ f("div", { role: "row", className: "flex", children: [
                        Re(),
                        Ee(),
                        a.map((e, t) => Ne(e, t)),
                        _ === -1 && !ke && /* @__PURE__ */ i("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
                      ] })
                    }
                  ) : /* @__PURE__ */ f("div", { role: "row", className: "flex", children: [
                    Re(),
                    Ee(),
                    a.map((e, t) => Ne(e, t)),
                    _ === -1 && !ke && /* @__PURE__ */ i("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
                  ] })
                ]
              }
            ),
            fe ? me ? (
              // 커스텀 로딩 — 가로 스크롤 시 가시 영역 중앙에 표시
              /* @__PURE__ */ i(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: H ? { width: H } : void 0,
                  children: me
                }
              )
            ) : $e === "skeleton" ? (
              // 스켈레톤 — 각 컬럼 폭에 맞춰 셀 구조로 렌더
              /* @__PURE__ */ i("div", { children: Array.from({ length: At }).map((e, t) => /* @__PURE__ */ f(
                "div",
                {
                  role: "row",
                  className: "flex border-b border-slate-200 dark:border-slate-700 min-h-9",
                  children: [
                    C && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: j }
                      }
                    ),
                    k && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: N },
                        children: /* @__PURE__ */ i(ae, { width: 16, height: 16 })
                      }
                    ),
                    g && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: K },
                        children: /* @__PURE__ */ i(ae, { width: 16, height: 16 })
                      }
                    ),
                    M && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: T }
                      }
                    ),
                    a.map((r) => {
                      const s = typeof r.width == "number" ? r.width : void 0, c = typeof r.minWidth == "number" ? r.minWidth : void 0;
                      return /* @__PURE__ */ i(
                        "div",
                        {
                          role: "gridcell",
                          className: o(
                            "flex items-center px-3 py-1.5",
                            s === void 0 ? "flex-1" : "shrink-0"
                          ),
                          style: { width: s, minWidth: c },
                          children: /* @__PURE__ */ i(ae, { height: 16, width: "70%" })
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
              /* @__PURE__ */ i(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: H ? { width: H } : void 0,
                  children: /* @__PURE__ */ i(jt, { size: "lg" })
                }
              )
            ) : n.length === 0 ? /* @__PURE__ */ i(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center min-h-32 py-8 text-sm text-slate-500 dark:text-slate-400",
                style: H ? { width: H } : void 0,
                children: Ge
              }
            ) : /* @__PURE__ */ i("div", { className: "relative", style: { height: ct }, children: /* @__PURE__ */ i(
              He,
              {
                items: ot,
                strategy: Kt,
                children: n.map((e, t) => {
                  var r, s;
                  return /* @__PURE__ */ i(
                    $t,
                    {
                      row: e,
                      rowIndex: t,
                      columns: a,
                      leftOffsets: ee,
                      rightOffsets: te,
                      lastLeftPinnedIdx: le,
                      firstRightPinnedIdx: _,
                      showLeftShadow: ne,
                      showRightShadow: re,
                      totalWidth: xe,
                      translateY: V[t],
                      isHovered: $ === e.id,
                      onHover: ht,
                      onHeightChange: at,
                      selectable: k,
                      isSelected: P.isSelected(e.id),
                      onToggleSelect: P.toggleRow,
                      checkboxColWidth: N,
                      expandable: !!g,
                      isExpanded: W.isExpanded(e.id),
                      canExpand: W.canExpand(e),
                      onToggleExpand: W.toggleRow,
                      expandedContent: g && W.isExpanded(e.id) ? g.expandedRowRender(e) : null,
                      expandColWidth: K,
                      onRowClick: Be,
                      extraClassName: q == null ? void 0 : q(e),
                      editingColumnKey: ((r = b.editing) == null ? void 0 : r.rowId) === e.id ? b.editing.columnKey : null,
                      editingState: ((s = b.editing) == null ? void 0 : s.rowId) === e.id ? { editValue: b.editing.editValue, error: b.editing.error } : null,
                      onStartEdit: b.startEdit,
                      onChangeEditValue: b.changeEditValue,
                      onCompleteEdit: b.completeEdit,
                      onCancelEdit: b.cancelEdit,
                      showRowDelete: M,
                      onRowDelete: Ae,
                      rowActionsColWidth: T,
                      rowActionsColLeftOffset: O,
                      rowReorderable: C,
                      dragHandleColWidth: j,
                      isLast: t === n.length - 1,
                      getRowSpan: (c) => B(t, c),
                      getRowSpanHeight: (c) => {
                        const y = B(t, c);
                        if (!(y === void 0 || y <= 1))
                          return V[t + y] - V[t];
                      },
                      getGroupHovered: (c) => ft(t, c)
                    },
                    e.id
                  );
                })
              }
            ) }),
            Qe && !fe && /* @__PURE__ */ f(
              "div",
              {
                role: "row",
                className: "flex bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                children: [
                  C && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: { width: j, left: 0 }
                    }
                  ),
                  k && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: N,
                        left: E
                      }
                    }
                  ),
                  g && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: K,
                        left: E + (k ? N : 0)
                      }
                    }
                  ),
                  /* @__PURE__ */ i(
                    "div",
                    {
                      role: "gridcell",
                      className: o(
                        "shrink-0 sticky z-10 flex items-center justify-center bg-white dark:bg-slate-900 min-h-9"
                      ),
                      style: { width: T, left: O },
                      children: /* @__PURE__ */ i(
                        "button",
                        {
                          type: "button",
                          onClick: () => Q == null ? void 0 : Q(),
                          className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                          "aria-label": "행 추가",
                          children: /* @__PURE__ */ i(Pt, { size: 20 })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ i("div", { role: "gridcell", "aria-hidden": !0, className: "flex-1 min-h-9" })
                ]
              }
            )
          ] })
        }
      )
    }
  );
  return L || C ? /* @__PURE__ */ i(
    zt,
    {
      sensors: st,
      collisionDetection: Ht,
      onDragEnd: lt,
      children: We
    }
  ) : We;
}
export {
  Si as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
