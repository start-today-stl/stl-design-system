import { jsxs as v, jsx as s } from "react/jsx-runtime";
import * as w from "react";
import { useState as N } from "react";
import { cn as x } from "../lib/utils.mjs";
import { NavMenu as k } from "./nav-menu.mjs";
const j = w.forwardRef(
  ({
    className: m,
    logo: r,
    collapsed: a,
    defaultCollapsed: n = !1,
    onCollapsedChange: t,
    showToggle: d = !0,
    footer: i,
    children: p,
    ...f
  }, o) => {
    const [b, u] = N(n), l = a !== void 0, e = l ? a : b, h = () => {
      const c = !e;
      l || u(c), t == null || t(c);
    };
    return /* @__PURE__ */ v(
      "div",
      {
        ref: o,
        className: x(
          "relative flex flex-col h-full bg-white dark:bg-black",
          "pt-8 rounded-r-[40px] border border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all",
          e ? "w-[88px] px-0 items-center" : "w-[260px] px-6",
          m
        ),
        ...f,
        children: [
          /* @__PURE__ */ s(
            "div",
            {
              className: x(
                "flex mb-[55px] flex-shrink-0",
                e ? "justify-center items-center h-[32px]" : "justify-start h-[32px]"
              ),
              children: r == null ? void 0 : r(e)
            }
          ),
          /* @__PURE__ */ s(
            k,
            {
              className: "flex-1 min-h-0",
              collapsed: e,
              showToggle: d,
              scrollable: !0,
              onToggle: h,
              children: p
            }
          ),
          !e && i && /* @__PURE__ */ s("div", { className: "flex-shrink-0 mb-8", children: i })
        ]
      }
    );
  }
);
j.displayName = "Sidebar";
export {
  j as Sidebar
};
//# sourceMappingURL=sidebar.mjs.map
