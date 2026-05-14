import { jsx as l, jsxs as c } from "react/jsx-runtime";
import * as s from "react";
import { cn as r } from "../../lib/utils.mjs";
const i = ({ direction: t, active: e }) => /* @__PURE__ */ l(
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
      t === "down" && "rotate-180"
    ),
    children: /* @__PURE__ */ l("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
  }
), f = s.forwardRef(
  ({ className: t, maxHeight: e, wrapperRef: a, ...o }, b) => {
    const n = e ? { maxHeight: typeof e == "number" ? `${e}px` : e } : {};
    return /* @__PURE__ */ l(
      "div",
      {
        ref: a,
        className: r("relative w-full overflow-x-auto overflow-y-auto flex-1 bg-white dark:bg-slate-900", t),
        style: n,
        children: /* @__PURE__ */ l(
          "table",
          {
            ref: b,
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
const x = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l("thead", { ref: a, className: r("sticky top-0 z-20 bg-slate-100 dark:bg-slate-800", t), ...e }));
x.displayName = "TableHeader";
const h = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
  "tbody",
  {
    ref: a,
    className: r("[&_tr:last-child_td]:border-0", t),
    ...e
  }
));
h.displayName = "TableBody";
const g = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
  "tfoot",
  {
    ref: a,
    className: r(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      t
    ),
    ...e
  }
));
g.displayName = "TableFooter";
const w = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
  "tr",
  {
    ref: a,
    className: r(
      "group transition-colors bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
      t
    ),
    ...e
  }
));
w.displayName = "TableRow";
const u = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
  "th",
  {
    ref: a,
    className: r(
      "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-700 dark:text-slate-300 [&:has([role=checkbox])]:pr-0",
      "bg-slate-100 dark:bg-slate-800",
      "border-b border-slate-200 dark:border-slate-700",
      t
    ),
    ...e
  }
));
u.displayName = "TableHead";
const y = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
  "td",
  {
    ref: a,
    className: r("h-9 pl-3 pr-1.5 py-1.5 align-middle text-slate-900 dark:text-slate-200 [&:has([role=checkbox])]:pr-0 border-b border-slate-200 dark:border-slate-700", t),
    ...e
  }
));
y.displayName = "TableCell";
const N = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
  "caption",
  {
    ref: a,
    className: r("mt-4 text-sm text-muted-foreground", t),
    ...e
  }
));
N.displayName = "TableCaption";
const k = s.forwardRef(({ className: t, sortDirection: e, onSort: a, sortPriority: o, children: b, ...n }, p) => {
  const m = (d) => {
    a && (d.key === "Enter" || d.key === " ") && (d.preventDefault(), a(d.shiftKey));
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
        t
      ),
      "aria-sort": e === "asc" ? "ascending" : e === "desc" ? "descending" : "none",
      ...n,
      children: /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          className: "flex w-full items-center gap-1 text-left cursor-pointer",
          onClick: (d) => a == null ? void 0 : a(d.shiftKey),
          onKeyDown: m,
          children: [
            b,
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
  h as TableBody,
  N as TableCaption,
  y as TableCell,
  g as TableFooter,
  u as TableHead,
  x as TableHeader,
  w as TableRow,
  k as TableSortableHead
};
//# sourceMappingURL=table.mjs.map
