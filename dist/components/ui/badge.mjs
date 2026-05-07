import { jsx as d } from "react/jsx-runtime";
import { cva as a } from "class-variance-authority";
import { cn as l } from "../../lib/utils.mjs";
const b = a(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors rounded-[4px] p-[5px] text-[10px] tracking-[-0.15px]",
  {
    variants: {
      variant: {
        // 상태 표시용 - Light (연한 배경)
        "primary-light": "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200",
        "success-light": "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
        "warning-light": "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
        "danger-light": "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-200",
        // 상태 표시용 - Solid (진한 배경)
        "primary-solid": "bg-blue-500 text-blue-50 dark:bg-blue-600 dark:text-white",
        "success-solid": "bg-green-600 text-white dark:bg-green-700",
        "warning-solid": "bg-yellow-500 text-white dark:bg-yellow-600",
        "danger-solid": "bg-red-500 text-white dark:bg-red-600",
        // 상태 표시용 - Outline (테두리 + 투명 배경)
        "primary-outline": "border border-blue-300 bg-blue-300/30 text-blue-500 dark:border-blue-400 dark:bg-blue-400/20 dark:text-blue-200",
        "success-outline": "border border-green-500 bg-green-100/30 text-green-700 dark:border-green-400 dark:bg-green-500/20 dark:text-green-200",
        "warning-outline": "border border-yellow-500 bg-yellow-100/30 text-yellow-700 dark:border-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-200",
        "danger-outline": "border border-red-500 bg-red-100/30 text-red-600 dark:border-red-400 dark:bg-red-500/20 dark:text-red-200"
      }
    },
    defaultVariants: {
      variant: "primary-light"
    }
  }
);
function i({ className: e, variant: r, ...t }) {
  return /* @__PURE__ */ d("div", { className: l(b({ variant: r }), e), ...t });
}
export {
  i as Badge,
  b as badgeVariants
};
//# sourceMappingURL=badge.mjs.map
