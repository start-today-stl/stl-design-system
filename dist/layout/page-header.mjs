import { jsxs as d, jsx as r } from "react/jsx-runtime";
import * as t from "react";
import { cn as c } from "../lib/utils.mjs";
import { PageTitle as n } from "./page-title.mjs";
const p = t.forwardRef(
  ({ className: a, title: m, subtitle: i, bookmarked: s, onBookmark: l, tabs: e, ...o }, f) => /* @__PURE__ */ d(
    "div",
    {
      ref: f,
      className: c("flex items-end w-full", a),
      ...o,
      children: [
        /* @__PURE__ */ r(
          n,
          {
            title: m,
            subtitle: i,
            bookmarked: s,
            onBookmark: l,
            className: "flex-shrink-0"
          }
        ),
        e && /* @__PURE__ */ r("div", { className: "flex-1 min-w-0", children: e })
      ]
    }
  )
);
p.displayName = "PageHeader";
export {
  p as PageHeader
};
//# sourceMappingURL=page-header.mjs.map
