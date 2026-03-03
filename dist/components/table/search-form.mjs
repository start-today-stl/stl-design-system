import { jsxs as s, jsx as e } from "react/jsx-runtime";
import f from "react";
import { cn as a } from "../../lib/utils.mjs";
const n = f.forwardRef(
  ({ className: i, title: r, children: d, actions: l, layout: o = "grid", ...m }, c) => /* @__PURE__ */ s(
    "div",
    {
      ref: c,
      className: a(
        "w-full bg-card border border-border rounded-2xl overflow-hidden",
        i
      ),
      ...m,
      children: [
        r && /* @__PURE__ */ e("div", { className: "border-b border-border px-6 py-4", children: /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: r }) }),
        /* @__PURE__ */ e("div", { className: "p-6", children: /* @__PURE__ */ s("div", { className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between", children: [
          d && /* @__PURE__ */ e(
            "div",
            {
              className: a(
                "flex-1 gap-4",
                o === "grid" ? "grid grid-cols-1 md:grid-cols-4" : "flex flex-wrap items-end"
              ),
              children: d
            }
          ),
          l && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 pl-4 shrink-0", children: l })
        ] }) })
      ]
    }
  )
);
n.displayName = "SearchForm";
export {
  n as SearchForm
};
//# sourceMappingURL=search-form.mjs.map
