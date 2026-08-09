import { jsx as e, jsxs as c } from "react/jsx-runtime";
import * as l from "react";
import { useSortable as pt } from "@dnd-kit/sortable";
import { CSS as Nt } from "@dnd-kit/utilities";
import { cn as o } from "../../../lib/utils.mjs";
import { Checkbox as xt } from "../../ui/checkbox.mjs";
import { DownIcon as St } from "../../../icons/DownIcon.mjs";
import { DragHandleIcon as Tt } from "../../../icons/DragHandleIcon.mjs";
import { RightIcon as Dt } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as Rt } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2Cell as Ct } from "./data-table-v2-cell.mjs";
import { ROW_BG_SELF as Kt, ROW_BG_DESCENDANT as wt, STICKY_CELL_BASE_BG as Bt } from "./constants.mjs";
const D = o(
  "relative shrink-0 sticky z-10 flex min-h-9",
  Bt
);
function R({
  highlight: i,
  children: n
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: o(
        "flex flex-1 items-center justify-center transition-colors",
        wt,
        i
      ),
      children: n
    }
  );
}
function C() {
  return /* @__PURE__ */ e(
    "span",
    {
      "aria-hidden": !0,
      className: "absolute -bottom-px left-0 right-0 h-px bg-slate-200 dark:bg-slate-700"
    }
  );
}
function q({
  row: i,
  rowIndex: n,
  columns: b,
  leftOffsets: d,
  rightOffsets: f,
  lastLeftPinnedIdx: y,
  firstRightPinnedIdx: h,
  totalWidth: k,
  registerEl: p,
  onHover: N,
  onHeightChange: J,
  selectable: L,
  isSelected: P,
  onToggleSelect: Q,
  checkboxColWidth: j,
  expandable: U,
  isExpanded: u,
  canExpand: X,
  onToggleExpand: Z,
  expandedContent: A,
  expandColWidth: H,
  visibleWidth: O,
  onRowClick: g,
  extraClassName: a,
  editingColumnKey: tt,
  editingError: et,
  onStartEdit: it,
  onCompleteEdit: rt,
  onCancelEdit: nt,
  onClearEditError: st,
  showRowDelete: ot,
  onRowDelete: K,
  rowActionsColWidth: at,
  rowActionsColLeftOffset: ct,
  rowReorderable: w,
  dragHandleColWidth: B,
  isLast: m,
  getRowSpan: lt,
  getRowSpanHeight: dt,
  getGroupHovered: ft,
  getGroupSelected: ht,
  measureRef: _,
  dataIndex: ut,
  ariaRowIndex: gt,
  sortable: s
}) {
  const V = l.useRef(null), mt = s.transform, vt = s.transition, I = s.isDragging;
  l.useLayoutEffect(() => {
    const t = V.current;
    if (!t) return;
    const r = () => J(i.id, t.offsetHeight);
    r();
    const v = new ResizeObserver(r);
    return v.observe(t), () => v.disconnect();
  }, [i.id, u]);
  const z = l.useRef(!1), bt = (t) => {
    t.target.closest("[data-no-row-click]") || g == null || g(i);
  }, yt = l.useCallback(
    (t) => {
      var r;
      V.current = t, (r = s.setNodeRef) == null || r.call(s, t), _ && _(t), p(i.id, t);
    },
    [s, _, p, i.id]
  );
  return /* @__PURE__ */ c(
    "div",
    {
      ref: yt,
      role: "row",
      "data-index": ut,
      "aria-rowindex": gt,
      className: o(
        "absolute left-0 right-0 flex flex-col",
        I && "z-30"
      ),
      style: {
        minWidth: k,
        // top 은 부모가 layout effect 로 직접 쓴다 (위 registerEl 주석 참고).
        // React style 객체에 top 을 두지 않으므로 React 가 값을 덮어쓰지 않는다.
        transform: mt,
        transition: vt,
        opacity: I ? 0.6 : void 0
      },
      children: [
        /* @__PURE__ */ c(
          "div",
          {
            "data-state": P ? "selected" : void 0,
            className: o(
              // border-b 를 row 자체에 두어서 우측 empty 영역 (셀 미커버) 에도 하단 line 이 이어지게 함.
              // 마지막 row 는 외곽 컨테이너 border-bottom 과 겹쳐 2px 로 보이므로 생략.
              // rowGrouping 병합 셀 위엔 head 셀의 absolute wrapper (opaque bg) 가 border 를 자동으로 가림 → 별도 middle row 스킵 불필요.
              // `group` 클래스 — sticky 셀들이 `group-hover:` 로 row hover 반응 (state 없이 CSS 만)
              "group flex transition-colors",
              !m && "border-b border-slate-200 dark:border-slate-700",
              Kt,
              g && "cursor-pointer",
              a
            ),
            onMouseEnter: N ? () => N(i.id) : void 0,
            onMouseLeave: N ? () => N(null) : void 0,
            onClick: g ? bt : void 0,
            children: [
              w && /* @__PURE__ */ c(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    D
                  ),
                  style: { width: B, left: 0 },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(R, { highlight: a, children: /* @__PURE__ */ e(
                      "div",
                      {
                        ref: s.setActivatorNodeRef,
                        className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": "행 순서 변경",
                        ...s.listeners ?? {},
                        ...s.attributes ?? {},
                        children: /* @__PURE__ */ e(Tt, { size: 16 })
                      }
                    ) }),
                    !m && /* @__PURE__ */ e(C, {})
                  ]
                }
              ),
              L && /* @__PURE__ */ c(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    D
                  ),
                  style: {
                    width: j,
                    left: w ? B : 0
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(R, { highlight: a, children: /* @__PURE__ */ e(
                      xt,
                      {
                        checked: P,
                        onClick: (t) => {
                          z.current = t.shiftKey;
                        },
                        onCheckedChange: () => {
                          Q(i.id, n, z.current), z.current = !1;
                        },
                        "aria-label": `행 ${i.id} 선택`
                      }
                    ) }),
                    !m && /* @__PURE__ */ e(C, {})
                  ]
                }
              ),
              U && /* @__PURE__ */ c(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    D
                  ),
                  style: {
                    width: H,
                    left: (w ? B : 0) + (L ? j : 0)
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(R, { highlight: a, children: X && /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: () => Z(i.id),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": u ? "행 접기" : "행 펼치기",
                        "aria-expanded": u,
                        children: u ? /* @__PURE__ */ e(St, { size: 24 }) : /* @__PURE__ */ e(Dt, { size: 24 })
                      }
                    ) }),
                    !m && /* @__PURE__ */ e(C, {})
                  ]
                }
              ),
              ot && /* @__PURE__ */ c(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    D
                  ),
                  style: { width: at, left: ct },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(R, { highlight: a, children: /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: () => K == null ? void 0 : K(i),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": "행 삭제",
                        children: /* @__PURE__ */ e(Rt, { size: 20 })
                      }
                    ) }),
                    !m && /* @__PURE__ */ e(C, {})
                  ]
                }
              ),
              b.map((t, r) => {
                const v = t.id ?? String(t.accessorKey), x = typeof t.width == "number" ? t.width : void 0, G = typeof t.minWidth == "number" ? t.minWidth : void 0, S = t.pinned === "left", T = t.pinned === "right", M = S || T, W = r === h, E = lt(n, t.accessorKey);
                if (E === 0)
                  return /* @__PURE__ */ e(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: o(
                        x !== void 0 && "shrink-0",
                        M && "sticky z-10",
                        W && "ml-auto"
                      ),
                      style: {
                        width: x,
                        minWidth: G,
                        flex: x === void 0 ? "1 1 0" : void 0,
                        left: S ? d[r] : void 0,
                        right: T ? f[r] : void 0
                      }
                    },
                    v
                  );
                const F = E !== void 0 && E > 1 ? dt(n, t.accessorKey) : void 0, kt = (() => {
                  if (F === void 0) return;
                  const $ = ft(n, t.accessorKey);
                  return ht(n, t.accessorKey) ? $ ? "bg-blue-100 dark:bg-blue-950" : "bg-blue-50 dark:bg-blue-900" : $ ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900";
                })(), Y = tt === t.accessorKey;
                return /* @__PURE__ */ e(
                  Ct,
                  {
                    row: i,
                    column: t,
                    width: x,
                    minWidth: G,
                    leftOffset: S ? d[r] : void 0,
                    rightOffset: T ? f[r] : void 0,
                    isLeftPinned: S,
                    isRightPinned: T,
                    isLeftBoundary: r === y,
                    isRightBoundary: r === h,
                    isFirstRightPinned: W,
                    rowHighlightClass: M ? a : void 0,
                    spanHeight: F,
                    headBgClass: kt,
                    isEditing: Y,
                    editingError: Y ? et : void 0,
                    onStartEdit: it,
                    onCompleteEdit: rt,
                    onCancelEdit: nt,
                    onClearEditError: st
                  },
                  v
                );
              })
            ]
          }
        ),
        u && A && /* @__PURE__ */ e(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-white dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700",
            children: /* @__PURE__ */ e(
              "div",
              {
                className: "sticky left-0 overflow-x-auto p-4",
                style: O ? { width: O, maxWidth: "100%" } : void 0,
                children: A
              }
            )
          }
        )
      ]
    }
  );
}
function _t(i) {
  const { setNodeRef: n, setActivatorNodeRef: b, listeners: d, attributes: f, transform: y, transition: h, isDragging: k } = pt({ id: `row-${i.row.id}` }), p = l.useMemo(
    () => ({
      setNodeRef: n,
      setActivatorNodeRef: b,
      listeners: d,
      attributes: f,
      transform: Nt.Transform.toString(y) ?? void 0,
      transition: h,
      isDragging: k
    }),
    [n, b, d, f, y, h, k]
  );
  return /* @__PURE__ */ e(q, { ...i, sortable: p });
}
const zt = { isDragging: !1 };
function Et(i) {
  return i.rowReorderable ? /* @__PURE__ */ e(_t, { ...i }) : /* @__PURE__ */ e(q, { ...i, sortable: zt });
}
const $t = l.memo(Et);
export {
  $t as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
