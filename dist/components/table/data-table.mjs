import { jsxs as I, jsx as t, Fragment as Nt } from "react/jsx-runtime";
import * as c from "react";
import { useSensors as Zt, useSensor as St, PointerSensor as Gt, KeyboardSensor as At, DndContext as es, closestCenter as ts } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as ss, arrayMove as $t, SortableContext as Ue, horizontalListSortingStrategy as Dt, verticalListSortingStrategy as rs, useSortable as Rt } from "@dnd-kit/sortable";
import { CSS as Mt } from "@dnd-kit/utilities";
import { cn as k } from "../../lib/utils.mjs";
import { Table as is, TableHeader as ns, TableRow as se, TableHead as J, TableSortableHead as Et, TableBody as as, TableCell as E } from "./table.mjs";
import { Checkbox as Ie } from "../ui/checkbox.mjs";
import { Input as ls } from "../ui/input.mjs";
import { Skeleton as ze } from "../ui/skeleton.mjs";
import { SplashScreen as os } from "../ui/splash-screen.mjs";
import { DownIcon as He } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as Ct } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as Re } from "../../icons/RightIcon.mjs";
import { RowAddIcon as cs } from "../../icons/RowAddIcon.mjs";
import { RowDeleteIcon as Kt } from "../../icons/RowDeleteIcon.mjs";
import { WriteIcon as wt } from "../../icons/WriteIcon.mjs";
function It({
  value: W,
  onChange: h,
  onComplete: K,
  onCancel: M,
  error: S
}) {
  const w = c.useRef(null);
  c.useEffect(() => {
    var y, P;
    (y = w.current) == null || y.focus(), (P = w.current) == null || P.select();
  }, []);
  const j = (y) => {
    y.key === "Enter" ? (y.preventDefault(), K()) : y.key === "Escape" && (y.preventDefault(), M());
  };
  return /* @__PURE__ */ I("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ t(
      ls,
      {
        ref: w,
        value: String(W ?? ""),
        onChange: (y) => h(y.target.value),
        onKeyDown: j,
        onBlur: K,
        error: !!S,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    S && /* @__PURE__ */ t("span", { className: "text-[10px] text-destructive dark:text-red-400", children: S })
  ] });
}
function ds({
  id: W,
  children: h,
  className: K,
  style: M,
  disabled: S
}) {
  const {
    attributes: w,
    listeners: j,
    setNodeRef: y,
    transform: P,
    transition: p,
    isDragging: le
  } = Rt({ id: W, disabled: S }), pe = {
    ...M,
    transform: Mt.Transform.toString(P),
    transition: p,
    opacity: le ? 0.5 : 1,
    cursor: S ? void 0 : "grab"
  };
  return /* @__PURE__ */ t(
    "th",
    {
      ref: y,
      style: pe,
      className: k(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-600 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        le && "z-50",
        K
      ),
      ...w,
      ...j,
      children: /* @__PURE__ */ I("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ t(
          Ct,
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
function zt({
  id: W,
  children: h,
  className: K,
  isSelected: M,
  onClick: S,
  onMouseEnter: w,
  onMouseLeave: j
}) {
  const {
    setNodeRef: y,
    setActivatorNodeRef: P,
    listeners: p,
    attributes: le,
    transform: pe,
    transition: V,
    isDragging: A
  } = Rt({ id: W }), F = {
    transform: Mt.Transform.toString(pe),
    transition: V,
    opacity: A ? 0.5 : 1
  };
  return /* @__PURE__ */ t(
    "tr",
    {
      ref: y,
      style: F,
      "data-state": M ? "selected" : void 0,
      className: k(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        A && "z-50 shadow-lg",
        K
      ),
      onClick: S,
      onMouseEnter: w,
      onMouseLeave: j,
      children: typeof h == "function" ? h({ listeners: p, attributes: le, setActivatorNodeRef: P }) : h
    }
  );
}
function Ht({ isSelected: W, hasLeftStickyColumns: h, dragHandleProps: K }) {
  const { listeners: S, attributes: w, setActivatorNodeRef: j } = K ?? {};
  return /* @__PURE__ */ t(
    "td",
    {
      className: k(
        "p-0 align-middle",
        h && (W ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
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
          ref: j,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (y) => y.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...S,
          ...w,
          children: /* @__PURE__ */ t(Ct, { size: 16 })
        }
      )
    }
  );
}
function Es({
  columns: W,
  data: h,
  selectable: K = !1,
  selectedIds: M = [],
  onSelectionChange: S,
  sortState: w,
  onSortChange: j,
  onRowClick: y,
  onCellChange: P,
  expandable: p,
  emptyMessage: le = "데이터가 없습니다.",
  className: pe,
  rowClassName: V,
  maxHeight: A,
  resizable: F = !1,
  columnWidths: me,
  onColumnResize: Me,
  columnReorderable: U = !1,
  columnOrder: Ce,
  onColumnReorder: Te,
  rowReorderable: Le = !1,
  onRowReorder: be,
  loading: Ye = !1,
  loadingMode: xe = "splash",
  loadingContent: ke,
  headerGroups: $,
  rowGrouping: C,
  rowActions: m
}) {
  const O = C ? !1 : Le, oe = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  c.useEffect(() => {
    oe && C && Le && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [C, Le, oe]), c.useEffect(() => {
    oe && ke && xe !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [ke, xe, oe]);
  const [f, ee] = c.useState(null), [Ze, re] = c.useState(null), Y = c.useRef(null), Pe = c.useRef(null), Ge = c.useRef(null), [te, Tt] = c.useState(0);
  c.useEffect(() => {
    const e = Ge.current;
    if (!e) return;
    const s = () => Tt(e.clientWidth);
    s();
    const r = new ResizeObserver(s);
    return r.observe(e), () => r.disconnect();
  }, []);
  const [Lt, Pt] = c.useState(
    (p == null ? void 0 : p.defaultExpandedRowIds) ?? []
  ), [_e, _t] = c.useState({}), [ie, Ae] = c.useState(null), et = c.useRef(0), tt = c.useRef(0), [jt, st] = c.useState(
    () => W.map((e) => e.accessorKey)
  ), [je, ce] = c.useState(null);
  c.useEffect(() => {
    !U || Ce || st((e) => {
      const s = W.map((o) => o.accessorKey), r = e.filter((o) => s.includes(o)), l = s.filter((o) => !r.includes(o)), a = [...r, ...l];
      return a.length === e.length && a.every((o, u) => o === e[u]) ? e : a;
    });
  }, [W, U, Ce]);
  const de = Ce ?? jt, Ot = c.useMemo(() => U ? de.map((e) => W.find((s) => s.accessorKey === e)).filter((e) => e !== void 0) : W, [W, de, U]), ve = c.useMemo(() => {
    if (!$ || $.length === 0) return [];
    const e = new Map(
      W.map((s) => [s.accessorKey, s])
    );
    return $.flatMap((s, r) => {
      const l = s.columns.map((b) => e.get(b)).filter((b) => b !== void 0);
      if (l.length === 0) return [];
      const a = new Set(
        l.map((b) => b.sticky).filter((b) => b !== void 0)
      ), o = a.size > 0, u = l.some((b) => !b.sticky), x = a.size > 1;
      return o && (u || x) ? [
        {
          headerLabel: typeof s.header == "string" || typeof s.header == "number" ? String(s.header) : `#${r + 1}`,
          reason: x ? "left/right sticky 혼합" : "sticky/non-sticky 혼합"
        }
      ] : [];
    });
  }, [$, W]), We = c.useMemo(
    () => ve.map((e) => `${e.headerLabel}:${e.reason}`).join("|"),
    [ve]
  ), Oe = c.useRef("");
  c.useEffect(() => {
    if (!oe) return;
    if (!We) {
      Oe.current = "";
      return;
    }
    if (Oe.current === We) return;
    Oe.current = We;
    const e = ve.map((s) => `${s.headerLabel}(${s.reason})`).join(", ");
    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. 그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + e
    );
  }, [We, ve, oe]);
  const Bt = Zt(
    St(Gt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    St(At, {
      coordinateGetter: ss
    })
  ), rt = c.useCallback(
    (e) => {
      const { active: s, over: r } = e;
      if (!r || s.id === r.id) return;
      const l = de.findIndex((u) => String(u) === s.id), a = de.findIndex((u) => String(u) === r.id);
      if (l === -1 || a === -1) return;
      const o = $t(de, l, a);
      Te ? Te(o) : st(o);
    },
    [de, Te]
  ), it = c.useCallback(
    (e) => {
      const { active: s, over: r } = e;
      if (!r || s.id === r.id) return;
      const l = String(s.id).replace(/^row-/, ""), a = String(r.id).replace(/^row-/, ""), o = h.findIndex((i) => String(i.id) === l), u = h.findIndex((i) => String(i.id) === a);
      if (o === -1 || u === -1) return;
      const x = $t(h, o, u);
      be == null || be(x);
    },
    [h, be]
  ), Vt = c.useCallback(
    (e) => {
      const { active: s } = e;
      String(s.id).startsWith("row-") ? it(e) : rt(e);
    },
    [rt, it]
  ), Ne = (p == null ? void 0 : p.expandedRowIds) ?? Lt, Se = (p == null ? void 0 : p.onExpandedChange) ?? Pt, $e = h.length > 0 && M.length === h.length, nt = M.length > 0 && !$e, at = () => {
    $e ? S == null || S([]) : S == null || S(h.map((e) => e.id));
  }, lt = (e) => {
    M.includes(e) ? S == null || S(M.filter((s) => s !== e)) : S == null || S([...M, e]);
  }, ot = (e) => {
    j && ((w == null ? void 0 : w.column) === e ? w.direction === "asc" ? j({ column: e, direction: "desc" }) : w.direction === "desc" ? j({ column: null, direction: null }) : j({ column: e, direction: "asc" }) : j({ column: e, direction: "asc" }));
  }, ct = (e) => (w == null ? void 0 : w.column) === e ? w.direction : null, X = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, dt = (e, s, r) => {
    ee({ rowId: e, columnKey: s }), re(r), Y.current = r;
  }, Be = (e, s) => {
    const r = Y.current;
    if (!f || r === null) {
      ee(null), re(null), Y.current = null;
      return;
    }
    if (e.validate) {
      const l = e.validate(r, s);
      if (l !== !0) {
        ee({ ...f, error: l });
        return;
      }
    }
    P && P(f.rowId, f.columnKey, r), ee(null), re(null), Y.current = null;
  }, ht = c.useCallback(() => {
    if (!f) return;
    const e = W.find((r) => r.accessorKey === f.columnKey), s = h.find((r) => r.id === f.rowId);
    if (e && s)
      Be(e, s);
    else {
      const r = Y.current;
      r !== null && P && P(f.rowId, f.columnKey, r), ee(null), re(null), Y.current = null;
    }
  }, [f, W, h, P]), pt = c.useCallback(() => {
    ee(null), re(null), Y.current = null;
  }, []);
  c.useEffect(() => {
    if (!f) return;
    const e = (s) => {
      var a, o;
      const r = s.target;
      (a = Pe.current) != null && a.contains(r) || (o = r.closest) != null && o.call(r, "[data-radix-popper-content-wrapper]") || ht();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [f, ht]);
  const ft = (e, s) => (f == null ? void 0 : f.rowId) === e && (f == null ? void 0 : f.columnKey) === s, Ve = (e) => p ? p.rowExpandable ? p.rowExpandable(e) : !0 : !1, Fe = (e) => Ne.includes(e), ut = (e) => {
    Fe(e) ? Se(Ne.filter((s) => s !== e)) : Se([...Ne, e]);
  }, fe = c.useMemo(() => p ? h.filter((e) => Ve(e)).map((e) => e.id) : [], [h, p]), ue = fe.length > 0 && fe.every((e) => Ne.includes(e)), gt = () => {
    Se(ue ? [] : fe);
  }, ge = (m == null ? void 0 : m.showDelete) ?? !!(m != null && m.onRowDelete), Ft = (m == null ? void 0 : m.showAdd) ?? !!(m != null && m.onRowAdd), T = 40, De = W.length + (K ? 1 : 0) + (p ? 1 : 0) + (O ? 1 : 0) + (ge ? 1 : 0), { rowSpanMap: yt, middleRowSet: Xe } = c.useMemo(() => {
    if (!C) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(C.groupBy) ? C.groupBy : [C.groupBy], s = C.mergeColumns ?? e, r = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set();
    for (const a of s) {
      let o = 0;
      for (; o < h.length; ) {
        const u = e.map((n) => h[o][n]), x = h[o][a];
        let i = 1;
        for (let n = o + 1; n < h.length; n++) {
          const b = e.map((H) => h[n][H]), g = h[n][a];
          if (u.every((H, B) => H === b[B]) && x === g)
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
  }, [h, C]), mt = (e, s) => {
    if (!yt) return;
    const r = yt.get(e);
    return r ? r.get(s) : void 0;
  }, bt = (e, s) => je === null ? !1 : je >= e && je < e + s, xt = (e, s) => {
    for (let r = e; r < e + s; r++)
      if (r < h.length && M.includes(h[r].id))
        return !0;
    return !1;
  }, v = 40, N = 40, L = 32, he = c.useMemo(() => {
    const e = (g) => {
      const d = g.width ?? g.minWidth;
      if (typeof d == "number") return d;
      const q = parseInt(String(d), 10);
      return Number.isFinite(q) ? q : 150;
    }, s = W.filter((g) => g.sticky === "left"), r = W.filter((g) => g.sticky === "right"), l = O ? L : 0, a = K ? v : 0, o = p ? N : 0, u = l + a + o, x = /* @__PURE__ */ new Map();
    let i = u;
    for (const g of s)
      x.set(g.accessorKey, i), i += e(g);
    const n = /* @__PURE__ */ new Map();
    let b = 0;
    for (let g = r.length - 1; g >= 0; g--) {
      const d = r[g];
      n.set(d.accessorKey, b), b += e(d);
    }
    return (g, d, q, H) => {
      if (!g.sticky) return { style: {}, className: "" };
      const Z = `${e(g)}px`, _ = {
        position: "sticky",
        zIndex: d ? 20 : 10,
        width: Z,
        minWidth: Z,
        maxWidth: Z
      }, Q = H ?? q;
      if (g.sticky === "left") {
        const ye = x.get(g.accessorKey) ?? 0;
        return {
          style: {
            ..._,
            left: `${ye}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: k(
            "transition-colors",
            d ? "bg-slate-100 dark:bg-slate-800" : Q ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
          )
        };
      }
      const ae = n.get(g.accessorKey) ?? 0;
      return {
        style: {
          ..._,
          right: `${ae}px`
        },
        className: k(
          "transition-colors",
          d ? "bg-slate-100 dark:bg-slate-800" : Q ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
        )
      };
    };
  }, [W, K, p]), R = W.some((e) => e.sticky === "left"), ne = c.useCallback(
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
  ), Xt = c.useCallback(
    (e, s) => {
      e.preventDefault(), e.stopPropagation(), Ae(s.accessorKey), et.current = e.clientX;
      const r = ne(s) ?? 150;
      tt.current = r;
    },
    [ne]
  ), qe = c.useCallback(
    (e) => {
      if (!ie) return;
      const s = e.clientX - et.current, r = Math.max(50, tt.current + s), l = String(ie);
      Me ? Me(ie, r) : _t((a) => ({ ...a, [l]: r }));
    },
    [ie, Me]
  ), Je = c.useCallback(() => {
    Ae(null);
  }, []);
  c.useEffect(() => {
    if (ie)
      return document.addEventListener("mousemove", qe), document.addEventListener("mouseup", Je), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", qe), document.removeEventListener("mouseup", Je), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [ie, qe, Je]);
  const Ee = (e) => {
    const s = he(e, !0), r = (n) => typeof n == "number" ? `${n}px` : n, l = {};
    if (!e.sticky) {
      const n = F ? ne(e) : void 0;
      n !== void 0 ? (l.width = `${n}px`, l.minWidth = `${n}px`) : (e.width && (l.width = r(e.width)), e.minWidth && (l.minWidth = r(e.minWidth)));
    }
    const a = { ...l, ...s.style }, u = Ut.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", x = F && /* @__PURE__ */ t(
      "div",
      {
        className: k(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          ie === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (n) => Xt(n, e),
        onPointerDown: (n) => n.stopPropagation(),
        onClick: (n) => n.stopPropagation()
      }
    );
    return U && !e.sticky && !e.sortable ? /* @__PURE__ */ I(
      ds,
      {
        id: String(e.accessorKey),
        style: a,
        className: k(X(e.align), s.className, F && "relative overflow-visible", u),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ I(
      Et,
      {
        sortDirection: ct(e.accessorKey),
        onSort: () => ot(e.accessorKey),
        style: a,
        className: k(X(e.align), s.className, F && "relative overflow-visible", u),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ I(
      J,
      {
        style: a,
        className: k(X(e.align), s.className, F && "relative overflow-visible", u),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    );
  }, z = U ? Ot : W, kt = z.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), qt = h.map((e) => `row-${e.id}`), Jt = () => 0, Qe = () => O ? L : 0, Ke = () => {
    let e = 0;
    return O && (e += L), K && (e += v), e;
  }, Qt = c.useCallback(
    (e) => z.filter(
      (s) => e.columns.includes(s.accessorKey)
    ).length,
    [z]
  ), we = c.useMemo(() => $ ? new Set($.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [$]), Ut = c.useMemo(() => {
    if (!$ || $.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), s = (l) => $.findIndex((a) => a.columns.includes(l.accessorKey)), r = z.filter((l) => we.has(l.accessorKey));
    for (let l = 0; l < r.length - 1; l++) {
      const a = r[l], o = r[l + 1], u = s(a), x = s(o);
      u !== x && e.add(a.accessorKey);
    }
    return e;
  }, [$, z, we]), Yt = c.useCallback(
    (e) => {
      const s = z.filter((n) => e.columns.includes(n.accessorKey));
      if (s.length === 0) return { style: {}, className: "" };
      const r = s.every((n) => n.sticky === "left"), l = s.every((n) => n.sticky === "right");
      if (!r && !l) return { style: {}, className: "" };
      const a = r ? s[0] : s[s.length - 1], o = he(a, !0), u = (n) => {
        const b = F ? ne(n) : void 0;
        if (b !== void 0) return b;
        const g = n.width ?? n.minWidth;
        if (typeof g == "number") return g;
        const d = parseInt(String(g), 10);
        return Number.isFinite(d) ? d : 150;
      }, i = `${s.reduce((n, b) => n + u(b), 0)}px`;
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
    [z, he, ne, F]
  ), vt = c.useMemo(() => {
    if (!$ || $.length === 0) return [];
    const e = [], s = /* @__PURE__ */ new Set();
    for (const r of z) {
      const l = $.findIndex((a) => a.columns.includes(r.accessorKey));
      l !== -1 ? s.has(l) || (s.add(l), e.push({ type: "group", group: $[l] })) : e.push({ type: "standalone", col: r });
    }
    return e;
  }, [$, z]), Wt = /* @__PURE__ */ I(is, { className: pe, maxHeight: A, wrapperRef: Ge, children: [
    /* @__PURE__ */ I(ns, { children: [
      $ && $.length > 0 && /* @__PURE__ */ I(se, { children: [
        O && /* @__PURE__ */ t(
          J,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${L}px`,
              minWidth: `${L}px`,
              ...R && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        K && /* @__PURE__ */ t(
          J,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${v}px`,
              minWidth: `${v}px`,
              ...R && { position: "sticky", left: O ? L : 0, zIndex: 20 }
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
          J,
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
                "aria-label": ue ? "모두 접기" : "모두 펼치기",
                children: ue ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(Re, { size: 24 })
              }
            )
          }
        ),
        ge && /* @__PURE__ */ t(
          J,
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
        vt.map((e, s) => {
          const r = vt[s + 1], l = e.type === "group" && (r == null ? void 0 : r.type) === "group";
          if (e.type === "group") {
            const a = Qt(e.group);
            if (a === 0) return null;
            const o = Yt(e.group), u = !!o.style.position;
            return /* @__PURE__ */ t(
              J,
              {
                colSpan: a,
                className: k(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  l && "border-r border-slate-200 dark:border-slate-700",
                  o.className
                ),
                style: u ? o.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const a = he(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ t(
              Et,
              {
                rowSpan: 2,
                sortDirection: ct(e.col.accessorKey),
                onSort: () => ot(e.col.accessorKey),
                className: k(
                  X(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  a.className
                ),
                style: a.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ t(
              J,
              {
                rowSpan: 2,
                className: k(
                  X(e.col.align),
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
      /* @__PURE__ */ I(se, { children: [
        !$ && O && /* @__PURE__ */ t(
          J,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: R ? {
              position: "sticky",
              left: Jt(),
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
        !$ && K && /* @__PURE__ */ t(
          J,
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
          J,
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
                "aria-label": ue ? "모두 접기" : "모두 펼치기",
                children: ue ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(Re, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !$ && ge && /* @__PURE__ */ t(
          J,
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
        $ ? U ? /* @__PURE__ */ t(Ue, { items: kt, strategy: Dt, children: z.filter((e) => we.has(e.accessorKey)).map(Ee) }) : z.filter((e) => we.has(e.accessorKey)).map(Ee) : U ? /* @__PURE__ */ t(Ue, { items: kt, strategy: Dt, children: z.map(Ee) }) : z.map(Ee)
      ] })
    ] }),
    /* @__PURE__ */ I(as, { children: [
      Ye ? /* @__PURE__ */ t(se, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        E,
        {
          colSpan: De,
          className: k(
            "text-center",
            ke || xe !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: ke ?? (xe === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const s = typeof A == "number" ? A : typeof A == "string" && parseInt(A, 10) || 320, r = Math.max(1, Math.floor(s / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: r }).map((l, a) => /* @__PURE__ */ I(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    O && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(ze, { width: 16, height: 16 }) }),
                    K && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ze, { width: 18, height: 18 }) }),
                    p && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ze, { width: 18, height: 18 }) }),
                    z.map((o) => {
                      const u = o.width ?? o.minWidth, x = typeof u == "number" ? Math.min(u * 0.6, 150) : 100;
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
                style: te ? { width: te } : void 0,
                children: /* @__PURE__ */ t(os, { size: "lg" })
              }
            )
          ))
        }
      ) }) : h.length === 0 ? /* @__PURE__ */ t(se, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        E,
        {
          colSpan: De,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ t(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: te ? { width: te } : void 0,
              children: le
            }
          )
        }
      ) }) : O ? /* @__PURE__ */ t(Ue, { items: qt, strategy: rs, children: h.map((e, s) => {
        const r = M.includes(e.id), l = Ve(e), a = Fe(e.id), o = `row-${e.id}`, u = (x) => /* @__PURE__ */ I(Nt, { children: [
          /* @__PURE__ */ t(
            Ht,
            {
              isSelected: r,
              hasLeftStickyColumns: R,
              dragHandleProps: x
            }
          ),
          K && /* @__PURE__ */ t(
            E,
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
            E,
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
                  onClick: () => ut(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(Re, { size: 24 })
                }
              )
            }
          ),
          ge && /* @__PURE__ */ t(
            E,
            {
              className: "!p-0",
              style: {
                width: `${T}px`,
                minWidth: `${T}px`,
                maxWidth: `${T}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var i;
                    return (i = m == null ? void 0 : m.onRowDelete) == null ? void 0 : i.call(m, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(Kt, { size: 20 })
                }
              )
            }
          ),
          z.map((i) => {
            const n = mt(s, i.accessorKey);
            if (n === 0) return null;
            const b = e[i.accessorKey], g = ft(e.id, i.accessorKey), d = n !== void 0 && n > 1, q = d && bt(s, n), H = d && xt(s, n), B = he(i, !1, r, d ? H : void 0), Z = (D) => typeof D == "number" ? `${D}px` : D, _ = {};
            if (!i.sticky) {
              const D = F ? ne(i) : void 0;
              D !== void 0 ? (_.width = `${D}px`, _.minWidth = `${D}px`) : (i.width && (_.width = Z(i.width)), i.minWidth && (_.minWidth = Z(i.minWidth)));
            }
            const Q = { ..._, ...B.style };
            if (g && i.editable) {
              const D = i.editComponent || It;
              return /* @__PURE__ */ t(
                E,
                {
                  ref: Pe,
                  className: k(X(i.align), "p-1 overflow-hidden", B.className),
                  style: Q,
                  onClick: (G) => G.stopPropagation(),
                  rowSpan: d ? n : void 0,
                  children: /* @__PURE__ */ t(
                    D,
                    {
                      value: Ze,
                      onChange: (G) => {
                        re(G), Y.current = G, f != null && f.error && ee({ ...f, error: void 0 });
                      },
                      onComplete: () => Be(i, e),
                      onCancel: pt,
                      row: e,
                      error: f == null ? void 0 : f.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const ae = i.cell ? i.cell(b, e) : String(b ?? "");
            if (i.editable && P)
              return /* @__PURE__ */ t(
                E,
                {
                  className: k(
                    X(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    d && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    d && H && "bg-blue-50 dark:bg-blue-900",
                    d && !H && q && "bg-slate-100 dark:bg-slate-800",
                    B.className
                  ),
                  style: Q,
                  onClick: (D) => {
                    D.stopPropagation(), setTimeout(() => dt(e.id, i.accessorKey, b), 0);
                  },
                  rowSpan: d ? n : void 0,
                  children: /* @__PURE__ */ I("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: ae }),
                    /* @__PURE__ */ t(
                      wt,
                      {
                        size: 14,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const ye = d && s + n >= h.length;
            return /* @__PURE__ */ t(
              E,
              {
                className: k(
                  X(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  d && "align-middle transition-colors",
                  d && !ye && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  d && H && "bg-blue-50 dark:bg-blue-900",
                  d && !H && q && "bg-slate-100 dark:bg-slate-800",
                  B.className
                ),
                style: Q,
                rowSpan: d ? n : void 0,
                children: ae
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ I(c.Fragment, { children: [
          /* @__PURE__ */ t(
            zt,
            {
              id: o,
              isSelected: r,
              className: k(y && "cursor-pointer", V == null ? void 0 : V(e)),
              onClick: () => y == null ? void 0 : y(e),
              onMouseEnter: C ? () => ce(s) : void 0,
              onMouseLeave: C ? () => ce(null) : void 0,
              children: (x) => u(x)
            }
          ),
          p && a && /* @__PURE__ */ t(se, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
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
                    width: te ? `${te}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: p.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : h.map((e, s) => {
        const r = M.includes(e.id), l = Ve(e), a = Fe(e.id), o = `row-${e.id}`, u = (x) => /* @__PURE__ */ I(Nt, { children: [
          O && /* @__PURE__ */ t(
            Ht,
            {
              isSelected: r,
              hasLeftStickyColumns: R,
              dragHandleProps: x
            }
          ),
          K && /* @__PURE__ */ t(
            E,
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
            E,
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
                  onClick: () => ut(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(Re, { size: 24 })
                }
              )
            }
          ),
          ge && /* @__PURE__ */ t(
            E,
            {
              className: "!p-0",
              style: {
                width: `${T}px`,
                minWidth: `${T}px`,
                maxWidth: `${T}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var i;
                    return (i = m == null ? void 0 : m.onRowDelete) == null ? void 0 : i.call(m, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(Kt, { size: 20 })
                }
              )
            }
          ),
          z.map((i) => {
            const n = mt(s, i.accessorKey);
            if (n === 0) return null;
            const b = e[i.accessorKey], g = ft(e.id, i.accessorKey), d = n !== void 0 && n > 1, q = d && bt(s, n), H = d && xt(s, n), B = he(i, !1, r, d ? H : void 0), Z = (D) => typeof D == "number" ? `${D}px` : D, _ = {};
            if (!i.sticky) {
              const D = F ? ne(i) : void 0;
              D !== void 0 ? (_.width = `${D}px`, _.minWidth = `${D}px`) : (i.width && (_.width = Z(i.width)), i.minWidth && (_.minWidth = Z(i.minWidth)));
            }
            const Q = { ..._, ...B.style };
            if (g && i.editable) {
              const D = i.editComponent || It;
              return /* @__PURE__ */ t(
                E,
                {
                  ref: Pe,
                  className: k(X(i.align), "p-1 overflow-hidden", B.className),
                  style: Q,
                  onClick: (G) => G.stopPropagation(),
                  rowSpan: d ? n : void 0,
                  children: /* @__PURE__ */ t(
                    D,
                    {
                      value: Ze,
                      onChange: (G) => {
                        re(G), Y.current = G, f != null && f.error && ee({ ...f, error: void 0 });
                      },
                      onComplete: () => Be(i, e),
                      onCancel: pt,
                      row: e,
                      error: f == null ? void 0 : f.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const ae = i.cell ? i.cell(b, e) : String(b ?? "");
            if (i.editable && P)
              return /* @__PURE__ */ t(
                E,
                {
                  className: k(
                    X(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    d && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    d && H && "bg-blue-50 dark:bg-blue-900",
                    d && !H && q && "bg-slate-100 dark:bg-slate-800",
                    B.className
                  ),
                  style: Q,
                  onClick: (D) => {
                    D.stopPropagation(), setTimeout(() => {
                      dt(e.id, i.accessorKey, b);
                    }, 0);
                  },
                  rowSpan: d ? n : void 0,
                  children: /* @__PURE__ */ I("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: ae }),
                    /* @__PURE__ */ t(
                      wt,
                      {
                        size: 20,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const ye = d && s + n >= h.length;
            return /* @__PURE__ */ t(
              E,
              {
                className: k(
                  X(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  d && "align-middle transition-colors",
                  d && !ye && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  d && H && "bg-blue-50 dark:bg-blue-900",
                  d && !H && q && "bg-slate-100 dark:bg-slate-800",
                  B.className
                ),
                style: Q,
                rowSpan: d ? n : void 0,
                children: ae
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ I(c.Fragment, { children: [
          O ? /* @__PURE__ */ t(
            zt,
            {
              id: o,
              isSelected: r,
              className: k(y && "cursor-pointer", V == null ? void 0 : V(e)),
              onClick: () => y == null ? void 0 : y(e),
              onMouseEnter: C ? () => ce(s) : void 0,
              onMouseLeave: C ? () => ce(null) : void 0,
              children: (x) => u(x)
            }
          ) : /* @__PURE__ */ t(
            se,
            {
              "data-state": r ? "selected" : void 0,
              className: k(
                y && "cursor-pointer",
                (Xe == null ? void 0 : Xe.has(s)) && "border-b-0",
                V == null ? void 0 : V(e)
              ),
              onClick: () => y == null ? void 0 : y(e),
              onMouseEnter: C ? () => ce(s) : void 0,
              onMouseLeave: C ? () => ce(null) : void 0,
              children: u()
            }
          ),
          p && a && /* @__PURE__ */ t(se, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
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
                    width: te ? `${te}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: p.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      Ft && !Ye && /* @__PURE__ */ I(se, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        O && /* @__PURE__ */ t(
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
        K && /* @__PURE__ */ t(
          E,
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
          E,
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
                  return (e = m == null ? void 0 : m.onRowAdd) == null ? void 0 : e.call(m);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(cs, { size: 20 })
              }
            )
          }
        ),
        z.map((e) => /* @__PURE__ */ t(
          E,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return U || O ? /* @__PURE__ */ t(
    es,
    {
      sensors: Bt,
      collisionDetection: ts,
      onDragEnd: Vt,
      children: Wt
    }
  ) : Wt;
}
export {
  Es as DataTable
};
//# sourceMappingURL=data-table.mjs.map
