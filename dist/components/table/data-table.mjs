import { jsxs as H, jsx as r, Fragment as Et } from "react/jsx-runtime";
import * as d from "react";
import { useSensors as es, useSensor as Kt, PointerSensor as ts, KeyboardSensor as ss, DndContext as rs, closestCenter as is } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as ns, arrayMove as wt, SortableContext as Ze, horizontalListSortingStrategy as It, verticalListSortingStrategy as as, useSortable as Lt } from "@dnd-kit/sortable";
import { CSS as Pt } from "@dnd-kit/utilities";
import { cn as x } from "../../lib/utils.mjs";
import { Table as ls, TableHeader as os, TableRow as re, TableHead as q, TableSortableHead as zt, TableBody as cs, TableCell as E } from "./table.mjs";
import { Checkbox as ze } from "../ui/checkbox.mjs";
import { Input as ds } from "../ui/input.mjs";
import { Skeleton as Me } from "../ui/skeleton.mjs";
import { SplashScreen as hs } from "../ui/splash-screen.mjs";
import { DownIcon as He } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as _t } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as Re } from "../../icons/RightIcon.mjs";
import { RowAddIcon as ps } from "../../icons/RowAddIcon.mjs";
import { RowDeleteIcon as Mt } from "../../icons/RowDeleteIcon.mjs";
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
    var z, w;
    (z = R.current) == null || z.focus(), (w = R.current) == null || w.select();
  }, []);
  const J = (z) => {
    z.key === "Enter" ? (z.preventDefault(), K()) : z.key === "Escape" && (z.preventDefault(), L());
  };
  return /* @__PURE__ */ H("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ r(
      ds,
      {
        ref: R,
        value: String(v ?? ""),
        onChange: (z) => p(z.target.value),
        onKeyDown: J,
        onBlur: K,
        error: !!N,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    N && /* @__PURE__ */ r("span", { className: "text-[10px] text-destructive dark:text-red-400", children: N })
  ] });
}
function fs({
  id: v,
  children: p,
  className: K,
  style: L,
  disabled: N
}) {
  const {
    attributes: R,
    listeners: J,
    setNodeRef: z,
    transform: w,
    transition: Q,
    isDragging: h
  } = Lt({ id: v, disabled: N }), ue = {
    ...L,
    transform: Pt.Transform.toString(w),
    transition: Q,
    opacity: h ? 0.5 : 1,
    cursor: N ? void 0 : "grab"
  };
  return /* @__PURE__ */ r(
    "th",
    {
      ref: z,
      style: ue,
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
        /* @__PURE__ */ r(
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
    setNodeRef: z,
    setActivatorNodeRef: w,
    listeners: Q,
    attributes: h,
    transform: ue,
    transition: Ce,
    isDragging: X
  } = Lt({ id: v }), ie = {
    transform: Pt.Transform.toString(ue),
    transition: Ce,
    opacity: X ? 0.5 : 1
  };
  return /* @__PURE__ */ r(
    "tr",
    {
      ref: z,
      style: ie,
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
      children: typeof p == "function" ? p({ listeners: Q, attributes: h, setActivatorNodeRef: w }) : p
    }
  );
}
function Tt({ isSelected: v, hasLeftStickyColumns: p, dragHandleProps: K }) {
  const { listeners: N, attributes: R, setActivatorNodeRef: J } = K ?? {};
  return /* @__PURE__ */ r(
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
      children: /* @__PURE__ */ r(
        "div",
        {
          ref: J,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (z) => z.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...N,
          ...R,
          children: /* @__PURE__ */ r(_t, { size: 16 })
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
  multiSort: z = !1,
  onRowClick: w,
  onCellChange: Q,
  expandable: h,
  emptyMessage: ue = "데이터가 없습니다.",
  className: Ce,
  rowClassName: X,
  maxHeight: ie,
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
  const [y, se] = d.useState(null), [Ae, ne] = d.useState(null), A = d.useRef(null), je = d.useRef(null), et = d.useRef(null), [Y, jt] = d.useState(0);
  d.useEffect(() => {
    const e = et.current;
    if (!e) return;
    const t = () => jt(e.clientWidth);
    t();
    const s = new ResizeObserver(t);
    return s.observe(e), () => s.disconnect();
  }, []);
  const [Ot, Bt] = d.useState(
    (h == null ? void 0 : h.defaultExpandedRowIds) ?? []
  ), [Oe, Vt] = d.useState({}), [ae, tt] = d.useState(null), st = d.useRef(0), rt = d.useRef(0), [Ft, it] = d.useState(
    () => v.map((e) => e.accessorKey)
  ), [Be, he] = d.useState(null);
  d.useEffect(() => {
    !G || Le || it((e) => {
      const t = v.map((o) => o.accessorKey), s = e.filter((o) => t.includes(o)), a = t.filter((o) => !s.includes(o)), l = [...s, ...a];
      return l.length === e.length && l.every((o, g) => o === e[g]) ? e : l;
    });
  }, [v, G, Le]);
  const pe = Le ?? Ft, Xt = d.useMemo(() => G ? pe.map((e) => v.find((t) => t.accessorKey === e)).filter((e) => e !== void 0) : v, [v, pe, G]), Se = d.useMemo(() => {
    if (!W || W.length === 0) return [];
    const e = new Map(
      v.map((t) => [t.accessorKey, t])
    );
    return W.flatMap((t, s) => {
      const a = t.columns.map((f) => e.get(f)).filter((f) => f !== void 0);
      if (a.length === 0) return [];
      const l = new Set(
        a.map((f) => f.sticky).filter((f) => f !== void 0)
      ), o = l.size > 0, g = a.some((f) => !f.sticky), b = l.size > 1;
      return o && (g || b) ? [
        {
          headerLabel: typeof t.header == "string" || typeof t.header == "number" ? String(t.header) : `#${s + 1}`,
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
      const { active: t, over: s } = e;
      if (!s || t.id === s.id) return;
      const a = pe.findIndex((g) => String(g) === t.id), l = pe.findIndex((g) => String(g) === s.id);
      if (a === -1 || l === -1) return;
      const o = wt(pe, a, l);
      Pe ? Pe(o) : it(o);
    },
    [pe, Pe]
  ), at = d.useCallback(
    (e) => {
      const { active: t, over: s } = e;
      if (!s || t.id === s.id) return;
      const a = String(t.id).replace(/^row-/, ""), l = String(s.id).replace(/^row-/, ""), o = p.findIndex((i) => String(i.id) === a), g = p.findIndex((i) => String(i.id) === l);
      if (o === -1 || g === -1) return;
      const b = wt(p, o, g);
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
  }, le = d.useMemo(() => R ? Array.isArray(R) ? R.filter((e) => e.column && e.direction) : R.column && R.direction ? [R] : [] : [], [R]), dt = (e) => {
    if (!J) return;
    const t = le.find((s) => s.column === e);
    if (z) {
      let s;
      t ? t.direction === "asc" ? s = le.map(
        (a) => a.column === e ? { column: e, direction: "desc" } : a
      ) : s = le.filter((a) => a.column !== e) : s = [...le, { column: e, direction: "asc" }], J(s);
    } else {
      let s;
      t ? t.direction === "asc" ? s = { column: e, direction: "desc" } : t.direction === "desc" ? s = { column: null, direction: null } : s = { column: e, direction: "asc" } : s = { column: e, direction: "asc" }, J(s);
    }
  }, ht = (e) => {
    const t = le.find((s) => s.column === e);
    return (t == null ? void 0 : t.direction) ?? null;
  }, pt = (e) => {
    if (!z || le.length <= 1) return;
    const t = le.findIndex((s) => s.column === e);
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
  }, ft = (e, t, s) => {
    se({ rowId: e, columnKey: t }), ne(s), A.current = s;
  }, Fe = (e, t) => {
    const s = A.current;
    if (!y || s === null) {
      se(null), ne(null), A.current = null;
      return;
    }
    if (e.validate) {
      const a = e.validate(s, t);
      if (a !== !0) {
        se({ ...y, error: a });
        return;
      }
    }
    Q && Q(y.rowId, y.columnKey, s), se(null), ne(null), A.current = null;
  }, ut = d.useCallback(() => {
    if (!y) return;
    const e = v.find((s) => s.accessorKey === y.columnKey), t = p.find((s) => s.id === y.rowId);
    if (e && t)
      Fe(e, t);
    else {
      const s = A.current;
      s !== null && Q && Q(y.rowId, y.columnKey, s), se(null), ne(null), A.current = null;
    }
  }, [y, v, p, Q]), yt = d.useCallback(() => {
    se(null), ne(null), A.current = null;
  }, []);
  d.useEffect(() => {
    if (!y) return;
    const e = (t) => {
      var l, o;
      const s = t.target;
      (l = je.current) != null && l.contains(s) || (o = s.closest) != null && o.call(s, "[data-radix-popper-content-wrapper]") || ut();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [y, ut]);
  const gt = (e, t) => (y == null ? void 0 : y.rowId) === e && (y == null ? void 0 : y.columnKey) === t, Xe = (e) => h ? h.rowExpandable ? h.rowExpandable(e) : !0 : !1, qe = (e) => We.includes(e), mt = (e) => {
    qe(e) ? $e(We.filter((t) => t !== e)) : $e([...We, e]);
  }, ge = d.useMemo(() => h ? p.filter((e) => Xe(e)).map((e) => e.id) : [], [p, h]), me = ge.length > 0 && ge.every((e) => We.includes(e)), bt = () => {
    $e(me ? [] : ge);
  }, be = (m == null ? void 0 : m.showDelete) ?? !!(m != null && m.onRowDelete), Qt = (m == null ? void 0 : m.showAdd) ?? !!(m != null && m.onRowAdd), _ = 40, Ee = v.length + (K ? 1 : 0) + (h ? 1 : 0) + (V ? 1 : 0) + (be ? 1 : 0), { rowSpanMap: xt, middleRowSet: Je } = d.useMemo(() => {
    if (!P) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(P.groupBy) ? P.groupBy : [P.groupBy], t = P.mergeColumns ?? e, s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
    for (const l of t) {
      let o = 0;
      for (; o < p.length; ) {
        const g = e.map((n) => p[o][n]), b = p[o][l];
        let i = 1;
        for (let n = o + 1; n < p.length; n++) {
          const f = e.map((I) => p[n][I]), u = p[n][l];
          if (g.every((I, $) => I === f[$]) && b === u)
            i++;
          else
            break;
        }
        s.has(o) || s.set(o, /* @__PURE__ */ new Map()), s.get(o).set(l, i);
        for (let n = o; n < o + i - 1; n++)
          a.add(n);
        for (let n = o + 1; n < o + i; n++)
          s.has(n) || s.set(n, /* @__PURE__ */ new Map()), s.get(n).set(l, 0);
        o += i;
      }
    }
    return { rowSpanMap: s, middleRowSet: a };
  }, [p, P]), kt = (e, t) => {
    if (!xt) return;
    const s = xt.get(e);
    return s ? s.get(t) : void 0;
  }, vt = (e, t) => Be === null ? !1 : Be >= e && Be < e + t, St = (e, t) => {
    for (let s = e; s < e + t; s++)
      if (s < p.length && L.includes(p[s].id))
        return !0;
    return !1;
  }, k = 40, S = 40, j = 32, fe = d.useMemo(() => {
    const e = (u) => {
      const c = u.width ?? u.minWidth;
      if (typeof c == "number") return c;
      const O = parseInt(String(c), 10);
      return Number.isFinite(O) ? O : 150;
    }, t = v.filter((u) => u.sticky === "left"), s = v.filter((u) => u.sticky === "right"), a = V ? j : 0, l = K ? k : 0, o = h ? S : 0, g = a + l + o, b = /* @__PURE__ */ new Map();
    let i = g;
    for (const u of t)
      b.set(u.accessorKey, i), i += e(u);
    const n = /* @__PURE__ */ new Map();
    let f = 0;
    for (let u = s.length - 1; u >= 0; u--) {
      const c = s[u];
      n.set(c.accessorKey, f), f += e(c);
    }
    return (u, c, O, I) => {
      if (!u.sticky) return { style: {}, className: "" };
      const F = `${e(u)}px`, T = {
        position: "sticky",
        zIndex: c ? 20 : 10,
        width: F,
        minWidth: F,
        maxWidth: F
      }, B = I ?? O;
      if (u.sticky === "left") {
        const ce = b.get(u.accessorKey) ?? 0;
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
      const ee = n.get(u.accessorKey) ?? 0;
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
      const s = oe(t) ?? 150;
      rt.current = s;
    },
    [oe]
  ), Qe = d.useCallback(
    (e) => {
      if (!ae) return;
      const t = e.clientX - st.current, s = Math.max(50, rt.current + t), a = String(ae);
      Te ? Te(ae, s) : Vt((l) => ({ ...l, [a]: s }));
    },
    [ae, Te]
  ), Ue = d.useCallback(() => {
    tt(null);
  }, []);
  d.useEffect(() => {
    if (ae)
      return document.addEventListener("mousemove", Qe), document.addEventListener("mouseup", Ue), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", Qe), document.removeEventListener("mouseup", Ue), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [ae, Qe, Ue]);
  const Ke = (e) => {
    const t = fe(e, !0), s = (n) => typeof n == "number" ? `${n}px` : n, a = {};
    if (!e.sticky) {
      const n = Z ? oe(e) : void 0;
      n !== void 0 ? (a.width = `${n}px`, a.minWidth = `${n}px`) : (e.width && (a.width = s(e.width)), e.minWidth && (a.minWidth = s(e.minWidth)));
    }
    const l = { ...a, ...t.style }, g = At.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", b = Z && /* @__PURE__ */ r(
      "div",
      {
        className: x(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          ae === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (n) => Ut(n, e),
        onPointerDown: (n) => n.stopPropagation(),
        onClick: (n) => n.stopPropagation()
      }
    );
    return G && !e.sticky && !e.sortable ? /* @__PURE__ */ H(
      fs,
      {
        id: String(e.accessorKey),
        style: l,
        className: x(U(e.align), t.className, Z && "relative overflow-visible", g),
        children: [
          e.header,
          b
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ H(
      zt,
      {
        sortDirection: ht(e.accessorKey),
        sortPriority: pt(e.accessorKey),
        onSort: () => dt(e.accessorKey),
        style: l,
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
        style: l,
        className: x(U(e.align), t.className, Z && "relative overflow-visible", g),
        children: [
          e.header,
          b
        ]
      },
      String(e.accessorKey)
    );
  }, M = G ? Xt : v, Nt = M.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Yt = p.map((e) => `row-${e.id}`), Zt = () => 0, Ye = () => V ? j : 0, we = () => {
    let e = 0;
    return V && (e += j), K && (e += k), e;
  }, Gt = d.useCallback(
    (e) => M.filter(
      (t) => e.columns.includes(t.accessorKey)
    ).length,
    [M]
  ), Ie = d.useMemo(() => W ? new Set(W.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [W]), At = d.useMemo(() => {
    if (!W || W.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), t = (a) => W.findIndex((l) => l.columns.includes(a.accessorKey)), s = M.filter((a) => Ie.has(a.accessorKey));
    for (let a = 0; a < s.length - 1; a++) {
      const l = s[a], o = s[a + 1], g = t(l), b = t(o);
      g !== b && e.add(l.accessorKey);
    }
    return e;
  }, [W, M, Ie]), Wt = d.useCallback(
    (e) => {
      const t = M.filter((n) => e.columns.includes(n.accessorKey));
      if (t.length === 0) return { style: {}, className: "" };
      const s = t.every((n) => n.sticky === "left"), a = t.every((n) => n.sticky === "right");
      if (!s && !a) return { style: {}, className: "" };
      const l = s ? t[0] : t[t.length - 1], o = fe(l, !0), g = (n) => {
        const f = Z ? oe(n) : void 0;
        if (f !== void 0) return f;
        const u = n.width ?? n.minWidth;
        if (typeof u == "number") return u;
        const c = parseInt(String(u), 10);
        return Number.isFinite(c) ? c : 150;
      }, i = `${t.reduce((n, f) => n + g(f), 0)}px`;
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
    [M, fe, oe, Z]
  ), $t = d.useMemo(() => {
    if (!W || W.length === 0) return [];
    const e = [], t = /* @__PURE__ */ new Set();
    for (const s of M) {
      const a = W.findIndex((l) => l.columns.includes(s.accessorKey));
      a !== -1 ? t.has(a) || (t.add(a), e.push({ type: "group", group: W[a] })) : e.push({ type: "standalone", col: s });
    }
    return e;
  }, [W, M]), Dt = /* @__PURE__ */ H(ls, { className: Ce, maxHeight: ie, wrapperRef: et, children: [
    /* @__PURE__ */ H(os, { children: [
      W && W.length > 0 && /* @__PURE__ */ H(re, { children: [
        V && /* @__PURE__ */ r(
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
        K && /* @__PURE__ */ r(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              ...C && { position: "sticky", left: V ? j : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ r(
              ze,
              {
                checked: De,
                indeterminate: lt,
                onCheckedChange: ot,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        h && /* @__PURE__ */ r(
          q,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${S}px`,
              minWidth: `${S}px`,
              ...C && { position: "sticky", left: we(), zIndex: 20 }
            },
            children: (h == null ? void 0 : h.showExpandAll) !== !1 && ge.length > 0 && /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: bt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": me ? "모두 접기" : "모두 펼치기",
                children: me ? /* @__PURE__ */ r(He, { size: 24 }) : /* @__PURE__ */ r(Re, { size: 24 })
              }
            )
          }
        ),
        be && /* @__PURE__ */ r(
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
            children: /* @__PURE__ */ r("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        $t.map((e, t) => {
          const s = $t[t + 1], a = e.type === "group" && (s == null ? void 0 : s.type) === "group";
          if (e.type === "group") {
            const l = Gt(e.group);
            if (l === 0) return null;
            const o = M.filter(
              (f) => e.group.columns.includes(f.accessorKey)
            );
            if (new Set(
              o.map((f) => f.sticky ?? "none")
            ).size > 1) {
              const f = [];
              let u = [], c = o[0].sticky;
              for (const $ of o)
                $.sticky === c ? u.push($) : (u.length > 0 && f.push({ cols: u, sticky: c }), u = [$], c = $.sticky);
              u.length > 0 && f.push({ cols: u, sticky: c });
              const O = f.findIndex(($) => !$.sticky), I = O !== -1 ? O : 0;
              return f.map(($, F) => {
                const T = {
                  header: e.group.header,
                  columns: $.cols.map((ce) => ce.accessorKey),
                  align: e.group.align
                }, B = $.sticky ? Wt(T) : { style: {}, className: "" }, ee = !!B.style.position;
                return /* @__PURE__ */ r(
                  q,
                  {
                    colSpan: $.cols.length,
                    className: x(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      a && F === f.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      B.className
                    ),
                    style: ee ? B.style : { position: "relative", zIndex: 0 },
                    children: F === I ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${F}`
                );
              });
            }
            const i = Wt(e.group), n = !!i.style.position;
            return /* @__PURE__ */ r(
              q,
              {
                colSpan: l,
                className: x(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  a && "border-r border-slate-200 dark:border-slate-700",
                  i.className
                ),
                style: n ? i.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const l = fe(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ r(
              zt,
              {
                rowSpan: 2,
                sortDirection: ht(e.col.accessorKey),
                sortPriority: pt(e.col.accessorKey),
                onSort: () => dt(e.col.accessorKey),
                className: x(
                  U(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  l.className
                ),
                style: l.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ r(
              q,
              {
                rowSpan: 2,
                className: x(
                  U(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  l.className
                ),
                style: l.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            );
          }
        })
      ] }),
      /* @__PURE__ */ H(re, { children: [
        !W && V && /* @__PURE__ */ r(
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
            children: /* @__PURE__ */ r("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !W && K && /* @__PURE__ */ r(
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
            children: /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ r(
              ze,
              {
                checked: De,
                indeterminate: lt,
                onCheckedChange: ot,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !W && h && /* @__PURE__ */ r(
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
            children: (h == null ? void 0 : h.showExpandAll) !== !1 && ge.length > 0 ? /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: bt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": me ? "모두 접기" : "모두 펼치기",
                children: me ? /* @__PURE__ */ r(He, { size: 24 }) : /* @__PURE__ */ r(Re, { size: 24 })
              }
            ) : /* @__PURE__ */ r("span", { className: "sr-only", children: "확장" })
          }
        ),
        !W && be && /* @__PURE__ */ r(
          q,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${_}px`,
              minWidth: `${_}px`,
              maxWidth: `${_}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ r("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        W ? G ? /* @__PURE__ */ r(Ze, { items: Nt, strategy: It, children: M.filter((e) => Ie.has(e.accessorKey)).map(Ke) }) : M.filter((e) => Ie.has(e.accessorKey)).map(Ke) : G ? /* @__PURE__ */ r(Ze, { items: Nt, strategy: It, children: M.map(Ke) }) : M.map(Ke)
      ] })
    ] }),
    /* @__PURE__ */ H(cs, { children: [
      Ge ? /* @__PURE__ */ r(re, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ r(
        E,
        {
          colSpan: Ee,
          className: x(
            "text-center",
            ye || ve !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: ye ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ r(
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
              const t = typeof ie == "number" ? ie : typeof ie == "string" && parseInt(ie, 10) || 320, s = Math.max(1, Math.floor(t / 41));
              return /* @__PURE__ */ r("table", { className: "w-full", children: /* @__PURE__ */ r("tbody", { children: Array.from({ length: s }).map((a, l) => /* @__PURE__ */ H(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    V && /* @__PURE__ */ r("td", { className: "w-8 p-2", children: /* @__PURE__ */ r(Me, { width: 16, height: 16 }) }),
                    K && /* @__PURE__ */ r("td", { className: "w-10 p-2", children: /* @__PURE__ */ r(Me, { width: 18, height: 18 }) }),
                    h && /* @__PURE__ */ r("td", { className: "w-10 p-2", children: /* @__PURE__ */ r(Me, { width: 18, height: 18 }) }),
                    M.map((o) => {
                      const g = o.width ?? o.minWidth, b = typeof g == "number" ? Math.min(g * 0.6, 150) : 100;
                      return /* @__PURE__ */ r("td", { className: "p-2", children: /* @__PURE__ */ r(Me, { height: 16, width: b }) }, String(o.accessorKey));
                    })
                  ]
                },
                l
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본) - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ r(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: Y ? { width: Y } : void 0,
                children: /* @__PURE__ */ r(hs, { size: "lg" })
              }
            )
          )
        }
      ) }) : p.length === 0 ? /* @__PURE__ */ r(re, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ r(
        E,
        {
          colSpan: Ee,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ r(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: Y ? { width: Y } : void 0,
              children: ue
            }
          )
        }
      ) }) : V ? /* @__PURE__ */ r(Ze, { items: Yt, strategy: as, children: p.map((e, t) => {
        const s = L.includes(e.id), a = Xe(e), l = qe(e.id), o = `row-${e.id}`, g = (b) => /* @__PURE__ */ H(Et, { children: [
          /* @__PURE__ */ r(
            Tt,
            {
              isSelected: s,
              hasLeftStickyColumns: C,
              dragHandleProps: b
            }
          ),
          K && /* @__PURE__ */ r(
            E,
            {
              onClick: (i) => i.stopPropagation(),
              className: x(
                "!p-0",
                C && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
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
              children: /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ r(
                ze,
                {
                  checked: s,
                  onCheckedChange: () => ct(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          h && /* @__PURE__ */ r(
            E,
            {
              className: x(
                "p-0",
                C && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
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
              children: a && /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => mt(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": l ? "행 접기" : "행 펼치기",
                  "aria-expanded": l,
                  children: l ? /* @__PURE__ */ r(He, { size: 24 }) : /* @__PURE__ */ r(Re, { size: 24 })
                }
              )
            }
          ),
          be && /* @__PURE__ */ r(
            E,
            {
              className: "!p-0",
              style: {
                width: `${_}px`,
                minWidth: `${_}px`,
                maxWidth: `${_}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var i;
                    return (i = m == null ? void 0 : m.onRowDelete) == null ? void 0 : i.call(m, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ r(Mt, { size: 20 })
                }
              )
            }
          ),
          M.map((i) => {
            const n = kt(t, i.accessorKey);
            if (n === 0) return null;
            const f = e[i.accessorKey], u = gt(e.id, i.accessorKey), c = n !== void 0 && n > 1, O = c && vt(t, n), I = c && St(t, n), $ = fe(i, !1, s, c ? I : void 0), F = (D) => typeof D == "number" ? `${D}px` : D, T = {};
            if (!i.sticky) {
              const D = Z ? oe(i) : void 0;
              D !== void 0 ? (T.width = `${D}px`, T.minWidth = `${D}px`) : (i.width && (T.width = F(i.width)), i.minWidth && (T.minWidth = F(i.minWidth)));
            }
            const B = { ...T, ...$.style };
            if (u && i.editable) {
              const D = i.editComponent || Rt;
              return /* @__PURE__ */ r(
                E,
                {
                  ref: je,
                  className: x(U(i.align), "p-1 overflow-hidden", $.className),
                  style: B,
                  onClick: (te) => te.stopPropagation(),
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ r(
                    D,
                    {
                      value: Ae,
                      onChange: (te) => {
                        ne(te), A.current = te, y != null && y.error && se({ ...y, error: void 0 });
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
            const ee = i.cell ? i.cell(f, e) : String(f ?? "");
            if (i.editable && Q)
              return /* @__PURE__ */ r(
                E,
                {
                  className: x(
                    U(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    c && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    c && I && "bg-blue-50 dark:bg-blue-900",
                    c && !I && O && "bg-slate-100 dark:bg-slate-800",
                    $.className
                  ),
                  style: B,
                  onClick: (D) => {
                    D.stopPropagation(), setTimeout(() => ft(e.id, i.accessorKey, f), 0);
                  },
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ H("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ r("span", { className: "flex-1", children: ee }),
                    /* @__PURE__ */ r(
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
            const ce = c && t + n >= p.length;
            return /* @__PURE__ */ r(
              E,
              {
                className: x(
                  U(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  c && "align-middle transition-colors",
                  c && !ce && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  c && I && "bg-blue-50 dark:bg-blue-900",
                  c && !I && O && "bg-slate-100 dark:bg-slate-800",
                  $.className
                ),
                style: B,
                rowSpan: c ? n : void 0,
                children: ee
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ H(d.Fragment, { children: [
          /* @__PURE__ */ r(
            Ct,
            {
              id: o,
              isSelected: s,
              className: x(w && "cursor-pointer", X == null ? void 0 : X(e)),
              onClick: () => w == null ? void 0 : w(e),
              onMouseEnter: P ? () => he(t) : void 0,
              onMouseLeave: P ? () => he(null) : void 0,
              children: (b) => g(b)
            }
          ),
          h && l && /* @__PURE__ */ r(re, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ r(
            E,
            {
              colSpan: Ee,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ r(
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
        const s = L.includes(e.id), a = Xe(e), l = qe(e.id), o = `row-${e.id}`, g = (b) => /* @__PURE__ */ H(Et, { children: [
          V && /* @__PURE__ */ r(
            Tt,
            {
              isSelected: s,
              hasLeftStickyColumns: C,
              dragHandleProps: b
            }
          ),
          K && /* @__PURE__ */ r(
            E,
            {
              onClick: (i) => i.stopPropagation(),
              className: x(
                "!p-0",
                C && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
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
              children: /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ r(
                ze,
                {
                  checked: s,
                  onCheckedChange: () => ct(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          h && /* @__PURE__ */ r(
            E,
            {
              className: x(
                "p-0",
                C && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
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
              children: a && /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => mt(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": l ? "행 접기" : "행 펼치기",
                  "aria-expanded": l,
                  children: l ? /* @__PURE__ */ r(He, { size: 24 }) : /* @__PURE__ */ r(Re, { size: 24 })
                }
              )
            }
          ),
          be && /* @__PURE__ */ r(
            E,
            {
              className: "!p-0",
              style: {
                width: `${_}px`,
                minWidth: `${_}px`,
                maxWidth: `${_}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var i;
                    return (i = m == null ? void 0 : m.onRowDelete) == null ? void 0 : i.call(m, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ r(Mt, { size: 20 })
                }
              )
            }
          ),
          M.map((i) => {
            const n = kt(t, i.accessorKey);
            if (n === 0) return null;
            const f = e[i.accessorKey], u = gt(e.id, i.accessorKey), c = n !== void 0 && n > 1, O = c && vt(t, n), I = c && St(t, n), $ = fe(i, !1, s, c ? I : void 0), F = (D) => typeof D == "number" ? `${D}px` : D, T = {};
            if (!i.sticky) {
              const D = Z ? oe(i) : void 0;
              D !== void 0 ? (T.width = `${D}px`, T.minWidth = `${D}px`) : (i.width && (T.width = F(i.width)), i.minWidth && (T.minWidth = F(i.minWidth)));
            }
            const B = { ...T, ...$.style };
            if (u && i.editable) {
              const D = i.editComponent || Rt;
              return /* @__PURE__ */ r(
                E,
                {
                  ref: je,
                  className: x(U(i.align), "p-1 overflow-hidden", $.className),
                  style: B,
                  onClick: (te) => te.stopPropagation(),
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ r(
                    D,
                    {
                      value: Ae,
                      onChange: (te) => {
                        ne(te), A.current = te, y != null && y.error && se({ ...y, error: void 0 });
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
            const ee = i.cell ? i.cell(f, e) : String(f ?? "");
            if (i.editable && Q)
              return /* @__PURE__ */ r(
                E,
                {
                  className: x(
                    U(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    c && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    c && I && "bg-blue-50 dark:bg-blue-900",
                    c && !I && O && "bg-slate-100 dark:bg-slate-800",
                    $.className
                  ),
                  style: B,
                  onClick: (D) => {
                    D.stopPropagation(), setTimeout(() => {
                      ft(e.id, i.accessorKey, f);
                    }, 0);
                  },
                  rowSpan: c ? n : void 0,
                  children: /* @__PURE__ */ H("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ r("span", { className: "flex-1", children: ee }),
                    /* @__PURE__ */ r(
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
            const ce = c && t + n >= p.length;
            return /* @__PURE__ */ r(
              E,
              {
                className: x(
                  U(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  c && "align-middle transition-colors",
                  c && !ce && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  c && I && "bg-blue-50 dark:bg-blue-900",
                  c && !I && O && "bg-slate-100 dark:bg-slate-800",
                  $.className
                ),
                style: B,
                rowSpan: c ? n : void 0,
                children: ee
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ H(d.Fragment, { children: [
          V ? /* @__PURE__ */ r(
            Ct,
            {
              id: o,
              isSelected: s,
              className: x(w && "cursor-pointer", X == null ? void 0 : X(e)),
              onClick: () => w == null ? void 0 : w(e),
              onMouseEnter: P ? () => he(t) : void 0,
              onMouseLeave: P ? () => he(null) : void 0,
              children: (b) => g(b)
            }
          ) : /* @__PURE__ */ r(
            re,
            {
              "data-state": s ? "selected" : void 0,
              className: x(
                w && "cursor-pointer",
                (Je == null ? void 0 : Je.has(t)) && "border-b-0",
                X == null ? void 0 : X(e)
              ),
              onClick: () => w == null ? void 0 : w(e),
              onMouseEnter: P ? () => he(t) : void 0,
              onMouseLeave: P ? () => he(null) : void 0,
              children: g()
            }
          ),
          h && l && /* @__PURE__ */ r(re, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ r(
            E,
            {
              colSpan: Ee,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ r(
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
      Qt && !Ge && /* @__PURE__ */ H(re, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        V && /* @__PURE__ */ r(
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
        K && /* @__PURE__ */ r(
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
        h && /* @__PURE__ */ r(
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
        /* @__PURE__ */ r(
          E,
          {
            className: "!p-0",
            style: {
              width: `${_}px`,
              minWidth: `${_}px`,
              maxWidth: `${_}px`
            },
            children: /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: () => {
                  var e;
                  return (e = m == null ? void 0 : m.onRowAdd) == null ? void 0 : e.call(m);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ r(ps, { size: 20 })
              }
            )
          }
        ),
        M.map((e) => /* @__PURE__ */ r(
          E,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return G || V ? /* @__PURE__ */ r(
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
