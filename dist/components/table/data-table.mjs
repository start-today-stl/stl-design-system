import { jsxs as I, jsx as t, Fragment as xt } from "react/jsx-runtime";
import * as d from "react";
import { useSensors as Jt, useSensor as kt, PointerSensor as Qt, KeyboardSensor as Ut, DndContext as Yt, closestCenter as Zt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as Gt, arrayMove as vt, SortableContext as Qe, horizontalListSortingStrategy as Wt, verticalListSortingStrategy as At, useSortable as Kt } from "@dnd-kit/sortable";
import { CSS as wt } from "@dnd-kit/utilities";
import { cn as v } from "../../lib/utils.mjs";
import { Table as es, TableHeader as ts, TableRow as te, TableHead as q, TableBody as ss, TableCell as E, TableSortableHead as rs } from "./table.mjs";
import { Checkbox as we } from "../ui/checkbox.mjs";
import { Input as is } from "../ui/input.mjs";
import { Skeleton as Ie } from "../ui/skeleton.mjs";
import { SplashScreen as ns } from "../ui/splash-screen.mjs";
import { DownIcon as He } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as It } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as ze } from "../../icons/RightIcon.mjs";
import { RowAddIcon as as } from "../../icons/RowAddIcon.mjs";
import { RowDeleteIcon as Nt } from "../../icons/RowDeleteIcon.mjs";
import { WriteIcon as St } from "../../icons/WriteIcon.mjs";
function $t({
  value: W,
  onChange: h,
  onComplete: K,
  onCancel: R,
  error: S
}) {
  const w = d.useRef(null);
  d.useEffect(() => {
    var y, P;
    (y = w.current) == null || y.focus(), (P = w.current) == null || P.select();
  }, []);
  const j = (y) => {
    y.key === "Enter" ? (y.preventDefault(), K()) : y.key === "Escape" && (y.preventDefault(), R());
  };
  return /* @__PURE__ */ I("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ t(
      is,
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
function ls({
  id: W,
  children: h,
  className: K,
  style: R,
  disabled: S
}) {
  const {
    attributes: w,
    listeners: j,
    setNodeRef: y,
    transform: P,
    transition: p,
    isDragging: ae
  } = Kt({ id: W, disabled: S }), he = {
    ...R,
    transform: wt.Transform.toString(P),
    transition: p,
    opacity: ae ? 0.5 : 1,
    cursor: S ? void 0 : "grab"
  };
  return /* @__PURE__ */ t(
    "th",
    {
      ref: y,
      style: he,
      className: v(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-600 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        ae && "z-50",
        K
      ),
      ...w,
      ...j,
      children: /* @__PURE__ */ I("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ t(
          It,
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
function Dt({
  id: W,
  children: h,
  className: K,
  isSelected: R,
  onClick: S,
  onMouseEnter: w,
  onMouseLeave: j
}) {
  const {
    setNodeRef: y,
    setActivatorNodeRef: P,
    listeners: p,
    attributes: ae,
    transform: he,
    transition: V,
    isDragging: A
  } = Kt({ id: W }), F = {
    transform: wt.Transform.toString(he),
    transition: V,
    opacity: A ? 0.5 : 1
  };
  return /* @__PURE__ */ t(
    "tr",
    {
      ref: y,
      style: F,
      "data-state": R ? "selected" : void 0,
      className: v(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        A && "z-50 shadow-lg",
        K
      ),
      onClick: S,
      onMouseEnter: w,
      onMouseLeave: j,
      children: typeof h == "function" ? h({ listeners: p, attributes: ae, setActivatorNodeRef: P }) : h
    }
  );
}
function Et({ isSelected: W, hasLeftStickyColumns: h, dragHandleProps: K }) {
  const { listeners: S, attributes: w, setActivatorNodeRef: j } = K ?? {};
  return /* @__PURE__ */ t(
    "td",
    {
      className: v(
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
          children: /* @__PURE__ */ t(It, { size: 16 })
        }
      )
    }
  );
}
function Ss({
  columns: W,
  data: h,
  selectable: K = !1,
  selectedIds: R = [],
  onSelectionChange: S,
  sortState: w,
  onSortChange: j,
  onRowClick: y,
  onCellChange: P,
  expandable: p,
  emptyMessage: ae = "데이터가 없습니다.",
  className: he,
  rowClassName: V,
  maxHeight: A,
  resizable: F = !1,
  columnWidths: ye,
  onColumnResize: Me,
  columnReorderable: U = !1,
  columnOrder: Re,
  onColumnReorder: Ce,
  rowReorderable: Te = !1,
  onRowReorder: me,
  loading: Ue = !1,
  loadingMode: be = "splash",
  loadingContent: xe,
  headerGroups: $,
  rowGrouping: C,
  rowActions: m
}) {
  const O = C ? !1 : Te, le = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  d.useEffect(() => {
    le && C && Te && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [C, Te, le]), d.useEffect(() => {
    le && xe && be !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [xe, be, le]);
  const [f, ee] = d.useState(null), [Ye, se] = d.useState(null), Y = d.useRef(null), Le = d.useRef(null), [Ht, zt] = d.useState(
    (p == null ? void 0 : p.defaultExpandedRowIds) ?? []
  ), [Pe, Mt] = d.useState({}), [re, Ze] = d.useState(null), Ge = d.useRef(0), Ae = d.useRef(0), [Rt, et] = d.useState(
    () => W.map((e) => e.accessorKey)
  ), [_e, oe] = d.useState(null);
  d.useEffect(() => {
    !U || Re || et((e) => {
      const s = W.map((o) => o.accessorKey), r = e.filter((o) => s.includes(o)), l = s.filter((o) => !r.includes(o)), a = [...r, ...l];
      return a.length === e.length && a.every((o, u) => o === e[u]) ? e : a;
    });
  }, [W, U, Re]);
  const ce = Re ?? Rt, Ct = d.useMemo(() => U ? ce.map((e) => W.find((s) => s.accessorKey === e)).filter((e) => e !== void 0) : W, [W, ce, U]), ke = d.useMemo(() => {
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
  }, [$, W]), ve = d.useMemo(
    () => ke.map((e) => `${e.headerLabel}:${e.reason}`).join("|"),
    [ke]
  ), je = d.useRef("");
  d.useEffect(() => {
    if (!le) return;
    if (!ve) {
      je.current = "";
      return;
    }
    if (je.current === ve) return;
    je.current = ve;
    const e = ke.map((s) => `${s.headerLabel}(${s.reason})`).join(", ");
    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. 그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + e
    );
  }, [ve, ke, le]);
  const Tt = Jt(
    kt(Qt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    kt(Ut, {
      coordinateGetter: Gt
    })
  ), tt = d.useCallback(
    (e) => {
      const { active: s, over: r } = e;
      if (!r || s.id === r.id) return;
      const l = ce.findIndex((u) => String(u) === s.id), a = ce.findIndex((u) => String(u) === r.id);
      if (l === -1 || a === -1) return;
      const o = vt(ce, l, a);
      Ce ? Ce(o) : et(o);
    },
    [ce, Ce]
  ), st = d.useCallback(
    (e) => {
      const { active: s, over: r } = e;
      if (!r || s.id === r.id) return;
      const l = String(s.id).replace(/^row-/, ""), a = String(r.id).replace(/^row-/, ""), o = h.findIndex((i) => String(i.id) === l), u = h.findIndex((i) => String(i.id) === a);
      if (o === -1 || u === -1) return;
      const x = vt(h, o, u);
      me == null || me(x);
    },
    [h, me]
  ), Lt = d.useCallback(
    (e) => {
      const { active: s } = e;
      String(s.id).startsWith("row-") ? st(e) : tt(e);
    },
    [tt, st]
  ), We = (p == null ? void 0 : p.expandedRowIds) ?? Ht, Ne = (p == null ? void 0 : p.onExpandedChange) ?? zt, Se = h.length > 0 && R.length === h.length, rt = R.length > 0 && !Se, it = () => {
    Se ? S == null || S([]) : S == null || S(h.map((e) => e.id));
  }, nt = (e) => {
    R.includes(e) ? S == null || S(R.filter((s) => s !== e)) : S == null || S([...R, e]);
  }, Pt = (e) => {
    j && ((w == null ? void 0 : w.column) === e ? w.direction === "asc" ? j({ column: e, direction: "desc" }) : w.direction === "desc" ? j({ column: null, direction: null }) : j({ column: e, direction: "asc" }) : j({ column: e, direction: "asc" }));
  }, _t = (e) => (w == null ? void 0 : w.column) === e ? w.direction : null, J = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, at = (e, s, r) => {
    ee({ rowId: e, columnKey: s }), se(r), Y.current = r;
  }, Oe = (e, s) => {
    const r = Y.current;
    if (!f || r === null) {
      ee(null), se(null), Y.current = null;
      return;
    }
    if (e.validate) {
      const l = e.validate(r, s);
      if (l !== !0) {
        ee({ ...f, error: l });
        return;
      }
    }
    P && P(f.rowId, f.columnKey, r), ee(null), se(null), Y.current = null;
  }, lt = d.useCallback(() => {
    if (!f) return;
    const e = W.find((r) => r.accessorKey === f.columnKey), s = h.find((r) => r.id === f.rowId);
    if (e && s)
      Oe(e, s);
    else {
      const r = Y.current;
      r !== null && P && P(f.rowId, f.columnKey, r), ee(null), se(null), Y.current = null;
    }
  }, [f, W, h, P]), ot = d.useCallback(() => {
    ee(null), se(null), Y.current = null;
  }, []);
  d.useEffect(() => {
    if (!f) return;
    const e = (s) => {
      var a, o;
      const r = s.target;
      (a = Le.current) != null && a.contains(r) || (o = r.closest) != null && o.call(r, "[data-radix-popper-content-wrapper]") || lt();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [f, lt]);
  const ct = (e, s) => (f == null ? void 0 : f.rowId) === e && (f == null ? void 0 : f.columnKey) === s, Be = (e) => p ? p.rowExpandable ? p.rowExpandable(e) : !0 : !1, Ve = (e) => We.includes(e), dt = (e) => {
    Ve(e) ? Ne(We.filter((s) => s !== e)) : Ne([...We, e]);
  }, pe = d.useMemo(() => p ? h.filter((e) => Be(e)).map((e) => e.id) : [], [h, p]), fe = pe.length > 0 && pe.every((e) => We.includes(e)), ht = () => {
    Ne(fe ? [] : pe);
  }, ue = (m == null ? void 0 : m.showDelete) ?? !!(m != null && m.onRowDelete), jt = (m == null ? void 0 : m.showAdd) ?? !!(m != null && m.onRowAdd), T = 40, $e = W.length + (K ? 1 : 0) + (p ? 1 : 0) + (O ? 1 : 0) + (ue ? 1 : 0), { rowSpanMap: pt, middleRowSet: Fe } = d.useMemo(() => {
    if (!C) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(C.groupBy) ? C.groupBy : [C.groupBy], s = C.mergeColumns ?? e, r = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set();
    for (const a of s) {
      let o = 0;
      for (; o < h.length; ) {
        const u = e.map((n) => h[o][n]), x = h[o][a];
        let i = 1;
        for (let n = o + 1; n < h.length; n++) {
          const b = e.map((z) => h[n][z]), g = h[n][a];
          if (u.every((z, B) => z === b[B]) && x === g)
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
  }, [h, C]), ft = (e, s) => {
    if (!pt) return;
    const r = pt.get(e);
    return r ? r.get(s) : void 0;
  }, ut = (e, s) => _e === null ? !1 : _e >= e && _e < e + s, gt = (e, s) => {
    for (let r = e; r < e + s; r++)
      if (r < h.length && R.includes(h[r].id))
        return !0;
    return !1;
  }, k = 40, N = 40, L = 32, de = d.useMemo(() => {
    const e = (g) => {
      const c = g.width ?? g.minWidth;
      if (typeof c == "number") return c;
      const X = parseInt(String(c), 10);
      return Number.isFinite(X) ? X : 150;
    }, s = W.filter((g) => g.sticky === "left"), r = W.filter((g) => g.sticky === "right"), l = O ? L : 0, a = K ? k : 0, o = p ? N : 0, u = l + a + o, x = /* @__PURE__ */ new Map();
    let i = u;
    for (const g of s)
      x.set(g.accessorKey, i), i += e(g);
    const n = /* @__PURE__ */ new Map();
    let b = 0;
    for (let g = r.length - 1; g >= 0; g--) {
      const c = r[g];
      n.set(c.accessorKey, b), b += e(c);
    }
    return (g, c, X, z) => {
      if (!g.sticky) return { style: {}, className: "" };
      const Z = `${e(g)}px`, _ = {
        position: "sticky",
        zIndex: c ? 20 : 10,
        width: Z,
        minWidth: Z,
        maxWidth: Z
      }, Q = z ?? X;
      if (g.sticky === "left") {
        const ge = x.get(g.accessorKey) ?? 0;
        return {
          style: {
            ..._,
            left: `${ge}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: v(
            "transition-colors",
            c ? "bg-slate-100 dark:bg-slate-800" : Q ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
          )
        };
      }
      const ne = n.get(g.accessorKey) ?? 0;
      return {
        style: {
          ..._,
          right: `${ne}px`
        },
        className: v(
          "transition-colors",
          c ? "bg-slate-100 dark:bg-slate-800" : Q ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
        )
      };
    };
  }, [W, K, p]), M = W.some((e) => e.sticky === "left"), ie = d.useCallback(
    (e) => {
      const s = String(e.accessorKey);
      if (ye && s in ye)
        return ye[s];
      if (s in Pe)
        return Pe[s];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [ye, Pe]
  ), Ot = d.useCallback(
    (e, s) => {
      e.preventDefault(), e.stopPropagation(), Ze(s.accessorKey), Ge.current = e.clientX;
      const r = ie(s) ?? 150;
      Ae.current = r;
    },
    [ie]
  ), Xe = d.useCallback(
    (e) => {
      if (!re) return;
      const s = e.clientX - Ge.current, r = Math.max(50, Ae.current + s), l = String(re);
      Me ? Me(re, r) : Mt((a) => ({ ...a, [l]: r }));
    },
    [re, Me]
  ), qe = d.useCallback(() => {
    Ze(null);
  }, []);
  d.useEffect(() => {
    if (re)
      return document.addEventListener("mousemove", Xe), document.addEventListener("mouseup", qe), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", Xe), document.removeEventListener("mouseup", qe), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [re, Xe, qe]);
  const De = (e) => {
    const s = de(e, !0), r = (n) => typeof n == "number" ? `${n}px` : n, l = {};
    if (!e.sticky) {
      const n = F ? ie(e) : void 0;
      n !== void 0 ? (l.width = `${n}px`, l.minWidth = `${n}px`) : (e.width && (l.width = r(e.width)), e.minWidth && (l.minWidth = r(e.minWidth)));
    }
    const a = { ...l, ...s.style }, u = Xt.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", x = F && /* @__PURE__ */ t(
      "div",
      {
        className: v(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          re === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (n) => Ot(n, e),
        onPointerDown: (n) => n.stopPropagation(),
        onClick: (n) => n.stopPropagation()
      }
    );
    return U && !e.sticky && !e.sortable ? /* @__PURE__ */ I(
      ls,
      {
        id: String(e.accessorKey),
        style: a,
        className: v(J(e.align), s.className, F && "relative overflow-visible", u),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ I(
      rs,
      {
        sortDirection: _t(e.accessorKey),
        onSort: () => Pt(e.accessorKey),
        style: a,
        className: v(J(e.align), s.className, F && "relative overflow-visible", u),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ I(
      q,
      {
        style: a,
        className: v(J(e.align), s.className, F && "relative overflow-visible", u),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    );
  }, H = U ? Ct : W, yt = H.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Bt = h.map((e) => `row-${e.id}`), Vt = () => 0, Je = () => O ? L : 0, Ee = () => {
    let e = 0;
    return O && (e += L), K && (e += k), e;
  }, Ft = d.useCallback(
    (e) => H.filter(
      (s) => e.columns.includes(s.accessorKey)
    ).length,
    [H]
  ), Ke = d.useMemo(() => $ ? new Set($.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [$]), Xt = d.useMemo(() => {
    if (!$ || $.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), s = (l) => $.findIndex((a) => a.columns.includes(l.accessorKey)), r = H.filter((l) => Ke.has(l.accessorKey));
    for (let l = 0; l < r.length - 1; l++) {
      const a = r[l], o = r[l + 1], u = s(a), x = s(o);
      u !== x && e.add(a.accessorKey);
    }
    return e;
  }, [$, H, Ke]), qt = d.useCallback(
    (e) => {
      const s = H.filter((n) => e.columns.includes(n.accessorKey));
      if (s.length === 0) return { style: {}, className: "" };
      const r = s.every((n) => n.sticky === "left"), l = s.every((n) => n.sticky === "right");
      if (!r && !l) return { style: {}, className: "" };
      const a = r ? s[0] : s[s.length - 1], o = de(a, !0), u = (n) => {
        const b = F ? ie(n) : void 0;
        if (b !== void 0) return b;
        const g = n.width ?? n.minWidth;
        if (typeof g == "number") return g;
        const c = parseInt(String(g), 10);
        return Number.isFinite(c) ? c : 150;
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
    [H, de, ie, F]
  ), mt = d.useMemo(() => {
    if (!$ || $.length === 0) return [];
    const e = [], s = /* @__PURE__ */ new Set();
    for (const r of H) {
      const l = $.findIndex((a) => a.columns.includes(r.accessorKey));
      l !== -1 ? s.has(l) || (s.add(l), e.push({ type: "group", group: $[l] })) : e.push({ type: "standalone", col: r });
    }
    return e;
  }, [$, H]), bt = /* @__PURE__ */ I(es, { className: he, maxHeight: A, children: [
    /* @__PURE__ */ I(ts, { children: [
      $ && $.length > 0 && /* @__PURE__ */ I(te, { children: [
        O && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${L}px`,
              minWidth: `${L}px`,
              ...M && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        K && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              ...M && { position: "sticky", left: O ? L : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              we,
              {
                checked: Se,
                indeterminate: rt,
                onCheckedChange: it,
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
              ...M && { position: "sticky", left: Ee(), zIndex: 20 }
            },
            children: (p == null ? void 0 : p.showExpandAll) !== !1 && pe.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: ht,
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
        mt.map((e, s) => {
          const r = mt[s + 1], l = e.type === "group" && (r == null ? void 0 : r.type) === "group";
          if (e.type === "group") {
            const a = Ft(e.group);
            if (a === 0) return null;
            const o = qt(e.group);
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
      /* @__PURE__ */ I(te, { children: [
        !$ && O && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: M ? {
              position: "sticky",
              left: Vt(),
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
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: M ? {
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
                checked: Se,
                indeterminate: rt,
                onCheckedChange: it,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !$ && p && /* @__PURE__ */ t(
          q,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: M ? {
              position: "sticky",
              left: Ee(),
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
            children: (p == null ? void 0 : p.showExpandAll) !== !1 && pe.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: ht,
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
        $ ? U ? /* @__PURE__ */ t(Qe, { items: yt, strategy: Wt, children: H.filter((e) => Ke.has(e.accessorKey)).map(De) }) : H.filter((e) => Ke.has(e.accessorKey)).map(De) : U ? /* @__PURE__ */ t(Qe, { items: yt, strategy: Wt, children: H.map(De) }) : H.map(De)
      ] })
    ] }),
    /* @__PURE__ */ I(ss, { children: [
      Ue ? /* @__PURE__ */ t(te, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        E,
        {
          colSpan: $e,
          className: v(
            "text-center",
            xe || be !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: xe ?? (be === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const s = typeof A == "number" ? A : typeof A == "string" && parseInt(A, 10) || 320, r = Math.max(1, Math.floor(s / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: r }).map((l, a) => /* @__PURE__ */ I(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    O && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(Ie, { width: 16, height: 16 }) }),
                    K && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(Ie, { width: 18, height: 18 }) }),
                    p && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(Ie, { width: 18, height: 18 }) }),
                    H.map((o) => {
                      const u = o.width ?? o.minWidth, x = typeof u == "number" ? Math.min(u * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(Ie, { height: 16, width: x }) }, String(o.accessorKey));
                    })
                  ]
                },
                a
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본)
            /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ t(ns, { size: "lg" }) })
          ))
        }
      ) }) : h.length === 0 ? /* @__PURE__ */ t(te, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        E,
        {
          colSpan: $e,
          className: "h-24 text-center text-slate-500",
          children: ae
        }
      ) }) : O ? /* @__PURE__ */ t(Qe, { items: Bt, strategy: At, children: h.map((e, s) => {
        const r = R.includes(e.id), l = Be(e), a = Ve(e.id), o = `row-${e.id}`, u = (x) => /* @__PURE__ */ I(xt, { children: [
          /* @__PURE__ */ t(
            Et,
            {
              isSelected: r,
              hasLeftStickyColumns: M,
              dragHandleProps: x
            }
          ),
          K && /* @__PURE__ */ t(
            E,
            {
              onClick: (i) => i.stopPropagation(),
              className: v(
                "!p-0",
                M && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: M ? {
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
                  checked: r,
                  onCheckedChange: () => nt(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          p && /* @__PURE__ */ t(
            E,
            {
              className: v(
                "p-0",
                M && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: M ? {
                position: "sticky",
                left: Ee(),
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
                  onClick: () => dt(e.id),
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
                  children: /* @__PURE__ */ t(Nt, { size: 20 })
                }
              )
            }
          ),
          H.map((i) => {
            const n = ft(s, i.accessorKey);
            if (n === 0) return null;
            const b = e[i.accessorKey], g = ct(e.id, i.accessorKey), c = n !== void 0 && n > 1, X = c && ut(s, n), z = c && gt(s, n), B = de(i, !1, r, c ? z : void 0), Z = (D) => typeof D == "number" ? `${D}px` : D, _ = {};
            if (!i.sticky) {
              const D = F ? ie(i) : void 0;
              D !== void 0 ? (_.width = `${D}px`, _.minWidth = `${D}px`) : (i.width && (_.width = Z(i.width)), i.minWidth && (_.minWidth = Z(i.minWidth)));
            }
            const Q = { ..._, ...B.style };
            if (g && i.editable) {
              const D = i.editComponent || $t;
              return /* @__PURE__ */ t(
                E,
                {
                  ref: Le,
                  className: v(J(i.align), "p-1 overflow-hidden", B.className),
                  style: Q,
                  onClick: (G) => G.stopPropagation(),
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ t(
                    D,
                    {
                      value: Ye,
                      onChange: (G) => {
                        se(G), Y.current = G, f != null && f.error && ee({ ...f, error: void 0 });
                      },
                      onComplete: () => Oe(i, e),
                      onCancel: ot,
                      row: e,
                      error: f == null ? void 0 : f.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const ne = i.cell ? i.cell(b, e) : String(b ?? "");
            if (i.editable && P)
              return /* @__PURE__ */ t(
                E,
                {
                  className: v(
                    J(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    c && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    c && z && "bg-blue-50 dark:bg-blue-900",
                    c && !z && X && "bg-slate-100 dark:bg-slate-800",
                    B.className
                  ),
                  style: Q,
                  onClick: (D) => {
                    D.stopPropagation(), setTimeout(() => at(e.id, i.accessorKey, b), 0);
                  },
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ I("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: ne }),
                    /* @__PURE__ */ t(
                      St,
                      {
                        size: 14,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const ge = c && s + n >= h.length;
            return /* @__PURE__ */ t(
              E,
              {
                className: v(
                  J(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  c && "align-middle transition-colors",
                  c && !ge && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  c && z && "bg-blue-50 dark:bg-blue-900",
                  c && !z && X && "bg-slate-100 dark:bg-slate-800",
                  B.className
                ),
                style: Q,
                rowSpan: c ? n : void 0,
                children: ne
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ I(d.Fragment, { children: [
          /* @__PURE__ */ t(
            Dt,
            {
              id: o,
              isSelected: r,
              className: v(y && "cursor-pointer", V == null ? void 0 : V(e)),
              onClick: () => y == null ? void 0 : y(e),
              onMouseEnter: C ? () => oe(s) : void 0,
              onMouseLeave: C ? () => oe(null) : void 0,
              children: (x) => u(x)
            }
          ),
          p && a && /* @__PURE__ */ t(te, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            E,
            {
              colSpan: $e,
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
                  children: p.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : h.map((e, s) => {
        const r = R.includes(e.id), l = Be(e), a = Ve(e.id), o = `row-${e.id}`, u = (x) => /* @__PURE__ */ I(xt, { children: [
          O && /* @__PURE__ */ t(
            Et,
            {
              isSelected: r,
              hasLeftStickyColumns: M,
              dragHandleProps: x
            }
          ),
          K && /* @__PURE__ */ t(
            E,
            {
              onClick: (i) => i.stopPropagation(),
              className: v(
                "!p-0",
                M && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: M ? {
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
                  checked: r,
                  onCheckedChange: () => nt(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          p && /* @__PURE__ */ t(
            E,
            {
              className: v(
                "p-0",
                M && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: M ? {
                position: "sticky",
                left: Ee(),
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
                  onClick: () => dt(e.id),
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
                  children: /* @__PURE__ */ t(Nt, { size: 20 })
                }
              )
            }
          ),
          H.map((i) => {
            const n = ft(s, i.accessorKey);
            if (n === 0) return null;
            const b = e[i.accessorKey], g = ct(e.id, i.accessorKey), c = n !== void 0 && n > 1, X = c && ut(s, n), z = c && gt(s, n), B = de(i, !1, r, c ? z : void 0), Z = (D) => typeof D == "number" ? `${D}px` : D, _ = {};
            if (!i.sticky) {
              const D = F ? ie(i) : void 0;
              D !== void 0 ? (_.width = `${D}px`, _.minWidth = `${D}px`) : (i.width && (_.width = Z(i.width)), i.minWidth && (_.minWidth = Z(i.minWidth)));
            }
            const Q = { ..._, ...B.style };
            if (g && i.editable) {
              const D = i.editComponent || $t;
              return /* @__PURE__ */ t(
                E,
                {
                  ref: Le,
                  className: v(J(i.align), "p-1 overflow-hidden", B.className),
                  style: Q,
                  onClick: (G) => G.stopPropagation(),
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ t(
                    D,
                    {
                      value: Ye,
                      onChange: (G) => {
                        se(G), Y.current = G, f != null && f.error && ee({ ...f, error: void 0 });
                      },
                      onComplete: () => Oe(i, e),
                      onCancel: ot,
                      row: e,
                      error: f == null ? void 0 : f.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const ne = i.cell ? i.cell(b, e) : String(b ?? "");
            if (i.editable && P)
              return /* @__PURE__ */ t(
                E,
                {
                  className: v(
                    J(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    c && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    c && z && "bg-blue-50 dark:bg-blue-900",
                    c && !z && X && "bg-slate-100 dark:bg-slate-800",
                    B.className
                  ),
                  style: Q,
                  onClick: (D) => {
                    D.stopPropagation(), setTimeout(() => {
                      at(e.id, i.accessorKey, b);
                    }, 0);
                  },
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ I("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: ne }),
                    /* @__PURE__ */ t(
                      St,
                      {
                        size: 20,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const ge = c && s + n >= h.length;
            return /* @__PURE__ */ t(
              E,
              {
                className: v(
                  J(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  c && "align-middle transition-colors",
                  c && !ge && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  c && z && "bg-blue-50 dark:bg-blue-900",
                  c && !z && X && "bg-slate-100 dark:bg-slate-800",
                  B.className
                ),
                style: Q,
                rowSpan: c ? n : void 0,
                children: ne
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ I(d.Fragment, { children: [
          O ? /* @__PURE__ */ t(
            Dt,
            {
              id: o,
              isSelected: r,
              className: v(y && "cursor-pointer", V == null ? void 0 : V(e)),
              onClick: () => y == null ? void 0 : y(e),
              onMouseEnter: C ? () => oe(s) : void 0,
              onMouseLeave: C ? () => oe(null) : void 0,
              children: (x) => u(x)
            }
          ) : /* @__PURE__ */ t(
            te,
            {
              "data-state": r ? "selected" : void 0,
              className: v(
                y && "cursor-pointer",
                (Fe == null ? void 0 : Fe.has(s)) && "border-b-0",
                V == null ? void 0 : V(e)
              ),
              onClick: () => y == null ? void 0 : y(e),
              onMouseEnter: C ? () => oe(s) : void 0,
              onMouseLeave: C ? () => oe(null) : void 0,
              children: u()
            }
          ),
          p && a && /* @__PURE__ */ t(te, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            E,
            {
              colSpan: $e,
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
                  children: p.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      jt && !Ue && /* @__PURE__ */ I(te, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
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
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
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
                children: /* @__PURE__ */ t(as, { size: 20 })
              }
            )
          }
        ),
        H.map((e) => /* @__PURE__ */ t(
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
    Yt,
    {
      sensors: Tt,
      collisionDetection: Zt,
      onDragEnd: Lt,
      children: bt
    }
  ) : bt;
}
export {
  Ss as DataTable
};
//# sourceMappingURL=data-table.mjs.map
