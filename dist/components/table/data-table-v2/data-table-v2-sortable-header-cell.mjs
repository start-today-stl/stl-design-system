import { jsxs as u, jsx as r } from "react/jsx-runtime";
import { useSortable as b } from "@dnd-kit/sortable";
import { CSS as y } from "@dnd-kit/utilities";
import { cn as S } from "../../../lib/utils.mjs";
import { DragHandleIcon as h } from "../../../icons/DragHandleIcon.mjs";
function k({
  id: a,
  disabled: e,
  className: t,
  style: o,
  children: i,
  dataColumnKey: s,
  ariaSort: n
}) {
  const {
    attributes: l,
    listeners: c,
    setNodeRef: m,
    transform: g,
    transition: p,
    isDragging: d
  } = b({ id: a, disabled: e }), f = {
    ...o,
    transform: y.Translate.toString(g),
    transition: p,
    opacity: d ? 0.4 : 1
  };
  return /* @__PURE__ */ u(
    "div",
    {
      ref: m,
      role: "columnheader",
      "data-column-key": s,
      "aria-sort": n,
      style: f,
      className: S("group/drag gap-0.5", t),
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            "aria-label": "컬럼 순서 변경",
            className: "flex-shrink-0 flex items-center cursor-grab active:cursor-grabbing opacity-30 group-hover/drag:opacity-70 transition-opacity",
            ...l,
            ...c,
            children: /* @__PURE__ */ r(h, { size: 16 })
          }
        ),
        i
      ]
    }
  );
}
export {
  k as DataTableV2SortableHeaderCell
};
//# sourceMappingURL=data-table-v2-sortable-header-cell.mjs.map
