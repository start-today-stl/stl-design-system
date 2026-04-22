import { jsx as t, jsxs as i } from "react/jsx-runtime";
import * as u from "react";
import { cn as e } from "../../lib/utils.mjs";
import { Spinner as E } from "./spinner.mjs";
import { EyeIcon as F } from "../../icons/EyeIcon.mjs";
const S = [
  "flex rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "h-9 px-3 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), M = [
  "border-slate-100 dark:border-slate-500",
  "placeholder:text-slate-400 dark:placeholder:text-slate-500",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), B = [
  "border-slate-300 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-500",
  "focus:border-slate-500 focus:border-[1.5px] focus:shadow-none dark:focus:border-slate-300"
].join(" "), D = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), _ = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, j = u.forwardRef(
  ({ className: c, label: s, error: a, errorMessage: l, size: x = "full", id: I, rightIcon: o, onRightIconClick: C, rightIconLabel: P = "아이콘 버튼", reserveLabelSpace: p, loading: h, showPasswordToggle: R, required: d, type: b, tableMode: f, ...m }, k) => {
    const n = I || u.useId(), [r, T] = u.useState(!1), w = b === "password", y = w && R !== !1, v = o || h || y, g = w && r ? "text" : b, N = () => a ? D : f ? B : M;
    if (f && !s && !p && !l && !v)
      return /* @__PURE__ */ t(
        "input",
        {
          id: n,
          ref: k,
          type: g,
          required: d,
          className: e(S, N(), _[x], c),
          "aria-invalid": a,
          ...m
        }
      );
    const z = () => h ? /* @__PURE__ */ t("div", { className: "absolute right-2 top-1/2 -translate-y-1/2", children: /* @__PURE__ */ t(E, { size: "sm" }) }) : y ? /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => T(!r),
        "aria-label": r ? "비밀번호 숨기기" : "비밀번호 보기",
        className: e(
          "absolute right-2 top-1/2 -translate-y-1/2 text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-white cursor-pointer",
          r && "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        ),
        tabIndex: -1,
        children: /* @__PURE__ */ t(F, { size: 24 })
      }
    ) : o ? /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: C,
        "aria-label": P,
        className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-white",
        tabIndex: -1,
        children: o
      }
    ) : null;
    return /* @__PURE__ */ i("div", { className: e("flex flex-col gap-1", _[x]), children: [
      (s || p) && /* @__PURE__ */ i(
        "label",
        {
          htmlFor: n,
          className: e(
            "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400",
            !s && "invisible"
          ),
          children: [
            d && /* @__PURE__ */ t("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
            s || " "
          ]
        }
      ),
      /* @__PURE__ */ i("div", { className: "relative", children: [
        /* @__PURE__ */ t(
          "input",
          {
            id: n,
            ref: k,
            type: g,
            required: d,
            className: e(S, N(), "w-full", v && "pr-9", c),
            "aria-invalid": a,
            ...m
          }
        ),
        z()
      ] }),
      a && l && /* @__PURE__ */ t("span", { className: "text-xs text-destructive dark:text-red-400", children: l })
    ] });
  }
);
j.displayName = "Input";
const K = j;
export {
  j as Input,
  K as InputField,
  _ as inputSizeStyles
};
//# sourceMappingURL=input.mjs.map
