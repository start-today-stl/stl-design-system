import { jsxs as N, jsx as s, Fragment as _t } from "react/jsx-runtime";
import * as l from "react";
import { useSensors as me, useSensor as At, DndContext as ve, closestCenter as ke, KeyboardSensor as We, PointerSensor as Ne } from "../../node_modules/@dnd-kit/core/dist/core.esm.mjs";
import { arrayMove as jt, SortableContext as Gt, horizontalListSortingStrategy as $e, verticalListSortingStrategy as De, useSortable as Rt, sortableKeyboardCoordinates as Ee } from "../../node_modules/@dnd-kit/sortable/dist/sortable.esm.mjs";
import { CSS as Vt } from "../../node_modules/@dnd-kit/utilities/dist/utilities.esm.mjs";
import { cn as x } from "../../lib/utils.mjs";
import { Table as Ie, TableHeader as Se, TableRow as J, TableHead as st, TableBody as Ke, TableCell as I, TableSortableHead as He } from "./table.mjs";
import { Checkbox as yt } from "../ui/checkbox.mjs";
import { Input as ze } from "../ui/input.mjs";
import { DownIcon as Mt } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as qt } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as Ot } from "../../icons/RightIcon.mjs";
import { STLArrowIcon as we } from "../../icons/STLArrowIcon.mjs";
import { WriteIcon as Ct } from "../../icons/WriteIcon.mjs";
import { Button as Le } from "../ui/button.mjs";
function Ft({
  value: y,
  onChange: u,
  onComplete: $,
  onCancel: D,
  error: f
}) {
  const m = l.useRef(null);
  l.useEffect(() => {
    var o, w;
    (o = m.current) == null || o.focus(), (w = m.current) == null || w.select();
  }, []);
  const S = (o) => {
    o.key === "Enter" ? (o.preventDefault(), $()) : o.key === "Escape" && (o.preventDefault(), D());
  };
  return /* @__PURE__ */ N("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ s(
      ze,
      {
        ref: m,
        value: String(y ?? ""),
        onChange: (o) => u(o.target.value),
        onKeyDown: S,
        error: !!f,
        tableMode: !0,
        className: "w-full min-w-[60px] px-2 text-xs"
      }
    ),
    f && /* @__PURE__ */ s("span", { className: "text-[10px] text-destructive dark:text-red-400", children: f })
  ] });
}
function Pe({
  id: y,
  children: u,
  className: $,
  style: D,
  disabled: f
}) {
  const {
    attributes: m,
    listeners: S,
    setNodeRef: o,
    transform: w,
    transition: h,
    isDragging: X
  } = Rt({ id: y, disabled: f }), B = {
    ...D,
    transform: Vt.Transform.toString(w),
    transition: h,
    opacity: X ? 0.5 : 1,
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
        X && "z-50",
        $
      ),
      ...m,
      ...S,
      children: /* @__PURE__ */ N("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ s(
          qt,
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
  className: $,
  isSelected: D,
  onClick: f
}) {
  const {
    setNodeRef: m,
    setActivatorNodeRef: S,
    listeners: o,
    attributes: w,
    transform: h,
    transition: X,
    isDragging: B
  } = Rt({ id: y }), L = {
    transform: Vt.Transform.toString(h),
    transition: X,
    opacity: B ? 0.5 : 1
  };
  return /* @__PURE__ */ s(
    "tr",
    {
      ref: m,
      style: L,
      "data-state": D ? "selected" : void 0,
      className: x(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-950/30",
        B && "z-50 shadow-lg",
        $
      ),
      onClick: f,
      children: typeof u == "function" ? u({ listeners: o, attributes: w, setActivatorNodeRef: S }) : u
    }
  );
}
function Bt({ isSelected: y, hasLeftStickyColumns: u, dragHandleProps: $ }) {
  const { listeners: f, attributes: m, setActivatorNodeRef: S } = $ ?? {};
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
          ref: S,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (o) => o.stopPropagation(),
          ...f,
          ...m,
          children: /* @__PURE__ */ s(qt, { size: 16 })
        }
      )
    }
  );
}
function Qe({
  columns: y,
  data: u,
  selectable: $ = !1,
  selectedIds: D = [],
  onSelectionChange: f,
  sortState: m,
  onSortChange: S,
  onRowClick: o,
  onCellChange: w,
  expandable: h,
  emptyMessage: X = "데이터가 없습니다.",
  className: B,
  rowClassName: L,
  maxHeight: Jt,
  resizable: G = !1,
  columnWidths: Y,
  onColumnResize: it,
  columnReorderable: j = !1,
  columnOrder: rt,
  onColumnReorder: nt,
  rowReorderable: T = !1,
  onRowReorder: Z,
  loading: Qt = !1,
  loadingContent: Ut,
  addable: Yt = !1,
  onAddRow: Zt,
  addRowLabel: te = "행 추가"
}) {
  const [p, M] = l.useState(null), [bt, R] = l.useState(null), O = l.useRef(null), at = l.useRef(null), [ee, se] = l.useState(
    (h == null ? void 0 : h.defaultExpandedRowIds) ?? []
  ), [ct, ie] = l.useState({}), [C, mt] = l.useState(null), vt = l.useRef(0), kt = l.useRef(0), [re, Wt] = l.useState(
    () => y.map((t) => t.accessorKey)
  );
  l.useEffect(() => {
    !j || rt || Wt((t) => {
      const i = y.map((d) => d.accessorKey), r = t.filter((d) => i.includes(d)), n = i.filter((d) => !r.includes(d)), g = [...r, ...n];
      return g.length === t.length && g.every((d, k) => d === t[k]) ? t : g;
    });
  }, [y, j, rt]);
  const V = rt ?? re, ne = l.useMemo(() => j ? V.map((t) => y.find((i) => i.accessorKey === t)).filter((t) => t !== void 0) : y, [y, V, j]), ae = me(
    At(Ne, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    At(We, {
      coordinateGetter: Ee
    })
  ), Nt = l.useCallback(
    (t) => {
      const { active: i, over: r } = t;
      if (!r || i.id === r.id) return;
      const n = V.findIndex((k) => String(k) === i.id), g = V.findIndex((k) => String(k) === r.id);
      if (n === -1 || g === -1) return;
      const d = jt(V, n, g);
      nt ? nt(d) : Wt(d);
    },
    [V, nt]
  ), $t = l.useCallback(
    (t) => {
      const { active: i, over: r } = t;
      if (!r || i.id === r.id) return;
      const n = String(i.id).replace(/^row-/, ""), g = String(r.id).replace(/^row-/, ""), d = u.findIndex((E) => String(E.id) === n), k = u.findIndex((E) => String(E.id) === g);
      if (d === -1 || k === -1) return;
      const e = jt(u, d, k);
      Z == null || Z(e);
    },
    [u, Z]
  ), ce = l.useCallback(
    (t) => {
      const { active: i } = t;
      String(i.id).startsWith("row-") ? $t(t) : Nt(t);
    },
    [Nt, $t]
  ), ot = (h == null ? void 0 : h.expandedRowIds) ?? ee, Dt = (h == null ? void 0 : h.onExpandedChange) ?? se, dt = u.length > 0 && D.length === u.length, oe = D.length > 0 && !dt, de = () => {
    dt ? f == null || f([]) : f == null || f(u.map((t) => t.id));
  }, Et = (t) => {
    D.includes(t) ? f == null || f(D.filter((i) => i !== t)) : f == null || f([...D, t]);
  }, le = (t) => {
    S && ((m == null ? void 0 : m.column) === t ? m.direction === "asc" ? S({ column: t, direction: "desc" }) : m.direction === "desc" ? S({ column: null, direction: null }) : S({ column: t, direction: "asc" }) : S({ column: t, direction: "asc" }));
  }, he = (t) => (m == null ? void 0 : m.column) === t ? m.direction : null, _ = (t) => {
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
  }, et = y.length + ($ ? 1 : 0) + (h ? 1 : 0) + (T ? 1 : 0), b = 40, v = 40, A = 32, ht = l.useMemo(() => {
    const t = (a) => {
      const W = a.width ?? a.minWidth;
      if (typeof W == "number") return W;
      const c = parseInt(String(W), 10);
      return Number.isFinite(c) ? c : 150;
    }, i = y.filter((a) => a.sticky === "left"), r = y.filter((a) => a.sticky === "right"), n = T ? A : 0, g = $ ? b : 0, d = h ? v : 0, k = n + g + d, e = /* @__PURE__ */ new Map();
    let E = k;
    for (const a of i)
      e.set(a.accessorKey, E), E += t(a);
    const q = /* @__PURE__ */ new Map();
    let z = 0;
    for (let a = r.length - 1; a >= 0; a--) {
      const W = r[a];
      q.set(W.accessorKey, z), z += t(W);
    }
    const F = i.length > 0 ? i[i.length - 1].accessorKey : null, H = r.length > 0 ? r[0].accessorKey : null;
    return (a, W, c) => {
      if (!a.sticky) return { style: {}, className: "" };
      const P = a.accessorKey === F, xe = a.accessorKey === H, xt = `${t(a)}px`, Tt = {
        position: "sticky",
        zIndex: W ? 20 : 10,
        width: xt,
        minWidth: xt,
        maxWidth: xt
      };
      if (a.sticky === "left") {
        const be = e.get(a.accessorKey) ?? 0;
        return {
          style: {
            ...Tt,
            left: `${be}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: x(
            "transition-colors",
            W ? "bg-[#eaedf1] dark:bg-slate-800" : c ? "bg-blue-50 dark:bg-blue-950/30" : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
            P && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          )
        };
      }
      const ye = q.get(a.accessorKey) ?? 0;
      return {
        style: {
          ...Tt,
          right: `${ye}px`
        },
        className: x(
          "transition-colors",
          W ? "bg-[#eaedf1] dark:bg-slate-800" : c ? "bg-blue-50 dark:bg-blue-950/30" : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
          xe && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [y, $, h]), K = y.some((t) => t.sticky === "left"), Q = l.useCallback(
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
  ), pe = l.useCallback(
    (t, i) => {
      t.preventDefault(), t.stopPropagation(), mt(i.accessorKey), vt.current = t.clientX;
      const r = Q(i) ?? 150;
      kt.current = r;
    },
    [Q]
  ), pt = l.useCallback(
    (t) => {
      if (!C) return;
      const i = t.clientX - vt.current, r = Math.max(50, kt.current + i), n = String(C);
      it ? it(C, r) : ie((g) => ({ ...g, [n]: r }));
    },
    [C, it]
  ), ft = l.useCallback(() => {
    mt(null);
  }, []);
  l.useEffect(() => {
    if (C)
      return document.addEventListener("mousemove", pt), document.addEventListener("mouseup", ft), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", pt), document.removeEventListener("mouseup", ft), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [C, pt, ft]);
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
          C === t.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (e) => pe(e, t),
        onPointerDown: (e) => e.stopPropagation(),
        onClick: (e) => e.stopPropagation()
      }
    );
    return j && !t.sticky && !t.sortable ? /* @__PURE__ */ N(
      Pe,
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
    ) : t.sortable ? /* @__PURE__ */ N(
      He,
      {
        sortDirection: he(t.accessorKey),
        onSort: () => le(t.accessorKey),
        style: g,
        className: x(_(t.align), i.className, G && "relative overflow-visible"),
        children: [
          t.header,
          d
        ]
      },
      String(t.accessorKey)
    ) : /* @__PURE__ */ N(
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
  }, U = j ? ne : y, fe = U.filter((t) => !t.sticky).map((t) => String(t.accessorKey)), ge = u.map((t) => `row-${t.id}`), ue = () => 0, gt = () => T ? A : 0, ut = () => {
    let t = 0;
    return T && (t += A), $ && (t += b), t;
  }, Lt = /* @__PURE__ */ N(Ie, { className: B, maxHeight: Jt, tableLayout: "fixed", children: [
    /* @__PURE__ */ s(Se, { children: /* @__PURE__ */ N(J, { children: [
      T && /* @__PURE__ */ s(
        st,
        {
          className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
          style: K ? {
            position: "sticky",
            left: ue(),
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
      $ && /* @__PURE__ */ s(
        st,
        {
          className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
          style: K ? {
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
              indeterminate: oe,
              onCheckedChange: de,
              "aria-label": "전체 선택"
            }
          ) })
        }
      ),
      h && /* @__PURE__ */ s(
        st,
        {
          className: "bg-[#eaedf1] dark:bg-slate-800",
          style: K ? {
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
      j ? /* @__PURE__ */ s(Gt, { items: fe, strategy: $e, children: U.map(wt) }) : U.map(wt)
    ] }) }),
    /* @__PURE__ */ s(Ke, { children: Qt ? /* @__PURE__ */ s(J, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ s(
      I,
      {
        colSpan: et,
        className: "h-80 text-center",
        children: Ut ?? /* @__PURE__ */ s("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ s(we, { size: 200, className: "text-slate-200 dark:text-slate-700" }) })
      }
    ) }) : u.length === 0 ? /* @__PURE__ */ s(J, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ s(
      I,
      {
        colSpan: et,
        className: "h-24 text-center text-slate-500",
        children: X
      }
    ) }) : T ? /* @__PURE__ */ s(Gt, { items: ge, strategy: De, children: u.map((t) => {
      const i = D.includes(t.id), r = Ht(t), n = lt(t.id), g = `row-${t.id}`, d = (k) => /* @__PURE__ */ N(_t, { children: [
        /* @__PURE__ */ s(
          Bt,
          {
            isSelected: i,
            hasLeftStickyColumns: K,
            dragHandleProps: k
          }
        ),
        $ && /* @__PURE__ */ s(
          I,
          {
            onClick: (e) => e.stopPropagation(),
            className: x(
              "!p-0",
              K && (i ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
            ),
            style: K ? {
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
          I,
          {
            className: x(
              "p-0",
              K && (i ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
            ),
            style: K ? {
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
                children: n ? /* @__PURE__ */ s(Mt, { size: 24 }) : /* @__PURE__ */ s(Ot, { size: 24 })
              }
            )
          }
        ),
        U.map((e) => {
          const E = t[e.accessorKey], q = Kt(t.id, e.accessorKey), z = ht(e, !1, i), F = (c) => typeof c == "number" ? `${c}px` : c, H = {};
          if (!e.sticky) {
            const c = G ? Q(e) : void 0;
            c !== void 0 ? (H.width = `${c}px`, H.minWidth = `${c}px`) : (e.width && (H.width = F(e.width)), e.minWidth && (H.minWidth = F(e.minWidth)));
          }
          const a = { ...H, ...z.style };
          if (q && e.editable) {
            const c = e.editComponent || Ft;
            return /* @__PURE__ */ s(
              I,
              {
                ref: at,
                className: x(_(e.align), "p-1", z.className),
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
          const W = e.cell ? e.cell(E, t) : String(E ?? "");
          return e.editable && w ? /* @__PURE__ */ s(
            I,
            {
              className: x(_(e.align), "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800", z.className),
              style: a,
              onClick: (c) => {
                c.stopPropagation(), setTimeout(() => It(t.id, e.accessorKey, E), 0);
              },
              children: /* @__PURE__ */ N("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ s("span", { className: "flex-1", children: W }),
                /* @__PURE__ */ s(
                  Ct,
                  {
                    size: 14,
                    className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                  }
                )
              ] })
            },
            String(e.accessorKey)
          ) : /* @__PURE__ */ s(
            I,
            {
              className: x(_(e.align), z.className),
              style: a,
              children: W
            },
            String(e.accessorKey)
          );
        })
      ] });
      return /* @__PURE__ */ N(l.Fragment, { children: [
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
          I,
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
      const i = D.includes(t.id), r = Ht(t), n = lt(t.id), g = `row-${t.id}`, d = (k) => /* @__PURE__ */ N(_t, { children: [
        T && /* @__PURE__ */ s(
          Bt,
          {
            isSelected: i,
            hasLeftStickyColumns: K,
            dragHandleProps: k
          }
        ),
        $ && /* @__PURE__ */ s(
          I,
          {
            onClick: (e) => e.stopPropagation(),
            className: x(
              "!p-0",
              K && (i ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
            ),
            style: K ? {
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
          I,
          {
            className: x(
              "p-0",
              K && (i ? "transition-colors bg-blue-50 dark:bg-blue-950/30" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
            ),
            style: K ? {
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
                children: n ? /* @__PURE__ */ s(Mt, { size: 24 }) : /* @__PURE__ */ s(Ot, { size: 24 })
              }
            )
          }
        ),
        U.map((e) => {
          const E = t[e.accessorKey], q = Kt(t.id, e.accessorKey), z = ht(e, !1, i), F = (c) => typeof c == "number" ? `${c}px` : c, H = {};
          if (!e.sticky) {
            const c = G ? Q(e) : void 0;
            c !== void 0 ? (H.width = `${c}px`, H.minWidth = `${c}px`) : (e.width && (H.width = F(e.width)), e.minWidth && (H.minWidth = F(e.minWidth)));
          }
          const a = { ...H, ...z.style };
          if (q && e.editable) {
            const c = e.editComponent || Ft;
            return /* @__PURE__ */ s(
              I,
              {
                ref: at,
                className: x(_(e.align), "p-1", z.className),
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
          const W = e.cell ? e.cell(E, t) : String(E ?? "");
          return e.editable && w ? /* @__PURE__ */ s(
            I,
            {
              className: x(
                _(e.align),
                "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                z.className
              ),
              style: a,
              onClick: (c) => {
                c.stopPropagation(), setTimeout(() => {
                  It(t.id, e.accessorKey, E);
                }, 0);
              },
              children: /* @__PURE__ */ N("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ s("span", { className: "flex-1", children: W }),
                /* @__PURE__ */ s(
                  Ct,
                  {
                    size: 20,
                    className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                  }
                )
              ] })
            },
            String(e.accessorKey)
          ) : /* @__PURE__ */ s(
            I,
            {
              className: x(_(e.align), z.className),
              style: a,
              children: W
            },
            String(e.accessorKey)
          );
        })
      ] });
      return /* @__PURE__ */ N(l.Fragment, { children: [
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
          I,
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
  ] }), Pt = Yt && /* @__PURE__ */ N(
    Le,
    {
      type: "button",
      variant: "ghost",
      className: "w-full justify-center mt-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
      onClick: Zt,
      children: [
        /* @__PURE__ */ s("span", { className: "mr-1 text-lg leading-none", children: "+" }),
        te
      ]
    }
  );
  return j || T ? /* @__PURE__ */ N("div", { children: [
    /* @__PURE__ */ s(
      ve,
      {
        sensors: ae,
        collisionDetection: ke,
        onDragEnd: ce,
        children: Lt
      }
    ),
    Pt
  ] }) : /* @__PURE__ */ N("div", { children: [
    Lt,
    Pt
  ] });
}
export {
  Qe as DataTable
};
//# sourceMappingURL=data-table.mjs.map
