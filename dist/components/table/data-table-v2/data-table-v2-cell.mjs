import { jsx as l } from "react/jsx-runtime";
import * as K from "react";
import { cn as t } from "../../../lib/utils.mjs";
import { DataTableV2EditCell as S } from "./data-table-v2-edit-cell.mjs";
import { STICKY_CELL_BASE_BG as V, alignClass as z, ROW_BG_DESCENDANT as A } from "./constants.mjs";
function G({
  row: r,
  column: e,
  width: o,
  minWidth: x,
  leftOffset: f,
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
  onCancelEdit: D,
  onClearEditError: E
}) {
  const c = s || i, n = d !== void 0, T = t(
    // overflow 는 자르지 않는다. DS Tooltip 이 Portal 을 안 써서 셀 안에 그려지는데,
    // 여기서 overflow-hidden 을 걸면 툴팁까지 잘린다.
    // 옆 칸 침범은 아래 contentCls 의 min-w-0 로 막는다 (자식이 셀 폭에 맞춰 줄어듦).
    "flex items-center min-h-9",
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
    c && ["sticky z-10", V],
    C && "ml-auto",
    h && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    m && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
    // (그룹 middle rows 의 bg 위에 얹혀야 함)
    n && "relative z-[5]"
  ), u = t(
    // 셀은 컬럼 폭을 벗어나지 않는다. v1(<td>)이 쓰던 규칙을 그대로 가져왔다:
    //   break-all + overflow-wrap  — 긴 텍스트를 컬럼 폭에서 줄바꿈 (행 높이가 늘어남)
    //   overflow-hidden            — 그래도 넘치는 내용은 자름 (옆 칸 침범 방지)
    // v2 에 이 둘이 없어서 사용처 코드가 같은데도 텍스트가 옆 컬럼으로 흘렀다.
    //
    // min-w-0 / [&>*]:min-w-0 — flex 자식(사용처가 감싼 요소 포함)이 내용보다 작아질 수
    // 있게 한다. 없으면 말줄임(truncate) 지점이 컬럼 밖으로 밀려 잘린 채 보인다.
    // 셀 내부는 **블록 흐름**이다 (v1 <td> 와 동일).
    //
    // flex 로 두면 사용처가 넣은 <div> 가 flex 아이템이 되어 내용 크기만큼만 차지한다.
    // 그러면 그 안의 text-right 가 셀 오른쪽이 아니라 제 박스 기준이 되어, 글자 길이에
    // 따라 행마다 정렬이 어긋난다. 블록 흐름이면 <div> 는 폭을 채우고
    // <Badge> 같은 인라인 요소는 제 크기를 유지한다 — v1 과 같은 동작.
    //
    // 세로 가운데 정렬은 바깥 셀(flex items-center)이 담당한다.
    "flex-1 min-w-0 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
    "overflow-hidden break-all [overflow-wrap:break-word]",
    z[e.align ?? "left"],
    e.editable && !a && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
  ), B = e.editable ? (w) => {
    w.stopPropagation(), a || y(r, e);
  } : void 0, b = a ? /* @__PURE__ */ l(
    S,
    {
      row: r,
      column: e,
      error: k,
      onComplete: N,
      onCancel: D,
      onClearError: E
    }
  ) : /* @__PURE__ */ l("div", { className: u, onClick: B, children: e.cell ? e.cell(r[e.accessorKey], r) : r[e.accessorKey] }), p = c ? /* @__PURE__ */ l(
    "div",
    {
      className: t(
        // self-stretch — 바깥 셀이 items-center 라 이 레이어가 내용 높이만큼만 잡히면
        // 배경이 셀을 다 못 덮어 아래에 빈 띠가 남는다. 늘려서 채우고, 내용의 세로
        // 가운데 정렬은 이 레이어가 맡는다.
        "flex flex-1 min-w-0 self-stretch items-center transition-colors",
        A,
        _
      ),
      children: b
    }
  ) : b;
  return /* @__PURE__ */ l(
    "div",
    {
      role: "gridcell",
      className: T,
      style: {
        width: o,
        minWidth: x,
        flex: o === void 0 ? "1 1 0" : void 0,
        left: s ? f : void 0,
        right: i ? v : void 0
      },
      ...e.editable ? { "data-no-row-click": !0 } : {},
      children: n ? (
        // Head 셀 (rowGrouping span > 1) — 컨텐츠를 absolute 로 세로 확장.
        // outer 는 row height 유지 (다른 셀 정렬 흔들림 방지), content 만 spanHeight 만큼 뻗음.
        // border-b 로 그룹 하단 경계 표시 + bg 로 middle rows 위에 opaque 커버.
        /* @__PURE__ */ l(
          "div",
          {
            className: t(
              "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
              g
            ),
            style: { height: d },
            children: p
          }
        )
      ) : p
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
