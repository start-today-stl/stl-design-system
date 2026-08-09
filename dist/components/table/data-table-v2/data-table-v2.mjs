import { jsx as o, jsxs as te, Fragment as Ht } from "react/jsx-runtime";
import * as s from "react";
import { useSensors as _t, useSensor as zt, PointerSensor as Pt, DndContext as Ft, closestCenter as Kt } from "@dnd-kit/core";
import { SortableContext as jt, verticalListSortingStrategy as Vt } from "@dnd-kit/sortable";
import { cn as ne } from "../../../lib/utils.mjs";
import { Skeleton as re } from "../../ui/skeleton.mjs";
import { SplashScreen as $t } from "../../ui/splash-screen.mjs";
import { RowAddIcon as Ut } from "../../../icons/RowAddIcon.mjs";
import { DataTableV2Header as At } from "./data-table-v2-header.mjs";
import { DRAG_HANDLE_COL_WIDTH as F, CHECKBOX_COL_WIDTH as I, EXPAND_COL_WIDTH as K, ROW_ACTIONS_WIDTH as j, DEFAULT_COL_WIDTH as Bt } from "./constants.mjs";
import { useFilter as Gt } from "./hooks/use-filter.mjs";
import { useRowReorder as Xt } from "./hooks/use-row-reorder.mjs";
import { DataTableV2Row as Jt } from "./data-table-v2-row.mjs";
import { useCellEdit as qt } from "./hooks/use-cell-edit.mjs";
import { useColumnResize as Qt } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as Yt } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as Zt } from "./hooks/use-row-expansion.mjs";
import { useRowGrouping as en } from "./hooks/use-row-grouping.mjs";
import { useRowSelection as tn } from "./hooks/use-row-selection.mjs";
import { useStableCallback as u } from "./hooks/use-stable-callback.mjs";
import { useTableVirtualizer as nn } from "./hooks/use-table-virtualizer.mjs";
const rn = 40, sn = 5, on = { activationConstraint: { distance: 5 } };
function ln(r, h, m) {
  const p = r.find((g) => g.column === h);
  return m ? p ? p.direction === "asc" ? r.map(
    (g) => g.column === h ? { column: h, direction: "desc" } : g
  ) : r.filter((g) => g.column !== h) : [...r, { column: h, direction: "asc" }] : p ? p.direction === "asc" ? [{ column: h, direction: "desc" }] : [] : [{ column: h, direction: "asc" }];
}
function dn(r, h = 0, m = 0) {
  const p = new Array(r.length).fill(-1), g = new Array(r.length).fill(-1);
  let S = h;
  for (let f = 0; f < r.length; f++)
    r[f].pinned === "left" && (p[f] = S, S += V(r[f]));
  let R = m;
  for (let f = r.length - 1; f >= 0; f--)
    r[f].pinned === "right" && (g[f] = R, R += V(r[f]));
  return { left: p, right: g };
}
function V(r) {
  return typeof r.width == "number" ? r.width : typeof r.minWidth == "number" ? r.minWidth : Bt;
}
function cn(r) {
  return r.reduce((h, m) => h + V(m), 0);
}
function Wn({
  data: r,
  columns: h,
  headerGroups: m,
  sortState: p,
  onSortChange: g,
  multiSort: S = !1,
  resizable: R = !1,
  columnWidths: f,
  onColumnResize: be,
  columnReorderable: D = !1,
  columnOrder: De,
  onColumnReorder: Ne,
  selectable: v = !1,
  selectedIds: Oe,
  defaultSelectedIds: We,
  onSelectionChange: Ie,
  onRowClick: Te,
  rowClassName: Me,
  expandable: l,
  onCellChange: Le,
  rowActions: d,
  loading: se = !1,
  loadingMode: He = "splash",
  loadingContent: ie,
  emptyMessage: _e = "데이터가 없습니다.",
  rowReorderable: ze = !1,
  onRowReorder: Pe,
  filterState: Fe,
  defaultFilterState: Ke,
  onFilterChange: je,
  maxHeight: $,
  estimateRowHeight: oe = rn,
  rowGrouping: T,
  virtual: Ve,
  bordered: $e = !0,
  className: Ue
}) {
  const C = T ? !1 : ze, N = (d == null ? void 0 : d.showDelete) ?? !!(d != null && d.onRowDelete), Ae = (d == null ? void 0 : d.showAdd) ?? !!(d != null && d.onRowAdd), Be = u(d == null ? void 0 : d.onRowDelete), U = u(d == null ? void 0 : d.onRowAdd), Ge = u(Te), A = u(Me), Xe = u(Le), Je = u(l == null ? void 0 : l.expandedRowRender), qe = u(Ie), B = u(g), Qe = u(je), Ye = u(be), Ze = u(Ne), et = u(Pe), le = u(l == null ? void 0 : l.onExpandedChange), { orderedColumns: G, handleColumnDragEnd: de } = Yt({
    columns: h,
    columnReorderable: D,
    columnOrder: De,
    onColumnReorder: Ze
  }), { getColumnWidth: ce, handleResizeStart: tt, resizingKey: nt } = Qt({
    resizable: R,
    columnWidths: f,
    onColumnResize: Ye
  }), c = s.useMemo(() => R ? G.map((e) => {
    const n = ce(e);
    return n !== void 0 ? { ...e, width: n } : e;
  }) : G, [G, R, ce]), M = C ? F : 0, L = M + (v ? I : 0) + (l ? K : 0), O = L + (N ? j : 0), { left: ae, right: he } = s.useMemo(
    () => dn(c, O),
    [c, O]
  ), fe = s.useMemo(
    () => cn(c) + O,
    [c, O]
  ), x = tn({
    data: r,
    selectable: v,
    selectedIds: Oe,
    defaultSelectedIds: We,
    onSelectionChange: qe
  }), rt = s.useMemo(
    () => l ? { ...l, onExpandedChange: le } : void 0,
    [l, le]
  ), W = Zt({ data: r, expandable: rt }), y = qt({ onCellChange: Xe }), { handleRowDragEnd: ue } = Xt({ data: r, onRowReorder: et }), { rowSpanMap: st, getRowSpan: w } = en({ data: r, rowGrouping: T }), H = Gt({ filterState: Fe, defaultFilterState: Ke, onFilterChange: Qe }), b = s.useMemo(
    () => p ?? [],
    [p]
  ), it = s.useCallback(
    (e) => {
      const n = b.findIndex((i) => i.column === e);
      return n < 0 ? { direction: null, priority: void 0 } : {
        direction: b[n].direction,
        priority: S && b.length > 1 ? n + 1 : void 0
      };
    },
    [b, S]
  ), ge = s.useRef(b);
  ge.current = b;
  const me = s.useRef(S);
  me.current = S;
  const ot = s.useCallback(
    (e) => {
      B && B(
        ln(ge.current, e, me.current)
      );
    },
    [B]
  ), lt = s.useMemo(
    () => c.some((e) => typeof e.width != "number"),
    [c]
  ), dt = s.useMemo(
    () => D ? c.filter((e) => !e.pinned).map((e) => String(e.accessorKey)) : [],
    [c, D]
  ), ct = _t(zt(Pt, on)), [pe, X] = s.useState(null), at = s.useCallback((e) => {
    X(String(e.active.id).startsWith("row-") ? "row" : "column");
  }, []), ht = s.useCallback(
    (e) => {
      X(null), String(e.active.id).startsWith("row-") ? ue(e) : de(e);
    },
    [de, ue]
  ), ft = s.useCallback(() => X(null), []), ut = s.useMemo(
    () => pe === "row" ? { threshold: { x: 0, y: 0.2 } } : { threshold: { x: 0.2, y: 0 } },
    [pe]
  ), gt = s.useMemo(
    () => C ? r.map((e) => `row-${e.id}`) : [],
    [r, C]
  ), [Ce, mt] = s.useState(/* @__PURE__ */ new Map()), pt = s.useCallback((e, n) => {
    mt((t) => {
      if (t.get(e) === n) return t;
      const i = new Map(t);
      return i.set(e, n), i;
    });
  }, []), _ = s.useMemo(() => {
    const e = new Array(r.length + 1);
    e[0] = 0;
    for (let n = 0; n < r.length; n++) {
      const t = Ce.get(r[n].id) ?? oe;
      e[n + 1] = e[n] + t;
    }
    return e;
  }, [r, Ce, oe]), Ct = _[r.length], [J, vt] = s.useState(null), z = s.useMemo(() => J === null ? -1 : r.findIndex((e) => e.id === J), [J, r]), yt = s.useCallback(
    (e, n) => {
      if (z < 0) return !1;
      const t = w(e, n);
      return t === void 0 || t <= 1 ? !1 : z >= e && z < e + t;
    },
    [z, w]
  ), ve = x.selectedSet, St = s.useCallback(
    (e, n) => {
      const t = w(e, n);
      if (t === void 0 || t <= 1) return !1;
      for (let i = e; i < e + t; i++) {
        const a = r[i];
        if (a && ve.has(a.id)) return !0;
      }
      return !1;
    },
    [w, r, ve]
  ), Rt = s.useCallback(() => !1, []), wt = T ? St : Rt, q = s.useRef(_);
  q.current = _;
  const Et = s.useCallback(
    (e, n) => {
      const t = w(e, n);
      if (!(t === void 0 || t <= 1))
        return q.current[e + t] - q.current[e];
    },
    [w]
  ), Q = s.useRef(null), {
    isVirtual: P,
    virtualizer: ye,
    renderIndices: Se,
    getItemStart: kt,
    totalSize: xt
  } = nn({
    virtual: Ve,
    count: r.length,
    scrollContainerRef: Q,
    rowSpanMap: st
  }), Y = s.useRef(/* @__PURE__ */ new Map()), bt = s.useCallback(
    (e, n) => {
      n ? Y.current.set(e, n) : Y.current.delete(e);
    },
    []
  );
  s.useLayoutEffect(() => {
    for (const e of Se) {
      const n = r[e];
      if (!n) continue;
      const t = Y.current.get(n.id);
      if (!t) continue;
      const i = `${Math.round(P ? kt(e) : _[e])}px`;
      t.style.top !== i && (t.style.top = i);
    }
  });
  const [E, Dt] = s.useState(0);
  s.useEffect(() => {
    const e = Q.current;
    if (!e) return;
    const n = () => {
      const i = e.scrollLeft > 0, a = e.scrollLeft + e.clientWidth < e.scrollWidth - 1;
      e.dataset.scrolledLeft = i ? "true" : "false", e.dataset.scrolledRight = a ? "true" : "false", Dt(e.clientWidth);
    };
    n(), e.addEventListener("scroll", n, { passive: !0 });
    const t = new ResizeObserver(n);
    return t.observe(e), () => {
      e.removeEventListener("scroll", n), t.disconnect();
    };
  }, []);
  const k = s.useMemo(
    () => c.filter((e) => !e.pinned),
    [c]
  ), Z = s.useMemo(() => {
    if (!m || m.length === 0) return null;
    const e = /* @__PURE__ */ new Map();
    for (const i of m)
      for (const a of i.columns)
        e.has(a) || e.set(a, i);
    const n = [];
    let t = 0;
    for (; t < k.length; ) {
      const i = k[t], a = e.get(i.accessorKey);
      if (!a) {
        n.push({
          kind: "placeholder",
          key: `middle-empty-${String(i.accessorKey)}`,
          col: i
        }), t += 1;
        continue;
      }
      let xe = 0;
      const Lt = t;
      for (; t < k.length && e.get(k[t].accessorKey) === a; )
        xe += V(k[t]), t += 1;
      n.push({
        // 같은 그룹이 여러 구간으로 갈라질 수 있으므로 key 는 구간 첫 컬럼 기준
        key: `group-${String(k[Lt].accessorKey)}`,
        kind: "group",
        width: xe,
        group: a
      });
    }
    return n;
  }, [k, m]), Re = Z !== null && Z.length > 0, Nt = O > 0 || c.some((e) => e.pinned === "left"), ee = Re ? 2 : 1, Ot = "bg-slate-100 dark:bg-slate-800", Wt = (l == null ? void 0 : l.showExpandAll) ?? !0, { leftPinnedCols: It, rightPinnedCols: Tt, lastLeftPinnedIdx: we, firstRightPinnedIdx: Ee } = s.useMemo(() => {
    const e = c.map((t, i) => ({ c: t, i })).filter(({ c: t }) => t.pinned === "left"), n = c.map((t, i) => ({ c: t, i })).filter(({ c: t }) => t.pinned === "right");
    return {
      leftPinnedCols: e,
      rightPinnedCols: n,
      lastLeftPinnedIdx: e.length ? e[e.length - 1].i : -1,
      firstRightPinnedIdx: n.length ? n[0].i : -1
    };
  }, [c]), Mt = c.length + (C ? 1 : 0) + (v ? 1 : 0) + (l ? 1 : 0) + (N ? 1 : 0), ke = /* @__PURE__ */ o(
    "div",
    {
      role: "grid",
      "aria-rowcount": r.length + ee,
      "aria-colcount": Mt,
      className: ne(
        // 항상 컨테이너 폭 유지. 리사이즈로 모든 컬럼 fixed 로 전환돼도 테이블 자체는 shrink 안 함.
        // 빈 영역은 셀 bg (SDS-42 에서 모든 셀에 headerBg 적용) 로 시각 커버.
        "w-full overflow-hidden bg-white dark:bg-slate-900",
        // flex 부모(TableContainer 등) 안에서 남은 높이를 받아 내부 스크롤이 생기도록 한다.
        // v1 은 스크롤 래퍼에 flex-1 이 있어서 TableContainer 안에서 자연히 스크롤됐다.
        // 이게 없으면 테이블이 내용 높이만큼 늘어나고 컨테이너의 overflow-hidden 에 잘려
        // 어디에서도 세로 스크롤이 안 된다. flex 부모가 아니면 무시되므로 단독 사용에는 영향 없음.
        "flex flex-col flex-1 min-h-0",
        $e && "rounded-2xl border border-slate-200 dark:border-slate-700",
        Ue
      ),
      children: /* @__PURE__ */ o(
        "div",
        {
          ref: Q,
          className: "overflow-auto group/scroll flex-1 min-h-0",
          style: { maxHeight: typeof $ == "number" ? `${$}px` : $ },
          "data-scrolled-left": "false",
          "data-scrolled-right": "false",
          children: /* @__PURE__ */ te("div", { style: { minWidth: fe }, children: [
            /* @__PURE__ */ o(
              At,
              {
                columns: c,
                hasFlexColumn: lt,
                headerGroupCells: Z,
                hasGroups: Re,
                headerRowCount: ee,
                hasPrecedingHeaderCells: Nt,
                leftPinnedCols: It,
                rightPinnedCols: Tt,
                lastLeftPinnedIdx: we,
                firstRightPinnedIdx: Ee,
                leftOffsets: ae,
                rightOffsets: he,
                getSortInfo: it,
                onSort: ot,
                filterState: H.filterState,
                getColumnFilter: H.getColumnFilter,
                hasActiveFilter: H.hasActiveFilter,
                onColumnFilterChange: H.setColumnFilter,
                resizable: R,
                resizingKey: nt,
                onResizeStart: tt,
                columnReorderable: D,
                reorderableIds: dt,
                rowReorderable: C,
                selectable: v,
                allSelected: x.allSelected,
                someSelected: x.someSelected,
                onToggleAll: x.toggleAll,
                hasExpandable: !!l,
                showExpandAll: Wt,
                allExpanded: W.allExpanded,
                onToggleExpandAll: W.toggleAll,
                showRowDelete: N,
                dragHandleColsWidth: M,
                rowActionsColLeftOffset: L,
                headerBg: Ot
              }
            ),
            se ? ie ? (
              // 커스텀 로딩 — 가로 스크롤 시 가시 영역 중앙에 표시
              /* @__PURE__ */ o(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: E ? { width: E } : void 0,
                  children: ie
                }
              )
            ) : He === "skeleton" ? (
              // 스켈레톤 — 각 컬럼 폭에 맞춰 셀 구조로 렌더
              /* @__PURE__ */ o("div", { children: Array.from({ length: sn }).map((e, n) => /* @__PURE__ */ te(
                "div",
                {
                  role: "row",
                  className: "flex border-b border-slate-200 dark:border-slate-700 min-h-9",
                  children: [
                    C && /* @__PURE__ */ o(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: F }
                      }
                    ),
                    v && /* @__PURE__ */ o(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: I },
                        children: /* @__PURE__ */ o(re, { width: 16, height: 16 })
                      }
                    ),
                    l && /* @__PURE__ */ o(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: K },
                        children: /* @__PURE__ */ o(re, { width: 16, height: 16 })
                      }
                    ),
                    N && /* @__PURE__ */ o(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: j }
                      }
                    ),
                    c.map((t) => {
                      const i = typeof t.width == "number" ? t.width : void 0, a = typeof t.minWidth == "number" ? t.minWidth : void 0;
                      return /* @__PURE__ */ o(
                        "div",
                        {
                          role: "gridcell",
                          className: ne(
                            "flex items-center px-3 py-1.5",
                            i === void 0 ? "flex-1" : "shrink-0"
                          ),
                          style: { width: i, minWidth: a },
                          children: /* @__PURE__ */ o(re, { height: 16, width: "70%" })
                        },
                        t.id ?? String(t.accessorKey)
                      );
                    })
                  ]
                },
                n
              )) })
            ) : (
              // 기본 splash — 가로 스크롤 시 가시 영역 중앙에 표시
              /* @__PURE__ */ o(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: E ? { width: E } : void 0,
                  children: /* @__PURE__ */ o($t, { size: "lg" })
                }
              )
            ) : r.length === 0 ? /* @__PURE__ */ o(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center min-h-32 py-8 text-sm text-slate-500 dark:text-slate-400",
                style: E ? { width: E } : void 0,
                children: _e
              }
            ) : (
              // 가상화 ON 시 컨테이너 높이 = virtualizer.totalSize, OFF 시 = positions 기반 totalHeight
              /* @__PURE__ */ o(
                "div",
                {
                  className: "relative",
                  style: { height: P ? xt : Ct },
                  children: (() => {
                    const e = Se.map((n) => {
                      var i, a;
                      const t = r[n];
                      return /* @__PURE__ */ o(
                        Jt,
                        {
                          row: t,
                          rowIndex: n,
                          columns: c,
                          leftOffsets: ae,
                          rightOffsets: he,
                          lastLeftPinnedIdx: we,
                          firstRightPinnedIdx: Ee,
                          totalWidth: fe,
                          registerEl: bt,
                          onHover: T ? vt : void 0,
                          onHeightChange: pt,
                          measureRef: P && ye ? ye.measureElement : void 0,
                          dataIndex: P ? n : void 0,
                          selectable: v,
                          isSelected: x.isSelected(t.id),
                          onToggleSelect: x.toggleRow,
                          checkboxColWidth: I,
                          expandable: !!l,
                          isExpanded: W.isExpanded(t.id),
                          canExpand: W.canExpand(t),
                          onToggleExpand: W.toggleRow,
                          expandedRowRender: l ? Je : void 0,
                          expandColWidth: K,
                          visibleWidth: E,
                          onRowClick: Ge,
                          extraClassName: A == null ? void 0 : A(t),
                          editingColumnKey: ((i = y.editing) == null ? void 0 : i.rowId) === t.id ? y.editing.columnKey : null,
                          editingError: ((a = y.editing) == null ? void 0 : a.rowId) === t.id ? y.editing.error : void 0,
                          onStartEdit: y.startEdit,
                          onCompleteEdit: y.completeEdit,
                          onCancelEdit: y.cancelEdit,
                          onClearEditError: y.clearError,
                          showRowDelete: N,
                          onRowDelete: Be,
                          rowActionsColWidth: j,
                          rowActionsColLeftOffset: L,
                          rowReorderable: C,
                          dragHandleColWidth: F,
                          isLast: n === r.length - 1,
                          getRowSpan: w,
                          getRowSpanHeight: Et,
                          getGroupHovered: yt,
                          getGroupSelected: wt,
                          ariaRowIndex: ee + n + 1
                        },
                        t.id
                      );
                    });
                    return C ? /* @__PURE__ */ o(
                      jt,
                      {
                        items: gt,
                        strategy: Vt,
                        children: e
                      }
                    ) : /* @__PURE__ */ o(Ht, { children: e });
                  })()
                }
              )
            ),
            Ae && !se && /* @__PURE__ */ te(
              "div",
              {
                role: "row",
                className: "flex bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                children: [
                  C && /* @__PURE__ */ o(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: { width: F, left: 0 }
                    }
                  ),
                  v && /* @__PURE__ */ o(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: I,
                        left: M
                      }
                    }
                  ),
                  l && /* @__PURE__ */ o(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: K,
                        left: M + (v ? I : 0)
                      }
                    }
                  ),
                  /* @__PURE__ */ o(
                    "div",
                    {
                      role: "gridcell",
                      className: ne(
                        "shrink-0 sticky z-10 flex items-center justify-center bg-white dark:bg-slate-900 min-h-9"
                      ),
                      style: { width: j, left: L },
                      children: /* @__PURE__ */ o(
                        "button",
                        {
                          type: "button",
                          onClick: () => U == null ? void 0 : U(),
                          className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                          "aria-label": "행 추가",
                          children: /* @__PURE__ */ o(Ut, { size: 20 })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ o("div", { role: "gridcell", "aria-hidden": !0, className: "flex-1 min-h-9" })
                ]
              }
            )
          ] })
        }
      )
    }
  );
  return D || C ? /* @__PURE__ */ o(
    Ft,
    {
      sensors: ct,
      collisionDetection: Kt,
      autoScroll: ut,
      onDragStart: at,
      onDragEnd: ht,
      onDragCancel: ft,
      children: ke
    }
  ) : ke;
}
export {
  Wn as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
