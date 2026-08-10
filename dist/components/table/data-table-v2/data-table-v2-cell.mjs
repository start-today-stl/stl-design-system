import { jsx as r } from "react/jsx-runtime";
import * as K from "react";
import { cn as o } from "../../../lib/utils.mjs";
import { DataTableV2EditCell as S } from "./data-table-v2-edit-cell.mjs";
import { STICKY_CELL_BASE_BG as V, alignClass as z, ROW_BG_DESCENDANT as A } from "./constants.mjs";
function G({
  row: l,
  column: e,
  width: t,
  minWidth: f,
  leftOffset: p,
  rightOffset: v,
  isLeftPinned: s,
  isRightPinned: i,
  isLeftBoundary: h,
  isRightBoundary: m,
  isFirstRightPinned: C,
  rowHighlightClass: _,
  spanHeight: d,
  headBgClass: g,
  isEditing: a,
  editingError: k,
  onStartEdit: y,
  onCompleteEdit: N,
  onCancelEdit: u,
  onClearEditError: w
}) {
  const c = s || i, n = d !== void 0, D = o(
    // overflow 는 자르지 않는다. DS Tooltip 이 Portal 을 안 써서 셀 안에 그려지는데,
    // 여기서 overflow-hidden 을 걸면 툴팁까지 잘린다.
    // 옆 칸 침범은 아래 contentCls 의 min-w-0 로 막는다 (자식이 셀 폭에 맞춰 줄어듦).
    "flex min-h-9",
    t !== void 0 && "shrink-0",
    // pinned 셀은 sticky 라 스크롤되는 내용을 덮는다 → **불투명 배경 필수**.
    // 선택/hover 는 행의 group / data-state 를 CSS 로 따라가므로 클래스가 고정이다
    // (prop 으로 받으면 값이 바뀔 때마다 memo 가 깨져 그 행의 pinned 셀이 전부 리렌더된다).
    // pinned 셀은 2겹이다.
    //   바깥(이 요소): 불투명 바탕. 스크롤되는 내용을 덮는다.
    //   안쪽(아래 wrapper): 행과 동일한 상태 색 + 사용처 강조색.
    // 안쪽을 in-flow 자식으로 두는 게 핵심이다. 절대배치 자식은 서브픽셀에서 박스와
    // 어긋나 전환 중 경계가 스치고, 음수 z-index 자식은 부모 배경보다 나중에 그려져
    // 강조색을 덮어버린다.
    c && ["sticky z-10", V],
    C && "ml-auto",
    h && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    m && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
    // (그룹 middle rows 의 bg 위에 얹혀야 함)
    n && "relative z-[5]"
  ), E = o(
    // 셀은 컬럼 폭을 벗어나지 않는다. v1(<td>)이 쓰던 규칙을 그대로 가져왔다:
    //   break-all + overflow-wrap  — 긴 텍스트를 컬럼 폭에서 줄바꿈 (행 높이가 늘어남)
    //   overflow-hidden            — 그래도 넘치는 내용은 자름 (옆 칸 침범 방지)
    // v2 에 이 둘이 없어서 사용처 코드가 같은데도 텍스트가 옆 컬럼으로 흘렀다.
    //
    // min-w-0 / [&>*]:min-w-0 — flex 자식(사용처가 감싼 요소 포함)이 내용보다 작아질 수
    // 있게 한다. 없으면 말줄임(truncate) 지점이 컬럼 밖으로 밀려 잘린 채 보인다.
    // [&>*:only-child]:w-full — 자식이 하나뿐이면 셀 폭을 채운다.
    //
    // v1 은 <td> 라 블록 흐름이었다. 사용처가 <div> 로 감싸면 그 div 가 셀 폭을 채우고,
    // 안에서 text-right 를 주면 셀 오른쪽 끝에 정렬됐다. v2 는 flex 라 자식이
    // 내용 크기만큼만 차지해서, 글자 길이에 따라 행마다 위치가 어긋난다.
    // 자식이 여럿인 셀(아이콘+텍스트 등)은 지금처럼 나란히 놓아야 하므로 only-child 만.
    "flex-1 flex items-center min-w-0 [&>*]:min-w-0 [&>*:only-child]:w-full px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
    "overflow-hidden break-all [overflow-wrap:break-word]",
    z[e.align ?? "left"],
    e.editable && !a && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
  ), T = e.editable ? (B) => {
    B.stopPropagation(), a || y(l, e);
  } : void 0, b = a ? /* @__PURE__ */ r(
    S,
    {
      row: l,
      column: e,
      error: k,
      onComplete: N,
      onCancel: u,
      onClearError: w
    }
  ) : /* @__PURE__ */ r("div", { className: E, onClick: T, children: e.cell ? e.cell(l[e.accessorKey], l) : l[e.accessorKey] }), x = c ? /* @__PURE__ */ r(
    "div",
    {
      className: o(
        "flex flex-1 min-w-0 transition-colors",
        A,
        _
      ),
      children: b
    }
  ) : b;
  return /* @__PURE__ */ r(
    "div",
    {
      role: "gridcell",
      className: D,
      style: {
        width: t,
        minWidth: f,
        flex: t === void 0 ? "1 1 0" : void 0,
        left: s ? p : void 0,
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
            className: o(
              "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
              g
            ),
            style: { height: d },
            children: x
          }
        )
      ) : x
    }
  );
}
const R = K.memo(
  G
);
export {
  R as DataTableV2Cell
};
//# sourceMappingURL=data-table-v2-cell.mjs.map
