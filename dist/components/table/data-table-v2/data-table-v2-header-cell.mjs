import { jsxs as a, jsx as t } from "react/jsx-runtime";
import * as u from "react";
import { cn as l } from "../../../lib/utils.mjs";
import { DataTableV2ColumnSeparator as z } from "./data-table-v2-column-separator.mjs";
import { DataTableV2FilterCell as F } from "./data-table-v2-filter-cell.mjs";
import { DataTableV2SortableHeaderCell as L } from "./data-table-v2-sortable-header-cell.mjs";
import { alignClass as g } from "./constants.mjs";
const v = u.memo(function({
  direction: r,
  active: o
}) {
  return /* @__PURE__ */ t(
    "svg",
    {
      width: "8",
      height: "5",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: l(
        "transition-colors",
        o ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        r === "down" && "rotate-180"
      ),
      children: /* @__PURE__ */ t("path", { d: "M4 0L8 5H0L4 0Z", fill: "currentColor" })
    }
  );
});
function M({
  column: e,
  width: r,
  minWidth: o,
  leftOffset: w,
  rightOffset: b,
  isLeftPinned: i,
  isRightPinned: c,
  isLeftBoundary: C,
  isRightBoundary: N,
  isFirstRightPinned: y,
  isDraggable: k,
  isLastColumn: _,
  sortDirection: s,
  sortPriority: d,
  onSort: S,
  filterValue: T,
  filterActive: V,
  onColumnFilterChange: H,
  resizable: K,
  isResizing: j,
  onResizeStart: A,
  headerBg: B
}) {
  const f = l(
    "relative flex min-h-9",
    r !== void 0 && "shrink-0",
    (i || c) && "sticky z-20",
    B,
    C && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    N && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    e.sortable && "select-none",
    y && "ml-auto"
  ), m = {
    width: r,
    minWidth: o,
    flex: r === void 0 ? "1 1 0" : void 0,
    left: i ? w : void 0,
    right: c ? b : void 0
  }, D = e.sortable ? /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: l(
        "flex w-full min-w-0 items-center gap-1 cursor-pointer",
        // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
        e.align === "right" ? "flex-row-reverse justify-start" : g[e.align ?? "left"]
      ),
      onClick: () => S(e.accessorKey),
      children: [
        /* @__PURE__ */ t("span", { className: "min-w-0 truncate", children: e.header }),
        /* @__PURE__ */ a("span", { className: "flex shrink-0 items-center gap-0.5", children: [
          /* @__PURE__ */ a("span", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ t(v, { direction: "up", active: s === "asc" }),
            /* @__PURE__ */ t(v, { direction: "down", active: s === "desc" })
          ] }),
          d !== void 0 && /* @__PURE__ */ t("span", { className: "text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none", children: d })
        ] })
      ]
    }
  ) : /* @__PURE__ */ t("span", { className: "min-w-0 truncate", children: e.header }), n = String(e.accessorKey), I = e.filter ? /* @__PURE__ */ t(
    F,
    {
      column: e,
      filter: e.filter,
      value: T,
      active: V,
      onChange: H,
      columnKey: n
    }
  ) : null, p = /* @__PURE__ */ a(
    "div",
    {
      className: l(
        "flex-1 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-300 min-w-0",
        e.align === "right" && "flex-row-reverse"
      ),
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: l(
              "flex-1 flex items-center gap-1 min-w-0 overflow-hidden",
              g[e.align ?? "left"]
            ),
            children: D
          }
        ),
        I
      ]
    }
  ), x = !_ && /* @__PURE__ */ t(
    z,
    {
      resizable: K,
      isResizing: j,
      onResizeStart: A,
      column: e
    }
  ), h = e.sortable ? s === "asc" ? "ascending" : s === "desc" ? "descending" : "none" : void 0;
  return k ? /* @__PURE__ */ a(
    L,
    {
      id: n,
      className: f,
      style: m,
      dataColumnKey: n,
      ariaSort: h,
      children: [
        p,
        x
      ]
    }
  ) : /* @__PURE__ */ a(
    "div",
    {
      role: "columnheader",
      "data-column-key": n,
      className: f,
      style: m,
      "aria-sort": h,
      children: [
        p,
        x
      ]
    }
  );
}
const R = u.memo(
  M
);
export {
  R as DataTableV2HeaderCell
};
//# sourceMappingURL=data-table-v2-header-cell.mjs.map
