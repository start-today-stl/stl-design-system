import { jsxs as c, jsx as r } from "react/jsx-runtime";
import * as p from "react";
import { cva as l } from "./index103.mjs";
import { cn as i } from "./index104.mjs";
import { RightIcon as f } from "./index67.mjs";
const d = l(
  // 기본: h-9(36px), p-1.5(6px), gap-0.5(2px), rounded-md(6px)
  // 색상: gray-600 → hover:primary, bg:transparent → hover:cool-50 → active:primary-200
  "flex items-center gap-0.5 w-full h-9 p-1.5 rounded-md cursor-pointer transition-colors text-sm font-medium tracking-[-0.14px] hover:bg-cool-50 dark:hover:bg-dark-400 active:bg-primary-200 dark:active:bg-primary-200 hover:text-primary dark:hover:text-primary-300 active:text-primary dark:active:text-primary-300 hover:[&_svg]:text-primary dark:hover:[&_svg]:text-primary-300 active:[&_svg]:text-primary dark:active:[&_svg]:text-primary-300",
  {
    variants: {
      active: {
        true: "text-primary dark:text-primary-300 [&_svg]:text-primary [&_svg]:dark:text-primary-300",
        false: ""
      },
      depth: {
        1: "pl-0 text-gray-600 dark:text-gray-300 [&_svg]:text-gray-600 [&_svg]:dark:text-gray-300",
        2: "pl-6 text-gray-500 dark:text-gray-400 [&_svg]:text-gray-500 [&_svg]:dark:text-gray-400",
        3: "pl-12 text-gray-500 dark:text-gray-400 [&_svg]:text-gray-500 [&_svg]:dark:text-gray-400"
      }
    },
    defaultVariants: {
      active: !1,
      depth: 1
    }
  }
), h = p.forwardRef(
  ({
    className: n,
    icon: a,
    label: e,
    active: m,
    depth: x,
    hasChildren: s,
    expanded: v,
    collapsed: t,
    indicator: o,
    ...g
  }, y) => t && !s ? /* @__PURE__ */ c("div", { className: "relative group", children: [
    /* @__PURE__ */ r(
      "button",
      {
        ref: y,
        className: i(
          d({ active: m, depth: x }),
          "justify-center w-9 px-0",
          n
        ),
        "aria-label": e,
        ...g,
        children: a && /* @__PURE__ */ r("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: a })
      }
    ),
    /* @__PURE__ */ r("div", { className: i(
      "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 rounded-md whitespace-nowrap",
      "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700",
      "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
      "transition-all duration-200 z-50",
      "text-sm font-medium text-gray-600 dark:text-gray-300"
    ), children: e })
  ] }) : /* @__PURE__ */ c(
    "button",
    {
      ref: y,
      className: i(
        d({ active: m, depth: x }),
        t && "justify-center w-9 px-0",
        n
      ),
      title: t ? e : void 0,
      "aria-label": t ? e : void 0,
      ...g,
      children: [
        a && /* @__PURE__ */ r("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: a }),
        !t && /* @__PURE__ */ r("span", { className: "flex-1 text-left truncate", children: e }),
        o && !t && !s && /* @__PURE__ */ r("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: o }),
        s && !t && /* @__PURE__ */ r(
          "span",
          {
            className: i(
              "flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform",
              v && "rotate-90"
            ),
            children: /* @__PURE__ */ r(f, { size: 24 })
          }
        )
      ]
    }
  )
);
h.displayName = "NavItem";
export {
  h as NavItem,
  d as navItemVariants
};
//# sourceMappingURL=index52.mjs.map
