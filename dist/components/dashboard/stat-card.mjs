import { jsx as e, jsxs as t } from "react/jsx-runtime";
import * as u from "react";
import { cva as k } from "class-variance-authority";
import { cn as a } from "../../lib/utils.mjs";
import { Skeleton as i } from "../ui/skeleton.mjs";
const N = {
  main: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  sub: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  small: "bg-blue-50 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-blue-800"
}, w = {
  main: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  sub: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  small: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800"
}, x = k(
  "relative cursor-pointer transition-colors group flex flex-col",
  {
    variants: {
      variant: {
        // Main: 세로 레이아웃, 큰 숫자 (86px) - 너비 유연
        main: "min-h-[160px] rounded-[10px] pt-[10px] px-[10px] pb-[18px]",
        // Sub: 세로 레이아웃, 중간 숫자 (48px) + Badge - 너비 유연
        sub: "min-h-[160px] rounded-[10px] p-[10px]",
        // Small: 가로 레이아웃, 작은 숫자 (14px) - 너비 유연, 세로 중앙 정렬
        small: "min-h-[44px] rounded-[6px] pl-[10px] pr-[12px] py-[10px] justify-center"
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
), y = u.forwardRef(
  ({ className: d, variant: r = "main", icon: s, label: n, count: c, badge: g, bordered: v = !1, headerAction: p, stretch: o = !1, loading: m = !1, ...h }, b) => {
    const l = "text-slate-700 dark:text-slate-100", f = v ? w[r || "main"] : N[r || "main"];
    return r === "main" ? /* @__PURE__ */ e(
      "div",
      {
        ref: b,
        className: a(x({ variant: r, stretch: o }), f, d),
        ...h,
        children: m ? /* @__PURE__ */ t("div", { className: "flex flex-col flex-1 justify-between", children: [
          /* @__PURE__ */ e(i, { width: 60, height: 14 }),
          /* @__PURE__ */ e(i, { width: "70%", height: 64 })
        ] }) : /* @__PURE__ */ t("div", { className: "flex flex-col flex-1 justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
              s && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", l), children: s }),
              /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", l), children: n })
            ] }),
            p && /* @__PURE__ */ e("div", { className: "flex items-center", children: p })
          ] }),
          /* @__PURE__ */ e("span", { className: a("font-heading text-[86px] font-normal tracking-[-2.58px] leading-none", l), children: c })
        ] })
      }
    ) : r === "sub" ? /* @__PURE__ */ e(
      "div",
      {
        ref: b,
        className: a(x({ variant: r, stretch: o }), f, d),
        ...h,
        children: m ? /* @__PURE__ */ t("div", { className: "flex flex-col flex-1 justify-between", children: [
          /* @__PURE__ */ e(i, { width: 50, height: 14 }),
          /* @__PURE__ */ e(i, { width: "50%", height: 36 })
        ] }) : /* @__PURE__ */ t("div", { className: "flex gap-0.5 flex-1", children: [
          /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col justify-between", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
              s && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", l), children: s }),
              /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", l), children: n })
            ] }),
            /* @__PURE__ */ e("span", { className: a("text-[48px] font-normal tracking-[-1.44px] leading-none", l), children: c })
          ] }),
          g && /* @__PURE__ */ e("div", { className: "w-[28px] flex flex-col justify-end items-center", children: g })
        ] })
      }
    ) : /* @__PURE__ */ e(
      "div",
      {
        ref: b,
        className: a(x({ variant: r, stretch: o }), f, d),
        ...h,
        children: m ? /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ e(i, { width: 60, height: 14 }),
          /* @__PURE__ */ e(i, { width: 30, height: 14 })
        ] }) : /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
            s && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", l), children: s }),
            /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", l), children: n })
          ] }),
          /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", l), children: c })
        ] })
      }
    );
  }
);
y.displayName = "StatCard";
export {
  y as StatCard,
  x as statCardVariants
};
//# sourceMappingURL=stat-card.mjs.map
