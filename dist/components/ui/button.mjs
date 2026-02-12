import { jsx as i } from "react/jsx-runtime";
import * as n from "react";
import { Slot as l } from "@radix-ui/react-slot";
import { cva as b } from "class-variance-authority";
import { cn as d } from "../../lib/utils.mjs";
const g = b(
  "inline-flex items-center justify-center gap-0.5 whitespace-nowrap font-normal transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:first-child:not(:last-child)]:-ml-1 [&>svg:last-child:not(:first-child)]:-mr-1",
  {
    variants: {
      variant: {
        // Ghost (Slate) - 중립 버튼 (Figma: ButtonGhost)
        ghost: "bg-slate-50 border-[0.75px] border-slate-200 text-slate-600 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-600 dark:active:bg-slate-500",
        // Ghost Outline (Slate) - 중립 버튼 아웃라인
        "ghost-outline": "border-[0.75px] border-slate-500 text-slate-500 bg-transparent hover:bg-slate-500/50 hover:text-white active:bg-slate-500 active:text-white dark:border-slate-200 dark:text-slate-200 dark:hover:bg-slate-200/50 dark:active:bg-slate-200",
        // Primary (Blue) - 주요 액션 버튼 (Figma: ButtonPrimary)
        primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
        // Primary Outline (Blue) - 주요 액션 버튼 아웃라인
        "primary-outline": "border-[0.75px] border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500/50 hover:text-white active:bg-blue-500 active:text-white",
        // Danger (Red) - 삭제/경고 버튼 (Figma: ButtonDanger)
        danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
        // Danger Outline (Red) - 삭제/경고 버튼 아웃라인
        "danger-outline": "border-[0.75px] border-red-500 text-red-500 bg-transparent hover:bg-red-500/50 hover:text-white active:bg-red-500 active:text-white",
        // Success (Green) - 완료/긍정 버튼 (Figma: ButtonPositive)
        success: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700",
        // Success Outline (Green) - 완료/긍정 버튼 아웃라인
        "success-outline": "border-[0.75px] border-green-500 text-green-500 bg-transparent hover:bg-green-500/50 hover:text-white active:bg-green-500 active:text-white",
        // Text - 텍스트만 있는 버튼 (배경/테두리 없음)
        text: "bg-transparent text-slate-600 hover:text-blue-500 active:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 dark:active:text-blue-500"
      },
      size: {
        // 텍스트 또는 아이콘+텍스트 버튼
        default: "h-9 px-2.5 py-2 rounded-sm text-xs tracking-[-0.12px]",
        sm: "h-6 px-1.5 py-1 rounded-[3px] text-[8px] tracking-[-0.08px]",
        // 아이콘만 있는 버튼 (정사각형)
        icon: "h-9 w-9 p-2 rounded-sm [&_svg]:ml-0",
        "icon-sm": "h-8 w-8 p-1.5 rounded-[2px] [&_svg]:ml-0"
      }
    },
    defaultVariants: {
      variant: "ghost",
      size: "default"
    }
  }
), v = n.forwardRef(
  ({ className: e, variant: t, size: r, asChild: a = !1, ...o }, s) => /* @__PURE__ */ i(
    a ? l : "button",
    {
      className: d(g({ variant: t, size: r, className: e })),
      ref: s,
      ...o
    }
  )
);
v.displayName = "Button";
export {
  v as Button,
  g as buttonVariants
};
//# sourceMappingURL=button.mjs.map
