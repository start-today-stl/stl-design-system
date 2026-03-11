import { jsxs as t, jsx as e } from "react/jsx-runtime";
import * as p from "react";
import { cn as n } from "../lib/utils.mjs";
const o = p.forwardRef(
  ({ className: x, logo: a, menuButton: i, nav: d, search: l, center: r, actions: m, children: s, ...f }, c) => /* @__PURE__ */ t(
    "div",
    {
      ref: c,
      className: n(
        "flex items-center gap-4 w-full h-16 px-3 py-4",
        "bg-slate-50 dark:bg-slate-950 backdrop-blur-[16px]",
        "border-b border-slate-200 dark:border-slate-700",
        x
      ),
      ...f,
      children: [
        a && /* @__PURE__ */ e("div", { className: "flex-shrink-0", children: a }),
        i && /* @__PURE__ */ e("div", { className: "flex-shrink-0", children: i }),
        d && /* @__PURE__ */ e("div", { className: "flex items-center flex-shrink-0", children: d }),
        (l || s) && /* @__PURE__ */ e("div", { className: "flex-1 min-w-[200px] max-w-[593px]", children: l || s }),
        !l && !s && !r && /* @__PURE__ */ e("div", { className: "flex-1" }),
        r && /* @__PURE__ */ e("div", { className: "flex items-center flex-1 min-w-0", children: r }),
        m && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 flex-shrink-0 ml-auto", children: m })
      ]
    }
  )
);
o.displayName = "Header";
export {
  o as Header
};
//# sourceMappingURL=header.mjs.map
