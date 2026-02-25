import { jsx as r, jsxs as x } from "react/jsx-runtime";
import * as d from "react";
import { cn as i } from "../../lib/utils.mjs";
const b = [
  "flex w-full rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "min-h-[80px] px-3 py-2 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors resize-y",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), m = [
  "border-slate-100 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), h = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), c = d.forwardRef(
  ({ className: s, error: e, ...t }, a) => /* @__PURE__ */ r(
    "textarea",
    {
      ref: a,
      className: i(
        b,
        e ? h : m,
        s
      ),
      "aria-invalid": e,
      ...t
    }
  )
);
c.displayName = "Textarea";
const k = d.forwardRef(
  ({ className: s, label: e, error: t, errorMessage: a, id: n, reserveLabelSpace: p, required: l, ...u }, f) => {
    const o = n || d.useId();
    return /* @__PURE__ */ x("div", { className: "flex flex-col gap-1 w-full", children: [
      (e || p) && /* @__PURE__ */ x(
        "label",
        {
          htmlFor: o,
          className: i(
            "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50",
            !e && "invisible"
          ),
          children: [
            l && /* @__PURE__ */ r("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
            e || " "
          ]
        }
      ),
      /* @__PURE__ */ r(
        c,
        {
          id: o,
          ref: f,
          error: t,
          required: l,
          className: s,
          ...u
        }
      ),
      t && a && /* @__PURE__ */ r("span", { className: "text-xs text-destructive dark:text-red-400", children: a })
    ] });
  }
);
k.displayName = "TextareaField";
export {
  c as Textarea,
  k as TextareaField
};
//# sourceMappingURL=textarea.mjs.map
