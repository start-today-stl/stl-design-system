import { jsx as e } from "react/jsx-runtime";
import { cn as d } from "../../../lib/utils.mjs";
import { DragHandleIcon as c } from "../../../icons/DragHandleIcon.mjs";
import { DRAG_HANDLE_WIDTH as t } from "./types.mjs";
function b({
  isSelected: i,
  hasLeftStickyColumns: r,
  dragHandleProps: o
}) {
  const { listeners: a, attributes: s, setActivatorNodeRef: l } = o ?? {};
  return /* @__PURE__ */ e(
    "td",
    {
      className: d(
        "p-0 align-middle",
        r && (i ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
      ),
      style: r ? {
        position: "sticky",
        left: 0,
        zIndex: 10,
        width: `${t}px`,
        minWidth: `${t}px`,
        maxWidth: `${t}px`
      } : {
        width: `${t}px`,
        minWidth: `${t}px`,
        maxWidth: `${t}px`
      },
      children: /* @__PURE__ */ e(
        "div",
        {
          ref: l,
          className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
          onClick: (n) => n.stopPropagation(),
          "aria-label": "행 순서 변경",
          ...a,
          ...s,
          children: /* @__PURE__ */ e(c, { size: 16 })
        }
      )
    }
  );
}
export {
  b as DragHandleCell
};
//# sourceMappingURL=drag-handle-cell.mjs.map
