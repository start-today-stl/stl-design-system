import { jsxs as r, jsx as e } from "react/jsx-runtime";
import * as o from "react";
import { cn as i } from "../lib/utils.mjs";
import { SaveIcon as d } from "../icons/SaveIcon.mjs";
const x = o.forwardRef(
  ({ className: l, title: n, subtitle: a, bookmarked: t, onBookmark: s, ...m }, c) => /* @__PURE__ */ r(
    "div",
    {
      ref: c,
      className: i("flex items-center gap-1.5", l),
      ...m,
      children: [
        /* @__PURE__ */ r("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ e("h1", { className: "text-xl font-medium text-text-primary", children: n }),
          a && /* @__PURE__ */ e("span", { className: "text-base font-semibold text-text-disabled", children: a })
        ] }),
        s && /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: s,
            className: i(
              "p-1 rounded transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
              t ? "text-primary" : "text-slate-400 dark:text-slate-500"
            ),
            "aria-label": t ? "북마크 해제" : "북마크 추가",
            "aria-pressed": t,
            children: /* @__PURE__ */ e(d, { size: 24 })
          }
        )
      ]
    }
  )
);
x.displayName = "PageTitle";
export {
  x as PageTitle
};
//# sourceMappingURL=page-title.mjs.map
