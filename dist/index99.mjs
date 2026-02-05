import { jsxs as l, jsx as r } from "react/jsx-runtime";
import * as p from "react";
import { cn as x } from "./index104.mjs";
import { XIcon as g } from "./index101.mjs";
const y = p.forwardRef(
  ({ className: i, label: t, href: e, onNavigate: a, onRemove: o, ...n }, s) => {
    const d = () => {
      e ? window.location.href = e : a && a();
    };
    return /* @__PURE__ */ l(
      "div",
      {
        ref: s,
        className: x(
          "inline-flex h-9 items-center justify-center gap-0.5 p-2 rounded-[5px] whitespace-nowrap flex-shrink-0",
          "border-[0.75px] border-gray-100 dark:border-gray-700",
          "bg-white dark:bg-dark-500",
          "text-xs text-gray-700 dark:text-gray-300 tracking-[-0.12px]",
          "hover:border-gray-200 dark:hover:border-gray-600 transition-colors",
          i
        ),
        ...n,
        children: [
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              onClick: d,
              className: "hover:text-primary dark:hover:text-primary-300 transition-colors",
              children: t
            }
          ),
          o && /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              onClick: (c) => {
                c.stopPropagation(), o();
              },
              className: "flex-shrink-0 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors",
              "aria-label": `${t} 삭제`,
              children: /* @__PURE__ */ r(g, { size: 20 })
            }
          )
        ]
      }
    );
  }
);
y.displayName = "VisitTag";
export {
  y as VisitTag
};
//# sourceMappingURL=index99.mjs.map
