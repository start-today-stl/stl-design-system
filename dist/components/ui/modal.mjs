import { jsx as l, jsxs as s } from "react/jsx-runtime";
import * as o from "react";
import { cn as a } from "../../lib/utils.mjs";
import { Dialog as d, DialogContent as g, DialogHeader as C, DialogTitle as h, DialogDescription as w } from "./dialog.mjs";
const N = ({
  size: m = "l",
  open: x,
  onOpenChange: c,
  title: r,
  description: n,
  children: i,
  footer: t,
  className: p
}) => {
  const f = {
    s: "max-w-[400px]",
    m: "max-w-[600px]",
    l: "max-w-[900px]",
    xl: "max-w-[1200px]"
  }, u = ((e) => e ? o.isValidElement(e) && e.type === o.Fragment ? o.Children.count(e.props.children) : o.Children.count(e) : 0)(t);
  return /* @__PURE__ */ l(d, { open: x, onOpenChange: c, children: /* @__PURE__ */ s(g, { className: a(f[m], p), children: [
    (r || n) && /* @__PURE__ */ s(C, { children: [
      r && /* @__PURE__ */ l(h, { children: r }),
      n && /* @__PURE__ */ l(w, { children: n })
    ] }),
    i && /* @__PURE__ */ l("div", { className: "py-4", children: i }),
    t && /* @__PURE__ */ l(
      "div",
      {
        className: a(
          "flex flex-col-reverse gap-2 sm:flex-row w-full",
          u === 1 ? "sm:justify-end" : "sm:justify-between"
        ),
        children: t
      }
    )
  ] }) });
};
export {
  N as Modal
};
//# sourceMappingURL=modal.mjs.map
