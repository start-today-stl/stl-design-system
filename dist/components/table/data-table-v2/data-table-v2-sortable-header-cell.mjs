import { jsxs as f, jsx as r } from "react/jsx-runtime";
import { useSortable as d } from "@dnd-kit/sortable";
import { CSS as b } from "@dnd-kit/utilities";
import { cn as u } from "../../../lib/utils.mjs";
import { DragHandleIcon as y } from "../../../icons/DragHandleIcon.mjs";
function N({
  id: e,
  disabled: t,
  className: o,
  style: a,
  children: i
}) {
  const {
    attributes: s,
    listeners: n,
    setNodeRef: l,
    transform: c,
    transition: m,
    isDragging: g
  } = d({ id: e, disabled: t }), p = {
    ...a,
    transform: b.Translate.toString(c),
    transition: m,
    opacity: g ? 0.4 : 1
  };
  return /* @__PURE__ */ f(
    "div",
    {
      ref: l,
      role: "columnheader",
      style: p,
      className: u("group/drag gap-0.5", o),
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            "aria-label": "컬럼 순서 변경",
            className: "flex-shrink-0 flex items-center cursor-grab active:cursor-grabbing opacity-30 group-hover/drag:opacity-70 transition-opacity",
            ...s,
            ...n,
            children: /* @__PURE__ */ r(y, { size: 16 })
          }
        ),
        i
      ]
    }
  );
}
export {
  N as DataTableV2SortableHeaderCell
};
//# sourceMappingURL=data-table-v2-sortable-header-cell.mjs.map
