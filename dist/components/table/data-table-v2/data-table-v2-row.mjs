import { jsx as e, jsxs as d } from "react/jsx-runtime";
import * as c from "react";
import { useSortable as Nt } from "@dnd-kit/sortable";
import { CSS as St } from "@dnd-kit/utilities";
import { cn as o } from "../../../lib/utils.mjs";
import { Checkbox as xt } from "../../ui/checkbox.mjs";
import { DownIcon as Ct } from "../../../icons/DownIcon.mjs";
import { DragHandleIcon as Tt } from "../../../icons/DragHandleIcon.mjs";
import { RightIcon as Dt } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as Kt } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2Cell as Bt } from "./data-table-v2-cell.mjs";
import { ROW_BG_SELF as _t, ROW_BG_DESCENDANT as zt, STICKY_CELL_BASE_BG as Lt } from "./constants.mjs";
const T = o(
  "relative shrink-0 sticky z-10 flex min-h-9",
  Lt
);
function D({
  highlight: i,
  children: n
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: o(
        "flex flex-1 items-center justify-center transition-colors",
        zt,
        i
      ),
      children: n
    }
  );
}
function K() {
  return /* @__PURE__ */ e(
    "span",
    {
      "aria-hidden": !0,
      className: "absolute -bottom-px left-0 right-0 h-px bg-slate-200 dark:bg-slate-700"
    }
  );
}
function J({
  row: i,
  rowIndex: n,
  columns: b,
  leftOffsets: f,
  rightOffsets: h,
  lastLeftPinnedIdx: y,
  firstRightPinnedIdx: u,
  totalWidth: k,
  registerEl: p,
  onHover: N,
  onHeightChange: Q,
  selectable: w,
  isSelected: A,
  onToggleSelect: U,
  checkboxColWidth: E,
  expandable: X,
  isExpanded: a,
  canExpand: Z,
  onToggleExpand: H,
  expandedRowRender: B,
  expandColWidth: tt,
  visibleWidth: O,
  onRowClick: g,
  extraClassName: l,
  editingColumnKey: et,
  editingError: it,
  onStartEdit: rt,
  onCompleteEdit: nt,
  onCancelEdit: st,
  onClearEditError: ot,
  showRowDelete: at,
  onRowDelete: _,
  rowActionsColWidth: ct,
  rowActionsColLeftOffset: lt,
  rowReorderable: z,
  dragHandleColWidth: L,
  isLast: m,
  getRowSpan: dt,
  getRowSpanHeight: ft,
  getGroupHovered: ht,
  getGroupSelected: ut,
  measureRef: P,
  dataIndex: gt,
  ariaRowIndex: mt,
  sortable: s
}) {
  const V = c.useRef(null), vt = s.transform, bt = s.transition, I = s.isDragging;
  c.useLayoutEffect(() => {
    const t = V.current;
    if (!t) return;
    const r = () => Q(i.id, t.offsetHeight);
    r();
    const v = new ResizeObserver(r);
    return v.observe(t), () => v.disconnect();
  }, [i.id, a]);
  const M = c.useMemo(
    () => a && B ? B(i) : null,
    [a, B, i]
  ), R = c.useRef(!1), yt = (t) => {
    t.target.closest("[data-no-row-click]") || g == null || g(i);
  }, kt = c.useCallback(
    (t) => {
      var r;
      V.current = t, (r = s.setNodeRef) == null || r.call(s, t), P && P(t), p(i.id, t);
    },
    [s, P, p, i.id]
  );
  return /* @__PURE__ */ d(
    "div",
    {
      ref: kt,
      role: "row",
      "data-index": gt,
      "aria-rowindex": mt,
      className: o(
        "absolute left-0 right-0 flex flex-col",
        I && "z-30"
      ),
      style: {
        minWidth: k,
        // top 은 부모가 layout effect 로 직접 쓴다 (위 registerEl 주석 참고).
        // React style 객체에 top 을 두지 않으므로 React 가 값을 덮어쓰지 않는다.
        transform: vt,
        transition: bt,
        opacity: I ? 0.6 : void 0
      },
      children: [
        /* @__PURE__ */ d(
          "div",
          {
            "data-state": A ? "selected" : void 0,
            className: o(
              // border-b 를 row 자체에 두어서 우측 empty 영역 (셀 미커버) 에도 하단 line 이 이어지게 함.
              // 마지막 row 는 외곽 컨테이너 border-bottom 과 겹쳐 2px 로 보이므로 생략.
              // rowGrouping 병합 셀 위엔 head 셀의 absolute wrapper (opaque bg) 가 border 를 자동으로 가림 → 별도 middle row 스킵 불필요.
              // `group` 클래스 — sticky 셀들이 `group-hover:` 로 row hover 반응 (state 없이 CSS 만)
              "group flex transition-colors",
              !m && "border-b border-slate-200 dark:border-slate-700",
              _t,
              g && "cursor-pointer",
              l
            ),
            onMouseEnter: N ? () => N(i.id) : void 0,
            onMouseLeave: N ? () => N(null) : void 0,
            onClick: g ? yt : void 0,
            children: [
              z && /* @__PURE__ */ d(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    T
                  ),
                  style: { width: L, left: 0 },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(D, { highlight: l, children: /* @__PURE__ */ e(
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
                    !m && /* @__PURE__ */ e(K, {})
                  ]
                }
              ),
              w && /* @__PURE__ */ d(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    T
                  ),
                  style: {
                    width: E,
                    left: z ? L : 0
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(D, { highlight: l, children: /* @__PURE__ */ e(
                      xt,
                      {
                        checked: A,
                        onClick: (t) => {
                          R.current = t.shiftKey;
                        },
                        onCheckedChange: () => {
                          U(i.id, n, R.current), R.current = !1;
                        },
                        "aria-label": `행 ${i.id} 선택`
                      }
                    ) }),
                    !m && /* @__PURE__ */ e(K, {})
                  ]
                }
              ),
              X && /* @__PURE__ */ d(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    T
                  ),
                  style: {
                    width: tt,
                    left: (z ? L : 0) + (w ? E : 0)
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(D, { highlight: l, children: Z && /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: () => H(i.id),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": a ? "행 접기" : "행 펼치기",
                        "aria-expanded": a,
                        children: a ? /* @__PURE__ */ e(Ct, { size: 24 }) : /* @__PURE__ */ e(Dt, { size: 24 })
                      }
                    ) }),
                    !m && /* @__PURE__ */ e(K, {})
                  ]
                }
              ),
              at && /* @__PURE__ */ d(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    T
                  ),
                  style: { width: ct, left: lt },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(D, { highlight: l, children: /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: () => _ == null ? void 0 : _(i),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": "행 삭제",
                        children: /* @__PURE__ */ e(Kt, { size: 20 })
                      }
                    ) }),
                    !m && /* @__PURE__ */ e(K, {})
                  ]
                }
              ),
              b.map((t, r) => {
                const v = t.id ?? String(t.accessorKey), S = typeof t.width == "number" ? t.width : void 0, G = typeof t.minWidth == "number" ? t.minWidth : void 0, x = t.pinned === "left", C = t.pinned === "right", W = x || C, F = r === u, j = dt(n, t.accessorKey);
                if (j === 0)
                  return /* @__PURE__ */ e(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: o(
                        S !== void 0 && "shrink-0",
                        W && "sticky z-10",
                        F && "ml-auto"
                      ),
                      style: {
                        width: S,
                        minWidth: G,
                        flex: S === void 0 ? "1 1 0" : void 0,
                        left: x ? f[r] : void 0,
                        right: C ? h[r] : void 0
                      }
                    },
                    v
                  );
                const Y = j !== void 0 && j > 1 ? ft(n, t.accessorKey) : void 0, pt = (() => {
                  if (Y === void 0) return;
                  const q = ht(n, t.accessorKey);
                  return ut(n, t.accessorKey) ? q ? "bg-blue-100 dark:bg-blue-950" : "bg-blue-50 dark:bg-blue-900" : q ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900";
                })(), $ = et === t.accessorKey;
                return /* @__PURE__ */ e(
                  Bt,
                  {
                    row: i,
                    column: t,
                    width: S,
                    minWidth: G,
                    leftOffset: x ? f[r] : void 0,
                    rightOffset: C ? h[r] : void 0,
                    isLeftPinned: x,
                    isRightPinned: C,
                    isLeftBoundary: r === y,
                    isRightBoundary: r === u,
                    isFirstRightPinned: F,
                    rowHighlightClass: W ? l : void 0,
                    spanHeight: Y,
                    headBgClass: pt,
                    isEditing: $,
                    editingError: $ ? it : void 0,
                    onStartEdit: rt,
                    onCompleteEdit: nt,
                    onCancelEdit: st,
                    onClearEditError: ot
                  },
                  v
                );
              })
            ]
          }
        ),
        a && M && /* @__PURE__ */ e(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-white dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700",
            children: /* @__PURE__ */ e(
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
function Pt(i) {
  const { setNodeRef: n, setActivatorNodeRef: b, listeners: f, attributes: h, transform: y, transition: u, isDragging: k } = Nt({ id: `row-${i.row.id}` }), p = c.useMemo(
    () => ({
      setNodeRef: n,
      setActivatorNodeRef: b,
      listeners: f,
      attributes: h,
      transform: St.Transform.toString(y) ?? void 0,
      transition: u,
      isDragging: k
    }),
    [n, b, f, h, y, u, k]
  );
  return /* @__PURE__ */ e(J, { ...i, sortable: p });
}
const Rt = { isDragging: !1 };
function jt(i) {
  return i.rowReorderable ? /* @__PURE__ */ e(Pt, { ...i }) : /* @__PURE__ */ e(J, { ...i, sortable: Rt });
}
const qt = c.memo(jt);
export {
  qt as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
