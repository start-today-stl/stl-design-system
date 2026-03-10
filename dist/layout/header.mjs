import { jsxs as x, jsx as e } from "react/jsx-runtime";
import * as c from "react";
import { cn as o } from "../lib/utils.mjs";
const p = c.forwardRef(
  ({ className: d, logo: r, menuButton: i, nav: t, search: a, center: l, actions: m, children: s, ...f }, n) => /* @__PURE__ */ x(
    "div",
    {
      ref: n,
      className: o(
        "relative flex items-center gap-4 w-full h-16 px-6 py-4",
        "bg-slate-50 dark:bg-slate-950 backdrop-blur-[16px]",
        d
      ),
      ...f,
      children: [
        /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-950 pointer-events-none" }),
        r && /* @__PURE__ */ e("div", { className: "flex-shrink-0", children: r }),
        i && /* @__PURE__ */ e("div", { className: "flex-shrink-0", children: i }),
        t && /* @__PURE__ */ e("div", { className: "flex items-center flex-shrink-0", children: t }),
        (a || s) && /* @__PURE__ */ e("div", { className: "flex-1 min-w-[200px] max-w-[593px]", children: a || s }),
        !a && !s && !l && /* @__PURE__ */ e("div", { className: "flex-1" }),
        l && /* @__PURE__ */ e("div", { className: "flex items-center flex-1 min-w-0", children: l }),
        m && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 flex-shrink-0 ml-auto", children: m })
      ]
    }
  )
);
p.displayName = "Header";
export {
  p as Header
};
//# sourceMappingURL=header.mjs.map
