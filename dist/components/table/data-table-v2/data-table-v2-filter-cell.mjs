import { jsxs as h, jsx as a } from "react/jsx-runtime";
import * as n from "react";
import { cn as x } from "../../../lib/utils.mjs";
import { Popover as y, PopoverTrigger as k, PopoverContent as F } from "../../ui/popover.mjs";
import { FilterIcon as D } from "../../../icons/FilterIcon.mjs";
import { DefaultNumberRangeFilter as R, DefaultDateRangeFilter as M, DefaultMultiSelectFilter as P, DefaultSelectFilter as S, DefaultTextFilter as v } from "./data-table-v2-default-filters.mjs";
function w({
  column: e,
  filter: l,
  value: o,
  active: r,
  onChange: i,
  columnKey: t
}) {
  const m = n.useCallback(
    (s) => i(t, s),
    [i, t]
  ), [c, u] = n.useState(!1), g = n.useCallback(() => u(!1), []), p = n.useRef(null), [b, f] = n.useState(null);
  n.useEffect(() => {
    var s;
    c && f(((s = p.current) == null ? void 0 : s.closest('[role="grid"]')) ?? null);
  }, [c]);
  const d = `${typeof e.header == "string" ? e.header : "컬럼"} 필터`;
  return /* @__PURE__ */ h(y, { open: c, onOpenChange: u, children: [
    /* @__PURE__ */ a(k, { asChild: !0, children: /* @__PURE__ */ h(
      "button",
      {
        ref: p,
        type: "button",
        className: x(
          "relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded transition-colors",
          "text-slate-400 hover:text-slate-700 hover:bg-slate-200/60",
          "dark:text-slate-500 dark:hover:text-slate-100 dark:hover:bg-slate-700/60",
          r && "text-blue-600 dark:text-blue-400"
        ),
        "aria-label": d,
        onClick: (s) => s.stopPropagation(),
        children: [
          /* @__PURE__ */ a(D, { size: 20 }),
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
        collisionBoundary: b ?? void 0,
        collisionPadding: 8,
        children: C(l, o, m, g, e)
      }
    )
  ] });
}
const O = n.memo(
  w
);
function C(e, l, o, r, i) {
  switch (e.type) {
    case "text":
      return /* @__PURE__ */ a(
        v,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r,
          placeholder: e.placeholder
        }
      );
    case "select":
      return /* @__PURE__ */ a(
        S,
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
        P,
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
        M,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r
        }
      );
    case "numberRange":
      return /* @__PURE__ */ a(
        R,
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
        column: i
      });
  }
}
export {
  O as DataTableV2FilterCell
};
//# sourceMappingURL=data-table-v2-filter-cell.mjs.map
