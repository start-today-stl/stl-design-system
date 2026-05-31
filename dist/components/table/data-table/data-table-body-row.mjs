import { jsx as o, jsxs as pe, Fragment as ue } from "react/jsx-runtime";
import * as _ from "react";
import { cn as K } from "../../../lib/utils.mjs";
import { TableRow as ge, TableCell as z } from "../table.mjs";
import { Checkbox as xe } from "../../ui/checkbox.mjs";
import { DownIcon as me } from "../../../icons/DownIcon.mjs";
import { RightIcon as ye } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as be } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableCell as we } from "./data-table-cell.mjs";
import { DragHandleCell as Ce } from "./drag-handle-cell.mjs";
import { SortableRow as Ee } from "./sortable-row.mjs";
import { CHECKBOX_WIDTH as u, EXPAND_WIDTH as g, ROW_ACTIONS_WIDTH as N } from "./types.mjs";
function ke(i) {
  const {
    row: t,
    rowIndex: n,
    isSelected: s,
    canExpand: h,
    isExpanded: d,
    editingCell: r,
    editValue: C,
    ctx: E,
    rowRef: k,
    dataIndex: S,
    groupCellFlags: l
  } = i, {
    columnsToRender: W,
    rowReorderable: x,
    selectable: T,
    expandable: D,
    showRowDelete: $,
    hasLeftStickyColumns: a,
    resizable: A,
    onRowDelete: v,
    rowGrouping: I,
    middleRowSet: H,
    dataLength: B,
    getCheckboxHeaderLeftOffset: G,
    getExpandHeaderLeftOffset: X,
    getRowSpan: q,
    getStickyStyles: F,
    getColumnWidth: J,
    getAlignClass: Q,
    handleSelectRow: U,
    toggleRowExpanded: Y,
    startEditing: Z,
    completeEditing: ee,
    cancelEditing: te,
    setEditValue: ie,
    setEditingCell: oe,
    editValueRef: ne,
    editingCellRef: se,
    onCellChange: re,
    onRowClick: c,
    rowClassName: p,
    setHoveredRowIndex: R
  } = E, ae = (m, e) => (r == null ? void 0 : r.rowId) === m && (r == null ? void 0 : r.columnKey) === e, j = _.useRef(!1), O = (m) => /* @__PURE__ */ pe(ue, { children: [
    x && /* @__PURE__ */ o(
      Ce,
      {
        isSelected: s,
        hasLeftStickyColumns: a,
        dragHandleProps: m
      }
    ),
    T && /* @__PURE__ */ o(
      z,
      {
        onClick: (e) => e.stopPropagation(),
        className: K(
          "!p-0",
          a && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: a ? {
          position: "sticky",
          left: G(),
          zIndex: 10,
          width: `${u}px`,
          minWidth: `${u}px`,
          maxWidth: `${u}px`
        } : {
          width: `${u}px`,
          minWidth: `${u}px`,
          maxWidth: `${u}px`
        },
        children: /* @__PURE__ */ o("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ o(
          xe,
          {
            checked: s,
            onClick: (e) => {
              j.current = e.shiftKey;
            },
            onCheckedChange: () => {
              const e = j.current;
              j.current = !1, U(t.id, n, e);
            },
            "aria-label": `행 ${t.id} 선택`
          }
        ) })
      }
    ),
    D && /* @__PURE__ */ o(
      z,
      {
        className: K(
          "p-0",
          a && (s ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: a ? {
          position: "sticky",
          left: X(),
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
        children: h && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: () => Y(t.id),
            className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
            "aria-label": d ? "행 접기" : "행 펼치기",
            "aria-expanded": d,
            children: d ? /* @__PURE__ */ o(me, { size: 24 }) : /* @__PURE__ */ o(ye, { size: 24 })
          }
        )
      }
    ),
    $ && /* @__PURE__ */ o(
      z,
      {
        className: "!p-0",
        style: {
          width: `${N}px`,
          minWidth: `${N}px`,
          maxWidth: `${N}px`
        },
        onClick: (e) => e.stopPropagation(),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: () => v == null ? void 0 : v(t),
            className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ o(be, { size: 20 })
          }
        )
      }
    ),
    W.map((e) => {
      const y = q(n, e.accessorKey);
      if (y === 0) return null;
      const le = t[e.accessorKey], de = ae(t.id, e.accessorKey), b = y !== void 0 && y > 1, L = String(e.accessorKey), ce = b && ((l == null ? void 0 : l.hovered[L]) ?? !1), P = b && ((l == null ? void 0 : l.selected[L]) ?? !1), V = F(e, !1, s, b ? P : void 0), M = (f) => typeof f == "number" ? `${f}px` : f, w = {};
      if (!e.sticky) {
        const f = A ? J(e) : void 0;
        f !== void 0 ? (w.width = `${f}px`, w.minWidth = `${f}px`) : (e.width && (w.width = M(e.width)), e.minWidth && (w.minWidth = M(e.minWidth)));
      }
      const fe = { ...w, ...V.style }, he = b && n + y >= B;
      return /* @__PURE__ */ o(
        we,
        {
          row: t,
          rowIndex: n,
          column: e,
          value: le,
          isSelected: s,
          rowSpan: y,
          hasRowSpan: b,
          groupCellHovered: ce,
          groupCellSelected: P,
          isEditing: de,
          onStartEdit: Z,
          editValue: C,
          editingCell: r,
          setEditValue: ie,
          setEditingCell: oe,
          editValueRef: ne,
          editingCellRef: se,
          completeEditing: ee,
          cancelEditing: te,
          onCellChange: re,
          stickyData: V,
          cellStyle: fe,
          alignClass: Q(e.align),
          isGroupSpanToEnd: he
        },
        String(e.accessorKey)
      );
    })
  ] });
  return x ? /* @__PURE__ */ o(
    Ee,
    {
      id: `row-${t.id}`,
      isSelected: s,
      className: K(c && "cursor-pointer", p == null ? void 0 : p(t)),
      onClick: () => c == null ? void 0 : c(t),
      onMouseEnter: I ? () => R(n) : void 0,
      onMouseLeave: I ? () => R(null) : void 0,
      children: (m) => O(m)
    }
  ) : /* @__PURE__ */ o(
    ge,
    {
      ref: k,
      "data-index": S,
      "data-state": s ? "selected" : void 0,
      className: K(
        c && "cursor-pointer",
        (H == null ? void 0 : H.has(n)) && "border-b-0",
        p == null ? void 0 : p(t)
      ),
      onClick: () => c == null ? void 0 : c(t),
      onMouseEnter: I ? () => R(n) : void 0,
      onMouseLeave: I ? () => R(null) : void 0,
      children: O()
    }
  );
}
function Se(i, t) {
  var r, C, E, k, S, l;
  if (i.row !== t.row || i.isSelected !== t.isSelected || i.isExpanded !== t.isExpanded || i.canExpand !== t.canExpand || i.rowIndex !== t.rowIndex) return !1;
  const n = ((r = i.editingCell) == null ? void 0 : r.rowId) === i.row.id, s = ((C = t.editingCell) == null ? void 0 : C.rowId) === t.row.id;
  if (n !== s || n && (i.editValue !== t.editValue || ((E = i.editingCell) == null ? void 0 : E.columnKey) !== ((k = t.editingCell) == null ? void 0 : k.columnKey) || ((S = i.editingCell) == null ? void 0 : S.error) !== ((l = t.editingCell) == null ? void 0 : l.error)) || i.ctx !== t.ctx) return !1;
  const h = i.groupCellFlags, d = t.groupCellFlags;
  if (h !== d) {
    if (!h || !d) return !1;
    const W = h.selected, x = d.selected, T = h.hovered, D = d.hovered, $ = Object.keys(W);
    if ($.length !== Object.keys(x).length) return !1;
    for (const a of $)
      if (W[a] !== x[a] || T[a] !== D[a]) return !1;
  }
  return !0;
}
const Ne = _.memo(
  ke,
  Se
);
export {
  Ne as DataTableBodyRow
};
//# sourceMappingURL=data-table-body-row.mjs.map
