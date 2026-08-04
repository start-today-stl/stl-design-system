import { jsx as a } from "react/jsx-runtime";
import * as s from "react";
import { cn as l } from "../../../lib/utils.mjs";
function n({
  resizable: r = !1,
  isResizing: t = !1,
  onResizeStart: e,
  column: o
}) {
  const u = s.useCallback(
    (i) => {
      e && o !== void 0 && e(i, o);
    },
    [e, o]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      "aria-hidden": !0,
      className: l(
        // 실제 세로 선은 셀 경계 (right: 0) 에 위치시켜서 좌/우 셀의 컨텐츠와 대칭 거리 유지.
        // (justify-center 면 셀 안쪽 3px 로 편향되어 좌우 셀의 필터 아이콘까지 거리가 비대칭)
        "absolute right-0 top-0 h-full w-[6px] flex items-center justify-end",
        r && "cursor-col-resize group/resize"
      ),
      onMouseDown: r && e ? u : void 0,
      children: /* @__PURE__ */ a(
        "span",
        {
          className: l(
            "block h-4 w-px bg-slate-300 dark:bg-slate-600 transition-all",
            r && "group-hover/resize:bg-blue-500 dark:group-hover/resize:bg-blue-400 group-hover/resize:w-[2px]",
            t && "bg-blue-500 dark:bg-blue-400 w-[2px]"
          )
        }
      )
    }
  );
}
const c = s.memo(n);
export {
  c as DataTableV2ColumnSeparator
};
//# sourceMappingURL=data-table-v2-column-separator.mjs.map
