import { jsx as e, jsxs as t } from "react/jsx-runtime";
import * as v from "react";
import { cva as p } from "class-variance-authority";
import { cn as a } from "../../lib/utils.mjs";
import { Skeleton as r } from "../ui/skeleton.mjs";
const k = {
  main: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  sub: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  small: "bg-blue-50 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-blue-800"
}, N = {
  main: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  sub: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  small: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800"
}, h = p(
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
), w = v.forwardRef(
  ({ className: d, variant: l = "main", icon: i, label: n, count: c, badge: o, bordered: m = !1, headerAction: u, stretch: b = !1, ...f }, x) => {
    const s = "text-slate-700 dark:text-slate-100", g = m ? N[l || "main"] : k[l || "main"];
    return l === "main" ? /* @__PURE__ */ e(
      "div",
      {
        ref: x,
        className: a(h({ variant: l, stretch: b }), g, d),
        ...f,
        children: /* @__PURE__ */ t("div", { className: "flex flex-col h-full justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
              i && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", s), children: i }),
              /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", s), children: n })
            ] }),
            u && /* @__PURE__ */ e("div", { className: "flex items-center", children: u })
          ] }),
          /* @__PURE__ */ e("span", { className: a("font-heading text-[86px] font-normal tracking-[-2.58px] leading-none", s), children: c })
        ] })
      }
    ) : l === "sub" ? /* @__PURE__ */ e(
      "div",
      {
        ref: x,
        className: a(h({ variant: l, stretch: b }), g, d),
        ...f,
        children: /* @__PURE__ */ t("div", { className: "flex gap-0.5 h-full", children: [
          /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col justify-between", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
              i && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", s), children: i }),
              /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", s), children: n })
            ] }),
            /* @__PURE__ */ e("span", { className: a("text-[48px] font-normal tracking-[-1.44px] leading-none", s), children: c })
          ] }),
          o && /* @__PURE__ */ e("div", { className: "w-[28px] flex flex-col justify-end items-center", children: o })
        ] })
      }
    ) : /* @__PURE__ */ e(
      "div",
      {
        ref: x,
        className: a(h({ variant: l, stretch: b }), g, d),
        ...f,
        children: /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
            i && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", s), children: i }),
            /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", s), children: n })
          ] }),
          /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", s), children: c })
        ] })
      }
    );
  }
);
w.displayName = "StatCard";
const y = v.forwardRef(
  ({ className: d, variant: l = "main", bordered: i = !1, stretch: n = !1, ...c }, o) => {
    const m = i ? "bg-white border border-slate-100 dark:bg-slate-700 dark:border-slate-600" : "bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-slate-800";
    return l === "main" ? /* @__PURE__ */ e(
      "div",
      {
        ref: o,
        className: a(
          h({ variant: l, stretch: n }),
          m,
          d
        ),
        ...c,
        children: /* @__PURE__ */ t("div", { className: "flex flex-col h-full justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ e(r, { width: 24, height: 24, className: "rounded" }),
            /* @__PURE__ */ e(r, { width: 60, height: 14 })
          ] }),
          /* @__PURE__ */ e(r, { width: "70%", height: 64 })
        ] })
      }
    ) : l === "sub" ? /* @__PURE__ */ e(
      "div",
      {
        ref: o,
        className: a(
          h({ variant: l, stretch: n }),
          m,
          d
        ),
        ...c,
        children: /* @__PURE__ */ t("div", { className: "flex gap-0.5 h-full", children: [
          /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col justify-between", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ e(r, { width: 24, height: 24, className: "rounded" }),
              /* @__PURE__ */ e(r, { width: 50, height: 14 })
            ] }),
            /* @__PURE__ */ e(r, { width: "60%", height: 36 })
          ] }),
          /* @__PURE__ */ e("div", { className: "w-[28px] flex flex-col justify-end items-center", children: /* @__PURE__ */ e(r, { width: 24, height: 24, className: "rounded-full" }) })
        ] })
      }
    ) : /* @__PURE__ */ e(
      "div",
      {
        ref: o,
        className: a(
          h({ variant: l, stretch: n }),
          m,
          d
        ),
        ...c,
        children: /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ e(r, { width: 24, height: 24, className: "rounded" }),
            /* @__PURE__ */ e(r, { width: 60, height: 14 })
          ] }),
          /* @__PURE__ */ e(r, { width: 40, height: 14 })
        ] })
      }
    );
  }
);
y.displayName = "StatCardSkeleton";
export {
  w as StatCard,
  y as StatCardSkeleton,
  h as statCardVariants
};
//# sourceMappingURL=stat-card.mjs.map
