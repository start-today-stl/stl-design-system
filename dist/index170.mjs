import { forwardRef as c, createElement as f } from "react";
import { mergeClasses as l } from "./index171.mjs";
import { toKebabCase as p } from "./index172.mjs";
import { toPascalCase as r } from "./index173.mjs";
import i from "./index174.mjs";
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I = (e, t) => {
  const o = c(
    ({ className: a, ...m }, s) => f(i, {
      ref: s,
      iconNode: t,
      className: l(
        `lucide-${p(r(e))}`,
        `lucide-${e}`,
        a
      ),
      ...m
    })
  );
  return o.displayName = r(e), o;
};
export {
  I as default
};
//# sourceMappingURL=index170.mjs.map
