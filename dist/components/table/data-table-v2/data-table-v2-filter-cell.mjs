import { jsxs as u, jsx as a } from "react/jsx-runtime";
import * as n from "react";
import { cn as f } from "../../../lib/utils.mjs";
import { Popover as x, PopoverTrigger as k, PopoverContent as F } from "../../ui/popover.mjs";
import { FilterIcon as y } from "../../../icons/FilterIcon.mjs";
import { DefaultNumberRangeFilter as D, DefaultDateRangeFilter as R, DefaultMultiSelectFilter as C, DefaultSelectFilter as M, DefaultTextFilter as P } from "./data-table-v2-default-filters.mjs";
function T({
  column: e,
  filter: l,
  value: o,
  active: r,
  onChange: c,
  columnKey: t
}) {
  const h = n.useCallback(
    (s) => c(t, s),
    [c, t]
  ), [g, i] = n.useState(!1), m = n.useCallback(() => i(!1), []), p = n.useRef(null), b = n.useCallback((s) => {
    p.current = (s == null ? void 0 : s.closest('[role="grid"]')) ?? null;
  }, []), d = `${typeof e.header == "string" ? e.header : "컬럼"} 필터`;
  return /* @__PURE__ */ u(x, { open: g, onOpenChange: i, children: [
    /* @__PURE__ */ a(k, { asChild: !0, children: /* @__PURE__ */ u(
      "button",
      {
        ref: b,
        type: "button",
        className: f(
          "relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded transition-colors",
          "text-slate-400 hover:text-slate-700 hover:bg-slate-200/60",
          "dark:text-slate-500 dark:hover:text-slate-100 dark:hover:bg-slate-700/60",
          r && "text-blue-600 dark:text-blue-400"
        ),
        "aria-label": d,
        onClick: (s) => s.stopPropagation(),
        children: [
          /* @__PURE__ */ a(y, { size: 20 }),
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
    /* @__PURE__ */ a(
      F,
      {
        align: "end",
        className: "w-64 p-3",
        "aria-label": d,
        collisionBoundary: p.current ?? void 0,
        collisionPadding: 8,
        children: v(l, o, h, m, e)
      }
    )
  ] });
}
const O = n.memo(
  T
);
function v(e, l, o, r, c) {
  switch (e.type) {
    case "text":
      return /* @__PURE__ */ a(
        P,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r,
          placeholder: e.placeholder
        }
      );
    case "select":
      return /* @__PURE__ */ a(
        M,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r,
          options: e.options,
          placeholder: e.placeholder,
          emptyMessage: e.emptyMessage
        }
      );
    case "multiSelect":
      return /* @__PURE__ */ a(
        C,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r,
          options: e.options,
          placeholder: e.placeholder,
          emptyMessage: e.emptyMessage
        }
      );
    case "dateRange":
      return /* @__PURE__ */ a(
        R,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r
        }
      );
    case "numberRange":
      return /* @__PURE__ */ a(
        D,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r
        }
      );
    case "custom":
      return e.component({
        value: l,
        onChange: o,
        onClose: r,
        column: c
      });
  }
}
export {
  O as DataTableV2FilterCell
};
//# sourceMappingURL=data-table-v2-filter-cell.mjs.map
