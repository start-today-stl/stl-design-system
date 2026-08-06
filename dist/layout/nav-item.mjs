import { jsxs as x, Fragment as o, jsx as e } from "react/jsx-runtime";
import * as N from "react";
import { cva as w } from "class-variance-authority";
import { cn as r } from "../lib/utils.mjs";
import { DownIcon as y } from "../icons/DownIcon.mjs";
import { RightIcon as j } from "../icons/RightIcon.mjs";
const h = w(
  // 기본: h-9(36px), p-1.5(6px), gap-0.5(2px), rounded-md(6px)
  // 색상: slate-600 → hover:blue-500, bg:transparent → hover:slate-50 → active:blue-100
  // no-underline: href 지정 시 <a> 로 렌더되므로 앵커 기본 밑줄 제거
  "flex items-center gap-0.5 w-full h-9 p-1.5 rounded-md cursor-pointer transition-colors no-underline text-sm font-medium tracking-[-0.14px] hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-blue-100 dark:active:bg-blue-100 hover:text-blue-500 dark:hover:text-blue-300 active:text-blue-500 dark:active:text-blue-300 hover:[&_svg]:text-blue-500 dark:hover:[&_svg]:text-blue-300 active:[&_svg]:text-blue-500 dark:active:[&_svg]:text-blue-300",
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
), I = N.forwardRef(
  ({
    className: l,
    icon: t,
    label: n,
    active: i,
    depth: u,
    hasChildren: c,
    expanded: p,
    collapsed: g,
    layout: k = "vertical",
    indicator: d,
    href: m,
    target: b,
    rel: _,
    _inFlyout: z,
    ...f
  }, v) => {
    let a, s;
    return k === "horizontal" ? (a = r(
      "flex items-center gap-1.5 h-9 px-1.5 rounded-md cursor-pointer transition-colors no-underline",
      "text-sm font-medium tracking-[-0.14px]",
      "hover:bg-slate-50 dark:hover:bg-slate-800",
      "hover:text-blue-500 dark:hover:text-blue-300",
      "hover:[&_svg]:text-blue-500 dark:hover:[&_svg]:text-blue-300",
      i ? "text-blue-500 dark:text-blue-300 [&_svg]:text-blue-500 [&_svg]:dark:text-blue-300" : "text-slate-900 dark:text-slate-200 [&_svg]:text-slate-900 [&_svg]:dark:text-slate-200",
      l
    ), s = /* @__PURE__ */ x(o, { children: [
      t && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-5 h-5 flex items-center justify-center", children: t }),
      /* @__PURE__ */ e("span", { className: "whitespace-nowrap", children: n }),
      c && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ e(y, { size: 16 }) })
    ] })) : g ? (a = r(
      h({ active: i, depth: u }),
      "flex-col justify-center items-center w-full h-auto py-2 px-1 gap-1",
      l
    ), s = /* @__PURE__ */ x(o, { children: [
      t && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: t }),
      /* @__PURE__ */ e("span", { className: "text-[10px] font-medium leading-tight text-center truncate w-full px-1", children: n })
    ] })) : (a = r(h({ active: i, depth: u }), l), s = /* @__PURE__ */ x(o, { children: [
      t && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: t }),
      /* @__PURE__ */ e("span", { className: "flex-1 text-left truncate", children: n }),
      d && !c && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center", children: d }),
      c && /* @__PURE__ */ e(
        "span",
        {
          className: r(
            "flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform",
            p && "rotate-90"
          ),
          children: /* @__PURE__ */ e(j, { size: 24 })
        }
      )
    ] })), m ? /* @__PURE__ */ e(
      "a",
      {
        ref: v,
        href: m,
        target: b,
        rel: _,
        className: a,
        ...f,
        children: s
      }
    ) : /* @__PURE__ */ e(
      "button",
      {
        ref: v,
        type: "button",
        className: a,
        ...f,
        children: s
      }
    );
  }
);
I.displayName = "NavItem";
export {
  I as NavItem,
  h as navItemVariants
};
//# sourceMappingURL=nav-item.mjs.map
