import { jsx as o, jsxs as he, Fragment as ue } from "react/jsx-runtime";
import * as _ from "react";
import { cn as K } from "../../../lib/utils.mjs";
import { TableRow as me, TableCell as z } from "../table.mjs";
import { Checkbox as ge } from "../../ui/checkbox.mjs";
import { DownIcon as xe } from "../../../icons/DownIcon.mjs";
import { RightIcon as ye } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as be } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableCell as we } from "./data-table-cell.mjs";
import { DragHandleCell as Ce } from "./drag-handle-cell.mjs";
import { SortableRow as Ee } from "./sortable-row.mjs";
import { getColumnKey as ke } from "./utils.mjs";
import { CHECKBOX_WIDTH as u, EXPAND_WIDTH as m, ROW_ACTIONS_WIDTH as N } from "./types.mjs";
function We(i) {
  const {
    row: t,
    rowIndex: n,
    isSelected: s,
    canExpand: p,
    isExpanded: d,
    editingCell: r,
    editValue: C,
    ctx: E,
    rowRef: k,
    dataIndex: W,
    groupCellFlags: l
  } = i, {
    columnsToRender: $,
    rowReorderable: g,
    selectable: T,
    expandable: D,
    showRowDelete: I,
    hasLeftStickyColumns: a,
    resizable: A,
    onRowDelete: v,
    rowGrouping: R,
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
    rowClassName: h,
    setHoveredRowIndex: S
  } = E, ae = (x, e) => (r == null ? void 0 : r.rowId) === x && (r == null ? void 0 : r.columnKey) === e, j = _.useRef(!1), O = (x) => /* @__PURE__ */ he(ue, { children: [
    g && /* @__PURE__ */ o(
      Ce,
      {
        isSelected: s,
        hasLeftStickyColumns: a,
        dragHandleProps: x
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
          ge,
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
          width: `${m}px`,
          minWidth: `${m}px`,
          maxWidth: `${m}px`
        } : {
          width: `${m}px`,
          minWidth: `${m}px`,
          maxWidth: `${m}px`
        },
        onClick: (e) => e.stopPropagation(),
        children: p && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: () => Y(t.id),
            className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
            "aria-label": d ? "행 접기" : "행 펼치기",
            "aria-expanded": d,
            children: d ? /* @__PURE__ */ o(xe, { size: 24 }) : /* @__PURE__ */ o(ye, { size: 24 })
          }
        )
      }
    ),
    I && /* @__PURE__ */ o(
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
    $.map((e) => {
      const y = q(n, e.accessorKey);
      if (y === 0) return null;
      const le = t[e.accessorKey], de = ae(t.id, e.accessorKey), b = y !== void 0 && y > 1, L = String(e.accessorKey), ce = b && ((l == null ? void 0 : l.hovered[L]) ?? !1), P = b && ((l == null ? void 0 : l.selected[L]) ?? !1), V = F(e, !1, s, b ? P : void 0), M = (f) => typeof f == "number" ? `${f}px` : f, w = {};
      if (!e.sticky) {
        const f = A ? J(e) : void 0;
        f !== void 0 ? (w.width = `${f}px`, w.minWidth = `${f}px`) : (e.width && (w.width = M(e.width)), e.minWidth && (w.minWidth = M(e.minWidth)));
      }
      const fe = { ...w, ...V.style }, pe = b && n + y >= B;
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
          isGroupSpanToEnd: pe
        },
        ke(e)
      );
    })
  ] });
  return g ? /* @__PURE__ */ o(
    Ee,
    {
      id: `row-${t.id}`,
      isSelected: s,
      className: K(c && "cursor-pointer", h == null ? void 0 : h(t)),
      onClick: () => c == null ? void 0 : c(t),
      onMouseEnter: R ? () => S(n) : void 0,
      onMouseLeave: R ? () => S(null) : void 0,
      children: (x) => O(x)
    }
  ) : /* @__PURE__ */ o(
    me,
    {
      ref: k,
      "data-index": W,
      "data-state": s ? "selected" : void 0,
      className: K(
        c && "cursor-pointer",
        (H == null ? void 0 : H.has(n)) && "border-b-0",
        h == null ? void 0 : h(t)
      ),
      onClick: () => c == null ? void 0 : c(t),
      onMouseEnter: R ? () => S(n) : void 0,
      onMouseLeave: R ? () => S(null) : void 0,
      children: O()
    }
  );
}
function $e(i, t) {
  var r, C, E, k, W, l;
  if (i.row !== t.row || i.isSelected !== t.isSelected || i.isExpanded !== t.isExpanded || i.canExpand !== t.canExpand || i.rowIndex !== t.rowIndex) return !1;
  const n = ((r = i.editingCell) == null ? void 0 : r.rowId) === i.row.id, s = ((C = t.editingCell) == null ? void 0 : C.rowId) === t.row.id;
  if (n !== s || n && (i.editValue !== t.editValue || ((E = i.editingCell) == null ? void 0 : E.columnKey) !== ((k = t.editingCell) == null ? void 0 : k.columnKey) || ((W = i.editingCell) == null ? void 0 : W.error) !== ((l = t.editingCell) == null ? void 0 : l.error)) || i.ctx !== t.ctx) return !1;
  const p = i.groupCellFlags, d = t.groupCellFlags;
  if (p !== d) {
    if (!p || !d) return !1;
    const $ = p.selected, g = d.selected, T = p.hovered, D = d.hovered, I = Object.keys($);
    if (I.length !== Object.keys(g).length) return !1;
    for (const a of I)
      if ($[a] !== g[a] || T[a] !== D[a]) return !1;
  }
  return !0;
}
const Le = _.memo(
  We,
  $e
);
export {
  Le as DataTableBodyRow
};
//# sourceMappingURL=data-table-body-row.mjs.map
