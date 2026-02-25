import { jsx as t, jsxs as f } from "react/jsx-runtime";
import * as a from "react";
import { cn as l } from "../../lib/utils.mjs";
const i = a.forwardRef(
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
i.displayName = "FormCard";
const c = a.forwardRef(
  ({ className: e, title: r, children: o, ...d }, s) => /* @__PURE__ */ f(
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
const b = a.forwardRef(
  ({ className: e, columns: r = 1, hasHeader: o = !1, hasFooter: d = !0, children: s, ...m }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: l(
        "border border-border bg-card p-4",
        // columns=2일 때 grid 레이아웃 사용 (col-span 지원)
        r === 2 ? "grid grid-cols-2 gap-3" : "flex gap-3",
        !o && "rounded-t-2xl",
        !d && "rounded-b-2xl",
        e
      ),
      ...m,
      children: s
    }
  )
);
b.displayName = "FormContent";
const p = a.forwardRef(
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
p.displayName = "FormColumn";
const x = a.forwardRef(
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
x.displayName = "FormFooter";
export {
  i as FormCard,
  p as FormColumn,
  b as FormContent,
  x as FormFooter,
  c as FormHeader
};
//# sourceMappingURL=form-card.mjs.map
