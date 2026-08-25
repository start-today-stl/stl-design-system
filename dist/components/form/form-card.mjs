import { jsx as a, jsxs as i } from "react/jsx-runtime";
import * as l from "react";
import { cn as m } from "../../lib/utils.mjs";
const f = {
  sm: "min(90vw, 600px)",
  md: "min(90vw, 900px)",
  lg: "min(90vw, 1400px)",
  xl: "min(90vw, 1800px)"
}, c = l.forwardRef(
  ({ className: e, style: r, size: o = "xl", children: d, ...t }, s) => /* @__PURE__ */ a(
    "div",
    {
      ref: s,
      className: m("mr-auto flex w-full flex-col", e),
      style: { maxWidth: f[o], ...r },
      ...t,
      children: d
    }
  )
);
c.displayName = "FormCard";
const x = l.forwardRef(
  ({ className: e, title: r, children: o, ...d }, t) => /* @__PURE__ */ i(
    "div",
    {
      ref: t,
      className: m(
        "flex items-center justify-between",
        "rounded-t-2xl border border-b-0 border-border",
        "bg-card px-4 py-2",
        e
      ),
      ...d,
      children: [
        r ? /* @__PURE__ */ a("h2", { className: "text-lg font-semibold text-text-primary", children: r }) : null,
        o
      ]
    }
  )
);
x.displayName = "FormHeader";
const p = {
  1: "flex gap-3",
  2: "grid grid-cols-2 gap-3",
  3: "grid grid-cols-3 gap-3"
}, b = l.forwardRef(
  ({ className: e, columns: r = 1, hasHeader: o = !1, hasFooter: d = !0, children: t, ...s }, n) => /* @__PURE__ */ a(
    "div",
    {
      ref: n,
      className: m(
        "border border-border bg-card p-4",
        p[r],
        !o && "rounded-t-2xl",
        !d && "rounded-b-2xl",
        e
      ),
      ...s,
      children: t
    }
  )
);
b.displayName = "FormContent";
const u = l.forwardRef(
  ({ className: e, children: r, ...o }, d) => /* @__PURE__ */ a(
    "div",
    {
      ref: d,
      className: m(
        "flex flex-1 flex-col gap-2",
        // 첫 번째가 아닌 열에 왼쪽 border 추가 (CSS로 처리)
        "[&:not(:first-child)]:border-l [&:not(:first-child)]:border-border [&:not(:first-child)]:pl-3",
        e
      ),
      ...o,
      children: r
    }
  )
);
u.displayName = "FormColumn";
const g = l.forwardRef(
  ({ className: e, children: r, ...o }, d) => /* @__PURE__ */ a(
    "div",
    {
      ref: d,
      className: m(
        "flex items-center justify-end gap-2",
        "rounded-b-2xl border border-t-0 border-border bg-card px-4 py-2",
        e
      ),
      ...o,
      children: r
    }
  )
);
g.displayName = "FormFooter";
export {
  c as FormCard,
  u as FormColumn,
  b as FormContent,
  g as FormFooter,
  x as FormHeader
};
//# sourceMappingURL=form-card.mjs.map
