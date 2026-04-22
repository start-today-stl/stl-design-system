import { jsxs as u, jsx as e } from "react/jsx-runtime";
import * as h from "react";
import { cva as p } from "class-variance-authority";
import { cn as s } from "../lib/utils.mjs";
import { DownIcon as g } from "../icons/DownIcon.mjs";
import { RightIcon as b } from "../icons/RightIcon.mjs";
const v = p(
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
        className: "text-slate-900 dark:text-slate-200 [&_svg]:text-slate-900 [&_svg]:dark:text-slate-200"
      },
      {
        active: !1,
        depth: 2,
        className: "text-slate-700 dark:text-slate-300 [&_svg]:text-slate-700 [&_svg]:dark:text-slate-300"
      },
      {
        active: !1,
        depth: 3,
        className: "text-slate-700 dark:text-slate-300 [&_svg]:text-slate-700 [&_svg]:dark:text-slate-300"
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
), k = h.forwardRef(
  ({
    className: r,
    icon: t,
    label: l,
    active: n,
    depth: m,
    hasChildren: i,
    expanded: d,
    collapsed: a,
    layout: f = "vertical",
    indicator: o,
    _inFlyout: _,
    ...x
  }, c) => f === "horizontal" ? /* @__PURE__ */ u(
    "button",
    {
      ref: c,
      className: s(
        "flex items-center gap-1.5 h-9 px-1.5 rounded-md cursor-pointer transition-colors",
        "text-sm font-medium tracking-[-0.14px]",
        "hover:bg-slate-50 dark:hover:bg-slate-800",
        "hover:text-blue-500 dark:hover:text-blue-300",
        "hover:[&_svg]:text-blue-500 dark:hover:[&_svg]:text-blue-300",
        n ? "text-blue-500 dark:text-blue-300 [&_svg]:text-blue-500 [&_svg]:dark:text-blue-300" : "text-slate-900 dark:text-slate-200 [&_svg]:text-slate-900 [&_svg]:dark:text-slate-200",
        r
      ),
      ...x,
      children: [
        t && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-5 h-5 flex items-center justify-center", children: t }),
        /* @__PURE__ */ e("span", { className: "whitespace-nowrap", children: l }),
        i && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ e(g, { size: 16 }) })
      ]
    }
  ) : a ? /* @__PURE__ */ u(
    "button",
    {
      ref: c,
      className: s(
        v({ active: n, depth: m }),
        "flex-col justify-center items-center w-full h-auto py-2 px-1 gap-1",
        r
      ),
      ...x,
      children: [
        t && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: t }),
        /* @__PURE__ */ e("span", { className: "text-[10px] font-medium leading-tight text-center truncate w-full px-1", children: l })
      ]
    }
  ) : /* @__PURE__ */ u(
    "button",
    {
      ref: c,
      className: s(
        v({ active: n, depth: m }),
        r
      ),
      ...x,
      children: [
        t && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: t }),
        !a && /* @__PURE__ */ e("span", { className: "flex-1 text-left truncate", children: l }),
        o && !a && !i && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: o }),
        i && !a && /* @__PURE__ */ e(
          "span",
          {
            className: s(
              "flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform",
              d && "rotate-90"
            ),
            children: /* @__PURE__ */ e(b, { size: 24 })
          }
        )
      ]
    }
  )
);
k.displayName = "NavItem";
export {
  k as NavItem,
  v as navItemVariants
};
//# sourceMappingURL=nav-item.mjs.map
