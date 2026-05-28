import { jsxs as f, jsx as t } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as Rt, useSensor as Xe, PointerSensor as Et, KeyboardSensor as Dt, DndContext as Ct, closestCenter as Kt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as It, SortableContext as ce, horizontalListSortingStrategy as qe, verticalListSortingStrategy as Ht } from "@dnd-kit/sortable";
import { cn as v } from "../../lib/utils.mjs";
import { Table as Tt, TableHeader as zt, TableRow as T, TableHead as m, TableSortableHead as Je, TableBody as jt, TableCell as W } from "./table.mjs";
import { Checkbox as Qe } from "../ui/checkbox.mjs";
import { Skeleton as se } from "../ui/skeleton.mjs";
import { SplashScreen as Ot } from "../ui/splash-screen.mjs";
import { DownIcon as Ue } from "../../icons/DownIcon.mjs";
import { RightIcon as Ye } from "../../icons/RightIcon.mjs";
import { RowAddIcon as _t } from "../../icons/RowAddIcon.mjs";
import { SortableHeaderCell as Bt } from "./data-table/sortable-header-cell.mjs";
import { DataTableBodyRow as Ze } from "./data-table/data-table-body-row.mjs";
import { useStickyStyles as Lt } from "./data-table/hooks/use-sticky-styles.mjs";
import { useColumnResize as Pt } from "./data-table/hooks/use-column-resize.mjs";
import { useRowGrouping as Mt } from "./data-table/hooks/use-row-grouping.mjs";
import { useColumnReorder as Vt } from "./data-table/hooks/use-column-reorder.mjs";
import { useRowReorder as Ft } from "./data-table/hooks/use-row-reorder.mjs";
import { useCellEditing as Gt } from "./data-table/hooks/use-cell-editing.mjs";
import { useSort as Xt } from "./data-table/hooks/use-sort.mjs";
import { useHeaderGroups as qt } from "./data-table/hooks/use-header-groups.mjs";
import { getAlignClass as Jt } from "./data-table/utils.mjs";
import { DRAG_HANDLE_WIDTH as d, CHECKBOX_WIDTH as g, EXPAND_WIDTH as u, ROW_ACTIONS_WIDTH as R } from "./data-table/types.mjs";
function xs({
  columns: z,
  data: c,
  selectable: x = !1,
  selectedIds: N = [],
  onSelectionChange: h,
  sortState: Ae,
  onSortChange: et,
  multiSort: tt = !1,
  onRowClick: de,
  onCellChange: re,
  expandable: s,
  emptyMessage: st = "데이터가 없습니다.",
  className: rt,
  rowClassName: he,
  maxHeight: P,
  resizable: w = !1,
  columnWidths: it,
  onColumnResize: lt,
  columnReorderable: j = !1,
  columnOrder: at,
  onColumnReorder: ot,
  rowReorderable: ie = !1,
  onRowReorder: nt,
  loading: pe = !1,
  loadingMode: J = "splash",
  loadingContent: M,
  headerGroups: E,
  rowGrouping: O,
  rowActions: i
}) {
  const o = O ? !1 : ie, _ = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  l.useEffect(() => {
    _ && O && ie && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [O, ie, _]), l.useEffect(() => {
    _ && M && J !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [M, J, _]);
  const {
    editingCell: fe,
    editValue: me,
    editValueRef: ge,
    editingCellRef: ye,
    setEditingCell: ue,
    setEditValue: xe,
    startEditing: ke,
    completeEditing: be,
    cancelEditing: Ne
  } = Gt({ columns: z, data: c, onCellChange: re }), we = l.useRef(null), [k, ct] = l.useState(0);
  l.useEffect(() => {
    const e = we.current;
    if (!e) return;
    const r = () => ct(e.clientWidth);
    r();
    const a = new ResizeObserver(r);
    return a.observe(e), () => a.disconnect();
  }, []);
  const [dt, ht] = l.useState(
    (s == null ? void 0 : s.defaultExpandedRowIds) ?? []
  ), {
    resizingColumn: pt,
    getColumnWidth: Q,
    handleResizeStart: ft
  } = Pt({ resizable: w, columnWidths: it, onColumnResize: lt }), { orderedColumns: mt, handleColumnDragEnd: Se } = Vt({
    columns: z,
    columnReorderable: j,
    columnOrder: at,
    onColumnReorder: ot
  }), { handleRowDragEnd: $e } = Ft({ data: c, onRowReorder: nt }), [gt, ve] = l.useState(null), yt = Rt(
    Xe(Et, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    Xe(Dt, {
      coordinateGetter: It
    })
  ), ut = l.useCallback(
    (e) => {
      const { active: r } = e;
      String(r.id).startsWith("row-") ? $e(e) : Se(e);
    },
    [Se, $e]
  ), K = (s == null ? void 0 : s.expandedRowIds) ?? dt, V = (s == null ? void 0 : s.onExpandedChange) ?? ht, U = c.length > 0 && N.length === c.length, We = N.length > 0 && !U, Re = () => {
    U ? h == null || h([]) : h == null || h(c.map((e) => e.id));
  }, Ee = l.useCallback((e) => {
    N.includes(e) ? h == null || h(N.filter((r) => r !== e)) : h == null || h([...N, e]);
  }, [N, h]), { handleSort: De, getSortDirection: Ce, getSortPriority: Ke } = Xt({
    sortState: Ae,
    onSortChange: et,
    multiSort: tt,
    shouldWarn: _
  }), I = Jt, le = l.useCallback((e) => s ? s.rowExpandable ? s.rowExpandable(e) : !0 : !1, [s]), Ie = l.useCallback((e) => K.includes(e), [K]), He = l.useCallback((e) => {
    K.includes(e) ? V(K.filter((r) => r !== e)) : V([...K, e]);
  }, [K, V]), F = l.useMemo(() => s ? c.filter((e) => le(e)).map((e) => e.id) : [], [c, s]), G = F.length > 0 && F.every((e) => K.includes(e)), Te = () => {
    V(G ? [] : F);
  }, X = (i == null ? void 0 : i.showDelete) ?? !!(i != null && i.onRowDelete), xt = (i == null ? void 0 : i.showAdd) ?? !!(i != null && i.onRowAdd), Y = z.length + (x ? 1 : 0) + (s ? 1 : 0) + (o ? 1 : 0) + (X ? 1 : 0), {
    middleRowSet: ze,
    getRowSpan: je,
    isGroupCellHovered: Oe,
    isGroupCellSelected: _e
  } = Mt({ data: c, rowGrouping: O, hoveredRowIndex: gt, selectedIds: N }), { getStickyStyles: q, hasLeftStickyColumns: D } = Lt({
    columns: z,
    selectable: x,
    expandable: s,
    rowReorderable: o
  }), Z = (e) => {
    const r = q(e, !0), a = (n) => typeof n == "number" ? `${n}px` : n, S = {};
    if (!e.sticky) {
      const n = w ? Q(e) : void 0;
      n !== void 0 ? (S.width = `${n}px`, S.minWidth = `${n}px`) : (e.width && (S.width = a(e.width)), e.minWidth && (S.minWidth = a(e.minWidth)));
    }
    const p = { ...S, ...r.style }, H = Nt.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", B = w && /* @__PURE__ */ t(
      "div",
      {
        className: v(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          pt === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (n) => ft(n, e),
        onPointerDown: (n) => n.stopPropagation(),
        onClick: (n) => n.stopPropagation()
      }
    );
    return j && !e.sticky && !e.sortable ? /* @__PURE__ */ f(
      Bt,
      {
        id: String(e.accessorKey),
        style: p,
        className: v(I(e.align), r.className, w && "relative overflow-visible", H),
        children: [
          e.header,
          B
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ f(
      Je,
      {
        sortDirection: Ce(e.accessorKey),
        sortPriority: Ke(e.accessorKey),
        onSort: () => De(e.accessorKey),
        style: p,
        className: v(I(e.align), r.className, w && "relative overflow-visible", H),
        children: [
          e.header,
          B
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ f(
      m,
      {
        style: p,
        className: v(I(e.align), r.className, w && "relative overflow-visible", H),
        children: [
          e.header,
          B
        ]
      },
      String(e.accessorKey)
    );
  }, y = j ? mt : z, Be = y.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), kt = c.map((e) => `row-${e.id}`), bt = l.useCallback(() => 0, []), ae = l.useCallback(
    () => o ? d : 0,
    [o]
  ), A = l.useCallback(() => {
    let e = 0;
    return o && (e += d), x && (e += g), e;
  }, [o, x]), {
    groupedColumnsSet: Le,
    columnsWithRightBorder: Nt,
    getHeaderGroupColSpan: wt,
    getHeaderGroupStickyData: Pe,
    headerGroupItems: Me
  } = qt({
    columns: z,
    columnsToRender: y,
    headerGroups: E,
    getStickyStyles: q,
    getColumnWidth: Q,
    resizable: w,
    shouldWarn: _
  }), Ve = l.useMemo(
    () => ({
      columnsToRender: y,
      rowReorderable: o,
      selectable: x,
      expandable: !!s,
      showRowDelete: X,
      hasLeftStickyColumns: D,
      resizable: w,
      rowActions: i,
      rowGrouping: O,
      middleRowSet: ze,
      dataLength: c.length,
      getCheckboxHeaderLeftOffset: ae,
      getExpandHeaderLeftOffset: A,
      getRowSpan: je,
      isGroupCellHovered: Oe,
      isGroupCellSelected: _e,
      getStickyStyles: q,
      getColumnWidth: Q,
      getAlignClass: I,
      handleSelectRow: Ee,
      toggleRowExpanded: He,
      startEditing: ke,
      completeEditing: be,
      cancelEditing: Ne,
      setEditValue: xe,
      setEditingCell: ue,
      editValueRef: ge,
      editingCellRef: ye,
      onCellChange: re,
      onRowClick: de,
      rowClassName: he,
      setHoveredRowIndex: ve
    }),
    [
      y,
      o,
      x,
      s,
      X,
      D,
      w,
      i,
      O,
      ze,
      c.length,
      ae,
      A,
      je,
      Oe,
      _e,
      q,
      Q,
      I,
      Ee,
      He,
      ke,
      be,
      Ne,
      xe,
      ue,
      ge,
      ye,
      re,
      de,
      he,
      ve
    ]
  ), Fe = /* @__PURE__ */ f(Tt, { className: rt, maxHeight: P, wrapperRef: we, children: [
    /* @__PURE__ */ f(zt, { children: [
      E && E.length > 0 && /* @__PURE__ */ f(T, { children: [
        o && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${d}px`,
              minWidth: `${d}px`,
              ...D && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        x && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${g}px`,
              minWidth: `${g}px`,
              ...D && { position: "sticky", left: o ? d : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              Qe,
              {
                checked: U,
                indeterminate: We,
                onCheckedChange: Re,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        s && /* @__PURE__ */ t(
          m,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${u}px`,
              minWidth: `${u}px`,
              ...D && { position: "sticky", left: A(), zIndex: 20 }
            },
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && F.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Te,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": G ? "모두 접기" : "모두 펼치기",
                children: G ? /* @__PURE__ */ t(Ue, { size: 24 }) : /* @__PURE__ */ t(Ye, { size: 24 })
              }
            )
          }
        ),
        X && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${R}px`,
              minWidth: `${R}px`,
              maxWidth: `${R}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        Me.map((e, r) => {
          const a = Me[r + 1], S = e.type === "group" && (a == null ? void 0 : a.type) === "group";
          if (e.type === "group") {
            const p = wt(e.group);
            if (p === 0) return null;
            const C = y.filter(
              ($) => e.group.columns.includes($.accessorKey)
            );
            if (new Set(
              C.map(($) => $.sticky ?? "none")
            ).size > 1) {
              const $ = [];
              let L = [], te = C[0].sticky;
              for (const b of C)
                b.sticky === te ? L.push(b) : (L.length > 0 && $.push({ cols: L, sticky: te }), L = [b], te = b.sticky);
              L.length > 0 && $.push({ cols: L, sticky: te });
              const Ge = $.findIndex((b) => !b.sticky), St = Ge !== -1 ? Ge : 0;
              return $.map((b, oe) => {
                const $t = {
                  header: e.group.header,
                  columns: b.cols.map((Wt) => Wt.accessorKey),
                  align: e.group.align
                }, ne = b.sticky ? Pe($t) : { style: {}, className: "" }, vt = !!ne.style.position;
                return /* @__PURE__ */ t(
                  m,
                  {
                    colSpan: b.cols.length,
                    className: v(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      S && oe === $.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      ne.className
                    ),
                    style: vt ? ne.style : { position: "relative", zIndex: 0 },
                    children: oe === St ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${oe}`
                );
              });
            }
            const ee = Pe(e.group), n = !!ee.style.position;
            return /* @__PURE__ */ t(
              m,
              {
                colSpan: p,
                className: v(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  S && "border-r border-slate-200 dark:border-slate-700",
                  ee.className
                ),
                style: n ? ee.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const p = q(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ t(
              Je,
              {
                rowSpan: 2,
                sortDirection: Ce(e.col.accessorKey),
                sortPriority: Ke(e.col.accessorKey),
                onSort: () => De(e.col.accessorKey),
                className: v(
                  I(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  p.className
                ),
                style: p.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ t(
              m,
              {
                rowSpan: 2,
                className: v(
                  I(e.col.align),
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
      /* @__PURE__ */ f(T, { children: [
        !E && o && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: D ? {
              position: "sticky",
              left: bt(),
              zIndex: 20,
              width: `${d}px`,
              minWidth: `${d}px`,
              maxWidth: `${d}px`
            } : {
              width: `${d}px`,
              minWidth: `${d}px`,
              maxWidth: `${d}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !E && x && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: D ? {
              position: "sticky",
              left: ae(),
              zIndex: 20,
              width: `${g}px`,
              minWidth: `${g}px`,
              maxWidth: `${g}px`
            } : {
              width: `${g}px`,
              minWidth: `${g}px`,
              maxWidth: `${g}px`
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              Qe,
              {
                checked: U,
                indeterminate: We,
                onCheckedChange: Re,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !E && s && /* @__PURE__ */ t(
          m,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: D ? {
              position: "sticky",
              left: A(),
              zIndex: 20,
              width: `${u}px`,
              minWidth: `${u}px`,
              maxWidth: `${u}px`
            } : {
              width: `${u}px`,
              minWidth: `${u}px`,
              maxWidth: `${u}px`
            },
            "aria-label": "확장",
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && F.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Te,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": G ? "모두 접기" : "모두 펼치기",
                children: G ? /* @__PURE__ */ t(Ue, { size: 24 }) : /* @__PURE__ */ t(Ye, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !E && X && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${R}px`,
              minWidth: `${R}px`,
              maxWidth: `${R}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        E ? j ? /* @__PURE__ */ t(ce, { items: Be, strategy: qe, children: y.filter((e) => Le.has(e.accessorKey)).map(Z) }) : y.filter((e) => Le.has(e.accessorKey)).map(Z) : j ? /* @__PURE__ */ t(ce, { items: Be, strategy: qe, children: y.map(Z) }) : y.map(Z)
      ] })
    ] }),
    /* @__PURE__ */ f(jt, { children: [
      pe ? /* @__PURE__ */ t(T, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        W,
        {
          colSpan: Y,
          className: v(
            "text-center",
            M || J !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: M ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: k ? { width: k } : void 0,
                children: M
              }
            )
          ) : J === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const r = typeof P == "number" ? P : typeof P == "string" && parseInt(P, 10) || 320, a = Math.max(1, Math.floor(r / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: a }).map((S, p) => /* @__PURE__ */ f(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    o && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(se, { width: 16, height: 16 }) }),
                    x && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(se, { width: 18, height: 18 }) }),
                    s && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(se, { width: 18, height: 18 }) }),
                    y.map((C) => {
                      const H = C.width ?? C.minWidth, B = typeof H == "number" ? Math.min(H * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(se, { height: 16, width: B }) }, String(C.accessorKey));
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
                style: k ? { width: k } : void 0,
                children: /* @__PURE__ */ t(Ot, { size: "lg" })
              }
            )
          )
        }
      ) }) : c.length === 0 ? /* @__PURE__ */ t(T, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        W,
        {
          colSpan: Y,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: k ? { width: k } : void 0,
              children: st
            }
          )
        }
      ) }) : o ? /* @__PURE__ */ t(ce, { items: kt, strategy: Ht, children: c.map((e, r) => {
        const a = Ie(e.id);
        return /* @__PURE__ */ f(l.Fragment, { children: [
          /* @__PURE__ */ t(
            Ze,
            {
              row: e,
              rowIndex: r,
              isSelected: N.includes(e.id),
              canExpand: le(e),
              isExpanded: a,
              editingCell: fe,
              editValue: me,
              ctx: Ve
            }
          ),
          s && a && /* @__PURE__ */ t(T, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            W,
            {
              colSpan: Y,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: k ? `${k}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: s.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : c.map((e, r) => {
        const a = Ie(e.id);
        return /* @__PURE__ */ f(l.Fragment, { children: [
          /* @__PURE__ */ t(
            Ze,
            {
              row: e,
              rowIndex: r,
              isSelected: N.includes(e.id),
              canExpand: le(e),
              isExpanded: a,
              editingCell: fe,
              editValue: me,
              ctx: Ve
            }
          ),
          s && a && /* @__PURE__ */ t(T, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            W,
            {
              colSpan: Y,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: k ? `${k}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: s.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      xt && !pe && /* @__PURE__ */ f(T, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        o && /* @__PURE__ */ t(
          W,
          {
            className: "!p-0",
            style: {
              width: `${d}px`,
              minWidth: `${d}px`,
              maxWidth: `${d}px`
            }
          }
        ),
        x && /* @__PURE__ */ t(
          W,
          {
            className: "!p-0",
            style: {
              width: `${g}px`,
              minWidth: `${g}px`,
              maxWidth: `${g}px`
            }
          }
        ),
        s && /* @__PURE__ */ t(
          W,
          {
            className: "!p-0",
            style: {
              width: `${u}px`,
              minWidth: `${u}px`,
              maxWidth: `${u}px`
            }
          }
        ),
        /* @__PURE__ */ t(
          W,
          {
            className: "!p-0",
            style: {
              width: `${R}px`,
              minWidth: `${R}px`,
              maxWidth: `${R}px`
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
                children: /* @__PURE__ */ t(_t, { size: 20 })
              }
            )
          }
        ),
        y.map((e) => /* @__PURE__ */ t(
          W,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return j || o ? /* @__PURE__ */ t(
    Ct,
    {
      sensors: yt,
      collisionDetection: Kt,
      onDragEnd: ut,
      children: Fe
    }
  ) : Fe;
}
export {
  xs as DataTable
};
//# sourceMappingURL=data-table.mjs.map
