import { jsx as d } from "react/jsx-runtime";
import * as t from "react";
import { cn as o } from "../../lib/utils.mjs";
const i = t.forwardRef(
  ({ className: a, shadow: e = !0, ...r }, s) => /* @__PURE__ */ d(
    "div",
    {
      ref: s,
      className: o(
        "rounded-2xl border bg-card text-card-foreground",
        e && "shadow-card",
        a
      ),
      ...r
    }
  )
);
i.displayName = "Card";
const m = t.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: o("flex flex-col gap-4 p-4", a),
    ...e
  }
));
m.displayName = "CardHeader";
const l = t.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: o(
      "text-xl font-semibold leading-[1.3] tracking-tight",
      a
    ),
    ...e
  }
));
l.displayName = "CardTitle";
const n = t.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: o("text-sm font-medium leading-normal text-muted-foreground", a),
    ...e
  }
));
n.displayName = "CardDescription";
const c = t.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d("div", { ref: r, className: o("p-4 pt-0", a), ...e }));
c.displayName = "CardContent";
const f = t.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: o("flex items-center p-4 pt-0", a),
    ...e
  }
));
f.displayName = "CardFooter";
export {
  i as Card,
  c as CardContent,
  n as CardDescription,
  f as CardFooter,
  m as CardHeader,
  l as CardTitle
};
//# sourceMappingURL=card.mjs.map
