import { jsx as t, jsxs as f } from "react/jsx-runtime";
import * as o from "react";
import { cn as r } from "../../lib/utils.mjs";
import { Spinner as R } from "./spinner.mjs";
import { EyeIcon as C } from "../../icons/EyeIcon.mjs";
const P = [
  "flex rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "h-9 px-3 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), T = [
  "border-slate-100 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), z = [
  "border-slate-300 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-slate-500 focus:border-[1.5px] focus:shadow-none dark:focus:border-slate-300"
].join(" "), F = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), E = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, m = o.forwardRef(
  ({ className: d, error: e, tableMode: s, ...a }, n) => /* @__PURE__ */ t(
    "input",
    {
      ref: n,
      className: r(P, e ? F : s ? z : T, d),
      "aria-invalid": e,
      ...a
    }
  )
);
m.displayName = "Input";
const V = o.forwardRef(
  ({ className: d, label: e, error: s, errorMessage: a, size: n = "full", id: u, rightIcon: i, onRightIconClick: w, rightIconLabel: k = "아이콘 버튼", reserveLabelSpace: y, loading: c, showPasswordToggle: v, type: p, ...S }, g) => {
    const x = u || o.useId(), [l, N] = o.useState(!1), b = p === "password", h = b && v !== !1, _ = i || c || h, I = b && l ? "text" : p, j = () => c ? /* @__PURE__ */ t("div", { className: "absolute right-2 top-1/2 -translate-y-1/2", children: /* @__PURE__ */ t(R, { size: "sm" }) }) : h ? /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => N(!l),
        "aria-label": l ? "비밀번호 숨기기" : "비밀번호 보기",
        className: r(
          "absolute right-2 top-1/2 -translate-y-1/2 text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-white",
          l && "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        ),
        tabIndex: -1,
        children: /* @__PURE__ */ t(C, { size: 24 })
      }
    ) : i ? /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: w,
        "aria-label": k,
        className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-white",
        tabIndex: -1,
        children: i
      }
    ) : null;
    return /* @__PURE__ */ f("div", { className: r("flex flex-col gap-1", E[n]), children: [
      (e || y) && /* @__PURE__ */ t(
        "label",
        {
          htmlFor: x,
          className: r(
            "text-xs text-slate-600 dark:text-slate-50",
            !e && "invisible"
          ),
          children: e || " "
        }
      ),
      /* @__PURE__ */ f("div", { className: "relative", children: [
        /* @__PURE__ */ t(
          m,
          {
            id: x,
            ref: g,
            type: I,
            error: s,
            className: r("w-full", _ && "pr-9", d),
            ...S
          }
        ),
        j()
      ] }),
      s && a && /* @__PURE__ */ t("span", { className: "text-xs text-destructive dark:text-red-400", children: a })
    ] });
  }
);
V.displayName = "InputField";
export {
  m as Input,
  V as InputField,
  E as inputSizeStyles
};
//# sourceMappingURL=input.mjs.map
