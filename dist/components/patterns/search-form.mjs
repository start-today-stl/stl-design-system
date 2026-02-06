import { jsxs as l, jsx as e } from "react/jsx-runtime";
import i from "react";
import { cn as o } from "../../lib/utils.mjs";
import { Card as t, CardHeader as f, CardTitle as p, CardContent as n } from "../ui/card.mjs";
const x = i.forwardRef(
  ({ className: m, title: r, children: a, actions: d, ...s }, c) => /* @__PURE__ */ l(t, { ref: c, className: o("w-full bg-card", m), ...s, children: [
    r && /* @__PURE__ */ e(f, { className: "border-b px-6 py-4", children: /* @__PURE__ */ e(p, { className: "text-lg", children: r }) }),
    /* @__PURE__ */ e(n, { className: "p-6", children: /* @__PURE__ */ l("div", { className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between", children: [
      a && /* @__PURE__ */ e("div", { className: "grid flex-1 grid-cols-1 gap-4 md:grid-cols-4", children: a }),
      d && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 pl-4", children: d })
    ] }) })
  ] })
);
x.displayName = "SearchForm";
export {
  x as SearchForm
};
//# sourceMappingURL=search-form.mjs.map
