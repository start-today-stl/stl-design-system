import { jsx as e, jsxs as d } from "react/jsx-runtime";
import * as l from "react";
import { useSortable as yt } from "@dnd-kit/sortable";
import { CSS as Nt } from "@dnd-kit/utilities";
import { cn as a } from "../../../lib/utils.mjs";
import { Checkbox as xt } from "../../ui/checkbox.mjs";
import { DownIcon as wt } from "../../../icons/DownIcon.mjs";
import { DragHandleIcon as Tt } from "../../../icons/DragHandleIcon.mjs";
import { RightIcon as Dt } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as Kt } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2Cell as Rt } from "./data-table-v2-cell.mjs";
const D = a(
  "relative shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
  "bg-white dark:bg-slate-900",
  "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
  "group-data-[state=selected]:bg-blue-50 dark:group-data-[state=selected]:bg-blue-900"
);
function K({ className: r }) {
  return r ? /* @__PURE__ */ e(
    "span",
    {
      "aria-hidden": !0,
      className: a(
        "absolute inset-0 pointer-events-none group-data-[state=selected]:hidden",
        r
      )
    }
  ) : null;
}
function R() {
  return /* @__PURE__ */ e(
    "span",
    {
      "aria-hidden": !0,
      className: "absolute -bottom-px left-0 right-0 h-px bg-slate-200 dark:bg-slate-700"
    }
  );
}
function q({
  row: r,
  rowIndex: n,
  columns: v,
  leftOffsets: c,
  rightOffsets: u,
  lastLeftPinnedIdx: k,
  firstRightPinnedIdx: f,
  totalWidth: p,
  registerEl: y,
  onHover: N,
  onHeightChange: H,
  selectable: V,
  isSelected: L,
  onToggleSelect: J,
  checkboxColWidth: A,
  expandable: Q,
  isExpanded: g,
  canExpand: U,
  onToggleExpand: X,
  expandedContent: M,
  expandColWidth: Z,
  visibleWidth: O,
  onRowClick: h,
  extraClassName: o,
  editingColumnKey: tt,
  editingError: et,
  onStartEdit: rt,
  onCompleteEdit: it,
  onCancelEdit: st,
  onClearEditError: at,
  showRowDelete: nt,
  onRowDelete: S,
  rowActionsColWidth: ot,
  rowActionsColLeftOffset: dt,
  rowReorderable: z,
  dragHandleColWidth: C,
  isLast: b,
  getRowSpan: lt,
  getRowSpanHeight: ct,
  getGroupHovered: ut,
  getGroupSelected: ft,
  measureRef: P,
  dataIndex: gt,
  ariaRowIndex: ht,
  sortable: s
}) {
  const _ = l.useRef(null), bt = s.transform, mt = s.transition, E = s.isDragging;
  l.useLayoutEffect(() => {
    const t = _.current;
    if (!t) return;
    const i = () => H(r.id, t.offsetHeight);
    i();
    const m = new ResizeObserver(i);
    return m.observe(t), () => m.disconnect();
  }, [r.id, g]);
  const j = l.useRef(!1), vt = (t) => {
    t.target.closest("[data-no-row-click]") || h == null || h(r);
  }, kt = l.useCallback(
    (t) => {
      var i;
      _.current = t, (i = s.setNodeRef) == null || i.call(s, t), P && P(t), y(r.id, t);
    },
    [s, P, y, r.id]
  );
  return /* @__PURE__ */ d(
    "div",
    {
      ref: kt,
      role: "row",
      "data-index": gt,
      "aria-rowindex": ht,
      className: a(
        "absolute left-0 right-0 flex flex-col",
        E && "z-30"
      ),
      style: {
        minWidth: p,
        // top 은 부모가 layout effect 로 직접 쓴다 (위 registerEl 주석 참고).
        // React style 객체에 top 을 두지 않으므로 React 가 값을 덮어쓰지 않는다.
        transform: bt,
        transition: mt,
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
              h && "cursor-pointer",
              o
            ),
            onMouseEnter: N ? () => N(r.id) : void 0,
            onMouseLeave: N ? () => N(null) : void 0,
            onClick: h ? vt : void 0,
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
                        children: /* @__PURE__ */ e(Tt, { size: 16 })
                      }
                    ),
                    /* @__PURE__ */ e(K, { className: o }),
                    !b && /* @__PURE__ */ e(R, {})
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
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(
                      xt,
                      {
                        checked: L,
                        onClick: (t) => {
                          j.current = t.shiftKey;
                        },
                        onCheckedChange: () => {
                          J(r.id, n, j.current), j.current = !1;
                        },
                        "aria-label": `행 ${r.id} 선택`
                      }
                    ),
                    /* @__PURE__ */ e(K, { className: o }),
                    !b && /* @__PURE__ */ e(R, {})
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
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    U && /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: () => X(r.id),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": g ? "행 접기" : "행 펼치기",
                        "aria-expanded": g,
                        children: g ? /* @__PURE__ */ e(wt, { size: 24 }) : /* @__PURE__ */ e(Dt, { size: 24 })
                      }
                    ),
                    /* @__PURE__ */ e(K, { className: o }),
                    !b && /* @__PURE__ */ e(R, {})
                  ]
                }
              ),
              nt && /* @__PURE__ */ d(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: a(
                    // sticky 라 스크롤 내용을 덮는다 → 불투명 배경 필수.
                    // 사용처 강조색(반투명일 수 있음)은 아래 오버레이로 얹는다.
                    D
                  ),
                  style: { width: ot, left: dt },
                  onClick: (t) => t.stopPropagation(),
                  children: [
                    /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: () => S == null ? void 0 : S(r),
                        className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                        "aria-label": "행 삭제",
                        children: /* @__PURE__ */ e(Kt, { size: 20 })
                      }
                    ),
                    /* @__PURE__ */ e(K, { className: o }),
                    !b && /* @__PURE__ */ e(R, {})
                  ]
                }
              ),
              v.map((t, i) => {
                const m = t.id ?? String(t.accessorKey), x = typeof t.width == "number" ? t.width : void 0, I = typeof t.minWidth == "number" ? t.minWidth : void 0, w = t.pinned === "left", T = t.pinned === "right", $ = w || T, F = i === f, B = lt(n, t.accessorKey);
                if (B === 0)
                  return /* @__PURE__ */ e(
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
                const G = B !== void 0 && B > 1 ? ct(n, t.accessorKey) : void 0, pt = (() => {
                  if (G === void 0) return;
                  const Y = ut(n, t.accessorKey);
                  return ft(n, t.accessorKey) ? Y ? "bg-blue-100 dark:bg-blue-950" : "bg-blue-50 dark:bg-blue-900" : Y ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900";
                })(), W = tt === t.accessorKey;
                return /* @__PURE__ */ e(
                  Rt,
                  {
                    row: r,
                    column: t,
                    width: x,
                    minWidth: I,
                    leftOffset: w ? c[i] : void 0,
                    rightOffset: T ? u[i] : void 0,
                    isLeftPinned: w,
                    isRightPinned: T,
                    isLeftBoundary: i === k,
                    isRightBoundary: i === f,
                    isFirstRightPinned: F,
                    rowHighlightClass: $ ? o : void 0,
                    spanHeight: G,
                    headBgClass: pt,
                    isEditing: W,
                    editingError: W ? et : void 0,
                    onStartEdit: rt,
                    onCompleteEdit: it,
                    onCancelEdit: st,
                    onClearEditError: at
                  },
                  m
                );
              })
            ]
          }
        ),
        g && M && /* @__PURE__ */ e(
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
function St(r) {
  const { setNodeRef: n, setActivatorNodeRef: v, listeners: c, attributes: u, transform: k, transition: f, isDragging: p } = yt({ id: `row-${r.row.id}` }), y = l.useMemo(
    () => ({
      setNodeRef: n,
      setActivatorNodeRef: v,
      listeners: c,
      attributes: u,
      transform: Nt.Transform.toString(k) ?? void 0,
      transition: f,
      isDragging: p
    }),
    [n, v, c, u, k, f, p]
  );
  return /* @__PURE__ */ e(q, { ...r, sortable: y });
}
const zt = { isDragging: !1 };
function Ct(r) {
  return r.rowReorderable ? /* @__PURE__ */ e(St, { ...r }) : /* @__PURE__ */ e(q, { ...r, sortable: zt });
}
const $t = l.memo(Ct);
export {
  $t as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
