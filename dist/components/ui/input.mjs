import { jsx as t, jsxs as i } from "react/jsx-runtime";
import * as o from "react";
import { cn as s } from "../../lib/utils.mjs";
const g = [
  "flex rounded-[5px] border bg-gray-50/50 dark:bg-dark-400",
  "h-9 px-3 text-xs text-gray-900 dark:text-gray-100",
  "outline-none transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), m = [
  "border-gray-100 dark:border-dark-100",
  "placeholder:text-gray-300 dark:placeholder:text-gray-100",
  "focus:border-gray-500 dark:focus:border-gray-100"
].join(" "), k = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive dark:focus:border-red-500"
].join(" "), h = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, c = o.forwardRef(
  ({ className: d, error: e, ...r }, a) => /* @__PURE__ */ t(
    "input",
    {
      ref: a,
      className: s(
        g,
        e ? k : m,
        d
      ),
      "aria-invalid": e,
      ...r
    }
  )
);
c.displayName = "Input";
const v = o.forwardRef(
  ({ className: d, label: e, error: r, errorMessage: a, size: x = "full", id: p, rightIcon: l, onRightIconClick: u, rightIconLabel: y = "아이콘 버튼", ...b }, f) => {
    const n = p || o.useId();
    return /* @__PURE__ */ i("div", { className: s("flex flex-col gap-1", h[x]), children: [
      e && /* @__PURE__ */ t(
        "label",
        {
          htmlFor: n,
          className: "text-[length:var(--text-body-2)] text-gray-600 dark:text-gray-50",
          children: e
        }
      ),
      /* @__PURE__ */ i("div", { className: "relative", children: [
        /* @__PURE__ */ t(
          c,
          {
            id: n,
            ref: f,
            error: r,
            className: s("w-full", l && "pr-9", d),
            ...b
          }
        ),
        l && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: u,
            "aria-label": y,
            className: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100",
            tabIndex: -1,
            children: l
          }
        )
      ] }),
      r && a && /* @__PURE__ */ t("span", { className: "text-[length:var(--text-body-2)] text-destructive dark:text-red-400", children: a })
    ] });
  }
);
v.displayName = "InputField";
export {
  c as Input,
  v as InputField,
  h as inputSizeStyles
};
//# sourceMappingURL=input.mjs.map
