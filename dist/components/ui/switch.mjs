import { jsx as t, jsxs as l } from "react/jsx-runtime";
import * as f from "react";
import * as e from "@radix-ui/react-switch";
import { cva as n } from "class-variance-authority";
import { cn as r } from "../../lib/utils.mjs";
const m = n(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-100 dark:data-[state=unchecked]:bg-dark-300",
  {
    variants: {
      size: {
        default: "h-8 w-16 p-[3px]",
        // 32x64px, 3px 내부 패딩
        sm: "h-4 w-8 p-[2px]"
        // 16x32px, 2px 내부 패딩
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
), u = n(
  "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        default: "h-[26px] w-[26px] data-[state=checked]:translate-x-8",
        // 26px, move 32px
        sm: "h-3 w-3 data-[state=checked]:translate-x-4"
        // 12px, move 16px
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
), h = f.forwardRef(({ className: o, size: a, label: s, ...c }, d) => {
  const i = /* @__PURE__ */ t(
    e.Root,
    {
      className: r(m({ size: a }), o),
      ...c,
      ref: d,
      children: /* @__PURE__ */ t(e.Thumb, { className: r(u({ size: a })) })
    }
  );
  return s ? /* @__PURE__ */ l("div", { className: "inline-flex items-center gap-2", children: [
    i,
    /* @__PURE__ */ t("span", { className: "text-xs text-gray-500 dark:text-gray-300", children: s })
  ] }) : i;
});
h.displayName = e.Root.displayName;
export {
  h as Switch,
  m as switchVariants
};
//# sourceMappingURL=switch.mjs.map
