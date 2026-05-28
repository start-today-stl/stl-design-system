import { jsx as a, jsxs as R } from "react/jsx-runtime";
import * as j from "react";
import { cn as b } from "../../../lib/utils.mjs";
import { TableCell as u } from "../table.mjs";
import { WriteIcon as I } from "../../../icons/WriteIcon.mjs";
import { DefaultEditComponent as P } from "./default-edit-component.mjs";
function V(C) {
  const {
    row: l,
    column: o,
    value: n,
    rowSpan: s,
    hasRowSpan: e,
    groupCellHovered: g,
    groupCellSelected: t,
    isEditing: h,
    onStartEdit: k,
    editValue: v,
    editingCell: r,
    setEditValue: w,
    setEditingCell: S,
    editValueRef: x,
    editingCellRef: y,
    completeEditing: E,
    cancelEditing: N,
    onCellChange: T,
    stickyData: c,
    cellStyle: d,
    alignClass: p,
    isGroupSpanToEnd: D
  } = C;
  if (h && o.editable) {
    const m = o.editComponent || P;
    return /* @__PURE__ */ a(
      u,
      {
        ref: y,
        className: b(p, "p-1 overflow-hidden", c.className),
        style: d,
        onClick: (i) => i.stopPropagation(),
        rowSpan: e ? s : void 0,
        children: /* @__PURE__ */ a(
          m,
          {
            value: v,
            onChange: (i) => {
              w(i), x.current = i, r != null && r.error && S({ ...r, error: void 0 });
            },
            onComplete: () => E(o, l),
            onCancel: N,
            row: l,
            error: r == null ? void 0 : r.error
          }
        )
      }
    );
  }
  const f = o.cell ? o.cell(n, l) : String(n ?? "");
  return o.editable && T ? /* @__PURE__ */ a(
    u,
    {
      className: b(
        p,
        "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
        e && "align-middle transition-colors",
        e && t && "bg-blue-50 dark:bg-blue-900",
        e && !t && g && "bg-slate-100 dark:bg-slate-800",
        c.className
      ),
      style: d,
      onClick: (m) => {
        m.stopPropagation(), setTimeout(() => {
          k(l.id, o.accessorKey, n);
        }, 0);
      },
      rowSpan: e ? s : void 0,
      children: /* @__PURE__ */ R("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ a("span", { className: "flex-1", children: f }),
        /* @__PURE__ */ a(
          I,
          {
            size: 20,
            className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
          }
        )
      ] })
    }
  ) : /* @__PURE__ */ a(
    u,
    {
      className: b(
        p,
        "overflow-hidden break-all [overflow-wrap:break-word]",
        e && "align-middle transition-colors",
        e && !D && "border-b border-slate-200 dark:border-slate-700",
        e && t && "bg-blue-50 dark:bg-blue-900",
        e && !t && g && "bg-slate-100 dark:bg-slate-800",
        c.className
      ),
      style: d,
      rowSpan: e ? s : void 0,
      children: f
    }
  );
}
const q = j.memo(V);
export {
  q as DataTableCell
};
//# sourceMappingURL=data-table-cell.mjs.map
