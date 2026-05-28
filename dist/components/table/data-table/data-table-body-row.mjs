import { jsx as t, jsxs as z, Fragment as pe } from "react/jsx-runtime";
import * as he from "react";
import { cn as c } from "../../../lib/utils.mjs";
import { TableRow as be, TableCell as h } from "../table.mjs";
import { Checkbox as ge } from "../../ui/checkbox.mjs";
import { DownIcon as me } from "../../../icons/DownIcon.mjs";
import { RightIcon as xe } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as fe } from "../../../icons/RowDeleteIcon.mjs";
import { WriteIcon as ye } from "../../../icons/WriteIcon.mjs";
import { DefaultEditComponent as ue } from "./default-edit-component.mjs";
import { DragHandleCell as ke } from "./drag-handle-cell.mjs";
import { SortableRow as we } from "./sortable-row.mjs";
import { CHECKBOX_WIDTH as b, EXPAND_WIDTH as g, ROW_ACTIONS_WIDTH as R } from "./types.mjs";
function ve(P) {
  const {
    row: o,
    rowIndex: l,
    dataLength: L,
    isSelected: d,
    canExpand: j,
    isExpanded: S,
    editingCell: r,
    editValue: O,
    editValueRef: G,
    editingCellRef: M,
    columnsToRender: _,
    rowReorderable: I,
    selectable: B,
    expandable: V,
    showRowDelete: X,
    hasLeftStickyColumns: m,
    resizable: F,
    rowActions: x,
    rowGrouping: k,
    middleRowSet: W,
    getCheckboxHeaderLeftOffset: q,
    getExpandHeaderLeftOffset: A,
    getRowSpan: J,
    isGroupCellHovered: Q,
    isGroupCellSelected: U,
    getStickyStyles: Y,
    getColumnWidth: Z,
    getAlignClass: $,
    handleSelectRow: ee,
    toggleRowExpanded: te,
    startEditing: oe,
    completeEditing: ie,
    cancelEditing: re,
    setEditValue: ae,
    setEditingCell: se,
    onCellChange: ne,
    onRowClick: n,
    rowClassName: p,
    setHoveredRowIndex: w
  } = P, le = (f, e) => (r == null ? void 0 : r.rowId) === f && (r == null ? void 0 : r.columnKey) === e, D = (f) => /* @__PURE__ */ z(pe, { children: [
    I && /* @__PURE__ */ t(
      ke,
      {
        isSelected: d,
        hasLeftStickyColumns: m,
        dragHandleProps: f
      }
    ),
    B && /* @__PURE__ */ t(
      h,
      {
        onClick: (e) => e.stopPropagation(),
        className: c(
          "!p-0",
          m && (d ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: m ? {
          position: "sticky",
          left: q(),
          zIndex: 10,
          width: `${b}px`,
          minWidth: `${b}px`,
          maxWidth: `${b}px`
        } : {
          width: `${b}px`,
          minWidth: `${b}px`,
          maxWidth: `${b}px`
        },
        children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
          ge,
          {
            checked: d,
            onCheckedChange: () => ee(o.id),
            "aria-label": `행 ${o.id} 선택`
          }
        ) })
      }
    ),
    V && /* @__PURE__ */ t(
      h,
      {
        className: c(
          "p-0",
          m && (d ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: m ? {
          position: "sticky",
          left: A(),
          zIndex: 10,
          width: `${g}px`,
          minWidth: `${g}px`,
          maxWidth: `${g}px`
        } : {
          width: `${g}px`,
          minWidth: `${g}px`,
          maxWidth: `${g}px`
        },
        onClick: (e) => e.stopPropagation(),
        children: j && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => te(o.id),
            className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
            "aria-label": S ? "행 접기" : "행 펼치기",
            "aria-expanded": S,
            children: S ? /* @__PURE__ */ t(me, { size: 24 }) : /* @__PURE__ */ t(xe, { size: 24 })
          }
        )
      }
    ),
    X && /* @__PURE__ */ t(
      h,
      {
        className: "!p-0",
        style: {
          width: `${R}px`,
          minWidth: `${R}px`,
          maxWidth: `${R}px`
        },
        onClick: (e) => e.stopPropagation(),
        children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => {
              var e;
              return (e = x == null ? void 0 : x.onRowDelete) == null ? void 0 : e.call(x, o);
            },
            className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t(fe, { size: 20 })
          }
        )
      }
    ),
    _.map((e) => {
      const s = J(l, e.accessorKey);
      if (s === 0) return null;
      const E = o[e.accessorKey], de = le(o.id, e.accessorKey), i = s !== void 0 && s > 1, T = i && Q(l, s), y = i && U(l, s), v = Y(e, !1, d, i ? y : void 0), H = (a) => typeof a == "number" ? `${a}px` : a, u = {};
      if (!e.sticky) {
        const a = F ? Z(e) : void 0;
        a !== void 0 ? (u.width = `${a}px`, u.minWidth = `${a}px`) : (e.width && (u.width = H(e.width)), e.minWidth && (u.minWidth = H(e.minWidth)));
      }
      const N = { ...u, ...v.style };
      if (de && e.editable) {
        const a = e.editComponent || ue;
        return /* @__PURE__ */ t(
          h,
          {
            ref: M,
            className: c($(e.align), "p-1 overflow-hidden", v.className),
            style: N,
            onClick: (C) => C.stopPropagation(),
            rowSpan: i ? s : void 0,
            children: /* @__PURE__ */ t(
              a,
              {
                value: O,
                onChange: (C) => {
                  ae(C), G.current = C, r != null && r.error && se({ ...r, error: void 0 });
                },
                onComplete: () => ie(e, o),
                onCancel: re,
                row: o,
                error: r == null ? void 0 : r.error
              }
            )
          },
          String(e.accessorKey)
        );
      }
      const K = e.cell ? e.cell(E, o) : String(E ?? "");
      if (e.editable && ne)
        return /* @__PURE__ */ t(
          h,
          {
            className: c(
              $(e.align),
              "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
              i && "align-middle transition-colors",
              i && y && "bg-blue-50 dark:bg-blue-900",
              i && !y && T && "bg-slate-100 dark:bg-slate-800",
              v.className
            ),
            style: N,
            onClick: (a) => {
              a.stopPropagation(), setTimeout(() => {
                oe(o.id, e.accessorKey, E);
              }, 0);
            },
            rowSpan: i ? s : void 0,
            children: /* @__PURE__ */ z("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ t("span", { className: "flex-1", children: K }),
              /* @__PURE__ */ t(
                ye,
                {
                  size: 20,
                  className: "flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                }
              )
            ] })
          },
          String(e.accessorKey)
        );
      const ce = i && l + s >= L;
      return /* @__PURE__ */ t(
        h,
        {
          className: c(
            $(e.align),
            "overflow-hidden break-all [overflow-wrap:break-word]",
            i && "align-middle transition-colors",
            i && !ce && "border-b border-slate-200 dark:border-slate-700",
            i && y && "bg-blue-50 dark:bg-blue-900",
            i && !y && T && "bg-slate-100 dark:bg-slate-800",
            v.className
          ),
          style: N,
          rowSpan: i ? s : void 0,
          children: K
        },
        String(e.accessorKey)
      );
    })
  ] });
  return I ? /* @__PURE__ */ t(
    we,
    {
      id: `row-${o.id}`,
      isSelected: d,
      className: c(n && "cursor-pointer", p == null ? void 0 : p(o)),
      onClick: () => n == null ? void 0 : n(o),
      onMouseEnter: k ? () => w(l) : void 0,
      onMouseLeave: k ? () => w(null) : void 0,
      children: (f) => D(f)
    }
  ) : /* @__PURE__ */ t(
    be,
    {
      "data-state": d ? "selected" : void 0,
      className: c(
        n && "cursor-pointer",
        (W == null ? void 0 : W.has(l)) && "border-b-0",
        p == null ? void 0 : p(o)
      ),
      onClick: () => n == null ? void 0 : n(o),
      onMouseEnter: k ? () => w(l) : void 0,
      onMouseLeave: k ? () => w(null) : void 0,
      children: D()
    }
  );
}
const ze = he.memo(ve);
export {
  ze as DataTableBodyRow
};
//# sourceMappingURL=data-table-body-row.mjs.map
