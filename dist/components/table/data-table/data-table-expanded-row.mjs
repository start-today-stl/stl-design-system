import { jsx as o } from "react/jsx-runtime";
import * as i from "react";
import { TableRow as s, TableCell as n } from "../table.mjs";
function d(e) {
  const { row: a, expandedRowRender: l, totalColumns: r, visibleWidth: t } = e;
  return /* @__PURE__ */ o(s, { className: "bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50", children: /* @__PURE__ */ o(n, { colSpan: r, className: "p-0", style: { position: "relative" }, children: /* @__PURE__ */ o(
    "div",
    {
      className: "p-4 overflow-x-auto",
      style: {
        position: "sticky",
        left: 0,
        width: t ? `${t}px` : "100%",
        maxWidth: "100%"
      },
      children: l(a)
    }
  ) }) });
}
function m(e, a) {
  return !(e.row !== a.row || e.totalColumns !== a.totalColumns || e.visibleWidth !== a.visibleWidth || e.expandedRowRender !== a.expandedRowRender);
}
const u = i.memo(
  d,
  m
);
export {
  u as DataTableExpandedRow
};
//# sourceMappingURL=data-table-expanded-row.mjs.map
