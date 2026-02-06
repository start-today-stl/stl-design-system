import { jsx as e } from "react/jsx-runtime";
import * as t from "react";
import * as r from "@radix-ui/react-radio-group";
import { Circle as m } from "lucide-react";
import { cn as s } from "../../lib/utils.mjs";
const c = t.forwardRef(({ className: o, ...i }, a) => /* @__PURE__ */ e(
  r.Root,
  {
    className: s("grid gap-2", o),
    ...i,
    ref: a
  }
));
c.displayName = r.Root.displayName;
const l = t.forwardRef(({ className: o, ...i }, a) => /* @__PURE__ */ e(
  r.Item,
  {
    ref: a,
    className: s(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      o
    ),
    ...i,
    children: /* @__PURE__ */ e(r.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ e(m, { className: "h-2.5 w-2.5 fill-current text-current" }) })
  }
));
l.displayName = r.Item.displayName;
export {
  c as RadioGroup,
  l as RadioGroupItem
};
//# sourceMappingURL=radio-group.mjs.map
