import { jsx as r } from "react/jsx-runtime";
import * as t from "react";
import { Root as o, Indicator as m } from "./index124.mjs";
import { cn as f } from "./index105.mjs";
const i = t.forwardRef(({ className: a, value: l, ...e }, s) => /* @__PURE__ */ r(
  o,
  {
    ref: s,
    className: f(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      a
    ),
    ...e,
    children: /* @__PURE__ */ r(
      m,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (l || 0)}%)` }
      }
    )
  }
));
i.displayName = o.displayName;
export {
  i as Progress
};
//# sourceMappingURL=index66.mjs.map
