import { jsxs as b, jsx as o } from "react/jsx-runtime";
import * as r from "react";
import { cn as l } from "../lib/utils.mjs";
import { MenuVerticalIcon as x } from "../icons/MenuVerticalIcon.mjs";
const u = r.forwardRef(
  ({ className: a, collapsed: e, showToggle: n = !1, scrollable: i = !1, onToggle: s, children: f, ...m }, c) => /* @__PURE__ */ b(
    "nav",
    {
      ref: c,
      className: l(
        "relative flex flex-col min-h-0",
        e ? "w-[88px] items-center" : "w-full",
        a
      ),
      ...m,
      children: [
        n && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: s,
            className: l(
              "absolute flex items-center justify-center z-20",
              "w-8 h-8 rounded-[20px] border border-slate-100 dark:border-slate-700",
              "bg-white dark:bg-black hover:bg-slate-50 dark:hover:bg-slate-800",
              "transition-colors cursor-pointer",
              e ? "top-[-60px] -right-4" : "top-[-50px] -right-[40px]"
            ),
            "aria-label": e ? "메뉴 펼치기" : "메뉴 접기",
            children: /* @__PURE__ */ o(x, { size: 24, className: "text-slate-500" })
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            className: l(
              "flex flex-col",
              e ? "items-center gap-0.5 w-full overflow-visible" : "gap-0.5",
              i && !e && "flex-1 min-h-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            ),
            children: r.Children.map(f, (t) => r.isValidElement(t) ? r.cloneElement(t, {
              collapsed: e
            }) : t)
          }
        )
      ]
    }
  )
);
u.displayName = "NavMenu";
export {
  u as NavMenu
};
//# sourceMappingURL=nav-menu.mjs.map
