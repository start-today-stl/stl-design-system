import { jsx as t, jsxs as I } from "react/jsx-runtime";
import * as K from "react";
import { cn as r } from "../../../lib/utils.mjs";
import { PenIcon as S } from "../../../icons/PenIcon.mjs";
import { DataTableV2EditCell as V } from "./data-table-v2-edit-cell.mjs";
import { STICKY_CELL_BASE_BG as j, alignClass as A, ROW_BG_DESCENDANT as G } from "./constants.mjs";
function L({
  row: a,
  column: e,
  width: l,
  minWidth: h,
  leftOffset: g,
  rightOffset: v,
  isLeftPinned: s,
  isRightPinned: i,
  isLeftBoundary: m,
  isRightBoundary: C,
  isFirstRightPinned: _,
  rowHighlightClass: k,
  spanHeight: c,
  headBgClass: y,
  isEditing: o,
  editingError: N,
  onStartEdit: D,
  onCompleteEdit: E,
  onCancelEdit: T,
  onClearEditError: w
}) {
  const d = s || i, n = c !== void 0, B = r(
    // items-center — 세로 가운데 정렬은 여기서 맡는다.
    // 셀 내부(contentCls)는 v1 <td> 처럼 블록 흐름이라 가로 배치에 관여하지 않는다.
    "flex items-center min-h-9",
    l !== void 0 && "shrink-0",
    // pinned 셀은 sticky 라 스크롤되는 내용을 덮는다 → **불투명 배경 필수**.
    // 선택/hover 는 행의 group / data-state 를 CSS 로 따라가므로 클래스가 고정이다
    // (prop 으로 받으면 값이 바뀔 때마다 memo 가 깨져 그 행의 pinned 셀이 전부 리렌더된다).
    // pinned 셀은 2겹이다.
    //   바깥(이 요소): 불투명 바탕. 스크롤되는 내용을 덮는다.
    //   안쪽(아래 wrapper): 행과 동일한 상태 색 + 사용처 강조색.
    // 안쪽을 in-flow 자식으로 두는 게 핵심이다. 절대배치 자식은 서브픽셀에서 박스와
    // 어긋나 전환 중 경계가 스치고, 음수 z-index 자식은 부모 배경보다 나중에 그려져
    // 강조색을 덮어버린다.
    d && ["sticky z-10", j],
    _ && "ml-auto",
    m && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    C && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
    // (그룹 middle rows 의 bg 위에 얹혀야 함)
    n && "relative z-[5]"
  ), p = r(
    // 셀 내부는 **블록 흐름**이다 (v1 <td> 와 동일). flex 로 두면 사용처가 넣은 <div> 가
    // flex 아이템이 되어 내용 크기만큼만 차지하고, 그 안의 text-right 가 셀 오른쪽이 아니라
    // 제 박스 기준이 되어 행마다 정렬이 어긋난다. 블록이면 <div> 는 폭을 채우고
    // <Badge> 같은 인라인 요소는 제 크기를 유지한다.
    //
    // 아래 두 규칙도 v1 <td> 에서 그대로 가져왔다. 없으면 텍스트가 옆 컬럼으로 흐른다.
    //   break-all + overflow-wrap  — 긴 텍스트를 컬럼 폭에서 줄바꿈 (행 높이가 늘어남)
    //   overflow-hidden            — 그래도 넘치는 내용은 자름
    "flex-1 min-w-0 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
    "overflow-hidden break-all [overflow-wrap:break-word]",
    A[e.align ?? "left"],
    // editable 셀: hover 시 파란 배경 + 펜 아이콘. self-stretch flex 로 셀 높이 전체를
    // 덮어 outer(items-center) 로 인해 위·아래에 회색 여백이 남는 문제를 없앤다.
    // dark 는 opaque blue-900 사용 — 반투명이면 아래 row hover(slate-800) 와 블렌드돼
    // 파랑·회색이 섞여 보인다. 라이트도 opaque bg-blue-50 이라 통일.
    e.editable && !o && "self-stretch flex items-center gap-1 cursor-text hover:bg-blue-50 dark:hover:bg-blue-900 group/edit"
  ), u = e.editable ? (z) => {
    z.stopPropagation(), o || D(a, e);
  } : void 0, x = e.cell ? e.cell(a[e.accessorKey], a) : a[e.accessorKey], f = o ? /* @__PURE__ */ t(
    V,
    {
      row: a,
      column: e,
      error: N,
      onComplete: E,
      onCancel: T,
      onClearError: w
    }
  ) : e.editable ? (
    // editable 셀: text 는 flex-1 로 남은 공간을 채우고 (내부에서 text-align 으로 정렬),
    // 펜 아이콘은 셀 끝(정렬 반대편)에 고정 배치 — 헤더의 sort/filter 아이콘 관례와 동일.
    //   align="left"   → 텍스트 좌측 정렬, 펜 우측 끝
    //   align="right"  → 텍스트 우측 정렬, 펜 좌측 끝
    //   align="center" → 텍스트 중앙 정렬, 펜 우측 끝
    /* @__PURE__ */ I("div", { className: p, onClick: u, children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: r(
            "min-w-0 flex-1 truncate",
            e.align === "right" && "text-right",
            e.align === "center" && "text-center"
          ),
          children: x
        }
      ),
      /* @__PURE__ */ t(
        S,
        {
          size: 20,
          className: r(
            "shrink-0 opacity-0 group-hover/edit:opacity-60 text-slate-600 dark:text-slate-400 transition-opacity",
            e.align === "right" ? "order-first" : "order-last"
          )
        }
      )
    ] })
  ) : /* @__PURE__ */ t("div", { className: p, children: x }), b = d ? /* @__PURE__ */ t(
    "div",
    {
      className: r(
        // self-stretch — 바깥 셀이 items-center 라 이 레이어가 내용 높이만큼만 잡히면
        // 배경이 셀을 다 못 덮어 아래에 빈 띠가 남는다. 늘려서 채우고, 내용의 세로
        // 가운데 정렬은 이 레이어가 맡는다.
        "flex flex-1 min-w-0 self-stretch items-center transition-colors",
        G,
        k
      ),
      children: f
    }
  ) : f;
  return /* @__PURE__ */ t(
    "div",
    {
      role: "gridcell",
      className: B,
      style: {
        width: l,
        minWidth: h,
        flex: l === void 0 ? "1 1 0" : void 0,
        left: s ? g : void 0,
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
              y
            ),
            style: { height: c },
            children: b
          }
        )
      ) : b
    }
  );
}
const q = K.memo(
  L
);
export {
  q as DataTableV2Cell
};
//# sourceMappingURL=data-table-v2-cell.mjs.map
