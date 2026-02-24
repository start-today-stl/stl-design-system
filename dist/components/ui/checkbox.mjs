import { jsx as e, jsxs as l } from "react/jsx-runtime";
import * as m from "react";
import * as t from "@radix-ui/react-checkbox";
import { Minus as b, Check as h } from "lucide-react";
import { cn as k } from "../../lib/utils.mjs";
const x = m.forwardRef(({ className: i, label: a, indeterminate: r, checked: d, ...c }, n) => {
  const o = r ? "indeterminate" : d, s = /* @__PURE__ */ e(
    t.Root,
    {
      ref: n,
      checked: o,
      className: k(
        // 기본 스타일 (20x20, 2px radius)
        "peer h-5 w-5 shrink-0 rounded-[2px] border-[0.75px] flex items-center justify-center cursor-pointer",
        // 미체크 상태
        "border-slate-500 bg-white",
        // 체크 상태
        "data-[state=checked]:bg-blue-500 data-[state=checked]:border-slate-500 data-[state=checked]:text-white",
        // 인디터미네이트 상태
        "data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:border-slate-500 data-[state=indeterminate]:text-white",
        // 포커스 상태 (inset ring으로 레이아웃 시프트 방지)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        // 비활성화 상태
        "disabled:cursor-not-allowed disabled:opacity-30",
        // 다크모드
        "dark:border-slate-200 dark:bg-slate-900 dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-slate-200",
        "dark:data-[state=indeterminate]:bg-blue-500 dark:data-[state=indeterminate]:border-slate-200",
        i
      ),
      ...c,
      children: /* @__PURE__ */ e(t.Indicator, { className: "flex items-center justify-center text-current", children: r ? /* @__PURE__ */ e(b, { className: "h-3 w-3", strokeWidth: 3 }) : /* @__PURE__ */ e(h, { className: "h-3 w-3", strokeWidth: 3 }) })
    }
  );
  return a ? /* @__PURE__ */ l("label", { className: "inline-flex items-center gap-1.5 cursor-pointer align-middle", children: [
    s,
    /* @__PURE__ */ e("span", { className: "text-xs text-slate-600 tracking-[-0.12px] dark:text-slate-200 leading-none", children: a })
  ] }) : s;
});
x.displayName = t.Root.displayName;
export {
  x as Checkbox
};
//# sourceMappingURL=checkbox.mjs.map
