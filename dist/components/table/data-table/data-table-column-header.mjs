import { jsx as H, jsxs as n } from "react/jsx-runtime";
import { cn as p } from "../../../lib/utils.mjs";
import { TableSortableHead as C, TableHead as D } from "../table.mjs";
import { SortableHeaderCell as S } from "./sortable-header-cell.mjs";
import { toPxString as b } from "./utils.mjs";
function k({
  column: r,
  stickyData: d,
  alignClass: h,
  needsRightBorder: c,
  resizable: l,
  resizedWidth: a,
  isResizing: f,
  onResizeStart: g,
  columnReorderable: y,
  sortDirection: m,
  sortPriority: w,
  onSort: x
}) {
  const e = {};
  r.sticky || (a !== void 0 ? (e.width = `${a}px`, e.minWidth = `${a}px`) : (r.width && (e.width = b(r.width)), r.minWidth && (e.minWidth = b(r.minWidth))));
  const i = { ...e, ...d.style }, v = c && "border-r border-slate-200 dark:border-slate-700", o = l && /* @__PURE__ */ H(
    "div",
    {
      className: p(
        "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
        f && "opacity-100"
      ),
      style: {
        right: "-4px",
        background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
      },
      onMouseDown: (t) => g(t, r),
      onPointerDown: (t) => t.stopPropagation(),
      onClick: (t) => t.stopPropagation()
    }
  ), s = p(
    h,
    d.className,
    l && "relative overflow-visible",
    v
  );
  return y && !r.sticky && !r.sortable ? /* @__PURE__ */ n(S, { id: String(r.accessorKey), style: i, className: s, children: [
    r.header,
    o
  ] }) : r.sortable ? /* @__PURE__ */ n(
    C,
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
const B = k;
export {
  B as DataTableColumnHeader
};
//# sourceMappingURL=data-table-column-header.mjs.map
