import { jsxs as b, jsx as t, Fragment as Qt } from "react/jsx-runtime";
import * as n from "react";
import { useSensors as Ut, useSensor as ot, PointerSensor as Zt, KeyboardSensor as At, DndContext as es, closestCenter as ts } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as ss, SortableContext as Re, horizontalListSortingStrategy as ct, verticalListSortingStrategy as rs } from "@dnd-kit/sortable";
import { cn as U } from "../../../lib/utils.mjs";
import { Table as ns, TableHeader as ls, TableRow as K, TableHead as k, TableSortableHead as as, TableBody as is, TableCell as D } from "../table.mjs";
import { Checkbox as dt } from "../../ui/checkbox.mjs";
import { Skeleton as ie } from "../../ui/skeleton.mjs";
import { SplashScreen as os } from "../../ui/splash-screen.mjs";
import { DownIcon as pt } from "../../../icons/DownIcon.mjs";
import { RightIcon as ht } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as cs } from "../../../icons/RowAddIcon.mjs";
import { DataTableBodyRow as Se } from "./data-table-body-row.mjs";
import { DataTableColumnHeader as ds } from "./data-table-column-header.mjs";
import { DataTableExpandedRow as we } from "./data-table-expanded-row.mjs";
import { useStickyStyles as ps } from "./hooks/use-sticky-styles.mjs";
import { useColumnResize as hs } from "./hooks/use-column-resize.mjs";
import { useRowGrouping as ms } from "./hooks/use-row-grouping.mjs";
import { useColumnReorder as us } from "./hooks/use-column-reorder.mjs";
import { useRowReorder as fs } from "./hooks/use-row-reorder.mjs";
import { useCellEditing as gs } from "./hooks/use-cell-editing.mjs";
import { useSort as xs } from "./hooks/use-sort.mjs";
import { useHeaderGroups as ys } from "./hooks/use-header-groups.mjs";
import { useTableVirtualizer as bs } from "./hooks/use-table-virtualizer.mjs";
import { useStableCallback as M } from "./hooks/use-stable-callback.mjs";
import { useStableObject as mt } from "./hooks/use-stable-object.mjs";
import { getAlignClass as ks, getColumnKey as Ne } from "./utils.mjs";
import { DRAG_HANDLE_WIDTH as m, CHECKBOX_WIDTH as g, EXPAND_WIDTH as R, ROW_ACTIONS_WIDTH as v } from "./types.mjs";
const Rs = [];
function Js({
  columns: j,
  data: a,
  selectable: S = !1,
  selectedIds: _ = Rs,
  onSelectionChange: z,
  sortState: ut,
  onSortChange: ft,
  multiSort: gt = !1,
  onRowClick: xt,
  onCellChange: Ce,
  expandable: yt,
  emptyMessage: bt = "데이터가 없습니다.",
  className: kt,
  rowClassName: Rt,
  maxHeight: P,
  resizable: L = !1,
  columnWidths: St,
  onColumnResize: wt,
  columnReorderable: B = !1,
  columnOrder: Nt,
  onColumnReorder: Ct,
  rowReorderable: $t = !1,
  onRowReorder: Et,
  loading: $e = !1,
  loadingMode: Ee = "splash",
  loadingContent: oe,
  headerGroups: I,
  rowGrouping: Wt,
  rowActions: o,
  virtual: Dt
}) {
  const C = mt(Wt), s = mt(yt), d = C ? !1 : $t, {
    editingCell: ce,
    editValue: de,
    editValueRef: We,
    editingCellRef: De,
    setEditingCell: ve,
    setEditValue: Ie,
    startEditing: Te,
    completeEditing: ze,
    cancelEditing: He
  } = gs({ columns: j, data: a, onCellChange: Ce }), pe = n.useRef(null), [$, vt] = n.useState(0);
  n.useEffect(() => {
    const e = pe.current;
    if (!e) return;
    const r = () => vt(e.clientWidth);
    r();
    const l = new ResizeObserver(r);
    return l.observe(e), () => l.disconnect();
  }, []);
  const [It, Tt] = n.useState(
    (s == null ? void 0 : s.defaultExpandedRowIds) ?? []
  ), {
    resizingColumn: zt,
    getColumnWidth: Z,
    handleResizeStart: Ht
  } = hs({ resizable: L, columnWidths: St, onColumnResize: wt }), { orderedColumns: Kt, handleColumnDragEnd: Ke } = us({
    columns: j,
    columnReorderable: B,
    columnOrder: Nt,
    onColumnReorder: Ct
  }), { handleRowDragEnd: Me } = fs({ data: a, onRowReorder: Et }), [A, je] = n.useState(null), Mt = Ut(
    ot(Zt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    ot(At, {
      coordinateGetter: ss
    })
  ), jt = n.useCallback(
    (e) => {
      const { active: r } = e;
      String(r.id).startsWith("row-") ? Me(e) : Ke(e);
    },
    [Ke, Me]
  ), F = (s == null ? void 0 : s.expandedRowIds) ?? It, ee = (s == null ? void 0 : s.onExpandedChange) ?? Tt, G = n.useMemo(() => new Set(_), [_]), te = a.length > 0 && _.length === a.length, _e = _.length > 0 && !te, Le = () => {
    te ? z == null || z([]) : z == null || z(a.map((e) => e.id));
  }, Be = n.useRef(_);
  Be.current = _;
  const Oe = n.useRef(a);
  Oe.current = a;
  const w = M(z), he = n.useRef(null), Ve = n.useCallback(
    (e, r, l) => {
      const h = Be.current, i = he.current;
      if (l && i !== null && i !== r) {
        const c = Math.min(i, r), u = Math.max(i, r), p = Oe.current, f = new Set(h);
        for (let y = c; y <= u; y++)
          y < p.length && f.add(p[y].id);
        w == null || w(Array.from(f)), he.current = r;
        return;
      }
      h.includes(e) ? w == null || w(h.filter((c) => c !== e)) : w == null || w([...h, e]), he.current = r;
    },
    [w]
  ), { handleSort: Pe, getSortDirection: Fe, getSortPriority: Ge } = xs({
    sortState: ut,
    onSortChange: ft,
    multiSort: gt
  }), X = ks, se = n.useCallback((e) => s ? s.rowExpandable ? s.rowExpandable(e) : !0 : !1, [s]), Xe = n.useMemo(
    () => new Set(F),
    [F]
  ), me = n.useCallback(
    (e) => Xe.has(e),
    [Xe]
  ), Ye = n.useRef(F);
  Ye.current = F;
  const ue = n.useRef(ee);
  ue.current = ee;
  const qe = n.useCallback((e) => {
    const r = Ye.current;
    r.includes(e) ? ue.current(r.filter((l) => l !== e)) : ue.current([...r, e]);
  }, []), Y = n.useMemo(() => s ? a.filter((e) => se(e)).map((e) => e.id) : [], [a, s]), q = Y.length > 0 && Y.every((e) => F.includes(e)), Je = () => {
    ee(q ? [] : Y);
  }, Qe = M(Ce), Ue = M(xt), Ze = M(Rt), O = M(s == null ? void 0 : s.expandedRowRender), Ae = M(o == null ? void 0 : o.onRowDelete), fe = M(o == null ? void 0 : o.onRowAdd), J = (o == null ? void 0 : o.showDelete) ?? !!(o != null && o.onRowDelete), _t = (o == null ? void 0 : o.showAdd) ?? !!(o != null && o.onRowAdd), H = j.length + (S ? 1 : 0) + (s ? 1 : 0) + (d ? 1 : 0) + (J ? 1 : 0), { rowSpanMap: ge, middleRowSet: et, getRowSpan: tt } = ms({ data: a, rowGrouping: C }), E = n.useMemo(() => {
    if (!C || !ge) return null;
    const e = /* @__PURE__ */ new Map();
    for (const [r, l] of ge.entries()) {
      const h = {}, i = {};
      let c = !1;
      for (const [u, p] of l.entries())
        if (p > 1) {
          c = !0;
          let f = !1;
          for (let y = r; y < r + p && y < a.length; y++)
            if (G.has(a[y].id)) {
              f = !0;
              break;
            }
          h[String(u)] = f, i[String(u)] = A !== null && A >= r && A < r + p;
        }
      c && e.set(r, { selected: h, hovered: i });
    }
    return e;
  }, [C, ge, a, G, A]), { getStickyStyles: Q, hasLeftStickyColumns: T } = ps({
    columns: j,
    selectable: S,
    expandable: s,
    rowReorderable: d
  }), Lt = j.some((e) => e.sticky), Bt = d ? "rowReorderable (행 드래그앤드롭)" : C ? "rowGrouping (rowSpan 그룹핑)" : Lt ? "sticky 컬럼 (가상화 스크롤 중 sub-pixel 깜빡임 발생, v2 div-based grid 에서 지원 예정)" : null, { isVirtual: Ot, virtualizer: re } = bs({
    virtual: Dt,
    disabledReason: Bt,
    count: a.length,
    scrollContainerRef: pe
  }), ne = (e) => /* @__PURE__ */ t(
    ds,
    {
      column: e,
      stickyData: Q(e, !0),
      alignClass: X(e.align),
      needsRightBorder: Ft.has(e.accessorKey),
      resizable: L,
      resizedWidth: L ? Z(e) : void 0,
      isResizing: zt === e.accessorKey,
      onResizeStart: Ht,
      columnReorderable: B,
      sortDirection: Fe(e.accessorKey),
      sortPriority: Ge(e.accessorKey),
      onSort: () => Pe(e.accessorKey)
    },
    Ne(e)
  ), x = B ? Kt : j, st = x.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Vt = a.map((e) => `row-${e.id}`), Pt = n.useCallback(() => 0, []), xe = n.useCallback(
    () => d ? m : 0,
    [d]
  ), le = n.useCallback(() => {
    let e = 0;
    return d && (e += m), S && (e += g), e;
  }, [d, S]), {
    groupedColumnsSet: rt,
    columnsWithRightBorder: Ft,
    getHeaderGroupColSpan: Gt,
    getHeaderGroupStickyData: nt,
    headerGroupItems: lt
  } = ys({
    columnsToRender: x,
    headerGroups: I,
    getStickyStyles: Q,
    getColumnWidth: Z,
    resizable: L
  }), ye = n.useMemo(
    () => ({
      columnsToRender: x,
      rowReorderable: d,
      selectable: S,
      expandable: !!s,
      showRowDelete: J,
      hasLeftStickyColumns: T,
      resizable: L,
      onRowDelete: Ae,
      rowGrouping: C,
      middleRowSet: et,
      // dataLength 는 rowGrouping 의 isGroupSpanToEnd 계산에만 사용됨.
      // rowGrouping 안 쓰면 0 으로 고정해서 행 추가/삭제 시 ctx invalidate 방지.
      dataLength: C ? a.length : 0,
      getCheckboxHeaderLeftOffset: xe,
      getExpandHeaderLeftOffset: le,
      getRowSpan: tt,
      getStickyStyles: Q,
      getColumnWidth: Z,
      getAlignClass: X,
      handleSelectRow: Ve,
      toggleRowExpanded: qe,
      startEditing: Te,
      completeEditing: ze,
      cancelEditing: He,
      setEditValue: Ie,
      setEditingCell: ve,
      editValueRef: We,
      editingCellRef: De,
      onCellChange: Qe,
      onRowClick: Ue,
      rowClassName: Ze,
      setHoveredRowIndex: je
    }),
    [
      x,
      d,
      S,
      // expandable 객체 자체를 deps 에 넣으면 expandedRowIds 변경 시마다 ctx 가 무력화되어
      // 모든 행이 리렌더된다. ctx 에는 boolean (활성 여부) 만 들어가므로 boolean 변경 시만 추적.
      !!s,
      J,
      T,
      L,
      Ae,
      C,
      et,
      C ? a.length : 0,
      xe,
      le,
      tt,
      Q,
      Z,
      X,
      Ve,
      qe,
      Te,
      ze,
      He,
      Ie,
      ve,
      We,
      De,
      Qe,
      Ue,
      Ze,
      je
    ]
  ), at = /* @__PURE__ */ b(ns, { className: kt, maxHeight: P, wrapperRef: pe, children: [
    /* @__PURE__ */ b(ls, { children: [
      I && I.length > 0 && /* @__PURE__ */ b(K, { children: [
        d && /* @__PURE__ */ t(
          k,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${m}px`,
              minWidth: `${m}px`,
              ...T && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        S && /* @__PURE__ */ t(
          k,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${g}px`,
              minWidth: `${g}px`,
              ...T && { position: "sticky", left: d ? m : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              dt,
              {
                checked: te,
                indeterminate: _e,
                onCheckedChange: Le,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        s && /* @__PURE__ */ t(
          k,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${R}px`,
              minWidth: `${R}px`,
              ...T && { position: "sticky", left: le(), zIndex: 20 }
            },
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && Y.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Je,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": q ? "모두 접기" : "모두 펼치기",
                children: q ? /* @__PURE__ */ t(pt, { size: 24 }) : /* @__PURE__ */ t(ht, { size: 24 })
              }
            )
          }
        ),
        J && /* @__PURE__ */ t(
          k,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        lt.map((e, r) => {
          const l = lt[r + 1], h = e.type === "group" && (l == null ? void 0 : l.type) === "group";
          if (e.type === "group") {
            const i = Gt(e.group);
            if (i === 0) return null;
            const c = x.filter(
              (W) => e.group.columns.includes(W.accessorKey)
            );
            if (new Set(
              c.map((W) => W.sticky ?? "none")
            ).size > 1) {
              const W = [];
              let V = [], ae = c[0].sticky;
              for (const N of c)
                N.sticky === ae ? V.push(N) : (V.length > 0 && W.push({ cols: V, sticky: ae }), V = [N], ae = N.sticky);
              V.length > 0 && W.push({ cols: V, sticky: ae });
              const it = W.findIndex((N) => !N.sticky), Xt = it !== -1 ? it : 0;
              return W.map((N, be) => {
                const Yt = {
                  header: e.group.header,
                  columns: N.cols.map((Jt) => Jt.accessorKey),
                  align: e.group.align
                }, ke = N.sticky ? nt(Yt) : { style: {}, className: "" }, qt = !!ke.style.position;
                return /* @__PURE__ */ t(
                  k,
                  {
                    colSpan: N.cols.length,
                    className: U(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      h && be === W.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      ke.className
                    ),
                    style: qt ? ke.style : { position: "relative", zIndex: 0 },
                    children: be === Xt ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${be}`
                );
              });
            }
            const f = nt(e.group), y = !!f.style.position;
            return /* @__PURE__ */ t(
              k,
              {
                colSpan: i,
                className: U(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  h && "border-r border-slate-200 dark:border-slate-700",
                  f.className
                ),
                style: y ? f.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const i = Q(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ t(
              as,
              {
                rowSpan: 2,
                sortDirection: Fe(e.col.accessorKey),
                sortPriority: Ge(e.col.accessorKey),
                onSort: () => Pe(e.col.accessorKey),
                className: U(
                  X(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  i.className
                ),
                style: i.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ t(
              k,
              {
                rowSpan: 2,
                className: U(
                  X(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  i.className
                ),
                style: i.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            );
          }
        })
      ] }),
      /* @__PURE__ */ b(K, { children: [
        !I && d && /* @__PURE__ */ t(
          k,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: T ? {
              position: "sticky",
              left: Pt(),
              zIndex: 20,
              width: `${m}px`,
              minWidth: `${m}px`,
              maxWidth: `${m}px`
            } : {
              width: `${m}px`,
              minWidth: `${m}px`,
              maxWidth: `${m}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !I && S && /* @__PURE__ */ t(
          k,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: T ? {
              position: "sticky",
              left: xe(),
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
              dt,
              {
                checked: te,
                indeterminate: _e,
                onCheckedChange: Le,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !I && s && /* @__PURE__ */ t(
          k,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: T ? {
              position: "sticky",
              left: le(),
              zIndex: 20,
              width: `${R}px`,
              minWidth: `${R}px`,
              maxWidth: `${R}px`
            } : {
              width: `${R}px`,
              minWidth: `${R}px`,
              maxWidth: `${R}px`
            },
            "aria-label": "확장",
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && Y.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Je,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": q ? "모두 접기" : "모두 펼치기",
                children: q ? /* @__PURE__ */ t(pt, { size: 24 }) : /* @__PURE__ */ t(ht, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !I && J && /* @__PURE__ */ t(
          k,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        I ? B ? /* @__PURE__ */ t(Re, { items: st, strategy: ct, children: x.filter((e) => rt.has(e.accessorKey)).map(ne) }) : x.filter((e) => rt.has(e.accessorKey)).map(ne) : B ? /* @__PURE__ */ t(Re, { items: st, strategy: ct, children: x.map(ne) }) : x.map(ne)
      ] })
    ] }),
    /* @__PURE__ */ b(is, { children: [
      $e ? /* @__PURE__ */ t(K, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        D,
        {
          colSpan: H,
          className: U(
            "text-center",
            oe || Ee !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: oe ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: $ ? { width: $ } : void 0,
                children: oe
              }
            )
          ) : Ee === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const r = typeof P == "number" ? P : typeof P == "string" && parseInt(P, 10) || 320, l = Math.max(1, Math.floor(r / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: l }).map((h, i) => /* @__PURE__ */ b(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    d && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(ie, { width: 16, height: 16 }) }),
                    S && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ie, { width: 18, height: 18 }) }),
                    s && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ie, { width: 18, height: 18 }) }),
                    x.map((c) => {
                      const u = c.width ?? c.minWidth, p = typeof u == "number" ? Math.min(u * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(ie, { height: 16, width: p }) }, Ne(c));
                    })
                  ]
                },
                i
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본) - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: $ ? { width: $ } : void 0,
                children: /* @__PURE__ */ t(os, { size: "lg" })
              }
            )
          )
        }
      ) }) : a.length === 0 ? /* @__PURE__ */ t(K, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        D,
        {
          colSpan: H,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: $ ? { width: $ } : void 0,
              children: bt
            }
          )
        }
      ) }) : d ? /* @__PURE__ */ t(Re, { items: Vt, strategy: rs, children: a.map((e, r) => {
        const l = me(e.id);
        return /* @__PURE__ */ b(n.Fragment, { children: [
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
              ctx: ye,
              groupCellFlags: E == null ? void 0 : E.get(r)
            }
          ),
          s && l && O && /* @__PURE__ */ t(
            we,
            {
              row: e,
              expandedRowRender: O,
              totalColumns: H,
              visibleWidth: $
            }
          )
        ] }, e.id);
      }) }) : Ot && re ? (
        // 가상화 활성: 보이는 행만 렌더 + 상하 spacer 행으로 스크롤 영역 유지
        // TableBody (= tbody) 안에서 spacer-row 패턴 사용 (semantic HTML 유지)
        (() => {
          var i, c;
          const e = re.getVirtualItems(), r = re.getTotalSize(), l = Math.round(((i = e[0]) == null ? void 0 : i.start) ?? 0), h = Math.round(
            r - (((c = e[e.length - 1]) == null ? void 0 : c.end) ?? 0)
          );
          return /* @__PURE__ */ b(Qt, { children: [
            l > 0 && /* @__PURE__ */ t(K, { className: "hover:bg-transparent", style: { height: l }, children: /* @__PURE__ */ t(D, { colSpan: H, className: "p-0 border-0" }) }),
            e.map((u) => {
              const p = a[u.index], f = me(p.id);
              return /* @__PURE__ */ b(n.Fragment, { children: [
                /* @__PURE__ */ t(
                  Se,
                  {
                    row: p,
                    rowIndex: u.index,
                    isSelected: G.has(p.id),
                    canExpand: se(p),
                    isExpanded: f,
                    editingCell: ce,
                    editValue: de,
                    ctx: ye,
                    groupCellFlags: E == null ? void 0 : E.get(u.index),
                    rowRef: re.measureElement,
                    dataIndex: u.index
                  }
                ),
                s && f && O && /* @__PURE__ */ t(
                  we,
                  {
                    row: p,
                    expandedRowRender: O,
                    totalColumns: H,
                    visibleWidth: $
                  }
                )
              ] }, p.id);
            }),
            h > 0 && /* @__PURE__ */ t(K, { className: "hover:bg-transparent", style: { height: h }, children: /* @__PURE__ */ t(D, { colSpan: H, className: "p-0 border-0" }) })
          ] });
        })()
      ) : a.map((e, r) => {
        const l = me(e.id);
        return /* @__PURE__ */ b(n.Fragment, { children: [
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
              ctx: ye,
              groupCellFlags: E == null ? void 0 : E.get(r)
            }
          ),
          s && l && O && /* @__PURE__ */ t(
            we,
            {
              row: e,
              expandedRowRender: O,
              totalColumns: H,
              visibleWidth: $
            }
          )
        ] }, e.id);
      }),
      _t && !$e && /* @__PURE__ */ b(K, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        d && /* @__PURE__ */ t(
          D,
          {
            className: "!p-0",
            style: {
              width: `${m}px`,
              minWidth: `${m}px`,
              maxWidth: `${m}px`
            }
          }
        ),
        S && /* @__PURE__ */ t(
          D,
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
          D,
          {
            className: "!p-0",
            style: {
              width: `${R}px`,
              minWidth: `${R}px`,
              maxWidth: `${R}px`
            }
          }
        ),
        /* @__PURE__ */ t(
          D,
          {
            className: "!p-0",
            style: {
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            },
            children: /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => fe == null ? void 0 : fe(),
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(cs, { size: 20 })
              }
            )
          }
        ),
        x.map((e) => /* @__PURE__ */ t(
          D,
          {
            className: "!p-0"
          },
          Ne(e)
        ))
      ] })
    ] })
  ] });
  return B || d ? /* @__PURE__ */ t(
    es,
    {
      sensors: Mt,
      collisionDetection: ts,
      onDragEnd: jt,
      children: at
    }
  ) : at;
}
export {
  Js as DataTable
};
//# sourceMappingURL=index.mjs.map
