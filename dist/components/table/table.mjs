import { jsx as l, jsxs as c } from "react/jsx-runtime";
import * as s from "react";
import { cn as r } from "../../lib/utils.mjs";
import { DownIcon as i } from "../../icons/DownIcon.mjs";
import { UpIcon as f } from "../../icons/UpIcon.mjs";
const p = s.forwardRef(
  ({ className: t, maxHeight: e, ...a }, o) => {
    const d = e ? { maxHeight: typeof e == "number" ? `${e}px` : e } : {};
    return /* @__PURE__ */ l(
      "div",
      {
        className: r("relative w-full overflow-x-auto", e && "overflow-y-auto"),
        style: d,
        children: /* @__PURE__ */ l(
          "table",
          {
            ref: o,
            className: r("caption-bottom text-[length:var(--text-body-2)]", t),
            style: { borderSpacing: 0, minWidth: "100%" },
            ...a
          }
        )
      }
    );
  }
);
p.displayName = "Table";
const y = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l("thead", { ref: a, className: r("sticky top-0 z-20 bg-[#eaedf1] dark:bg-slate-800 [&_tr]:border-b [&_tr]:border-slate-200 dark:[&_tr]:border-slate-700", t), ...e }));
y.displayName = "TableHeader";
const x = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
  "tbody",
  {
    ref: a,
    className: r("[&_tr:last-child]:border-0", t),
    ...e
  }
));
x.displayName = "TableBody";
const u = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
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
u.displayName = "TableFooter";
const N = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
  "tr",
  {
    ref: a,
    className: r(
      "group border-b border-slate-200 dark:border-slate-700 transition-colors bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-950/30",
      t
    ),
    ...e
  }
));
N.displayName = "TableRow";
const g = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
  "th",
  {
    ref: a,
    className: r(
      "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300 [&:has([role=checkbox])]:pr-0",
      "bg-[#eaedf1] dark:bg-slate-800",
      t
    ),
    ...e
  }
));
g.displayName = "TableHead";
const h = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
  "td",
  {
    ref: a,
    className: r("h-9 pl-3 pr-1.5 py-1.5 align-middle text-[#798698] dark:text-slate-300 [&:has([role=checkbox])]:pr-0", t),
    ...e
  }
));
h.displayName = "TableCell";
const k = s.forwardRef(({ className: t, ...e }, a) => /* @__PURE__ */ l(
  "caption",
  {
    ref: a,
    className: r("mt-4 text-sm text-muted-foreground", t),
    ...e
  }
));
k.displayName = "TableCaption";
const w = s.forwardRef(({ className: t, sortDirection: e, onSort: a, children: o, ...d }, n) => {
  const m = (b) => {
    a && (b.key === "Enter" || b.key === " ") && (b.preventDefault(), a());
  };
  return /* @__PURE__ */ l(
    "th",
    {
      ref: n,
      className: r(
        "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300",
        "bg-[#eaedf1] dark:bg-slate-800 select-none",
        "[&:has([role=checkbox])]:pr-0",
        t
      ),
      "aria-sort": e === "asc" ? "ascending" : e === "desc" ? "descending" : "none",
      ...d,
      children: /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          className: "flex w-full items-center gap-1 text-left cursor-pointer",
          onClick: a,
          onKeyDown: m,
          children: [
            o,
            /* @__PURE__ */ c("span", { className: "flex flex-col -space-y-1", children: [
              /* @__PURE__ */ l(
                f,
                {
                  size: 14,
                  className: r(
                    "transition-colors",
                    e === "asc" ? "text-blue-500" : "text-slate-300 dark:text-slate-500"
                  )
                }
              ),
              /* @__PURE__ */ l(
                i,
                {
                  size: 14,
                  className: r(
                    "transition-colors",
                    e === "desc" ? "text-blue-500" : "text-slate-300 dark:text-slate-500"
                  )
                }
              )
            ] })
          ]
        }
      )
    }
  );
});
w.displayName = "TableSortableHead";
export {
  p as Table,
  x as TableBody,
  k as TableCaption,
  h as TableCell,
  u as TableFooter,
  g as TableHead,
  y as TableHeader,
  N as TableRow,
  w as TableSortableHead
};
//# sourceMappingURL=table.mjs.map
