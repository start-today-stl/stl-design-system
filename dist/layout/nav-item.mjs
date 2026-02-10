import { jsxs as c, jsx as t } from "react/jsx-runtime";
import * as f from "react";
import { cva as h } from "class-variance-authority";
import { cn as s } from "../lib/utils.mjs";
import { RightIcon as b } from "../icons/RightIcon.mjs";
const d = h(
  // 기본: h-9(36px), p-1.5(6px), gap-0.5(2px), rounded-md(6px)
  // 색상: slate-600 → hover:blue-500, bg:transparent → hover:slate-50 → active:blue-100
  "flex items-center gap-0.5 w-full h-9 p-1.5 rounded-md cursor-pointer transition-colors text-sm font-medium tracking-[-0.14px] hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-blue-100 dark:active:bg-blue-100 hover:text-blue-500 dark:hover:text-blue-300 active:text-blue-500 dark:active:text-blue-300 hover:[&_svg]:text-blue-500 dark:hover:[&_svg]:text-blue-300 active:[&_svg]:text-blue-500 dark:active:[&_svg]:text-blue-300",
  {
    variants: {
      active: {
        true: "text-blue-500 dark:text-blue-300 [&_svg]:text-blue-500 [&_svg]:dark:text-blue-300",
        false: ""
      },
      depth: {
        1: "pl-0 text-slate-800 dark:text-slate-200 [&_svg]:text-slate-800 [&_svg]:dark:text-slate-200",
        2: "pl-6 text-slate-600 dark:text-slate-300 [&_svg]:text-slate-600 [&_svg]:dark:text-slate-300",
        3: "pl-12 text-slate-600 dark:text-slate-300 [&_svg]:text-slate-600 [&_svg]:dark:text-slate-300"
      }
    },
    defaultVariants: {
      active: !1,
      depth: 1
    }
  }
), g = f.forwardRef(
  ({
    className: i,
    icon: r,
    label: a,
    active: n,
    depth: x,
    hasChildren: l,
    expanded: m,
    collapsed: e,
    indicator: o,
    ...u
  }, v) => e && !l ? /* @__PURE__ */ c("div", { className: "relative group", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ref: v,
        className: s(
          d({ active: n, depth: x }),
          "justify-center w-9 px-0",
          i
        ),
        "aria-label": a,
        ...u,
        children: r && /* @__PURE__ */ t("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: r })
      }
    ),
    /* @__PURE__ */ t("div", { className: s(
      "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 rounded-md whitespace-nowrap",
      "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700",
      "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
      "transition-all duration-200 z-50",
      "text-sm font-medium text-slate-800 dark:text-slate-200"
    ), children: a })
  ] }) : /* @__PURE__ */ c(
    "button",
    {
      ref: v,
      className: s(
        d({ active: n, depth: x }),
        e && "justify-center w-9 px-0",
        i
      ),
      title: e ? a : void 0,
      "aria-label": e ? a : void 0,
      ...u,
      children: [
        r && /* @__PURE__ */ t("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: r }),
        !e && /* @__PURE__ */ t("span", { className: "flex-1 text-left truncate", children: a }),
        o && !e && !l && /* @__PURE__ */ t("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: o }),
        l && !e && /* @__PURE__ */ t(
          "span",
          {
            className: s(
              "flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform",
              m && "rotate-90"
            ),
            children: /* @__PURE__ */ t(b, { size: 24 })
          }
        )
      ]
    }
  )
);
g.displayName = "NavItem";
export {
  g as NavItem,
  d as navItemVariants
};
//# sourceMappingURL=nav-item.mjs.map
