import { jsxs as s, jsx as a } from "react/jsx-runtime";
import { cn as c } from "../../lib/utils.mjs";
import { FormLabel as d } from "./form-label.mjs";
const n = ({
  label: r,
  required: e,
  invisibleLabel: i,
  htmlFor: o,
  children: l,
  className: m
}) => /* @__PURE__ */ s("div", { className: c("flex flex-col gap-1", m), children: [
  /* @__PURE__ */ a(d, { htmlFor: o, required: e, invisible: i, children: r }),
  l
] });
n.displayName = "FormField";
export {
  n as FormField
};
//# sourceMappingURL=form-field.mjs.map
