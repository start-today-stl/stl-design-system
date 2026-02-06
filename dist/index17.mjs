import { jsx as n } from "react/jsx-runtime";
import * as d from "react";
import { cva as i } from "./index107.mjs";
import { cn as s } from "./index105.mjs";
const c = i(
  "h-[18px] px-[5px] rounded-[2px] border text-[10px] tracking-[-0.1px] transition-colors cursor-pointer inline-flex items-center justify-center border-gray-200 text-gray-700 dark:border-dark-300 dark:text-gray-100",
  {
    variants: {
      selected: {
        true: "bg-gray-100 dark:bg-dark-300",
        false: "hover:bg-gray-50 dark:hover:bg-dark-400"
      }
    },
    defaultVariants: {
      selected: !1
    }
  }
), p = d.forwardRef(
  ({ className: r, selected: t, children: a, ...e }, o) => /* @__PURE__ */ n(
    "button",
    {
      ref: o,
      type: "button",
      className: s(c({ selected: t }), r),
      ...e,
      children: a
    }
  )
);
p.displayName = "CardAction";
export {
  p as CardAction,
  c as cardActionVariants
};
//# sourceMappingURL=index17.mjs.map
