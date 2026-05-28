import { jsx as o, jsxs as de, Fragment as ce } from "react/jsx-runtime";
import * as pe from "react";
import { cn as k } from "../../../lib/utils.mjs";
import { TableRow as fe, TableCell as R } from "../table.mjs";
import { Checkbox as he } from "../../ui/checkbox.mjs";
import { DownIcon as ge } from "../../../icons/DownIcon.mjs";
import { RightIcon as me } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as ue } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableCell as xe } from "./data-table-cell.mjs";
import { DragHandleCell as be } from "./drag-handle-cell.mjs";
import { SortableRow as we } from "./sortable-row.mjs";
import { CHECKBOX_WIDTH as f, EXPAND_WIDTH as h, ROW_ACTIONS_WIDTH as S } from "./types.mjs";
function ye(i) {
  console.log("[DT row render]", i.row.id);
  const {
    row: e,
    rowIndex: r,
    isSelected: n,
    canExpand: w,
    isExpanded: c,
    editingCell: l,
    editValue: y,
    ctx: C
  } = i, {
    columnsToRender: E,
    rowReorderable: D,
    selectable: z,
    expandable: N,
    showRowDelete: L,
    hasLeftStickyColumns: g,
    resizable: P,
    rowActions: m,
    rowGrouping: W,
    middleRowSet: I,
    dataLength: j,
    getCheckboxHeaderLeftOffset: O,
    getExpandHeaderLeftOffset: V,
    getRowSpan: G,
    isGroupCellHovered: M,
    isGroupCellSelected: _,
    getStickyStyles: B,
    getColumnWidth: X,
    getAlignClass: q,
    handleSelectRow: F,
    toggleRowExpanded: A,
    startEditing: J,
    completeEditing: Q,
    cancelEditing: U,
    setEditValue: Y,
    setEditingCell: Z,
    editValueRef: ee,
    editingCellRef: te,
    onCellChange: ie,
    onRowClick: a,
    rowClassName: p,
    setHoveredRowIndex: $
  } = C, oe = (u, t) => (l == null ? void 0 : l.rowId) === u && (l == null ? void 0 : l.columnKey) === t, T = (u) => /* @__PURE__ */ de(ce, { children: [
    D && /* @__PURE__ */ o(
      be,
      {
        isSelected: n,
        hasLeftStickyColumns: g,
        dragHandleProps: u
      }
    ),
    z && /* @__PURE__ */ o(
      R,
      {
        onClick: (t) => t.stopPropagation(),
        className: k(
          "!p-0",
          g && (n ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: g ? {
          position: "sticky",
          left: O(),
          zIndex: 10,
          width: `${f}px`,
          minWidth: `${f}px`,
          maxWidth: `${f}px`
        } : {
          width: `${f}px`,
          minWidth: `${f}px`,
          maxWidth: `${f}px`
        },
        children: /* @__PURE__ */ o("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ o(
          he,
          {
            checked: n,
            onCheckedChange: () => F(e.id),
            "aria-label": `행 ${e.id} 선택`
          }
        ) })
      }
    ),
    N && /* @__PURE__ */ o(
      R,
      {
        className: k(
          "p-0",
          g && (n ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: g ? {
          position: "sticky",
          left: V(),
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
        children: w && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: () => A(e.id),
            className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
            "aria-label": c ? "행 접기" : "행 펼치기",
            "aria-expanded": c,
            children: c ? /* @__PURE__ */ o(ge, { size: 24 }) : /* @__PURE__ */ o(me, { size: 24 })
          }
        )
      }
    ),
    L && /* @__PURE__ */ o(
      R,
      {
        className: "!p-0",
        style: {
          width: `${S}px`,
          minWidth: `${S}px`,
          maxWidth: `${S}px`
        },
        onClick: (t) => t.stopPropagation(),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: () => {
              var t;
              return (t = m == null ? void 0 : m.onRowDelete) == null ? void 0 : t.call(m, e);
            },
            className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ o(ue, { size: 20 })
          }
        )
      }
    ),
    E.map((t) => {
      const s = G(r, t.accessorKey);
      if (s === 0) return null;
      const re = e[t.accessorKey], ne = oe(e.id, t.accessorKey), x = s !== void 0 && s > 1, le = x && M(r, s), H = x && _(r, s), v = B(t, !1, n, x ? H : void 0), K = (d) => typeof d == "number" ? `${d}px` : d, b = {};
      if (!t.sticky) {
        const d = P ? X(t) : void 0;
        d !== void 0 ? (b.width = `${d}px`, b.minWidth = `${d}px`) : (t.width && (b.width = K(t.width)), t.minWidth && (b.minWidth = K(t.minWidth)));
      }
      const ae = { ...b, ...v.style }, se = x && r + s >= j;
      return /* @__PURE__ */ o(
        xe,
        {
          row: e,
          rowIndex: r,
          column: t,
          value: re,
          isSelected: n,
          rowSpan: s,
          hasRowSpan: x,
          groupCellHovered: le,
          groupCellSelected: H,
          isEditing: ne,
          onStartEdit: J,
          editValue: y,
          editingCell: l,
          setEditValue: Y,
          setEditingCell: Z,
          editValueRef: ee,
          editingCellRef: te,
          completeEditing: Q,
          cancelEditing: U,
          onCellChange: ie,
          stickyData: v,
          cellStyle: ae,
          alignClass: q(t.align),
          isGroupSpanToEnd: se
        },
        String(t.accessorKey)
      );
    })
  ] });
  return D ? /* @__PURE__ */ o(
    we,
    {
      id: `row-${e.id}`,
      isSelected: n,
      className: k(a && "cursor-pointer", p == null ? void 0 : p(e)),
      onClick: () => a == null ? void 0 : a(e),
      onMouseEnter: W ? () => $(r) : void 0,
      onMouseLeave: W ? () => $(null) : void 0,
      children: (u) => T(u)
    }
  ) : /* @__PURE__ */ o(
    fe,
    {
      "data-state": n ? "selected" : void 0,
      className: k(
        a && "cursor-pointer",
        (I == null ? void 0 : I.has(r)) && "border-b-0",
        p == null ? void 0 : p(e)
      ),
      onClick: () => a == null ? void 0 : a(e),
      onMouseEnter: W ? () => $(r) : void 0,
      onMouseLeave: W ? () => $(null) : void 0,
      children: T()
    }
  );
}
function Ce(i, e) {
  var w, c, l, y, C, E;
  if (i.row !== e.row || i.isSelected !== e.isSelected || i.isExpanded !== e.isExpanded || i.canExpand !== e.canExpand || i.rowIndex !== e.rowIndex) return !1;
  const r = ((w = i.editingCell) == null ? void 0 : w.rowId) === i.row.id, n = ((c = e.editingCell) == null ? void 0 : c.rowId) === e.row.id;
  return !(r !== n || r && (i.editValue !== e.editValue || ((l = i.editingCell) == null ? void 0 : l.columnKey) !== ((y = e.editingCell) == null ? void 0 : y.columnKey) || ((C = i.editingCell) == null ? void 0 : C.error) !== ((E = e.editingCell) == null ? void 0 : E.error)) || i.ctx !== e.ctx);
}
const Ke = pe.memo(
  ye,
  Ce
);
export {
  Ke as DataTableBodyRow
};
//# sourceMappingURL=data-table-body-row.mjs.map
