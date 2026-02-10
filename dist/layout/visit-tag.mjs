import { jsxs as d, jsx as t } from "react/jsx-runtime";
import * as x from "react";
import { cn as p } from "../lib/utils.mjs";
import { XIcon as h } from "../icons/XIcon.mjs";
const b = x.forwardRef(
  ({ className: s, label: e, href: r, onNavigate: o, onRemove: a, ...i }, l) => {
    const n = () => {
      r ? window.location.href = r : o && o();
    };
    return /* @__PURE__ */ d(
      "div",
      {
        ref: l,
        className: p(
          "inline-flex h-9 items-center justify-center gap-0.5 p-2 rounded-[5px] whitespace-nowrap flex-shrink-0",
          "border-[0.75px] border-slate-100 dark:border-slate-700",
          "bg-white dark:bg-slate-900",
          "text-xs text-slate-700 dark:text-slate-300 tracking-[-0.12px]",
          "hover:border-slate-200 dark:hover:border-slate-600 transition-colors",
          s
        ),
        ...i,
        children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: n,
              className: "hover:text-blue-500 dark:hover:text-blue-300 transition-colors",
              children: e
            }
          ),
          a && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: (c) => {
                c.stopPropagation(), a();
              },
              className: "flex-shrink-0 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors",
              "aria-label": `${e} 삭제`,
              children: /* @__PURE__ */ t(h, { size: 20 })
            }
          )
        ]
      }
    );
  }
);
b.displayName = "VisitTag";
export {
  b as VisitTag
};
//# sourceMappingURL=visit-tag.mjs.map
