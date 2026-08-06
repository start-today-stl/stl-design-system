import { jsx as t, Fragment as N } from "react/jsx-runtime";
import { NavGroup as y } from "./nav-group.mjs";
import { NavItem as A } from "./nav-item.mjs";
import { STLArrowIcon as C } from "../icons/STLArrowIcon.mjs";
import { isNavGroup as p } from "./types.mjs";
function h(c) {
  if (!(c <= 1))
    return c >= 3 ? 3 : c;
}
function L({
  items: c,
  iconSize: d = 24,
  indicatorSize: m = 24,
  collapsed: s,
  currentPath: f,
  onItemClick: a,
  layout: u = "vertical"
}) {
  const b = (n) => {
    if (!f) return !1;
    const o = (r) => r.some((i) => p(i) ? o(i.children) : i.href === f);
    return o(n.children);
  }, v = (n, o = 1) => {
    if (p(n)) {
      const e = "icon" in n ? n.icon : void 0, I = n.defaultExpanded || b(n);
      return /* @__PURE__ */ t(
        y,
        {
          icon: e ? /* @__PURE__ */ t(e, { size: d }) : void 0,
          label: n.label,
          depth: h(o),
          defaultExpanded: I,
          collapsed: s,
          layout: u,
          children: n.children.map((K) => v(K, o + 1))
        },
        n.id
      );
    }
    const r = n, i = "icon" in r ? r.icon : void 0, l = f ? r.href === f : r.active, x = (e) => {
      !a || !r.href || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || (e.preventDefault(), a(r.href, r, e));
    };
    return /* @__PURE__ */ t(
      A,
      {
        icon: i ? /* @__PURE__ */ t(i, { size: d }) : void 0,
        label: r.label,
        active: l,
        depth: h(o),
        collapsed: s,
        layout: u,
        indicator: r.hasIndicator ? /* @__PURE__ */ t(C, { size: m }) : void 0,
        href: r.href,
        "aria-current": l && r.href ? "page" : void 0,
        onClick: a && r.href ? x : void 0
      },
      r.id
    );
  };
  return /* @__PURE__ */ t(N, { children: c.map((n) => v(n)) });
}
export {
  L as NavRenderer
};
//# sourceMappingURL=nav-renderer.mjs.map
