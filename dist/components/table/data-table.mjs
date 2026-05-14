import { jsxs as H, jsx as t, Fragment as Wt } from "react/jsx-runtime";
import * as d from "react";
import { useSensors as Zt, useSensor as $t, PointerSensor as Gt, KeyboardSensor as At, DndContext as es, closestCenter as ts } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as ss, arrayMove as Dt, SortableContext as Ue, horizontalListSortingStrategy as Et, verticalListSortingStrategy as rs, useSortable as Rt } from "@dnd-kit/sortable";
import { CSS as Ct } from "@dnd-kit/utilities";
import { cn as k } from "../../lib/utils.mjs";
import { Table as is, TableHeader as ns, TableRow as re, TableHead as q, TableSortableHead as Kt, TableBody as as, TableCell as K } from "./table.mjs";
import { Checkbox as Ie } from "../ui/checkbox.mjs";
import { Input as ls } from "../ui/input.mjs";
import { Skeleton as ze } from "../ui/skeleton.mjs";
import { SplashScreen as os } from "../ui/splash-screen.mjs";
import { DownIcon as Me } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as Tt } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as He } from "../../icons/RightIcon.mjs";
import { RowAddIcon as cs } from "../../icons/RowAddIcon.mjs";
import { RowDeleteIcon as wt } from "../../icons/RowDeleteIcon.mjs";
import { WriteIcon as It } from "../../icons/WriteIcon.mjs";
function zt({
  value: S,
  onChange: h,
  onComplete: w,
  onCancel: T,
  error: W
}) {
  const I = d.useRef(null);
  d.useEffect(() => {
    var m, j;
    (m = I.current) == null || m.focus(), (j = I.current) == null || j.select();
  }, []);
  const V = (m) => {
    m.key === "Enter" ? (m.preventDefault(), w()) : m.key === "Escape" && (m.preventDefault(), T());
  };
  return /* @__PURE__ */ H("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ t(
      ls,
      {
        ref: I,
        value: String(S ?? ""),
        onChange: (m) => h(m.target.value),
        onKeyDown: V,
        onBlur: w,
        error: !!W,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    W && /* @__PURE__ */ t("span", { className: "text-[10px] text-destructive dark:text-red-400", children: W })
  ] });
}
function ds({
  id: S,
  children: h,
  className: w,
  style: T,
  disabled: W
}) {
  const {
    attributes: I,
    listeners: V,
    setNodeRef: m,
    transform: j,
    transition: p,
    isDragging: oe
  } = Rt({ id: S, disabled: W }), ue = {
    ...T,
    transform: Ct.Transform.toString(j),
    transition: p,
    opacity: oe ? 0.5 : 1,
    cursor: W ? void 0 : "grab"
  };
  return /* @__PURE__ */ t(
    "th",
    {
      ref: m,
      style: ue,
      className: k(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-600 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        oe && "z-50",
        w
      ),
      ...I,
      ...V,
      children: /* @__PURE__ */ H("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ t(
          Tt,
          {
            size: 16,
            className: "opacity-30 group-hover/drag:opacity-70 transition-opacity flex-shrink-0"
          }
        ),
        h
      ] })
    }
  );
}
function Mt({
  id: S,
  children: h,
  className: w,
  isSelected: T,
  onClick: W,
  onMouseEnter: I,
  onMouseLeave: V
}) {
  const {
    setNodeRef: m,
    setActivatorNodeRef: j,
    listeners: p,
    attributes: oe,
    transform: ue,
    transition: J,
    isDragging: ee
  } = Rt({ id: S }), Q = {
    transform: Ct.Transform.toString(ue),
    transition: J,
    opacity: ee ? 0.5 : 1
  };
  return /* @__PURE__ */ t(
    "tr",
    {
      ref: m,
      style: Q,
      "data-state": T ? "selected" : void 0,
      className: k(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        ee && "z-50 shadow-lg",
        w
      ),
      onClick: W,
      onMouseEnter: I,
      onMouseLeave: V,
      children: typeof h == "function" ? h({ listeners: p, attributes: oe, setActivatorNodeRef: j }) : h
    }
  );
}
function Ht({ isSelected: S, hasLeftStickyColumns: h, dragHandleProps: w }) {
  const { listeners: W, attributes: I, setActivatorNodeRef: V } = w ?? {};
  return /* @__PURE__ */ t(
    "td",
    {
      className: k(
        "p-0 align-middle",
        h && (S ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
      ),
      style: h ? {
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
          ref: V,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (m) => m.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...W,
          ...I,
          children: /* @__PURE__ */ t(Tt, { size: 16 })
        }
      )
    }
  );
}
function Es({
  columns: S,
  data: h,
  selectable: w = !1,
  selectedIds: T = [],
  onSelectionChange: W,
  sortState: I,
  onSortChange: V,
  onRowClick: m,
  onCellChange: j,
  expandable: p,
  emptyMessage: oe = "데이터가 없습니다.",
  className: ue,
  rowClassName: J,
  maxHeight: ee,
  resizable: Q = !1,
  columnWidths: me,
  onColumnResize: Re,
  columnReorderable: Y = !1,
  columnOrder: Ce,
  onColumnReorder: Te,
  rowReorderable: Le = !1,
  onRowReorder: be,
  loading: Ye = !1,
  loadingMode: xe = "splash",
  loadingContent: ke,
  headerGroups: $,
  rowGrouping: L,
  rowActions: b
}) {
  const F = L ? !1 : Le, ce = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  d.useEffect(() => {
    ce && L && Le && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [L, Le, ce]), d.useEffect(() => {
    ce && ke && xe !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [ke, xe, ce]);
  const [g, te] = d.useState(null), [Ze, ie] = d.useState(null), Z = d.useRef(null), Pe = d.useRef(null), Ge = d.useRef(null), [se, Lt] = d.useState(0);
  d.useEffect(() => {
    const e = Ge.current;
    if (!e) return;
    const s = () => Lt(e.clientWidth);
    s();
    const r = new ResizeObserver(s);
    return r.observe(e), () => r.disconnect();
  }, []);
  const [Pt, _t] = d.useState(
    (p == null ? void 0 : p.defaultExpandedRowIds) ?? []
  ), [_e, jt] = d.useState({}), [ne, Ae] = d.useState(null), et = d.useRef(0), tt = d.useRef(0), [Ot, st] = d.useState(
    () => S.map((e) => e.accessorKey)
  ), [je, de] = d.useState(null);
  d.useEffect(() => {
    !Y || Ce || st((e) => {
      const s = S.map((o) => o.accessorKey), r = e.filter((o) => s.includes(o)), l = s.filter((o) => !r.includes(o)), a = [...r, ...l];
      return a.length === e.length && a.every((o, y) => o === e[y]) ? e : a;
    });
  }, [S, Y, Ce]);
  const he = Ce ?? Ot, Bt = d.useMemo(() => Y ? he.map((e) => S.find((s) => s.accessorKey === e)).filter((e) => e !== void 0) : S, [S, he, Y]), ve = d.useMemo(() => {
    if (!$ || $.length === 0) return [];
    const e = new Map(
      S.map((s) => [s.accessorKey, s])
    );
    return $.flatMap((s, r) => {
      const l = s.columns.map((u) => e.get(u)).filter((u) => u !== void 0);
      if (l.length === 0) return [];
      const a = new Set(
        l.map((u) => u.sticky).filter((u) => u !== void 0)
      ), o = a.size > 0, y = l.some((u) => !u.sticky), x = a.size > 1;
      return o && (y || x) ? [
        {
          headerLabel: typeof s.header == "string" || typeof s.header == "number" ? String(s.header) : `#${r + 1}`,
          reason: x ? "left/right sticky 혼합" : "sticky/non-sticky 혼합"
        }
      ] : [];
    });
  }, [$, S]), Se = d.useMemo(
    () => ve.map((e) => `${e.headerLabel}:${e.reason}`).join("|"),
    [ve]
  ), Oe = d.useRef("");
  d.useEffect(() => {
    if (!ce) return;
    if (!Se) {
      Oe.current = "";
      return;
    }
    if (Oe.current === Se) return;
    Oe.current = Se;
    const e = ve.map((s) => `${s.headerLabel}(${s.reason})`).join(", ");
    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. 그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + e
    );
  }, [Se, ve, ce]);
  const Vt = Zt(
    $t(Gt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    $t(At, {
      coordinateGetter: ss
    })
  ), rt = d.useCallback(
    (e) => {
      const { active: s, over: r } = e;
      if (!r || s.id === r.id) return;
      const l = he.findIndex((y) => String(y) === s.id), a = he.findIndex((y) => String(y) === r.id);
      if (l === -1 || a === -1) return;
      const o = Dt(he, l, a);
      Te ? Te(o) : st(o);
    },
    [he, Te]
  ), it = d.useCallback(
    (e) => {
      const { active: s, over: r } = e;
      if (!r || s.id === r.id) return;
      const l = String(s.id).replace(/^row-/, ""), a = String(r.id).replace(/^row-/, ""), o = h.findIndex((i) => String(i.id) === l), y = h.findIndex((i) => String(i.id) === a);
      if (o === -1 || y === -1) return;
      const x = Dt(h, o, y);
      be == null || be(x);
    },
    [h, be]
  ), Ft = d.useCallback(
    (e) => {
      const { active: s } = e;
      String(s.id).startsWith("row-") ? it(e) : rt(e);
    },
    [rt, it]
  ), Ne = (p == null ? void 0 : p.expandedRowIds) ?? Pt, We = (p == null ? void 0 : p.onExpandedChange) ?? _t, $e = h.length > 0 && T.length === h.length, nt = T.length > 0 && !$e, at = () => {
    $e ? W == null || W([]) : W == null || W(h.map((e) => e.id));
  }, lt = (e) => {
    T.includes(e) ? W == null || W(T.filter((s) => s !== e)) : W == null || W([...T, e]);
  }, ot = (e) => {
    V && ((I == null ? void 0 : I.column) === e ? I.direction === "asc" ? V({ column: e, direction: "desc" }) : I.direction === "desc" ? V({ column: null, direction: null }) : V({ column: e, direction: "asc" }) : V({ column: e, direction: "asc" }));
  }, ct = (e) => (I == null ? void 0 : I.column) === e ? I.direction : null, U = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, dt = (e, s, r) => {
    te({ rowId: e, columnKey: s }), ie(r), Z.current = r;
  }, Be = (e, s) => {
    const r = Z.current;
    if (!g || r === null) {
      te(null), ie(null), Z.current = null;
      return;
    }
    if (e.validate) {
      const l = e.validate(r, s);
      if (l !== !0) {
        te({ ...g, error: l });
        return;
      }
    }
    j && j(g.rowId, g.columnKey, r), te(null), ie(null), Z.current = null;
  }, ht = d.useCallback(() => {
    if (!g) return;
    const e = S.find((r) => r.accessorKey === g.columnKey), s = h.find((r) => r.id === g.rowId);
    if (e && s)
      Be(e, s);
    else {
      const r = Z.current;
      r !== null && j && j(g.rowId, g.columnKey, r), te(null), ie(null), Z.current = null;
    }
  }, [g, S, h, j]), pt = d.useCallback(() => {
    te(null), ie(null), Z.current = null;
  }, []);
  d.useEffect(() => {
    if (!g) return;
    const e = (s) => {
      var a, o;
      const r = s.target;
      (a = Pe.current) != null && a.contains(r) || (o = r.closest) != null && o.call(r, "[data-radix-popper-content-wrapper]") || ht();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [g, ht]);
  const ut = (e, s) => (g == null ? void 0 : g.rowId) === e && (g == null ? void 0 : g.columnKey) === s, Ve = (e) => p ? p.rowExpandable ? p.rowExpandable(e) : !0 : !1, Fe = (e) => Ne.includes(e), ft = (e) => {
    Fe(e) ? We(Ne.filter((s) => s !== e)) : We([...Ne, e]);
  }, fe = d.useMemo(() => p ? h.filter((e) => Ve(e)).map((e) => e.id) : [], [h, p]), ge = fe.length > 0 && fe.every((e) => Ne.includes(e)), gt = () => {
    We(ge ? [] : fe);
  }, ye = (b == null ? void 0 : b.showDelete) ?? !!(b != null && b.onRowDelete), Xt = (b == null ? void 0 : b.showAdd) ?? !!(b != null && b.onRowAdd), P = 40, De = S.length + (w ? 1 : 0) + (p ? 1 : 0) + (F ? 1 : 0) + (ye ? 1 : 0), { rowSpanMap: yt, middleRowSet: Xe } = d.useMemo(() => {
    if (!L) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(L.groupBy) ? L.groupBy : [L.groupBy], s = L.mergeColumns ?? e, r = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set();
    for (const a of s) {
      let o = 0;
      for (; o < h.length; ) {
        const y = e.map((n) => h[o][n]), x = h[o][a];
        let i = 1;
        for (let n = o + 1; n < h.length; n++) {
          const u = e.map((z) => h[n][z]), f = h[n][a];
          if (y.every((z, D) => z === u[D]) && x === f)
            i++;
          else
            break;
        }
        r.has(o) || r.set(o, /* @__PURE__ */ new Map()), r.get(o).set(a, i);
        for (let n = o; n < o + i - 1; n++)
          l.add(n);
        for (let n = o + 1; n < o + i; n++)
          r.has(n) || r.set(n, /* @__PURE__ */ new Map()), r.get(n).set(a, 0);
        o += i;
      }
    }
    return { rowSpanMap: r, middleRowSet: l };
  }, [h, L]), mt = (e, s) => {
    if (!yt) return;
    const r = yt.get(e);
    return r ? r.get(s) : void 0;
  }, bt = (e, s) => je === null ? !1 : je >= e && je < e + s, xt = (e, s) => {
    for (let r = e; r < e + s; r++)
      if (r < h.length && T.includes(h[r].id))
        return !0;
    return !1;
  }, v = 40, N = 40, _ = 32, pe = d.useMemo(() => {
    const e = (f) => {
      const c = f.width ?? f.minWidth;
      if (typeof c == "number") return c;
      const O = parseInt(String(c), 10);
      return Number.isFinite(O) ? O : 150;
    }, s = S.filter((f) => f.sticky === "left"), r = S.filter((f) => f.sticky === "right"), l = F ? _ : 0, a = w ? v : 0, o = p ? N : 0, y = l + a + o, x = /* @__PURE__ */ new Map();
    let i = y;
    for (const f of s)
      x.set(f.accessorKey, i), i += e(f);
    const n = /* @__PURE__ */ new Map();
    let u = 0;
    for (let f = r.length - 1; f >= 0; f--) {
      const c = r[f];
      n.set(c.accessorKey, u), u += e(c);
    }
    return (f, c, O, z) => {
      if (!f.sticky) return { style: {}, className: "" };
      const X = `${e(f)}px`, C = {
        position: "sticky",
        zIndex: c ? 20 : 10,
        width: X,
        minWidth: X,
        maxWidth: X
      }, B = z ?? O;
      if (f.sticky === "left") {
        const le = x.get(f.accessorKey) ?? 0;
        return {
          style: {
            ...C,
            left: `${le}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: k(
            "transition-colors",
            c ? "bg-slate-100 dark:bg-slate-800" : B ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
          )
        };
      }
      const G = n.get(f.accessorKey) ?? 0;
      return {
        style: {
          ...C,
          right: `${G}px`
        },
        className: k(
          "transition-colors",
          c ? "bg-slate-100 dark:bg-slate-800" : B ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
        )
      };
    };
  }, [S, w, p]), R = S.some((e) => e.sticky === "left"), ae = d.useCallback(
    (e) => {
      const s = String(e.accessorKey);
      if (me && s in me)
        return me[s];
      if (s in _e)
        return _e[s];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [me, _e]
  ), qt = d.useCallback(
    (e, s) => {
      e.preventDefault(), e.stopPropagation(), Ae(s.accessorKey), et.current = e.clientX;
      const r = ae(s) ?? 150;
      tt.current = r;
    },
    [ae]
  ), qe = d.useCallback(
    (e) => {
      if (!ne) return;
      const s = e.clientX - et.current, r = Math.max(50, tt.current + s), l = String(ne);
      Re ? Re(ne, r) : jt((a) => ({ ...a, [l]: r }));
    },
    [ne, Re]
  ), Je = d.useCallback(() => {
    Ae(null);
  }, []);
  d.useEffect(() => {
    if (ne)
      return document.addEventListener("mousemove", qe), document.addEventListener("mouseup", Je), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", qe), document.removeEventListener("mouseup", Je), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [ne, qe, Je]);
  const Ee = (e) => {
    const s = pe(e, !0), r = (n) => typeof n == "number" ? `${n}px` : n, l = {};
    if (!e.sticky) {
      const n = Q ? ae(e) : void 0;
      n !== void 0 ? (l.width = `${n}px`, l.minWidth = `${n}px`) : (e.width && (l.width = r(e.width)), e.minWidth && (l.minWidth = r(e.minWidth)));
    }
    const a = { ...l, ...s.style }, y = Yt.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", x = Q && /* @__PURE__ */ t(
      "div",
      {
        className: k(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          ne === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (n) => qt(n, e),
        onPointerDown: (n) => n.stopPropagation(),
        onClick: (n) => n.stopPropagation()
      }
    );
    return Y && !e.sticky && !e.sortable ? /* @__PURE__ */ H(
      ds,
      {
        id: String(e.accessorKey),
        style: a,
        className: k(U(e.align), s.className, Q && "relative overflow-visible", y),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ H(
      Kt,
      {
        sortDirection: ct(e.accessorKey),
        onSort: () => ot(e.accessorKey),
        style: a,
        className: k(U(e.align), s.className, Q && "relative overflow-visible", y),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ H(
      q,
      {
        style: a,
        className: k(U(e.align), s.className, Q && "relative overflow-visible", y),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    );
  }, M = Y ? Bt : S, kt = M.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Jt = h.map((e) => `row-${e.id}`), Qt = () => 0, Qe = () => F ? _ : 0, Ke = () => {
    let e = 0;
    return F && (e += _), w && (e += v), e;
  }, Ut = d.useCallback(
    (e) => M.filter(
      (s) => e.columns.includes(s.accessorKey)
    ).length,
    [M]
  ), we = d.useMemo(() => $ ? new Set($.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [$]), Yt = d.useMemo(() => {
    if (!$ || $.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), s = (l) => $.findIndex((a) => a.columns.includes(l.accessorKey)), r = M.filter((l) => we.has(l.accessorKey));
    for (let l = 0; l < r.length - 1; l++) {
      const a = r[l], o = r[l + 1], y = s(a), x = s(o);
      y !== x && e.add(a.accessorKey);
    }
    return e;
  }, [$, M, we]), vt = d.useCallback(
    (e) => {
      const s = M.filter((n) => e.columns.includes(n.accessorKey));
      if (s.length === 0) return { style: {}, className: "" };
      const r = s.every((n) => n.sticky === "left"), l = s.every((n) => n.sticky === "right");
      if (!r && !l) return { style: {}, className: "" };
      const a = r ? s[0] : s[s.length - 1], o = pe(a, !0), y = (n) => {
        const u = Q ? ae(n) : void 0;
        if (u !== void 0) return u;
        const f = n.width ?? n.minWidth;
        if (typeof f == "number") return f;
        const c = parseInt(String(f), 10);
        return Number.isFinite(c) ? c : 150;
      }, i = `${s.reduce((n, u) => n + y(u), 0)}px`;
      return {
        style: {
          ...o.style,
          width: i,
          minWidth: i,
          maxWidth: i
        },
        className: o.className
      };
    },
    [M, pe, ae, Q]
  ), St = d.useMemo(() => {
    if (!$ || $.length === 0) return [];
    const e = [], s = /* @__PURE__ */ new Set();
    for (const r of M) {
      const l = $.findIndex((a) => a.columns.includes(r.accessorKey));
      l !== -1 ? s.has(l) || (s.add(l), e.push({ type: "group", group: $[l] })) : e.push({ type: "standalone", col: r });
    }
    return e;
  }, [$, M]), Nt = /* @__PURE__ */ H(is, { className: ue, maxHeight: ee, wrapperRef: Ge, children: [
    /* @__PURE__ */ H(ns, { children: [
      $ && $.length > 0 && /* @__PURE__ */ H(re, { children: [
        F && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${_}px`,
              minWidth: `${_}px`,
              ...R && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        w && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${v}px`,
              minWidth: `${v}px`,
              ...R && { position: "sticky", left: F ? _ : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              Ie,
              {
                checked: $e,
                indeterminate: nt,
                onCheckedChange: at,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        p && /* @__PURE__ */ t(
          q,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${N}px`,
              minWidth: `${N}px`,
              ...R && { position: "sticky", left: Ke(), zIndex: 20 }
            },
            children: (p == null ? void 0 : p.showExpandAll) !== !1 && fe.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: gt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": ge ? "모두 접기" : "모두 펼치기",
                children: ge ? /* @__PURE__ */ t(Me, { size: 24 }) : /* @__PURE__ */ t(He, { size: 24 })
              }
            )
          }
        ),
        ye && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${P}px`,
              minWidth: `${P}px`,
              maxWidth: `${P}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        St.map((e, s) => {
          const r = St[s + 1], l = e.type === "group" && (r == null ? void 0 : r.type) === "group";
          if (e.type === "group") {
            const a = Ut(e.group);
            if (a === 0) return null;
            const o = M.filter(
              (u) => e.group.columns.includes(u.accessorKey)
            );
            if (new Set(
              o.map((u) => u.sticky ?? "none")
            ).size > 1) {
              const u = [];
              let f = [], c = o[0].sticky;
              for (const D of o)
                D.sticky === c ? f.push(D) : (f.length > 0 && u.push({ cols: f, sticky: c }), f = [D], c = D.sticky);
              f.length > 0 && u.push({ cols: f, sticky: c });
              const O = u.findIndex((D) => !D.sticky), z = O !== -1 ? O : 0;
              return u.map((D, X) => {
                const C = {
                  header: e.group.header,
                  columns: D.cols.map((le) => le.accessorKey),
                  align: e.group.align
                }, B = D.sticky ? vt(C) : { style: {}, className: "" }, G = !!B.style.position;
                return /* @__PURE__ */ t(
                  q,
                  {
                    colSpan: D.cols.length,
                    className: k(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      l && X === u.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      B.className
                    ),
                    style: G ? B.style : { position: "relative", zIndex: 0 },
                    children: X === z ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${X}`
                );
              });
            }
            const i = vt(e.group), n = !!i.style.position;
            return /* @__PURE__ */ t(
              q,
              {
                colSpan: a,
                className: k(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  l && "border-r border-slate-200 dark:border-slate-700",
                  i.className
                ),
                style: n ? i.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const a = pe(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ t(
              Kt,
              {
                rowSpan: 2,
                sortDirection: ct(e.col.accessorKey),
                onSort: () => ot(e.col.accessorKey),
                className: k(
                  U(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  a.className
                ),
                style: a.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ t(
              q,
              {
                rowSpan: 2,
                className: k(
                  U(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
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
      /* @__PURE__ */ H(re, { children: [
        !$ && F && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: R ? {
              position: "sticky",
              left: Qt(),
              zIndex: 20,
              width: `${_}px`,
              minWidth: `${_}px`,
              maxWidth: `${_}px`
            } : {
              width: `${_}px`,
              minWidth: `${_}px`,
              maxWidth: `${_}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !$ && w && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: R ? {
              position: "sticky",
              left: Qe(),
              zIndex: 20,
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            } : {
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              Ie,
              {
                checked: $e,
                indeterminate: nt,
                onCheckedChange: at,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !$ && p && /* @__PURE__ */ t(
          q,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: R ? {
              position: "sticky",
              left: Ke(),
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
            children: (p == null ? void 0 : p.showExpandAll) !== !1 && fe.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: gt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": ge ? "모두 접기" : "모두 펼치기",
                children: ge ? /* @__PURE__ */ t(Me, { size: 24 }) : /* @__PURE__ */ t(He, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !$ && ye && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${P}px`,
              minWidth: `${P}px`,
              maxWidth: `${P}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        $ ? Y ? /* @__PURE__ */ t(Ue, { items: kt, strategy: Et, children: M.filter((e) => we.has(e.accessorKey)).map(Ee) }) : M.filter((e) => we.has(e.accessorKey)).map(Ee) : Y ? /* @__PURE__ */ t(Ue, { items: kt, strategy: Et, children: M.map(Ee) }) : M.map(Ee)
      ] })
    ] }),
    /* @__PURE__ */ H(as, { children: [
      Ye ? /* @__PURE__ */ t(re, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        K,
        {
          colSpan: De,
          className: k(
            "text-center",
            ke || xe !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: ke ?? (xe === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const s = typeof ee == "number" ? ee : typeof ee == "string" && parseInt(ee, 10) || 320, r = Math.max(1, Math.floor(s / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: r }).map((l, a) => /* @__PURE__ */ H(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    F && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(ze, { width: 16, height: 16 }) }),
                    w && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ze, { width: 18, height: 18 }) }),
                    p && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ze, { width: 18, height: 18 }) }),
                    M.map((o) => {
                      const y = o.width ?? o.minWidth, x = typeof y == "number" ? Math.min(y * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(ze, { height: 16, width: x }) }, String(o.accessorKey));
                    })
                  ]
                },
                a
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본) - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: se ? { width: se } : void 0,
                children: /* @__PURE__ */ t(os, { size: "lg" })
              }
            )
          ))
        }
      ) }) : h.length === 0 ? /* @__PURE__ */ t(re, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        K,
        {
          colSpan: De,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: se ? { width: se } : void 0,
              children: oe
            }
          )
        }
      ) }) : F ? /* @__PURE__ */ t(Ue, { items: Jt, strategy: rs, children: h.map((e, s) => {
        const r = T.includes(e.id), l = Ve(e), a = Fe(e.id), o = `row-${e.id}`, y = (x) => /* @__PURE__ */ H(Wt, { children: [
          /* @__PURE__ */ t(
            Ht,
            {
              isSelected: r,
              hasLeftStickyColumns: R,
              dragHandleProps: x
            }
          ),
          w && /* @__PURE__ */ t(
            K,
            {
              onClick: (i) => i.stopPropagation(),
              className: k(
                "!p-0",
                R && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: R ? {
                position: "sticky",
                left: Qe(),
                zIndex: 10,
                width: `${v}px`,
                minWidth: `${v}px`,
                maxWidth: `${v}px`
              } : {
                width: `${v}px`,
                minWidth: `${v}px`,
                maxWidth: `${v}px`
              },
              children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
                Ie,
                {
                  checked: r,
                  onCheckedChange: () => lt(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          p && /* @__PURE__ */ t(
            K,
            {
              className: k(
                "p-0",
                R && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: R ? {
                position: "sticky",
                left: Ke(),
                zIndex: 10,
                width: `${N}px`,
                minWidth: `${N}px`,
                maxWidth: `${N}px`
              } : {
                width: `${N}px`,
                minWidth: `${N}px`,
                maxWidth: `${N}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: l && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => ft(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(Me, { size: 24 }) : /* @__PURE__ */ t(He, { size: 24 })
                }
              )
            }
          ),
          ye && /* @__PURE__ */ t(
            K,
            {
              className: "!p-0",
              style: {
                width: `${P}px`,
                minWidth: `${P}px`,
                maxWidth: `${P}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var i;
                    return (i = b == null ? void 0 : b.onRowDelete) == null ? void 0 : i.call(b, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(wt, { size: 20 })
                }
              )
            }
          ),
          M.map((i) => {
            const n = mt(s, i.accessorKey);
            if (n === 0) return null;
            const u = e[i.accessorKey], f = ut(e.id, i.accessorKey), c = n !== void 0 && n > 1, O = c && bt(s, n), z = c && xt(s, n), D = pe(i, !1, r, c ? z : void 0), X = (E) => typeof E == "number" ? `${E}px` : E, C = {};
            if (!i.sticky) {
              const E = Q ? ae(i) : void 0;
              E !== void 0 ? (C.width = `${E}px`, C.minWidth = `${E}px`) : (i.width && (C.width = X(i.width)), i.minWidth && (C.minWidth = X(i.minWidth)));
            }
            const B = { ...C, ...D.style };
            if (f && i.editable) {
              const E = i.editComponent || zt;
              return /* @__PURE__ */ t(
                K,
                {
                  ref: Pe,
                  className: k(U(i.align), "p-1 overflow-hidden", D.className),
                  style: B,
                  onClick: (A) => A.stopPropagation(),
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ t(
                    E,
                    {
                      value: Ze,
                      onChange: (A) => {
                        ie(A), Z.current = A, g != null && g.error && te({ ...g, error: void 0 });
                      },
                      onComplete: () => Be(i, e),
                      onCancel: pt,
                      row: e,
                      error: g == null ? void 0 : g.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const G = i.cell ? i.cell(u, e) : String(u ?? "");
            if (i.editable && j)
              return /* @__PURE__ */ t(
                K,
                {
                  className: k(
                    U(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    c && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    c && z && "bg-blue-50 dark:bg-blue-900",
                    c && !z && O && "bg-slate-100 dark:bg-slate-800",
                    D.className
                  ),
                  style: B,
                  onClick: (E) => {
                    E.stopPropagation(), setTimeout(() => dt(e.id, i.accessorKey, u), 0);
                  },
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ H("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: G }),
                    /* @__PURE__ */ t(
                      It,
                      {
                        size: 14,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const le = c && s + n >= h.length;
            return /* @__PURE__ */ t(
              K,
              {
                className: k(
                  U(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  c && "align-middle transition-colors",
                  c && !le && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  c && z && "bg-blue-50 dark:bg-blue-900",
                  c && !z && O && "bg-slate-100 dark:bg-slate-800",
                  D.className
                ),
                style: B,
                rowSpan: c ? n : void 0,
                children: G
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ H(d.Fragment, { children: [
          /* @__PURE__ */ t(
            Mt,
            {
              id: o,
              isSelected: r,
              className: k(m && "cursor-pointer", J == null ? void 0 : J(e)),
              onClick: () => m == null ? void 0 : m(e),
              onMouseEnter: L ? () => de(s) : void 0,
              onMouseLeave: L ? () => de(null) : void 0,
              children: (x) => y(x)
            }
          ),
          p && a && /* @__PURE__ */ t(re, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            K,
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
                    width: se ? `${se}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: p.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : h.map((e, s) => {
        const r = T.includes(e.id), l = Ve(e), a = Fe(e.id), o = `row-${e.id}`, y = (x) => /* @__PURE__ */ H(Wt, { children: [
          F && /* @__PURE__ */ t(
            Ht,
            {
              isSelected: r,
              hasLeftStickyColumns: R,
              dragHandleProps: x
            }
          ),
          w && /* @__PURE__ */ t(
            K,
            {
              onClick: (i) => i.stopPropagation(),
              className: k(
                "!p-0",
                R && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: R ? {
                position: "sticky",
                left: Qe(),
                zIndex: 10,
                width: `${v}px`,
                minWidth: `${v}px`,
                maxWidth: `${v}px`
              } : {
                width: `${v}px`,
                minWidth: `${v}px`,
                maxWidth: `${v}px`
              },
              children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
                Ie,
                {
                  checked: r,
                  onCheckedChange: () => lt(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          p && /* @__PURE__ */ t(
            K,
            {
              className: k(
                "p-0",
                R && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: R ? {
                position: "sticky",
                left: Ke(),
                zIndex: 10,
                width: `${N}px`,
                minWidth: `${N}px`,
                maxWidth: `${N}px`
              } : {
                width: `${N}px`,
                minWidth: `${N}px`,
                maxWidth: `${N}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: l && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => ft(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(Me, { size: 24 }) : /* @__PURE__ */ t(He, { size: 24 })
                }
              )
            }
          ),
          ye && /* @__PURE__ */ t(
            K,
            {
              className: "!p-0",
              style: {
                width: `${P}px`,
                minWidth: `${P}px`,
                maxWidth: `${P}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var i;
                    return (i = b == null ? void 0 : b.onRowDelete) == null ? void 0 : i.call(b, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(wt, { size: 20 })
                }
              )
            }
          ),
          M.map((i) => {
            const n = mt(s, i.accessorKey);
            if (n === 0) return null;
            const u = e[i.accessorKey], f = ut(e.id, i.accessorKey), c = n !== void 0 && n > 1, O = c && bt(s, n), z = c && xt(s, n), D = pe(i, !1, r, c ? z : void 0), X = (E) => typeof E == "number" ? `${E}px` : E, C = {};
            if (!i.sticky) {
              const E = Q ? ae(i) : void 0;
              E !== void 0 ? (C.width = `${E}px`, C.minWidth = `${E}px`) : (i.width && (C.width = X(i.width)), i.minWidth && (C.minWidth = X(i.minWidth)));
            }
            const B = { ...C, ...D.style };
            if (f && i.editable) {
              const E = i.editComponent || zt;
              return /* @__PURE__ */ t(
                K,
                {
                  ref: Pe,
                  className: k(U(i.align), "p-1 overflow-hidden", D.className),
                  style: B,
                  onClick: (A) => A.stopPropagation(),
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ t(
                    E,
                    {
                      value: Ze,
                      onChange: (A) => {
                        ie(A), Z.current = A, g != null && g.error && te({ ...g, error: void 0 });
                      },
                      onComplete: () => Be(i, e),
                      onCancel: pt,
                      row: e,
                      error: g == null ? void 0 : g.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const G = i.cell ? i.cell(u, e) : String(u ?? "");
            if (i.editable && j)
              return /* @__PURE__ */ t(
                K,
                {
                  className: k(
                    U(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    c && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    c && z && "bg-blue-50 dark:bg-blue-900",
                    c && !z && O && "bg-slate-100 dark:bg-slate-800",
                    D.className
                  ),
                  style: B,
                  onClick: (E) => {
                    E.stopPropagation(), setTimeout(() => {
                      dt(e.id, i.accessorKey, u);
                    }, 0);
                  },
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ H("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: G }),
                    /* @__PURE__ */ t(
                      It,
                      {
                        size: 20,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const le = c && s + n >= h.length;
            return /* @__PURE__ */ t(
              K,
              {
                className: k(
                  U(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  c && "align-middle transition-colors",
                  c && !le && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  c && z && "bg-blue-50 dark:bg-blue-900",
                  c && !z && O && "bg-slate-100 dark:bg-slate-800",
                  D.className
                ),
                style: B,
                rowSpan: c ? n : void 0,
                children: G
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ H(d.Fragment, { children: [
          F ? /* @__PURE__ */ t(
            Mt,
            {
              id: o,
              isSelected: r,
              className: k(m && "cursor-pointer", J == null ? void 0 : J(e)),
              onClick: () => m == null ? void 0 : m(e),
              onMouseEnter: L ? () => de(s) : void 0,
              onMouseLeave: L ? () => de(null) : void 0,
              children: (x) => y(x)
            }
          ) : /* @__PURE__ */ t(
            re,
            {
              "data-state": r ? "selected" : void 0,
              className: k(
                m && "cursor-pointer",
                (Xe == null ? void 0 : Xe.has(s)) && "border-b-0",
                J == null ? void 0 : J(e)
              ),
              onClick: () => m == null ? void 0 : m(e),
              onMouseEnter: L ? () => de(s) : void 0,
              onMouseLeave: L ? () => de(null) : void 0,
              children: y()
            }
          ),
          p && a && /* @__PURE__ */ t(re, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            K,
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
                    width: se ? `${se}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: p.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      Xt && !Ye && /* @__PURE__ */ H(re, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        F && /* @__PURE__ */ t(
          K,
          {
            className: "!p-0",
            style: {
              width: `${_}px`,
              minWidth: `${_}px`,
              maxWidth: `${_}px`
            }
          }
        ),
        w && /* @__PURE__ */ t(
          K,
          {
            className: "!p-0",
            style: {
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            }
          }
        ),
        p && /* @__PURE__ */ t(
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
              width: `${P}px`,
              minWidth: `${P}px`,
              maxWidth: `${P}px`
            },
            children: /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  var e;
                  return (e = b == null ? void 0 : b.onRowAdd) == null ? void 0 : e.call(b);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(cs, { size: 20 })
              }
            )
          }
        ),
        M.map((e) => /* @__PURE__ */ t(
          K,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return Y || F ? /* @__PURE__ */ t(
    es,
    {
      sensors: Vt,
      collisionDetection: ts,
      onDragEnd: Ft,
      children: Nt
    }
  ) : Nt;
}
export {
  Es as DataTable
};
//# sourceMappingURL=data-table.mjs.map
