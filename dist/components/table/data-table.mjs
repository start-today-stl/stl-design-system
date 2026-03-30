import { jsxs as C, jsx as t, Fragment as bt } from "react/jsx-runtime";
import * as o from "react";
import { useSensors as Qt, useSensor as xt, PointerSensor as Ut, KeyboardSensor as Yt, DndContext as Zt, closestCenter as Gt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as At, arrayMove as kt, SortableContext as Qe, horizontalListSortingStrategy as vt, verticalListSortingStrategy as es, useSortable as Et } from "@dnd-kit/sortable";
import { CSS as Kt } from "@dnd-kit/utilities";
import { cn as N } from "../../lib/utils.mjs";
import { Table as ts, TableHeader as ss, TableRow as G, TableHead as J, TableBody as rs, TableCell as K, TableSortableHead as is } from "./table.mjs";
import { Checkbox as we } from "../ui/checkbox.mjs";
import { Input as ns } from "../ui/input.mjs";
import { Skeleton as Ce } from "../ui/skeleton.mjs";
import { SplashScreen as as } from "../ui/splash-screen.mjs";
import { DownIcon as He } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as It } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as ze } from "../../icons/RightIcon.mjs";
import { RowAddIcon as ls } from "../../icons/RowAddIcon.mjs";
import { RowDeleteIcon as Wt } from "../../icons/RowDeleteIcon.mjs";
import { WriteIcon as Nt } from "../../icons/WriteIcon.mjs";
function St({
  value: E,
  onChange: h,
  onComplete: w,
  onCancel: R,
  error: $
}) {
  const I = o.useRef(null);
  o.useEffect(() => {
    var u, V;
    (u = I.current) == null || u.focus(), (V = I.current) == null || V.select();
  }, []);
  const P = (u) => {
    u.key === "Enter" ? (u.preventDefault(), w()) : u.key === "Escape" && (u.preventDefault(), R());
  };
  return /* @__PURE__ */ C("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ t(
      ns,
      {
        ref: I,
        value: String(E ?? ""),
        onChange: (u) => h(u.target.value),
        onKeyDown: P,
        error: !!$,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    $ && /* @__PURE__ */ t("span", { className: "text-[10px] text-destructive dark:text-red-400", children: $ })
  ] });
}
function cs({
  id: E,
  children: h,
  className: w,
  style: R,
  disabled: $
}) {
  const {
    attributes: I,
    listeners: P,
    setNodeRef: u,
    transform: V,
    transition: d,
    isDragging: ne
  } = Et({ id: E, disabled: $ }), pe = {
    ...R,
    transform: Kt.Transform.toString(V),
    transition: d,
    opacity: ne ? 0.5 : 1,
    cursor: $ ? void 0 : "grab"
  };
  return /* @__PURE__ */ t(
    "th",
    {
      ref: u,
      style: pe,
      className: N(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-600 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        ne && "z-50",
        w
      ),
      ...I,
      ...P,
      children: /* @__PURE__ */ C("span", { className: "flex items-center gap-0.5", children: [
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
function $t({
  id: E,
  children: h,
  className: w,
  isSelected: R,
  onClick: $,
  onMouseEnter: I,
  onMouseLeave: P
}) {
  const {
    setNodeRef: u,
    setActivatorNodeRef: V,
    listeners: d,
    attributes: ne,
    transform: pe,
    transition: F,
    isDragging: Z
  } = Et({ id: E }), X = {
    transform: Kt.Transform.toString(pe),
    transition: F,
    opacity: Z ? 0.5 : 1
  };
  return /* @__PURE__ */ t(
    "tr",
    {
      ref: u,
      style: X,
      "data-state": R ? "selected" : void 0,
      className: N(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        Z && "z-50 shadow-lg",
        w
      ),
      onClick: $,
      onMouseEnter: I,
      onMouseLeave: P,
      children: typeof h == "function" ? h({ listeners: d, attributes: ne, setActivatorNodeRef: V }) : h
    }
  );
}
function Dt({ isSelected: E, hasLeftStickyColumns: h, dragHandleProps: w }) {
  const { listeners: $, attributes: I, setActivatorNodeRef: P } = w ?? {};
  return /* @__PURE__ */ t(
    "td",
    {
      className: N(
        "p-0 align-middle",
        h && (E ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
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
          ref: P,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (u) => u.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...$,
          ...I,
          children: /* @__PURE__ */ t(It, { size: 16 })
        }
      )
    }
  );
}
function $s({
  columns: E,
  data: h,
  selectable: w = !1,
  selectedIds: R = [],
  onSelectionChange: $,
  sortState: I,
  onSortChange: P,
  onRowClick: u,
  onCellChange: V,
  expandable: d,
  emptyMessage: ne = "데이터가 없습니다.",
  className: pe,
  rowClassName: F,
  maxHeight: Z,
  resizable: X = !1,
  columnWidths: ye,
  onColumnResize: Me,
  columnReorderable: U = !1,
  columnOrder: Re,
  onColumnReorder: Le,
  rowReorderable: Te = !1,
  onRowReorder: me,
  loading: Ue = !1,
  loadingMode: be = "splash",
  loadingContent: xe,
  headerGroups: D,
  rowGrouping: L,
  rowActions: y
}) {
  const j = L ? !1 : Te, ae = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  o.useEffect(() => {
    ae && L && Te && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [L, Te, ae]), o.useEffect(() => {
    ae && xe && be !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [xe, be, ae]);
  const [b, A] = o.useState(null), [Ye, le] = o.useState(null), ee = o.useRef(null), _e = o.useRef(null), [wt, Ct] = o.useState(
    (d == null ? void 0 : d.defaultExpandedRowIds) ?? []
  ), [Pe, Ht] = o.useState({}), [te, Ze] = o.useState(null), Ge = o.useRef(0), Ae = o.useRef(0), [zt, et] = o.useState(
    () => E.map((e) => e.accessorKey)
  ), [je, ce] = o.useState(null);
  o.useEffect(() => {
    !U || Re || et((e) => {
      const s = E.map((c) => c.accessorKey), r = e.filter((c) => s.includes(c)), l = s.filter((c) => !r.includes(c)), a = [...r, ...l];
      return a.length === e.length && a.every((c, f) => c === e[f]) ? e : a;
    });
  }, [E, U, Re]);
  const oe = Re ?? zt, Mt = o.useMemo(() => U ? oe.map((e) => E.find((s) => s.accessorKey === e)).filter((e) => e !== void 0) : E, [E, oe, U]), ke = o.useMemo(() => {
    if (!D || D.length === 0) return [];
    const e = new Map(
      E.map((s) => [s.accessorKey, s])
    );
    return D.flatMap((s, r) => {
      const l = s.columns.map((m) => e.get(m)).filter((m) => m !== void 0);
      if (l.length === 0) return [];
      const a = new Set(
        l.map((m) => m.sticky).filter((m) => m !== void 0)
      ), c = a.size > 0, f = l.some((m) => !m.sticky), x = a.size > 1;
      return c && (f || x) ? [
        {
          headerLabel: typeof s.header == "string" || typeof s.header == "number" ? String(s.header) : `#${r + 1}`,
          reason: x ? "left/right sticky 혼합" : "sticky/non-sticky 혼합"
        }
      ] : [];
    });
  }, [D, E]), ve = o.useMemo(
    () => ke.map((e) => `${e.headerLabel}:${e.reason}`).join("|"),
    [ke]
  ), Oe = o.useRef("");
  o.useEffect(() => {
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
  const Rt = Qt(
    xt(Ut, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    xt(Yt, {
      coordinateGetter: At
    })
  ), tt = o.useCallback(
    (e) => {
      const { active: s, over: r } = e;
      if (!r || s.id === r.id) return;
      const l = oe.findIndex((f) => String(f) === s.id), a = oe.findIndex((f) => String(f) === r.id);
      if (l === -1 || a === -1) return;
      const c = kt(oe, l, a);
      Le ? Le(c) : et(c);
    },
    [oe, Le]
  ), st = o.useCallback(
    (e) => {
      const { active: s, over: r } = e;
      if (!r || s.id === r.id) return;
      const l = String(s.id).replace(/^row-/, ""), a = String(r.id).replace(/^row-/, ""), c = h.findIndex((i) => String(i.id) === l), f = h.findIndex((i) => String(i.id) === a);
      if (c === -1 || f === -1) return;
      const x = kt(h, c, f);
      me == null || me(x);
    },
    [h, me]
  ), Lt = o.useCallback(
    (e) => {
      const { active: s } = e;
      String(s.id).startsWith("row-") ? st(e) : tt(e);
    },
    [tt, st]
  ), We = (d == null ? void 0 : d.expandedRowIds) ?? wt, Ne = (d == null ? void 0 : d.onExpandedChange) ?? Ct, Se = h.length > 0 && R.length === h.length, rt = R.length > 0 && !Se, it = () => {
    Se ? $ == null || $([]) : $ == null || $(h.map((e) => e.id));
  }, nt = (e) => {
    R.includes(e) ? $ == null || $(R.filter((s) => s !== e)) : $ == null || $([...R, e]);
  }, Tt = (e) => {
    P && ((I == null ? void 0 : I.column) === e ? I.direction === "asc" ? P({ column: e, direction: "desc" }) : I.direction === "desc" ? P({ column: null, direction: null }) : P({ column: e, direction: "asc" }) : P({ column: e, direction: "asc" }));
  }, _t = (e) => (I == null ? void 0 : I.column) === e ? I.direction : null, Q = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, at = (e, s, r) => {
    A({ rowId: e, columnKey: s }), le(r), ee.current = r;
  }, lt = (e, s) => {
    const r = ee.current;
    if (!b || r === null) {
      A(null), le(null), ee.current = null;
      return;
    }
    if (e.validate) {
      const l = e.validate(r, s);
      if (l !== !0) {
        A({ ...b, error: l });
        return;
      }
    }
    V && V(b.rowId, b.columnKey, r), A(null), le(null), ee.current = null;
  }, $e = o.useCallback(() => {
    A(null), le(null), ee.current = null;
  }, []);
  o.useEffect(() => {
    if (!b) return;
    const e = (s) => {
      var a, c;
      const r = s.target;
      (a = _e.current) != null && a.contains(r) || (c = r.closest) != null && c.call(r, "[data-radix-popper-content-wrapper]") || $e();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [b, $e]);
  const ct = (e, s) => (b == null ? void 0 : b.rowId) === e && (b == null ? void 0 : b.columnKey) === s, Be = (e) => d ? d.rowExpandable ? d.rowExpandable(e) : !0 : !1, Ve = (e) => We.includes(e), ot = (e) => {
    Ve(e) ? Ne(We.filter((s) => s !== e)) : Ne([...We, e]);
  }, fe = o.useMemo(() => d ? h.filter((e) => Be(e)).map((e) => e.id) : [], [h, d]), ue = fe.length > 0 && fe.every((e) => We.includes(e)), dt = () => {
    Ne(ue ? [] : fe);
  }, ge = (y == null ? void 0 : y.showDelete) ?? !!(y != null && y.onRowDelete), Pt = (y == null ? void 0 : y.showAdd) ?? !!(y != null && y.onRowAdd), T = 40, De = E.length + (w ? 1 : 0) + (d ? 1 : 0) + (j ? 1 : 0) + (ge ? 1 : 0), { rowSpanMap: ht, middleRowSet: Fe } = o.useMemo(() => {
    if (!L) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(L.groupBy) ? L.groupBy : [L.groupBy], s = L.mergeColumns ?? e, r = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set();
    for (const a of s) {
      let c = 0;
      for (; c < h.length; ) {
        const f = e.map((n) => h[c][n]), x = h[c][a];
        let i = 1;
        for (let n = c + 1; n < h.length; n++) {
          const m = e.map((k) => h[n][k]), q = h[n][a];
          if (f.every((k, M) => k === m[M]) && x === q)
            i++;
          else
            break;
        }
        r.has(c) || r.set(c, /* @__PURE__ */ new Map()), r.get(c).set(a, i);
        for (let n = c; n < c + i - 1; n++)
          l.add(n);
        for (let n = c + 1; n < c + i; n++)
          r.has(n) || r.set(n, /* @__PURE__ */ new Map()), r.get(n).set(a, 0);
        c += i;
      }
    }
    return { rowSpanMap: r, middleRowSet: l };
  }, [h, L]), pt = (e, s) => {
    if (!ht) return;
    const r = ht.get(e);
    return r ? r.get(s) : void 0;
  }, ft = (e, s) => je === null ? !1 : je >= e && je < e + s, ut = (e, s) => {
    for (let r = e; r < e + s; r++)
      if (r < h.length && R.includes(h[r].id))
        return !0;
    return !1;
  }, W = 40, S = 40, _ = 32, de = o.useMemo(() => {
    const e = (g) => {
      const k = g.width ?? g.minWidth;
      if (typeof k == "number") return k;
      const M = parseInt(String(k), 10);
      return Number.isFinite(M) ? M : 150;
    }, s = E.filter((g) => g.sticky === "left"), r = E.filter((g) => g.sticky === "right"), l = j ? _ : 0, a = w ? W : 0, c = d ? S : 0, f = l + a + c, x = /* @__PURE__ */ new Map();
    let i = f;
    for (const g of s)
      x.set(g.accessorKey, i), i += e(g);
    const n = /* @__PURE__ */ new Map();
    let m = 0;
    for (let g = r.length - 1; g >= 0; g--) {
      const k = r[g];
      n.set(k.accessorKey, m), m += e(k);
    }
    const q = s.length > 0 ? s[s.length - 1].accessorKey : null, p = r.length > 0 ? r[0].accessorKey : null;
    return (g, k, M, re) => {
      if (!g.sticky) return { style: {}, className: "" };
      const O = g.accessorKey === q, Y = g.accessorKey === p, ie = `${e(g)}px`, v = {
        position: "sticky",
        zIndex: k ? 20 : 10,
        width: ie,
        minWidth: ie,
        maxWidth: ie
      }, B = re ?? M;
      if (g.sticky === "left") {
        const Jt = x.get(g.accessorKey) ?? 0;
        return {
          style: {
            ...v,
            left: `${Jt}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: N(
            "transition-colors",
            k ? "bg-slate-100 dark:bg-slate-800" : B ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
            O && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          )
        };
      }
      const qt = n.get(g.accessorKey) ?? 0;
      return {
        style: {
          ...v,
          right: `${qt}px`
        },
        className: N(
          "transition-colors",
          k ? "bg-slate-100 dark:bg-slate-800" : B ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
          Y && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [E, w, d]), z = E.some((e) => e.sticky === "left"), se = o.useCallback(
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
  ), jt = o.useCallback(
    (e, s) => {
      e.preventDefault(), e.stopPropagation(), Ze(s.accessorKey), Ge.current = e.clientX;
      const r = se(s) ?? 150;
      Ae.current = r;
    },
    [se]
  ), Xe = o.useCallback(
    (e) => {
      if (!te) return;
      const s = e.clientX - Ge.current, r = Math.max(50, Ae.current + s), l = String(te);
      Me ? Me(te, r) : Ht((a) => ({ ...a, [l]: r }));
    },
    [te, Me]
  ), qe = o.useCallback(() => {
    Ze(null);
  }, []);
  o.useEffect(() => {
    if (te)
      return document.addEventListener("mousemove", Xe), document.addEventListener("mouseup", qe), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", Xe), document.removeEventListener("mouseup", qe), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [te, Xe, qe]);
  const Ee = (e) => {
    const s = de(e, !0), r = (n) => typeof n == "number" ? `${n}px` : n, l = {};
    if (!e.sticky) {
      const n = X ? se(e) : void 0;
      n !== void 0 ? (l.width = `${n}px`, l.minWidth = `${n}px`) : (e.width && (l.width = r(e.width)), e.minWidth && (l.minWidth = r(e.minWidth)));
    }
    const a = { ...l, ...s.style }, f = Ft.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", x = X && /* @__PURE__ */ t(
      "div",
      {
        className: N(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          te === e.accessorKey && "opacity-100"
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
    return U && !e.sticky && !e.sortable ? /* @__PURE__ */ C(
      cs,
      {
        id: String(e.accessorKey),
        style: a,
        className: N(Q(e.align), s.className, X && "relative overflow-visible", f),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ C(
      is,
      {
        sortDirection: _t(e.accessorKey),
        onSort: () => Tt(e.accessorKey),
        style: a,
        className: N(Q(e.align), s.className, X && "relative overflow-visible", f),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ C(
      J,
      {
        style: a,
        className: N(Q(e.align), s.className, X && "relative overflow-visible", f),
        children: [
          e.header,
          x
        ]
      },
      String(e.accessorKey)
    );
  }, H = U ? Mt : E, gt = H.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Ot = h.map((e) => `row-${e.id}`), Bt = () => 0, Je = () => j ? _ : 0, Ke = () => {
    let e = 0;
    return j && (e += _), w && (e += W), e;
  }, Vt = o.useCallback(
    (e) => H.filter(
      (s) => e.columns.includes(s.accessorKey)
    ).length,
    [H]
  ), Ie = o.useMemo(() => D ? new Set(D.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [D]), Ft = o.useMemo(() => {
    if (!D || D.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), s = (l) => D.findIndex((a) => a.columns.includes(l.accessorKey)), r = H.filter((l) => Ie.has(l.accessorKey));
    for (let l = 0; l < r.length - 1; l++) {
      const a = r[l], c = r[l + 1], f = s(a), x = s(c);
      f !== x && e.add(a.accessorKey);
    }
    return e;
  }, [D, H, Ie]), Xt = o.useCallback(
    (e) => {
      const s = H.filter((n) => e.columns.includes(n.accessorKey));
      if (s.length === 0) return { style: {}, className: "" };
      const r = s.every((n) => n.sticky === "left"), l = s.every((n) => n.sticky === "right");
      if (!r && !l) return { style: {}, className: "" };
      const a = r ? s[0] : s[s.length - 1], c = de(a, !0), f = (n) => {
        const m = X ? se(n) : void 0;
        if (m !== void 0) return m;
        const q = n.width ?? n.minWidth;
        if (typeof q == "number") return q;
        const p = parseInt(String(q), 10);
        return Number.isFinite(p) ? p : 150;
      }, i = `${s.reduce((n, m) => n + f(m), 0)}px`;
      return {
        style: {
          ...c.style,
          width: i,
          minWidth: i,
          maxWidth: i
        },
        className: c.className
      };
    },
    [H, de, se, X]
  ), yt = o.useMemo(() => {
    if (!D || D.length === 0) return [];
    const e = [], s = /* @__PURE__ */ new Set();
    for (const r of H) {
      const l = D.findIndex((a) => a.columns.includes(r.accessorKey));
      l !== -1 ? s.has(l) || (s.add(l), e.push({ type: "group", group: D[l] })) : e.push({ type: "standalone", col: r });
    }
    return e;
  }, [D, H]), mt = /* @__PURE__ */ C(ts, { className: pe, maxHeight: Z, children: [
    /* @__PURE__ */ C(ss, { children: [
      D && D.length > 0 && /* @__PURE__ */ C(G, { children: [
        j && /* @__PURE__ */ t(
          J,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${_}px`,
              minWidth: `${_}px`,
              ...z && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        w && /* @__PURE__ */ t(
          J,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${W}px`,
              minWidth: `${W}px`,
              ...z && { position: "sticky", left: j ? _ : 0, zIndex: 20 }
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
        d && /* @__PURE__ */ t(
          J,
          {
            className: "bg-slate-100 dark:bg-slate-800 border-b-0 !p-0",
            rowSpan: 2,
            style: {
              width: `${S}px`,
              minWidth: `${S}px`,
              ...z && { position: "sticky", left: Ke(), zIndex: 20 }
            },
            children: (d == null ? void 0 : d.showExpandAll) !== !1 && fe.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: dt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": ue ? "모두 접기" : "모두 펼치기",
                children: ue ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(ze, { size: 24 })
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
        yt.map((e, s) => {
          const r = yt[s + 1], l = e.type === "group" && (r == null ? void 0 : r.type) === "group";
          if (e.type === "group") {
            const a = Vt(e.group);
            if (a === 0) return null;
            const c = Xt(e.group);
            return /* @__PURE__ */ t(
              J,
              {
                colSpan: a,
                className: N(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  l && "border-r border-slate-200 dark:border-slate-700",
                  c.className
                ),
                style: c.style,
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const a = de(e.col, !0);
            return /* @__PURE__ */ t(
              J,
              {
                rowSpan: 2,
                className: N(
                  Q(e.col.align),
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
      /* @__PURE__ */ C(G, { children: [
        !D && j && /* @__PURE__ */ t(
          J,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: z ? {
              position: "sticky",
              left: Bt(),
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
        !D && w && /* @__PURE__ */ t(
          J,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: z ? {
              position: "sticky",
              left: Je(),
              zIndex: 20,
              width: `${W}px`,
              minWidth: `${W}px`,
              maxWidth: `${W}px`
            } : {
              width: `${W}px`,
              minWidth: `${W}px`,
              maxWidth: `${W}px`
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
        !D && d && /* @__PURE__ */ t(
          J,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: z ? {
              position: "sticky",
              left: Ke(),
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
            children: (d == null ? void 0 : d.showExpandAll) !== !1 && fe.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: dt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": ue ? "모두 접기" : "모두 펼치기",
                children: ue ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(ze, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !D && ge && /* @__PURE__ */ t(
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
        D ? U ? /* @__PURE__ */ t(Qe, { items: gt, strategy: vt, children: H.filter((e) => Ie.has(e.accessorKey)).map(Ee) }) : H.filter((e) => Ie.has(e.accessorKey)).map(Ee) : U ? /* @__PURE__ */ t(Qe, { items: gt, strategy: vt, children: H.map(Ee) }) : H.map(Ee)
      ] })
    ] }),
    /* @__PURE__ */ C(rs, { children: [
      Ue ? /* @__PURE__ */ t(G, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        K,
        {
          colSpan: De,
          className: N(
            "text-center",
            xe || be !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: xe ?? (be === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const s = typeof Z == "number" ? Z : typeof Z == "string" && parseInt(Z, 10) || 320, r = Math.max(1, Math.floor(s / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: r }).map((l, a) => /* @__PURE__ */ C(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    j && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(Ce, { width: 16, height: 16 }) }),
                    w && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(Ce, { width: 18, height: 18 }) }),
                    d && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(Ce, { width: 18, height: 18 }) }),
                    H.map((c) => {
                      const f = c.width ?? c.minWidth, x = typeof f == "number" ? Math.min(f * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(Ce, { height: 16, width: x }) }, String(c.accessorKey));
                    })
                  ]
                },
                a
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본)
            /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ t(as, { size: "lg" }) })
          ))
        }
      ) }) : h.length === 0 ? /* @__PURE__ */ t(G, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        K,
        {
          colSpan: De,
          className: "h-24 text-center text-slate-500",
          children: ne
        }
      ) }) : j ? /* @__PURE__ */ t(Qe, { items: Ot, strategy: es, children: h.map((e, s) => {
        const r = R.includes(e.id), l = Be(e), a = Ve(e.id), c = `row-${e.id}`, f = (x) => /* @__PURE__ */ C(bt, { children: [
          /* @__PURE__ */ t(
            Dt,
            {
              isSelected: r,
              hasLeftStickyColumns: z,
              dragHandleProps: x
            }
          ),
          w && /* @__PURE__ */ t(
            K,
            {
              onClick: (i) => i.stopPropagation(),
              className: N(
                "!p-0",
                z && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Je(),
                zIndex: 10,
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
              } : {
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
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
          d && /* @__PURE__ */ t(
            K,
            {
              className: N(
                "p-0",
                z && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Ke(),
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
              children: l && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => ot(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(ze, { size: 24 })
                }
              )
            }
          ),
          ge && /* @__PURE__ */ t(
            K,
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
                    return (i = y == null ? void 0 : y.onRowDelete) == null ? void 0 : i.call(y, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(Wt, { size: 20 })
                }
              )
            }
          ),
          H.map((i) => {
            const n = pt(s, i.accessorKey);
            if (n === 0) return null;
            const m = e[i.accessorKey], q = ct(e.id, i.accessorKey), p = n !== void 0 && n > 1, g = p && ft(s, n), k = p && ut(s, n), M = de(i, !1, r, p ? k : void 0), re = (v) => typeof v == "number" ? `${v}px` : v, O = {};
            if (!i.sticky) {
              const v = X ? se(i) : void 0;
              v !== void 0 ? (O.width = `${v}px`, O.minWidth = `${v}px`) : (i.width && (O.width = re(i.width)), i.minWidth && (O.minWidth = re(i.minWidth)));
            }
            const Y = { ...O, ...M.style };
            if (q && i.editable) {
              const v = i.editComponent || St;
              return /* @__PURE__ */ t(
                K,
                {
                  ref: _e,
                  className: N(Q(i.align), "p-1 overflow-hidden", M.className),
                  style: Y,
                  onClick: (B) => B.stopPropagation(),
                  rowSpan: p ? n : void 0,
                  children: /* @__PURE__ */ t(
                    v,
                    {
                      value: Ye,
                      onChange: (B) => {
                        le(B), ee.current = B, b != null && b.error && A({ ...b, error: void 0 });
                      },
                      onComplete: () => lt(i, e),
                      onCancel: $e,
                      row: e,
                      error: b == null ? void 0 : b.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const he = i.cell ? i.cell(m, e) : String(m ?? "");
            if (i.editable && V)
              return /* @__PURE__ */ t(
                K,
                {
                  className: N(
                    Q(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    p && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    p && k && "bg-blue-50 dark:bg-blue-900",
                    p && !k && g && "bg-slate-100 dark:bg-slate-800",
                    M.className
                  ),
                  style: Y,
                  onClick: (v) => {
                    v.stopPropagation(), setTimeout(() => at(e.id, i.accessorKey, m), 0);
                  },
                  rowSpan: p ? n : void 0,
                  children: /* @__PURE__ */ C("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: he }),
                    /* @__PURE__ */ t(
                      Nt,
                      {
                        size: 14,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const ie = p && s + n >= h.length;
            return /* @__PURE__ */ t(
              K,
              {
                className: N(
                  Q(i.align),
                  p && "align-middle transition-colors",
                  p && !ie && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  p && k && "bg-blue-50 dark:bg-blue-900",
                  p && !k && g && "bg-slate-100 dark:bg-slate-800",
                  M.className
                ),
                style: Y,
                rowSpan: p ? n : void 0,
                children: he
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ C(o.Fragment, { children: [
          /* @__PURE__ */ t(
            $t,
            {
              id: c,
              isSelected: r,
              className: N(u && "cursor-pointer", F == null ? void 0 : F(e)),
              onClick: () => u == null ? void 0 : u(e),
              onMouseEnter: L ? () => ce(s) : void 0,
              onMouseLeave: L ? () => ce(null) : void 0,
              children: (x) => f(x)
            }
          ),
          d && a && /* @__PURE__ */ t(G, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
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
                    width: "100%",
                    maxWidth: "100vw"
                  },
                  children: d.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : h.map((e, s) => {
        const r = R.includes(e.id), l = Be(e), a = Ve(e.id), c = `row-${e.id}`, f = (x) => /* @__PURE__ */ C(bt, { children: [
          j && /* @__PURE__ */ t(
            Dt,
            {
              isSelected: r,
              hasLeftStickyColumns: z,
              dragHandleProps: x
            }
          ),
          w && /* @__PURE__ */ t(
            K,
            {
              onClick: (i) => i.stopPropagation(),
              className: N(
                "!p-0",
                z && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Je(),
                zIndex: 10,
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
              } : {
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
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
          d && /* @__PURE__ */ t(
            K,
            {
              className: N(
                "p-0",
                z && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Ke(),
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
              children: l && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => ot(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(He, { size: 24 }) : /* @__PURE__ */ t(ze, { size: 24 })
                }
              )
            }
          ),
          ge && /* @__PURE__ */ t(
            K,
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
                    return (i = y == null ? void 0 : y.onRowDelete) == null ? void 0 : i.call(y, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(Wt, { size: 20 })
                }
              )
            }
          ),
          H.map((i) => {
            const n = pt(s, i.accessorKey);
            if (n === 0) return null;
            const m = e[i.accessorKey], q = ct(e.id, i.accessorKey), p = n !== void 0 && n > 1, g = p && ft(s, n), k = p && ut(s, n), M = de(i, !1, r, p ? k : void 0), re = (v) => typeof v == "number" ? `${v}px` : v, O = {};
            if (!i.sticky) {
              const v = X ? se(i) : void 0;
              v !== void 0 ? (O.width = `${v}px`, O.minWidth = `${v}px`) : (i.width && (O.width = re(i.width)), i.minWidth && (O.minWidth = re(i.minWidth)));
            }
            const Y = { ...O, ...M.style };
            if (q && i.editable) {
              const v = i.editComponent || St;
              return /* @__PURE__ */ t(
                K,
                {
                  ref: _e,
                  className: N(Q(i.align), "p-1 overflow-hidden", M.className),
                  style: Y,
                  onClick: (B) => B.stopPropagation(),
                  rowSpan: p ? n : void 0,
                  children: /* @__PURE__ */ t(
                    v,
                    {
                      value: Ye,
                      onChange: (B) => {
                        le(B), ee.current = B, b != null && b.error && A({ ...b, error: void 0 });
                      },
                      onComplete: () => lt(i, e),
                      onCancel: $e,
                      row: e,
                      error: b == null ? void 0 : b.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const he = i.cell ? i.cell(m, e) : String(m ?? "");
            if (i.editable && V)
              return /* @__PURE__ */ t(
                K,
                {
                  className: N(
                    Q(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    p && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    p && k && "bg-blue-50 dark:bg-blue-900",
                    p && !k && g && "bg-slate-100 dark:bg-slate-800",
                    M.className
                  ),
                  style: Y,
                  onClick: (v) => {
                    v.stopPropagation(), setTimeout(() => {
                      at(e.id, i.accessorKey, m);
                    }, 0);
                  },
                  rowSpan: p ? n : void 0,
                  children: /* @__PURE__ */ C("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: he }),
                    /* @__PURE__ */ t(
                      Nt,
                      {
                        size: 20,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const ie = p && s + n >= h.length;
            return /* @__PURE__ */ t(
              K,
              {
                className: N(
                  Q(i.align),
                  p && "align-middle transition-colors",
                  p && !ie && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  p && k && "bg-blue-50 dark:bg-blue-900",
                  p && !k && g && "bg-slate-100 dark:bg-slate-800",
                  M.className
                ),
                style: Y,
                rowSpan: p ? n : void 0,
                children: he
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ C(o.Fragment, { children: [
          j ? /* @__PURE__ */ t(
            $t,
            {
              id: c,
              isSelected: r,
              className: N(u && "cursor-pointer", F == null ? void 0 : F(e)),
              onClick: () => u == null ? void 0 : u(e),
              onMouseEnter: L ? () => ce(s) : void 0,
              onMouseLeave: L ? () => ce(null) : void 0,
              children: (x) => f(x)
            }
          ) : /* @__PURE__ */ t(
            G,
            {
              "data-state": r ? "selected" : void 0,
              className: N(
                u && "cursor-pointer",
                (Fe == null ? void 0 : Fe.has(s)) && "border-b-0",
                F == null ? void 0 : F(e)
              ),
              onClick: () => u == null ? void 0 : u(e),
              onMouseEnter: L ? () => ce(s) : void 0,
              onMouseLeave: L ? () => ce(null) : void 0,
              children: f()
            }
          ),
          d && a && /* @__PURE__ */ t(G, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
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
                    width: "100%",
                    maxWidth: "100vw"
                  },
                  children: d.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      Pt && !Ue && /* @__PURE__ */ C(G, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        j && /* @__PURE__ */ t(
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
              width: `${W}px`,
              minWidth: `${W}px`,
              maxWidth: `${W}px`
            }
          }
        ),
        d && /* @__PURE__ */ t(
          K,
          {
            className: "!p-0",
            style: {
              width: `${S}px`,
              minWidth: `${S}px`,
              maxWidth: `${S}px`
            }
          }
        ),
        /* @__PURE__ */ t(
          K,
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
                children: /* @__PURE__ */ t(ls, { size: 20 })
              }
            )
          }
        ),
        H.map((e) => /* @__PURE__ */ t(
          K,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return U || j ? /* @__PURE__ */ t(
    Zt,
    {
      sensors: Rt,
      collisionDetection: Gt,
      onDragEnd: Lt,
      children: mt
    }
  ) : mt;
}
export {
  $s as DataTable
};
//# sourceMappingURL=data-table.mjs.map
