import { jsx as e, jsxs as a, Fragment as y } from "react/jsx-runtime";
import * as n from "react";
import * as v from "@radix-ui/react-visually-hidden";
import { cn as m } from "../../lib/utils.mjs";
import { Dialog as w, DialogContent as N, DialogTitle as c, DialogHeader as D, DialogDescription as b, DialogClose as j } from "./dialog.mjs";
import { STLArrowIcon as z } from "../../icons/STLArrowIcon.mjs";
import { XIcon as H } from "../../icons/XIcon.mjs";
const A = ({
  size: d = "l",
  open: p,
  onOpenChange: u,
  title: r,
  description: s,
  children: t,
  footer: i,
  className: f,
  loading: l = !1,
  showCloseButton: x = !1
}) => {
  const h = {
    s: "max-w-[400px]",
    m: "max-w-[600px]",
    l: "max-w-[900px]",
    xl: "max-w-[1200px]"
  }, g = ((o) => o ? n.isValidElement(o) && o.type === n.Fragment ? n.Children.count(o.props.children) : n.Children.count(o) : 0)(i), C = () => x ? /* @__PURE__ */ a(j, { className: "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none cursor-pointer", children: [
    /* @__PURE__ */ e(H, { size: 24 }),
    /* @__PURE__ */ e("span", { className: "sr-only", children: "닫기" })
  ] }) : /* @__PURE__ */ e("div", { className: "absolute right-4 top-4", children: /* @__PURE__ */ e(z, { size: 29, className: "text-slate-200 dark:text-slate-600" }) });
  return /* @__PURE__ */ e(w, { open: p, onOpenChange: u, children: /* @__PURE__ */ a(
    N,
    {
      className: m(h[d], f),
      loading: l,
      "aria-describedby": void 0,
      children: [
        l || !r ? /* @__PURE__ */ e(v.Root, { children: /* @__PURE__ */ e(c, { children: r || "모달" }) }) : null,
        !l && /* @__PURE__ */ a(y, { children: [
          C(),
          (r || s) && /* @__PURE__ */ a(D, { className: "pr-10", children: [
            r && /* @__PURE__ */ e(c, { children: r }),
            s && /* @__PURE__ */ e(b, { children: s })
          ] }),
          t && /* @__PURE__ */ e("div", { className: "py-4", children: t }),
          i && /* @__PURE__ */ e(
            "div",
            {
              className: m(
                "flex flex-col-reverse gap-2 sm:flex-row w-full",
                g === 1 ? "sm:justify-end" : "sm:justify-between"
              ),
              children: i
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
