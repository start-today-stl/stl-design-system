import { jsx as r } from "react/jsx-runtime";
import * as a from "react";
import * as e from "@radix-ui/react-switch";
import { cn as t } from "../../lib/utils.mjs";
const n = a.forwardRef(({ className: o, ...i }, s) => /* @__PURE__ */ r(
  e.Root,
  {
    className: t(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      o
    ),
    ...i,
    ref: s,
    children: /* @__PURE__ */ r(
      e.Thumb,
      {
        className: t(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
n.displayName = e.Root.displayName;
export {
  n as Switch
};
//# sourceMappingURL=switch.mjs.map
