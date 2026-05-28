import { jsx as e, jsxs as f } from "react/jsx-runtime";
import { useSortable as d } from "@dnd-kit/sortable";
import { CSS as h } from "@dnd-kit/utilities";
import { cn as x } from "../../../lib/utils.mjs";
import { DragHandleIcon as b } from "../../../icons/DragHandleIcon.mjs";
function N({
  id: o,
  children: a,
  className: s,
  style: i,
  disabled: r
}) {
  const {
    attributes: n,
    listeners: l,
    setNodeRef: m,
    transform: c,
    transition: p,
    isDragging: t
  } = d({ id: o, disabled: r }), g = {
    ...i,
    transform: h.Transform.toString(c),
    transition: p,
    opacity: t ? 0.5 : 1,
    cursor: r ? void 0 : "grab"
  };
  return /* @__PURE__ */ e(
    "th",
    {
      ref: m,
      style: g,
      className: x(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-600 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        t && "z-50",
        s
      ),
      ...n,
      ...l,
      children: /* @__PURE__ */ f("span", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ e(
          b,
          {
            size: 16,
            className: "opacity-30 group-hover/drag:opacity-70 transition-opacity flex-shrink-0"
          }
        ),
        a
      ] })
    }
  );
}
export {
  N as SortableHeaderCell
};
//# sourceMappingURL=sortable-header-cell.mjs.map
