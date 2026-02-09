import { jsx as e, jsxs as n } from "react/jsx-runtime";
import * as o from "react";
import { cn as s } from "../../lib/utils.mjs";
const m = [
  "flex rounded-[5px] border bg-gray-50/50 dark:bg-dark-400",
  "h-9 px-3 text-xs text-gray-900 dark:text-gray-100",
  "outline-none transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), g = [
  "border-gray-100 dark:border-dark-100",
  "placeholder:text-gray-300 dark:placeholder:text-gray-100",
  "focus:border-primary focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), h = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), k = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, p = o.forwardRef(
  ({ className: d, error: t, ...r }, a) => /* @__PURE__ */ e(
    "input",
    {
      ref: a,
      className: s(
        m,
        t ? h : g,
        d
      ),
      "aria-invalid": t,
      ...r
    }
  )
);
p.displayName = "Input";
const v = o.forwardRef(
  ({ className: d, label: t, error: r, errorMessage: a, size: x = "full", id: c, rightIcon: l, onRightIconClick: u, rightIconLabel: y = "아이콘 버튼", ...b }, f) => {
    const i = c || o.useId();
    return /* @__PURE__ */ n("div", { className: s("flex flex-col gap-1", k[x]), children: [
      t && /* @__PURE__ */ e(
        "label",
        {
          htmlFor: i,
          className: "text-[length:var(--text-body-2)] text-gray-600 dark:text-gray-50",
          children: t
        }
      ),
      /* @__PURE__ */ n("div", { className: "relative", children: [
        /* @__PURE__ */ e(
          p,
          {
            id: i,
            ref: f,
            error: r,
            className: s("w-full", l && "pr-9", d),
            ...b
          }
        ),
        l && /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: u,
            "aria-label": y,
            className: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-900 hover:text-gray-600 dark:text-gray-50 dark:hover:text-white",
            tabIndex: -1,
            children: l
          }
        )
      ] }),
      r && a && /* @__PURE__ */ e("span", { className: "text-[length:var(--text-body-2)] text-destructive dark:text-red-400", children: a })
    ] });
  }
);
v.displayName = "InputField";
export {
  p as Input,
  v as InputField,
  k as inputSizeStyles
};
//# sourceMappingURL=input.mjs.map
