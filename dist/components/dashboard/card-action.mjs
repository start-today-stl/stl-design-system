import { jsx as s } from "react/jsx-runtime";
import * as n from "react";
import { cva as i } from "class-variance-authority";
import { cn as l } from "../../lib/utils.mjs";
const c = i(
  "h-[18px] px-[5px] rounded-[2px] border text-[10px] tracking-[-0.1px] transition-colors cursor-pointer inline-flex items-center justify-center border-slate-200 text-slate-700 dark:border-slate-600 dark:text-slate-100",
  {
    variants: {
      selected: {
        true: "bg-slate-100 dark:bg-slate-600",
        false: "hover:bg-slate-50 dark:hover:bg-slate-700"
      }
    },
    defaultVariants: {
      selected: !1
    }
  }
), d = n.forwardRef(
  ({ className: t, selected: e, children: r, ...a }, o) => /* @__PURE__ */ s(
    "button",
    {
      ref: o,
      type: "button",
      className: l(c({ selected: e }), t),
      ...a,
      children: r
    }
  )
);
d.displayName = "CardAction";
export {
  d as CardAction,
  c as cardActionVariants
};
//# sourceMappingURL=card-action.mjs.map
