import { jsx as r, jsxs as u } from "react/jsx-runtime";
import * as o from "react";
import { useSensors as Ye, useSensor as Ze, PointerSensor as qe, DndContext as Je } from "@dnd-kit/core";
import { SortableContext as Qe, horizontalListSortingStrategy as et } from "@dnd-kit/sortable";
import { cn as h } from "../../../lib/utils.mjs";
import { Checkbox as tt } from "../../ui/checkbox.mjs";
import { DownIcon as nt } from "../../../icons/DownIcon.mjs";
import { RightIcon as it } from "../../../icons/RightIcon.mjs";
import { DataTableV2ColumnSeparator as fe } from "./data-table-v2-column-separator.mjs";
import { DataTableV2Row as rt } from "./data-table-v2-row.mjs";
import { DataTableV2SortableHeaderCell as st } from "./data-table-v2-sortable-header-cell.mjs";
import { useCellEdit as ot } from "./hooks/use-cell-edit.mjs";
import { useColumnResize as dt } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as lt } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as ct } from "./hooks/use-row-expansion.mjs";
import { useRowSelection as at } from "./hooks/use-row-selection.mjs";
const ht = 40, X = 120, _ = 40, A = 40, U = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function ue({ direction: n, active: c }) {
  return /* @__PURE__ */ r(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: h(
        "transition-colors",
        c ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        n === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ r("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
}
function ft(n, c, f) {
  const m = n.find((a) => a.column === c);
  return f ? m ? m.direction === "asc" ? n.map(
    (a) => a.column === c ? { column: c, direction: "desc" } : a
  ) : n.filter((a) => a.column !== c) : [...n, { column: c, direction: "asc" }] : m ? m.direction === "asc" ? [{ column: c, direction: "desc" }] : [] : [{ column: c, direction: "asc" }];
}
function ut(n, c = 0) {
  const f = new Array(n.length).fill(-1), m = new Array(n.length).fill(-1);
  let a = c;
  for (let l = 0; l < n.length; l++)
    n[l].pinned === "left" && (f[l] = a, a += H(n[l]));
  let v = 0;
  for (let l = n.length - 1; l >= 0; l--)
    n[l].pinned === "right" && (m[l] = v, v += H(n[l]));
  return { left: f, right: m };
}
function H(n) {
  return typeof n.width == "number" ? n.width : typeof n.minWidth == "number" ? n.minWidth : X;
}
function mt(n) {
  return n.reduce((c, f) => c + H(f), 0);
}
function Wt({
  data: n,
  columns: c,
  headerGroups: f,
  sortState: m,
  onSortChange: a,
  multiSort: v = !1,
  resizable: l = !1,
  columnWidths: me,
  onColumnResize: ge,
  columnReorderable: E = !1,
  columnOrder: pe,
  onColumnReorder: xe,
  selectable: w = !1,
  selectedIds: ye,
  defaultSelectedIds: ve,
  onSelectionChange: we,
  onRowClick: Ce,
  rowClassName: M,
  expandable: g,
  onCellChange: ke,
  maxHeight: P,
  estimateRowHeight: G = ht,
  className: be
}) {
  const { orderedColumns: T, handleColumnDragEnd: Y } = lt({
    columns: c,
    columnReorderable: E,
    columnOrder: pe,
    onColumnReorder: xe
  }), { getColumnWidth: Z, handleResizeStart: Se, resizingKey: Ee } = dt({
    resizable: l,
    columnWidths: me,
    onColumnResize: ge
  }), d = o.useMemo(() => l ? T.map((e) => {
    const t = Z(e);
    return t !== void 0 ? { ...e, width: t } : e;
  }) : T, [T, l, Z]), D = (w ? _ : 0) + (g ? A : 0), { left: B, right: j } = o.useMemo(
    () => ut(d, D),
    [d, D]
  ), q = o.useMemo(
    () => mt(d) + D,
    [d, D]
  ), W = at({
    data: n,
    selectable: w,
    selectedIds: ye,
    defaultSelectedIds: ve,
    onSelectionChange: we
  }), C = ct({ data: n, expandable: g }), y = ot({ onCellChange: ke }), N = o.useMemo(
    () => m ?? [],
    [m]
  ), Ne = o.useCallback(
    (e) => {
      const t = N.findIndex((s) => s.column === e);
      return t < 0 ? { direction: null, priority: void 0 } : {
        direction: N[t].direction,
        priority: v && N.length > 1 ? t + 1 : void 0
      };
    },
    [N, v]
  ), Re = o.useCallback(
    (e) => {
      a && a(ft(N, e, v));
    },
    [N, v, a]
  ), J = o.useMemo(
    () => d.some((e) => typeof e.width != "number"),
    [d]
  ), Le = o.useMemo(
    () => E ? d.filter((e) => !e.pinned && !e.sortable).map((e) => String(e.accessorKey)) : [],
    [d, E]
  ), _e = Ye(
    Ze(qe, { activationConstraint: { distance: 5 } })
  ), We = o.useCallback(
    (e) => Y(e),
    [Y]
  ), [Q, Ie] = o.useState(/* @__PURE__ */ new Map()), De = o.useCallback((e, t) => {
    Ie((i) => {
      if (i.get(e) === t) return i;
      const s = new Map(i);
      return s.set(e, t), s;
    });
  }, []), ee = o.useMemo(() => {
    const e = new Array(n.length + 1);
    e[0] = 0;
    for (let t = 0; t < n.length; t++) {
      const i = Q.get(n[t].id) ?? G;
      e[t + 1] = e[t] + i;
    }
    return e;
  }, [n, Q, G]), ze = ee[n.length], [Ke, Ae] = o.useState(null), te = o.useRef(null), [O, He] = o.useState(!1), [V, Me] = o.useState(!1);
  o.useEffect(() => {
    const e = te.current;
    if (!e) return;
    const t = () => {
      He(e.scrollLeft > 0), Me(e.scrollLeft + e.clientWidth < e.scrollWidth - 1);
    };
    t(), e.addEventListener("scroll", t, { passive: !0 });
    const i = new ResizeObserver(t);
    return i.observe(e), () => {
      e.removeEventListener("scroll", t), i.disconnect();
    };
  }, []);
  const z = o.useMemo(
    () => d.filter((e) => !e.pinned),
    [d]
  ), R = o.useMemo(() => {
    if (!f || f.length === 0) return null;
    const e = [];
    let t = 0;
    for (; t < z.length; ) {
      const i = z[t], s = f.find((p) => p.columns[0] === i.accessorKey);
      if (s) {
        const p = s.columns.reduce((b, S) => {
          const x = z.find((I) => I.accessorKey === S);
          return b + (x ? H(x) : X);
        }, 0);
        e.push({
          kind: "group",
          key: `group-${String(i.accessorKey)}`,
          width: p,
          group: s
        }), t += s.columns.length;
      } else
        e.push({
          kind: "placeholder",
          key: `middle-empty-${String(i.accessorKey)}`,
          col: i
        }), t += 1;
    }
    return e;
  }, [z, f]), ne = R !== null && R.length > 0, Pe = ne ? 2 : 1, k = "bg-slate-100 dark:bg-slate-800", ie = (e, t) => {
    const i = e.id ?? String(e.accessorKey), s = Ne(e.accessorKey), p = typeof e.width == "number" ? e.width : void 0, b = typeof e.minWidth == "number" ? e.minWidth : void 0, S = e.pinned === "left", x = e.pinned === "right", I = S || x, je = t === $ && O, Oe = t === L && V, Ve = t === L, Fe = E && !I && !e.sortable, $e = Ee === e.accessorKey, Ue = t === d.length - 1, de = h(
      "relative flex min-h-9",
      p !== void 0 && "shrink-0",
      I && "sticky z-20",
      I && k,
      je && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      Oe && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      e.sortable && "select-none",
      Ve && "ml-auto"
    ), le = {
      width: p,
      minWidth: b,
      flex: p === void 0 ? "1 1 0" : void 0,
      left: S ? B[t] : void 0,
      right: x ? j[t] : void 0
    }, ce = h(
      "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
      U[e.align ?? "left"]
    ), ae = e.sortable ? /* @__PURE__ */ u(
      "button",
      {
        type: "button",
        className: h(
          "flex w-full items-center gap-1 cursor-pointer",
          // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
          e.align === "right" ? "flex-row-reverse justify-start" : U[e.align ?? "left"]
        ),
        onClick: () => Re(e.accessorKey),
        children: [
          e.header,
          /* @__PURE__ */ u("span", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ u("span", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ r(ue, { direction: "up", active: s.direction === "asc" }),
              /* @__PURE__ */ r(ue, { direction: "down", active: s.direction === "desc" })
            ] }),
            s.priority !== void 0 && /* @__PURE__ */ r("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: s.priority })
          ] })
        ]
      }
    ) : e.header, he = !Ue && /* @__PURE__ */ r(
      fe,
      {
        resizable: l,
        isResizing: $e,
        onResizeStart: (Ge) => Se(Ge, e)
      }
    ), Xe = e.sortable ? s.direction === "asc" ? "ascending" : s.direction === "desc" ? "descending" : "none" : void 0;
    return Fe ? /* @__PURE__ */ u(
      st,
      {
        id: String(e.accessorKey),
        className: de,
        style: le,
        children: [
          /* @__PURE__ */ r("div", { className: ce, children: ae }),
          he
        ]
      },
      i
    ) : /* @__PURE__ */ u(
      "div",
      {
        role: "columnheader",
        className: de,
        style: le,
        "aria-sort": Xe,
        children: [
          /* @__PURE__ */ r("div", { className: ce, children: ae }),
          he
        ]
      },
      i
    );
  }, re = (e, t) => {
    const i = typeof e.width == "number" ? e.width : X, s = e.pinned === "left";
    return /* @__PURE__ */ r(
      "div",
      {
        className: h(
          "shrink-0 sticky z-20",
          k,
          t === L && "ml-auto",
          t === $ && O && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          t === L && V && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: i,
          left: s ? B[t] : void 0,
          right: s ? void 0 : j[t]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, Te = (g == null ? void 0 : g.showExpandAll) ?? !0, se = () => {
    const e = [];
    return w && e.push(
      /* @__PURE__ */ r(
        "div",
        {
          role: "columnheader",
          className: h("shrink-0 sticky z-20 flex items-center justify-center min-h-9", k),
          style: { width: _, left: 0 },
          children: /* @__PURE__ */ r(
            tt,
            {
              checked: W.allSelected,
              indeterminate: W.someSelected,
              onCheckedChange: () => W.toggleAll(),
              "aria-label": "전체 선택"
            }
          )
        },
        "ctrl-header-select"
      )
    ), g && e.push(
      /* @__PURE__ */ r(
        "div",
        {
          role: "columnheader",
          className: h("shrink-0 sticky z-20 flex items-center justify-center min-h-9", k),
          style: {
            width: A,
            left: w ? _ : 0
          },
          children: Te && /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              onClick: C.toggleAll,
              className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
              "aria-label": C.allExpanded ? "모두 접기" : "모두 펼치기",
              children: C.allExpanded ? /* @__PURE__ */ r(nt, { size: 24 }) : /* @__PURE__ */ r(it, { size: 24 })
            }
          )
        },
        "ctrl-header-expand"
      )
    ), e;
  }, Be = () => {
    const e = [];
    return w && e.push(
      /* @__PURE__ */ r(
        "div",
        {
          className: h("shrink-0 sticky z-20 min-h-9", k),
          style: { width: _, left: 0 }
        },
        "ctrl-ph-select"
      )
    ), g && e.push(
      /* @__PURE__ */ r(
        "div",
        {
          className: h("shrink-0 sticky z-20 min-h-9", k),
          style: {
            width: A,
            left: w ? _ : 0
          }
        },
        "ctrl-ph-expand"
      )
    ), e;
  }, K = d.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "left"), F = d.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "right"), $ = K.length ? K[K.length - 1].i : -1, L = F.length ? F[0].i : -1, oe = /* @__PURE__ */ r(
    "div",
    {
      role: "grid",
      "aria-rowcount": n.length + Pe,
      "aria-colcount": d.length,
      className: h(
        // flex-1 컬럼 있으면 컨테이너 폭 채워서 그 컬럼이 자라게. 없으면 콘텐츠 폭 (빈 공간 없음).
        J ? "w-full" : "w-fit max-w-full",
        "overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        be
      ),
      children: /* @__PURE__ */ r(
        "div",
        {
          ref: te,
          className: "overflow-auto",
          style: { maxHeight: typeof P == "number" ? `${P}px` : P },
          children: /* @__PURE__ */ u("div", { style: { minWidth: q }, children: [
            /* @__PURE__ */ u(
              "div",
              {
                className: h(
                  "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
                  k
                ),
                children: [
                  ne && R && /* @__PURE__ */ u(
                    "div",
                    {
                      role: "row",
                      className: "flex border-b border-slate-200 dark:border-slate-700",
                      children: [
                        Be(),
                        K.map(({ c: e, i: t }) => re(e, t)),
                        R.map((e, t) => {
                          if (e.kind === "group") {
                            let b = -1;
                            for (let x = R.length - 1; x >= 0; x--)
                              if (R[x].kind === "group") {
                                b = x;
                                break;
                              }
                            const S = t === b;
                            return /* @__PURE__ */ u(
                              "div",
                              {
                                role: "columnheader",
                                className: "relative flex min-h-9 shrink-0",
                                style: { width: e.width },
                                children: [
                                  /* @__PURE__ */ r(
                                    "div",
                                    {
                                      className: h(
                                        "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                                        U[e.group.align ?? "center"]
                                      ),
                                      children: e.group.header
                                    }
                                  ),
                                  !S && /* @__PURE__ */ r(fe, {})
                                ]
                              },
                              e.key
                            );
                          }
                          const i = e.col, s = typeof i.width == "number" ? i.width : void 0, p = typeof i.minWidth == "number" ? i.minWidth : void 0;
                          return /* @__PURE__ */ r(
                            "div",
                            {
                              className: h(
                                "min-h-9",
                                s === void 0 ? "flex-1" : "shrink-0"
                              ),
                              style: { width: s, minWidth: p }
                            },
                            e.key
                          );
                        }),
                        F.map(({ c: e, i: t }) => re(e, t))
                      ]
                    }
                  ),
                  E ? /* @__PURE__ */ r(
                    Qe,
                    {
                      items: Le,
                      strategy: et,
                      children: /* @__PURE__ */ u("div", { role: "row", className: "flex", children: [
                        se(),
                        d.map((e, t) => ie(e, t)),
                        L === -1 && !J && /* @__PURE__ */ r("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
                      ] })
                    }
                  ) : /* @__PURE__ */ u("div", { role: "row", className: "flex", children: [
                    se(),
                    d.map((e, t) => ie(e, t))
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ r("div", { className: "relative", style: { height: ze }, children: n.map((e, t) => {
              var i, s;
              return /* @__PURE__ */ r(
                rt,
                {
                  row: e,
                  rowIndex: t,
                  columns: d,
                  leftOffsets: B,
                  rightOffsets: j,
                  lastLeftPinnedIdx: $,
                  firstRightPinnedIdx: L,
                  showLeftShadow: O,
                  showRightShadow: V,
                  totalWidth: q,
                  translateY: ee[t],
                  isHovered: Ke === e.id,
                  onHover: Ae,
                  onHeightChange: De,
                  selectable: w,
                  isSelected: W.isSelected(e.id),
                  onToggleSelect: W.toggleRow,
                  checkboxColWidth: _,
                  expandable: !!g,
                  isExpanded: C.isExpanded(e.id),
                  canExpand: C.canExpand(e),
                  onToggleExpand: C.toggleRow,
                  expandedContent: g && C.isExpanded(e.id) ? g.expandedRowRender(e) : null,
                  expandColWidth: A,
                  onRowClick: Ce,
                  extraClassName: M == null ? void 0 : M(e),
                  editingColumnKey: ((i = y.editing) == null ? void 0 : i.rowId) === e.id ? y.editing.columnKey : null,
                  editingState: ((s = y.editing) == null ? void 0 : s.rowId) === e.id ? { editValue: y.editing.editValue, error: y.editing.error } : null,
                  onStartEdit: y.startEdit,
                  onChangeEditValue: y.changeEditValue,
                  onCompleteEdit: y.completeEdit,
                  onCancelEdit: y.cancelEdit
                },
                e.id
              );
            }) })
          ] })
        }
      )
    }
  );
  return E ? /* @__PURE__ */ r(Je, { sensors: _e, onDragEnd: We, children: oe }) : oe;
}
export {
  Wt as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
