import { jsxs as N, jsx as s } from "react/jsx-runtime";
import * as k from "react";
import { useState as j } from "react";
import { cn as x } from "../lib/utils.mjs";
import { NavMenu as y } from "./nav-menu.mjs";
const _ = k.forwardRef(
  ({
    className: c,
    logo: e,
    collapsed: n,
    defaultCollapsed: f = !1,
    onCollapsedChange: t,
    collapseMode: i = "mini",
    showToggle: p = !0,
    footer: a,
    children: o,
    ...b
  }, u) => {
    const [h, w] = j(f), m = n !== void 0, r = m ? n : h, v = () => {
      const d = !r;
      m || w(d), t == null || t(d);
    }, l = i === "hidden" && r;
    return /* @__PURE__ */ N(
      "div",
      {
        ref: u,
        className: x(
          "relative flex flex-col h-full bg-white dark:bg-black",
          "pt-8 rounded-r-[40px] border border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all duration-300",
          // hidden 모드
          l && "w-0 -translate-x-full opacity-0 border-0 overflow-hidden",
          // mini 모드 또는 펼쳐진 상태
          !l && (r && i === "mini" ? "w-[88px] px-0 items-center" : "w-[260px] px-6"),
          c
        ),
        ...b,
        children: [
          /* @__PURE__ */ s(
            "div",
            {
              className: x(
                "flex mb-[55px] flex-shrink-0",
                r && i === "mini" ? "justify-center items-center h-[32px]" : "justify-start h-[32px]"
              ),
              children: e == null ? void 0 : e(r)
            }
          ),
          /* @__PURE__ */ s(
            y,
            {
              className: "flex-1 min-h-0",
              collapsed: r && i === "mini",
              showToggle: p && i === "mini",
              scrollable: !0,
              onToggle: v,
              children: o
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
