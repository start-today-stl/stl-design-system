import { jsx as a, jsxs as i } from "react/jsx-runtime";
import * as l from "react";
import { cn as s } from "../../lib/utils.mjs";
const f = l.forwardRef(
  ({ className: e, style: r, children: o, ...d }, t) => /* @__PURE__ */ a(
    "div",
    {
      ref: t,
      className: s("mx-auto flex w-full flex-col", e),
      style: { maxWidth: "min(90vw, 1800px)", ...r },
      ...d,
      children: o
    }
  )
);
f.displayName = "FormCard";
const c = l.forwardRef(
  ({ className: e, title: r, children: o, ...d }, t) => /* @__PURE__ */ i(
    "div",
    {
      ref: t,
      className: s(
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
c.displayName = "FormHeader";
const x = {
  1: "flex gap-3",
  2: "grid grid-cols-2 gap-3",
  3: "grid grid-cols-3 gap-3"
}, b = l.forwardRef(
  ({ className: e, columns: r = 1, hasHeader: o = !1, hasFooter: d = !0, children: t, ...m }, n) => /* @__PURE__ */ a(
    "div",
    {
      ref: n,
      className: s(
        "border border-border bg-card p-4",
        x[r],
        !o && "rounded-t-2xl",
        !d && "rounded-b-2xl",
        e
      ),
      ...m,
      children: t
    }
  )
);
b.displayName = "FormContent";
const p = l.forwardRef(
  ({ className: e, children: r, ...o }, d) => /* @__PURE__ */ a(
    "div",
    {
      ref: d,
      className: s(
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
p.displayName = "FormColumn";
const u = l.forwardRef(
  ({ className: e, children: r, ...o }, d) => /* @__PURE__ */ a(
    "div",
    {
      ref: d,
      className: s(
        "flex items-center justify-end gap-2",
        "rounded-b-2xl border border-t-0 border-border bg-card px-4 py-2",
        e
      ),
      ...o,
      children: r
    }
  )
);
u.displayName = "FormFooter";
export {
  f as FormCard,
  p as FormColumn,
  b as FormContent,
  u as FormFooter,
  c as FormHeader
};
//# sourceMappingURL=form-card.mjs.map
