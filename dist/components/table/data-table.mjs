import { jsxs as E, jsx as r } from "react/jsx-runtime";
import * as n from "react";
import { useSensors as _t, useSensor as xt, PointerSensor as Ft, KeyboardSensor as Xt, DndContext as qt, closestCenter as Jt } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as Qt, arrayMove as bt, SortableContext as Oe, horizontalListSortingStrategy as St, verticalListSortingStrategy as Ut } from "@dnd-kit/sortable";
import { cn as R } from "../../lib/utils.mjs";
import { Table as Yt, TableHeader as Zt, TableRow as A, TableHead as K, TableSortableHead as wt, TableBody as At, TableCell as P } from "./table.mjs";
import { Checkbox as vt } from "../ui/checkbox.mjs";
import { Skeleton as Se } from "../ui/skeleton.mjs";
import { SplashScreen as Gt } from "../ui/splash-screen.mjs";
import { DownIcon as Nt } from "../../icons/DownIcon.mjs";
import { RightIcon as Wt } from "../../icons/RightIcon.mjs";
import { RowAddIcon as es } from "../../icons/RowAddIcon.mjs";
import { SortableHeaderCell as ts } from "./data-table/sortable-header-cell.mjs";
import { DataTableBodyRow as $t } from "./data-table/data-table-body-row.mjs";
import { DRAG_HANDLE_WIDTH as w, CHECKBOX_WIDTH as $, EXPAND_WIDTH as C, ROW_ACTIONS_WIDTH as O } from "./data-table/types.mjs";
function gs({
  columns: b,
  data: f,
  selectable: I = !1,
  selectedIds: M = [],
  onSelectionChange: v,
  sortState: we,
  onSortChange: ve,
  multiSort: je = !1,
  onRowClick: Be,
  onCellChange: j,
  expandable: o,
  emptyMessage: Et = "데이터가 없습니다.",
  className: Kt,
  rowClassName: Ve,
  maxHeight: re,
  resizable: L = !1,
  columnWidths: oe,
  onColumnResize: Ne,
  columnReorderable: H = !1,
  columnOrder: We,
  onColumnReorder: $e,
  rowReorderable: Ee = !1,
  onRowReorder: de,
  loading: _e = !1,
  loadingMode: ue = "splash",
  loadingContent: ne,
  headerGroups: p,
  rowGrouping: D,
  rowActions: g
}) {
  const N = D ? !1 : Ee, G = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  n.useEffect(() => {
    G && D && Ee && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [D, Ee, G]), n.useEffect(() => {
    G && ne && ue !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [ne, ue, G]);
  const [S, B] = n.useState(null), [Fe, F] = n.useState(null), T = n.useRef(null), Ke = n.useRef(null), Xe = n.useRef(null), [z, Ct] = n.useState(0);
  n.useEffect(() => {
    const e = Xe.current;
    if (!e) return;
    const t = () => Ct(e.clientWidth);
    t();
    const s = new ResizeObserver(t);
    return s.observe(e), () => s.disconnect();
  }, []);
  const [It, Dt] = n.useState(
    (o == null ? void 0 : o.defaultExpandedRowIds) ?? []
  ), [Ce, Rt] = n.useState({}), [X, qe] = n.useState(null), Je = n.useRef(0), Qe = n.useRef(0), [Mt, Ue] = n.useState(
    () => b.map((e) => e.accessorKey)
  ), [fe, Ye] = n.useState(null);
  n.useEffect(() => {
    !H || We || Ue((e) => {
      const t = b.map((c) => c.accessorKey), s = e.filter((c) => t.includes(c)), i = t.filter((c) => !s.includes(c)), a = [...s, ...i];
      return a.length === e.length && a.every((c, h) => c === e[h]) ? e : a;
    });
  }, [b, H, We]);
  const ee = We ?? Mt, zt = n.useMemo(() => H ? ee.map((e) => b.find((t) => t.accessorKey === e)).filter((e) => e !== void 0) : b, [b, ee, H]), he = n.useMemo(() => {
    if (!p || p.length === 0) return [];
    const e = new Map(
      b.map((t) => [t.accessorKey, t])
    );
    return p.flatMap((t, s) => {
      const i = t.columns.map((u) => e.get(u)).filter((u) => u !== void 0);
      if (i.length === 0) return [];
      const a = new Set(
        i.map((u) => u.sticky).filter((u) => u !== void 0)
      ), c = a.size > 0, h = i.some((u) => !u.sticky), m = a.size > 1;
      return c && (h || m) ? [
        {
          headerLabel: typeof t.header == "string" || typeof t.header == "number" ? String(t.header) : `#${s + 1}`,
          reason: m ? "left/right sticky 혼합" : "sticky/non-sticky 혼합"
        }
      ] : [];
    });
  }, [p, b]), pe = n.useMemo(
    () => he.map((e) => `${e.headerLabel}:${e.reason}`).join("|"),
    [he]
  ), Ie = n.useRef("");
  n.useEffect(() => {
    if (!G) return;
    if (!pe) {
      Ie.current = "";
      return;
    }
    if (Ie.current === pe) return;
    Ie.current = pe;
    const e = he.map((t) => `${t.headerLabel}(${t.reason})`).join(", ");
    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. 그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + e
    );
  }, [pe, he, G]);
  const Lt = _t(
    xt(Ft, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    xt(Xt, {
      coordinateGetter: Qt
    })
  ), Ze = n.useCallback(
    (e) => {
      const { active: t, over: s } = e;
      if (!s || t.id === s.id) return;
      const i = ee.findIndex((h) => String(h) === t.id), a = ee.findIndex((h) => String(h) === s.id);
      if (i === -1 || a === -1) return;
      const c = bt(ee, i, a);
      $e ? $e(c) : Ue(c);
    },
    [ee, $e]
  ), Ae = n.useCallback(
    (e) => {
      const { active: t, over: s } = e;
      if (!s || t.id === s.id) return;
      const i = String(t.id).replace(/^row-/, ""), a = String(s.id).replace(/^row-/, ""), c = f.findIndex((y) => String(y.id) === i), h = f.findIndex((y) => String(y.id) === a);
      if (c === -1 || h === -1) return;
      const m = bt(f, c, h);
      de == null || de(m);
    },
    [f, de]
  ), Ht = n.useCallback(
    (e) => {
      const { active: t } = e;
      String(t.id).startsWith("row-") ? Ae(e) : Ze(e);
    },
    [Ze, Ae]
  ), q = (o == null ? void 0 : o.expandedRowIds) ?? It, ie = (o == null ? void 0 : o.onExpandedChange) ?? Dt, ye = f.length > 0 && M.length === f.length, Ge = M.length > 0 && !ye, et = () => {
    ye ? v == null || v([]) : v == null || v(f.map((e) => e.id));
  }, tt = n.useCallback((e) => {
    M.includes(e) ? v == null || v(M.filter((t) => t !== e)) : v == null || v([...M, e]);
  }, [M, v]), J = n.useMemo(() => we ? we.filter((e) => e.column && e.direction) : [], [we]), st = (e) => {
    if (!ve) return;
    const t = J.find((s) => s.column === e);
    if (je) {
      let s;
      t ? t.direction === "asc" ? s = J.map(
        (i) => i.column === e ? { column: e, direction: "desc" } : i
      ) : s = J.filter((i) => i.column !== e) : s = [...J, { column: e, direction: "asc" }], ve(s);
    } else {
      let s;
      t ? t.direction === "asc" ? s = [{ column: e, direction: "desc" }] : t.direction === "desc" ? s = [] : s = [{ column: e, direction: "asc" }] : s = [{ column: e, direction: "asc" }], ve(s);
    }
  }, rt = (e) => {
    const t = J.find((s) => s.column === e);
    return (t == null ? void 0 : t.direction) ?? null;
  }, nt = (e) => {
    if (!je || J.length <= 1) return;
    const t = J.findIndex((s) => s.column === e);
    return t === -1 ? void 0 : t + 1;
  }, Q = n.useCallback((e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, []), it = n.useCallback((e, t, s) => {
    B({ rowId: e, columnKey: t }), F(s), T.current = s;
  }, []), De = n.useCallback((e, t) => {
    const s = T.current;
    if (!S || s === null) {
      B(null), F(null), T.current = null;
      return;
    }
    if (e.validate) {
      const i = e.validate(s, t);
      if (i !== !0) {
        B({ ...S, error: i });
        return;
      }
    }
    j && j(S.rowId, S.columnKey, s), B(null), F(null), T.current = null;
  }, [S, j]), lt = n.useCallback(() => {
    if (!S) return;
    const e = b.find((s) => s.accessorKey === S.columnKey), t = f.find((s) => s.id === S.rowId);
    if (e && t)
      De(e, t);
    else {
      const s = T.current;
      s !== null && j && j(S.rowId, S.columnKey, s), B(null), F(null), T.current = null;
    }
  }, [S, b, f, j]), ct = n.useCallback(() => {
    B(null), F(null), T.current = null;
  }, []);
  n.useEffect(() => {
    if (!S) return;
    const e = (t) => {
      var a, c;
      const s = t.target;
      (a = Ke.current) != null && a.contains(s) || (c = s.closest) != null && c.call(s, "[data-radix-popper-content-wrapper]") || lt();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [S, lt]);
  const Re = n.useCallback((e) => o ? o.rowExpandable ? o.rowExpandable(e) : !0 : !1, [o]), at = n.useCallback((e) => q.includes(e), [q]), ot = n.useCallback((e) => {
    q.includes(e) ? ie(q.filter((t) => t !== e)) : ie([...q, e]);
  }, [q, ie]), le = n.useMemo(() => o ? f.filter((e) => Re(e)).map((e) => e.id) : [], [f, o]), ce = le.length > 0 && le.every((e) => q.includes(e)), dt = () => {
    ie(ce ? [] : le);
  }, ae = (g == null ? void 0 : g.showDelete) ?? !!(g != null && g.onRowDelete), Tt = (g == null ? void 0 : g.showAdd) ?? !!(g != null && g.onRowAdd), ge = b.length + (I ? 1 : 0) + (o ? 1 : 0) + (N ? 1 : 0) + (ae ? 1 : 0), { rowSpanMap: Me, middleRowSet: ut } = n.useMemo(() => {
    if (!D) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(D.groupBy) ? D.groupBy : [D.groupBy], t = D.mergeColumns ?? e, s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
    for (const a of t) {
      let c = 0;
      for (; c < f.length; ) {
        const h = e.map((l) => f[c][l]), m = f[c][a];
        let y = 1;
        for (let l = c + 1; l < f.length; l++) {
          const u = e.map((Y) => f[l][Y]), d = f[l][a];
          if (h.every((Y, W) => Y === u[W]) && m === d)
            y++;
          else
            break;
        }
        s.has(c) || s.set(c, /* @__PURE__ */ new Map()), s.get(c).set(a, y);
        for (let l = c; l < c + y - 1; l++)
          i.add(l);
        for (let l = c + 1; l < c + y; l++)
          s.has(l) || s.set(l, /* @__PURE__ */ new Map()), s.get(l).set(a, 0);
        c += y;
      }
    }
    return { rowSpanMap: s, middleRowSet: i };
  }, [f, D]), ft = n.useCallback((e, t) => {
    if (!Me) return;
    const s = Me.get(e);
    if (s)
      return s.get(t);
  }, [Me]), ht = n.useCallback((e, t) => fe === null ? !1 : fe >= e && fe < e + t, [fe]), pt = n.useCallback((e, t) => {
    for (let s = e; s < e + t; s++)
      if (s < f.length && M.includes(f[s].id))
        return !0;
    return !1;
  }, [f, M]), te = n.useMemo(() => {
    const e = (d) => {
      const k = d.width ?? d.minWidth;
      if (typeof k == "number") return k;
      const _ = parseInt(String(k), 10);
      return Number.isFinite(_) ? _ : 150;
    }, t = b.filter((d) => d.sticky === "left"), s = b.filter((d) => d.sticky === "right"), i = N ? w : 0, a = I ? $ : 0, c = o ? C : 0, h = i + a + c, m = /* @__PURE__ */ new Map();
    let y = h;
    for (const d of t)
      m.set(d.accessorKey, y), y += e(d);
    const l = /* @__PURE__ */ new Map();
    let u = 0;
    for (let d = s.length - 1; d >= 0; d--) {
      const k = s[d];
      l.set(k.accessorKey, u), u += e(k);
    }
    return (d, k, _, Y) => {
      if (!d.sticky) return { style: {}, className: "" };
      const Z = `${e(d)}px`, be = {
        position: "sticky",
        zIndex: k ? 20 : 10,
        width: Z,
        minWidth: Z,
        maxWidth: Z
      }, se = Y ?? _;
      if (d.sticky === "left") {
        const Pe = m.get(d.accessorKey) ?? 0;
        return {
          style: {
            ...be,
            left: `${Pe}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: R(
            "transition-colors",
            k ? "bg-slate-100 dark:bg-slate-800" : se ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
          )
        };
      }
      const Te = l.get(d.accessorKey) ?? 0;
      return {
        style: {
          ...be,
          right: `${Te}px`
        },
        className: R(
          "transition-colors",
          k ? "bg-slate-100 dark:bg-slate-800" : se ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
        )
      };
    };
  }, [b, I, o]), V = b.some((e) => e.sticky === "left"), U = n.useCallback(
    (e) => {
      const t = String(e.accessorKey);
      if (oe && t in oe)
        return oe[t];
      if (t in Ce)
        return Ce[t];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [oe, Ce]
  ), Pt = n.useCallback(
    (e, t) => {
      e.preventDefault(), e.stopPropagation(), qe(t.accessorKey), Je.current = e.clientX;
      const s = U(t) ?? 150;
      Qe.current = s;
    },
    [U]
  ), ze = n.useCallback(
    (e) => {
      if (!X) return;
      const t = e.clientX - Je.current, s = Math.max(50, Qe.current + t), i = String(X);
      Ne ? Ne(X, s) : Rt((a) => ({ ...a, [i]: s }));
    },
    [X, Ne]
  ), Le = n.useCallback(() => {
    qe(null);
  }, []);
  n.useEffect(() => {
    if (X)
      return document.addEventListener("mousemove", ze), document.addEventListener("mouseup", Le), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", ze), document.removeEventListener("mouseup", Le), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [X, ze, Le]);
  const me = (e) => {
    const t = te(e, !0), s = (l) => typeof l == "number" ? `${l}px` : l, i = {};
    if (!e.sticky) {
      const l = L ? U(e) : void 0;
      l !== void 0 ? (i.width = `${l}px`, i.minWidth = `${l}px`) : (e.width && (i.width = s(e.width)), e.minWidth && (i.minWidth = s(e.minWidth)));
    }
    const a = { ...i, ...t.style }, h = Vt.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", m = L && /* @__PURE__ */ r(
      "div",
      {
        className: R(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          X === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (l) => Pt(l, e),
        onPointerDown: (l) => l.stopPropagation(),
        onClick: (l) => l.stopPropagation()
      }
    );
    return H && !e.sticky && !e.sortable ? /* @__PURE__ */ E(
      ts,
      {
        id: String(e.accessorKey),
        style: a,
        className: R(Q(e.align), t.className, L && "relative overflow-visible", h),
        children: [
          e.header,
          m
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ E(
      wt,
      {
        sortDirection: rt(e.accessorKey),
        sortPriority: nt(e.accessorKey),
        onSort: () => st(e.accessorKey),
        style: a,
        className: R(Q(e.align), t.className, L && "relative overflow-visible", h),
        children: [
          e.header,
          m
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ E(
      K,
      {
        style: a,
        className: R(Q(e.align), t.className, L && "relative overflow-visible", h),
        children: [
          e.header,
          m
        ]
      },
      String(e.accessorKey)
    );
  }, x = H ? zt : b, yt = x.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Ot = f.map((e) => `row-${e.id}`), jt = n.useCallback(() => 0, []), He = n.useCallback(
    () => N ? w : 0,
    [N]
  ), ke = n.useCallback(() => {
    let e = 0;
    return N && (e += w), I && (e += $), e;
  }, [N, I]), Bt = n.useCallback(
    (e) => x.filter(
      (t) => e.columns.includes(t.accessorKey)
    ).length,
    [x]
  ), xe = n.useMemo(() => p ? new Set(p.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [p]), Vt = n.useMemo(() => {
    if (!p || p.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), t = (i) => p.findIndex((a) => a.columns.includes(i.accessorKey)), s = x.filter((i) => xe.has(i.accessorKey));
    for (let i = 0; i < s.length - 1; i++) {
      const a = s[i], c = s[i + 1], h = t(a), m = t(c);
      h !== m && e.add(a.accessorKey);
    }
    return e;
  }, [p, x, xe]), gt = n.useCallback(
    (e) => {
      const t = x.filter((l) => e.columns.includes(l.accessorKey));
      if (t.length === 0) return { style: {}, className: "" };
      const s = t.every((l) => l.sticky === "left"), i = t.every((l) => l.sticky === "right");
      if (!s && !i) return { style: {}, className: "" };
      const a = s ? t[0] : t[t.length - 1], c = te(a, !0), h = (l) => {
        const u = L ? U(l) : void 0;
        if (u !== void 0) return u;
        const d = l.width ?? l.minWidth;
        if (typeof d == "number") return d;
        const k = parseInt(String(d), 10);
        return Number.isFinite(k) ? k : 150;
      }, y = `${t.reduce((l, u) => l + h(u), 0)}px`;
      return {
        style: {
          ...c.style,
          width: y,
          minWidth: y,
          maxWidth: y
        },
        className: c.className
      };
    },
    [x, te, U, L]
  ), mt = n.useMemo(() => {
    if (!p || p.length === 0) return [];
    const e = [], t = /* @__PURE__ */ new Set();
    for (const s of x) {
      const i = p.findIndex((a) => a.columns.includes(s.accessorKey));
      i !== -1 ? t.has(i) || (t.add(i), e.push({ type: "group", group: p[i] })) : e.push({ type: "standalone", col: s });
    }
    return e;
  }, [p, x]), kt = /* @__PURE__ */ E(Yt, { className: Kt, maxHeight: re, wrapperRef: Xe, children: [
    /* @__PURE__ */ E(Zt, { children: [
      p && p.length > 0 && /* @__PURE__ */ E(A, { children: [
        N && /* @__PURE__ */ r(
          K,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${w}px`,
              minWidth: `${w}px`,
              ...V && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        I && /* @__PURE__ */ r(
          K,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${$}px`,
              minWidth: `${$}px`,
              ...V && { position: "sticky", left: N ? w : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ r(
              vt,
              {
                checked: ye,
                indeterminate: Ge,
                onCheckedChange: et,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        o && /* @__PURE__ */ r(
          K,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${C}px`,
              minWidth: `${C}px`,
              ...V && { position: "sticky", left: ke(), zIndex: 20 }
            },
            children: (o == null ? void 0 : o.showExpandAll) !== !1 && le.length > 0 && /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: dt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": ce ? "모두 접기" : "모두 펼치기",
                children: ce ? /* @__PURE__ */ r(Nt, { size: 24 }) : /* @__PURE__ */ r(Wt, { size: 24 })
              }
            )
          }
        ),
        ae && /* @__PURE__ */ r(
          K,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${O}px`,
              minWidth: `${O}px`,
              maxWidth: `${O}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ r("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        mt.map((e, t) => {
          const s = mt[t + 1], i = e.type === "group" && (s == null ? void 0 : s.type) === "group";
          if (e.type === "group") {
            const a = Bt(e.group);
            if (a === 0) return null;
            const c = x.filter(
              (u) => e.group.columns.includes(u.accessorKey)
            );
            if (new Set(
              c.map((u) => u.sticky ?? "none")
            ).size > 1) {
              const u = [];
              let d = [], k = c[0].sticky;
              for (const W of c)
                W.sticky === k ? d.push(W) : (d.length > 0 && u.push({ cols: d, sticky: k }), d = [W], k = W.sticky);
              d.length > 0 && u.push({ cols: d, sticky: k });
              const _ = u.findIndex((W) => !W.sticky), Y = _ !== -1 ? _ : 0;
              return u.map((W, Z) => {
                const be = {
                  header: e.group.header,
                  columns: W.cols.map((Pe) => Pe.accessorKey),
                  align: e.group.align
                }, se = W.sticky ? gt(be) : { style: {}, className: "" }, Te = !!se.style.position;
                return /* @__PURE__ */ r(
                  K,
                  {
                    colSpan: W.cols.length,
                    className: R(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      i && Z === u.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      se.className
                    ),
                    style: Te ? se.style : { position: "relative", zIndex: 0 },
                    children: Z === Y ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${Z}`
                );
              });
            }
            const y = gt(e.group), l = !!y.style.position;
            return /* @__PURE__ */ r(
              K,
              {
                colSpan: a,
                className: R(
                  "text-center font-medium bg-slate-100 dark:bg-slate-800",
                  e.group.align === "left" && "text-left",
                  e.group.align === "right" && "text-right",
                  i && "border-r border-slate-200 dark:border-slate-700",
                  y.className
                ),
                style: l ? y.style : { position: "relative", zIndex: 0 },
                children: e.group.header
              },
              `group-${String(e.group.columns[0])}`
            );
          } else {
            const a = te(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ r(
              wt,
              {
                rowSpan: 2,
                sortDirection: rt(e.col.accessorKey),
                sortPriority: nt(e.col.accessorKey),
                onSort: () => st(e.col.accessorKey),
                className: R(
                  Q(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  a.className
                ),
                style: a.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ r(
              K,
              {
                rowSpan: 2,
                className: R(
                  Q(e.col.align),
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
      /* @__PURE__ */ E(A, { children: [
        !p && N && /* @__PURE__ */ r(
          K,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: V ? {
              position: "sticky",
              left: jt(),
              zIndex: 20,
              width: `${w}px`,
              minWidth: `${w}px`,
              maxWidth: `${w}px`
            } : {
              width: `${w}px`,
              minWidth: `${w}px`,
              maxWidth: `${w}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ r("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !p && I && /* @__PURE__ */ r(
          K,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: V ? {
              position: "sticky",
              left: He(),
              zIndex: 20,
              width: `${$}px`,
              minWidth: `${$}px`,
              maxWidth: `${$}px`
            } : {
              width: `${$}px`,
              minWidth: `${$}px`,
              maxWidth: `${$}px`
            },
            children: /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ r(
              vt,
              {
                checked: ye,
                indeterminate: Ge,
                onCheckedChange: et,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !p && o && /* @__PURE__ */ r(
          K,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: V ? {
              position: "sticky",
              left: ke(),
              zIndex: 20,
              width: `${C}px`,
              minWidth: `${C}px`,
              maxWidth: `${C}px`
            } : {
              width: `${C}px`,
              minWidth: `${C}px`,
              maxWidth: `${C}px`
            },
            "aria-label": "확장",
            children: (o == null ? void 0 : o.showExpandAll) !== !1 && le.length > 0 ? /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: dt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": ce ? "모두 접기" : "모두 펼치기",
                children: ce ? /* @__PURE__ */ r(Nt, { size: 24 }) : /* @__PURE__ */ r(Wt, { size: 24 })
              }
            ) : /* @__PURE__ */ r("span", { className: "sr-only", children: "확장" })
          }
        ),
        !p && ae && /* @__PURE__ */ r(
          K,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${O}px`,
              minWidth: `${O}px`,
              maxWidth: `${O}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ r("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        p ? H ? /* @__PURE__ */ r(Oe, { items: yt, strategy: St, children: x.filter((e) => xe.has(e.accessorKey)).map(me) }) : x.filter((e) => xe.has(e.accessorKey)).map(me) : H ? /* @__PURE__ */ r(Oe, { items: yt, strategy: St, children: x.map(me) }) : x.map(me)
      ] })
    ] }),
    /* @__PURE__ */ E(At, { children: [
      _e ? /* @__PURE__ */ r(A, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ r(
        P,
        {
          colSpan: ge,
          className: R(
            "text-center",
            ne || ue !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: ne ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ r(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: z ? { width: z } : void 0,
                children: ne
              }
            )
          ) : ue === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const t = typeof re == "number" ? re : typeof re == "string" && parseInt(re, 10) || 320, s = Math.max(1, Math.floor(t / 41));
              return /* @__PURE__ */ r("table", { className: "w-full", children: /* @__PURE__ */ r("tbody", { children: Array.from({ length: s }).map((i, a) => /* @__PURE__ */ E(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    N && /* @__PURE__ */ r("td", { className: "w-8 p-2", children: /* @__PURE__ */ r(Se, { width: 16, height: 16 }) }),
                    I && /* @__PURE__ */ r("td", { className: "w-10 p-2", children: /* @__PURE__ */ r(Se, { width: 18, height: 18 }) }),
                    o && /* @__PURE__ */ r("td", { className: "w-10 p-2", children: /* @__PURE__ */ r(Se, { width: 18, height: 18 }) }),
                    x.map((c) => {
                      const h = c.width ?? c.minWidth, m = typeof h == "number" ? Math.min(h * 0.6, 150) : 100;
                      return /* @__PURE__ */ r("td", { className: "p-2", children: /* @__PURE__ */ r(Se, { height: 16, width: m }) }, String(c.accessorKey));
                    })
                  ]
                },
                a
              )) }) });
            })()
          ) : (
            // 스플래시 모드 (기본) - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ r(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: z ? { width: z } : void 0,
                children: /* @__PURE__ */ r(Gt, { size: "lg" })
              }
            )
          )
        }
      ) }) : f.length === 0 ? /* @__PURE__ */ r(A, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ r(
        P,
        {
          colSpan: ge,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ r(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: z ? { width: z } : void 0,
              children: Et
            }
          )
        }
      ) }) : N ? /* @__PURE__ */ r(Oe, { items: Ot, strategy: Ut, children: f.map((e, t) => {
        const s = at(e.id);
        return /* @__PURE__ */ E(n.Fragment, { children: [
          /* @__PURE__ */ r(
            $t,
            {
              row: e,
              rowIndex: t,
              dataLength: f.length,
              isSelected: M.includes(e.id),
              canExpand: Re(e),
              isExpanded: s,
              editingCell: S,
              editValue: Fe,
              editValueRef: T,
              editingCellRef: Ke,
              columnsToRender: x,
              rowReorderable: !0,
              selectable: I,
              expandable: !!o,
              showRowDelete: ae,
              hasLeftStickyColumns: V,
              resizable: L,
              rowActions: g,
              rowGrouping: D,
              middleRowSet: ut,
              getCheckboxHeaderLeftOffset: He,
              getExpandHeaderLeftOffset: ke,
              getRowSpan: ft,
              isGroupCellHovered: ht,
              isGroupCellSelected: pt,
              getStickyStyles: te,
              getColumnWidth: U,
              getAlignClass: Q,
              handleSelectRow: tt,
              toggleRowExpanded: ot,
              startEditing: it,
              completeEditing: De,
              cancelEditing: ct,
              setEditValue: F,
              setEditingCell: B,
              onCellChange: j,
              onRowClick: Be,
              rowClassName: Ve,
              setHoveredRowIndex: Ye
            }
          ),
          o && s && /* @__PURE__ */ r(A, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ r(
            P,
            {
              colSpan: ge,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ r(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: z ? `${z}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: o.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : f.map((e, t) => {
        const s = at(e.id);
        return /* @__PURE__ */ E(n.Fragment, { children: [
          /* @__PURE__ */ r(
            $t,
            {
              row: e,
              rowIndex: t,
              dataLength: f.length,
              isSelected: M.includes(e.id),
              canExpand: Re(e),
              isExpanded: s,
              editingCell: S,
              editValue: Fe,
              editValueRef: T,
              editingCellRef: Ke,
              columnsToRender: x,
              rowReorderable: !1,
              selectable: I,
              expandable: !!o,
              showRowDelete: ae,
              hasLeftStickyColumns: V,
              resizable: L,
              rowActions: g,
              rowGrouping: D,
              middleRowSet: ut,
              getCheckboxHeaderLeftOffset: He,
              getExpandHeaderLeftOffset: ke,
              getRowSpan: ft,
              isGroupCellHovered: ht,
              isGroupCellSelected: pt,
              getStickyStyles: te,
              getColumnWidth: U,
              getAlignClass: Q,
              handleSelectRow: tt,
              toggleRowExpanded: ot,
              startEditing: it,
              completeEditing: De,
              cancelEditing: ct,
              setEditValue: F,
              setEditingCell: B,
              onCellChange: j,
              onRowClick: Be,
              rowClassName: Ve,
              setHoveredRowIndex: Ye
            }
          ),
          o && s && /* @__PURE__ */ r(A, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ r(
            P,
            {
              colSpan: ge,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ r(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: z ? `${z}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: o.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      Tt && !_e && /* @__PURE__ */ E(A, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        N && /* @__PURE__ */ r(
          P,
          {
            className: "!p-0",
            style: {
              width: `${w}px`,
              minWidth: `${w}px`,
              maxWidth: `${w}px`
            }
          }
        ),
        I && /* @__PURE__ */ r(
          P,
          {
            className: "!p-0",
            style: {
              width: `${$}px`,
              minWidth: `${$}px`,
              maxWidth: `${$}px`
            }
          }
        ),
        o && /* @__PURE__ */ r(
          P,
          {
            className: "!p-0",
            style: {
              width: `${C}px`,
              minWidth: `${C}px`,
              maxWidth: `${C}px`
            }
          }
        ),
        /* @__PURE__ */ r(
          P,
          {
            className: "!p-0",
            style: {
              width: `${O}px`,
              minWidth: `${O}px`,
              maxWidth: `${O}px`
            },
            children: /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: () => {
                  var e;
                  return (e = g == null ? void 0 : g.onRowAdd) == null ? void 0 : e.call(g);
                },
                className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                "aria-label": "행 추가",
                children: /* @__PURE__ */ r(es, { size: 20 })
              }
            )
          }
        ),
        x.map((e) => /* @__PURE__ */ r(
          P,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return H || N ? /* @__PURE__ */ r(
    qt,
    {
      sensors: Lt,
      collisionDetection: Jt,
      onDragEnd: Ht,
      children: kt
    }
  ) : kt;
}
export {
  gs as DataTable
};
//# sourceMappingURL=data-table.mjs.map
