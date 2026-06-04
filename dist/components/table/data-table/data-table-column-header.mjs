import { jsx as C, jsxs as n } from "react/jsx-runtime";
import { cn as p } from "../../../lib/utils.mjs";
import { TableSortableHead as H, TableHead as D } from "../table.mjs";
import { SortableHeaderCell as k } from "./sortable-header-cell.mjs";
import { toPxString as b, getColumnKey as P } from "./utils.mjs";
function S({
  column: r,
  stickyData: l,
  alignClass: h,
  needsRightBorder: f,
  resizable: d,
  resizedWidth: a,
  isResizing: g,
  onResizeStart: c,
  columnReorderable: y,
  sortDirection: m,
  sortPriority: w,
  onSort: x
}) {
  const e = {};
  r.sticky || (a !== void 0 ? (e.width = `${a}px`, e.minWidth = `${a}px`) : (r.width && (e.width = b(r.width)), r.minWidth && (e.minWidth = b(r.minWidth))));
  const i = { ...e, ...l.style }, v = f && "border-r border-slate-200 dark:border-slate-700", o = d && /* @__PURE__ */ C(
    "div",
    {
      className: p(
        "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
        g && "opacity-100"
      ),
      style: {
        right: "-4px",
        background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
      },
      onMouseDown: (t) => c(t, r),
      onPointerDown: (t) => t.stopPropagation(),
      onClick: (t) => t.stopPropagation()
    }
  ), s = p(
    h,
    l.className,
    d && "relative overflow-visible",
    v
  );
  return y && !r.sticky && !r.sortable ? /* @__PURE__ */ n(k, { id: P(r), style: i, className: s, children: [
    r.header,
    o
  ] }) : r.sortable ? /* @__PURE__ */ n(
    H,
    {
      sortDirection: m,
      sortPriority: w,
      onSort: x,
      style: i,
      className: s,
      children: [
        r.header,
        o
      ]
    }
  ) : /* @__PURE__ */ n(D, { style: i, className: s, children: [
    r.header,
    o
  ] });
}
const B = S;
export {
  B as DataTableColumnHeader
};
//# sourceMappingURL=data-table-column-header.mjs.map
