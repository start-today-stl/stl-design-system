import { jsx as e, jsxs as s } from "react/jsx-runtime";
import * as o from "react";
import { cn as i } from "../../lib/utils.mjs";
import { Skeleton as t } from "./skeleton.mjs";
function m() {
  return /* @__PURE__ */ s("div", { className: "p-4 flex flex-col gap-4", children: [
    /* @__PURE__ */ e(t, { height: 160, className: "rounded-xl" }),
    /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ e(t, { height: 18, width: "60%" }),
      /* @__PURE__ */ e(t, { height: 14, width: "100%" }),
      /* @__PURE__ */ e(t, { height: 14, width: "100%" }),
      /* @__PURE__ */ e(t, { height: 14, width: "100%" }),
      /* @__PURE__ */ e(t, { height: 14, width: "60%" })
    ] })
  ] });
}
const f = o.forwardRef(
  ({ className: a, shadow: r = !0, loading: d = !1, children: l, ...n }, c) => /* @__PURE__ */ e(
    "div",
    {
      ref: c,
      className: i(
        "rounded-2xl border bg-card text-card-foreground",
        r && "shadow-card",
        a
      ),
      ...n,
      children: d ? /* @__PURE__ */ e(m, {}) : l
    }
  )
);
f.displayName = "Card";
const h = o.forwardRef(({ className: a, ...r }, d) => /* @__PURE__ */ e(
  "div",
  {
    ref: d,
    className: i("flex flex-col gap-4 p-4", a),
    ...r
  }
));
h.displayName = "CardHeader";
const p = o.forwardRef(({ className: a, ...r }, d) => /* @__PURE__ */ e(
  "div",
  {
    ref: d,
    className: i(
      "text-xl font-semibold leading-[1.3] tracking-tight",
      a
    ),
    ...r
  }
));
p.displayName = "CardTitle";
const x = o.forwardRef(({ className: a, ...r }, d) => /* @__PURE__ */ e(
  "div",
  {
    ref: d,
    className: i("text-sm font-medium leading-normal text-muted-foreground", a),
    ...r
  }
));
x.displayName = "CardDescription";
const g = o.forwardRef(({ className: a, ...r }, d) => /* @__PURE__ */ e("div", { ref: d, className: i("p-4 pt-0", a), ...r }));
g.displayName = "CardContent";
const C = o.forwardRef(({ className: a, ...r }, d) => /* @__PURE__ */ e(
  "div",
  {
    ref: d,
    className: i("flex items-center p-4 pt-0", a),
    ...r
  }
));
C.displayName = "CardFooter";
export {
  f as Card,
  g as CardContent,
  x as CardDescription,
  C as CardFooter,
  h as CardHeader,
  p as CardTitle
};
//# sourceMappingURL=card.mjs.map
