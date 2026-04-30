import { jsx as n, jsxs as b } from "react/jsx-runtime";
import * as r from "react";
import { cn as a } from "../lib/utils.mjs";
import { MenuVerticalIcon as c } from "../icons/MenuVerticalIcon.mjs";
const p = r.forwardRef(
  ({ className: l, layout: i = "vertical", collapsed: t, showToggle: f = !1, scrollable: u = !1, onToggle: x, children: o, ...s }, m) => i === "horizontal" ? /* @__PURE__ */ n(
    "nav",
    {
      ref: m,
      className: a(
        "flex items-center gap-1",
        l
      ),
      ...s,
      children: r.Children.map(o, (e) => r.isValidElement(e) ? r.cloneElement(e, {
        layout: i
      }) : e)
    }
  ) : /* @__PURE__ */ b(
    "nav",
    {
      ref: m,
      className: a(
        "relative flex flex-col min-h-0 transition-all duration-300",
        t ? "w-[88px] items-center" : "w-full",
        l
      ),
      ...s,
      children: [
        f && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: x,
            className: a(
              "absolute flex items-center justify-center z-20",
              "w-8 h-8 rounded-[20px] border border-slate-100 dark:border-slate-700",
              "bg-white dark:bg-black hover:bg-slate-50 dark:hover:bg-slate-800",
              "transition-all duration-300 cursor-pointer",
              t ? "top-[-48px] -right-4" : "top-[-48px] -right-[40px]"
            ),
            "aria-label": t ? "메뉴 펼치기" : "메뉴 접기",
            children: /* @__PURE__ */ n(c, { size: 24, className: "text-slate-500" })
          }
        ),
        /* @__PURE__ */ n(
          "div",
          {
            className: a(
              "flex flex-col",
              t ? "items-center gap-0.5 w-full px-2 overflow-visible" : "gap-0.5 pb-4",
              u && !t && "flex-1 min-h-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            ),
            children: r.Children.map(o, (e) => r.isValidElement(e) && typeof e.type != "string" ? r.cloneElement(e, {
              collapsed: t,
              layout: i
            }) : e)
          }
        )
      ]
    }
  )
);
p.displayName = "NavMenu";
export {
  p as NavMenu
};
//# sourceMappingURL=nav-menu.mjs.map
