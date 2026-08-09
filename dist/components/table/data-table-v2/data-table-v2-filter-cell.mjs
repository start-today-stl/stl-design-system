import { jsxs as p, jsx as a } from "react/jsx-runtime";
import * as s from "react";
import { cn as m } from "../../../lib/utils.mjs";
import { Popover as b, PopoverTrigger as g, PopoverContent as f } from "../../ui/popover.mjs";
import { FilterIcon as x } from "../../../icons/FilterIcon.mjs";
import { DefaultNumberRangeFilter as k, DefaultDateRangeFilter as F, DefaultMultiSelectFilter as D, DefaultSelectFilter as R, DefaultTextFilter as w } from "./data-table-v2-default-filters.mjs";
function C({
  column: t,
  filter: l,
  value: o,
  active: r,
  onChange: n,
  columnKey: e
}) {
  const d = s.useCallback(
    (i) => n(e, i),
    [n, e]
  ), [u, c] = s.useState(!1), h = s.useCallback(() => c(!1), []);
  return /* @__PURE__ */ p(b, { open: u, onOpenChange: c, children: [
    /* @__PURE__ */ a(g, { asChild: !0, children: /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: m(
          "relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded transition-colors",
          "text-slate-400 hover:text-slate-700 hover:bg-slate-200/60",
          "dark:text-slate-500 dark:hover:text-slate-100 dark:hover:bg-slate-700/60",
          r && "text-blue-600 dark:text-blue-400"
        ),
        "aria-label": `${typeof t.header == "string" ? t.header : "컬럼"} 필터`,
        onClick: (i) => i.stopPropagation(),
        children: [
          /* @__PURE__ */ a(x, { size: 20 }),
          r && /* @__PURE__ */ a(
            "span",
            {
              "aria-hidden": !0,
              "data-filter-active": "",
              className: "absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(f, { align: "end", className: "w-64 p-3", children: N(l, o, d, h, t) })
  ] });
}
const y = s.memo(
  C
);
function N(t, l, o, r, n) {
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ a(
        w,
        {
          value: l,
          onChange: (e) => o(e),
          onClose: r,
          placeholder: t.placeholder
        }
      );
    case "select":
      return /* @__PURE__ */ a(
        R,
        {
          value: l,
          onChange: (e) => o(e),
          onClose: r,
          options: t.options,
          placeholder: t.placeholder
        }
      );
    case "multiSelect":
      return /* @__PURE__ */ a(
        D,
        {
          value: l,
          onChange: (e) => o(e),
          onClose: r,
          options: t.options,
          placeholder: t.placeholder
        }
      );
    case "dateRange":
      return /* @__PURE__ */ a(
        F,
        {
          value: l,
          onChange: (e) => o(e),
          onClose: r
        }
      );
    case "numberRange":
      return /* @__PURE__ */ a(
        k,
        {
          value: l,
          onChange: (e) => o(e),
          onClose: r
        }
      );
    case "custom":
      return t.component({
        value: l,
        onChange: o,
        onClose: r,
        column: n
      });
  }
}
export {
  y as DataTableV2FilterCell
};
//# sourceMappingURL=data-table-v2-filter-cell.mjs.map
