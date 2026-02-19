import { jsxs as H, jsx as s, Fragment as Tt } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as ue, useSensor as _t, DndContext as xe, closestCenter as ye, KeyboardSensor as be, PointerSensor as me } from "../../node_modules/@dnd-kit/core/dist/core.esm.mjs";
import { arrayMove as At, SortableContext as jt, horizontalListSortingStrategy as ve, verticalListSortingStrategy as ke, useSortable as Bt, sortableKeyboardCoordinates as We } from "../../node_modules/@dnd-kit/sortable/dist/sortable.esm.mjs";
import { CSS as Rt } from "../../node_modules/@dnd-kit/utilities/dist/utilities.esm.mjs";
import { cn as x } from "../../lib/utils.mjs";
import { Table as Ne, TableHeader as $e, TableRow as J, TableHead as st, TableBody as De, TableCell as E, TableSortableHead as Ee } from "./table.mjs";
import { Checkbox as yt } from "../ui/checkbox.mjs";
import { Input as Ie } from "../ui/input.mjs";
import { DownIcon as Gt } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as Vt } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as Mt } from "../../icons/RightIcon.mjs";
import { STLArrowIcon as Se } from "../../icons/STLArrowIcon.mjs";
import { WriteIcon as Ot } from "../../icons/WriteIcon.mjs";
function Ft({
  value: y,
  onChange: u,
  onComplete: N,
  onCancel: $,
  error: f
}) {
  const m = l.useRef(null);
  l.useEffect(() => {
    var o, w;
    (o = m.current) == null || o.focus(), (w = m.current) == null || w.select();
  }, []);
  const I = (o) => {
    o.key === "Enter" ? (o.preventDefault(), N()) : o.key === "Escape" && (o.preventDefault(), $());
  };
  return /* @__PURE__ */ H("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ s(
      Ie,
      {
        ref: m,
        value: String(y ?? ""),
        onChange: (o) => u(o.target.value),
        onKeyDown: I,
        error: !!f,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    f && /* @__PURE__ */ s("span", { className: "text-[10px] text-destructive dark:text-red-400", children: f })
  ] });
}
function Ke({
  id: y,
  children: u,
  className: N,
  style: $,
  disabled: f
}) {
  const {
    attributes: m,
    listeners: I,
    setNodeRef: o,
    transform: w,
    transition: h,
    isDragging: C
  } = Bt({ id: y, disabled: f }), B = {
    ...$,
    transform: Rt.Transform.toString(w),
    transition: h,
    opacity: C ? 0.5 : 1,
    cursor: f ? void 0 : "grab"
  };
  return /* @__PURE__ */ s(
    "th",
    {
      ref: o,
      style: B,
      className: x(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300",
        "bg-[#eaedf1] dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        C && "z-50",
        N
      ),
      ...m,
      ...I,
      children: /* @__PURE__ */ H("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ s(
          Vt,
          {
            size: 16,
            className: "opacity-30 group-hover/drag:opacity-70 transition-opacity flex-shrink-0"
          }
        ),
        u
      ] })
    }
  );
}
function Xt({
  id: y,
  children: u,
  className: N,
  isSelected: $,
  onClick: f
}) {
  const {
    setNodeRef: m,
    setActivatorNodeRef: I,
    listeners: o,
    attributes: w,
    transform: h,
    transition: C,
    isDragging: B
  } = Bt({ id: y }), L = {
    transform: Rt.Transform.toString(h),
    transition: C,
    opacity: B ? 0.5 : 1
  };
  return /* @__PURE__ */ s(
    "tr",
    {
      ref: m,
      style: L,
      "data-state": $ ? "selected" : void 0,
      className: x(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-950/30",
        B && "z-50 shadow-lg",
        N
      ),
      onClick: f,
      children: typeof u == "function" ? u({ listeners: o, attributes: w, setActivatorNodeRef: I }) : u
    }
  );
}
function Ct({ isSelected: y, hasLeftStickyColumns: u, dragHandleProps: N }) {
  const { listeners: f, attributes: m, setActivatorNodeRef: I } = N ?? {};
  return /* @__PURE__ */ s(
    "td",
    {
      className: x(
        "p-0 align-middle",
        u && (y ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
      ),
      style: u ? {
        position: "sticky",
        left: 0,
        zIndex: 10,
        width: "32px",
        minWidth: "32px",
        maxWidth: "32px"
      } : {
        width: "32px",
        minWidth: "32px",
        maxWidth: "32px"
      },
      children: /* @__PURE__ */ s(
        "div",
        {
          ref: I,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (o) => o.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...f,
          ...m,
          children: /* @__PURE__ */ s(Vt, { size: 16 })
        }
      )
    }
  );
}
function Ce({
  columns: y,
  data: u,
  selectable: N = !1,
  selectedIds: $ = [],
  onSelectionChange: f,
  sortState: m,
  onSortChange: I,
  onRowClick: o,
  onCellChange: w,
  expandable: h,
  emptyMessage: C = "데이터가 없습니다.",
  className: B,
  rowClassName: L,
  maxHeight: qt,
  resizable: G = !1,
  columnWidths: Y,
  onColumnResize: it,
  columnReorderable: j = !1,
  columnOrder: rt,
  onColumnReorder: nt,
  rowReorderable: T = !1,
  onRowReorder: Z,
  loading: Jt = !1,
  loadingContent: Qt
}) {
  const [p, M] = l.useState(null), [bt, R] = l.useState(null), O = l.useRef(null), at = l.useRef(null), [Ut, Yt] = l.useState(
    (h == null ? void 0 : h.defaultExpandedRowIds) ?? []
  ), [ct, Zt] = l.useState({}), [F, mt] = l.useState(null), vt = l.useRef(0), kt = l.useRef(0), [te, Wt] = l.useState(
    () => y.map((t) => t.accessorKey)
  );
  l.useEffect(() => {
    !j || rt || Wt((t) => {
      const i = y.map((d) => d.accessorKey), r = t.filter((d) => i.includes(d)), n = i.filter((d) => !r.includes(d)), g = [...r, ...n];
      return g.length === t.length && g.every((d, k) => d === t[k]) ? t : g;
    });
  }, [y, j, rt]);
  const V = rt ?? te, ee = l.useMemo(() => j ? V.map((t) => y.find((i) => i.accessorKey === t)).filter((t) => t !== void 0) : y, [y, V, j]), se = ue(
    _t(me, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    _t(be, {
      coordinateGetter: We
    })
  ), Nt = l.useCallback(
    (t) => {
      const { active: i, over: r } = t;
      if (!r || i.id === r.id) return;
      const n = V.findIndex((k) => String(k) === i.id), g = V.findIndex((k) => String(k) === r.id);
      if (n === -1 || g === -1) return;
      const d = At(V, n, g);
      nt ? nt(d) : Wt(d);
    },
    [V, nt]
  ), $t = l.useCallback(
    (t) => {
      const { active: i, over: r } = t;
      if (!r || i.id === r.id) return;
      const n = String(i.id).replace(/^row-/, ""), g = String(r.id).replace(/^row-/, ""), d = u.findIndex((D) => String(D.id) === n), k = u.findIndex((D) => String(D.id) === g);
      if (d === -1 || k === -1) return;
      const e = At(u, d, k);
      Z == null || Z(e);
    },
    [u, Z]
  ), ie = l.useCallback(
    (t) => {
      const { active: i } = t;
      String(i.id).startsWith("row-") ? $t(t) : Nt(t);
    },
    [Nt, $t]
  ), ot = (h == null ? void 0 : h.expandedRowIds) ?? Ut, Dt = (h == null ? void 0 : h.onExpandedChange) ?? Yt, dt = u.length > 0 && $.length === u.length, re = $.length > 0 && !dt, ne = () => {
    dt ? f == null || f([]) : f == null || f(u.map((t) => t.id));
  }, Et = (t) => {
    $.includes(t) ? f == null || f($.filter((i) => i !== t)) : f == null || f([...$, t]);
  }, ae = (t) => {
    I && ((m == null ? void 0 : m.column) === t ? m.direction === "asc" ? I({ column: t, direction: "desc" }) : m.direction === "desc" ? I({ column: null, direction: null }) : I({ column: t, direction: "asc" }) : I({ column: t, direction: "asc" }));
  }, ce = (t) => (m == null ? void 0 : m.column) === t ? m.direction : null, _ = (t) => {
    switch (t) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, It = (t, i, r) => {
    M({ rowId: t, columnKey: i }), R(r), O.current = r;
  }, St = (t, i) => {
    const r = O.current;
    if (!p || r === null) {
      M(null), R(null), O.current = null;
      return;
    }
    if (t.validate) {
      const n = t.validate(r, i);
      if (n !== !0) {
        M({ ...p, error: n });
        return;
      }
    }
    w && w(p.rowId, p.columnKey, r), M(null), R(null), O.current = null;
  }, tt = l.useCallback(() => {
    M(null), R(null), O.current = null;
  }, []);
  l.useEffect(() => {
    if (!p) return;
    const t = (i) => {
      var g, d;
      const r = i.target;
      (g = at.current) != null && g.contains(r) || (d = r.closest) != null && d.call(r, "[data-radix-popper-content-wrapper]") || tt();
    };
    return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
  }, [p, tt]);
  const Kt = (t, i) => (p == null ? void 0 : p.rowId) === t && (p == null ? void 0 : p.columnKey) === i, Ht = (t) => h ? h.rowExpandable ? h.rowExpandable(t) : !0 : !1, lt = (t) => ot.includes(t), zt = (t) => {
    lt(t) ? Dt(ot.filter((i) => i !== t)) : Dt([...ot, t]);
  }, et = y.length + (N ? 1 : 0) + (h ? 1 : 0) + (T ? 1 : 0), b = 40, v = 40, A = 32, ht = l.useMemo(() => {
    const t = (a) => {
      const W = a.width ?? a.minWidth;
      if (typeof W == "number") return W;
      const c = parseInt(String(W), 10);
      return Number.isFinite(c) ? c : 150;
    }, i = y.filter((a) => a.sticky === "left"), r = y.filter((a) => a.sticky === "right"), n = T ? A : 0, g = N ? b : 0, d = h ? v : 0, k = n + g + d, e = /* @__PURE__ */ new Map();
    let D = k;
    for (const a of i)
      e.set(a.accessorKey, D), D += t(a);
    const q = /* @__PURE__ */ new Map();
    let z = 0;
    for (let a = r.length - 1; a >= 0; a--) {
      const W = r[a];
      q.set(W.accessorKey, z), z += t(W);
    }
    const X = i.length > 0 ? i[i.length - 1].accessorKey : null, K = r.length > 0 ? r[0].accessorKey : null;
    return (a, W, c) => {
      if (!a.sticky) return { style: {}, className: "" };
      const P = a.accessorKey === X, pe = a.accessorKey === K, xt = `${t(a)}px`, Pt = {
        position: "sticky",
        zIndex: W ? 20 : 10,
        width: xt,
        minWidth: xt,
        maxWidth: xt
      };
      if (a.sticky === "left") {
        const ge = e.get(a.accessorKey) ?? 0;
        return {
          style: {
            ...Pt,
            left: `${ge}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: x(
            "transition-colors",
            W ? "bg-[#eaedf1] dark:bg-slate-800" : c ? "bg-blue-50 dark:bg-blue-950/30" : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
            P && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          )
        };
      }
      const fe = q.get(a.accessorKey) ?? 0;
      return {
        style: {
          ...Pt,
          right: `${fe}px`
        },
        className: x(
          "transition-colors",
          W ? "bg-[#eaedf1] dark:bg-slate-800" : c ? "bg-blue-50 dark:bg-blue-950/30" : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
          pe && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [y, N, h]), S = y.some((t) => t.sticky === "left"), Q = l.useCallback(
    (t) => {
      const i = String(t.accessorKey);
      if (Y && i in Y)
        return Y[i];
      if (i in ct)
        return ct[i];
      if (t.width)
        return typeof t.width == "number" ? t.width : parseInt(t.width, 10);
    },
    [Y, ct]
  ), oe = l.useCallback(
    (t, i) => {
      t.preventDefault(), t.stopPropagation(), mt(i.accessorKey), vt.current = t.clientX;
      const r = Q(i) ?? 150;
      kt.current = r;
    },
    [Q]
  ), pt = l.useCallback(
    (t) => {
      if (!F) return;
      const i = t.clientX - vt.current, r = Math.max(50, kt.current + i), n = String(F);
      it ? it(F, r) : Zt((g) => ({ ...g, [n]: r }));
    },
    [F, it]
  ), ft = l.useCallback(() => {
    mt(null);
  }, []);
  l.useEffect(() => {
    if (F)
      return document.addEventListener("mousemove", pt), document.addEventListener("mouseup", ft), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", pt), document.removeEventListener("mouseup", ft), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [F, pt, ft]);
  const wt = (t) => {
    const i = ht(t, !0), r = (e) => typeof e == "number" ? `${e}px` : e, n = {};
    if (!t.sticky) {
      const e = G ? Q(t) : void 0;
      e !== void 0 ? (n.width = `${e}px`, n.minWidth = `${e}px`) : (t.width && (n.width = r(t.width)), t.minWidth && (n.minWidth = r(t.minWidth)));
    }
    const g = { ...n, ...i.style }, d = G && /* @__PURE__ */ s(
      "div",
      {
        className: x(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          F === t.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (e) => oe(e, t),
        onPointerDown: (e) => e.stopPropagation(),
        onClick: (e) => e.stopPropagation()
      }
    );
    return j && !t.sticky && !t.sortable ? /* @__PURE__ */ H(
      Ke,
      {
        id: String(t.accessorKey),
        style: g,
        className: x(_(t.align), i.className, G && "relative overflow-visible"),
        children: [
          t.header,
          d
        ]
      },
      String(t.accessorKey)
    ) : t.sortable ? /* @__PURE__ */ H(
      Ee,
      {
        sortDirection: ce(t.accessorKey),
        onSort: () => ae(t.accessorKey),
        style: g,
        className: x(_(t.align), i.className, G && "relative overflow-visible"),
        children: [
          t.header,
          d
        ]
      },
      String(t.accessorKey)
    ) : /* @__PURE__ */ H(
      st,
      {
        style: g,
        className: x(_(t.align), i.className, G && "relative overflow-visible"),
        children: [
          t.header,
          d
        ]
      },
      String(t.accessorKey)
    );
  }, U = j ? ee : y, de = U.filter((t) => !t.sticky).map((t) => String(t.accessorKey)), le = u.map((t) => `row-${t.id}`), he = () => 0, gt = () => T ? A : 0, ut = () => {
    let t = 0;
    return T && (t += A), N && (t += b), t;
  }, Lt = /* @__PURE__ */ H(Ne, { className: B, maxHeight: qt, children: [
    /* @__PURE__ */ s($e, { children: /* @__PURE__ */ H(J, { children: [
      T && /* @__PURE__ */ s(
        st,
        {
          className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
          style: S ? {
            position: "sticky",
            left: he(),
            zIndex: 20,
            width: `${A}px`,
            minWidth: `${A}px`,
            maxWidth: `${A}px`
          } : {
            width: `${A}px`,
            minWidth: `${A}px`,
            maxWidth: `${A}px`
          },
          "aria-label": "순서 변경",
          children: /* @__PURE__ */ s("span", { className: "sr-only", children: "순서 변경" })
        }
      ),
      N && /* @__PURE__ */ s(
        st,
        {
          className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
          style: S ? {
            position: "sticky",
            left: gt(),
            zIndex: 20,
            width: `${b}px`,
            minWidth: `${b}px`,
            maxWidth: `${b}px`
          } : {
            width: `${b}px`,
            minWidth: `${b}px`,
            maxWidth: `${b}px`
          },
          children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ s(
            yt,
            {
              checked: dt,
              indeterminate: re,
              onCheckedChange: ne,
              "aria-label": "전체 선택"
            }
          ) })
        }
      ),
      h && /* @__PURE__ */ s(
        st,
        {
          className: "bg-[#eaedf1] dark:bg-slate-800",
          style: S ? {
            position: "sticky",
            left: ut(),
            zIndex: 20,
            width: `${v}px`,
            minWidth: `${v}px`,
            maxWidth: `${v}px`
          } : {
            width: `${v}px`,
            minWidth: `${v}px`,
            maxWidth: `${v}px`
          },
          "aria-label": "확장",
          children: /* @__PURE__ */ s("span", { className: "sr-only", children: "확장" })
        }
      ),
      j ? /* @__PURE__ */ s(jt, { items: de, strategy: ve, children: U.map(wt) }) : U.map(wt)
    ] }) }),
    /* @__PURE__ */ s(De, { children: Jt ? /* @__PURE__ */ s(J, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ s(
      E,
      {
        colSpan: et,
        className: "h-80 text-center",
        children: Qt ?? /* @__PURE__ */ s("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ s(Se, { size: 200, className: "text-slate-200 dark:text-slate-700" }) })
      }
    ) }) : u.length === 0 ? /* @__PURE__ */ s(J, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ s(
      E,
      {
        colSpan: et,
        className: "h-24 text-center text-slate-500",
        children: C
      }
    ) }) : T ? /* @__PURE__ */ s(jt, { items: le, strategy: ke, children: u.map((t) => {
      const i = $.includes(t.id), r = Ht(t), n = lt(t.id), g = `row-${t.id}`, d = (k) => /* @__PURE__ */ H(Tt, { children: [
        /* @__PURE__ */ s(
          Ct,
          {
            isSelected: i,
            hasLeftStickyColumns: S,
            dragHandleProps: k
          }
        ),
        N && /* @__PURE__ */ s(
          E,
          {
            onClick: (e) => e.stopPropagation(),
            className: x(
              "!p-0",
              S && (i ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
            ),
            style: S ? {
              position: "sticky",
              left: gt(),
              zIndex: 10,
              width: `${b}px`,
              minWidth: `${b}px`,
              maxWidth: `${b}px`
            } : {
              width: `${b}px`,
              minWidth: `${b}px`,
              maxWidth: `${b}px`
            },
            children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ s(
              yt,
              {
                checked: i,
                onCheckedChange: () => Et(t.id),
                "aria-label": `행 ${t.id} 선택`
              }
            ) })
          }
        ),
        h && /* @__PURE__ */ s(
          E,
          {
            className: x(
              "p-0",
              S && (i ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
            ),
            style: S ? {
              position: "sticky",
              left: ut(),
              zIndex: 10,
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            } : {
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            },
            onClick: (e) => e.stopPropagation(),
            children: r && /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                onClick: () => zt(t.id),
                className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                "aria-label": n ? "행 접기" : "행 펼치기",
                "aria-expanded": n,
                children: n ? /* @__PURE__ */ s(Gt, { size: 24 }) : /* @__PURE__ */ s(Mt, { size: 24 })
              }
            )
          }
        ),
        U.map((e) => {
          const D = t[e.accessorKey], q = Kt(t.id, e.accessorKey), z = ht(e, !1, i), X = (c) => typeof c == "number" ? `${c}px` : c, K = {};
          if (!e.sticky) {
            const c = G ? Q(e) : void 0;
            c !== void 0 ? (K.width = `${c}px`, K.minWidth = `${c}px`) : (e.width && (K.width = X(e.width)), e.minWidth && (K.minWidth = X(e.minWidth)));
          }
          const a = { ...K, ...z.style };
          if (q && e.editable) {
            const c = e.editComponent || Ft;
            return /* @__PURE__ */ s(
              E,
              {
                ref: at,
                className: x(_(e.align), "p-1 overflow-hidden", z.className),
                style: a,
                onClick: (P) => P.stopPropagation(),
                children: /* @__PURE__ */ s(
                  c,
                  {
                    value: bt,
                    onChange: (P) => {
                      R(P), O.current = P, p != null && p.error && M({ ...p, error: void 0 });
                    },
                    onComplete: () => St(e, t),
                    onCancel: tt,
                    row: t,
                    error: p == null ? void 0 : p.error
                  }
                )
              },
              String(e.accessorKey)
            );
          }
          const W = e.cell ? e.cell(D, t) : String(D ?? "");
          return e.editable && w ? /* @__PURE__ */ s(
            E,
            {
              className: x(_(e.align), "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800", z.className),
              style: a,
              onClick: (c) => {
                c.stopPropagation(), setTimeout(() => It(t.id, e.accessorKey, D), 0);
              },
              children: /* @__PURE__ */ H("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ s("span", { className: "flex-1", children: W }),
                /* @__PURE__ */ s(
                  Ot,
                  {
                    size: 14,
                    className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                  }
                )
              ] })
            },
            String(e.accessorKey)
          ) : /* @__PURE__ */ s(
            E,
            {
              className: x(_(e.align), z.className),
              style: a,
              children: W
            },
            String(e.accessorKey)
          );
        })
      ] });
      return /* @__PURE__ */ H(l.Fragment, { children: [
        /* @__PURE__ */ s(
          Xt,
          {
            id: g,
            isSelected: i,
            className: x(o && "cursor-pointer", L == null ? void 0 : L(t)),
            onClick: () => o == null ? void 0 : o(t),
            children: (k) => d(k)
          }
        ),
        h && n && /* @__PURE__ */ s(J, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ s(
          E,
          {
            colSpan: et,
            className: "p-0",
            style: { position: "relative" },
            children: /* @__PURE__ */ s(
              "div",
              {
                className: "p-4 overflow-x-auto",
                style: {
                  position: "sticky",
                  left: 0,
                  width: "100%",
                  maxWidth: "100vw"
                },
                children: h.expandedRowRender(t)
              }
            )
          }
        ) })
      ] }, t.id);
    }) }) : u.map((t) => {
      const i = $.includes(t.id), r = Ht(t), n = lt(t.id), g = `row-${t.id}`, d = (k) => /* @__PURE__ */ H(Tt, { children: [
        T && /* @__PURE__ */ s(
          Ct,
          {
            isSelected: i,
            hasLeftStickyColumns: S,
            dragHandleProps: k
          }
        ),
        N && /* @__PURE__ */ s(
          E,
          {
            onClick: (e) => e.stopPropagation(),
            className: x(
              "!p-0",
              S && (i ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
            ),
            style: S ? {
              position: "sticky",
              left: gt(),
              zIndex: 10,
              width: `${b}px`,
              minWidth: `${b}px`,
              maxWidth: `${b}px`
            } : {
              width: `${b}px`,
              minWidth: `${b}px`,
              maxWidth: `${b}px`
            },
            children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ s(
              yt,
              {
                checked: i,
                onCheckedChange: () => Et(t.id),
                "aria-label": `행 ${t.id} 선택`
              }
            ) })
          }
        ),
        h && /* @__PURE__ */ s(
          E,
          {
            className: x(
              "p-0",
              S && (i ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
            ),
            style: S ? {
              position: "sticky",
              left: ut(),
              zIndex: 10,
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            } : {
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            },
            onClick: (e) => e.stopPropagation(),
            children: r && /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                onClick: () => zt(t.id),
                className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                "aria-label": n ? "행 접기" : "행 펼치기",
                "aria-expanded": n,
                children: n ? /* @__PURE__ */ s(Gt, { size: 24 }) : /* @__PURE__ */ s(Mt, { size: 24 })
              }
            )
          }
        ),
        U.map((e) => {
          const D = t[e.accessorKey], q = Kt(t.id, e.accessorKey), z = ht(e, !1, i), X = (c) => typeof c == "number" ? `${c}px` : c, K = {};
          if (!e.sticky) {
            const c = G ? Q(e) : void 0;
            c !== void 0 ? (K.width = `${c}px`, K.minWidth = `${c}px`) : (e.width && (K.width = X(e.width)), e.minWidth && (K.minWidth = X(e.minWidth)));
          }
          const a = { ...K, ...z.style };
          if (q && e.editable) {
            const c = e.editComponent || Ft;
            return /* @__PURE__ */ s(
              E,
              {
                ref: at,
                className: x(_(e.align), "p-1 overflow-hidden", z.className),
                style: a,
                onClick: (P) => P.stopPropagation(),
                children: /* @__PURE__ */ s(
                  c,
                  {
                    value: bt,
                    onChange: (P) => {
                      R(P), O.current = P, p != null && p.error && M({ ...p, error: void 0 });
                    },
                    onComplete: () => St(e, t),
                    onCancel: tt,
                    row: t,
                    error: p == null ? void 0 : p.error
                  }
                )
              },
              String(e.accessorKey)
            );
          }
          const W = e.cell ? e.cell(D, t) : String(D ?? "");
          return e.editable && w ? /* @__PURE__ */ s(
            E,
            {
              className: x(
                _(e.align),
                "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                z.className
              ),
              style: a,
              onClick: (c) => {
                c.stopPropagation(), setTimeout(() => {
                  It(t.id, e.accessorKey, D);
                }, 0);
              },
              children: /* @__PURE__ */ H("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ s("span", { className: "flex-1", children: W }),
                /* @__PURE__ */ s(
                  Ot,
                  {
                    size: 20,
                    className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                  }
                )
              ] })
            },
            String(e.accessorKey)
          ) : /* @__PURE__ */ s(
            E,
            {
              className: x(_(e.align), z.className),
              style: a,
              children: W
            },
            String(e.accessorKey)
          );
        })
      ] });
      return /* @__PURE__ */ H(l.Fragment, { children: [
        T ? /* @__PURE__ */ s(
          Xt,
          {
            id: g,
            isSelected: i,
            className: x(o && "cursor-pointer", L == null ? void 0 : L(t)),
            onClick: () => o == null ? void 0 : o(t),
            children: (k) => d(k)
          }
        ) : /* @__PURE__ */ s(
          J,
          {
            "data-state": i ? "selected" : void 0,
            className: x(o && "cursor-pointer", L == null ? void 0 : L(t)),
            onClick: () => o == null ? void 0 : o(t),
            children: d()
          }
        ),
        h && n && /* @__PURE__ */ s(J, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ s(
          E,
          {
            colSpan: et,
            className: "p-0",
            style: { position: "relative" },
            children: /* @__PURE__ */ s(
              "div",
              {
                className: "p-4 overflow-x-auto",
                style: {
                  position: "sticky",
                  left: 0,
                  width: "100%",
                  maxWidth: "100vw"
                },
                children: h.expandedRowRender(t)
              }
            )
          }
        ) })
      ] }, t.id);
    }) })
  ] });
  return j || T ? /* @__PURE__ */ s(
    xe,
    {
      sensors: se,
      collisionDetection: ye,
      onDragEnd: ie,
      children: Lt
    }
  ) : Lt;
}
export {
  Ce as DataTable
};
//# sourceMappingURL=data-table.mjs.map
