import { jsxs as t, jsx as e } from "react/jsx-runtime";
import * as y from "react";
import { cn as b } from "../../lib/utils.mjs";
import { Button as i } from "./button.mjs";
import { HomeIcon as j } from "../../icons/HomeIcon.mjs";
const C = y.forwardRef(
  ({
    className: c,
    code: a,
    title: s,
    description: o,
    backLabel: m = "이전으로 돌아가기",
    primaryLabel: x = "홈으로 돌아가기",
    primaryIcon: f,
    onBack: d,
    onPrimary: p,
    hideBackButton: r = !1,
    hidePrimaryButton: n = !1,
    ...h
  }, N) => {
    const g = f ?? /* @__PURE__ */ e(j, { size: 24 });
    return /* @__PURE__ */ t(
      "div",
      {
        ref: N,
        className: b(
          "flex flex-col items-center justify-center text-center",
          c
        ),
        ...h,
        children: [
          /* @__PURE__ */ t("div", { className: "flex flex-col justify-center font-heading text-[72px] tracking-[-2.16px] leading-none", children: [
            /* @__PURE__ */ e("p", { className: "text-text-primary mb-0", children: a }),
            /* @__PURE__ */ e("p", { className: "text-text-disabled mb-0", children: s })
          ] }),
          /* @__PURE__ */ e("div", { className: "mt-6 flex flex-col justify-center font-semibold text-2xl text-text-secondary tracking-[-0.48px] leading-[1.3]", children: o.split(`
`).map((v, l) => /* @__PURE__ */ e("p", { className: l === 0 ? "mb-0" : "", children: v }, l)) }),
          (!r || !n) && /* @__PURE__ */ t("div", { className: "mt-10 flex items-center gap-2", children: [
            !r && /* @__PURE__ */ e(i, { variant: "ghost", onClick: d, children: m }),
            !n && /* @__PURE__ */ t(i, { variant: "primary", onClick: p, children: [
              g,
              x
            ] })
          ] })
        ]
      }
    );
  }
);
C.displayName = "ErrorContent";
export {
  C as ErrorContent
};
//# sourceMappingURL=error-content.mjs.map
