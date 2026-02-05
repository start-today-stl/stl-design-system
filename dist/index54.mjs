import { jsx as r, Fragment as u } from "react/jsx-runtime";
import { NavGroup as m } from "./index50.mjs";
import { NavItem as s } from "./index52.mjs";
import { isNavGroup as I } from "./index102.mjs";
import { STLArrowIcon as b } from "./index68.mjs";
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
    if (I(o)) {
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
        indicator: n.hasIndicator ? /* @__PURE__ */ r(b, { size: l }) : void 0
      },
      n.id
    );
  };
  return /* @__PURE__ */ r(u, { children: i.map((o) => c(o)) });
}
export {
  E as NavRenderer
};
//# sourceMappingURL=index54.mjs.map
