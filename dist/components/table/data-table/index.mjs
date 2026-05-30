import { jsxs as u, jsx as t, Fragment as Ct } from "react/jsx-runtime";
import * as r from "react";
import { useSensors as It, useSensor as qe, PointerSensor as Tt, KeyboardSensor as zt, DndContext as Ht, closestCenter as Kt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as _t, SortableContext as fe, horizontalListSortingStrategy as Ge, verticalListSortingStrategy as jt } from "@dnd-kit/sortable";
import { cn as G } from "../../../lib/utils.mjs";
import { Table as Ot, TableHeader as Lt, TableRow as w, TableHead as y, TableSortableHead as Vt, TableBody as Bt, TableCell as m } from "../table.mjs";
import { Checkbox as Je } from "../../ui/checkbox.mjs";
import { Skeleton as se } from "../../ui/skeleton.mjs";
import { SplashScreen as Mt } from "../../ui/splash-screen.mjs";
import { DownIcon as Qe } from "../../../icons/DownIcon.mjs";
import { RightIcon as Ue } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as Ft } from "../../../icons/RowAddIcon.mjs";
import { DataTableBodyRow as ge } from "./data-table-body-row.mjs";
import { DataTableColumnHeader as Pt } from "./data-table-column-header.mjs";
import { useStickyStyles as Xt } from "./hooks/use-sticky-styles.mjs";
import { useColumnResize as Yt } from "./hooks/use-column-resize.mjs";
import { useRowGrouping as qt } from "./hooks/use-row-grouping.mjs";
import { useColumnReorder as Gt } from "./hooks/use-column-reorder.mjs";
import { useRowReorder as Jt } from "./hooks/use-row-reorder.mjs";
import { useCellEditing as Qt } from "./hooks/use-cell-editing.mjs";
import { useSort as Ut } from "./hooks/use-sort.mjs";
import { useHeaderGroups as Zt } from "./hooks/use-header-groups.mjs";
import { useTableVirtualizer as At } from "./hooks/use-table-virtualizer.mjs";
import { getAlignClass as es } from "./utils.mjs";
import { DRAG_HANDLE_WIDTH as c, CHECKBOX_WIDTH as f, EXPAND_WIDTH as x, ROW_ACTIONS_WIDTH as W } from "./types.mjs";
const ts = [];
function Rs({
  columns: z,
  data: n,
  selectable: k = !1,
  selectedIds: b = ts,
  onSelectionChange: d,
  sortState: Ze,
  onSortChange: Ae,
  multiSort: et = !1,
  onRowClick: ue,
  onCellChange: re,
  expandable: s,
  emptyMessage: tt = "데이터가 없습니다.",
  className: st,
  rowClassName: ye,
  maxHeight: V,
  resizable: H = !1,
  columnWidths: rt,
  onColumnResize: it,
  columnReorderable: K = !1,
  columnOrder: lt,
  onColumnReorder: at,
  rowReorderable: ie = !1,
  onRowReorder: nt,
  loading: xe = !1,
  loadingMode: J = "splash",
  loadingContent: B,
  headerGroups: E,
  rowGrouping: $,
  rowActions: i,
  virtual: ot
}) {
  const o = $ ? !1 : ie, C = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  r.useEffect(() => {
    C && $ && ie && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [$, ie, C]), r.useEffect(() => {
    C && B && J !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [B, J, C]);
  const {
    editingCell: le,
    editValue: ae,
    editValueRef: ke,
    editingCellRef: be,
    setEditingCell: Ne,
    setEditValue: Se,
    startEditing: we,
    completeEditing: $e,
    cancelEditing: ve
  } = Qt({ columns: z, data: n, onCellChange: re }), ne = r.useRef(null), [h, ct] = r.useState(0);
  r.useEffect(() => {
    const e = ne.current;
    if (!e) return;
    const l = () => ct(e.clientWidth);
    l();
    const a = new ResizeObserver(l);
    return a.observe(e), () => a.disconnect();
  }, []);
  const [dt, ht] = r.useState(
    (s == null ? void 0 : s.defaultExpandedRowIds) ?? []
  ), {
    resizingColumn: pt,
    getColumnWidth: Q,
    handleResizeStart: mt
  } = Yt({ resizable: H, columnWidths: rt, onColumnResize: it }), { orderedColumns: ft, handleColumnDragEnd: Re } = Gt({
    columns: z,
    columnReorderable: K,
    columnOrder: lt,
    onColumnReorder: at
  }), { handleRowDragEnd: We } = Jt({ data: n, onRowReorder: nt }), [gt, Ee] = r.useState(null), ut = It(
    qe(Tt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    qe(zt, {
      coordinateGetter: _t
    })
  ), yt = r.useCallback(
    (e) => {
      const { active: l } = e;
      String(l.id).startsWith("row-") ? We(e) : Re(e);
    },
    [Re, We]
  ), I = (s == null ? void 0 : s.expandedRowIds) ?? dt, M = (s == null ? void 0 : s.onExpandedChange) ?? ht, U = n.length > 0 && b.length === n.length, De = b.length > 0 && !U, Ce = () => {
    U ? d == null || d([]) : d == null || d(n.map((e) => e.id));
  }, Ie = r.useCallback((e) => {
    b.includes(e) ? d == null || d(b.filter((l) => l !== e)) : d == null || d([...b, e]);
  }, [b, d]), { handleSort: Te, getSortDirection: ze, getSortPriority: He } = Ut({
    sortState: Ze,
    onSortChange: Ae,
    multiSort: et,
    shouldWarn: C
  }), F = es, Z = r.useCallback((e) => s ? s.rowExpandable ? s.rowExpandable(e) : !0 : !1, [s]), oe = r.useCallback((e) => I.includes(e), [I]), Ke = r.useCallback((e) => {
    I.includes(e) ? M(I.filter((l) => l !== e)) : M([...I, e]);
  }, [I, M]), P = r.useMemo(() => s ? n.filter((e) => Z(e)).map((e) => e.id) : [], [n, s]), X = P.length > 0 && P.every((e) => I.includes(e)), _e = () => {
    M(X ? [] : P);
  }, Y = (i == null ? void 0 : i.showDelete) ?? !!(i != null && i.onRowDelete), xt = (i == null ? void 0 : i.showAdd) ?? !!(i != null && i.onRowAdd), T = z.length + (k ? 1 : 0) + (s ? 1 : 0) + (o ? 1 : 0) + (Y ? 1 : 0), {
    middleRowSet: je,
    getRowSpan: Oe,
    isGroupCellHovered: Le,
    isGroupCellSelected: Ve
  } = qt({ data: n, rowGrouping: $, hoveredRowIndex: gt, selectedIds: b }), { getStickyStyles: q, hasLeftStickyColumns: D } = Xt({
    columns: z,
    selectable: k,
    expandable: s,
    rowReorderable: o
  }), kt = o ? "rowReorderable (행 드래그앤드롭)" : $ ? "rowGrouping (rowSpan 그룹핑)" : null, { isVirtual: bt, virtualizer: ce } = At({
    virtual: ot,
    disabledReason: kt,
    count: n.length,
    scrollContainerRef: ne,
    shouldWarn: C
  }), A = (e) => /* @__PURE__ */ t(
    Pt,
    {
      column: e,
      stickyData: q(e, !0),
      alignClass: F(e.align),
      needsRightBorder: wt.has(e.accessorKey),
      resizable: H,
      resizedWidth: H ? Q(e) : void 0,
      isResizing: pt === e.accessorKey,
      onResizeStart: mt,
      columnReorderable: K,
      sortDirection: ze(e.accessorKey),
      sortPriority: He(e.accessorKey),
      onSort: () => Te(e.accessorKey)
    },
    String(e.accessorKey)
  ), g = K ? ft : z, Be = g.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Nt = n.map((e) => `row-${e.id}`), St = r.useCallback(() => 0, []), de = r.useCallback(
    () => o ? c : 0,
    [o]
  ), ee = r.useCallback(() => {
    let e = 0;
    return o && (e += c), k && (e += f), e;
  }, [o, k]), {
    groupedColumnsSet: Me,
    columnsWithRightBorder: wt,
    getHeaderGroupColSpan: $t,
    getHeaderGroupStickyData: Fe,
    headerGroupItems: Pe
  } = Zt({
    columns: z,
    columnsToRender: g,
    headerGroups: E,
    getStickyStyles: q,
    getColumnWidth: Q,
    resizable: H,
    shouldWarn: C
  }), he = r.useMemo(
    () => ({
      columnsToRender: g,
      rowReorderable: o,
      selectable: k,
      expandable: !!s,
      showRowDelete: Y,
      hasLeftStickyColumns: D,
      resizable: H,
      rowActions: i,
      rowGrouping: $,
      middleRowSet: je,
      // dataLength 는 rowGrouping 의 isGroupSpanToEnd 계산에만 사용됨.
      // rowGrouping 안 쓰면 0 으로 고정해서 행 추가/삭제 시 ctx invalidate 방지.
      dataLength: $ ? n.length : 0,
      getCheckboxHeaderLeftOffset: de,
      getExpandHeaderLeftOffset: ee,
      getRowSpan: Oe,
      isGroupCellHovered: Le,
      isGroupCellSelected: Ve,
      getStickyStyles: q,
      getColumnWidth: Q,
      getAlignClass: F,
      handleSelectRow: Ie,
      toggleRowExpanded: Ke,
      startEditing: we,
      completeEditing: $e,
      cancelEditing: ve,
      setEditValue: Se,
      setEditingCell: Ne,
      editValueRef: ke,
      editingCellRef: be,
      onCellChange: re,
      onRowClick: ue,
      rowClassName: ye,
      setHoveredRowIndex: Ee
    }),
    [
      g,
      o,
      k,
      s,
      Y,
      D,
      H,
      i,
      $,
      je,
      $ ? n.length : 0,
      de,
      ee,
      Oe,
      Le,
      Ve,
      q,
      Q,
      F,
      Ie,
      Ke,
      we,
      $e,
      ve,
      Se,
      Ne,
      ke,
      be,
      re,
      ue,
      ye,
      Ee
    ]
  ), Xe = /* @__PURE__ */ u(Ot, { className: st, maxHeight: V, wrapperRef: ne, children: [
    /* @__PURE__ */ u(Lt, { children: [
      E && E.length > 0 && /* @__PURE__ */ u(w, { children: [
        o && /* @__PURE__ */ t(
          y,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${c}px`,
              minWidth: `${c}px`,
              ...D && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        k && /* @__PURE__ */ t(
          y,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${f}px`,
              minWidth: `${f}px`,
              ...D && { position: "sticky", left: o ? c : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              Je,
              {
                checked: U,
                indeterminate: De,
                onCheckedChange: Ce,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        s && /* @__PURE__ */ t(
          y,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${x}px`,
              minWidth: `${x}px`,
              ...D && { position: "sticky", left: ee(), zIndex: 20 }
            },
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && P.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: _e,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": X ? "모두 접기" : "모두 펼치기",
                children: X ? /* @__PURE__ */ t(Qe, { size: 24 }) : /* @__PURE__ */ t(Ue, { size: 24 })
              }
            )
          }
        ),
        Y && /* @__PURE__ */ t(
          y,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${W}px`,
              minWidth: `${W}px`,
              maxWidth: `${W}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        Pe.map((e, l) => {
          const a = Pe[l + 1], _ = e.type === "group" && (a == null ? void 0 : a.type) === "group";
          if (e.type === "group") {
            const p = $t(e.group);
            if (p === 0) return null;
            const N = g.filter(
              (R) => e.group.columns.includes(R.accessorKey)
            );
            if (new Set(
              N.map((R) => R.sticky ?? "none")
            ).size > 1) {
              const R = [];
              let L = [], te = N[0].sticky;
              for (const S of N)
                S.sticky === te ? L.push(S) : (L.length > 0 && R.push({ cols: L, sticky: te }), L = [S], te = S.sticky);
              L.length > 0 && R.push({ cols: L, sticky: te });
              const Ye = R.findIndex((S) => !S.sticky), Rt = Ye !== -1 ? Ye : 0;
              return R.map((S, pe) => {
                const Wt = {
                  header: e.group.header,
                  columns: S.cols.map((Dt) => Dt.accessorKey),
                  align: e.group.align
                }, me = S.sticky ? Fe(Wt) : { style: {}, className: "" }, Et = !!me.style.position;
                return /* @__PURE__ */ t(
                  y,
                  {
                    colSpan: S.cols.length,
                    className: G(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      _ && pe === R.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      me.className
                    ),
                    style: Et ? me.style : { position: "relative", zIndex: 0 },
                    children: pe === Rt ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${pe}`
                );
              });
            }
            const O = Fe(e.group), vt = !!O.style.position;
            return /* @__PURE__ */ t(
              y,
              {
                colSpan: p,
                className: G(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  _ && "border-r border-slate-200 dark:border-slate-700",
                  O.className
                ),
                style: vt ? O.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const p = q(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ t(
              Vt,
              {
                rowSpan: 2,
                sortDirection: ze(e.col.accessorKey),
                sortPriority: He(e.col.accessorKey),
                onSort: () => Te(e.col.accessorKey),
                className: G(
                  F(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  p.className
                ),
                style: p.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ t(
              y,
              {
                rowSpan: 2,
                className: G(
                  F(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  p.className
                ),
                style: p.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            );
          }
        })
      ] }),
      /* @__PURE__ */ u(w, { children: [
        !E && o && /* @__PURE__ */ t(
          y,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: D ? {
              position: "sticky",
              left: St(),
              zIndex: 20,
              width: `${c}px`,
              minWidth: `${c}px`,
              maxWidth: `${c}px`
            } : {
              width: `${c}px`,
              minWidth: `${c}px`,
              maxWidth: `${c}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !E && k && /* @__PURE__ */ t(
          y,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: D ? {
              position: "sticky",
              left: de(),
              zIndex: 20,
              width: `${f}px`,
              minWidth: `${f}px`,
              maxWidth: `${f}px`
            } : {
              width: `${f}px`,
              minWidth: `${f}px`,
              maxWidth: `${f}px`
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              Je,
              {
                checked: U,
                indeterminate: De,
                onCheckedChange: Ce,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !E && s && /* @__PURE__ */ t(
          y,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: D ? {
              position: "sticky",
              left: ee(),
              zIndex: 20,
              width: `${x}px`,
              minWidth: `${x}px`,
              maxWidth: `${x}px`
            } : {
              width: `${x}px`,
              minWidth: `${x}px`,
              maxWidth: `${x}px`
            },
            "aria-label": "확장",
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && P.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: _e,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": X ? "모두 접기" : "모두 펼치기",
                children: X ? /* @__PURE__ */ t(Qe, { size: 24 }) : /* @__PURE__ */ t(Ue, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !E && Y && /* @__PURE__ */ t(
          y,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${W}px`,
              minWidth: `${W}px`,
              maxWidth: `${W}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        E ? K ? /* @__PURE__ */ t(fe, { items: Be, strategy: Ge, children: g.filter((e) => Me.has(e.accessorKey)).map(A) }) : g.filter((e) => Me.has(e.accessorKey)).map(A) : K ? /* @__PURE__ */ t(fe, { items: Be, strategy: Ge, children: g.map(A) }) : g.map(A)
      ] })
    ] }),
    /* @__PURE__ */ u(Bt, { children: [
      xe ? /* @__PURE__ */ t(w, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        m,
        {
          colSpan: T,
          className: G(
            "text-center",
            B || J !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: B ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: h ? { width: h } : void 0,
                children: B
              }
            )
          ) : J === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const l = typeof V == "number" ? V : typeof V == "string" && parseInt(V, 10) || 320, a = Math.max(1, Math.floor(l / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: a }).map((_, p) => /* @__PURE__ */ u(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    o && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(se, { width: 16, height: 16 }) }),
                    k && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(se, { width: 18, height: 18 }) }),
                    s && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(se, { width: 18, height: 18 }) }),
                    g.map((N) => {
                      const j = N.width ?? N.minWidth, v = typeof j == "number" ? Math.min(j * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(se, { height: 16, width: v }) }, String(N.accessorKey));
                    })
                  ]
                },
                p
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본) - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: h ? { width: h } : void 0,
                children: /* @__PURE__ */ t(Mt, { size: "lg" })
              }
            )
          )
        }
      ) }) : n.length === 0 ? /* @__PURE__ */ t(w, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        m,
        {
          colSpan: T,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: h ? { width: h } : void 0,
              children: tt
            }
          )
        }
      ) }) : o ? /* @__PURE__ */ t(fe, { items: Nt, strategy: jt, children: n.map((e, l) => {
        const a = oe(e.id);
        return /* @__PURE__ */ u(r.Fragment, { children: [
          /* @__PURE__ */ t(
            ge,
            {
              row: e,
              rowIndex: l,
              isSelected: b.includes(e.id),
              canExpand: Z(e),
              isExpanded: a,
              editingCell: le,
              editValue: ae,
              ctx: he
            }
          ),
          s && a && /* @__PURE__ */ t(w, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            m,
            {
              colSpan: T,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: h ? `${h}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: s.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : bt && ce ? (
        // 가상화 활성: 보이는 행만 렌더 + 상하 spacer 행으로 스크롤 영역 유지
        // TableBody (= tbody) 안에서 spacer-row 패턴 사용 (semantic HTML 유지)
        (() => {
          var p, N;
          const e = ce.getVirtualItems(), l = ce.getTotalSize(), a = ((p = e[0]) == null ? void 0 : p.start) ?? 0, _ = l - (((N = e[e.length - 1]) == null ? void 0 : N.end) ?? 0);
          return /* @__PURE__ */ u(Ct, { children: [
            a > 0 && /* @__PURE__ */ t(w, { className: "hover:bg-transparent", style: { height: a }, children: /* @__PURE__ */ t(m, { colSpan: T, className: "p-0 border-0" }) }),
            e.map((j) => {
              const v = n[j.index], O = oe(v.id);
              return /* @__PURE__ */ u(r.Fragment, { children: [
                /* @__PURE__ */ t(
                  ge,
                  {
                    row: v,
                    rowIndex: j.index,
                    isSelected: b.includes(v.id),
                    canExpand: Z(v),
                    isExpanded: O,
                    editingCell: le,
                    editValue: ae,
                    ctx: he
                  }
                ),
                s && O && /* @__PURE__ */ t(w, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
                  m,
                  {
                    colSpan: T,
                    className: "p-0",
                    style: { position: "relative" },
                    children: /* @__PURE__ */ t(
                      "div",
                      {
                        className: "p-4 overflow-x-auto",
                        style: {
                          position: "sticky",
                          left: 0,
                          width: h ? `${h}px` : "100%",
                          maxWidth: "100%"
                        },
                        children: s.expandedRowRender(v)
                      }
                    )
                  }
                ) })
              ] }, v.id);
            }),
            _ > 0 && /* @__PURE__ */ t(w, { className: "hover:bg-transparent", style: { height: _ }, children: /* @__PURE__ */ t(m, { colSpan: T, className: "p-0 border-0" }) })
          ] });
        })()
      ) : n.map((e, l) => {
        const a = oe(e.id);
        return /* @__PURE__ */ u(r.Fragment, { children: [
          /* @__PURE__ */ t(
            ge,
            {
              row: e,
              rowIndex: l,
              isSelected: b.includes(e.id),
              canExpand: Z(e),
              isExpanded: a,
              editingCell: le,
              editValue: ae,
              ctx: he
            }
          ),
          s && a && /* @__PURE__ */ t(w, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            m,
            {
              colSpan: T,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: h ? `${h}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: s.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      xt && !xe && /* @__PURE__ */ u(w, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        o && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0",
            style: {
              width: `${c}px`,
              minWidth: `${c}px`,
              maxWidth: `${c}px`
            }
          }
        ),
        k && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0",
            style: {
              width: `${f}px`,
              minWidth: `${f}px`,
              maxWidth: `${f}px`
            }
          }
        ),
        s && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0",
            style: {
              width: `${x}px`,
              minWidth: `${x}px`,
              maxWidth: `${x}px`
            }
          }
        ),
        /* @__PURE__ */ t(
          m,
          {
            className: "!p-0",
            style: {
              width: `${W}px`,
              minWidth: `${W}px`,
              maxWidth: `${W}px`
            },
            children: /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  var e;
                  return (e = i == null ? void 0 : i.onRowAdd) == null ? void 0 : e.call(i);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(Ft, { size: 20 })
              }
            )
          }
        ),
        g.map((e) => /* @__PURE__ */ t(
          m,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return K || o ? /* @__PURE__ */ t(
    Ht,
    {
      sensors: ut,
      collisionDetection: Kt,
      onDragEnd: yt,
      children: Xe
    }
  ) : Xe;
}
export {
  Rs as DataTable
};
//# sourceMappingURL=index.mjs.map
