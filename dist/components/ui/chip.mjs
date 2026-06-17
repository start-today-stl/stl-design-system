import { jsxs as d, jsx as e, Fragment as v } from "react/jsx-runtime";
import * as k from "react";
import { cva as y } from "class-variance-authority";
import { cn as n } from "../../lib/utils.mjs";
import { XIcon as N } from "../../icons/XIcon.mjs";
const w = y(
  "inline-flex items-center gap-1.5 font-medium transition-all duration-150 select-none",
  {
    variants: {
      variant: {
        // 기본 (필터 칩용)
        default: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
        // 선택됨
        selected: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500",
        // 아웃라인
        outline: "border border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
        // 아웃라인 선택됨
        "outline-selected": "border border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
      },
      size: {
        sm: "h-6 px-2 text-xs rounded-md",
        md: "h-7 px-2.5 text-xs rounded-lg",
        lg: "h-8 px-3 text-sm rounded-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
), j = k.forwardRef(
  ({
    className: b,
    variant: u,
    size: c,
    children: g,
    removable: h,
    onRemove: a,
    onClick: t,
    disabled: r,
    leftElement: o,
    ...p
  }, m) => {
    const l = !!t, x = (s) => {
      s.stopPropagation(), a == null || a();
    }, f = l && !r ? (s) => {
      s.stopPropagation(), t == null || t();
    } : void 0, i = /* @__PURE__ */ d(v, { children: [
      o && /* @__PURE__ */ e("span", { className: "flex items-center justify-center shrink-0", children: o }),
      /* @__PURE__ */ e("span", { className: "truncate", children: g })
    ] });
    return /* @__PURE__ */ d(
      "div",
      {
        ref: m,
        className: n(
          w({ variant: u, size: c }),
          r && "opacity-50 cursor-not-allowed pointer-events-none",
          b
        ),
        ...p,
        children: [
          l ? /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: f,
              disabled: r,
              className: n(
                "inline-flex items-center gap-1.5 min-w-0 cursor-pointer outline-none",
                "focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              ),
              children: i
            }
          ) : i,
          h && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: x,
              disabled: r,
              className: n(
                "flex items-center justify-center shrink-0 rounded-full transition-colors",
                "hover:bg-black/10 dark:hover:bg-white/10",
                "-mr-0.5 size-5"
              ),
              "aria-label": "삭제",
              children: /* @__PURE__ */ e(N, { size: 16 })
            }
          )
        ]
      }
    );
  }
);
j.displayName = "Chip";
export {
  j as Chip,
  w as chipVariants
};
//# sourceMappingURL=chip.mjs.map
