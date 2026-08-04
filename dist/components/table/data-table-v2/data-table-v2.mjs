import { jsx as i, jsxs as h } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as bt, useSensor as St, PointerSensor as Et, DndContext as Wt, closestCenter as _t } from "@dnd-kit/core";
import { SortableContext as De, horizontalListSortingStrategy as Dt, verticalListSortingStrategy as Lt } from "@dnd-kit/sortable";
import { cn as d } from "../../../lib/utils.mjs";
import { Checkbox as Rt } from "../../ui/checkbox.mjs";
import { Skeleton as re } from "../../ui/skeleton.mjs";
import { SplashScreen as zt } from "../../ui/splash-screen.mjs";
import { DownIcon as It } from "../../../icons/DownIcon.mjs";
import { RightIcon as Kt } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as Ht } from "../../../icons/RowAddIcon.mjs";
import { DataTableV2FilterCell as Tt } from "./data-table-v2-filter-cell.mjs";
import { useFilter as jt } from "./hooks/use-filter.mjs";
import { useRowReorder as Mt } from "./hooks/use-row-reorder.mjs";
import { DataTableV2ColumnSeparator as Le } from "./data-table-v2-column-separator.mjs";
import { DataTableV2Row as Ot } from "./data-table-v2-row.mjs";
import { DataTableV2SortableHeaderCell as Pt } from "./data-table-v2-sortable-header-cell.mjs";
import { useCellEdit as Ft } from "./hooks/use-cell-edit.mjs";
import { useColumnResize as Bt } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as Vt } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as $t } from "./hooks/use-row-expansion.mjs";
import { useRowSelection as Ut } from "./hooks/use-row-selection.mjs";
const Gt = 40, de = 120, N = 40, H = 40, T = 40, j = 32, Xt = 5, le = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function Re({ direction: n, active: c }) {
  return /* @__PURE__ */ i(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: d(
        "transition-colors",
        c ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        n === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ i("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
}
function Yt(n, c, y) {
  const x = n.find((f) => f.column === c);
  return y ? x ? x.direction === "asc" ? n.map(
    (f) => f.column === c ? { column: c, direction: "desc" } : f
  ) : n.filter((f) => f.column !== c) : [...n, { column: c, direction: "asc" }] : x ? x.direction === "asc" ? [{ column: c, direction: "desc" }] : [] : [{ column: c, direction: "asc" }];
}
function Zt(n, c = 0, y = 0) {
  const x = new Array(n.length).fill(-1), f = new Array(n.length).fill(-1);
  let b = c;
  for (let m = 0; m < n.length; m++)
    n[m].pinned === "left" && (x[m] = b, b += U(n[m]));
  let S = y;
  for (let m = n.length - 1; m >= 0; m--)
    n[m].pinned === "right" && (f[m] = S, S += U(n[m]));
  return { left: x, right: f };
}
function U(n) {
  return typeof n.width == "number" ? n.width : typeof n.minWidth == "number" ? n.minWidth : de;
}
function qt(n) {
  return n.reduce((c, y) => c + U(y), 0);
}
function xi({
  data: n,
  columns: c,
  headerGroups: y,
  sortState: x,
  onSortChange: f,
  multiSort: b = !1,
  resizable: S = !1,
  columnWidths: m,
  onColumnResize: ze,
  columnReorderable: R = !1,
  columnOrder: Ie,
  onColumnReorder: Ke,
  selectable: v = !1,
  selectedIds: He,
  defaultSelectedIds: Te,
  onSelectionChange: je,
  onRowClick: Me,
  rowClassName: G,
  expandable: u,
  onCellChange: Oe,
  rowActions: o,
  loading: oe = !1,
  loadingMode: Pe = "splash",
  loadingContent: ae,
  emptyMessage: Fe = "데이터가 없습니다.",
  rowReorderable: w = !1,
  onRowReorder: Be,
  filterState: Ve,
  defaultFilterState: $e,
  onFilterChange: Ue,
  maxHeight: X,
  estimateRowHeight: ce = Gt,
  className: Ge
}) {
  const M = (o == null ? void 0 : o.showDelete) ?? !!(o != null && o.onRowDelete), Xe = (o == null ? void 0 : o.showAdd) ?? !!(o != null && o.onRowAdd), Ye = o == null ? void 0 : o.onRowDelete, Y = o == null ? void 0 : o.onRowAdd, { orderedColumns: Z, handleColumnDragEnd: he } = Vt({
    columns: c,
    columnReorderable: R,
    columnOrder: Ie,
    onColumnReorder: Ke
  }), { getColumnWidth: fe, handleResizeStart: Ze, resizingKey: qe } = Bt({
    resizable: S,
    columnWidths: m,
    onColumnResize: ze
  }), a = l.useMemo(() => S ? Z.map((e) => {
    const t = fe(e);
    return t !== void 0 ? { ...e, width: t } : e;
  }) : Z, [Z, S, fe]), E = w ? j : 0, O = E + (v ? N : 0) + (u ? H : 0), F = O + (M ? T : 0), { left: q, right: J } = l.useMemo(
    () => Zt(a, F),
    [a, F]
  ), me = l.useMemo(
    () => qt(a) + F,
    [a, F]
  ), P = Ut({
    data: n,
    selectable: v,
    selectedIds: He,
    defaultSelectedIds: Te,
    onSelectionChange: je
  }), W = $t({ data: n, expandable: u }), C = Ft({ onCellChange: Oe }), { handleRowDragEnd: ue } = Mt({ data: n, onRowReorder: Be }), Q = jt({ filterState: Ve, defaultFilterState: $e, onFilterChange: Ue }), z = l.useMemo(
    () => x ?? [],
    [x]
  ), Je = l.useCallback(
    (e) => {
      const t = z.findIndex((r) => r.column === e);
      return t < 0 ? { direction: null, priority: void 0 } : {
        direction: z[t].direction,
        priority: b && z.length > 1 ? t + 1 : void 0
      };
    },
    [z, b]
  ), Qe = l.useCallback(
    (e) => {
      f && f(Yt(z, e, b));
    },
    [z, b, f]
  ), ge = l.useMemo(
    () => a.some((e) => typeof e.width != "number"),
    [a]
  ), Ae = l.useMemo(
    () => R ? a.filter((e) => !e.pinned && !e.sortable).map((e) => String(e.accessorKey)) : [],
    [a, R]
  ), et = bt(
    St(Et, { activationConstraint: { distance: 5 } })
  ), tt = l.useCallback(
    (e) => {
      String(e.active.id).startsWith("row-") ? ue(e) : he(e);
    },
    [he, ue]
  ), it = l.useMemo(
    () => w ? n.map((e) => `row-${e.id}`) : [],
    [n, w]
  ), [pe, nt] = l.useState(/* @__PURE__ */ new Map()), st = l.useCallback((e, t) => {
    nt((s) => {
      if (s.get(e) === t) return s;
      const r = new Map(s);
      return r.set(e, t), r;
    });
  }, []), ye = l.useMemo(() => {
    const e = new Array(n.length + 1);
    e[0] = 0;
    for (let t = 0; t < n.length; t++) {
      const s = pe.get(n[t].id) ?? ce;
      e[t + 1] = e[t] + s;
    }
    return e;
  }, [n, pe, ce]), rt = ye[n.length], [lt, dt] = l.useState(null), xe = l.useRef(null), [A, ot] = l.useState(!1), [ee, at] = l.useState(!1), [I, ct] = l.useState(0);
  l.useEffect(() => {
    const e = xe.current;
    if (!e) return;
    const t = () => {
      ot(e.scrollLeft > 0), at(e.scrollLeft + e.clientWidth < e.scrollWidth - 1), ct(e.clientWidth);
    };
    t(), e.addEventListener("scroll", t, { passive: !0 });
    const s = new ResizeObserver(t);
    return s.observe(e), () => {
      e.removeEventListener("scroll", t), s.disconnect();
    };
  }, []);
  const B = l.useMemo(
    () => a.filter((e) => !e.pinned),
    [a]
  ), K = l.useMemo(() => {
    if (!y || y.length === 0) return null;
    const e = [];
    let t = 0;
    for (; t < B.length; ) {
      const s = B[t], r = y.find((g) => g.columns[0] === s.accessorKey);
      if (r) {
        const g = r.columns.reduce((D, L) => {
          const k = B.find(($) => $.accessorKey === L);
          return D + (k ? U(k) : de);
        }, 0);
        e.push({
          kind: "group",
          key: `group-${String(s.accessorKey)}`,
          width: g,
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
  }, [B, y]), ve = K !== null && K.length > 0, ht = ve ? 2 : 1, p = "bg-slate-100 dark:bg-slate-800", ke = (e, t) => {
    const s = e.id ?? String(e.accessorKey), r = Je(e.accessorKey), g = typeof e.width == "number" ? e.width : void 0, D = typeof e.minWidth == "number" ? e.minWidth : void 0, L = e.pinned === "left", k = e.pinned === "right", $ = L || k, gt = t === ie && A, pt = t === _ && ee, yt = t === _, xt = R && !$ && !e.sortable, vt = qe === e.accessorKey, kt = t === a.length - 1, Se = d(
      "relative flex min-h-9",
      g !== void 0 && "shrink-0",
      $ && "sticky z-20",
      p,
      gt && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      pt && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      e.sortable && "select-none",
      yt && "ml-auto"
    ), Ee = {
      width: g,
      minWidth: D,
      flex: g === void 0 ? "1 1 0" : void 0,
      left: L ? q[t] : void 0,
      right: k ? J[t] : void 0
    }, wt = e.sortable ? /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: d(
          "flex w-full min-w-0 items-center gap-1 cursor-pointer",
          // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
          e.align === "right" ? "flex-row-reverse justify-start" : le[e.align ?? "left"]
        ),
        onClick: () => Qe(e.accessorKey),
        children: [
          /* @__PURE__ */ i("span", { className: "min-w-0 truncate", children: e.header }),
          /* @__PURE__ */ h("span", { className: "flex shrink-0 items-center gap-0.5", children: [
            /* @__PURE__ */ h("span", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ i(Re, { direction: "up", active: r.direction === "asc" }),
              /* @__PURE__ */ i(Re, { direction: "down", active: r.direction === "desc" })
            ] }),
            r.priority !== void 0 && /* @__PURE__ */ i("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: r.priority })
          ] })
        ]
      }
    ) : /* @__PURE__ */ i("span", { className: "min-w-0 truncate", children: e.header }), ne = String(e.accessorKey), Ct = e.filter ? /* @__PURE__ */ i(
      Tt,
      {
        column: e,
        filter: e.filter,
        value: Q.getColumnFilter(ne),
        active: Q.hasActiveFilter(ne),
        onChange: (se) => Q.setColumnFilter(ne, se)
      }
    ) : null, We = /* @__PURE__ */ h(
      "div",
      {
        className: d(
          "flex-1 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 min-w-0",
          e.align === "right" && "flex-row-reverse"
        ),
        children: [
          /* @__PURE__ */ i(
            "div",
            {
              className: d(
                "flex-1 flex items-center gap-1 min-w-0 overflow-hidden",
                le[e.align ?? "left"]
              ),
              children: wt
            }
          ),
          Ct
        ]
      }
    ), _e = !kt && /* @__PURE__ */ i(
      Le,
      {
        resizable: S,
        isResizing: vt,
        onResizeStart: (se) => Ze(se, e)
      }
    ), Nt = e.sortable ? r.direction === "asc" ? "ascending" : r.direction === "desc" ? "descending" : "none" : void 0;
    return xt ? /* @__PURE__ */ h(
      Pt,
      {
        id: String(e.accessorKey),
        className: Se,
        style: Ee,
        dataColumnKey: String(e.accessorKey),
        children: [
          We,
          _e
        ]
      },
      s
    ) : /* @__PURE__ */ h(
      "div",
      {
        role: "columnheader",
        "data-column-key": String(e.accessorKey),
        className: Se,
        style: Ee,
        "aria-sort": Nt,
        children: [
          We,
          _e
        ]
      },
      s
    );
  }, we = (e, t) => {
    const s = typeof e.width == "number" ? e.width : de, r = e.pinned === "left";
    return /* @__PURE__ */ i(
      "div",
      {
        className: d(
          "shrink-0 sticky z-20",
          p,
          t === _ && "ml-auto",
          t === ie && A && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          t === _ && ee && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: s,
          left: r ? q[t] : void 0,
          right: r ? void 0 : J[t]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, ft = (u == null ? void 0 : u.showExpandAll) ?? !0, Ce = () => {
    const e = [];
    return w && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          role: "columnheader",
          className: d("shrink-0 sticky z-20 min-h-9", p),
          style: { width: j, left: 0 },
          "aria-label": "행 순서 변경",
          children: /* @__PURE__ */ i("span", { className: "sr-only", children: "행 순서 변경" })
        },
        "ctrl-header-drag-handle"
      )
    ), v && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          role: "columnheader",
          className: d("shrink-0 sticky z-20 flex items-center justify-center min-h-9", p),
          style: {
            width: N,
            left: E
          },
          children: /* @__PURE__ */ i(
            Rt,
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
    ), u && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          role: "columnheader",
          className: d("shrink-0 sticky z-20 flex items-center justify-center min-h-9", p),
          style: {
            width: H,
            left: E + (v ? N : 0)
          },
          children: ft && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: W.toggleAll,
              className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
              "aria-label": W.allExpanded ? "모두 접기" : "모두 펼치기",
              children: W.allExpanded ? /* @__PURE__ */ i(It, { size: 24 }) : /* @__PURE__ */ i(Kt, { size: 24 })
            }
          )
        },
        "ctrl-header-expand"
      )
    ), e;
  }, Ne = () => M ? /* @__PURE__ */ i(
    "div",
    {
      role: "columnheader",
      className: d(
        "shrink-0 sticky z-20 flex items-center justify-center min-h-9",
        p
      ),
      style: { width: T, left: O },
      "aria-label": "행 삭제",
      children: /* @__PURE__ */ i("span", { className: "sr-only", children: "행 삭제" })
    },
    "ctrl-header-delete"
  ) : null, mt = () => M ? /* @__PURE__ */ i(
    "div",
    {
      className: d("shrink-0 sticky z-20 min-h-9", p),
      style: { width: T, left: O }
    },
    "ctrl-ph-delete"
  ) : null, ut = () => {
    const e = [];
    return w && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: d("shrink-0 sticky z-20 min-h-9", p),
          style: { width: j, left: 0 }
        },
        "ctrl-ph-drag-handle"
      )
    ), v && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: d("shrink-0 sticky z-20 min-h-9", p),
          style: { width: N, left: E }
        },
        "ctrl-ph-select"
      )
    ), u && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: d("shrink-0 sticky z-20 min-h-9", p),
          style: {
            width: H,
            left: E + (v ? N : 0)
          }
        },
        "ctrl-ph-expand"
      )
    ), e;
  }, V = a.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "left"), te = a.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "right"), ie = V.length ? V[V.length - 1].i : -1, _ = te.length ? te[0].i : -1, be = /* @__PURE__ */ i(
    "div",
    {
      role: "grid",
      "aria-rowcount": n.length + ht,
      "aria-colcount": a.length,
      className: d(
        // 항상 컨테이너 폭 유지. 리사이즈로 모든 컬럼 fixed 로 전환돼도 테이블 자체는 shrink 안 함.
        // 빈 영역은 셀 bg (SDS-42 에서 모든 셀에 headerBg 적용) 로 시각 커버.
        "w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        Ge
      ),
      children: /* @__PURE__ */ i(
        "div",
        {
          ref: xe,
          className: "overflow-auto",
          style: { maxHeight: typeof X == "number" ? `${X}px` : X },
          children: /* @__PURE__ */ h("div", { style: { minWidth: me }, children: [
            /* @__PURE__ */ h(
              "div",
              {
                className: d(
                  "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
                  p
                ),
                children: [
                  ve && K && /* @__PURE__ */ h(
                    "div",
                    {
                      role: "row",
                      className: "flex border-b border-slate-200 dark:border-slate-700",
                      children: [
                        ut(),
                        mt(),
                        V.map(({ c: e, i: t }) => we(e, t)),
                        K.map((e, t) => {
                          if (e.kind === "group") {
                            let D = -1;
                            for (let k = K.length - 1; k >= 0; k--)
                              if (K[k].kind === "group") {
                                D = k;
                                break;
                              }
                            const L = t === D;
                            return /* @__PURE__ */ h(
                              "div",
                              {
                                role: "columnheader",
                                className: "relative flex min-h-9 shrink-0",
                                style: { width: e.width },
                                children: [
                                  /* @__PURE__ */ i(
                                    "div",
                                    {
                                      className: d(
                                        "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                                        le[e.group.align ?? "center"]
                                      ),
                                      children: e.group.header
                                    }
                                  ),
                                  !L && /* @__PURE__ */ i(Le, {})
                                ]
                              },
                              e.key
                            );
                          }
                          const s = e.col, r = typeof s.width == "number" ? s.width : void 0, g = typeof s.minWidth == "number" ? s.minWidth : void 0;
                          return /* @__PURE__ */ i(
                            "div",
                            {
                              className: d(
                                "min-h-9",
                                r === void 0 ? "flex-1" : "shrink-0"
                              ),
                              style: { width: r, minWidth: g }
                            },
                            e.key
                          );
                        }),
                        te.map(({ c: e, i: t }) => we(e, t))
                      ]
                    }
                  ),
                  R ? /* @__PURE__ */ i(
                    De,
                    {
                      items: Ae,
                      strategy: Dt,
                      children: /* @__PURE__ */ h("div", { role: "row", className: "flex", children: [
                        Ce(),
                        Ne(),
                        a.map((e, t) => ke(e, t)),
                        _ === -1 && !ge && /* @__PURE__ */ i("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
                      ] })
                    }
                  ) : /* @__PURE__ */ h("div", { role: "row", className: "flex", children: [
                    Ce(),
                    Ne(),
                    a.map((e, t) => ke(e, t)),
                    _ === -1 && !ge && /* @__PURE__ */ i("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
                  ] })
                ]
              }
            ),
            oe ? ae ? (
              // 커스텀 로딩 — 가로 스크롤 시 가시 영역 중앙에 표시
              /* @__PURE__ */ i(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: I ? { width: I } : void 0,
                  children: ae
                }
              )
            ) : Pe === "skeleton" ? (
              // 스켈레톤 — 각 컬럼 폭에 맞춰 셀 구조로 렌더
              /* @__PURE__ */ i("div", { children: Array.from({ length: Xt }).map((e, t) => /* @__PURE__ */ h(
                "div",
                {
                  role: "row",
                  className: "flex border-b border-slate-200 dark:border-slate-700 min-h-9",
                  children: [
                    w && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: j }
                      }
                    ),
                    v && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: N },
                        children: /* @__PURE__ */ i(re, { width: 16, height: 16 })
                      }
                    ),
                    u && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: H },
                        children: /* @__PURE__ */ i(re, { width: 16, height: 16 })
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
                    a.map((s) => {
                      const r = typeof s.width == "number" ? s.width : void 0, g = typeof s.minWidth == "number" ? s.minWidth : void 0;
                      return /* @__PURE__ */ i(
                        "div",
                        {
                          role: "gridcell",
                          className: d(
                            "flex items-center px-3 py-1.5",
                            r === void 0 ? "flex-1" : "shrink-0"
                          ),
                          style: { width: r, minWidth: g },
                          children: /* @__PURE__ */ i(re, { height: 16, width: "70%" })
                        },
                        s.id ?? String(s.accessorKey)
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
                  style: I ? { width: I } : void 0,
                  children: /* @__PURE__ */ i(zt, { size: "lg" })
                }
              )
            ) : n.length === 0 ? /* @__PURE__ */ i(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center min-h-32 py-8 text-sm text-slate-500 dark:text-slate-400",
                style: I ? { width: I } : void 0,
                children: Fe
              }
            ) : /* @__PURE__ */ i("div", { className: "relative", style: { height: rt }, children: /* @__PURE__ */ i(
              De,
              {
                items: it,
                strategy: Lt,
                children: n.map((e, t) => {
                  var s, r;
                  return /* @__PURE__ */ i(
                    Ot,
                    {
                      row: e,
                      rowIndex: t,
                      columns: a,
                      leftOffsets: q,
                      rightOffsets: J,
                      lastLeftPinnedIdx: ie,
                      firstRightPinnedIdx: _,
                      showLeftShadow: A,
                      showRightShadow: ee,
                      totalWidth: me,
                      translateY: ye[t],
                      isHovered: lt === e.id,
                      onHover: dt,
                      onHeightChange: st,
                      selectable: v,
                      isSelected: P.isSelected(e.id),
                      onToggleSelect: P.toggleRow,
                      checkboxColWidth: N,
                      expandable: !!u,
                      isExpanded: W.isExpanded(e.id),
                      canExpand: W.canExpand(e),
                      onToggleExpand: W.toggleRow,
                      expandedContent: u && W.isExpanded(e.id) ? u.expandedRowRender(e) : null,
                      expandColWidth: H,
                      onRowClick: Me,
                      extraClassName: G == null ? void 0 : G(e),
                      editingColumnKey: ((s = C.editing) == null ? void 0 : s.rowId) === e.id ? C.editing.columnKey : null,
                      editingState: ((r = C.editing) == null ? void 0 : r.rowId) === e.id ? { editValue: C.editing.editValue, error: C.editing.error } : null,
                      onStartEdit: C.startEdit,
                      onChangeEditValue: C.changeEditValue,
                      onCompleteEdit: C.completeEdit,
                      onCancelEdit: C.cancelEdit,
                      showRowDelete: M,
                      onRowDelete: Ye,
                      rowActionsColWidth: T,
                      rowActionsColLeftOffset: O,
                      rowReorderable: w,
                      dragHandleColWidth: j,
                      isLast: t === n.length - 1
                    },
                    e.id
                  );
                })
              }
            ) }),
            Xe && !oe && /* @__PURE__ */ h(
              "div",
              {
                role: "row",
                className: "flex bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                children: [
                  w && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: { width: j, left: 0 }
                    }
                  ),
                  v && /* @__PURE__ */ i(
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
                  u && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: H,
                        left: E + (v ? N : 0)
                      }
                    }
                  ),
                  /* @__PURE__ */ i(
                    "div",
                    {
                      role: "gridcell",
                      className: d(
                        "shrink-0 sticky z-10 flex items-center justify-center bg-white dark:bg-slate-900 min-h-9"
                      ),
                      style: { width: T, left: O },
                      children: /* @__PURE__ */ i(
                        "button",
                        {
                          type: "button",
                          onClick: () => Y == null ? void 0 : Y(),
                          className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                          "aria-label": "행 추가",
                          children: /* @__PURE__ */ i(Ht, { size: 20 })
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
  return R || w ? /* @__PURE__ */ i(
    Wt,
    {
      sensors: et,
      collisionDetection: _t,
      onDragEnd: tt,
      children: be
    }
  ) : be;
}
export {
  xi as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
