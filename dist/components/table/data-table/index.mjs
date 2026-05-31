import { jsxs as u, jsx as t, Fragment as It } from "react/jsx-runtime";
import * as r from "react";
import { useSensors as Tt, useSensor as qe, PointerSensor as zt, KeyboardSensor as Ht, DndContext as Kt, closestCenter as _t } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as jt, SortableContext as fe, horizontalListSortingStrategy as Ge, verticalListSortingStrategy as Ot } from "@dnd-kit/sortable";
import { cn as G } from "../../../lib/utils.mjs";
import { Table as Lt, TableHeader as Mt, TableRow as w, TableHead as y, TableSortableHead as Vt, TableBody as Bt, TableCell as m } from "../table.mjs";
import { Checkbox as Je } from "../../ui/checkbox.mjs";
import { Skeleton as re } from "../../ui/skeleton.mjs";
import { SplashScreen as Ft } from "../../ui/splash-screen.mjs";
import { DownIcon as Qe } from "../../../icons/DownIcon.mjs";
import { RightIcon as Ue } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as Pt } from "../../../icons/RowAddIcon.mjs";
import { DataTableBodyRow as ge } from "./data-table-body-row.mjs";
import { DataTableColumnHeader as Xt } from "./data-table-column-header.mjs";
import { useStickyStyles as Yt } from "./hooks/use-sticky-styles.mjs";
import { useColumnResize as qt } from "./hooks/use-column-resize.mjs";
import { useRowGrouping as Gt } from "./hooks/use-row-grouping.mjs";
import { useColumnReorder as Jt } from "./hooks/use-column-reorder.mjs";
import { useRowReorder as Qt } from "./hooks/use-row-reorder.mjs";
import { useCellEditing as Ut } from "./hooks/use-cell-editing.mjs";
import { useSort as Zt } from "./hooks/use-sort.mjs";
import { useHeaderGroups as At } from "./hooks/use-header-groups.mjs";
import { useTableVirtualizer as es } from "./hooks/use-table-virtualizer.mjs";
import { getAlignClass as ts } from "./utils.mjs";
import { DRAG_HANDLE_WIDTH as c, CHECKBOX_WIDTH as f, EXPAND_WIDTH as x, ROW_ACTIONS_WIDTH as W } from "./types.mjs";
const ss = [];
function Ws({
  columns: C,
  data: n,
  selectable: k = !1,
  selectedIds: b = ss,
  onSelectionChange: d,
  sortState: Ze,
  onSortChange: Ae,
  multiSort: et = !1,
  onRowClick: ue,
  onCellChange: ie,
  expandable: s,
  emptyMessage: tt = "데이터가 없습니다.",
  className: st,
  rowClassName: ye,
  maxHeight: M,
  resizable: K = !1,
  columnWidths: rt,
  onColumnResize: it,
  columnReorderable: _ = !1,
  columnOrder: lt,
  onColumnReorder: at,
  rowReorderable: le = !1,
  onRowReorder: nt,
  loading: xe = !1,
  loadingMode: J = "splash",
  loadingContent: V,
  headerGroups: E,
  rowGrouping: v,
  rowActions: i,
  virtual: ot
}) {
  const o = v ? !1 : le, I = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  r.useEffect(() => {
    I && v && le && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [v, le, I]), r.useEffect(() => {
    I && V && J !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [V, J, I]);
  const {
    editingCell: ae,
    editValue: ne,
    editValueRef: ke,
    editingCellRef: be,
    setEditingCell: Ne,
    setEditValue: Se,
    startEditing: we,
    completeEditing: ve,
    cancelEditing: Re
  } = Ut({ columns: C, data: n, onCellChange: ie }), oe = r.useRef(null), [h, ct] = r.useState(0);
  r.useEffect(() => {
    const e = oe.current;
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
  } = qt({ resizable: K, columnWidths: rt, onColumnResize: it }), { orderedColumns: ft, handleColumnDragEnd: $e } = Jt({
    columns: C,
    columnReorderable: _,
    columnOrder: lt,
    onColumnReorder: at
  }), { handleRowDragEnd: We } = Qt({ data: n, onRowReorder: nt }), [gt, Ee] = r.useState(null), ut = Tt(
    qe(zt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    qe(Ht, {
      coordinateGetter: jt
    })
  ), yt = r.useCallback(
    (e) => {
      const { active: l } = e;
      String(l.id).startsWith("row-") ? We(e) : $e(e);
    },
    [$e, We]
  ), T = (s == null ? void 0 : s.expandedRowIds) ?? dt, B = (s == null ? void 0 : s.onExpandedChange) ?? ht, U = n.length > 0 && b.length === n.length, De = b.length > 0 && !U, Ce = () => {
    U ? d == null || d([]) : d == null || d(n.map((e) => e.id));
  }, Ie = r.useCallback((e) => {
    b.includes(e) ? d == null || d(b.filter((l) => l !== e)) : d == null || d([...b, e]);
  }, [b, d]), { handleSort: Te, getSortDirection: ze, getSortPriority: He } = Zt({
    sortState: Ze,
    onSortChange: Ae,
    multiSort: et,
    shouldWarn: I
  }), F = ts, Z = r.useCallback((e) => s ? s.rowExpandable ? s.rowExpandable(e) : !0 : !1, [s]), ce = r.useCallback((e) => T.includes(e), [T]), Ke = r.useCallback((e) => {
    T.includes(e) ? B(T.filter((l) => l !== e)) : B([...T, e]);
  }, [T, B]), P = r.useMemo(() => s ? n.filter((e) => Z(e)).map((e) => e.id) : [], [n, s]), X = P.length > 0 && P.every((e) => T.includes(e)), _e = () => {
    B(X ? [] : P);
  }, Y = (i == null ? void 0 : i.showDelete) ?? !!(i != null && i.onRowDelete), xt = (i == null ? void 0 : i.showAdd) ?? !!(i != null && i.onRowAdd), z = C.length + (k ? 1 : 0) + (s ? 1 : 0) + (o ? 1 : 0) + (Y ? 1 : 0), {
    middleRowSet: je,
    getRowSpan: Oe,
    isGroupCellHovered: Le,
    isGroupCellSelected: Me
  } = Gt({ data: n, rowGrouping: v, hoveredRowIndex: gt, selectedIds: b }), { getStickyStyles: q, hasLeftStickyColumns: D } = Yt({
    columns: C,
    selectable: k,
    expandable: s,
    rowReorderable: o
  }), kt = C.some((e) => e.sticky), bt = o ? "rowReorderable (행 드래그앤드롭)" : v ? "rowGrouping (rowSpan 그룹핑)" : kt ? "sticky 컬럼 (가상화 스크롤 중 sub-pixel 깜빡임 발생, v2 div-based grid 에서 지원 예정)" : null, { isVirtual: Nt, virtualizer: A } = es({
    virtual: ot,
    disabledReason: bt,
    count: n.length,
    scrollContainerRef: oe,
    shouldWarn: I
  }), ee = (e) => /* @__PURE__ */ t(
    Xt,
    {
      column: e,
      stickyData: q(e, !0),
      alignClass: F(e.align),
      needsRightBorder: vt.has(e.accessorKey),
      resizable: K,
      resizedWidth: K ? Q(e) : void 0,
      isResizing: pt === e.accessorKey,
      onResizeStart: mt,
      columnReorderable: _,
      sortDirection: ze(e.accessorKey),
      sortPriority: He(e.accessorKey),
      onSort: () => Te(e.accessorKey)
    },
    String(e.accessorKey)
  ), g = _ ? ft : C, Ve = g.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), St = n.map((e) => `row-${e.id}`), wt = r.useCallback(() => 0, []), de = r.useCallback(
    () => o ? c : 0,
    [o]
  ), te = r.useCallback(() => {
    let e = 0;
    return o && (e += c), k && (e += f), e;
  }, [o, k]), {
    groupedColumnsSet: Be,
    columnsWithRightBorder: vt,
    getHeaderGroupColSpan: Rt,
    getHeaderGroupStickyData: Fe,
    headerGroupItems: Pe
  } = At({
    columns: C,
    columnsToRender: g,
    headerGroups: E,
    getStickyStyles: q,
    getColumnWidth: Q,
    resizable: K,
    shouldWarn: I
  }), he = r.useMemo(
    () => ({
      columnsToRender: g,
      rowReorderable: o,
      selectable: k,
      expandable: !!s,
      showRowDelete: Y,
      hasLeftStickyColumns: D,
      resizable: K,
      rowActions: i,
      rowGrouping: v,
      middleRowSet: je,
      // dataLength 는 rowGrouping 의 isGroupSpanToEnd 계산에만 사용됨.
      // rowGrouping 안 쓰면 0 으로 고정해서 행 추가/삭제 시 ctx invalidate 방지.
      dataLength: v ? n.length : 0,
      getCheckboxHeaderLeftOffset: de,
      getExpandHeaderLeftOffset: te,
      getRowSpan: Oe,
      isGroupCellHovered: Le,
      isGroupCellSelected: Me,
      getStickyStyles: q,
      getColumnWidth: Q,
      getAlignClass: F,
      handleSelectRow: Ie,
      toggleRowExpanded: Ke,
      startEditing: we,
      completeEditing: ve,
      cancelEditing: Re,
      setEditValue: Se,
      setEditingCell: Ne,
      editValueRef: ke,
      editingCellRef: be,
      onCellChange: ie,
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
      K,
      i,
      v,
      je,
      v ? n.length : 0,
      de,
      te,
      Oe,
      Le,
      Me,
      q,
      Q,
      F,
      Ie,
      Ke,
      we,
      ve,
      Re,
      Se,
      Ne,
      ke,
      be,
      ie,
      ue,
      ye,
      Ee
    ]
  ), Xe = /* @__PURE__ */ u(Lt, { className: st, maxHeight: M, wrapperRef: oe, children: [
    /* @__PURE__ */ u(Mt, { children: [
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
              ...D && { position: "sticky", left: te(), zIndex: 20 }
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
          const a = Pe[l + 1], j = e.type === "group" && (a == null ? void 0 : a.type) === "group";
          if (e.type === "group") {
            const p = Rt(e.group);
            if (p === 0) return null;
            const N = g.filter(
              ($) => e.group.columns.includes($.accessorKey)
            );
            if (new Set(
              N.map(($) => $.sticky ?? "none")
            ).size > 1) {
              const $ = [];
              let L = [], se = N[0].sticky;
              for (const S of N)
                S.sticky === se ? L.push(S) : (L.length > 0 && $.push({ cols: L, sticky: se }), L = [S], se = S.sticky);
              L.length > 0 && $.push({ cols: L, sticky: se });
              const Ye = $.findIndex((S) => !S.sticky), Wt = Ye !== -1 ? Ye : 0;
              return $.map((S, pe) => {
                const Et = {
                  header: e.group.header,
                  columns: S.cols.map((Ct) => Ct.accessorKey),
                  align: e.group.align
                }, me = S.sticky ? Fe(Et) : { style: {}, className: "" }, Dt = !!me.style.position;
                return /* @__PURE__ */ t(
                  y,
                  {
                    colSpan: S.cols.length,
                    className: G(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      j && pe === $.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      me.className
                    ),
                    style: Dt ? me.style : { position: "relative", zIndex: 0 },
                    children: pe === Wt ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${pe}`
                );
              });
            }
            const O = Fe(e.group), $t = !!O.style.position;
            return /* @__PURE__ */ t(
              y,
              {
                colSpan: p,
                className: G(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  j && "border-r border-slate-200 dark:border-slate-700",
                  O.className
                ),
                style: $t ? O.style : { position: "relative", zIndex: 0 },
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
              left: wt(),
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
              left: te(),
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
        E ? _ ? /* @__PURE__ */ t(fe, { items: Ve, strategy: Ge, children: g.filter((e) => Be.has(e.accessorKey)).map(ee) }) : g.filter((e) => Be.has(e.accessorKey)).map(ee) : _ ? /* @__PURE__ */ t(fe, { items: Ve, strategy: Ge, children: g.map(ee) }) : g.map(ee)
      ] })
    ] }),
    /* @__PURE__ */ u(Bt, { children: [
      xe ? /* @__PURE__ */ t(w, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        m,
        {
          colSpan: z,
          className: G(
            "text-center",
            V || J !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: V ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: h ? { width: h } : void 0,
                children: V
              }
            )
          ) : J === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const l = typeof M == "number" ? M : typeof M == "string" && parseInt(M, 10) || 320, a = Math.max(1, Math.floor(l / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: a }).map((j, p) => /* @__PURE__ */ u(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    o && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(re, { width: 16, height: 16 }) }),
                    k && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(re, { width: 18, height: 18 }) }),
                    s && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(re, { width: 18, height: 18 }) }),
                    g.map((N) => {
                      const H = N.width ?? N.minWidth, R = typeof H == "number" ? Math.min(H * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(re, { height: 16, width: R }) }, String(N.accessorKey));
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
                children: /* @__PURE__ */ t(Ft, { size: "lg" })
              }
            )
          )
        }
      ) }) : n.length === 0 ? /* @__PURE__ */ t(w, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        m,
        {
          colSpan: z,
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
      ) }) : o ? /* @__PURE__ */ t(fe, { items: St, strategy: Ot, children: n.map((e, l) => {
        const a = ce(e.id);
        return /* @__PURE__ */ u(r.Fragment, { children: [
          /* @__PURE__ */ t(
            ge,
            {
              row: e,
              rowIndex: l,
              isSelected: b.includes(e.id),
              canExpand: Z(e),
              isExpanded: a,
              editingCell: ae,
              editValue: ne,
              ctx: he
            }
          ),
          s && a && /* @__PURE__ */ t(w, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            m,
            {
              colSpan: z,
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
      }) }) : Nt && A ? (
        // 가상화 활성: 보이는 행만 렌더 + 상하 spacer 행으로 스크롤 영역 유지
        // TableBody (= tbody) 안에서 spacer-row 패턴 사용 (semantic HTML 유지)
        (() => {
          var p, N;
          const e = A.getVirtualItems(), l = A.getTotalSize(), a = Math.round(((p = e[0]) == null ? void 0 : p.start) ?? 0), j = Math.round(
            l - (((N = e[e.length - 1]) == null ? void 0 : N.end) ?? 0)
          );
          return /* @__PURE__ */ u(It, { children: [
            a > 0 && /* @__PURE__ */ t(w, { className: "hover:bg-transparent", style: { height: a }, children: /* @__PURE__ */ t(m, { colSpan: z, className: "p-0 border-0" }) }),
            e.map((H) => {
              const R = n[H.index], O = ce(R.id);
              return /* @__PURE__ */ u(r.Fragment, { children: [
                /* @__PURE__ */ t(
                  ge,
                  {
                    row: R,
                    rowIndex: H.index,
                    isSelected: b.includes(R.id),
                    canExpand: Z(R),
                    isExpanded: O,
                    editingCell: ae,
                    editValue: ne,
                    ctx: he,
                    rowRef: A.measureElement,
                    dataIndex: H.index
                  }
                ),
                s && O && /* @__PURE__ */ t(w, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
                  m,
                  {
                    colSpan: z,
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
                        children: s.expandedRowRender(R)
                      }
                    )
                  }
                ) })
              ] }, R.id);
            }),
            j > 0 && /* @__PURE__ */ t(w, { className: "hover:bg-transparent", style: { height: j }, children: /* @__PURE__ */ t(m, { colSpan: z, className: "p-0 border-0" }) })
          ] });
        })()
      ) : n.map((e, l) => {
        const a = ce(e.id);
        return /* @__PURE__ */ u(r.Fragment, { children: [
          /* @__PURE__ */ t(
            ge,
            {
              row: e,
              rowIndex: l,
              isSelected: b.includes(e.id),
              canExpand: Z(e),
              isExpanded: a,
              editingCell: ae,
              editValue: ne,
              ctx: he
            }
          ),
          s && a && /* @__PURE__ */ t(w, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            m,
            {
              colSpan: z,
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
                children: /* @__PURE__ */ t(Pt, { size: 20 })
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
  return _ || o ? /* @__PURE__ */ t(
    Kt,
    {
      sensors: ut,
      collisionDetection: _t,
      onDragEnd: yt,
      children: Xe
    }
  ) : Xe;
}
export {
  Ws as DataTable
};
//# sourceMappingURL=index.mjs.map
