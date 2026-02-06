import { jsx as d } from "react/jsx-runtime";
import * as o from "react";
import { cn as t } from "./index105.mjs";
const s = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: t(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      a
    ),
    ...e
  }
));
s.displayName = "Card";
const i = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: t("flex flex-col space-y-1.5 p-6", a),
    ...e
  }
));
i.displayName = "CardHeader";
const m = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: t(
      "text-2xl font-semibold leading-none tracking-tight",
      a
    ),
    ...e
  }
));
m.displayName = "CardTitle";
const c = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: t("text-sm text-muted-foreground", a),
    ...e
  }
));
c.displayName = "CardDescription";
const l = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d("div", { ref: r, className: t("p-6 pt-0", a), ...e }));
l.displayName = "CardContent";
const n = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: t("flex items-center p-6 pt-0", a),
    ...e
  }
));
n.displayName = "CardFooter";
export {
  s as Card,
  l as CardContent,
  c as CardDescription,
  n as CardFooter,
  i as CardHeader,
  m as CardTitle
};
//# sourceMappingURL=index16.mjs.map
