import { jsxs as d, jsx as e } from "react/jsx-runtime";
import * as f from "react";
import { cva as h } from "class-variance-authority";
import { cn as r } from "../lib/utils.mjs";
import { RightIcon as p } from "../icons/RightIcon.mjs";
const m = h(
  // 기본: h-9(36px), p-1.5(6px), gap-0.5(2px), rounded-md(6px)
  // 색상: slate-600 → hover:blue-500, bg:transparent → hover:slate-50 → active:blue-100
  "flex items-center gap-0.5 w-full h-9 p-1.5 rounded-md cursor-pointer transition-colors text-sm font-medium tracking-[-0.14px] hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-blue-100 dark:active:bg-blue-100 hover:text-blue-500 dark:hover:text-blue-300 active:text-blue-500 dark:active:text-blue-300 hover:[&_svg]:text-blue-500 dark:hover:[&_svg]:text-blue-300 active:[&_svg]:text-blue-500 dark:active:[&_svg]:text-blue-300",
  {
    variants: {
      active: {
        true: "",
        false: ""
      },
      depth: {
        1: "pl-0",
        2: "pl-6",
        3: "pl-12"
      }
    },
    compoundVariants: [
      // active: false + depth 조합 - 기본 텍스트 색상
      {
        active: !1,
        depth: 1,
        className: "text-slate-800 dark:text-slate-200 [&_svg]:text-slate-800 [&_svg]:dark:text-slate-200"
      },
      {
        active: !1,
        depth: 2,
        className: "text-slate-600 dark:text-slate-300 [&_svg]:text-slate-600 [&_svg]:dark:text-slate-300"
      },
      {
        active: !1,
        depth: 3,
        className: "text-slate-600 dark:text-slate-300 [&_svg]:text-slate-600 [&_svg]:dark:text-slate-300"
      },
      // active: true - 모든 depth에서 파란색
      {
        active: !0,
        className: "text-blue-500 dark:text-blue-300 [&_svg]:text-blue-500 [&_svg]:dark:text-blue-300"
      }
    ],
    defaultVariants: {
      active: !1,
      depth: 1
    }
  }
), b = f.forwardRef(
  ({
    className: i,
    icon: s,
    label: a,
    active: n,
    depth: c,
    hasChildren: l,
    expanded: u,
    collapsed: t,
    indicator: x,
    _inFlyout: g,
    ...o
  }, v) => t && !l ? /* @__PURE__ */ d("div", { className: "relative group", children: [
    /* @__PURE__ */ e(
      "button",
      {
        ref: v,
        className: r(
          m({ active: n, depth: c }),
          "justify-center w-9 px-0",
          i
        ),
        "aria-label": a,
        ...o,
        children: s && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: s })
      }
    ),
    /* @__PURE__ */ e("div", { className: r(
      "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 rounded-md whitespace-nowrap",
      "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700",
      "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
      "transition-all duration-200 z-50",
      "text-sm font-medium text-slate-800 dark:text-slate-200"
    ), children: a })
  ] }) : /* @__PURE__ */ d(
    "button",
    {
      ref: v,
      className: r(
        m({ active: n, depth: c }),
        t && "justify-center w-9 px-0",
        i
      ),
      title: t ? a : void 0,
      "aria-label": t ? a : void 0,
      ...o,
      children: [
        s && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: s }),
        !t && /* @__PURE__ */ e("span", { className: "flex-1 text-left truncate", children: a }),
        x && !t && !l && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: x }),
        l && !t && /* @__PURE__ */ e(
          "span",
          {
            className: r(
              "flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform",
              u && "rotate-90"
            ),
            children: /* @__PURE__ */ e(p, { size: 24 })
          }
        )
      ]
    }
  )
);
b.displayName = "NavItem";
export {
  b as NavItem,
  m as navItemVariants
};
//# sourceMappingURL=nav-item.mjs.map
