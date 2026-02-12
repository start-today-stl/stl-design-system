import { jsxs as _, jsx as r } from "react/jsx-runtime";
import * as u from "react";
import { cn as k } from "../../lib/utils.mjs";
import { Table as bt, TableHeader as kt, TableRow as A, TableHead as F, TableSortableHead as mt, TableBody as Et, TableCell as N } from "./table.mjs";
import { Checkbox as Y } from "../ui/checkbox.mjs";
import { Input as vt } from "../ui/input.mjs";
import { DownIcon as Kt } from "../../icons/DownIcon.mjs";
import { RightIcon as Nt } from "../../icons/RightIcon.mjs";
function Wt({
  value: y,
  onChange: v,
  onComplete: x,
  onCancel: m,
  error: l
}) {
  const o = u.useRef(null);
  u.useEffect(() => {
    var d, W;
    (d = o.current) == null || d.focus(), (W = o.current) == null || W.select();
  }, []);
  const K = (d) => {
    d.key === "Enter" ? (d.preventDefault(), x()) : d.key === "Escape" && (d.preventDefault(), m());
  };
  return /* @__PURE__ */ _("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ r(
      vt,
      {
        ref: o,
        value: String(y ?? ""),
        onChange: (d) => v(d.target.value),
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
  data: v,
  selectable: x = !1,
  selectedIds: m = [],
  onSelectionChange: l,
  sortState: o,
  onSortChange: K,
  onRowClick: d,
  onCellChange: W,
  expandable: c,
  emptyMessage: Z = "데이터가 없습니다.",
  className: S,
  rowClassName: H,
  maxHeight: C
}) {
  const [a, $] = u.useState(null), [tt, P] = u.useState(null), w = u.useRef(null), V = u.useRef(null), [et, st] = u.useState(
    (c == null ? void 0 : c.defaultExpandedRowIds) ?? []
  ), j = (c == null ? void 0 : c.expandedRowIds) ?? et, X = (c == null ? void 0 : c.onExpandedChange) ?? st, M = v.length > 0 && m.length === v.length, rt = m.length > 0 && !M, it = () => {
    M ? l == null || l([]) : l == null || l(v.map((t) => t.id));
  }, nt = (t) => {
    m.includes(t) ? l == null || l(m.filter((s) => s !== t)) : l == null || l([...m, t]);
  }, ct = (t) => {
    K && ((o == null ? void 0 : o.column) === t ? o.direction === "asc" ? K({ column: t, direction: "desc" }) : o.direction === "desc" ? K({ column: null, direction: null }) : K({ column: t, direction: "asc" }) : K({ column: t, direction: "asc" }));
  }, at = (t) => (o == null ? void 0 : o.column) === t ? o.direction : null, T = (t) => {
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
  }, dt = (t, s) => {
    const i = w.current;
    if (!a || i === null) {
      $(null), P(null), w.current = null;
      return;
    }
    if (t.validate) {
      const f = t.validate(i, s);
      if (f !== !0) {
        $({ ...a, error: f });
        return;
      }
    }
    W && W(a.rowId, a.columnKey, i), $(null), P(null), w.current = null;
  }, O = u.useCallback(() => {
    $(null), P(null), w.current = null;
  }, []);
  u.useEffect(() => {
    if (!a) return;
    const t = (s) => {
      var e, h;
      const i = s.target;
      (e = V.current) != null && e.contains(i) || (h = i.closest) != null && h.call(i, "[data-radix-popper-content-wrapper]") || O();
    };
    return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
  }, [a, O]);
  const ot = (t, s) => (a == null ? void 0 : a.rowId) === t && (a == null ? void 0 : a.columnKey) === s, ft = (t) => c ? c.rowExpandable ? c.rowExpandable(t) : !0 : !1, q = (t) => j.includes(t), ht = (t) => {
    q(t) ? X(j.filter((s) => s !== t)) : X([...j, t]);
  }, G = y.length + (x ? 1 : 0) + (c ? 1 : 0), J = u.useMemo(() => {
    const t = (n) => {
      const g = n.width ?? n.minWidth;
      return typeof g == "number" ? g : parseInt(String(g) || "150", 10);
    }, s = y.filter((n) => n.sticky === "left"), i = y.filter((n) => n.sticky === "right"), h = (x ? 48 : 0) + (c ? 40 : 0), z = /* @__PURE__ */ new Map();
    let b = h;
    for (const n of s)
      z.set(n.accessorKey, b), b += t(n);
    const L = /* @__PURE__ */ new Map();
    let I = 0;
    for (let n = i.length - 1; n >= 0; n--) {
      const g = i[n];
      L.set(g.accessorKey, I), I += t(g);
    }
    const D = s.length > 0 ? s[s.length - 1].accessorKey : null, ut = i.length > 0 ? i[0].accessorKey : null;
    return (n, g, Q) => {
      if (!n.sticky) return { style: {}, className: "" };
      const pt = n.accessorKey === D, gt = n.accessorKey === ut, B = `${t(n)}px`, U = {
        position: "sticky",
        zIndex: g ? 20 : 10,
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
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: k(
            "transition-colors",
            g ? "bg-[#eaedf1] dark:bg-slate-800" : Q ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
            pt && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
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
          g ? "bg-[#eaedf1] dark:bg-slate-800" : Q ? "bg-blue-50 dark:bg-blue-900" : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
          gt && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        )
      };
    };
  }, [y, x, c]), R = y.some((t) => t.sticky === "left"), p = 48, E = 40;
  return /* @__PURE__ */ _(bt, { className: S, maxHeight: C, children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ _(A, { children: [
      x && /* @__PURE__ */ r(
        F,
        {
          className: "bg-[#eaedf1] dark:bg-slate-800",
          style: R ? {
            position: "sticky",
            left: 0,
            zIndex: 20,
            width: `${p}px`,
            minWidth: `${p}px`,
            maxWidth: `${p}px`
          } : { width: `${p}px` },
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
      c && /* @__PURE__ */ r(
        F,
        {
          className: "bg-[#eaedf1] dark:bg-slate-800",
          style: R ? {
            position: "sticky",
            left: x ? p : 0,
            zIndex: 20,
            width: `${E}px`,
            minWidth: `${E}px`,
            maxWidth: `${E}px`
          } : { width: `${E}px` },
          "aria-label": "확장",
          children: /* @__PURE__ */ r("span", { className: "sr-only", children: "확장" })
        }
      ),
      y.map((t) => {
        const s = J(t, !0), i = (h) => typeof h == "number" ? `${h}px` : h, f = {};
        t.sticky || (t.width && (f.width = i(t.width)), t.minWidth && (f.minWidth = i(t.minWidth)));
        const e = { ...f, ...s.style };
        return t.sortable ? /* @__PURE__ */ r(
          mt,
          {
            sortDirection: at(t.accessorKey),
            onSort: () => ct(t.accessorKey),
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
    /* @__PURE__ */ r(Et, { children: v.length === 0 ? /* @__PURE__ */ r(A, { children: /* @__PURE__ */ r(
      N,
      {
        colSpan: G,
        className: "h-24 text-center text-slate-500",
        children: Z
      }
    ) }) : v.map((t) => {
      const s = m.includes(t.id), i = ft(t), f = q(t.id);
      return /* @__PURE__ */ _(u.Fragment, { children: [
        /* @__PURE__ */ _(
          A,
          {
            "data-state": s ? "selected" : void 0,
            className: k(
              d && "cursor-pointer",
              H == null ? void 0 : H(t)
            ),
            onClick: () => d == null ? void 0 : d(t),
            children: [
              x && /* @__PURE__ */ r(
                N,
                {
                  onClick: (e) => e.stopPropagation(),
                  className: R ? s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700" : void 0,
                  style: R ? {
                    position: "sticky",
                    left: 0,
                    zIndex: 10,
                    width: `${p}px`,
                    minWidth: `${p}px`,
                    maxWidth: `${p}px`
                  } : { width: `${p}px` },
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
              c && /* @__PURE__ */ r(
                N,
                {
                  className: k(
                    "p-0",
                    R && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
                  ),
                  style: R ? {
                    position: "sticky",
                    left: x ? p : 0,
                    zIndex: 10,
                    width: `${E}px`,
                    minWidth: `${E}px`,
                    maxWidth: `${E}px`
                  } : { width: `${E}px` },
                  onClick: (e) => e.stopPropagation(),
                  children: i && /* @__PURE__ */ r(
                    "button",
                    {
                      type: "button",
                      onClick: () => ht(t.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": f ? "행 접기" : "행 펼치기",
                      "aria-expanded": f,
                      children: f ? /* @__PURE__ */ r(Kt, { size: 24 }) : /* @__PURE__ */ r(Nt, { size: 24 })
                    }
                  )
                }
              ),
              y.map((e) => {
                const h = t[e.accessorKey], z = ot(t.id, e.accessorKey), b = J(e, !1, s);
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
                            P(D), w.current = D, a != null && a.error && $({ ...a, error: void 0 });
                          },
                          onComplete: () => dt(e, t),
                          onCancel: O,
                          row: t,
                          error: a == null ? void 0 : a.error
                        }
                      )
                    },
                    String(e.accessorKey)
                  );
                }
                const L = e.cell ? e.cell(h, t) : String(h ?? "");
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
                        lt(t.id, e.accessorKey, h);
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
        c && f && /* @__PURE__ */ r(A, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ r(
          N,
          {
            colSpan: G,
            className: "p-4",
            children: c.expandedRowRender(t)
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
