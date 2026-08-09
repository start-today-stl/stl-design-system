import { jsx as a, jsxs as z } from "react/jsx-runtime";
import * as K from "react";
import { cn as r } from "../../../lib/utils.mjs";
import { DataTableV2EditCell as B } from "./data-table-v2-edit-cell.mjs";
import { alignClass as E } from "./constants.mjs";
function I({
  row: t,
  column: e,
  width: l,
  minWidth: x,
  leftOffset: g,
  rightOffset: v,
  isLeftPinned: s,
  isRightPinned: d,
  isLeftBoundary: f,
  isRightBoundary: h,
  isFirstRightPinned: u,
  rowHighlightClass: i,
  spanHeight: c,
  headBgClass: k,
  isEditing: o,
  editingError: m,
  onStartEdit: C,
  onCompleteEdit: _,
  onCancelEdit: y,
  onClearEditError: N
}) {
  const n = s || d, b = c !== void 0, D = r(
    "flex min-h-9",
    l !== void 0 && "shrink-0",
    // pinned 셀은 sticky 라 스크롤되는 내용을 덮는다 → **불투명 배경 필수**.
    // 선택/hover 는 행의 group / data-state 를 CSS 로 따라가므로 클래스가 고정이다
    // (prop 으로 받으면 값이 바뀔 때마다 memo 가 깨져 그 행의 pinned 셀이 전부 리렌더된다).
    n && [
      "relative sticky z-10 transition-colors",
      "bg-white dark:bg-slate-900",
      "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
      "group-data-[state=selected]:bg-blue-50 dark:group-data-[state=selected]:bg-blue-900"
    ],
    u && "ml-auto",
    f && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    h && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
    // (그룹 middle rows 의 bg 위에 얹혀야 함)
    b && "relative z-[5]"
  ), T = r(
    "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
    E[e.align ?? "left"],
    e.editable && !o && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
  ), V = e.editable ? (j) => {
    j.stopPropagation(), o || C(t, e);
  } : void 0, p = o ? /* @__PURE__ */ a(
    B,
    {
      row: t,
      column: e,
      error: m,
      onComplete: _,
      onCancel: y,
      onClearError: N
    }
  ) : /* @__PURE__ */ a("div", { className: T, onClick: V, children: e.cell ? e.cell(t[e.accessorKey], t) : t[e.accessorKey] });
  return /* @__PURE__ */ z(
    "div",
    {
      role: "gridcell",
      className: D,
      style: {
        width: l,
        minWidth: x,
        flex: l === void 0 ? "1 1 0" : void 0,
        left: s ? g : void 0,
        right: d ? v : void 0
      },
      ...e.editable ? { "data-no-row-click": !0 } : {},
      children: [
        n && i && /* @__PURE__ */ a(
          "span",
          {
            "aria-hidden": !0,
            className: r(
              "absolute inset-0 pointer-events-none group-data-[state=selected]:hidden",
              i
            )
          }
        ),
        b ? (
          // Head 셀 (rowGrouping span > 1) — 컨텐츠를 absolute 로 세로 확장.
          // outer 는 row height 유지 (다른 셀 정렬 흔들림 방지), content 만 spanHeight 만큼 뻗음.
          // border-b 로 그룹 하단 경계 표시 + bg 로 middle rows 위에 opaque 커버.
          /* @__PURE__ */ a(
            "div",
            {
              className: r(
                "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
                k
              ),
              style: { height: c },
              children: p
            }
          )
        ) : p
      ]
    }
  );
}
const J = K.memo(
  I
);
export {
  J as DataTableV2Cell
};
//# sourceMappingURL=data-table-v2-cell.mjs.map
