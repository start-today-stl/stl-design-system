import { jsx as a, jsxs as x } from "react/jsx-runtime";
import * as l from "react";
import { cn as o } from "../../lib/utils.mjs";
const f = [
  "flex rounded-[5px] border bg-gray-50/50 dark:bg-dark-400",
  "h-9 px-3 text-xs text-gray-900 dark:text-gray-100",
  "outline-none transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), y = [
  "border-gray-100 dark:border-dark-100",
  "placeholder:text-gray-300 dark:placeholder:text-gray-100",
  "focus:border-gray-500 dark:focus:border-gray-100"
].join(" "), m = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive dark:focus:border-red-500"
].join(" "), b = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, n = l.forwardRef(
  ({ className: d, error: e, ...t }, r) => /* @__PURE__ */ a(
    "input",
    {
      ref: r,
      className: o(
        f,
        e ? m : y,
        d
      ),
      "aria-invalid": e,
      ...t
    }
  )
);
n.displayName = "Input";
const g = l.forwardRef(
  ({ className: d, label: e, error: t, errorMessage: r, size: i = "full", id: c, ...p }, u) => {
    const s = c || l.useId();
    return /* @__PURE__ */ x("div", { className: o("flex flex-col gap-1", b[i]), children: [
      e && /* @__PURE__ */ a(
        "label",
        {
          htmlFor: s,
          className: "text-[length:var(--text-body-2)] text-gray-600 dark:text-gray-50",
          children: e
        }
      ),
      /* @__PURE__ */ a(
        n,
        {
          id: s,
          ref: u,
          error: t,
          className: o("w-full", d),
          ...p
        }
      ),
      t && r && /* @__PURE__ */ a("span", { className: "text-[length:var(--text-body-2)] text-destructive dark:text-red-400", children: r })
    ] });
  }
);
g.displayName = "InputField";
export {
  n as Input,
  g as InputField,
  b as inputSizeStyles
};
//# sourceMappingURL=input.mjs.map
