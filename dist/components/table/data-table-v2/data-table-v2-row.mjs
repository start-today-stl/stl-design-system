import { jsx as e, jsxs as a } from "react/jsx-runtime";
import * as c from "react";
import { useSortable as yt } from "@dnd-kit/sortable";
import { CSS as pt } from "@dnd-kit/utilities";
import { cn as o } from "../../../lib/utils.mjs";
import { Checkbox as xt } from "../../ui/checkbox.mjs";
import { DownIcon as Nt } from "../../../icons/DownIcon.mjs";
import { DragHandleIcon as zt } from "../../../icons/DragHandleIcon.mjs";
import { RightIcon as jt } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as Ct } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2Cell as Dt } from "./data-table-v2-cell.mjs";
function C() {
  return /* @__PURE__ */ e(
    "span",
    {
      "aria-hidden": !0,
      className: "absolute -bottom-px left-0 right-0 h-px bg-slate-200 dark:bg-slate-700"
    }
  );
}
function _({
  row: r,
  rowIndex: n,
  columns: v,
  leftOffsets: l,
  rightOffsets: d,
  lastLeftPinnedIdx: k,
  firstRightPinnedIdx: f,
  totalWidth: y,
  registerEl: p,
  onHover: x,
  onHeightChange: q,
  selectable: S,
  isSelected: B,
  onToggleSelect: G,
  checkboxColWidth: V,
  expandable: J,
  isExpanded: u,
  canExpand: Q,
  onToggleExpand: U,
  expandedContent: A,
  expandColWidth: X,
  visibleWidth: M,
  onRowClick: h,
  extraClassName: Y,
  editingColumnKey: Z,
  editingError: H,
  onStartEdit: tt,
  onCompleteEdit: et,
  onCancelEdit: rt,
  onClearEditError: it,
  showRowDelete: st,
  onRowDelete: D,
  rowActionsColWidth: nt,
  rowActionsColLeftOffset: ot,
  rowReorderable: R,
  dragHandleColWidth: T,
  isLast: g,
  getRowSpan: at,
  getRowSpanHeight: ct,
  getGroupHovered: lt,
  getGroupSelected: dt,
  measureRef: w,
  dataIndex: ft,
  ariaRowIndex: ut,
  sortable: s
}) {
  const O = c.useRef(null), ht = s.transform, gt = s.transition, L = s.isDragging;
  c.useLayoutEffect(() => {
    const t = O.current;
    if (!t) return;
    const i = () => q(r.id, t.offsetHeight);
    i();
    const b = new ResizeObserver(i);
    return b.observe(t), () => b.disconnect();
  }, [r.id, u]);
  const m = B ? "bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-950 group-hover:bg-blue-100 dark:group-hover:bg-blue-950" : "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-800", K = c.useRef(!1), mt = (t) => {
    t.target.closest("[data-no-row-click]") || h == null || h(r);
  }, bt = c.useCallback(
    (t) => {
      var i;
      O.current = t, (i = s.setNodeRef) == null || i.call(s, t), w && w(t), p(r.id, t);
    },
    [s, w, p, r.id]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      ref: bt,
      role: "row",
      "data-index": ft,
      "aria-rowindex": ut,
      className: o(
        "absolute left-0 right-0 flex flex-col",
        L && "z-30"
      ),
      style: {
        minWidth: y,
        // top 은 부모가 layout effect 로 직접 쓴다 (위 registerEl 주석 참고).
        // React style 객체에 top 을 두지 않으므로 React 가 값을 덮어쓰지 않는다.
        transform: ht,
        transition: gt,
        opacity: L ? 0.6 : void 0
      },
      children: [
        /* @__PURE__ */ a(
          "div",
          {
            className: o(
              // border-b 를 row 자체에 두어서 우측 empty 영역 (셀 미커버) 에도 하단 line 이 이어지게 함.
              // 마지막 row 는 외곽 컨테이너 border-bottom 과 겹쳐 2px 로 보이므로 생략.
              // rowGrouping 병합 셀 위엔 head 셀의 absolute wrapper (opaque bg) 가 border 를 자동으로 가림 → 별도 middle row 스킵 불필요.
              // `group` 클래스 — sticky 셀들이 `group-hover:` 로 row hover 반응 (state 없이 CSS 만)
              "group flex transition-colors",
              !g && "border-b border-slate-200 dark:border-slate-700",
              m,
              h && "cursor-pointer",
              Y
            ),
            onMouseEnter: x ? () => x(r.id) : void 0,
            onMouseLeave: x ? () => x(null) : void 0,
            onClick: h ? mt : void 0,
            children: [
              R && /* @__PURE__ */ a(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "relative shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    m
                  ),
                  style: { width: T, left: 0 },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(
                      "div",
                      {
                        ref: s.setActivatorNodeRef,
                        className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": "행 순서 변경",
                        ...s.listeners ?? {},
                        ...s.attributes ?? {},
                        children: /* @__PURE__ */ e(zt, { size: 16 })
                      }
                    ),
                    !g && /* @__PURE__ */ e(C, {})
                  ]
                }
              ),
              S && /* @__PURE__ */ a(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "relative shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    m
                  ),
                  style: {
                    width: V,
                    left: R ? T : 0
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(
                      xt,
                      {
                        checked: B,
                        onClick: (t) => {
                          K.current = t.shiftKey;
                        },
                        onCheckedChange: () => {
                          G(r.id, n, K.current), K.current = !1;
                        },
                        "aria-label": `행 ${r.id} 선택`
                      }
                    ),
                    !g && /* @__PURE__ */ e(C, {})
                  ]
                }
              ),
              J && /* @__PURE__ */ a(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "relative shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    m
                  ),
                  style: {
                    width: X,
                    left: (R ? T : 0) + (S ? V : 0)
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    Q && /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: () => U(r.id),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": u ? "행 접기" : "행 펼치기",
                        "aria-expanded": u,
                        children: u ? /* @__PURE__ */ e(Nt, { size: 24 }) : /* @__PURE__ */ e(jt, { size: 24 })
                      }
                    ),
                    !g && /* @__PURE__ */ e(C, {})
                  ]
                }
              ),
              st && /* @__PURE__ */ a(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "relative shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    m
                  ),
                  style: { width: nt, left: ot },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: () => D == null ? void 0 : D(r),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": "행 삭제",
                        children: /* @__PURE__ */ e(Ct, { size: 20 })
                      }
                    ),
                    !g && /* @__PURE__ */ e(C, {})
                  ]
                }
              ),
              v.map((t, i) => {
                const b = t.id ?? String(t.accessorKey), N = typeof t.width == "number" ? t.width : void 0, $ = typeof t.minWidth == "number" ? t.minWidth : void 0, z = t.pinned === "left", j = t.pinned === "right", vt = z || j, E = i === f, P = at(n, t.accessorKey);
                if (P === 0)
                  return /* @__PURE__ */ e(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: o(
                        N !== void 0 && "shrink-0",
                        vt && "sticky z-10",
                        E && "ml-auto"
                      ),
                      style: {
                        width: N,
                        minWidth: $,
                        flex: N === void 0 ? "1 1 0" : void 0,
                        left: z ? l[i] : void 0,
                        right: j ? d[i] : void 0
                      }
                    },
                    b
                  );
                const F = P !== void 0 && P > 1 ? ct(n, t.accessorKey) : void 0, kt = (() => {
                  if (F === void 0) return;
                  const W = lt(n, t.accessorKey);
                  return dt(n, t.accessorKey) ? W ? "bg-blue-100 dark:bg-blue-950" : "bg-blue-50 dark:bg-blue-900" : W ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900";
                })(), I = Z === t.accessorKey;
                return /* @__PURE__ */ e(
                  Dt,
                  {
                    row: r,
                    column: t,
                    width: N,
                    minWidth: $,
                    leftOffset: z ? l[i] : void 0,
                    rightOffset: j ? d[i] : void 0,
                    isLeftPinned: z,
                    isRightPinned: j,
                    isLeftBoundary: i === k,
                    isRightBoundary: i === f,
                    isFirstRightPinned: E,
                    spanHeight: F,
                    headBgClass: kt,
                    isEditing: I,
                    editingError: I ? H : void 0,
                    onStartEdit: tt,
                    onCompleteEdit: et,
                    onCancelEdit: rt,
                    onClearEditError: it
                  },
                  b
                );
              })
            ]
          }
        ),
        u && A && /* @__PURE__ */ e(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700",
            children: /* @__PURE__ */ e(
              "div",
              {
                className: "sticky left-0 overflow-x-auto",
                style: M ? { width: M, maxWidth: "100%" } : void 0,
                children: A
              }
            )
          }
        )
      ]
    }
  );
}
function Rt(r) {
  const { setNodeRef: n, setActivatorNodeRef: v, listeners: l, attributes: d, transform: k, transition: f, isDragging: y } = yt({ id: `row-${r.row.id}` }), p = c.useMemo(
    () => ({
      setNodeRef: n,
      setActivatorNodeRef: v,
      listeners: l,
      attributes: d,
      transform: pt.Transform.toString(k) ?? void 0,
      transition: f,
      isDragging: y
    }),
    [n, v, l, d, k, f, y]
  );
  return /* @__PURE__ */ e(_, { ...r, sortable: p });
}
const Tt = { isDragging: !1 };
function wt(r) {
  return r.rowReorderable ? /* @__PURE__ */ e(Rt, { ...r }) : /* @__PURE__ */ e(_, { ...r, sortable: Tt });
}
const Ft = c.memo(wt);
export {
  Ft as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
