import { jsx as i, Fragment as N } from "react/jsx-runtime";
import { NavGroup as A } from "./nav-group.mjs";
import { NavItem as C } from "./nav-item.mjs";
import { STLArrowIcon as E } from "../icons/STLArrowIcon.mjs";
import { isNavGroup as l } from "./types.mjs";
function u(c) {
  if (!(c <= 1))
    return c >= 3 ? 3 : c;
}
function k({
  items: c,
  iconSize: f = 24,
  indicatorSize: p = 24,
  collapsed: a,
  currentPath: t,
  onItemClick: d
}) {
  const h = (n) => {
    if (!t) return !1;
    const o = (r) => r.some((e) => l(e) ? o(e.children) : e.href === t);
    return o(n.children);
  }, s = (n, o = 1) => {
    if (l(n)) {
      const v = "icon" in n ? n.icon : void 0, I = n.defaultExpanded || h(n);
      return /* @__PURE__ */ i(
        A,
        {
          icon: v ? /* @__PURE__ */ i(v, { size: f }) : void 0,
          label: n.label,
          depth: u(o),
          defaultExpanded: I,
          collapsed: a,
          children: n.children.map((b) => s(b, o + 1))
        },
        n.id
      );
    }
    const r = n, e = "icon" in r ? r.icon : void 0, m = t ? r.href === t : r.active, x = () => {
      d && r.href && d(r.href, r);
    };
    return /* @__PURE__ */ i(
      C,
      {
        icon: e ? /* @__PURE__ */ i(e, { size: f }) : void 0,
        label: r.label,
        active: m,
        depth: u(o),
        collapsed: a,
        indicator: r.hasIndicator ? /* @__PURE__ */ i(E, { size: p }) : void 0,
        onClick: d && r.href ? x : void 0
      },
      r.id
    );
  };
  return /* @__PURE__ */ i(N, { children: c.map((n) => s(n)) });
}
export {
  k as NavRenderer
};
//# sourceMappingURL=nav-renderer.mjs.map
