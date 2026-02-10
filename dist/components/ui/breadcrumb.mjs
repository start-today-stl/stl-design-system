import { jsx as r, jsxs as d } from "react/jsx-runtime";
import * as x from "react";
import { ChevronRight as h } from "lucide-react";
import { cn as l } from "../../lib/utils.mjs";
const p = x.forwardRef(
  ({ className: c, items: a, separator: n, ...o }, i) => /* @__PURE__ */ r(
    "nav",
    {
      ref: i,
      "aria-label": "Breadcrumb",
      className: l("flex items-center text-sm", c),
      ...o,
      children: /* @__PURE__ */ r("ol", { className: "flex items-center gap-1", children: a.map((e, s) => {
        const t = s === a.length - 1, m = !t && (e.href || e.onClick);
        return /* @__PURE__ */ d("li", { className: "flex items-center gap-1", children: [
          m ? e.href ? /* @__PURE__ */ r(
            "a",
            {
              href: e.href,
              className: "text-text-secondary hover:text-text-primary transition-colors",
              children: e.label
            }
          ) : /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              onClick: e.onClick,
              className: "text-text-secondary hover:text-text-primary transition-colors",
              children: e.label
            }
          ) : /* @__PURE__ */ r(
            "span",
            {
              className: l(
                t ? "text-text-primary font-medium" : "text-text-secondary"
              ),
              "aria-current": t ? "page" : void 0,
              children: e.label
            }
          ),
          !t && /* @__PURE__ */ r("span", { className: "text-text-disabled", "aria-hidden": "true", children: n || /* @__PURE__ */ r(h, { className: "size-4" }) })
        ] }, s);
      }) })
    }
  )
);
p.displayName = "Breadcrumb";
export {
  p as Breadcrumb
};
//# sourceMappingURL=breadcrumb.mjs.map
