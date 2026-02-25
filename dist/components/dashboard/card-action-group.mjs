import { jsx as i } from "react/jsx-runtime";
import * as d from "react";
import { cn as x } from "../../lib/utils.mjs";
import { CardAction as A } from "./card-action.mjs";
const k = d.forwardRef(
  ({ className: m, options: e, value: t, onValueChange: c, defaultValue: s, ...a }, f) => {
    const [l, o] = d.useState(s || e[0]), n = t !== void 0 ? t : l, p = (r) => {
      t === void 0 && o(r), c == null || c(r);
    };
    return /* @__PURE__ */ i(
      "div",
      {
        ref: f,
        className: x("flex items-center gap-1", m),
        ...a,
        children: e.map((r) => /* @__PURE__ */ i(
          A,
          {
            selected: n === r,
            onClick: () => p(r),
            children: r
          },
          r
        ))
      }
    );
  }
);
k.displayName = "CardActionGroup";
export {
  k as CardActionGroup
};
//# sourceMappingURL=card-action-group.mjs.map
