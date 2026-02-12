import { jsxs as K, jsx as n } from "react/jsx-runtime";
import * as a from "react";
import { useSensors as Ft, useSensor as yt, DndContext as Vt, closestCenter as Gt, KeyboardSensor as qt, PointerSensor as Jt } from "../../node_modules/@dnd-kit/core/dist/core.esm.mjs";
import { arrayMove as Qt, SortableContext as Ut, horizontalListSortingStrategy as Yt, sortableKeyboardCoordinates as Zt, useSortable as te } from "../../node_modules/@dnd-kit/sortable/dist/sortable.esm.mjs";
import { CSS as ee } from "../../node_modules/@dnd-kit/utilities/dist/utilities.esm.mjs";
import { cn as x } from "../../lib/utils.mjs";
import { Table as se, TableHeader as re, TableRow as F, TableHead as rt, TableBody as ie, TableCell as I, TableSortableHead as ne } from "./table.mjs";
import { Checkbox as xt } from "../ui/checkbox.mjs";
import { Input as ae } from "../ui/input.mjs";
import { DownIcon as oe } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as ce } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as de } from "../../icons/RightIcon.mjs";
function le({
  value: y,
  onChange: v,
  onComplete: b,
  onCancel: m,
  error: l
}) {
  const u = a.useRef(null);
  a.useEffect(() => {
    var h, W;
    (h = u.current) == null || h.focus(), (W = u.current) == null || W.select();
  }, []);
  const E = (h) => {
    h.key === "Enter" ? (h.preventDefault(), b()) : h.key === "Escape" && (h.preventDefault(), m());
  };
  return /* @__PURE__ */ K("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ n(
      ae,
      {
        ref: u,
        value: String(y ?? ""),
        onChange: (h) => v(h.target.value),
        onKeyDown: E,
        error: !!l,
        className: "w-full min-w-[60px] px-2 text-xs"
      }
    ),
    l && /* @__PURE__ */ n("span", { className: "text-[10px] text-destructive dark:text-red-400", children: l })
  ] });
}
function fe({
  id: y,
  children: v,
  className: b,
  style: m,
  disabled: l
}) {
  const {
    attributes: u,
    listeners: E,
    setNodeRef: h,
    transform: W,
    transition: o,
    isDragging: O
  } = te({ id: y, disabled: l }), V = {
    ...m,
    transform: ee.Transform.toString(W),
    transition: o,
    opacity: O ? 0.5 : 1,
    cursor: l ? void 0 : "grab"
  };
  return /* @__PURE__ */ n(
    "th",
    {
      ref: h,
      style: V,
      className: x(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300",
        "bg-[#eaedf1] dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        O && "z-50",
        b
      ),
      ...u,
      ...E,
      children: /* @__PURE__ */ K("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ n(
          ce,
          {
            size: 16,
            className: "opacity-30 group-hover/drag:opacity-70 transition-opacity flex-shrink-0"
          }
        ),
        v
      ] })
    }
  );
}
function Ke({
  columns: y,
  data: v,
  selectable: b = !1,
  selectedIds: m = [],
  onSelectionChange: l,
  sortState: u,
  onSortChange: E,
  onRowClick: h,
  onCellChange: W,
  expandable: o,
  emptyMessage: O = "데이터가 없습니다.",
  className: V,
  rowClassName: G,
  maxHeight: bt,
  resizable: S = !1,
  columnWidths: X,
  onColumnResize: q,
  columnReorderable: P = !1,
  columnOrder: mt,
  onColumnReorder: J
}) {
  const [f, z] = a.useState(null), [kt, H] = a.useState(null), R = a.useRef(null), it = a.useRef(null), [vt, Et] = a.useState(
    (o == null ? void 0 : o.defaultExpandedRowIds) ?? []
  ), [Q, wt] = a.useState({}), [D, nt] = a.useState(null), at = a.useRef(0), ot = a.useRef(0), [Kt, Wt] = a.useState(
    () => y.map((t) => t.accessorKey)
  ), L = mt ?? Kt, Nt = a.useMemo(() => P ? L.map((t) => y.find((e) => e.accessorKey === t)).filter((t) => t !== void 0) : y, [y, L, P]), $t = Ft(
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
      const p = Qt(L, d, s);
      J ? J(p) : Wt(p);
    },
    [L, J]
  ), U = (o == null ? void 0 : o.expandedRowIds) ?? vt, ct = (o == null ? void 0 : o.onExpandedChange) ?? Et, Y = v.length > 0 && m.length === v.length, It = m.length > 0 && !Y, St = () => {
    Y ? l == null || l([]) : l == null || l(v.map((t) => t.id));
  }, Pt = (t) => {
    m.includes(t) ? l == null || l(m.filter((e) => e !== t)) : l == null || l([...m, t]);
  }, zt = (t) => {
    E && ((u == null ? void 0 : u.column) === t ? u.direction === "asc" ? E({ column: t, direction: "desc" }) : u.direction === "desc" ? E({ column: null, direction: null }) : E({ column: t, direction: "asc" }) : E({ column: t, direction: "asc" }));
  }, Rt = (t) => (u == null ? void 0 : u.column) === t ? u.direction : null, T = (t) => {
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
    W && W(f.rowId, f.columnKey, i), z(null), H(null), R.current = null;
  }, Z = a.useCallback(() => {
    z(null), H(null), R.current = null;
  }, []);
  a.useEffect(() => {
    if (!f) return;
    const t = (e) => {
      var s, p;
      const i = e.target;
      (s = it.current) != null && s.contains(i) || (p = i.closest) != null && p.call(i, "[data-radix-popper-content-wrapper]") || Z();
    };
    return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
  }, [f, Z]);
  const Ct = (t, e) => (f == null ? void 0 : f.rowId) === t && (f == null ? void 0 : f.columnKey) === e, Ht = (t) => o ? o.rowExpandable ? o.rowExpandable(t) : !0 : !1, dt = (t) => U.includes(t), Mt = (t) => {
    dt(t) ? ct(U.filter((e) => e !== t)) : ct([...U, t]);
  }, lt = y.length + (b ? 1 : 0) + (o ? 1 : 0), ft = a.useMemo(() => {
    const t = (r) => {
      const g = r.width ?? r.minWidth;
      return typeof g == "number" ? g : parseInt(String(g) || "150", 10);
    }, e = y.filter((r) => r.sticky === "left"), i = y.filter((r) => r.sticky === "right"), p = (b ? 48 : 0) + (o ? 40 : 0), w = /* @__PURE__ */ new Map();
    let c = p;
    for (const r of e)
      w.set(r.accessorKey, c), c += t(r);
    const M = /* @__PURE__ */ new Map();
    let $ = 0;
    for (let r = i.length - 1; r >= 0; r--) {
      const g = i[r];
      M.set(g.accessorKey, $), $ += t(g);
    }
    const _ = e.length > 0 ? e[e.length - 1].accessorKey : null, B = i.length > 0 ? i[0].accessorKey : null;
    return (r, g, pt) => {
      if (!r.sticky) return { style: {}, className: "" };
      const Xt = r.accessorKey === _, At = r.accessorKey === B, st = `${t(r)}px`, gt = {
        position: "sticky",
        zIndex: g ? 20 : 10,
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
          className: x(
            "transition-colors",
            g ? "bg-[#eaedf1] dark:bg-slate-800" : pt ? "bg-blue-50 dark:bg-blue-950/30" : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
            Xt && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          )
        };
      }
      const jt = M.get(r.accessorKey) ?? 0;
      return {
        style: {
          ...gt,
          right: `${jt}px`
        },
        className: x(
          "transition-colors",
          g ? "bg-[#eaedf1] dark:bg-slate-800" : pt ? "bg-blue-50 dark:bg-blue-950/30" : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
          At && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [y, b, o]), C = y.some((t) => t.sticky === "left"), A = a.useCallback(
    (t) => {
      const e = String(t.accessorKey);
      if (X && e in X)
        return X[e];
      if (e in Q)
        return Q[e];
      if (t.width)
        return typeof t.width == "number" ? t.width : parseInt(t.width, 10);
    },
    [X, Q]
  ), _t = a.useCallback(
    (t, e) => {
      t.preventDefault(), t.stopPropagation(), nt(e.accessorKey), at.current = t.clientX;
      const i = A(e) ?? 150;
      ot.current = i;
    },
    [A]
  ), tt = a.useCallback(
    (t) => {
      if (!D) return;
      const e = t.clientX - at.current, i = Math.max(50, ot.current + e), d = String(D);
      q ? q(D, i) : wt((s) => ({ ...s, [d]: i }));
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
  const k = 48, N = 40, ht = (t) => {
    const e = ft(t, !0), i = (c) => typeof c == "number" ? `${c}px` : c, d = {};
    if (!t.sticky) {
      const c = S ? A(t) : void 0;
      c !== void 0 ? (d.width = `${c}px`, d.minWidth = `${c}px`) : (t.width && (d.width = i(t.width)), t.minWidth && (d.minWidth = i(t.minWidth)));
    }
    const s = { ...d, ...e.style }, p = S && /* @__PURE__ */ n(
      "div",
      {
        className: x(
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
    return P && !t.sticky && !t.sortable ? /* @__PURE__ */ K(
      fe,
      {
        id: String(t.accessorKey),
        style: s,
        className: x(T(t.align), e.className, S && "relative overflow-visible"),
        children: [
          t.header,
          p
        ]
      },
      String(t.accessorKey)
    ) : t.sortable ? /* @__PURE__ */ K(
      ne,
      {
        sortDirection: Rt(t.accessorKey),
        onSort: () => zt(t.accessorKey),
        style: s,
        className: x(T(t.align), e.className, S && "relative overflow-visible"),
        children: [
          t.header,
          p
        ]
      },
      String(t.accessorKey)
    ) : /* @__PURE__ */ K(
      rt,
      {
        style: s,
        className: x(T(t.align), e.className, S && "relative overflow-visible"),
        children: [
          t.header,
          p
        ]
      },
      String(t.accessorKey)
    );
  }, j = P ? Nt : y, Ot = j.filter((t) => !t.sticky).map((t) => String(t.accessorKey)), ut = /* @__PURE__ */ K(se, { className: V, maxHeight: bt, children: [
    /* @__PURE__ */ n(re, { children: /* @__PURE__ */ K(F, { children: [
      b && /* @__PURE__ */ n(
        rt,
        {
          className: "bg-[#eaedf1] dark:bg-slate-800",
          style: C ? {
            position: "sticky",
            left: 0,
            zIndex: 20,
            width: `${k}px`,
            minWidth: `${k}px`,
            maxWidth: `${k}px`
          } : { width: `${k}px` },
          children: /* @__PURE__ */ n(
            xt,
            {
              checked: Y,
              indeterminate: It,
              onCheckedChange: St,
              "aria-label": "전체 선택"
            }
          )
        }
      ),
      o && /* @__PURE__ */ n(
        rt,
        {
          className: "bg-[#eaedf1] dark:bg-slate-800",
          style: C ? {
            position: "sticky",
            left: b ? k : 0,
            zIndex: 20,
            width: `${N}px`,
            minWidth: `${N}px`,
            maxWidth: `${N}px`
          } : { width: `${N}px` },
          "aria-label": "확장",
          children: /* @__PURE__ */ n("span", { className: "sr-only", children: "확장" })
        }
      ),
      P ? /* @__PURE__ */ n(Ut, { items: Ot, strategy: Yt, children: j.map(ht) }) : j.map(ht)
    ] }) }),
    /* @__PURE__ */ n(ie, { children: v.length === 0 ? /* @__PURE__ */ n(F, { children: /* @__PURE__ */ n(
      I,
      {
        colSpan: lt,
        className: "h-24 text-center text-slate-500",
        children: O
      }
    ) }) : v.map((t) => {
      const e = m.includes(t.id), i = Ht(t), d = dt(t.id);
      return /* @__PURE__ */ K(a.Fragment, { children: [
        /* @__PURE__ */ K(
          F,
          {
            "data-state": e ? "selected" : void 0,
            className: x(
              h && "cursor-pointer",
              G == null ? void 0 : G(t)
            ),
            onClick: () => h == null ? void 0 : h(t),
            children: [
              b && /* @__PURE__ */ n(
                I,
                {
                  onClick: (s) => s.stopPropagation(),
                  className: C ? e ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700" : void 0,
                  style: C ? {
                    position: "sticky",
                    left: 0,
                    zIndex: 10,
                    width: `${k}px`,
                    minWidth: `${k}px`,
                    maxWidth: `${k}px`
                  } : { width: `${k}px` },
                  children: /* @__PURE__ */ n(
                    xt,
                    {
                      checked: e,
                      onCheckedChange: () => Pt(t.id),
                      "aria-label": `행 ${t.id} 선택`
                    }
                  )
                }
              ),
              o && /* @__PURE__ */ n(
                I,
                {
                  className: x(
                    "p-0",
                    C && (e ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
                  ),
                  style: C ? {
                    position: "sticky",
                    left: b ? k : 0,
                    zIndex: 10,
                    width: `${N}px`,
                    minWidth: `${N}px`,
                    maxWidth: `${N}px`
                  } : { width: `${N}px` },
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
              j.map((s) => {
                const p = t[s.accessorKey], w = Ct(t.id, s.accessorKey), c = ft(s, !1, e), M = (r) => typeof r == "number" ? `${r}px` : r, $ = {};
                if (!s.sticky) {
                  const r = S ? A(s) : void 0;
                  r !== void 0 ? ($.width = `${r}px`, $.minWidth = `${r}px`) : (s.width && ($.width = M(s.width)), s.minWidth && ($.minWidth = M(s.minWidth)));
                }
                const _ = { ...$, ...c.style };
                if (w && s.editable) {
                  const r = s.editComponent || le;
                  return /* @__PURE__ */ n(
                    I,
                    {
                      ref: it,
                      className: x(T(s.align), "p-1", c.className),
                      style: _,
                      onClick: (g) => g.stopPropagation(),
                      children: /* @__PURE__ */ n(
                        r,
                        {
                          value: kt,
                          onChange: (g) => {
                            H(g), R.current = g, f != null && f.error && z({ ...f, error: void 0 });
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
                const B = s.cell ? s.cell(p, t) : String(p ?? "");
                return s.editable && W ? /* @__PURE__ */ n(
                  I,
                  {
                    className: x(
                      T(s.align),
                      "cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                      c.className
                    ),
                    style: _,
                    onClick: (r) => {
                      r.stopPropagation(), setTimeout(() => {
                        Lt(t.id, s.accessorKey, p);
                      }, 0);
                    },
                    children: B
                  },
                  String(s.accessorKey)
                ) : /* @__PURE__ */ n(
                  I,
                  {
                    className: x(T(s.align), c.className),
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
      sensors: $t,
      collisionDetection: Gt,
      onDragEnd: Dt,
      children: ut
    }
  ) : ut;
}
export {
  Ke as DataTable
};
//# sourceMappingURL=data-table.mjs.map
