import { jsx as r, jsxs as d } from "react/jsx-runtime";
import * as l from "react";
import * as t from "@radix-ui/react-radio-group";
import { cn as n } from "../../lib/utils.mjs";
const c = l.forwardRef(({ className: a, ...e }, s) => /* @__PURE__ */ r(
  t.Root,
  {
    className: n("grid gap-2", a),
    ...e,
    ref: s
  }
));
c.displayName = t.Root.displayName;
const m = l.forwardRef(({ className: a, label: e, ...s }, o) => {
  const i = /* @__PURE__ */ r(
    t.Item,
    {
      ref: o,
      className: n(
        // 기본 스타일 (20x20, 원형)
        "peer h-5 w-5 shrink-0 rounded-full border-[0.75px] flex items-center justify-center cursor-pointer",
        // 미선택 상태
        "border-slate-500 bg-white",
        // 선택 상태 - 테두리와 내부 원 모두 blue
        "data-[state=checked]:border-blue-500",
        // 포커스 상태
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        // 비활성화 상태
        "disabled:cursor-not-allowed disabled:opacity-30",
        // 다크모드
        "dark:border-slate-200 dark:bg-slate-900 dark:data-[state=checked]:border-blue-500",
        a
      ),
      ...s,
      children: /* @__PURE__ */ r(t.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ r("span", { className: "h-2.5 w-2.5 rounded-full bg-blue-500" }) })
    }
  );
  return e ? /* @__PURE__ */ d("label", { className: "inline-flex items-center gap-1.5 cursor-pointer align-middle", children: [
    i,
    /* @__PURE__ */ r("span", { className: "text-xs text-slate-600 tracking-[-0.12px] dark:text-slate-200 leading-none", children: e })
  ] }) : i;
});
m.displayName = t.Item.displayName;
const p = l.forwardRef(({ className: a, label: e, children: s, ...o }, i) => /* @__PURE__ */ d("div", { className: "flex flex-col gap-1.5", children: [
  e && /* @__PURE__ */ r("span", { className: "text-xs text-slate-600 dark:text-slate-50", children: e }),
  /* @__PURE__ */ r(c, { ref: i, className: a, ...o, children: s })
] }));
p.displayName = "RadioGroupField";
export {
  c as RadioGroup,
  p as RadioGroupField,
  m as RadioGroupItem
};
//# sourceMappingURL=radio-group.mjs.map
