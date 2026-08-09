import { jsxs as f, jsx as t } from "react/jsx-runtime";
import * as se from "react";
import { SortableContext as ne, horizontalListSortingStrategy as oe } from "@dnd-kit/sortable";
import { cn as i } from "../../../lib/utils.mjs";
import { Checkbox as ae } from "../../ui/checkbox.mjs";
import { DownIcon as le } from "../../../icons/DownIcon.mjs";
import { RightIcon as de } from "../../../icons/RightIcon.mjs";
import { DataTableV2ColumnSeparator as H } from "./data-table-v2-column-separator.mjs";
import { DataTableV2HeaderCell as ce } from "./data-table-v2-header-cell.mjs";
import { alignClass as he, DRAG_HANDLE_COL_WIDTH as L, CHECKBOX_COL_WIDTH as u, EXPAND_COL_WIDTH as T, ROW_ACTIONS_WIDTH as S, DEFAULT_COL_WIDTH as me } from "./constants.mjs";
function fe({
  columns: y,
  hasFlexColumn: W,
  headerGroupCells: p,
  hasGroups: R,
  headerRowCount: K,
  hasPrecedingHeaderCells: j,
  leftPinnedCols: O,
  rightPinnedCols: P,
  lastLeftPinnedIdx: k,
  firstRightPinnedIdx: d,
  leftOffsets: v,
  rightOffsets: x,
  getSortInfo: A,
  onSort: I,
  filterState: ue,
  getColumnFilter: V,
  hasActiveFilter: F,
  onColumnFilterChange: E,
  resizable: X,
  resizingKey: U,
  onResizeStart: $,
  columnReorderable: w,
  reorderableIds: q,
  rowReorderable: N,
  selectable: h,
  allSelected: J,
  someSelected: M,
  onToggleAll: Q,
  hasExpandable: b,
  showExpandAll: Y,
  allExpanded: g,
  onToggleExpandAll: Z,
  showRowDelete: _,
  dragHandleColsWidth: m,
  rowActionsColLeftOffset: C,
  headerBg: s
}) {
  const G = (e, r) => {
    const n = e.id ?? String(e.accessorKey), o = String(e.accessorKey), l = e.pinned === "left", a = e.pinned === "right", c = A(e.accessorKey);
    return /* @__PURE__ */ t(
      ce,
      {
        column: e,
        width: typeof e.width == "number" ? e.width : void 0,
        minWidth: typeof e.minWidth == "number" ? e.minWidth : void 0,
        leftOffset: l ? v[r] : void 0,
        rightOffset: a ? x[r] : void 0,
        isLeftPinned: l,
        isRightPinned: a,
        isLeftBoundary: r === k,
        isRightBoundary: r === d,
        isFirstRightPinned: r === d,
        isDraggable: w && !l && !a,
        isLastColumn: r === y.length - 1,
        sortDirection: c.direction,
        sortPriority: c.priority,
        onSort: I,
        filterValue: e.filter ? V(o) : void 0,
        filterActive: e.filter ? F(o) : !1,
        onColumnFilterChange: E,
        resizable: X,
        isResizing: U === e.accessorKey,
        onResizeStart: $,
        headerBg: s
      },
      n
    );
  }, D = (e, r) => {
    const n = typeof e.width == "number" ? e.width : me, o = e.pinned === "left";
    return /* @__PURE__ */ t(
      "div",
      {
        className: i(
          "shrink-0 sticky z-20",
          s,
          r === d && "ml-auto",
          r === k && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          r === d && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: n,
          left: o ? v[r] : void 0,
          right: o ? void 0 : x[r]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, B = () => {
    const e = [];
    return N && e.push(
      /* @__PURE__ */ t(
        "div",
        {
          role: "columnheader",
          className: i("shrink-0 sticky z-20 min-h-9", s),
          style: { width: L, left: 0 },
          "aria-label": "행 순서 변경",
          children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 순서 변경" })
        },
        "ctrl-header-drag-handle"
      )
    ), h && e.push(
      /* @__PURE__ */ t(
        "div",
        {
          role: "columnheader",
          className: i("shrink-0 sticky z-20 flex items-center justify-center min-h-9", s),
          style: {
            width: u,
            left: m
          },
          children: /* @__PURE__ */ t(
            ae,
            {
              checked: J,
              indeterminate: M,
              onCheckedChange: () => Q(),
              "aria-label": "전체 선택"
            }
          )
        },
        "ctrl-header-select"
      )
    ), b && e.push(
      /* @__PURE__ */ t(
        "div",
        {
          role: "columnheader",
          className: i("shrink-0 sticky z-20 flex items-center justify-center min-h-9", s),
          style: {
            width: T,
            left: m + (h ? u : 0)
          },
          children: Y ? /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: Z,
              className: "flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors",
              "aria-label": g ? "모두 접기" : "모두 펼치기",
              children: g ? /* @__PURE__ */ t(le, { size: 24 }) : /* @__PURE__ */ t(de, { size: 24 })
            }
          ) : (
            // 전체 펼치기 버튼을 숨겨도 columnheader 는 남으므로 읽을 텍스트가 있어야 한다.
            // (비어 있으면 axe 의 empty-table-header 위반)
            /* @__PURE__ */ t("span", { className: "sr-only", children: "행 펼치기" })
          )
        },
        "ctrl-header-expand"
      )
    ), e;
  }, ee = () => _ ? /* @__PURE__ */ t(
    "div",
    {
      role: "columnheader",
      className: i(
        "shrink-0 sticky z-20 flex items-center justify-center min-h-9",
        s
      ),
      style: { width: S, left: C },
      "aria-label": "행 삭제",
      children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
    },
    "ctrl-header-delete"
  ) : null, te = () => _ ? /* @__PURE__ */ t(
    "div",
    {
      className: i("shrink-0 sticky z-20 min-h-9", s),
      style: { width: S, left: C }
    },
    "ctrl-ph-delete"
  ) : null, re = () => {
    const e = [];
    return N && e.push(
      /* @__PURE__ */ t(
        "div",
        {
          className: i("shrink-0 sticky z-20 min-h-9", s),
          style: { width: L, left: 0 }
        },
        "ctrl-ph-drag-handle"
      )
    ), h && e.push(
      /* @__PURE__ */ t(
        "div",
        {
          className: i("shrink-0 sticky z-20 min-h-9", s),
          style: { width: u, left: m }
        },
        "ctrl-ph-select"
      )
    ), b && e.push(
      /* @__PURE__ */ t(
        "div",
        {
          className: i("shrink-0 sticky z-20 min-h-9", s),
          style: {
            width: T,
            left: m + (h ? u : 0)
          }
        },
        "ctrl-ph-expand"
      )
    ), e;
  }, z = /* @__PURE__ */ f("div", { role: "row", "aria-rowindex": K, className: "flex", children: [
    B(),
    ee(),
    y.map((e, r) => G(e, r)),
    d === -1 && !W && /* @__PURE__ */ t("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
  ] });
  return /* @__PURE__ */ f(
    "div",
    {
      className: i(
        "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
        s
      ),
      children: [
        R && p && /* @__PURE__ */ f(
          "div",
          {
            role: "row",
            "aria-rowindex": 1,
            className: "flex border-b border-slate-200 dark:border-slate-700",
            children: [
              re(),
              te(),
              O.map(({ c: e, i: r }) => D(e, r)),
              p.map((e, r) => {
                if (e.kind === "group") {
                  const a = p[r + 1], c = r > 0 || j, ie = a !== void 0 && a.kind !== "group";
                  return /* @__PURE__ */ f(
                    "div",
                    {
                      role: "columnheader",
                      className: "relative flex min-h-9 shrink-0",
                      style: { width: e.width },
                      children: [
                        c && /* @__PURE__ */ t(H, { side: "left" }),
                        /* @__PURE__ */ t(
                          "div",
                          {
                            className: i(
                              "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                              he[e.group.align ?? "center"]
                            ),
                            children: e.group.header
                          }
                        ),
                        ie && /* @__PURE__ */ t(H, {})
                      ]
                    },
                    e.key
                  );
                }
                const n = e.col, o = typeof n.width == "number" ? n.width : void 0, l = typeof n.minWidth == "number" ? n.minWidth : void 0;
                return /* @__PURE__ */ t(
                  "div",
                  {
                    className: i(
                      "min-h-9",
                      o === void 0 ? "flex-1" : "shrink-0"
                    ),
                    style: { width: o, minWidth: l }
                  },
                  e.key
                );
              }),
              P.map(({ c: e, i: r }) => D(e, r))
            ]
          }
        ),
        w ? /* @__PURE__ */ t(
          ne,
          {
            items: q,
            strategy: oe,
            children: z
          }
        ) : z
      ]
    }
  );
}
const _e = se.memo(
  fe
);
export {
  _e as DataTableV2Header
};
//# sourceMappingURL=data-table-v2-header.mjs.map
