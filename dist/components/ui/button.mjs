import { jsx as n } from "react/jsx-runtime";
import * as g from "react";
import { Root as d } from "../../node_modules/@radix-ui/react-slot/dist/index.mjs";
import { cva as s } from "../../node_modules/class-variance-authority/dist/index.mjs";
import { cn as c } from "../../lib/utils.mjs";
const b = s(
  "inline-flex items-center justify-center gap-0.5 whitespace-nowrap font-normal transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:-ml-1",
  {
    variants: {
      variant: {
        // Basic (Gray) - 기본 버튼 Outline (라이트: gray-500, 다크: gray-200)
        basic: "border-[0.75px] border-gray-500 text-gray-500 bg-transparent hover:bg-gray-500/50 hover:text-white active:bg-gray-500 active:text-white dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-200/50 dark:active:bg-gray-200",
        // Basic Filled (Gray) - 기본 버튼 채움
        "basic-filled": "bg-gray-300 text-white hover:bg-gray-500 active:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:active:bg-gray-400",
        // Negative (Red) - 삭제/경고 버튼 Outline
        negative: "border-[0.75px] border-danger text-danger bg-transparent hover:bg-danger/50 hover:text-white active:bg-danger active:text-white",
        // Negative Filled (Red) - 삭제/경고 버튼 채움
        "negative-filled": "bg-danger text-white hover:bg-danger-400 active:bg-danger-500",
        // Action (Blue) - 주요 액션 버튼 Outline
        action: "border-[0.75px] border-primary text-primary bg-transparent hover:bg-primary/50 hover:text-white active:bg-primary active:text-white",
        // Action Filled (Blue) - 주요 액션 버튼 채움
        "action-filled": "bg-primary text-white hover:bg-primary-500 active:bg-primary-500",
        // Legacy variants (하위 호환)
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
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
      variant: "basic",
      size: "default"
    }
  }
), v = g.forwardRef(
  ({ className: e, variant: r, size: t, asChild: a = !1, ...o }, i) => /* @__PURE__ */ n(
    a ? d : "button",
    {
      className: c(b({ variant: r, size: t, className: e })),
      ref: i,
      ...o
    }
  )
);
v.displayName = "Button";
export {
  v as Button,
  b as buttonVariants
};
//# sourceMappingURL=button.mjs.map
