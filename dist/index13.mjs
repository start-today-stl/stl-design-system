import { jsx as p } from "react/jsx-runtime";
import * as e from "react";
import { cn as i } from "./index104.mjs";
const f = e.forwardRef(
  ({ className: d, children: o, ...a }, m) => {
    const u = e.Children.toArray(o).length;
    return /* @__PURE__ */ p(
      "div",
      {
        ref: m,
        className: i("inline-flex", d),
        ...a,
        children: e.Children.map(o, (r, t) => {
          if (!e.isValidElement(r)) return r;
          const s = t === 0, l = t === u - 1, c = !s && !l;
          let n = "";
          return s ? n = "rounded-tr-none rounded-br-none" : l ? n = "rounded-tl-none rounded-bl-none border-l-0" : c && (n = "rounded-none border-l-0"), e.cloneElement(r, {
            className: i(
              r.props.className,
              n
            )
          });
        })
      }
    );
  }
);
f.displayName = "ButtonGroup";
export {
  f as ButtonGroup
};
//# sourceMappingURL=index13.mjs.map
