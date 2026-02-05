import { jsx as r, jsxs as i } from "react/jsx-runtime";
import * as h from "react";
import { cva as x } from "./index103.mjs";
import { cn as a } from "./index104.mjs";
const g = {
  main: "bg-gradient-to-b from-[#f7f9ff] to-white hover:from-[#f6f7f9] hover:to-[#f6f7f9] active:from-primary-200 active:to-primary-200 dark:from-[#2a3348] dark:to-dark-400 dark:hover:from-dark-300 dark:hover:to-dark-300 dark:active:from-primary-200 dark:active:to-primary-200",
  sub: "bg-gradient-to-b from-[#f7f9ff] to-white hover:from-[#f6f7f9] hover:to-[#f6f7f9] active:from-primary-200 active:to-primary-200 dark:from-[#2a3348] dark:to-dark-400 dark:hover:from-dark-300 dark:hover:to-dark-300 dark:active:from-primary-200 dark:active:to-primary-200",
  small: "bg-[#f7f9ff] hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-[#2a3348] dark:hover:bg-dark-300 dark:active:bg-primary-200"
}, b = {
  main: "bg-white border border-gray-100 hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-dark-400 dark:border-dark-300 dark:hover:bg-dark-300 dark:active:bg-primary-200",
  sub: "bg-white border border-gray-100 hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-dark-400 dark:border-dark-300 dark:hover:bg-dark-300 dark:active:bg-primary-200",
  small: "bg-white border border-gray-100 hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-dark-400 dark:border-dark-300 dark:hover:bg-dark-300 dark:active:bg-primary-200"
}, c = x(
  "relative cursor-pointer transition-colors group",
  {
    variants: {
      variant: {
        // Main: 세로 레이아웃, 큰 숫자 (86px) - 너비 유연
        main: "h-[160px] rounded-[10px] pt-[10px] px-[10px] pb-[18px]",
        // Sub: 세로 레이아웃, 중간 숫자 (48px) + Badge - 너비 유연
        sub: "h-[160px] rounded-[10px] p-[10px]",
        // Small: 가로 레이아웃, 작은 숫자 (14px) - 너비 유연
        small: "rounded-[6px] pl-[10px] pr-[12px] py-[10px]"
      }
    },
    defaultVariants: {
      variant: "main"
    }
  }
), v = h.forwardRef(
  ({ className: s, variant: t = "main", icon: d, label: f, count: o, badge: p, bordered: k = !1, ...n }, l) => {
    const e = "text-gray-700 dark:text-gray-100", m = k ? b[t || "main"] : g[t || "main"];
    return t === "main" ? /* @__PURE__ */ r(
      "div",
      {
        ref: l,
        className: a(c({ variant: t }), m, s),
        ...n,
        children: /* @__PURE__ */ i("div", { className: "flex flex-col h-full justify-between", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-0.5", children: [
            d && /* @__PURE__ */ r("span", { className: a("flex-shrink-0", e), children: d }),
            /* @__PURE__ */ r("span", { className: a("text-sm tracking-[-0.14px]", e), children: f })
          ] }),
          /* @__PURE__ */ r("span", { className: a("font-heading text-[86px] font-normal tracking-[-2.58px] leading-none", e), children: o })
        ] })
      }
    ) : t === "sub" ? /* @__PURE__ */ r(
      "div",
      {
        ref: l,
        className: a(c({ variant: t }), m, s),
        ...n,
        children: /* @__PURE__ */ i("div", { className: "flex gap-0.5 h-full", children: [
          /* @__PURE__ */ i("div", { className: "flex-1 flex flex-col justify-between", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-0.5", children: [
              d && /* @__PURE__ */ r("span", { className: a("flex-shrink-0", e), children: d }),
              /* @__PURE__ */ r("span", { className: a("text-sm tracking-[-0.14px]", e), children: f })
            ] }),
            /* @__PURE__ */ r("span", { className: a("text-[48px] font-normal tracking-[-1.44px] leading-none", e), children: o })
          ] }),
          p && /* @__PURE__ */ r("div", { className: "w-[28px] flex flex-col justify-end items-center", children: p })
        ] })
      }
    ) : /* @__PURE__ */ r(
      "div",
      {
        ref: l,
        className: a(c({ variant: t }), m, s),
        ...n,
        children: /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-0.5", children: [
            d && /* @__PURE__ */ r("span", { className: a("flex-shrink-0", e), children: d }),
            /* @__PURE__ */ r("span", { className: a("text-sm tracking-[-0.14px]", e), children: f })
          ] }),
          /* @__PURE__ */ r("span", { className: a("text-sm tracking-[-0.14px]", e), children: o })
        ] })
      }
    );
  }
);
v.displayName = "StatCard";
export {
  v as StatCard,
  c as statCardVariants
};
//# sourceMappingURL=index86.mjs.map
