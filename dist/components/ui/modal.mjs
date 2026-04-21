import { jsx as e, jsxs as n, Fragment as C } from "react/jsx-runtime";
import * as a from "react";
import * as y from "@radix-ui/react-visually-hidden";
import { cn as c } from "../../lib/utils.mjs";
import { Dialog as v, DialogContent as H, DialogTitle as h, DialogHeader as N, DialogDescription as D, DialogClose as b } from "./dialog.mjs";
import { STLArrowIcon as j } from "../../icons/STLArrowIcon.mjs";
import { XIcon as I } from "../../icons/XIcon.mjs";
const A = ({
  size: s = "l",
  open: p,
  onOpenChange: u,
  title: i,
  description: r,
  children: m,
  footer: l,
  className: g,
  loading: t = !1,
  showCloseButton: x = !1
}) => {
  const d = {
    s: { width: "max-w-[400px]", loadingHeight: "min-h-[200px]" },
    m: { width: "max-w-[600px]", loadingHeight: "min-h-[250px]" },
    l: { width: "max-w-[900px]", loadingHeight: "min-h-[300px]" },
    xl: { width: "max-w-[1200px]", loadingHeight: "min-h-[350px]" }
  }, f = ((o) => o ? a.isValidElement(o) && o.type === a.Fragment ? a.Children.count(o.props.children) : a.Children.count(o) : 0)(l), w = () => x ? /* @__PURE__ */ n(b, { className: "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none cursor-pointer", children: [
    /* @__PURE__ */ e(I, { size: 24 }),
    /* @__PURE__ */ e("span", { className: "sr-only", children: "닫기" })
  ] }) : /* @__PURE__ */ e("div", { className: "absolute right-4 top-4", children: /* @__PURE__ */ e(j, { size: 29, className: "text-slate-200 dark:text-slate-600" }) });
  return /* @__PURE__ */ e(v, { open: p, onOpenChange: u, children: /* @__PURE__ */ n(
    H,
    {
      className: c(
        d[s].width,
        t && d[s].loadingHeight,
        g
      ),
      loading: t,
      "aria-describedby": void 0,
      children: [
        t || !i ? /* @__PURE__ */ e(y.Root, { children: /* @__PURE__ */ e(h, { children: i || "모달" }) }) : null,
        !t && /* @__PURE__ */ n(C, { children: [
          w(),
          (i || r) && /* @__PURE__ */ n(N, { className: "pr-10", children: [
            i && /* @__PURE__ */ e(h, { children: i }),
            r && /* @__PURE__ */ e(D, { children: r })
          ] }),
          m && /* @__PURE__ */ e("div", { className: "py-4 overflow-auto", children: m }),
          l && /* @__PURE__ */ e(
            "div",
            {
              className: c(
                "flex flex-col-reverse gap-2 sm:flex-row w-full",
                f === 1 ? "sm:justify-end" : "sm:justify-between"
              ),
              children: l
            }
          )
        ] })
      ]
    }
  ) });
};
export {
  A as Modal
};
//# sourceMappingURL=modal.mjs.map
