import { jsxs as o, jsx as e } from "react/jsx-runtime";
import c from "react";
import { cn as i } from "../../lib/utils.mjs";
const f = c.forwardRef(
  ({ className: a, title: r, children: d, actions: l, ...s }, m) => /* @__PURE__ */ o(
    "div",
    {
      ref: m,
      className: i(
        "w-full bg-card border border-border rounded-2xl overflow-hidden",
        a
      ),
      ...s,
      children: [
        r && /* @__PURE__ */ e("div", { className: "border-b border-border px-6 py-4", children: /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: r }) }),
        /* @__PURE__ */ e("div", { className: "p-6", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between", children: [
          d && /* @__PURE__ */ e("div", { className: "grid flex-1 grid-cols-1 gap-4 md:grid-cols-4", children: d }),
          l && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 pl-4", children: l })
        ] }) })
      ]
    }
  )
);
f.displayName = "SearchForm";
export {
  f as SearchForm
};
//# sourceMappingURL=search-form.mjs.map
