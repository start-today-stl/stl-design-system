import { jsx as i, jsxs as m } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as ht, useSensor as ft, PointerSensor as mt, DndContext as ut } from "@dnd-kit/core";
import { SortableContext as gt, horizontalListSortingStrategy as pt } from "@dnd-kit/sortable";
import { cn as a } from "../../../lib/utils.mjs";
import { Checkbox as yt } from "../../ui/checkbox.mjs";
import { Skeleton as A } from "../../ui/skeleton.mjs";
import { SplashScreen as xt } from "../../ui/splash-screen.mjs";
import { DownIcon as vt } from "../../../icons/DownIcon.mjs";
import { RightIcon as kt } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as wt } from "../../../icons/RowAddIcon.mjs";
import { DataTableV2ColumnSeparator as Ce } from "./data-table-v2-column-separator.mjs";
import { DataTableV2Row as bt } from "./data-table-v2-row.mjs";
import { DataTableV2SortableHeaderCell as Ct } from "./data-table-v2-sortable-header-cell.mjs";
import { useCellEdit as Nt } from "./hooks/use-cell-edit.mjs";
import { useColumnResize as St } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as Et } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as Rt } from "./hooks/use-row-expansion.mjs";
import { useRowSelection as Wt } from "./hooks/use-row-selection.mjs";
const _t = 40, te = 120, b = 40, I = 40, T = 40, Lt = 5, ee = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function Ne({ direction: r, active: c }) {
  return /* @__PURE__ */ i(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: a(
        "transition-colors",
        c ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        r === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ i("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
}
function Dt(r, c, p) {
  const y = r.find((h) => h.column === c);
  return p ? y ? y.direction === "asc" ? r.map(
    (h) => h.column === c ? { column: c, direction: "desc" } : h
  ) : r.filter((h) => h.column !== c) : [...r, { column: c, direction: "asc" }] : y ? y.direction === "asc" ? [{ column: c, direction: "desc" }] : [] : [{ column: c, direction: "asc" }];
}
function zt(r, c = 0, p = 0) {
  const y = new Array(r.length).fill(-1), h = new Array(r.length).fill(-1);
  let C = c;
  for (let f = 0; f < r.length; f++)
    r[f].pinned === "left" && (y[f] = C, C += V(r[f]));
  let N = p;
  for (let f = r.length - 1; f >= 0; f--)
    r[f].pinned === "right" && (h[f] = N, N += V(r[f]));
  return { left: y, right: h };
}
function V(r) {
  return typeof r.width == "number" ? r.width : typeof r.minWidth == "number" ? r.minWidth : te;
}
function It(r) {
  return r.reduce((c, p) => c + V(p), 0);
}
function Qt({
  data: r,
  columns: c,
  headerGroups: p,
  sortState: y,
  onSortChange: h,
  multiSort: C = !1,
  resizable: N = !1,
  columnWidths: f,
  onColumnResize: Se,
  columnReorderable: W = !1,
  columnOrder: Ee,
  onColumnReorder: Re,
  selectable: x = !1,
  selectedIds: We,
  defaultSelectedIds: _e,
  onSelectionChange: Le,
  onRowClick: De,
  rowClassName: F,
  expandable: u,
  onCellChange: ze,
  rowActions: d,
  loading: ie = !1,
  loadingMode: Ie = "splash",
  loadingContent: ne,
  emptyMessage: Te = "데이터가 없습니다.",
  maxHeight: $,
  estimateRowHeight: re = _t,
  className: je
}) {
  const j = (d == null ? void 0 : d.showDelete) ?? !!(d != null && d.onRowDelete), He = (d == null ? void 0 : d.showAdd) ?? !!(d != null && d.onRowAdd), Ke = d == null ? void 0 : d.onRowDelete, U = d == null ? void 0 : d.onRowAdd, { orderedColumns: X, handleColumnDragEnd: se } = Et({
    columns: c,
    columnReorderable: W,
    columnOrder: Ee,
    onColumnReorder: Re
  }), { getColumnWidth: le, handleResizeStart: Pe, resizingKey: Me } = St({
    resizable: N,
    columnWidths: f,
    onColumnResize: Se
  }), o = l.useMemo(() => N ? X.map((e) => {
    const t = le(e);
    return t !== void 0 ? { ...e, width: t } : e;
  }) : X, [X, N, le]), H = (x ? b : 0) + (u ? I : 0), M = H + (j ? T : 0), { left: G, right: Y } = l.useMemo(
    () => zt(o, M),
    [o, M]
  ), de = l.useMemo(
    () => It(o) + M,
    [o, M]
  ), K = Wt({
    data: r,
    selectable: x,
    selectedIds: We,
    defaultSelectedIds: _e,
    onSelectionChange: Le
  }), S = Rt({ data: r, expandable: u }), k = Nt({ onCellChange: ze }), _ = l.useMemo(
    () => y ?? [],
    [y]
  ), Oe = l.useCallback(
    (e) => {
      const t = _.findIndex((s) => s.column === e);
      return t < 0 ? { direction: null, priority: void 0 } : {
        direction: _[t].direction,
        priority: C && _.length > 1 ? t + 1 : void 0
      };
    },
    [_, C]
  ), Be = l.useCallback(
    (e) => {
      h && h(Dt(_, e, C));
    },
    [_, C, h]
  ), oe = l.useMemo(
    () => o.some((e) => typeof e.width != "number"),
    [o]
  ), Ve = l.useMemo(
    () => W ? o.filter((e) => !e.pinned && !e.sortable).map((e) => String(e.accessorKey)) : [],
    [o, W]
  ), Fe = ht(
    ft(mt, { activationConstraint: { distance: 5 } })
  ), $e = l.useCallback(
    (e) => se(e),
    [se]
  ), [ae, Ue] = l.useState(/* @__PURE__ */ new Map()), Xe = l.useCallback((e, t) => {
    Ue((n) => {
      if (n.get(e) === t) return n;
      const s = new Map(n);
      return s.set(e, t), s;
    });
  }, []), ce = l.useMemo(() => {
    const e = new Array(r.length + 1);
    e[0] = 0;
    for (let t = 0; t < r.length; t++) {
      const n = ae.get(r[t].id) ?? re;
      e[t + 1] = e[t] + n;
    }
    return e;
  }, [r, ae, re]), Ge = ce[r.length], [Ye, Ze] = l.useState(null), he = l.useRef(null), [Z, qe] = l.useState(!1), [q, Je] = l.useState(!1), [L, Qe] = l.useState(0);
  l.useEffect(() => {
    const e = he.current;
    if (!e) return;
    const t = () => {
      qe(e.scrollLeft > 0), Je(e.scrollLeft + e.clientWidth < e.scrollWidth - 1), Qe(e.clientWidth);
    };
    t(), e.addEventListener("scroll", t, { passive: !0 });
    const n = new ResizeObserver(t);
    return n.observe(e), () => {
      e.removeEventListener("scroll", t), n.disconnect();
    };
  }, []);
  const O = l.useMemo(
    () => o.filter((e) => !e.pinned),
    [o]
  ), D = l.useMemo(() => {
    if (!p || p.length === 0) return null;
    const e = [];
    let t = 0;
    for (; t < O.length; ) {
      const n = O[t], s = p.find((g) => g.columns[0] === n.accessorKey);
      if (s) {
        const g = s.columns.reduce((E, R) => {
          const v = O.find((P) => P.accessorKey === R);
          return E + (v ? V(v) : te);
        }, 0);
        e.push({
          kind: "group",
          key: `group-${String(n.accessorKey)}`,
          width: g,
          group: s
        }), t += s.columns.length;
      } else
        e.push({
          kind: "placeholder",
          key: `middle-empty-${String(n.accessorKey)}`,
          col: n
        }), t += 1;
    }
    return e;
  }, [O, p]), fe = D !== null && D.length > 0, Ae = fe ? 2 : 1, w = "bg-slate-100 dark:bg-slate-800", me = (e, t) => {
    const n = e.id ?? String(e.accessorKey), s = Oe(e.accessorKey), g = typeof e.width == "number" ? e.width : void 0, E = typeof e.minWidth == "number" ? e.minWidth : void 0, R = e.pinned === "left", v = e.pinned === "right", P = R || v, nt = t === Q && Z, rt = t === z && q, st = t === z, lt = W && !P && !e.sortable, dt = Me === e.accessorKey, ot = t === o.length - 1, xe = a(
      "relative flex min-h-9",
      g !== void 0 && "shrink-0",
      P && "sticky z-20",
      P && w,
      nt && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      rt && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      e.sortable && "select-none",
      st && "ml-auto"
    ), ve = {
      width: g,
      minWidth: E,
      flex: g === void 0 ? "1 1 0" : void 0,
      left: R ? G[t] : void 0,
      right: v ? Y[t] : void 0
    }, ke = a(
      "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
      ee[e.align ?? "left"]
    ), we = e.sortable ? /* @__PURE__ */ m(
      "button",
      {
        type: "button",
        className: a(
          "flex w-full items-center gap-1 cursor-pointer",
          // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
          e.align === "right" ? "flex-row-reverse justify-start" : ee[e.align ?? "left"]
        ),
        onClick: () => Be(e.accessorKey),
        children: [
          e.header,
          /* @__PURE__ */ m("span", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ m("span", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ i(Ne, { direction: "up", active: s.direction === "asc" }),
              /* @__PURE__ */ i(Ne, { direction: "down", active: s.direction === "desc" })
            ] }),
            s.priority !== void 0 && /* @__PURE__ */ i("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: s.priority })
          ] })
        ]
      }
    ) : e.header, be = !ot && /* @__PURE__ */ i(
      Ce,
      {
        resizable: N,
        isResizing: dt,
        onResizeStart: (ct) => Pe(ct, e)
      }
    ), at = e.sortable ? s.direction === "asc" ? "ascending" : s.direction === "desc" ? "descending" : "none" : void 0;
    return lt ? /* @__PURE__ */ m(
      Ct,
      {
        id: String(e.accessorKey),
        className: xe,
        style: ve,
        children: [
          /* @__PURE__ */ i("div", { className: ke, children: we }),
          be
        ]
      },
      n
    ) : /* @__PURE__ */ m(
      "div",
      {
        role: "columnheader",
        className: xe,
        style: ve,
        "aria-sort": at,
        children: [
          /* @__PURE__ */ i("div", { className: ke, children: we }),
          be
        ]
      },
      n
    );
  }, ue = (e, t) => {
    const n = typeof e.width == "number" ? e.width : te, s = e.pinned === "left";
    return /* @__PURE__ */ i(
      "div",
      {
        className: a(
          "shrink-0 sticky z-20",
          w,
          t === z && "ml-auto",
          t === Q && Z && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          t === z && q && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: n,
          left: s ? G[t] : void 0,
          right: s ? void 0 : Y[t]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, et = (u == null ? void 0 : u.showExpandAll) ?? !0, ge = () => {
    const e = [];
    return x && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          role: "columnheader",
          className: a("shrink-0 sticky z-20 flex items-center justify-center min-h-9", w),
          style: { width: b, left: 0 },
          children: /* @__PURE__ */ i(
            yt,
            {
              checked: K.allSelected,
              indeterminate: K.someSelected,
              onCheckedChange: () => K.toggleAll(),
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
          className: a("shrink-0 sticky z-20 flex items-center justify-center min-h-9", w),
          style: {
            width: I,
            left: x ? b : 0
          },
          children: et && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: S.toggleAll,
              className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
              "aria-label": S.allExpanded ? "모두 접기" : "모두 펼치기",
              children: S.allExpanded ? /* @__PURE__ */ i(vt, { size: 24 }) : /* @__PURE__ */ i(kt, { size: 24 })
            }
          )
        },
        "ctrl-header-expand"
      )
    ), e;
  }, pe = () => j ? /* @__PURE__ */ i(
    "div",
    {
      role: "columnheader",
      className: a(
        "shrink-0 sticky z-20 flex items-center justify-center min-h-9",
        w
      ),
      style: { width: T, left: H },
      "aria-label": "행 삭제",
      children: /* @__PURE__ */ i("span", { className: "sr-only", children: "행 삭제" })
    },
    "ctrl-header-delete"
  ) : null, tt = () => j ? /* @__PURE__ */ i(
    "div",
    {
      className: a("shrink-0 sticky z-20 min-h-9", w),
      style: { width: T, left: H }
    },
    "ctrl-ph-delete"
  ) : null, it = () => {
    const e = [];
    return x && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: a("shrink-0 sticky z-20 min-h-9", w),
          style: { width: b, left: 0 }
        },
        "ctrl-ph-select"
      )
    ), u && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: a("shrink-0 sticky z-20 min-h-9", w),
          style: {
            width: I,
            left: x ? b : 0
          }
        },
        "ctrl-ph-expand"
      )
    ), e;
  }, B = o.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "left"), J = o.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "right"), Q = B.length ? B[B.length - 1].i : -1, z = J.length ? J[0].i : -1, ye = /* @__PURE__ */ i(
    "div",
    {
      role: "grid",
      "aria-rowcount": r.length + Ae,
      "aria-colcount": o.length,
      className: a(
        // flex-1 컬럼 있으면 컨테이너 폭 채워서 그 컬럼이 자라게. 없으면 콘텐츠 폭 (빈 공간 없음).
        oe ? "w-full" : "w-fit max-w-full",
        "overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        je
      ),
      children: /* @__PURE__ */ i(
        "div",
        {
          ref: he,
          className: "overflow-auto",
          style: { maxHeight: typeof $ == "number" ? `${$}px` : $ },
          children: /* @__PURE__ */ m("div", { style: { minWidth: de }, children: [
            /* @__PURE__ */ m(
              "div",
              {
                className: a(
                  "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
                  w
                ),
                children: [
                  fe && D && /* @__PURE__ */ m(
                    "div",
                    {
                      role: "row",
                      className: "flex border-b border-slate-200 dark:border-slate-700",
                      children: [
                        it(),
                        tt(),
                        B.map(({ c: e, i: t }) => ue(e, t)),
                        D.map((e, t) => {
                          if (e.kind === "group") {
                            let E = -1;
                            for (let v = D.length - 1; v >= 0; v--)
                              if (D[v].kind === "group") {
                                E = v;
                                break;
                              }
                            const R = t === E;
                            return /* @__PURE__ */ m(
                              "div",
                              {
                                role: "columnheader",
                                className: "relative flex min-h-9 shrink-0",
                                style: { width: e.width },
                                children: [
                                  /* @__PURE__ */ i(
                                    "div",
                                    {
                                      className: a(
                                        "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                                        ee[e.group.align ?? "center"]
                                      ),
                                      children: e.group.header
                                    }
                                  ),
                                  !R && /* @__PURE__ */ i(Ce, {})
                                ]
                              },
                              e.key
                            );
                          }
                          const n = e.col, s = typeof n.width == "number" ? n.width : void 0, g = typeof n.minWidth == "number" ? n.minWidth : void 0;
                          return /* @__PURE__ */ i(
                            "div",
                            {
                              className: a(
                                "min-h-9",
                                s === void 0 ? "flex-1" : "shrink-0"
                              ),
                              style: { width: s, minWidth: g }
                            },
                            e.key
                          );
                        }),
                        J.map(({ c: e, i: t }) => ue(e, t))
                      ]
                    }
                  ),
                  W ? /* @__PURE__ */ i(
                    gt,
                    {
                      items: Ve,
                      strategy: pt,
                      children: /* @__PURE__ */ m("div", { role: "row", className: "flex", children: [
                        ge(),
                        pe(),
                        o.map((e, t) => me(e, t)),
                        z === -1 && !oe && /* @__PURE__ */ i("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
                      ] })
                    }
                  ) : /* @__PURE__ */ m("div", { role: "row", className: "flex", children: [
                    ge(),
                    pe(),
                    o.map((e, t) => me(e, t))
                  ] })
                ]
              }
            ),
            ie ? ne ? (
              // 커스텀 로딩 — 가로 스크롤 시 가시 영역 중앙에 표시
              /* @__PURE__ */ i(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: L ? { width: L } : void 0,
                  children: ne
                }
              )
            ) : Ie === "skeleton" ? (
              // 스켈레톤 — 각 컬럼 폭에 맞춰 셀 구조로 렌더
              /* @__PURE__ */ i("div", { children: Array.from({ length: Lt }).map((e, t) => /* @__PURE__ */ m(
                "div",
                {
                  role: "row",
                  className: "flex border-b border-slate-200 dark:border-slate-700 min-h-9",
                  children: [
                    x && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: b },
                        children: /* @__PURE__ */ i(A, { width: 16, height: 16 })
                      }
                    ),
                    u && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: I },
                        children: /* @__PURE__ */ i(A, { width: 16, height: 16 })
                      }
                    ),
                    j && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: T }
                      }
                    ),
                    o.map((n) => {
                      const s = typeof n.width == "number" ? n.width : void 0, g = typeof n.minWidth == "number" ? n.minWidth : void 0;
                      return /* @__PURE__ */ i(
                        "div",
                        {
                          role: "gridcell",
                          className: a(
                            "flex items-center px-3 py-1.5",
                            s === void 0 ? "flex-1" : "shrink-0"
                          ),
                          style: { width: s, minWidth: g },
                          children: /* @__PURE__ */ i(A, { height: 16, width: "70%" })
                        },
                        n.id ?? String(n.accessorKey)
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
                  style: L ? { width: L } : void 0,
                  children: /* @__PURE__ */ i(xt, { size: "lg" })
                }
              )
            ) : r.length === 0 ? /* @__PURE__ */ i(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center min-h-32 py-8 text-sm text-slate-500 dark:text-slate-400",
                style: L ? { width: L } : void 0,
                children: Te
              }
            ) : /* @__PURE__ */ i("div", { className: "relative", style: { height: Ge }, children: r.map((e, t) => {
              var n, s;
              return /* @__PURE__ */ i(
                bt,
                {
                  row: e,
                  rowIndex: t,
                  columns: o,
                  leftOffsets: G,
                  rightOffsets: Y,
                  lastLeftPinnedIdx: Q,
                  firstRightPinnedIdx: z,
                  showLeftShadow: Z,
                  showRightShadow: q,
                  totalWidth: de,
                  translateY: ce[t],
                  isHovered: Ye === e.id,
                  onHover: Ze,
                  onHeightChange: Xe,
                  selectable: x,
                  isSelected: K.isSelected(e.id),
                  onToggleSelect: K.toggleRow,
                  checkboxColWidth: b,
                  expandable: !!u,
                  isExpanded: S.isExpanded(e.id),
                  canExpand: S.canExpand(e),
                  onToggleExpand: S.toggleRow,
                  expandedContent: u && S.isExpanded(e.id) ? u.expandedRowRender(e) : null,
                  expandColWidth: I,
                  onRowClick: De,
                  extraClassName: F == null ? void 0 : F(e),
                  editingColumnKey: ((n = k.editing) == null ? void 0 : n.rowId) === e.id ? k.editing.columnKey : null,
                  editingState: ((s = k.editing) == null ? void 0 : s.rowId) === e.id ? { editValue: k.editing.editValue, error: k.editing.error } : null,
                  onStartEdit: k.startEdit,
                  onChangeEditValue: k.changeEditValue,
                  onCompleteEdit: k.completeEdit,
                  onCancelEdit: k.cancelEdit,
                  showRowDelete: j,
                  onRowDelete: Ke,
                  rowActionsColWidth: T,
                  rowActionsColLeftOffset: H
                },
                e.id
              );
            }) }),
            He && !ie && /* @__PURE__ */ m(
              "div",
              {
                role: "row",
                className: "flex bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                children: [
                  x && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: { width: b, left: 0 }
                    }
                  ),
                  u && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: I,
                        left: x ? b : 0
                      }
                    }
                  ),
                  /* @__PURE__ */ i(
                    "div",
                    {
                      role: "gridcell",
                      className: a(
                        "shrink-0 sticky z-10 flex items-center justify-center bg-white dark:bg-slate-900 min-h-9"
                      ),
                      style: { width: T, left: H },
                      children: /* @__PURE__ */ i(
                        "button",
                        {
                          type: "button",
                          onClick: () => U == null ? void 0 : U(),
                          className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                          "aria-label": "행 추가",
                          children: /* @__PURE__ */ i(wt, { size: 20 })
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
  return W ? /* @__PURE__ */ i(ut, { sensors: Fe, onDragEnd: $e, children: ye }) : ye;
}
export {
  Qt as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
