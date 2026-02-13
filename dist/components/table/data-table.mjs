import { jsxs as $, jsx as n } from "react/jsx-runtime";
import * as a from "react";
import { useSensors as Ft, useSensor as yt, DndContext as Vt, closestCenter as Gt, KeyboardSensor as qt, PointerSensor as Jt } from "../../node_modules/@dnd-kit/core/dist/core.esm.mjs";
import { arrayMove as Qt, SortableContext as Ut, horizontalListSortingStrategy as Yt, sortableKeyboardCoordinates as Zt, useSortable as te } from "../../node_modules/@dnd-kit/sortable/dist/sortable.esm.mjs";
import { CSS as ee } from "../../node_modules/@dnd-kit/utilities/dist/utilities.esm.mjs";
import { cn as b } from "../../lib/utils.mjs";
import { Table as se, TableHeader as re, TableRow as F, TableHead as rt, TableBody as ie, TableCell as I, TableSortableHead as ne } from "./table.mjs";
import { Checkbox as xt } from "../ui/checkbox.mjs";
import { Input as ae } from "../ui/input.mjs";
import { DownIcon as oe } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as ce } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as de } from "../../icons/RightIcon.mjs";
function le({
  value: x,
  onChange: W,
  onComplete: k,
  onCancel: v,
  error: l
}) {
  const p = a.useRef(null);
  a.useEffect(() => {
    var h, K;
    (h = p.current) == null || h.focus(), (K = p.current) == null || K.select();
  }, []);
  const E = (h) => {
    h.key === "Enter" ? (h.preventDefault(), k()) : h.key === "Escape" && (h.preventDefault(), v());
  };
  return /* @__PURE__ */ $("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ n(
      ae,
      {
        ref: p,
        value: String(x ?? ""),
        onChange: (h) => W(h.target.value),
        onKeyDown: E,
        error: !!l,
        className: "w-full min-w-[60px] px-2 text-xs"
      }
    ),
    l && /* @__PURE__ */ n("span", { className: "text-[10px] text-destructive dark:text-red-400", children: l })
  ] });
}
function fe({
  id: x,
  children: W,
  className: k,
  style: v,
  disabled: l
}) {
  const {
    attributes: p,
    listeners: E,
    setNodeRef: h,
    transform: K,
    transition: o,
    isDragging: O
  } = te({ id: x, disabled: l }), V = {
    ...v,
    transform: ee.Transform.toString(K),
    transition: o,
    opacity: O ? 0.5 : 1,
    cursor: l ? void 0 : "grab"
  };
  return /* @__PURE__ */ n(
    "th",
    {
      ref: h,
      style: V,
      className: b(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300",
        "bg-[#eaedf1] dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        O && "z-50",
        k
      ),
      ...p,
      ...E,
      children: /* @__PURE__ */ $("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ n(
          ce,
          {
            size: 16,
            className: "opacity-30 group-hover/drag:opacity-70 transition-opacity flex-shrink-0"
          }
        ),
        W
      ] })
    }
  );
}
function we({
  columns: x,
  data: W,
  selectable: k = !1,
  selectedIds: v = [],
  onSelectionChange: l,
  sortState: p,
  onSortChange: E,
  onRowClick: h,
  onCellChange: K,
  expandable: o,
  emptyMessage: O = "데이터가 없습니다.",
  className: V,
  rowClassName: G,
  maxHeight: mt,
  resizable: S = !1,
  columnWidths: j,
  onColumnResize: q,
  columnReorderable: P = !1,
  columnOrder: bt,
  onColumnReorder: J
}) {
  const [f, z] = a.useState(null), [kt, H] = a.useState(null), R = a.useRef(null), it = a.useRef(null), [vt, Wt] = a.useState(
    (o == null ? void 0 : o.defaultExpandedRowIds) ?? []
  ), [Q, Et] = a.useState({}), [D, nt] = a.useState(null), at = a.useRef(0), ot = a.useRef(0), [wt, $t] = a.useState(
    () => x.map((t) => t.accessorKey)
  ), L = bt ?? wt, Kt = a.useMemo(() => P ? L.map((t) => x.find((e) => e.accessorKey === t)).filter((t) => t !== void 0) : x, [x, L, P]), Nt = Ft(
    yt(Jt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    yt(qt, {
      coordinateGetter: Zt
    })
  ), Dt = a.useCallback(
    (t) => {
      const { active: e, over: i } = t;
      if (!i || e.id === i.id) return;
      const d = L.findIndex((w) => String(w) === e.id), s = L.findIndex((w) => String(w) === i.id);
      if (d === -1 || s === -1) return;
      const g = Qt(L, d, s);
      J ? J(g) : $t(g);
    },
    [L, J]
  ), U = (o == null ? void 0 : o.expandedRowIds) ?? vt, ct = (o == null ? void 0 : o.onExpandedChange) ?? Wt, Y = W.length > 0 && v.length === W.length, It = v.length > 0 && !Y, St = () => {
    Y ? l == null || l([]) : l == null || l(W.map((t) => t.id));
  }, Pt = (t) => {
    v.includes(t) ? l == null || l(v.filter((e) => e !== t)) : l == null || l([...v, t]);
  }, zt = (t) => {
    E && ((p == null ? void 0 : p.column) === t ? p.direction === "asc" ? E({ column: t, direction: "desc" }) : p.direction === "desc" ? E({ column: null, direction: null }) : E({ column: t, direction: "asc" }) : E({ column: t, direction: "asc" }));
  }, Rt = (t) => (p == null ? void 0 : p.column) === t ? p.direction : null, T = (t) => {
    switch (t) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, Lt = (t, e, i) => {
    z({ rowId: t, columnKey: e }), H(i), R.current = i;
  }, Tt = (t, e) => {
    const i = R.current;
    if (!f || i === null) {
      z(null), H(null), R.current = null;
      return;
    }
    if (t.validate) {
      const d = t.validate(i, e);
      if (d !== !0) {
        z({ ...f, error: d });
        return;
      }
    }
    K && K(f.rowId, f.columnKey, i), z(null), H(null), R.current = null;
  }, Z = a.useCallback(() => {
    z(null), H(null), R.current = null;
  }, []);
  a.useEffect(() => {
    if (!f) return;
    const t = (e) => {
      var s, g;
      const i = e.target;
      (s = it.current) != null && s.contains(i) || (g = i.closest) != null && g.call(i, "[data-radix-popper-content-wrapper]") || Z();
    };
    return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
  }, [f, Z]);
  const Ct = (t, e) => (f == null ? void 0 : f.rowId) === t && (f == null ? void 0 : f.columnKey) === e, Ht = (t) => o ? o.rowExpandable ? o.rowExpandable(t) : !0 : !1, dt = (t) => U.includes(t), Mt = (t) => {
    dt(t) ? ct(U.filter((e) => e !== t)) : ct([...U, t]);
  }, lt = x.length + (k ? 1 : 0) + (o ? 1 : 0), u = 40, m = 40, ft = a.useMemo(() => {
    const t = (r) => {
      const y = r.width ?? r.minWidth;
      return typeof y == "number" ? y : parseInt(String(y) || "150", 10);
    }, e = x.filter((r) => r.sticky === "left"), i = x.filter((r) => r.sticky === "right"), g = (k ? u : 0) + (o ? m : 0), w = /* @__PURE__ */ new Map();
    let c = g;
    for (const r of e)
      w.set(r.accessorKey, c), c += t(r);
    const M = /* @__PURE__ */ new Map();
    let N = 0;
    for (let r = i.length - 1; r >= 0; r--) {
      const y = i[r];
      M.set(y.accessorKey, N), N += t(y);
    }
    const _ = e.length > 0 ? e[e.length - 1].accessorKey : null, B = i.length > 0 ? i[0].accessorKey : null;
    return (r, y, ut) => {
      if (!r.sticky) return { style: {}, className: "" };
      const jt = r.accessorKey === _, Xt = r.accessorKey === B, st = `${t(r)}px`, gt = {
        position: "sticky",
        zIndex: y ? 20 : 10,
        width: st,
        minWidth: st,
        maxWidth: st
      };
      if (r.sticky === "left") {
        const Bt = w.get(r.accessorKey) ?? 0;
        return {
          style: {
            ...gt,
            left: `${Bt}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: b(
            "transition-colors",
            y ? "bg-[#eaedf1] dark:bg-slate-800" : ut ? "bg-blue-50 dark:bg-blue-950/30" : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
            jt && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          )
        };
      }
      const At = M.get(r.accessorKey) ?? 0;
      return {
        style: {
          ...gt,
          right: `${At}px`
        },
        className: b(
          "transition-colors",
          y ? "bg-[#eaedf1] dark:bg-slate-800" : ut ? "bg-blue-50 dark:bg-blue-950/30" : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
          Xt && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [x, k, o]), C = x.some((t) => t.sticky === "left"), X = a.useCallback(
    (t) => {
      const e = String(t.accessorKey);
      if (j && e in j)
        return j[e];
      if (e in Q)
        return Q[e];
      if (t.width)
        return typeof t.width == "number" ? t.width : parseInt(t.width, 10);
    },
    [j, Q]
  ), _t = a.useCallback(
    (t, e) => {
      t.preventDefault(), t.stopPropagation(), nt(e.accessorKey), at.current = t.clientX;
      const i = X(e) ?? 150;
      ot.current = i;
    },
    [X]
  ), tt = a.useCallback(
    (t) => {
      if (!D) return;
      const e = t.clientX - at.current, i = Math.max(50, ot.current + e), d = String(D);
      q ? q(D, i) : Et((s) => ({ ...s, [d]: i }));
    },
    [D, q]
  ), et = a.useCallback(() => {
    nt(null);
  }, []);
  a.useEffect(() => {
    if (D)
      return document.addEventListener("mousemove", tt), document.addEventListener("mouseup", et), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", tt), document.removeEventListener("mouseup", et), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [D, tt, et]);
  const ht = (t) => {
    const e = ft(t, !0), i = (c) => typeof c == "number" ? `${c}px` : c, d = {};
    if (!t.sticky) {
      const c = S ? X(t) : void 0;
      c !== void 0 ? (d.width = `${c}px`, d.minWidth = `${c}px`) : (t.width && (d.width = i(t.width)), t.minWidth && (d.minWidth = i(t.minWidth)));
    }
    const s = { ...d, ...e.style }, g = S && /* @__PURE__ */ n(
      "div",
      {
        className: b(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          D === t.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (c) => _t(c, t),
        onPointerDown: (c) => c.stopPropagation(),
        onClick: (c) => c.stopPropagation()
      }
    );
    return P && !t.sticky && !t.sortable ? /* @__PURE__ */ $(
      fe,
      {
        id: String(t.accessorKey),
        style: s,
        className: b(T(t.align), e.className, S && "relative overflow-visible"),
        children: [
          t.header,
          g
        ]
      },
      String(t.accessorKey)
    ) : t.sortable ? /* @__PURE__ */ $(
      ne,
      {
        sortDirection: Rt(t.accessorKey),
        onSort: () => zt(t.accessorKey),
        style: s,
        className: b(T(t.align), e.className, S && "relative overflow-visible"),
        children: [
          t.header,
          g
        ]
      },
      String(t.accessorKey)
    ) : /* @__PURE__ */ $(
      rt,
      {
        style: s,
        className: b(T(t.align), e.className, S && "relative overflow-visible"),
        children: [
          t.header,
          g
        ]
      },
      String(t.accessorKey)
    );
  }, A = P ? Kt : x, Ot = A.filter((t) => !t.sticky).map((t) => String(t.accessorKey)), pt = /* @__PURE__ */ $(se, { className: V, maxHeight: mt, children: [
    /* @__PURE__ */ n(re, { children: /* @__PURE__ */ $(F, { children: [
      k && /* @__PURE__ */ n(
        rt,
        {
          className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
          style: C ? {
            position: "sticky",
            left: 0,
            zIndex: 20,
            width: `${u}px`,
            minWidth: `${u}px`,
            maxWidth: `${u}px`
          } : {
            width: `${u}px`,
            minWidth: `${u}px`,
            maxWidth: `${u}px`
          },
          children: /* @__PURE__ */ n("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ n(
            xt,
            {
              checked: Y,
              indeterminate: It,
              onCheckedChange: St,
              "aria-label": "전체 선택"
            }
          ) })
        }
      ),
      o && /* @__PURE__ */ n(
        rt,
        {
          className: "bg-[#eaedf1] dark:bg-slate-800",
          style: C ? {
            position: "sticky",
            left: k ? u : 0,
            zIndex: 20,
            width: `${m}px`,
            minWidth: `${m}px`,
            maxWidth: `${m}px`
          } : {
            width: `${m}px`,
            minWidth: `${m}px`,
            maxWidth: `${m}px`
          },
          "aria-label": "확장",
          children: /* @__PURE__ */ n("span", { className: "sr-only", children: "확장" })
        }
      ),
      P ? /* @__PURE__ */ n(Ut, { items: Ot, strategy: Yt, children: A.map(ht) }) : A.map(ht)
    ] }) }),
    /* @__PURE__ */ n(ie, { children: W.length === 0 ? /* @__PURE__ */ n(F, { children: /* @__PURE__ */ n(
      I,
      {
        colSpan: lt,
        className: "h-24 text-center text-slate-500",
        children: O
      }
    ) }) : W.map((t) => {
      const e = v.includes(t.id), i = Ht(t), d = dt(t.id);
      return /* @__PURE__ */ $(a.Fragment, { children: [
        /* @__PURE__ */ $(
          F,
          {
            "data-state": e ? "selected" : void 0,
            className: b(
              h && "cursor-pointer",
              G == null ? void 0 : G(t)
            ),
            onClick: () => h == null ? void 0 : h(t),
            children: [
              k && /* @__PURE__ */ n(
                I,
                {
                  onClick: (s) => s.stopPropagation(),
                  className: b(
                    "!p-0",
                    C && (e ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
                  ),
                  style: C ? {
                    position: "sticky",
                    left: 0,
                    zIndex: 10,
                    width: `${u}px`,
                    minWidth: `${u}px`,
                    maxWidth: `${u}px`
                  } : {
                    width: `${u}px`,
                    minWidth: `${u}px`,
                    maxWidth: `${u}px`
                  },
                  children: /* @__PURE__ */ n("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ n(
                    xt,
                    {
                      checked: e,
                      onCheckedChange: () => Pt(t.id),
                      "aria-label": `행 ${t.id} 선택`
                    }
                  ) })
                }
              ),
              o && /* @__PURE__ */ n(
                I,
                {
                  className: b(
                    "p-0",
                    C && (e ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
                  ),
                  style: C ? {
                    position: "sticky",
                    left: k ? u : 0,
                    zIndex: 10,
                    width: `${m}px`,
                    minWidth: `${m}px`,
                    maxWidth: `${m}px`
                  } : {
                    width: `${m}px`,
                    minWidth: `${m}px`,
                    maxWidth: `${m}px`
                  },
                  onClick: (s) => s.stopPropagation(),
                  children: i && /* @__PURE__ */ n(
                    "button",
                    {
                      type: "button",
                      onClick: () => Mt(t.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": d ? "행 접기" : "행 펼치기",
                      "aria-expanded": d,
                      children: d ? /* @__PURE__ */ n(oe, { size: 24 }) : /* @__PURE__ */ n(de, { size: 24 })
                    }
                  )
                }
              ),
              A.map((s) => {
                const g = t[s.accessorKey], w = Ct(t.id, s.accessorKey), c = ft(s, !1, e), M = (r) => typeof r == "number" ? `${r}px` : r, N = {};
                if (!s.sticky) {
                  const r = S ? X(s) : void 0;
                  r !== void 0 ? (N.width = `${r}px`, N.minWidth = `${r}px`) : (s.width && (N.width = M(s.width)), s.minWidth && (N.minWidth = M(s.minWidth)));
                }
                const _ = { ...N, ...c.style };
                if (w && s.editable) {
                  const r = s.editComponent || le;
                  return /* @__PURE__ */ n(
                    I,
                    {
                      ref: it,
                      className: b(T(s.align), "p-1", c.className),
                      style: _,
                      onClick: (y) => y.stopPropagation(),
                      children: /* @__PURE__ */ n(
                        r,
                        {
                          value: kt,
                          onChange: (y) => {
                            H(y), R.current = y, f != null && f.error && z({ ...f, error: void 0 });
                          },
                          onComplete: () => Tt(s, t),
                          onCancel: Z,
                          row: t,
                          error: f == null ? void 0 : f.error
                        }
                      )
                    },
                    String(s.accessorKey)
                  );
                }
                const B = s.cell ? s.cell(g, t) : String(g ?? "");
                return s.editable && K ? /* @__PURE__ */ n(
                  I,
                  {
                    className: b(
                      T(s.align),
                      "cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                      c.className
                    ),
                    style: _,
                    onClick: (r) => {
                      r.stopPropagation(), setTimeout(() => {
                        Lt(t.id, s.accessorKey, g);
                      }, 0);
                    },
                    children: B
                  },
                  String(s.accessorKey)
                ) : /* @__PURE__ */ n(
                  I,
                  {
                    className: b(T(s.align), c.className),
                    style: _,
                    children: B
                  },
                  String(s.accessorKey)
                );
              })
            ]
          }
        ),
        o && d && /* @__PURE__ */ n(F, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ n(
          I,
          {
            colSpan: lt,
            className: "p-4",
            children: o.expandedRowRender(t)
          }
        ) })
      ] }, t.id);
    }) })
  ] });
  return P ? /* @__PURE__ */ n(
    Vt,
    {
      sensors: Nt,
      collisionDetection: Gt,
      onDragEnd: Dt,
      children: pt
    }
  ) : pt;
}
export {
  we as DataTable
};
//# sourceMappingURL=data-table.mjs.map
