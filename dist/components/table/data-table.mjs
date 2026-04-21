import { jsxs as w, jsx as t, Fragment as bt } from "react/jsx-runtime";
import * as d from "react";
import { useSensors as qt, useSensor as xt, PointerSensor as Jt, KeyboardSensor as Qt, DndContext as Ut, closestCenter as Yt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as Zt, arrayMove as kt, SortableContext as Qe, horizontalListSortingStrategy as vt, verticalListSortingStrategy as Gt, useSortable as Et } from "@dnd-kit/sortable";
import { CSS as Kt } from "@dnd-kit/utilities";
import { cn as v } from "../../lib/utils.mjs";
import { Table as At, TableHeader as es, TableRow as A, TableHead as q, TableBody as ts, TableCell as E, TableSortableHead as ss } from "./table.mjs";
import { Checkbox as we } from "../ui/checkbox.mjs";
import { Input as rs } from "../ui/input.mjs";
import { Skeleton as Ce } from "../ui/skeleton.mjs";
import { SplashScreen as is } from "../ui/splash-screen.mjs";
import { DownIcon as He } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as It } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as ze } from "../../icons/RightIcon.mjs";
import { RowAddIcon as ns } from "../../icons/RowAddIcon.mjs";
import { RowDeleteIcon as Wt } from "../../icons/RowDeleteIcon.mjs";
import { WriteIcon as Nt } from "../../icons/WriteIcon.mjs";
function $t({
  value: D,
  onChange: p,
  onComplete: I,
  onCancel: M,
  error: N
}) {
  const K = d.useRef(null);
  d.useEffect(() => {
    var g, B;
    (g = K.current) == null || g.focus(), (B = K.current) == null || B.select();
  }, []);
  const _ = (g) => {
    g.key === "Enter" ? (g.preventDefault(), I()) : g.key === "Escape" && (g.preventDefault(), M());
  };
  return /* @__PURE__ */ w("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ t(
      rs,
      {
        ref: K,
        value: String(D ?? ""),
        onChange: (g) => p(g.target.value),
        onKeyDown: _,
        error: !!N,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    N && /* @__PURE__ */ t("span", { className: "text-[10px] text-destructive dark:text-red-400", children: N })
  ] });
}
function as({
  id: D,
  children: p,
  className: I,
  style: M,
  disabled: N
}) {
  const {
    attributes: K,
    listeners: _,
    setNodeRef: g,
    transform: B,
    transition: h,
    isDragging: ne
  } = Et({ id: D, disabled: N }), he = {
    ...M,
    transform: Kt.Transform.toString(B),
    transition: h,
    opacity: ne ? 0.5 : 1,
    cursor: N ? void 0 : "grab"
  };
  return /* @__PURE__ */ t(
    "th",
    {
      ref: g,
      style: he,
      className: v(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-600 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        ne && "z-50",
        I
      ),
      ...K,
      ..._,
      children: /* @__PURE__ */ w("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ t(
          It,
          {
            size: 16,
            className: "opacity-30 group-hover/drag:opacity-70 transition-opacity flex-shrink-0"
          }
        ),
        p
      ] })
    }
  );
}
function St({
  id: D,
  children: p,
  className: I,
  isSelected: M,
  onClick: N,
  onMouseEnter: K,
  onMouseLeave: _
}) {
  const {
    setNodeRef: g,
    setActivatorNodeRef: B,
    listeners: h,
    attributes: ne,
    transform: he,
    transition: V,
    isDragging: G
  } = Et({ id: D }), F = {
    transform: Kt.Transform.toString(he),
    transition: V,
    opacity: G ? 0.5 : 1
  };
  return /* @__PURE__ */ t(
    "tr",
    {
      ref: g,
      style: F,
      "data-state": M ? "selected" : void 0,
      className: v(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        G && "z-50 shadow-lg",
        I
      ),
      onClick: N,
      onMouseEnter: K,
      onMouseLeave: _,
      children: typeof p == "function" ? p({ listeners: h, attributes: ne, setActivatorNodeRef: B }) : p
    }
  );
}
function Dt({ isSelected: D, hasLeftStickyColumns: p, dragHandleProps: I }) {
  const { listeners: N, attributes: K, setActivatorNodeRef: _ } = I ?? {};
  return /* @__PURE__ */ t(
    "td",
    {
      className: v(
        "p-0 align-middle",
        p && (D ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
      ),
      style: p ? {
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
      children: /* @__PURE__ */ t(
        "div",
        {
          ref: _,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (g) => g.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...N,
          ...K,
          children: /* @__PURE__ */ t(It, { size: 16 })
        }
      )
    }
  );
}
function Ns({
  columns: D,
  data: p,
  selectable: I = !1,
  selectedIds: M = [],
  onSelectionChange: N,
  sortState: K,
  onSortChange: _,
  onRowClick: g,
  onCellChange: B,
  expandable: h,
  emptyMessage: ne = "데이터가 없습니다.",
  className: he,
  rowClassName: V,
  maxHeight: G,
  resizable: F = !1,
  columnWidths: ye,
  onColumnResize: Me,
  columnReorderable: U = !1,
  columnOrder: Re,
  onColumnReorder: Te,
  rowReorderable: Le = !1,
  onRowReorder: me,
  loading: Ue = !1,
  loadingMode: be = "splash",
  loadingContent: xe,
  headerGroups: $,
  rowGrouping: R,
  rowActions: y
}) {
  const j = R ? !1 : Le, ae = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  d.useEffect(() => {
    ae && R && Le && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [R, Le, ae]), d.useEffect(() => {
    ae && xe && be !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [xe, be, ae]);
  const [b, ee] = d.useState(null), [Ye, le] = d.useState(null), te = d.useRef(null), Pe = d.useRef(null), [wt, Ct] = d.useState(
    (h == null ? void 0 : h.defaultExpandedRowIds) ?? []
  ), [_e, Ht] = d.useState({}), [se, Ze] = d.useState(null), Ge = d.useRef(0), Ae = d.useRef(0), [zt, et] = d.useState(
    () => D.map((e) => e.accessorKey)
  ), [je, oe] = d.useState(null);
  d.useEffect(() => {
    !U || Re || et((e) => {
      const s = D.map((o) => o.accessorKey), i = e.filter((o) => s.includes(o)), l = s.filter((o) => !i.includes(o)), a = [...i, ...l];
      return a.length === e.length && a.every((o, f) => o === e[f]) ? e : a;
    });
  }, [D, U, Re]);
  const ce = Re ?? zt, Mt = d.useMemo(() => U ? ce.map((e) => D.find((s) => s.accessorKey === e)).filter((e) => e !== void 0) : D, [D, ce, U]), ke = d.useMemo(() => {
    if (!$ || $.length === 0) return [];
    const e = new Map(
      D.map((s) => [s.accessorKey, s])
    );
    return $.flatMap((s, i) => {
      const l = s.columns.map((m) => e.get(m)).filter((m) => m !== void 0);
      if (l.length === 0) return [];
      const a = new Set(
        l.map((m) => m.sticky).filter((m) => m !== void 0)
      ), o = a.size > 0, f = l.some((m) => !m.sticky), x = a.size > 1;
      return o && (f || x) ? [
        {
          headerLabel: typeof s.header == "string" || typeof s.header == "number" ? String(s.header) : `#${i + 1}`,
          reason: x ? "left/right sticky 혼합" : "sticky/non-sticky 혼합"
        }
      ] : [];
    });
  }, [$, D]), ve = d.useMemo(
    () => ke.map((e) => `${e.headerLabel}:${e.reason}`).join("|"),
    [ke]
  ), Oe = d.useRef("");
  d.useEffect(() => {
    if (!ae) return;
    if (!ve) {
      Oe.current = "";
      return;
    }
    if (Oe.current === ve) return;
    Oe.current = ve;
    const e = ke.map((s) => `${s.headerLabel}(${s.reason})`).join(", ");
    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. 그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + e
    );
  }, [ve, ke, ae]);
  const Rt = qt(
    xt(Jt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    xt(Qt, {
      coordinateGetter: Zt
    })
  ), tt = d.useCallback(
    (e) => {
      const { active: s, over: i } = e;
      if (!i || s.id === i.id) return;
      const l = ce.findIndex((f) => String(f) === s.id), a = ce.findIndex((f) => String(f) === i.id);
      if (l === -1 || a === -1) return;
      const o = kt(ce, l, a);
      Te ? Te(o) : et(o);
    },
    [ce, Te]
  ), st = d.useCallback(
    (e) => {
      const { active: s, over: i } = e;
      if (!i || s.id === i.id) return;
      const l = String(s.id).replace(/^row-/, ""), a = String(i.id).replace(/^row-/, ""), o = p.findIndex((r) => String(r.id) === l), f = p.findIndex((r) => String(r.id) === a);
      if (o === -1 || f === -1) return;
      const x = kt(p, o, f);
      me == null || me(x);
    },
    [p, me]
  ), Tt = d.useCallback(
    (e) => {
      const { active: s } = e;
      String(s.id).startsWith("row-") ? st(e) : tt(e);
    },
    [tt, st]
  ), We = (h == null ? void 0 : h.expandedRowIds) ?? wt, Ne = (h == null ? void 0 : h.onExpandedChange) ?? Ct, $e = p.length > 0 && M.length === p.length, rt = M.length > 0 && !$e, it = () => {
    $e ? N == null || N([]) : N == null || N(p.map((e) => e.id));
  }, nt = (e) => {
    M.includes(e) ? N == null || N(M.filter((s) => s !== e)) : N == null || N([...M, e]);
  }, Lt = (e) => {
    _ && ((K == null ? void 0 : K.column) === e ? K.direction === "asc" ? _({ column: e, direction: "desc" }) : K.direction === "desc" ? _({ column: null, direction: null }) : _({ column: e, direction: "asc" }) : _({ column: e, direction: "asc" }));
  }, Pt = (e) => (K == null ? void 0 : K.column) === e ? K.direction : null, J = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, at = (e, s, i) => {
    ee({ rowId: e, columnKey: s }), le(i), te.current = i;
  }, lt = (e, s) => {
    const i = te.current;
    if (!b || i === null) {
      ee(null), le(null), te.current = null;
      return;
    }
    if (e.validate) {
      const l = e.validate(i, s);
      if (l !== !0) {
        ee({ ...b, error: l });
        return;
      }
    }
    B && B(b.rowId, b.columnKey, i), ee(null), le(null), te.current = null;
  }, Se = d.useCallback(() => {
    ee(null), le(null), te.current = null;
  }, []);
  d.useEffect(() => {
    if (!b) return;
    const e = (s) => {
      var a, o;
      const i = s.target;
      (a = Pe.current) != null && a.contains(i) || (o = i.closest) != null && o.call(i, "[data-radix-popper-content-wrapper]") || Se();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [b, Se]);
  const ot = (e, s) => (b == null ? void 0 : b.rowId) === e && (b == null ? void 0 : b.columnKey) === s, Be = (e) => h ? h.rowExpandable ? h.rowExpandable(e) : !0 : !1, Ve = (e) => We.includes(e), ct = (e) => {
    Ve(e) ? Ne(We.filter((s) => s !== e)) : Ne([...We, e]);
  }, pe = d.useMemo(() => h ? p.filter((e) => Be(e)).map((e) => e.id) : [], [p, h]), fe = pe.length > 0 && pe.every((e) => We.includes(e)), dt = () => {
    Ne(fe ? [] : pe);
  }, ue = (y == null ? void 0 : y.showDelete) ?? !!(y != null && y.onRowDelete), _t = (y == null ? void 0 : y.showAdd) ?? !!(y != null && y.onRowAdd), T = 40, De = D.length + (I ? 1 : 0) + (h ? 1 : 0) + (j ? 1 : 0) + (ue ? 1 : 0), { rowSpanMap: ht, middleRowSet: Fe } = d.useMemo(() => {
    if (!R) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(R.groupBy) ? R.groupBy : [R.groupBy], s = R.mergeColumns ?? e, i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set();
    for (const a of s) {
      let o = 0;
      for (; o < p.length; ) {
        const f = e.map((n) => p[o][n]), x = p[o][a];
        let r = 1;
        for (let n = o + 1; n < p.length; n++) {
          const m = e.map((H) => p[n][H]), u = p[n][a];
          if (f.every((H, O) => H === m[O]) && x === u)
            r++;
          else
            break;
        }
        i.has(o) || i.set(o, /* @__PURE__ */ new Map()), i.get(o).set(a, r);
        for (let n = o; n < o + r - 1; n++)
          l.add(n);
        for (let n = o + 1; n < o + r; n++)
          i.has(n) || i.set(n, /* @__PURE__ */ new Map()), i.get(n).set(a, 0);
        o += r;
      }
    }
    return { rowSpanMap: i, middleRowSet: l };
  }, [p, R]), pt = (e, s) => {
    if (!ht) return;
    const i = ht.get(e);
    return i ? i.get(s) : void 0;
  }, ft = (e, s) => je === null ? !1 : je >= e && je < e + s, ut = (e, s) => {
    for (let i = e; i < e + s; i++)
      if (i < p.length && M.includes(p[i].id))
        return !0;
    return !1;
  }, k = 40, W = 40, L = 32, de = d.useMemo(() => {
    const e = (u) => {
      const c = u.width ?? u.minWidth;
      if (typeof c == "number") return c;
      const X = parseInt(String(c), 10);
      return Number.isFinite(X) ? X : 150;
    }, s = D.filter((u) => u.sticky === "left"), i = D.filter((u) => u.sticky === "right"), l = j ? L : 0, a = I ? k : 0, o = h ? W : 0, f = l + a + o, x = /* @__PURE__ */ new Map();
    let r = f;
    for (const u of s)
      x.set(u.accessorKey, r), r += e(u);
    const n = /* @__PURE__ */ new Map();
    let m = 0;
    for (let u = i.length - 1; u >= 0; u--) {
      const c = i[u];
      n.set(c.accessorKey, m), m += e(c);
    }
    return (u, c, X, H) => {
      if (!u.sticky) return { style: {}, className: "" };
      const Y = `${e(u)}px`, P = {
        position: "sticky",
        zIndex: c ? 20 : 10,
        width: Y,
        minWidth: Y,
        maxWidth: Y
      }, Q = H ?? X;
      if (u.sticky === "left") {
        const ge = x.get(u.accessorKey) ?? 0;
        return {
          style: {
            ...P,
            left: `${ge}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: v(
            "transition-colors",
            c ? "bg-slate-100 dark:bg-slate-800" : Q ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
          )
        };
      }
      const ie = n.get(u.accessorKey) ?? 0;
      return {
        style: {
          ...P,
          right: `${ie}px`
        },
        className: v(
          "transition-colors",
          c ? "bg-slate-100 dark:bg-slate-800" : Q ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
        )
      };
    };
  }, [D, I, h]), z = D.some((e) => e.sticky === "left"), re = d.useCallback(
    (e) => {
      const s = String(e.accessorKey);
      if (ye && s in ye)
        return ye[s];
      if (s in _e)
        return _e[s];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [ye, _e]
  ), jt = d.useCallback(
    (e, s) => {
      e.preventDefault(), e.stopPropagation(), Ze(s.accessorKey), Ge.current = e.clientX;
      const i = re(s) ?? 150;
      Ae.current = i;
    },
    [re]
  ), Xe = d.useCallback(
    (e) => {
      if (!se) return;
      const s = e.clientX - Ge.current, i = Math.max(50, Ae.current + s), l = String(se);
      Me ? Me(se, i) : Ht((a) => ({ ...a, [l]: i }));
    },
    [se, Me]
  ), qe = d.useCallback(() => {
    Ze(null);
  }, []);
  d.useEffect(() => {
    if (se)
      return document.addEventListener("mousemove", Xe), document.addEventListener("mouseup", qe), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", Xe), document.removeEventListener("mouseup", qe), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [se, Xe, qe]);
  const Ee = (e) => {
    const s = de(e, !0), i = (n) => typeof n == "number" ? `${n}px` : n, l = {};
    if (!e.sticky) {
      const n = F ? re(e) : void 0;
      n !== void 0 ? (l.width = `${n}px`, l.minWidth = `${n}px`) : (e.width && (l.width = i(e.width)), e.minWidth && (l.minWidth = i(e.minWidth)));
    }
    const a = { ...l, ...s.style }, f = Ft.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", x = F && /* @__PURE__ */ t(
      "div",
      {
        className: v(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          se === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (n) => jt(n, e),
        onPointerDown: (n) => n.stopPropagation(),
        onClick: (n) => n.stopPropagation()
      }
    );
    return U && !e.sticky && !e.sortable ? /* @__PURE__ */ w(
      as,
      {
        id: String(e.accessorKey),
        style: a,
        className: v(J(e.align), s.className, F && "relative overflow-visible", f),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ w(
      ss,
      {
        sortDirection: Pt(e.accessorKey),
        onSort: () => Lt(e.accessorKey),
        style: a,
        className: v(J(e.align), s.className, F && "relative overflow-visible", f),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ w(
      q,
      {
        style: a,
        className: v(J(e.align), s.className, F && "relative overflow-visible", f),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    );
  }, C = U ? Mt : D, gt = C.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Ot = p.map((e) => `row-${e.id}`), Bt = () => 0, Je = () => j ? L : 0, Ke = () => {
    let e = 0;
    return j && (e += L), I && (e += k), e;
  }, Vt = d.useCallback(
    (e) => C.filter(
      (s) => e.columns.includes(s.accessorKey)
    ).length,
    [C]
  ), Ie = d.useMemo(() => $ ? new Set($.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [$]), Ft = d.useMemo(() => {
    if (!$ || $.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), s = (l) => $.findIndex((a) => a.columns.includes(l.accessorKey)), i = C.filter((l) => Ie.has(l.accessorKey));
    for (let l = 0; l < i.length - 1; l++) {
      const a = i[l], o = i[l + 1], f = s(a), x = s(o);
      f !== x && e.add(a.accessorKey);
    }
    return e;
  }, [$, C, Ie]), Xt = d.useCallback(
    (e) => {
      const s = C.filter((n) => e.columns.includes(n.accessorKey));
      if (s.length === 0) return { style: {}, className: "" };
      const i = s.every((n) => n.sticky === "left"), l = s.every((n) => n.sticky === "right");
      if (!i && !l) return { style: {}, className: "" };
      const a = i ? s[0] : s[s.length - 1], o = de(a, !0), f = (n) => {
        const m = F ? re(n) : void 0;
        if (m !== void 0) return m;
        const u = n.width ?? n.minWidth;
        if (typeof u == "number") return u;
        const c = parseInt(String(u), 10);
        return Number.isFinite(c) ? c : 150;
      }, r = `${s.reduce((n, m) => n + f(m), 0)}px`;
      return {
        style: {
          ...o.style,
          width: r,
          minWidth: r,
          maxWidth: r
        },
        className: o.className
      };
    },
    [C, de, re, F]
  ), yt = d.useMemo(() => {
    if (!$ || $.length === 0) return [];
    const e = [], s = /* @__PURE__ */ new Set();
    for (const i of C) {
      const l = $.findIndex((a) => a.columns.includes(i.accessorKey));
      l !== -1 ? s.has(l) || (s.add(l), e.push({ type: "group", group: $[l] })) : e.push({ type: "standalone", col: i });
    }
    return e;
  }, [$, C]), mt = /* @__PURE__ */ w(At, { className: he, maxHeight: G, children: [
    /* @__PURE__ */ w(es, { children: [
      $ && $.length > 0 && /* @__PURE__ */ w(A, { children: [
        j && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${L}px`,
              minWidth: `${L}px`,
              ...z && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        I && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              ...z && { position: "sticky", left: j ? L : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              we,
              {
                checked: $e,
                indeterminate: rt,
                onCheckedChange: it,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        h && /* @__PURE__ */ t(
          q,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${W}px`,
              minWidth: `${W}px`,
              ...z && { position: "sticky", left: Ke(), zIndex: 20 }
            },
            children: (h == null ? void 0 : h.showExpandAll) !== !1 && pe.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: dt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": fe ? "모두 접기" : "모두 펼치기",
                children: fe ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(ze, { size: 24 })
              }
            )
          }
        ),
        ue && /* @__PURE__ */ t(
          q,
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
        yt.map((e, s) => {
          const i = yt[s + 1], l = e.type === "group" && (i == null ? void 0 : i.type) === "group";
          if (e.type === "group") {
            const a = Vt(e.group);
            if (a === 0) return null;
            const o = Xt(e.group);
            return /* @__PURE__ */ t(
              q,
              {
                colSpan: a,
                className: v(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  l && "border-r border-slate-200 dark:border-slate-700",
                  o.className
                ),
                style: o.style,
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const a = de(e.col, !0);
            return /* @__PURE__ */ t(
              q,
              {
                rowSpan: 2,
                className: v(
                  J(e.col.align),
                  "bg-slate-100 dark:bg-slate-800 border-b-0",
                  a.className
                ),
                style: a.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            );
          }
        })
      ] }),
      /* @__PURE__ */ w(A, { children: [
        !$ && j && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: z ? {
              position: "sticky",
              left: Bt(),
              zIndex: 20,
              width: `${L}px`,
              minWidth: `${L}px`,
              maxWidth: `${L}px`
            } : {
              width: `${L}px`,
              minWidth: `${L}px`,
              maxWidth: `${L}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !$ && I && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: z ? {
              position: "sticky",
              left: Je(),
              zIndex: 20,
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            } : {
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              we,
              {
                checked: $e,
                indeterminate: rt,
                onCheckedChange: it,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !$ && h && /* @__PURE__ */ t(
          q,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: z ? {
              position: "sticky",
              left: Ke(),
              zIndex: 20,
              width: `${W}px`,
              minWidth: `${W}px`,
              maxWidth: `${W}px`
            } : {
              width: `${W}px`,
              minWidth: `${W}px`,
              maxWidth: `${W}px`
            },
            "aria-label": "확장",
            children: (h == null ? void 0 : h.showExpandAll) !== !1 && pe.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: dt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": fe ? "모두 접기" : "모두 펼치기",
                children: fe ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(ze, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !$ && ue && /* @__PURE__ */ t(
          q,
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
        $ ? U ? /* @__PURE__ */ t(Qe, { items: gt, strategy: vt, children: C.filter((e) => Ie.has(e.accessorKey)).map(Ee) }) : C.filter((e) => Ie.has(e.accessorKey)).map(Ee) : U ? /* @__PURE__ */ t(Qe, { items: gt, strategy: vt, children: C.map(Ee) }) : C.map(Ee)
      ] })
    ] }),
    /* @__PURE__ */ w(ts, { children: [
      Ue ? /* @__PURE__ */ t(A, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        E,
        {
          colSpan: De,
          className: v(
            "text-center",
            xe || be !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: xe ?? (be === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const s = typeof G == "number" ? G : typeof G == "string" && parseInt(G, 10) || 320, i = Math.max(1, Math.floor(s / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: i }).map((l, a) => /* @__PURE__ */ w(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    j && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(Ce, { width: 16, height: 16 }) }),
                    I && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(Ce, { width: 18, height: 18 }) }),
                    h && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(Ce, { width: 18, height: 18 }) }),
                    C.map((o) => {
                      const f = o.width ?? o.minWidth, x = typeof f == "number" ? Math.min(f * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(Ce, { height: 16, width: x }) }, String(o.accessorKey));
                    })
                  ]
                },
                a
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본)
            /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ t(is, { size: "lg" }) })
          ))
        }
      ) }) : p.length === 0 ? /* @__PURE__ */ t(A, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        E,
        {
          colSpan: De,
          className: "h-24 text-center text-slate-500",
          children: ne
        }
      ) }) : j ? /* @__PURE__ */ t(Qe, { items: Ot, strategy: Gt, children: p.map((e, s) => {
        const i = M.includes(e.id), l = Be(e), a = Ve(e.id), o = `row-${e.id}`, f = (x) => /* @__PURE__ */ w(bt, { children: [
          /* @__PURE__ */ t(
            Dt,
            {
              isSelected: i,
              hasLeftStickyColumns: z,
              dragHandleProps: x
            }
          ),
          I && /* @__PURE__ */ t(
            E,
            {
              onClick: (r) => r.stopPropagation(),
              className: v(
                "!p-0",
                z && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Je(),
                zIndex: 10,
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              } : {
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              },
              children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
                we,
                {
                  checked: i,
                  onCheckedChange: () => nt(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          h && /* @__PURE__ */ t(
            E,
            {
              className: v(
                "p-0",
                z && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Ke(),
                zIndex: 10,
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
              } : {
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
              },
              onClick: (r) => r.stopPropagation(),
              children: l && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => ct(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(ze, { size: 24 })
                }
              )
            }
          ),
          ue && /* @__PURE__ */ t(
            E,
            {
              className: "!p-0",
              style: {
                width: `${T}px`,
                minWidth: `${T}px`,
                maxWidth: `${T}px`
              },
              onClick: (r) => r.stopPropagation(),
              children: /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var r;
                    return (r = y == null ? void 0 : y.onRowDelete) == null ? void 0 : r.call(y, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(Wt, { size: 20 })
                }
              )
            }
          ),
          C.map((r) => {
            const n = pt(s, r.accessorKey);
            if (n === 0) return null;
            const m = e[r.accessorKey], u = ot(e.id, r.accessorKey), c = n !== void 0 && n > 1, X = c && ft(s, n), H = c && ut(s, n), O = de(r, !1, i, c ? H : void 0), Y = (S) => typeof S == "number" ? `${S}px` : S, P = {};
            if (!r.sticky) {
              const S = F ? re(r) : void 0;
              S !== void 0 ? (P.width = `${S}px`, P.minWidth = `${S}px`) : (r.width && (P.width = Y(r.width)), r.minWidth && (P.minWidth = Y(r.minWidth)));
            }
            const Q = { ...P, ...O.style };
            if (u && r.editable) {
              const S = r.editComponent || $t;
              return /* @__PURE__ */ t(
                E,
                {
                  ref: Pe,
                  className: v(J(r.align), "p-1 overflow-hidden break-all", O.className),
                  style: Q,
                  onClick: (Z) => Z.stopPropagation(),
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ t(
                    S,
                    {
                      value: Ye,
                      onChange: (Z) => {
                        le(Z), te.current = Z, b != null && b.error && ee({ ...b, error: void 0 });
                      },
                      onComplete: () => lt(r, e),
                      onCancel: Se,
                      row: e,
                      error: b == null ? void 0 : b.error
                    }
                  )
                },
                String(r.accessorKey)
              );
            }
            const ie = r.cell ? r.cell(m, e) : String(m ?? "");
            if (r.editable && B)
              return /* @__PURE__ */ t(
                E,
                {
                  className: v(
                    J(r.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    c && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    c && H && "bg-blue-50 dark:bg-blue-900",
                    c && !H && X && "bg-slate-100 dark:bg-slate-800",
                    O.className
                  ),
                  style: Q,
                  onClick: (S) => {
                    S.stopPropagation(), setTimeout(() => at(e.id, r.accessorKey, m), 0);
                  },
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ w("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: ie }),
                    /* @__PURE__ */ t(
                      Nt,
                      {
                        size: 14,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(r.accessorKey)
              );
            const ge = c && s + n >= p.length;
            return /* @__PURE__ */ t(
              E,
              {
                className: v(
                  J(r.align),
                  c && "align-middle transition-colors",
                  c && !ge && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  c && H && "bg-blue-50 dark:bg-blue-900",
                  c && !H && X && "bg-slate-100 dark:bg-slate-800",
                  O.className
                ),
                style: Q,
                rowSpan: c ? n : void 0,
                children: ie
              },
              String(r.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ w(d.Fragment, { children: [
          /* @__PURE__ */ t(
            St,
            {
              id: o,
              isSelected: i,
              className: v(g && "cursor-pointer", V == null ? void 0 : V(e)),
              onClick: () => g == null ? void 0 : g(e),
              onMouseEnter: R ? () => oe(s) : void 0,
              onMouseLeave: R ? () => oe(null) : void 0,
              children: (x) => f(x)
            }
          ),
          h && a && /* @__PURE__ */ t(A, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            E,
            {
              colSpan: De,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: "100%",
                    maxWidth: "100vw"
                  },
                  children: h.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : p.map((e, s) => {
        const i = M.includes(e.id), l = Be(e), a = Ve(e.id), o = `row-${e.id}`, f = (x) => /* @__PURE__ */ w(bt, { children: [
          j && /* @__PURE__ */ t(
            Dt,
            {
              isSelected: i,
              hasLeftStickyColumns: z,
              dragHandleProps: x
            }
          ),
          I && /* @__PURE__ */ t(
            E,
            {
              onClick: (r) => r.stopPropagation(),
              className: v(
                "!p-0",
                z && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Je(),
                zIndex: 10,
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              } : {
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              },
              children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
                we,
                {
                  checked: i,
                  onCheckedChange: () => nt(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          h && /* @__PURE__ */ t(
            E,
            {
              className: v(
                "p-0",
                z && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Ke(),
                zIndex: 10,
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
              } : {
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
              },
              onClick: (r) => r.stopPropagation(),
              children: l && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => ct(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(ze, { size: 24 })
                }
              )
            }
          ),
          ue && /* @__PURE__ */ t(
            E,
            {
              className: "!p-0",
              style: {
                width: `${T}px`,
                minWidth: `${T}px`,
                maxWidth: `${T}px`
              },
              onClick: (r) => r.stopPropagation(),
              children: /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var r;
                    return (r = y == null ? void 0 : y.onRowDelete) == null ? void 0 : r.call(y, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(Wt, { size: 20 })
                }
              )
            }
          ),
          C.map((r) => {
            const n = pt(s, r.accessorKey);
            if (n === 0) return null;
            const m = e[r.accessorKey], u = ot(e.id, r.accessorKey), c = n !== void 0 && n > 1, X = c && ft(s, n), H = c && ut(s, n), O = de(r, !1, i, c ? H : void 0), Y = (S) => typeof S == "number" ? `${S}px` : S, P = {};
            if (!r.sticky) {
              const S = F ? re(r) : void 0;
              S !== void 0 ? (P.width = `${S}px`, P.minWidth = `${S}px`) : (r.width && (P.width = Y(r.width)), r.minWidth && (P.minWidth = Y(r.minWidth)));
            }
            const Q = { ...P, ...O.style };
            if (u && r.editable) {
              const S = r.editComponent || $t;
              return /* @__PURE__ */ t(
                E,
                {
                  ref: Pe,
                  className: v(J(r.align), "p-1 overflow-hidden break-all", O.className),
                  style: Q,
                  onClick: (Z) => Z.stopPropagation(),
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ t(
                    S,
                    {
                      value: Ye,
                      onChange: (Z) => {
                        le(Z), te.current = Z, b != null && b.error && ee({ ...b, error: void 0 });
                      },
                      onComplete: () => lt(r, e),
                      onCancel: Se,
                      row: e,
                      error: b == null ? void 0 : b.error
                    }
                  )
                },
                String(r.accessorKey)
              );
            }
            const ie = r.cell ? r.cell(m, e) : String(m ?? "");
            if (r.editable && B)
              return /* @__PURE__ */ t(
                E,
                {
                  className: v(
                    J(r.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    c && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    c && H && "bg-blue-50 dark:bg-blue-900",
                    c && !H && X && "bg-slate-100 dark:bg-slate-800",
                    O.className
                  ),
                  style: Q,
                  onClick: (S) => {
                    S.stopPropagation(), setTimeout(() => {
                      at(e.id, r.accessorKey, m);
                    }, 0);
                  },
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ w("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: ie }),
                    /* @__PURE__ */ t(
                      Nt,
                      {
                        size: 20,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(r.accessorKey)
              );
            const ge = c && s + n >= p.length;
            return /* @__PURE__ */ t(
              E,
              {
                className: v(
                  J(r.align),
                  c && "align-middle transition-colors",
                  c && !ge && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  c && H && "bg-blue-50 dark:bg-blue-900",
                  c && !H && X && "bg-slate-100 dark:bg-slate-800",
                  O.className
                ),
                style: Q,
                rowSpan: c ? n : void 0,
                children: ie
              },
              String(r.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ w(d.Fragment, { children: [
          j ? /* @__PURE__ */ t(
            St,
            {
              id: o,
              isSelected: i,
              className: v(g && "cursor-pointer", V == null ? void 0 : V(e)),
              onClick: () => g == null ? void 0 : g(e),
              onMouseEnter: R ? () => oe(s) : void 0,
              onMouseLeave: R ? () => oe(null) : void 0,
              children: (x) => f(x)
            }
          ) : /* @__PURE__ */ t(
            A,
            {
              "data-state": i ? "selected" : void 0,
              className: v(
                g && "cursor-pointer",
                (Fe == null ? void 0 : Fe.has(s)) && "border-b-0",
                V == null ? void 0 : V(e)
              ),
              onClick: () => g == null ? void 0 : g(e),
              onMouseEnter: R ? () => oe(s) : void 0,
              onMouseLeave: R ? () => oe(null) : void 0,
              children: f()
            }
          ),
          h && a && /* @__PURE__ */ t(A, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            E,
            {
              colSpan: De,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ t(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: "100%",
                    maxWidth: "100vw"
                  },
                  children: h.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      _t && !Ue && /* @__PURE__ */ w(A, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        j && /* @__PURE__ */ t(
          E,
          {
            className: "!p-0",
            style: {
              width: `${L}px`,
              minWidth: `${L}px`,
              maxWidth: `${L}px`
            }
          }
        ),
        I && /* @__PURE__ */ t(
          E,
          {
            className: "!p-0",
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            }
          }
        ),
        h && /* @__PURE__ */ t(
          E,
          {
            className: "!p-0",
            style: {
              width: `${W}px`,
              minWidth: `${W}px`,
              maxWidth: `${W}px`
            }
          }
        ),
        /* @__PURE__ */ t(
          E,
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
                  return (e = y == null ? void 0 : y.onRowAdd) == null ? void 0 : e.call(y);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(ns, { size: 20 })
              }
            )
          }
        ),
        C.map((e) => /* @__PURE__ */ t(
          E,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return U || j ? /* @__PURE__ */ t(
    Ut,
    {
      sensors: Rt,
      collisionDetection: Yt,
      onDragEnd: Tt,
      children: mt
    }
  ) : mt;
}
export {
  Ns as DataTable
};
//# sourceMappingURL=data-table.mjs.map
