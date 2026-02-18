import { jsx as r, jsxs as u } from "react/jsx-runtime";
import * as d from "react";
import { cn as o } from "../../lib/utils.mjs";
const f = [
  "flex w-full rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "min-h-[80px] px-3 py-2 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors resize-y",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), b = [
  "border-slate-100 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), m = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), x = d.forwardRef(
  ({ className: s, error: e, ...t }, a) => /* @__PURE__ */ r(
    "textarea",
    {
      ref: a,
      className: o(
        f,
        e ? m : b,
        s
      ),
      "aria-invalid": e,
      ...t
    }
  )
);
x.displayName = "Textarea";
const h = d.forwardRef(
  ({ className: s, label: e, error: t, errorMessage: a, id: i, reserveLabelSpace: c, ...n }, p) => {
    const l = i || d.useId();
    return /* @__PURE__ */ u("div", { className: "flex flex-col gap-1 w-full", children: [
      (e || c) && /* @__PURE__ */ r(
        "label",
        {
          htmlFor: l,
          className: o(
            "text-xs text-slate-600 dark:text-slate-50",
            !e && "invisible"
          ),
          children: e || " "
        }
      ),
      /* @__PURE__ */ r(
        x,
        {
          id: l,
          ref: p,
          error: t,
          className: s,
          ...n
        }
      ),
      t && a && /* @__PURE__ */ r("span", { className: "text-xs text-destructive dark:text-red-400", children: a })
    ] });
  }
);
h.displayName = "TextareaField";
export {
  x as Textarea,
  h as TextareaField
};
//# sourceMappingURL=textarea.mjs.map
