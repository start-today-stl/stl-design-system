import { jsx as e, jsxs as t } from "react/jsx-runtime";
import * as k from "react";
import { cva as w } from "class-variance-authority";
import { cn as a } from "../../lib/utils.mjs";
import { Skeleton as i } from "../ui/skeleton.mjs";
const N = "has-[[data-card-action]:hover]:from-blue-50 has-[[data-card-action]:hover]:to-white dark:has-[[data-card-action]:hover]:from-blue-950 dark:has-[[data-card-action]:hover]:to-slate-800", y = {
  main: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  sub: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  small: "bg-blue-50 hover:bg-slate-100 active:bg-blue-200 dark:bg-blue-900 dark:hover:bg-slate-700 dark:active:bg-blue-800"
}, j = {
  main: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  sub: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  small: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800"
}, v = w(
  // overflow-hidden: 긴 count/label 이 카드 경계 밖으로 튀어나오지 않도록 (rounded 와 함께 clip)
  "relative overflow-hidden cursor-pointer transition-colors group flex flex-col",
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
), C = k.forwardRef(
  ({ className: d, variant: l = "main", icon: s, label: n, count: o, badge: g, bordered: u = !1, headerAction: c, stretch: h = !1, loading: m = !1, ...b }, f) => {
    const r = "text-slate-700 dark:text-slate-100", x = u ? j[l || "main"] : y[l || "main"];
    return l === "main" ? /* @__PURE__ */ e(
      "div",
      {
        ref: f,
        className: a(
          v({ variant: l, stretch: h }),
          x,
          c && N,
          d
        ),
        ...b,
        children: m ? /* @__PURE__ */ t("div", { className: "flex flex-col flex-1 justify-between", children: [
          /* @__PURE__ */ e(i, { width: 60, height: 14 }),
          /* @__PURE__ */ e(i, { width: "70%", height: 64 })
        ] }) : /* @__PURE__ */ t("div", { className: "flex flex-col flex-1 justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
              s && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", r), children: s }),
              /* @__PURE__ */ e("span", { className: a("text-base tracking-[-0.16px]", r), children: n })
            ] }),
            c && // 카드 전체가 클릭 영역이라, 액션 클릭이 카드 onClick 으로
            // 번지지 않게 슬롯에서 막는다 (쓰는 쪽에서 매번 감싸지 않도록)
            /* @__PURE__ */ e(
              "div",
              {
                "data-card-action": "",
                className: "flex items-center",
                onClick: (p) => p.stopPropagation(),
                children: c
              }
            )
          ] }),
          /* @__PURE__ */ e("span", { className: a("text-[86px] font-normal tracking-[-2.58px] leading-none block max-w-full truncate text-right", r), children: o })
        ] })
      }
    ) : l === "sub" ? /* @__PURE__ */ e(
      "div",
      {
        ref: f,
        className: a(v({ variant: l, stretch: h }), x, d),
        ...b,
        children: m ? /* @__PURE__ */ t("div", { className: "flex flex-col flex-1 justify-between", children: [
          /* @__PURE__ */ e(i, { width: 50, height: 14 }),
          /* @__PURE__ */ e(i, { width: "50%", height: 36 })
        ] }) : /* @__PURE__ */ t("div", { className: "flex flex-col flex-1 justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
            s && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", r), children: s }),
            /* @__PURE__ */ e("span", { className: a("text-base tracking-[-0.16px]", r), children: n })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-end gap-2 min-w-0", children: [
            g && /* @__PURE__ */ e("div", { className: "flex-shrink-0", children: g }),
            /* @__PURE__ */ e("span", { className: a("flex-1 text-[48px] font-normal tracking-[-1.44px] leading-none block min-w-0 truncate text-right", r), children: o })
          ] })
        ] })
      }
    ) : /* @__PURE__ */ e(
      "div",
      {
        ref: f,
        className: a(v({ variant: l, stretch: h }), x, d),
        ...b,
        children: m ? /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ e(i, { width: 60, height: 14 }),
          /* @__PURE__ */ e(i, { width: 30, height: 14 })
        ] }) : /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
            s && /* @__PURE__ */ e("span", { className: a("flex-shrink-0", r), children: s }),
            /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px]", r), children: n })
          ] }),
          /* @__PURE__ */ e("span", { className: a("text-sm tracking-[-0.14px] min-w-0 truncate", r), children: o })
        ] })
      }
    );
  }
);
C.displayName = "StatCard";
export {
  C as StatCard,
  v as statCardVariants
};
//# sourceMappingURL=stat-card.mjs.map
