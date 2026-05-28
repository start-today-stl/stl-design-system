import { jsxs as N, jsx as t } from "react/jsx-runtime";
import * as i from "react";
import { useSensors as Rt, useSensor as Ge, PointerSensor as Et, KeyboardSensor as vt, DndContext as Dt, closestCenter as Ct } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as It, SortableContext as ne, horizontalListSortingStrategy as Xe, verticalListSortingStrategy as Tt } from "@dnd-kit/sortable";
import { cn as P } from "../../../lib/utils.mjs";
import { Table as Ht, TableHeader as Kt, TableRow as v, TableHead as m, TableSortableHead as zt, TableBody as _t, TableCell as S } from "../table.mjs";
import { Checkbox as Ye } from "../../ui/checkbox.mjs";
import { Skeleton as U } from "../../ui/skeleton.mjs";
import { SplashScreen as jt } from "../../ui/splash-screen.mjs";
import { DownIcon as qe } from "../../../icons/DownIcon.mjs";
import { RightIcon as Je } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as Ot } from "../../../icons/RowAddIcon.mjs";
import { DataTableBodyRow as Qe } from "./data-table-body-row.mjs";
import { DataTableColumnHeader as Lt } from "./data-table-column-header.mjs";
import { useStickyStyles as Bt } from "./hooks/use-sticky-styles.mjs";
import { useColumnResize as Mt } from "./hooks/use-column-resize.mjs";
import { useRowGrouping as Vt } from "./hooks/use-row-grouping.mjs";
import { useColumnReorder as Pt } from "./hooks/use-column-reorder.mjs";
import { useRowReorder as Ft } from "./hooks/use-row-reorder.mjs";
import { useCellEditing as Gt } from "./hooks/use-cell-editing.mjs";
import { useSort as Xt } from "./hooks/use-sort.mjs";
import { useHeaderGroups as Yt } from "./hooks/use-header-groups.mjs";
import { getAlignClass as qt } from "./utils.mjs";
import { DRAG_HANDLE_WIDTH as c, CHECKBOX_WIDTH as h, EXPAND_WIDTH as f, ROW_ACTIONS_WIDTH as $ } from "./types.mjs";
const Jt = [];
function ks({
  columns: D,
  data: n,
  selectable: y = !1,
  selectedIds: x = Jt,
  onSelectionChange: d,
  sortState: Ue,
  onSortChange: Ze,
  multiSort: Ae = !1,
  onRowClick: oe,
  onCellChange: Z,
  expandable: s,
  emptyMessage: et = "데이터가 없습니다.",
  className: tt,
  rowClassName: ce,
  maxHeight: z,
  resizable: C = !1,
  columnWidths: st,
  onColumnResize: rt,
  columnReorderable: I = !1,
  columnOrder: it,
  onColumnReorder: lt,
  rowReorderable: A = !1,
  onRowReorder: at,
  loading: de = !1,
  loadingMode: F = "splash",
  loadingContent: _,
  headerGroups: w,
  rowGrouping: T,
  rowActions: r
}) {
  const a = T ? !1 : A, H = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  i.useEffect(() => {
    H && T && A && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [T, A, H]), i.useEffect(() => {
    H && _ && F !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [_, F, H]);
  const {
    editingCell: he,
    editValue: pe,
    editValueRef: me,
    editingCellRef: fe,
    setEditingCell: ye,
    setEditValue: ge,
    startEditing: ue,
    completeEditing: xe,
    cancelEditing: ke
  } = Gt({ columns: D, data: n, onCellChange: Z }), be = i.useRef(null), [g, nt] = i.useState(0);
  i.useEffect(() => {
    const e = be.current;
    if (!e) return;
    const l = () => nt(e.clientWidth);
    l();
    const o = new ResizeObserver(l);
    return o.observe(e), () => o.disconnect();
  }, []);
  const [ot, ct] = i.useState(
    (s == null ? void 0 : s.defaultExpandedRowIds) ?? []
  ), {
    resizingColumn: dt,
    getColumnWidth: G,
    handleResizeStart: ht
  } = Mt({ resizable: C, columnWidths: st, onColumnResize: rt }), { orderedColumns: pt, handleColumnDragEnd: Ne } = Pt({
    columns: D,
    columnReorderable: I,
    columnOrder: it,
    onColumnReorder: lt
  }), { handleRowDragEnd: Se } = Ft({ data: n, onRowReorder: at }), [mt, $e] = i.useState(null), ft = Rt(
    Ge(Et, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    Ge(vt, {
      coordinateGetter: It
    })
  ), yt = i.useCallback(
    (e) => {
      const { active: l } = e;
      String(l.id).startsWith("row-") ? Se(e) : Ne(e);
    },
    [Ne, Se]
  ), R = (s == null ? void 0 : s.expandedRowIds) ?? ot, j = (s == null ? void 0 : s.onExpandedChange) ?? ct, X = n.length > 0 && x.length === n.length, we = x.length > 0 && !X, We = () => {
    X ? d == null || d([]) : d == null || d(n.map((e) => e.id));
  }, Re = i.useCallback((e) => {
    x.includes(e) ? d == null || d(x.filter((l) => l !== e)) : d == null || d([...x, e]);
  }, [x, d]), { handleSort: Ee, getSortDirection: ve, getSortPriority: De } = Xt({
    sortState: Ue,
    onSortChange: Ze,
    multiSort: Ae,
    shouldWarn: H
  }), O = qt, ee = i.useCallback((e) => s ? s.rowExpandable ? s.rowExpandable(e) : !0 : !1, [s]), Ce = i.useCallback((e) => R.includes(e), [R]), Ie = i.useCallback((e) => {
    R.includes(e) ? j(R.filter((l) => l !== e)) : j([...R, e]);
  }, [R, j]), L = i.useMemo(() => s ? n.filter((e) => ee(e)).map((e) => e.id) : [], [n, s]), B = L.length > 0 && L.every((e) => R.includes(e)), Te = () => {
    j(B ? [] : L);
  }, M = (r == null ? void 0 : r.showDelete) ?? !!(r != null && r.onRowDelete), gt = (r == null ? void 0 : r.showAdd) ?? !!(r != null && r.onRowAdd), Y = D.length + (y ? 1 : 0) + (s ? 1 : 0) + (a ? 1 : 0) + (M ? 1 : 0), {
    middleRowSet: He,
    getRowSpan: Ke,
    isGroupCellHovered: ze,
    isGroupCellSelected: _e
  } = Vt({ data: n, rowGrouping: T, hoveredRowIndex: mt, selectedIds: x }), { getStickyStyles: V, hasLeftStickyColumns: W } = Bt({
    columns: D,
    selectable: y,
    expandable: s,
    rowReorderable: a
  }), q = (e) => /* @__PURE__ */ t(
    Lt,
    {
      column: e,
      stickyData: V(e, !0),
      alignClass: O(e.align),
      needsRightBorder: kt.has(e.accessorKey),
      resizable: C,
      resizedWidth: C ? G(e) : void 0,
      isResizing: dt === e.accessorKey,
      onResizeStart: ht,
      columnReorderable: I,
      sortDirection: ve(e.accessorKey),
      sortPriority: De(e.accessorKey),
      onSort: () => Ee(e.accessorKey)
    },
    String(e.accessorKey)
  ), p = I ? pt : D, je = p.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), ut = n.map((e) => `row-${e.id}`), xt = i.useCallback(() => 0, []), te = i.useCallback(
    () => a ? c : 0,
    [a]
  ), J = i.useCallback(() => {
    let e = 0;
    return a && (e += c), y && (e += h), e;
  }, [a, y]), {
    groupedColumnsSet: Oe,
    columnsWithRightBorder: kt,
    getHeaderGroupColSpan: bt,
    getHeaderGroupStickyData: Le,
    headerGroupItems: Be
  } = Yt({
    columns: D,
    columnsToRender: p,
    headerGroups: w,
    getStickyStyles: V,
    getColumnWidth: G,
    resizable: C,
    shouldWarn: H
  }), Me = i.useMemo(
    () => ({
      columnsToRender: p,
      rowReorderable: a,
      selectable: y,
      expandable: !!s,
      showRowDelete: M,
      hasLeftStickyColumns: W,
      resizable: C,
      rowActions: r,
      rowGrouping: T,
      middleRowSet: He,
      dataLength: n.length,
      getCheckboxHeaderLeftOffset: te,
      getExpandHeaderLeftOffset: J,
      getRowSpan: Ke,
      isGroupCellHovered: ze,
      isGroupCellSelected: _e,
      getStickyStyles: V,
      getColumnWidth: G,
      getAlignClass: O,
      handleSelectRow: Re,
      toggleRowExpanded: Ie,
      startEditing: ue,
      completeEditing: xe,
      cancelEditing: ke,
      setEditValue: ge,
      setEditingCell: ye,
      editValueRef: me,
      editingCellRef: fe,
      onCellChange: Z,
      onRowClick: oe,
      rowClassName: ce,
      setHoveredRowIndex: $e
    }),
    [
      p,
      a,
      y,
      s,
      M,
      W,
      C,
      r,
      T,
      He,
      n.length,
      te,
      J,
      Ke,
      ze,
      _e,
      V,
      G,
      O,
      Re,
      Ie,
      ue,
      xe,
      ke,
      ge,
      ye,
      me,
      fe,
      Z,
      oe,
      ce,
      $e
    ]
  ), Ve = /* @__PURE__ */ N(Ht, { className: tt, maxHeight: z, wrapperRef: be, children: [
    /* @__PURE__ */ N(Kt, { children: [
      w && w.length > 0 && /* @__PURE__ */ N(v, { children: [
        a && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${c}px`,
              minWidth: `${c}px`,
              ...W && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        y && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${h}px`,
              minWidth: `${h}px`,
              ...W && { position: "sticky", left: a ? c : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              Ye,
              {
                checked: X,
                indeterminate: we,
                onCheckedChange: We,
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
              width: `${f}px`,
              minWidth: `${f}px`,
              ...W && { position: "sticky", left: J(), zIndex: 20 }
            },
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && L.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Te,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": B ? "모두 접기" : "모두 펼치기",
                children: B ? /* @__PURE__ */ t(qe, { size: 24 }) : /* @__PURE__ */ t(Je, { size: 24 })
              }
            )
          }
        ),
        M && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${$}px`,
              minWidth: `${$}px`,
              maxWidth: `${$}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        Be.map((e, l) => {
          const o = Be[l + 1], se = e.type === "group" && (o == null ? void 0 : o.type) === "group";
          if (e.type === "group") {
            const k = bt(e.group);
            if (k === 0) return null;
            const E = p.filter(
              (b) => e.group.columns.includes(b.accessorKey)
            );
            if (new Set(
              E.map((b) => b.sticky ?? "none")
            ).size > 1) {
              const b = [];
              let K = [], Q = E[0].sticky;
              for (const u of E)
                u.sticky === Q ? K.push(u) : (K.length > 0 && b.push({ cols: K, sticky: Q }), K = [u], Q = u.sticky);
              K.length > 0 && b.push({ cols: K, sticky: Q });
              const Fe = b.findIndex((u) => !u.sticky), St = Fe !== -1 ? Fe : 0;
              return b.map((u, le) => {
                const $t = {
                  header: e.group.header,
                  columns: u.cols.map((Wt) => Wt.accessorKey),
                  align: e.group.align
                }, ae = u.sticky ? Le($t) : { style: {}, className: "" }, wt = !!ae.style.position;
                return /* @__PURE__ */ t(
                  m,
                  {
                    colSpan: u.cols.length,
                    className: P(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      se && le === b.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      ae.className
                    ),
                    style: wt ? ae.style : { position: "relative", zIndex: 0 },
                    children: le === St ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${le}`
                );
              });
            }
            const ie = Le(e.group), Nt = !!ie.style.position;
            return /* @__PURE__ */ t(
              m,
              {
                colSpan: k,
                className: P(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  se && "border-r border-slate-200 dark:border-slate-700",
                  ie.className
                ),
                style: Nt ? ie.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const k = V(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ t(
              zt,
              {
                rowSpan: 2,
                sortDirection: ve(e.col.accessorKey),
                sortPriority: De(e.col.accessorKey),
                onSort: () => Ee(e.col.accessorKey),
                className: P(
                  O(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  k.className
                ),
                style: k.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ t(
              m,
              {
                rowSpan: 2,
                className: P(
                  O(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  k.className
                ),
                style: k.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            );
          }
        })
      ] }),
      /* @__PURE__ */ N(v, { children: [
        !w && a && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: W ? {
              position: "sticky",
              left: xt(),
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
        !w && y && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: W ? {
              position: "sticky",
              left: te(),
              zIndex: 20,
              width: `${h}px`,
              minWidth: `${h}px`,
              maxWidth: `${h}px`
            } : {
              width: `${h}px`,
              minWidth: `${h}px`,
              maxWidth: `${h}px`
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              Ye,
              {
                checked: X,
                indeterminate: we,
                onCheckedChange: We,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !w && s && /* @__PURE__ */ t(
          m,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: W ? {
              position: "sticky",
              left: J(),
              zIndex: 20,
              width: `${f}px`,
              minWidth: `${f}px`,
              maxWidth: `${f}px`
            } : {
              width: `${f}px`,
              minWidth: `${f}px`,
              maxWidth: `${f}px`
            },
            "aria-label": "확장",
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && L.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Te,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": B ? "모두 접기" : "모두 펼치기",
                children: B ? /* @__PURE__ */ t(qe, { size: 24 }) : /* @__PURE__ */ t(Je, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !w && M && /* @__PURE__ */ t(
          m,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${$}px`,
              minWidth: `${$}px`,
              maxWidth: `${$}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        w ? I ? /* @__PURE__ */ t(ne, { items: je, strategy: Xe, children: p.filter((e) => Oe.has(e.accessorKey)).map(q) }) : p.filter((e) => Oe.has(e.accessorKey)).map(q) : I ? /* @__PURE__ */ t(ne, { items: je, strategy: Xe, children: p.map(q) }) : p.map(q)
      ] })
    ] }),
    /* @__PURE__ */ N(_t, { children: [
      de ? /* @__PURE__ */ t(v, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        S,
        {
          colSpan: Y,
          className: P(
            "text-center",
            _ || F !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: _ ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: g ? { width: g } : void 0,
                children: _
              }
            )
          ) : F === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const l = typeof z == "number" ? z : typeof z == "string" && parseInt(z, 10) || 320, o = Math.max(1, Math.floor(l / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: o }).map((se, k) => /* @__PURE__ */ N(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    a && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(U, { width: 16, height: 16 }) }),
                    y && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(U, { width: 18, height: 18 }) }),
                    s && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(U, { width: 18, height: 18 }) }),
                    p.map((E) => {
                      const re = E.width ?? E.minWidth, Pe = typeof re == "number" ? Math.min(re * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(U, { height: 16, width: Pe }) }, String(E.accessorKey));
                    })
                  ]
                },
                k
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본) - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: g ? { width: g } : void 0,
                children: /* @__PURE__ */ t(jt, { size: "lg" })
              }
            )
          )
        }
      ) }) : n.length === 0 ? /* @__PURE__ */ t(v, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        S,
        {
          colSpan: Y,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: g ? { width: g } : void 0,
              children: et
            }
          )
        }
      ) }) : a ? /* @__PURE__ */ t(ne, { items: ut, strategy: Tt, children: n.map((e, l) => {
        const o = Ce(e.id);
        return /* @__PURE__ */ N(i.Fragment, { children: [
          /* @__PURE__ */ t(
            Qe,
            {
              row: e,
              rowIndex: l,
              isSelected: x.includes(e.id),
              canExpand: ee(e),
              isExpanded: o,
              editingCell: he,
              editValue: pe,
              ctx: Me
            }
          ),
          s && o && /* @__PURE__ */ t(v, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            S,
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
                    width: g ? `${g}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: s.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : n.map((e, l) => {
        const o = Ce(e.id);
        return /* @__PURE__ */ N(i.Fragment, { children: [
          /* @__PURE__ */ t(
            Qe,
            {
              row: e,
              rowIndex: l,
              isSelected: x.includes(e.id),
              canExpand: ee(e),
              isExpanded: o,
              editingCell: he,
              editValue: pe,
              ctx: Me
            }
          ),
          s && o && /* @__PURE__ */ t(v, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            S,
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
                    width: g ? `${g}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: s.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      gt && !de && /* @__PURE__ */ N(v, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        a && /* @__PURE__ */ t(
          S,
          {
            className: "!p-0",
            style: {
              width: `${c}px`,
              minWidth: `${c}px`,
              maxWidth: `${c}px`
            }
          }
        ),
        y && /* @__PURE__ */ t(
          S,
          {
            className: "!p-0",
            style: {
              width: `${h}px`,
              minWidth: `${h}px`,
              maxWidth: `${h}px`
            }
          }
        ),
        s && /* @__PURE__ */ t(
          S,
          {
            className: "!p-0",
            style: {
              width: `${f}px`,
              minWidth: `${f}px`,
              maxWidth: `${f}px`
            }
          }
        ),
        /* @__PURE__ */ t(
          S,
          {
            className: "!p-0",
            style: {
              width: `${$}px`,
              minWidth: `${$}px`,
              maxWidth: `${$}px`
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
                children: /* @__PURE__ */ t(Ot, { size: 20 })
              }
            )
          }
        ),
        p.map((e) => /* @__PURE__ */ t(
          S,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return I || a ? /* @__PURE__ */ t(
    Dt,
    {
      sensors: ft,
      collisionDetection: Ct,
      onDragEnd: yt,
      children: Ve
    }
  ) : Ve;
}
export {
  ks as DataTable
};
//# sourceMappingURL=index.mjs.map
