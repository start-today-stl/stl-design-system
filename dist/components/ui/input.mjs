import { jsx as e, jsxs as u } from "react/jsx-runtime";
import * as o from "react";
import { cn as r } from "../../lib/utils.mjs";
import { Spinner as z } from "./spinner.mjs";
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
].join(" "), F = [
  "border-slate-300 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-slate-500 focus:border-[1.5px] focus:shadow-none dark:focus:border-slate-300"
].join(" "), E = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), V = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, w = o.forwardRef(
  ({ className: d, error: t, tableMode: s, ...a }, n) => /* @__PURE__ */ e(
    "input",
    {
      ref: n,
      className: r(P, t ? E : s ? F : T, d),
      "aria-invalid": t,
      ...a
    }
  )
);
w.displayName = "Input";
const B = o.forwardRef(
  ({ className: d, label: t, error: s, errorMessage: a, size: n = "full", id: c, rightIcon: i, onRightIconClick: k, rightIconLabel: y = "아이콘 버튼", reserveLabelSpace: v, loading: p, showPasswordToggle: g, required: x, type: b, ...N }, S) => {
    const f = c || o.useId(), [l, _] = o.useState(!1), h = b === "password", m = h && g !== !1, I = i || p || m, j = h && l ? "text" : b, R = () => p ? /* @__PURE__ */ e("div", { className: "absolute right-2 top-1/2 -translate-y-1/2", children: /* @__PURE__ */ e(z, { size: "sm" }) }) : m ? /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: () => _(!l),
        "aria-label": l ? "비밀번호 숨기기" : "비밀번호 보기",
        className: r(
          "absolute right-2 top-1/2 -translate-y-1/2 text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-white",
          l && "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        ),
        tabIndex: -1,
        children: /* @__PURE__ */ e(C, { size: 24 })
      }
    ) : i ? /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: k,
        "aria-label": y,
        className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-white",
        tabIndex: -1,
        children: i
      }
    ) : null;
    return /* @__PURE__ */ u("div", { className: r("flex flex-col gap-1", V[n]), children: [
      (t || v) && /* @__PURE__ */ u(
        "label",
        {
          htmlFor: f,
          className: r(
            "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50",
            !t && "invisible"
          ),
          children: [
            x && /* @__PURE__ */ e("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
            t || " "
          ]
        }
      ),
      /* @__PURE__ */ u("div", { className: "relative", children: [
        /* @__PURE__ */ e(
          w,
          {
            id: f,
            ref: S,
            type: j,
            error: s,
            required: x,
            className: r("w-full", I && "pr-9", d),
            ...N
          }
        ),
        R()
      ] }),
      s && a && /* @__PURE__ */ e("span", { className: "text-xs text-destructive dark:text-red-400", children: a })
    ] });
  }
);
B.displayName = "InputField";
export {
  w as Input,
  B as InputField,
  V as inputSizeStyles
};
//# sourceMappingURL=input.mjs.map
