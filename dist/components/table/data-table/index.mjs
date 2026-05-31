import { jsxs as f, jsx as t, Fragment as Yt } from "react/jsx-runtime";
import * as n from "react";
import { useSensors as qt, useSensor as lt, PointerSensor as Jt, KeyboardSensor as Qt, DndContext as Ut, closestCenter as Zt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as At, SortableContext as ke, horizontalListSortingStrategy as at, verticalListSortingStrategy as es } from "@dnd-kit/sortable";
import { cn as U } from "../../../lib/utils.mjs";
import { Table as ts, TableHeader as ss, TableRow as K, TableHead as x, TableSortableHead as rs, TableBody as ns, TableCell as E } from "../table.mjs";
import { Checkbox as it } from "../../ui/checkbox.mjs";
import { Skeleton as ie } from "../../ui/skeleton.mjs";
import { SplashScreen as ls } from "../../ui/splash-screen.mjs";
import { DownIcon as ot } from "../../../icons/DownIcon.mjs";
import { RightIcon as ct } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as as } from "../../../icons/RowAddIcon.mjs";
import { DataTableBodyRow as Se } from "./data-table-body-row.mjs";
import { DataTableColumnHeader as is } from "./data-table-column-header.mjs";
import { DataTableExpandedRow as Re } from "./data-table-expanded-row.mjs";
import { useStickyStyles as os } from "./hooks/use-sticky-styles.mjs";
import { useColumnResize as cs } from "./hooks/use-column-resize.mjs";
import { useRowGrouping as ds } from "./hooks/use-row-grouping.mjs";
import { useColumnReorder as ps } from "./hooks/use-column-reorder.mjs";
import { useRowReorder as hs } from "./hooks/use-row-reorder.mjs";
import { useCellEditing as ms } from "./hooks/use-cell-editing.mjs";
import { useSort as gs } from "./hooks/use-sort.mjs";
import { useHeaderGroups as us } from "./hooks/use-header-groups.mjs";
import { useTableVirtualizer as fs } from "./hooks/use-table-virtualizer.mjs";
import { useStableCallback as H } from "./hooks/use-stable-callback.mjs";
import { useStableObject as dt } from "./hooks/use-stable-object.mjs";
import { getAlignClass as xs } from "./utils.mjs";
import { DRAG_HANDLE_WIDTH as d, CHECKBOX_WIDTH as m, EXPAND_WIDTH as y, ROW_ACTIONS_WIDTH as W } from "./types.mjs";
const ys = [];
function Xs({
  columns: j,
  data: a,
  selectable: b = !1,
  selectedIds: _ = ys,
  onSelectionChange: I,
  sortState: pt,
  onSortChange: ht,
  multiSort: mt = !1,
  onRowClick: gt,
  onCellChange: we,
  expandable: ut,
  emptyMessage: ft = "데이터가 없습니다.",
  className: xt,
  rowClassName: yt,
  maxHeight: P,
  resizable: M = !1,
  columnWidths: bt,
  onColumnResize: kt,
  columnReorderable: L = !1,
  columnOrder: St,
  onColumnReorder: Rt,
  rowReorderable: wt = !1,
  onRowReorder: Nt,
  loading: Ne = !1,
  loadingMode: Ce = "splash",
  loadingContent: oe,
  headerGroups: D,
  rowGrouping: Ct,
  rowActions: i,
  virtual: $t
}) {
  const S = dt(Ct), s = dt(ut), o = S ? !1 : wt, {
    editingCell: ce,
    editValue: de,
    editValueRef: $e,
    editingCellRef: Ee,
    setEditingCell: We,
    setEditValue: De,
    startEditing: ve,
    completeEditing: Ie,
    cancelEditing: Te
  } = ms({ columns: j, data: a, onCellChange: we }), pe = n.useRef(null), [R, Et] = n.useState(0);
  n.useEffect(() => {
    const e = pe.current;
    if (!e) return;
    const r = () => Et(e.clientWidth);
    r();
    const l = new ResizeObserver(r);
    return l.observe(e), () => l.disconnect();
  }, []);
  const [Wt, Dt] = n.useState(
    (s == null ? void 0 : s.defaultExpandedRowIds) ?? []
  ), {
    resizingColumn: vt,
    getColumnWidth: Z,
    handleResizeStart: It
  } = cs({ resizable: M, columnWidths: bt, onColumnResize: kt }), { orderedColumns: Tt, handleColumnDragEnd: ze } = ps({
    columns: j,
    columnReorderable: L,
    columnOrder: St,
    onColumnReorder: Rt
  }), { handleRowDragEnd: Ke } = hs({ data: a, onRowReorder: Nt }), [A, He] = n.useState(null), zt = qt(
    lt(Jt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    lt(Qt, {
      coordinateGetter: At
    })
  ), Kt = n.useCallback(
    (e) => {
      const { active: r } = e;
      String(r.id).startsWith("row-") ? Ke(e) : ze(e);
    },
    [ze, Ke]
  ), F = (s == null ? void 0 : s.expandedRowIds) ?? Wt, ee = (s == null ? void 0 : s.onExpandedChange) ?? Dt, G = n.useMemo(() => new Set(_), [_]), te = a.length > 0 && _.length === a.length, je = _.length > 0 && !te, _e = () => {
    te ? I == null || I([]) : I == null || I(a.map((e) => e.id));
  }, Me = n.useRef(_);
  Me.current = _;
  const T = H(I), Le = n.useCallback((e) => {
    const r = Me.current;
    r.includes(e) ? T == null || T(r.filter((l) => l !== e)) : T == null || T([...r, e]);
  }, [T]), { handleSort: Oe, getSortDirection: Be, getSortPriority: Ve } = gs({
    sortState: pt,
    onSortChange: ht,
    multiSort: mt
  }), X = xs, se = n.useCallback((e) => s ? s.rowExpandable ? s.rowExpandable(e) : !0 : !1, [s]), Pe = n.useMemo(
    () => new Set(F),
    [F]
  ), he = n.useCallback(
    (e) => Pe.has(e),
    [Pe]
  ), Fe = n.useRef(F);
  Fe.current = F;
  const me = n.useRef(ee);
  me.current = ee;
  const Ge = n.useCallback((e) => {
    const r = Fe.current;
    r.includes(e) ? me.current(r.filter((l) => l !== e)) : me.current([...r, e]);
  }, []), Y = n.useMemo(() => s ? a.filter((e) => se(e)).map((e) => e.id) : [], [a, s]), q = Y.length > 0 && Y.every((e) => F.includes(e)), Xe = () => {
    ee(q ? [] : Y);
  }, Ye = H(we), qe = H(gt), Je = H(yt), O = H(s == null ? void 0 : s.expandedRowRender), Qe = H(i == null ? void 0 : i.onRowDelete), ge = H(i == null ? void 0 : i.onRowAdd), J = (i == null ? void 0 : i.showDelete) ?? !!(i != null && i.onRowDelete), Ht = (i == null ? void 0 : i.showAdd) ?? !!(i != null && i.onRowAdd), z = j.length + (b ? 1 : 0) + (s ? 1 : 0) + (o ? 1 : 0) + (J ? 1 : 0), { rowSpanMap: ue, middleRowSet: Ue, getRowSpan: Ze } = ds({ data: a, rowGrouping: S }), w = n.useMemo(() => {
    if (!S || !ue) return null;
    const e = /* @__PURE__ */ new Map();
    for (const [r, l] of ue.entries()) {
      const N = {}, c = {};
      let p = !1;
      for (const [u, h] of l.entries())
        if (h > 1) {
          p = !0;
          let C = !1;
          for (let B = r; B < r + h && B < a.length; B++)
            if (G.has(a[B].id)) {
              C = !0;
              break;
            }
          N[String(u)] = C, c[String(u)] = A !== null && A >= r && A < r + h;
        }
      p && e.set(r, { selected: N, hovered: c });
    }
    return e;
  }, [S, ue, a, G, A]), { getStickyStyles: Q, hasLeftStickyColumns: v } = os({
    columns: j,
    selectable: b,
    expandable: s,
    rowReorderable: o
  }), jt = j.some((e) => e.sticky), _t = o ? "rowReorderable (행 드래그앤드롭)" : S ? "rowGrouping (rowSpan 그룹핑)" : jt ? "sticky 컬럼 (가상화 스크롤 중 sub-pixel 깜빡임 발생, v2 div-based grid 에서 지원 예정)" : null, { isVirtual: Mt, virtualizer: re } = fs({
    virtual: $t,
    disabledReason: _t,
    count: a.length,
    scrollContainerRef: pe
  }), ne = (e) => /* @__PURE__ */ t(
    is,
    {
      column: e,
      stickyData: Q(e, !0),
      alignClass: X(e.align),
      needsRightBorder: Bt.has(e.accessorKey),
      resizable: M,
      resizedWidth: M ? Z(e) : void 0,
      isResizing: vt === e.accessorKey,
      onResizeStart: It,
      columnReorderable: L,
      sortDirection: Be(e.accessorKey),
      sortPriority: Ve(e.accessorKey),
      onSort: () => Oe(e.accessorKey)
    },
    String(e.accessorKey)
  ), g = L ? Tt : j, Ae = g.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Lt = a.map((e) => `row-${e.id}`), Ot = n.useCallback(() => 0, []), fe = n.useCallback(
    () => o ? d : 0,
    [o]
  ), le = n.useCallback(() => {
    let e = 0;
    return o && (e += d), b && (e += m), e;
  }, [o, b]), {
    groupedColumnsSet: et,
    columnsWithRightBorder: Bt,
    getHeaderGroupColSpan: Vt,
    getHeaderGroupStickyData: tt,
    headerGroupItems: st
  } = us({
    columnsToRender: g,
    headerGroups: D,
    getStickyStyles: Q,
    getColumnWidth: Z,
    resizable: M
  }), xe = n.useMemo(
    () => ({
      columnsToRender: g,
      rowReorderable: o,
      selectable: b,
      expandable: !!s,
      showRowDelete: J,
      hasLeftStickyColumns: v,
      resizable: M,
      onRowDelete: Qe,
      rowGrouping: S,
      middleRowSet: Ue,
      // dataLength 는 rowGrouping 의 isGroupSpanToEnd 계산에만 사용됨.
      // rowGrouping 안 쓰면 0 으로 고정해서 행 추가/삭제 시 ctx invalidate 방지.
      dataLength: S ? a.length : 0,
      getCheckboxHeaderLeftOffset: fe,
      getExpandHeaderLeftOffset: le,
      getRowSpan: Ze,
      getStickyStyles: Q,
      getColumnWidth: Z,
      getAlignClass: X,
      handleSelectRow: Le,
      toggleRowExpanded: Ge,
      startEditing: ve,
      completeEditing: Ie,
      cancelEditing: Te,
      setEditValue: De,
      setEditingCell: We,
      editValueRef: $e,
      editingCellRef: Ee,
      onCellChange: Ye,
      onRowClick: qe,
      rowClassName: Je,
      setHoveredRowIndex: He
    }),
    [
      g,
      o,
      b,
      s,
      J,
      v,
      M,
      Qe,
      S,
      Ue,
      S ? a.length : 0,
      fe,
      le,
      Ze,
      Q,
      Z,
      X,
      Le,
      Ge,
      ve,
      Ie,
      Te,
      De,
      We,
      $e,
      Ee,
      Ye,
      qe,
      Je,
      He
    ]
  ), rt = /* @__PURE__ */ f(ts, { className: xt, maxHeight: P, wrapperRef: pe, children: [
    /* @__PURE__ */ f(ss, { children: [
      D && D.length > 0 && /* @__PURE__ */ f(K, { children: [
        o && /* @__PURE__ */ t(
          x,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${d}px`,
              minWidth: `${d}px`,
              ...v && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        b && /* @__PURE__ */ t(
          x,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${m}px`,
              minWidth: `${m}px`,
              ...v && { position: "sticky", left: o ? d : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              it,
              {
                checked: te,
                indeterminate: je,
                onCheckedChange: _e,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        s && /* @__PURE__ */ t(
          x,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${y}px`,
              minWidth: `${y}px`,
              ...v && { position: "sticky", left: le(), zIndex: 20 }
            },
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && Y.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Xe,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": q ? "모두 접기" : "모두 펼치기",
                children: q ? /* @__PURE__ */ t(ot, { size: 24 }) : /* @__PURE__ */ t(ct, { size: 24 })
              }
            )
          }
        ),
        J && /* @__PURE__ */ t(
          x,
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
        st.map((e, r) => {
          const l = st[r + 1], N = e.type === "group" && (l == null ? void 0 : l.type) === "group";
          if (e.type === "group") {
            const c = Vt(e.group);
            if (c === 0) return null;
            const p = g.filter(
              ($) => e.group.columns.includes($.accessorKey)
            );
            if (new Set(
              p.map(($) => $.sticky ?? "none")
            ).size > 1) {
              const $ = [];
              let V = [], ae = p[0].sticky;
              for (const k of p)
                k.sticky === ae ? V.push(k) : (V.length > 0 && $.push({ cols: V, sticky: ae }), V = [k], ae = k.sticky);
              V.length > 0 && $.push({ cols: V, sticky: ae });
              const nt = $.findIndex((k) => !k.sticky), Pt = nt !== -1 ? nt : 0;
              return $.map((k, ye) => {
                const Ft = {
                  header: e.group.header,
                  columns: k.cols.map((Xt) => Xt.accessorKey),
                  align: e.group.align
                }, be = k.sticky ? tt(Ft) : { style: {}, className: "" }, Gt = !!be.style.position;
                return /* @__PURE__ */ t(
                  x,
                  {
                    colSpan: k.cols.length,
                    className: U(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      N && ye === $.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      be.className
                    ),
                    style: Gt ? be.style : { position: "relative", zIndex: 0 },
                    children: ye === Pt ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${ye}`
                );
              });
            }
            const C = tt(e.group), B = !!C.style.position;
            return /* @__PURE__ */ t(
              x,
              {
                colSpan: c,
                className: U(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  N && "border-r border-slate-200 dark:border-slate-700",
                  C.className
                ),
                style: B ? C.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const c = Q(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ t(
              rs,
              {
                rowSpan: 2,
                sortDirection: Be(e.col.accessorKey),
                sortPriority: Ve(e.col.accessorKey),
                onSort: () => Oe(e.col.accessorKey),
                className: U(
                  X(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  c.className
                ),
                style: c.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ t(
              x,
              {
                rowSpan: 2,
                className: U(
                  X(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  c.className
                ),
                style: c.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            );
          }
        })
      ] }),
      /* @__PURE__ */ f(K, { children: [
        !D && o && /* @__PURE__ */ t(
          x,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: v ? {
              position: "sticky",
              left: Ot(),
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
        !D && b && /* @__PURE__ */ t(
          x,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: v ? {
              position: "sticky",
              left: fe(),
              zIndex: 20,
              width: `${m}px`,
              minWidth: `${m}px`,
              maxWidth: `${m}px`
            } : {
              width: `${m}px`,
              minWidth: `${m}px`,
              maxWidth: `${m}px`
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              it,
              {
                checked: te,
                indeterminate: je,
                onCheckedChange: _e,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !D && s && /* @__PURE__ */ t(
          x,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: v ? {
              position: "sticky",
              left: le(),
              zIndex: 20,
              width: `${y}px`,
              minWidth: `${y}px`,
              maxWidth: `${y}px`
            } : {
              width: `${y}px`,
              minWidth: `${y}px`,
              maxWidth: `${y}px`
            },
            "aria-label": "확장",
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && Y.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Xe,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": q ? "모두 접기" : "모두 펼치기",
                children: q ? /* @__PURE__ */ t(ot, { size: 24 }) : /* @__PURE__ */ t(ct, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !D && J && /* @__PURE__ */ t(
          x,
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
        D ? L ? /* @__PURE__ */ t(ke, { items: Ae, strategy: at, children: g.filter((e) => et.has(e.accessorKey)).map(ne) }) : g.filter((e) => et.has(e.accessorKey)).map(ne) : L ? /* @__PURE__ */ t(ke, { items: Ae, strategy: at, children: g.map(ne) }) : g.map(ne)
      ] })
    ] }),
    /* @__PURE__ */ f(ns, { children: [
      Ne ? /* @__PURE__ */ t(K, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        E,
        {
          colSpan: z,
          className: U(
            "text-center",
            oe || Ce !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: oe ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: R ? { width: R } : void 0,
                children: oe
              }
            )
          ) : Ce === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const r = typeof P == "number" ? P : typeof P == "string" && parseInt(P, 10) || 320, l = Math.max(1, Math.floor(r / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: l }).map((N, c) => /* @__PURE__ */ f(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    o && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(ie, { width: 16, height: 16 }) }),
                    b && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ie, { width: 18, height: 18 }) }),
                    s && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ie, { width: 18, height: 18 }) }),
                    g.map((p) => {
                      const u = p.width ?? p.minWidth, h = typeof u == "number" ? Math.min(u * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(ie, { height: 16, width: h }) }, String(p.accessorKey));
                    })
                  ]
                },
                c
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본) - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: R ? { width: R } : void 0,
                children: /* @__PURE__ */ t(ls, { size: "lg" })
              }
            )
          )
        }
      ) }) : a.length === 0 ? /* @__PURE__ */ t(K, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        E,
        {
          colSpan: z,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: R ? { width: R } : void 0,
              children: ft
            }
          )
        }
      ) }) : o ? /* @__PURE__ */ t(ke, { items: Lt, strategy: es, children: a.map((e, r) => {
        const l = he(e.id);
        return /* @__PURE__ */ f(n.Fragment, { children: [
          /* @__PURE__ */ t(
            Se,
            {
              row: e,
              rowIndex: r,
              isSelected: G.has(e.id),
              canExpand: se(e),
              isExpanded: l,
              editingCell: ce,
              editValue: de,
              ctx: xe,
              groupCellFlags: w == null ? void 0 : w.get(r)
            }
          ),
          s && l && O && /* @__PURE__ */ t(
            Re,
            {
              row: e,
              expandedRowRender: O,
              totalColumns: z,
              visibleWidth: R
            }
          )
        ] }, e.id);
      }) }) : Mt && re ? (
        // 가상화 활성: 보이는 행만 렌더 + 상하 spacer 행으로 스크롤 영역 유지
        // TableBody (= tbody) 안에서 spacer-row 패턴 사용 (semantic HTML 유지)
        (() => {
          var c, p;
          const e = re.getVirtualItems(), r = re.getTotalSize(), l = Math.round(((c = e[0]) == null ? void 0 : c.start) ?? 0), N = Math.round(
            r - (((p = e[e.length - 1]) == null ? void 0 : p.end) ?? 0)
          );
          return /* @__PURE__ */ f(Yt, { children: [
            l > 0 && /* @__PURE__ */ t(K, { className: "hover:bg-transparent", style: { height: l }, children: /* @__PURE__ */ t(E, { colSpan: z, className: "p-0 border-0" }) }),
            e.map((u) => {
              const h = a[u.index], C = he(h.id);
              return /* @__PURE__ */ f(n.Fragment, { children: [
                /* @__PURE__ */ t(
                  Se,
                  {
                    row: h,
                    rowIndex: u.index,
                    isSelected: G.has(h.id),
                    canExpand: se(h),
                    isExpanded: C,
                    editingCell: ce,
                    editValue: de,
                    ctx: xe,
                    groupCellFlags: w == null ? void 0 : w.get(u.index),
                    rowRef: re.measureElement,
                    dataIndex: u.index
                  }
                ),
                s && C && O && /* @__PURE__ */ t(
                  Re,
                  {
                    row: h,
                    expandedRowRender: O,
                    totalColumns: z,
                    visibleWidth: R
                  }
                )
              ] }, h.id);
            }),
            N > 0 && /* @__PURE__ */ t(K, { className: "hover:bg-transparent", style: { height: N }, children: /* @__PURE__ */ t(E, { colSpan: z, className: "p-0 border-0" }) })
          ] });
        })()
      ) : a.map((e, r) => {
        const l = he(e.id);
        return /* @__PURE__ */ f(n.Fragment, { children: [
          /* @__PURE__ */ t(
            Se,
            {
              row: e,
              rowIndex: r,
              isSelected: G.has(e.id),
              canExpand: se(e),
              isExpanded: l,
              editingCell: ce,
              editValue: de,
              ctx: xe,
              groupCellFlags: w == null ? void 0 : w.get(r)
            }
          ),
          s && l && O && /* @__PURE__ */ t(
            Re,
            {
              row: e,
              expandedRowRender: O,
              totalColumns: z,
              visibleWidth: R
            }
          )
        ] }, e.id);
      }),
      Ht && !Ne && /* @__PURE__ */ f(K, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        o && /* @__PURE__ */ t(
          E,
          {
            className: "!p-0",
            style: {
              width: `${d}px`,
              minWidth: `${d}px`,
              maxWidth: `${d}px`
            }
          }
        ),
        b && /* @__PURE__ */ t(
          E,
          {
            className: "!p-0",
            style: {
              width: `${m}px`,
              minWidth: `${m}px`,
              maxWidth: `${m}px`
            }
          }
        ),
        s && /* @__PURE__ */ t(
          E,
          {
            className: "!p-0",
            style: {
              width: `${y}px`,
              minWidth: `${y}px`,
              maxWidth: `${y}px`
            }
          }
        ),
        /* @__PURE__ */ t(
          E,
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
                onClick: () => ge == null ? void 0 : ge(),
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(as, { size: 20 })
              }
            )
          }
        ),
        g.map((e) => /* @__PURE__ */ t(
          E,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return L || o ? /* @__PURE__ */ t(
    Ut,
    {
      sensors: zt,
      collisionDetection: Zt,
      onDragEnd: Kt,
      children: rt
    }
  ) : rt;
}
export {
  Xs as DataTable
};
//# sourceMappingURL=index.mjs.map
