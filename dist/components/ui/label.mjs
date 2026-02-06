import { jsx as m } from "react/jsx-runtime";
import * as t from "react";
import { Root as o } from "../../node_modules/@radix-ui/react-label/dist/index.mjs";
import { cva as i } from "../../node_modules/class-variance-authority/dist/index.mjs";
import { cn as s } from "../../lib/utils.mjs";
const l = i(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), p = t.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ m(
  o,
  {
    ref: r,
    className: s(l(), a),
    ...e
  }
));
p.displayName = o.displayName;
export {
  p as Label
};
//# sourceMappingURL=label.mjs.map
