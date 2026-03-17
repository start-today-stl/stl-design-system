import { jsx as e, jsxs as v } from "react/jsx-runtime";
import * as r from "react";
import { useState as C } from "react";
import { cn as i } from "../../lib/utils.mjs";
import { RightIcon as j } from "../../icons/RightIcon.mjs";
const P = r.forwardRef(
  ({ className: n, children: s, ...l }, a) => /* @__PURE__ */ e(
    "div",
    {
      ref: a,
      role: "tree",
      className: i("flex flex-col", n),
      ...l,
      children: s
    }
  )
);
P.displayName = "Tree";
const V = r.forwardRef(
  ({
    className: n,
    icon: s,
    label: l,
    selected: a = !1,
    expanded: p,
    defaultExpanded: N = !1,
    onSelect: m,
    onExpandedChange: c,
    actions: f,
    depth: u = 0,
    children: x,
    ...k
  }, y) => {
    const [b, T] = C(N), d = r.Children.count(x) > 0, h = p !== void 0, o = h ? p : b, w = (t) => {
      t.stopPropagation();
      const g = !o;
      h || T(g), c == null || c(g);
    }, I = () => {
      m == null || m();
    }, R = r.Children.map(x, (t) => r.isValidElement(t) ? r.cloneElement(t, { depth: u + 1 }) : t);
    return /* @__PURE__ */ v("div", { ref: y, role: "treeitem", "aria-expanded": d ? o : void 0, ...k, children: [
      /* @__PURE__ */ v(
        "div",
        {
          className: i(
            "group flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg",
            "transition-colors",
            a ? "bg-accent text-slate-900 dark:text-slate-50" : "hover:bg-muted",
            n
          ),
          style: { paddingLeft: `${12 + u * 20}px` },
          onClick: I,
          children: [
            d ? /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: i(
                  "flex-shrink-0 p-0.5 rounded hover:bg-muted",
                  "transition-transform",
                  o && "rotate-90"
                ),
                onClick: w,
                "aria-label": o ? "접기" : "펼치기",
                children: /* @__PURE__ */ e(j, { size: 16, className: "text-muted-foreground" })
              }
            ) : /* @__PURE__ */ e("span", { className: "w-5 flex-shrink-0" }),
            s && /* @__PURE__ */ e("span", { className: "flex-shrink-0 text-muted-foreground", children: s }),
            /* @__PURE__ */ e("span", { className: "flex-1 truncate text-sm font-medium", children: l }),
            f && /* @__PURE__ */ e(
              "div",
              {
                className: i(
                  "flex items-center gap-1 flex-shrink-0",
                  "opacity-0 group-hover:opacity-100",
                  a && "opacity-100"
                ),
                onClick: (t) => t.stopPropagation(),
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
V.displayName = "TreeItem";
export {
  P as Tree,
  V as TreeItem
};
//# sourceMappingURL=tree.mjs.map
