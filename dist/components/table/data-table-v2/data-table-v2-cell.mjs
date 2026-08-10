import { jsx as t } from "react/jsx-runtime";
import * as S from "react";
import { cn as r } from "../../../lib/utils.mjs";
import { DataTableV2EditCell as V } from "./data-table-v2-edit-cell.mjs";
import { STICKY_CELL_BASE_BG as z, alignClass as A, ROW_BG_DESCENDANT as G } from "./constants.mjs";
function I({
  row: l,
  column: e,
  width: o,
  minWidth: p,
  leftOffset: f,
  rightOffset: v,
  isLeftPinned: s,
  isRightPinned: i,
  isLeftBoundary: C,
  isRightBoundary: m,
  isFirstRightPinned: _,
  rowHighlightClass: h,
  spanHeight: c,
  headBgClass: g,
  isEditing: a,
  editingError: k,
  onStartEdit: y,
  onCompleteEdit: N,
  onCancelEdit: D,
  onClearEditError: E
}) {
  const d = s || i, n = c !== void 0, T = r(
    // overflow 는 자르지 않는다. DS Tooltip 이 Portal 을 안 써서 셀 안에 그려지는데,
    // 여기서 overflow-hidden 을 걸면 툴팁까지 잘린다.
    // 옆 칸 침범은 아래 contentCls 의 min-w-0 로 막는다 (자식이 셀 폭에 맞춰 줄어듦).
    "flex min-h-9",
    o !== void 0 && "shrink-0",
    // pinned 셀은 sticky 라 스크롤되는 내용을 덮는다 → **불투명 배경 필수**.
    // 선택/hover 는 행의 group / data-state 를 CSS 로 따라가므로 클래스가 고정이다
    // (prop 으로 받으면 값이 바뀔 때마다 memo 가 깨져 그 행의 pinned 셀이 전부 리렌더된다).
    // pinned 셀은 2겹이다.
    //   바깥(이 요소): 불투명 바탕. 스크롤되는 내용을 덮는다.
    //   안쪽(아래 wrapper): 행과 동일한 상태 색 + 사용처 강조색.
    // 안쪽을 in-flow 자식으로 두는 게 핵심이다. 절대배치 자식은 서브픽셀에서 박스와
    // 어긋나 전환 중 경계가 스치고, 음수 z-index 자식은 부모 배경보다 나중에 그려져
    // 강조색을 덮어버린다.
    d && ["sticky z-10", z],
    _ && "ml-auto",
    C && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    m && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
    // (그룹 middle rows 의 bg 위에 얹혀야 함)
    n && "relative z-[5]"
  ), u = r(
    // min-w-0 — flex 자식이 내용 크기 밑으로 줄어들 수 있게 (truncate 동작 조건)
    "flex-1 flex items-center min-w-0 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
    A[e.align ?? "left"],
    e.editable && !a && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
  ), B = e.editable ? (K) => {
    K.stopPropagation(), a || y(l, e);
  } : void 0, x = a ? /* @__PURE__ */ t(
    V,
    {
      row: l,
      column: e,
      error: k,
      onComplete: N,
      onCancel: D,
      onClearError: E
    }
  ) : /* @__PURE__ */ t("div", { className: u, onClick: B, children: e.cell ? e.cell(l[e.accessorKey], l) : l[e.accessorKey] }), b = d ? /* @__PURE__ */ t(
    "div",
    {
      className: r(
        "flex flex-1 min-w-0 transition-colors",
        G,
        h
      ),
      children: x
    }
  ) : x;
  return /* @__PURE__ */ t(
    "div",
    {
      role: "gridcell",
      className: T,
      style: {
        width: o,
        minWidth: p,
        flex: o === void 0 ? "1 1 0" : void 0,
        left: s ? f : void 0,
        right: i ? v : void 0
      },
      ...e.editable ? { "data-no-row-click": !0 } : {},
      children: n ? (
        // Head 셀 (rowGrouping span > 1) — 컨텐츠를 absolute 로 세로 확장.
        // outer 는 row height 유지 (다른 셀 정렬 흔들림 방지), content 만 spanHeight 만큼 뻗음.
        // border-b 로 그룹 하단 경계 표시 + bg 로 middle rows 위에 opaque 커버.
        /* @__PURE__ */ t(
          "div",
          {
            className: r(
              "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
              g
            ),
            style: { height: c },
            children: b
          }
        )
      ) : b
    }
  );
}
const W = S.memo(
  I
);
export {
  W as DataTableV2Cell
};
//# sourceMappingURL=data-table-v2-cell.mjs.map
