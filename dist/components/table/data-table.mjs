import { jsxs as I, jsx as t, Fragment as ft } from "react/jsx-runtime";
import * as h from "react";
import { useSensors as Ot, useSensor as ut, PointerSensor as Vt, KeyboardSensor as Bt, DndContext as Xt, closestCenter as Ft } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as qt, arrayMove as gt, SortableContext as Be, horizontalListSortingStrategy as mt, verticalListSortingStrategy as Jt, useSortable as Wt } from "@dnd-kit/sortable";
import { CSS as $t } from "@dnd-kit/utilities";
import { cn as W } from "../../lib/utils.mjs";
import { Table as Qt, TableHeader as Ut, TableRow as Z, TableHead as F, TableBody as Yt, TableCell as S, TableSortableHead as Zt } from "./table.mjs";
import { Checkbox as De } from "../ui/checkbox.mjs";
import { Input as Gt } from "../ui/input.mjs";
import { Skeleton as Ee } from "../ui/skeleton.mjs";
import { SplashScreen as At } from "../ui/splash-screen.mjs";
import { DownIcon as Ke } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as Nt } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as Ie } from "../../icons/RightIcon.mjs";
import { RowAddIcon as es } from "../../icons/RowAddIcon.mjs";
import { RowDeleteIcon as yt } from "../../icons/RowDeleteIcon.mjs";
import { WriteIcon as bt } from "../../icons/WriteIcon.mjs";
function xt({
  value: D,
  onChange: d,
  onComplete: K,
  onCancel: H,
  error: N
}) {
  const E = h.useRef(null);
  h.useEffect(() => {
    var u, B;
    (u = E.current) == null || u.focus(), (B = E.current) == null || B.select();
  }, []);
  const C = (u) => {
    u.key === "Enter" ? (u.preventDefault(), K()) : u.key === "Escape" && (u.preventDefault(), H());
  };
  return /* @__PURE__ */ I("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ t(
      Gt,
      {
        ref: E,
        value: String(D ?? ""),
        onChange: (u) => d(u.target.value),
        onKeyDown: C,
        error: !!N,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    N && /* @__PURE__ */ t("span", { className: "text-[10px] text-destructive dark:text-red-400", children: N })
  ] });
}
function ts({
  id: D,
  children: d,
  className: K,
  style: H,
  disabled: N
}) {
  const {
    attributes: E,
    listeners: C,
    setNodeRef: u,
    transform: B,
    transition: o,
    isDragging: re
  } = Wt({ id: D, disabled: N }), oe = {
    ...H,
    transform: $t.Transform.toString(B),
    transition: o,
    opacity: re ? 0.5 : 1,
    cursor: N ? void 0 : "grab"
  };
  return /* @__PURE__ */ t(
    "th",
    {
      ref: u,
      style: oe,
      className: W(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-600 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        re && "z-50",
        K
      ),
      ...E,
      ...C,
      children: /* @__PURE__ */ I("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ t(
          Nt,
          {
            size: 16,
            className: "opacity-30 group-hover/drag:opacity-70 transition-opacity flex-shrink-0"
          }
        ),
        d
      ] })
    }
  );
}
function kt({
  id: D,
  children: d,
  className: K,
  isSelected: H,
  onClick: N,
  onMouseEnter: E,
  onMouseLeave: C
}) {
  const {
    setNodeRef: u,
    setActivatorNodeRef: B,
    listeners: o,
    attributes: re,
    transform: oe,
    transition: X,
    isDragging: Y
  } = Wt({ id: D }), J = {
    transform: $t.Transform.toString(oe),
    transition: X,
    opacity: Y ? 0.5 : 1
  };
  return /* @__PURE__ */ t(
    "tr",
    {
      ref: u,
      style: J,
      "data-state": H ? "selected" : void 0,
      className: W(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        Y && "z-50 shadow-lg",
        K
      ),
      onClick: N,
      onMouseEnter: E,
      onMouseLeave: C,
      children: typeof d == "function" ? d({ listeners: o, attributes: re, setActivatorNodeRef: B }) : d
    }
  );
}
function vt({ isSelected: D, hasLeftStickyColumns: d, dragHandleProps: K }) {
  const { listeners: N, attributes: E, setActivatorNodeRef: C } = K ?? {};
  return /* @__PURE__ */ t(
    "td",
    {
      className: W(
        "p-0 align-middle",
        d && (D ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
      ),
      style: d ? {
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
          ref: C,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (u) => u.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...N,
          ...E,
          children: /* @__PURE__ */ t(Nt, { size: 16 })
        }
      )
    }
  );
}
function bs({
  columns: D,
  data: d,
  selectable: K = !1,
  selectedIds: H = [],
  onSelectionChange: N,
  sortState: E,
  onSortChange: C,
  onRowClick: u,
  onCellChange: B,
  expandable: o,
  emptyMessage: re = "데이터가 없습니다.",
  className: oe,
  rowClassName: X,
  maxHeight: Y,
  resizable: J = !1,
  columnWidths: ue,
  onColumnResize: we,
  columnReorderable: Q = !1,
  columnOrder: ze,
  onColumnReorder: He,
  rowReorderable: Re = !1,
  onRowReorder: ge,
  loading: Xe = !1,
  loadingMode: me = "splash",
  loadingContent: ye,
  headerGroups: j,
  rowGrouping: R,
  rowActions: m
}) {
  const L = R ? !1 : Re;
  h.useEffect(() => {
    R && Re && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [R, Re]), h.useEffect(() => {
    ye && me !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [ye, me]);
  const [y, G] = h.useState(null), [Fe, ne] = h.useState(null), A = h.useRef(null), Te = h.useRef(null), [St, Dt] = h.useState(
    (o == null ? void 0 : o.defaultExpandedRowIds) ?? []
  ), [Me, Et] = h.useState({}), [ee, qe] = h.useState(null), Je = h.useRef(0), Qe = h.useRef(0), [Kt, Ue] = h.useState(
    () => D.map((e) => e.accessorKey)
  ), [_e, ae] = h.useState(null);
  h.useEffect(() => {
    !Q || ze || Ue((e) => {
      const i = D.map((n) => n.accessorKey), r = e.filter((n) => i.includes(n)), l = i.filter((n) => !r.includes(n)), a = [...r, ...l];
      return a.length === e.length && a.every((n, v) => n === e[v]) ? e : a;
    });
  }, [D, Q, ze]);
  const le = ze ?? Kt, It = h.useMemo(() => Q ? le.map((e) => D.find((i) => i.accessorKey === e)).filter((e) => e !== void 0) : D, [D, le, Q]), wt = Ot(
    ut(Vt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    ut(Bt, {
      coordinateGetter: qt
    })
  ), Ye = h.useCallback(
    (e) => {
      const { active: i, over: r } = e;
      if (!r || i.id === r.id) return;
      const l = le.findIndex((v) => String(v) === i.id), a = le.findIndex((v) => String(v) === r.id);
      if (l === -1 || a === -1) return;
      const n = gt(le, l, a);
      He ? He(n) : Ue(n);
    },
    [le, He]
  ), Ze = h.useCallback(
    (e) => {
      const { active: i, over: r } = e;
      if (!r || i.id === r.id) return;
      const l = String(i.id).replace(/^row-/, ""), a = String(r.id).replace(/^row-/, ""), n = d.findIndex((s) => String(s.id) === l), v = d.findIndex((s) => String(s.id) === a);
      if (n === -1 || v === -1) return;
      const f = gt(d, n, v);
      ge == null || ge(f);
    },
    [d, ge]
  ), zt = h.useCallback(
    (e) => {
      const { active: i } = e;
      String(i.id).startsWith("row-") ? Ze(e) : Ye(e);
    },
    [Ye, Ze]
  ), be = (o == null ? void 0 : o.expandedRowIds) ?? St, xe = (o == null ? void 0 : o.onExpandedChange) ?? Dt, ke = d.length > 0 && H.length === d.length, Ge = H.length > 0 && !ke, Ae = () => {
    ke ? N == null || N([]) : N == null || N(d.map((e) => e.id));
  }, et = (e) => {
    H.includes(e) ? N == null || N(H.filter((i) => i !== e)) : N == null || N([...H, e]);
  }, Ht = (e) => {
    C && ((E == null ? void 0 : E.column) === e ? E.direction === "asc" ? C({ column: e, direction: "desc" }) : E.direction === "desc" ? C({ column: null, direction: null }) : C({ column: e, direction: "asc" }) : C({ column: e, direction: "asc" }));
  }, Rt = (e) => (E == null ? void 0 : E.column) === e ? E.direction : null, q = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, tt = (e, i, r) => {
    G({ rowId: e, columnKey: i }), ne(r), A.current = r;
  }, st = (e, i) => {
    const r = A.current;
    if (!y || r === null) {
      G(null), ne(null), A.current = null;
      return;
    }
    if (e.validate) {
      const l = e.validate(r, i);
      if (l !== !0) {
        G({ ...y, error: l });
        return;
      }
    }
    B && B(y.rowId, y.columnKey, r), G(null), ne(null), A.current = null;
  }, ve = h.useCallback(() => {
    G(null), ne(null), A.current = null;
  }, []);
  h.useEffect(() => {
    if (!y) return;
    const e = (i) => {
      var a, n;
      const r = i.target;
      (a = Te.current) != null && a.contains(r) || (n = r.closest) != null && n.call(r, "[data-radix-popper-content-wrapper]") || ve();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [y, ve]);
  const it = (e, i) => (y == null ? void 0 : y.rowId) === e && (y == null ? void 0 : y.columnKey) === i, Ce = (e) => o ? o.rowExpandable ? o.rowExpandable(e) : !0 : !1, Le = (e) => be.includes(e), rt = (e) => {
    Le(e) ? xe(be.filter((i) => i !== e)) : xe([...be, e]);
  }, de = h.useMemo(() => o ? d.filter((e) => Ce(e)).map((e) => e.id) : [], [d, o]), he = de.length > 0 && de.every((e) => be.includes(e)), nt = () => {
    xe(he ? [] : de);
  }, pe = (m == null ? void 0 : m.showDelete) ?? !!(m != null && m.onRowDelete), Tt = (m == null ? void 0 : m.showAdd) ?? !!(m != null && m.onRowAdd), T = 40, We = D.length + (K ? 1 : 0) + (o ? 1 : 0) + (L ? 1 : 0) + (pe ? 1 : 0), { rowSpanMap: at, middleRowSet: Pe } = h.useMemo(() => {
    if (!R) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(R.groupBy) ? R.groupBy : [R.groupBy], i = R.mergeColumns ?? e, r = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set();
    for (const a of i) {
      let n = 0;
      for (; n < d.length; ) {
        const v = e.map((c) => d[n][c]), f = d[n][a];
        let s = 1;
        for (let c = n + 1; c < d.length; c++) {
          const O = e.map((b) => d[c][b]), te = d[c][a];
          if (v.every((b, z) => b === O[z]) && f === te)
            s++;
          else
            break;
        }
        r.has(n) || r.set(n, /* @__PURE__ */ new Map()), r.get(n).set(a, s);
        for (let c = n; c < n + s - 1; c++)
          l.add(c);
        for (let c = n + 1; c < n + s; c++)
          r.has(c) || r.set(c, /* @__PURE__ */ new Map()), r.get(c).set(a, 0);
        n += s;
      }
    }
    return { rowSpanMap: r, middleRowSet: l };
  }, [d, R]), lt = (e, i) => {
    if (!at) return;
    const r = at.get(e);
    return r ? r.get(i) : void 0;
  }, ct = (e, i) => _e === null ? !1 : _e >= e && _e < e + i, ot = (e, i) => {
    for (let r = e; r < e + i; r++)
      if (r < d.length && H.includes(d[r].id))
        return !0;
    return !1;
  }, k = 40, $ = 40, M = 32, $e = h.useMemo(() => {
    const e = (g) => {
      const b = g.width ?? g.minWidth;
      if (typeof b == "number") return b;
      const z = parseInt(String(b), 10);
      return Number.isFinite(z) ? z : 150;
    }, i = D.filter((g) => g.sticky === "left"), r = D.filter((g) => g.sticky === "right"), l = L ? M : 0, a = K ? k : 0, n = o ? $ : 0, v = l + a + n, f = /* @__PURE__ */ new Map();
    let s = v;
    for (const g of i)
      f.set(g.accessorKey, s), s += e(g);
    const c = /* @__PURE__ */ new Map();
    let O = 0;
    for (let g = r.length - 1; g >= 0; g--) {
      const b = r[g];
      c.set(b.accessorKey, O), O += e(b);
    }
    const te = i.length > 0 ? i[i.length - 1].accessorKey : null, p = r.length > 0 ? r[0].accessorKey : null;
    return (g, b, z, se) => {
      if (!g.sticky) return { style: {}, className: "" };
      const P = g.accessorKey === te, U = g.accessorKey === p, ie = `${e(g)}px`, x = {
        position: "sticky",
        zIndex: b ? 20 : 10,
        width: ie,
        minWidth: ie,
        maxWidth: ie
      }, V = se ?? z;
      if (g.sticky === "left") {
        const jt = f.get(g.accessorKey) ?? 0;
        return {
          style: {
            ...x,
            left: `${jt}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: W(
            "transition-colors",
            b ? "bg-slate-100 dark:bg-slate-800" : V ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
            P && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          )
        };
      }
      const Pt = c.get(g.accessorKey) ?? 0;
      return {
        style: {
          ...x,
          right: `${Pt}px`
        },
        className: W(
          "transition-colors",
          b ? "bg-slate-100 dark:bg-slate-800" : V ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
          U && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [D, K, o]), w = D.some((e) => e.sticky === "left"), fe = h.useCallback(
    (e) => {
      const i = String(e.accessorKey);
      if (ue && i in ue)
        return ue[i];
      if (i in Me)
        return Me[i];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [ue, Me]
  ), Mt = h.useCallback(
    (e, i) => {
      e.preventDefault(), e.stopPropagation(), qe(i.accessorKey), Je.current = e.clientX;
      const r = fe(i) ?? 150;
      Qe.current = r;
    },
    [fe]
  ), je = h.useCallback(
    (e) => {
      if (!ee) return;
      const i = e.clientX - Je.current, r = Math.max(50, Qe.current + i), l = String(ee);
      we ? we(ee, r) : Et((a) => ({ ...a, [l]: r }));
    },
    [ee, we]
  ), Oe = h.useCallback(() => {
    qe(null);
  }, []);
  h.useEffect(() => {
    if (ee)
      return document.addEventListener("mousemove", je), document.addEventListener("mouseup", Oe), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", je), document.removeEventListener("mouseup", Oe), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [ee, je, Oe]);
  const Ne = (e) => {
    const i = $e(e, !0), r = (f) => typeof f == "number" ? `${f}px` : f, l = {};
    if (!e.sticky) {
      const f = J ? fe(e) : void 0;
      f !== void 0 ? (l.width = `${f}px`, l.minWidth = `${f}px`) : (e.width && (l.width = r(e.width)), e.minWidth && (l.minWidth = r(e.minWidth)));
    }
    const a = { ...l, ...i.style }, n = J && /* @__PURE__ */ t(
      "div",
      {
        className: W(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          ee === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (f) => Mt(f, e),
        onPointerDown: (f) => f.stopPropagation(),
        onClick: (f) => f.stopPropagation()
      }
    );
    return Q && !e.sticky && !e.sortable ? /* @__PURE__ */ I(
      ts,
      {
        id: String(e.accessorKey),
        style: a,
        className: W(q(e.align), i.className, J && "relative overflow-visible"),
        children: [
          e.header,
          n
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ I(
      Zt,
      {
        sortDirection: Rt(e.accessorKey),
        onSort: () => Ht(e.accessorKey),
        style: a,
        className: W(q(e.align), i.className, J && "relative overflow-visible"),
        children: [
          e.header,
          n
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ I(
      F,
      {
        style: a,
        className: W(q(e.align), i.className, J && "relative overflow-visible"),
        children: [
          e.header,
          n
        ]
      },
      String(e.accessorKey)
    );
  }, _ = Q ? It : D, dt = _.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), _t = d.map((e) => `row-${e.id}`), Ct = () => 0, Ve = () => L ? M : 0, Se = () => {
    let e = 0;
    return L && (e += M), K && (e += k), e;
  }, Lt = h.useCallback(
    (e) => _.filter(
      (i) => e.columns.includes(i.accessorKey)
    ).length,
    [_]
  ), ht = h.useMemo(() => j ? new Set(j.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [j]), pt = /* @__PURE__ */ I(Qt, { className: oe, maxHeight: Y, children: [
    /* @__PURE__ */ I(Ut, { children: [
      j && j.length > 0 && /* @__PURE__ */ I(Z, { children: [
        L && /* @__PURE__ */ t(
          F,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${M}px`,
              minWidth: `${M}px`,
              ...w && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        K && /* @__PURE__ */ t(
          F,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              ...w && { position: "sticky", left: L ? M : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              De,
              {
                checked: ke,
                indeterminate: Ge,
                onCheckedChange: Ae,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        o && /* @__PURE__ */ t(
          F,
          {
            className: "bg-slate-100 dark:bg-slate-800 border-b-0 !p-0",
            rowSpan: 2,
            style: {
              width: `${$}px`,
              minWidth: `${$}px`,
              ...w && { position: "sticky", left: Se(), zIndex: 20 }
            },
            children: (o == null ? void 0 : o.showExpandAll) !== !1 && de.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: nt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": he ? "모두 접기" : "모두 펼치기",
                children: he ? /* @__PURE__ */ t(Ke, { size: 24 }) : /* @__PURE__ */ t(Ie, { size: 24 })
              }
            )
          }
        ),
        pe && /* @__PURE__ */ t(
          F,
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
        (() => {
          const e = new Set(j.flatMap((l) => l.columns)), i = [];
          let r = 0;
          for (; r < _.length; ) {
            const l = _[r], a = j.find(
              (n) => n.columns.includes(l.accessorKey)
            );
            if (a) {
              const n = _.find(
                (v) => a.columns.includes(v.accessorKey)
              );
              if ((n == null ? void 0 : n.accessorKey) === l.accessorKey) {
                const v = Lt(a);
                i.push(
                  /* @__PURE__ */ t(
                    F,
                    {
                      colSpan: v,
                      className: W(
                        "text-center font-medium bg-slate-100 dark:bg-slate-800",
                        a.align === "left" && "text-left",
                        a.align === "right" && "text-right"
                      ),
                      children: a.header
                    },
                    `group-${String(a.columns[0])}`
                  )
                );
              }
            } else if (!e.has(l.accessorKey)) {
              const n = $e(l, !0);
              i.push(
                /* @__PURE__ */ t(
                  F,
                  {
                    rowSpan: 2,
                    className: W(
                      q(l.align),
                      "bg-slate-100 dark:bg-slate-800 border-b-0",
                      n.className
                    ),
                    style: n.style,
                    children: l.header
                  },
                  `standalone-${String(l.accessorKey)}`
                )
              );
            }
            r++;
          }
          return i;
        })()
      ] }),
      /* @__PURE__ */ I(Z, { children: [
        !j && L && /* @__PURE__ */ t(
          F,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: w ? {
              position: "sticky",
              left: Ct(),
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
        !j && K && /* @__PURE__ */ t(
          F,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: w ? {
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
              De,
              {
                checked: ke,
                indeterminate: Ge,
                onCheckedChange: Ae,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !j && o && /* @__PURE__ */ t(
          F,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: w ? {
              position: "sticky",
              left: Se(),
              zIndex: 20,
              width: `${$}px`,
              minWidth: `${$}px`,
              maxWidth: `${$}px`
            } : {
              width: `${$}px`,
              minWidth: `${$}px`,
              maxWidth: `${$}px`
            },
            "aria-label": "확장",
            children: (o == null ? void 0 : o.showExpandAll) !== !1 && de.length > 0 ? /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: nt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": he ? "모두 접기" : "모두 펼치기",
                children: he ? /* @__PURE__ */ t(Ke, { size: 24 }) : /* @__PURE__ */ t(Ie, { size: 24 })
              }
            ) : /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !j && pe && /* @__PURE__ */ t(
          F,
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
        j ? Q ? /* @__PURE__ */ t(Be, { items: dt, strategy: mt, children: _.filter((e) => ht.has(e.accessorKey)).map(Ne) }) : _.filter((e) => ht.has(e.accessorKey)).map(Ne) : Q ? /* @__PURE__ */ t(Be, { items: dt, strategy: mt, children: _.map(Ne) }) : _.map(Ne)
      ] })
    ] }),
    /* @__PURE__ */ I(Yt, { children: [
      Xe ? /* @__PURE__ */ t(Z, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        S,
        {
          colSpan: We,
          className: W(
            "text-center",
            ye || me !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: ye ?? (me === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const i = typeof Y == "number" ? Y : typeof Y == "string" && parseInt(Y, 10) || 320, r = Math.max(1, Math.floor(i / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: r }).map((l, a) => /* @__PURE__ */ I(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    L && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(Ee, { width: 16, height: 16 }) }),
                    K && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(Ee, { width: 18, height: 18 }) }),
                    o && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(Ee, { width: 18, height: 18 }) }),
                    _.map((n) => {
                      const v = n.width ?? n.minWidth, f = typeof v == "number" ? Math.min(v * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(Ee, { height: 16, width: f }) }, String(n.accessorKey));
                    })
                  ]
                },
                a
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본)
            /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ t(At, { size: "lg" }) })
          ))
        }
      ) }) : d.length === 0 ? /* @__PURE__ */ t(Z, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        S,
        {
          colSpan: We,
          className: "h-24 text-center text-slate-500",
          children: re
        }
      ) }) : L ? /* @__PURE__ */ t(Be, { items: _t, strategy: Jt, children: d.map((e, i) => {
        const r = H.includes(e.id), l = Ce(e), a = Le(e.id), n = `row-${e.id}`, v = (f) => /* @__PURE__ */ I(ft, { children: [
          /* @__PURE__ */ t(
            vt,
            {
              isSelected: r,
              hasLeftStickyColumns: w,
              dragHandleProps: f
            }
          ),
          K && /* @__PURE__ */ t(
            S,
            {
              onClick: (s) => s.stopPropagation(),
              className: W(
                "!p-0",
                w && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: w ? {
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
                De,
                {
                  checked: r,
                  onCheckedChange: () => et(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          o && /* @__PURE__ */ t(
            S,
            {
              className: W(
                "p-0",
                w && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: w ? {
                position: "sticky",
                left: Se(),
                zIndex: 10,
                width: `${$}px`,
                minWidth: `${$}px`,
                maxWidth: `${$}px`
              } : {
                width: `${$}px`,
                minWidth: `${$}px`,
                maxWidth: `${$}px`
              },
              onClick: (s) => s.stopPropagation(),
              children: l && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => rt(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(Ke, { size: 24 }) : /* @__PURE__ */ t(Ie, { size: 24 })
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
                    return (s = m == null ? void 0 : m.onRowDelete) == null ? void 0 : s.call(m, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(yt, { size: 20 })
                }
              )
            }
          ),
          _.map((s) => {
            const c = lt(i, s.accessorKey);
            if (c === 0) return null;
            const O = e[s.accessorKey], te = it(e.id, s.accessorKey), p = c !== void 0 && c > 1, g = p && ct(i, c), b = p && ot(i, c), z = $e(s, !1, r, p ? b : void 0), se = (x) => typeof x == "number" ? `${x}px` : x, P = {};
            if (!s.sticky) {
              const x = J ? fe(s) : void 0;
              x !== void 0 ? (P.width = `${x}px`, P.minWidth = `${x}px`) : (s.width && (P.width = se(s.width)), s.minWidth && (P.minWidth = se(s.minWidth)));
            }
            const U = { ...P, ...z.style };
            if (te && s.editable) {
              const x = s.editComponent || xt;
              return /* @__PURE__ */ t(
                S,
                {
                  ref: Te,
                  className: W(q(s.align), "p-1 overflow-hidden", z.className),
                  style: U,
                  onClick: (V) => V.stopPropagation(),
                  rowSpan: p ? c : void 0,
                  children: /* @__PURE__ */ t(
                    x,
                    {
                      value: Fe,
                      onChange: (V) => {
                        ne(V), A.current = V, y != null && y.error && G({ ...y, error: void 0 });
                      },
                      onComplete: () => st(s, e),
                      onCancel: ve,
                      row: e,
                      error: y == null ? void 0 : y.error
                    }
                  )
                },
                String(s.accessorKey)
              );
            }
            const ce = s.cell ? s.cell(O, e) : String(O ?? "");
            if (s.editable && B)
              return /* @__PURE__ */ t(
                S,
                {
                  className: W(
                    q(s.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    p && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    p && b && "bg-blue-50 dark:bg-blue-900",
                    p && !b && g && "bg-slate-100 dark:bg-slate-800",
                    z.className
                  ),
                  style: U,
                  onClick: (x) => {
                    x.stopPropagation(), setTimeout(() => tt(e.id, s.accessorKey, O), 0);
                  },
                  rowSpan: p ? c : void 0,
                  children: /* @__PURE__ */ I("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: ce }),
                    /* @__PURE__ */ t(
                      bt,
                      {
                        size: 14,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(s.accessorKey)
              );
            const ie = p && i + c >= d.length;
            return /* @__PURE__ */ t(
              S,
              {
                className: W(
                  q(s.align),
                  p && "align-middle transition-colors",
                  p && !ie && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  p && b && "bg-blue-50 dark:bg-blue-900",
                  p && !b && g && "bg-slate-100 dark:bg-slate-800",
                  z.className
                ),
                style: U,
                rowSpan: p ? c : void 0,
                children: ce
              },
              String(s.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ I(h.Fragment, { children: [
          /* @__PURE__ */ t(
            kt,
            {
              id: n,
              isSelected: r,
              className: W(u && "cursor-pointer", X == null ? void 0 : X(e)),
              onClick: () => u == null ? void 0 : u(e),
              onMouseEnter: R ? () => ae(i) : void 0,
              onMouseLeave: R ? () => ae(null) : void 0,
              children: (f) => v(f)
            }
          ),
          o && a && /* @__PURE__ */ t(Z, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
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
                  children: o.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : d.map((e, i) => {
        const r = H.includes(e.id), l = Ce(e), a = Le(e.id), n = `row-${e.id}`, v = (f) => /* @__PURE__ */ I(ft, { children: [
          L && /* @__PURE__ */ t(
            vt,
            {
              isSelected: r,
              hasLeftStickyColumns: w,
              dragHandleProps: f
            }
          ),
          K && /* @__PURE__ */ t(
            S,
            {
              onClick: (s) => s.stopPropagation(),
              className: W(
                "!p-0",
                w && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: w ? {
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
                De,
                {
                  checked: r,
                  onCheckedChange: () => et(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          o && /* @__PURE__ */ t(
            S,
            {
              className: W(
                "p-0",
                w && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: w ? {
                position: "sticky",
                left: Se(),
                zIndex: 10,
                width: `${$}px`,
                minWidth: `${$}px`,
                maxWidth: `${$}px`
              } : {
                width: `${$}px`,
                minWidth: `${$}px`,
                maxWidth: `${$}px`
              },
              onClick: (s) => s.stopPropagation(),
              children: l && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => rt(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(Ke, { size: 24 }) : /* @__PURE__ */ t(Ie, { size: 24 })
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
                    return (s = m == null ? void 0 : m.onRowDelete) == null ? void 0 : s.call(m, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(yt, { size: 20 })
                }
              )
            }
          ),
          _.map((s) => {
            const c = lt(i, s.accessorKey);
            if (c === 0) return null;
            const O = e[s.accessorKey], te = it(e.id, s.accessorKey), p = c !== void 0 && c > 1, g = p && ct(i, c), b = p && ot(i, c), z = $e(s, !1, r, p ? b : void 0), se = (x) => typeof x == "number" ? `${x}px` : x, P = {};
            if (!s.sticky) {
              const x = J ? fe(s) : void 0;
              x !== void 0 ? (P.width = `${x}px`, P.minWidth = `${x}px`) : (s.width && (P.width = se(s.width)), s.minWidth && (P.minWidth = se(s.minWidth)));
            }
            const U = { ...P, ...z.style };
            if (te && s.editable) {
              const x = s.editComponent || xt;
              return /* @__PURE__ */ t(
                S,
                {
                  ref: Te,
                  className: W(q(s.align), "p-1 overflow-hidden", z.className),
                  style: U,
                  onClick: (V) => V.stopPropagation(),
                  rowSpan: p ? c : void 0,
                  children: /* @__PURE__ */ t(
                    x,
                    {
                      value: Fe,
                      onChange: (V) => {
                        ne(V), A.current = V, y != null && y.error && G({ ...y, error: void 0 });
                      },
                      onComplete: () => st(s, e),
                      onCancel: ve,
                      row: e,
                      error: y == null ? void 0 : y.error
                    }
                  )
                },
                String(s.accessorKey)
              );
            }
            const ce = s.cell ? s.cell(O, e) : String(O ?? "");
            if (s.editable && B)
              return /* @__PURE__ */ t(
                S,
                {
                  className: W(
                    q(s.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    p && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    p && b && "bg-blue-50 dark:bg-blue-900",
                    p && !b && g && "bg-slate-100 dark:bg-slate-800",
                    z.className
                  ),
                  style: U,
                  onClick: (x) => {
                    x.stopPropagation(), setTimeout(() => {
                      tt(e.id, s.accessorKey, O);
                    }, 0);
                  },
                  rowSpan: p ? c : void 0,
                  children: /* @__PURE__ */ I("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: ce }),
                    /* @__PURE__ */ t(
                      bt,
                      {
                        size: 20,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(s.accessorKey)
              );
            const ie = p && i + c >= d.length;
            return /* @__PURE__ */ t(
              S,
              {
                className: W(
                  q(s.align),
                  p && "align-middle transition-colors",
                  p && !ie && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  p && b && "bg-blue-50 dark:bg-blue-900",
                  p && !b && g && "bg-slate-100 dark:bg-slate-800",
                  z.className
                ),
                style: U,
                rowSpan: p ? c : void 0,
                children: ce
              },
              String(s.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ I(h.Fragment, { children: [
          L ? /* @__PURE__ */ t(
            kt,
            {
              id: n,
              isSelected: r,
              className: W(u && "cursor-pointer", X == null ? void 0 : X(e)),
              onClick: () => u == null ? void 0 : u(e),
              onMouseEnter: R ? () => ae(i) : void 0,
              onMouseLeave: R ? () => ae(null) : void 0,
              children: (f) => v(f)
            }
          ) : /* @__PURE__ */ t(
            Z,
            {
              "data-state": r ? "selected" : void 0,
              className: W(
                u && "cursor-pointer",
                (Pe == null ? void 0 : Pe.has(i)) && "border-b-0",
                X == null ? void 0 : X(e)
              ),
              onClick: () => u == null ? void 0 : u(e),
              onMouseEnter: R ? () => ae(i) : void 0,
              onMouseLeave: R ? () => ae(null) : void 0,
              children: v()
            }
          ),
          o && a && /* @__PURE__ */ t(Z, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
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
                  children: o.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      Tt && !Xe && /* @__PURE__ */ I(Z, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        L && /* @__PURE__ */ t(
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
        K && /* @__PURE__ */ t(
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
        o && /* @__PURE__ */ t(
          S,
          {
            className: "!p-0",
            style: {
              width: `${$}px`,
              minWidth: `${$}px`,
              maxWidth: `${$}px`
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
                  return (e = m == null ? void 0 : m.onRowAdd) == null ? void 0 : e.call(m);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ t(es, { size: 20 })
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
  return Q || L ? /* @__PURE__ */ t(
    Xt,
    {
      sensors: wt,
      collisionDetection: Ft,
      onDragEnd: zt,
      children: pt
    }
  ) : pt;
}
export {
  bs as DataTable
};
//# sourceMappingURL=data-table.mjs.map
