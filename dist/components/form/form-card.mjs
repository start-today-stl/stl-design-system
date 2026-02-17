import { jsx as t, jsxs as f } from "react/jsx-runtime";
import * as a from "react";
import { cn as l } from "../../lib/utils.mjs";
const c = a.forwardRef(
  ({ className: r, children: e, ...o }, d) => /* @__PURE__ */ t(
    "div",
    {
      ref: d,
      className: l("flex flex-col", r),
      ...o,
      children: e
    }
  )
);
c.displayName = "FormCard";
const i = a.forwardRef(
  ({ className: r, title: e, children: o, ...d }, s) => /* @__PURE__ */ f(
    "div",
    {
      ref: s,
      className: l(
        "flex items-center justify-between",
        "rounded-t-2xl border border-b-0 border-border",
        "bg-card px-4 py-2",
        r
      ),
      ...d,
      children: [
        e ? /* @__PURE__ */ t("h2", { className: "text-lg font-semibold text-text-primary", children: e }) : null,
        o
      ]
    }
  )
);
i.displayName = "FormHeader";
const b = a.forwardRef(
  ({ className: r, columns: e = 1, hasHeader: o = !1, hasFooter: d = !0, children: s, ...m }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: l(
        "flex gap-3 border border-border bg-card p-4",
        !o && "rounded-t-2xl",
        !d && "rounded-b-2xl",
        r
      ),
      ...m,
      children: s
    }
  )
);
b.displayName = "FormContent";
const x = a.forwardRef(
  ({ className: r, children: e, ...o }, d) => /* @__PURE__ */ t(
    "div",
    {
      ref: d,
      className: l(
        "flex flex-1 flex-col gap-2",
        // 첫 번째가 아닌 열에 왼쪽 border 추가 (CSS로 처리)
        "[&:not(:first-child)]:border-l [&:not(:first-child)]:border-border [&:not(:first-child)]:pl-3",
        r
      ),
      ...o,
      children: e
    }
  )
);
x.displayName = "FormColumn";
const p = a.forwardRef(
  ({ className: r, children: e, ...o }, d) => /* @__PURE__ */ t(
    "div",
    {
      ref: d,
      className: l(
        "flex items-center justify-end gap-2",
        "rounded-b-2xl border border-t-0 border-border bg-card px-4 py-2",
        r
      ),
      ...o,
      children: e
    }
  )
);
p.displayName = "FormFooter";
export {
  c as FormCard,
  x as FormColumn,
  b as FormContent,
  p as FormFooter,
  i as FormHeader
};
//# sourceMappingURL=form-card.mjs.map
