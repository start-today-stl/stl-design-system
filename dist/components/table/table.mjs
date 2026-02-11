import { jsx as r, jsxs as b } from "react/jsx-runtime";
import * as o from "react";
import { cn as l } from "../../lib/utils.mjs";
import { DownIcon as m } from "../../icons/DownIcon.mjs";
import { UpIcon as i } from "../../icons/UpIcon.mjs";
const n = o.forwardRef(
  ({ className: a, maxHeight: e, ...t }, s) => {
    const d = e ? { maxHeight: typeof e == "number" ? `${e}px` : e } : {};
    return /* @__PURE__ */ r(
      "div",
      {
        className: l("relative w-full overflow-x-auto", e && "overflow-y-auto"),
        style: d,
        children: /* @__PURE__ */ r(
          "table",
          {
            ref: s,
            className: l("caption-bottom text-sm", a),
            style: { borderSpacing: 0, minWidth: "100%" },
            ...t
          }
        )
      }
    );
  }
);
n.displayName = "Table";
const f = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ r("thead", { ref: t, className: l("sticky top-0 z-20 bg-[#eaedf1] dark:bg-slate-800 [&_tr]:border-b [&_tr]:border-slate-200 dark:[&_tr]:border-slate-700", a), ...e }));
f.displayName = "TableHeader";
const p = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ r(
  "tbody",
  {
    ref: t,
    className: l("[&_tr:last-child]:border-0", a),
    ...e
  }
));
p.displayName = "TableBody";
const x = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: t,
    className: l(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      a
    ),
    ...e
  }
));
x.displayName = "TableFooter";
const N = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ r(
  "tr",
  {
    ref: t,
    className: l(
      "group border-b border-[#f4f6f8] dark:border-slate-700 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
      a
    ),
    ...e
  }
));
N.displayName = "TableRow";
const y = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ r(
  "th",
  {
    ref: t,
    className: l(
      "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-400 [&:has([role=checkbox])]:pr-0",
      "bg-[#eaedf1] dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
      a
    ),
    ...e
  }
));
y.displayName = "TableHead";
const h = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ r(
  "td",
  {
    ref: t,
    className: l("h-9 pl-3 pr-1.5 py-1.5 align-middle text-[#798698] dark:text-slate-400 [&:has([role=checkbox])]:pr-0", a),
    ...e
  }
));
h.displayName = "TableCell";
const g = o.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ r(
  "caption",
  {
    ref: t,
    className: l("mt-4 text-sm text-muted-foreground", a),
    ...e
  }
));
g.displayName = "TableCaption";
const k = o.forwardRef(({ className: a, sortDirection: e, onSort: t, children: s, ...d }, c) => /* @__PURE__ */ r(
  "th",
  {
    ref: c,
    className: l(
      "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-400",
      "bg-[#eaedf1] dark:bg-slate-800 cursor-pointer select-none hover:bg-slate-200 dark:hover:bg-slate-700",
      "[&:has([role=checkbox])]:pr-0",
      a
    ),
    onClick: t,
    ...d,
    children: /* @__PURE__ */ b("div", { className: "flex items-center gap-1", children: [
      s,
      /* @__PURE__ */ b("span", { className: "flex flex-col -space-y-1", children: [
        /* @__PURE__ */ r(
          i,
          {
            size: 14,
            className: l(
              "transition-colors",
              e === "asc" ? "text-blue-500" : "text-slate-300 dark:text-slate-600"
            )
          }
        ),
        /* @__PURE__ */ r(
          m,
          {
            size: 14,
            className: l(
              "transition-colors",
              e === "desc" ? "text-blue-500" : "text-slate-300 dark:text-slate-600"
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
  p as TableBody,
  g as TableCaption,
  h as TableCell,
  x as TableFooter,
  y as TableHead,
  f as TableHeader,
  N as TableRow,
  k as TableSortableHead
};
//# sourceMappingURL=table.mjs.map
