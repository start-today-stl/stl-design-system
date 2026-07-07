import { jsx as r } from "react/jsx-runtime";
import { cn as o } from "../../../lib/utils.mjs";
function u({
  resizable: e = !1,
  isResizing: a = !1,
  onResizeStart: l
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      "aria-hidden": !0,
      className: o(
        "absolute right-0 top-0 h-full w-[6px] flex items-center justify-center",
        e && "cursor-col-resize group/resize"
      ),
      onMouseDown: e ? l : void 0,
      children: /* @__PURE__ */ r(
        "span",
        {
          className: o(
            "block h-4 w-px bg-slate-300 dark:bg-slate-600 transition-all",
            e && "group-hover/resize:bg-blue-500 dark:group-hover/resize:bg-blue-400 group-hover/resize:w-[2px]",
            a && "bg-blue-500 dark:bg-blue-400 w-[2px]"
          )
        }
      )
    }
  );
}
export {
  u as DataTableV2ColumnSeparator
};
//# sourceMappingURL=data-table-v2-column-separator.mjs.map
