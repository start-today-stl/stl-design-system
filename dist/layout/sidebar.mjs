import { jsxs as f, jsx as r } from "react/jsx-runtime";
import * as N from "react";
import { useState as k } from "react";
import { cn as s } from "../lib/utils.mjs";
import { NavMenu as j } from "./nav-menu.mjs";
const _ = N.forwardRef(
  ({
    className: p,
    logo: t,
    collapsed: a,
    defaultCollapsed: x = !1,
    onCollapsedChange: n,
    collapseMode: i = "mini",
    showToggle: o = !0,
    footer: c,
    children: u,
    ...b
  }, h) => {
    const [v, w] = k(x), m = a !== void 0, e = m ? a : v, y = () => {
      const l = !e;
      m || w(l), n == null || n(l);
    }, d = i === "hidden" && e;
    return /* @__PURE__ */ f(
      "div",
      {
        ref: h,
        className: s(
          "relative flex flex-col h-full pt-4 bg-white dark:bg-black",
          "rounded-r-[40px] border border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all duration-300",
          // hidden 모드
          d && "w-0 -translate-x-full opacity-0 border-0 overflow-hidden",
          // mini 모드 또는 펼쳐진 상태
          !d && (e && i === "mini" ? "w-[88px] px-0 items-center" : "w-[260px] px-6"),
          p
        ),
        ...b,
        children: [
          /* @__PURE__ */ f("div", { className: "relative h-16 mb-4 flex-shrink-0 w-full", children: [
            /* @__PURE__ */ r(
              "div",
              {
                className: s(
                  "absolute inset-0 flex justify-center items-center transition-opacity duration-300",
                  e && i === "mini" ? "opacity-100" : "opacity-0 pointer-events-none"
                ),
                children: t == null ? void 0 : t(!0)
              }
            ),
            /* @__PURE__ */ r(
              "div",
              {
                className: s(
                  "absolute inset-0 flex justify-start items-center transition-opacity duration-300",
                  e && i === "mini" ? "opacity-0 pointer-events-none" : "opacity-100"
                ),
                children: t == null ? void 0 : t(!1)
              }
            )
          ] }),
          /* @__PURE__ */ r(
            j,
            {
              className: "flex-1 min-h-0",
              collapsed: e && i === "mini",
              showToggle: o && i === "mini",
              scrollable: !0,
              onToggle: y,
              children: u
            }
          ),
          !(e && i === "mini") && c && /* @__PURE__ */ r("div", { className: "flex-shrink-0 mb-8", children: c })
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
