import { jsx as r, jsxs as z } from "react/jsx-runtime";
import * as K from "react";
import { cn as a } from "../../../lib/utils.mjs";
import { DataTableV2EditCell as S } from "./data-table-v2-edit-cell.mjs";
import { STICKY_CELL_BASE_BG as V, alignClass as j, ROW_BG_DESCENDANT as A } from "./constants.mjs";
function G({
  row: t,
  column: e,
  width: l,
  minWidth: p,
  leftOffset: g,
  rightOffset: x,
  isLeftPinned: s,
  isRightPinned: d,
  isLeftBoundary: v,
  isRightBoundary: h,
  isFirstRightPinned: u,
  rowHighlightClass: f,
  spanHeight: i,
  headBgClass: C,
  isEditing: o,
  editingError: _,
  onStartEdit: k,
  onCompleteEdit: m,
  onCancelEdit: y,
  onClearEditError: N
}) {
  const c = s || d, b = i !== void 0, D = a(
    "flex min-h-9",
    l !== void 0 && "shrink-0",
    // pinned 셀은 sticky 라 스크롤되는 내용을 덮는다 → **불투명 배경 필수**.
    // 선택/hover 는 행의 group / data-state 를 CSS 로 따라가므로 클래스가 고정이다
    // (prop 으로 받으면 값이 바뀔 때마다 memo 가 깨져 그 행의 pinned 셀이 전부 리렌더된다).
    c && [
      "relative sticky z-10 transition-colors",
      // sticky 셀 배경 — 행(.group)의 상태를 CSS 로 따라간다.
      //
      // 선택+hover 는 같은 그룹의 변이 두 개를 겹칠 수 없어서
      // (group-hover:group-data-[...]: 는 조상이 둘인 잘못된 셀렉터가 나온다)
      // arbitrary group 변이로 한 셀렉터에 담는다.
      //   group-[[data-state=selected]:hover]:  →  .group[data-state=selected]:hover &
      // 이 셀렉터가 hover(.group:hover &) / 선택(.group[data-state=selected] &) 보다
      // 명시도가 높아 선언 순서와 무관하게 이긴다.
      V,
      "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
      "group-[[data-state=selected]]:bg-blue-50 dark:group-[[data-state=selected]]:bg-blue-900",
      "group-[[data-state=selected]:hover]:bg-blue-100 dark:group-[[data-state=selected]:hover]:bg-blue-950"
    ],
    u && "ml-auto",
    v && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    h && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
    // (그룹 middle rows 의 bg 위에 얹혀야 함)
    b && "relative z-[5]"
  ), E = a(
    "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
    j[e.align ?? "left"],
    e.editable && !o && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
  ), T = e.editable ? (B) => {
    B.stopPropagation(), o || k(t, e);
  } : void 0, n = o ? /* @__PURE__ */ r(
    S,
    {
      row: t,
      column: e,
      error: _,
      onComplete: m,
      onCancel: y,
      onClearError: N
    }
  ) : /* @__PURE__ */ r("div", { className: E, onClick: T, children: e.cell ? e.cell(t[e.accessorKey], t) : t[e.accessorKey] });
  return /* @__PURE__ */ z(
    "div",
    {
      role: "gridcell",
      className: D,
      style: {
        width: l,
        minWidth: p,
        flex: l === void 0 ? "1 1 0" : void 0,
        left: s ? g : void 0,
        right: d ? x : void 0
      },
      ...e.editable ? { "data-no-row-click": !0 } : {},
      children: [
        c && /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": !0,
            className: a(
              "absolute inset-0 -z-10 transition-colors",
              A,
              f
            )
          }
        ),
        b ? (
          // Head 셀 (rowGrouping span > 1) — 컨텐츠를 absolute 로 세로 확장.
          // outer 는 row height 유지 (다른 셀 정렬 흔들림 방지), content 만 spanHeight 만큼 뻗음.
          // border-b 로 그룹 하단 경계 표시 + bg 로 middle rows 위에 opaque 커버.
          /* @__PURE__ */ r(
            "div",
            {
              className: a(
                "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
                C
              ),
              style: { height: i },
              children: n
            }
          )
        ) : n
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
