import { jsxs as v, jsx as e } from "react/jsx-runtime";
import * as t from "react";
import { useState as C } from "react";
import { cn as a } from "../../lib/utils.mjs";
import { RightIcon as L } from "../../icons/RightIcon.mjs";
const j = t.forwardRef(
  ({ className: n, children: s, ...l }, i) => /* @__PURE__ */ e(
    "div",
    {
      ref: i,
      role: "tree",
      className: a("flex flex-col", n),
      ...l,
      children: s
    }
  )
);
j.displayName = "TreeList";
const P = t.forwardRef(
  ({
    className: n,
    icon: s,
    label: l,
    selected: i = !1,
    expanded: p,
    defaultExpanded: N = !1,
    onSelect: m,
    onExpandedChange: c,
    actions: f,
    depth: u = 0,
    children: x,
    ...y
  }, k) => {
    const [b, T] = C(N), d = t.Children.count(x) > 0, h = p !== void 0, o = h ? p : b, w = (r) => {
      r.stopPropagation();
      const g = !o;
      h || T(g), c == null || c(g);
    }, I = () => {
      m == null || m();
    }, R = t.Children.map(x, (r) => t.isValidElement(r) ? t.cloneElement(r, { depth: u + 1 }) : r);
    return /* @__PURE__ */ v("div", { ref: k, role: "treeitem", "aria-expanded": d ? o : void 0, ...y, children: [
      /* @__PURE__ */ v(
        "div",
        {
          className: a(
            "group flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg",
            "transition-colors",
            i ? "bg-accent text-primary" : "hover:bg-muted",
            n
          ),
          style: { paddingLeft: `${12 + u * 20}px` },
          onClick: I,
          children: [
            d ? /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: a(
                  "flex-shrink-0 p-0.5 rounded hover:bg-muted",
                  "transition-transform",
                  o && "rotate-90"
                ),
                onClick: w,
                "aria-label": o ? "접기" : "펼치기",
                children: /* @__PURE__ */ e(L, { size: 16, className: "text-muted-foreground" })
              }
            ) : /* @__PURE__ */ e("span", { className: "w-5 flex-shrink-0" }),
            s && /* @__PURE__ */ e("span", { className: "flex-shrink-0 text-muted-foreground", children: s }),
            /* @__PURE__ */ e("span", { className: "flex-1 truncate text-sm font-medium", children: l }),
            f && /* @__PURE__ */ e(
              "div",
              {
                className: a(
                  "flex items-center gap-1 flex-shrink-0",
                  "opacity-0 group-hover:opacity-100",
                  i && "opacity-100"
                ),
                onClick: (r) => r.stopPropagation(),
                children: f
              }
            )
          ]
        }
      ),
      d && o && /* @__PURE__ */ e("div", { role: "group", children: R })
    ] });
  }
);
P.displayName = "TreeItem";
export {
  P as TreeItem,
  j as TreeList
};
//# sourceMappingURL=tree-list.mjs.map
