import { jsx as o, jsxs as i, Fragment as p } from "react/jsx-runtime";
import * as d from "react";
import { cn as n } from "../lib/utils.mjs";
const f = d.forwardRef(
  ({ className: l, children: e, ...a }, r) => /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      className: n("flex h-full w-full gap-6", l),
      ...a,
      children: e
    }
  )
);
f.displayName = "PanelLayout";
const c = d.forwardRef(
  ({ className: l, width: e = 240, style: a, footer: r, children: s, ...t }, x) => /* @__PURE__ */ i(
    "div",
    {
      ref: x,
      className: n(
        "flex-shrink-0 flex flex-col bg-card border border-border rounded-2xl overflow-hidden",
        l
      ),
      style: { width: e, ...a },
      ...t,
      children: [
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto", children: s }),
        r && /* @__PURE__ */ o("div", { className: "flex-shrink-0 p-4 border-t border-border", children: r })
      ]
    }
  )
);
c.displayName = "PanelLayoutSide";
const m = d.forwardRef(
  ({ className: l, children: e, ...a }, r) => /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      className: n("flex-1 flex flex-col min-w-0 overflow-hidden", l),
      ...a,
      children: e
    }
  )
);
m.displayName = "PanelLayoutMain";
const y = d.forwardRef(({ className: l, title: e, actions: a, children: r, ...s }, t) => /* @__PURE__ */ o(
  "div",
  {
    ref: t,
    className: n(
      "flex-shrink-0 flex items-center justify-between",
      "px-6 py-4 border-b border-border",
      l
    ),
    ...s,
    children: e ? /* @__PURE__ */ i(p, { children: [
      /* @__PURE__ */ o("h2", { className: "text-xl font-semibold", children: e }),
      a && /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: a })
    ] }) : r
  }
));
y.displayName = "PanelLayoutHeader";
const u = d.forwardRef(
  ({ className: l, children: e, ...a }, r) => /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      className: n("flex-1 overflow-y-auto p-6", l),
      ...a,
      children: e
    }
  )
);
u.displayName = "PanelLayoutBody";
const h = Object.assign(f, {
  Side: c,
  Main: m,
  Header: y,
  Body: u
});
export {
  h as PanelLayout
};
//# sourceMappingURL=panel-layout.mjs.map
