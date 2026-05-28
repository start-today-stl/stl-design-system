import { jsx as t, jsxs as le, Fragment as de } from "react/jsx-runtime";
import * as ce from "react";
import { cn as u } from "../../../lib/utils.mjs";
import { TableRow as pe, TableCell as W } from "../table.mjs";
import { Checkbox as he } from "../../ui/checkbox.mjs";
import { DownIcon as xe } from "../../../icons/DownIcon.mjs";
import { RightIcon as me } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as fe } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableCell as ge } from "./data-table-cell.mjs";
import { DragHandleCell as be } from "./drag-handle-cell.mjs";
import { SortableRow as ye } from "./sortable-row.mjs";
import { CHECKBOX_WIDTH as c, EXPAND_WIDTH as p, ROW_ACTIONS_WIDTH as $ } from "./types.mjs";
function ue(I) {
  const {
    row: i,
    rowIndex: o,
    dataLength: D,
    isSelected: a,
    canExpand: T,
    isExpanded: w,
    editingCell: r,
    editValue: H,
    editValueRef: z,
    editingCellRef: N,
    columnsToRender: K,
    rowReorderable: k,
    selectable: L,
    expandable: j,
    showRowDelete: O,
    hasLeftStickyColumns: h,
    resizable: P,
    rowActions: x,
    rowGrouping: b,
    middleRowSet: C,
    getCheckboxHeaderLeftOffset: G,
    getExpandHeaderLeftOffset: M,
    getRowSpan: _,
    isGroupCellHovered: B,
    isGroupCellSelected: V,
    getStickyStyles: X,
    getColumnWidth: F,
    getAlignClass: q,
    handleSelectRow: A,
    toggleRowExpanded: J,
    startEditing: Q,
    completeEditing: U,
    cancelEditing: Y,
    setEditValue: Z,
    setEditingCell: ee,
    onCellChange: te,
    onRowClick: n,
    rowClassName: d,
    setHoveredRowIndex: y
  } = I, ie = (m, e) => (r == null ? void 0 : r.rowId) === m && (r == null ? void 0 : r.columnKey) === e, E = (m) => /* @__PURE__ */ le(de, { children: [
    k && /* @__PURE__ */ t(
      be,
      {
        isSelected: a,
        hasLeftStickyColumns: h,
        dragHandleProps: m
      }
    ),
    L && /* @__PURE__ */ t(
      W,
      {
        onClick: (e) => e.stopPropagation(),
        className: u(
          "!p-0",
          h && (a ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: h ? {
          position: "sticky",
          left: G(),
          zIndex: 10,
          width: `${c}px`,
          minWidth: `${c}px`,
          maxWidth: `${c}px`
        } : {
          width: `${c}px`,
          minWidth: `${c}px`,
          maxWidth: `${c}px`
        },
        children: /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ t(
          he,
          {
            checked: a,
            onCheckedChange: () => A(i.id),
            "aria-label": `행 ${i.id} 선택`
          }
        ) })
      }
    ),
    j && /* @__PURE__ */ t(
      W,
      {
        className: u(
          "p-0",
          h && (a ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: h ? {
          position: "sticky",
          left: M(),
          zIndex: 10,
          width: `${p}px`,
          minWidth: `${p}px`,
          maxWidth: `${p}px`
        } : {
          width: `${p}px`,
          minWidth: `${p}px`,
          maxWidth: `${p}px`
        },
        onClick: (e) => e.stopPropagation(),
        children: T && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => J(i.id),
            className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
            "aria-label": w ? "행 접기" : "행 펼치기",
            "aria-expanded": w,
            children: w ? /* @__PURE__ */ t(xe, { size: 24 }) : /* @__PURE__ */ t(me, { size: 24 })
          }
        )
      }
    ),
    O && /* @__PURE__ */ t(
      W,
      {
        className: "!p-0",
        style: {
          width: `${$}px`,
          minWidth: `${$}px`,
          maxWidth: `${$}px`
        },
        onClick: (e) => e.stopPropagation(),
        children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => {
              var e;
              return (e = x == null ? void 0 : x.onRowDelete) == null ? void 0 : e.call(x, i);
            },
            className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ t(fe, { size: 20 })
          }
        )
      }
    ),
    K.map((e) => {
      const s = _(o, e.accessorKey);
      if (s === 0) return null;
      const oe = i[e.accessorKey], ae = ie(i.id, e.accessorKey), f = s !== void 0 && s > 1, ne = f && B(o, s), v = f && V(o, s), R = X(e, !1, a, f ? v : void 0), S = (l) => typeof l == "number" ? `${l}px` : l, g = {};
      if (!e.sticky) {
        const l = P ? F(e) : void 0;
        l !== void 0 ? (g.width = `${l}px`, g.minWidth = `${l}px`) : (e.width && (g.width = S(e.width)), e.minWidth && (g.minWidth = S(e.minWidth)));
      }
      const re = { ...g, ...R.style }, se = f && o + s >= D;
      return /* @__PURE__ */ t(
        ge,
        {
          row: i,
          rowIndex: o,
          column: e,
          value: oe,
          isSelected: a,
          rowSpan: s,
          hasRowSpan: f,
          groupCellHovered: ne,
          groupCellSelected: v,
          isEditing: ae,
          onStartEdit: Q,
          editValue: H,
          editingCell: r,
          setEditValue: Z,
          setEditingCell: ee,
          editValueRef: z,
          editingCellRef: N,
          completeEditing: U,
          cancelEditing: Y,
          onCellChange: te,
          stickyData: R,
          cellStyle: re,
          alignClass: q(e.align),
          isGroupSpanToEnd: se
        },
        String(e.accessorKey)
      );
    })
  ] });
  return k ? /* @__PURE__ */ t(
    ye,
    {
      id: `row-${i.id}`,
      isSelected: a,
      className: u(n && "cursor-pointer", d == null ? void 0 : d(i)),
      onClick: () => n == null ? void 0 : n(i),
      onMouseEnter: b ? () => y(o) : void 0,
      onMouseLeave: b ? () => y(null) : void 0,
      children: (m) => E(m)
    }
  ) : /* @__PURE__ */ t(
    pe,
    {
      "data-state": a ? "selected" : void 0,
      className: u(
        n && "cursor-pointer",
        (C == null ? void 0 : C.has(o)) && "border-b-0",
        d == null ? void 0 : d(i)
      ),
      onClick: () => n == null ? void 0 : n(i),
      onMouseEnter: b ? () => y(o) : void 0,
      onMouseLeave: b ? () => y(null) : void 0,
      children: E()
    }
  );
}
const Te = ce.memo(ue);
export {
  Te as DataTableBodyRow
};
//# sourceMappingURL=data-table-body-row.mjs.map
