import { jsx as l, jsxs as b } from "react/jsx-runtime";
import * as o from "react";
import { cn as r } from "../../lib/utils.mjs";
import { DownIcon as m } from "../../icons/DownIcon.mjs";
import { UpIcon as i } from "../../icons/UpIcon.mjs";
const n = o.forwardRef(
  ({ className: a, maxHeight: e, ...t }, s) => {
    const d = e ? { maxHeight: typeof e == "number" ? `${e}px` : e } : {};
    return /* @__PURE__ */ l(
      "div",
      {
        className: r("relative w-full overflow-x-auto", e && "overflow-y-auto"),
        style: d,
        children: /* @__PURE__ */ l(
          "table",
          {
            ref: s,
            className: r("caption-bottom text-[length:var(--text-body-2)]", a),
            style: { borderSpacing: 0, minWidth: "100%" },
            ...t
          }
        )
      }
    );
  }
);
n.displayName = "Table";
const p = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l("thead", { ref: t, className: r("sticky top-0 z-20 bg-[#eaedf1] dark:bg-slate-800 [&_tr]:border-b [&_tr]:border-slate-200 dark:[&_tr]:border-slate-700", a), ...e }));
p.displayName = "TableHeader";
const f = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "tbody",
  {
    ref: t,
    className: r("[&_tr:last-child]:border-0", a),
    ...e
  }
));
f.displayName = "TableBody";
const x = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
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
const y = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "tr",
  {
    ref: t,
    className: r(
      "group border-b border-slate-200 dark:border-slate-700 transition-colors bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-950/30",
      a
    ),
    ...e
  }
));
y.displayName = "TableRow";
const N = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "th",
  {
    ref: t,
    className: r(
      "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300 [&:has([role=checkbox])]:pr-0",
      "bg-[#eaedf1] dark:bg-slate-800",
      a
    ),
    ...e
  }
));
N.displayName = "TableHead";
const h = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "td",
  {
    ref: t,
    className: r("h-9 pl-3 pr-1.5 py-1.5 align-middle text-[#798698] dark:text-slate-300 [&:has([role=checkbox])]:pr-0", a),
    ...e
  }
));
h.displayName = "TableCell";
const g = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ l(
  "caption",
  {
    ref: t,
    className: r("mt-4 text-sm text-muted-foreground", a),
    ...e
  }
));
g.displayName = "TableCaption";
const k = o.forwardRef(({ className: a, sortDirection: e, onSort: t, children: s, ...d }, c) => /* @__PURE__ */ l(
  "th",
  {
    ref: c,
    className: r(
      "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300",
      "bg-[#eaedf1] dark:bg-slate-800 cursor-pointer select-none",
      "[&:has([role=checkbox])]:pr-0",
      a
    ),
    onClick: t,
    ...d,
    children: /* @__PURE__ */ b("div", { className: "flex items-center gap-1", children: [
      s,
      /* @__PURE__ */ b("span", { className: "flex flex-col -space-y-1", children: [
        /* @__PURE__ */ l(
          i,
          {
            size: 14,
            className: r(
              "transition-colors",
              e === "asc" ? "text-blue-500" : "text-slate-300 dark:text-slate-500"
            )
          }
        ),
        /* @__PURE__ */ l(
          m,
          {
            size: 14,
            className: r(
              "transition-colors",
              e === "desc" ? "text-blue-500" : "text-slate-300 dark:text-slate-500"
            )
          }
        )
      ] })
    ] })
  }
));
k.displayName = "TableSortableHead";
export {
  n as Table,
  f as TableBody,
  g as TableCaption,
  h as TableCell,
  x as TableFooter,
  N as TableHead,
  p as TableHeader,
  y as TableRow,
  k as TableSortableHead
};
//# sourceMappingURL=table.mjs.map
