import { jsx as a } from "react/jsx-runtime";
import * as s from "react";
import { cva as l } from "class-variance-authority";
import { cn as i } from "../../lib/utils.mjs";
const d = l(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), n = s.forwardRef(({ className: t, variant: e, ...r }, o) => /* @__PURE__ */ a(
  "div",
  {
    ref: o,
    role: "alert",
    className: i(d({ variant: e }), t),
    ...r
  }
));
n.displayName = "Alert";
const v = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  "h5",
  {
    ref: r,
    className: i("mb-1 font-medium leading-none tracking-tight", t),
    ...e
  }
));
v.displayName = "AlertTitle";
const c = s.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: i("text-sm [&_p]:leading-relaxed", t),
    ...e
  }
));
c.displayName = "AlertDescription";
export {
  n as Alert,
  c as AlertDescription,
  v as AlertTitle
};
//# sourceMappingURL=alert.mjs.map
