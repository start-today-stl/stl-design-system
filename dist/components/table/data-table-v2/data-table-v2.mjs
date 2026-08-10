import { jsx as i, jsxs as ie, Fragment as Vt } from "react/jsx-runtime";
import * as s from "react";
import { useSensors as $t, useSensor as Bt, PointerSensor as Gt, DndContext as At, closestCenter as Ut } from "@dnd-kit/core";
import { SortableContext as Xt, verticalListSortingStrategy as qt } from "@dnd-kit/sortable";
import { cn as le } from "../../../lib/utils.mjs";
import { Skeleton as ce } from "../../ui/skeleton.mjs";
import { SplashScreen as Jt } from "../../ui/splash-screen.mjs";
import { RowAddIcon as Qt } from "../../../icons/RowAddIcon.mjs";
import { DataTableV2Header as Yt } from "./data-table-v2-header.mjs";
import { DRAG_HANDLE_COL_WIDTH as B, CHECKBOX_COL_WIDTH as T, EXPAND_COL_WIDTH as G, ROW_ACTIONS_WIDTH as A, DEFAULT_COL_WIDTH as Zt } from "./constants.mjs";
import { useFilter as en } from "./hooks/use-filter.mjs";
import { useRowReorder as tn } from "./hooks/use-row-reorder.mjs";
import { DataTableV2Row as nn } from "./data-table-v2-row.mjs";
import { useCellEdit as rn } from "./hooks/use-cell-edit.mjs";
import { useColumnResize as sn } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as on } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as ln } from "./hooks/use-row-expansion.mjs";
import { useRowGrouping as cn } from "./hooks/use-row-grouping.mjs";
import { useRowSelection as dn } from "./hooks/use-row-selection.mjs";
import { useStableCallback as f } from "./hooks/use-stable-callback.mjs";
import { useTableVirtualizer as an } from "./hooks/use-table-virtualizer.mjs";
const hn = 40, un = 5, fn = { activationConstraint: { distance: 5 } };
function gn(r, h, m) {
  const C = r.find((g) => g.column === h);
  return m ? C ? C.direction === "asc" ? r.map(
    (g) => g.column === h ? { column: h, direction: "desc" } : g
  ) : r.filter((g) => g.column !== h) : [...r, { column: h, direction: "asc" }] : C ? C.direction === "asc" ? [{ column: h, direction: "desc" }] : [] : [{ column: h, direction: "asc" }];
}
function mn(r, h = 0, m = 0, C = U) {
  const g = new Array(r.length).fill(-1), w = new Array(r.length).fill(-1);
  let R = h;
  for (let u = 0; u < r.length; u++)
    r[u].pinned === "left" && (g[u] = R, R += C(r[u]));
  let D = m;
  for (let u = r.length - 1; u >= 0; u--)
    r[u].pinned === "right" && (w[u] = D, D += C(r[u]));
  return { left: g, right: w };
}
function U(r) {
  return typeof r.width == "number" ? r.width : typeof r.minWidth == "number" ? r.minWidth : Zt;
}
function Cn(r) {
  return r.reduce((h, m) => h + U(m), 0);
}
function zn({
  data: r,
  columns: h,
  headerGroups: m,
  sortState: C,
  onSortChange: g,
  multiSort: w = !1,
  resizable: R = !1,
  columnWidths: D,
  onColumnResize: u,
  columnReorderable: N = !1,
  columnOrder: Me,
  onColumnReorder: Te,
  selectable: y = !1,
  selectedIds: Le,
  defaultSelectedIds: He,
  onSelectionChange: _e,
  onRowClick: ze,
  rowClassName: Ke,
  expandable: c,
  onCellChange: Pe,
  rowActions: a,
  loading: de = !1,
  loadingMode: Fe = "splash",
  loadingContent: ae,
  emptyMessage: je = "데이터가 없습니다.",
  rowReorderable: Ve = !1,
  onRowReorder: $e,
  filterState: Be,
  defaultFilterState: Ge,
  onFilterChange: Ae,
  maxHeight: X,
  estimateRowHeight: he = hn,
  rowGrouping: L,
  virtual: Ue,
  bordered: Xe = !0,
  className: qe
}) {
  const p = L ? !1 : Ve, O = (a == null ? void 0 : a.showDelete) ?? !!(a != null && a.onRowDelete), Je = (a == null ? void 0 : a.showAdd) ?? !!(a != null && a.onRowAdd), Qe = f(a == null ? void 0 : a.onRowDelete), q = f(a == null ? void 0 : a.onRowAdd), Ye = f(ze), J = f(Ke), Ze = f(Pe), et = f(c == null ? void 0 : c.expandedRowRender), tt = f(_e), Q = f(g), nt = f(Ae), rt = f(u), st = f(Te), ot = f($e), ue = f(c == null ? void 0 : c.onExpandedChange), { orderedColumns: Y, handleColumnDragEnd: fe } = on({
    columns: h,
    columnReorderable: N,
    columnOrder: Me,
    onColumnReorder: st
  }), { getColumnWidth: ge, handleResizeStart: it, resizingKey: lt } = sn({
    resizable: R,
    columnWidths: D,
    onColumnResize: rt
  }), d = s.useMemo(() => R ? Y.map((e) => {
    const n = ge(e);
    return n !== void 0 ? { ...e, width: n } : e;
  }) : Y, [Y, R, ge]), H = p ? B : 0, _ = H + (y ? T : 0) + (c ? G : 0), I = _ + (O ? A : 0), [me, ct] = s.useState({}), Ce = s.useCallback(
    (e) => me[String(e.accessorKey)] ?? U(e),
    [me]
  ), { left: pe, right: ye } = s.useMemo(
    () => mn(d, I, 0, Ce),
    [d, I, Ce]
  ), ve = s.useMemo(
    () => Cn(d) + I,
    [d, I]
  ), x = dn({
    data: r,
    selectable: y,
    selectedIds: Le,
    defaultSelectedIds: He,
    onSelectionChange: tt
  }), dt = s.useMemo(
    () => c ? { ...c, onExpandedChange: ue } : void 0,
    [c, ue]
  ), M = ln({ data: r, expandable: dt }), v = rn({ onCellChange: Ze }), { handleRowDragEnd: Se } = tn({ data: r, onRowReorder: ot }), { rowSpanMap: at, getRowSpan: k } = cn({ data: r, rowGrouping: L }), z = en({ filterState: Be, defaultFilterState: Ge, onFilterChange: nt }), b = s.useMemo(
    () => C ?? [],
    [C]
  ), ht = s.useCallback(
    (e) => {
      const n = b.findIndex((o) => o.column === e);
      return n < 0 ? { direction: null, priority: void 0 } : {
        direction: b[n].direction,
        priority: w && b.length > 1 ? n + 1 : void 0
      };
    },
    [b, w]
  ), we = s.useRef(b);
  we.current = b;
  const Re = s.useRef(w);
  Re.current = w;
  const ut = s.useCallback(
    (e) => {
      Q && Q(
        gn(we.current, e, Re.current)
      );
    },
    [Q]
  ), ft = s.useMemo(
    () => d.some((e) => typeof e.width != "number"),
    [d]
  ), gt = s.useMemo(
    () => N ? d.filter((e) => !e.pinned).map((e) => String(e.accessorKey)) : [],
    [d, N]
  ), mt = $t(Bt(Gt, fn)), [ke, Z] = s.useState(null), Ct = s.useCallback((e) => {
    Z(String(e.active.id).startsWith("row-") ? "row" : "column");
  }, []), pt = s.useCallback(
    (e) => {
      Z(null), String(e.active.id).startsWith("row-") ? Se(e) : fe(e);
    },
    [fe, Se]
  ), yt = s.useCallback(() => Z(null), []), vt = s.useMemo(
    () => ke === "row" ? { threshold: { x: 0, y: 0.2 } } : { threshold: { x: 0.2, y: 0 } },
    [ke]
  ), St = s.useMemo(
    () => p ? r.map((e) => `row-${e.id}`) : [],
    [r, p]
  ), [Ee, wt] = s.useState(/* @__PURE__ */ new Map()), Rt = s.useCallback((e, n) => {
    wt((t) => {
      if (t.get(e) === n) return t;
      const o = new Map(t);
      return o.set(e, n), o;
    });
  }, []), K = s.useMemo(() => {
    const e = new Array(r.length + 1);
    e[0] = 0;
    for (let n = 0; n < r.length; n++) {
      const t = Ee.get(r[n].id) ?? he;
      e[n + 1] = e[n] + t;
    }
    return e;
  }, [r, Ee, he]), kt = K[r.length], [ee, Et] = s.useState(null), P = s.useMemo(() => ee === null ? -1 : r.findIndex((e) => e.id === ee), [ee, r]), xt = s.useCallback(
    (e, n) => {
      if (P < 0) return !1;
      const t = k(e, n);
      return t === void 0 || t <= 1 ? !1 : P >= e && P < e + t;
    },
    [P, k]
  ), xe = x.selectedSet, bt = s.useCallback(
    (e, n) => {
      const t = k(e, n);
      if (t === void 0 || t <= 1) return !1;
      for (let o = e; o < e + t; o++) {
        const l = r[o];
        if (l && xe.has(l.id)) return !0;
      }
      return !1;
    },
    [k, r, xe]
  ), Wt = s.useCallback(() => !1, []), Dt = L ? bt : Wt, te = s.useRef(K);
  te.current = K;
  const Nt = s.useCallback(
    (e, n) => {
      const t = k(e, n);
      if (!(t === void 0 || t <= 1))
        return te.current[e + t] - te.current[e];
    },
    [k]
  ), F = s.useRef(null), Ot = s.useCallback(
    (e) => {
      var n;
      return ((n = r[e]) == null ? void 0 : n.id) ?? e;
    },
    [r]
  ), {
    isVirtual: j,
    virtualizer: be,
    renderIndices: We,
    getItemStart: It,
    totalSize: Mt
  } = an({
    virtual: Ue,
    count: r.length,
    scrollContainerRef: F,
    rowSpanMap: at,
    // 측정한 행 높이를 행 id 기준으로 기억한다. 인덱스 기준이면 필터/정렬로 데이터가
    // 바뀔 때 그 자리에 이전 행 높이가 남아, 확장행이 있던 자리에 빈 공간이 생긴다.
    getItemKey: Ot
  }), ne = s.useRef(/* @__PURE__ */ new Map()), Tt = s.useCallback(
    (e, n) => {
      n ? ne.current.set(e, n) : ne.current.delete(e);
    },
    []
  );
  s.useLayoutEffect(() => {
    for (const e of We) {
      const n = r[e];
      if (!n) continue;
      const t = ne.current.get(n.id);
      if (!t) continue;
      const o = `${Math.round(j ? It(e) : K[e])}px`;
      t.style.top !== o && (t.style.top = o);
    }
  });
  const [S, Lt] = s.useState(0);
  s.useLayoutEffect(() => {
    const e = F.current;
    if (!e) return;
    const n = e.querySelectorAll(
      '[role="columnheader"][data-column-key]'
    );
    if (n.length === 0) return;
    const t = {};
    n.forEach((o) => {
      const l = o.dataset.columnKey;
      l && (t[l] = o.getBoundingClientRect().width);
    }), ct((o) => {
      const l = Object.keys(t);
      return l.length === Object.keys(o).length && l.every((W) => Math.abs((o[W] ?? -1) - t[W]) < 0.5) ? o : t;
    });
  }, [d, D, S]), s.useEffect(() => {
    const e = F.current;
    if (!e) return;
    const n = () => {
      const o = e.scrollLeft > 0, l = e.scrollLeft + e.clientWidth < e.scrollWidth - 1;
      e.dataset.scrolledLeft = o ? "true" : "false", e.dataset.scrolledRight = l ? "true" : "false", Lt(e.clientWidth);
    };
    n(), e.addEventListener("scroll", n, { passive: !0 });
    const t = new ResizeObserver(n);
    return t.observe(e), () => {
      e.removeEventListener("scroll", n), t.disconnect();
    };
  }, []);
  const E = s.useMemo(
    () => d.filter((e) => !e.pinned),
    [d]
  ), re = s.useMemo(() => {
    if (!m || m.length === 0) return null;
    const e = /* @__PURE__ */ new Map();
    for (const o of m)
      for (const l of o.columns)
        e.has(l) || e.set(l, o);
    const n = [];
    let t = 0;
    for (; t < E.length; ) {
      const o = E[t], l = e.get(o.accessorKey);
      if (!l) {
        n.push({
          kind: "placeholder",
          key: `middle-empty-${String(o.accessorKey)}`,
          col: o
        }), t += 1;
        continue;
      }
      let V = 0, W = 0, oe = 0;
      const jt = t;
      for (; t < E.length && e.get(E[t].accessorKey) === l; ) {
        const $ = E[t];
        typeof $.width == "number" ? (V += $.width, oe += $.width) : (W += 1, oe += U($)), t += 1;
      }
      n.push({
        // 같은 그룹이 여러 구간으로 갈라질 수 있으므로 key 는 구간 첫 컬럼 기준
        key: `group-${String(E[jt].accessorKey)}`,
        kind: "group",
        width: W === 0 ? V : void 0,
        flexGrow: W,
        // 고정폭 컬럼이 섞인 그룹은 그만큼을 flex-basis 로 깔아야 한다.
        // basis 0 으로 두면 고정폭 몫이 빠져서 그룹 행이 그만큼 짧아진다.
        flexBasis: V,
        minWidth: oe,
        group: l
      });
    }
    return n;
  }, [E, m]), De = re !== null && re.length > 0, Ht = I > 0 || d.some((e) => e.pinned === "left"), se = De ? 2 : 1, _t = "bg-slate-100 dark:bg-slate-800", zt = (c == null ? void 0 : c.showExpandAll) ?? !0, { leftPinnedCols: Kt, rightPinnedCols: Pt, lastLeftPinnedIdx: Ne, firstRightPinnedIdx: Oe } = s.useMemo(() => {
    const e = d.map((t, o) => ({ c: t, i: o })).filter(({ c: t }) => t.pinned === "left"), n = d.map((t, o) => ({ c: t, i: o })).filter(({ c: t }) => t.pinned === "right");
    return {
      leftPinnedCols: e,
      rightPinnedCols: n,
      lastLeftPinnedIdx: e.length ? e[e.length - 1].i : -1,
      firstRightPinnedIdx: n.length ? n[0].i : -1
    };
  }, [d]), Ft = d.length + (p ? 1 : 0) + (y ? 1 : 0) + (c ? 1 : 0) + (O ? 1 : 0), Ie = /* @__PURE__ */ i(
    "div",
    {
      role: "grid",
      "aria-rowcount": r.length + se,
      "aria-colcount": Ft,
      className: le(
        // 항상 컨테이너 폭 유지. 리사이즈로 모든 컬럼 fixed 로 전환돼도 테이블 자체는 shrink 안 함.
        // 빈 영역은 셀 bg (SDS-42 에서 모든 셀에 headerBg 적용) 로 시각 커버.
        "w-full overflow-hidden bg-white dark:bg-slate-900",
        // flex 부모(TableContainer 등) 안에서 남은 높이를 받아 내부 스크롤이 생기도록 한다.
        // v1 은 스크롤 래퍼에 flex-1 이 있어서 TableContainer 안에서 자연히 스크롤됐다.
        // 이게 없으면 테이블이 내용 높이만큼 늘어나고 컨테이너의 overflow-hidden 에 잘려
        // 어디에서도 세로 스크롤이 안 된다. flex 부모가 아니면 무시되므로 단독 사용에는 영향 없음.
        "flex flex-col flex-1 min-h-0",
        Xe && "rounded-2xl border border-slate-200 dark:border-slate-700",
        qe
      ),
      children: /* @__PURE__ */ i(
        "div",
        {
          ref: F,
          className: "overflow-auto group/scroll flex-1 min-h-0",
          style: { maxHeight: typeof X == "number" ? `${X}px` : X },
          "data-scrolled-left": "false",
          "data-scrolled-right": "false",
          children: /* @__PURE__ */ ie("div", { style: { minWidth: ve }, children: [
            /* @__PURE__ */ i(
              Yt,
              {
                columns: d,
                hasFlexColumn: ft,
                headerGroupCells: re,
                hasGroups: De,
                headerRowCount: se,
                hasPrecedingHeaderCells: Ht,
                leftPinnedCols: Kt,
                rightPinnedCols: Pt,
                lastLeftPinnedIdx: Ne,
                firstRightPinnedIdx: Oe,
                leftOffsets: pe,
                rightOffsets: ye,
                getSortInfo: ht,
                onSort: ut,
                filterState: z.filterState,
                getColumnFilter: z.getColumnFilter,
                hasActiveFilter: z.hasActiveFilter,
                onColumnFilterChange: z.setColumnFilter,
                resizable: R,
                resizingKey: lt,
                onResizeStart: it,
                columnReorderable: N,
                reorderableIds: gt,
                rowReorderable: p,
                selectable: y,
                allSelected: x.allSelected,
                someSelected: x.someSelected,
                onToggleAll: x.toggleAll,
                hasExpandable: !!c,
                showExpandAll: zt,
                allExpanded: M.allExpanded,
                onToggleExpandAll: M.toggleAll,
                showRowDelete: O,
                dragHandleColsWidth: H,
                rowActionsColLeftOffset: _,
                headerBg: _t
              }
            ),
            de ? ae ? (
              // 커스텀 로딩 — 가로 스크롤 시 가시 영역 중앙에 표시
              /* @__PURE__ */ i(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: S ? { width: S } : void 0,
                  children: ae
                }
              )
            ) : Fe === "skeleton" ? (
              // 스켈레톤 — 각 컬럼 폭에 맞춰 셀 구조로 렌더
              /* @__PURE__ */ i("div", { children: Array.from({ length: un }).map((e, n) => /* @__PURE__ */ ie(
                "div",
                {
                  role: "row",
                  className: "flex border-b border-slate-200 dark:border-slate-700 min-h-9",
                  children: [
                    p && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: B }
                      }
                    ),
                    y && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: T },
                        children: /* @__PURE__ */ i(ce, { width: 16, height: 16 })
                      }
                    ),
                    c && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: G },
                        children: /* @__PURE__ */ i(ce, { width: 16, height: 16 })
                      }
                    ),
                    O && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: A }
                      }
                    ),
                    d.map((t) => {
                      const o = typeof t.width == "number" ? t.width : void 0, l = typeof t.minWidth == "number" ? t.minWidth : void 0;
                      return /* @__PURE__ */ i(
                        "div",
                        {
                          role: "gridcell",
                          className: le(
                            "flex items-center px-3 py-1.5",
                            o === void 0 ? "flex-1" : "shrink-0"
                          ),
                          style: { width: o, minWidth: l },
                          children: /* @__PURE__ */ i(ce, { height: 16, width: "70%" })
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
              /* @__PURE__ */ i(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: S ? { width: S } : void 0,
                  children: /* @__PURE__ */ i(Jt, { size: "lg" })
                }
              )
            ) : r.length === 0 ? /* @__PURE__ */ i(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center min-h-32 py-8 text-sm text-slate-500 dark:text-slate-400",
                style: S ? { width: S } : void 0,
                children: je
              }
            ) : (
              // 가상화 ON 시 컨테이너 높이 = virtualizer.totalSize, OFF 시 = positions 기반 totalHeight
              /* @__PURE__ */ i(
                "div",
                {
                  className: "relative",
                  style: { height: j ? Mt : kt },
                  children: (() => {
                    const e = We.map((n) => {
                      var o, l;
                      const t = r[n];
                      return /* @__PURE__ */ i(
                        nn,
                        {
                          row: t,
                          rowIndex: n,
                          columns: d,
                          leftOffsets: pe,
                          rightOffsets: ye,
                          lastLeftPinnedIdx: Ne,
                          firstRightPinnedIdx: Oe,
                          totalWidth: ve,
                          registerEl: Tt,
                          onHover: L ? Et : void 0,
                          onHeightChange: Rt,
                          measureRef: j && be ? be.measureElement : void 0,
                          dataIndex: j ? n : void 0,
                          selectable: y,
                          isSelected: x.isSelected(t.id),
                          onToggleSelect: x.toggleRow,
                          checkboxColWidth: T,
                          expandable: !!c,
                          isExpanded: M.isExpanded(t.id),
                          canExpand: M.canExpand(t),
                          onToggleExpand: M.toggleRow,
                          expandedRowRender: c ? et : void 0,
                          expandColWidth: G,
                          visibleWidth: S,
                          onRowClick: Ye,
                          extraClassName: J == null ? void 0 : J(t),
                          editingColumnKey: ((o = v.editing) == null ? void 0 : o.rowId) === t.id ? v.editing.columnKey : null,
                          editingError: ((l = v.editing) == null ? void 0 : l.rowId) === t.id ? v.editing.error : void 0,
                          onStartEdit: v.startEdit,
                          onCompleteEdit: v.completeEdit,
                          onCancelEdit: v.cancelEdit,
                          onClearEditError: v.clearError,
                          showRowDelete: O,
                          onRowDelete: Qe,
                          rowActionsColWidth: A,
                          rowActionsColLeftOffset: _,
                          rowReorderable: p,
                          dragHandleColWidth: B,
                          isLast: n === r.length - 1,
                          getRowSpan: k,
                          getRowSpanHeight: Nt,
                          getGroupHovered: xt,
                          getGroupSelected: Dt,
                          ariaRowIndex: se + n + 1
                        },
                        t.id
                      );
                    });
                    return p ? /* @__PURE__ */ i(
                      Xt,
                      {
                        items: St,
                        strategy: qt,
                        children: e
                      }
                    ) : /* @__PURE__ */ i(Vt, { children: e });
                  })()
                }
              )
            ),
            Je && !de && /* @__PURE__ */ ie(
              "div",
              {
                role: "row",
                className: "flex bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                children: [
                  p && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: { width: B, left: 0 }
                    }
                  ),
                  y && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: T,
                        left: H
                      }
                    }
                  ),
                  c && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: G,
                        left: H + (y ? T : 0)
                      }
                    }
                  ),
                  /* @__PURE__ */ i(
                    "div",
                    {
                      role: "gridcell",
                      className: le(
                        "shrink-0 sticky z-10 flex items-center justify-center bg-white dark:bg-slate-900 min-h-9"
                      ),
                      style: { width: A, left: _ },
                      children: /* @__PURE__ */ i(
                        "button",
                        {
                          type: "button",
                          onClick: () => q == null ? void 0 : q(),
                          className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                          "aria-label": "행 추가",
                          children: /* @__PURE__ */ i(Qt, { size: 20 })
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
  return N || p ? /* @__PURE__ */ i(
    At,
    {
      sensors: mt,
      collisionDetection: Ut,
      autoScroll: vt,
      onDragStart: Ct,
      onDragEnd: pt,
      onDragCancel: yt,
      children: Ie
    }
  ) : Ie;
}
export {
  zn as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
