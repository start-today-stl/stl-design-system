import { jsxs as m, jsx as o } from "react/jsx-runtime";
import * as x from "react";
import { cva as v } from "class-variance-authority";
import { cn as l } from "../../lib/utils.mjs";
import { XIcon as f } from "../../icons/XIcon.mjs";
const k = v(
  "inline-flex items-center gap-1.5 font-medium transition-all duration-150 select-none",
  {
    variants: {
      variant: {
        // 기본 (필터 칩용)
        default: "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
        // 선택됨
        selected: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500",
        // 아웃라인
        outline: "border border-slate-200 bg-transparent text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
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
), y = x.forwardRef(
  ({
    className: i,
    variant: d,
    size: b,
    children: u,
    removable: c,
    onRemove: s,
    onClick: t,
    disabled: e,
    leftElement: n,
    ...h
  }, p) => {
    const a = !!t, g = (r) => {
      r.stopPropagation(), s == null || s();
    };
    return /* @__PURE__ */ m(
      "div",
      {
        ref: p,
        role: a ? "button" : void 0,
        tabIndex: a && !e ? 0 : void 0,
        onClick: e ? void 0 : t,
        onKeyDown: a && !e ? (r) => {
          (r.key === "Enter" || r.key === " ") && (r.preventDefault(), t == null || t());
        } : void 0,
        className: l(
          k({ variant: d, size: b }),
          a && !e && "cursor-pointer",
          e && "opacity-50 cursor-not-allowed pointer-events-none",
          i
        ),
        ...h,
        children: [
          n && /* @__PURE__ */ o("span", { className: "flex items-center justify-center shrink-0", children: n }),
          /* @__PURE__ */ o("span", { className: "truncate", children: u }),
          c && /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              onClick: g,
              disabled: e,
              className: l(
                "flex items-center justify-center shrink-0 rounded-full transition-colors",
                "hover:bg-black/10 dark:hover:bg-white/10",
                "-mr-0.5 size-5"
              ),
              "aria-label": "삭제",
              children: /* @__PURE__ */ o(f, { size: 16 })
            }
          )
        ]
      }
    );
  }
);
y.displayName = "Chip";
export {
  y as Chip,
  k as chipVariants
};
//# sourceMappingURL=chip.mjs.map
