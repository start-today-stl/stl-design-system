import { jsxs as f, jsx as e } from "react/jsx-runtime";
import * as o from "react";
import { cva as h } from "class-variance-authority";
import { cn as s } from "../lib/utils.mjs";
import { RightIcon as p } from "../icons/RightIcon.mjs";
const v = h(
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
), g = o.forwardRef(
  ({
    className: r,
    icon: t,
    label: l,
    active: n,
    depth: i,
    hasChildren: c,
    expanded: d,
    collapsed: a,
    indicator: x,
    _inFlyout: b,
    ...m
  }, u) => a ? /* @__PURE__ */ f(
    "button",
    {
      ref: u,
      className: s(
        v({ active: n, depth: i }),
        "flex-col justify-center items-center w-full h-auto py-2 px-1 gap-1",
        r
      ),
      ...m,
      children: [
        t && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: t }),
        /* @__PURE__ */ e("span", { className: "text-[10px] font-medium leading-tight text-center truncate w-full px-1", children: l })
      ]
    }
  ) : /* @__PURE__ */ f(
    "button",
    {
      ref: u,
      className: s(
        v({ active: n, depth: i }),
        r
      ),
      ...m,
      children: [
        t && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: t }),
        !a && /* @__PURE__ */ e("span", { className: "flex-1 text-left truncate", children: l }),
        x && !a && !c && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: x }),
        c && !a && /* @__PURE__ */ e(
          "span",
          {
            className: s(
              "flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform",
              d && "rotate-90"
            ),
            children: /* @__PURE__ */ e(p, { size: 24 })
          }
        )
      ]
    }
  )
);
g.displayName = "NavItem";
export {
  g as NavItem,
  v as navItemVariants
};
//# sourceMappingURL=nav-item.mjs.map
