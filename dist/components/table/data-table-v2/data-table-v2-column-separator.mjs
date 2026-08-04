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
        // 실제 세로 선은 셀 경계 (right: 0) 에 위치시켜서 좌/우 셀의 컨텐츠와 대칭 거리 유지.
        // (justify-center 면 셀 안쪽 3px 로 편향되어 좌우 셀의 필터 아이콘까지 거리가 비대칭)
        "absolute right-0 top-0 h-full w-[6px] flex items-center justify-end",
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
