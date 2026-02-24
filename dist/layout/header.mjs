import { jsxs as o, jsx as e } from "react/jsx-runtime";
import * as n from "react";
import { cn as d } from "../lib/utils.mjs";
const p = n.forwardRef(
  ({ className: t, search: l, center: a, actions: r, children: s, ...m }, i) => /* @__PURE__ */ o(
    "div",
    {
      ref: i,
      className: d(
        "relative flex items-center gap-4 w-full h-[72px] px-6 py-4",
        "bg-slate-50 dark:bg-slate-950 backdrop-blur-[16px]",
        t
      ),
      ...m,
      children: [
        /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 h-4 -mb-4 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-950 pointer-events-none" }),
        /* @__PURE__ */ e("div", { className: "flex-1 min-w-[200px] max-w-[593px]", children: l || s }),
        a && /* @__PURE__ */ e("div", { className: "flex items-center flex-1 min-w-0", children: a }),
        r && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 flex-shrink-0 ml-auto", children: r })
      ]
    }
  )
);
p.displayName = "Header";
export {
  p as Header
};
//# sourceMappingURL=header.mjs.map
