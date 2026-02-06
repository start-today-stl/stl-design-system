import { jsx as r } from "react/jsx-runtime";
import * as s from "react";
import { Root as o, Fallback as f, Image as t } from "../../node_modules/@radix-ui/react-avatar/dist/index.mjs";
import { cn as m } from "../../lib/utils.mjs";
const d = s.forwardRef(({ className: a, ...e }, l) => /* @__PURE__ */ r(
  o,
  {
    ref: l,
    className: m(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      a
    ),
    ...e
  }
));
d.displayName = o.displayName;
const i = s.forwardRef(({ className: a, ...e }, l) => /* @__PURE__ */ r(
  t,
  {
    ref: l,
    className: m("aspect-square h-full w-full", a),
    ...e
  }
));
i.displayName = t.displayName;
const c = s.forwardRef(({ className: a, ...e }, l) => /* @__PURE__ */ r(
  f,
  {
    ref: l,
    className: m(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      a
    ),
    ...e
  }
));
c.displayName = f.displayName;
export {
  d as Avatar,
  c as AvatarFallback,
  i as AvatarImage
};
//# sourceMappingURL=avatar.mjs.map
