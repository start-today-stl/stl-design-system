import { jsxs as i, jsx as e, Fragment as v } from "react/jsx-runtime";
import * as k from "react";
import { cva as y } from "class-variance-authority";
import { cn as s } from "../../lib/utils.mjs";
function w({ size: t = 14 }) {
  return /* @__PURE__ */ i(
    "svg",
    {
      width: t,
      height: t,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ e("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
        /* @__PURE__ */ e("line", { x1: "18", y1: "6", x2: "6", y2: "18" })
      ]
    }
  );
}
const N = y(
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
    className: t,
    variant: b,
    size: c,
    children: h,
    removable: g,
    onRemove: a,
    onClick: r,
    disabled: n,
    leftElement: l,
    ...p
  }, x) => {
    const d = !!r, m = (o) => {
      o.stopPropagation(), a == null || a();
    }, f = d && !n ? (o) => {
      o.stopPropagation(), r == null || r();
    } : void 0, u = /* @__PURE__ */ i(v, { children: [
      l && /* @__PURE__ */ e("span", { className: "flex items-center justify-center shrink-0", children: l }),
      /* @__PURE__ */ e("span", { className: "truncate", children: h })
    ] });
    return /* @__PURE__ */ i(
      "div",
      {
        ref: x,
        className: s(
          N({ variant: b, size: c }),
          n && "opacity-50 cursor-not-allowed pointer-events-none",
          t
        ),
        ...p,
        children: [
          d ? /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: f,
              disabled: n,
              className: s(
                "inline-flex items-center gap-1.5 min-w-0 cursor-pointer outline-none",
                "focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              ),
              children: u
            }
          ) : u,
          g && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: m,
              disabled: n,
              className: s(
                "flex items-center justify-center shrink-0 rounded-full transition-colors",
                "hover:bg-black/10 dark:hover:bg-white/10",
                "-mr-0.5 size-5"
              ),
              "aria-label": "삭제",
              children: /* @__PURE__ */ e(w, { size: 14 })
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
  N as chipVariants
};
//# sourceMappingURL=chip.mjs.map
