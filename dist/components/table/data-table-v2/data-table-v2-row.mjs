import { jsx as t, jsxs as d } from "react/jsx-runtime";
import * as l from "react";
import { useSortable as ye } from "@dnd-kit/sortable";
import { CSS as Ne } from "@dnd-kit/utilities";
import { cn as a } from "../../../lib/utils.mjs";
import { Checkbox as xe } from "../../ui/checkbox.mjs";
import { DownIcon as we } from "../../../icons/DownIcon.mjs";
import { DragHandleIcon as Te } from "../../../icons/DragHandleIcon.mjs";
import { RightIcon as De } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as Ke } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2Cell as Re } from "./data-table-v2-cell.mjs";
const D = a(
  "relative shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
  // 선택+hover 는 arbitrary group 변이로 한 셀렉터에 담는다 (data cell 주석 참고)
  "bg-white dark:bg-slate-900",
  "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
  "group-[[data-state=selected]]:bg-blue-50 dark:group-[[data-state=selected]]:bg-blue-900",
  "group-[[data-state=selected]:hover]:bg-blue-100 dark:group-[[data-state=selected]:hover]:bg-blue-950"
);
function K({ className: r }) {
  return r ? /* @__PURE__ */ t(
    "span",
    {
      "aria-hidden": !0,
      className: a(
        // hover / 선택 시에는 감춘다. 행 배경이 hover·선택 색으로 바뀌면서
        // 강조색을 대체하기 때문 (일반 셀에서 tailwind-merge 가 만드는 동작과 동일).
        "absolute inset-0 pointer-events-none",
        "group-hover:hidden group-[[data-state=selected]]:hidden",
        r
      )
    }
  ) : null;
}
function R() {
  return /* @__PURE__ */ t(
    "span",
    {
      "aria-hidden": !0,
      className: "absolute -bottom-px left-0 right-0 h-px bg-slate-200 dark:bg-slate-700"
    }
  );
}
function q({
  row: r,
  rowIndex: o,
  columns: v,
  leftOffsets: c,
  rightOffsets: u,
  lastLeftPinnedIdx: k,
  firstRightPinnedIdx: g,
  totalWidth: p,
  registerEl: y,
  onHover: N,
  onHeightChange: H,
  selectable: V,
  isSelected: L,
  onToggleSelect: J,
  checkboxColWidth: A,
  expandable: Q,
  isExpanded: h,
  canExpand: U,
  onToggleExpand: X,
  expandedContent: M,
  expandColWidth: Z,
  visibleWidth: O,
  onRowClick: f,
  extraClassName: n,
  editingColumnKey: ee,
  editingError: te,
  onStartEdit: re,
  onCompleteEdit: ie,
  onCancelEdit: se,
  onClearEditError: ae,
  showRowDelete: oe,
  onRowDelete: S,
  rowActionsColWidth: ne,
  rowActionsColLeftOffset: de,
  rowReorderable: z,
  dragHandleColWidth: C,
  isLast: b,
  getRowSpan: le,
  getRowSpanHeight: ce,
  getGroupHovered: ue,
  getGroupSelected: ge,
  measureRef: P,
  dataIndex: he,
  ariaRowIndex: fe,
  sortable: s
}) {
  const _ = l.useRef(null), be = s.transform, me = s.transition, E = s.isDragging;
  l.useLayoutEffect(() => {
    const e = _.current;
    if (!e) return;
    const i = () => H(r.id, e.offsetHeight);
    i();
    const m = new ResizeObserver(i);
    return m.observe(e), () => m.disconnect();
  }, [r.id, h]);
  const j = l.useRef(!1), ve = (e) => {
    e.target.closest("[data-no-row-click]") || f == null || f(r);
  }, ke = l.useCallback(
    (e) => {
      var i;
      _.current = e, (i = s.setNodeRef) == null || i.call(s, e), P && P(e), y(r.id, e);
    },
    [s, P, y, r.id]
  );
  return /* @__PURE__ */ d(
    "div",
    {
      ref: ke,
      role: "row",
      "data-index": he,
      "aria-rowindex": fe,
      className: a(
        "absolute left-0 right-0 flex flex-col",
        E && "z-30"
      ),
      style: {
        minWidth: p,
        // top 은 부모가 layout effect 로 직접 쓴다 (위 registerEl 주석 참고).
        // React style 객체에 top 을 두지 않으므로 React 가 값을 덮어쓰지 않는다.
        transform: be,
        transition: me,
        opacity: E ? 0.6 : void 0
      },
      children: [
        /* @__PURE__ */ d(
          "div",
          {
            "data-state": L ? "selected" : void 0,
            className: a(
              // border-b 를 row 자체에 두어서 우측 empty 영역 (셀 미커버) 에도 하단 line 이 이어지게 함.
              // 마지막 row 는 외곽 컨테이너 border-bottom 과 겹쳐 2px 로 보이므로 생략.
              // rowGrouping 병합 셀 위엔 head 셀의 absolute wrapper (opaque bg) 가 border 를 자동으로 가림 → 별도 middle row 스킵 불필요.
              // `group` 클래스 — sticky 셀들이 `group-hover:` 로 row hover 반응 (state 없이 CSS 만)
              "group flex transition-colors",
              !b && "border-b border-slate-200 dark:border-slate-700",
              "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
              "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
              "data-[state=selected]:hover:bg-blue-100 dark:data-[state=selected]:hover:bg-blue-950",
              f && "cursor-pointer",
              n
            ),
            onMouseEnter: N ? () => N(r.id) : void 0,
            onMouseLeave: N ? () => N(null) : void 0,
            onClick: f ? ve : void 0,
            children: [
              z && /* @__PURE__ */ d(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: a(
                    // sticky 라 스크롤 내용을 덮는다 → 불투명 배경 필수.
                    // 사용처 강조색(반투명일 수 있음)은 아래 오버레이로 얹는다.
                    D
                  ),
                  style: { width: C, left: 0 },
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(
                      "div",
                      {
                        ref: s.setActivatorNodeRef,
                        className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": "행 순서 변경",
                        ...s.listeners ?? {},
                        ...s.attributes ?? {},
                        children: /* @__PURE__ */ t(Te, { size: 16 })
                      }
                    ),
                    /* @__PURE__ */ t(K, { className: n }),
                    !b && /* @__PURE__ */ t(R, {})
                  ]
                }
              ),
              V && /* @__PURE__ */ d(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: a(
                    // sticky 라 스크롤 내용을 덮는다 → 불투명 배경 필수.
                    // 사용처 강조색(반투명일 수 있음)은 아래 오버레이로 얹는다.
                    D
                  ),
                  style: {
                    width: A,
                    left: z ? C : 0
                  },
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(
                      xe,
                      {
                        checked: L,
                        onClick: (e) => {
                          j.current = e.shiftKey;
                        },
                        onCheckedChange: () => {
                          J(r.id, o, j.current), j.current = !1;
                        },
                        "aria-label": `행 ${r.id} 선택`
                      }
                    ),
                    /* @__PURE__ */ t(K, { className: n }),
                    !b && /* @__PURE__ */ t(R, {})
                  ]
                }
              ),
              Q && /* @__PURE__ */ d(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: a(
                    // sticky 라 스크롤 내용을 덮는다 → 불투명 배경 필수.
                    // 사용처 강조색(반투명일 수 있음)은 아래 오버레이로 얹는다.
                    D
                  ),
                  style: {
                    width: Z,
                    left: (z ? C : 0) + (V ? A : 0)
                  },
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    U && /* @__PURE__ */ t(
                      "button",
                      {
                        type: "button",
                        onClick: () => X(r.id),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": h ? "행 접기" : "행 펼치기",
                        "aria-expanded": h,
                        children: h ? /* @__PURE__ */ t(we, { size: 24 }) : /* @__PURE__ */ t(De, { size: 24 })
                      }
                    ),
                    /* @__PURE__ */ t(K, { className: n }),
                    !b && /* @__PURE__ */ t(R, {})
                  ]
                }
              ),
              oe && /* @__PURE__ */ d(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: a(
                    // sticky 라 스크롤 내용을 덮는다 → 불투명 배경 필수.
                    // 사용처 강조색(반투명일 수 있음)은 아래 오버레이로 얹는다.
                    D
                  ),
                  style: { width: ne, left: de },
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(
                      "button",
                      {
                        type: "button",
                        onClick: () => S == null ? void 0 : S(r),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": "행 삭제",
                        children: /* @__PURE__ */ t(Ke, { size: 20 })
                      }
                    ),
                    /* @__PURE__ */ t(K, { className: n }),
                    !b && /* @__PURE__ */ t(R, {})
                  ]
                }
              ),
              v.map((e, i) => {
                const m = e.id ?? String(e.accessorKey), x = typeof e.width == "number" ? e.width : void 0, I = typeof e.minWidth == "number" ? e.minWidth : void 0, w = e.pinned === "left", T = e.pinned === "right", $ = w || T, F = i === g, B = le(o, e.accessorKey);
                if (B === 0)
                  return /* @__PURE__ */ t(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: a(
                        x !== void 0 && "shrink-0",
                        $ && "sticky z-10",
                        F && "ml-auto"
                      ),
                      style: {
                        width: x,
                        minWidth: I,
                        flex: x === void 0 ? "1 1 0" : void 0,
                        left: w ? c[i] : void 0,
                        right: T ? u[i] : void 0
                      }
                    },
                    m
                  );
                const G = B !== void 0 && B > 1 ? ce(o, e.accessorKey) : void 0, pe = (() => {
                  if (G === void 0) return;
                  const Y = ue(o, e.accessorKey);
                  return ge(o, e.accessorKey) ? Y ? "bg-blue-100 dark:bg-blue-950" : "bg-blue-50 dark:bg-blue-900" : Y ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900";
                })(), W = ee === e.accessorKey;
                return /* @__PURE__ */ t(
                  Re,
                  {
                    row: r,
                    column: e,
                    width: x,
                    minWidth: I,
                    leftOffset: w ? c[i] : void 0,
                    rightOffset: T ? u[i] : void 0,
                    isLeftPinned: w,
                    isRightPinned: T,
                    isLeftBoundary: i === k,
                    isRightBoundary: i === g,
                    isFirstRightPinned: F,
                    rowHighlightClass: $ ? n : void 0,
                    spanHeight: G,
                    headBgClass: pe,
                    isEditing: W,
                    editingError: W ? te : void 0,
                    onStartEdit: re,
                    onCompleteEdit: ie,
                    onCancelEdit: se,
                    onClearEditError: ae
                  },
                  m
                );
              })
            ]
          }
        ),
        h && M && /* @__PURE__ */ t(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-white dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700",
            children: /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 overflow-x-auto p-4",
                style: O ? { width: O, maxWidth: "100%" } : void 0,
                children: M
              }
            )
          }
        )
      ]
    }
  );
}
function Se(r) {
  const { setNodeRef: o, setActivatorNodeRef: v, listeners: c, attributes: u, transform: k, transition: g, isDragging: p } = ye({ id: `row-${r.row.id}` }), y = l.useMemo(
    () => ({
      setNodeRef: o,
      setActivatorNodeRef: v,
      listeners: c,
      attributes: u,
      transform: Ne.Transform.toString(k) ?? void 0,
      transition: g,
      isDragging: p
    }),
    [o, v, c, u, k, g, p]
  );
  return /* @__PURE__ */ t(q, { ...r, sortable: y });
}
const ze = { isDragging: !1 };
function Ce(r) {
  return r.rowReorderable ? /* @__PURE__ */ t(Se, { ...r }) : /* @__PURE__ */ t(q, { ...r, sortable: ze });
}
const $e = l.memo(Ce);
export {
  $e as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
