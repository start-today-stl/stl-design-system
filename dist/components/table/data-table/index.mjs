import { jsxs as y, jsx as t, Fragment as Gt } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as Xt, useSensor as rt, PointerSensor as Yt, KeyboardSensor as qt, DndContext as Jt, closestCenter as Qt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as Ut, SortableContext as be, horizontalListSortingStrategy as lt, verticalListSortingStrategy as Zt } from "@dnd-kit/sortable";
import { cn as Q } from "../../../lib/utils.mjs";
import { Table as At, TableHeader as es, TableRow as R, TableHead as b, TableSortableHead as ts, TableBody as ss, TableCell as g } from "../table.mjs";
import { Checkbox as at } from "../../ui/checkbox.mjs";
import { Skeleton as ne } from "../../ui/skeleton.mjs";
import { SplashScreen as rs } from "../../ui/splash-screen.mjs";
import { DownIcon as nt } from "../../../icons/DownIcon.mjs";
import { RightIcon as it } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as ls } from "../../../icons/RowAddIcon.mjs";
import { DataTableBodyRow as ke } from "./data-table-body-row.mjs";
import { DataTableColumnHeader as as } from "./data-table-column-header.mjs";
import { useStickyStyles as ns } from "./hooks/use-sticky-styles.mjs";
import { useColumnResize as is } from "./hooks/use-column-resize.mjs";
import { useRowGrouping as os } from "./hooks/use-row-grouping.mjs";
import { useColumnReorder as cs } from "./hooks/use-column-reorder.mjs";
import { useRowReorder as ds } from "./hooks/use-row-reorder.mjs";
import { useCellEditing as hs } from "./hooks/use-cell-editing.mjs";
import { useSort as ps } from "./hooks/use-sort.mjs";
import { useHeaderGroups as ms } from "./hooks/use-header-groups.mjs";
import { useTableVirtualizer as gs } from "./hooks/use-table-virtualizer.mjs";
import { useStableCallback as B } from "./hooks/use-stable-callback.mjs";
import { useStableObject as ot } from "./hooks/use-stable-object.mjs";
import { getAlignClass as us } from "./utils.mjs";
import { DRAG_HANDLE_WIDTH as d, CHECKBOX_WIDTH as u, EXPAND_WIDTH as k, ROW_ACTIONS_WIDTH as E } from "./types.mjs";
const fs = [];
function Ps({
  columns: H,
  data: n,
  selectable: S = !1,
  selectedIds: j = fs,
  onSelectionChange: T,
  sortState: ct,
  onSortChange: dt,
  multiSort: ht = !1,
  onRowClick: pt,
  onCellChange: Se,
  expandable: mt,
  emptyMessage: gt = "데이터가 없습니다.",
  className: ut,
  rowClassName: ft,
  maxHeight: V,
  resizable: _ = !1,
  columnWidths: xt,
  onColumnResize: yt,
  columnReorderable: M = !1,
  columnOrder: bt,
  onColumnReorder: kt,
  rowReorderable: St = !1,
  onRowReorder: wt,
  loading: we = !1,
  loadingMode: Re = "splash",
  loadingContent: ie,
  headerGroups: D,
  rowGrouping: Rt,
  rowActions: i,
  virtual: Nt
}) {
  const N = ot(Rt), s = ot(mt), o = N ? !1 : St, {
    editingCell: oe,
    editValue: ce,
    editValueRef: Ne,
    editingCellRef: $e,
    setEditingCell: ve,
    setEditValue: Ce,
    startEditing: We,
    completeEditing: Ee,
    cancelEditing: De
  } = hs({ columns: H, data: n, onCellChange: Se }), de = l.useRef(null), [m, $t] = l.useState(0);
  l.useEffect(() => {
    const e = de.current;
    if (!e) return;
    const r = () => $t(e.clientWidth);
    r();
    const a = new ResizeObserver(r);
    return a.observe(e), () => a.disconnect();
  }, []);
  const [vt, Ct] = l.useState(
    (s == null ? void 0 : s.defaultExpandedRowIds) ?? []
  ), {
    resizingColumn: Wt,
    getColumnWidth: U,
    handleResizeStart: Et
  } = is({ resizable: _, columnWidths: xt, onColumnResize: yt }), { orderedColumns: Dt, handleColumnDragEnd: Ie } = cs({
    columns: H,
    columnReorderable: M,
    columnOrder: bt,
    onColumnReorder: kt
  }), { handleRowDragEnd: Te } = ds({ data: n, onRowReorder: wt }), [Z, ze] = l.useState(null), It = Xt(
    rt(Yt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    rt(qt, {
      coordinateGetter: Ut
    })
  ), Tt = l.useCallback(
    (e) => {
      const { active: r } = e;
      String(r.id).startsWith("row-") ? Te(e) : Ie(e);
    },
    [Ie, Te]
  ), P = (s == null ? void 0 : s.expandedRowIds) ?? vt, A = (s == null ? void 0 : s.onExpandedChange) ?? Ct, F = l.useMemo(() => new Set(j), [j]), ee = n.length > 0 && j.length === n.length, Ke = j.length > 0 && !ee, He = () => {
    ee ? T == null || T([]) : T == null || T(n.map((e) => e.id));
  }, je = l.useRef(j);
  je.current = j;
  const z = B(T), _e = l.useCallback((e) => {
    const r = je.current;
    r.includes(e) ? z == null || z(r.filter((a) => a !== e)) : z == null || z([...r, e]);
  }, [z]), { handleSort: Me, getSortDirection: Le, getSortPriority: Oe } = ps({
    sortState: ct,
    onSortChange: dt,
    multiSort: ht
  }), G = us, te = l.useCallback((e) => s ? s.rowExpandable ? s.rowExpandable(e) : !0 : !1, [s]), Be = l.useMemo(
    () => new Set(P),
    [P]
  ), he = l.useCallback(
    (e) => Be.has(e),
    [Be]
  ), Ve = l.useRef(P);
  Ve.current = P;
  const pe = l.useRef(A);
  pe.current = A;
  const Pe = l.useCallback((e) => {
    const r = Ve.current;
    r.includes(e) ? pe.current(r.filter((a) => a !== e)) : pe.current([...r, e]);
  }, []), X = l.useMemo(() => s ? n.filter((e) => te(e)).map((e) => e.id) : [], [n, s]), Y = X.length > 0 && X.every((e) => P.includes(e)), Fe = () => {
    A(Y ? [] : X);
  }, Ge = B(Se), Xe = B(pt), Ye = B(ft), qe = B(i == null ? void 0 : i.onRowDelete), me = B(i == null ? void 0 : i.onRowAdd), q = (i == null ? void 0 : i.showDelete) ?? !!(i != null && i.onRowDelete), zt = (i == null ? void 0 : i.showAdd) ?? !!(i != null && i.onRowAdd), K = H.length + (S ? 1 : 0) + (s ? 1 : 0) + (o ? 1 : 0) + (q ? 1 : 0), { rowSpanMap: ge, middleRowSet: Je, getRowSpan: Qe } = os({ data: n, rowGrouping: N }), $ = l.useMemo(() => {
    if (!N || !ge) return null;
    const e = /* @__PURE__ */ new Map();
    for (const [r, a] of ge.entries()) {
      const v = {}, c = {};
      let h = !1;
      for (const [x, p] of a.entries())
        if (p > 1) {
          h = !0;
          let C = !1;
          for (let L = r; L < r + p && L < n.length; L++)
            if (F.has(n[L].id)) {
              C = !0;
              break;
            }
          v[String(x)] = C, c[String(x)] = Z !== null && Z >= r && Z < r + p;
        }
      h && e.set(r, { selected: v, hovered: c });
    }
    return e;
  }, [N, ge, n, F, Z]), { getStickyStyles: J, hasLeftStickyColumns: I } = ns({
    columns: H,
    selectable: S,
    expandable: s,
    rowReorderable: o
  }), Kt = H.some((e) => e.sticky), Ht = o ? "rowReorderable (행 드래그앤드롭)" : N ? "rowGrouping (rowSpan 그룹핑)" : Kt ? "sticky 컬럼 (가상화 스크롤 중 sub-pixel 깜빡임 발생, v2 div-based grid 에서 지원 예정)" : null, { isVirtual: jt, virtualizer: se } = gs({
    virtual: Nt,
    disabledReason: Ht,
    count: n.length,
    scrollContainerRef: de
  }), re = (e) => /* @__PURE__ */ t(
    as,
    {
      column: e,
      stickyData: J(e, !0),
      alignClass: G(e.align),
      needsRightBorder: Lt.has(e.accessorKey),
      resizable: _,
      resizedWidth: _ ? U(e) : void 0,
      isResizing: Wt === e.accessorKey,
      onResizeStart: Et,
      columnReorderable: M,
      sortDirection: Le(e.accessorKey),
      sortPriority: Oe(e.accessorKey),
      onSort: () => Me(e.accessorKey)
    },
    String(e.accessorKey)
  ), f = M ? Dt : H, Ue = f.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), _t = n.map((e) => `row-${e.id}`), Mt = l.useCallback(() => 0, []), ue = l.useCallback(
    () => o ? d : 0,
    [o]
  ), le = l.useCallback(() => {
    let e = 0;
    return o && (e += d), S && (e += u), e;
  }, [o, S]), {
    groupedColumnsSet: Ze,
    columnsWithRightBorder: Lt,
    getHeaderGroupColSpan: Ot,
    getHeaderGroupStickyData: Ae,
    headerGroupItems: et
  } = ms({
    columnsToRender: f,
    headerGroups: D,
    getStickyStyles: J,
    getColumnWidth: U,
    resizable: _
  }), fe = l.useMemo(
    () => ({
      columnsToRender: f,
      rowReorderable: o,
      selectable: S,
      expandable: !!s,
      showRowDelete: q,
      hasLeftStickyColumns: I,
      resizable: _,
      onRowDelete: qe,
      rowGrouping: N,
      middleRowSet: Je,
      // dataLength 는 rowGrouping 의 isGroupSpanToEnd 계산에만 사용됨.
      // rowGrouping 안 쓰면 0 으로 고정해서 행 추가/삭제 시 ctx invalidate 방지.
      dataLength: N ? n.length : 0,
      getCheckboxHeaderLeftOffset: ue,
      getExpandHeaderLeftOffset: le,
      getRowSpan: Qe,
      getStickyStyles: J,
      getColumnWidth: U,
      getAlignClass: G,
      handleSelectRow: _e,
      toggleRowExpanded: Pe,
      startEditing: We,
      completeEditing: Ee,
      cancelEditing: De,
      setEditValue: Ce,
      setEditingCell: ve,
      editValueRef: Ne,
      editingCellRef: $e,
      onCellChange: Ge,
      onRowClick: Xe,
      rowClassName: Ye,
      setHoveredRowIndex: ze
    }),
    [
      f,
      o,
      S,
      s,
      q,
      I,
      _,
      qe,
      N,
      Je,
      N ? n.length : 0,
      ue,
      le,
      Qe,
      J,
      U,
      G,
      _e,
      Pe,
      We,
      Ee,
      De,
      Ce,
      ve,
      Ne,
      $e,
      Ge,
      Xe,
      Ye,
      ze
    ]
  ), tt = /* @__PURE__ */ y(At, { className: ut, maxHeight: V, wrapperRef: de, children: [
    /* @__PURE__ */ y(es, { children: [
      D && D.length > 0 && /* @__PURE__ */ y(R, { children: [
        o && /* @__PURE__ */ t(
          b,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${d}px`,
              minWidth: `${d}px`,
              ...I && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        S && /* @__PURE__ */ t(
          b,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${u}px`,
              minWidth: `${u}px`,
              ...I && { position: "sticky", left: o ? d : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              at,
              {
                checked: ee,
                indeterminate: Ke,
                onCheckedChange: He,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        s && /* @__PURE__ */ t(
          b,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              ...I && { position: "sticky", left: le(), zIndex: 20 }
            },
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && X.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Fe,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": Y ? "모두 접기" : "모두 펼치기",
                children: Y ? /* @__PURE__ */ t(nt, { size: 24 }) : /* @__PURE__ */ t(it, { size: 24 })
              }
            )
          }
        ),
        q && /* @__PURE__ */ t(
          b,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${E}px`,
              minWidth: `${E}px`,
              maxWidth: `${E}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        et.map((e, r) => {
          const a = et[r + 1], v = e.type === "group" && (a == null ? void 0 : a.type) === "group";
          if (e.type === "group") {
            const c = Ot(e.group);
            if (c === 0) return null;
            const h = f.filter(
              (W) => e.group.columns.includes(W.accessorKey)
            );
            if (new Set(
              h.map((W) => W.sticky ?? "none")
            ).size > 1) {
              const W = [];
              let O = [], ae = h[0].sticky;
              for (const w of h)
                w.sticky === ae ? O.push(w) : (O.length > 0 && W.push({ cols: O, sticky: ae }), O = [w], ae = w.sticky);
              O.length > 0 && W.push({ cols: O, sticky: ae });
              const st = W.findIndex((w) => !w.sticky), Bt = st !== -1 ? st : 0;
              return W.map((w, xe) => {
                const Vt = {
                  header: e.group.header,
                  columns: w.cols.map((Ft) => Ft.accessorKey),
                  align: e.group.align
                }, ye = w.sticky ? Ae(Vt) : { style: {}, className: "" }, Pt = !!ye.style.position;
                return /* @__PURE__ */ t(
                  b,
                  {
                    colSpan: w.cols.length,
                    className: Q(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      v && xe === W.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      ye.className
                    ),
                    style: Pt ? ye.style : { position: "relative", zIndex: 0 },
                    children: xe === Bt ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${xe}`
                );
              });
            }
            const C = Ae(e.group), L = !!C.style.position;
            return /* @__PURE__ */ t(
              b,
              {
                colSpan: c,
                className: Q(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  v && "border-r border-slate-200 dark:border-slate-700",
                  C.className
                ),
                style: L ? C.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const c = J(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ t(
              ts,
              {
                rowSpan: 2,
                sortDirection: Le(e.col.accessorKey),
                sortPriority: Oe(e.col.accessorKey),
                onSort: () => Me(e.col.accessorKey),
                className: Q(
                  G(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  c.className
                ),
                style: c.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ t(
              b,
              {
                rowSpan: 2,
                className: Q(
                  G(e.col.align),
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
      /* @__PURE__ */ y(R, { children: [
        !D && o && /* @__PURE__ */ t(
          b,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: I ? {
              position: "sticky",
              left: Mt(),
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
        !D && S && /* @__PURE__ */ t(
          b,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: I ? {
              position: "sticky",
              left: ue(),
              zIndex: 20,
              width: `${u}px`,
              minWidth: `${u}px`,
              maxWidth: `${u}px`
            } : {
              width: `${u}px`,
              minWidth: `${u}px`,
              maxWidth: `${u}px`
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              at,
              {
                checked: ee,
                indeterminate: Ke,
                onCheckedChange: He,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !D && s && /* @__PURE__ */ t(
          b,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: I ? {
              position: "sticky",
              left: le(),
              zIndex: 20,
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            } : {
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            },
            "aria-label": "확장",
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && X.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Fe,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": Y ? "모두 접기" : "모두 펼치기",
                children: Y ? /* @__PURE__ */ t(nt, { size: 24 }) : /* @__PURE__ */ t(it, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !D && q && /* @__PURE__ */ t(
          b,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${E}px`,
              minWidth: `${E}px`,
              maxWidth: `${E}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        D ? M ? /* @__PURE__ */ t(be, { items: Ue, strategy: lt, children: f.filter((e) => Ze.has(e.accessorKey)).map(re) }) : f.filter((e) => Ze.has(e.accessorKey)).map(re) : M ? /* @__PURE__ */ t(be, { items: Ue, strategy: lt, children: f.map(re) }) : f.map(re)
      ] })
    ] }),
    /* @__PURE__ */ y(ss, { children: [
      we ? /* @__PURE__ */ t(R, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        g,
        {
          colSpan: K,
          className: Q(
            "text-center",
            ie || Re !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: ie ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: m ? { width: m } : void 0,
                children: ie
              }
            )
          ) : Re === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const r = typeof V == "number" ? V : typeof V == "string" && parseInt(V, 10) || 320, a = Math.max(1, Math.floor(r / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: a }).map((v, c) => /* @__PURE__ */ y(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    o && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(ne, { width: 16, height: 16 }) }),
                    S && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ne, { width: 18, height: 18 }) }),
                    s && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ne, { width: 18, height: 18 }) }),
                    f.map((h) => {
                      const x = h.width ?? h.minWidth, p = typeof x == "number" ? Math.min(x * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(ne, { height: 16, width: p }) }, String(h.accessorKey));
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
                style: m ? { width: m } : void 0,
                children: /* @__PURE__ */ t(rs, { size: "lg" })
              }
            )
          )
        }
      ) }) : n.length === 0 ? /* @__PURE__ */ t(R, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        g,
        {
          colSpan: K,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: m ? { width: m } : void 0,
              children: gt
            }
          )
        }
      ) }) : o ? /* @__PURE__ */ t(be, { items: _t, strategy: Zt, children: n.map((e, r) => {
        const a = he(e.id);
        return /* @__PURE__ */ y(l.Fragment, { children: [
          /* @__PURE__ */ t(
            ke,
            {
              row: e,
              rowIndex: r,
              isSelected: F.has(e.id),
              canExpand: te(e),
              isExpanded: a,
              editingCell: oe,
              editValue: ce,
              ctx: fe,
              groupCellFlags: $ == null ? void 0 : $.get(r)
            }
          ),
          s && a && /* @__PURE__ */ t(R, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            g,
            {
              colSpan: K,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: m ? `${m}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: s.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : jt && se ? (
        // 가상화 활성: 보이는 행만 렌더 + 상하 spacer 행으로 스크롤 영역 유지
        // TableBody (= tbody) 안에서 spacer-row 패턴 사용 (semantic HTML 유지)
        (() => {
          var c, h;
          const e = se.getVirtualItems(), r = se.getTotalSize(), a = Math.round(((c = e[0]) == null ? void 0 : c.start) ?? 0), v = Math.round(
            r - (((h = e[e.length - 1]) == null ? void 0 : h.end) ?? 0)
          );
          return /* @__PURE__ */ y(Gt, { children: [
            a > 0 && /* @__PURE__ */ t(R, { className: "hover:bg-transparent", style: { height: a }, children: /* @__PURE__ */ t(g, { colSpan: K, className: "p-0 border-0" }) }),
            e.map((x) => {
              const p = n[x.index], C = he(p.id);
              return /* @__PURE__ */ y(l.Fragment, { children: [
                /* @__PURE__ */ t(
                  ke,
                  {
                    row: p,
                    rowIndex: x.index,
                    isSelected: F.has(p.id),
                    canExpand: te(p),
                    isExpanded: C,
                    editingCell: oe,
                    editValue: ce,
                    ctx: fe,
                    groupCellFlags: $ == null ? void 0 : $.get(x.index),
                    rowRef: se.measureElement,
                    dataIndex: x.index
                  }
                ),
                s && C && /* @__PURE__ */ t(R, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
                  g,
                  {
                    colSpan: K,
                    className: "p-0",
                    style: { position: "relative" },
                    children: /* @__PURE__ */ t(
                      "div",
                      {
                        className: "p-4 overflow-x-auto",
                        style: {
                          position: "sticky",
                          left: 0,
                          width: m ? `${m}px` : "100%",
                          maxWidth: "100%"
                        },
                        children: s.expandedRowRender(p)
                      }
                    )
                  }
                ) })
              ] }, p.id);
            }),
            v > 0 && /* @__PURE__ */ t(R, { className: "hover:bg-transparent", style: { height: v }, children: /* @__PURE__ */ t(g, { colSpan: K, className: "p-0 border-0" }) })
          ] });
        })()
      ) : n.map((e, r) => {
        const a = he(e.id);
        return /* @__PURE__ */ y(l.Fragment, { children: [
          /* @__PURE__ */ t(
            ke,
            {
              row: e,
              rowIndex: r,
              isSelected: F.has(e.id),
              canExpand: te(e),
              isExpanded: a,
              editingCell: oe,
              editValue: ce,
              ctx: fe,
              groupCellFlags: $ == null ? void 0 : $.get(r)
            }
          ),
          s && a && /* @__PURE__ */ t(R, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            g,
            {
              colSpan: K,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: m ? `${m}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: s.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      zt && !we && /* @__PURE__ */ y(R, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        o && /* @__PURE__ */ t(
          g,
          {
            className: "!p-0",
            style: {
              width: `${d}px`,
              minWidth: `${d}px`,
              maxWidth: `${d}px`
            }
          }
        ),
        S && /* @__PURE__ */ t(
          g,
          {
            className: "!p-0",
            style: {
              width: `${u}px`,
              minWidth: `${u}px`,
              maxWidth: `${u}px`
            }
          }
        ),
        s && /* @__PURE__ */ t(
          g,
          {
            className: "!p-0",
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            }
          }
        ),
        /* @__PURE__ */ t(
          g,
          {
            className: "!p-0",
            style: {
              width: `${E}px`,
              minWidth: `${E}px`,
              maxWidth: `${E}px`
            },
            children: /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => me == null ? void 0 : me(),
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(ls, { size: 20 })
              }
            )
          }
        ),
        f.map((e) => /* @__PURE__ */ t(
          g,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return M || o ? /* @__PURE__ */ t(
    Jt,
    {
      sensors: It,
      collisionDetection: Qt,
      onDragEnd: Tt,
      children: tt
    }
  ) : tt;
}
export {
  Ps as DataTable
};
//# sourceMappingURL=index.mjs.map
