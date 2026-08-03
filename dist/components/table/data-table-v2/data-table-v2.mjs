import { jsx as n, jsxs as u } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as dt, useSensor as at, PointerSensor as ct, DndContext as ht } from "@dnd-kit/core";
import { SortableContext as ft, horizontalListSortingStrategy as ut } from "@dnd-kit/sortable";
import { cn as a } from "../../../lib/utils.mjs";
import { Checkbox as mt } from "../../ui/checkbox.mjs";
import { Skeleton as gt } from "../../ui/skeleton.mjs";
import { SplashScreen as pt } from "../../ui/splash-screen.mjs";
import { DownIcon as xt } from "../../../icons/DownIcon.mjs";
import { RightIcon as yt } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as vt } from "../../../icons/RowAddIcon.mjs";
import { DataTableV2ColumnSeparator as ke } from "./data-table-v2-column-separator.mjs";
import { DataTableV2Row as kt } from "./data-table-v2-row.mjs";
import { DataTableV2SortableHeaderCell as Ct } from "./data-table-v2-sortable-header-cell.mjs";
import { useCellEdit as bt } from "./hooks/use-cell-edit.mjs";
import { useColumnResize as wt } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as Nt } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as St } from "./hooks/use-row-expansion.mjs";
import { useRowSelection as Et } from "./hooks/use-row-selection.mjs";
const Rt = 40, A = 120, D = 40, O = 40, H = 40, _t = 5, Q = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function Ce({ direction: i, active: c }) {
  return /* @__PURE__ */ n(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: a(
        "transition-colors",
        c ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        i === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ n("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
}
function Wt(i, c, m) {
  const g = i.find((h) => h.column === c);
  return m ? g ? g.direction === "asc" ? i.map(
    (h) => h.column === c ? { column: c, direction: "desc" } : h
  ) : i.filter((h) => h.column !== c) : [...i, { column: c, direction: "asc" }] : g ? g.direction === "asc" ? [{ column: c, direction: "desc" }] : [] : [{ column: c, direction: "asc" }];
}
function Lt(i, c = 0, m = 0) {
  const g = new Array(i.length).fill(-1), h = new Array(i.length).fill(-1);
  let b = c;
  for (let f = 0; f < i.length; f++)
    i[f].pinned === "left" && (g[f] = b, b += B(i[f]));
  let w = m;
  for (let f = i.length - 1; f >= 0; f--)
    i[f].pinned === "right" && (h[f] = w, w += B(i[f]));
  return { left: g, right: h };
}
function B(i) {
  return typeof i.width == "number" ? i.width : typeof i.minWidth == "number" ? i.minWidth : A;
}
function Dt(i) {
  return i.reduce((c, m) => c + B(m), 0);
}
function qt({
  data: i,
  columns: c,
  headerGroups: m,
  sortState: g,
  onSortChange: h,
  multiSort: b = !1,
  resizable: w = !1,
  columnWidths: f,
  onColumnResize: be,
  columnReorderable: _ = !1,
  columnOrder: we,
  onColumnReorder: Ne,
  selectable: N = !1,
  selectedIds: Se,
  defaultSelectedIds: Ee,
  onSelectionChange: Re,
  onRowClick: _e,
  rowClassName: V,
  expandable: p,
  onCellChange: We,
  rowActions: o,
  loading: ee = !1,
  loadingMode: Le = "splash",
  loadingContent: De,
  emptyMessage: Ie = "데이터가 없습니다.",
  maxHeight: F,
  estimateRowHeight: te = Rt,
  className: ze
}) {
  const I = (o == null ? void 0 : o.showDelete) ?? !!(o != null && o.onRowDelete), Te = (o == null ? void 0 : o.showAdd) ?? !!(o != null && o.onRowAdd), He = o == null ? void 0 : o.onRowDelete, $ = o == null ? void 0 : o.onRowAdd, { orderedColumns: U, handleColumnDragEnd: ne } = Nt({
    columns: c,
    columnReorderable: _,
    columnOrder: we,
    onColumnReorder: Ne
  }), { getColumnWidth: ie, handleResizeStart: Ke, resizingKey: Pe } = wt({
    resizable: w,
    columnWidths: f,
    onColumnResize: be
  }), d = l.useMemo(() => w ? U.map((e) => {
    const t = ie(e);
    return t !== void 0 ? { ...e, width: t } : e;
  }) : U, [U, w, ie]), K = (N ? D : 0) + (p ? O : 0), P = I ? H : 0, { left: X, right: G } = l.useMemo(
    () => Lt(d, K, P),
    [d, K, P]
  ), re = l.useMemo(
    () => Dt(d) + K + P,
    [d, K, P]
  ), z = Et({
    data: i,
    selectable: N,
    selectedIds: Se,
    defaultSelectedIds: Ee,
    onSelectionChange: Re
  }), S = St({ data: i, expandable: p }), v = bt({ onCellChange: We }), W = l.useMemo(
    () => g ?? [],
    [g]
  ), je = l.useCallback(
    (e) => {
      const t = W.findIndex((s) => s.column === e);
      return t < 0 ? { direction: null, priority: void 0 } : {
        direction: W[t].direction,
        priority: b && W.length > 1 ? t + 1 : void 0
      };
    },
    [W, b]
  ), Me = l.useCallback(
    (e) => {
      h && h(Wt(W, e, b));
    },
    [W, b, h]
  ), se = l.useMemo(
    () => d.some((e) => typeof e.width != "number"),
    [d]
  ), Oe = l.useMemo(
    () => _ ? d.filter((e) => !e.pinned && !e.sortable).map((e) => String(e.accessorKey)) : [],
    [d, _]
  ), Be = dt(
    at(ct, { activationConstraint: { distance: 5 } })
  ), Ve = l.useCallback(
    (e) => ne(e),
    [ne]
  ), [le, Fe] = l.useState(/* @__PURE__ */ new Map()), $e = l.useCallback((e, t) => {
    Fe((r) => {
      if (r.get(e) === t) return r;
      const s = new Map(r);
      return s.set(e, t), s;
    });
  }, []), oe = l.useMemo(() => {
    const e = new Array(i.length + 1);
    e[0] = 0;
    for (let t = 0; t < i.length; t++) {
      const r = le.get(i[t].id) ?? te;
      e[t + 1] = e[t] + r;
    }
    return e;
  }, [i, le, te]), Ue = oe[i.length], [Xe, Ge] = l.useState(null), de = l.useRef(null), [Y, Ye] = l.useState(!1), [Z, Ze] = l.useState(!1);
  l.useEffect(() => {
    const e = de.current;
    if (!e) return;
    const t = () => {
      Ye(e.scrollLeft > 0), Ze(e.scrollLeft + e.clientWidth < e.scrollWidth - 1);
    };
    t(), e.addEventListener("scroll", t, { passive: !0 });
    const r = new ResizeObserver(t);
    return r.observe(e), () => {
      e.removeEventListener("scroll", t), r.disconnect();
    };
  }, []);
  const j = l.useMemo(
    () => d.filter((e) => !e.pinned),
    [d]
  ), L = l.useMemo(() => {
    if (!m || m.length === 0) return null;
    const e = [];
    let t = 0;
    for (; t < j.length; ) {
      const r = j[t], s = m.find((x) => x.columns[0] === r.accessorKey);
      if (s) {
        const x = s.columns.reduce((E, R) => {
          const y = j.find((T) => T.accessorKey === R);
          return E + (y ? B(y) : A);
        }, 0);
        e.push({
          kind: "group",
          key: `group-${String(r.accessorKey)}`,
          width: x,
          group: s
        }), t += s.columns.length;
      } else
        e.push({
          kind: "placeholder",
          key: `middle-empty-${String(r.accessorKey)}`,
          col: r
        }), t += 1;
    }
    return e;
  }, [j, m]), ae = L !== null && L.length > 0, qe = ae ? 2 : 1, k = "bg-slate-100 dark:bg-slate-800", ce = (e, t) => {
    const r = e.id ?? String(e.accessorKey), s = je(e.accessorKey), x = typeof e.width == "number" ? e.width : void 0, E = typeof e.minWidth == "number" ? e.minWidth : void 0, R = e.pinned === "left", y = e.pinned === "right", T = R || y, et = t === J && Y, tt = t === C && Z, nt = t === C, it = _ && !T && !e.sortable, rt = Pe === e.accessorKey, st = t === d.length - 1, ge = a(
      "relative flex min-h-9",
      x !== void 0 && "shrink-0",
      T && "sticky z-20",
      T && k,
      et && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      tt && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      e.sortable && "select-none",
      nt && "ml-auto"
    ), pe = {
      width: x,
      minWidth: E,
      flex: x === void 0 ? "1 1 0" : void 0,
      left: R ? X[t] : void 0,
      right: y ? G[t] : void 0
    }, xe = a(
      "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
      Q[e.align ?? "left"]
    ), ye = e.sortable ? /* @__PURE__ */ u(
      "button",
      {
        type: "button",
        className: a(
          "flex w-full items-center gap-1 cursor-pointer",
          // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
          e.align === "right" ? "flex-row-reverse justify-start" : Q[e.align ?? "left"]
        ),
        onClick: () => Me(e.accessorKey),
        children: [
          e.header,
          /* @__PURE__ */ u("span", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ u("span", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ n(Ce, { direction: "up", active: s.direction === "asc" }),
              /* @__PURE__ */ n(Ce, { direction: "down", active: s.direction === "desc" })
            ] }),
            s.priority !== void 0 && /* @__PURE__ */ n("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: s.priority })
          ] })
        ]
      }
    ) : e.header, ve = !st && /* @__PURE__ */ n(
      ke,
      {
        resizable: w,
        isResizing: rt,
        onResizeStart: (ot) => Ke(ot, e)
      }
    ), lt = e.sortable ? s.direction === "asc" ? "ascending" : s.direction === "desc" ? "descending" : "none" : void 0;
    return it ? /* @__PURE__ */ u(
      Ct,
      {
        id: String(e.accessorKey),
        className: ge,
        style: pe,
        children: [
          /* @__PURE__ */ n("div", { className: xe, children: ye }),
          ve
        ]
      },
      r
    ) : /* @__PURE__ */ u(
      "div",
      {
        role: "columnheader",
        className: ge,
        style: pe,
        "aria-sort": lt,
        children: [
          /* @__PURE__ */ n("div", { className: xe, children: ye }),
          ve
        ]
      },
      r
    );
  }, he = (e, t) => {
    const r = typeof e.width == "number" ? e.width : A, s = e.pinned === "left";
    return /* @__PURE__ */ n(
      "div",
      {
        className: a(
          "shrink-0 sticky z-20",
          k,
          t === C && "ml-auto",
          t === J && Y && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          t === C && Z && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: r,
          left: s ? X[t] : void 0,
          right: s ? void 0 : G[t]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, Je = (p == null ? void 0 : p.showExpandAll) ?? !0, fe = () => {
    const e = [];
    return N && e.push(
      /* @__PURE__ */ n(
        "div",
        {
          role: "columnheader",
          className: a("shrink-0 sticky z-20 flex items-center justify-center min-h-9", k),
          style: { width: D, left: 0 },
          children: /* @__PURE__ */ n(
            mt,
            {
              checked: z.allSelected,
              indeterminate: z.someSelected,
              onCheckedChange: () => z.toggleAll(),
              "aria-label": "전체 선택"
            }
          )
        },
        "ctrl-header-select"
      )
    ), p && e.push(
      /* @__PURE__ */ n(
        "div",
        {
          role: "columnheader",
          className: a("shrink-0 sticky z-20 flex items-center justify-center min-h-9", k),
          style: {
            width: O,
            left: N ? D : 0
          },
          children: Je && /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: S.toggleAll,
              className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
              "aria-label": S.allExpanded ? "모두 접기" : "모두 펼치기",
              children: S.allExpanded ? /* @__PURE__ */ n(xt, { size: 24 }) : /* @__PURE__ */ n(yt, { size: 24 })
            }
          )
        },
        "ctrl-header-expand"
      )
    ), e;
  }, ue = () => I ? /* @__PURE__ */ n(
    "div",
    {
      role: "columnheader",
      className: a(
        "shrink-0 sticky right-0 z-20 flex items-center justify-center min-h-9",
        C === -1 && "ml-auto",
        k
      ),
      style: { width: H },
      "aria-label": "행 삭제",
      children: /* @__PURE__ */ n("span", { className: "sr-only", children: "행 삭제" })
    },
    "ctrl-header-delete"
  ) : null, Qe = () => I ? /* @__PURE__ */ n(
    "div",
    {
      className: a(
        "shrink-0 sticky right-0 z-20 min-h-9",
        C === -1 && "ml-auto",
        k
      ),
      style: { width: H }
    },
    "ctrl-ph-delete"
  ) : null, Ae = () => {
    const e = [];
    return N && e.push(
      /* @__PURE__ */ n(
        "div",
        {
          className: a("shrink-0 sticky z-20 min-h-9", k),
          style: { width: D, left: 0 }
        },
        "ctrl-ph-select"
      )
    ), p && e.push(
      /* @__PURE__ */ n(
        "div",
        {
          className: a("shrink-0 sticky z-20 min-h-9", k),
          style: {
            width: O,
            left: N ? D : 0
          }
        },
        "ctrl-ph-expand"
      )
    ), e;
  }, M = d.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "left"), q = d.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "right"), J = M.length ? M[M.length - 1].i : -1, C = q.length ? q[0].i : -1, me = /* @__PURE__ */ n(
    "div",
    {
      role: "grid",
      "aria-rowcount": i.length + qe,
      "aria-colcount": d.length,
      className: a(
        // flex-1 컬럼 있으면 컨테이너 폭 채워서 그 컬럼이 자라게. 없으면 콘텐츠 폭 (빈 공간 없음).
        se ? "w-full" : "w-fit max-w-full",
        "overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        ze
      ),
      children: /* @__PURE__ */ n(
        "div",
        {
          ref: de,
          className: "overflow-auto",
          style: { maxHeight: typeof F == "number" ? `${F}px` : F },
          children: /* @__PURE__ */ u("div", { style: { minWidth: re }, children: [
            /* @__PURE__ */ u(
              "div",
              {
                className: a(
                  "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
                  k
                ),
                children: [
                  ae && L && /* @__PURE__ */ u(
                    "div",
                    {
                      role: "row",
                      className: "flex border-b border-slate-200 dark:border-slate-700",
                      children: [
                        Ae(),
                        M.map(({ c: e, i: t }) => he(e, t)),
                        L.map((e, t) => {
                          if (e.kind === "group") {
                            let E = -1;
                            for (let y = L.length - 1; y >= 0; y--)
                              if (L[y].kind === "group") {
                                E = y;
                                break;
                              }
                            const R = t === E;
                            return /* @__PURE__ */ u(
                              "div",
                              {
                                role: "columnheader",
                                className: "relative flex min-h-9 shrink-0",
                                style: { width: e.width },
                                children: [
                                  /* @__PURE__ */ n(
                                    "div",
                                    {
                                      className: a(
                                        "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                                        Q[e.group.align ?? "center"]
                                      ),
                                      children: e.group.header
                                    }
                                  ),
                                  !R && /* @__PURE__ */ n(ke, {})
                                ]
                              },
                              e.key
                            );
                          }
                          const r = e.col, s = typeof r.width == "number" ? r.width : void 0, x = typeof r.minWidth == "number" ? r.minWidth : void 0;
                          return /* @__PURE__ */ n(
                            "div",
                            {
                              className: a(
                                "min-h-9",
                                s === void 0 ? "flex-1" : "shrink-0"
                              ),
                              style: { width: s, minWidth: x }
                            },
                            e.key
                          );
                        }),
                        q.map(({ c: e, i: t }) => he(e, t)),
                        Qe()
                      ]
                    }
                  ),
                  _ ? /* @__PURE__ */ n(
                    ft,
                    {
                      items: Oe,
                      strategy: ut,
                      children: /* @__PURE__ */ u("div", { role: "row", className: "flex", children: [
                        fe(),
                        d.map((e, t) => ce(e, t)),
                        C === -1 && !se && !I && /* @__PURE__ */ n("div", { "aria-hidden": !0, className: "flex-1 min-h-9" }),
                        ue()
                      ] })
                    }
                  ) : /* @__PURE__ */ u("div", { role: "row", className: "flex", children: [
                    fe(),
                    d.map((e, t) => ce(e, t)),
                    ue()
                  ] })
                ]
              }
            ),
            ee ? /* @__PURE__ */ n("div", { className: "flex items-center justify-center min-h-64 py-8", children: De ?? (Le === "skeleton" ? /* @__PURE__ */ n("div", { className: "w-full flex flex-col gap-2 px-3 py-2", children: Array.from({ length: _t }).map((e, t) => /* @__PURE__ */ n("div", { className: "flex gap-3", children: d.map((r) => /* @__PURE__ */ n(
              gt,
              {
                height: 20,
                width: typeof r.width == "number" ? r.width - 24 : 100
              },
              r.id ?? String(r.accessorKey)
            )) }, t)) }) : /* @__PURE__ */ n(pt, { size: "lg" })) }) : i.length === 0 ? /* @__PURE__ */ n("div", { className: "flex items-center justify-center min-h-32 py-8 text-sm text-slate-500 dark:text-slate-400", children: Ie }) : /* @__PURE__ */ n("div", { className: "relative", style: { height: Ue }, children: i.map((e, t) => {
              var r, s;
              return /* @__PURE__ */ n(
                kt,
                {
                  row: e,
                  rowIndex: t,
                  columns: d,
                  leftOffsets: X,
                  rightOffsets: G,
                  lastLeftPinnedIdx: J,
                  firstRightPinnedIdx: C,
                  showLeftShadow: Y,
                  showRightShadow: Z,
                  totalWidth: re,
                  translateY: oe[t],
                  isHovered: Xe === e.id,
                  onHover: Ge,
                  onHeightChange: $e,
                  selectable: N,
                  isSelected: z.isSelected(e.id),
                  onToggleSelect: z.toggleRow,
                  checkboxColWidth: D,
                  expandable: !!p,
                  isExpanded: S.isExpanded(e.id),
                  canExpand: S.canExpand(e),
                  onToggleExpand: S.toggleRow,
                  expandedContent: p && S.isExpanded(e.id) ? p.expandedRowRender(e) : null,
                  expandColWidth: O,
                  onRowClick: _e,
                  extraClassName: V == null ? void 0 : V(e),
                  editingColumnKey: ((r = v.editing) == null ? void 0 : r.rowId) === e.id ? v.editing.columnKey : null,
                  editingState: ((s = v.editing) == null ? void 0 : s.rowId) === e.id ? { editValue: v.editing.editValue, error: v.editing.error } : null,
                  onStartEdit: v.startEdit,
                  onChangeEditValue: v.changeEditValue,
                  onCompleteEdit: v.completeEdit,
                  onCancelEdit: v.cancelEdit,
                  showRowDelete: I,
                  onRowDelete: He,
                  rowActionsColWidth: H
                },
                e.id
              );
            }) }),
            Te && !ee && /* @__PURE__ */ u(
              "div",
              {
                role: "row",
                className: "flex bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700",
                children: [
                  /* @__PURE__ */ n("div", { role: "gridcell", "aria-hidden": !0, className: "flex-1" }),
                  /* @__PURE__ */ n(
                    "div",
                    {
                      role: "gridcell",
                      className: a(
                        "shrink-0 sticky right-0 z-10 flex items-center justify-center bg-white dark:bg-slate-900",
                        "min-h-9"
                      ),
                      style: { width: H },
                      children: /* @__PURE__ */ n(
                        "button",
                        {
                          type: "button",
                          onClick: () => $ == null ? void 0 : $(),
                          className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                          "aria-label": "행 추가",
                          children: /* @__PURE__ */ n(vt, { size: 20 })
                        }
                      )
                    }
                  )
                ]
              }
            )
          ] })
        }
      )
    }
  );
  return _ ? /* @__PURE__ */ n(ht, { sensors: Be, onDragEnd: Ve, children: me }) : me;
}
export {
  qt as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
