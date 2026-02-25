import { jsxs as f, jsx as a } from "react/jsx-runtime";
import * as c from "react";
import { cn as n } from "../lib/utils.mjs";
import { PageTitle as p } from "./page-title.mjs";
const x = c.forwardRef(
  ({ className: r, title: s, subtitle: m, bookmarked: i, onBookmark: l, tabs: e, sticky: o, ...t }, d) => /* @__PURE__ */ f(
    "div",
    {
      ref: d,
      className: n(
        "flex items-end w-full",
        o && "sticky top-0 z-10 bg-slate-50 dark:bg-slate-950 shadow-sm",
        r
      ),
      ...t,
      children: [
        /* @__PURE__ */ a(
          p,
          {
            title: s,
            subtitle: m,
            bookmarked: i,
            onBookmark: l,
            className: "flex-shrink-0"
          }
        ),
        e && /* @__PURE__ */ a("div", { className: "flex-1 min-w-0", children: e })
      ]
    }
  )
);
x.displayName = "PageHeader";
export {
  x as PageHeader
};
//# sourceMappingURL=page-header.mjs.map
