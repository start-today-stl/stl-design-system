import { jsxs as b, jsx as t } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as Ct, useSensor as Ae, PointerSensor as It, KeyboardSensor as Kt, DndContext as Tt, closestCenter as Ht } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as Mt, SortableContext as me, horizontalListSortingStrategy as Ge, verticalListSortingStrategy as zt } from "@dnd-kit/sortable";
import { cn as I } from "../../lib/utils.mjs";
import { Table as Lt, TableHeader as jt, TableRow as B, TableHead as w, TableSortableHead as et, TableBody as Ot, TableCell as K } from "./table.mjs";
import { Checkbox as tt } from "../ui/checkbox.mjs";
import { Skeleton as ae } from "../ui/skeleton.mjs";
import { SplashScreen as _t } from "../ui/splash-screen.mjs";
import { DownIcon as st } from "../../icons/DownIcon.mjs";
import { RightIcon as rt } from "../../icons/RightIcon.mjs";
import { RowAddIcon as Bt } from "../../icons/RowAddIcon.mjs";
import { SortableHeaderCell as Pt } from "./data-table/sortable-header-cell.mjs";
import { DataTableBodyRow as it } from "./data-table/data-table-body-row.mjs";
import { useStickyStyles as Vt } from "./data-table/hooks/use-sticky-styles.mjs";
import { useColumnResize as Ft } from "./data-table/hooks/use-column-resize.mjs";
import { useRowGrouping as Xt } from "./data-table/hooks/use-row-grouping.mjs";
import { useColumnReorder as qt } from "./data-table/hooks/use-column-reorder.mjs";
import { useRowReorder as Jt } from "./data-table/hooks/use-row-reorder.mjs";
import { useCellEditing as Qt } from "./data-table/hooks/use-cell-editing.mjs";
import { DRAG_HANDLE_WIDTH as u, CHECKBOX_WIDTH as S, EXPAND_WIDTH as N, ROW_ACTIONS_WIDTH as T } from "./data-table/types.mjs";
function us({
  columns: z,
  data: y,
  selectable: v = !1,
  selectedIds: E = [],
  onSelectionChange: m,
  sortState: X,
  onSortChange: ce,
  multiSort: ge = !1,
  onRowClick: xe,
  onCellChange: oe,
  expandable: n,
  emptyMessage: nt = "데이터가 없습니다.",
  className: lt,
  rowClassName: ke,
  maxHeight: q,
  resizable: W = !1,
  columnWidths: at,
  onColumnResize: ct,
  columnReorderable: P = !1,
  columnOrder: ot,
  onColumnReorder: dt,
  rowReorderable: de = !1,
  onRowReorder: ht,
  loading: be = !1,
  loadingMode: G = "splash",
  loadingContent: J,
  headerGroups: d,
  rowGrouping: V,
  rowActions: h
}) {
  const g = V ? !1 : de, H = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  l.useEffect(() => {
    H && V && de && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [V, de, H]), l.useEffect(() => {
    H && J && G !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [J, G, H]);
  const {
    editingCell: we,
    editValue: Se,
    editValueRef: Ne,
    editingCellRef: ve,
    setEditingCell: We,
    setEditValue: $e,
    startEditing: Re,
    completeEditing: De,
    cancelEditing: Ee
  } = Qt({ columns: z, data: y, onCellChange: oe }), Ce = l.useRef(null), [$, ft] = l.useState(0);
  l.useEffect(() => {
    const e = Ce.current;
    if (!e) return;
    const s = () => ft(e.clientWidth);
    s();
    const r = new ResizeObserver(s);
    return r.observe(e), () => r.disconnect();
  }, []);
  const [pt, yt] = l.useState(
    (n == null ? void 0 : n.defaultExpandedRowIds) ?? []
  ), {
    resizingColumn: ut,
    getColumnWidth: Q,
    handleResizeStart: mt
  } = Ft({ resizable: W, columnWidths: at, onColumnResize: ct }), { orderedColumns: gt, handleColumnDragEnd: Ie } = qt({
    columns: z,
    columnReorderable: P,
    columnOrder: ot,
    onColumnReorder: dt
  }), { handleRowDragEnd: Ke } = Jt({ data: y, onRowReorder: ht }), [xt, Te] = l.useState(null), ee = l.useMemo(() => {
    if (!d || d.length === 0) return [];
    const e = new Map(
      z.map((s) => [s.accessorKey, s])
    );
    return d.flatMap((s, r) => {
      const i = s.columns.map((o) => e.get(o)).filter((o) => o !== void 0);
      if (i.length === 0) return [];
      const c = new Set(
        i.map((o) => o.sticky).filter((o) => o !== void 0)
      ), p = c.size > 0, x = i.some((o) => !o.sticky), k = c.size > 1;
      return p && (x || k) ? [
        {
          headerLabel: typeof s.header == "string" || typeof s.header == "number" ? String(s.header) : `#${r + 1}`,
          reason: k ? "left/right sticky 혼합" : "sticky/non-sticky 혼합"
        }
      ] : [];
    });
  }, [d, z]), te = l.useMemo(
    () => ee.map((e) => `${e.headerLabel}:${e.reason}`).join("|"),
    [ee]
  ), he = l.useRef("");
  l.useEffect(() => {
    if (!H) return;
    if (!te) {
      he.current = "";
      return;
    }
    if (he.current === te) return;
    he.current = te;
    const e = ee.map((s) => `${s.headerLabel}(${s.reason})`).join(", ");
    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. 그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + e
    );
  }, [te, ee, H]);
  const kt = Ct(
    Ae(It, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    Ae(Kt, {
      coordinateGetter: Mt
    })
  ), bt = l.useCallback(
    (e) => {
      const { active: s } = e;
      String(s.id).startsWith("row-") ? Ke(e) : Ie(e);
    },
    [Ie, Ke]
  ), L = (n == null ? void 0 : n.expandedRowIds) ?? pt, U = (n == null ? void 0 : n.onExpandedChange) ?? yt, se = y.length > 0 && E.length === y.length, He = E.length > 0 && !se, Me = () => {
    se ? m == null || m([]) : m == null || m(y.map((e) => e.id));
  }, ze = l.useCallback((e) => {
    E.includes(e) ? m == null || m(E.filter((s) => s !== e)) : m == null || m([...E, e]);
  }, [E, m]), j = l.useMemo(() => {
    if (!X) return [];
    if (!Array.isArray(X)) {
      H && console.warn(
        "[DataTable] sortState는 배열(SortState<T>[])이어야 합니다. 마이그레이션 가이드: docs/MIGRATION-DATATABLE-SORT.md"
      );
      const e = X;
      return e.column && e.direction ? [e] : [];
    }
    return X.filter((e) => e.column && e.direction);
  }, [X, H]), Le = (e) => {
    if (!ce) return;
    const s = j.find((r) => r.column === e);
    if (ge) {
      let r;
      s ? s.direction === "asc" ? r = j.map(
        (i) => i.column === e ? { column: e, direction: "desc" } : i
      ) : r = j.filter((i) => i.column !== e) : r = [...j, { column: e, direction: "asc" }], ce(r);
    } else {
      let r;
      s ? s.direction === "asc" ? r = [{ column: e, direction: "desc" }] : s.direction === "desc" ? r = [] : r = [{ column: e, direction: "asc" }] : r = [{ column: e, direction: "asc" }], ce(r);
    }
  }, je = (e) => {
    const s = j.find((r) => r.column === e);
    return (s == null ? void 0 : s.direction) ?? null;
  }, Oe = (e) => {
    if (!ge || j.length <= 1) return;
    const s = j.findIndex((r) => r.column === e);
    return s === -1 ? void 0 : s + 1;
  }, O = l.useCallback((e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, []), fe = l.useCallback((e) => n ? n.rowExpandable ? n.rowExpandable(e) : !0 : !1, [n]), _e = l.useCallback((e) => L.includes(e), [L]), Be = l.useCallback((e) => {
    L.includes(e) ? U(L.filter((s) => s !== e)) : U([...L, e]);
  }, [L, U]), Y = l.useMemo(() => n ? y.filter((e) => fe(e)).map((e) => e.id) : [], [y, n]), Z = Y.length > 0 && Y.every((e) => L.includes(e)), Pe = () => {
    U(Z ? [] : Y);
  }, A = (h == null ? void 0 : h.showDelete) ?? !!(h != null && h.onRowDelete), wt = (h == null ? void 0 : h.showAdd) ?? !!(h != null && h.onRowAdd), re = z.length + (v ? 1 : 0) + (n ? 1 : 0) + (g ? 1 : 0) + (A ? 1 : 0), {
    middleRowSet: Ve,
    getRowSpan: Fe,
    isGroupCellHovered: Xe,
    isGroupCellSelected: qe
  } = Xt({ data: y, rowGrouping: V, hoveredRowIndex: xt, selectedIds: E }), { getStickyStyles: F, hasLeftStickyColumns: M } = Vt({
    columns: z,
    selectable: v,
    expandable: n,
    rowReorderable: g
  }), ie = (e) => {
    const s = F(e, !0), r = (a) => typeof a == "number" ? `${a}px` : a, i = {};
    if (!e.sticky) {
      const a = W ? Q(e) : void 0;
      a !== void 0 ? (i.width = `${a}px`, i.minWidth = `${a}px`) : (e.width && (i.width = r(e.width)), e.minWidth && (i.minWidth = r(e.minWidth)));
    }
    const c = { ...i, ...s.style }, x = Wt.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", k = W && /* @__PURE__ */ t(
      "div",
      {
        className: I(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          ut === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (a) => mt(a, e),
        onPointerDown: (a) => a.stopPropagation(),
        onClick: (a) => a.stopPropagation()
      }
    );
    return P && !e.sticky && !e.sortable ? /* @__PURE__ */ b(
      Pt,
      {
        id: String(e.accessorKey),
        style: c,
        className: I(O(e.align), s.className, W && "relative overflow-visible", x),
        children: [
          e.header,
          k
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ b(
      et,
      {
        sortDirection: je(e.accessorKey),
        sortPriority: Oe(e.accessorKey),
        onSort: () => Le(e.accessorKey),
        style: c,
        className: I(O(e.align), s.className, W && "relative overflow-visible", x),
        children: [
          e.header,
          k
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ b(
      w,
      {
        style: c,
        className: I(O(e.align), s.className, W && "relative overflow-visible", x),
        children: [
          e.header,
          k
        ]
      },
      String(e.accessorKey)
    );
  }, f = P ? gt : z, Je = f.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), St = y.map((e) => `row-${e.id}`), Nt = l.useCallback(() => 0, []), pe = l.useCallback(
    () => g ? u : 0,
    [g]
  ), ne = l.useCallback(() => {
    let e = 0;
    return g && (e += u), v && (e += S), e;
  }, [g, v]), vt = l.useCallback(
    (e) => f.filter(
      (s) => e.columns.includes(s.accessorKey)
    ).length,
    [f]
  ), le = l.useMemo(() => d ? new Set(d.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [d]), Wt = l.useMemo(() => {
    if (!d || d.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), s = (i) => d.findIndex((c) => c.columns.includes(i.accessorKey)), r = f.filter((i) => le.has(i.accessorKey));
    for (let i = 0; i < r.length - 1; i++) {
      const c = r[i], p = r[i + 1], x = s(c), k = s(p);
      x !== k && e.add(c.accessorKey);
    }
    return e;
  }, [d, f, le]), Qe = l.useCallback(
    (e) => {
      const s = f.filter((a) => e.columns.includes(a.accessorKey));
      if (s.length === 0) return { style: {}, className: "" };
      const r = s.every((a) => a.sticky === "left"), i = s.every((a) => a.sticky === "right");
      if (!r && !i) return { style: {}, className: "" };
      const c = r ? s[0] : s[s.length - 1], p = F(c, !0), x = (a) => {
        const o = W ? Q(a) : void 0;
        if (o !== void 0) return o;
        const R = a.width ?? a.minWidth;
        if (typeof R == "number") return R;
        const _ = parseInt(String(R), 10);
        return Number.isFinite(_) ? _ : 150;
      }, C = `${s.reduce((a, o) => a + x(o), 0)}px`;
      return {
        style: {
          ...p.style,
          width: C,
          minWidth: C,
          maxWidth: C
        },
        className: p.className
      };
    },
    [f, F, Q, W]
  ), Ue = l.useMemo(() => {
    if (!d || d.length === 0) return [];
    const e = [], s = /* @__PURE__ */ new Set();
    for (const r of f) {
      const i = d.findIndex((c) => c.columns.includes(r.accessorKey));
      i !== -1 ? s.has(i) || (s.add(i), e.push({ type: "group", group: d[i] })) : e.push({ type: "standalone", col: r });
    }
    return e;
  }, [d, f]), Ye = /* @__PURE__ */ b(Lt, { className: lt, maxHeight: q, wrapperRef: Ce, children: [
    /* @__PURE__ */ b(jt, { children: [
      d && d.length > 0 && /* @__PURE__ */ b(B, { children: [
        g && /* @__PURE__ */ t(
          w,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${u}px`,
              minWidth: `${u}px`,
              ...M && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        v && /* @__PURE__ */ t(
          w,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${S}px`,
              minWidth: `${S}px`,
              ...M && { position: "sticky", left: g ? u : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              tt,
              {
                checked: se,
                indeterminate: He,
                onCheckedChange: Me,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        n && /* @__PURE__ */ t(
          w,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${N}px`,
              minWidth: `${N}px`,
              ...M && { position: "sticky", left: ne(), zIndex: 20 }
            },
            children: (n == null ? void 0 : n.showExpandAll) !== !1 && Y.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Pe,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": Z ? "모두 접기" : "모두 펼치기",
                children: Z ? /* @__PURE__ */ t(st, { size: 24 }) : /* @__PURE__ */ t(rt, { size: 24 })
              }
            )
          }
        ),
        A && /* @__PURE__ */ t(
          w,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${T}px`,
              minWidth: `${T}px`,
              maxWidth: `${T}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        Ue.map((e, s) => {
          const r = Ue[s + 1], i = e.type === "group" && (r == null ? void 0 : r.type) === "group";
          if (e.type === "group") {
            const c = vt(e.group);
            if (c === 0) return null;
            const p = f.filter(
              (o) => e.group.columns.includes(o.accessorKey)
            );
            if (new Set(
              p.map((o) => o.sticky ?? "none")
            ).size > 1) {
              const o = [];
              let R = [], _ = p[0].sticky;
              for (const D of p)
                D.sticky === _ ? R.push(D) : (R.length > 0 && o.push({ cols: R, sticky: _ }), R = [D], _ = D.sticky);
              R.length > 0 && o.push({ cols: R, sticky: _ });
              const Ze = o.findIndex((D) => !D.sticky), $t = Ze !== -1 ? Ze : 0;
              return o.map((D, ye) => {
                const Rt = {
                  header: e.group.header,
                  columns: D.cols.map((Et) => Et.accessorKey),
                  align: e.group.align
                }, ue = D.sticky ? Qe(Rt) : { style: {}, className: "" }, Dt = !!ue.style.position;
                return /* @__PURE__ */ t(
                  w,
                  {
                    colSpan: D.cols.length,
                    className: I(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      i && ye === o.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      ue.className
                    ),
                    style: Dt ? ue.style : { position: "relative", zIndex: 0 },
                    children: ye === $t ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${ye}`
                );
              });
            }
            const C = Qe(e.group), a = !!C.style.position;
            return /* @__PURE__ */ t(
              w,
              {
                colSpan: c,
                className: I(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  i && "border-r border-slate-200 dark:border-slate-700",
                  C.className
                ),
                style: a ? C.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const c = F(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ t(
              et,
              {
                rowSpan: 2,
                sortDirection: je(e.col.accessorKey),
                sortPriority: Oe(e.col.accessorKey),
                onSort: () => Le(e.col.accessorKey),
                className: I(
                  O(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  c.className
                ),
                style: c.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ t(
              w,
              {
                rowSpan: 2,
                className: I(
                  O(e.col.align),
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
      /* @__PURE__ */ b(B, { children: [
        !d && g && /* @__PURE__ */ t(
          w,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: M ? {
              position: "sticky",
              left: Nt(),
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
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !d && v && /* @__PURE__ */ t(
          w,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: M ? {
              position: "sticky",
              left: pe(),
              zIndex: 20,
              width: `${S}px`,
              minWidth: `${S}px`,
              maxWidth: `${S}px`
            } : {
              width: `${S}px`,
              minWidth: `${S}px`,
              maxWidth: `${S}px`
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              tt,
              {
                checked: se,
                indeterminate: He,
                onCheckedChange: Me,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !d && n && /* @__PURE__ */ t(
          w,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: M ? {
              position: "sticky",
              left: ne(),
              zIndex: 20,
              width: `${N}px`,
              minWidth: `${N}px`,
              maxWidth: `${N}px`
            } : {
              width: `${N}px`,
              minWidth: `${N}px`,
              maxWidth: `${N}px`
            },
            "aria-label": "확장",
            children: (n == null ? void 0 : n.showExpandAll) !== !1 && Y.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Pe,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": Z ? "모두 접기" : "모두 펼치기",
                children: Z ? /* @__PURE__ */ t(st, { size: 24 }) : /* @__PURE__ */ t(rt, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !d && A && /* @__PURE__ */ t(
          w,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${T}px`,
              minWidth: `${T}px`,
              maxWidth: `${T}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        d ? P ? /* @__PURE__ */ t(me, { items: Je, strategy: Ge, children: f.filter((e) => le.has(e.accessorKey)).map(ie) }) : f.filter((e) => le.has(e.accessorKey)).map(ie) : P ? /* @__PURE__ */ t(me, { items: Je, strategy: Ge, children: f.map(ie) }) : f.map(ie)
      ] })
    ] }),
    /* @__PURE__ */ b(Ot, { children: [
      be ? /* @__PURE__ */ t(B, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        K,
        {
          colSpan: re,
          className: I(
            "text-center",
            J || G !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: J ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: $ ? { width: $ } : void 0,
                children: J
              }
            )
          ) : G === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const s = typeof q == "number" ? q : typeof q == "string" && parseInt(q, 10) || 320, r = Math.max(1, Math.floor(s / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: r }).map((i, c) => /* @__PURE__ */ b(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    g && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(ae, { width: 16, height: 16 }) }),
                    v && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ae, { width: 18, height: 18 }) }),
                    n && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ae, { width: 18, height: 18 }) }),
                    f.map((p) => {
                      const x = p.width ?? p.minWidth, k = typeof x == "number" ? Math.min(x * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(ae, { height: 16, width: k }) }, String(p.accessorKey));
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
                style: $ ? { width: $ } : void 0,
                children: /* @__PURE__ */ t(_t, { size: "lg" })
              }
            )
          )
        }
      ) }) : y.length === 0 ? /* @__PURE__ */ t(B, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        K,
        {
          colSpan: re,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: $ ? { width: $ } : void 0,
              children: nt
            }
          )
        }
      ) }) : g ? /* @__PURE__ */ t(me, { items: St, strategy: zt, children: y.map((e, s) => {
        const r = _e(e.id);
        return /* @__PURE__ */ b(l.Fragment, { children: [
          /* @__PURE__ */ t(
            it,
            {
              row: e,
              rowIndex: s,
              dataLength: y.length,
              isSelected: E.includes(e.id),
              canExpand: fe(e),
              isExpanded: r,
              editingCell: we,
              editValue: Se,
              editValueRef: Ne,
              editingCellRef: ve,
              columnsToRender: f,
              rowReorderable: !0,
              selectable: v,
              expandable: !!n,
              showRowDelete: A,
              hasLeftStickyColumns: M,
              resizable: W,
              rowActions: h,
              rowGrouping: V,
              middleRowSet: Ve,
              getCheckboxHeaderLeftOffset: pe,
              getExpandHeaderLeftOffset: ne,
              getRowSpan: Fe,
              isGroupCellHovered: Xe,
              isGroupCellSelected: qe,
              getStickyStyles: F,
              getColumnWidth: Q,
              getAlignClass: O,
              handleSelectRow: ze,
              toggleRowExpanded: Be,
              startEditing: Re,
              completeEditing: De,
              cancelEditing: Ee,
              setEditValue: $e,
              setEditingCell: We,
              onCellChange: oe,
              onRowClick: xe,
              rowClassName: ke,
              setHoveredRowIndex: Te
            }
          ),
          n && r && /* @__PURE__ */ t(B, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            K,
            {
              colSpan: re,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: $ ? `${$}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: n.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : y.map((e, s) => {
        const r = _e(e.id);
        return /* @__PURE__ */ b(l.Fragment, { children: [
          /* @__PURE__ */ t(
            it,
            {
              row: e,
              rowIndex: s,
              dataLength: y.length,
              isSelected: E.includes(e.id),
              canExpand: fe(e),
              isExpanded: r,
              editingCell: we,
              editValue: Se,
              editValueRef: Ne,
              editingCellRef: ve,
              columnsToRender: f,
              rowReorderable: !1,
              selectable: v,
              expandable: !!n,
              showRowDelete: A,
              hasLeftStickyColumns: M,
              resizable: W,
              rowActions: h,
              rowGrouping: V,
              middleRowSet: Ve,
              getCheckboxHeaderLeftOffset: pe,
              getExpandHeaderLeftOffset: ne,
              getRowSpan: Fe,
              isGroupCellHovered: Xe,
              isGroupCellSelected: qe,
              getStickyStyles: F,
              getColumnWidth: Q,
              getAlignClass: O,
              handleSelectRow: ze,
              toggleRowExpanded: Be,
              startEditing: Re,
              completeEditing: De,
              cancelEditing: Ee,
              setEditValue: $e,
              setEditingCell: We,
              onCellChange: oe,
              onRowClick: xe,
              rowClassName: ke,
              setHoveredRowIndex: Te
            }
          ),
          n && r && /* @__PURE__ */ t(B, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            K,
            {
              colSpan: re,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: $ ? `${$}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: n.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      wt && !be && /* @__PURE__ */ b(B, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        g && /* @__PURE__ */ t(
          K,
          {
            className: "!p-0",
            style: {
              width: `${u}px`,
              minWidth: `${u}px`,
              maxWidth: `${u}px`
            }
          }
        ),
        v && /* @__PURE__ */ t(
          K,
          {
            className: "!p-0",
            style: {
              width: `${S}px`,
              minWidth: `${S}px`,
              maxWidth: `${S}px`
            }
          }
        ),
        n && /* @__PURE__ */ t(
          K,
          {
            className: "!p-0",
            style: {
              width: `${N}px`,
              minWidth: `${N}px`,
              maxWidth: `${N}px`
            }
          }
        ),
        /* @__PURE__ */ t(
          K,
          {
            className: "!p-0",
            style: {
              width: `${T}px`,
              minWidth: `${T}px`,
              maxWidth: `${T}px`
            },
            children: /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  var e;
                  return (e = h == null ? void 0 : h.onRowAdd) == null ? void 0 : e.call(h);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(Bt, { size: 20 })
              }
            )
          }
        ),
        f.map((e) => /* @__PURE__ */ t(
          K,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return P || g ? /* @__PURE__ */ t(
    Tt,
    {
      sensors: kt,
      collisionDetection: Ht,
      onDragEnd: bt,
      children: Ye
    }
  ) : Ye;
}
export {
  us as DataTable
};
//# sourceMappingURL=data-table.mjs.map
