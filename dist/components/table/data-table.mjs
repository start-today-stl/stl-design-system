import { jsxs as I, jsx as t, Fragment as ct } from "react/jsx-runtime";
import * as o from "react";
import { useSensors as Ct, useSensor as dt, PointerSensor as Pt, KeyboardSensor as jt, DndContext as Ot, closestCenter as Vt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as Bt, arrayMove as ot, SortableContext as Le, horizontalListSortingStrategy as ht, verticalListSortingStrategy as Xt, useSortable as xt } from "@dnd-kit/sortable";
import { CSS as kt } from "@dnd-kit/utilities";
import { cn as W } from "../../lib/utils.mjs";
import { Table as Ft, TableHeader as qt, TableRow as Z, TableHead as F, TableBody as Jt, TableCell as S, TableSortableHead as Qt } from "./table.mjs";
import { Checkbox as We } from "../ui/checkbox.mjs";
import { Input as Ut } from "../ui/input.mjs";
import { Skeleton as $e } from "../ui/skeleton.mjs";
import { SplashScreen as Yt } from "../ui/splash-screen.mjs";
import { DownIcon as pt } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as vt } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as ft } from "../../icons/RightIcon.mjs";
import { RowAddIcon as Zt } from "../../icons/RowAddIcon.mjs";
import { RowDeleteIcon as gt } from "../../icons/RowDeleteIcon.mjs";
import { WriteIcon as ut } from "../../icons/WriteIcon.mjs";
function yt({
  value: D,
  onChange: d,
  onComplete: K,
  onCancel: z,
  error: N
}) {
  const E = o.useRef(null);
  o.useEffect(() => {
    var g, B;
    (g = E.current) == null || g.focus(), (B = E.current) == null || B.select();
  }, []);
  const L = (g) => {
    g.key === "Enter" ? (g.preventDefault(), K()) : g.key === "Escape" && (g.preventDefault(), z());
  };
  return /* @__PURE__ */ I("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ t(
      Ut,
      {
        ref: E,
        value: String(D ?? ""),
        onChange: (g) => d(g.target.value),
        onKeyDown: L,
        error: !!N,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    N && /* @__PURE__ */ t("span", { className: "text-[10px] text-destructive dark:text-red-400", children: N })
  ] });
}
function Gt({
  id: D,
  children: d,
  className: K,
  style: z,
  disabled: N
}) {
  const {
    attributes: E,
    listeners: L,
    setNodeRef: g,
    transform: B,
    transition: f,
    isDragging: re
  } = xt({ id: D, disabled: N }), de = {
    ...z,
    transform: kt.Transform.toString(B),
    transition: f,
    opacity: re ? 0.5 : 1,
    cursor: N ? void 0 : "grab"
  };
  return /* @__PURE__ */ t(
    "th",
    {
      ref: g,
      style: de,
      className: W(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300",
        "bg-[#eaedf1] dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        re && "z-50",
        K
      ),
      ...E,
      ...L,
      children: /* @__PURE__ */ I("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ t(
          vt,
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
function mt({
  id: D,
  children: d,
  className: K,
  isSelected: z,
  onClick: N,
  onMouseEnter: E,
  onMouseLeave: L
}) {
  const {
    setNodeRef: g,
    setActivatorNodeRef: B,
    listeners: f,
    attributes: re,
    transform: de,
    transition: X,
    isDragging: Y
  } = xt({ id: D }), J = {
    transform: kt.Transform.toString(de),
    transition: X,
    opacity: Y ? 0.5 : 1
  };
  return /* @__PURE__ */ t(
    "tr",
    {
      ref: g,
      style: J,
      "data-state": z ? "selected" : void 0,
      className: W(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        Y && "z-50 shadow-lg",
        K
      ),
      onClick: N,
      onMouseEnter: E,
      onMouseLeave: L,
      children: typeof d == "function" ? d({ listeners: f, attributes: re, setActivatorNodeRef: B }) : d
    }
  );
}
function bt({ isSelected: D, hasLeftStickyColumns: d, dragHandleProps: K }) {
  const { listeners: N, attributes: E, setActivatorNodeRef: L } = K ?? {};
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
          ref: L,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (g) => g.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...N,
          ...E,
          children: /* @__PURE__ */ t(vt, { size: 16 })
        }
      )
    }
  );
}
function us({
  columns: D,
  data: d,
  selectable: K = !1,
  selectedIds: z = [],
  onSelectionChange: N,
  sortState: E,
  onSortChange: L,
  onRowClick: g,
  onCellChange: B,
  expandable: f,
  emptyMessage: re = "데이터가 없습니다.",
  className: de,
  rowClassName: X,
  maxHeight: Y,
  resizable: J = !1,
  columnWidths: pe,
  onColumnResize: Ne,
  columnReorderable: Q = !1,
  columnOrder: Se,
  onColumnReorder: De,
  rowReorderable: Ee = !1,
  onRowReorder: fe,
  loading: Ce = !1,
  loadingMode: ge = "splash",
  loadingContent: ue,
  headerGroups: j,
  rowGrouping: T,
  rowActions: y
}) {
  const C = T ? !1 : Ee;
  o.useEffect(() => {
    T && Ee && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [T, Ee]), o.useEffect(() => {
    ue && ge !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [ue, ge]);
  const [m, G] = o.useState(null), [Pe, ne] = o.useState(null), A = o.useRef(null), Ke = o.useRef(null), [Wt, $t] = o.useState(
    (f == null ? void 0 : f.defaultExpandedRowIds) ?? []
  ), [Ie, Nt] = o.useState({}), [ee, je] = o.useState(null), Oe = o.useRef(0), Ve = o.useRef(0), [St, Be] = o.useState(
    () => D.map((e) => e.accessorKey)
  ), [He, ae] = o.useState(null);
  o.useEffect(() => {
    !Q || Se || Be((e) => {
      const i = D.map((n) => n.accessorKey), r = e.filter((n) => i.includes(n)), l = i.filter((n) => !r.includes(n)), a = [...r, ...l];
      return a.length === e.length && a.every((n, v) => n === e[v]) ? e : a;
    });
  }, [D, Q, Se]);
  const le = Se ?? St, Dt = o.useMemo(() => Q ? le.map((e) => D.find((i) => i.accessorKey === e)).filter((e) => e !== void 0) : D, [D, le, Q]), Et = Ct(
    dt(Pt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    dt(jt, {
      coordinateGetter: Bt
    })
  ), Xe = o.useCallback(
    (e) => {
      const { active: i, over: r } = e;
      if (!r || i.id === r.id) return;
      const l = le.findIndex((v) => String(v) === i.id), a = le.findIndex((v) => String(v) === r.id);
      if (l === -1 || a === -1) return;
      const n = ot(le, l, a);
      De ? De(n) : Be(n);
    },
    [le, De]
  ), Fe = o.useCallback(
    (e) => {
      const { active: i, over: r } = e;
      if (!r || i.id === r.id) return;
      const l = String(i.id).replace(/^row-/, ""), a = String(r.id).replace(/^row-/, ""), n = d.findIndex((s) => String(s.id) === l), v = d.findIndex((s) => String(s.id) === a);
      if (n === -1 || v === -1) return;
      const p = ot(d, n, v);
      fe == null || fe(p);
    },
    [d, fe]
  ), Kt = o.useCallback(
    (e) => {
      const { active: i } = e;
      String(i.id).startsWith("row-") ? Fe(e) : Xe(e);
    },
    [Xe, Fe]
  ), we = (f == null ? void 0 : f.expandedRowIds) ?? Wt, qe = (f == null ? void 0 : f.onExpandedChange) ?? $t, ye = d.length > 0 && z.length === d.length, Je = z.length > 0 && !ye, Qe = () => {
    ye ? N == null || N([]) : N == null || N(d.map((e) => e.id));
  }, Ue = (e) => {
    z.includes(e) ? N == null || N(z.filter((i) => i !== e)) : N == null || N([...z, e]);
  }, It = (e) => {
    L && ((E == null ? void 0 : E.column) === e ? E.direction === "asc" ? L({ column: e, direction: "desc" }) : E.direction === "desc" ? L({ column: null, direction: null }) : L({ column: e, direction: "asc" }) : L({ column: e, direction: "asc" }));
  }, Ht = (e) => (E == null ? void 0 : E.column) === e ? E.direction : null, q = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, Ye = (e, i, r) => {
    G({ rowId: e, columnKey: i }), ne(r), A.current = r;
  }, Ze = (e, i) => {
    const r = A.current;
    if (!m || r === null) {
      G(null), ne(null), A.current = null;
      return;
    }
    if (e.validate) {
      const l = e.validate(r, i);
      if (l !== !0) {
        G({ ...m, error: l });
        return;
      }
    }
    B && B(m.rowId, m.columnKey, r), G(null), ne(null), A.current = null;
  }, me = o.useCallback(() => {
    G(null), ne(null), A.current = null;
  }, []);
  o.useEffect(() => {
    if (!m) return;
    const e = (i) => {
      var a, n;
      const r = i.target;
      (a = Ke.current) != null && a.contains(r) || (n = r.closest) != null && n.call(r, "[data-radix-popper-content-wrapper]") || me();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [m, me]);
  const Ge = (e, i) => (m == null ? void 0 : m.rowId) === e && (m == null ? void 0 : m.columnKey) === i, Ae = (e) => f ? f.rowExpandable ? f.rowExpandable(e) : !0 : !1, ze = (e) => we.includes(e), et = (e) => {
    ze(e) ? qe(we.filter((i) => i !== e)) : qe([...we, e]);
  }, oe = (y == null ? void 0 : y.showDelete) ?? !!(y != null && y.onRowDelete), wt = (y == null ? void 0 : y.showAdd) ?? !!(y != null && y.onRowAdd), R = 40, be = D.length + (K ? 1 : 0) + (f ? 1 : 0) + (C ? 1 : 0) + (oe ? 1 : 0), { rowSpanMap: tt, middleRowSet: Te } = o.useMemo(() => {
    if (!T) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(T.groupBy) ? T.groupBy : [T.groupBy], i = T.mergeColumns ?? e, r = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set();
    for (const a of i) {
      let n = 0;
      for (; n < d.length; ) {
        const v = e.map((c) => d[n][c]), p = d[n][a];
        let s = 1;
        for (let c = n + 1; c < d.length; c++) {
          const O = e.map((b) => d[c][b]), te = d[c][a];
          if (v.every((b, w) => b === O[w]) && p === te)
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
  }, [d, T]), st = (e, i) => {
    if (!tt) return;
    const r = tt.get(e);
    return r ? r.get(i) : void 0;
  }, it = (e, i) => He === null ? !1 : He >= e && He < e + i, rt = (e, i) => {
    for (let r = e; r < e + i; r++)
      if (r < d.length && z.includes(d[r].id))
        return !0;
    return !1;
  }, k = 40, $ = 40, _ = 32, xe = o.useMemo(() => {
    const e = (u) => {
      const b = u.width ?? u.minWidth;
      if (typeof b == "number") return b;
      const w = parseInt(String(b), 10);
      return Number.isFinite(w) ? w : 150;
    }, i = D.filter((u) => u.sticky === "left"), r = D.filter((u) => u.sticky === "right"), l = C ? _ : 0, a = K ? k : 0, n = f ? $ : 0, v = l + a + n, p = /* @__PURE__ */ new Map();
    let s = v;
    for (const u of i)
      p.set(u.accessorKey, s), s += e(u);
    const c = /* @__PURE__ */ new Map();
    let O = 0;
    for (let u = r.length - 1; u >= 0; u--) {
      const b = r[u];
      c.set(b.accessorKey, O), O += e(b);
    }
    const te = i.length > 0 ? i[i.length - 1].accessorKey : null, h = r.length > 0 ? r[0].accessorKey : null;
    return (u, b, w, se) => {
      if (!u.sticky) return { style: {}, className: "" };
      const P = u.accessorKey === te, U = u.accessorKey === h, ie = `${e(u)}px`, x = {
        position: "sticky",
        zIndex: b ? 20 : 10,
        width: ie,
        minWidth: ie,
        maxWidth: ie
      }, V = se ?? w;
      if (u.sticky === "left") {
        const Lt = p.get(u.accessorKey) ?? 0;
        return {
          style: {
            ...x,
            left: `${Lt}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: W(
            "transition-colors",
            b ? "bg-[#eaedf1] dark:bg-slate-800" : V ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
            P && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          )
        };
      }
      const Mt = c.get(u.accessorKey) ?? 0;
      return {
        style: {
          ...x,
          right: `${Mt}px`
        },
        className: W(
          "transition-colors",
          b ? "bg-[#eaedf1] dark:bg-slate-800" : V ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
          U && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [D, K, f]), H = D.some((e) => e.sticky === "left"), he = o.useCallback(
    (e) => {
      const i = String(e.accessorKey);
      if (pe && i in pe)
        return pe[i];
      if (i in Ie)
        return Ie[i];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [pe, Ie]
  ), zt = o.useCallback(
    (e, i) => {
      e.preventDefault(), e.stopPropagation(), je(i.accessorKey), Oe.current = e.clientX;
      const r = he(i) ?? 150;
      Ve.current = r;
    },
    [he]
  ), Re = o.useCallback(
    (e) => {
      if (!ee) return;
      const i = e.clientX - Oe.current, r = Math.max(50, Ve.current + i), l = String(ee);
      Ne ? Ne(ee, r) : Nt((a) => ({ ...a, [l]: r }));
    },
    [ee, Ne]
  ), _e = o.useCallback(() => {
    je(null);
  }, []);
  o.useEffect(() => {
    if (ee)
      return document.addEventListener("mousemove", Re), document.addEventListener("mouseup", _e), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", Re), document.removeEventListener("mouseup", _e), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [ee, Re, _e]);
  const ke = (e) => {
    const i = xe(e, !0), r = (p) => typeof p == "number" ? `${p}px` : p, l = {};
    if (!e.sticky) {
      const p = J ? he(e) : void 0;
      p !== void 0 ? (l.width = `${p}px`, l.minWidth = `${p}px`) : (e.width && (l.width = r(e.width)), e.minWidth && (l.minWidth = r(e.minWidth)));
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
        onMouseDown: (p) => zt(p, e),
        onPointerDown: (p) => p.stopPropagation(),
        onClick: (p) => p.stopPropagation()
      }
    );
    return Q && !e.sticky && !e.sortable ? /* @__PURE__ */ I(
      Gt,
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
      Qt,
      {
        sortDirection: Ht(e.accessorKey),
        onSort: () => It(e.accessorKey),
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
  }, M = Q ? Dt : D, nt = M.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Tt = d.map((e) => `row-${e.id}`), Rt = () => 0, Me = () => C ? _ : 0, ve = () => {
    let e = 0;
    return C && (e += _), K && (e += k), e;
  }, _t = o.useCallback(
    (e) => M.filter(
      (i) => e.columns.includes(i.accessorKey)
    ).length,
    [M]
  ), at = o.useMemo(() => j ? new Set(j.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [j]), lt = /* @__PURE__ */ I(Ft, { className: de, maxHeight: Y, children: [
    /* @__PURE__ */ I(qt, { children: [
      j && j.length > 0 && /* @__PURE__ */ I(Z, { children: [
        C && /* @__PURE__ */ t(
          F,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${_}px`,
              minWidth: `${_}px`,
              ...H && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        K && /* @__PURE__ */ t(
          F,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              ...H && { position: "sticky", left: C ? _ : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              We,
              {
                checked: ye,
                indeterminate: Je,
                onCheckedChange: Qe,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        f && /* @__PURE__ */ t(
          F,
          {
            className: "bg-[#eaedf1] dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${$}px`,
              minWidth: `${$}px`,
              ...H && { position: "sticky", left: ve(), zIndex: 20 }
            }
          }
        ),
        oe && /* @__PURE__ */ t(
          F,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${R}px`,
              minWidth: `${R}px`,
              maxWidth: `${R}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        (() => {
          const e = new Set(j.flatMap((l) => l.columns)), i = [];
          let r = 0;
          for (; r < M.length; ) {
            const l = M[r], a = j.find(
              (n) => n.columns.includes(l.accessorKey)
            );
            if (a) {
              const n = M.find(
                (v) => a.columns.includes(v.accessorKey)
              );
              if ((n == null ? void 0 : n.accessorKey) === l.accessorKey) {
                const v = _t(a);
                i.push(
                  /* @__PURE__ */ t(
                    F,
                    {
                      colSpan: v,
                      className: W(
                        "text-center font-medium bg-[#eaedf1] dark:bg-slate-800",
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
              const n = xe(l, !0);
              i.push(
                /* @__PURE__ */ t(
                  F,
                  {
                    rowSpan: 2,
                    className: W(
                      q(l.align),
                      "bg-[#eaedf1] dark:bg-slate-800 border-b-0",
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
        !j && C && /* @__PURE__ */ t(
          F,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
            style: H ? {
              position: "sticky",
              left: Rt(),
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
        !j && K && /* @__PURE__ */ t(
          F,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
            style: H ? {
              position: "sticky",
              left: Me(),
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
              We,
              {
                checked: ye,
                indeterminate: Je,
                onCheckedChange: Qe,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !j && f && /* @__PURE__ */ t(
          F,
          {
            className: "bg-[#eaedf1] dark:bg-slate-800",
            style: H ? {
              position: "sticky",
              left: ve(),
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
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        !j && oe && /* @__PURE__ */ t(
          F,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
            style: {
              width: `${R}px`,
              minWidth: `${R}px`,
              maxWidth: `${R}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        j ? Q ? /* @__PURE__ */ t(Le, { items: nt, strategy: ht, children: M.filter((e) => at.has(e.accessorKey)).map(ke) }) : M.filter((e) => at.has(e.accessorKey)).map(ke) : Q ? /* @__PURE__ */ t(Le, { items: nt, strategy: ht, children: M.map(ke) }) : M.map(ke)
      ] })
    ] }),
    /* @__PURE__ */ I(Jt, { children: [
      Ce ? /* @__PURE__ */ t(Z, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        S,
        {
          colSpan: be,
          className: W(
            "text-center",
            ue || ge !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: ue ?? (ge === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const i = typeof Y == "number" ? Y : typeof Y == "string" && parseInt(Y, 10) || 320, r = Math.max(1, Math.floor(i / 41));
              return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: r }).map((l, a) => /* @__PURE__ */ I(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    C && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t($e, { width: 16, height: 16 }) }),
                    K && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t($e, { width: 18, height: 18 }) }),
                    f && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t($e, { width: 18, height: 18 }) }),
                    M.map((n) => {
                      const v = n.width ?? n.minWidth, p = typeof v == "number" ? Math.min(v * 0.6, 150) : 100;
                      return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t($e, { height: 16, width: p }) }, String(n.accessorKey));
                    })
                  ]
                },
                a
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본)
            /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ t(Yt, { size: "lg" }) })
          ))
        }
      ) }) : d.length === 0 ? /* @__PURE__ */ t(Z, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
        S,
        {
          colSpan: be,
          className: "h-24 text-center text-slate-500",
          children: re
        }
      ) }) : C ? /* @__PURE__ */ t(Le, { items: Tt, strategy: Xt, children: d.map((e, i) => {
        const r = z.includes(e.id), l = Ae(e), a = ze(e.id), n = `row-${e.id}`, v = (p) => /* @__PURE__ */ I(ct, { children: [
          /* @__PURE__ */ t(
            bt,
            {
              isSelected: r,
              hasLeftStickyColumns: H,
              dragHandleProps: p
            }
          ),
          K && /* @__PURE__ */ t(
            S,
            {
              onClick: (s) => s.stopPropagation(),
              className: W(
                "!p-0",
                H && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: H ? {
                position: "sticky",
                left: Me(),
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
                We,
                {
                  checked: r,
                  onCheckedChange: () => Ue(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          f && /* @__PURE__ */ t(
            S,
            {
              className: W(
                "p-0",
                H && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: H ? {
                position: "sticky",
                left: ve(),
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
                  onClick: () => et(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(pt, { size: 24 }) : /* @__PURE__ */ t(ft, { size: 24 })
                }
              )
            }
          ),
          oe && /* @__PURE__ */ t(
            S,
            {
              className: "!p-0",
              style: {
                width: `${R}px`,
                minWidth: `${R}px`,
                maxWidth: `${R}px`
              },
              onClick: (s) => s.stopPropagation(),
              children: /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var s;
                    return (s = y == null ? void 0 : y.onRowDelete) == null ? void 0 : s.call(y, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(gt, { size: 20 })
                }
              )
            }
          ),
          M.map((s) => {
            const c = st(i, s.accessorKey);
            if (c === 0) return null;
            const O = e[s.accessorKey], te = Ge(e.id, s.accessorKey), h = c !== void 0 && c > 1, u = h && it(i, c), b = h && rt(i, c), w = xe(s, !1, r, h ? b : void 0), se = (x) => typeof x == "number" ? `${x}px` : x, P = {};
            if (!s.sticky) {
              const x = J ? he(s) : void 0;
              x !== void 0 ? (P.width = `${x}px`, P.minWidth = `${x}px`) : (s.width && (P.width = se(s.width)), s.minWidth && (P.minWidth = se(s.minWidth)));
            }
            const U = { ...P, ...w.style };
            if (te && s.editable) {
              const x = s.editComponent || yt;
              return /* @__PURE__ */ t(
                S,
                {
                  ref: Ke,
                  className: W(q(s.align), "p-1 overflow-hidden", w.className),
                  style: U,
                  onClick: (V) => V.stopPropagation(),
                  rowSpan: h ? c : void 0,
                  children: /* @__PURE__ */ t(
                    x,
                    {
                      value: Pe,
                      onChange: (V) => {
                        ne(V), A.current = V, m != null && m.error && G({ ...m, error: void 0 });
                      },
                      onComplete: () => Ze(s, e),
                      onCancel: me,
                      row: e,
                      error: m == null ? void 0 : m.error
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
                    h && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    h && b && "bg-blue-50 dark:bg-blue-900",
                    h && !b && u && "bg-slate-100 dark:bg-slate-800",
                    w.className
                  ),
                  style: U,
                  onClick: (x) => {
                    x.stopPropagation(), setTimeout(() => Ye(e.id, s.accessorKey, O), 0);
                  },
                  rowSpan: h ? c : void 0,
                  children: /* @__PURE__ */ I("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: ce }),
                    /* @__PURE__ */ t(
                      ut,
                      {
                        size: 14,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(s.accessorKey)
              );
            const ie = h && i + c >= d.length;
            return /* @__PURE__ */ t(
              S,
              {
                className: W(
                  q(s.align),
                  h && "align-middle transition-colors",
                  h && !ie && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  h && b && "bg-blue-50 dark:bg-blue-900",
                  h && !b && u && "bg-slate-100 dark:bg-slate-800",
                  w.className
                ),
                style: U,
                rowSpan: h ? c : void 0,
                children: ce
              },
              String(s.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ I(o.Fragment, { children: [
          /* @__PURE__ */ t(
            mt,
            {
              id: n,
              isSelected: r,
              className: W(g && "cursor-pointer", X == null ? void 0 : X(e)),
              onClick: () => g == null ? void 0 : g(e),
              onMouseEnter: T ? () => ae(i) : void 0,
              onMouseLeave: T ? () => ae(null) : void 0,
              children: (p) => v(p)
            }
          ),
          f && a && /* @__PURE__ */ t(Z, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            S,
            {
              colSpan: be,
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
                  children: f.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : d.map((e, i) => {
        const r = z.includes(e.id), l = Ae(e), a = ze(e.id), n = `row-${e.id}`, v = (p) => /* @__PURE__ */ I(ct, { children: [
          C && /* @__PURE__ */ t(
            bt,
            {
              isSelected: r,
              hasLeftStickyColumns: H,
              dragHandleProps: p
            }
          ),
          K && /* @__PURE__ */ t(
            S,
            {
              onClick: (s) => s.stopPropagation(),
              className: W(
                "!p-0",
                H && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: H ? {
                position: "sticky",
                left: Me(),
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
                We,
                {
                  checked: r,
                  onCheckedChange: () => Ue(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          f && /* @__PURE__ */ t(
            S,
            {
              className: W(
                "p-0",
                H && (r ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: H ? {
                position: "sticky",
                left: ve(),
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
                  onClick: () => et(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": a ? "행 접기" : "행 펼치기",
                  "aria-expanded": a,
                  children: a ? /* @__PURE__ */ t(pt, { size: 24 }) : /* @__PURE__ */ t(ft, { size: 24 })
                }
              )
            }
          ),
          oe && /* @__PURE__ */ t(
            S,
            {
              className: "!p-0",
              style: {
                width: `${R}px`,
                minWidth: `${R}px`,
                maxWidth: `${R}px`
              },
              onClick: (s) => s.stopPropagation(),
              children: /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var s;
                    return (s = y == null ? void 0 : y.onRowDelete) == null ? void 0 : s.call(y, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ t(gt, { size: 20 })
                }
              )
            }
          ),
          M.map((s) => {
            const c = st(i, s.accessorKey);
            if (c === 0) return null;
            const O = e[s.accessorKey], te = Ge(e.id, s.accessorKey), h = c !== void 0 && c > 1, u = h && it(i, c), b = h && rt(i, c), w = xe(s, !1, r, h ? b : void 0), se = (x) => typeof x == "number" ? `${x}px` : x, P = {};
            if (!s.sticky) {
              const x = J ? he(s) : void 0;
              x !== void 0 ? (P.width = `${x}px`, P.minWidth = `${x}px`) : (s.width && (P.width = se(s.width)), s.minWidth && (P.minWidth = se(s.minWidth)));
            }
            const U = { ...P, ...w.style };
            if (te && s.editable) {
              const x = s.editComponent || yt;
              return /* @__PURE__ */ t(
                S,
                {
                  ref: Ke,
                  className: W(q(s.align), "p-1 overflow-hidden", w.className),
                  style: U,
                  onClick: (V) => V.stopPropagation(),
                  rowSpan: h ? c : void 0,
                  children: /* @__PURE__ */ t(
                    x,
                    {
                      value: Pe,
                      onChange: (V) => {
                        ne(V), A.current = V, m != null && m.error && G({ ...m, error: void 0 });
                      },
                      onComplete: () => Ze(s, e),
                      onCancel: me,
                      row: e,
                      error: m == null ? void 0 : m.error
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
                    h && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    h && b && "bg-blue-50 dark:bg-blue-900",
                    h && !b && u && "bg-slate-100 dark:bg-slate-800",
                    w.className
                  ),
                  style: U,
                  onClick: (x) => {
                    x.stopPropagation(), setTimeout(() => {
                      Ye(e.id, s.accessorKey, O);
                    }, 0);
                  },
                  rowSpan: h ? c : void 0,
                  children: /* @__PURE__ */ I("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ t("span", { className: "flex-1", children: ce }),
                    /* @__PURE__ */ t(
                      ut,
                      {
                        size: 20,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(s.accessorKey)
              );
            const ie = h && i + c >= d.length;
            return /* @__PURE__ */ t(
              S,
              {
                className: W(
                  q(s.align),
                  h && "align-middle transition-colors",
                  h && !ie && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  h && b && "bg-blue-50 dark:bg-blue-900",
                  h && !b && u && "bg-slate-100 dark:bg-slate-800",
                  w.className
                ),
                style: U,
                rowSpan: h ? c : void 0,
                children: ce
              },
              String(s.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ I(o.Fragment, { children: [
          C ? /* @__PURE__ */ t(
            mt,
            {
              id: n,
              isSelected: r,
              className: W(g && "cursor-pointer", X == null ? void 0 : X(e)),
              onClick: () => g == null ? void 0 : g(e),
              onMouseEnter: T ? () => ae(i) : void 0,
              onMouseLeave: T ? () => ae(null) : void 0,
              children: (p) => v(p)
            }
          ) : /* @__PURE__ */ t(
            Z,
            {
              "data-state": r ? "selected" : void 0,
              className: W(
                g && "cursor-pointer",
                (Te == null ? void 0 : Te.has(i)) && "border-b-0",
                X == null ? void 0 : X(e)
              ),
              onClick: () => g == null ? void 0 : g(e),
              onMouseEnter: T ? () => ae(i) : void 0,
              onMouseLeave: T ? () => ae(null) : void 0,
              children: v()
            }
          ),
          f && a && /* @__PURE__ */ t(Z, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
            S,
            {
              colSpan: be,
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
                  children: f.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      wt && !Ce && /* @__PURE__ */ I(Z, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        C && /* @__PURE__ */ t(
          S,
          {
            className: "!p-0",
            style: {
              width: `${_}px`,
              minWidth: `${_}px`,
              maxWidth: `${_}px`
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
        f && /* @__PURE__ */ t(
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
              width: `${R}px`,
              minWidth: `${R}px`,
              maxWidth: `${R}px`
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
                children: /* @__PURE__ */ t(Zt, { size: 20 })
              }
            )
          }
        ),
        M.map((e) => /* @__PURE__ */ t(
          S,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return Q || C ? /* @__PURE__ */ t(
    Ot,
    {
      sensors: Et,
      collisionDetection: Vt,
      onDragEnd: Kt,
      children: lt
    }
  ) : lt;
}
export {
  us as DataTable
};
//# sourceMappingURL=data-table.mjs.map
