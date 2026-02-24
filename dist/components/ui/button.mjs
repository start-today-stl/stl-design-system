import { jsxs as g, jsx as s } from "react/jsx-runtime";
import * as c from "react";
import { Slot as m } from "@radix-ui/react-slot";
import { cva as y } from "class-variance-authority";
import { cn as b } from "../../lib/utils.mjs";
function w({ size: a }) {
  const e = c.useId();
  return /* @__PURE__ */ g(
    "svg",
    {
      className: b("animate-spin", a === "sm" ? "size-3" : "size-6"),
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ s("defs", { children: /* @__PURE__ */ g("linearGradient", { id: e, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
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
const k = y(
  "inline-flex items-center justify-center gap-0.5 whitespace-nowrap font-normal transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Ghost (Slate) - 중립 버튼 (Figma: ButtonGhost)
        ghost: "bg-slate-50 border-[0.75px] border-slate-200 text-slate-600 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-600 dark:active:bg-slate-500",
        // Ghost Outline (Slate) - 중립 버튼 아웃라인
        "ghost-outline": "border-[0.75px] border-slate-500 text-slate-500 bg-transparent hover:bg-slate-500/50 hover:text-white active:bg-slate-500 active:text-white dark:border-slate-200 dark:text-slate-200 dark:hover:bg-slate-200/50 dark:active:bg-slate-200",
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
        text: "bg-transparent text-slate-600 hover:text-blue-500 active:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 dark:active:text-blue-500"
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
function I(a) {
  const e = c.Children.toArray(a);
  if (e.length === 0) return { hasIconLeft: !1, hasIconRight: !1, isIconOnly: !1 };
  const t = e[0], d = e[e.length - 1], r = (n) => {
    var i, l;
    return c.isValidElement(n) ? n.type === "svg" || typeof n.type == "function" && ((i = n.type.displayName) == null ? void 0 : i.includes("Icon")) || typeof n.type == "function" && ((l = n.type.name) == null ? void 0 : l.includes("Icon")) : !1;
  }, o = e.length === 1 && r(t);
  return {
    hasIconLeft: r(t) && e.length > 1,
    hasIconRight: r(d) && e.length > 1,
    isIconOnly: o
  };
}
const N = c.forwardRef(
  ({ className: a, variant: e, size: t, asChild: d = !1, loading: r = !1, children: o, disabled: n, ...i }, l) => {
    const x = d ? m : "button", h = t === "sm" ? "sm" : "default", { hasIconLeft: p, hasIconRight: u, isIconOnly: v } = I(o), f = () => t === "icon" || t === "icon-sm" ? "" : v ? "!px-1.5" : p && u ? "!pl-[7px] !pr-[7px]" : p ? "!pl-[7px] !pr-3" : u ? "!pl-3 !pr-[7px]" : "";
    return /* @__PURE__ */ g(
      x,
      {
        className: b(k({ variant: e, size: t, className: a }), f(), r && "relative"),
        ref: l,
        disabled: n || r,
        ...i,
        children: [
          r && /* @__PURE__ */ s("span", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ s(w, { size: h }) }),
          /* @__PURE__ */ s("span", { className: b("inline-flex items-center gap-0.5", r && "invisible"), children: o })
        ]
      }
    );
  }
);
N.displayName = "Button";
export {
  N as Button,
  k as buttonVariants
};
//# sourceMappingURL=button.mjs.map
