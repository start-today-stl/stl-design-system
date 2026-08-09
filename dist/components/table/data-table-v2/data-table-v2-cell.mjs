import { jsx as l } from "react/jsx-runtime";
import * as z from "react";
import { cn as o } from "../../../lib/utils.mjs";
import { DataTableV2EditCell as K } from "./data-table-v2-edit-cell.mjs";
import { alignClass as j } from "./constants.mjs";
function B({
  row: t,
  column: e,
  width: r,
  minWidth: b,
  leftOffset: p,
  rightOffset: x,
  isLeftPinned: s,
  isRightPinned: i,
  isLeftBoundary: f,
  isRightBoundary: v,
  isFirstRightPinned: h,
  spanHeight: d,
  headBgClass: g,
  isEditing: a,
  editingError: C,
  onStartEdit: m,
  onCompleteEdit: k,
  onCancelEdit: _,
  onClearEditError: y
}) {
  const u = s || i, c = d !== void 0, D = o(
    "flex min-h-9",
    r !== void 0 && "shrink-0",
    // pinned 셀은 sticky 라 자체 배경이 필요하다. 행 배경을 **CSS 상속**으로 가져온다.
    // 선택/hover 배경을 prop 으로 받으면 그 값이 바뀔 때마다 memo 가 깨져서
    // 체크박스 한 번에 그 행의 pinned 셀이 전부 리렌더된다. bg-inherit 는
    // 부모(행)의 계산된 배경을 그대로 따라가므로 클래스가 고정된다.
    u && "sticky z-10 bg-inherit",
    h && "ml-auto",
    f && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    v && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
    // (그룹 middle rows 의 bg 위에 얹혀야 함)
    c && "relative z-[5]"
  ), N = o(
    "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
    j[e.align ?? "left"],
    e.editable && !a && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
  ), T = e.editable ? (V) => {
    V.stopPropagation(), a || m(t, e);
  } : void 0, n = a ? /* @__PURE__ */ l(
    K,
    {
      row: t,
      column: e,
      error: C,
      onComplete: k,
      onCancel: _,
      onClearError: y
    }
  ) : /* @__PURE__ */ l("div", { className: N, onClick: T, children: e.cell ? e.cell(t[e.accessorKey], t) : t[e.accessorKey] });
  return /* @__PURE__ */ l(
    "div",
    {
      role: "gridcell",
      className: D,
      style: {
        width: r,
        minWidth: b,
        flex: r === void 0 ? "1 1 0" : void 0,
        left: s ? p : void 0,
        right: i ? x : void 0
      },
      ...e.editable ? { "data-no-row-click": !0 } : {},
      children: c ? (
        // Head 셀 (rowGrouping span > 1) — 컨텐츠를 absolute 로 세로 확장.
        // outer 는 row height 유지 (다른 셀 정렬 흔들림 방지), content 만 spanHeight 만큼 뻗음.
        // border-b 로 그룹 하단 경계 표시 + bg 로 middle rows 위에 opaque 커버.
        /* @__PURE__ */ l(
          "div",
          {
            className: o(
              "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
              g
            ),
            style: { height: d },
            children: n
          }
        )
      ) : n
    }
  );
}
const F = z.memo(
  B
);
export {
  F as DataTableV2Cell
};
//# sourceMappingURL=data-table-v2-cell.mjs.map
