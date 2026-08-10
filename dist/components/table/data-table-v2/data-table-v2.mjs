import { jsx as i, jsxs as ie, Fragment as jt } from "react/jsx-runtime";
import * as s from "react";
import { useSensors as Vt, useSensor as $t, PointerSensor as Bt, DndContext as At, closestCenter as Gt } from "@dnd-kit/core";
import { SortableContext as Ut, verticalListSortingStrategy as Xt } from "@dnd-kit/sortable";
import { cn as le } from "../../../lib/utils.mjs";
import { Skeleton as ce } from "../../ui/skeleton.mjs";
import { SplashScreen as qt } from "../../ui/splash-screen.mjs";
import { RowAddIcon as Jt } from "../../../icons/RowAddIcon.mjs";
import { DataTableV2Header as Qt } from "./data-table-v2-header.mjs";
import { DRAG_HANDLE_COL_WIDTH as B, CHECKBOX_COL_WIDTH as T, EXPAND_COL_WIDTH as A, ROW_ACTIONS_WIDTH as G, DEFAULT_COL_WIDTH as Yt } from "./constants.mjs";
import { useFilter as Zt } from "./hooks/use-filter.mjs";
import { useRowReorder as en } from "./hooks/use-row-reorder.mjs";
import { DataTableV2Row as tn } from "./data-table-v2-row.mjs";
import { useCellEdit as nn } from "./hooks/use-cell-edit.mjs";
import { useColumnResize as rn } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as sn } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as on } from "./hooks/use-row-expansion.mjs";
import { useRowGrouping as ln } from "./hooks/use-row-grouping.mjs";
import { useRowSelection as cn } from "./hooks/use-row-selection.mjs";
import { useStableCallback as f } from "./hooks/use-stable-callback.mjs";
import { useTableVirtualizer as dn } from "./hooks/use-table-virtualizer.mjs";
const an = 40, hn = 5, un = { activationConstraint: { distance: 5 } };
function fn(r, h, m) {
  const C = r.find((g) => g.column === h);
  return m ? C ? C.direction === "asc" ? r.map(
    (g) => g.column === h ? { column: h, direction: "desc" } : g
  ) : r.filter((g) => g.column !== h) : [...r, { column: h, direction: "asc" }] : C ? C.direction === "asc" ? [{ column: h, direction: "desc" }] : [] : [{ column: h, direction: "asc" }];
}
function gn(r, h = 0, m = 0, C = U) {
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
  return typeof r.width == "number" ? r.width : typeof r.minWidth == "number" ? r.minWidth : Yt;
}
function mn(r) {
  return r.reduce((h, m) => h + U(m), 0);
}
function _n({
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
  columnOrder: Ie,
  onColumnReorder: Te,
  selectable: y = !1,
  selectedIds: Le,
  defaultSelectedIds: He,
  onSelectionChange: _e,
  onRowClick: ze,
  rowClassName: Pe,
  expandable: c,
  onCellChange: Fe,
  rowActions: a,
  loading: de = !1,
  loadingMode: Ke = "splash",
  loadingContent: ae,
  emptyMessage: je = "데이터가 없습니다.",
  rowReorderable: Ve = !1,
  onRowReorder: $e,
  filterState: Be,
  defaultFilterState: Ae,
  onFilterChange: Ge,
  maxHeight: X,
  estimateRowHeight: he = an,
  rowGrouping: L,
  virtual: Ue,
  bordered: Xe = !0,
  className: qe
}) {
  const p = L ? !1 : Ve, O = (a == null ? void 0 : a.showDelete) ?? !!(a != null && a.onRowDelete), Je = (a == null ? void 0 : a.showAdd) ?? !!(a != null && a.onRowAdd), Qe = f(a == null ? void 0 : a.onRowDelete), q = f(a == null ? void 0 : a.onRowAdd), Ye = f(ze), J = f(Pe), Ze = f(Fe), et = f(c == null ? void 0 : c.expandedRowRender), tt = f(_e), Q = f(g), nt = f(Ge), rt = f(u), st = f(Te), ot = f($e), ue = f(c == null ? void 0 : c.onExpandedChange), { orderedColumns: Y, handleColumnDragEnd: fe } = sn({
    columns: h,
    columnReorderable: N,
    columnOrder: Ie,
    onColumnReorder: st
  }), { getColumnWidth: ge, handleResizeStart: it, resizingKey: lt } = rn({
    resizable: R,
    columnWidths: D,
    onColumnResize: rt
  }), d = s.useMemo(() => R ? Y.map((e) => {
    const n = ge(e);
    return n !== void 0 ? { ...e, width: n } : e;
  }) : Y, [Y, R, ge]), H = p ? B : 0, _ = H + (y ? T : 0) + (c ? A : 0), M = _ + (O ? G : 0), [me, ct] = s.useState({}), Ce = s.useCallback(
    (e) => me[String(e.accessorKey)] ?? U(e),
    [me]
  ), { left: pe, right: ye } = s.useMemo(
    () => gn(d, M, 0, Ce),
    [d, M, Ce]
  ), ve = s.useMemo(
    () => mn(d) + M,
    [d, M]
  ), x = cn({
    data: r,
    selectable: y,
    selectedIds: Le,
    defaultSelectedIds: He,
    onSelectionChange: tt
  }), dt = s.useMemo(
    () => c ? { ...c, onExpandedChange: ue } : void 0,
    [c, ue]
  ), I = on({ data: r, expandable: dt }), v = nn({ onCellChange: Ze }), { handleRowDragEnd: Se } = en({ data: r, onRowReorder: ot }), { rowSpanMap: at, getRowSpan: k } = ln({ data: r, rowGrouping: L }), z = Zt({ filterState: Be, defaultFilterState: Ae, onFilterChange: nt }), b = s.useMemo(
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
        fn(we.current, e, Re.current)
      );
    },
    [Q]
  ), ft = s.useMemo(
    () => d.some((e) => typeof e.width != "number"),
    [d]
  ), gt = s.useMemo(
    () => N ? d.filter((e) => !e.pinned).map((e) => String(e.accessorKey)) : [],
    [d, N]
  ), mt = Vt($t(Bt, un)), [ke, Z] = s.useState(null), Ct = s.useCallback((e) => {
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
  }, []), P = s.useMemo(() => {
    const e = new Array(r.length + 1);
    e[0] = 0;
    for (let n = 0; n < r.length; n++) {
      const t = Ee.get(r[n].id) ?? he;
      e[n + 1] = e[n] + t;
    }
    return e;
  }, [r, Ee, he]), kt = P[r.length], [ee, Et] = s.useState(null), F = s.useMemo(() => ee === null ? -1 : r.findIndex((e) => e.id === ee), [ee, r]), xt = s.useCallback(
    (e, n) => {
      if (F < 0) return !1;
      const t = k(e, n);
      return t === void 0 || t <= 1 ? !1 : F >= e && F < e + t;
    },
    [F, k]
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
  ), Wt = s.useCallback(() => !1, []), Dt = L ? bt : Wt, te = s.useRef(P);
  te.current = P;
  const Nt = s.useCallback(
    (e, n) => {
      const t = k(e, n);
      if (!(t === void 0 || t <= 1))
        return te.current[e + t] - te.current[e];
    },
    [k]
  ), K = s.useRef(null), {
    isVirtual: j,
    virtualizer: be,
    renderIndices: We,
    getItemStart: Ot,
    totalSize: Mt
  } = dn({
    virtual: Ue,
    count: r.length,
    scrollContainerRef: K,
    rowSpanMap: at
  }), ne = s.useRef(/* @__PURE__ */ new Map()), It = s.useCallback(
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
      const o = `${Math.round(j ? Ot(e) : P[e])}px`;
      t.style.top !== o && (t.style.top = o);
    }
  });
  const [S, Tt] = s.useState(0);
  s.useLayoutEffect(() => {
    const e = K.current;
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
    const e = K.current;
    if (!e) return;
    const n = () => {
      const o = e.scrollLeft > 0, l = e.scrollLeft + e.clientWidth < e.scrollWidth - 1;
      e.dataset.scrolledLeft = o ? "true" : "false", e.dataset.scrolledRight = l ? "true" : "false", Tt(e.clientWidth);
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
      const Kt = t;
      for (; t < E.length && e.get(E[t].accessorKey) === l; ) {
        const $ = E[t];
        typeof $.width == "number" ? (V += $.width, oe += $.width) : (W += 1, oe += U($)), t += 1;
      }
      n.push({
        // 같은 그룹이 여러 구간으로 갈라질 수 있으므로 key 는 구간 첫 컬럼 기준
        key: `group-${String(E[Kt].accessorKey)}`,
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
  }, [E, m]), De = re !== null && re.length > 0, Lt = M > 0 || d.some((e) => e.pinned === "left"), se = De ? 2 : 1, Ht = "bg-slate-100 dark:bg-slate-800", _t = (c == null ? void 0 : c.showExpandAll) ?? !0, { leftPinnedCols: zt, rightPinnedCols: Pt, lastLeftPinnedIdx: Ne, firstRightPinnedIdx: Oe } = s.useMemo(() => {
    const e = d.map((t, o) => ({ c: t, i: o })).filter(({ c: t }) => t.pinned === "left"), n = d.map((t, o) => ({ c: t, i: o })).filter(({ c: t }) => t.pinned === "right");
    return {
      leftPinnedCols: e,
      rightPinnedCols: n,
      lastLeftPinnedIdx: e.length ? e[e.length - 1].i : -1,
      firstRightPinnedIdx: n.length ? n[0].i : -1
    };
  }, [d]), Ft = d.length + (p ? 1 : 0) + (y ? 1 : 0) + (c ? 1 : 0) + (O ? 1 : 0), Me = /* @__PURE__ */ i(
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
          ref: K,
          className: "overflow-auto group/scroll flex-1 min-h-0",
          style: { maxHeight: typeof X == "number" ? `${X}px` : X },
          "data-scrolled-left": "false",
          "data-scrolled-right": "false",
          children: /* @__PURE__ */ ie("div", { style: { minWidth: ve }, children: [
            /* @__PURE__ */ i(
              Qt,
              {
                columns: d,
                hasFlexColumn: ft,
                headerGroupCells: re,
                hasGroups: De,
                headerRowCount: se,
                hasPrecedingHeaderCells: Lt,
                leftPinnedCols: zt,
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
                showExpandAll: _t,
                allExpanded: I.allExpanded,
                onToggleExpandAll: I.toggleAll,
                showRowDelete: O,
                dragHandleColsWidth: H,
                rowActionsColLeftOffset: _,
                headerBg: Ht
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
            ) : Ke === "skeleton" ? (
              // 스켈레톤 — 각 컬럼 폭에 맞춰 셀 구조로 렌더
              /* @__PURE__ */ i("div", { children: Array.from({ length: hn }).map((e, n) => /* @__PURE__ */ ie(
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
                        style: { width: A },
                        children: /* @__PURE__ */ i(ce, { width: 16, height: 16 })
                      }
                    ),
                    O && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: G }
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
                  children: /* @__PURE__ */ i(qt, { size: "lg" })
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
                        tn,
                        {
                          row: t,
                          rowIndex: n,
                          columns: d,
                          leftOffsets: pe,
                          rightOffsets: ye,
                          lastLeftPinnedIdx: Ne,
                          firstRightPinnedIdx: Oe,
                          totalWidth: ve,
                          registerEl: It,
                          onHover: L ? Et : void 0,
                          onHeightChange: Rt,
                          measureRef: j && be ? be.measureElement : void 0,
                          dataIndex: j ? n : void 0,
                          selectable: y,
                          isSelected: x.isSelected(t.id),
                          onToggleSelect: x.toggleRow,
                          checkboxColWidth: T,
                          expandable: !!c,
                          isExpanded: I.isExpanded(t.id),
                          canExpand: I.canExpand(t),
                          onToggleExpand: I.toggleRow,
                          expandedRowRender: c ? et : void 0,
                          expandColWidth: A,
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
                          rowActionsColWidth: G,
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
                      Ut,
                      {
                        items: St,
                        strategy: Xt,
                        children: e
                      }
                    ) : /* @__PURE__ */ i(jt, { children: e });
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
                        width: A,
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
                      style: { width: G, left: _ },
                      children: /* @__PURE__ */ i(
                        "button",
                        {
                          type: "button",
                          onClick: () => q == null ? void 0 : q(),
                          className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                          "aria-label": "행 추가",
                          children: /* @__PURE__ */ i(Jt, { size: 20 })
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
      collisionDetection: Gt,
      autoScroll: vt,
      onDragStart: Ct,
      onDragEnd: pt,
      onDragCancel: yt,
      children: Me
    }
  ) : Me;
}
export {
  _n as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
