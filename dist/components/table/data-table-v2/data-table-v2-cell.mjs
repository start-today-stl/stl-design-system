import { jsx as l, jsxs as z } from "react/jsx-runtime";
import * as K from "react";
import { cn as r } from "../../../lib/utils.mjs";
import { DataTableV2EditCell as S } from "./data-table-v2-edit-cell.mjs";
import { ROW_BG_DESCENDANT as V, alignClass as j, STICKY_CELL_BASE_BG as A } from "./constants.mjs";
function G({
  row: t,
  column: e,
  width: a,
  minWidth: x,
  leftOffset: b,
  rightOffset: f,
  isLeftPinned: s,
  isRightPinned: i,
  isLeftBoundary: v,
  isRightBoundary: C,
  isFirstRightPinned: _,
  rowHighlightClass: h,
  spanHeight: d,
  headBgClass: m,
  isEditing: o,
  editingError: g,
  onStartEdit: k,
  onCompleteEdit: y,
  onCancelEdit: u,
  onClearEditError: N
}) {
  const c = s || i, n = d !== void 0, D = r(
    "flex min-h-9",
    a !== void 0 && "shrink-0",
    // pinned 셀은 sticky 라 스크롤되는 내용을 덮는다 → **불투명 배경 필수**.
    // 선택/hover 는 행의 group / data-state 를 CSS 로 따라가므로 클래스가 고정이다
    // (prop 으로 받으면 값이 바뀔 때마다 memo 가 깨져 그 행의 pinned 셀이 전부 리렌더된다).
    // 상태 색은 **셀 자신의 background** 로 그린다. 자식 레이어로 그리면 서브픽셀에서
    // 셀 박스와 어긋나 전환 중 경계가 스친다. 행과 같은 클래스라 색·타이밍이 동일하다.
    // 사용처 강조색은 마지막에 와서 기본색을 대체한다 (행에서 일어나는 것과 동일).
    c && [
      "relative sticky z-10 transition-colors",
      V,
      h
    ],
    _ && "ml-auto",
    v && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    C && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
    // (그룹 middle rows 의 bg 위에 얹혀야 함)
    n && "relative z-[5]"
  ), E = r(
    "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
    j[e.align ?? "left"],
    e.editable && !o && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
  ), T = e.editable ? (B) => {
    B.stopPropagation(), o || k(t, e);
  } : void 0, p = o ? /* @__PURE__ */ l(
    S,
    {
      row: t,
      column: e,
      error: g,
      onComplete: y,
      onCancel: u,
      onClearError: N
    }
  ) : /* @__PURE__ */ l("div", { className: E, onClick: T, children: e.cell ? e.cell(t[e.accessorKey], t) : t[e.accessorKey] });
  return /* @__PURE__ */ z(
    "div",
    {
      role: "gridcell",
      className: D,
      style: {
        width: a,
        minWidth: x,
        flex: a === void 0 ? "1 1 0" : void 0,
        left: s ? b : void 0,
        right: i ? f : void 0
      },
      ...e.editable ? { "data-no-row-click": !0 } : {},
      children: [
        c && /* @__PURE__ */ l("span", { "aria-hidden": !0, className: r("absolute inset-0 -z-10", A) }),
        n ? (
          // Head 셀 (rowGrouping span > 1) — 컨텐츠를 absolute 로 세로 확장.
          // outer 는 row height 유지 (다른 셀 정렬 흔들림 방지), content 만 spanHeight 만큼 뻗음.
          // border-b 로 그룹 하단 경계 표시 + bg 로 middle rows 위에 opaque 커버.
          /* @__PURE__ */ l(
            "div",
            {
              className: r(
                "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
                m
              ),
              style: { height: d },
              children: p
            }
          )
        ) : p
      ]
    }
  );
}
const W = K.memo(
  G
);
export {
  W as DataTableV2Cell
};
//# sourceMappingURL=data-table-v2-cell.mjs.map
