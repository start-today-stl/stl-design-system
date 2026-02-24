import { jsx as e, jsxs as a, Fragment as C } from "react/jsx-runtime";
import * as o from "react";
import { cn as m } from "../../lib/utils.mjs";
import { Dialog as w, DialogContent as y, DialogHeader as N, DialogTitle as D, DialogDescription as v, DialogClose as b } from "./dialog.mjs";
import { STLArrowIcon as j } from "../../icons/STLArrowIcon.mjs";
import { XIcon as z } from "../../icons/XIcon.mjs";
const E = ({
  size: c = "l",
  open: p,
  onOpenChange: d,
  title: s,
  description: t,
  children: l,
  footer: n,
  className: u,
  loading: i = !1,
  showCloseButton: f = !1
}) => {
  const x = {
    s: "max-w-[400px]",
    m: "max-w-[600px]",
    l: "max-w-[900px]",
    xl: "max-w-[1200px]"
  }, h = ((r) => r ? o.isValidElement(r) && r.type === o.Fragment ? o.Children.count(r.props.children) : o.Children.count(r) : 0)(n), g = () => f ? /* @__PURE__ */ a(b, { className: "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none cursor-pointer", children: [
    /* @__PURE__ */ e(z, { size: 24 }),
    /* @__PURE__ */ e("span", { className: "sr-only", children: "닫기" })
  ] }) : /* @__PURE__ */ e("div", { className: "absolute right-4 top-4", children: /* @__PURE__ */ e(j, { size: 29, className: "text-slate-200 dark:text-slate-600" }) });
  return /* @__PURE__ */ e(w, { open: p, onOpenChange: d, children: /* @__PURE__ */ e(y, { className: m(x[c], u), loading: i, children: !i && /* @__PURE__ */ a(C, { children: [
    g(),
    (s || t) && /* @__PURE__ */ a(N, { className: "pr-10", children: [
      s && /* @__PURE__ */ e(D, { children: s }),
      t && /* @__PURE__ */ e(v, { children: t })
    ] }),
    l && /* @__PURE__ */ e("div", { className: "py-4", children: l }),
    n && /* @__PURE__ */ e(
      "div",
      {
        className: m(
          "flex flex-col-reverse gap-2 sm:flex-row w-full",
          h === 1 ? "sm:justify-end" : "sm:justify-between"
        ),
        children: n
      }
    )
  ] }) }) });
};
export {
  E as Modal
};
//# sourceMappingURL=modal.mjs.map
