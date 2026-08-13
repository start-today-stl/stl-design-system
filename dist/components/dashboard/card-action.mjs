import { jsx as s } from "react/jsx-runtime";
import * as n from "react";
import { cva as i } from "class-variance-authority";
import { cn as c } from "../../lib/utils.mjs";
const l = i(
  "h-[18px] px-[5px] rounded-[2px] border text-[10px] tracking-[-0.1px] whitespace-nowrap transition-colors cursor-pointer inline-flex items-center justify-center border-slate-200 text-slate-700 dark:border-slate-600 dark:text-slate-100",
  {
    variants: {
      // 카드 기본 배경(dark: slate-800) 과 구분되는 선에서 가장 어둡게 잡는다.
      // 더 밝히면 10px 글자 대비가 4.5:1 아래로 떨어진다 (slate-500 기준 4.34:1).
      // 액션 호버 중에는 StatCard 가 카드 호버색을 되돌리므로 겹칠 일이 없다.
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
      className: c(l({ selected: e }), t),
      ...a,
      children: r
    }
  )
);
d.displayName = "CardAction";
export {
  d as CardAction,
  l as cardActionVariants
};
//# sourceMappingURL=card-action.mjs.map
