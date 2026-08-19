import { jsxs as F, jsx as s } from "react/jsx-runtime";
import * as a from "react";
import { cn as M } from "../../../lib/utils.mjs";
import { Popover as w, PopoverTrigger as P, PopoverContent as S } from "../../ui/popover.mjs";
import { FilterIcon as T } from "../../../icons/FilterIcon.mjs";
import { DefaultNumberRangeFilter as E, DefaultDateRangeFilter as N, DefaultMultiSelectFilter as j, DefaultSelectFilter as B, DefaultTextFilter as I } from "./data-table-v2-default-filters.mjs";
function L({
  column: e,
  filter: o,
  value: l,
  active: n,
  onChange: c,
  columnKey: t
}) {
  const y = a.useCallback(
    (r) => c(t, r),
    [c, t]
  ), [i, u] = a.useState(!1), D = a.useCallback(() => u(!1), []), g = a.useRef(null), v = a.useCallback((r) => {
    d.current = r, g.current = (r == null ? void 0 : r.closest('[role="grid"]')) ?? null;
  }, []), h = a.useRef(null), d = a.useRef(null);
  a.useEffect(() => {
    var m;
    if (!i) return;
    const r = (m = d.current) == null ? void 0 : m.getBoundingClientRect();
    if (!r) return;
    const f = (C) => {
      var x, k;
      const R = C.target;
      if (R && ((x = h.current) != null && x.contains(R))) return;
      const p = (k = d.current) == null ? void 0 : k.getBoundingClientRect();
      p && (Math.abs(p.left - r.left) > 1 || Math.abs(p.top - r.top) > 1) && u(!1);
    };
    return document.addEventListener("scroll", f, !0), () => document.removeEventListener("scroll", f, !0);
  }, [i]);
  const b = `${typeof e.header == "string" ? e.header : "컬럼"} 필터`;
  return /* @__PURE__ */ F(w, { open: i, onOpenChange: u, children: [
    /* @__PURE__ */ s(P, { asChild: !0, children: /* @__PURE__ */ F(
      "button",
      {
        ref: v,
        type: "button",
        className: M(
          "relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded transition-colors",
          "text-slate-400 hover:text-slate-700 hover:bg-slate-200/60",
          "dark:text-slate-500 dark:hover:text-slate-100 dark:hover:bg-slate-700/60",
          n && "text-blue-600 dark:text-blue-400"
        ),
        "aria-label": b,
        onClick: (r) => r.stopPropagation(),
        children: [
          /* @__PURE__ */ s(T, { size: 20 }),
          n && /* @__PURE__ */ s(
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
    /* @__PURE__ */ s(
      S,
      {
        ref: h,
        align: "start",
        className: "w-64 p-3",
        "aria-label": b,
        collisionBoundary: g.current ?? void 0,
        collisionPadding: 8,
        children: O(o, l, y, D, e)
      }
    )
  ] });
}
const G = a.memo(
  L
);
function O(e, o, l, n, c) {
  switch (e.type) {
    case "text":
      return /* @__PURE__ */ s(
        I,
        {
          value: o,
          onChange: (t) => l(t),
          onClose: n,
          placeholder: e.placeholder
        }
      );
    case "select":
      return /* @__PURE__ */ s(
        B,
        {
          value: o,
          onChange: (t) => l(t),
          onClose: n,
          options: e.options,
          placeholder: e.placeholder,
          emptyMessage: e.emptyMessage,
          searchable: e.searchable,
          description: e.description
        }
      );
    case "multiSelect":
      return /* @__PURE__ */ s(
        j,
        {
          value: o,
          onChange: (t) => l(t),
          onClose: n,
          options: e.options,
          placeholder: e.placeholder,
          emptyMessage: e.emptyMessage,
          searchable: e.searchable,
          description: e.description
        }
      );
    case "dateRange":
      return /* @__PURE__ */ s(
        N,
        {
          value: o,
          onChange: (t) => l(t),
          onClose: n
        }
      );
    case "numberRange":
      return /* @__PURE__ */ s(
        E,
        {
          value: o,
          onChange: (t) => l(t),
          onClose: n
        }
      );
    case "custom":
      return e.component({
        value: o,
        onChange: l,
        onClose: n,
        column: c
      });
  }
}
export {
  G as DataTableV2FilterCell
};
//# sourceMappingURL=data-table-v2-filter-cell.mjs.map
