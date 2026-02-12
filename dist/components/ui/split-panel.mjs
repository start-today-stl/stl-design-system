import { jsx as t } from "react/jsx-runtime";
import * as i from "react";
import { cn as n } from "../../lib/utils.mjs";
const f = i.forwardRef(
  ({ className: l, children: e, ...a }, r) => /* @__PURE__ */ t(
    "div",
    {
      ref: r,
      className: n("flex h-full w-full", l),
      ...a,
      children: e
    }
  )
);
f.displayName = "SplitPanel";
const s = i.forwardRef(
  ({ className: l, width: e = 280, style: a, children: r, ...o }, m) => {
    const c = typeof e == "number" ? `${e}px` : e;
    return /* @__PURE__ */ t(
      "aside",
      {
        ref: m,
        className: n(
          "flex flex-col flex-shrink-0 h-full",
          "bg-card",
          "border-r border-border",
          "overflow-y-auto",
          l
        ),
        style: { width: c, ...a },
        ...o,
        children: r
      }
    );
  }
);
s.displayName = "SplitPanel.Side";
const p = i.forwardRef(
  ({ className: l, padded: e = !0, children: a, ...r }, o) => /* @__PURE__ */ t(
    "main",
    {
      ref: o,
      className: n(
        "flex-1 min-w-0 h-full",
        "overflow-y-auto",
        e && "p-6",
        l
      ),
      ...r,
      children: a
    }
  )
);
p.displayName = "SplitPanel.Main";
const d = f;
d.Side = s;
d.Main = p;
export {
  d as SplitPanel
};
//# sourceMappingURL=split-panel.mjs.map
