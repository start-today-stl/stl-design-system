import { jsx as e, jsxs as l } from "react/jsx-runtime";
import * as h from "react";
import * as t from "@radix-ui/react-checkbox";
import { cn as b } from "../../lib/utils.mjs";
const m = () => /* @__PURE__ */ e(
  "svg",
  {
    width: "10",
    height: "9",
    viewBox: "0 0 10 9",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ e(
      "path",
      {
        d: "M0.295898 3.7124L3.7959 8.2124L9.2959 0.212402",
        stroke: "currentColor",
        strokeWidth: "0.75"
      }
    )
  }
), k = () => /* @__PURE__ */ e(
  "svg",
  {
    width: "10",
    height: "2",
    viewBox: "0 0 10 2",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ e("path", { d: "M0 1H10", stroke: "currentColor", strokeWidth: "1.5" })
  }
), x = h.forwardRef(({ className: s, label: r, indeterminate: a, checked: n, ...o }, d) => {
  const c = a ? "indeterminate" : n, i = /* @__PURE__ */ e(
    t.Root,
    {
      ref: d,
      checked: c,
      className: b(
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
        s
      ),
      ...o,
      children: /* @__PURE__ */ e(t.Indicator, { className: "flex items-center justify-center text-current", children: a ? /* @__PURE__ */ e(k, {}) : /* @__PURE__ */ e(m, {}) })
    }
  );
  return r ? /* @__PURE__ */ l("label", { className: "inline-flex items-center gap-1.5 cursor-pointer align-middle", children: [
    i,
    /* @__PURE__ */ e("span", { className: "text-xs text-slate-600 tracking-[-0.12px] dark:text-slate-200 leading-none", children: r })
  ] }) : i;
});
x.displayName = t.Root.displayName;
export {
  x as Checkbox
};
//# sourceMappingURL=checkbox.mjs.map
