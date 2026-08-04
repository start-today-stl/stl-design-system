import { jsxs as f, jsx as r } from "react/jsx-runtime";
import { useSortable as u } from "@dnd-kit/sortable";
import { CSS as b } from "@dnd-kit/utilities";
import { cn as y } from "../../../lib/utils.mjs";
import { DragHandleIcon as S } from "../../../icons/DragHandleIcon.mjs";
function j({
  id: e,
  disabled: t,
  className: a,
  style: o,
  children: i,
  dataColumnKey: n
}) {
  const {
    attributes: s,
    listeners: l,
    setNodeRef: c,
    transform: m,
    transition: g,
    isDragging: p
  } = u({ id: e, disabled: t }), d = {
    ...o,
    transform: b.Translate.toString(m),
    transition: g,
    opacity: p ? 0.4 : 1
  };
  return /* @__PURE__ */ f(
    "div",
    {
      ref: c,
      role: "columnheader",
      "data-column-key": n,
      style: d,
      className: y("group/drag gap-0.5", a),
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            "aria-label": "컬럼 순서 변경",
            className: "flex-shrink-0 flex items-center cursor-grab active:cursor-grabbing opacity-30 group-hover/drag:opacity-70 transition-opacity",
            ...s,
            ...l,
            children: /* @__PURE__ */ r(S, { size: 16 })
          }
        ),
        i
      ]
    }
  );
}
export {
  j as DataTableV2SortableHeaderCell
};
//# sourceMappingURL=data-table-v2-sortable-header-cell.mjs.map
