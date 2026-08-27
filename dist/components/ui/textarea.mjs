import { jsx as a, jsxs as f } from "react/jsx-runtime";
import * as b from "react";
import { cn as l } from "../../lib/utils.mjs";
const m = [
  "flex w-full rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  // 높이는 `rows` prop 이 결정. 기본값은 컴포넌트 레벨에서 rows=3.
  // min-h 는 !important 로 지정 — resize-y 로 유저가 드래그해 min-h 이하로 축소하는
  // 브라우저 동작(일부 브라우저에서 min-h 무시)을 원천 차단.
  // 이전엔 min-h-[80px] 로 강제해 rows 프롭이 무력화되던 문제 있어 조정.
  "!min-h-9 px-3 py-2 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors resize-y",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), y = [
  "border-slate-200 dark:border-slate-500",
  "placeholder:text-slate-500 dark:placeholder:text-slate-500",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), _ = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), v = [
  "border-slate-300 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-500",
  "focus:border-slate-500 focus:border-[1.5px] focus:shadow-none dark:focus:border-slate-300"
].join(" "), h = b.forwardRef(
  ({ className: o, label: e, error: t, errorMessage: r, id: k, reserveLabelSpace: i, required: s, tableMode: x, rows: n = 3, ...c }, u) => {
    const d = k || b.useId(), p = () => t ? _ : x ? v : y;
    return x && !e && !i && !r ? /* @__PURE__ */ a(
      "textarea",
      {
        id: d,
        ref: u,
        required: s,
        className: l(m, p(), o),
        "aria-invalid": t,
        rows: n,
        ...c
      }
    ) : /* @__PURE__ */ f("div", { className: "flex flex-col gap-1 w-full", children: [
      (e || i) && /* @__PURE__ */ f(
        "label",
        {
          htmlFor: d,
          className: l(
            "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400",
            !e && "invisible"
          ),
          children: [
            s && /* @__PURE__ */ a("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
            e || " "
          ]
        }
      ),
      /* @__PURE__ */ a(
        "textarea",
        {
          id: d,
          ref: u,
          required: s,
          className: l(m, p(), o),
          "aria-invalid": t,
          rows: n,
          ...c
        }
      ),
      t && r && /* @__PURE__ */ a("span", { className: "text-xs text-destructive dark:text-red-400", children: r })
    ] });
  }
);
h.displayName = "Textarea";
const N = h;
export {
  h as Textarea,
  N as TextareaField
};
//# sourceMappingURL=textarea.mjs.map
