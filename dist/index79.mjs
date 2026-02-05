import { jsxs as w, jsx as e } from "react/jsx-runtime";
import * as y from "react";
import { useState as v } from "react";
import { cn as m } from "./index104.mjs";
import { NavMenu as S } from "./index53.mjs";
import { Notice as k } from "./index55.mjs";
import { NavInfo as j } from "./index51.mjs";
import { STLArrowIcon as _ } from "./index68.mjs";
import { STLSignatureIcon as T } from "./index69.mjs";
const I = y.forwardRef(
  ({
    className: c,
    collapsed: s,
    defaultCollapsed: n = !1,
    onCollapsedChange: t,
    showToggle: p = !0,
    noticeTitle: o,
    noticeDescription: f,
    noticeIcon: x,
    infoItems: i,
    children: d,
    ...b
  }, h) => {
    const [u, N] = v(n), a = s !== void 0, r = a ? s : u, g = () => {
      const l = !r;
      a || N(l), t == null || t(l);
    };
    return /* @__PURE__ */ w(
      "div",
      {
        ref: h,
        className: m(
          "relative flex flex-col h-full bg-white dark:bg-gray-900",
          "pt-8 rounded-r-[40px] border border-gray-100 dark:border-gray-700",
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
              onToggle: g,
              children: d
            }
          ),
          !r && o && /* @__PURE__ */ e(
            k,
            {
              icon: x,
              title: o,
              description: f,
              className: "mb-5 flex-shrink-0"
            }
          ),
          !r && i && i.length > 0 && /* @__PURE__ */ e(j, { items: i, className: "mb-8 flex-shrink-0" })
        ]
      }
    );
  }
);
I.displayName = "Sidebar";
export {
  I as Sidebar
};
//# sourceMappingURL=index79.mjs.map
