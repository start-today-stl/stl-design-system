import { jsx as t, jsxs as p } from "react/jsx-runtime";
import * as n from "react";
import { cn as l } from "../../lib/utils.mjs";
const k = [
  "flex rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "h-9 px-3 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), w = [
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
].join(" "), N = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, x = n.forwardRef(
  ({ className: s, error: e, tableMode: r, ...a }, d) => /* @__PURE__ */ t(
    "input",
    {
      ref: d,
      className: l(k, e ? v : r ? y : w, s),
      "aria-invalid": e,
      ...a
    }
  )
);
x.displayName = "Input";
const S = n.forwardRef(
  ({ className: s, label: e, error: r, errorMessage: a, size: d = "full", id: i, rightIcon: o, onRightIconClick: u, rightIconLabel: b = "아이콘 버튼", reserveLabelSpace: f, ...h }, m) => {
    const c = i || n.useId();
    return /* @__PURE__ */ p("div", { className: l("flex flex-col gap-1", N[d]), children: [
      (e || f) && /* @__PURE__ */ t(
        "label",
        {
          htmlFor: c,
          className: l(
            "text-xs text-slate-600 dark:text-slate-50",
            !e && "invisible"
          ),
          children: e || " "
        }
      ),
      /* @__PURE__ */ p("div", { className: "relative", children: [
        /* @__PURE__ */ t(
          x,
          {
            id: c,
            ref: m,
            error: r,
            className: l("w-full", o && "pr-9", s),
            ...h
          }
        ),
        o && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: u,
            "aria-label": b,
            className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-white",
            tabIndex: -1,
            children: o
          }
        )
      ] }),
      r && a && /* @__PURE__ */ t("span", { className: "text-xs text-destructive dark:text-red-400", children: a })
    ] });
  }
);
S.displayName = "InputField";
export {
  x as Input,
  S as InputField,
  N as inputSizeStyles
};
//# sourceMappingURL=input.mjs.map
