import { jsxs as K, jsx as t, Fragment as rt } from "react/jsx-runtime";
import * as d from "react";
import { useSensors as Tt, useSensor as nt, PointerSensor as Mt, KeyboardSensor as Lt, DndContext as _t, closestCenter as At } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as Pt, arrayMove as at, SortableContext as Me, horizontalListSortingStrategy as ot, verticalListSortingStrategy as Ct, useSortable as ut } from "@dnd-kit/sortable";
import { CSS as gt } from "@dnd-kit/utilities";
import { cn as x } from "../../lib/utils.mjs";
import { Table as Rt, TableHeader as jt, TableRow as te, TableHead as q, TableBody as Ot, TableCell as z, TableSortableHead as Vt } from "./table.mjs";
import { Checkbox as xe } from "../ui/checkbox.mjs";
import { Input as Bt } from "../ui/input.mjs";
import { Skeleton as ve } from "../ui/skeleton.mjs";
import { SplashScreen as Xt } from "../ui/splash-screen.mjs";
import { DownIcon as lt } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as yt } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as ct } from "../../icons/RightIcon.mjs";
import { WriteIcon as dt } from "../../icons/WriteIcon.mjs";
function ht({
  value: N,
  onChange: c,
  onComplete: E,
  onCancel: I,
  error: v
}) {
  const $ = d.useRef(null);
  d.useEffect(() => {
    var p, R;
    (p = $.current) == null || p.focus(), (R = $.current) == null || R.select();
  }, []);
  const T = (p) => {
    p.key === "Enter" ? (p.preventDefault(), E()) : p.key === "Escape" && (p.preventDefault(), I());
  };
  return /* @__PURE__ */ K("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ t(
      Bt,
      {
        ref: $,
        value: String(N ?? ""),
        onChange: (p) => c(p.target.value),
        onKeyDown: T,
        error: !!v,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    v && /* @__PURE__ */ t("span", { className: "text-[10px] text-destructive dark:text-red-400", children: v })
  ] });
}
function Ft({
  id: N,
  children: c,
  className: E,
  style: I,
  disabled: v
}) {
  const {
    attributes: $,
    listeners: T,
    setNodeRef: p,
    transform: R,
    transition: f,
    isDragging: se
  } = ut({ id: N, disabled: v }), oe = {
    ...I,
    transform: gt.Transform.toString(R),
    transition: f,
    opacity: se ? 0.5 : 1,
    cursor: v ? void 0 : "grab"
  };
  return /* @__PURE__ */ t(
    "th",
    {
      ref: p,
      style: oe,
      className: x(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300",
        "bg-[#eaedf1] dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        se && "z-50",
        E
      ),
      ...$,
      ...T,
      children: /* @__PURE__ */ K("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ t(
          yt,
          {
            size: 16,
            className: "opacity-30 group-hover/drag:opacity-70 transition-opacity flex-shrink-0"
          }
        ),
        c
      ] })
    }
  );
}
function pt({
  id: N,
  children: c,
  className: E,
  isSelected: I,
  onClick: v,
  onMouseEnter: $,
  onMouseLeave: T
}) {
  const {
    setNodeRef: p,
    setActivatorNodeRef: R,
    listeners: f,
    attributes: se,
    transform: oe,
    transition: j,
    isDragging: J
  } = ut({ id: N }), B = {
    transform: gt.Transform.toString(oe),
    transition: j,
    opacity: J ? 0.5 : 1
  };
  return /* @__PURE__ */ t(
    "tr",
    {
      ref: p,
      style: B,
      "data-state": I ? "selected" : void 0,
      className: x(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        J && "z-50 shadow-lg",
        E
      ),
      onClick: v,
      onMouseEnter: $,
      onMouseLeave: T,
      children: typeof c == "function" ? c({ listeners: f, attributes: se, setActivatorNodeRef: R }) : c
    }
  );
}
function ft({ isSelected: N, hasLeftStickyColumns: c, dragHandleProps: E }) {
  const { listeners: v, attributes: $, setActivatorNodeRef: T } = E ?? {};
  return /* @__PURE__ */ t(
    "td",
    {
      className: x(
        "p-0 align-middle",
        c && (N ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
      ),
      style: c ? {
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
          ref: T,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (p) => p.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...v,
          ...$,
          children: /* @__PURE__ */ t(yt, { size: 16 })
        }
      )
    }
  );
}
function os({
  columns: N,
  data: c,
  selectable: E = !1,
  selectedIds: I = [],
  onSelectionChange: v,
  sortState: $,
  onSortChange: T,
  onRowClick: p,
  onCellChange: R,
  expandable: f,
  emptyMessage: se = "데이터가 없습니다.",
  className: oe,
  rowClassName: j,
  maxHeight: J,
  resizable: B = !1,
  columnWidths: ce,
  onColumnResize: ke,
  columnReorderable: X = !1,
  columnOrder: Se,
  onColumnReorder: We,
  rowReorderable: Ne = !1,
  onRowReorder: de,
  loading: bt = !1,
  loadingMode: he = "splash",
  loadingContent: pe,
  headerGroups: O,
  rowGrouping: H
}) {
  const _ = H ? !1 : Ne;
  d.useEffect(() => {
    H && Ne && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [H, Ne]), d.useEffect(() => {
    pe && he !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [pe, he]);
  const [g, Q] = d.useState(null), [Le, ie] = d.useState(null), U = d.useRef(null), $e = d.useRef(null), [mt, xt] = d.useState(
    (f == null ? void 0 : f.defaultExpandedRowIds) ?? []
  ), [Ee, vt] = d.useState({}), [Y, _e] = d.useState(null), Ae = d.useRef(0), Pe = d.useRef(0), [kt, Ce] = d.useState(
    () => N.map((e) => e.accessorKey)
  ), [De, re] = d.useState(null);
  d.useEffect(() => {
    !X || Se || Ce((e) => {
      const s = N.map((n) => n.accessorKey), i = e.filter((n) => s.includes(n)), o = s.filter((n) => !i.includes(n)), a = [...i, ...o];
      return a.length === e.length && a.every((n, m) => n === e[m]) ? e : a;
    });
  }, [N, X, Se]);
  const ne = Se ?? kt, St = d.useMemo(() => X ? ne.map((e) => N.find((s) => s.accessorKey === e)).filter((e) => e !== void 0) : N, [N, ne, X]), Wt = Tt(
    nt(Mt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    nt(Lt, {
      coordinateGetter: Pt
    })
  ), Re = d.useCallback(
    (e) => {
      const { active: s, over: i } = e;
      if (!i || s.id === i.id) return;
      const o = ne.findIndex((m) => String(m) === s.id), a = ne.findIndex((m) => String(m) === i.id);
      if (o === -1 || a === -1) return;
      const n = at(ne, o, a);
      We ? We(n) : Ce(n);
    },
    [ne, We]
  ), je = d.useCallback(
    (e) => {
      const { active: s, over: i } = e;
      if (!i || s.id === i.id) return;
      const o = String(s.id).replace(/^row-/, ""), a = String(i.id).replace(/^row-/, ""), n = c.findIndex((r) => String(r.id) === o), m = c.findIndex((r) => String(r.id) === a);
      if (n === -1 || m === -1) return;
      const h = at(c, n, m);
      de == null || de(h);
    },
    [c, de]
  ), Nt = d.useCallback(
    (e) => {
      const { active: s } = e;
      String(s.id).startsWith("row-") ? je(e) : Re(e);
    },
    [Re, je]
  ), we = (f == null ? void 0 : f.expandedRowIds) ?? mt, Oe = (f == null ? void 0 : f.onExpandedChange) ?? xt, fe = c.length > 0 && I.length === c.length, Ve = I.length > 0 && !fe, Be = () => {
    fe ? v == null || v([]) : v == null || v(c.map((e) => e.id));
  }, Xe = (e) => {
    I.includes(e) ? v == null || v(I.filter((s) => s !== e)) : v == null || v([...I, e]);
  }, $t = (e) => {
    T && (($ == null ? void 0 : $.column) === e ? $.direction === "asc" ? T({ column: e, direction: "desc" }) : $.direction === "desc" ? T({ column: null, direction: null }) : T({ column: e, direction: "asc" }) : T({ column: e, direction: "asc" }));
  }, Et = (e) => ($ == null ? void 0 : $.column) === e ? $.direction : null, V = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, Fe = (e, s, i) => {
    Q({ rowId: e, columnKey: s }), ie(i), U.current = i;
  }, qe = (e, s) => {
    const i = U.current;
    if (!g || i === null) {
      Q(null), ie(null), U.current = null;
      return;
    }
    if (e.validate) {
      const o = e.validate(i, s);
      if (o !== !0) {
        Q({ ...g, error: o });
        return;
      }
    }
    R && R(g.rowId, g.columnKey, i), Q(null), ie(null), U.current = null;
  }, ue = d.useCallback(() => {
    Q(null), ie(null), U.current = null;
  }, []);
  d.useEffect(() => {
    if (!g) return;
    const e = (s) => {
      var a, n;
      const i = s.target;
      (a = $e.current) != null && a.contains(i) || (n = i.closest) != null && n.call(i, "[data-radix-popper-content-wrapper]") || ue();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [g, ue]);
  const Je = (e, s) => (g == null ? void 0 : g.rowId) === e && (g == null ? void 0 : g.columnKey) === s, Qe = (e) => f ? f.rowExpandable ? f.rowExpandable(e) : !0 : !1, Ke = (e) => we.includes(e), Ue = (e) => {
    Ke(e) ? Oe(we.filter((s) => s !== e)) : Oe([...we, e]);
  }, ge = N.length + (E ? 1 : 0) + (f ? 1 : 0) + (_ ? 1 : 0), { rowSpanMap: Ye, middleRowSet: Ie } = d.useMemo(() => {
    if (!H) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(H.groupBy) ? H.groupBy : [H.groupBy], s = H.mergeColumns ?? e, i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set();
    for (const a of s) {
      let n = 0;
      for (; n < c.length; ) {
        const m = e.map((l) => c[n][l]), h = c[n][a];
        let r = 1;
        for (let l = n + 1; l < c.length; l++) {
          const P = e.map((S) => c[l][S]), Z = c[l][a];
          if (m.every((S, w) => S === P[w]) && h === Z)
            r++;
          else
            break;
        }
        i.has(n) || i.set(n, /* @__PURE__ */ new Map()), i.get(n).set(a, r);
        for (let l = n; l < n + r - 1; l++)
          o.add(l);
        for (let l = n + 1; l < n + r; l++)
          i.has(l) || i.set(l, /* @__PURE__ */ new Map()), i.get(l).set(a, 0);
        n += r;
      }
    }
    return { rowSpanMap: i, middleRowSet: o };
  }, [c, H]), Ze = (e, s) => {
    if (!Ye) return;
    const i = Ye.get(e);
    return i ? i.get(s) : void 0;
  }, Ge = (e, s) => De === null ? !1 : De >= e && De < e + s, et = (e, s) => {
    for (let i = e; i < e + s; i++)
      if (i < c.length && I.includes(c[i].id))
        return !0;
    return !1;
  }, k = 40, W = 40, A = 32, ye = d.useMemo(() => {
    const e = (y) => {
      const S = y.width ?? y.minWidth;
      if (typeof S == "number") return S;
      const w = parseInt(String(S), 10);
      return Number.isFinite(w) ? w : 150;
    }, s = N.filter((y) => y.sticky === "left"), i = N.filter((y) => y.sticky === "right"), o = _ ? A : 0, a = E ? k : 0, n = f ? W : 0, m = o + a + n, h = /* @__PURE__ */ new Map();
    let r = m;
    for (const y of s)
      h.set(y.accessorKey, r), r += e(y);
    const l = /* @__PURE__ */ new Map();
    let P = 0;
    for (let y = i.length - 1; y >= 0; y--) {
      const S = i[y];
      l.set(S.accessorKey, P), P += e(S);
    }
    const Z = s.length > 0 ? s[s.length - 1].accessorKey : null, u = i.length > 0 ? i[0].accessorKey : null;
    return (y, S, w, G) => {
      if (!y.sticky) return { style: {}, className: "" };
      const L = y.accessorKey === Z, F = y.accessorKey === u, ee = `${e(y)}px`, b = {
        position: "sticky",
        zIndex: S ? 20 : 10,
        width: ee,
        minWidth: ee,
        maxWidth: ee
      }, C = G ?? w;
      if (y.sticky === "left") {
        const zt = h.get(y.accessorKey) ?? 0;
        return {
          style: {
            ...b,
            left: `${zt}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: x(
            "transition-colors",
            S ? "bg-[#eaedf1] dark:bg-slate-800" : C ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
            L && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          )
        };
      }
      const Ht = l.get(y.accessorKey) ?? 0;
      return {
        style: {
          ...b,
          right: `${Ht}px`
        },
        className: x(
          "transition-colors",
          S ? "bg-[#eaedf1] dark:bg-slate-800" : C ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
          F && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [N, E, f]), D = N.some((e) => e.sticky === "left"), le = d.useCallback(
    (e) => {
      const s = String(e.accessorKey);
      if (ce && s in ce)
        return ce[s];
      if (s in Ee)
        return Ee[s];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [ce, Ee]
  ), Dt = d.useCallback(
    (e, s) => {
      e.preventDefault(), e.stopPropagation(), _e(s.accessorKey), Ae.current = e.clientX;
      const i = le(s) ?? 150;
      Pe.current = i;
    },
    [le]
  ), He = d.useCallback(
    (e) => {
      if (!Y) return;
      const s = e.clientX - Ae.current, i = Math.max(50, Pe.current + s), o = String(Y);
      ke ? ke(Y, i) : vt((a) => ({ ...a, [o]: i }));
    },
    [Y, ke]
  ), ze = d.useCallback(() => {
    _e(null);
  }, []);
  d.useEffect(() => {
    if (Y)
      return document.addEventListener("mousemove", He), document.addEventListener("mouseup", ze), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", He), document.removeEventListener("mouseup", ze), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [Y, He, ze]);
  const be = (e) => {
    const s = ye(e, !0), i = (h) => typeof h == "number" ? `${h}px` : h, o = {};
    if (!e.sticky) {
      const h = B ? le(e) : void 0;
      h !== void 0 ? (o.width = `${h}px`, o.minWidth = `${h}px`) : (e.width && (o.width = i(e.width)), e.minWidth && (o.minWidth = i(e.minWidth)));
    }
    const a = { ...o, ...s.style }, n = B && /* @__PURE__ */ t(
      "div",
      {
        className: x(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          Y === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (h) => Dt(h, e),
        onPointerDown: (h) => h.stopPropagation(),
        onClick: (h) => h.stopPropagation()
      }
    );
    return X && !e.sticky && !e.sortable ? /* @__PURE__ */ K(
      Ft,
      {
        id: String(e.accessorKey),
        style: a,
        className: x(V(e.align), s.className, B && "relative overflow-visible"),
        children: [
          e.header,
          n
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ K(
      Vt,
      {
        sortDirection: Et(e.accessorKey),
        onSort: () => $t(e.accessorKey),
        style: a,
        className: x(V(e.align), s.className, B && "relative overflow-visible"),
        children: [
          e.header,
          n
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ K(
      q,
      {
        style: a,
        className: x(V(e.align), s.className, B && "relative overflow-visible"),
        children: [
          e.header,
          n
        ]
      },
      String(e.accessorKey)
    );
  }, M = X ? St : N, tt = M.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), wt = c.map((e) => `row-${e.id}`), Kt = () => 0, Te = () => _ ? A : 0, me = () => {
    let e = 0;
    return _ && (e += A), E && (e += k), e;
  }, It = d.useCallback(
    (e) => M.filter(
      (s) => e.columns.includes(s.accessorKey)
    ).length,
    [M]
  ), st = d.useMemo(() => O ? new Set(O.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [O]), it = /* @__PURE__ */ K(Rt, { className: oe, maxHeight: J, children: [
    /* @__PURE__ */ K(jt, { children: [
      O && O.length > 0 && /* @__PURE__ */ K(te, { children: [
        _ && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${A}px`,
              minWidth: `${A}px`,
              ...D && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        E && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              ...D && { position: "sticky", left: _ ? A : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
              xe,
              {
                checked: fe,
                indeterminate: Ve,
                onCheckedChange: Be,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        f && /* @__PURE__ */ t(
          q,
          {
            className: "bg-[#eaedf1] dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${W}px`,
              minWidth: `${W}px`,
              ...D && { position: "sticky", left: me(), zIndex: 20 }
            }
          }
        ),
        (() => {
          const e = new Set(O.flatMap((o) => o.columns)), s = [];
          let i = 0;
          for (; i < M.length; ) {
            const o = M[i], a = O.find(
              (n) => n.columns.includes(o.accessorKey)
            );
            if (a) {
              const n = M.find(
                (m) => a.columns.includes(m.accessorKey)
              );
              if ((n == null ? void 0 : n.accessorKey) === o.accessorKey) {
                const m = It(a);
                s.push(
                  /* @__PURE__ */ t(
                    q,
                    {
                      colSpan: m,
                      className: x(
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
            } else if (!e.has(o.accessorKey)) {
              const n = ye(o, !0);
              s.push(
                /* @__PURE__ */ t(
                  q,
                  {
                    rowSpan: 2,
                    className: x(
                      V(o.align),
                      "bg-[#eaedf1] dark:bg-slate-800 border-b-0",
                      n.className
                    ),
                    style: n.style,
                    children: o.header
                  },
                  `standalone-${String(o.accessorKey)}`
                )
              );
            }
            i++;
          }
          return s;
        })()
      ] }),
      /* @__PURE__ */ K(te, { children: [
        !O && _ && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
            style: D ? {
              position: "sticky",
              left: Kt(),
              zIndex: 20,
              width: `${A}px`,
              minWidth: `${A}px`,
              maxWidth: `${A}px`
            } : {
              width: `${A}px`,
              minWidth: `${A}px`,
              maxWidth: `${A}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !O && E && /* @__PURE__ */ t(
          q,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
            style: D ? {
              position: "sticky",
              left: Te(),
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
              xe,
              {
                checked: fe,
                indeterminate: Ve,
                onCheckedChange: Be,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !O && f && /* @__PURE__ */ t(
          q,
          {
            className: "bg-[#eaedf1] dark:bg-slate-800",
            style: D ? {
              position: "sticky",
              left: me(),
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
            children: /* @__PURE__ */ t("span", { className: "sr-only", children: "확장" })
          }
        ),
        O ? X ? /* @__PURE__ */ t(Me, { items: tt, strategy: ot, children: M.filter((e) => st.has(e.accessorKey)).map(be) }) : M.filter((e) => st.has(e.accessorKey)).map(be) : X ? /* @__PURE__ */ t(Me, { items: tt, strategy: ot, children: M.map(be) }) : M.map(be)
      ] })
    ] }),
    /* @__PURE__ */ t(Ot, { children: bt ? /* @__PURE__ */ t(te, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
      z,
      {
        colSpan: ge,
        className: x(
          "text-center",
          pe || he !== "skeleton" ? "h-80" : "p-0 align-top"
        ),
        children: pe ?? (he === "skeleton" ? (
          // 스켈레톤 모드: 컬럼 기반 자동 생성
          (() => {
            const s = typeof J == "number" ? J : typeof J == "string" && parseInt(J, 10) || 320, i = Math.max(1, Math.floor(s / 41));
            return /* @__PURE__ */ t("table", { className: "w-full", children: /* @__PURE__ */ t("tbody", { children: Array.from({ length: i }).map((o, a) => /* @__PURE__ */ K(
              "tr",
              {
                className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                children: [
                  _ && /* @__PURE__ */ t("td", { className: "w-8 p-2", children: /* @__PURE__ */ t(ve, { width: 16, height: 16 }) }),
                  E && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ve, { width: 18, height: 18 }) }),
                  f && /* @__PURE__ */ t("td", { className: "w-10 p-2", children: /* @__PURE__ */ t(ve, { width: 18, height: 18 }) }),
                  M.map((n) => {
                    const m = n.width ?? n.minWidth, h = typeof m == "number" ? Math.min(m * 0.6, 150) : 100;
                    return /* @__PURE__ */ t("td", { className: "p-2", children: /* @__PURE__ */ t(ve, { height: 16, width: h }) }, String(n.accessorKey));
                  })
                ]
              },
              a
            )) }) });
          })()
        ) : (
          // 스플래시 모드 (기본)
          /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ t(Xt, { size: "lg" }) })
        ))
      }
    ) }) : c.length === 0 ? /* @__PURE__ */ t(te, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ t(
      z,
      {
        colSpan: ge,
        className: "h-24 text-center text-slate-500",
        children: se
      }
    ) }) : _ ? /* @__PURE__ */ t(Me, { items: wt, strategy: Ct, children: c.map((e, s) => {
      const i = I.includes(e.id), o = Qe(e), a = Ke(e.id), n = `row-${e.id}`, m = (h) => /* @__PURE__ */ K(rt, { children: [
        /* @__PURE__ */ t(
          ft,
          {
            isSelected: i,
            hasLeftStickyColumns: D,
            dragHandleProps: h
          }
        ),
        E && /* @__PURE__ */ t(
          z,
          {
            onClick: (r) => r.stopPropagation(),
            className: x(
              "!p-0",
              D && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
            ),
            style: D ? {
              position: "sticky",
              left: Te(),
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
              xe,
              {
                checked: i,
                onCheckedChange: () => Xe(e.id),
                "aria-label": `행 ${e.id} 선택`
              }
            ) })
          }
        ),
        f && /* @__PURE__ */ t(
          z,
          {
            className: x(
              "p-0",
              D && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
            ),
            style: D ? {
              position: "sticky",
              left: me(),
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
            children: o && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => Ue(e.id),
                className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                "aria-label": a ? "행 접기" : "행 펼치기",
                "aria-expanded": a,
                children: a ? /* @__PURE__ */ t(lt, { size: 24 }) : /* @__PURE__ */ t(ct, { size: 24 })
              }
            )
          }
        ),
        M.map((r) => {
          const l = Ze(s, r.accessorKey);
          if (l === 0) return null;
          const P = e[r.accessorKey], Z = Je(e.id, r.accessorKey), u = l !== void 0 && l > 1, y = u && Ge(s, l), S = u && et(s, l), w = ye(r, !1, i, u ? S : void 0), G = (b) => typeof b == "number" ? `${b}px` : b, L = {};
          if (!r.sticky) {
            const b = B ? le(r) : void 0;
            b !== void 0 ? (L.width = `${b}px`, L.minWidth = `${b}px`) : (r.width && (L.width = G(r.width)), r.minWidth && (L.minWidth = G(r.minWidth)));
          }
          const F = { ...L, ...w.style };
          if (Z && r.editable) {
            const b = r.editComponent || ht;
            return /* @__PURE__ */ t(
              z,
              {
                ref: $e,
                className: x(V(r.align), "p-1 overflow-hidden", w.className),
                style: F,
                onClick: (C) => C.stopPropagation(),
                rowSpan: u ? l : void 0,
                children: /* @__PURE__ */ t(
                  b,
                  {
                    value: Le,
                    onChange: (C) => {
                      ie(C), U.current = C, g != null && g.error && Q({ ...g, error: void 0 });
                    },
                    onComplete: () => qe(r, e),
                    onCancel: ue,
                    row: e,
                    error: g == null ? void 0 : g.error
                  }
                )
              },
              String(r.accessorKey)
            );
          }
          const ae = r.cell ? r.cell(P, e) : String(P ?? "");
          if (r.editable && R)
            return /* @__PURE__ */ t(
              z,
              {
                className: x(
                  V(r.align),
                  "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                  u && "align-middle",
                  w.className
                ),
                style: F,
                onClick: (b) => {
                  b.stopPropagation(), setTimeout(() => Fe(e.id, r.accessorKey, P), 0);
                },
                rowSpan: u ? l : void 0,
                children: /* @__PURE__ */ K("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ t("span", { className: "flex-1", children: ae }),
                  /* @__PURE__ */ t(
                    dt,
                    {
                      size: 14,
                      className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                    }
                  )
                ] })
              },
              String(r.accessorKey)
            );
          const ee = u && s + l >= c.length;
          return /* @__PURE__ */ t(
            z,
            {
              className: x(
                V(r.align),
                u && "align-middle transition-colors",
                u && !ee && "border-b border-slate-200 dark:border-slate-700",
                // 그룹 셀 hover/selected 스타일
                u && S && "bg-blue-50 dark:bg-blue-900",
                u && !S && y && "bg-slate-100 dark:bg-slate-800",
                w.className
              ),
              style: F,
              rowSpan: u ? l : void 0,
              children: ae
            },
            String(r.accessorKey)
          );
        })
      ] });
      return /* @__PURE__ */ K(d.Fragment, { children: [
        /* @__PURE__ */ t(
          pt,
          {
            id: n,
            isSelected: i,
            className: x(p && "cursor-pointer", j == null ? void 0 : j(e)),
            onClick: () => p == null ? void 0 : p(e),
            onMouseEnter: H ? () => re(s) : void 0,
            onMouseLeave: H ? () => re(null) : void 0,
            children: (h) => m(h)
          }
        ),
        f && a && /* @__PURE__ */ t(te, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
          z,
          {
            colSpan: ge,
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
    }) }) : c.map((e, s) => {
      const i = I.includes(e.id), o = Qe(e), a = Ke(e.id), n = `row-${e.id}`, m = (h) => /* @__PURE__ */ K(rt, { children: [
        _ && /* @__PURE__ */ t(
          ft,
          {
            isSelected: i,
            hasLeftStickyColumns: D,
            dragHandleProps: h
          }
        ),
        E && /* @__PURE__ */ t(
          z,
          {
            onClick: (r) => r.stopPropagation(),
            className: x(
              "!p-0",
              D && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
            ),
            style: D ? {
              position: "sticky",
              left: Te(),
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
              xe,
              {
                checked: i,
                onCheckedChange: () => Xe(e.id),
                "aria-label": `행 ${e.id} 선택`
              }
            ) })
          }
        ),
        f && /* @__PURE__ */ t(
          z,
          {
            className: x(
              "p-0",
              D && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
            ),
            style: D ? {
              position: "sticky",
              left: me(),
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
            children: o && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => Ue(e.id),
                className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                "aria-label": a ? "행 접기" : "행 펼치기",
                "aria-expanded": a,
                children: a ? /* @__PURE__ */ t(lt, { size: 24 }) : /* @__PURE__ */ t(ct, { size: 24 })
              }
            )
          }
        ),
        M.map((r) => {
          const l = Ze(s, r.accessorKey);
          if (l === 0) return null;
          const P = e[r.accessorKey], Z = Je(e.id, r.accessorKey), u = l !== void 0 && l > 1, y = u && Ge(s, l), S = u && et(s, l), w = ye(r, !1, i, u ? S : void 0), G = (b) => typeof b == "number" ? `${b}px` : b, L = {};
          if (!r.sticky) {
            const b = B ? le(r) : void 0;
            b !== void 0 ? (L.width = `${b}px`, L.minWidth = `${b}px`) : (r.width && (L.width = G(r.width)), r.minWidth && (L.minWidth = G(r.minWidth)));
          }
          const F = { ...L, ...w.style };
          if (Z && r.editable) {
            const b = r.editComponent || ht;
            return /* @__PURE__ */ t(
              z,
              {
                ref: $e,
                className: x(V(r.align), "p-1 overflow-hidden", w.className),
                style: F,
                onClick: (C) => C.stopPropagation(),
                rowSpan: u ? l : void 0,
                children: /* @__PURE__ */ t(
                  b,
                  {
                    value: Le,
                    onChange: (C) => {
                      ie(C), U.current = C, g != null && g.error && Q({ ...g, error: void 0 });
                    },
                    onComplete: () => qe(r, e),
                    onCancel: ue,
                    row: e,
                    error: g == null ? void 0 : g.error
                  }
                )
              },
              String(r.accessorKey)
            );
          }
          const ae = r.cell ? r.cell(P, e) : String(P ?? "");
          if (r.editable && R)
            return /* @__PURE__ */ t(
              z,
              {
                className: x(
                  V(r.align),
                  "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                  u && "align-middle",
                  w.className
                ),
                style: F,
                onClick: (b) => {
                  b.stopPropagation(), setTimeout(() => {
                    Fe(e.id, r.accessorKey, P);
                  }, 0);
                },
                rowSpan: u ? l : void 0,
                children: /* @__PURE__ */ K("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ t("span", { className: "flex-1", children: ae }),
                  /* @__PURE__ */ t(
                    dt,
                    {
                      size: 20,
                      className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                    }
                  )
                ] })
              },
              String(r.accessorKey)
            );
          const ee = u && s + l >= c.length;
          return /* @__PURE__ */ t(
            z,
            {
              className: x(
                V(r.align),
                u && "align-middle transition-colors",
                u && !ee && "border-b border-slate-200 dark:border-slate-700",
                // 그룹 셀 hover/selected 스타일
                u && S && "bg-blue-50 dark:bg-blue-900",
                u && !S && y && "bg-slate-100 dark:bg-slate-800",
                w.className
              ),
              style: F,
              rowSpan: u ? l : void 0,
              children: ae
            },
            String(r.accessorKey)
          );
        })
      ] });
      return /* @__PURE__ */ K(d.Fragment, { children: [
        _ ? /* @__PURE__ */ t(
          pt,
          {
            id: n,
            isSelected: i,
            className: x(p && "cursor-pointer", j == null ? void 0 : j(e)),
            onClick: () => p == null ? void 0 : p(e),
            onMouseEnter: H ? () => re(s) : void 0,
            onMouseLeave: H ? () => re(null) : void 0,
            children: (h) => m(h)
          }
        ) : /* @__PURE__ */ t(
          te,
          {
            "data-state": i ? "selected" : void 0,
            className: x(
              p && "cursor-pointer",
              (Ie == null ? void 0 : Ie.has(s)) && "border-b-0",
              j == null ? void 0 : j(e)
            ),
            onClick: () => p == null ? void 0 : p(e),
            onMouseEnter: H ? () => re(s) : void 0,
            onMouseLeave: H ? () => re(null) : void 0,
            children: m()
          }
        ),
        f && a && /* @__PURE__ */ t(te, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ t(
          z,
          {
            colSpan: ge,
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
    }) })
  ] });
  return X || _ ? /* @__PURE__ */ t(
    _t,
    {
      sensors: Wt,
      collisionDetection: At,
      onDragEnd: Nt,
      children: it
    }
  ) : it;
}
export {
  os as DataTable
};
//# sourceMappingURL=data-table.mjs.map
