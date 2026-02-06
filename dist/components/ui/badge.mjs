import { jsx as a } from "react/jsx-runtime";
import { cva as i } from "../../node_modules/class-variance-authority/dist/index.mjs";
import { cn as n } from "../../lib/utils.mjs";
const d = i(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors rounded-[4px] p-[5px] text-[10px] tracking-[-0.15px]",
  {
    variants: {
      variant: {
        // 상태 표시용 - Light (연한 배경)
        "info-light": "bg-primary-300 text-primary-400",
        "success-light": "bg-semantic-200 text-semantic-500",
        "danger-light": "bg-danger-200 text-danger-400",
        // 상태 표시용 - Solid (진한 배경)
        "info-solid": "bg-primary-400 text-primary-100",
        "success-solid": "bg-semantic-400 text-white",
        "danger-solid": "bg-danger-300 text-white",
        // 상태 표시용 - Outline (테두리 + 투명 배경)
        "info-outline": "border border-primary-300 bg-primary-300/30 text-primary-400 dark:border-primary-300 dark:bg-primary-300/20 dark:text-primary-200",
        "success-outline": "border border-semantic-300 bg-semantic-200/30 text-semantic-500 dark:border-semantic-300 dark:bg-semantic-300/20 dark:text-semantic-200",
        "danger-outline": "border border-danger-300 bg-danger-200/30 text-danger-400 dark:border-danger-300 dark:bg-danger-300/20 dark:text-danger-200"
      }
    },
    defaultVariants: {
      variant: "info-light"
    }
  }
);
function m({ className: r, variant: e, ...t }) {
  return /* @__PURE__ */ a("div", { className: n(d({ variant: e }), r), ...t });
}
export {
  m as Badge,
  d as badgeVariants
};
//# sourceMappingURL=badge.mjs.map
