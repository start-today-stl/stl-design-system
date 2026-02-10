import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as d from "react";
import { cn as o } from "../../lib/utils.mjs";
const h = [
  "flex rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "h-9 px-3 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), k = [
  "border-slate-100 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), v = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), w = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, x = d.forwardRef(
  ({ className: r, error: e, ...a }, l) => /* @__PURE__ */ t(
    "input",
    {
      ref: l,
      className: o(
        h,
        e ? v : k,
        r
      ),
      "aria-invalid": e,
      ...a
    }
  )
);
x.displayName = "Input";
const y = d.forwardRef(
  ({ className: r, label: e, error: a, errorMessage: l, size: p = "full", id: c, rightIcon: s, onRightIconClick: u, rightIconLabel: b = "아이콘 버튼", ...f }, m) => {
    const i = c || d.useId();
    return /* @__PURE__ */ n("div", { className: o("flex flex-col gap-1", w[p]), children: [
      e && /* @__PURE__ */ t(
        "label",
        {
          htmlFor: i,
          className: "text-[length:var(--text-body-2)] text-slate-600 dark:text-slate-50",
          children: e
        }
      ),
      /* @__PURE__ */ n("div", { className: "relative", children: [
        /* @__PURE__ */ t(
          x,
          {
            id: i,
            ref: m,
            error: a,
            className: o("w-full", s && "pr-9", r),
            ...f
          }
        ),
        s && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: u,
            "aria-label": b,
            className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-white",
            tabIndex: -1,
            children: s
          }
        )
      ] }),
      a && l && /* @__PURE__ */ t("span", { className: "text-[length:var(--text-body-2)] text-destructive dark:text-red-400", children: l })
    ] });
  }
);
y.displayName = "InputField";
export {
  x as Input,
  y as InputField,
  w as inputSizeStyles
};
//# sourceMappingURL=input.mjs.map
