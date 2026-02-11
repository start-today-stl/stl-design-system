import { jsxs as _, jsx as r } from "react/jsx-runtime";
import * as u from "react";
import { cn as k } from "../../lib/utils.mjs";
import { Table as bt, TableHeader as kt, TableRow as A, TableHead as F, TableSortableHead as mt, TableBody as vt, TableCell as N } from "./table.mjs";
import { Checkbox as Y } from "../ui/checkbox.mjs";
import { Input as Et } from "../ui/input.mjs";
import { DownIcon as Kt } from "../../icons/DownIcon.mjs";
import { RightIcon as Nt } from "../../icons/RightIcon.mjs";
function Wt({
  value: y,
  onChange: E,
  onComplete: x,
  onCancel: m,
  error: l
}) {
  const d = u.useRef(null);
  u.useEffect(() => {
    var o, W;
    (o = d.current) == null || o.focus(), (W = d.current) == null || W.select();
  }, []);
  const K = (o) => {
    o.key === "Enter" ? (o.preventDefault(), x()) : o.key === "Escape" && (o.preventDefault(), m());
  };
  return /* @__PURE__ */ _("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ r(
      Et,
      {
        ref: d,
        value: String(y ?? ""),
        onChange: (o) => E(o.target.value),
        onKeyDown: K,
        error: !!l,
        className: "w-full min-w-[60px] px-2 text-xs"
      }
    ),
    l && /* @__PURE__ */ r("span", { className: "text-[10px] text-destructive dark:text-red-400", children: l })
  ] });
}
function _t({
  columns: y,
  data: E,
  selectable: x = !1,
  selectedIds: m = [],
  onSelectionChange: l,
  sortState: d,
  onSortChange: K,
  onRowClick: o,
  onCellChange: W,
  expandable: a,
  emptyMessage: Z = "데이터가 없습니다.",
  className: S,
  rowClassName: H,
  maxHeight: C
}) {
  const [c, $] = u.useState(null), [tt, P] = u.useState(null), w = u.useRef(null), V = u.useRef(null), [et, st] = u.useState(
    (a == null ? void 0 : a.defaultExpandedRowIds) ?? []
  ), j = (a == null ? void 0 : a.expandedRowIds) ?? et, X = (a == null ? void 0 : a.onExpandedChange) ?? st, M = E.length > 0 && m.length === E.length, rt = m.length > 0 && !M, it = () => {
    M ? l == null || l([]) : l == null || l(E.map((t) => t.id));
  }, nt = (t) => {
    m.includes(t) ? l == null || l(m.filter((s) => s !== t)) : l == null || l([...m, t]);
  }, at = (t) => {
    K && ((d == null ? void 0 : d.column) === t ? d.direction === "asc" ? K({ column: t, direction: "desc" }) : d.direction === "desc" ? K({ column: null, direction: null }) : K({ column: t, direction: "asc" }) : K({ column: t, direction: "asc" }));
  }, ct = (t) => (d == null ? void 0 : d.column) === t ? d.direction : null, T = (t) => {
    switch (t) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, lt = (t, s, i) => {
    $({ rowId: t, columnKey: s }), P(i), w.current = i;
  }, ot = (t, s) => {
    const i = w.current;
    if (!c || i === null) {
      $(null), P(null), w.current = null;
      return;
    }
    if (t.validate) {
      const h = t.validate(i, s);
      if (h !== !0) {
        $({ ...c, error: h });
        return;
      }
    }
    W && W(c.rowId, c.columnKey, i), $(null), P(null), w.current = null;
  }, O = u.useCallback(() => {
    $(null), P(null), w.current = null;
  }, []);
  u.useEffect(() => {
    if (!c) return;
    const t = (s) => {
      var e, f;
      const i = s.target;
      (e = V.current) != null && e.contains(i) || (f = i.closest) != null && f.call(i, "[data-radix-popper-content-wrapper]") || O();
    };
    return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
  }, [c, O]);
  const dt = (t, s) => (c == null ? void 0 : c.rowId) === t && (c == null ? void 0 : c.columnKey) === s, ht = (t) => a ? a.rowExpandable ? a.rowExpandable(t) : !0 : !1, q = (t) => j.includes(t), ft = (t) => {
    q(t) ? X(j.filter((s) => s !== t)) : X([...j, t]);
  }, G = y.length + (x ? 1 : 0) + (a ? 1 : 0), J = u.useMemo(() => {
    const t = (n) => {
      const p = n.width ?? n.minWidth;
      return typeof p == "number" ? p : parseInt(String(p) || "150", 10);
    }, s = y.filter((n) => n.sticky === "left"), i = y.filter((n) => n.sticky === "right"), f = (x ? 48 : 0) + (a ? 40 : 0), z = /* @__PURE__ */ new Map();
    let b = f;
    for (const n of s)
      z.set(n.accessorKey, b), b += t(n);
    const L = /* @__PURE__ */ new Map();
    let I = 0;
    for (let n = i.length - 1; n >= 0; n--) {
      const p = i[n];
      L.set(p.accessorKey, I), I += t(p);
    }
    const D = s.length > 0 ? s[s.length - 1].accessorKey : null, ut = i.length > 0 ? i[0].accessorKey : null;
    return (n, p, Q) => {
      if (!n.sticky) return { style: {}, className: "" };
      const gt = n.accessorKey === D, pt = n.accessorKey === ut, B = `${t(n)}px`, U = {
        position: "sticky",
        zIndex: p ? 20 : 10,
        width: B,
        minWidth: B,
        maxWidth: B
      };
      if (n.sticky === "left") {
        const xt = z.get(n.accessorKey) ?? 0;
        return {
          style: {
            ...U,
            left: `${xt}px`
          },
          // 헤더: 셀 단위 hover, 바디: 행 단위 hover (group-hover)
          className: k(
            "transition-colors",
            p ? "bg-[#eaedf1] dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700" : Q ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-50 dark:bg-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
            gt && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          )
        };
      }
      const yt = L.get(n.accessorKey) ?? 0;
      return {
        style: {
          ...U,
          right: `${yt}px`
        },
        className: k(
          "transition-colors",
          p ? "bg-[#eaedf1] dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700" : Q ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-50 dark:bg-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
          pt && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [y, x, a]), R = y.some((t) => t.sticky === "left"), g = 48, v = 40;
  return /* @__PURE__ */ _(bt, { className: S, maxHeight: C, children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ _(A, { children: [
      x && /* @__PURE__ */ r(
        F,
        {
          className: "bg-[#eaedf1] dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
          style: R ? {
            position: "sticky",
            left: 0,
            zIndex: 20,
            width: `${g}px`,
            minWidth: `${g}px`,
            maxWidth: `${g}px`
          } : { width: `${g}px` },
          children: /* @__PURE__ */ r(
            Y,
            {
              checked: M,
              indeterminate: rt,
              onCheckedChange: it,
              "aria-label": "전체 선택"
            }
          )
        }
      ),
      a && /* @__PURE__ */ r(
        F,
        {
          className: "bg-[#eaedf1] dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
          style: R ? {
            position: "sticky",
            left: x ? g : 0,
            zIndex: 20,
            width: `${v}px`,
            minWidth: `${v}px`,
            maxWidth: `${v}px`
          } : { width: `${v}px` },
          "aria-label": "확장",
          children: /* @__PURE__ */ r("span", { className: "sr-only", children: "확장" })
        }
      ),
      y.map((t) => {
        const s = J(t, !0), i = (f) => typeof f == "number" ? `${f}px` : f, h = {};
        t.sticky || (t.width && (h.width = i(t.width)), t.minWidth && (h.minWidth = i(t.minWidth)));
        const e = { ...h, ...s.style };
        return t.sortable ? /* @__PURE__ */ r(
          mt,
          {
            sortDirection: ct(t.accessorKey),
            onSort: () => at(t.accessorKey),
            style: e,
            className: k(T(t.align), s.className),
            children: t.header
          },
          String(t.accessorKey)
        ) : /* @__PURE__ */ r(
          F,
          {
            style: e,
            className: k(T(t.align), s.className),
            children: t.header
          },
          String(t.accessorKey)
        );
      })
    ] }) }),
    /* @__PURE__ */ r(vt, { children: E.length === 0 ? /* @__PURE__ */ r(A, { children: /* @__PURE__ */ r(
      N,
      {
        colSpan: G,
        className: "h-24 text-center text-slate-500",
        children: Z
      }
    ) }) : E.map((t) => {
      const s = m.includes(t.id), i = ht(t), h = q(t.id);
      return /* @__PURE__ */ _(u.Fragment, { children: [
        /* @__PURE__ */ _(
          A,
          {
            "data-state": s ? "selected" : void 0,
            className: k(
              o && "cursor-pointer",
              H == null ? void 0 : H(t)
            ),
            onClick: () => o == null ? void 0 : o(t),
            children: [
              x && /* @__PURE__ */ r(
                N,
                {
                  onClick: (e) => e.stopPropagation(),
                  className: R ? s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-50 dark:bg-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-800" : void 0,
                  style: R ? {
                    position: "sticky",
                    left: 0,
                    zIndex: 10,
                    width: `${g}px`,
                    minWidth: `${g}px`,
                    maxWidth: `${g}px`
                  } : { width: `${g}px` },
                  children: /* @__PURE__ */ r(
                    Y,
                    {
                      checked: s,
                      onCheckedChange: () => nt(t.id),
                      "aria-label": `행 ${t.id} 선택`
                    }
                  )
                }
              ),
              a && /* @__PURE__ */ r(
                N,
                {
                  className: k(
                    "p-0",
                    R && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-50 dark:bg-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-800")
                  ),
                  style: R ? {
                    position: "sticky",
                    left: x ? g : 0,
                    zIndex: 10,
                    width: `${v}px`,
                    minWidth: `${v}px`,
                    maxWidth: `${v}px`
                  } : { width: `${v}px` },
                  onClick: (e) => e.stopPropagation(),
                  children: i && /* @__PURE__ */ r(
                    "button",
                    {
                      type: "button",
                      onClick: () => ft(t.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": h ? "행 접기" : "행 펼치기",
                      "aria-expanded": h,
                      children: h ? /* @__PURE__ */ r(Kt, { size: 24 }) : /* @__PURE__ */ r(Nt, { size: 24 })
                    }
                  )
                }
              ),
              y.map((e) => {
                const f = t[e.accessorKey], z = dt(t.id, e.accessorKey), b = J(e, !1, s);
                if (z && e.editable) {
                  const I = e.editComponent || Wt;
                  return /* @__PURE__ */ r(
                    N,
                    {
                      ref: V,
                      className: k(T(e.align), "p-1", b.className),
                      style: b.style,
                      onClick: (D) => D.stopPropagation(),
                      children: /* @__PURE__ */ r(
                        I,
                        {
                          value: tt,
                          onChange: (D) => {
                            P(D), w.current = D, c != null && c.error && $({ ...c, error: void 0 });
                          },
                          onComplete: () => ot(e, t),
                          onCancel: O,
                          row: t,
                          error: c == null ? void 0 : c.error
                        }
                      )
                    },
                    String(e.accessorKey)
                  );
                }
                const L = e.cell ? e.cell(f, t) : String(f ?? "");
                return e.editable && W ? /* @__PURE__ */ r(
                  N,
                  {
                    className: k(
                      T(e.align),
                      "cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                      b.className
                    ),
                    style: b.style,
                    onClick: (I) => {
                      I.stopPropagation(), setTimeout(() => {
                        lt(t.id, e.accessorKey, f);
                      }, 0);
                    },
                    children: L
                  },
                  String(e.accessorKey)
                ) : /* @__PURE__ */ r(
                  N,
                  {
                    className: k(T(e.align), b.className),
                    style: b.style,
                    children: L
                  },
                  String(e.accessorKey)
                );
              })
            ]
          }
        ),
        a && h && /* @__PURE__ */ r(A, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ r(
          N,
          {
            colSpan: G,
            className: "p-4",
            children: a.expandedRowRender(t)
          }
        ) })
      ] }, t.id);
    }) })
  ] });
}
export {
  _t as DataTable
};
//# sourceMappingURL=data-table.mjs.map
