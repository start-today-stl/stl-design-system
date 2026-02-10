import { jsx as e, jsxs as t } from "react/jsx-runtime";
import * as v from "react";
import { cva as g } from "class-variance-authority";
import { cn as a } from "../lib/utils.mjs";
const u = {
  main: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  sub: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  small: "bg-blue-50 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-blue-800"
}, k = {
  main: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  sub: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  small: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800"
}, f = g(
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
), N = v.forwardRef(
  ({ className: i, variant: l = "main", icon: s, label: d, count: n, badge: h, bordered: p = !1, headerAction: x, stretch: o = !1, ...c }, m) => {
    const r = "text-slate-700 dark:text-slate-100", b = p ? k[l || "main"] : u[l || "main"];
    return l === "main" ? /* @__PURE__ */ e(
      "div",
      {
        ref: m,
        className: a(f({ variant: l, stretch: o }), b, i),
        ...c,
        children: /* @__PURE__ */ t("div", { className: "flex flex-col h-full justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
              s && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", r), children: s }),
              /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", r), children: d })
            ] }),
            x && /* @__PURE__ */ e("div", { className: "flex items-center", children: x })
          ] }),
          /* @__PURE__ */ e("span", { className: a("font-heading text-[86px] font-normal tracking-[-2.58px] leading-none", r), children: n })
        ] })
      }
    ) : l === "sub" ? /* @__PURE__ */ e(
      "div",
      {
        ref: m,
        className: a(f({ variant: l, stretch: o }), b, i),
        ...c,
        children: /* @__PURE__ */ t("div", { className: "flex gap-0.5 h-full", children: [
          /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col justify-between", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
              s && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", r), children: s }),
              /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", r), children: d })
            ] }),
            /* @__PURE__ */ e("span", { className: a("text-[48px] font-normal tracking-[-1.44px] leading-none", r), children: n })
          ] }),
          h && /* @__PURE__ */ e("div", { className: "w-[28px] flex flex-col justify-end items-center", children: h })
        ] })
      }
    ) : /* @__PURE__ */ e(
      "div",
      {
        ref: m,
        className: a(f({ variant: l, stretch: o }), b, i),
        ...c,
        children: /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
            s && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", r), children: s }),
            /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", r), children: d })
          ] }),
          /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", r), children: n })
        ] })
      }
    );
  }
);
N.displayName = "StatCard";
export {
  N as StatCard,
  f as statCardVariants
};
//# sourceMappingURL=stat-card.mjs.map
