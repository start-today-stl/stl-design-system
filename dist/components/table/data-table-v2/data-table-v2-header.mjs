import { jsxs as f, jsx as t } from "react/jsx-runtime";
import * as ne from "react";
import { SortableContext as se, horizontalListSortingStrategy as oe } from "@dnd-kit/sortable";
import { cn as r } from "../../../lib/utils.mjs";
import { Checkbox as ae } from "../../ui/checkbox.mjs";
import { DownIcon as le } from "../../../icons/DownIcon.mjs";
import { RightIcon as de } from "../../../icons/RightIcon.mjs";
import { DataTableV2ColumnSeparator as H } from "./data-table-v2-column-separator.mjs";
import { DataTableV2HeaderCell as ce } from "./data-table-v2-header-cell.mjs";
import { alignClass as he, DRAG_HANDLE_COL_WIDTH as L, CHECKBOX_COL_WIDTH as u, EXPAND_COL_WIDTH as S, ROW_ACTIONS_WIDTH as T } from "./constants.mjs";
function me({
  columns: y,
  hasFlexColumn: R,
  headerGroupCells: p,
  hasGroups: K,
  headerRowCount: j,
  hasPrecedingHeaderCells: P,
  leftPinnedCols: O,
  rightPinnedCols: V,
  lastLeftPinnedIdx: v,
  firstRightPinnedIdx: d,
  leftOffsets: k,
  rightOffsets: x,
  getSortInfo: A,
  onSort: I,
  filterState: fe,
  getColumnFilter: F,
  hasActiveFilter: G,
  onColumnFilterChange: X,
  resizable: $,
  resizingKey: E,
  onResizeStart: q,
  columnReorderable: w,
  reorderableIds: J,
  rowReorderable: b,
  selectable: h,
  allSelected: M,
  someSelected: Q,
  onToggleAll: U,
  hasExpandable: N,
  showExpandAll: Y,
  allExpanded: g,
  onToggleExpandAll: Z,
  showRowDelete: C,
  dragHandleColsWidth: m,
  rowActionsColLeftOffset: _,
  headerBg: n
}) {
  const B = (e, i) => {
    const s = e.id ?? String(e.accessorKey), a = String(e.accessorKey), o = e.pinned === "left", l = e.pinned === "right", c = A(e.accessorKey);
    return /* @__PURE__ */ t(
      ce,
      {
        column: e,
        width: typeof e.width == "number" ? e.width : void 0,
        minWidth: typeof e.minWidth == "number" ? e.minWidth : void 0,
        leftOffset: o ? k[i] : void 0,
        rightOffset: l ? x[i] : void 0,
        isLeftPinned: o,
        isRightPinned: l,
        isLeftBoundary: i === v,
        isRightBoundary: i === d,
        isFirstRightPinned: i === d,
        isDraggable: w && !o && !l,
        isLastColumn: i === y.length - 1,
        sortDirection: c.direction,
        sortPriority: c.priority,
        onSort: I,
        filterValue: e.filter ? F(a) : void 0,
        filterActive: e.filter ? G(a) : !1,
        onColumnFilterChange: X,
        resizable: $,
        isResizing: E === e.accessorKey,
        onResizeStart: q,
        headerBg: n
      },
      s
    );
  }, D = (e, i) => {
    const s = typeof e.width == "number" ? e.width : void 0, a = typeof e.minWidth == "number" ? e.minWidth : void 0, o = e.pinned === "left";
    return /* @__PURE__ */ t(
      "div",
      {
        className: r(
          "sticky z-20",
          s !== void 0 && "shrink-0",
          n,
          i === d && "ml-auto",
          i === v && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          i === d && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ),
        style: {
          width: s,
          minWidth: a,
          flex: s === void 0 ? "1 1 0" : void 0,
          left: o ? k[i] : void 0,
          right: o ? void 0 : x[i]
        }
      },
      `pinned-placeholder-${e.id ?? String(e.accessorKey)}`
    );
  }, ee = () => {
    const e = [];
    return b && e.push(
      /* @__PURE__ */ t(
        "div",
        {
          role: "columnheader",
          className: r("shrink-0 sticky z-20 min-h-9", n),
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
          className: r("shrink-0 sticky z-20 flex items-center justify-center min-h-9", n),
          style: {
            width: u,
            left: m
          },
          children: /* @__PURE__ */ t(
            ae,
            {
              checked: M,
              indeterminate: Q,
              onCheckedChange: () => U(),
              "aria-label": "전체 선택"
            }
          )
        },
        "ctrl-header-select"
      )
    ), N && e.push(
      /* @__PURE__ */ t(
        "div",
        {
          role: "columnheader",
          className: r("shrink-0 sticky z-20 flex items-center justify-center min-h-9", n),
          style: {
            width: S,
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
  }, te = () => C ? /* @__PURE__ */ t(
    "div",
    {
      role: "columnheader",
      className: r(
        "shrink-0 sticky z-20 flex items-center justify-center min-h-9",
        n
      ),
      style: { width: T, left: _ },
      "aria-label": "행 삭제",
      children: /* @__PURE__ */ t("span", { className: "sr-only", children: "행 삭제" })
    },
    "ctrl-header-delete"
  ) : null, ie = () => C ? /* @__PURE__ */ t(
    "div",
    {
      className: r("shrink-0 sticky z-20 min-h-9", n),
      style: { width: T, left: _ }
    },
    "ctrl-ph-delete"
  ) : null, re = () => {
    const e = [];
    return b && e.push(
      /* @__PURE__ */ t(
        "div",
        {
          className: r("shrink-0 sticky z-20 min-h-9", n),
          style: { width: L, left: 0 }
        },
        "ctrl-ph-drag-handle"
      )
    ), h && e.push(
      /* @__PURE__ */ t(
        "div",
        {
          className: r("shrink-0 sticky z-20 min-h-9", n),
          style: { width: u, left: m }
        },
        "ctrl-ph-select"
      )
    ), N && e.push(
      /* @__PURE__ */ t(
        "div",
        {
          className: r("shrink-0 sticky z-20 min-h-9", n),
          style: {
            width: S,
            left: m + (h ? u : 0)
          }
        },
        "ctrl-ph-expand"
      )
    ), e;
  }, z = /* @__PURE__ */ f("div", { role: "row", "aria-rowindex": j, className: "flex", children: [
    ee(),
    te(),
    y.map((e, i) => B(e, i)),
    d === -1 && !R && /* @__PURE__ */ t("div", { "aria-hidden": !0, className: "flex-1 min-h-9" })
  ] });
  return /* @__PURE__ */ f(
    "div",
    {
      className: r(
        "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
        n
      ),
      children: [
        K && p && /* @__PURE__ */ f(
          "div",
          {
            role: "row",
            "aria-rowindex": 1,
            className: "flex border-b border-slate-200 dark:border-slate-700",
            children: [
              re(),
              ie(),
              O.map(({ c: e, i }) => D(e, i)),
              p.map((e, i) => {
                if (e.kind === "group") {
                  const l = p[i + 1], c = i > 0 || P, W = l !== void 0 && l.kind !== "group";
                  return /* @__PURE__ */ f(
                    "div",
                    {
                      role: "columnheader",
                      className: r(
                        "relative flex min-h-9",
                        e.flexGrow === 0 && "shrink-0"
                      ),
                      style: {
                        width: e.width,
                        minWidth: e.minWidth,
                        // 하위 컬럼들과 같은 지분으로 분배받아야 폭이 일치한다
                        flex: e.flexGrow === 0 ? void 0 : `${e.flexGrow} 1 0`
                      },
                      children: [
                        c && /* @__PURE__ */ t(H, { side: "left" }),
                        /* @__PURE__ */ t(
                          "div",
                          {
                            className: r(
                              "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                              he[e.group.align ?? "center"]
                            ),
                            children: e.group.header
                          }
                        ),
                        W && /* @__PURE__ */ t(H, {})
                      ]
                    },
                    e.key
                  );
                }
                const s = e.col, a = typeof s.width == "number" ? s.width : void 0, o = typeof s.minWidth == "number" ? s.minWidth : void 0;
                return /* @__PURE__ */ t(
                  "div",
                  {
                    className: r(
                      "min-h-9",
                      a === void 0 ? "flex-1" : "shrink-0"
                    ),
                    style: { width: a, minWidth: o }
                  },
                  e.key
                );
              }),
              V.map(({ c: e, i }) => D(e, i))
            ]
          }
        ),
        w ? /* @__PURE__ */ t(
          se,
          {
            items: J,
            strategy: oe,
            children: z
          }
        ) : z
      ]
    }
  );
}
const ge = ne.memo(
  me
);
export {
  ge as DataTableV2Header
};
//# sourceMappingURL=data-table-v2-header.mjs.map
