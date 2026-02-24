import { jsx as r, jsxs as c } from "react/jsx-runtime";
import * as l from "react";
import * as t from "@radix-ui/react-radio-group";
import { cn as d } from "../../lib/utils.mjs";
const p = l.forwardRef(({ className: a, ...e }, s) => /* @__PURE__ */ r(
  t.Root,
  {
    className: d("grid gap-2", a),
    ...e,
    ref: s
  }
));
p.displayName = t.Root.displayName;
const m = {
  primary: "group-data-[state=checked]:bg-blue-500",
  success: "group-data-[state=checked]:bg-green-500",
  danger: "group-data-[state=checked]:bg-red-500"
}, u = l.forwardRef(({ className: a, label: e, variant: s = "primary", ...o }, i) => {
  const g = m[s], n = /* @__PURE__ */ r(
    t.Item,
    {
      ref: i,
      className: d(
        // 기본 스타일 (12x12, 원형) - Figma 기준
        "peer size-3 shrink-0 rounded-md border flex items-center justify-center cursor-pointer group",
        // Default 상태: bg-slate-50, border-slate-200
        "bg-slate-50 border-slate-200",
        // Hover 상태: bg-slate-400, border-slate-400
        "hover:bg-slate-400 hover:border-slate-400",
        // 포커스 상태
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        // 비활성화 상태
        "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:border-slate-200",
        // 다크모드
        "dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-500 dark:hover:border-slate-500",
        a
      ),
      ...o,
      children: /* @__PURE__ */ r(
        "span",
        {
          className: d(
            "size-1.5 rounded-full transition-colors",
            // 기본: 회색, Hover: 회색 유지
            "bg-slate-200 group-hover:bg-slate-200",
            // 선택 시: 색상 변경 (variant에 따라)
            g,
            // 다크모드
            "dark:bg-slate-500 dark:group-hover:bg-slate-400"
          )
        }
      )
    }
  );
  return e ? /* @__PURE__ */ c("label", { className: "inline-flex items-center gap-1.5 cursor-pointer align-middle", children: [
    n,
    /* @__PURE__ */ r("span", { className: "text-xs text-slate-600 tracking-[-0.12px] dark:text-slate-200 leading-none", children: e })
  ] }) : n;
});
u.displayName = t.Item.displayName;
const b = l.forwardRef(({ className: a, label: e, children: s, ...o }, i) => /* @__PURE__ */ c("div", { className: "flex flex-col gap-1.5", children: [
  e && /* @__PURE__ */ r("span", { className: "text-xs text-slate-600 dark:text-slate-50", children: e }),
  /* @__PURE__ */ r(p, { ref: i, className: a, ...o, children: s })
] }));
b.displayName = "RadioGroupField";
export {
  p as RadioGroup,
  b as RadioGroupField,
  u as RadioGroupItem
};
//# sourceMappingURL=radio-group.mjs.map
