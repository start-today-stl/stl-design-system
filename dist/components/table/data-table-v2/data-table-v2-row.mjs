import { jsx as t, jsxs as o } from "react/jsx-runtime";
import * as c from "react";
import { useSortable as ke } from "@dnd-kit/sortable";
import { CSS as ye } from "@dnd-kit/utilities";
import { cn as n } from "../../../lib/utils.mjs";
import { Checkbox as pe } from "../../ui/checkbox.mjs";
import { DownIcon as xe } from "../../../icons/DownIcon.mjs";
import { DragHandleIcon as Ne } from "../../../icons/DragHandleIcon.mjs";
import { RightIcon as ze } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as je } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2Cell as De } from "./data-table-v2-cell.mjs";
function j() {
  return /* @__PURE__ */ t(
    "span",
    {
      "aria-hidden": !0,
      className: "absolute -bottom-px left-0 right-0 h-px bg-slate-200 dark:bg-slate-700"
    }
  );
}
function W({
  row: i,
  rowIndex: a,
  columns: b,
  leftOffsets: l,
  rightOffsets: d,
  lastLeftPinnedIdx: v,
  firstRightPinnedIdx: f,
  totalWidth: k,
  registerEl: y,
  onHover: p,
  onHeightChange: _,
  selectable: P,
  isSelected: S,
  onToggleSelect: q,
  checkboxColWidth: B,
  expandable: G,
  isExpanded: h,
  canExpand: J,
  onToggleExpand: Q,
  expandedContent: V,
  expandColWidth: U,
  visibleWidth: A,
  onRowClick: u,
  extraClassName: X,
  editingColumnKey: Y,
  editingError: Z,
  onStartEdit: H,
  onCompleteEdit: ee,
  onCancelEdit: te,
  onClearEditError: ie,
  showRowDelete: re,
  onRowDelete: D,
  rowActionsColWidth: se,
  rowActionsColLeftOffset: ae,
  rowReorderable: R,
  dragHandleColWidth: T,
  isLast: m,
  getRowSpan: ne,
  getRowSpanHeight: oe,
  getGroupHovered: ce,
  getGroupSelected: le,
  measureRef: w,
  dataIndex: de,
  ariaRowIndex: fe,
  sortable: s
}) {
  const M = c.useRef(null), he = s.transform, ue = s.transition, O = s.isDragging;
  c.useLayoutEffect(() => {
    const e = M.current;
    if (!e) return;
    const r = () => _(i.id, e.offsetHeight);
    r();
    const g = new ResizeObserver(r);
    return g.observe(e), () => g.disconnect();
  }, [i.id, h]);
  const C = c.useRef(!1), me = (e) => {
    e.target.closest("[data-no-row-click]") || u == null || u(i);
  }, ge = c.useCallback(
    (e) => {
      var r;
      M.current = e, (r = s.setNodeRef) == null || r.call(s, e), w && w(e), y(i.id, e);
    },
    [s, w, y, i.id]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      ref: ge,
      role: "row",
      "data-index": de,
      "aria-rowindex": fe,
      className: n(
        "absolute left-0 right-0 flex flex-col",
        O && "z-30"
      ),
      style: {
        minWidth: k,
        // top 은 부모가 layout effect 로 직접 쓴다 (위 registerEl 주석 참고).
        // React style 객체에 top 을 두지 않으므로 React 가 값을 덮어쓰지 않는다.
        transform: he,
        transition: ue,
        opacity: O ? 0.6 : void 0
      },
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            "data-state": S ? "selected" : void 0,
            className: n(
              // border-b 를 row 자체에 두어서 우측 empty 영역 (셀 미커버) 에도 하단 line 이 이어지게 함.
              // 마지막 row 는 외곽 컨테이너 border-bottom 과 겹쳐 2px 로 보이므로 생략.
              // rowGrouping 병합 셀 위엔 head 셀의 absolute wrapper (opaque bg) 가 border 를 자동으로 가림 → 별도 middle row 스킵 불필요.
              // `group` 클래스 — sticky 셀들이 `group-hover:` 로 row hover 반응 (state 없이 CSS 만)
              "group flex transition-colors",
              !m && "border-b border-slate-200 dark:border-slate-700",
              "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
              "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
              "data-[state=selected]:hover:bg-blue-100 dark:data-[state=selected]:hover:bg-blue-950",
              u && "cursor-pointer",
              X
            ),
            onMouseEnter: p ? () => p(i.id) : void 0,
            onMouseLeave: p ? () => p(null) : void 0,
            onClick: u ? me : void 0,
            children: [
              R && /* @__PURE__ */ o(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: n(
                    // 행 배경을 CSS 상속으로 가져온다. bgClass 를 직접 박으면 사용처의
                    // rowClassName 배경(예: 미출고 행 강조)이 컨트롤 셀에만 반영되지 않는다.
                    "relative shrink-0 sticky z-10 flex items-center justify-center min-h-9 bg-inherit"
                  ),
                  style: { width: T, left: 0 },
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
                        children: /* @__PURE__ */ t(Ne, { size: 16 })
                      }
                    ),
                    !m && /* @__PURE__ */ t(j, {})
                  ]
                }
              ),
              P && /* @__PURE__ */ o(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: n(
                    // 행 배경을 CSS 상속으로 가져온다. bgClass 를 직접 박으면 사용처의
                    // rowClassName 배경(예: 미출고 행 강조)이 컨트롤 셀에만 반영되지 않는다.
                    "relative shrink-0 sticky z-10 flex items-center justify-center min-h-9 bg-inherit"
                  ),
                  style: {
                    width: B,
                    left: R ? T : 0
                  },
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(
                      pe,
                      {
                        checked: S,
                        onClick: (e) => {
                          C.current = e.shiftKey;
                        },
                        onCheckedChange: () => {
                          q(i.id, a, C.current), C.current = !1;
                        },
                        "aria-label": `행 ${i.id} 선택`
                      }
                    ),
                    !m && /* @__PURE__ */ t(j, {})
                  ]
                }
              ),
              G && /* @__PURE__ */ o(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: n(
                    // 행 배경을 CSS 상속으로 가져온다. bgClass 를 직접 박으면 사용처의
                    // rowClassName 배경(예: 미출고 행 강조)이 컨트롤 셀에만 반영되지 않는다.
                    "relative shrink-0 sticky z-10 flex items-center justify-center min-h-9 bg-inherit"
                  ),
                  style: {
                    width: U,
                    left: (R ? T : 0) + (P ? B : 0)
                  },
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    J && /* @__PURE__ */ t(
                      "button",
                      {
                        type: "button",
                        onClick: () => Q(i.id),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": h ? "행 접기" : "행 펼치기",
                        "aria-expanded": h,
                        children: h ? /* @__PURE__ */ t(xe, { size: 24 }) : /* @__PURE__ */ t(ze, { size: 24 })
                      }
                    ),
                    !m && /* @__PURE__ */ t(j, {})
                  ]
                }
              ),
              re && /* @__PURE__ */ o(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: n(
                    // 행 배경을 CSS 상속으로 가져온다. bgClass 를 직접 박으면 사용처의
                    // rowClassName 배경(예: 미출고 행 강조)이 컨트롤 셀에만 반영되지 않는다.
                    "relative shrink-0 sticky z-10 flex items-center justify-center min-h-9 bg-inherit"
                  ),
                  style: { width: se, left: ae },
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t(
                      "button",
                      {
                        type: "button",
                        onClick: () => D == null ? void 0 : D(i),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": "행 삭제",
                        children: /* @__PURE__ */ t(je, { size: 20 })
                      }
                    ),
                    !m && /* @__PURE__ */ t(j, {})
                  ]
                }
              ),
              b.map((e, r) => {
                const g = e.id ?? String(e.accessorKey), x = typeof e.width == "number" ? e.width : void 0, L = typeof e.minWidth == "number" ? e.minWidth : void 0, N = e.pinned === "left", z = e.pinned === "right", be = N || z, $ = r === f, K = ne(a, e.accessorKey);
                if (K === 0)
                  return /* @__PURE__ */ t(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: n(
                        x !== void 0 && "shrink-0",
                        be && "sticky z-10",
                        $ && "ml-auto"
                      ),
                      style: {
                        width: x,
                        minWidth: L,
                        flex: x === void 0 ? "1 1 0" : void 0,
                        left: N ? l[r] : void 0,
                        right: z ? d[r] : void 0
                      }
                    },
                    g
                  );
                const E = K !== void 0 && K > 1 ? oe(a, e.accessorKey) : void 0, ve = (() => {
                  if (E === void 0) return;
                  const I = ce(a, e.accessorKey);
                  return le(a, e.accessorKey) ? I ? "bg-blue-100 dark:bg-blue-950" : "bg-blue-50 dark:bg-blue-900" : I ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900";
                })(), F = Y === e.accessorKey;
                return /* @__PURE__ */ t(
                  De,
                  {
                    row: i,
                    column: e,
                    width: x,
                    minWidth: L,
                    leftOffset: N ? l[r] : void 0,
                    rightOffset: z ? d[r] : void 0,
                    isLeftPinned: N,
                    isRightPinned: z,
                    isLeftBoundary: r === v,
                    isRightBoundary: r === f,
                    isFirstRightPinned: $,
                    spanHeight: E,
                    headBgClass: ve,
                    isEditing: F,
                    editingError: F ? Z : void 0,
                    onStartEdit: H,
                    onCompleteEdit: ee,
                    onCancelEdit: te,
                    onClearEditError: ie
                  },
                  g
                );
              })
            ]
          }
        ),
        h && V && /* @__PURE__ */ t(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700",
            children: /* @__PURE__ */ t(
              "div",
              {
                className: "sticky left-0 overflow-x-auto p-4",
                style: A ? { width: A, maxWidth: "100%" } : void 0,
                children: V
              }
            )
          }
        )
      ]
    }
  );
}
function Re(i) {
  const { setNodeRef: a, setActivatorNodeRef: b, listeners: l, attributes: d, transform: v, transition: f, isDragging: k } = ke({ id: `row-${i.row.id}` }), y = c.useMemo(
    () => ({
      setNodeRef: a,
      setActivatorNodeRef: b,
      listeners: l,
      attributes: d,
      transform: ye.Transform.toString(v) ?? void 0,
      transition: f,
      isDragging: k
    }),
    [a, b, l, d, v, f, k]
  );
  return /* @__PURE__ */ t(W, { ...i, sortable: y });
}
const Te = { isDragging: !1 };
function we(i) {
  return i.rowReorderable ? /* @__PURE__ */ t(Re, { ...i }) : /* @__PURE__ */ t(W, { ...i, sortable: Te });
}
const Ee = c.memo(we);
export {
  Ee as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
