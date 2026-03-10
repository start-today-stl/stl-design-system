import { jsx as n, jsxs as b } from "react/jsx-runtime";
import * as r from "react";
import { cn as l } from "../lib/utils.mjs";
import { MenuVerticalIcon as u } from "../icons/MenuVerticalIcon.mjs";
const d = r.forwardRef(
  ({ className: i, layout: a = "vertical", collapsed: t, showToggle: f = !1, scrollable: c = !1, onToggle: x, children: o, ...s }, m) => a === "horizontal" ? /* @__PURE__ */ n(
    "nav",
    {
      ref: m,
      className: l(
        "flex items-center gap-1",
        i
      ),
      ...s,
      children: r.Children.map(o, (e) => r.isValidElement(e) ? r.cloneElement(e, {
        layout: a
      }) : e)
    }
  ) : /* @__PURE__ */ b(
    "nav",
    {
      ref: m,
      className: l(
        "relative flex flex-col min-h-0",
        t ? "w-[88px] items-center" : "w-full",
        i
      ),
      ...s,
      children: [
        f && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: x,
            className: l(
              "absolute flex items-center justify-center z-20",
              "w-8 h-8 rounded-[20px] border border-slate-100 dark:border-slate-700",
              "bg-white dark:bg-black hover:bg-slate-50 dark:hover:bg-slate-800",
              "transition-colors cursor-pointer",
              t ? "top-[-60px] -right-4" : "top-[-50px] -right-[40px]"
            ),
            "aria-label": t ? "메뉴 펼치기" : "메뉴 접기",
            children: /* @__PURE__ */ n(u, { size: 24, className: "text-slate-500" })
          }
        ),
        /* @__PURE__ */ n(
          "div",
          {
            className: l(
              "flex flex-col",
              t ? "items-center gap-0.5 w-full px-2 overflow-visible" : "gap-0.5",
              c && !t && "flex-1 min-h-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            ),
            children: r.Children.map(o, (e) => r.isValidElement(e) ? r.cloneElement(e, {
              collapsed: t,
              layout: a
            }) : e)
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
