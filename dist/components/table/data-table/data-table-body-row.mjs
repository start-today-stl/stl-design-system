import { jsx as o, jsxs as fe, Fragment as pe } from "react/jsx-runtime";
import * as he from "react";
import { cn as T } from "../../../lib/utils.mjs";
import { TableRow as ge, TableCell as j } from "../table.mjs";
import { Checkbox as xe } from "../../ui/checkbox.mjs";
import { DownIcon as me } from "../../../icons/DownIcon.mjs";
import { RightIcon as ue } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as be } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableCell as ye } from "./data-table-cell.mjs";
import { DragHandleCell as we } from "./drag-handle-cell.mjs";
import { SortableRow as Ce } from "./sortable-row.mjs";
import { CHECKBOX_WIDTH as g, EXPAND_WIDTH as x, ROW_ACTIONS_WIDTH as z } from "./types.mjs";
function Ee(i) {
  const {
    row: e,
    rowIndex: a,
    isSelected: n,
    canExpand: p,
    isExpanded: d,
    editingCell: s,
    editValue: C,
    ctx: E,
    rowRef: k,
    dataIndex: W,
    groupCellFlags: l
  } = i, {
    columnsToRender: $,
    rowReorderable: m,
    selectable: D,
    expandable: K,
    showRowDelete: I,
    hasLeftStickyColumns: r,
    resizable: M,
    onRowDelete: v,
    rowGrouping: S,
    middleRowSet: H,
    dataLength: _,
    getCheckboxHeaderLeftOffset: A,
    getExpandHeaderLeftOffset: B,
    getRowSpan: G,
    getStickyStyles: X,
    getColumnWidth: q,
    getAlignClass: F,
    handleSelectRow: J,
    toggleRowExpanded: Q,
    startEditing: U,
    completeEditing: Y,
    cancelEditing: Z,
    setEditValue: ee,
    setEditingCell: te,
    editValueRef: ie,
    editingCellRef: oe,
    onCellChange: ne,
    onRowClick: c,
    rowClassName: h,
    setHoveredRowIndex: R
  } = E, se = (u, t) => (s == null ? void 0 : s.rowId) === u && (s == null ? void 0 : s.columnKey) === t, N = (u) => /* @__PURE__ */ fe(pe, { children: [
    m && /* @__PURE__ */ o(
      we,
      {
        isSelected: n,
        hasLeftStickyColumns: r,
        dragHandleProps: u
      }
    ),
    D && /* @__PURE__ */ o(
      j,
      {
        onClick: (t) => t.stopPropagation(),
        className: T(
          "!p-0",
          r && (n ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: r ? {
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
        children: /* @__PURE__ */ o("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ o(
          xe,
          {
            checked: n,
            onCheckedChange: () => J(e.id),
            "aria-label": `행 ${e.id} 선택`
          }
        ) })
      }
    ),
    K && /* @__PURE__ */ o(
      j,
      {
        className: T(
          "p-0",
          r && (n ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: r ? {
          position: "sticky",
          left: B(),
          zIndex: 10,
          width: `${x}px`,
          minWidth: `${x}px`,
          maxWidth: `${x}px`
        } : {
          width: `${x}px`,
          minWidth: `${x}px`,
          maxWidth: `${x}px`
        },
        onClick: (t) => t.stopPropagation(),
        children: p && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: () => Q(e.id),
            className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
            "aria-label": d ? "행 접기" : "행 펼치기",
            "aria-expanded": d,
            children: d ? /* @__PURE__ */ o(me, { size: 24 }) : /* @__PURE__ */ o(ue, { size: 24 })
          }
        )
      }
    ),
    I && /* @__PURE__ */ o(
      j,
      {
        className: "!p-0",
        style: {
          width: `${z}px`,
          minWidth: `${z}px`,
          maxWidth: `${z}px`
        },
        onClick: (t) => t.stopPropagation(),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: () => v == null ? void 0 : v(e),
            className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ o(be, { size: 20 })
          }
        )
      }
    ),
    $.map((t) => {
      const b = G(a, t.accessorKey);
      if (b === 0) return null;
      const re = e[t.accessorKey], ae = se(e.id, t.accessorKey), y = b !== void 0 && b > 1, O = String(t.accessorKey), le = y && ((l == null ? void 0 : l.hovered[O]) ?? !1), L = y && ((l == null ? void 0 : l.selected[O]) ?? !1), P = X(t, !1, n, y ? L : void 0), V = (f) => typeof f == "number" ? `${f}px` : f, w = {};
      if (!t.sticky) {
        const f = M ? q(t) : void 0;
        f !== void 0 ? (w.width = `${f}px`, w.minWidth = `${f}px`) : (t.width && (w.width = V(t.width)), t.minWidth && (w.minWidth = V(t.minWidth)));
      }
      const de = { ...w, ...P.style }, ce = y && a + b >= _;
      return /* @__PURE__ */ o(
        ye,
        {
          row: e,
          rowIndex: a,
          column: t,
          value: re,
          isSelected: n,
          rowSpan: b,
          hasRowSpan: y,
          groupCellHovered: le,
          groupCellSelected: L,
          isEditing: ae,
          onStartEdit: U,
          editValue: C,
          editingCell: s,
          setEditValue: ee,
          setEditingCell: te,
          editValueRef: ie,
          editingCellRef: oe,
          completeEditing: Y,
          cancelEditing: Z,
          onCellChange: ne,
          stickyData: P,
          cellStyle: de,
          alignClass: F(t.align),
          isGroupSpanToEnd: ce
        },
        String(t.accessorKey)
      );
    })
  ] });
  return m ? /* @__PURE__ */ o(
    Ce,
    {
      id: `row-${e.id}`,
      isSelected: n,
      className: T(c && "cursor-pointer", h == null ? void 0 : h(e)),
      onClick: () => c == null ? void 0 : c(e),
      onMouseEnter: S ? () => R(a) : void 0,
      onMouseLeave: S ? () => R(null) : void 0,
      children: (u) => N(u)
    }
  ) : /* @__PURE__ */ o(
    ge,
    {
      ref: k,
      "data-index": W,
      "data-state": n ? "selected" : void 0,
      className: T(
        c && "cursor-pointer",
        (H == null ? void 0 : H.has(a)) && "border-b-0",
        h == null ? void 0 : h(e)
      ),
      onClick: () => c == null ? void 0 : c(e),
      onMouseEnter: S ? () => R(a) : void 0,
      onMouseLeave: S ? () => R(null) : void 0,
      children: N()
    }
  );
}
function ke(i, e) {
  var s, C, E, k, W, l;
  if (i.row !== e.row || i.isSelected !== e.isSelected || i.isExpanded !== e.isExpanded || i.canExpand !== e.canExpand || i.rowIndex !== e.rowIndex) return !1;
  const a = ((s = i.editingCell) == null ? void 0 : s.rowId) === i.row.id, n = ((C = e.editingCell) == null ? void 0 : C.rowId) === e.row.id;
  if (a !== n || a && (i.editValue !== e.editValue || ((E = i.editingCell) == null ? void 0 : E.columnKey) !== ((k = e.editingCell) == null ? void 0 : k.columnKey) || ((W = i.editingCell) == null ? void 0 : W.error) !== ((l = e.editingCell) == null ? void 0 : l.error)) || i.ctx !== e.ctx) return !1;
  const p = i.groupCellFlags, d = e.groupCellFlags;
  if (p !== d) {
    if (!p || !d) return !1;
    const $ = p.selected, m = d.selected, D = p.hovered, K = d.hovered, I = Object.keys($);
    if (I.length !== Object.keys(m).length) return !1;
    for (const r of I)
      if ($[r] !== m[r] || D[r] !== K[r]) return !1;
  }
  return !0;
}
const ze = he.memo(
  Ee,
  ke
);
export {
  ze as DataTableBodyRow
};
//# sourceMappingURL=data-table-body-row.mjs.map
