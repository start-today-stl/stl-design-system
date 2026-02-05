import { jsxs as i, jsx as e } from "react/jsx-runtime";
import * as m from "react";
import { cn as g } from "./index104.mjs";
const n = m.forwardRef(
  ({ className: s, icon: r, title: a, description: t, children: x, ...d }, c) => /* @__PURE__ */ i(
    "div",
    {
      ref: c,
      className: g(
        "w-[276px] p-2.5 bg-gray-50 dark:bg-gray-800 rounded-[10px]",
        s
      ),
      ...d,
      children: [
        r && /* @__PURE__ */ e("div", { className: "mb-2.5 w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400", children: r }),
        a && /* @__PURE__ */ e("p", { className: "mb-1 text-xs font-semibold text-gray-700 dark:text-gray-200 leading-[1.5] tracking-[-0.12px]", children: a }),
        t && /* @__PURE__ */ e("p", { className: "text-xs text-gray-500 dark:text-gray-400 leading-[1.5] tracking-[-0.12px]", children: t }),
        x
      ]
    }
  )
);
n.displayName = "Notice";
export {
  n as Notice
};
//# sourceMappingURL=index55.mjs.map
