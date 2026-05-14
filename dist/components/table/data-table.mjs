import { jsxs as H, jsx as s, Fragment as Et } from "react/jsx-runtime";
import * as d from "react";
import { useSensors as es, useSensor as Kt, PointerSensor as ts, KeyboardSensor as ss, DndContext as rs, closestCenter as is } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as ns, arrayMove as wt, SortableContext as Ze, horizontalListSortingStrategy as It, verticalListSortingStrategy as as, useSortable as Lt } from "@dnd-kit/sortable";
import { CSS as Pt } from "@dnd-kit/utilities";
import { cn as x } from "../../lib/utils.mjs";
import { Table as ls, TableHeader as os, TableRow as ie, TableHead as q, TableSortableHead as Mt, TableBody as cs, TableCell as E } from "./table.mjs";
import { Checkbox as Me } from "../ui/checkbox.mjs";
import { Input as ds } from "../ui/input.mjs";
import { Skeleton as ze } from "../ui/skeleton.mjs";
import { SplashScreen as hs } from "../ui/splash-screen.mjs";
import { DownIcon as He } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as _t } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as Re } from "../../icons/RightIcon.mjs";
import { RowAddIcon as ps } from "../../icons/RowAddIcon.mjs";
import { RowDeleteIcon as zt } from "../../icons/RowDeleteIcon.mjs";
import { WriteIcon as Ht } from "../../icons/WriteIcon.mjs";
function Rt({
  value: v,
  onChange: p,
  onComplete: K,
  onCancel: L,
  error: N
}) {
  const R = d.useRef(null);
  d.useEffect(() => {
    var w, I;
    (w = R.current) == null || w.focus(), (I = R.current) == null || I.select();
  }, []);
  const J = (w) => {
    w.key === "Enter" ? (w.preventDefault(), K()) : w.key === "Escape" && (w.preventDefault(), L());
  };
  return /* @__PURE__ */ H("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ s(
      ds,
      {
        ref: R,
        value: String(v ?? ""),
        onChange: (w) => p(w.target.value),
        onKeyDown: J,
        onBlur: K,
        error: !!N,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    N && /* @__PURE__ */ s("span", { className: "text-[10px] text-destructive dark:text-red-400", children: N })
  ] });
}
function us({
  id: v,
  children: p,
  className: K,
  style: L,
  disabled: N
}) {
  const {
    attributes: R,
    listeners: J,
    setNodeRef: w,
    transform: I,
    transition: Q,
    isDragging: h
  } = Lt({ id: v, disabled: N }), fe = {
    ...L,
    transform: Pt.Transform.toString(I),
    transition: Q,
    opacity: h ? 0.5 : 1,
    cursor: N ? void 0 : "grab"
  };
  return /* @__PURE__ */ s(
    "th",
    {
      ref: w,
      style: fe,
      className: x(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-600 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        h && "z-50",
        K
      ),
      ...R,
      ...J,
      children: /* @__PURE__ */ H("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ s(
          _t,
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
function Ct({
  id: v,
  children: p,
  className: K,
  isSelected: L,
  onClick: N,
  onMouseEnter: R,
  onMouseLeave: J
}) {
  const {
    setNodeRef: w,
    setActivatorNodeRef: I,
    listeners: Q,
    attributes: h,
    transform: fe,
    transition: Ce,
    isDragging: X
  } = Lt({ id: v }), ne = {
    transform: Pt.Transform.toString(fe),
    transition: Ce,
    opacity: X ? 0.5 : 1
  };
  return /* @__PURE__ */ s(
    "tr",
    {
      ref: w,
      style: ne,
      "data-state": L ? "selected" : void 0,
      className: x(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        X && "z-50 shadow-lg",
        K
      ),
      onClick: N,
      onMouseEnter: R,
      onMouseLeave: J,
      children: typeof p == "function" ? p({ listeners: Q, attributes: h, setActivatorNodeRef: I }) : p
    }
  );
}
function Tt({ isSelected: v, hasLeftStickyColumns: p, dragHandleProps: K }) {
  const { listeners: N, attributes: R, setActivatorNodeRef: J } = K ?? {};
  return /* @__PURE__ */ s(
    "td",
    {
      className: x(
        "p-0 align-middle",
        p && (v ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
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
      children: /* @__PURE__ */ s(
        "div",
        {
          ref: J,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (w) => w.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...N,
          ...R,
          children: /* @__PURE__ */ s(_t, { size: 16 })
        }
      )
    }
  );
}
function Is({
  columns: v,
  data: p,
  selectable: K = !1,
  selectedIds: L = [],
  onSelectionChange: N,
  sortState: R,
  onSortChange: J,
  multiSort: w = !1,
  onRowClick: I,
  onCellChange: Q,
  expandable: h,
  emptyMessage: fe = "데이터가 없습니다.",
  className: Ce,
  rowClassName: X,
  maxHeight: ne,
  resizable: Z = !1,
  columnWidths: xe,
  onColumnResize: Te,
  columnReorderable: G = !1,
  columnOrder: Le,
  onColumnReorder: Pe,
  rowReorderable: _e = !1,
  onRowReorder: ke,
  loading: Ge = !1,
  loadingMode: ve = "splash",
  loadingContent: ye,
  headerGroups: W,
  rowGrouping: P,
  rowActions: m
}) {
  const V = P ? !1 : _e, de = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  d.useEffect(() => {
    de && P && _e && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [P, _e, de]), d.useEffect(() => {
    de && ye && ve !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [ye, ve, de]);
  const [y, se] = d.useState(null), [Ae, ae] = d.useState(null), A = d.useRef(null), je = d.useRef(null), et = d.useRef(null), [Y, jt] = d.useState(0);
  d.useEffect(() => {
    const e = et.current;
    if (!e) return;
    const t = () => jt(e.clientWidth);
    t();
    const r = new ResizeObserver(t);
    return r.observe(e), () => r.disconnect();
  }, []);
  const [Ot, Bt] = d.useState(
    (h == null ? void 0 : h.defaultExpandedRowIds) ?? []
  ), [Oe, Vt] = d.useState({}), [le, tt] = d.useState(null), st = d.useRef(0), rt = d.useRef(0), [Ft, it] = d.useState(
    () => v.map((e) => e.accessorKey)
  ), [Be, he] = d.useState(null);
  d.useEffect(() => {
    !G || Le || it((e) => {
      const t = v.map((l) => l.accessorKey), r = e.filter((l) => t.includes(l)), o = t.filter((l) => !r.includes(l)), n = [...r, ...o];
      return n.length === e.length && n.every((l, g) => l === e[g]) ? e : n;
    });
  }, [v, G, Le]);
  const pe = Le ?? Ft, Xt = d.useMemo(() => G ? pe.map((e) => v.find((t) => t.accessorKey === e)).filter((e) => e !== void 0) : v, [v, pe, G]), Se = d.useMemo(() => {
    if (!W || W.length === 0) return [];
    const e = new Map(
      v.map((t) => [t.accessorKey, t])
    );
    return W.flatMap((t, r) => {
      const o = t.columns.map((u) => e.get(u)).filter((u) => u !== void 0);
      if (o.length === 0) return [];
      const n = new Set(
        o.map((u) => u.sticky).filter((u) => u !== void 0)
      ), l = n.size > 0, g = o.some((u) => !u.sticky), b = n.size > 1;
      return l && (g || b) ? [
        {
          headerLabel: typeof t.header == "string" || typeof t.header == "number" ? String(t.header) : `#${r + 1}`,
          reason: b ? "left/right sticky 혼합" : "sticky/non-sticky 혼합"
        }
      ] : [];
    });
  }, [W, v]), Ne = d.useMemo(
    () => Se.map((e) => `${e.headerLabel}:${e.reason}`).join("|"),
    [Se]
  ), Ve = d.useRef("");
  d.useEffect(() => {
    if (!de) return;
    if (!Ne) {
      Ve.current = "";
      return;
    }
    if (Ve.current === Ne) return;
    Ve.current = Ne;
    const e = Se.map((t) => `${t.headerLabel}(${t.reason})`).join(", ");
    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. 그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + e
    );
  }, [Ne, Se, de]);
  const qt = es(
    Kt(ts, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    Kt(ss, {
      coordinateGetter: ns
    })
  ), nt = d.useCallback(
    (e) => {
      const { active: t, over: r } = e;
      if (!r || t.id === r.id) return;
      const o = pe.findIndex((g) => String(g) === t.id), n = pe.findIndex((g) => String(g) === r.id);
      if (o === -1 || n === -1) return;
      const l = wt(pe, o, n);
      Pe ? Pe(l) : it(l);
    },
    [pe, Pe]
  ), at = d.useCallback(
    (e) => {
      const { active: t, over: r } = e;
      if (!r || t.id === r.id) return;
      const o = String(t.id).replace(/^row-/, ""), n = String(r.id).replace(/^row-/, ""), l = p.findIndex((i) => String(i.id) === o), g = p.findIndex((i) => String(i.id) === n);
      if (l === -1 || g === -1) return;
      const b = wt(p, l, g);
      ke == null || ke(b);
    },
    [p, ke]
  ), Jt = d.useCallback(
    (e) => {
      const { active: t } = e;
      String(t.id).startsWith("row-") ? at(e) : nt(e);
    },
    [nt, at]
  ), We = (h == null ? void 0 : h.expandedRowIds) ?? Ot, $e = (h == null ? void 0 : h.onExpandedChange) ?? Bt, De = p.length > 0 && L.length === p.length, lt = L.length > 0 && !De, ot = () => {
    De ? N == null || N([]) : N == null || N(p.map((e) => e.id));
  }, ct = (e) => {
    L.includes(e) ? N == null || N(L.filter((t) => t !== e)) : N == null || N([...L, e]);
  }, re = d.useMemo(() => R ? Array.isArray(R) ? R.filter((e) => e.column && e.direction) : R.column && R.direction ? [R] : [] : [], [R]), dt = (e, t = !1) => {
    if (!J) return;
    const r = re.find((n) => n.column === e);
    if (w && t) {
      let n;
      r ? r.direction === "asc" ? n = re.map(
        (l) => l.column === e ? { column: e, direction: "desc" } : l
      ) : n = re.filter((l) => l.column !== e) : n = [...re, { column: e, direction: "asc" }], J(n);
    } else {
      let n;
      r && re.length === 1 ? r.direction === "asc" ? n = { column: e, direction: "desc" } : r.direction === "desc" ? n = { column: null, direction: null } : n = { column: e, direction: "asc" } : n = { column: e, direction: "asc" }, J(w ? n.column ? [n] : [] : n);
    }
  }, ht = (e) => {
    const t = re.find((r) => r.column === e);
    return (t == null ? void 0 : t.direction) ?? null;
  }, pt = (e) => {
    if (!w || re.length <= 1) return;
    const t = re.findIndex((r) => r.column === e);
    return t === -1 ? void 0 : t + 1;
  }, U = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, ut = (e, t, r) => {
    se({ rowId: e, columnKey: t }), ae(r), A.current = r;
  }, Fe = (e, t) => {
    const r = A.current;
    if (!y || r === null) {
      se(null), ae(null), A.current = null;
      return;
    }
    if (e.validate) {
      const o = e.validate(r, t);
      if (o !== !0) {
        se({ ...y, error: o });
        return;
      }
    }
    Q && Q(y.rowId, y.columnKey, r), se(null), ae(null), A.current = null;
  }, ft = d.useCallback(() => {
    if (!y) return;
    const e = v.find((r) => r.accessorKey === y.columnKey), t = p.find((r) => r.id === y.rowId);
    if (e && t)
      Fe(e, t);
    else {
      const r = A.current;
      r !== null && Q && Q(y.rowId, y.columnKey, r), se(null), ae(null), A.current = null;
    }
  }, [y, v, p, Q]), yt = d.useCallback(() => {
    se(null), ae(null), A.current = null;
  }, []);
  d.useEffect(() => {
    if (!y) return;
    const e = (t) => {
      var n, l;
      const r = t.target;
      (n = je.current) != null && n.contains(r) || (l = r.closest) != null && l.call(r, "[data-radix-popper-content-wrapper]") || ft();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [y, ft]);
  const gt = (e, t) => (y == null ? void 0 : y.rowId) === e && (y == null ? void 0 : y.columnKey) === t, Xe = (e) => h ? h.rowExpandable ? h.rowExpandable(e) : !0 : !1, qe = (e) => We.includes(e), mt = (e) => {
    qe(e) ? $e(We.filter((t) => t !== e)) : $e([...We, e]);
  }, ge = d.useMemo(() => h ? p.filter((e) => Xe(e)).map((e) => e.id) : [], [p, h]), me = ge.length > 0 && ge.every((e) => We.includes(e)), bt = () => {
    $e(me ? [] : ge);
  }, be = (m == null ? void 0 : m.showDelete) ?? !!(m != null && m.onRowDelete), Qt = (m == null ? void 0 : m.showAdd) ?? !!(m != null && m.onRowAdd), _ = 40, Ee = v.length + (K ? 1 : 0) + (h ? 1 : 0) + (V ? 1 : 0) + (be ? 1 : 0), { rowSpanMap: xt, middleRowSet: Je } = d.useMemo(() => {
    if (!P) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(P.groupBy) ? P.groupBy : [P.groupBy], t = P.mergeColumns ?? e, r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set();
    for (const n of t) {
      let l = 0;
      for (; l < p.length; ) {
        const g = e.map((a) => p[l][a]), b = p[l][n];
        let i = 1;
        for (let a = l + 1; a < p.length; a++) {
          const u = e.map((M) => p[a][M]), f = p[a][n];
          if (g.every((M, $) => M === u[$]) && b === f)
            i++;
          else
            break;
        }
        r.has(l) || r.set(l, /* @__PURE__ */ new Map()), r.get(l).set(n, i);
        for (let a = l; a < l + i - 1; a++)
          o.add(a);
        for (let a = l + 1; a < l + i; a++)
          r.has(a) || r.set(a, /* @__PURE__ */ new Map()), r.get(a).set(n, 0);
        l += i;
      }
    }
    return { rowSpanMap: r, middleRowSet: o };
  }, [p, P]), kt = (e, t) => {
    if (!xt) return;
    const r = xt.get(e);
    return r ? r.get(t) : void 0;
  }, vt = (e, t) => Be === null ? !1 : Be >= e && Be < e + t, St = (e, t) => {
    for (let r = e; r < e + t; r++)
      if (r < p.length && L.includes(p[r].id))
        return !0;
    return !1;
  }, k = 40, S = 40, j = 32, ue = d.useMemo(() => {
    const e = (f) => {
      const c = f.width ?? f.minWidth;
      if (typeof c == "number") return c;
      const O = parseInt(String(c), 10);
      return Number.isFinite(O) ? O : 150;
    }, t = v.filter((f) => f.sticky === "left"), r = v.filter((f) => f.sticky === "right"), o = V ? j : 0, n = K ? k : 0, l = h ? S : 0, g = o + n + l, b = /* @__PURE__ */ new Map();
    let i = g;
    for (const f of t)
      b.set(f.accessorKey, i), i += e(f);
    const a = /* @__PURE__ */ new Map();
    let u = 0;
    for (let f = r.length - 1; f >= 0; f--) {
      const c = r[f];
      a.set(c.accessorKey, u), u += e(c);
    }
    return (f, c, O, M) => {
      if (!f.sticky) return { style: {}, className: "" };
      const F = `${e(f)}px`, T = {
        position: "sticky",
        zIndex: c ? 20 : 10,
        width: F,
        minWidth: F,
        maxWidth: F
      }, B = M ?? O;
      if (f.sticky === "left") {
        const ce = b.get(f.accessorKey) ?? 0;
        return {
          style: {
            ...T,
            left: `${ce}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: x(
            "transition-colors",
            c ? "bg-slate-100 dark:bg-slate-800" : B ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
          )
        };
      }
      const ee = a.get(f.accessorKey) ?? 0;
      return {
        style: {
          ...T,
          right: `${ee}px`
        },
        className: x(
          "transition-colors",
          c ? "bg-slate-100 dark:bg-slate-800" : B ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
        )
      };
    };
  }, [v, K, h]), C = v.some((e) => e.sticky === "left"), oe = d.useCallback(
    (e) => {
      const t = String(e.accessorKey);
      if (xe && t in xe)
        return xe[t];
      if (t in Oe)
        return Oe[t];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [xe, Oe]
  ), Ut = d.useCallback(
    (e, t) => {
      e.preventDefault(), e.stopPropagation(), tt(t.accessorKey), st.current = e.clientX;
      const r = oe(t) ?? 150;
      rt.current = r;
    },
    [oe]
  ), Qe = d.useCallback(
    (e) => {
      if (!le) return;
      const t = e.clientX - st.current, r = Math.max(50, rt.current + t), o = String(le);
      Te ? Te(le, r) : Vt((n) => ({ ...n, [o]: r }));
    },
    [le, Te]
  ), Ue = d.useCallback(() => {
    tt(null);
  }, []);
  d.useEffect(() => {
    if (le)
      return document.addEventListener("mousemove", Qe), document.addEventListener("mouseup", Ue), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", Qe), document.removeEventListener("mouseup", Ue), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [le, Qe, Ue]);
  const Ke = (e) => {
    const t = ue(e, !0), r = (a) => typeof a == "number" ? `${a}px` : a, o = {};
    if (!e.sticky) {
      const a = Z ? oe(e) : void 0;
      a !== void 0 ? (o.width = `${a}px`, o.minWidth = `${a}px`) : (e.width && (o.width = r(e.width)), e.minWidth && (o.minWidth = r(e.minWidth)));
    }
    const n = { ...o, ...t.style }, g = At.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", b = Z && /* @__PURE__ */ s(
      "div",
      {
        className: x(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          le === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (a) => Ut(a, e),
        onPointerDown: (a) => a.stopPropagation(),
        onClick: (a) => a.stopPropagation()
      }
    );
    return G && !e.sticky && !e.sortable ? /* @__PURE__ */ H(
      us,
      {
        id: String(e.accessorKey),
        style: n,
        className: x(U(e.align), t.className, Z && "relative overflow-visible", g),
        children: [
          e.header,
          b
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ H(
      Mt,
      {
        sortDirection: ht(e.accessorKey),
        sortPriority: pt(e.accessorKey),
        onSort: (a) => dt(e.accessorKey, a),
        style: n,
        className: x(U(e.align), t.className, Z && "relative overflow-visible", g),
        children: [
          e.header,
          b
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ H(
      q,
      {
        style: n,
        className: x(U(e.align), t.className, Z && "relative overflow-visible", g),
        children: [
          e.header,
          b
        ]
      },
      String(e.accessorKey)
    );
  }, z = G ? Xt : v, Nt = z.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Yt = p.map((e) => `row-${e.id}`), Zt = () => 0, Ye = () => V ? j : 0, we = () => {
    let e = 0;
    return V && (e += j), K && (e += k), e;
  }, Gt = d.useCallback(
    (e) => z.filter(
      (t) => e.columns.includes(t.accessorKey)
    ).length,
    [z]
  ), Ie = d.useMemo(() => W ? new Set(W.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [W]), At = d.useMemo(() => {
    if (!W || W.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), t = (o) => W.findIndex((n) => n.columns.includes(o.accessorKey)), r = z.filter((o) => Ie.has(o.accessorKey));
    for (let o = 0; o < r.length - 1; o++) {
      const n = r[o], l = r[o + 1], g = t(n), b = t(l);
      g !== b && e.add(n.accessorKey);
    }
    return e;
  }, [W, z, Ie]), Wt = d.useCallback(
    (e) => {
      const t = z.filter((a) => e.columns.includes(a.accessorKey));
      if (t.length === 0) return { style: {}, className: "" };
      const r = t.every((a) => a.sticky === "left"), o = t.every((a) => a.sticky === "right");
      if (!r && !o) return { style: {}, className: "" };
      const n = r ? t[0] : t[t.length - 1], l = ue(n, !0), g = (a) => {
        const u = Z ? oe(a) : void 0;
        if (u !== void 0) return u;
        const f = a.width ?? a.minWidth;
        if (typeof f == "number") return f;
        const c = parseInt(String(f), 10);
        return Number.isFinite(c) ? c : 150;
      }, i = `${t.reduce((a, u) => a + g(u), 0)}px`;
      return {
        style: {
          ...l.style,
          width: i,
          minWidth: i,
          maxWidth: i
        },
        className: l.className
      };
    },
    [z, ue, oe, Z]
  ), $t = d.useMemo(() => {
    if (!W || W.length === 0) return [];
    const e = [], t = /* @__PURE__ */ new Set();
    for (const r of z) {
      const o = W.findIndex((n) => n.columns.includes(r.accessorKey));
      o !== -1 ? t.has(o) || (t.add(o), e.push({ type: "group", group: W[o] })) : e.push({ type: "standalone", col: r });
    }
    return e;
  }, [W, z]), Dt = /* @__PURE__ */ H(ls, { className: Ce, maxHeight: ne, wrapperRef: et, children: [
    /* @__PURE__ */ H(os, { children: [
      W && W.length > 0 && /* @__PURE__ */ H(ie, { children: [
        V && /* @__PURE__ */ s(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${j}px`,
              minWidth: `${j}px`,
              ...C && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        K && /* @__PURE__ */ s(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              ...C && { position: "sticky", left: V ? j : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ s(
              Me,
              {
                checked: De,
                indeterminate: lt,
                onCheckedChange: ot,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        h && /* @__PURE__ */ s(
          q,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${S}px`,
              minWidth: `${S}px`,
              ...C && { position: "sticky", left: we(), zIndex: 20 }
            },
            children: (h == null ? void 0 : h.showExpandAll) !== !1 && ge.length > 0 && /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                onClick: bt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": me ? "모두 접기" : "모두 펼치기",
                children: me ? /* @__PURE__ */ s(He, { size: 24 }) : /* @__PURE__ */ s(Re, { size: 24 })
              }
            )
          }
        ),
        be && /* @__PURE__ */ s(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${_}px`,
              minWidth: `${_}px`,
              maxWidth: `${_}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ s("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        $t.map((e, t) => {
          const r = $t[t + 1], o = e.type === "group" && (r == null ? void 0 : r.type) === "group";
          if (e.type === "group") {
            const n = Gt(e.group);
            if (n === 0) return null;
            const l = z.filter(
              (u) => e.group.columns.includes(u.accessorKey)
            );
            if (new Set(
              l.map((u) => u.sticky ?? "none")
            ).size > 1) {
              const u = [];
              let f = [], c = l[0].sticky;
              for (const $ of l)
                $.sticky === c ? f.push($) : (f.length > 0 && u.push({ cols: f, sticky: c }), f = [$], c = $.sticky);
              f.length > 0 && u.push({ cols: f, sticky: c });
              const O = u.findIndex(($) => !$.sticky), M = O !== -1 ? O : 0;
              return u.map(($, F) => {
                const T = {
                  header: e.group.header,
                  columns: $.cols.map((ce) => ce.accessorKey),
                  align: e.group.align
                }, B = $.sticky ? Wt(T) : { style: {}, className: "" }, ee = !!B.style.position;
                return /* @__PURE__ */ s(
                  q,
                  {
                    colSpan: $.cols.length,
                    className: x(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      o && F === u.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      B.className
                    ),
                    style: ee ? B.style : { position: "relative", zIndex: 0 },
                    children: F === M ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${F}`
                );
              });
            }
            const i = Wt(e.group), a = !!i.style.position;
            return /* @__PURE__ */ s(
              q,
              {
                colSpan: n,
                className: x(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  o && "border-r border-slate-200 dark:border-slate-700",
                  i.className
                ),
                style: a ? i.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const n = ue(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ s(
              Mt,
              {
                rowSpan: 2,
                sortDirection: ht(e.col.accessorKey),
                sortPriority: pt(e.col.accessorKey),
                onSort: (l) => dt(e.col.accessorKey, l),
                className: x(
                  U(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  n.className
                ),
                style: n.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ s(
              q,
              {
                rowSpan: 2,
                className: x(
                  U(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  n.className
                ),
                style: n.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            );
          }
        })
      ] }),
      /* @__PURE__ */ H(ie, { children: [
        !W && V && /* @__PURE__ */ s(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: C ? {
              position: "sticky",
              left: Zt(),
              zIndex: 20,
              width: `${j}px`,
              minWidth: `${j}px`,
              maxWidth: `${j}px`
            } : {
              width: `${j}px`,
              minWidth: `${j}px`,
              maxWidth: `${j}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ s("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !W && K && /* @__PURE__ */ s(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: C ? {
              position: "sticky",
              left: Ye(),
              zIndex: 20,
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            } : {
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            },
            children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ s(
              Me,
              {
                checked: De,
                indeterminate: lt,
                onCheckedChange: ot,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !W && h && /* @__PURE__ */ s(
          q,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: C ? {
              position: "sticky",
              left: we(),
              zIndex: 20,
              width: `${S}px`,
              minWidth: `${S}px`,
              maxWidth: `${S}px`
            } : {
              width: `${S}px`,
              minWidth: `${S}px`,
              maxWidth: `${S}px`
            },
            "aria-label": "확장",
            children: (h == null ? void 0 : h.showExpandAll) !== !1 && ge.length > 0 ? /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                onClick: bt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": me ? "모두 접기" : "모두 펼치기",
                children: me ? /* @__PURE__ */ s(He, { size: 24 }) : /* @__PURE__ */ s(Re, { size: 24 })
              }
            ) : /* @__PURE__ */ s("span", { className: "sr-only", children: "확장" })
          }
        ),
        !W && be && /* @__PURE__ */ s(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${_}px`,
              minWidth: `${_}px`,
              maxWidth: `${_}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ s("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        W ? G ? /* @__PURE__ */ s(Ze, { items: Nt, strategy: It, children: z.filter((e) => Ie.has(e.accessorKey)).map(Ke) }) : z.filter((e) => Ie.has(e.accessorKey)).map(Ke) : G ? /* @__PURE__ */ s(Ze, { items: Nt, strategy: It, children: z.map(Ke) }) : z.map(Ke)
      ] })
    ] }),
    /* @__PURE__ */ H(cs, { children: [
      Ge ? /* @__PURE__ */ s(ie, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ s(
        E,
        {
          colSpan: Ee,
          className: x(
            "text-center",
            ye || ve !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: ye ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ s(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: Y ? { width: Y } : void 0,
                children: ye
              }
            )
          ) : ve === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const t = typeof ne == "number" ? ne : typeof ne == "string" && parseInt(ne, 10) || 320, r = Math.max(1, Math.floor(t / 41));
              return /* @__PURE__ */ s("table", { className: "w-full", children: /* @__PURE__ */ s("tbody", { children: Array.from({ length: r }).map((o, n) => /* @__PURE__ */ H(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    V && /* @__PURE__ */ s("td", { className: "w-8 p-2", children: /* @__PURE__ */ s(ze, { width: 16, height: 16 }) }),
                    K && /* @__PURE__ */ s("td", { className: "w-10 p-2", children: /* @__PURE__ */ s(ze, { width: 18, height: 18 }) }),
                    h && /* @__PURE__ */ s("td", { className: "w-10 p-2", children: /* @__PURE__ */ s(ze, { width: 18, height: 18 }) }),
                    z.map((l) => {
                      const g = l.width ?? l.minWidth, b = typeof g == "number" ? Math.min(g * 0.6, 150) : 100;
                      return /* @__PURE__ */ s("td", { className: "p-2", children: /* @__PURE__ */ s(ze, { height: 16, width: b }) }, String(l.accessorKey));
                    })
                  ]
                },
                n
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본) - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ s(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: Y ? { width: Y } : void 0,
                children: /* @__PURE__ */ s(hs, { size: "lg" })
              }
            )
          )
        }
      ) }) : p.length === 0 ? /* @__PURE__ */ s(ie, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ s(
        E,
        {
          colSpan: Ee,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ s(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: Y ? { width: Y } : void 0,
              children: fe
            }
          )
        }
      ) }) : V ? /* @__PURE__ */ s(Ze, { items: Yt, strategy: as, children: p.map((e, t) => {
        const r = L.includes(e.id), o = Xe(e), n = qe(e.id), l = `row-${e.id}`, g = (b) => /* @__PURE__ */ H(Et, { children: [
          /* @__PURE__ */ s(
            Tt,
            {
              isSelected: r,
              hasLeftStickyColumns: C,
              dragHandleProps: b
            }
          ),
          K && /* @__PURE__ */ s(
            E,
            {
              onClick: (i) => i.stopPropagation(),
              className: x(
                "!p-0",
                C && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: C ? {
                position: "sticky",
                left: Ye(),
                zIndex: 10,
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              } : {
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              },
              children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ s(
                Me,
                {
                  checked: r,
                  onCheckedChange: () => ct(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          h && /* @__PURE__ */ s(
            E,
            {
              className: x(
                "p-0",
                C && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: C ? {
                position: "sticky",
                left: we(),
                zIndex: 10,
                width: `${S}px`,
                minWidth: `${S}px`,
                maxWidth: `${S}px`
              } : {
                width: `${S}px`,
                minWidth: `${S}px`,
                maxWidth: `${S}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: o && /* @__PURE__ */ s(
                "button",
                {
                  type: "button",
                  onClick: () => mt(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": n ? "행 접기" : "행 펼치기",
                  "aria-expanded": n,
                  children: n ? /* @__PURE__ */ s(He, { size: 24 }) : /* @__PURE__ */ s(Re, { size: 24 })
                }
              )
            }
          ),
          be && /* @__PURE__ */ s(
            E,
            {
              className: "!p-0",
              style: {
                width: `${_}px`,
                minWidth: `${_}px`,
                maxWidth: `${_}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: /* @__PURE__ */ s(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var i;
                    return (i = m == null ? void 0 : m.onRowDelete) == null ? void 0 : i.call(m, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ s(zt, { size: 20 })
                }
              )
            }
          ),
          z.map((i) => {
            const a = kt(t, i.accessorKey);
            if (a === 0) return null;
            const u = e[i.accessorKey], f = gt(e.id, i.accessorKey), c = a !== void 0 && a > 1, O = c && vt(t, a), M = c && St(t, a), $ = ue(i, !1, r, c ? M : void 0), F = (D) => typeof D == "number" ? `${D}px` : D, T = {};
            if (!i.sticky) {
              const D = Z ? oe(i) : void 0;
              D !== void 0 ? (T.width = `${D}px`, T.minWidth = `${D}px`) : (i.width && (T.width = F(i.width)), i.minWidth && (T.minWidth = F(i.minWidth)));
            }
            const B = { ...T, ...$.style };
            if (f && i.editable) {
              const D = i.editComponent || Rt;
              return /* @__PURE__ */ s(
                E,
                {
                  ref: je,
                  className: x(U(i.align), "p-1 overflow-hidden", $.className),
                  style: B,
                  onClick: (te) => te.stopPropagation(),
                  rowSpan: c ? a : void 0,
                  children: /* @__PURE__ */ s(
                    D,
                    {
                      value: Ae,
                      onChange: (te) => {
                        ae(te), A.current = te, y != null && y.error && se({ ...y, error: void 0 });
                      },
                      onComplete: () => Fe(i, e),
                      onCancel: yt,
                      row: e,
                      error: y == null ? void 0 : y.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const ee = i.cell ? i.cell(u, e) : String(u ?? "");
            if (i.editable && Q)
              return /* @__PURE__ */ s(
                E,
                {
                  className: x(
                    U(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    c && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    c && M && "bg-blue-50 dark:bg-blue-900",
                    c && !M && O && "bg-slate-100 dark:bg-slate-800",
                    $.className
                  ),
                  style: B,
                  onClick: (D) => {
                    D.stopPropagation(), setTimeout(() => ut(e.id, i.accessorKey, u), 0);
                  },
                  rowSpan: c ? a : void 0,
                  children: /* @__PURE__ */ H("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ s("span", { className: "flex-1", children: ee }),
                    /* @__PURE__ */ s(
                      Ht,
                      {
                        size: 14,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const ce = c && t + a >= p.length;
            return /* @__PURE__ */ s(
              E,
              {
                className: x(
                  U(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  c && "align-middle transition-colors",
                  c && !ce && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  c && M && "bg-blue-50 dark:bg-blue-900",
                  c && !M && O && "bg-slate-100 dark:bg-slate-800",
                  $.className
                ),
                style: B,
                rowSpan: c ? a : void 0,
                children: ee
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ H(d.Fragment, { children: [
          /* @__PURE__ */ s(
            Ct,
            {
              id: l,
              isSelected: r,
              className: x(I && "cursor-pointer", X == null ? void 0 : X(e)),
              onClick: () => I == null ? void 0 : I(e),
              onMouseEnter: P ? () => he(t) : void 0,
              onMouseLeave: P ? () => he(null) : void 0,
              children: (b) => g(b)
            }
          ),
          h && n && /* @__PURE__ */ s(ie, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ s(
            E,
            {
              colSpan: Ee,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ s(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: Y ? `${Y}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: h.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : p.map((e, t) => {
        const r = L.includes(e.id), o = Xe(e), n = qe(e.id), l = `row-${e.id}`, g = (b) => /* @__PURE__ */ H(Et, { children: [
          V && /* @__PURE__ */ s(
            Tt,
            {
              isSelected: r,
              hasLeftStickyColumns: C,
              dragHandleProps: b
            }
          ),
          K && /* @__PURE__ */ s(
            E,
            {
              onClick: (i) => i.stopPropagation(),
              className: x(
                "!p-0",
                C && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: C ? {
                position: "sticky",
                left: Ye(),
                zIndex: 10,
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              } : {
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              },
              children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ s(
                Me,
                {
                  checked: r,
                  onCheckedChange: () => ct(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          h && /* @__PURE__ */ s(
            E,
            {
              className: x(
                "p-0",
                C && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: C ? {
                position: "sticky",
                left: we(),
                zIndex: 10,
                width: `${S}px`,
                minWidth: `${S}px`,
                maxWidth: `${S}px`
              } : {
                width: `${S}px`,
                minWidth: `${S}px`,
                maxWidth: `${S}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: o && /* @__PURE__ */ s(
                "button",
                {
                  type: "button",
                  onClick: () => mt(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": n ? "행 접기" : "행 펼치기",
                  "aria-expanded": n,
                  children: n ? /* @__PURE__ */ s(He, { size: 24 }) : /* @__PURE__ */ s(Re, { size: 24 })
                }
              )
            }
          ),
          be && /* @__PURE__ */ s(
            E,
            {
              className: "!p-0",
              style: {
                width: `${_}px`,
                minWidth: `${_}px`,
                maxWidth: `${_}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: /* @__PURE__ */ s(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var i;
                    return (i = m == null ? void 0 : m.onRowDelete) == null ? void 0 : i.call(m, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ s(zt, { size: 20 })
                }
              )
            }
          ),
          z.map((i) => {
            const a = kt(t, i.accessorKey);
            if (a === 0) return null;
            const u = e[i.accessorKey], f = gt(e.id, i.accessorKey), c = a !== void 0 && a > 1, O = c && vt(t, a), M = c && St(t, a), $ = ue(i, !1, r, c ? M : void 0), F = (D) => typeof D == "number" ? `${D}px` : D, T = {};
            if (!i.sticky) {
              const D = Z ? oe(i) : void 0;
              D !== void 0 ? (T.width = `${D}px`, T.minWidth = `${D}px`) : (i.width && (T.width = F(i.width)), i.minWidth && (T.minWidth = F(i.minWidth)));
            }
            const B = { ...T, ...$.style };
            if (f && i.editable) {
              const D = i.editComponent || Rt;
              return /* @__PURE__ */ s(
                E,
                {
                  ref: je,
                  className: x(U(i.align), "p-1 overflow-hidden", $.className),
                  style: B,
                  onClick: (te) => te.stopPropagation(),
                  rowSpan: c ? a : void 0,
                  children: /* @__PURE__ */ s(
                    D,
                    {
                      value: Ae,
                      onChange: (te) => {
                        ae(te), A.current = te, y != null && y.error && se({ ...y, error: void 0 });
                      },
                      onComplete: () => Fe(i, e),
                      onCancel: yt,
                      row: e,
                      error: y == null ? void 0 : y.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const ee = i.cell ? i.cell(u, e) : String(u ?? "");
            if (i.editable && Q)
              return /* @__PURE__ */ s(
                E,
                {
                  className: x(
                    U(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    c && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    c && M && "bg-blue-50 dark:bg-blue-900",
                    c && !M && O && "bg-slate-100 dark:bg-slate-800",
                    $.className
                  ),
                  style: B,
                  onClick: (D) => {
                    D.stopPropagation(), setTimeout(() => {
                      ut(e.id, i.accessorKey, u);
                    }, 0);
                  },
                  rowSpan: c ? a : void 0,
                  children: /* @__PURE__ */ H("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ s("span", { className: "flex-1", children: ee }),
                    /* @__PURE__ */ s(
                      Ht,
                      {
                        size: 20,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const ce = c && t + a >= p.length;
            return /* @__PURE__ */ s(
              E,
              {
                className: x(
                  U(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  c && "align-middle transition-colors",
                  c && !ce && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  c && M && "bg-blue-50 dark:bg-blue-900",
                  c && !M && O && "bg-slate-100 dark:bg-slate-800",
                  $.className
                ),
                style: B,
                rowSpan: c ? a : void 0,
                children: ee
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ H(d.Fragment, { children: [
          V ? /* @__PURE__ */ s(
            Ct,
            {
              id: l,
              isSelected: r,
              className: x(I && "cursor-pointer", X == null ? void 0 : X(e)),
              onClick: () => I == null ? void 0 : I(e),
              onMouseEnter: P ? () => he(t) : void 0,
              onMouseLeave: P ? () => he(null) : void 0,
              children: (b) => g(b)
            }
          ) : /* @__PURE__ */ s(
            ie,
            {
              "data-state": r ? "selected" : void 0,
              className: x(
                I && "cursor-pointer",
                (Je == null ? void 0 : Je.has(t)) && "border-b-0",
                X == null ? void 0 : X(e)
              ),
              onClick: () => I == null ? void 0 : I(e),
              onMouseEnter: P ? () => he(t) : void 0,
              onMouseLeave: P ? () => he(null) : void 0,
              children: g()
            }
          ),
          h && n && /* @__PURE__ */ s(ie, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ s(
            E,
            {
              colSpan: Ee,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ s(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: Y ? `${Y}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: h.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      Qt && !Ge && /* @__PURE__ */ H(ie, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        V && /* @__PURE__ */ s(
          E,
          {
            className: "!p-0",
            style: {
              width: `${j}px`,
              minWidth: `${j}px`,
              maxWidth: `${j}px`
            }
          }
        ),
        K && /* @__PURE__ */ s(
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
        h && /* @__PURE__ */ s(
          E,
          {
            className: "!p-0",
            style: {
              width: `${S}px`,
              minWidth: `${S}px`,
              maxWidth: `${S}px`
            }
          }
        ),
        /* @__PURE__ */ s(
          E,
          {
            className: "!p-0",
            style: {
              width: `${_}px`,
              minWidth: `${_}px`,
              maxWidth: `${_}px`
            },
            children: /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                onClick: () => {
                  var e;
                  return (e = m == null ? void 0 : m.onRowAdd) == null ? void 0 : e.call(m);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ s(ps, { size: 20 })
              }
            )
          }
        ),
        z.map((e) => /* @__PURE__ */ s(
          E,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return G || V ? /* @__PURE__ */ s(
    rs,
    {
      sensors: qt,
      collisionDetection: is,
      onDragEnd: Jt,
      children: Dt
    }
  ) : Dt;
}
export {
  Is as DataTable
};
//# sourceMappingURL=data-table.mjs.map
