import { jsx as i, Fragment as A } from "react/jsx-runtime";
import { NavGroup as C } from "./nav-group.mjs";
import { NavItem as E } from "./nav-item.mjs";
import { STLArrowIcon as G } from "../icons/STLArrowIcon.mjs";
import { isNavGroup as u } from "./types.mjs";
function p(c) {
  if (!(c <= 1))
    return c >= 3 ? 3 : c;
}
function w({
  items: c,
  iconSize: f = 24,
  indicatorSize: h = 24,
  collapsed: a,
  currentPath: t,
  onItemClick: d,
  layout: s = "vertical"
}) {
  const m = (r) => {
    if (!t) return !1;
    const o = (n) => n.some((e) => u(e) ? o(e.children) : e.href === t);
    return o(r.children);
  }, v = (r, o = 1) => {
    if (u(r)) {
      const l = "icon" in r ? r.icon : void 0, b = r.defaultExpanded || m(r);
      return /* @__PURE__ */ i(
        C,
        {
          icon: l ? /* @__PURE__ */ i(l, { size: f }) : void 0,
          label: r.label,
          depth: p(o),
          defaultExpanded: b,
          collapsed: a,
          layout: s,
          children: r.children.map((N) => v(N, o + 1))
        },
        r.id
      );
    }
    const n = r, e = "icon" in n ? n.icon : void 0, x = t ? n.href === t : n.active, I = () => {
      d && n.href && d(n.href, n);
    };
    return /* @__PURE__ */ i(
      E,
      {
        icon: e ? /* @__PURE__ */ i(e, { size: f }) : void 0,
        label: n.label,
        active: x,
        depth: p(o),
        collapsed: a,
        layout: s,
        indicator: n.hasIndicator ? /* @__PURE__ */ i(G, { size: h }) : void 0,
        onClick: d && n.href ? I : void 0
      },
      n.id
    );
  };
  return /* @__PURE__ */ i(A, { children: c.map((r) => v(r)) });
}
export {
  w as NavRenderer
};
//# sourceMappingURL=nav-renderer.mjs.map
