import { jsx as i, jsxs as de, Fragment as ce } from "react/jsx-runtime";
import * as pe from "react";
import { cn as k } from "../../../lib/utils.mjs";
import { TableRow as fe, TableCell as R } from "../table.mjs";
import { Checkbox as he } from "../../ui/checkbox.mjs";
import { DownIcon as me } from "../../../icons/DownIcon.mjs";
import { RightIcon as ue } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as ge } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableCell as xe } from "./data-table-cell.mjs";
import { DragHandleCell as be } from "./drag-handle-cell.mjs";
import { SortableRow as we } from "./sortable-row.mjs";
import { CHECKBOX_WIDTH as f, EXPAND_WIDTH as h, ROW_ACTIONS_WIDTH as S } from "./types.mjs";
function ye(o) {
  const {
    row: e,
    rowIndex: r,
    isSelected: n,
    canExpand: w,
    isExpanded: c,
    editingCell: a,
    editValue: y,
    ctx: C
  } = o, {
    columnsToRender: E,
    rowReorderable: D,
    selectable: z,
    expandable: N,
    showRowDelete: L,
    hasLeftStickyColumns: m,
    resizable: P,
    rowActions: u,
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
    onRowClick: l,
    rowClassName: p,
    setHoveredRowIndex: $
  } = C, oe = (g, t) => (a == null ? void 0 : a.rowId) === g && (a == null ? void 0 : a.columnKey) === t, T = (g) => /* @__PURE__ */ de(ce, { children: [
    D && /* @__PURE__ */ i(
      be,
      {
        isSelected: n,
        hasLeftStickyColumns: m,
        dragHandleProps: g
      }
    ),
    z && /* @__PURE__ */ i(
      R,
      {
        onClick: (t) => t.stopPropagation(),
        className: k(
          "!p-0",
          m && (n ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: m ? {
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
        children: /* @__PURE__ */ i("div", { className: "flex items-center justify-center h-9", children: /* @__PURE__ */ i(
          he,
          {
            checked: n,
            onCheckedChange: () => F(e.id),
            "aria-label": `행 ${e.id} 선택`
          }
        ) })
      }
    ),
    N && /* @__PURE__ */ i(
      R,
      {
        className: k(
          "p-0",
          m && (n ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
        ),
        style: m ? {
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
        children: w && /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => A(e.id),
            className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
            "aria-label": c ? "행 접기" : "행 펼치기",
            "aria-expanded": c,
            children: c ? /* @__PURE__ */ i(me, { size: 24 }) : /* @__PURE__ */ i(ue, { size: 24 })
          }
        )
      }
    ),
    L && /* @__PURE__ */ i(
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
              return (t = u == null ? void 0 : u.onRowDelete) == null ? void 0 : t.call(u, e);
            },
            className: "flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70",
            "aria-label": "행 삭제",
            children: /* @__PURE__ */ i(ge, { size: 20 })
          }
        )
      }
    ),
    E.map((t) => {
      const s = G(r, t.accessorKey);
      if (s === 0) return null;
      const re = e[t.accessorKey], ne = oe(e.id, t.accessorKey), x = s !== void 0 && s > 1, ae = x && M(r, s), H = x && _(r, s), v = B(t, !1, n, x ? H : void 0), K = (d) => typeof d == "number" ? `${d}px` : d, b = {};
      if (!t.sticky) {
        const d = P ? X(t) : void 0;
        d !== void 0 ? (b.width = `${d}px`, b.minWidth = `${d}px`) : (t.width && (b.width = K(t.width)), t.minWidth && (b.minWidth = K(t.minWidth)));
      }
      const le = { ...b, ...v.style }, se = x && r + s >= j;
      return /* @__PURE__ */ i(
        xe,
        {
          row: e,
          rowIndex: r,
          column: t,
          value: re,
          isSelected: n,
          rowSpan: s,
          hasRowSpan: x,
          groupCellHovered: ae,
          groupCellSelected: H,
          isEditing: ne,
          onStartEdit: J,
          editValue: y,
          editingCell: a,
          setEditValue: Y,
          setEditingCell: Z,
          editValueRef: ee,
          editingCellRef: te,
          completeEditing: Q,
          cancelEditing: U,
          onCellChange: ie,
          stickyData: v,
          cellStyle: le,
          alignClass: q(t.align),
          isGroupSpanToEnd: se
        },
        String(t.accessorKey)
      );
    })
  ] });
  return D ? /* @__PURE__ */ i(
    we,
    {
      id: `row-${e.id}`,
      isSelected: n,
      className: k(l && "cursor-pointer", p == null ? void 0 : p(e)),
      onClick: () => l == null ? void 0 : l(e),
      onMouseEnter: W ? () => $(r) : void 0,
      onMouseLeave: W ? () => $(null) : void 0,
      children: (g) => T(g)
    }
  ) : /* @__PURE__ */ i(
    fe,
    {
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
function Ce(o, e) {
  var w, c, a, y, C, E;
  if (o.row !== e.row || o.isSelected !== e.isSelected || o.isExpanded !== e.isExpanded || o.canExpand !== e.canExpand || o.rowIndex !== e.rowIndex) return !1;
  const r = ((w = o.editingCell) == null ? void 0 : w.rowId) === o.row.id, n = ((c = e.editingCell) == null ? void 0 : c.rowId) === e.row.id;
  return !(r !== n || r && (o.editValue !== e.editValue || ((a = o.editingCell) == null ? void 0 : a.columnKey) !== ((y = e.editingCell) == null ? void 0 : y.columnKey) || ((C = o.editingCell) == null ? void 0 : C.error) !== ((E = e.editingCell) == null ? void 0 : E.error)) || o.ctx !== e.ctx);
}
const Ke = pe.memo(
  ye,
  Ce
);
export {
  Ke as DataTableBodyRow
};
//# sourceMappingURL=data-table-body-row.mjs.map
