import { jsx as t, jsxs as i } from "react/jsx-runtime";
import * as a from "react";
import { cn as l } from "../../lib/utils.mjs";
const f = a.forwardRef(
  ({ className: e, children: r, ...o }, d) => /* @__PURE__ */ t(
    "div",
    {
      ref: d,
      className: l("flex flex-col", e),
      ...o,
      children: r
    }
  )
);
f.displayName = "FormCard";
const c = a.forwardRef(
  ({ className: e, title: r, children: o, ...d }, s) => /* @__PURE__ */ i(
    "div",
    {
      ref: s,
      className: l(
        "flex items-center justify-between",
        "rounded-t-2xl border border-b-0 border-border",
        "bg-card px-4 py-2",
        e
      ),
      ...d,
      children: [
        r ? /* @__PURE__ */ t("h2", { className: "text-lg font-semibold text-text-primary", children: r }) : null,
        o
      ]
    }
  )
);
c.displayName = "FormHeader";
const b = {
  1: "flex gap-3",
  2: "grid grid-cols-2 gap-3",
  3: "grid grid-cols-3 gap-3"
}, p = a.forwardRef(
  ({ className: e, columns: r = 1, hasHeader: o = !1, hasFooter: d = !0, children: s, ...n }, m) => /* @__PURE__ */ t(
    "div",
    {
      ref: m,
      className: l(
        "border border-border bg-card p-4",
        b[r],
        !o && "rounded-t-2xl",
        !d && "rounded-b-2xl",
        e
      ),
      ...n,
      children: s
    }
  )
);
p.displayName = "FormContent";
const x = a.forwardRef(
  ({ className: e, children: r, ...o }, d) => /* @__PURE__ */ t(
    "div",
    {
      ref: d,
      className: l(
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
x.displayName = "FormColumn";
const u = a.forwardRef(
  ({ className: e, children: r, ...o }, d) => /* @__PURE__ */ t(
    "div",
    {
      ref: d,
      className: l(
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
  x as FormColumn,
  p as FormContent,
  u as FormFooter,
  c as FormHeader
};
//# sourceMappingURL=form-card.mjs.map
