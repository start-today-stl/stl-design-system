import { jsx as e } from "react/jsx-runtime";
import * as s from "react";
import { Root as o, Thumb as n } from "../../node_modules/@radix-ui/react-switch/dist/index.mjs";
import { cn as r } from "../../lib/utils.mjs";
const c = s.forwardRef(({ className: t, ...a }, i) => /* @__PURE__ */ e(
  o,
  {
    className: r(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      t
    ),
    ...a,
    ref: i,
    children: /* @__PURE__ */ e(
      n,
      {
        className: r(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
c.displayName = o.displayName;
export {
  c as Switch
};
//# sourceMappingURL=switch.mjs.map
