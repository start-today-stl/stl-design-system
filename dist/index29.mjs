import { jsx as d } from "react/jsx-runtime";
import * as s from "react";
import { cn as c } from "./index104.mjs";
const p = s.forwardRef(
  ({ className: i, options: a, value: t, onValueChange: e, defaultValue: o, ...x }, b) => {
    const [l, m] = s.useState(o || a[0]), k = t !== void 0 ? t : l, n = (r) => {
      t === void 0 && m(r), e == null || e(r);
    };
    return /* @__PURE__ */ d(
      "div",
      {
        ref: b,
        className: c("flex items-center gap-1", i),
        ...x,
        children: a.map((r) => /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            onClick: () => n(r),
            className: c(
              "h-[18px] px-[5px] rounded-[2px] border border-gray-200 text-[10px] tracking-[-0.1px] text-gray-700 transition-colors cursor-pointer",
              "dark:border-dark-300 dark:text-gray-100",
              k === r ? "bg-gray-100 dark:bg-dark-300" : "hover:bg-gray-50 dark:hover:bg-dark-400"
            ),
            children: r
          },
          r
        ))
      }
    );
  }
);
p.displayName = "FilterTabs";
export {
  p as FilterTabs
};
//# sourceMappingURL=index29.mjs.map
