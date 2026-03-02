import { jsx as a, jsxs as p } from "react/jsx-runtime";
import * as f from "react";
import { cn as o } from "../../lib/utils.mjs";
const b = [
  "flex w-full rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "min-h-[80px] px-3 py-2 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors resize-y",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), k = [
  "border-slate-100 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), y = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), _ = [
  "border-slate-300 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-slate-500 focus:border-[1.5px] focus:shadow-none dark:focus:border-slate-300"
].join(" "), m = f.forwardRef(
  ({ className: l, label: e, error: t, errorMessage: r, id: h, reserveLabelSpace: i, required: s, tableMode: x, ...n }, c) => {
    const d = h || f.useId(), u = () => t ? y : x ? _ : k;
    return x && !e && !i && !r ? /* @__PURE__ */ a(
      "textarea",
      {
        id: d,
        ref: c,
        required: s,
        className: o(b, u(), l),
        "aria-invalid": t,
        ...n
      }
    ) : /* @__PURE__ */ p("div", { className: "flex flex-col gap-1 w-full", children: [
      (e || i) && /* @__PURE__ */ p(
        "label",
        {
          htmlFor: d,
          className: o(
            "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50",
            !e && "invisible"
          ),
          children: [
            s && /* @__PURE__ */ a("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
            e || " "
          ]
        }
      ),
      /* @__PURE__ */ a(
        "textarea",
        {
          id: d,
          ref: c,
          required: s,
          className: o(b, u(), l),
          "aria-invalid": t,
          ...n
        }
      ),
      t && r && /* @__PURE__ */ a("span", { className: "text-xs text-destructive dark:text-red-400", children: r })
    ] });
  }
);
m.displayName = "Textarea";
const j = m;
export {
  m as Textarea,
  j as TextareaField
};
//# sourceMappingURL=textarea.mjs.map
