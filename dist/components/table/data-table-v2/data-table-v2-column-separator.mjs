import { jsx as a } from "react/jsx-runtime";
import * as l from "react";
import { cn as t } from "../../../lib/utils.mjs";
function p({
  resizable: r = !1,
  isResizing: s = !1,
  onResizeStart: e,
  column: o,
  side: i = "right"
}) {
  const u = l.useCallback(
    (n) => {
      e && o !== void 0 && e(n, o);
    },
    [e, o]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      "aria-hidden": !0,
      className: t(
        // 실제 세로 선은 셀 경계 (right: 0 / left: 0) 에 위치시켜서 좌/우 셀의 컨텐츠와 대칭 거리 유지.
        // (justify-center 면 셀 안쪽 3px 로 편향되어 좌우 셀의 필터 아이콘까지 거리가 비대칭)
        "absolute top-0 h-full w-[6px] flex items-center",
        i === "right" ? "right-0 justify-end" : "left-0 justify-start",
        r && "cursor-col-resize group/resize"
      ),
      onMouseDown: r && e ? u : void 0,
      children: /* @__PURE__ */ a(
        "span",
        {
          className: t(
            "block h-4 w-px bg-slate-300 dark:bg-slate-600 transition-all",
            r && "group-hover/resize:bg-blue-500 dark:group-hover/resize:bg-blue-400 group-hover/resize:w-[2px]",
            s && "bg-blue-500 dark:bg-blue-400 w-[2px]"
          )
        }
      )
    }
  );
}
const f = l.memo(p);
export {
  f as DataTableV2ColumnSeparator
};
//# sourceMappingURL=data-table-v2-column-separator.mjs.map
