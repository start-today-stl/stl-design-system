import { forwardRef as l, createElement as a } from "react";
import A from "./index175.mjs";
import { hasA11yProp as b } from "./index176.mjs";
import { mergeClasses as c } from "./index171.mjs";
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n = l(
  ({
    color: m = "currentColor",
    size: t = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: s,
    className: f = "",
    children: r,
    iconNode: u,
    ...e
  }, p) => a(
    "svg",
    {
      ref: p,
      ...A,
      width: t,
      height: t,
      stroke: m,
      strokeWidth: s ? Number(o) * 24 / Number(t) : o,
      className: c("lucide", f),
      ...!r && !b(e) && { "aria-hidden": "true" },
      ...e
    },
    [
      ...u.map(([i, d]) => a(i, d)),
      ...Array.isArray(r) ? r : [r]
    ]
  )
);
export {
  n as default
};
//# sourceMappingURL=index174.mjs.map
