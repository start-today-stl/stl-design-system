import { jsxs as f, jsx as e } from "react/jsx-runtime";
import * as t from "react";
import { cn as x } from "../lib/utils.mjs";
const n = t.forwardRef(
  ({ className: d, logo: r, menuButton: s, nav: a, actions: l, children: i, ...c }, m) => /* @__PURE__ */ f(
    "div",
    {
      ref: m,
      className: x(
        "flex items-center gap-4 w-full h-16 px-3 py-4",
        "bg-slate-50 dark:bg-slate-950 backdrop-blur-[16px]",
        "border-b border-slate-200 dark:border-slate-700",
        d
      ),
      ...c,
      children: [
        r && /* @__PURE__ */ e("div", { className: "flex-shrink-0", children: r }),
        s && /* @__PURE__ */ e("div", { className: "flex-shrink-0", children: s }),
        a && /* @__PURE__ */ e("div", { className: "flex items-center flex-shrink-0", children: a }),
        i ? /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: i }) : /* @__PURE__ */ e("div", { className: "flex-1" }),
        l && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 flex-shrink-0", children: l })
      ]
    }
  )
);
n.displayName = "Header";
export {
  n as Header
};
//# sourceMappingURL=header.mjs.map
