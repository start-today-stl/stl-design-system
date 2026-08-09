import { jsx as o, jsxs as te, Fragment as Lt } from "react/jsx-runtime";
import * as s from "react";
import { useSensors as Ht, useSensor as _t, PointerSensor as zt, DndContext as Pt, closestCenter as Ft } from "@dnd-kit/core";
import { SortableContext as Kt, verticalListSortingStrategy as jt } from "@dnd-kit/sortable";
import { cn as ne } from "../../../lib/utils.mjs";
import { Skeleton as re } from "../../ui/skeleton.mjs";
import { SplashScreen as Vt } from "../../ui/splash-screen.mjs";
import { RowAddIcon as $t } from "../../../icons/RowAddIcon.mjs";
import { DataTableV2Header as Ut } from "./data-table-v2-header.mjs";
import { DRAG_HANDLE_COL_WIDTH as F, CHECKBOX_COL_WIDTH as I, EXPAND_COL_WIDTH as K, ROW_ACTIONS_WIDTH as j, DEFAULT_COL_WIDTH as At } from "./constants.mjs";
import { useFilter as Bt } from "./hooks/use-filter.mjs";
import { useRowReorder as Gt } from "./hooks/use-row-reorder.mjs";
import { DataTableV2Row as Xt } from "./data-table-v2-row.mjs";
import { useCellEdit as Jt } from "./hooks/use-cell-edit.mjs";
import { useColumnResize as qt } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as Qt } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as Yt } from "./hooks/use-row-expansion.mjs";
import { useRowGrouping as Zt } from "./hooks/use-row-grouping.mjs";
import { useRowSelection as en } from "./hooks/use-row-selection.mjs";
import { useStableCallback as f } from "./hooks/use-stable-callback.mjs";
import { useTableVirtualizer as tn } from "./hooks/use-table-virtualizer.mjs";
const nn = 40, rn = 5, sn = { activationConstraint: { distance: 5 } };
function on(r, h, m) {
  const p = r.find((g) => g.column === h);
  return m ? p ? p.direction === "asc" ? r.map(
    (g) => g.column === h ? { column: h, direction: "desc" } : g
  ) : r.filter((g) => g.column !== h) : [...r, { column: h, direction: "asc" }] : p ? p.direction === "asc" ? [{ column: h, direction: "desc" }] : [] : [{ column: h, direction: "asc" }];
}
function ln(r, h = 0, m = 0) {
  const p = new Array(r.length).fill(-1), g = new Array(r.length).fill(-1);
  let S = h;
  for (let u = 0; u < r.length; u++)
    r[u].pinned === "left" && (p[u] = S, S += V(r[u]));
  let R = m;
  for (let u = r.length - 1; u >= 0; u--)
    r[u].pinned === "right" && (g[u] = R, R += V(r[u]));
  return { left: p, right: g };
}
function V(r) {
  return typeof r.width == "number" ? r.width : typeof r.minWidth == "number" ? r.minWidth : At;
}
function dn(r) {
  return r.reduce((h, m) => h + V(m), 0);
}
function On({
  data: r,
  columns: h,
  headerGroups: m,
  sortState: p,
  onSortChange: g,
  multiSort: S = !1,
  resizable: R = !1,
  columnWidths: u,
  onColumnResize: De,
  columnReorderable: N = !1,
  columnOrder: Ne,
  onColumnReorder: Oe,
  selectable: v = !1,
  selectedIds: We,
  defaultSelectedIds: Ie,
  onSelectionChange: Te,
  onRowClick: Me,
  rowClassName: Le,
  expandable: l,
  onCellChange: He,
  rowActions: d,
  loading: se = !1,
  loadingMode: _e = "splash",
  loadingContent: ie,
  emptyMessage: ze = "데이터가 없습니다.",
  rowReorderable: Pe = !1,
  onRowReorder: Fe,
  filterState: Ke,
  defaultFilterState: je,
  onFilterChange: Ve,
  maxHeight: $,
  estimateRowHeight: oe = nn,
  rowGrouping: T,
  virtual: $e,
  className: Ue
}) {
  const C = T ? !1 : Pe, O = (d == null ? void 0 : d.showDelete) ?? !!(d != null && d.onRowDelete), Ae = (d == null ? void 0 : d.showAdd) ?? !!(d != null && d.onRowAdd), Be = f(d == null ? void 0 : d.onRowDelete), U = f(d == null ? void 0 : d.onRowAdd), Ge = f(Me), A = f(Le), Xe = f(He), le = f(l == null ? void 0 : l.expandedRowRender), Je = f(Te), B = f(g), qe = f(Ve), Qe = f(De), Ye = f(Oe), Ze = f(Fe), de = f(l == null ? void 0 : l.onExpandedChange), { orderedColumns: G, handleColumnDragEnd: ce } = Qt({
    columns: h,
    columnReorderable: N,
    columnOrder: Ne,
    onColumnReorder: Ye
  }), { getColumnWidth: ae, handleResizeStart: et, resizingKey: tt } = qt({
    resizable: R,
    columnWidths: u,
    onColumnResize: Qe
  }), c = s.useMemo(() => R ? G.map((e) => {
    const n = ae(e);
    return n !== void 0 ? { ...e, width: n } : e;
  }) : G, [G, R, ae]), M = C ? F : 0, L = M + (v ? I : 0) + (l ? K : 0), W = L + (O ? j : 0), { left: he, right: ue } = s.useMemo(
    () => ln(c, W),
    [c, W]
  ), fe = s.useMemo(
    () => dn(c) + W,
    [c, W]
  ), x = en({
    data: r,
    selectable: v,
    selectedIds: We,
    defaultSelectedIds: Ie,
    onSelectionChange: Je
  }), nt = s.useMemo(
    () => l ? { ...l, onExpandedChange: de } : void 0,
    [l, de]
  ), b = Yt({ data: r, expandable: nt }), y = Jt({ onCellChange: Xe }), { handleRowDragEnd: ge } = Gt({ data: r, onRowReorder: Ze }), { rowSpanMap: rt, getRowSpan: w } = Zt({ data: r, rowGrouping: T }), H = Bt({ filterState: Ke, defaultFilterState: je, onFilterChange: qe }), D = s.useMemo(
    () => p ?? [],
    [p]
  ), st = s.useCallback(
    (e) => {
      const n = D.findIndex((i) => i.column === e);
      return n < 0 ? { direction: null, priority: void 0 } : {
        direction: D[n].direction,
        priority: S && D.length > 1 ? n + 1 : void 0
      };
    },
    [D, S]
  ), me = s.useRef(D);
  me.current = D;
  const pe = s.useRef(S);
  pe.current = S;
  const it = s.useCallback(
    (e) => {
      B && B(
        on(me.current, e, pe.current)
      );
    },
    [B]
  ), ot = s.useMemo(
    () => c.some((e) => typeof e.width != "number"),
    [c]
  ), lt = s.useMemo(
    () => N ? c.filter((e) => !e.pinned).map((e) => String(e.accessorKey)) : [],
    [c, N]
  ), dt = Ht(_t(zt, sn)), [Ce, X] = s.useState(null), ct = s.useCallback((e) => {
    X(String(e.active.id).startsWith("row-") ? "row" : "column");
  }, []), at = s.useCallback(
    (e) => {
      X(null), String(e.active.id).startsWith("row-") ? ge(e) : ce(e);
    },
    [ce, ge]
  ), ht = s.useCallback(() => X(null), []), ut = s.useMemo(
    () => Ce === "row" ? { threshold: { x: 0, y: 0.2 } } : { threshold: { x: 0.2, y: 0 } },
    [Ce]
  ), ft = s.useMemo(
    () => C ? r.map((e) => `row-${e.id}`) : [],
    [r, C]
  ), [ve, gt] = s.useState(/* @__PURE__ */ new Map()), mt = s.useCallback((e, n) => {
    gt((t) => {
      if (t.get(e) === n) return t;
      const i = new Map(t);
      return i.set(e, n), i;
    });
  }, []), _ = s.useMemo(() => {
    const e = new Array(r.length + 1);
    e[0] = 0;
    for (let n = 0; n < r.length; n++) {
      const t = ve.get(r[n].id) ?? oe;
      e[n + 1] = e[n] + t;
    }
    return e;
  }, [r, ve, oe]), pt = _[r.length], [J, Ct] = s.useState(null), z = s.useMemo(() => J === null ? -1 : r.findIndex((e) => e.id === J), [J, r]), vt = s.useCallback(
    (e, n) => {
      if (z < 0) return !1;
      const t = w(e, n);
      return t === void 0 || t <= 1 ? !1 : z >= e && z < e + t;
    },
    [z, w]
  ), ye = x.selectedSet, yt = s.useCallback(
    (e, n) => {
      const t = w(e, n);
      if (t === void 0 || t <= 1) return !1;
      for (let i = e; i < e + t; i++) {
        const a = r[i];
        if (a && ye.has(a.id)) return !0;
      }
      return !1;
    },
    [w, r, ye]
  ), St = s.useCallback(() => !1, []), Rt = T ? yt : St, q = s.useRef(_);
  q.current = _;
  const wt = s.useCallback(
    (e, n) => {
      const t = w(e, n);
      if (!(t === void 0 || t <= 1))
        return q.current[e + t] - q.current[e];
    },
    [w]
  ), Q = s.useRef(null), {
    isVirtual: P,
    virtualizer: Se,
    renderIndices: Re,
    getItemStart: Et,
    totalSize: kt
  } = tn({
    virtual: $e,
    count: r.length,
    scrollContainerRef: Q,
    rowSpanMap: rt
  }), Y = s.useRef(/* @__PURE__ */ new Map()), xt = s.useCallback(
    (e, n) => {
      n ? Y.current.set(e, n) : Y.current.delete(e);
    },
    []
  );
  s.useLayoutEffect(() => {
    for (const e of Re) {
      const n = r[e];
      if (!n) continue;
      const t = Y.current.get(n.id);
      if (!t) continue;
      const i = `${Math.round(P ? Et(e) : _[e])}px`;
      t.style.top !== i && (t.style.top = i);
    }
  });
  const [E, bt] = s.useState(0);
  s.useEffect(() => {
    const e = Q.current;
    if (!e) return;
    const n = () => {
      const i = e.scrollLeft > 0, a = e.scrollLeft + e.clientWidth < e.scrollWidth - 1;
      e.dataset.scrolledLeft = i ? "true" : "false", e.dataset.scrolledRight = a ? "true" : "false", bt(e.clientWidth);
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
      let be = 0;
      const Mt = t;
      for (; t < k.length && e.get(k[t].accessorKey) === a; )
        be += V(k[t]), t += 1;
      n.push({
        // 같은 그룹이 여러 구간으로 갈라질 수 있으므로 key 는 구간 첫 컬럼 기준
        key: `group-${String(k[Mt].accessorKey)}`,
        kind: "group",
        width: be,
        group: a
      });
    }
    return n;
  }, [k, m]), we = Z !== null && Z.length > 0, Dt = W > 0 || c.some((e) => e.pinned === "left"), ee = we ? 2 : 1, Nt = "bg-slate-100 dark:bg-slate-800", Ot = (l == null ? void 0 : l.showExpandAll) ?? !0, { leftPinnedCols: Wt, rightPinnedCols: It, lastLeftPinnedIdx: Ee, firstRightPinnedIdx: ke } = s.useMemo(() => {
    const e = c.map((t, i) => ({ c: t, i })).filter(({ c: t }) => t.pinned === "left"), n = c.map((t, i) => ({ c: t, i })).filter(({ c: t }) => t.pinned === "right");
    return {
      leftPinnedCols: e,
      rightPinnedCols: n,
      lastLeftPinnedIdx: e.length ? e[e.length - 1].i : -1,
      firstRightPinnedIdx: n.length ? n[0].i : -1
    };
  }, [c]), Tt = c.length + (C ? 1 : 0) + (v ? 1 : 0) + (l ? 1 : 0) + (O ? 1 : 0), xe = /* @__PURE__ */ o(
    "div",
    {
      role: "grid",
      "aria-rowcount": r.length + ee,
      "aria-colcount": Tt,
      className: ne(
        // 항상 컨테이너 폭 유지. 리사이즈로 모든 컬럼 fixed 로 전환돼도 테이블 자체는 shrink 안 함.
        // 빈 영역은 셀 bg (SDS-42 에서 모든 셀에 headerBg 적용) 로 시각 커버.
        "w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        Ue
      ),
      children: /* @__PURE__ */ o(
        "div",
        {
          ref: Q,
          className: "overflow-auto group/scroll",
          style: { maxHeight: typeof $ == "number" ? `${$}px` : $ },
          "data-scrolled-left": "false",
          "data-scrolled-right": "false",
          children: /* @__PURE__ */ te("div", { style: { minWidth: fe }, children: [
            /* @__PURE__ */ o(
              Ut,
              {
                columns: c,
                hasFlexColumn: ot,
                headerGroupCells: Z,
                hasGroups: we,
                headerRowCount: ee,
                hasPrecedingHeaderCells: Dt,
                leftPinnedCols: Wt,
                rightPinnedCols: It,
                lastLeftPinnedIdx: Ee,
                firstRightPinnedIdx: ke,
                leftOffsets: he,
                rightOffsets: ue,
                getSortInfo: st,
                onSort: it,
                filterState: H.filterState,
                getColumnFilter: H.getColumnFilter,
                hasActiveFilter: H.hasActiveFilter,
                onColumnFilterChange: H.setColumnFilter,
                resizable: R,
                resizingKey: tt,
                onResizeStart: et,
                columnReorderable: N,
                reorderableIds: lt,
                rowReorderable: C,
                selectable: v,
                allSelected: x.allSelected,
                someSelected: x.someSelected,
                onToggleAll: x.toggleAll,
                hasExpandable: !!l,
                showExpandAll: Ot,
                allExpanded: b.allExpanded,
                onToggleExpandAll: b.toggleAll,
                showRowDelete: O,
                dragHandleColsWidth: M,
                rowActionsColLeftOffset: L,
                headerBg: Nt
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
            ) : _e === "skeleton" ? (
              // 스켈레톤 — 각 컬럼 폭에 맞춰 셀 구조로 렌더
              /* @__PURE__ */ o("div", { children: Array.from({ length: rn }).map((e, n) => /* @__PURE__ */ te(
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
                    O && /* @__PURE__ */ o(
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
                  children: /* @__PURE__ */ o(Vt, { size: "lg" })
                }
              )
            ) : r.length === 0 ? /* @__PURE__ */ o(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center min-h-32 py-8 text-sm text-slate-500 dark:text-slate-400",
                style: E ? { width: E } : void 0,
                children: ze
              }
            ) : (
              // 가상화 ON 시 컨테이너 높이 = virtualizer.totalSize, OFF 시 = positions 기반 totalHeight
              /* @__PURE__ */ o(
                "div",
                {
                  className: "relative",
                  style: { height: P ? kt : pt },
                  children: (() => {
                    const e = Re.map((n) => {
                      var i, a;
                      const t = r[n];
                      return /* @__PURE__ */ o(
                        Xt,
                        {
                          row: t,
                          rowIndex: n,
                          columns: c,
                          leftOffsets: he,
                          rightOffsets: ue,
                          lastLeftPinnedIdx: Ee,
                          firstRightPinnedIdx: ke,
                          totalWidth: fe,
                          registerEl: xt,
                          onHover: T ? Ct : void 0,
                          onHeightChange: mt,
                          measureRef: P && Se ? Se.measureElement : void 0,
                          dataIndex: P ? n : void 0,
                          selectable: v,
                          isSelected: x.isSelected(t.id),
                          onToggleSelect: x.toggleRow,
                          checkboxColWidth: I,
                          expandable: !!l,
                          isExpanded: b.isExpanded(t.id),
                          canExpand: b.canExpand(t),
                          onToggleExpand: b.toggleRow,
                          expandedContent: l && b.isExpanded(t.id) && le ? le(t) : null,
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
                          showRowDelete: O,
                          onRowDelete: Be,
                          rowActionsColWidth: j,
                          rowActionsColLeftOffset: L,
                          rowReorderable: C,
                          dragHandleColWidth: F,
                          isLast: n === r.length - 1,
                          getRowSpan: w,
                          getRowSpanHeight: wt,
                          getGroupHovered: vt,
                          getGroupSelected: Rt,
                          ariaRowIndex: ee + n + 1
                        },
                        t.id
                      );
                    });
                    return C ? /* @__PURE__ */ o(
                      Kt,
                      {
                        items: ft,
                        strategy: jt,
                        children: e
                      }
                    ) : /* @__PURE__ */ o(Lt, { children: e });
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
                          children: /* @__PURE__ */ o($t, { size: 20 })
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
  return N || C ? /* @__PURE__ */ o(
    Pt,
    {
      sensors: dt,
      collisionDetection: Ft,
      autoScroll: ut,
      onDragStart: ct,
      onDragEnd: at,
      onDragCancel: ht,
      children: xe
    }
  ) : xe;
}
export {
  On as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
