import { jsx as r, jsxs as n } from "react/jsx-runtime";
import * as l from "react";
import { cn as p } from "../../lib/utils.mjs";
const u = [
  "flex w-full rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "min-h-[80px] px-3 py-2 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors resize-y",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), f = [
  "border-slate-100 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), b = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), o = l.forwardRef(
  ({ className: d, error: e, ...t }, a) => /* @__PURE__ */ r(
    "textarea",
    {
      ref: a,
      className: p(
        u,
        e ? b : f,
        d
      ),
      "aria-invalid": e,
      ...t
    }
  )
);
o.displayName = "Textarea";
const m = l.forwardRef(
  ({ className: d, label: e, error: t, errorMessage: a, id: x, ...c }, i) => {
    const s = x || l.useId();
    return /* @__PURE__ */ n("div", { className: "flex flex-col gap-1 w-full", children: [
      e && /* @__PURE__ */ r(
        "label",
        {
          htmlFor: s,
          className: "text-[length:var(--text-body-2)] text-slate-600 dark:text-slate-50",
          children: e
        }
      ),
      /* @__PURE__ */ r(
        o,
        {
          id: s,
          ref: i,
          error: t,
          className: d,
          ...c
        }
      ),
      t && a && /* @__PURE__ */ r("span", { className: "text-[length:var(--text-body-2)] text-destructive dark:text-red-400", children: a })
    ] });
  }
);
m.displayName = "TextareaField";
export {
  o as Textarea,
  m as TextareaField
};
//# sourceMappingURL=textarea.mjs.map
