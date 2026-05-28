import { jsxs as M, jsx as r, Fragment as Nt } from "react/jsx-runtime";
import * as d from "react";
import { useSensors as Zt, useSensor as Kt, PointerSensor as Gt, KeyboardSensor as At, DndContext as es, closestCenter as ts } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as ss, arrayMove as Et, SortableContext as Qe, horizontalListSortingStrategy as wt, verticalListSortingStrategy as rs } from "@dnd-kit/sortable";
import { cn as v } from "../../lib/utils.mjs";
import { Table as is, TableHeader as ns, TableRow as A, TableHead as B, TableSortableHead as It, TableBody as as, TableCell as N } from "./table.mjs";
import { Checkbox as Ee } from "../ui/checkbox.mjs";
import { Skeleton as we } from "../ui/skeleton.mjs";
import { SplashScreen as ls } from "../ui/splash-screen.mjs";
import { DownIcon as Ie } from "../../icons/DownIcon.mjs";
import { RightIcon as De } from "../../icons/RightIcon.mjs";
import { RowAddIcon as cs } from "../../icons/RowAddIcon.mjs";
import { RowDeleteIcon as Dt } from "../../icons/RowDeleteIcon.mjs";
import { WriteIcon as Mt } from "../../icons/WriteIcon.mjs";
import { DefaultEditComponent as zt } from "./data-table/default-edit-component.mjs";
import { SortableHeaderCell as os } from "./data-table/sortable-header-cell.mjs";
import { SortableRow as Ct } from "./data-table/sortable-row.mjs";
import { DragHandleCell as Pt } from "./data-table/drag-handle-cell.mjs";
function Es({
  columns: w,
  data: b,
  selectable: _ = !1,
  selectedIds: Z = [],
  onSelectionChange: j,
  sortState: Me,
  onSortChange: ze,
  multiSort: Ue = !1,
  onRowClick: O,
  onCellChange: ee,
  expandable: f,
  emptyMessage: Rt = "데이터가 없습니다.",
  className: Ht,
  rowClassName: X,
  maxHeight: de,
  resizable: q = !1,
  columnWidths: ye,
  onColumnResize: Ce,
  columnReorderable: J = !1,
  columnOrder: Pe,
  onColumnReorder: Re,
  rowReorderable: He = !1,
  onRowReorder: ge,
  loading: Ye = !1,
  loadingMode: me = "splash",
  loadingContent: he,
  headerGroups: S,
  rowGrouping: z,
  rowActions: g
}) {
  const L = z ? !1 : He, ae = typeof process < "u" ? process.env.NODE_ENV !== "production" : !1;
  d.useEffect(() => {
    ae && z && He && console.warn(
      "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
    );
  }, [z, He, ae]), d.useEffect(() => {
    ae && he && me !== "splash" && console.warn(
      "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
    );
  }, [he, me, ae]);
  const [u, G] = d.useState(null), [Ze, te] = d.useState(null), Q = d.useRef(null), Le = d.useRef(null), Ge = d.useRef(null), [F, Lt] = d.useState(0);
  d.useEffect(() => {
    const e = Ge.current;
    if (!e) return;
    const t = () => Lt(e.clientWidth);
    t();
    const s = new ResizeObserver(t);
    return s.observe(e), () => s.disconnect();
  }, []);
  const [Tt, jt] = d.useState(
    (f == null ? void 0 : f.defaultExpandedRowIds) ?? []
  ), [Te, Ot] = d.useState({}), [se, Ae] = d.useState(null), et = d.useRef(0), tt = d.useRef(0), [Bt, st] = d.useState(
    () => w.map((e) => e.accessorKey)
  ), [je, le] = d.useState(null);
  d.useEffect(() => {
    !J || Pe || st((e) => {
      const t = w.map((c) => c.accessorKey), s = e.filter((c) => t.includes(c)), a = t.filter((c) => !s.includes(c)), l = [...s, ...a];
      return l.length === e.length && l.every((c, y) => c === e[y]) ? e : l;
    });
  }, [w, J, Pe]);
  const ce = Pe ?? Bt, Vt = d.useMemo(() => J ? ce.map((e) => w.find((t) => t.accessorKey === e)).filter((e) => e !== void 0) : w, [w, ce, J]), be = d.useMemo(() => {
    if (!S || S.length === 0) return [];
    const e = new Map(
      w.map((t) => [t.accessorKey, t])
    );
    return S.flatMap((t, s) => {
      const a = t.columns.map((h) => e.get(h)).filter((h) => h !== void 0);
      if (a.length === 0) return [];
      const l = new Set(
        a.map((h) => h.sticky).filter((h) => h !== void 0)
      ), c = l.size > 0, y = a.some((h) => !h.sticky), m = l.size > 1;
      return c && (y || m) ? [
        {
          headerLabel: typeof t.header == "string" || typeof t.header == "number" ? String(t.header) : `#${s + 1}`,
          reason: m ? "left/right sticky 혼합" : "sticky/non-sticky 혼합"
        }
      ] : [];
    });
  }, [S, w]), xe = d.useMemo(
    () => be.map((e) => `${e.headerLabel}:${e.reason}`).join("|"),
    [be]
  ), Oe = d.useRef("");
  d.useEffect(() => {
    if (!ae) return;
    if (!xe) {
      Oe.current = "";
      return;
    }
    if (Oe.current === xe) return;
    Oe.current = xe;
    const e = be.map((t) => `${t.headerLabel}(${t.reason})`).join(", ");
    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. 그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + e
    );
  }, [xe, be, ae]);
  const _t = Zt(
    Kt(Gt, {
      activationConstraint: {
        distance: 5
        // 5px 이상 드래그해야 활성화
      }
    }),
    Kt(At, {
      coordinateGetter: ss
    })
  ), rt = d.useCallback(
    (e) => {
      const { active: t, over: s } = e;
      if (!s || t.id === s.id) return;
      const a = ce.findIndex((y) => String(y) === t.id), l = ce.findIndex((y) => String(y) === s.id);
      if (a === -1 || l === -1) return;
      const c = Et(ce, a, l);
      Re ? Re(c) : st(c);
    },
    [ce, Re]
  ), it = d.useCallback(
    (e) => {
      const { active: t, over: s } = e;
      if (!s || t.id === s.id) return;
      const a = String(t.id).replace(/^row-/, ""), l = String(s.id).replace(/^row-/, ""), c = b.findIndex((i) => String(i.id) === a), y = b.findIndex((i) => String(i.id) === l);
      if (c === -1 || y === -1) return;
      const m = Et(b, c, y);
      ge == null || ge(m);
    },
    [b, ge]
  ), Ft = d.useCallback(
    (e) => {
      const { active: t } = e;
      String(t.id).startsWith("row-") ? it(e) : rt(e);
    },
    [rt, it]
  ), ke = (f == null ? void 0 : f.expandedRowIds) ?? Tt, ve = (f == null ? void 0 : f.onExpandedChange) ?? jt, Se = b.length > 0 && Z.length === b.length, nt = Z.length > 0 && !Se, at = () => {
    Se ? j == null || j([]) : j == null || j(b.map((e) => e.id));
  }, lt = (e) => {
    Z.includes(e) ? j == null || j(Z.filter((t) => t !== e)) : j == null || j([...Z, e]);
  }, re = d.useMemo(() => Me ? Me.filter((e) => e.column && e.direction) : [], [Me]), ct = (e) => {
    if (!ze) return;
    const t = re.find((s) => s.column === e);
    if (Ue) {
      let s;
      t ? t.direction === "asc" ? s = re.map(
        (a) => a.column === e ? { column: e, direction: "desc" } : a
      ) : s = re.filter((a) => a.column !== e) : s = [...re, { column: e, direction: "asc" }], ze(s);
    } else {
      let s;
      t ? t.direction === "asc" ? s = [{ column: e, direction: "desc" }] : t.direction === "desc" ? s = [] : s = [{ column: e, direction: "asc" }] : s = [{ column: e, direction: "asc" }], ze(s);
    }
  }, ot = (e) => {
    const t = re.find((s) => s.column === e);
    return (t == null ? void 0 : t.direction) ?? null;
  }, dt = (e) => {
    if (!Ue || re.length <= 1) return;
    const t = re.findIndex((s) => s.column === e);
    return t === -1 ? void 0 : t + 1;
  }, V = (e) => {
    switch (e) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, ht = (e, t, s) => {
    G({ rowId: e, columnKey: t }), te(s), Q.current = s;
  }, Be = (e, t) => {
    const s = Q.current;
    if (!u || s === null) {
      G(null), te(null), Q.current = null;
      return;
    }
    if (e.validate) {
      const a = e.validate(s, t);
      if (a !== !0) {
        G({ ...u, error: a });
        return;
      }
    }
    ee && ee(u.rowId, u.columnKey, s), G(null), te(null), Q.current = null;
  }, pt = d.useCallback(() => {
    if (!u) return;
    const e = w.find((s) => s.accessorKey === u.columnKey), t = b.find((s) => s.id === u.rowId);
    if (e && t)
      Be(e, t);
    else {
      const s = Q.current;
      s !== null && ee && ee(u.rowId, u.columnKey, s), G(null), te(null), Q.current = null;
    }
  }, [u, w, b, ee]), ft = d.useCallback(() => {
    G(null), te(null), Q.current = null;
  }, []);
  d.useEffect(() => {
    if (!u) return;
    const e = (t) => {
      var l, c;
      const s = t.target;
      (l = Le.current) != null && l.contains(s) || (c = s.closest) != null && c.call(s, "[data-radix-popper-content-wrapper]") || pt();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [u, pt]);
  const ut = (e, t) => (u == null ? void 0 : u.rowId) === e && (u == null ? void 0 : u.columnKey) === t, Ve = (e) => f ? f.rowExpandable ? f.rowExpandable(e) : !0 : !1, _e = (e) => ke.includes(e), yt = (e) => {
    _e(e) ? ve(ke.filter((t) => t !== e)) : ve([...ke, e]);
  }, pe = d.useMemo(() => f ? b.filter((e) => Ve(e)).map((e) => e.id) : [], [b, f]), fe = pe.length > 0 && pe.every((e) => ke.includes(e)), gt = () => {
    ve(fe ? [] : pe);
  }, ue = (g == null ? void 0 : g.showDelete) ?? !!(g != null && g.onRowDelete), Xt = (g == null ? void 0 : g.showAdd) ?? !!(g != null && g.onRowAdd), C = 40, We = w.length + (_ ? 1 : 0) + (f ? 1 : 0) + (L ? 1 : 0) + (ue ? 1 : 0), { rowSpanMap: mt, middleRowSet: Fe } = d.useMemo(() => {
    if (!z) return { rowSpanMap: null, middleRowSet: null };
    const e = Array.isArray(z.groupBy) ? z.groupBy : [z.groupBy], t = z.mergeColumns ?? e, s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
    for (const l of t) {
      let c = 0;
      for (; c < b.length; ) {
        const y = e.map((n) => b[c][n]), m = b[c][l];
        let i = 1;
        for (let n = c + 1; n < b.length; n++) {
          const h = e.map((K) => b[n][K]), p = b[n][l];
          if (y.every((K, W) => K === h[W]) && m === p)
            i++;
          else
            break;
        }
        s.has(c) || s.set(c, /* @__PURE__ */ new Map()), s.get(c).set(l, i);
        for (let n = c; n < c + i - 1; n++)
          a.add(n);
        for (let n = c + 1; n < c + i; n++)
          s.has(n) || s.set(n, /* @__PURE__ */ new Map()), s.get(n).set(l, 0);
        c += i;
      }
    }
    return { rowSpanMap: s, middleRowSet: a };
  }, [b, z]), bt = (e, t) => {
    if (!mt) return;
    const s = mt.get(e);
    return s ? s.get(t) : void 0;
  }, xt = (e, t) => je === null ? !1 : je >= e && je < e + t, kt = (e, t) => {
    for (let s = e; s < e + t; s++)
      if (s < b.length && Z.includes(b[s].id))
        return !0;
    return !1;
  }, x = 40, k = 40, P = 32, oe = d.useMemo(() => {
    const e = (p) => {
      const o = p.width ?? p.minWidth;
      if (typeof o == "number") return o;
      const R = parseInt(String(o), 10);
      return Number.isFinite(R) ? R : 150;
    }, t = w.filter((p) => p.sticky === "left"), s = w.filter((p) => p.sticky === "right"), a = L ? P : 0, l = _ ? x : 0, c = f ? k : 0, y = a + l + c, m = /* @__PURE__ */ new Map();
    let i = y;
    for (const p of t)
      m.set(p.accessorKey, i), i += e(p);
    const n = /* @__PURE__ */ new Map();
    let h = 0;
    for (let p = s.length - 1; p >= 0; p--) {
      const o = s[p];
      n.set(o.accessorKey, h), h += e(o);
    }
    return (p, o, R, K) => {
      if (!p.sticky) return { style: {}, className: "" };
      const T = `${e(p)}px`, D = {
        position: "sticky",
        zIndex: o ? 20 : 10,
        width: T,
        minWidth: T,
        maxWidth: T
      }, H = K ?? R;
      if (p.sticky === "left") {
        const ne = m.get(p.accessorKey) ?? 0;
        return {
          style: {
            ...D,
            left: `${ne}px`
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: v(
            "transition-colors",
            o ? "bg-slate-100 dark:bg-slate-800" : H ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
          )
        };
      }
      const U = n.get(p.accessorKey) ?? 0;
      return {
        style: {
          ...D,
          right: `${U}px`
        },
        className: v(
          "transition-colors",
          o ? "bg-slate-100 dark:bg-slate-800" : H ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-100 dark:bg-slate-800"
        )
      };
    };
  }, [w, _, f]), I = w.some((e) => e.sticky === "left"), ie = d.useCallback(
    (e) => {
      const t = String(e.accessorKey);
      if (ye && t in ye)
        return ye[t];
      if (t in Te)
        return Te[t];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [ye, Te]
  ), qt = d.useCallback(
    (e, t) => {
      e.preventDefault(), e.stopPropagation(), Ae(t.accessorKey), et.current = e.clientX;
      const s = ie(t) ?? 150;
      tt.current = s;
    },
    [ie]
  ), Xe = d.useCallback(
    (e) => {
      if (!se) return;
      const t = e.clientX - et.current, s = Math.max(50, tt.current + t), a = String(se);
      Ce ? Ce(se, s) : Ot((l) => ({ ...l, [a]: s }));
    },
    [se, Ce]
  ), qe = d.useCallback(() => {
    Ae(null);
  }, []);
  d.useEffect(() => {
    if (se)
      return document.addEventListener("mousemove", Xe), document.addEventListener("mouseup", qe), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", Xe), document.removeEventListener("mouseup", qe), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [se, Xe, qe]);
  const $e = (e) => {
    const t = oe(e, !0), s = (n) => typeof n == "number" ? `${n}px` : n, a = {};
    if (!e.sticky) {
      const n = q ? ie(e) : void 0;
      n !== void 0 ? (a.width = `${n}px`, a.minWidth = `${n}px`) : (e.width && (a.width = s(e.width)), e.minWidth && (a.minWidth = s(e.minWidth)));
    }
    const l = { ...a, ...t.style }, y = Yt.has(e.accessorKey) && "border-r border-slate-200 dark:border-slate-700", m = q && /* @__PURE__ */ r(
      "div",
      {
        className: v(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          se === e.accessorKey && "opacity-100"
        ),
        style: {
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        },
        onMouseDown: (n) => qt(n, e),
        onPointerDown: (n) => n.stopPropagation(),
        onClick: (n) => n.stopPropagation()
      }
    );
    return J && !e.sticky && !e.sortable ? /* @__PURE__ */ M(
      os,
      {
        id: String(e.accessorKey),
        style: l,
        className: v(V(e.align), t.className, q && "relative overflow-visible", y),
        children: [
          e.header,
          m
        ]
      },
      String(e.accessorKey)
    ) : e.sortable ? /* @__PURE__ */ M(
      It,
      {
        sortDirection: ot(e.accessorKey),
        sortPriority: dt(e.accessorKey),
        onSort: () => ct(e.accessorKey),
        style: l,
        className: v(V(e.align), t.className, q && "relative overflow-visible", y),
        children: [
          e.header,
          m
        ]
      },
      String(e.accessorKey)
    ) : /* @__PURE__ */ M(
      B,
      {
        style: l,
        className: v(V(e.align), t.className, q && "relative overflow-visible", y),
        children: [
          e.header,
          m
        ]
      },
      String(e.accessorKey)
    );
  }, E = J ? Vt : w, vt = E.filter((e) => !e.sticky).map((e) => String(e.accessorKey)), Jt = b.map((e) => `row-${e.id}`), Qt = () => 0, Je = () => L ? P : 0, Ne = () => {
    let e = 0;
    return L && (e += P), _ && (e += x), e;
  }, Ut = d.useCallback(
    (e) => E.filter(
      (t) => e.columns.includes(t.accessorKey)
    ).length,
    [E]
  ), Ke = d.useMemo(() => S ? new Set(S.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [S]), Yt = d.useMemo(() => {
    if (!S || S.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), t = (a) => S.findIndex((l) => l.columns.includes(a.accessorKey)), s = E.filter((a) => Ke.has(a.accessorKey));
    for (let a = 0; a < s.length - 1; a++) {
      const l = s[a], c = s[a + 1], y = t(l), m = t(c);
      y !== m && e.add(l.accessorKey);
    }
    return e;
  }, [S, E, Ke]), St = d.useCallback(
    (e) => {
      const t = E.filter((n) => e.columns.includes(n.accessorKey));
      if (t.length === 0) return { style: {}, className: "" };
      const s = t.every((n) => n.sticky === "left"), a = t.every((n) => n.sticky === "right");
      if (!s && !a) return { style: {}, className: "" };
      const l = s ? t[0] : t[t.length - 1], c = oe(l, !0), y = (n) => {
        const h = q ? ie(n) : void 0;
        if (h !== void 0) return h;
        const p = n.width ?? n.minWidth;
        if (typeof p == "number") return p;
        const o = parseInt(String(p), 10);
        return Number.isFinite(o) ? o : 150;
      }, i = `${t.reduce((n, h) => n + y(h), 0)}px`;
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
    [E, oe, ie, q]
  ), Wt = d.useMemo(() => {
    if (!S || S.length === 0) return [];
    const e = [], t = /* @__PURE__ */ new Set();
    for (const s of E) {
      const a = S.findIndex((l) => l.columns.includes(s.accessorKey));
      a !== -1 ? t.has(a) || (t.add(a), e.push({ type: "group", group: S[a] })) : e.push({ type: "standalone", col: s });
    }
    return e;
  }, [S, E]), $t = /* @__PURE__ */ M(is, { className: Ht, maxHeight: de, wrapperRef: Ge, children: [
    /* @__PURE__ */ M(ns, { children: [
      S && S.length > 0 && /* @__PURE__ */ M(A, { children: [
        L && /* @__PURE__ */ r(
          B,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${P}px`,
              minWidth: `${P}px`,
              ...I && { position: "sticky", left: 0, zIndex: 20 }
            }
          }
        ),
        _ && /* @__PURE__ */ r(
          B,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            rowSpan: 2,
            style: {
              width: `${x}px`,
              minWidth: `${x}px`,
              ...I && { position: "sticky", left: L ? P : 0, zIndex: 20 }
            },
            children: /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ r(
              Ee,
              {
                checked: Se,
                indeterminate: nt,
                onCheckedChange: at,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        f && /* @__PURE__ */ r(
          B,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            rowSpan: 2,
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              ...I && { position: "sticky", left: Ne(), zIndex: 20 }
            },
            children: (f == null ? void 0 : f.showExpandAll) !== !1 && pe.length > 0 && /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: gt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": fe ? "모두 접기" : "모두 펼치기",
                children: fe ? /* @__PURE__ */ r(Ie, { size: 24 }) : /* @__PURE__ */ r(De, { size: 24 })
              }
            )
          }
        ),
        ue && /* @__PURE__ */ r(
          B,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800 border-b-0",
            rowSpan: 2,
            style: {
              width: `${C}px`,
              minWidth: `${C}px`,
              maxWidth: `${C}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ r("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        Wt.map((e, t) => {
          const s = Wt[t + 1], a = e.type === "group" && (s == null ? void 0 : s.type) === "group";
          if (e.type === "group") {
            const l = Ut(e.group);
            if (l === 0) return null;
            const c = E.filter(
              (h) => e.group.columns.includes(h.accessorKey)
            );
            if (new Set(
              c.map((h) => h.sticky ?? "none")
            ).size > 1) {
              const h = [];
              let p = [], o = c[0].sticky;
              for (const W of c)
                W.sticky === o ? p.push(W) : (p.length > 0 && h.push({ cols: p, sticky: o }), p = [W], o = W.sticky);
              p.length > 0 && h.push({ cols: p, sticky: o });
              const R = h.findIndex((W) => !W.sticky), K = R !== -1 ? R : 0;
              return h.map((W, T) => {
                const D = {
                  header: e.group.header,
                  columns: W.cols.map((ne) => ne.accessorKey),
                  align: e.group.align
                }, H = W.sticky ? St(D) : { style: {}, className: "" }, U = !!H.style.position;
                return /* @__PURE__ */ r(
                  B,
                  {
                    colSpan: W.cols.length,
                    className: v(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      e.group.align === "left" && "text-left",
                      e.group.align === "right" && "text-right",
                      a && T === h.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                      H.className
                    ),
                    style: U ? H.style : { position: "relative", zIndex: 0 },
                    children: T === K ? e.group.header : null
                  },
                  `group-${String(e.group.columns[0])}-seg-${T}`
                );
              });
            }
            const i = St(e.group), n = !!i.style.position;
            return /* @__PURE__ */ r(
              B,
              {
                colSpan: l,
                className: v(
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
            const l = oe(e.col, !0);
            return e.col.sortable ? /* @__PURE__ */ r(
              It,
              {
                rowSpan: 2,
                sortDirection: ot(e.col.accessorKey),
                sortPriority: dt(e.col.accessorKey),
                onSort: () => ct(e.col.accessorKey),
                className: v(
                  V(e.col.align),
                  "bg-slate-100 dark:bg-slate-800",
                  l.className
                ),
                style: l.style,
                children: e.col.header
              },
              `standalone-${String(e.col.accessorKey)}`
            ) : /* @__PURE__ */ r(
              B,
              {
                rowSpan: 2,
                className: v(
                  V(e.col.align),
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
      /* @__PURE__ */ M(A, { children: [
        !S && L && /* @__PURE__ */ r(
          B,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: I ? {
              position: "sticky",
              left: Qt(),
              zIndex: 20,
              width: `${P}px`,
              minWidth: `${P}px`,
              maxWidth: `${P}px`
            } : {
              width: `${P}px`,
              minWidth: `${P}px`,
              maxWidth: `${P}px`
            },
            "aria-label": "순서 변경",
            children: /* @__PURE__ */ r("span", { className: "sr-only", children: "순서 변경" })
          }
        ),
        !S && _ && /* @__PURE__ */ r(
          B,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: I ? {
              position: "sticky",
              left: Je(),
              zIndex: 20,
              width: `${x}px`,
              minWidth: `${x}px`,
              maxWidth: `${x}px`
            } : {
              width: `${x}px`,
              minWidth: `${x}px`,
              maxWidth: `${x}px`
            },
            children: /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ r(
              Ee,
              {
                checked: Se,
                indeterminate: nt,
                onCheckedChange: at,
                "aria-label": "전체 선택"
              }
            ) })
          }
        ),
        !S && f && /* @__PURE__ */ r(
          B,
          {
            className: "bg-slate-100 dark:bg-slate-800 !p-0",
            style: I ? {
              position: "sticky",
              left: Ne(),
              zIndex: 20,
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            } : {
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            },
            "aria-label": "확장",
            children: (f == null ? void 0 : f.showExpandAll) !== !1 && pe.length > 0 ? /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: gt,
                className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
                "aria-label": fe ? "모두 접기" : "모두 펼치기",
                children: fe ? /* @__PURE__ */ r(Ie, { size: 24 }) : /* @__PURE__ */ r(De, { size: 24 })
              }
            ) : /* @__PURE__ */ r("span", { className: "sr-only", children: "확장" })
          }
        ),
        !S && ue && /* @__PURE__ */ r(
          B,
          {
            className: "!p-0 bg-slate-100 dark:bg-slate-800",
            style: {
              width: `${C}px`,
              minWidth: `${C}px`,
              maxWidth: `${C}px`
            },
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ r("span", { className: "sr-only", children: "행 삭제" })
          }
        ),
        S ? J ? /* @__PURE__ */ r(Qe, { items: vt, strategy: wt, children: E.filter((e) => Ke.has(e.accessorKey)).map($e) }) : E.filter((e) => Ke.has(e.accessorKey)).map($e) : J ? /* @__PURE__ */ r(Qe, { items: vt, strategy: wt, children: E.map($e) }) : E.map($e)
      ] })
    ] }),
    /* @__PURE__ */ M(as, { children: [
      Ye ? /* @__PURE__ */ r(A, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ r(
        N,
        {
          colSpan: We,
          className: v(
            "text-center",
            he || me !== "skeleton" ? "h-80" : "p-0 align-top"
          ),
          children: he ? (
            // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
            /* @__PURE__ */ r(
              "div",
              {
                className: "sticky left-0 flex items-center justify-center h-full",
                style: F ? { width: F } : void 0,
                children: he
              }
            )
          ) : me === "skeleton" ? (
            // 스켈레톤 모드: 컬럼 기반 자동 생성
            (() => {
              const t = typeof de == "number" ? de : typeof de == "string" && parseInt(de, 10) || 320, s = Math.max(1, Math.floor(t / 41));
              return /* @__PURE__ */ r("table", { className: "w-full", children: /* @__PURE__ */ r("tbody", { children: Array.from({ length: s }).map((a, l) => /* @__PURE__ */ M(
                "tr",
                {
                  className: "border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                  children: [
                    L && /* @__PURE__ */ r("td", { className: "w-8 p-2", children: /* @__PURE__ */ r(we, { width: 16, height: 16 }) }),
                    _ && /* @__PURE__ */ r("td", { className: "w-10 p-2", children: /* @__PURE__ */ r(we, { width: 18, height: 18 }) }),
                    f && /* @__PURE__ */ r("td", { className: "w-10 p-2", children: /* @__PURE__ */ r(we, { width: 18, height: 18 }) }),
                    E.map((c) => {
                      const y = c.width ?? c.minWidth, m = typeof y == "number" ? Math.min(y * 0.6, 150) : 100;
                      return /* @__PURE__ */ r("td", { className: "p-2", children: /* @__PURE__ */ r(we, { height: 16, width: m }) }, String(c.accessorKey));
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
                style: F ? { width: F } : void 0,
                children: /* @__PURE__ */ r(ls, { size: "lg" })
              }
            )
          )
        }
      ) }) : b.length === 0 ? /* @__PURE__ */ r(A, { className: "hover:bg-white dark:hover:bg-slate-900", children: /* @__PURE__ */ r(
        N,
        {
          colSpan: We,
          className: "h-24 p-0 text-slate-500",
          children: /* @__PURE__ */ r(
            "div",
            {
              className: "sticky left-0 flex items-center justify-center h-24 text-center",
              style: F ? { width: F } : void 0,
              children: Rt
            }
          )
        }
      ) }) : L ? /* @__PURE__ */ r(Qe, { items: Jt, strategy: rs, children: b.map((e, t) => {
        const s = Z.includes(e.id), a = Ve(e), l = _e(e.id), c = `row-${e.id}`, y = (m) => /* @__PURE__ */ M(Nt, { children: [
          /* @__PURE__ */ r(
            Pt,
            {
              isSelected: s,
              hasLeftStickyColumns: I,
              dragHandleProps: m
            }
          ),
          _ && /* @__PURE__ */ r(
            N,
            {
              onClick: (i) => i.stopPropagation(),
              className: v(
                "!p-0",
                I && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: I ? {
                position: "sticky",
                left: Je(),
                zIndex: 10,
                width: `${x}px`,
                minWidth: `${x}px`,
                maxWidth: `${x}px`
              } : {
                width: `${x}px`,
                minWidth: `${x}px`,
                maxWidth: `${x}px`
              },
              children: /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ r(
                Ee,
                {
                  checked: s,
                  onCheckedChange: () => lt(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          f && /* @__PURE__ */ r(
            N,
            {
              className: v(
                "p-0",
                I && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: I ? {
                position: "sticky",
                left: Ne(),
                zIndex: 10,
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              } : {
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: a && /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => yt(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": l ? "행 접기" : "행 펼치기",
                  "aria-expanded": l,
                  children: l ? /* @__PURE__ */ r(Ie, { size: 24 }) : /* @__PURE__ */ r(De, { size: 24 })
                }
              )
            }
          ),
          ue && /* @__PURE__ */ r(
            N,
            {
              className: "!p-0",
              style: {
                width: `${C}px`,
                minWidth: `${C}px`,
                maxWidth: `${C}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var i;
                    return (i = g == null ? void 0 : g.onRowDelete) == null ? void 0 : i.call(g, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ r(Dt, { size: 20 })
                }
              )
            }
          ),
          E.map((i) => {
            const n = bt(t, i.accessorKey);
            if (n === 0) return null;
            const h = e[i.accessorKey], p = ut(e.id, i.accessorKey), o = n !== void 0 && n > 1, R = o && xt(t, n), K = o && kt(t, n), W = oe(i, !1, s, o ? K : void 0), T = ($) => typeof $ == "number" ? `${$}px` : $, D = {};
            if (!i.sticky) {
              const $ = q ? ie(i) : void 0;
              $ !== void 0 ? (D.width = `${$}px`, D.minWidth = `${$}px`) : (i.width && (D.width = T(i.width)), i.minWidth && (D.minWidth = T(i.minWidth)));
            }
            const H = { ...D, ...W.style };
            if (p && i.editable) {
              const $ = i.editComponent || zt;
              return /* @__PURE__ */ r(
                N,
                {
                  ref: Le,
                  className: v(V(i.align), "p-1 overflow-hidden", W.className),
                  style: H,
                  onClick: (Y) => Y.stopPropagation(),
                  rowSpan: o ? n : void 0,
                  children: /* @__PURE__ */ r(
                    $,
                    {
                      value: Ze,
                      onChange: (Y) => {
                        te(Y), Q.current = Y, u != null && u.error && G({ ...u, error: void 0 });
                      },
                      onComplete: () => Be(i, e),
                      onCancel: ft,
                      row: e,
                      error: u == null ? void 0 : u.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const U = i.cell ? i.cell(h, e) : String(h ?? "");
            if (i.editable && ee)
              return /* @__PURE__ */ r(
                N,
                {
                  className: v(
                    V(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    o && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    o && K && "bg-blue-50 dark:bg-blue-900",
                    o && !K && R && "bg-slate-100 dark:bg-slate-800",
                    W.className
                  ),
                  style: H,
                  onClick: ($) => {
                    $.stopPropagation(), setTimeout(() => ht(e.id, i.accessorKey, h), 0);
                  },
                  rowSpan: o ? n : void 0,
                  children: /* @__PURE__ */ M("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ r("span", { className: "flex-1", children: U }),
                    /* @__PURE__ */ r(
                      Mt,
                      {
                        size: 14,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const ne = o && t + n >= b.length;
            return /* @__PURE__ */ r(
              N,
              {
                className: v(
                  V(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  o && "align-middle transition-colors",
                  o && !ne && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  o && K && "bg-blue-50 dark:bg-blue-900",
                  o && !K && R && "bg-slate-100 dark:bg-slate-800",
                  W.className
                ),
                style: H,
                rowSpan: o ? n : void 0,
                children: U
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ M(d.Fragment, { children: [
          /* @__PURE__ */ r(
            Ct,
            {
              id: c,
              isSelected: s,
              className: v(O && "cursor-pointer", X == null ? void 0 : X(e)),
              onClick: () => O == null ? void 0 : O(e),
              onMouseEnter: z ? () => le(t) : void 0,
              onMouseLeave: z ? () => le(null) : void 0,
              children: (m) => y(m)
            }
          ),
          f && l && /* @__PURE__ */ r(A, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ r(
            N,
            {
              colSpan: We,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ r(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: F ? `${F}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: f.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }) }) : b.map((e, t) => {
        const s = Z.includes(e.id), a = Ve(e), l = _e(e.id), c = `row-${e.id}`, y = (m) => /* @__PURE__ */ M(Nt, { children: [
          L && /* @__PURE__ */ r(
            Pt,
            {
              isSelected: s,
              hasLeftStickyColumns: I,
              dragHandleProps: m
            }
          ),
          _ && /* @__PURE__ */ r(
            N,
            {
              onClick: (i) => i.stopPropagation(),
              className: v(
                "!p-0",
                I && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: I ? {
                position: "sticky",
                left: Je(),
                zIndex: 10,
                width: `${x}px`,
                minWidth: `${x}px`,
                maxWidth: `${x}px`
              } : {
                width: `${x}px`,
                minWidth: `${x}px`,
                maxWidth: `${x}px`
              },
              children: /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ r(
                Ee,
                {
                  checked: s,
                  onCheckedChange: () => lt(e.id),
                  "aria-label": `행 ${e.id} 선택`
                }
              ) })
            }
          ),
          f && /* @__PURE__ */ r(
            N,
            {
              className: v(
                "p-0",
                I && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
              ),
              style: I ? {
                position: "sticky",
                left: Ne(),
                zIndex: 10,
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              } : {
                width: `${k}px`,
                minWidth: `${k}px`,
                maxWidth: `${k}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: a && /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => yt(e.id),
                  className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                  "aria-label": l ? "행 접기" : "행 펼치기",
                  "aria-expanded": l,
                  children: l ? /* @__PURE__ */ r(Ie, { size: 24 }) : /* @__PURE__ */ r(De, { size: 24 })
                }
              )
            }
          ),
          ue && /* @__PURE__ */ r(
            N,
            {
              className: "!p-0",
              style: {
                width: `${C}px`,
                minWidth: `${C}px`,
                maxWidth: `${C}px`
              },
              onClick: (i) => i.stopPropagation(),
              children: /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var i;
                    return (i = g == null ? void 0 : g.onRowDelete) == null ? void 0 : i.call(g, e);
                  },
                  className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
                  "aria-label": "행 삭제",
                  children: /* @__PURE__ */ r(Dt, { size: 20 })
                }
              )
            }
          ),
          E.map((i) => {
            const n = bt(t, i.accessorKey);
            if (n === 0) return null;
            const h = e[i.accessorKey], p = ut(e.id, i.accessorKey), o = n !== void 0 && n > 1, R = o && xt(t, n), K = o && kt(t, n), W = oe(i, !1, s, o ? K : void 0), T = ($) => typeof $ == "number" ? `${$}px` : $, D = {};
            if (!i.sticky) {
              const $ = q ? ie(i) : void 0;
              $ !== void 0 ? (D.width = `${$}px`, D.minWidth = `${$}px`) : (i.width && (D.width = T(i.width)), i.minWidth && (D.minWidth = T(i.minWidth)));
            }
            const H = { ...D, ...W.style };
            if (p && i.editable) {
              const $ = i.editComponent || zt;
              return /* @__PURE__ */ r(
                N,
                {
                  ref: Le,
                  className: v(V(i.align), "p-1 overflow-hidden", W.className),
                  style: H,
                  onClick: (Y) => Y.stopPropagation(),
                  rowSpan: o ? n : void 0,
                  children: /* @__PURE__ */ r(
                    $,
                    {
                      value: Ze,
                      onChange: (Y) => {
                        te(Y), Q.current = Y, u != null && u.error && G({ ...u, error: void 0 });
                      },
                      onComplete: () => Be(i, e),
                      onCancel: ft,
                      row: e,
                      error: u == null ? void 0 : u.error
                    }
                  )
                },
                String(i.accessorKey)
              );
            }
            const U = i.cell ? i.cell(h, e) : String(h ?? "");
            if (i.editable && ee)
              return /* @__PURE__ */ r(
                N,
                {
                  className: v(
                    V(i.align),
                    "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                    o && "align-middle transition-colors",
                    // 그룹 셀 hover/selected 스타일
                    o && K && "bg-blue-50 dark:bg-blue-900",
                    o && !K && R && "bg-slate-100 dark:bg-slate-800",
                    W.className
                  ),
                  style: H,
                  onClick: ($) => {
                    $.stopPropagation(), setTimeout(() => {
                      ht(e.id, i.accessorKey, h);
                    }, 0);
                  },
                  rowSpan: o ? n : void 0,
                  children: /* @__PURE__ */ M("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ r("span", { className: "flex-1", children: U }),
                    /* @__PURE__ */ r(
                      Mt,
                      {
                        size: 20,
                        className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                      }
                    )
                  ] })
                },
                String(i.accessorKey)
              );
            const ne = o && t + n >= b.length;
            return /* @__PURE__ */ r(
              N,
              {
                className: v(
                  V(i.align),
                  "overflow-hidden break-all [overflow-wrap:break-word]",
                  o && "align-middle transition-colors",
                  o && !ne && "border-b border-slate-200 dark:border-slate-700",
                  // 그룹 셀 hover/selected 스타일
                  o && K && "bg-blue-50 dark:bg-blue-900",
                  o && !K && R && "bg-slate-100 dark:bg-slate-800",
                  W.className
                ),
                style: H,
                rowSpan: o ? n : void 0,
                children: U
              },
              String(i.accessorKey)
            );
          })
        ] });
        return /* @__PURE__ */ M(d.Fragment, { children: [
          L ? /* @__PURE__ */ r(
            Ct,
            {
              id: c,
              isSelected: s,
              className: v(O && "cursor-pointer", X == null ? void 0 : X(e)),
              onClick: () => O == null ? void 0 : O(e),
              onMouseEnter: z ? () => le(t) : void 0,
              onMouseLeave: z ? () => le(null) : void 0,
              children: (m) => y(m)
            }
          ) : /* @__PURE__ */ r(
            A,
            {
              "data-state": s ? "selected" : void 0,
              className: v(
                O && "cursor-pointer",
                (Fe == null ? void 0 : Fe.has(t)) && "border-b-0",
                X == null ? void 0 : X(e)
              ),
              onClick: () => O == null ? void 0 : O(e),
              onMouseEnter: z ? () => le(t) : void 0,
              onMouseLeave: z ? () => le(null) : void 0,
              children: y()
            }
          ),
          f && l && /* @__PURE__ */ r(A, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ r(
            N,
            {
              colSpan: We,
              className: "p-0",
              style: { position: "relative" },
              children: /* @__PURE__ */ r(
                "div",
                {
                  className: "p-4 overflow-x-auto",
                  style: {
                    position: "sticky",
                    left: 0,
                    width: F ? `${F}px` : "100%",
                    maxWidth: "100%"
                  },
                  children: f.expandedRowRender(e)
                }
              )
            }
          ) })
        ] }, e.id);
      }),
      Xt && !Ye && /* @__PURE__ */ M(A, { className: "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0", children: [
        L && /* @__PURE__ */ r(
          N,
          {
            className: "!p-0",
            style: {
              width: `${P}px`,
              minWidth: `${P}px`,
              maxWidth: `${P}px`
            }
          }
        ),
        _ && /* @__PURE__ */ r(
          N,
          {
            className: "!p-0",
            style: {
              width: `${x}px`,
              minWidth: `${x}px`,
              maxWidth: `${x}px`
            }
          }
        ),
        f && /* @__PURE__ */ r(
          N,
          {
            className: "!p-0",
            style: {
              width: `${k}px`,
              minWidth: `${k}px`,
              maxWidth: `${k}px`
            }
          }
        ),
        /* @__PURE__ */ r(
          N,
          {
            className: "!p-0",
            style: {
              width: `${C}px`,
              minWidth: `${C}px`,
              maxWidth: `${C}px`
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
                children: /* @__PURE__ */ r(cs, { size: 20 })
              }
            )
          }
        ),
        E.map((e) => /* @__PURE__ */ r(
          N,
          {
            className: "!p-0"
          },
          String(e.accessorKey)
        ))
      ] })
    ] })
  ] });
  return J || L ? /* @__PURE__ */ r(
    es,
    {
      sensors: _t,
      collisionDetection: ts,
      onDragEnd: Ft,
      children: $t
    }
  ) : $t;
}
export {
  Es as DataTable
};
//# sourceMappingURL=data-table.mjs.map
