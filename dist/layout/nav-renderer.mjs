import { jsx as r, Fragment as u } from "react/jsx-runtime";
import { NavGroup as m } from "./nav-group.mjs";
import { NavItem as s } from "./nav-item.mjs";
import { STLArrowIcon as I } from "../icons/STLArrowIcon.mjs";
import { isNavGroup as b } from "./types.mjs";
function f(i) {
  if (!(i <= 1))
    return i >= 3 ? 3 : i;
}
function E({
  items: i,
  iconSize: t = 24,
  indicatorSize: l = 24,
  collapsed: a
}) {
  const c = (o, e = 1) => {
    if (b(o)) {
      const v = "icon" in o ? o.icon : void 0;
      return /* @__PURE__ */ r(
        m,
        {
          icon: v ? /* @__PURE__ */ r(v, { size: t }) : void 0,
          label: o.label,
          depth: f(e),
          defaultExpanded: o.defaultExpanded,
          collapsed: a,
          children: o.children.map((p) => c(p, e + 1))
        },
        o.id
      );
    }
    const n = o, d = "icon" in n ? n.icon : void 0;
    return /* @__PURE__ */ r(
      s,
      {
        icon: d ? /* @__PURE__ */ r(d, { size: t }) : void 0,
        label: n.label,
        active: n.active,
        depth: f(e),
        collapsed: a,
        indicator: n.hasIndicator ? /* @__PURE__ */ r(I, { size: l }) : void 0
      },
      n.id
    );
  };
  return /* @__PURE__ */ r(u, { children: i.map((o) => c(o)) });
}
export {
  E as NavRenderer
};
//# sourceMappingURL=nav-renderer.mjs.map
