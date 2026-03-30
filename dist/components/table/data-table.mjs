import { jsxs as w, jsx as t, Fragment as ut } from "react/jsx-runtime";
import * as d from "react";
import { useSensors as Vt, useSensor as gt, PointerSensor as Ft, KeyboardSensor as Xt, DndContext as qt, closestCenter as Jt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as Qt, arrayMove as yt, SortableContext as Fe, horizontalListSortingStrategy as bt, verticalListSortingStrategy as Ut, useSortable as $t } from "@dnd-kit/sortable";
import { CSS as Nt } from "@dnd-kit/utilities";
import { cn as v } from "../../lib/utils.mjs";
import { Table as Yt, TableHeader as Zt, TableRow as Z, TableHead as X, TableBody as Gt, TableCell as S, TableSortableHead as At } from "./table.mjs";
import { Checkbox as Ee } from "../ui/checkbox.mjs";
import { Input as es } from "../ui/input.mjs";
import { Skeleton as Ke } from "../ui/skeleton.mjs";
import { SplashScreen as ts } from "../ui/splash-screen.mjs";
import { DownIcon as Ie } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as St } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as we } from "../../icons/RightIcon.mjs";
import { RowAddIcon as ss } from "../../icons/RowAddIcon.mjs";
import { RowDeleteIcon as mt } from "../../icons/RowDeleteIcon.mjs";
import { WriteIcon as xt } from "../../icons/WriteIcon.mjs";
function kt({
  value: D,
  onChange: h,
  onComplete: I,
  onCancel: R,
  error: $
}) {
  const E = d.useRef(null);
  d.useEffect(() => {
    var f, V;
    (f = E.current) == null || f.focus(), (V = E.current) == null || V.select();
  }, []);
  const L = (f) => {
    f.key === "Enter" ? (f.preventDefault(), I()) : f.key === "Escape" && (f.preventDefault(), R());
  };
  return /* @__PURE__ */ w("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ t(
      es,
      {
        ref: E,
        value: String(D ?? ""),
        onChange: (f) => h(f.target.value),
        onKeyDown: L,
        error: !!$,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    $ && /* @__PURE__ */ t("span", { className: "text-[10px] text-destructive dark:text-red-400", children: $ })
  ] });
}
function rs({
  id: D,
  children: h,
  className: I,
  style: R,
  disabled: $
}) {
  const {
    attributes: E,
    listeners: L,
    setNodeRef: f,
    transform: V,
    transition: c,
    isDragging: ie
  } = $t({ id: D, disabled: $ }), ce = {
    ...R,
    transform: Nt.Transform.toString(V),
    transition: c,
    opacity: ie ? 0.5 : 1,
    cursor: $ ? void 0 : "grab"
  };
  return /* @__PURE__ */ t(
    "th",
    {
      ref: f,
      style: ce,
      className: v(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-600 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        ie && "z-50",
        I
      ),
      ...E,
      ...L,
      children: /* @__PURE__ */ w("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ t(
          St,
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
function vt({
  id: D,
  children: h,
  className: I,
  isSelected: R,
  onClick: $,
  onMouseEnter: E,
  onMouseLeave: L
}) {
  const {
    setNodeRef: f,
    setActivatorNodeRef: V,
    listeners: c,
    attributes: ie,
    transform: ce,
    transition: F,
    isDragging: Y
  } = $t({ id: D }), J = {
    transform: Nt.Transform.toString(ce),
    transition: F,
    opacity: Y ? 0.5 : 1
  };
  return /* @__PURE__ */ t(
    "tr",
    {
      ref: f,
      style: J,
      "data-state": R ? "selected" : void 0,
      className: v(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        Y && "z-50 shadow-lg",
        I
      ),
      onClick: $,
      onMouseEnter: E,
      onMouseLeave: L,
      children: typeof h == "function" ? h({ listeners: c, attributes: ie, setActivatorNodeRef: V }) : h
    }
  );
}
function Wt({ isSelected: D, hasLeftStickyColumns: h, dragHandleProps: I }) {
  const { listeners: $, attributes: E, setActivatorNodeRef: L } = I ?? {};
  return /* @__PURE__ */ t(
    "td",
    {
      className: v(
        "p-0 align-middle",
        h && (D ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
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
          ref: L,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (f) => f.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...$,
          ...E,
          children: /* @__PURE__ */ t(St, { size: 16 })
        }
      )
    }
  );
}
function ks({
  columns: D,
  data: h,
  selectable: I = !1,
  selectedIds: R = [],
  onSelectionChange: $,
  sortState: E,
  onSortChange: L,
  onRowClick: f,
  onCellChange: V,
  expandable: c,
  emptyMessage: ie = "데이터가 없습니다.",
  className: ce,
  rowClassName: F,
  maxHeight: Y,
  resizable: J = !1,
  columnWidths: ue,
  onColumnResize: ze,
  columnReorderable: Q = !1,
  columnOrder: He,
  onColumnReorder: Re,
  rowReorderable: Ce = !1,
  onRowReorder: ge,
  loading: Xe = !1,
  loadingMode: ye = "splash",
  loadingContent: be,
  headerGroups: K,
  rowGrouping: C,
  rowActions: g
}) {
  const P = C ? !1 : Ce;
  d.useEffect(() => {
    C && Ce && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [C, Ce]), d.useEffect(() => {
    be && ye !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [be, ye]);
  const [y, G] = d.useState(null), [qe, ne] = d.useState(null), A = d.useRef(null), Te = d.useRef(null), [Dt, Et] = d.useState(
    (c == null ? void 0 : c.defaultExpandedRowIds) ?? []
  ), [Me, Kt] = d.useState({}), [ee, Je] = d.useState(null), Qe = d.useRef(0), Ue = d.useRef(0), [It, Ye] = d.useState(
    () => D.map((e) => e.accessorKey)
  ), [_e, ae] = d.useState(null);
  d.useEffect(() => {
    !Q || He || Ye((e) => {
      const r = D.map((o) => o.accessorKey), i = e.filter((o) => r.includes(o)), a = r.filter((o) => !i.includes(o)), l = [...i, ...a];
      return l.length === e.length && l.every((o, b) => o === e[b]) ? e : l;
    });
  }, [D, Q, He]);
  const le = He ?? It, wt = d.useMemo(() => Q ? le.map((e) => D.find((r) => r.accessorKey === e)).filter((e) => e !== void 0) : D, [D, le, Q]), zt = Vt(
    gt(Ft, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    gt(Xt, {
      coordinateGetter: Qt
    })
  ), Ze = d.useCallback(
    (e) => {
      const { active: r, over: i } = e;
      if (!i || r.id === i.id) return;
      const a = le.findIndex((b) => String(b) === r.id), l = le.findIndex((b) => String(b) === i.id);
      if (a === -1 || l === -1) return;
      const o = yt(le, a, l);
      Re ? Re(o) : Ye(o);
    },
    [le, Re]
  ), Ge = d.useCallback(
    (e) => {
      const { active: r, over: i } = e;
      if (!i || r.id === i.id) return;
      const a = String(r.id).replace(/^row-/, ""), l = String(i.id).replace(/^row-/, ""), o = h.findIndex((s) => String(s.id) === a), b = h.findIndex((s) => String(s.id) === l);
      if (o === -1 || b === -1) return;
      const N = yt(h, o, b);
      ge == null || ge(N);
    },
    [h, ge]
  ), Ht = d.useCallback(
    (e) => {
      const { active: r } = e;
      String(r.id).startsWith("row-") ? Ge(e) : Ze(e);
    },
    [Ze, Ge]
  ), me = (c == null ? void 0 : c.expandedRowIds) ?? Dt, xe = (c == null ? void 0 : c.onExpandedChange) ?? Et, ke = h.length > 0 && R.length === h.length, Ae = R.length > 0 && !ke, et = () => {
    ke ? $ == null || $([]) : $ == null || $(h.map((e) => e.id));
  }, tt = (e) => {
    R.includes(e) ? $ == null || $(R.filter((r) => r !== e)) : $ == null || $([...R, e]);
  }, Rt = (e) => {
    L && ((E == null ? void 0 : E.column) === e ? E.direction === "asc" ? L({ column: e, direction: "desc" }) : E.direction === "desc" ? L({ column: null, direction: null }) : L({ column: e, direction: "asc" }) : L({ column: e, direction: "asc" }));
  }, Ct = (e) => (E == null ? void 0 : E.column) === e ? E.direction : null, q = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, st = (e, r, i) => {
    G({ rowId: e, columnKey: r }), ne(i), A.current = i;
  }, rt = (e, r) => {
    const i = A.current;
    if (!y || i === null) {
      G(null), ne(null), A.current = null;
      return;
    }
    if (e.validate) {
      const a = e.validate(i, r);
      if (a !== !0) {
        G({ ...y, error: a });
        return;
      }
    }
    V && V(y.rowId, y.columnKey, i), G(null), ne(null), A.current = null;
  }, ve = d.useCallback(() => {
    G(null), ne(null), A.current = null;
  }, []);
  d.useEffect(() => {
    if (!y) return;
    const e = (r) => {
      var l, o;
      const i = r.target;
      (l = Te.current) != null && l.contains(i) || (o = i.closest) != null && o.call(i, "[data-radix-popper-content-wrapper]") || ve();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [y, ve]);
  const it = (e, r) => (y == null ? void 0 : y.rowId) === e && (y == null ? void 0 : y.columnKey) === r, Le = (e) => c ? c.rowExpandable ? c.rowExpandable(e) : !0 : !1, Pe = (e) => me.includes(e), nt = (e) => {
    Pe(e) ? xe(me.filter((r) => r !== e)) : xe([...me, e]);
  }, de = d.useMemo(() => c ? h.filter((e) => Le(e)).map((e) => e.id) : [], [h, c]), he = de.length > 0 && de.every((e) => me.includes(e)), at = () => {
    xe(he ? [] : de);
  }, pe = (g == null ? void 0 : g.showDelete) ?? !!(g != null && g.onRowDelete), Tt = (g == null ? void 0 : g.showAdd) ?? !!(g != null && g.onRowAdd), T = 40, We = D.length + (I ? 1 : 0) + (c ? 1 : 0) + (P ? 1 : 0) + (pe ? 1 : 0), { rowSpanMap: lt, middleRowSet: je } = d.useMemo(() => {
    if (!C) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(C.groupBy) ? C.groupBy : [C.groupBy], r = C.mergeColumns ?? e, i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
    for (const l of r) {
      let o = 0;
      for (; o < h.length; ) {
        const b = e.map((n) => h[o][n]), N = h[o][l];
        let s = 1;
        for (let n = o + 1; n < h.length; n++) {
          const O = e.map((m) => h[n][m]), te = h[n][l];
          if (b.every((m, H) => m === O[H]) && N === te)
            s++;
          else
            break;
        }
        i.has(o) || i.set(o, /* @__PURE__ */ new Map()), i.get(o).set(l, s);
        for (let n = o; n < o + s - 1; n++)
          a.add(n);
        for (let n = o + 1; n < o + s; n++)
          i.has(n) || i.set(n, /* @__PURE__ */ new Map()), i.get(n).set(l, 0);
        o += s;
      }
    }
    return { rowSpanMap: i, middleRowSet: a };
  }, [h, C]), ot = (e, r) => {
    if (!lt) return;
    const i = lt.get(e);
    return i ? i.get(r) : void 0;
  }, ct = (e, r) => _e === null ? !1 : _e >= e && _e < e + r, dt = (e, r) => {
    for (let i = e; i < e + r; i++)
      if (i < h.length && R.includes(h[i].id))
        return !0;
    return !1;
  }, k = 40, W = 40, M = 32, $e = d.useMemo(() => {
    const e = (u) => {
      const m = u.width ?? u.minWidth;
      if (typeof m == "number") return m;
      const H = parseInt(String(m), 10);
      return Number.isFinite(H) ? H : 150;
    }, r = D.filter((u) => u.sticky === "left"), i = D.filter((u) => u.sticky === "right"), a = P ? M : 0, l = I ? k : 0, o = c ? W : 0, b = a + l + o, N = /* @__PURE__ */ new Map();
    let s = b;
    for (const u of r)
      N.set(u.accessorKey, s), s += e(u);
    const n = /* @__PURE__ */ new Map();
    let O = 0;
    for (let u = i.length - 1; u >= 0; u--) {
      const m = i[u];
      n.set(m.accessorKey, O), O += e(m);
    }
    const te = r.length > 0 ? r[r.length - 1].accessorKey : null, p = i.length > 0 ? i[0].accessorKey : null;
    return (u, m, H, se) => {
      if (!u.sticky) return { style: {}, className: "" };
      const j = u.accessorKey === te, U = u.accessorKey === p, re = `${e(u)}px`, x = {
        position: "sticky",
        zIndex: m ? 20 : 10,
        width: re,
        minWidth: re,
        maxWidth: re
      }, B = se ?? H;
      if (u.sticky === "left") {
        const Bt = N.get(u.accessorKey) ?? 0;
        return {
          style: {
            ...x,
            left: `${Bt}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: v(
            "transition-colors",
            m ? "bg-slate-100 dark:bg-slate-800" : B ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
            j && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          )
        };
      }
      const Ot = n.get(u.accessorKey) ?? 0;
      return {
        style: {
          ...x,
          right: `${Ot}px`
        },
        className: v(
          "transition-colors",
          m ? "bg-slate-100 dark:bg-slate-800" : B ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
          U && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [D, I, c]), z = D.some((e) => e.sticky === "left"), fe = d.useCallback(
    (e) => {
      const r = String(e.accessorKey);
      if (ue && r in ue)
        return ue[r];
      if (r in Me)
        return Me[r];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [ue, Me]
  ), Mt = d.useCallback(
    (e, r) => {
      e.preventDefault(), e.stopPropagation(), Je(r.accessorKey), Qe.current = e.clientX;
      const i = fe(r) ?? 150;
      Ue.current = i;
    },
    [fe]
  ), Oe = d.useCallback(
    (e) => {
      if (!ee) return;
      const r = e.clientX - Qe.current, i = Math.max(50, Ue.current + r), a = String(ee);
      ze ? ze(ee, i) : Kt((l) => ({ ...l, [a]: i }));
    },
    [ee, ze]
  ), Be = d.useCallback(() => {
    Je(null);
  }, []);
  d.useEffect(() => {
    if (ee)
      return document.addEventListener("mousemove", Oe), document.addEventListener("mouseup", Be), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", Oe), document.removeEventListener("mouseup", Be), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [ee, Oe, Be]);
  const Ne = (e) => {
    const r = $e(e, !0), i = (n) => typeof n == "number" ? `${n}px` : n, a = {};
    if (!e.sticky) {
      const n = J ? fe(e) : void 0;
      n !== void 0 ? (a.width = `${n}px`, a.minWidth = `${n}px`) : (e.width && (a.width = i(e.width)), e.minWidth && (a.minWidth = i(e.minWidth)));
    }
    const l = { ...a, ...r.style }, b = jt.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", N = J && /* @__PURE__ */ t(
      "div",
      {
        className: v(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          ee === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (n) => Mt(n, e),
        onPointerDown: (n) => n.stopPropagation(),
        onClick: (n) => n.stopPropagation()
      }
    );
    return Q && !e.sticky && !e.sortable ? /* @__PURE__ */ w(
      rs,
      {
        id: String(e.accessorKey),
        style: l,
        className: v(q(e.align), r.className, J && "relative overflow-visible", b),
        children: [
          e.header,
          N
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ w(
      At,
      {
        sortDirection: Ct(e.accessorKey),
        onSort: () => Rt(e.accessorKey),
        style: l,
        className: v(q(e.align), r.className, J && "relative overflow-visible", b),
        children: [
          e.header,
          N
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ w(
      X,
      {
        style: l,
        className: v(q(e.align), r.className, J && "relative overflow-visible", b),
        children: [
          e.header,
          N
        ]
      },
      String(e.accessorKey)
    );
  }, _ = Q ? wt : D, ht = _.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), _t = h.map((e) => `row-${e.id}`), Lt = () => 0, Ve = () => P ? M : 0, Se = () => {
    let e = 0;
    return P && (e += M), I && (e += k), e;
  }, Pt = d.useCallback(
    (e) => _.filter(
      (r) => e.columns.includes(r.accessorKey)
    ).length,
    [_]
  ), De = d.useMemo(() => K ? new Set(K.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [K]), jt = d.useMemo(() => {
    if (!K || K.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), r = (a) => K.findIndex((l) => l.columns.includes(a.accessorKey)), i = _.filter((a) => De.has(a.accessorKey));
    for (let a = 0; a < i.length - 1; a++) {
      const l = i[a], o = i[a + 1], b = r(l), N = r(o);
      b !== N && e.add(l.accessorKey);
    }
    return e;
  }, [K, _, De]), pt = d.useMemo(() => {
    if (!K || K.length === 0) return [];
    const e = [], r = /* @__PURE__ */ new Set();
    for (const i of _) {
      const a = K.findIndex((l) => l.columns.includes(i.accessorKey));
      a !== -1 ? r.has(a) || (r.add(a), e.push({ type: "group", group: K[a] })) : e.push({ type: "standalone", col: i });
    }
    return e;
  }, [K, _]), ft = /* @__PURE__ */ w(Yt, { className: ce, maxHeight: Y, children: [
    /* @__PURE__ */ w(Zt, { children: [
      K && K.length > 0 && /* @__PURE__ */ w(Z, { children: [
        P && /* @__PURE__ */ t(
          X,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${M}px`,
              minWidth: `${M}px`,
              ...z && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        I && /* @__PURE__ */ t(
          X,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              ...z && { position: "sticky", left: P ? M : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              Ee,
              {
                checked: ke,
                indeterminate: Ae,
                onCheckedChange: et,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        c && /* @__PURE__ */ t(
          X,
          {
            className: "bg-slate-100 dark:bg-slate-800 border-b-0 !p-0",
            rowSpan: 2,
            style: {
              width: `${W}px`,
              minWidth: `${W}px`,
              ...z && { position: "sticky", left: Se(), zIndex: 20 }
            },
            children: (c == null ? void 0 : c.showExpandAll) !== !1 && de.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: at,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": he ? "모두 접기" : "모두 펼치기",
                children: he ? /* @__PURE__ */ t(Ie, { size: 24 }) : /* @__PURE__ */ t(we, { size: 24 })
              }
            )
          }
        ),
        pe && /* @__PURE__ */ t(
          X,
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
        pt.map((e, r) => {
          const i = r < pt.length - 1;
          if (e.type === "group") {
            const a = Pt(e.group);
            return /* @__PURE__ */ t(
              X,
              {
                colSpan: a,
                className: v(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  i && "border-r border-slate-200 dark:border-slate-700"
                ),
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const a = $e(e.col, !0);
            return /* @__PURE__ */ t(
              X,
              {
                rowSpan: 2,
                className: v(
                  q(e.col.align),
                  "bg-slate-100 dark:bg-slate-800 border-b-0",
                  i && "border-r border-slate-200 dark:border-slate-700",
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
      /* @__PURE__ */ w(Z, { children: [
        !K && P && /* @__PURE__ */ t(
          X,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: z ? {
              position: "sticky",
              left: Lt(),
              zIndex: 20,
              width: `${M}px`,
              minWidth: `${M}px`,
              maxWidth: `${M}px`
            } : {
              width: `${M}px`,
              minWidth: `${M}px`,
              maxWidth: `${M}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !K && I && /* @__PURE__ */ t(
          X,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: z ? {
              position: "sticky",
              left: Ve(),
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
              Ee,
              {
                checked: ke,
                indeterminate: Ae,
                onCheckedChange: et,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !K && c && /* @__PURE__ */ t(
          X,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: z ? {
              position: "sticky",
              left: Se(),
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
            children: (c == null ? void 0 : c.showExpandAll) !== !1 && de.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: at,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": he ? "모두 접기" : "모두 펼치기",
                children: he ? /* @__PURE__ */ t(Ie, { size: 24 }) : /* @__PURE__ */ t(we, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !K && pe && /* @__PURE__ */ t(
          X,
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
        K ? Q ? /* @__PURE__ */ t(Fe, { items: ht, strategy: bt, children: _.filter((e) => De.has(e.accessorKey)).map(Ne) }) : _.filter((e) => De.has(e.accessorKey)).map(Ne) : Q ? /* @__PURE__ */ t(Fe, { items: ht, strategy: bt, children: _.map(Ne) }) : _.map(Ne)
      ] })
    ] }),
    /* @__PURE__ */ w(Gt, { children: [
      Xe ? /* @__PURE__ */ t(Z, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        S,
        {
          colSpan: We,
          className: v(
            "text-center",
            be || ye !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: be ?? (ye === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const r = typeof Y == "number" ? Y : typeof Y == "string" && parseInt(Y, 10) || 320, i = Math.max(1, Math.floor(r / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: i }).map((a, l) => /* @__PURE__ */ w(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    P && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(Ke, { width: 16, height: 16 }) }),
                    I && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(Ke, { width: 18, height: 18 }) }),
                    c && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(Ke, { width: 18, height: 18 }) }),
                    _.map((o) => {
                      const b = o.width ?? o.minWidth, N = typeof b == "number" ? Math.min(b * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(Ke, { height: 16, width: N }) }, String(o.accessorKey));
                    })
                  ]
                },
                l
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본)
            /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ t(ts, { size: "lg" }) })
          ))
        }
      ) }) : h.length === 0 ? /* @__PURE__ */ t(Z, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        S,
        {
          colSpan: We,
          className: "h-24 text-center text-slate-500",
          children: ie
        }
      ) }) : P ? /* @__PURE__ */ t(Fe, { items: _t, strategy: Ut, children: h.map((e, r) => {
        const i = R.includes(e.id), a = Le(e), l = Pe(e.id), o = `row-${e.id}`, b = (N) => /* @__PURE__ */ w(ut, { children: [
          /* @__PURE__ */ t(
            Wt,
            {
              isSelected: i,
              hasLeftStickyColumns: z,
              dragHandleProps: N
            }
          ),
          I && /* @__PURE__ */ t(
            S,
            {
              onClick: (s) => s.stopPropagation(),
              className: v(
                "!p-0",
                z && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Ve(),
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
                Ee,
                {
                  checked: i,
                  onCheckedChange: () => tt(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          c && /* @__PURE__ */ t(
            S,
            {
              className: v(
                "p-0",
                z && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Se(),
                zIndex: 10,
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
              } : {
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
              },
              onClick: (s) => s.stopPropagation(),
              children: a && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => nt(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": l ? "행 접기" : "행 펼치기",
                  "aria-expanded": l,
                  children: l ? /* @__PURE__ */ t(Ie, { size: 24 }) : /* @__PURE__ */ t(we, { size: 24 })
                }
              )
            }
          ),
          pe && /* @__PURE__ */ t(
            S,
            {
              className: "!p-0",
              style: {
                width: `${T}px`,
                minWidth: `${T}px`,
                maxWidth: `${T}px`
              },
              onClick: (s) => s.stopPropagation(),
              children: /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var s;
                    return (s = g == null ? void 0 : g.onRowDelete) == null ? void 0 : s.call(g, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(mt, { size: 20 })
                }
              )
            }
          ),
          _.map((s) => {
            const n = ot(r, s.accessorKey);
            if (n === 0) return null;
            const O = e[s.accessorKey], te = it(e.id, s.accessorKey), p = n !== void 0 && n > 1, u = p && ct(r, n), m = p && dt(r, n), H = $e(s, !1, i, p ? m : void 0), se = (x) => typeof x == "number" ? `${x}px` : x, j = {};
            if (!s.sticky) {
              const x = J ? fe(s) : void 0;
              x !== void 0 ? (j.width = `${x}px`, j.minWidth = `${x}px`) : (s.width && (j.width = se(s.width)), s.minWidth && (j.minWidth = se(s.minWidth)));
            }
            const U = { ...j, ...H.style };
            if (te && s.editable) {
              const x = s.editComponent || kt;
              return /* @__PURE__ */ t(
                S,
                {
                  ref: Te,
                  className: v(q(s.align), "p-1 overflow-hidden", H.className),
                  style: U,
                  onClick: (B) => B.stopPropagation(),
                  rowSpan: p ? n : void 0,
                  children: /* @__PURE__ */ t(
                    x,
                    {
                      value: qe,
                      onChange: (B) => {
                        ne(B), A.current = B, y != null && y.error && G({ ...y, error: void 0 });
                      },
                      onComplete: () => rt(s, e),
                      onCancel: ve,
                      row: e,
                      error: y == null ? void 0 : y.error
                    }
                  )
                },
                String(s.accessorKey)
              );
            }
            const oe = s.cell ? s.cell(O, e) : String(O ?? "");
            if (s.editable && V)
              return /* @__PURE__ */ t(
                S,
                {
                  className: v(
                    q(s.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    p && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    p && m && "bg-blue-50 dark:bg-blue-900",
                    p && !m && u && "bg-slate-100 dark:bg-slate-800",
                    H.className
                  ),
                  style: U,
                  onClick: (x) => {
                    x.stopPropagation(), setTimeout(() => st(e.id, s.accessorKey, O), 0);
                  },
                  rowSpan: p ? n : void 0,
                  children: /* @__PURE__ */ w("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: oe }),
                    /* @__PURE__ */ t(
                      xt,
                      {
                        size: 14,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(s.accessorKey)
              );
            const re = p && r + n >= h.length;
            return /* @__PURE__ */ t(
              S,
              {
                className: v(
                  q(s.align),
                  p && "align-middle transition-colors",
                  p && !re && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  p && m && "bg-blue-50 dark:bg-blue-900",
                  p && !m && u && "bg-slate-100 dark:bg-slate-800",
                  H.className
                ),
                style: U,
                rowSpan: p ? n : void 0,
                children: oe
              },
              String(s.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ w(d.Fragment, { children: [
          /* @__PURE__ */ t(
            vt,
            {
              id: o,
              isSelected: i,
              className: v(f && "cursor-pointer", F == null ? void 0 : F(e)),
              onClick: () => f == null ? void 0 : f(e),
              onMouseEnter: C ? () => ae(r) : void 0,
              onMouseLeave: C ? () => ae(null) : void 0,
              children: (N) => b(N)
            }
          ),
          c && l && /* @__PURE__ */ t(Z, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            S,
            {
              colSpan: We,
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
                  children: c.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : h.map((e, r) => {
        const i = R.includes(e.id), a = Le(e), l = Pe(e.id), o = `row-${e.id}`, b = (N) => /* @__PURE__ */ w(ut, { children: [
          P && /* @__PURE__ */ t(
            Wt,
            {
              isSelected: i,
              hasLeftStickyColumns: z,
              dragHandleProps: N
            }
          ),
          I && /* @__PURE__ */ t(
            S,
            {
              onClick: (s) => s.stopPropagation(),
              className: v(
                "!p-0",
                z && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Ve(),
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
                Ee,
                {
                  checked: i,
                  onCheckedChange: () => tt(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          c && /* @__PURE__ */ t(
            S,
            {
              className: v(
                "p-0",
                z && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: z ? {
                position: "sticky",
                left: Se(),
                zIndex: 10,
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
              } : {
                width: `${W}px`,
                minWidth: `${W}px`,
                maxWidth: `${W}px`
              },
              onClick: (s) => s.stopPropagation(),
              children: a && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => nt(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": l ? "행 접기" : "행 펼치기",
                  "aria-expanded": l,
                  children: l ? /* @__PURE__ */ t(Ie, { size: 24 }) : /* @__PURE__ */ t(we, { size: 24 })
                }
              )
            }
          ),
          pe && /* @__PURE__ */ t(
            S,
            {
              className: "!p-0",
              style: {
                width: `${T}px`,
                minWidth: `${T}px`,
                maxWidth: `${T}px`
              },
              onClick: (s) => s.stopPropagation(),
              children: /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var s;
                    return (s = g == null ? void 0 : g.onRowDelete) == null ? void 0 : s.call(g, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(mt, { size: 20 })
                }
              )
            }
          ),
          _.map((s) => {
            const n = ot(r, s.accessorKey);
            if (n === 0) return null;
            const O = e[s.accessorKey], te = it(e.id, s.accessorKey), p = n !== void 0 && n > 1, u = p && ct(r, n), m = p && dt(r, n), H = $e(s, !1, i, p ? m : void 0), se = (x) => typeof x == "number" ? `${x}px` : x, j = {};
            if (!s.sticky) {
              const x = J ? fe(s) : void 0;
              x !== void 0 ? (j.width = `${x}px`, j.minWidth = `${x}px`) : (s.width && (j.width = se(s.width)), s.minWidth && (j.minWidth = se(s.minWidth)));
            }
            const U = { ...j, ...H.style };
            if (te && s.editable) {
              const x = s.editComponent || kt;
              return /* @__PURE__ */ t(
                S,
                {
                  ref: Te,
                  className: v(q(s.align), "p-1 overflow-hidden", H.className),
                  style: U,
                  onClick: (B) => B.stopPropagation(),
                  rowSpan: p ? n : void 0,
                  children: /* @__PURE__ */ t(
                    x,
                    {
                      value: qe,
                      onChange: (B) => {
                        ne(B), A.current = B, y != null && y.error && G({ ...y, error: void 0 });
                      },
                      onComplete: () => rt(s, e),
                      onCancel: ve,
                      row: e,
                      error: y == null ? void 0 : y.error
                    }
                  )
                },
                String(s.accessorKey)
              );
            }
            const oe = s.cell ? s.cell(O, e) : String(O ?? "");
            if (s.editable && V)
              return /* @__PURE__ */ t(
                S,
                {
                  className: v(
                    q(s.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    p && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    p && m && "bg-blue-50 dark:bg-blue-900",
                    p && !m && u && "bg-slate-100 dark:bg-slate-800",
                    H.className
                  ),
                  style: U,
                  onClick: (x) => {
                    x.stopPropagation(), setTimeout(() => {
                      st(e.id, s.accessorKey, O);
                    }, 0);
                  },
                  rowSpan: p ? n : void 0,
                  children: /* @__PURE__ */ w("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: oe }),
                    /* @__PURE__ */ t(
                      xt,
                      {
                        size: 20,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(s.accessorKey)
              );
            const re = p && r + n >= h.length;
            return /* @__PURE__ */ t(
              S,
              {
                className: v(
                  q(s.align),
                  p && "align-middle transition-colors",
                  p && !re && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  p && m && "bg-blue-50 dark:bg-blue-900",
                  p && !m && u && "bg-slate-100 dark:bg-slate-800",
                  H.className
                ),
                style: U,
                rowSpan: p ? n : void 0,
                children: oe
              },
              String(s.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ w(d.Fragment, { children: [
          P ? /* @__PURE__ */ t(
            vt,
            {
              id: o,
              isSelected: i,
              className: v(f && "cursor-pointer", F == null ? void 0 : F(e)),
              onClick: () => f == null ? void 0 : f(e),
              onMouseEnter: C ? () => ae(r) : void 0,
              onMouseLeave: C ? () => ae(null) : void 0,
              children: (N) => b(N)
            }
          ) : /* @__PURE__ */ t(
            Z,
            {
              "data-state": i ? "selected" : void 0,
              className: v(
                f && "cursor-pointer",
                (je == null ? void 0 : je.has(r)) && "border-b-0",
                F == null ? void 0 : F(e)
              ),
              onClick: () => f == null ? void 0 : f(e),
              onMouseEnter: C ? () => ae(r) : void 0,
              onMouseLeave: C ? () => ae(null) : void 0,
              children: b()
            }
          ),
          c && l && /* @__PURE__ */ t(Z, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            S,
            {
              colSpan: We,
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
                  children: c.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      Tt && !Xe && /* @__PURE__ */ w(Z, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        P && /* @__PURE__ */ t(
          S,
          {
            className: "!p-0",
            style: {
              width: `${M}px`,
              minWidth: `${M}px`,
              maxWidth: `${M}px`
            }
          }
        ),
        I && /* @__PURE__ */ t(
          S,
          {
            className: "!p-0",
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            }
          }
        ),
        c && /* @__PURE__ */ t(
          S,
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
          S,
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
                  return (e = g == null ? void 0 : g.onRowAdd) == null ? void 0 : e.call(g);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(ss, { size: 20 })
              }
            )
          }
        ),
        _.map((e) => /* @__PURE__ */ t(
          S,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return Q || P ? /* @__PURE__ */ t(
    qt,
    {
      sensors: zt,
      collisionDetection: Jt,
      onDragEnd: Ht,
      children: ft
    }
  ) : ft;
}
export {
  ks as DataTable
};
//# sourceMappingURL=data-table.mjs.map
