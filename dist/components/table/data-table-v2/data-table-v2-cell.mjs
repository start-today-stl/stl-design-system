import { jsx as r } from "react/jsx-runtime";
import * as S from "react";
import { cn as t } from "../../../lib/utils.mjs";
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
  isRightBoundary: h,
  isFirstRightPinned: m,
  rowHighlightClass: _,
  spanHeight: d,
  headBgClass: g,
  isEditing: a,
  editingError: k,
  onStartEdit: y,
  onCompleteEdit: N,
  onCancelEdit: D,
  onClearEditError: E
}) {
  const c = s || i, n = d !== void 0, T = t(
    // overflow-hidden — 셀 내용이 옆 칸을 침범하지 못하게 한다.
    // 사용처가 고정 폭(max-width 등)으로 자르는 컴포넌트를 쓰는데 그 값이 실제 컬럼보다
    // 넓으면 텍스트가 구분선을 넘어 다음 셀 위에 그려진다. 세로는 행 높이가 내용에 맞춰
    // 늘어나므로 잘리지 않는다.
    "flex min-h-9 overflow-hidden",
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
    c && ["sticky z-10", z],
    m && "ml-auto",
    C && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    h && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
    // (그룹 middle rows 의 bg 위에 얹혀야 함)
    n && "relative z-[5]"
  ), u = t(
    // min-w-0 — flex 자식이 내용 크기 밑으로 줄어들 수 있게 (truncate 동작 조건)
    "flex-1 flex items-center min-w-0 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
    A[e.align ?? "left"],
    e.editable && !a && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
  ), B = e.editable ? (K) => {
    K.stopPropagation(), a || y(l, e);
  } : void 0, x = a ? /* @__PURE__ */ r(
    V,
    {
      row: l,
      column: e,
      error: k,
      onComplete: N,
      onCancel: D,
      onClearError: E
    }
  ) : /* @__PURE__ */ r("div", { className: u, onClick: B, children: e.cell ? e.cell(l[e.accessorKey], l) : l[e.accessorKey] }), b = c ? /* @__PURE__ */ r(
    "div",
    {
      className: t(
        "flex flex-1 min-w-0 transition-colors",
        G,
        _
      ),
      children: x
    }
  ) : x;
  return /* @__PURE__ */ r(
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
        /* @__PURE__ */ r(
          "div",
          {
            className: t(
              "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
              g
            ),
            style: { height: d },
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
