import { jsx as i, jsxs as pe, Fragment as fe } from "react/jsx-runtime";
import * as he from "react";
import { cn as k } from "../../../lib/utils.mjs";
import { TableRow as xe, TableCell as R } from "../table.mjs";
import { Checkbox as me } from "../../ui/checkbox.mjs";
import { DownIcon as ue } from "../../../icons/DownIcon.mjs";
import { RightIcon as ge } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as be } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableCell as we } from "./data-table-cell.mjs";
import { DragHandleCell as ye } from "./drag-handle-cell.mjs";
import { SortableRow as Ce } from "./sortable-row.mjs";
import { CHECKBOX_WIDTH as f, EXPAND_WIDTH as h, ROW_ACTIONS_WIDTH as S } from "./types.mjs";
function Ee(o) {
  const {
    row: e,
    rowIndex: r,
    isSelected: n,
    canExpand: w,
    isExpanded: c,
    editingCell: a,
    editValue: y,
    ctx: C,
    rowRef: E,
    dataIndex: z
  } = o, {
    columnsToRender: N,
    rowReorderable: D,
    selectable: L,
    expandable: P,
    showRowDelete: j,
    hasLeftStickyColumns: x,
    resizable: O,
    rowActions: m,
    rowGrouping: W,
    middleRowSet: I,
    dataLength: V,
    getCheckboxHeaderLeftOffset: G,
    getExpandHeaderLeftOffset: M,
    getRowSpan: _,
    isGroupCellHovered: B,
    isGroupCellSelected: X,
    getStickyStyles: q,
    getColumnWidth: F,
    getAlignClass: A,
    handleSelectRow: J,
    toggleRowExpanded: Q,
    startEditing: U,
    completeEditing: Y,
    cancelEditing: Z,
    setEditValue: ee,
    setEditingCell: te,
    editValueRef: ie,
    editingCellRef: oe,
    onCellChange: re,
    onRowClick: l,
    rowClassName: p,
    setHoveredRowIndex: $
  } = C, ne = (u, t) => (a == null ? void 0 : a.rowId) === u && (a == null ? void 0 : a.columnKey) === t, T = (u) => /* @__PURE__ */ pe(fe, { children: [
    D && /* @__PURE__ */ i(
      ye,
      {
        isSelected: n,
        hasLeftStickyColumns: x,
        dragHandleProps: u
      }
    ),
    L && /* @__PURE__ */ i(
      R,
      {
        onClick: (t) => t.stopPropagation(),
        className: k(
          "!p-0",
          x && (n ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: x ? {
          position: "sticky",
          left: G(),
          zIndex: 10,
          width: `${f}px`,
          minWidth: `${f}px`,
          maxWidth: `${f}px`
        } : {
          width: `${f}px`,
          minWidth: `${f}px`,
          maxWidth: `${f}px`
        },
        children: /* @__PURE__ */ i("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ i(
          me,
          {
            checked: n,
            onCheckedChange: () => J(e.id),
            "aria-label": `행 ${e.id} 선택`
          }
        ) })
      }
    ),
    P && /* @__PURE__ */ i(
      R,
      {
        className: k(
          "p-0",
          x && (n ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: x ? {
          position: "sticky",
          left: M(),
          zIndex: 10,
          width: `${h}px`,
          minWidth: `${h}px`,
          maxWidth: `${h}px`
        } : {
          width: `${h}px`,
          minWidth: `${h}px`,
          maxWidth: `${h}px`
        },
        onClick: (t) => t.stopPropagation(),
        children: w && /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => Q(e.id),
            className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
            "aria-label": c ? "행 접기" : "행 펼치기",
            "aria-expanded": c,
            children: c ? /* @__PURE__ */ i(ue, { size: 24 }) : /* @__PURE__ */ i(ge, { size: 24 })
          }
        )
      }
    ),
    j && /* @__PURE__ */ i(
      R,
      {
        className: "!p-0",
        style: {
          width: `${S}px`,
          minWidth: `${S}px`,
          maxWidth: `${S}px`
        },
        onClick: (t) => t.stopPropagation(),
        children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => {
              var t;
              return (t = m == null ? void 0 : m.onRowDelete) == null ? void 0 : t.call(m, e);
            },
            className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ i(be, { size: 20 })
          }
        )
      }
    ),
    N.map((t) => {
      const s = _(r, t.accessorKey);
      if (s === 0) return null;
      const ae = e[t.accessorKey], le = ne(e.id, t.accessorKey), g = s !== void 0 && s > 1, se = g && B(r, s), H = g && X(r, s), v = q(t, !1, n, g ? H : void 0), K = (d) => typeof d == "number" ? `${d}px` : d, b = {};
      if (!t.sticky) {
        const d = O ? F(t) : void 0;
        d !== void 0 ? (b.width = `${d}px`, b.minWidth = `${d}px`) : (t.width && (b.width = K(t.width)), t.minWidth && (b.minWidth = K(t.minWidth)));
      }
      const de = { ...b, ...v.style }, ce = g && r + s >= V;
      return /* @__PURE__ */ i(
        we,
        {
          row: e,
          rowIndex: r,
          column: t,
          value: ae,
          isSelected: n,
          rowSpan: s,
          hasRowSpan: g,
          groupCellHovered: se,
          groupCellSelected: H,
          isEditing: le,
          onStartEdit: U,
          editValue: y,
          editingCell: a,
          setEditValue: ee,
          setEditingCell: te,
          editValueRef: ie,
          editingCellRef: oe,
          completeEditing: Y,
          cancelEditing: Z,
          onCellChange: re,
          stickyData: v,
          cellStyle: de,
          alignClass: A(t.align),
          isGroupSpanToEnd: ce
        },
        String(t.accessorKey)
      );
    })
  ] });
  return D ? /* @__PURE__ */ i(
    Ce,
    {
      id: `row-${e.id}`,
      isSelected: n,
      className: k(l && "cursor-pointer", p == null ? void 0 : p(e)),
      onClick: () => l == null ? void 0 : l(e),
      onMouseEnter: W ? () => $(r) : void 0,
      onMouseLeave: W ? () => $(null) : void 0,
      children: (u) => T(u)
    }
  ) : /* @__PURE__ */ i(
    xe,
    {
      ref: E,
      "data-index": z,
      "data-state": n ? "selected" : void 0,
      className: k(
        l && "cursor-pointer",
        (I == null ? void 0 : I.has(r)) && "border-b-0",
        p == null ? void 0 : p(e)
      ),
      onClick: () => l == null ? void 0 : l(e),
      onMouseEnter: W ? () => $(r) : void 0,
      onMouseLeave: W ? () => $(null) : void 0,
      children: T()
    }
  );
}
function We(o, e) {
  var w, c, a, y, C, E;
  if (o.row !== e.row || o.isSelected !== e.isSelected || o.isExpanded !== e.isExpanded || o.canExpand !== e.canExpand || o.rowIndex !== e.rowIndex) return !1;
  const r = ((w = o.editingCell) == null ? void 0 : w.rowId) === o.row.id, n = ((c = e.editingCell) == null ? void 0 : c.rowId) === e.row.id;
  return !(r !== n || r && (o.editValue !== e.editValue || ((a = o.editingCell) == null ? void 0 : a.columnKey) !== ((y = e.editingCell) == null ? void 0 : y.columnKey) || ((C = o.editingCell) == null ? void 0 : C.error) !== ((E = e.editingCell) == null ? void 0 : E.error)) || o.ctx !== e.ctx);
}
const Ne = he.memo(
  Ee,
  We
);
export {
  Ne as DataTableBodyRow
};
//# sourceMappingURL=data-table-body-row.mjs.map
