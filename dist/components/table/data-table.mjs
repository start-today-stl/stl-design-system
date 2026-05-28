import { jsxs as b, jsx as e } from "react/jsx-runtime";
import * as a from "react";
import { useSensors as Ce, useSensor as Ut, PointerSensor as Ke, KeyboardSensor as Ie, DndContext as He, closestCenter as Te } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as ze, SortableContext as ft, horizontalListSortingStrategy as Yt, verticalListSortingStrategy as Me } from "@dnd-kit/sortable";
import { cn as K } from "../../lib/utils.mjs";
import { Table as Le, TableHeader as je, TableRow as _, TableHead as S, TableSortableHead as Zt, TableBody as Oe, TableCell as I } from "./table.mjs";
import { Checkbox as Gt } from "../ui/checkbox.mjs";
import { Skeleton as nt } from "../ui/skeleton.mjs";
import { SplashScreen as _e } from "../ui/splash-screen.mjs";
import { DownIcon as At } from "../../icons/DownIcon.mjs";
import { RightIcon as te } from "../../icons/RightIcon.mjs";
import { RowAddIcon as Be } from "../../icons/RowAddIcon.mjs";
import { SortableHeaderCell as Pe } from "./data-table/sortable-header-cell.mjs";
import { DataTableBodyRow as ee } from "./data-table/data-table-body-row.mjs";
import { useStickyStyles as Ve } from "./data-table/hooks/use-sticky-styles.mjs";
import { useColumnResize as Fe } from "./data-table/hooks/use-column-resize.mjs";
import { useRowGrouping as Xe } from "./data-table/hooks/use-row-grouping.mjs";
import { useColumnReorder as qe } from "./data-table/hooks/use-column-reorder.mjs";
import { useRowReorder as Je } from "./data-table/hooks/use-row-reorder.mjs";
import { useCellEditing as Qe } from "./data-table/hooks/use-cell-editing.mjs";
import { useSort as Ue } from "./data-table/hooks/use-sort.mjs";
import { getAlignClass as Ye } from "./data-table/utils.mjs";
import { DRAG_HANDLE_WIDTH as u, CHECKBOX_WIDTH as N, EXPAND_WIDTH as w, ROW_ACTIONS_WIDTH as H } from "./data-table/types.mjs";
function xs({
  columns: z,
  data: m,
  selectable: W = !1,
  selectedIds: E = [],
  onSelectionChange: g,
  sortState: se,
  onSortChange: re,
  multiSort: ie = !1,
  onRowClick: yt,
  onCellChange: lt,
  expandable: r,
  emptyMessage: ne = "데이터가 없습니다.",
  className: le,
  rowClassName: mt,
  maxHeight: F,
  resizable: $ = !1,
  columnWidths: ae,
  onColumnResize: oe,
  columnReorderable: B = !1,
  columnOrder: ce,
  onColumnReorder: de,
  rowReorderable: at = !1,
  onRowReorder: he,
  loading: ut = !1,
  loadingMode: Z = "splash",
  loadingContent: X,
  headerGroups: d,
  rowGrouping: P,
  rowActions: h
}) {
  const f = P ? !1 : at, M = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  a.useEffect(() => {
    M && P && at && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [P, at, M]), a.useEffect(() => {
    M && X && Z !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [X, Z, M]);
  const {
    editingCell: gt,
    editValue: kt,
    editValueRef: xt,
    editingCellRef: bt,
    setEditingCell: St,
    setEditValue: Nt,
    startEditing: wt,
    completeEditing: Wt,
    cancelEditing: $t
  } = Qe({ columns: z, data: m, onCellChange: lt }), vt = a.useRef(null), [v, pe] = a.useState(0);
  a.useEffect(() => {
    const t = vt.current;
    if (!t) return;
    const s = () => pe(t.clientWidth);
    s();
    const i = new ResizeObserver(s);
    return i.observe(t), () => i.disconnect();
  }, []);
  const [fe, ye] = a.useState(
    (r == null ? void 0 : r.defaultExpandedRowIds) ?? []
  ), {
    resizingColumn: me,
    getColumnWidth: q,
    handleResizeStart: ue
  } = Fe({ resizable: $, columnWidths: ae, onColumnResize: oe }), { orderedColumns: ge, handleColumnDragEnd: Rt } = qe({
    columns: z,
    columnReorderable: B,
    columnOrder: ce,
    onColumnReorder: de
  }), { handleRowDragEnd: Dt } = Je({ data: m, onRowReorder: he }), [ke, Et] = a.useState(null), G = a.useMemo(() => {
    if (!d || d.length === 0) return [];
    const t = new Map(
      z.map((s) => [s.accessorKey, s])
    );
    return d.flatMap((s, i) => {
      const n = s.columns.map((c) => t.get(c)).filter((c) => c !== void 0);
      if (n.length === 0) return [];
      const o = new Set(
        n.map((c) => c.sticky).filter((c) => c !== void 0)
      ), y = o.size > 0, k = n.some((c) => !c.sticky), x = o.size > 1;
      return y && (k || x) ? [
        {
          headerLabel: typeof s.header == "string" || typeof s.header == "number" ? String(s.header) : `#${i + 1}`,
          reason: x ? "left/right sticky 혼합" : "sticky/non-sticky 혼합"
        }
      ] : [];
    });
  }, [d, z]), A = a.useMemo(
    () => G.map((t) => `${t.headerLabel}:${t.reason}`).join("|"),
    [G]
  ), ot = a.useRef("");
  a.useEffect(() => {
    if (!M) return;
    if (!A) {
      ot.current = "";
      return;
    }
    if (ot.current === A) return;
    ot.current = A;
    const t = G.map((s) => `${s.headerLabel}(${s.reason})`).join(", ");
    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. 그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + t
    );
  }, [A, G, M]);
  const xe = Ce(
    Ut(Ke, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    Ut(Ie, {
      coordinateGetter: ze
    })
  ), be = a.useCallback(
    (t) => {
      const { active: s } = t;
      String(s.id).startsWith("row-") ? Dt(t) : Rt(t);
    },
    [Rt, Dt]
  ), L = (r == null ? void 0 : r.expandedRowIds) ?? fe, J = (r == null ? void 0 : r.onExpandedChange) ?? ye, tt = m.length > 0 && E.length === m.length, Ct = E.length > 0 && !tt, Kt = () => {
    tt ? g == null || g([]) : g == null || g(m.map((t) => t.id));
  }, It = a.useCallback((t) => {
    E.includes(t) ? g == null || g(E.filter((s) => s !== t)) : g == null || g([...E, t]);
  }, [E, g]), { handleSort: Ht, getSortDirection: Tt, getSortPriority: zt } = Ue({
    sortState: se,
    onSortChange: re,
    multiSort: ie,
    shouldWarn: M
  }), j = Ye, ct = a.useCallback((t) => r ? r.rowExpandable ? r.rowExpandable(t) : !0 : !1, [r]), Mt = a.useCallback((t) => L.includes(t), [L]), Lt = a.useCallback((t) => {
    L.includes(t) ? J(L.filter((s) => s !== t)) : J([...L, t]);
  }, [L, J]), Q = a.useMemo(() => r ? m.filter((t) => ct(t)).map((t) => t.id) : [], [m, r]), U = Q.length > 0 && Q.every((t) => L.includes(t)), jt = () => {
    J(U ? [] : Q);
  }, Y = (h == null ? void 0 : h.showDelete) ?? !!(h != null && h.onRowDelete), Se = (h == null ? void 0 : h.showAdd) ?? !!(h != null && h.onRowAdd), et = z.length + (W ? 1 : 0) + (r ? 1 : 0) + (f ? 1 : 0) + (Y ? 1 : 0), {
    middleRowSet: Ot,
    getRowSpan: _t,
    isGroupCellHovered: Bt,
    isGroupCellSelected: Pt
  } = Xe({ data: m, rowGrouping: P, hoveredRowIndex: ke, selectedIds: E }), { getStickyStyles: V, hasLeftStickyColumns: T } = Ve({
    columns: z,
    selectable: W,
    expandable: r,
    rowReorderable: f
  }), st = (t) => {
    const s = V(t, !0), i = (l) => typeof l == "number" ? `${l}px` : l, n = {};
    if (!t.sticky) {
      const l = $ ? q(t) : void 0;
      l !== void 0 ? (n.width = `${l}px`, n.minWidth = `${l}px`) : (t.width && (n.width = i(t.width)), t.minWidth && (n.minWidth = i(t.minWidth)));
    }
    const o = { ...n, ...s.style }, k = $e.has(t.accessorKey) && "border-r border-slate-200 dark:border-slate-700", x = $ && /* @__PURE__ */ e(
      "div",
      {
        className: K(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          me === t.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (l) => ue(l, t),
        onPointerDown: (l) => l.stopPropagation(),
        onClick: (l) => l.stopPropagation()
      }
    );
    return B && !t.sticky && !t.sortable ? /* @__PURE__ */ b(
      Pe,
      {
        id: String(t.accessorKey),
        style: o,
        className: K(j(t.align), s.className, $ && "relative overflow-visible", k),
        children: [
          t.header,
          x
        ]
      },
      String(t.accessorKey)
    ) : t.sortable ? /* @__PURE__ */ b(
      Zt,
      {
        sortDirection: Tt(t.accessorKey),
        sortPriority: zt(t.accessorKey),
        onSort: () => Ht(t.accessorKey),
        style: o,
        className: K(j(t.align), s.className, $ && "relative overflow-visible", k),
        children: [
          t.header,
          x
        ]
      },
      String(t.accessorKey)
    ) : /* @__PURE__ */ b(
      S,
      {
        style: o,
        className: K(j(t.align), s.className, $ && "relative overflow-visible", k),
        children: [
          t.header,
          x
        ]
      },
      String(t.accessorKey)
    );
  }, p = B ? ge : z, Vt = p.filter((t) => !t.sticky).map((t) => String(t.accessorKey)), Ne = m.map((t) => `row-${t.id}`), we = a.useCallback(() => 0, []), dt = a.useCallback(
    () => f ? u : 0,
    [f]
  ), rt = a.useCallback(() => {
    let t = 0;
    return f && (t += u), W && (t += N), t;
  }, [f, W]), We = a.useCallback(
    (t) => p.filter(
      (s) => t.columns.includes(s.accessorKey)
    ).length,
    [p]
  ), it = a.useMemo(() => d ? new Set(d.flatMap((t) => t.columns)) : /* @__PURE__ */ new Set(), [d]), $e = a.useMemo(() => {
    if (!d || d.length === 0) return /* @__PURE__ */ new Set();
    const t = /* @__PURE__ */ new Set(), s = (n) => d.findIndex((o) => o.columns.includes(n.accessorKey)), i = p.filter((n) => it.has(n.accessorKey));
    for (let n = 0; n < i.length - 1; n++) {
      const o = i[n], y = i[n + 1], k = s(o), x = s(y);
      k !== x && t.add(o.accessorKey);
    }
    return t;
  }, [d, p, it]), Ft = a.useCallback(
    (t) => {
      const s = p.filter((l) => t.columns.includes(l.accessorKey));
      if (s.length === 0) return { style: {}, className: "" };
      const i = s.every((l) => l.sticky === "left"), n = s.every((l) => l.sticky === "right");
      if (!i && !n) return { style: {}, className: "" };
      const o = i ? s[0] : s[s.length - 1], y = V(o, !0), k = (l) => {
        const c = $ ? q(l) : void 0;
        if (c !== void 0) return c;
        const R = l.width ?? l.minWidth;
        if (typeof R == "number") return R;
        const O = parseInt(String(R), 10);
        return Number.isFinite(O) ? O : 150;
      }, C = `${s.reduce((l, c) => l + k(c), 0)}px`;
      return {
        style: {
          ...y.style,
          width: C,
          minWidth: C,
          maxWidth: C
        },
        className: y.className
      };
    },
    [p, V, q, $]
  ), Xt = a.useMemo(() => {
    if (!d || d.length === 0) return [];
    const t = [], s = /* @__PURE__ */ new Set();
    for (const i of p) {
      const n = d.findIndex((o) => o.columns.includes(i.accessorKey));
      n !== -1 ? s.has(n) || (s.add(n), t.push({ type: "group", group: d[n] })) : t.push({ type: "standalone", col: i });
    }
    return t;
  }, [d, p]), qt = a.useMemo(
    () => ({
      columnsToRender: p,
      rowReorderable: f,
      selectable: W,
      expandable: !!r,
      showRowDelete: Y,
      hasLeftStickyColumns: T,
      resizable: $,
      rowActions: h,
      rowGrouping: P,
      middleRowSet: Ot,
      dataLength: m.length,
      getCheckboxHeaderLeftOffset: dt,
      getExpandHeaderLeftOffset: rt,
      getRowSpan: _t,
      isGroupCellHovered: Bt,
      isGroupCellSelected: Pt,
      getStickyStyles: V,
      getColumnWidth: q,
      getAlignClass: j,
      handleSelectRow: It,
      toggleRowExpanded: Lt,
      startEditing: wt,
      completeEditing: Wt,
      cancelEditing: $t,
      setEditValue: Nt,
      setEditingCell: St,
      editValueRef: xt,
      editingCellRef: bt,
      onCellChange: lt,
      onRowClick: yt,
      rowClassName: mt,
      setHoveredRowIndex: Et
    }),
    [
      p,
      f,
      W,
      r,
      Y,
      T,
      $,
      h,
      P,
      Ot,
      m.length,
      dt,
      rt,
      _t,
      Bt,
      Pt,
      V,
      q,
      j,
      It,
      Lt,
      wt,
      Wt,
      $t,
      Nt,
      St,
      xt,
      bt,
      lt,
      yt,
      mt,
      Et
    ]
  ), Jt = /* @__PURE__ */ b(Le, { className: le, maxHeight: F, wrapperRef: vt, children: [
    /* @__PURE__ */ b(je, { children: [
      d && d.length > 0 && /* @__PURE__ */ b(_, { children: [
        f && /* @__PURE__ */ e(
          S,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${u}px`,
              minWidth: `${u}px`,
              ...T && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        W && /* @__PURE__ */ e(
          S,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${N}px`,
              minWidth: `${N}px`,
              ...T && { position: "sticky", left: f ? u : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ e(
              Gt,
              {
                checked: tt,
                indeterminate: Ct,
                onCheckedChange: Kt,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        r && /* @__PURE__ */ e(
          S,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${w}px`,
              minWidth: `${w}px`,
              ...T && { position: "sticky", left: rt(), zIndex: 20 }
            },
            children: (r == null ? void 0 : r.showExpandAll) !== !1 && Q.length > 0 && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: jt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": U ? "모두 접기" : "모두 펼치기",
                children: U ? /* @__PURE__ */ e(At, { size: 24 }) : /* @__PURE__ */ e(te, { size: 24 })
              }
            )
          }
        ),
        Y && /* @__PURE__ */ e(
          S,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${H}px`,
              minWidth: `${H}px`,
              maxWidth: `${H}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ e("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        Xt.map((t, s) => {
          const i = Xt[s + 1], n = t.type === "group" && (i == null ? void 0 : i.type) === "group";
          if (t.type === "group") {
            const o = We(t.group);
            if (o === 0) return null;
            const y = p.filter(
              (c) => t.group.columns.includes(c.accessorKey)
            );
            if (new Set(
              y.map((c) => c.sticky ?? "none")
            ).size > 1) {
              const c = [];
              let R = [], O = y[0].sticky;
              for (const D of y)
                D.sticky === O ? R.push(D) : (R.length > 0 && c.push({ cols: R, sticky: O }), R = [D], O = D.sticky);
              R.length > 0 && c.push({ cols: R, sticky: O });
              const Qt = c.findIndex((D) => !D.sticky), ve = Qt !== -1 ? Qt : 0;
              return c.map((D, ht) => {
                const Re = {
                  header: t.group.header,
                  columns: D.cols.map((Ee) => Ee.accessorKey),
                  align: t.group.align
                }, pt = D.sticky ? Ft(Re) : { style: {}, className: "" }, De = !!pt.style.position;
                return /* @__PURE__ */ e(
                  S,
                  {
                    colSpan: D.cols.length,
                    className: K(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      t.group.align === "left" && "text-left",
                      t.group.align === "right" && "text-right",
                      n && ht === c.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      pt.className
                    ),
                    style: De ? pt.style : { position: "relative", zIndex: 0 },
                    children: ht === ve ? t.group.header : null
                  },
                  `group-${String(t.group.columns[0])}-seg-${ht}`
                );
              });
            }
            const C = Ft(t.group), l = !!C.style.position;
            return /* @__PURE__ */ e(
              S,
              {
                colSpan: o,
                className: K(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  t.group.align === "left" && "text-left",
                  t.group.align === "right" && "text-right",
                  n && "border-r border-slate-200 dark:border-slate-700",
                  C.className
                ),
                style: l ? C.style : { position: "relative", zIndex: 0 },
                children: t.group.header
              },
              `group-${String(t.group.columns[0])}`
            );
          } else {
            const o = V(t.col, !0);
            return t.col.sortable ? /* @__PURE__ */ e(
              Zt,
              {
                rowSpan: 2,
                sortDirection: Tt(t.col.accessorKey),
                sortPriority: zt(t.col.accessorKey),
                onSort: () => Ht(t.col.accessorKey),
                className: K(
                  j(t.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  o.className
                ),
                style: o.style,
                children: t.col.header
              },
              `standalone-${String(t.col.accessorKey)}`
            ) : /* @__PURE__ */ e(
              S,
              {
                rowSpan: 2,
                className: K(
                  j(t.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  o.className
                ),
                style: o.style,
                children: t.col.header
              },
              `standalone-${String(t.col.accessorKey)}`
            );
          }
        })
      ] }),
      /* @__PURE__ */ b(_, { children: [
        !d && f && /* @__PURE__ */ e(
          S,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: T ? {
              position: "sticky",
              left: we(),
              zIndex: 20,
              width: `${u}px`,
              minWidth: `${u}px`,
              maxWidth: `${u}px`
            } : {
              width: `${u}px`,
              minWidth: `${u}px`,
              maxWidth: `${u}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ e("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !d && W && /* @__PURE__ */ e(
          S,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: T ? {
              position: "sticky",
              left: dt(),
              zIndex: 20,
              width: `${N}px`,
              minWidth: `${N}px`,
              maxWidth: `${N}px`
            } : {
              width: `${N}px`,
              minWidth: `${N}px`,
              maxWidth: `${N}px`
            },
            children: /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ e(
              Gt,
              {
                checked: tt,
                indeterminate: Ct,
                onCheckedChange: Kt,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !d && r && /* @__PURE__ */ e(
          S,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: T ? {
              position: "sticky",
              left: rt(),
              zIndex: 20,
              width: `${w}px`,
              minWidth: `${w}px`,
              maxWidth: `${w}px`
            } : {
              width: `${w}px`,
              minWidth: `${w}px`,
              maxWidth: `${w}px`
            },
            "aria-label": "확장",
            children: (r == null ? void 0 : r.showExpandAll) !== !1 && Q.length > 0 ? /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: jt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": U ? "모두 접기" : "모두 펼치기",
                children: U ? /* @__PURE__ */ e(At, { size: 24 }) : /* @__PURE__ */ e(te, { size: 24 })
              }
            ) : /* @__PURE__ */ e("span", { className: "sr-only", children: "확장" })
          }
        ),
        !d && Y && /* @__PURE__ */ e(
          S,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${H}px`,
              minWidth: `${H}px`,
              maxWidth: `${H}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ e("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        d ? B ? /* @__PURE__ */ e(ft, { items: Vt, strategy: Yt, children: p.filter((t) => it.has(t.accessorKey)).map(st) }) : p.filter((t) => it.has(t.accessorKey)).map(st) : B ? /* @__PURE__ */ e(ft, { items: Vt, strategy: Yt, children: p.map(st) }) : p.map(st)
      ] })
    ] }),
    /* @__PURE__ */ b(Oe, { children: [
      ut ? /* @__PURE__ */ e(_, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ e(
        I,
        {
          colSpan: et,
          className: K(
            "text-center",
            X || Z !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: X ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ e(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: v ? { width: v } : void 0,
                children: X
              }
            )
          ) : Z === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const s = typeof F == "number" ? F : typeof F == "string" && parseInt(F, 10) || 320, i = Math.max(1, Math.floor(s / 41));
              return /* @__PURE__ */ e("table", { className: "w-full", children: /* @__PURE__ */ e("tbody", { children: Array.from({ length: i }).map((n, o) => /* @__PURE__ */ b(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    f && /* @__PURE__ */ e("td", { className: "w-8 p-2", children: /* @__PURE__ */ e(nt, { width: 16, height: 16 }) }),
                    W && /* @__PURE__ */ e("td", { className: "w-10 p-2", children: /* @__PURE__ */ e(nt, { width: 18, height: 18 }) }),
                    r && /* @__PURE__ */ e("td", { className: "w-10 p-2", children: /* @__PURE__ */ e(nt, { width: 18, height: 18 }) }),
                    p.map((y) => {
                      const k = y.width ?? y.minWidth, x = typeof k == "number" ? Math.min(k * 0.6, 150) : 100;
                      return /* @__PURE__ */ e("td", { className: "p-2", children: /* @__PURE__ */ e(nt, { height: 16, width: x }) }, String(y.accessorKey));
                    })
                  ]
                },
                o
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본) - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ e(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: v ? { width: v } : void 0,
                children: /* @__PURE__ */ e(_e, { size: "lg" })
              }
            )
          )
        }
      ) }) : m.length === 0 ? /* @__PURE__ */ e(_, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ e(
        I,
        {
          colSpan: et,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ e(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: v ? { width: v } : void 0,
              children: ne
            }
          )
        }
      ) }) : f ? /* @__PURE__ */ e(ft, { items: Ne, strategy: Me, children: m.map((t, s) => {
        const i = Mt(t.id);
        return /* @__PURE__ */ b(a.Fragment, { children: [
          /* @__PURE__ */ e(
            ee,
            {
              row: t,
              rowIndex: s,
              isSelected: E.includes(t.id),
              canExpand: ct(t),
              isExpanded: i,
              editingCell: gt,
              editValue: kt,
              ctx: qt
            }
          ),
          r && i && /* @__PURE__ */ e(_, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ e(
            I,
            {
              colSpan: et,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ e(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: v ? `${v}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: r.expandedRowRender(t)
                }
              )
            }
          ) })
        ] }, t.id);
      }) }) : m.map((t, s) => {
        const i = Mt(t.id);
        return /* @__PURE__ */ b(a.Fragment, { children: [
          /* @__PURE__ */ e(
            ee,
            {
              row: t,
              rowIndex: s,
              isSelected: E.includes(t.id),
              canExpand: ct(t),
              isExpanded: i,
              editingCell: gt,
              editValue: kt,
              ctx: qt
            }
          ),
          r && i && /* @__PURE__ */ e(_, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ e(
            I,
            {
              colSpan: et,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ e(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: v ? `${v}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: r.expandedRowRender(t)
                }
              )
            }
          ) })
        ] }, t.id);
      }),
      Se && !ut && /* @__PURE__ */ b(_, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        f && /* @__PURE__ */ e(
          I,
          {
            className: "!p-0",
            style: {
              width: `${u}px`,
              minWidth: `${u}px`,
              maxWidth: `${u}px`
            }
          }
        ),
        W && /* @__PURE__ */ e(
          I,
          {
            className: "!p-0",
            style: {
              width: `${N}px`,
              minWidth: `${N}px`,
              maxWidth: `${N}px`
            }
          }
        ),
        r && /* @__PURE__ */ e(
          I,
          {
            className: "!p-0",
            style: {
              width: `${w}px`,
              minWidth: `${w}px`,
              maxWidth: `${w}px`
            }
          }
        ),
        /* @__PURE__ */ e(
          I,
          {
            className: "!p-0",
            style: {
              width: `${H}px`,
              minWidth: `${H}px`,
              maxWidth: `${H}px`
            },
            children: /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => {
                  var t;
                  return (t = h == null ? void 0 : h.onRowAdd) == null ? void 0 : t.call(h);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ e(Be, { size: 20 })
              }
            )
          }
        ),
        p.map((t) => /* @__PURE__ */ e(
          I,
          {
            className: "!p-0"
          },
          String(t.accessorKey)
        ))
      ] })
    ] })
  ] });
  return B || f ? /* @__PURE__ */ e(
    He,
    {
      sensors: xe,
      collisionDetection: Te,
      onDragEnd: be,
      children: Jt
    }
  ) : Jt;
}
export {
  xs as DataTable
};
//# sourceMappingURL=data-table.mjs.map
