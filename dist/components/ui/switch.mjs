import { jsx as e, jsxs as r } from "react/jsx-runtime";
import * as u from "react";
import * as t from "@radix-ui/react-switch";
import { cva as l } from "class-variance-authority";
import { cn as o } from "../../lib/utils.mjs";
const m = l(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-100 dark:data-[state=unchecked]:bg-slate-700",
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
), h = l(
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
), p = u.forwardRef(({ className: c, size: a, label: s, required: i, ...d }, f) => {
  const n = /* @__PURE__ */ e(
    t.Root,
    {
      className: o(m({ size: a }), c),
      required: i,
      ...d,
      ref: f,
      children: /* @__PURE__ */ e(t.Thumb, { className: o(h({ size: a })) })
    }
  );
  return s ? /* @__PURE__ */ r("div", { className: "inline-flex items-center gap-2", children: [
    n,
    /* @__PURE__ */ r("span", { className: "flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300", children: [
      i && /* @__PURE__ */ e("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
      s
    ] })
  ] }) : n;
});
p.displayName = t.Root.displayName;
export {
  p as Switch,
  m as switchVariants
};
//# sourceMappingURL=switch.mjs.map
