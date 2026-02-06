import { jsx as r, jsxs as t } from "react/jsx-runtime";
import * as g from "react";
import { cva as b } from "class-variance-authority";
import { cn as a } from "../lib/utils.mjs";
const v = {
  main: "bg-gradient-to-b from-[#f7f9ff] to-white hover:from-[#f6f7f9] hover:to-[#f6f7f9] active:from-primary-200 active:to-primary-200 dark:from-[#2a3348] dark:to-dark-400 dark:hover:from-dark-300 dark:hover:to-dark-300 dark:active:from-primary-200 dark:active:to-primary-200",
  sub: "bg-gradient-to-b from-[#f7f9ff] to-white hover:from-[#f6f7f9] hover:to-[#f6f7f9] active:from-primary-200 active:to-primary-200 dark:from-[#2a3348] dark:to-dark-400 dark:hover:from-dark-300 dark:hover:to-dark-300 dark:active:from-primary-200 dark:active:to-primary-200",
  small: "bg-[#f7f9ff] hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-[#2a3348] dark:hover:bg-dark-300 dark:active:bg-primary-200"
}, y = {
  main: "bg-white border border-gray-100 hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-dark-400 dark:border-dark-300 dark:hover:bg-dark-300 dark:active:bg-primary-200",
  sub: "bg-white border border-gray-100 hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-dark-400 dark:border-dark-300 dark:hover:bg-dark-300 dark:active:bg-primary-200",
  small: "bg-white border border-gray-100 hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-dark-400 dark:border-dark-300 dark:hover:bg-dark-300 dark:active:bg-primary-200"
}, p = b(
  "relative cursor-pointer transition-colors group",
  {
    variants: {
      variant: {
        // Main: 세로 레이아웃, 큰 숫자 (86px) - 너비 유연
        main: "min-h-[160px] rounded-[10px] pt-[10px] px-[10px] pb-[18px]",
        // Sub: 세로 레이아웃, 중간 숫자 (48px) + Badge - 너비 유연
        sub: "min-h-[160px] rounded-[10px] p-[10px]",
        // Small: 가로 레이아웃, 작은 숫자 (14px) - 너비 유연
        small: "rounded-[6px] pl-[10px] pr-[12px] py-[10px]"
      },
      stretch: {
        true: "h-full",
        false: ""
      }
    },
    defaultVariants: {
      variant: "main",
      stretch: !1
    }
  }
), N = g.forwardRef(
  ({ className: s, variant: i = "main", icon: d, label: l, count: f, badge: k, bordered: x = !1, headerAction: h, stretch: n = !1, ...m }, o) => {
    const e = "text-gray-700 dark:text-gray-100", c = x ? y[i || "main"] : v[i || "main"];
    return i === "main" ? /* @__PURE__ */ r(
      "div",
      {
        ref: o,
        className: a(p({ variant: i, stretch: n }), c, s),
        ...m,
        children: /* @__PURE__ */ t("div", { className: "flex flex-col h-full justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
              d && /* @__PURE__ */ r("span", { className: a("flex-shrink-0", e), children: d }),
              /* @__PURE__ */ r("span", { className: a("text-sm tracking-[-0.14px]", e), children: l })
            ] }),
            h && /* @__PURE__ */ r("div", { className: "flex items-center", children: h })
          ] }),
          /* @__PURE__ */ r("span", { className: a("font-heading text-[86px] font-normal tracking-[-2.58px] leading-none", e), children: f })
        ] })
      }
    ) : i === "sub" ? /* @__PURE__ */ r(
      "div",
      {
        ref: o,
        className: a(p({ variant: i, stretch: n }), c, s),
        ...m,
        children: /* @__PURE__ */ t("div", { className: "flex gap-0.5 h-full", children: [
          /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col justify-between", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
              d && /* @__PURE__ */ r("span", { className: a("flex-shrink-0", e), children: d }),
              /* @__PURE__ */ r("span", { className: a("text-sm tracking-[-0.14px]", e), children: l })
            ] }),
            /* @__PURE__ */ r("span", { className: a("text-[48px] font-normal tracking-[-1.44px] leading-none", e), children: f })
          ] }),
          k && /* @__PURE__ */ r("div", { className: "w-[28px] flex flex-col justify-end items-center", children: k })
        ] })
      }
    ) : /* @__PURE__ */ r(
      "div",
      {
        ref: o,
        className: a(p({ variant: i, stretch: n }), c, s),
        ...m,
        children: /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
            d && /* @__PURE__ */ r("span", { className: a("flex-shrink-0", e), children: d }),
            /* @__PURE__ */ r("span", { className: a("text-sm tracking-[-0.14px]", e), children: l })
          ] }),
          /* @__PURE__ */ r("span", { className: a("text-sm tracking-[-0.14px]", e), children: f })
        ] })
      }
    );
  }
);
N.displayName = "StatCard";
export {
  N as StatCard,
  p as statCardVariants
};
//# sourceMappingURL=stat-card.mjs.map
