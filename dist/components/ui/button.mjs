import { jsxs as l, jsx as s } from "react/jsx-runtime";
import * as c from "react";
import { Slot as w } from "@radix-ui/react-slot";
import { cva as k } from "class-variance-authority";
import { cn as b } from "../../lib/utils.mjs";
function I({ size: a }) {
  const e = c.useId();
  return /* @__PURE__ */ l(
    "svg",
    {
      className: b("animate-spin", a === "sm" ? "size-3" : "size-6"),
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ s("defs", { children: /* @__PURE__ */ l("linearGradient", { id: e, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
          /* @__PURE__ */ s("stop", { offset: "0%", stopColor: "rgba(255,255,255,1)" }),
          /* @__PURE__ */ s("stop", { offset: "100%", stopColor: "rgba(255,255,255,0.3)" })
        ] }) }),
        /* @__PURE__ */ s(
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "10",
            stroke: `url(#${e})`,
            strokeWidth: "4",
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
}
const N = k(
  "inline-flex items-center justify-center gap-0.5 whitespace-nowrap font-normal transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Ghost (Slate) - 중립 버튼 (Figma: ButtonGhost)
        ghost: "bg-slate-50 border-[0.75px] border-slate-200 text-slate-700 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-600 dark:active:bg-slate-500",
        // Ghost Outline (Slate) - 중립 버튼 아웃라인
        "ghost-outline": "border-[0.75px] border-slate-500 text-slate-600 bg-transparent hover:bg-slate-500/50 hover:text-white active:bg-slate-500 active:text-white dark:border-slate-200 dark:text-slate-200 dark:hover:bg-slate-200/50 dark:active:bg-slate-200",
        // Primary (Blue) - 주요 액션 버튼 (Figma: ButtonPrimary)
        primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
        // Primary Outline (Blue) - 주요 액션 버튼 아웃라인
        "primary-outline": "border-[0.75px] border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500/50 hover:text-white active:bg-blue-500 active:text-white",
        // Danger (Red) - 삭제/경고 버튼 (Figma: ButtonDanger)
        danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
        // Danger Outline (Red) - 삭제/경고 버튼 아웃라인
        "danger-outline": "border-[0.75px] border-red-500 text-red-500 bg-transparent hover:bg-red-500/50 hover:text-white active:bg-red-500 active:text-white",
        // Success (Green) - 완료/긍정 버튼 (Figma: ButtonPositive)
        success: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700",
        // Success Outline (Green) - 완료/긍정 버튼 아웃라인
        "success-outline": "border-[0.75px] border-green-500 text-green-500 bg-transparent hover:bg-green-500/50 hover:text-white active:bg-green-500 active:text-white",
        // Text - 텍스트만 있는 버튼 (배경/테두리 없음)
        text: "bg-transparent text-slate-700 hover:text-blue-500 active:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 dark:active:text-blue-500"
      },
      size: {
        // 텍스트 또는 아이콘+텍스트 버튼
        default: "h-9 px-2.5 py-2 rounded text-xs tracking-[-0.12px]",
        sm: "h-6 px-2.5 py-2 rounded text-[10px] tracking-[-0.1px]",
        // 아이콘만 있는 버튼 (정사각형)
        icon: "h-9 w-9 p-2 rounded [&_svg]:ml-0",
        "icon-sm": "h-8 w-8 p-1.5 rounded [&_svg]:ml-0"
      }
    },
    defaultVariants: {
      variant: "ghost",
      size: "default"
    }
  }
);
function S(a) {
  const e = c.Children.toArray(a);
  if (e.length === 0) return { hasIconLeft: !1, hasIconRight: !1, isIconOnly: !1 };
  const r = e[0], d = e[e.length - 1], n = (t) => {
    var i, o;
    return c.isValidElement(t) ? t.type === "svg" || typeof t.type == "function" && ((i = t.type.displayName) == null ? void 0 : i.includes("Icon")) || typeof t.type == "function" && ((o = t.type.name) == null ? void 0 : o.includes("Icon")) : !1;
  }, g = e.length === 1 && n(r);
  return {
    hasIconLeft: n(r) && e.length > 1,
    hasIconRight: n(d) && e.length > 1,
    isIconOnly: g
  };
}
const C = c.forwardRef(
  ({ className: a, variant: e, size: r, asChild: d = !1, loading: n = !1, reserveLabelSpace: g = !1, children: t, disabled: i, ...o }, f) => {
    const h = d ? w : "button", v = r === "sm" ? "sm" : "default", { hasIconLeft: p, hasIconRight: u, isIconOnly: m } = S(t), y = () => r === "icon" || r === "icon-sm" ? "" : m ? "!px-1.5" : p && u ? "!pl-[7px] !pr-[7px]" : p ? "!pl-[7px] !pr-3" : u ? "!pl-3 !pr-[7px]" : "", x = /* @__PURE__ */ l(
      h,
      {
        className: b(N({ variant: e, size: r, className: a }), y(), n && "relative"),
        ref: f,
        disabled: i || n,
        ...o,
        children: [
          n && /* @__PURE__ */ s("span", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ s(I, { size: v }) }),
          /* @__PURE__ */ s("span", { className: b("inline-flex items-center gap-0.5", n && "invisible"), children: t })
        ]
      }
    );
    return g ? /* @__PURE__ */ l("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ s("span", { className: "invisible text-xs", children: " " }),
      x
    ] }) : x;
  }
);
C.displayName = "Button";
export {
  C as Button,
  N as buttonVariants
};
//# sourceMappingURL=button.mjs.map
