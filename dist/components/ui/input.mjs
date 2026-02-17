import { jsx as t, jsxs as p } from "react/jsx-runtime";
import * as o from "react";
import { cn as n } from "../../lib/utils.mjs";
const m = [
  "flex rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "h-9 px-3 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), k = [
  "border-slate-100 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), y = [
  "border-slate-300 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-slate-500 focus:border-[1.5px] focus:shadow-none dark:focus:border-slate-300"
].join(" "), v = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), w = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, x = o.forwardRef(
  ({ className: l, error: e, tableMode: a, ...r }, s) => /* @__PURE__ */ t(
    "input",
    {
      ref: s,
      className: n(m, e ? v : a ? y : k, l),
      "aria-invalid": e,
      ...r
    }
  )
);
x.displayName = "Input";
const N = o.forwardRef(
  ({ className: l, label: e, error: a, errorMessage: r, size: s = "full", id: i, rightIcon: d, onRightIconClick: u, rightIconLabel: b = "아이콘 버튼", ...f }, h) => {
    const c = i || o.useId();
    return /* @__PURE__ */ p("div", { className: n("flex flex-col gap-1", w[s]), children: [
      e && /* @__PURE__ */ t(
        "label",
        {
          htmlFor: c,
          className: "text-[length:var(--text-body-2)] text-slate-600 dark:text-slate-50",
          children: e
        }
      ),
      /* @__PURE__ */ p("div", { className: "relative", children: [
        /* @__PURE__ */ t(
          x,
          {
            id: c,
            ref: h,
            error: a,
            className: n("w-full", d && "pr-9", l),
            ...f
          }
        ),
        d && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: u,
            "aria-label": b,
            className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-white",
            tabIndex: -1,
            children: d
          }
        )
      ] }),
      a && r && /* @__PURE__ */ t("span", { className: "text-[length:var(--text-body-2)] text-destructive dark:text-red-400", children: r })
    ] });
  }
);
N.displayName = "InputField";
export {
  x as Input,
  N as InputField,
  w as inputSizeStyles
};
//# sourceMappingURL=input.mjs.map
