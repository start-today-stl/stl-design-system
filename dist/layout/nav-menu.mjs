import { jsxs as c, jsx as t } from "react/jsx-runtime";
import * as r from "react";
import { cn as a } from "../lib/utils.mjs";
import { IsolationModeIcon as b } from "../icons/IsolationModeIcon.mjs";
const d = r.forwardRef(
  ({ className: n, collapsed: e, showToggle: i = !1, scrollable: l = !1, onToggle: s, children: m, ...f }, x) => /* @__PURE__ */ c(
    "nav",
    {
      ref: x,
      className: a(
        "relative flex flex-col min-h-0",
        e ? "w-[88px] items-center" : "w-[276px]",
        n
      ),
      ...f,
      children: [
        i && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: s,
            className: a(
              "absolute flex items-center justify-center z-20",
              "w-8 h-8 rounded-[20px] border border-gray-100 dark:border-gray-700",
              "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800",
              "transition-colors cursor-pointer",
              e ? "top-[-60px] -right-4" : "top-[-50px] -right-[48px]"
            ),
            "aria-label": e ? "메뉴 펼치기" : "메뉴 접기",
            children: /* @__PURE__ */ t(b, { size: 24, className: "text-gray-500" })
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: a(
              "flex flex-col",
              e ? "items-center gap-0.5 w-full overflow-visible" : "gap-0.5",
              l && !e && "flex-1 min-h-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            ),
            children: r.Children.map(m, (o) => r.isValidElement(o) ? r.cloneElement(o, {
              collapsed: e
            }) : o)
          }
        )
      ]
    }
  )
);
d.displayName = "NavMenu";
export {
  d as NavMenu
};
//# sourceMappingURL=nav-menu.mjs.map
