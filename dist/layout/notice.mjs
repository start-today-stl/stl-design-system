import { jsxs as c, jsx as e } from "react/jsx-runtime";
import * as i from "react";
import { cn as m } from "../lib/utils.mjs";
const n = i.forwardRef(
  ({ className: r, icon: t, title: a, description: s, children: l, ...x }, d) => /* @__PURE__ */ c(
    "div",
    {
      ref: d,
      className: m(
        "w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-[10px]",
        r
      ),
      ...x,
      children: [
        t && /* @__PURE__ */ e("div", { className: "mb-2.5 w-6 h-6 flex items-center justify-center text-slate-500 dark:text-slate-400", children: t }),
        a && /* @__PURE__ */ e("p", { className: "mb-1 text-xs font-semibold text-slate-700 dark:text-slate-200 leading-[1.5] tracking-[-0.12px]", children: a }),
        s && /* @__PURE__ */ e("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-[1.5] tracking-[-0.12px]", children: s }),
        l
      ]
    }
  )
);
n.displayName = "Notice";
export {
  n as Notice
};
//# sourceMappingURL=notice.mjs.map
