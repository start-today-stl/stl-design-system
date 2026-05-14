import { jsx as l, jsxs as c } from "react/jsx-runtime";
import * as s from "react";
import { cn as r } from "../../lib/utils.mjs";
const i = ({ direction: a, active: e }) => /* @__PURE__ */ l(
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
), f = s.forwardRef(
  ({ className: a, maxHeight: e, wrapperRef: t, ...o }, d) => {
    const n = e ? { maxHeight: typeof e == "number" ? `${e}px` : e } : {};
    return /* @__PURE__ */ l(
      "div",
      {
        ref: t,
        className: r("relative w-full overflow-x-auto overflow-y-auto flex-1 bg-white dark:bg-slate-900", a),
        style: n,
        children: /* @__PURE__ */ l(
          "table",
          {
            ref: d,
            className: r("caption-bottom text-xs"),
            style: { borderCollapse: "separate", borderSpacing: 0, minWidth: "100%" },
            ...o
          }
        )
      }
    );
  }
);
f.displayName = "Table";
const x = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l("thead", { ref: t, className: r("sticky top-0 z-20 bg-slate-100 dark:bg-slate-800", a), ...e }));
x.displayName = "TableHeader";
const g = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "tbody",
  {
    ref: t,
    className: r("[&_tr:last-child_td]:border-0", a),
    ...e
  }
));
g.displayName = "TableBody";
const h = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
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
h.displayName = "TableFooter";
const w = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
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
w.displayName = "TableRow";
const u = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
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
u.displayName = "TableHead";
const y = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "td",
  {
    ref: t,
    className: r("h-9 pl-3 pr-1.5 py-1.5 align-middle text-slate-900 dark:text-slate-200 [&:has([role=checkbox])]:pr-0 border-b border-slate-200 dark:border-slate-700", a),
    ...e
  }
));
y.displayName = "TableCell";
const N = s.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "caption",
  {
    ref: t,
    className: r("mt-4 text-sm text-muted-foreground", a),
    ...e
  }
));
N.displayName = "TableCaption";
const k = s.forwardRef(({ className: a, sortDirection: e, onSort: t, sortPriority: o, children: d, ...n }, p) => {
  const m = (b) => {
    t && (b.key === "Enter" || b.key === " ") && (b.preventDefault(), t());
  };
  return /* @__PURE__ */ l(
    "th",
    {
      ref: p,
      className: r(
        "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-700 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800 select-none",
        "border-b border-slate-200 dark:border-slate-700",
        "[&:has([role=checkbox])]:pr-0",
        a
      ),
      "aria-sort": e === "asc" ? "ascending" : e === "desc" ? "descending" : "none",
      ...n,
      children: /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          className: "flex w-full items-center gap-1 text-left cursor-pointer",
          onClick: t,
          onKeyDown: m,
          children: [
            d,
            /* @__PURE__ */ c("span", { className: "flex items-center gap-0.5", children: [
              /* @__PURE__ */ c("span", { className: "flex flex-col gap-0.5", children: [
                /* @__PURE__ */ l(i, { direction: "up", active: e === "asc" }),
                /* @__PURE__ */ l(i, { direction: "down", active: e === "desc" })
              ] }),
              o !== void 0 && /* @__PURE__ */ l("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: o })
            ] })
          ]
        }
      )
    }
  );
});
k.displayName = "TableSortableHead";
export {
  f as Table,
  g as TableBody,
  N as TableCaption,
  y as TableCell,
  h as TableFooter,
  u as TableHead,
  x as TableHeader,
  w as TableRow,
  k as TableSortableHead
};
//# sourceMappingURL=table.mjs.map
