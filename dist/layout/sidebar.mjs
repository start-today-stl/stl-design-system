import { jsxs as N, jsx as s } from "react/jsx-runtime";
import * as k from "react";
import { useState as j } from "react";
import { cn as c } from "../lib/utils.mjs";
import { NavMenu as y } from "./nav-menu.mjs";
const _ = k.forwardRef(
  ({
    className: f,
    logo: e,
    collapsed: n,
    defaultCollapsed: x = !1,
    onCollapsedChange: t,
    collapseMode: i = "mini",
    showToggle: o = !0,
    footer: a,
    children: b,
    ...p
  }, u) => {
    const [h, w] = j(x), m = n !== void 0, r = m ? n : h, v = () => {
      const d = !r;
      m || w(d), t == null || t(d);
    }, l = i === "hidden" && r;
    return /* @__PURE__ */ N(
      "div",
      {
        ref: u,
        className: c(
          "relative flex flex-col h-full pt-4 bg-white dark:bg-black",
          "rounded-r-[40px] border border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all duration-300",
          // hidden 모드
          l && "w-0 -translate-x-full opacity-0 border-0 overflow-hidden",
          // mini 모드 또는 펼쳐진 상태
          !l && (r && i === "mini" ? "w-[88px] px-0 items-center" : "w-[260px] px-6"),
          f
        ),
        ...p,
        children: [
          /* @__PURE__ */ s(
            "div",
            {
              className: c(
                "flex h-16 mb-4 flex-shrink-0",
                r && i === "mini" ? "justify-center items-center" : "justify-start items-center"
              ),
              children: e == null ? void 0 : e(r)
            }
          ),
          /* @__PURE__ */ s(
            y,
            {
              className: "flex-1 min-h-0",
              collapsed: r && i === "mini",
              showToggle: o && i === "mini",
              scrollable: !0,
              onToggle: v,
              children: b
            }
          ),
          !(r && i === "mini") && a && /* @__PURE__ */ s("div", { className: "flex-shrink-0 mb-8", children: a })
        ]
      }
    );
  }
);
_.displayName = "Sidebar";
export {
  _ as Sidebar
};
//# sourceMappingURL=sidebar.mjs.map
