import { jsxs as x, jsx as t } from "react/jsx-runtime";
import * as h from "react";
import { cn as s } from "../lib/utils.mjs";
import { XIcon as b } from "../icons/XIcon.mjs";
const k = h.forwardRef(
  ({ className: i, label: e, href: r, onNavigate: o, onRemove: a, active: l, ...n }, c) => {
    const d = () => {
      r ? window.location.href = r : o && o();
    };
    return /* @__PURE__ */ x(
      "div",
      {
        ref: c,
        className: s(
          "inline-flex h-9 items-center justify-center gap-0.5 p-2 rounded-[5px] whitespace-nowrap flex-shrink-0",
          "border-[0.75px] border-slate-100 dark:border-slate-700",
          "bg-white dark:bg-slate-900",
          "text-xs text-slate-700 dark:text-slate-300 tracking-[-0.12px]",
          "hover:border-slate-200 dark:hover:border-slate-600 transition-colors",
          i
        ),
        ...n,
        children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: d,
              className: s(
                "cursor-pointer transition-colors",
                l ? "text-primary" : "hover:text-blue-500 dark:hover:text-blue-300"
              ),
              children: e
            }
          ),
          a && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: (p) => {
                p.stopPropagation(), a();
              },
              className: "flex-shrink-0 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors",
              "aria-label": `${e} 삭제`,
              children: /* @__PURE__ */ t(b, { size: 20 })
            }
          )
        ]
      }
    );
  }
);
k.displayName = "VisitTag";
export {
  k as VisitTag
};
//# sourceMappingURL=visit-tag.mjs.map
