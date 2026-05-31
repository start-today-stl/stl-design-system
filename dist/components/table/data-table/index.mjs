import { jsxs as b, jsx as t, Fragment as Xt } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as Yt, useSensor as at, PointerSensor as qt, KeyboardSensor as Jt, DndContext as Qt, closestCenter as Ut } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as Zt, SortableContext as we, horizontalListSortingStrategy as nt, verticalListSortingStrategy as At } from "@dnd-kit/sortable";
import { cn as Z } from "../../../lib/utils.mjs";
import { Table as es, TableHeader as ts, TableRow as N, TableHead as k, TableSortableHead as ss, TableBody as rs, TableCell as g } from "../table.mjs";
import { Checkbox as it } from "../../ui/checkbox.mjs";
import { Skeleton as ce } from "../../ui/skeleton.mjs";
import { SplashScreen as ls } from "../../ui/splash-screen.mjs";
import { DownIcon as ot } from "../../../icons/DownIcon.mjs";
import { RightIcon as ct } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as as } from "../../../icons/RowAddIcon.mjs";
import { DataTableBodyRow as Re } from "./data-table-body-row.mjs";
import { DataTableColumnHeader as ns } from "./data-table-column-header.mjs";
import { useStickyStyles as is } from "./hooks/use-sticky-styles.mjs";
import { useColumnResize as os } from "./hooks/use-column-resize.mjs";
import { useRowGrouping as cs } from "./hooks/use-row-grouping.mjs";
import { useColumnReorder as ds } from "./hooks/use-column-reorder.mjs";
import { useRowReorder as hs } from "./hooks/use-row-reorder.mjs";
import { useCellEditing as ps } from "./hooks/use-cell-editing.mjs";
import { useSort as ms } from "./hooks/use-sort.mjs";
import { useHeaderGroups as gs } from "./hooks/use-header-groups.mjs";
import { useTableVirtualizer as fs } from "./hooks/use-table-virtualizer.mjs";
import { useStableCallback as B } from "./hooks/use-stable-callback.mjs";
import { useStableObject as dt } from "./hooks/use-stable-object.mjs";
import { getAlignClass as us } from "./utils.mjs";
import { DRAG_HANDLE_WIDTH as d, CHECKBOX_WIDTH as f, EXPAND_WIDTH as S, ROW_ACTIONS_WIDTH as E } from "./types.mjs";
const xs = [];
function Gs({
  columns: T,
  data: n,
  selectable: w = !1,
  selectedIds: j = xs,
  onSelectionChange: z,
  sortState: ht,
  onSortChange: pt,
  multiSort: mt = !1,
  onRowClick: gt,
  onCellChange: Ne,
  expandable: ft,
  emptyMessage: ut = "데이터가 없습니다.",
  className: xt,
  rowClassName: yt,
  maxHeight: P,
  resizable: O = !1,
  columnWidths: bt,
  onColumnResize: kt,
  columnReorderable: L = !1,
  columnOrder: St,
  onColumnReorder: wt,
  rowReorderable: de = !1,
  onRowReorder: Rt,
  loading: $e = !1,
  loadingMode: A = "splash",
  loadingContent: G,
  headerGroups: D,
  rowGrouping: Nt,
  rowActions: i,
  virtual: $t
}) {
  const u = dt(Nt), s = dt(ft), o = u ? !1 : de, K = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  l.useEffect(() => {
    K && u && de && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [u, de, K]), l.useEffect(() => {
    K && G && A !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [G, A, K]);
  const {
    editingCell: he,
    editValue: pe,
    editValueRef: ve,
    editingCellRef: Ce,
    setEditingCell: We,
    setEditValue: Ee,
    startEditing: De,
    completeEditing: Ie,
    cancelEditing: Te
  } = ps({ columns: T, data: n, onCellChange: Ne }), me = l.useRef(null), [m, vt] = l.useState(0);
  l.useEffect(() => {
    const e = me.current;
    if (!e) return;
    const r = () => vt(e.clientWidth);
    r();
    const a = new ResizeObserver(r);
    return a.observe(e), () => a.disconnect();
  }, []);
  const [Ct, Wt] = l.useState(
    (s == null ? void 0 : s.defaultExpandedRowIds) ?? []
  ), {
    resizingColumn: Et,
    getColumnWidth: ee,
    handleResizeStart: Dt
  } = os({ resizable: O, columnWidths: bt, onColumnResize: kt }), { orderedColumns: It, handleColumnDragEnd: ze } = ds({
    columns: T,
    columnReorderable: L,
    columnOrder: St,
    onColumnReorder: wt
  }), { handleRowDragEnd: Ke } = hs({ data: n, onRowReorder: Rt }), [te, He] = l.useState(null), Tt = Yt(
    at(qt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    at(Jt, {
      coordinateGetter: Zt
    })
  ), zt = l.useCallback(
    (e) => {
      const { active: r } = e;
      String(r.id).startsWith("row-") ? Ke(e) : ze(e);
    },
    [ze, Ke]
  ), F = (s == null ? void 0 : s.expandedRowIds) ?? Ct, se = (s == null ? void 0 : s.onExpandedChange) ?? Wt, X = l.useMemo(() => new Set(j), [j]), re = n.length > 0 && j.length === n.length, _e = j.length > 0 && !re, je = () => {
    re ? z == null || z([]) : z == null || z(n.map((e) => e.id));
  }, Oe = l.useRef(j);
  Oe.current = j;
  const H = B(z), Le = l.useCallback((e) => {
    const r = Oe.current;
    r.includes(e) ? H == null || H(r.filter((a) => a !== e)) : H == null || H([...r, e]);
  }, [H]), { handleSort: Me, getSortDirection: Ve, getSortPriority: Be } = ms({
    sortState: ht,
    onSortChange: pt,
    multiSort: mt,
    shouldWarn: K
  }), Y = us, le = l.useCallback((e) => s ? s.rowExpandable ? s.rowExpandable(e) : !0 : !1, [s]), Pe = l.useMemo(
    () => new Set(F),
    [F]
  ), ge = l.useCallback(
    (e) => Pe.has(e),
    [Pe]
  ), Ge = l.useRef(F);
  Ge.current = F;
  const fe = l.useRef(se);
  fe.current = se;
  const Fe = l.useCallback((e) => {
    const r = Ge.current;
    r.includes(e) ? fe.current(r.filter((a) => a !== e)) : fe.current([...r, e]);
  }, []), q = l.useMemo(() => s ? n.filter((e) => le(e)).map((e) => e.id) : [], [n, s]), J = q.length > 0 && q.every((e) => F.includes(e)), Xe = () => {
    se(J ? [] : q);
  }, Ye = B(Ne), qe = B(gt), Je = B(yt), Qe = B(i == null ? void 0 : i.onRowDelete), ue = B(i == null ? void 0 : i.onRowAdd), Q = (i == null ? void 0 : i.showDelete) ?? !!(i != null && i.onRowDelete), Kt = (i == null ? void 0 : i.showAdd) ?? !!(i != null && i.onRowAdd), _ = T.length + (w ? 1 : 0) + (s ? 1 : 0) + (o ? 1 : 0) + (Q ? 1 : 0), { rowSpanMap: xe, middleRowSet: Ue, getRowSpan: Ze } = cs({ data: n, rowGrouping: u }), $ = l.useMemo(() => {
    if (!u || !xe) return null;
    const e = /* @__PURE__ */ new Map();
    for (const [r, a] of xe.entries()) {
      const v = {}, c = {};
      let h = !1;
      for (const [y, p] of a.entries())
        if (p > 1) {
          h = !0;
          let C = !1;
          for (let M = r; M < r + p && M < n.length; M++)
            if (X.has(n[M].id)) {
              C = !0;
              break;
            }
          v[String(y)] = C, c[String(y)] = te !== null && te >= r && te < r + p;
        }
      h && e.set(r, { selected: v, hovered: c });
    }
    return e;
  }, [u, xe, n, X, te]), { getStickyStyles: U, hasLeftStickyColumns: I } = is({
    columns: T,
    selectable: w,
    expandable: s,
    rowReorderable: o
  }), Ht = T.some((e) => e.sticky), _t = o ? "rowReorderable (행 드래그앤드롭)" : u ? "rowGrouping (rowSpan 그룹핑)" : Ht ? "sticky 컬럼 (가상화 스크롤 중 sub-pixel 깜빡임 발생, v2 div-based grid 에서 지원 예정)" : null, { isVirtual: jt, virtualizer: ae } = fs({
    virtual: $t,
    disabledReason: _t,
    count: n.length,
    scrollContainerRef: me,
    shouldWarn: K
  }), ne = (e) => /* @__PURE__ */ t(
    ns,
    {
      column: e,
      stickyData: U(e, !0),
      alignClass: Y(e.align),
      needsRightBorder: Mt.has(e.accessorKey),
      resizable: O,
      resizedWidth: O ? ee(e) : void 0,
      isResizing: Et === e.accessorKey,
      onResizeStart: Dt,
      columnReorderable: L,
      sortDirection: Ve(e.accessorKey),
      sortPriority: Be(e.accessorKey),
      onSort: () => Me(e.accessorKey)
    },
    String(e.accessorKey)
  ), x = L ? It : T, Ae = x.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Ot = n.map((e) => `row-${e.id}`), Lt = l.useCallback(() => 0, []), ye = l.useCallback(
    () => o ? d : 0,
    [o]
  ), ie = l.useCallback(() => {
    let e = 0;
    return o && (e += d), w && (e += f), e;
  }, [o, w]), {
    groupedColumnsSet: et,
    columnsWithRightBorder: Mt,
    getHeaderGroupColSpan: Vt,
    getHeaderGroupStickyData: tt,
    headerGroupItems: st
  } = gs({
    columns: T,
    columnsToRender: x,
    headerGroups: D,
    getStickyStyles: U,
    getColumnWidth: ee,
    resizable: O,
    shouldWarn: K
  }), be = l.useMemo(
    () => ({
      columnsToRender: x,
      rowReorderable: o,
      selectable: w,
      expandable: !!s,
      showRowDelete: Q,
      hasLeftStickyColumns: I,
      resizable: O,
      onRowDelete: Qe,
      rowGrouping: u,
      middleRowSet: Ue,
      // dataLength 는 rowGrouping 의 isGroupSpanToEnd 계산에만 사용됨.
      // rowGrouping 안 쓰면 0 으로 고정해서 행 추가/삭제 시 ctx invalidate 방지.
      dataLength: u ? n.length : 0,
      getCheckboxHeaderLeftOffset: ye,
      getExpandHeaderLeftOffset: ie,
      getRowSpan: Ze,
      getStickyStyles: U,
      getColumnWidth: ee,
      getAlignClass: Y,
      handleSelectRow: Le,
      toggleRowExpanded: Fe,
      startEditing: De,
      completeEditing: Ie,
      cancelEditing: Te,
      setEditValue: Ee,
      setEditingCell: We,
      editValueRef: ve,
      editingCellRef: Ce,
      onCellChange: Ye,
      onRowClick: qe,
      rowClassName: Je,
      setHoveredRowIndex: He
    }),
    [
      x,
      o,
      w,
      s,
      Q,
      I,
      O,
      Qe,
      u,
      Ue,
      u ? n.length : 0,
      ye,
      ie,
      Ze,
      U,
      ee,
      Y,
      Le,
      Fe,
      De,
      Ie,
      Te,
      Ee,
      We,
      ve,
      Ce,
      Ye,
      qe,
      Je,
      He
    ]
  ), rt = /* @__PURE__ */ b(es, { className: xt, maxHeight: P, wrapperRef: me, children: [
    /* @__PURE__ */ b(ts, { children: [
      D && D.length > 0 && /* @__PURE__ */ b(N, { children: [
        o && /* @__PURE__ */ t(
          k,
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
        w && /* @__PURE__ */ t(
          k,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${f}px`,
              minWidth: `${f}px`,
              ...I && { position: "sticky", left: o ? d : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              it,
              {
                checked: re,
                indeterminate: _e,
                onCheckedChange: je,
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
              width: `${S}px`,
              minWidth: `${S}px`,
              ...I && { position: "sticky", left: ie(), zIndex: 20 }
            },
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && q.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Xe,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": J ? "모두 접기" : "모두 펼치기",
                children: J ? /* @__PURE__ */ t(ot, { size: 24 }) : /* @__PURE__ */ t(ct, { size: 24 })
              }
            )
          }
        ),
        Q && /* @__PURE__ */ t(
          k,
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
        st.map((e, r) => {
          const a = st[r + 1], v = e.type === "group" && (a == null ? void 0 : a.type) === "group";
          if (e.type === "group") {
            const c = Vt(e.group);
            if (c === 0) return null;
            const h = x.filter(
              (W) => e.group.columns.includes(W.accessorKey)
            );
            if (new Set(
              h.map((W) => W.sticky ?? "none")
            ).size > 1) {
              const W = [];
              let V = [], oe = h[0].sticky;
              for (const R of h)
                R.sticky === oe ? V.push(R) : (V.length > 0 && W.push({ cols: V, sticky: oe }), V = [R], oe = R.sticky);
              V.length > 0 && W.push({ cols: V, sticky: oe });
              const lt = W.findIndex((R) => !R.sticky), Bt = lt !== -1 ? lt : 0;
              return W.map((R, ke) => {
                const Pt = {
                  header: e.group.header,
                  columns: R.cols.map((Ft) => Ft.accessorKey),
                  align: e.group.align
                }, Se = R.sticky ? tt(Pt) : { style: {}, className: "" }, Gt = !!Se.style.position;
                return /* @__PURE__ */ t(
                  k,
                  {
                    colSpan: R.cols.length,
                    className: Z(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      v && ke === W.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      Se.className
                    ),
                    style: Gt ? Se.style : { position: "relative", zIndex: 0 },
                    children: ke === Bt ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${ke}`
                );
              });
            }
            const C = tt(e.group), M = !!C.style.position;
            return /* @__PURE__ */ t(
              k,
              {
                colSpan: c,
                className: Z(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  v && "border-r border-slate-200 dark:border-slate-700",
                  C.className
                ),
                style: M ? C.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const c = U(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ t(
              ss,
              {
                rowSpan: 2,
                sortDirection: Ve(e.col.accessorKey),
                sortPriority: Be(e.col.accessorKey),
                onSort: () => Me(e.col.accessorKey),
                className: Z(
                  Y(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  c.className
                ),
                style: c.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ t(
              k,
              {
                rowSpan: 2,
                className: Z(
                  Y(e.col.align),
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
      /* @__PURE__ */ b(N, { children: [
        !D && o && /* @__PURE__ */ t(
          k,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: I ? {
              position: "sticky",
              left: Lt(),
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
        !D && w && /* @__PURE__ */ t(
          k,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: I ? {
              position: "sticky",
              left: ye(),
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
              it,
              {
                checked: re,
                indeterminate: _e,
                onCheckedChange: je,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !D && s && /* @__PURE__ */ t(
          k,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: I ? {
              position: "sticky",
              left: ie(),
              zIndex: 20,
              width: `${S}px`,
              minWidth: `${S}px`,
              maxWidth: `${S}px`
            } : {
              width: `${S}px`,
              minWidth: `${S}px`,
              maxWidth: `${S}px`
            },
            "aria-label": "확장",
            children: (s == null ? void 0 : s.showExpandAll) !== !1 && q.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Xe,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": J ? "모두 접기" : "모두 펼치기",
                children: J ? /* @__PURE__ */ t(ot, { size: 24 }) : /* @__PURE__ */ t(ct, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !D && Q && /* @__PURE__ */ t(
          k,
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
        D ? L ? /* @__PURE__ */ t(we, { items: Ae, strategy: nt, children: x.filter((e) => et.has(e.accessorKey)).map(ne) }) : x.filter((e) => et.has(e.accessorKey)).map(ne) : L ? /* @__PURE__ */ t(we, { items: Ae, strategy: nt, children: x.map(ne) }) : x.map(ne)
      ] })
    ] }),
    /* @__PURE__ */ b(rs, { children: [
      $e ? /* @__PURE__ */ t(N, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        g,
        {
          colSpan: _,
          className: Z(
            "text-center",
            G || A !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: G ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: m ? { width: m } : void 0,
                children: G
              }
            )
          ) : A === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const r = typeof P == "number" ? P : typeof P == "string" && parseInt(P, 10) || 320, a = Math.max(1, Math.floor(r / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: a }).map((v, c) => /* @__PURE__ */ b(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    o && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(ce, { width: 16, height: 16 }) }),
                    w && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ce, { width: 18, height: 18 }) }),
                    s && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ce, { width: 18, height: 18 }) }),
                    x.map((h) => {
                      const y = h.width ?? h.minWidth, p = typeof y == "number" ? Math.min(y * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(ce, { height: 16, width: p }) }, String(h.accessorKey));
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
                children: /* @__PURE__ */ t(ls, { size: "lg" })
              }
            )
          )
        }
      ) }) : n.length === 0 ? /* @__PURE__ */ t(N, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        g,
        {
          colSpan: _,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: m ? { width: m } : void 0,
              children: ut
            }
          )
        }
      ) }) : o ? /* @__PURE__ */ t(we, { items: Ot, strategy: At, children: n.map((e, r) => {
        const a = ge(e.id);
        return /* @__PURE__ */ b(l.Fragment, { children: [
          /* @__PURE__ */ t(
            Re,
            {
              row: e,
              rowIndex: r,
              isSelected: X.has(e.id),
              canExpand: le(e),
              isExpanded: a,
              editingCell: he,
              editValue: pe,
              ctx: be,
              groupCellFlags: $ == null ? void 0 : $.get(r)
            }
          ),
          s && a && /* @__PURE__ */ t(N, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            g,
            {
              colSpan: _,
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
      }) }) : jt && ae ? (
        // 가상화 활성: 보이는 행만 렌더 + 상하 spacer 행으로 스크롤 영역 유지
        // TableBody (= tbody) 안에서 spacer-row 패턴 사용 (semantic HTML 유지)
        (() => {
          var c, h;
          const e = ae.getVirtualItems(), r = ae.getTotalSize(), a = Math.round(((c = e[0]) == null ? void 0 : c.start) ?? 0), v = Math.round(
            r - (((h = e[e.length - 1]) == null ? void 0 : h.end) ?? 0)
          );
          return /* @__PURE__ */ b(Xt, { children: [
            a > 0 && /* @__PURE__ */ t(N, { className: "hover:bg-transparent", style: { height: a }, children: /* @__PURE__ */ t(g, { colSpan: _, className: "p-0 border-0" }) }),
            e.map((y) => {
              const p = n[y.index], C = ge(p.id);
              return /* @__PURE__ */ b(l.Fragment, { children: [
                /* @__PURE__ */ t(
                  Re,
                  {
                    row: p,
                    rowIndex: y.index,
                    isSelected: X.has(p.id),
                    canExpand: le(p),
                    isExpanded: C,
                    editingCell: he,
                    editValue: pe,
                    ctx: be,
                    groupCellFlags: $ == null ? void 0 : $.get(y.index),
                    rowRef: ae.measureElement,
                    dataIndex: y.index
                  }
                ),
                s && C && /* @__PURE__ */ t(N, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
                  g,
                  {
                    colSpan: _,
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
            v > 0 && /* @__PURE__ */ t(N, { className: "hover:bg-transparent", style: { height: v }, children: /* @__PURE__ */ t(g, { colSpan: _, className: "p-0 border-0" }) })
          ] });
        })()
      ) : n.map((e, r) => {
        const a = ge(e.id);
        return /* @__PURE__ */ b(l.Fragment, { children: [
          /* @__PURE__ */ t(
            Re,
            {
              row: e,
              rowIndex: r,
              isSelected: X.has(e.id),
              canExpand: le(e),
              isExpanded: a,
              editingCell: he,
              editValue: pe,
              ctx: be,
              groupCellFlags: $ == null ? void 0 : $.get(r)
            }
          ),
          s && a && /* @__PURE__ */ t(N, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            g,
            {
              colSpan: _,
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
      Kt && !$e && /* @__PURE__ */ b(N, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
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
        w && /* @__PURE__ */ t(
          g,
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
          g,
          {
            className: "!p-0",
            style: {
              width: `${S}px`,
              minWidth: `${S}px`,
              maxWidth: `${S}px`
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
                onClick: () => ue == null ? void 0 : ue(),
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(as, { size: 20 })
              }
            )
          }
        ),
        x.map((e) => /* @__PURE__ */ t(
          g,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return L || o ? /* @__PURE__ */ t(
    Qt,
    {
      sensors: Tt,
      collisionDetection: Ut,
      onDragEnd: zt,
      children: rt
    }
  ) : rt;
}
export {
  Gs as DataTable
};
//# sourceMappingURL=index.mjs.map
