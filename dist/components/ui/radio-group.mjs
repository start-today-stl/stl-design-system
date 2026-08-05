import { jsx as r, jsxs as l } from "react/jsx-runtime";
import * as n from "react";
import * as o from "@radix-ui/react-radio-group";
import { cn as c } from "../../lib/utils.mjs";
const p = n.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ r(
  o.Root,
  {
    className: c("grid gap-2", a),
    ...e,
    ref: t
  }
));
p.displayName = o.Root.displayName;
const f = {
  sm: { root: "size-3", dot: "size-1.5" },
  md: { root: "size-4", dot: "size-2" },
  lg: { root: "size-5", dot: "size-2.5" }
}, h = {
  primary: "group-data-[state=checked]:bg-blue-500 dark:group-data-[state=checked]:bg-blue-400",
  success: "group-data-[state=checked]:bg-green-500 dark:group-data-[state=checked]:bg-green-400",
  danger: "group-data-[state=checked]:bg-red-500 dark:group-data-[state=checked]:bg-red-400"
}, k = n.forwardRef(({ className: a, label: e, variant: t = "primary", size: s = "md", ...d }, i) => {
  const u = h[t], { root: m, dot: b } = f[s], g = /* @__PURE__ */ r(
    o.Item,
    {
      ref: i,
      className: c(
        // 원형. rounded-full 을 쓰는 이유: 기존 rounded-md(6px) 는 12px 크기에서만 우연히
        // 정원으로 보이고(6px = 절반), 크기를 키우면 모서리 둥근 사각형이 된다.
        // sm 에서는 렌더 결과가 기존과 동일하다.
        "peer shrink-0 rounded-full border flex items-center justify-center cursor-pointer group",
        m,
        // Default 상태: bg-slate-50, border-slate-200
        "bg-slate-50 border-slate-200",
        // Hover 상태: bg-slate-400, border-slate-400
        "hover:bg-slate-400 hover:border-slate-400",
        // 포커스 상태
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        // 비활성화 상태
        "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:border-slate-200",
        // 다크모드: 배경 어둡게, hover시 바깥원이 내부원보다 어둡게
        "dark:bg-slate-800 dark:border-slate-500 dark:hover:bg-slate-600 dark:hover:border-slate-500",
        a
      ),
      ...d,
      children: /* @__PURE__ */ r(
        "span",
        {
          className: c(
            "rounded-full transition-colors",
            b,
            // 기본: 회색, Hover: 회색 유지
            "bg-slate-200 group-hover:bg-slate-200",
            // 선택 시: 색상 변경 (variant에 따라)
            u,
            // 다크모드
            "dark:bg-slate-500 dark:group-hover:bg-slate-400"
          )
        }
      )
    }
  );
  return e ? /* @__PURE__ */ l("label", { className: "inline-flex items-center gap-1.5 cursor-pointer align-middle", children: [
    g,
    /* @__PURE__ */ r("span", { className: "text-xs text-slate-700 tracking-[-0.12px] dark:text-slate-200 leading-none", children: e })
  ] }) : g;
});
k.displayName = o.Item.displayName;
const x = n.forwardRef(({ className: a, label: e, children: t, required: s, ...d }, i) => /* @__PURE__ */ l("div", { className: "flex flex-col gap-1.5", children: [
  e && /* @__PURE__ */ l("span", { className: "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400", children: [
    s && /* @__PURE__ */ r("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
    e
  ] }),
  /* @__PURE__ */ r(p, { ref: i, className: a, required: s, ...d, children: t })
] }));
x.displayName = "RadioGroupField";
export {
  p as RadioGroup,
  x as RadioGroupField,
  k as RadioGroupItem
};
//# sourceMappingURL=radio-group.mjs.map
