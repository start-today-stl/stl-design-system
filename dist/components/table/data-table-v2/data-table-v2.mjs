import { jsx as i, jsxs as m } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as xt, useSensor as vt, PointerSensor as kt, DndContext as wt, closestCenter as Ct } from "@dnd-kit/core";
import { SortableContext as We, horizontalListSortingStrategy as Nt, verticalListSortingStrategy as bt } from "@dnd-kit/sortable";
import { cn as d } from "../../../lib/utils.mjs";
import { Checkbox as St } from "../../ui/checkbox.mjs";
import { Skeleton as ie } from "../../ui/skeleton.mjs";
import { SplashScreen as Et } from "../../ui/splash-screen.mjs";
import { DownIcon as Wt } from "../../../icons/DownIcon.mjs";
import { RightIcon as _t } from "../../../icons/RightIcon.mjs";
import { RowAddIcon as Dt } from "../../../icons/RowAddIcon.mjs";
import { useRowReorder as Rt } from "./hooks/use-row-reorder.mjs";
import { DataTableV2ColumnSeparator as _e } from "./data-table-v2-column-separator.mjs";
import { DataTableV2Row as Lt } from "./data-table-v2-row.mjs";
import { DataTableV2SortableHeaderCell as zt } from "./data-table-v2-sortable-header-cell.mjs";
import { useCellEdit as It } from "./hooks/use-cell-edit.mjs";
import { useColumnResize as Ht } from "./hooks/use-column-resize.mjs";
import { useColumnReorder as Tt } from "./hooks/use-column-reorder.mjs";
import { useRowExpansion as jt } from "./hooks/use-row-expansion.mjs";
import { useRowSelection as Kt } from "./hooks/use-row-selection.mjs";
const Mt = 40, se = 120, N = 40, T = 40, j = 40, K = 32, Ot = 5, ne = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function De({ direction: n, active: c }) {
  return /* @__PURE__ */ i(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: d(
        "transition-colors",
        c ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        n === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ i("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
}
function Pt(n, c, y) {
  const x = n.find((h) => h.column === c);
  return y ? x ? x.direction === "asc" ? n.map(
    (h) => h.column === c ? { column: c, direction: "desc" } : h
  ) : n.filter((h) => h.column !== c) : [...n, { column: c, direction: "asc" }] : x ? x.direction === "asc" ? [{ column: c, direction: "desc" }] : [] : [{ column: c, direction: "asc" }];
}
function Bt(n, c = 0, y = 0) {
  const x = new Array(n.length).fill(-1), h = new Array(n.length).fill(-1);
  let b = c;
  for (let f = 0; f < n.length; f++)
    n[f].pinned === "left" && (x[f] = b, b += U(n[f]));
  let S = y;
  for (let f = n.length - 1; f >= 0; f--)
    n[f].pinned === "right" && (h[f] = S, S += U(n[f]));
  return { left: x, right: h };
}
function U(n) {
  return typeof n.width == "number" ? n.width : typeof n.minWidth == "number" ? n.minWidth : se;
}
function Vt(n) {
  return n.reduce((c, y) => c + U(y), 0);
}
function oi({
  data: n,
  columns: c,
  headerGroups: y,
  sortState: x,
  onSortChange: h,
  multiSort: b = !1,
  resizable: S = !1,
  columnWidths: f,
  onColumnResize: Re,
  columnReorderable: R = !1,
  columnOrder: Le,
  onColumnReorder: ze,
  selectable: v = !1,
  selectedIds: Ie,
  defaultSelectedIds: He,
  onSelectionChange: Te,
  onRowClick: je,
  rowClassName: G,
  expandable: u,
  onCellChange: Ke,
  rowActions: o,
  loading: re = !1,
  loadingMode: Me = "splash",
  loadingContent: le,
  emptyMessage: Oe = "데이터가 없습니다.",
  rowReorderable: w = !1,
  onRowReorder: Pe,
  maxHeight: X,
  estimateRowHeight: de = Mt,
  className: Be
}) {
  const M = (o == null ? void 0 : o.showDelete) ?? !!(o != null && o.onRowDelete), Ve = (o == null ? void 0 : o.showAdd) ?? !!(o != null && o.onRowAdd), Fe = o == null ? void 0 : o.onRowDelete, Y = o == null ? void 0 : o.onRowAdd, { orderedColumns: Z, handleColumnDragEnd: oe } = Tt({
    columns: c,
    columnReorderable: R,
    columnOrder: Le,
    onColumnReorder: ze
  }), { getColumnWidth: ae, handleResizeStart: $e, resizingKey: Ue } = Ht({
    resizable: S,
    columnWidths: f,
    onColumnResize: Re
  }), a = l.useMemo(() => S ? Z.map((e) => {
    const t = ae(e);
    return t !== void 0 ? { ...e, width: t } : e;
  }) : Z, [Z, S, ae]), E = w ? K : 0, O = E + (v ? N : 0) + (u ? T : 0), V = O + (M ? j : 0), { left: q, right: J } = l.useMemo(
    () => Bt(a, V),
    [a, V]
  ), ce = l.useMemo(
    () => Vt(a) + V,
    [a, V]
  ), P = Kt({
    data: n,
    selectable: v,
    selectedIds: Ie,
    defaultSelectedIds: He,
    onSelectionChange: Te
  }), W = jt({ data: n, expandable: u }), C = It({ onCellChange: Ke }), { handleRowDragEnd: he } = Rt({ data: n, onRowReorder: Pe }), L = l.useMemo(
    () => x ?? [],
    [x]
  ), Ge = l.useCallback(
    (e) => {
      const t = L.findIndex((r) => r.column === e);
      return t < 0 ? { direction: null, priority: void 0 } : {
        direction: L[t].direction,
        priority: b && L.length > 1 ? t + 1 : void 0
      };
    },
    [L, b]
  ), Xe = l.useCallback(
    (e) => {
      h && h(Pt(L, e, b));
    },
    [L, b, h]
  ), fe = l.useMemo(
    () => a.some((e) => typeof e.width != "number"),
    [a]
  ), Ye = l.useMemo(
    () => R ? a.filter((e) => !e.pinned && !e.sortable).map((e) => String(e.accessorKey)) : [],
    [a, R]
  ), Ze = xt(
    vt(kt, { activationConstraint: { distance: 5 } })
  ), qe = l.useCallback(
    (e) => {
      String(e.active.id).startsWith("row-") ? he(e) : oe(e);
    },
    [oe, he]
  ), Je = l.useMemo(
    () => w ? n.map((e) => `row-${e.id}`) : [],
    [n, w]
  ), [me, Qe] = l.useState(/* @__PURE__ */ new Map()), Ae = l.useCallback((e, t) => {
    Qe((s) => {
      if (s.get(e) === t) return s;
      const r = new Map(s);
      return r.set(e, t), r;
    });
  }, []), ue = l.useMemo(() => {
    const e = new Array(n.length + 1);
    e[0] = 0;
    for (let t = 0; t < n.length; t++) {
      const s = me.get(n[t].id) ?? de;
      e[t + 1] = e[t] + s;
    }
    return e;
  }, [n, me, de]), et = ue[n.length], [tt, it] = l.useState(null), ge = l.useRef(null), [Q, nt] = l.useState(!1), [A, st] = l.useState(!1), [z, rt] = l.useState(0);
  l.useEffect(() => {
    const e = ge.current;
    if (!e) return;
    const t = () => {
      nt(e.scrollLeft > 0), st(e.scrollLeft + e.clientWidth < e.scrollWidth - 1), rt(e.clientWidth);
    };
    t(), e.addEventListener("scroll", t, { passive: !0 });
    const s = new ResizeObserver(t);
    return s.observe(e), () => {
      e.removeEventListener("scroll", t), s.disconnect();
    };
  }, []);
  const F = l.useMemo(
    () => a.filter((e) => !e.pinned),
    [a]
  ), I = l.useMemo(() => {
    if (!y || y.length === 0) return null;
    const e = [];
    let t = 0;
    for (; t < F.length; ) {
      const s = F[t], r = y.find((g) => g.columns[0] === s.accessorKey);
      if (r) {
        const g = r.columns.reduce((_, D) => {
          const k = F.find((B) => B.accessorKey === D);
          return _ + (k ? U(k) : se);
        }, 0);
        e.push({
          kind: "group",
          key: `group-${String(s.accessorKey)}`,
          width: g,
          group: r
        }), t += r.columns.length;
      } else
        e.push({
          kind: "placeholder",
          key: `middle-empty-${String(s.accessorKey)}`,
          col: s
        }), t += 1;
    }
    return e;
  }, [F, y]), pe = I !== null && I.length > 0, lt = pe ? 2 : 1, p = "bg-slate-100 dark:bg-slate-800", ye = (e, t) => {
    const s = e.id ?? String(e.accessorKey), r = Ge(e.accessorKey), g = typeof e.width == "number" ? e.width : void 0, _ = typeof e.minWidth == "number" ? e.minWidth : void 0, D = e.pinned === "left", k = e.pinned === "right", B = D || k, ct = t === te && Q, ht = t === H && A, ft = t === H, mt = R && !B && !e.sortable, ut = Ue === e.accessorKey, gt = t === a.length - 1, Ce = d(
      "relative flex min-h-9",
      g !== void 0 && "shrink-0",
      B && "sticky z-20",
      B && p,
      ct && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      ht && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      e.sortable && "select-none",
      ft && "ml-auto"
    ), Ne = {
      width: g,
      minWidth: _,
      flex: g === void 0 ? "1 1 0" : void 0,
      left: D ? q[t] : void 0,
      right: k ? J[t] : void 0
    }, be = d(
      "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
      ne[e.align ?? "left"]
    ), Se = e.sortable ? /* @__PURE__ */ m(
      "button",
      {
        type: "button",
        className: d(
          "flex w-full items-center gap-1 cursor-pointer",
          // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
          e.align === "right" ? "flex-row-reverse justify-start" : ne[e.align ?? "left"]
        ),
        onClick: () => Xe(e.accessorKey),
        children: [
          e.header,
          /* @__PURE__ */ m("span", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ m("span", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ i(De, { direction: "up", active: r.direction === "asc" }),
              /* @__PURE__ */ i(De, { direction: "down", active: r.direction === "desc" })
            ] }),
            r.priority !== void 0 && /* @__PURE__ */ i("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: r.priority })
          ] })
        ]
      }
    ) : e.header, Ee = !gt && /* @__PURE__ */ i(
      _e,
      {
        resizable: S,
        isResizing: ut,
        onResizeStart: (yt) => $e(yt, e)
      }
    ), pt = e.sortable ? r.direction === "asc" ? "ascending" : r.direction === "desc" ? "descending" : "none" : void 0;
    return mt ? /* @__PURE__ */ m(
      zt,
      {
        id: String(e.accessorKey),
        className: Ce,
        style: Ne,
        children: [
          /* @__PURE__ */ i("div", { className: be, children: Se }),
          Ee
        ]
      },
      s
    ) : /* @__PURE__ */ m(
      "div",
      {
        role: "columnheader",
        className: Ce,
        style: Ne,
        "aria-sort": pt,
        children: [
          /* @__PURE__ */ i("div", { className: be, children: Se }),
          Ee
        ]
      },
      s
    );
  }, xe = (e, t) => {
    const s = typeof e.width == "number" ? e.width : se, r = e.pinned === "left";
    return /* @__PURE__ */ i(
      "div",
      {
        className: d(
          "shrink-0 sticky z-20",
          p,
          t === H && "ml-auto",
          t === te && Q && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          t === H && A && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: s,
          left: r ? q[t] : void 0,
          right: r ? void 0 : J[t]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, dt = (u == null ? void 0 : u.showExpandAll) ?? !0, ve = () => {
    const e = [];
    return w && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          role: "columnheader",
          className: d("shrink-0 sticky z-20 min-h-9", p),
          style: { width: K, left: 0 },
          "aria-label": "행 순서 변경",
          children: /* @__PURE__ */ i("span", { className: "sr-only", children: "행 순서 변경" })
        },
        "ctrl-header-drag-handle"
      )
    ), v && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          role: "columnheader",
          className: d("shrink-0 sticky z-20 flex items-center justify-center min-h-9", p),
          style: {
            width: N,
            left: E
          },
          children: /* @__PURE__ */ i(
            St,
            {
              checked: P.allSelected,
              indeterminate: P.someSelected,
              onCheckedChange: () => P.toggleAll(),
              "aria-label": "전체 선택"
            }
          )
        },
        "ctrl-header-select"
      )
    ), u && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          role: "columnheader",
          className: d("shrink-0 sticky z-20 flex items-center justify-center min-h-9", p),
          style: {
            width: T,
            left: E + (v ? N : 0)
          },
          children: dt && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: W.toggleAll,
              className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
              "aria-label": W.allExpanded ? "모두 접기" : "모두 펼치기",
              children: W.allExpanded ? /* @__PURE__ */ i(Wt, { size: 24 }) : /* @__PURE__ */ i(_t, { size: 24 })
            }
          )
        },
        "ctrl-header-expand"
      )
    ), e;
  }, ke = () => M ? /* @__PURE__ */ i(
    "div",
    {
      role: "columnheader",
      className: d(
        "shrink-0 sticky z-20 flex items-center justify-center min-h-9",
        p
      ),
      style: { width: j, left: O },
      "aria-label": "행 삭제",
      children: /* @__PURE__ */ i("span", { className: "sr-only", children: "행 삭제" })
    },
    "ctrl-header-delete"
  ) : null, ot = () => M ? /* @__PURE__ */ i(
    "div",
    {
      className: d("shrink-0 sticky z-20 min-h-9", p),
      style: { width: j, left: O }
    },
    "ctrl-ph-delete"
  ) : null, at = () => {
    const e = [];
    return w && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: d("shrink-0 sticky z-20 min-h-9", p),
          style: { width: K, left: 0 }
        },
        "ctrl-ph-drag-handle"
      )
    ), v && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: d("shrink-0 sticky z-20 min-h-9", p),
          style: { width: N, left: E }
        },
        "ctrl-ph-select"
      )
    ), u && e.push(
      /* @__PURE__ */ i(
        "div",
        {
          className: d("shrink-0 sticky z-20 min-h-9", p),
          style: {
            width: T,
            left: E + (v ? N : 0)
          }
        },
        "ctrl-ph-expand"
      )
    ), e;
  }, $ = a.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "left"), ee = a.map((e, t) => ({ c: e, i: t })).filter(({ c: e }) => e.pinned === "right"), te = $.length ? $[$.length - 1].i : -1, H = ee.length ? ee[0].i : -1, we = /* @__PURE__ */ i(
    "div",
    {
      role: "grid",
      "aria-rowcount": n.length + lt,
      "aria-colcount": a.length,
      className: d(
        // flex-1 컬럼 있으면 컨테이너 폭 채워서 그 컬럼이 자라게. 없으면 콘텐츠 폭 (빈 공간 없음).
        fe ? "w-full" : "w-fit max-w-full",
        "overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        Be
      ),
      children: /* @__PURE__ */ i(
        "div",
        {
          ref: ge,
          className: "overflow-auto",
          style: { maxHeight: typeof X == "number" ? `${X}px` : X },
          children: /* @__PURE__ */ m("div", { style: { minWidth: ce }, children: [
            /* @__PURE__ */ m(
              "div",
              {
                className: d(
                  "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
                  p
                ),
                children: [
                  pe && I && /* @__PURE__ */ m(
                    "div",
                    {
                      role: "row",
                      className: "flex border-b border-slate-200 dark:border-slate-700",
                      children: [
                        at(),
                        ot(),
                        $.map(({ c: e, i: t }) => xe(e, t)),
                        I.map((e, t) => {
                          if (e.kind === "group") {
                            let _ = -1;
                            for (let k = I.length - 1; k >= 0; k--)
                              if (I[k].kind === "group") {
                                _ = k;
                                break;
                              }
                            const D = t === _;
                            return /* @__PURE__ */ m(
                              "div",
                              {
                                role: "columnheader",
                                className: "relative flex min-h-9 shrink-0",
                                style: { width: e.width },
                                children: [
                                  /* @__PURE__ */ i(
                                    "div",
                                    {
                                      className: d(
                                        "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                                        ne[e.group.align ?? "center"]
                                      ),
                                      children: e.group.header
                                    }
                                  ),
                                  !D && /* @__PURE__ */ i(_e, {})
                                ]
                              },
                              e.key
                            );
                          }
                          const s = e.col, r = typeof s.width == "number" ? s.width : void 0, g = typeof s.minWidth == "number" ? s.minWidth : void 0;
                          return /* @__PURE__ */ i(
                            "div",
                            {
                              className: d(
                                "min-h-9",
                                r === void 0 ? "flex-1" : "shrink-0"
                              ),
                              style: { width: r, minWidth: g }
                            },
                            e.key
                          );
                        }),
                        ee.map(({ c: e, i: t }) => xe(e, t))
                      ]
                    }
                  ),
                  R ? /* @__PURE__ */ i(
                    We,
                    {
                      items: Ye,
                      strategy: Nt,
                      children: /* @__PURE__ */ m("div", { role: "row", className: "flex", children: [
                        ve(),
                        ke(),
                        a.map((e, t) => ye(e, t)),
                        H === -1 && !fe && /* @__PURE__ */ i("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
                      ] })
                    }
                  ) : /* @__PURE__ */ m("div", { role: "row", className: "flex", children: [
                    ve(),
                    ke(),
                    a.map((e, t) => ye(e, t))
                  ] })
                ]
              }
            ),
            re ? le ? (
              // 커스텀 로딩 — 가로 스크롤 시 가시 영역 중앙에 표시
              /* @__PURE__ */ i(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: z ? { width: z } : void 0,
                  children: le
                }
              )
            ) : Me === "skeleton" ? (
              // 스켈레톤 — 각 컬럼 폭에 맞춰 셀 구조로 렌더
              /* @__PURE__ */ i("div", { children: Array.from({ length: Ot }).map((e, t) => /* @__PURE__ */ m(
                "div",
                {
                  role: "row",
                  className: "flex border-b border-slate-200 dark:border-slate-700 min-h-9",
                  children: [
                    w && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: K }
                      }
                    ),
                    v && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: N },
                        children: /* @__PURE__ */ i(ie, { width: 16, height: 16 })
                      }
                    ),
                    u && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0 flex items-center justify-center",
                        style: { width: T },
                        children: /* @__PURE__ */ i(ie, { width: 16, height: 16 })
                      }
                    ),
                    M && /* @__PURE__ */ i(
                      "div",
                      {
                        role: "gridcell",
                        className: "shrink-0",
                        style: { width: j }
                      }
                    ),
                    a.map((s) => {
                      const r = typeof s.width == "number" ? s.width : void 0, g = typeof s.minWidth == "number" ? s.minWidth : void 0;
                      return /* @__PURE__ */ i(
                        "div",
                        {
                          role: "gridcell",
                          className: d(
                            "flex items-center px-3 py-1.5",
                            r === void 0 ? "flex-1" : "shrink-0"
                          ),
                          style: { width: r, minWidth: g },
                          children: /* @__PURE__ */ i(ie, { height: 16, width: "70%" })
                        },
                        s.id ?? String(s.accessorKey)
                      );
                    })
                  ]
                },
                t
              )) })
            ) : (
              // 기본 splash — 가로 스크롤 시 가시 영역 중앙에 표시
              /* @__PURE__ */ i(
                "div",
                {
                  className: "sticky left-0 flex items-center justify-center min-h-64 py-8",
                  style: z ? { width: z } : void 0,
                  children: /* @__PURE__ */ i(Et, { size: "lg" })
                }
              )
            ) : n.length === 0 ? /* @__PURE__ */ i(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center min-h-32 py-8 text-sm text-slate-500 dark:text-slate-400",
                style: z ? { width: z } : void 0,
                children: Oe
              }
            ) : /* @__PURE__ */ i("div", { className: "relative", style: { height: et }, children: /* @__PURE__ */ i(
              We,
              {
                items: Je,
                strategy: bt,
                children: n.map((e, t) => {
                  var s, r;
                  return /* @__PURE__ */ i(
                    Lt,
                    {
                      row: e,
                      rowIndex: t,
                      columns: a,
                      leftOffsets: q,
                      rightOffsets: J,
                      lastLeftPinnedIdx: te,
                      firstRightPinnedIdx: H,
                      showLeftShadow: Q,
                      showRightShadow: A,
                      totalWidth: ce,
                      translateY: ue[t],
                      isHovered: tt === e.id,
                      onHover: it,
                      onHeightChange: Ae,
                      selectable: v,
                      isSelected: P.isSelected(e.id),
                      onToggleSelect: P.toggleRow,
                      checkboxColWidth: N,
                      expandable: !!u,
                      isExpanded: W.isExpanded(e.id),
                      canExpand: W.canExpand(e),
                      onToggleExpand: W.toggleRow,
                      expandedContent: u && W.isExpanded(e.id) ? u.expandedRowRender(e) : null,
                      expandColWidth: T,
                      onRowClick: je,
                      extraClassName: G == null ? void 0 : G(e),
                      editingColumnKey: ((s = C.editing) == null ? void 0 : s.rowId) === e.id ? C.editing.columnKey : null,
                      editingState: ((r = C.editing) == null ? void 0 : r.rowId) === e.id ? { editValue: C.editing.editValue, error: C.editing.error } : null,
                      onStartEdit: C.startEdit,
                      onChangeEditValue: C.changeEditValue,
                      onCompleteEdit: C.completeEdit,
                      onCancelEdit: C.cancelEdit,
                      showRowDelete: M,
                      onRowDelete: Fe,
                      rowActionsColWidth: j,
                      rowActionsColLeftOffset: O,
                      rowReorderable: w,
                      dragHandleColWidth: K
                    },
                    e.id
                  );
                })
              }
            ) }),
            Ve && !re && /* @__PURE__ */ m(
              "div",
              {
                role: "row",
                className: "flex bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                children: [
                  w && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: { width: K, left: 0 }
                    }
                  ),
                  v && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: N,
                        left: E
                      }
                    }
                  ),
                  u && /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: "shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900",
                      style: {
                        width: T,
                        left: E + (v ? N : 0)
                      }
                    }
                  ),
                  /* @__PURE__ */ i(
                    "div",
                    {
                      role: "gridcell",
                      className: d(
                        "shrink-0 sticky z-10 flex items-center justify-center bg-white dark:bg-slate-900 min-h-9"
                      ),
                      style: { width: j, left: O },
                      children: /* @__PURE__ */ i(
                        "button",
                        {
                          type: "button",
                          onClick: () => Y == null ? void 0 : Y(),
                          className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                          "aria-label": "행 추가",
                          children: /* @__PURE__ */ i(Dt, { size: 20 })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ i("div", { role: "gridcell", "aria-hidden": !0, className: "flex-1 min-h-9" })
                ]
              }
            )
          ] })
        }
      )
    }
  );
  return R || w ? /* @__PURE__ */ i(
    wt,
    {
      sensors: Ze,
      collisionDetection: Ct,
      onDragEnd: qe,
      children: we
    }
  ) : we;
}
export {
  oi as DataTableV2
};
//# sourceMappingURL=data-table-v2.mjs.map
