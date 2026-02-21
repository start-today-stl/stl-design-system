import { jsxs as H, jsx as s, Fragment as tt } from "react/jsx-runtime";
import * as d from "react";
import { useSensors as Ht, useSensor as st, PointerSensor as zt, KeyboardSensor as Lt, DndContext as Mt, closestCenter as Tt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as At, arrayMove as it, SortableContext as He, horizontalListSortingStrategy as rt, verticalListSortingStrategy as _t, useSortable as ft } from "@dnd-kit/sortable";
import { CSS as ht } from "@dnd-kit/utilities";
import { cn as x } from "../../lib/utils.mjs";
import { Table as Pt, TableHeader as Ct, TableRow as ee, TableHead as q, TableBody as Rt, TableCell as z, TableSortableHead as jt } from "./table.mjs";
import { Checkbox as be } from "../ui/checkbox.mjs";
import { Input as Ot } from "../ui/input.mjs";
import { DownIcon as nt } from "../../icons/DownIcon.mjs";
import { DragHandleIcon as pt } from "../../icons/DragHandleIcon.mjs";
import { RightIcon as at } from "../../icons/RightIcon.mjs";
import { STLArrowIcon as Vt } from "../../icons/STLArrowIcon.mjs";
import { WriteIcon as ot } from "../../icons/WriteIcon.mjs";
function ct({
  value: N,
  onChange: l,
  onComplete: E,
  onCancel: w,
  error: m
}) {
  const $ = d.useRef(null);
  d.useEffect(() => {
    var f, C;
    (f = $.current) == null || f.focus(), (C = $.current) == null || C.select();
  }, []);
  const L = (f) => {
    f.key === "Enter" ? (f.preventDefault(), E()) : f.key === "Escape" && (f.preventDefault(), w());
  };
  return /* @__PURE__ */ H("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ s(
      Ot,
      {
        ref: $,
        value: String(N ?? ""),
        onChange: (f) => l(f.target.value),
        onKeyDown: L,
        error: !!m,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    m && /* @__PURE__ */ s("span", { className: "text-[10px] text-destructive dark:text-red-400", children: m })
  ] });
}
function Bt({
  id: N,
  children: l,
  className: E,
  style: w,
  disabled: m
}) {
  const {
    attributes: $,
    listeners: L,
    setNodeRef: f,
    transform: C,
    transition: u,
    isDragging: te
  } = ft({ id: N, disabled: m }), ae = {
    ...w,
    transform: ht.Transform.toString(C),
    transition: u,
    opacity: te ? 0.5 : 1,
    cursor: m ? void 0 : "grab"
  };
  return /* @__PURE__ */ s(
    "th",
    {
      ref: f,
      style: ae,
      className: x(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300",
        "bg-[#eaedf1] dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        te && "z-50",
        E
      ),
      ...$,
      ...L,
      children: /* @__PURE__ */ H("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ s(
          pt,
          {
            size: 16,
            className: "opacity-30 group-hover/drag:opacity-70 transition-opacity flex-shrink-0"
          }
        ),
        l
      ] })
    }
  );
}
function lt({
  id: N,
  children: l,
  className: E,
  isSelected: w,
  onClick: m,
  onMouseEnter: $,
  onMouseLeave: L
}) {
  const {
    setNodeRef: f,
    setActivatorNodeRef: C,
    listeners: u,
    attributes: te,
    transform: ae,
    transition: R,
    isDragging: ce
  } = ft({ id: N }), B = {
    transform: ht.Transform.toString(ae),
    transition: R,
    opacity: ce ? 0.5 : 1
  };
  return /* @__PURE__ */ s(
    "tr",
    {
      ref: f,
      style: B,
      "data-state": w ? "selected" : void 0,
      className: x(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        ce && "z-50 shadow-lg",
        E
      ),
      onClick: m,
      onMouseEnter: $,
      onMouseLeave: L,
      children: typeof l == "function" ? l({ listeners: u, attributes: te, setActivatorNodeRef: C }) : l
    }
  );
}
function dt({ isSelected: N, hasLeftStickyColumns: l, dragHandleProps: E }) {
  const { listeners: m, attributes: $, setActivatorNodeRef: L } = E ?? {};
  return /* @__PURE__ */ s(
    "td",
    {
      className: x(
        "p-0 align-middle",
        l && (N ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
      ),
      style: l ? {
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
          ref: L,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (f) => f.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...m,
          ...$,
          children: /* @__PURE__ */ s(pt, { size: 16 })
        }
      )
    }
  );
}
function rs({
  columns: N,
  data: l,
  selectable: E = !1,
  selectedIds: w = [],
  onSelectionChange: m,
  sortState: $,
  onSortChange: L,
  onRowClick: f,
  onCellChange: C,
  expandable: u,
  emptyMessage: te = "데이터가 없습니다.",
  className: ae,
  rowClassName: R,
  maxHeight: ce,
  resizable: B = !1,
  columnWidths: le,
  onColumnResize: xe,
  columnReorderable: X = !1,
  columnOrder: me,
  onColumnReorder: ve,
  rowReorderable: ke = !1,
  onRowReorder: de,
  loading: ut = !1,
  loadingContent: gt,
  headerGroups: j,
  rowGrouping: I
}) {
  const O = I ? !1 : ke;
  d.useEffect(() => {
    I && ke && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [I, ke]);
  const [g, J] = d.useState(null), [ze, se] = d.useState(null), Q = d.useRef(null), Se = d.useRef(null), [yt, bt] = d.useState(
    (u == null ? void 0 : u.defaultExpandedRowIds) ?? []
  ), [We, xt] = d.useState({}), [U, Le] = d.useState(null), Me = d.useRef(0), Te = d.useRef(0), [mt, Ae] = d.useState(
    () => N.map((e) => e.accessorKey)
  ), [Ne, ie] = d.useState(null);
  d.useEffect(() => {
    !X || me || Ae((e) => {
      const t = N.map((n) => n.accessorKey), i = e.filter((n) => t.includes(n)), c = t.filter((n) => !i.includes(n)), a = [...i, ...c];
      return a.length === e.length && a.every((n, k) => n === e[k]) ? e : a;
    });
  }, [N, X, me]);
  const re = me ?? mt, vt = d.useMemo(() => X ? re.map((e) => N.find((t) => t.accessorKey === e)).filter((e) => e !== void 0) : N, [N, re, X]), kt = Ht(
    st(zt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    st(Lt, {
      coordinateGetter: At
    })
  ), _e = d.useCallback(
    (e) => {
      const { active: t, over: i } = e;
      if (!i || t.id === i.id) return;
      const c = re.findIndex((k) => String(k) === t.id), a = re.findIndex((k) => String(k) === i.id);
      if (c === -1 || a === -1) return;
      const n = it(re, c, a);
      ve ? ve(n) : Ae(n);
    },
    [re, ve]
  ), Pe = d.useCallback(
    (e) => {
      const { active: t, over: i } = e;
      if (!i || t.id === i.id) return;
      const c = String(t.id).replace(/^row-/, ""), a = String(i.id).replace(/^row-/, ""), n = l.findIndex((r) => String(r.id) === c), k = l.findIndex((r) => String(r.id) === a);
      if (n === -1 || k === -1) return;
      const h = it(l, n, k);
      de == null || de(h);
    },
    [l, de]
  ), St = d.useCallback(
    (e) => {
      const { active: t } = e;
      String(t.id).startsWith("row-") ? Pe(e) : _e(e);
    },
    [_e, Pe]
  ), $e = (u == null ? void 0 : u.expandedRowIds) ?? yt, Ce = (u == null ? void 0 : u.onExpandedChange) ?? bt, fe = l.length > 0 && w.length === l.length, Re = w.length > 0 && !fe, je = () => {
    fe ? m == null || m([]) : m == null || m(l.map((e) => e.id));
  }, Oe = (e) => {
    w.includes(e) ? m == null || m(w.filter((t) => t !== e)) : m == null || m([...w, e]);
  }, Wt = (e) => {
    L && (($ == null ? void 0 : $.column) === e ? $.direction === "asc" ? L({ column: e, direction: "desc" }) : $.direction === "desc" ? L({ column: null, direction: null }) : L({ column: e, direction: "asc" }) : L({ column: e, direction: "asc" }));
  }, Nt = (e) => ($ == null ? void 0 : $.column) === e ? $.direction : null, V = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, Ve = (e, t, i) => {
    J({ rowId: e, columnKey: t }), se(i), Q.current = i;
  }, Be = (e, t) => {
    const i = Q.current;
    if (!g || i === null) {
      J(null), se(null), Q.current = null;
      return;
    }
    if (e.validate) {
      const c = e.validate(i, t);
      if (c !== !0) {
        J({ ...g, error: c });
        return;
      }
    }
    C && C(g.rowId, g.columnKey, i), J(null), se(null), Q.current = null;
  }, he = d.useCallback(() => {
    J(null), se(null), Q.current = null;
  }, []);
  d.useEffect(() => {
    if (!g) return;
    const e = (t) => {
      var a, n;
      const i = t.target;
      (a = Se.current) != null && a.contains(i) || (n = i.closest) != null && n.call(i, "[data-radix-popper-content-wrapper]") || he();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [g, he]);
  const Xe = (e, t) => (g == null ? void 0 : g.rowId) === e && (g == null ? void 0 : g.columnKey) === t, Fe = (e) => u ? u.rowExpandable ? u.rowExpandable(e) : !0 : !1, Ee = (e) => $e.includes(e), qe = (e) => {
    Ee(e) ? Ce($e.filter((t) => t !== e)) : Ce([...$e, e]);
  }, pe = N.length + (E ? 1 : 0) + (u ? 1 : 0) + (O ? 1 : 0), { rowSpanMap: Je, middleRowSet: De } = d.useMemo(() => {
    if (!I) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(I.groupBy) ? I.groupBy : [I.groupBy], t = I.mergeColumns ?? e, i = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set();
    for (const a of t) {
      let n = 0;
      for (; n < l.length; ) {
        const k = e.map((o) => l[n][o]), h = l[n][a];
        let r = 1;
        for (let o = n + 1; o < l.length; o++) {
          const _ = e.map((S) => l[o][S]), Y = l[o][a];
          if (k.every((S, K) => S === _[K]) && h === Y)
            r++;
          else
            break;
        }
        i.has(n) || i.set(n, /* @__PURE__ */ new Map()), i.get(n).set(a, r);
        for (let o = n; o < n + r - 1; o++)
          c.add(o);
        for (let o = n + 1; o < n + r; o++)
          i.has(o) || i.set(o, /* @__PURE__ */ new Map()), i.get(o).set(a, 0);
        n += r;
      }
    }
    return { rowSpanMap: i, middleRowSet: c };
  }, [l, I]), Qe = (e, t) => {
    if (!Je) return;
    const i = Je.get(e);
    return i ? i.get(t) : void 0;
  }, Ue = (e, t) => Ne === null ? !1 : Ne >= e && Ne < e + t, Ye = (e, t) => {
    for (let i = e; i < e + t; i++)
      if (i < l.length && w.includes(l[i].id))
        return !0;
    return !1;
  }, v = 40, W = 40, T = 32, ue = d.useMemo(() => {
    const e = (y) => {
      const S = y.width ?? y.minWidth;
      if (typeof S == "number") return S;
      const K = parseInt(String(S), 10);
      return Number.isFinite(K) ? K : 150;
    }, t = N.filter((y) => y.sticky === "left"), i = N.filter((y) => y.sticky === "right"), c = O ? T : 0, a = E ? v : 0, n = u ? W : 0, k = c + a + n, h = /* @__PURE__ */ new Map();
    let r = k;
    for (const y of t)
      h.set(y.accessorKey, r), r += e(y);
    const o = /* @__PURE__ */ new Map();
    let _ = 0;
    for (let y = i.length - 1; y >= 0; y--) {
      const S = i[y];
      o.set(S.accessorKey, _), _ += e(S);
    }
    const Y = t.length > 0 ? t[t.length - 1].accessorKey : null, p = i.length > 0 ? i[0].accessorKey : null;
    return (y, S, K, Z) => {
      if (!y.sticky) return { style: {}, className: "" };
      const M = y.accessorKey === Y, F = y.accessorKey === p, G = `${e(y)}px`, b = {
        position: "sticky",
        zIndex: S ? 20 : 10,
        width: G,
        minWidth: G,
        maxWidth: G
      }, P = Z ?? K;
      if (y.sticky === "left") {
        const It = h.get(y.accessorKey) ?? 0;
        return {
          style: {
            ...b,
            left: `${It}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: x(
            "transition-colors",
            S ? "bg-[#eaedf1] dark:bg-slate-800" : P ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
            M && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          )
        };
      }
      const wt = o.get(y.accessorKey) ?? 0;
      return {
        style: {
          ...b,
          right: `${wt}px`
        },
        className: x(
          "transition-colors",
          S ? "bg-[#eaedf1] dark:bg-slate-800" : P ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800",
          F && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [N, E, u]), D = N.some((e) => e.sticky === "left"), oe = d.useCallback(
    (e) => {
      const t = String(e.accessorKey);
      if (le && t in le)
        return le[t];
      if (t in We)
        return We[t];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [le, We]
  ), $t = d.useCallback(
    (e, t) => {
      e.preventDefault(), e.stopPropagation(), Le(t.accessorKey), Me.current = e.clientX;
      const i = oe(t) ?? 150;
      Te.current = i;
    },
    [oe]
  ), Ke = d.useCallback(
    (e) => {
      if (!U) return;
      const t = e.clientX - Me.current, i = Math.max(50, Te.current + t), c = String(U);
      xe ? xe(U, i) : xt((a) => ({ ...a, [c]: i }));
    },
    [U, xe]
  ), we = d.useCallback(() => {
    Le(null);
  }, []);
  d.useEffect(() => {
    if (U)
      return document.addEventListener("mousemove", Ke), document.addEventListener("mouseup", we), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", Ke), document.removeEventListener("mouseup", we), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [U, Ke, we]);
  const ge = (e) => {
    const t = ue(e, !0), i = (h) => typeof h == "number" ? `${h}px` : h, c = {};
    if (!e.sticky) {
      const h = B ? oe(e) : void 0;
      h !== void 0 ? (c.width = `${h}px`, c.minWidth = `${h}px`) : (e.width && (c.width = i(e.width)), e.minWidth && (c.minWidth = i(e.minWidth)));
    }
    const a = { ...c, ...t.style }, n = B && /* @__PURE__ */ s(
      "div",
      {
        className: x(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          U === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (h) => $t(h, e),
        onPointerDown: (h) => h.stopPropagation(),
        onClick: (h) => h.stopPropagation()
      }
    );
    return X && !e.sticky && !e.sortable ? /* @__PURE__ */ H(
      Bt,
      {
        id: String(e.accessorKey),
        style: a,
        className: x(V(e.align), t.className, B && "relative overflow-visible"),
        children: [
          e.header,
          n
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ H(
      jt,
      {
        sortDirection: Nt(e.accessorKey),
        onSort: () => Wt(e.accessorKey),
        style: a,
        className: x(V(e.align), t.className, B && "relative overflow-visible"),
        children: [
          e.header,
          n
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ H(
      q,
      {
        style: a,
        className: x(V(e.align), t.className, B && "relative overflow-visible"),
        children: [
          e.header,
          n
        ]
      },
      String(e.accessorKey)
    );
  }, A = X ? vt : N, Ze = A.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Et = l.map((e) => `row-${e.id}`), Dt = () => 0, Ie = () => O ? T : 0, ye = () => {
    let e = 0;
    return O && (e += T), E && (e += v), e;
  }, Kt = d.useCallback(
    (e) => A.filter(
      (t) => e.columns.includes(t.accessorKey)
    ).length,
    [A]
  ), Ge = d.useMemo(() => j ? new Set(j.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [j]), et = /* @__PURE__ */ H(Pt, { className: ae, maxHeight: ce, children: [
    /* @__PURE__ */ H(Ct, { children: [
      j && j.length > 0 && /* @__PURE__ */ H(ee, { children: [
        O && /* @__PURE__ */ s(
          q,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${T}px`,
              minWidth: `${T}px`,
              ...D && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        E && /* @__PURE__ */ s(
          q,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${v}px`,
              minWidth: `${v}px`,
              ...D && { position: "sticky", left: O ? T : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ s(
              be,
              {
                checked: fe,
                indeterminate: Re,
                onCheckedChange: je,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        u && /* @__PURE__ */ s(
          q,
          {
            className: "bg-[#eaedf1] dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${W}px`,
              minWidth: `${W}px`,
              ...D && { position: "sticky", left: ye(), zIndex: 20 }
            }
          }
        ),
        (() => {
          const e = new Set(j.flatMap((c) => c.columns)), t = [];
          let i = 0;
          for (; i < A.length; ) {
            const c = A[i], a = j.find(
              (n) => n.columns.includes(c.accessorKey)
            );
            if (a) {
              const n = A.find(
                (k) => a.columns.includes(k.accessorKey)
              );
              if ((n == null ? void 0 : n.accessorKey) === c.accessorKey) {
                const k = Kt(a);
                t.push(
                  /* @__PURE__ */ s(
                    q,
                    {
                      colSpan: k,
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
            } else if (!e.has(c.accessorKey)) {
              const n = ue(c, !0);
              t.push(
                /* @__PURE__ */ s(
                  q,
                  {
                    rowSpan: 2,
                    className: x(
                      V(c.align),
                      "bg-[#eaedf1] dark:bg-slate-800 border-b-0",
                      n.className
                    ),
                    style: n.style,
                    children: c.header
                  },
                  `standalone-${String(c.accessorKey)}`
                )
              );
            }
            i++;
          }
          return t;
        })()
      ] }),
      /* @__PURE__ */ H(ee, { children: [
        !j && O && /* @__PURE__ */ s(
          q,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
            style: D ? {
              position: "sticky",
              left: Dt(),
              zIndex: 20,
              width: `${T}px`,
              minWidth: `${T}px`,
              maxWidth: `${T}px`
            } : {
              width: `${T}px`,
              minWidth: `${T}px`,
              maxWidth: `${T}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ s("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !j && E && /* @__PURE__ */ s(
          q,
          {
            className: "!p-0 bg-[#eaedf1] dark:bg-slate-800",
            style: D ? {
              position: "sticky",
              left: Ie(),
              zIndex: 20,
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            } : {
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            },
            children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ s(
              be,
              {
                checked: fe,
                indeterminate: Re,
                onCheckedChange: je,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !j && u && /* @__PURE__ */ s(
          q,
          {
            className: "bg-[#eaedf1] dark:bg-slate-800",
            style: D ? {
              position: "sticky",
              left: ye(),
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
            children: /* @__PURE__ */ s("span", { className: "sr-only", children: "확장" })
          }
        ),
        j ? X ? /* @__PURE__ */ s(He, { items: Ze, strategy: rt, children: A.filter((e) => Ge.has(e.accessorKey)).map(ge) }) : A.filter((e) => Ge.has(e.accessorKey)).map(ge) : X ? /* @__PURE__ */ s(He, { items: Ze, strategy: rt, children: A.map(ge) }) : A.map(ge)
      ] })
    ] }),
    /* @__PURE__ */ s(Rt, { children: ut ? /* @__PURE__ */ s(ee, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ s(
      z,
      {
        colSpan: pe,
        className: "h-80 text-center",
        children: gt ?? /* @__PURE__ */ s("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ s(Vt, { size: 200, className: "text-slate-200 dark:text-slate-700" }) })
      }
    ) }) : l.length === 0 ? /* @__PURE__ */ s(ee, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ s(
      z,
      {
        colSpan: pe,
        className: "h-24 text-center text-slate-500",
        children: te
      }
    ) }) : O ? /* @__PURE__ */ s(He, { items: Et, strategy: _t, children: l.map((e, t) => {
      const i = w.includes(e.id), c = Fe(e), a = Ee(e.id), n = `row-${e.id}`, k = (h) => /* @__PURE__ */ H(tt, { children: [
        /* @__PURE__ */ s(
          dt,
          {
            isSelected: i,
            hasLeftStickyColumns: D,
            dragHandleProps: h
          }
        ),
        E && /* @__PURE__ */ s(
          z,
          {
            onClick: (r) => r.stopPropagation(),
            className: x(
              "!p-0",
              D && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
            ),
            style: D ? {
              position: "sticky",
              left: Ie(),
              zIndex: 10,
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            } : {
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            },
            children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ s(
              be,
              {
                checked: i,
                onCheckedChange: () => Oe(e.id),
                "aria-label": `행 ${e.id} 선택`
              }
            ) })
          }
        ),
        u && /* @__PURE__ */ s(
          z,
          {
            className: x(
              "p-0",
              D && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
            ),
            style: D ? {
              position: "sticky",
              left: ye(),
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
            children: c && /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                onClick: () => qe(e.id),
                className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                "aria-label": a ? "행 접기" : "행 펼치기",
                "aria-expanded": a,
                children: a ? /* @__PURE__ */ s(nt, { size: 24 }) : /* @__PURE__ */ s(at, { size: 24 })
              }
            )
          }
        ),
        A.map((r) => {
          const o = Qe(t, r.accessorKey);
          if (o === 0) return null;
          const _ = e[r.accessorKey], Y = Xe(e.id, r.accessorKey), p = o !== void 0 && o > 1, y = p && Ue(t, o), S = p && Ye(t, o), K = ue(r, !1, i, p ? S : void 0), Z = (b) => typeof b == "number" ? `${b}px` : b, M = {};
          if (!r.sticky) {
            const b = B ? oe(r) : void 0;
            b !== void 0 ? (M.width = `${b}px`, M.minWidth = `${b}px`) : (r.width && (M.width = Z(r.width)), r.minWidth && (M.minWidth = Z(r.minWidth)));
          }
          const F = { ...M, ...K.style };
          if (Y && r.editable) {
            const b = r.editComponent || ct;
            return /* @__PURE__ */ s(
              z,
              {
                ref: Se,
                className: x(V(r.align), "p-1 overflow-hidden", K.className),
                style: F,
                onClick: (P) => P.stopPropagation(),
                rowSpan: p ? o : void 0,
                children: /* @__PURE__ */ s(
                  b,
                  {
                    value: ze,
                    onChange: (P) => {
                      se(P), Q.current = P, g != null && g.error && J({ ...g, error: void 0 });
                    },
                    onComplete: () => Be(r, e),
                    onCancel: he,
                    row: e,
                    error: g == null ? void 0 : g.error
                  }
                )
              },
              String(r.accessorKey)
            );
          }
          const ne = r.cell ? r.cell(_, e) : String(_ ?? "");
          if (r.editable && C)
            return /* @__PURE__ */ s(
              z,
              {
                className: x(
                  V(r.align),
                  "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                  p && "align-middle",
                  K.className
                ),
                style: F,
                onClick: (b) => {
                  b.stopPropagation(), setTimeout(() => Ve(e.id, r.accessorKey, _), 0);
                },
                rowSpan: p ? o : void 0,
                children: /* @__PURE__ */ H("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ s("span", { className: "flex-1", children: ne }),
                  /* @__PURE__ */ s(
                    ot,
                    {
                      size: 14,
                      className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                    }
                  )
                ] })
              },
              String(r.accessorKey)
            );
          const G = p && t + o >= l.length;
          return /* @__PURE__ */ s(
            z,
            {
              className: x(
                V(r.align),
                p && "align-middle transition-colors",
                p && !G && "border-b border-slate-200 dark:border-slate-700",
                // 그룹 셀 hover/selected 스타일
                p && S && "bg-blue-50 dark:bg-blue-900",
                p && !S && y && "bg-slate-100 dark:bg-slate-800",
                K.className
              ),
              style: F,
              rowSpan: p ? o : void 0,
              children: ne
            },
            String(r.accessorKey)
          );
        })
      ] });
      return /* @__PURE__ */ H(d.Fragment, { children: [
        /* @__PURE__ */ s(
          lt,
          {
            id: n,
            isSelected: i,
            className: x(f && "cursor-pointer", R == null ? void 0 : R(e)),
            onClick: () => f == null ? void 0 : f(e),
            onMouseEnter: I ? () => ie(t) : void 0,
            onMouseLeave: I ? () => ie(null) : void 0,
            children: (h) => k(h)
          }
        ),
        u && a && /* @__PURE__ */ s(ee, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ s(
          z,
          {
            colSpan: pe,
            className: "p-0",
            style: { position: "relative" },
            children: /* @__PURE__ */ s(
              "div",
              {
                className: "p-4 overflow-x-auto",
                style: {
                  position: "sticky",
                  left: 0,
                  width: "100%",
                  maxWidth: "100vw"
                },
                children: u.expandedRowRender(e)
              }
            )
          }
        ) })
      ] }, e.id);
    }) }) : l.map((e, t) => {
      const i = w.includes(e.id), c = Fe(e), a = Ee(e.id), n = `row-${e.id}`, k = (h) => /* @__PURE__ */ H(tt, { children: [
        O && /* @__PURE__ */ s(
          dt,
          {
            isSelected: i,
            hasLeftStickyColumns: D,
            dragHandleProps: h
          }
        ),
        E && /* @__PURE__ */ s(
          z,
          {
            onClick: (r) => r.stopPropagation(),
            className: x(
              "!p-0",
              D && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
            ),
            style: D ? {
              position: "sticky",
              left: Ie(),
              zIndex: 10,
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            } : {
              width: `${v}px`,
              minWidth: `${v}px`,
              maxWidth: `${v}px`
            },
            children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ s(
              be,
              {
                checked: i,
                onCheckedChange: () => Oe(e.id),
                "aria-label": `행 ${e.id} 선택`
              }
            ) })
          }
        ),
        u && /* @__PURE__ */ s(
          z,
          {
            className: x(
              "p-0",
              D && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
            ),
            style: D ? {
              position: "sticky",
              left: ye(),
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
            children: c && /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                onClick: () => qe(e.id),
                className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                "aria-label": a ? "행 접기" : "행 펼치기",
                "aria-expanded": a,
                children: a ? /* @__PURE__ */ s(nt, { size: 24 }) : /* @__PURE__ */ s(at, { size: 24 })
              }
            )
          }
        ),
        A.map((r) => {
          const o = Qe(t, r.accessorKey);
          if (o === 0) return null;
          const _ = e[r.accessorKey], Y = Xe(e.id, r.accessorKey), p = o !== void 0 && o > 1, y = p && Ue(t, o), S = p && Ye(t, o), K = ue(r, !1, i, p ? S : void 0), Z = (b) => typeof b == "number" ? `${b}px` : b, M = {};
          if (!r.sticky) {
            const b = B ? oe(r) : void 0;
            b !== void 0 ? (M.width = `${b}px`, M.minWidth = `${b}px`) : (r.width && (M.width = Z(r.width)), r.minWidth && (M.minWidth = Z(r.minWidth)));
          }
          const F = { ...M, ...K.style };
          if (Y && r.editable) {
            const b = r.editComponent || ct;
            return /* @__PURE__ */ s(
              z,
              {
                ref: Se,
                className: x(V(r.align), "p-1 overflow-hidden", K.className),
                style: F,
                onClick: (P) => P.stopPropagation(),
                rowSpan: p ? o : void 0,
                children: /* @__PURE__ */ s(
                  b,
                  {
                    value: ze,
                    onChange: (P) => {
                      se(P), Q.current = P, g != null && g.error && J({ ...g, error: void 0 });
                    },
                    onComplete: () => Be(r, e),
                    onCancel: he,
                    row: e,
                    error: g == null ? void 0 : g.error
                  }
                )
              },
              String(r.accessorKey)
            );
          }
          const ne = r.cell ? r.cell(_, e) : String(_ ?? "");
          if (r.editable && C)
            return /* @__PURE__ */ s(
              z,
              {
                className: x(
                  V(r.align),
                  "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                  p && "align-middle",
                  K.className
                ),
                style: F,
                onClick: (b) => {
                  b.stopPropagation(), setTimeout(() => {
                    Ve(e.id, r.accessorKey, _);
                  }, 0);
                },
                rowSpan: p ? o : void 0,
                children: /* @__PURE__ */ H("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ s("span", { className: "flex-1", children: ne }),
                  /* @__PURE__ */ s(
                    ot,
                    {
                      size: 20,
                      className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                    }
                  )
                ] })
              },
              String(r.accessorKey)
            );
          const G = p && t + o >= l.length;
          return /* @__PURE__ */ s(
            z,
            {
              className: x(
                V(r.align),
                p && "align-middle transition-colors",
                p && !G && "border-b border-slate-200 dark:border-slate-700",
                // 그룹 셀 hover/selected 스타일
                p && S && "bg-blue-50 dark:bg-blue-900",
                p && !S && y && "bg-slate-100 dark:bg-slate-800",
                K.className
              ),
              style: F,
              rowSpan: p ? o : void 0,
              children: ne
            },
            String(r.accessorKey)
          );
        })
      ] });
      return /* @__PURE__ */ H(d.Fragment, { children: [
        O ? /* @__PURE__ */ s(
          lt,
          {
            id: n,
            isSelected: i,
            className: x(f && "cursor-pointer", R == null ? void 0 : R(e)),
            onClick: () => f == null ? void 0 : f(e),
            onMouseEnter: I ? () => ie(t) : void 0,
            onMouseLeave: I ? () => ie(null) : void 0,
            children: (h) => k(h)
          }
        ) : /* @__PURE__ */ s(
          ee,
          {
            "data-state": i ? "selected" : void 0,
            className: x(
              f && "cursor-pointer",
              (De == null ? void 0 : De.has(t)) && "border-b-0",
              R == null ? void 0 : R(e)
            ),
            onClick: () => f == null ? void 0 : f(e),
            onMouseEnter: I ? () => ie(t) : void 0,
            onMouseLeave: I ? () => ie(null) : void 0,
            children: k()
          }
        ),
        u && a && /* @__PURE__ */ s(ee, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ s(
          z,
          {
            colSpan: pe,
            className: "p-0",
            style: { position: "relative" },
            children: /* @__PURE__ */ s(
              "div",
              {
                className: "p-4 overflow-x-auto",
                style: {
                  position: "sticky",
                  left: 0,
                  width: "100%",
                  maxWidth: "100vw"
                },
                children: u.expandedRowRender(e)
              }
            )
          }
        ) })
      ] }, e.id);
    }) })
  ] });
  return X || O ? /* @__PURE__ */ s(
    Mt,
    {
      sensors: kt,
      collisionDetection: Tt,
      onDragEnd: St,
      children: et
    }
  ) : et;
}
export {
  rs as DataTable
};
//# sourceMappingURL=data-table.mjs.map
