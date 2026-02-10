import { jsxs as g, jsx as e } from "react/jsx-runtime";
import * as k from "react";
import { useState as v } from "react";
import { cn as m } from "../lib/utils.mjs";
import { NavMenu as S } from "./nav-menu.mjs";
import { Notice as j } from "./notice.mjs";
import { NavInfo as y } from "./nav-info.mjs";
import { STLArrowIcon as _ } from "../icons/STLArrowIcon.mjs";
import { STLSignatureIcon as T } from "../icons/STLSignatureIcon.mjs";
const I = k.forwardRef(
  ({
    className: c,
    collapsed: i,
    defaultCollapsed: n = !1,
    onCollapsedChange: t,
    showToggle: p = !0,
    noticeTitle: o,
    noticeDescription: f,
    noticeIcon: x,
    infoItems: s,
    children: d,
    ...b
  }, h) => {
    const [u, N] = v(n), a = i !== void 0, r = a ? i : u, w = () => {
      const l = !r;
      a || N(l), t == null || t(l);
    };
    return /* @__PURE__ */ g(
      "div",
      {
        ref: h,
        className: m(
          "relative flex flex-col h-full bg-white dark:bg-black",
          "pt-8 rounded-r-[40px] border border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all",
          r ? "w-[88px] px-0 items-center" : "w-[340px] px-8",
          c
        ),
        ...b,
        children: [
          /* @__PURE__ */ e(
            "div",
            {
              className: m(
                "h-[32px] flex items-center mb-[55px] flex-shrink-0",
                r ? "justify-center" : "justify-start"
              ),
              children: r ? /* @__PURE__ */ e(_, { size: 36, className: "text-primary" }) : /* @__PURE__ */ e(T, { width: 161, height: 28 })
            }
          ),
          /* @__PURE__ */ e(
            S,
            {
              className: "flex-1 min-h-0",
              collapsed: r,
              showToggle: p,
              scrollable: !0,
              onToggle: w,
              children: d
            }
          ),
          !r && o && /* @__PURE__ */ e(
            j,
            {
              icon: x,
              title: o,
              description: f,
              className: "mb-5 flex-shrink-0"
            }
          ),
          !r && s && s.length > 0 && /* @__PURE__ */ e(y, { items: s, className: "mb-8 flex-shrink-0" })
        ]
      }
    );
  }
);
I.displayName = "Sidebar";
export {
  I as Sidebar
};
//# sourceMappingURL=sidebar.mjs.map
