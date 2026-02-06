import { jsx as o } from "react/jsx-runtime";
import * as t from "react";
import * as r from "@radix-ui/react-progress";
import { cn as i } from "../../lib/utils.mjs";
const m = t.forwardRef(({ className: a, value: e, ...l }, s) => /* @__PURE__ */ o(
  r.Root,
  {
    ref: s,
    className: i(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      a
    ),
    ...l,
    children: /* @__PURE__ */ o(
      r.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
m.displayName = r.Root.displayName;
export {
  m as Progress
};
//# sourceMappingURL=progress.mjs.map
