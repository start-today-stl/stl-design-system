import { jsxs as N, jsx as t } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as Dt, useSensor as Ye, PointerSensor as Ct, KeyboardSensor as Ht, DndContext as It, closestCenter as Tt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as Kt, SortableContext as we, horizontalListSortingStrategy as qe, verticalListSortingStrategy as zt } from "@dnd-kit/sortable";
import { cn as F } from "../../../lib/utils.mjs";
import { Table as _t, TableHeader as Lt, TableRow as C, TableHead as f, TableSortableHead as Ot, TableBody as jt, TableCell as R } from "../table.mjs";
import { Checkbox as Je } from "../../ui/checkbox.mjs";
import { Skeleton as A } from "../../ui/skeleton.mjs";
import { SplashScreen as Bt } from "../../ui/splash-screen.mjs";
import { DownIcon as Qe } from "../../../icons/DownIcon.mjs";
import { RightIcon as Ue } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as Vt } from "../../../icons/RowAddIcon.mjs";
import { DataTableBodyRow as Ze } from "./data-table-body-row.mjs";
import { DataTableColumnHeader as Mt } from "./data-table-column-header.mjs";
import { useStickyStyles as Gt } from "./hooks/use-sticky-styles.mjs";
import { useColumnResize as Pt } from "./hooks/use-column-resize.mjs";
import { useRowGrouping as Ft } from "./hooks/use-row-grouping.mjs";
import { useColumnReorder as Xt } from "./hooks/use-column-reorder.mjs";
import { useRowReorder as Yt } from "./hooks/use-row-reorder.mjs";
import { useCellEditing as qt } from "./hooks/use-cell-editing.mjs";
import { useSort as Jt } from "./hooks/use-sort.mjs";
import { useHeaderGroups as Qt } from "./hooks/use-header-groups.mjs";
import { getAlignClass as Ut } from "./utils.mjs";
import { DRAG_HANDLE_WIDTH as c, CHECKBOX_WIDTH as p, EXPAND_WIDTH as g, ROW_ACTIONS_WIDTH as w } from "./types.mjs";
const Zt = [];
function Ns({
  columns: H,
  data: o,
  selectable: m = !1,
  selectedIds: x = Zt,
  onSelectionChange: d,
  sortState: Ae,
  onSortChange: et,
  multiSort: tt = !1,
  onRowClick: ee,
  onCellChange: X,
  expandable: s,
  emptyMessage: st = "데이터가 없습니다.",
  className: rt,
  rowClassName: te,
  maxHeight: O,
  resizable: E = !1,
  columnWidths: lt,
  onColumnResize: it,
  columnReorderable: I = !1,
  columnOrder: at,
  onColumnReorder: nt,
  rowReorderable: se = !1,
  onRowReorder: ot,
  loading: $e = !1,
  loadingMode: Y = "splash",
  loadingContent: j,
  headerGroups: $,
  rowGrouping: W,
  rowActions: r
}) {
  const n = W ? !1 : se, T = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  l.useEffect(() => {
    T && W && se && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [W, se, T]), l.useEffect(() => {
    T && j && Y !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [j, Y, T]);
  const {
    editingCell: Ee,
    editValue: We,
    editValueRef: re,
    editingCellRef: le,
    setEditingCell: ie,
    setEditValue: ae,
    startEditing: ne,
    completeEditing: oe,
    cancelEditing: ce
  } = qt({ columns: H, data: o, onCellChange: X }), ve = l.useRef(null), [u, ct] = l.useState(0);
  l.useEffect(() => {
    const e = ve.current;
    if (!e) return;
    const i = () => ct(e.clientWidth);
    i();
    const a = new ResizeObserver(i);
    return a.observe(e), () => a.disconnect();
  }, []);
  const [dt, ht] = l.useState(
    (s == null ? void 0 : s.defaultExpandedRowIds) ?? []
  ), {
    resizingColumn: pt,
    getColumnWidth: B,
    handleResizeStart: mt
  } = Pt({ resizable: E, columnWidths: lt, onColumnResize: it }), { orderedColumns: ft, handleColumnDragEnd: De } = Xt({
    columns: H,
    columnReorderable: I,
    columnOrder: at,
    onColumnReorder: nt
  }), { handleRowDragEnd: Ce } = Yt({ data: o, onRowReorder: ot }), [gt, de] = l.useState(null), ut = Dt(
    Ye(Ct, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    Ye(Ht, {
      coordinateGetter: Kt
    })
  ), yt = l.useCallback(
    (e) => {
      const { active: i } = e;
      String(i.id).startsWith("row-") ? Ce(e) : De(e);
    },
    [De, Ce]
  ), v = (s == null ? void 0 : s.expandedRowIds) ?? dt, V = (s == null ? void 0 : s.onExpandedChange) ?? ht, q = o.length > 0 && x.length === o.length, He = x.length > 0 && !q, Ie = () => {
    q ? d == null || d([]) : d == null || d(o.map((e) => e.id));
  }, he = l.useCallback((e) => {
    x.includes(e) ? d == null || d(x.filter((i) => i !== e)) : d == null || d([...x, e]);
  }, [x, d]), { handleSort: Te, getSortDirection: Ke, getSortPriority: ze } = Jt({
    sortState: Ae,
    onSortChange: et,
    multiSort: tt,
    shouldWarn: T
  }), K = Ut, pe = l.useCallback((e) => s ? s.rowExpandable ? s.rowExpandable(e) : !0 : !1, [s]), _e = l.useCallback((e) => v.includes(e), [v]), me = l.useCallback((e) => {
    v.includes(e) ? V(v.filter((i) => i !== e)) : V([...v, e]);
  }, [v, V]), M = l.useMemo(() => s ? o.filter((e) => pe(e)).map((e) => e.id) : [], [o, s]), G = M.length > 0 && M.every((e) => v.includes(e)), Le = () => {
    V(G ? [] : M);
  }, z = (r == null ? void 0 : r.showDelete) ?? !!(r != null && r.onRowDelete), xt = (r == null ? void 0 : r.showAdd) ?? !!(r != null && r.onRowAdd), J = H.length + (m ? 1 : 0) + (s ? 1 : 0) + (n ? 1 : 0) + (z ? 1 : 0), {
    middleRowSet: fe,
    getRowSpan: ge,
    isGroupCellHovered: ue,
    isGroupCellSelected: ye
  } = Ft({ data: o, rowGrouping: W, hoveredRowIndex: gt, selectedIds: x }), { getStickyStyles: _, hasLeftStickyColumns: k } = Gt({
    columns: H,
    selectable: m,
    expandable: s,
    rowReorderable: n
  }), Q = (e) => /* @__PURE__ */ t(
    Mt,
    {
      column: e,
      stickyData: _(e, !0),
      alignClass: K(e.align),
      needsRightBorder: bt.has(e.accessorKey),
      resizable: E,
      resizedWidth: E ? B(e) : void 0,
      isResizing: pt === e.accessorKey,
      onResizeStart: mt,
      columnReorderable: I,
      sortDirection: Ke(e.accessorKey),
      sortPriority: ze(e.accessorKey),
      onSort: () => Te(e.accessorKey)
    },
    String(e.accessorKey)
  ), h = I ? ft : H, Oe = h.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), kt = o.map((e) => `row-${e.id}`), St = l.useCallback(() => 0, []), U = l.useCallback(
    () => n ? c : 0,
    [n]
  ), P = l.useCallback(() => {
    let e = 0;
    return n && (e += c), m && (e += p), e;
  }, [n, m]), {
    groupedColumnsSet: je,
    columnsWithRightBorder: bt,
    getHeaderGroupColSpan: Nt,
    getHeaderGroupStickyData: Be,
    headerGroupItems: Ve
  } = Qt({
    columns: H,
    columnsToRender: h,
    headerGroups: $,
    getStickyStyles: _,
    getColumnWidth: B,
    resizable: E,
    shouldWarn: T
  }), xe = l.useRef(null), Me = [
    h,
    n,
    m,
    s,
    z,
    k,
    E,
    r,
    W,
    fe,
    o.length,
    U,
    P,
    ge,
    ue,
    ye,
    _,
    B,
    K,
    he,
    me,
    ne,
    oe,
    ce,
    ae,
    ie,
    re,
    le,
    X,
    ee,
    te,
    de
  ], Rt = [
    "columnsToRender",
    "rowReorderable",
    "selectable",
    "expandable",
    "showRowDelete",
    "hasLeftStickyColumns",
    "resizable",
    "rowActions",
    "rowGrouping",
    "middleRowSet",
    "data.length",
    "getCheckboxHeaderLeftOffset",
    "getExpandHeaderLeftOffset",
    "getRowSpan",
    "isGroupCellHovered",
    "isGroupCellSelected",
    "getStickyStyles",
    "getColumnWidth",
    "getAlignClass",
    "handleSelectRow",
    "toggleRowExpanded",
    "startEditing",
    "completeEditing",
    "cancelEditing",
    "setEditValue",
    "setEditingCell",
    "editValueRef",
    "editingCellRef",
    "onCellChange",
    "onRowClick",
    "rowClassName",
    "setHoveredRowIndex"
  ];
  if (xe.current) {
    const e = Me.map((i, a) => i !== xe.current[a] ? Rt[a] : null).filter(Boolean);
    e.length > 0 && console.log("[DT deps changed]", e);
  }
  xe.current = Me;
  const Ge = l.useMemo(
    () => (console.log("[DT rowCtx recreated]"), {
      columnsToRender: h,
      rowReorderable: n,
      selectable: m,
      expandable: !!s,
      showRowDelete: z,
      hasLeftStickyColumns: k,
      resizable: E,
      rowActions: r,
      rowGrouping: W,
      middleRowSet: fe,
      dataLength: o.length,
      getCheckboxHeaderLeftOffset: U,
      getExpandHeaderLeftOffset: P,
      getRowSpan: ge,
      isGroupCellHovered: ue,
      isGroupCellSelected: ye,
      getStickyStyles: _,
      getColumnWidth: B,
      getAlignClass: K,
      handleSelectRow: he,
      toggleRowExpanded: me,
      startEditing: ne,
      completeEditing: oe,
      cancelEditing: ce,
      setEditValue: ae,
      setEditingCell: ie,
      editValueRef: re,
      editingCellRef: le,
      onCellChange: X,
      onRowClick: ee,
      rowClassName: te,
      setHoveredRowIndex: de
    }),
    [
      h,
      n,
      m,
      s,
      z,
      k,
      E,
      r,
      W,
      fe,
      o.length,
      U,
      P,
      ge,
      ue,
      ye,
      _,
      B,
      K,
      he,
      me,
      ne,
      oe,
      ce,
      ae,
      ie,
      re,
      le,
      X,
      ee,
      te,
      de
    ]
  ), Pe = /* @__PURE__ */ N(_t, { className: rt, maxHeight: O, wrapperRef: ve, children: [
    /* @__PURE__ */ N(Lt, { children: [
      $ && $.length > 0 && /* @__PURE__ */ N(C, { children: [
        n && /* @__PURE__ */ t(
          f,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${c}px`,
              minWidth: `${c}px`,
              ...k && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        m && /* @__PURE__ */ t(
          f,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${p}px`,
              minWidth: `${p}px`,
              ...k && { position: "sticky", left: n ? c : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              Je,
              {
                checked: q,
                indeterminate: He,
                onCheckedChange: Ie,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        s && /* @__PURE__ */ t(
          f,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${g}px`,
              minWidth: `${g}px`,
              ...k && { position: "sticky", left: P(), zIndex: 20 }
            },
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && M.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Le,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": G ? "모두 접기" : "모두 펼치기",
                children: G ? /* @__PURE__ */ t(Qe, { size: 24 }) : /* @__PURE__ */ t(Ue, { size: 24 })
              }
            )
          }
        ),
        z && /* @__PURE__ */ t(
          f,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${w}px`,
              minWidth: `${w}px`,
              maxWidth: `${w}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        Ve.map((e, i) => {
          const a = Ve[i + 1], ke = e.type === "group" && (a == null ? void 0 : a.type) === "group";
          if (e.type === "group") {
            const S = Nt(e.group);
            if (S === 0) return null;
            const D = h.filter(
              (b) => e.group.columns.includes(b.accessorKey)
            );
            if (new Set(
              D.map((b) => b.sticky ?? "none")
            ).size > 1) {
              const b = [];
              let L = [], Z = D[0].sticky;
              for (const y of D)
                y.sticky === Z ? L.push(y) : (L.length > 0 && b.push({ cols: L, sticky: Z }), L = [y], Z = y.sticky);
              L.length > 0 && b.push({ cols: L, sticky: Z });
              const Xe = b.findIndex((y) => !y.sticky), $t = Xe !== -1 ? Xe : 0;
              return b.map((y, Ne) => {
                const Et = {
                  header: e.group.header,
                  columns: y.cols.map((vt) => vt.accessorKey),
                  align: e.group.align
                }, Re = y.sticky ? Be(Et) : { style: {}, className: "" }, Wt = !!Re.style.position;
                return /* @__PURE__ */ t(
                  f,
                  {
                    colSpan: y.cols.length,
                    className: F(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      ke && Ne === b.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      Re.className
                    ),
                    style: Wt ? Re.style : { position: "relative", zIndex: 0 },
                    children: Ne === $t ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${Ne}`
                );
              });
            }
            const be = Be(e.group), wt = !!be.style.position;
            return /* @__PURE__ */ t(
              f,
              {
                colSpan: S,
                className: F(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  ke && "border-r border-slate-200 dark:border-slate-700",
                  be.className
                ),
                style: wt ? be.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const S = _(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ t(
              Ot,
              {
                rowSpan: 2,
                sortDirection: Ke(e.col.accessorKey),
                sortPriority: ze(e.col.accessorKey),
                onSort: () => Te(e.col.accessorKey),
                className: F(
                  K(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  S.className
                ),
                style: S.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ t(
              f,
              {
                rowSpan: 2,
                className: F(
                  K(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  S.className
                ),
                style: S.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            );
          }
        })
      ] }),
      /* @__PURE__ */ N(C, { children: [
        !$ && n && /* @__PURE__ */ t(
          f,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: k ? {
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
        !$ && m && /* @__PURE__ */ t(
          f,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: k ? {
              position: "sticky",
              left: U(),
              zIndex: 20,
              width: `${p}px`,
              minWidth: `${p}px`,
              maxWidth: `${p}px`
            } : {
              width: `${p}px`,
              minWidth: `${p}px`,
              maxWidth: `${p}px`
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              Je,
              {
                checked: q,
                indeterminate: He,
                onCheckedChange: Ie,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !$ && s && /* @__PURE__ */ t(
          f,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: k ? {
              position: "sticky",
              left: P(),
              zIndex: 20,
              width: `${g}px`,
              minWidth: `${g}px`,
              maxWidth: `${g}px`
            } : {
              width: `${g}px`,
              minWidth: `${g}px`,
              maxWidth: `${g}px`
            },
            "aria-label": "확장",
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && M.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Le,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": G ? "모두 접기" : "모두 펼치기",
                children: G ? /* @__PURE__ */ t(Qe, { size: 24 }) : /* @__PURE__ */ t(Ue, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !$ && z && /* @__PURE__ */ t(
          f,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${w}px`,
              minWidth: `${w}px`,
              maxWidth: `${w}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        $ ? I ? /* @__PURE__ */ t(we, { items: Oe, strategy: qe, children: h.filter((e) => je.has(e.accessorKey)).map(Q) }) : h.filter((e) => je.has(e.accessorKey)).map(Q) : I ? /* @__PURE__ */ t(we, { items: Oe, strategy: qe, children: h.map(Q) }) : h.map(Q)
      ] })
    ] }),
    /* @__PURE__ */ N(jt, { children: [
      $e ? /* @__PURE__ */ t(C, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        R,
        {
          colSpan: J,
          className: F(
            "text-center",
            j || Y !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: j ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: u ? { width: u } : void 0,
                children: j
              }
            )
          ) : Y === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const i = typeof O == "number" ? O : typeof O == "string" && parseInt(O, 10) || 320, a = Math.max(1, Math.floor(i / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: a }).map((ke, S) => /* @__PURE__ */ N(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    n && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(A, { width: 16, height: 16 }) }),
                    m && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(A, { width: 18, height: 18 }) }),
                    s && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(A, { width: 18, height: 18 }) }),
                    h.map((D) => {
                      const Se = D.width ?? D.minWidth, Fe = typeof Se == "number" ? Math.min(Se * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(A, { height: 16, width: Fe }) }, String(D.accessorKey));
                    })
                  ]
                },
                S
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본) - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: u ? { width: u } : void 0,
                children: /* @__PURE__ */ t(Bt, { size: "lg" })
              }
            )
          )
        }
      ) }) : o.length === 0 ? /* @__PURE__ */ t(C, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        R,
        {
          colSpan: J,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: u ? { width: u } : void 0,
              children: st
            }
          )
        }
      ) }) : n ? /* @__PURE__ */ t(we, { items: kt, strategy: zt, children: o.map((e, i) => {
        const a = _e(e.id);
        return /* @__PURE__ */ N(l.Fragment, { children: [
          /* @__PURE__ */ t(
            Ze,
            {
              row: e,
              rowIndex: i,
              isSelected: x.includes(e.id),
              canExpand: pe(e),
              isExpanded: a,
              editingCell: Ee,
              editValue: We,
              ctx: Ge
            }
          ),
          s && a && /* @__PURE__ */ t(C, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            R,
            {
              colSpan: J,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: u ? `${u}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: s.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : o.map((e, i) => {
        const a = _e(e.id);
        return /* @__PURE__ */ N(l.Fragment, { children: [
          /* @__PURE__ */ t(
            Ze,
            {
              row: e,
              rowIndex: i,
              isSelected: x.includes(e.id),
              canExpand: pe(e),
              isExpanded: a,
              editingCell: Ee,
              editValue: We,
              ctx: Ge
            }
          ),
          s && a && /* @__PURE__ */ t(C, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            R,
            {
              colSpan: J,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: u ? `${u}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: s.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      xt && !$e && /* @__PURE__ */ N(C, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        n && /* @__PURE__ */ t(
          R,
          {
            className: "!p-0",
            style: {
              width: `${c}px`,
              minWidth: `${c}px`,
              maxWidth: `${c}px`
            }
          }
        ),
        m && /* @__PURE__ */ t(
          R,
          {
            className: "!p-0",
            style: {
              width: `${p}px`,
              minWidth: `${p}px`,
              maxWidth: `${p}px`
            }
          }
        ),
        s && /* @__PURE__ */ t(
          R,
          {
            className: "!p-0",
            style: {
              width: `${g}px`,
              minWidth: `${g}px`,
              maxWidth: `${g}px`
            }
          }
        ),
        /* @__PURE__ */ t(
          R,
          {
            className: "!p-0",
            style: {
              width: `${w}px`,
              minWidth: `${w}px`,
              maxWidth: `${w}px`
            },
            children: /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  var e;
                  return (e = r == null ? void 0 : r.onRowAdd) == null ? void 0 : e.call(r);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(Vt, { size: 20 })
              }
            )
          }
        ),
        h.map((e) => /* @__PURE__ */ t(
          R,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return I || n ? /* @__PURE__ */ t(
    It,
    {
      sensors: ut,
      collisionDetection: Tt,
      onDragEnd: yt,
      children: Pe
    }
  ) : Pe;
}
export {
  Ns as DataTable
};
//# sourceMappingURL=index.mjs.map
