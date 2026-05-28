import { jsx as p } from "react/jsx-runtime";
import { useSortable as u } from "@dnd-kit/sortable";
import { CSS as S } from "@dnd-kit/utilities";
import { cn as k } from "../../../lib/utils.mjs";
function N({
  id: r,
  children: t,
  className: o,
  isSelected: a,
  onClick: s,
  onMouseEnter: i,
  onMouseLeave: n
}) {
  const {
    setNodeRef: d,
    setActivatorNodeRef: l,
    listeners: b,
    attributes: f,
    transform: g,
    transition: m,
    isDragging: e
  } = u({ id: r }), c = {
    transform: S.Transform.toString(g),
    transition: m,
    opacity: e ? 0.5 : 1
  };
  return /* @__PURE__ */ p(
    "tr",
    {
      ref: d,
      style: c,
      "data-state": a ? "selected" : void 0,
      className: k(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        e && "z-50 shadow-lg",
        o
      ),
      onClick: s,
      onMouseEnter: i,
      onMouseLeave: n,
      children: typeof t == "function" ? t({ listeners: b, attributes: f, setActivatorNodeRef: l }) : t
    }
  );
}
export {
  N as SortableRow
};
//# sourceMappingURL=sortable-row.mjs.map
