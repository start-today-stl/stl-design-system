import { jsxs as v, jsx as t } from "react/jsx-runtime";
import * as w from "react";
import { useState as N } from "react";
import { cn as o } from "../lib/utils.mjs";
import { NavMenu as k } from "./nav-menu.mjs";
const j = w.forwardRef(
  ({
    className: m,
    logo: s,
    collapsed: l,
    defaultCollapsed: n = !1,
    onCollapsedChange: r,
    showToggle: x = !0,
    footer: a,
    children: d,
    ...p
  }, f) => {
    const [b, u] = N(n), i = l !== void 0, e = i ? l : b, h = () => {
      const c = !e;
      i || u(c), r == null || r(c);
    };
    return /* @__PURE__ */ v(
      "div",
      {
        ref: f,
        className: o(
          "relative flex flex-col h-full bg-white dark:bg-black",
          "pt-8 rounded-r-[40px] border border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all",
          e ? "w-[88px] px-0 items-center" : "w-[260px] px-6",
          m
        ),
        ...p,
        children: [
          s && /* @__PURE__ */ t(
            "div",
            {
              className: o(
                "flex mb-[55px] flex-shrink-0",
                e ? "justify-center items-center h-[32px]" : "justify-start"
              ),
              children: s(e)
            }
          ),
          /* @__PURE__ */ t(
            k,
            {
              className: "flex-1 min-h-0",
              collapsed: e,
              showToggle: x,
              scrollable: !0,
              onToggle: h,
              children: d
            }
          ),
          !e && a && /* @__PURE__ */ t("div", { className: "flex-shrink-0 mb-8", children: a })
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
