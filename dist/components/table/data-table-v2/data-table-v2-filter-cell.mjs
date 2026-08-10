import { jsxs as f, jsx as n } from "react/jsx-runtime";
import * as l from "react";
import { cn as F } from "../../../lib/utils.mjs";
import { Popover as y, PopoverTrigger as D, PopoverContent as v } from "../../ui/popover.mjs";
import { FilterIcon as C } from "../../../icons/FilterIcon.mjs";
import { DefaultNumberRangeFilter as M, DefaultDateRangeFilter as P, DefaultMultiSelectFilter as S, DefaultSelectFilter as T, DefaultTextFilter as w } from "./data-table-v2-default-filters.mjs";
function N({
  column: e,
  filter: o,
  value: s,
  active: a,
  onChange: c,
  columnKey: t
}) {
  const b = l.useCallback(
    (r) => c(t, r),
    [c, t]
  ), [i, u] = l.useState(!1), x = l.useCallback(() => u(!1), []), d = l.useRef(null), k = l.useCallback((r) => {
    d.current = (r == null ? void 0 : r.closest('[role="grid"]')) ?? null;
  }, []), p = l.useRef(null);
  l.useEffect(() => {
    if (!i) return;
    const r = (R) => {
      var h;
      const g = R.target;
      g && ((h = p.current) != null && h.contains(g)) || u(!1);
    };
    return document.addEventListener("scroll", r, !0), () => document.removeEventListener("scroll", r, !0);
  }, [i]);
  const m = `${typeof e.header == "string" ? e.header : "컬럼"} 필터`;
  return /* @__PURE__ */ f(y, { open: i, onOpenChange: u, children: [
    /* @__PURE__ */ n(D, { asChild: !0, children: /* @__PURE__ */ f(
      "button",
      {
        ref: k,
        type: "button",
        className: F(
          "relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded transition-colors",
          "text-slate-400 hover:text-slate-700 hover:bg-slate-200/60",
          "dark:text-slate-500 dark:hover:text-slate-100 dark:hover:bg-slate-700/60",
          a && "text-blue-600 dark:text-blue-400"
        ),
        "aria-label": m,
        onClick: (r) => r.stopPropagation(),
        children: [
          /* @__PURE__ */ n(C, { size: 20 }),
          a && /* @__PURE__ */ n(
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
    /* @__PURE__ */ n(
      v,
      {
        ref: p,
        align: "end",
        className: "w-64 p-3",
        "aria-label": m,
        collisionBoundary: d.current ?? void 0,
        collisionPadding: 8,
        children: j(o, s, b, x, e)
      }
    )
  ] });
}
const z = l.memo(
  N
);
function j(e, o, s, a, c) {
  switch (e.type) {
    case "text":
      return /* @__PURE__ */ n(
        w,
        {
          value: o,
          onChange: (t) => s(t),
          onClose: a,
          placeholder: e.placeholder
        }
      );
    case "select":
      return /* @__PURE__ */ n(
        T,
        {
          value: o,
          onChange: (t) => s(t),
          onClose: a,
          options: e.options,
          placeholder: e.placeholder,
          emptyMessage: e.emptyMessage
        }
      );
    case "multiSelect":
      return /* @__PURE__ */ n(
        S,
        {
          value: o,
          onChange: (t) => s(t),
          onClose: a,
          options: e.options,
          placeholder: e.placeholder,
          emptyMessage: e.emptyMessage
        }
      );
    case "dateRange":
      return /* @__PURE__ */ n(
        P,
        {
          value: o,
          onChange: (t) => s(t),
          onClose: a
        }
      );
    case "numberRange":
      return /* @__PURE__ */ n(
        M,
        {
          value: o,
          onChange: (t) => s(t),
          onClose: a
        }
      );
    case "custom":
      return e.component({
        value: o,
        onChange: s,
        onClose: a,
        column: c
      });
  }
}
export {
  z as DataTableV2FilterCell
};
//# sourceMappingURL=data-table-v2-filter-cell.mjs.map
