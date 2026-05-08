import { jsx as l, jsxs as n } from "react/jsx-runtime";
import * as s from "react";
import { cn as r } from "../../lib/utils.mjs";
const c = ({ direction: a, active: e }) => /* @__PURE__ */ l(
  "svg",
  {
    width: "8",
    height: "5",
    viewBox: "0 0 8 5",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: r(
      "transition-colors",
      e ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
      a === "down" && "rotate-180"
    ),
    children: /* @__PURE__ */ l("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
  }
), m = s.forwardRef(
  ({ className: a, maxHeight: e, ...t }, o) => {
    const d = e ? { maxHeight: typeof e == "number" ? `${e}px` : e } : {};
    return /* @__PURE__ */ l(
      "div",
      {
        className: r("relative w-full overflow-x-auto overflow-y-auto flex-1 bg-white dark:bg-slate-900", a),
        style: d,
        children: /* @__PURE__ */ l(
          "table",
          {
            ref: o,
            className: r("caption-bottom text-xs"),
            style: { borderCollapse: "separate", borderSpacing: 0, minWidth: "100%" },
            ...t
          }
        )
      }
    );
  }
);
m.displayName = "Table";
const f = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l("thead", { ref: t, className: r("sticky top-0 z-20 bg-slate-100 dark:bg-slate-800", a), ...e }));
f.displayName = "TableHeader";
const w = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "tbody",
  {
    ref: t,
    className: r("[&_tr:last-child_td]:border-0", a),
    ...e
  }
));
w.displayName = "TableBody";
const x = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "tfoot",
  {
    ref: t,
    className: r(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      a
    ),
    ...e
  }
));
x.displayName = "TableFooter";
const g = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "tr",
  {
    ref: t,
    className: r(
      "group transition-colors bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
      a
    ),
    ...e
  }
));
g.displayName = "TableRow";
const h = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "th",
  {
    ref: t,
    className: r(
      "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-700 dark:text-slate-300 [&:has([role=checkbox])]:pr-0",
      "bg-slate-100 dark:bg-slate-800",
      "border-b border-slate-200 dark:border-slate-700",
      a
    ),
    ...e
  }
));
h.displayName = "TableHead";
const y = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "td",
  {
    ref: t,
    className: r("h-9 pl-3 pr-1.5 py-1.5 align-middle text-slate-900 dark:text-slate-200 [&:has([role=checkbox])]:pr-0 border-b border-slate-200 dark:border-slate-700", a),
    ...e
  }
));
y.displayName = "TableCell";
const u = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "caption",
  {
    ref: t,
    className: r("mt-4 text-sm text-muted-foreground", a),
    ...e
  }
));
u.displayName = "TableCaption";
const k = s.forwardRef(({ className: a, sortDirection: e, onSort: t, children: o, ...d }, i) => {
  const p = (b) => {
    t && (b.key === "Enter" || b.key === " ") && (b.preventDefault(), t());
  };
  return /* @__PURE__ */ l(
    "th",
    {
      ref: i,
      className: r(
        "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-700 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800 select-none",
        "border-b border-slate-200 dark:border-slate-700",
        "[&:has([role=checkbox])]:pr-0",
        a
      ),
      "aria-sort": e === "asc" ? "ascending" : e === "desc" ? "descending" : "none",
      ...d,
      children: /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          className: "flex w-full items-center gap-1 text-left cursor-pointer",
          onClick: t,
          onKeyDown: p,
          children: [
            o,
            /* @__PURE__ */ n("span", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ l(c, { direction: "up", active: e === "asc" }),
              /* @__PURE__ */ l(c, { direction: "down", active: e === "desc" })
            ] })
          ]
        }
      )
    }
  );
});
k.displayName = "TableSortableHead";
export {
  m as Table,
  w as TableBody,
  u as TableCaption,
  y as TableCell,
  x as TableFooter,
  h as TableHead,
  f as TableHeader,
  g as TableRow,
  k as TableSortableHead
};
//# sourceMappingURL=table.mjs.map
