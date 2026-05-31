import { jsxs as b, jsx as t, Fragment as Jt } from "react/jsx-runtime";
import * as n from "react";
import { useSensors as Qt, useSensor as it, PointerSensor as Ut, KeyboardSensor as Zt, DndContext as At, closestCenter as es } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as ts, SortableContext as Re, horizontalListSortingStrategy as ot, verticalListSortingStrategy as ss } from "@dnd-kit/sortable";
import { cn as U } from "../../../lib/utils.mjs";
import { Table as rs, TableHeader as ns, TableRow as H, TableHead as k, TableSortableHead as ls, TableBody as as, TableCell as D } from "../table.mjs";
import { Checkbox as ct } from "../../ui/checkbox.mjs";
import { Skeleton as ie } from "../../ui/skeleton.mjs";
import { SplashScreen as is } from "../../ui/splash-screen.mjs";
import { DownIcon as dt } from "../../../icons/DownIcon.mjs";
import { RightIcon as pt } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as os } from "../../../icons/RowAddIcon.mjs";
import { DataTableBodyRow as Se } from "./data-table-body-row.mjs";
import { DataTableColumnHeader as cs } from "./data-table-column-header.mjs";
import { DataTableExpandedRow as we } from "./data-table-expanded-row.mjs";
import { useStickyStyles as ds } from "./hooks/use-sticky-styles.mjs";
import { useColumnResize as ps } from "./hooks/use-column-resize.mjs";
import { useRowGrouping as hs } from "./hooks/use-row-grouping.mjs";
import { useColumnReorder as ms } from "./hooks/use-column-reorder.mjs";
import { useRowReorder as us } from "./hooks/use-row-reorder.mjs";
import { useCellEditing as fs } from "./hooks/use-cell-editing.mjs";
import { useSort as gs } from "./hooks/use-sort.mjs";
import { useHeaderGroups as xs } from "./hooks/use-header-groups.mjs";
import { useTableVirtualizer as ys } from "./hooks/use-table-virtualizer.mjs";
import { useStableCallback as M } from "./hooks/use-stable-callback.mjs";
import { useStableObject as ht } from "./hooks/use-stable-object.mjs";
import { getAlignClass as bs } from "./utils.mjs";
import { DRAG_HANDLE_WIDTH as m, CHECKBOX_WIDTH as g, EXPAND_WIDTH as R, ROW_ACTIONS_WIDTH as v } from "./types.mjs";
const ks = [];
function qs({
  columns: j,
  data: a,
  selectable: S = !1,
  selectedIds: _ = ks,
  onSelectionChange: z,
  sortState: mt,
  onSortChange: ut,
  multiSort: ft = !1,
  onRowClick: gt,
  onCellChange: Ne,
  expandable: xt,
  emptyMessage: yt = "데이터가 없습니다.",
  className: bt,
  rowClassName: kt,
  maxHeight: P,
  resizable: L = !1,
  columnWidths: Rt,
  onColumnResize: St,
  columnReorderable: B = !1,
  columnOrder: wt,
  onColumnReorder: Nt,
  rowReorderable: Ct = !1,
  onRowReorder: $t,
  loading: Ce = !1,
  loadingMode: $e = "splash",
  loadingContent: oe,
  headerGroups: I,
  rowGrouping: Et,
  rowActions: o,
  virtual: Wt
}) {
  const C = ht(Et), s = ht(xt), d = C ? !1 : Ct, {
    editingCell: ce,
    editValue: de,
    editValueRef: Ee,
    editingCellRef: We,
    setEditingCell: De,
    setEditValue: ve,
    startEditing: Ie,
    completeEditing: Te,
    cancelEditing: ze
  } = fs({ columns: j, data: a, onCellChange: Ne }), pe = n.useRef(null), [$, Dt] = n.useState(0);
  n.useEffect(() => {
    const e = pe.current;
    if (!e) return;
    const r = () => Dt(e.clientWidth);
    r();
    const l = new ResizeObserver(r);
    return l.observe(e), () => l.disconnect();
  }, []);
  const [vt, It] = n.useState(
    (s == null ? void 0 : s.defaultExpandedRowIds) ?? []
  ), {
    resizingColumn: Tt,
    getColumnWidth: Z,
    handleResizeStart: zt
  } = ps({ resizable: L, columnWidths: Rt, onColumnResize: St }), { orderedColumns: Kt, handleColumnDragEnd: Ke } = ms({
    columns: j,
    columnReorderable: B,
    columnOrder: wt,
    onColumnReorder: Nt
  }), { handleRowDragEnd: He } = us({ data: a, onRowReorder: $t }), [A, Me] = n.useState(null), Ht = Qt(
    it(Ut, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    it(Zt, {
      coordinateGetter: ts
    })
  ), Mt = n.useCallback(
    (e) => {
      const { active: r } = e;
      String(r.id).startsWith("row-") ? He(e) : Ke(e);
    },
    [Ke, He]
  ), F = (s == null ? void 0 : s.expandedRowIds) ?? vt, ee = (s == null ? void 0 : s.onExpandedChange) ?? It, G = n.useMemo(() => new Set(_), [_]), te = a.length > 0 && _.length === a.length, je = _.length > 0 && !te, _e = () => {
    te ? z == null || z([]) : z == null || z(a.map((e) => e.id));
  }, Le = n.useRef(_);
  Le.current = _;
  const Be = n.useRef(a);
  Be.current = a;
  const w = M(z), he = n.useRef(null), Oe = n.useCallback(
    (e, r, l) => {
      const h = Le.current, i = he.current;
      if (l && i !== null && i !== r) {
        const c = Math.min(i, r), u = Math.max(i, r), p = Be.current, f = new Set(h);
        for (let y = c; y <= u; y++)
          y < p.length && f.add(p[y].id);
        w == null || w(Array.from(f)), he.current = r;
        return;
      }
      h.includes(e) ? w == null || w(h.filter((c) => c !== e)) : w == null || w([...h, e]), he.current = r;
    },
    [w]
  ), { handleSort: Ve, getSortDirection: Pe, getSortPriority: Fe } = gs({
    sortState: mt,
    onSortChange: ut,
    multiSort: ft
  }), X = bs, se = n.useCallback((e) => s ? s.rowExpandable ? s.rowExpandable(e) : !0 : !1, [s]), Ge = n.useMemo(
    () => new Set(F),
    [F]
  ), me = n.useCallback(
    (e) => Ge.has(e),
    [Ge]
  ), Xe = n.useRef(F);
  Xe.current = F;
  const ue = n.useRef(ee);
  ue.current = ee;
  const Ye = n.useCallback((e) => {
    const r = Xe.current;
    r.includes(e) ? ue.current(r.filter((l) => l !== e)) : ue.current([...r, e]);
  }, []), Y = n.useMemo(() => s ? a.filter((e) => se(e)).map((e) => e.id) : [], [a, s]), q = Y.length > 0 && Y.every((e) => F.includes(e)), qe = () => {
    ee(q ? [] : Y);
  }, Je = M(Ne), Qe = M(gt), Ue = M(kt), O = M(s == null ? void 0 : s.expandedRowRender), Ze = M(o == null ? void 0 : o.onRowDelete), fe = M(o == null ? void 0 : o.onRowAdd), J = (o == null ? void 0 : o.showDelete) ?? !!(o != null && o.onRowDelete), jt = (o == null ? void 0 : o.showAdd) ?? !!(o != null && o.onRowAdd), K = j.length + (S ? 1 : 0) + (s ? 1 : 0) + (d ? 1 : 0) + (J ? 1 : 0), { rowSpanMap: ge, middleRowSet: Ae, getRowSpan: et } = hs({ data: a, rowGrouping: C }), E = n.useMemo(() => {
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
  }, [C, ge, a, G, A]), { getStickyStyles: Q, hasLeftStickyColumns: T } = ds({
    columns: j,
    selectable: S,
    expandable: s,
    rowReorderable: d
  }), _t = j.some((e) => e.sticky), Lt = d ? "rowReorderable (행 드래그앤드롭)" : C ? "rowGrouping (rowSpan 그룹핑)" : _t ? "sticky 컬럼 (가상화 스크롤 중 sub-pixel 깜빡임 발생, v2 div-based grid 에서 지원 예정)" : null, { isVirtual: Bt, virtualizer: re } = ys({
    virtual: Wt,
    disabledReason: Lt,
    count: a.length,
    scrollContainerRef: pe
  }), ne = (e) => /* @__PURE__ */ t(
    cs,
    {
      column: e,
      stickyData: Q(e, !0),
      alignClass: X(e.align),
      needsRightBorder: Pt.has(e.accessorKey),
      resizable: L,
      resizedWidth: L ? Z(e) : void 0,
      isResizing: Tt === e.accessorKey,
      onResizeStart: zt,
      columnReorderable: B,
      sortDirection: Pe(e.accessorKey),
      sortPriority: Fe(e.accessorKey),
      onSort: () => Ve(e.accessorKey)
    },
    String(e.accessorKey)
  ), x = B ? Kt : j, tt = x.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Ot = a.map((e) => `row-${e.id}`), Vt = n.useCallback(() => 0, []), xe = n.useCallback(
    () => d ? m : 0,
    [d]
  ), le = n.useCallback(() => {
    let e = 0;
    return d && (e += m), S && (e += g), e;
  }, [d, S]), {
    groupedColumnsSet: st,
    columnsWithRightBorder: Pt,
    getHeaderGroupColSpan: Ft,
    getHeaderGroupStickyData: rt,
    headerGroupItems: nt
  } = xs({
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
      onRowDelete: Ze,
      rowGrouping: C,
      middleRowSet: Ae,
      // dataLength 는 rowGrouping 의 isGroupSpanToEnd 계산에만 사용됨.
      // rowGrouping 안 쓰면 0 으로 고정해서 행 추가/삭제 시 ctx invalidate 방지.
      dataLength: C ? a.length : 0,
      getCheckboxHeaderLeftOffset: xe,
      getExpandHeaderLeftOffset: le,
      getRowSpan: et,
      getStickyStyles: Q,
      getColumnWidth: Z,
      getAlignClass: X,
      handleSelectRow: Oe,
      toggleRowExpanded: Ye,
      startEditing: Ie,
      completeEditing: Te,
      cancelEditing: ze,
      setEditValue: ve,
      setEditingCell: De,
      editValueRef: Ee,
      editingCellRef: We,
      onCellChange: Je,
      onRowClick: Qe,
      rowClassName: Ue,
      setHoveredRowIndex: Me
    }),
    [
      x,
      d,
      S,
      s,
      J,
      T,
      L,
      Ze,
      C,
      Ae,
      C ? a.length : 0,
      xe,
      le,
      et,
      Q,
      Z,
      X,
      Oe,
      Ye,
      Ie,
      Te,
      ze,
      ve,
      De,
      Ee,
      We,
      Je,
      Qe,
      Ue,
      Me
    ]
  ), lt = /* @__PURE__ */ b(rs, { className: bt, maxHeight: P, wrapperRef: pe, children: [
    /* @__PURE__ */ b(ns, { children: [
      I && I.length > 0 && /* @__PURE__ */ b(H, { children: [
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
              ct,
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
                onClick: qe,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": q ? "모두 접기" : "모두 펼치기",
                children: q ? /* @__PURE__ */ t(dt, { size: 24 }) : /* @__PURE__ */ t(pt, { size: 24 })
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
        nt.map((e, r) => {
          const l = nt[r + 1], h = e.type === "group" && (l == null ? void 0 : l.type) === "group";
          if (e.type === "group") {
            const i = Ft(e.group);
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
              const at = W.findIndex((N) => !N.sticky), Gt = at !== -1 ? at : 0;
              return W.map((N, be) => {
                const Xt = {
                  header: e.group.header,
                  columns: N.cols.map((qt) => qt.accessorKey),
                  align: e.group.align
                }, ke = N.sticky ? rt(Xt) : { style: {}, className: "" }, Yt = !!ke.style.position;
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
                    style: Yt ? ke.style : { position: "relative", zIndex: 0 },
                    children: be === Gt ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${be}`
                );
              });
            }
            const f = rt(e.group), y = !!f.style.position;
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
              ls,
              {
                rowSpan: 2,
                sortDirection: Pe(e.col.accessorKey),
                sortPriority: Fe(e.col.accessorKey),
                onSort: () => Ve(e.col.accessorKey),
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
      /* @__PURE__ */ b(H, { children: [
        !I && d && /* @__PURE__ */ t(
          k,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: T ? {
              position: "sticky",
              left: Vt(),
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
              ct,
              {
                checked: te,
                indeterminate: je,
                onCheckedChange: _e,
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
                onClick: qe,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": q ? "모두 접기" : "모두 펼치기",
                children: q ? /* @__PURE__ */ t(dt, { size: 24 }) : /* @__PURE__ */ t(pt, { size: 24 })
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
        I ? B ? /* @__PURE__ */ t(Re, { items: tt, strategy: ot, children: x.filter((e) => st.has(e.accessorKey)).map(ne) }) : x.filter((e) => st.has(e.accessorKey)).map(ne) : B ? /* @__PURE__ */ t(Re, { items: tt, strategy: ot, children: x.map(ne) }) : x.map(ne)
      ] })
    ] }),
    /* @__PURE__ */ b(as, { children: [
      Ce ? /* @__PURE__ */ t(H, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        D,
        {
          colSpan: K,
          className: U(
            "text-center",
            oe || $e !== "skeleton" ? "h-80" : "p-0 align-top"
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
          ) : $e === "skeleton" ? (
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
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(ie, { height: 16, width: p }) }, String(c.accessorKey));
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
                children: /* @__PURE__ */ t(is, { size: "lg" })
              }
            )
          )
        }
      ) }) : a.length === 0 ? /* @__PURE__ */ t(H, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        D,
        {
          colSpan: K,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: $ ? { width: $ } : void 0,
              children: yt
            }
          )
        }
      ) }) : d ? /* @__PURE__ */ t(Re, { items: Ot, strategy: ss, children: a.map((e, r) => {
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
              totalColumns: K,
              visibleWidth: $
            }
          )
        ] }, e.id);
      }) }) : Bt && re ? (
        // 가상화 활성: 보이는 행만 렌더 + 상하 spacer 행으로 스크롤 영역 유지
        // TableBody (= tbody) 안에서 spacer-row 패턴 사용 (semantic HTML 유지)
        (() => {
          var i, c;
          const e = re.getVirtualItems(), r = re.getTotalSize(), l = Math.round(((i = e[0]) == null ? void 0 : i.start) ?? 0), h = Math.round(
            r - (((c = e[e.length - 1]) == null ? void 0 : c.end) ?? 0)
          );
          return /* @__PURE__ */ b(Jt, { children: [
            l > 0 && /* @__PURE__ */ t(H, { className: "hover:bg-transparent", style: { height: l }, children: /* @__PURE__ */ t(D, { colSpan: K, className: "p-0 border-0" }) }),
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
                    totalColumns: K,
                    visibleWidth: $
                  }
                )
              ] }, p.id);
            }),
            h > 0 && /* @__PURE__ */ t(H, { className: "hover:bg-transparent", style: { height: h }, children: /* @__PURE__ */ t(D, { colSpan: K, className: "p-0 border-0" }) })
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
              totalColumns: K,
              visibleWidth: $
            }
          )
        ] }, e.id);
      }),
      jt && !Ce && /* @__PURE__ */ b(H, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
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
                children: /* @__PURE__ */ t(os, { size: 20 })
              }
            )
          }
        ),
        x.map((e) => /* @__PURE__ */ t(
          D,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return B || d ? /* @__PURE__ */ t(
    At,
    {
      sensors: Ht,
      collisionDetection: es,
      onDragEnd: Mt,
      children: lt
    }
  ) : lt;
}
export {
  qs as DataTable
};
//# sourceMappingURL=index.mjs.map
