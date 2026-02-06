import { jsx as e, jsxs as c } from "react/jsx-runtime";
import * as n from "react";
import * as r from "@radix-ui/react-checkbox";
import { cn as d } from "../../lib/utils.mjs";
const l = () => /* @__PURE__ */ e(
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
), h = n.forwardRef(({ className: i, label: t, ...o }, s) => {
  const a = /* @__PURE__ */ e(
    r.Root,
    {
      ref: s,
      className: d(
        // 기본 스타일 (20x20, 2px radius)
        "peer h-5 w-5 shrink-0 rounded-[2px] border-[0.75px] flex items-center justify-center cursor-pointer",
        // 미체크 상태
        "border-gray-500 bg-white",
        // 체크 상태
        "data-[state=checked]:bg-primary data-[state=checked]:border-gray-500 data-[state=checked]:text-white",
        // 포커스 상태 (inset ring으로 레이아웃 시프트 방지)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        // 비활성화 상태
        "disabled:cursor-not-allowed disabled:opacity-30",
        // 다크모드
        "dark:border-gray-200 dark:bg-dark-500 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:border-gray-200",
        i
      ),
      ...o,
      children: /* @__PURE__ */ e(r.Indicator, { className: "flex items-center justify-center text-current", children: /* @__PURE__ */ e(l, {}) })
    }
  );
  return t ? /* @__PURE__ */ c("label", { className: "inline-flex items-center gap-1.5 cursor-pointer align-middle", children: [
    a,
    /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 tracking-[-0.12px] dark:text-gray-200 leading-none", children: t })
  ] }) : a;
});
h.displayName = r.Root.displayName;
export {
  h as Checkbox
};
//# sourceMappingURL=checkbox.mjs.map
