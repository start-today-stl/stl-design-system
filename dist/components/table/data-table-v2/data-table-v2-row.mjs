import { jsx as e, jsxs as H } from "react/jsx-runtime";
import * as c from "react";
import { useSortable as jt } from "@dnd-kit/sortable";
import { CSS as wt } from "@dnd-kit/utilities";
import { cn as o } from "../../../lib/utils.mjs";
import { Checkbox as Dt } from "../../ui/checkbox.mjs";
import { DownIcon as Tt } from "../../../icons/DownIcon.mjs";
import { DragHandleIcon as _t } from "../../../icons/DragHandleIcon.mjs";
import { RightIcon as Kt } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as Rt } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2EditCell as Pt } from "./data-table-v2-edit-cell.mjs";
const Bt = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function O({
  row: r,
  rowIndex: a,
  columns: b,
  leftOffsets: d,
  rightOffsets: u,
  lastLeftPinnedIdx: v,
  firstRightPinnedIdx: f,
  totalWidth: k,
  translateY: y,
  onHover: p,
  onHeightChange: W,
  selectable: P,
  isSelected: x,
  onToggleSelect: q,
  checkboxColWidth: B,
  expandable: J,
  isExpanded: h,
  canExpand: Q,
  onToggleExpand: U,
  expandedContent: L,
  expandColWidth: X,
  onRowClick: g,
  extraClassName: Y,
  editingColumnKey: Z,
  editingError: tt,
  onStartEdit: et,
  onCompleteEdit: rt,
  onCancelEdit: it,
  onClearEditError: st,
  showRowDelete: ot,
  onRowDelete: N,
  rowActionsColWidth: at,
  rowActionsColLeftOffset: nt,
  rowReorderable: C,
  dragHandleColWidth: z,
  isLast: lt,
  getRowSpan: ct,
  getRowSpanHeight: dt,
  getGroupHovered: ut,
  measureRef: j,
  dataIndex: ft,
  ariaRowIndex: ht,
  sortable: s
}) {
  const S = c.useRef(null), gt = s.transform, mt = s.transition, V = s.isDragging;
  c.useLayoutEffect(() => {
    const t = S.current;
    if (!t) return;
    const i = () => W(r.id, t.offsetHeight);
    i();
    const m = new ResizeObserver(i);
    return m.observe(t), () => m.disconnect();
  }, [r.id, h]);
  const n = x ? "bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-950 group-hover:bg-blue-100 dark:group-hover:bg-blue-950" : "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-800", w = c.useRef(!1), bt = (t) => {
    t.target.closest("[data-no-row-click]") || g == null || g(r);
  }, vt = c.useCallback(
    (t) => {
      var i;
      S.current = t, (i = s.setNodeRef) == null || i.call(s, t), j && j(t);
    },
    [s, j]
  );
  return /* @__PURE__ */ H(
    "div",
    {
      ref: vt,
      role: "row",
      "data-index": ft,
      "aria-rowindex": ht,
      className: o(
        "absolute left-0 right-0 flex flex-col",
        V && "z-30"
      ),
      style: {
        minWidth: k,
        top: Math.round(y),
        transform: gt,
        transition: mt,
        opacity: V ? 0.6 : void 0
      },
      children: [
        /* @__PURE__ */ H(
          "div",
          {
            className: o(
              // border-b 를 row 자체에 두어서 우측 empty 영역 (셀 미커버) 에도 하단 line 이 이어지게 함.
              // 마지막 row 는 외곽 컨테이너 border-bottom 과 겹쳐 2px 로 보이므로 생략.
              // rowGrouping 병합 셀 위엔 head 셀의 absolute wrapper (opaque bg) 가 border 를 자동으로 가림 → 별도 middle row 스킵 불필요.
              // `group` 클래스 — sticky 셀들이 `group-hover:` 로 row hover 반응 (state 없이 CSS 만)
              "group flex transition-colors",
              !lt && "border-b border-slate-200 dark:border-slate-700",
              n,
              g && "cursor-pointer",
              Y
            ),
            onMouseEnter: p ? () => p(r.id) : void 0,
            onMouseLeave: p ? () => p(null) : void 0,
            onClick: g ? bt : void 0,
            children: [
              C && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    n
                  ),
                  style: { width: z, left: 0 },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    "div",
                    {
                      ref: s.setActivatorNodeRef,
                      className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": "행 순서 변경",
                      ...s.listeners ?? {},
                      ...s.attributes ?? {},
                      children: /* @__PURE__ */ e(_t, { size: 16 })
                    }
                  )
                }
              ),
              P && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    n
                  ),
                  style: {
                    width: B,
                    left: C ? z : 0
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    Dt,
                    {
                      checked: x,
                      onClick: (t) => {
                        w.current = t.shiftKey;
                      },
                      onCheckedChange: () => {
                        q(r.id, a, w.current), w.current = !1;
                      },
                      "aria-label": `행 ${r.id} 선택`
                    }
                  )
                }
              ),
              J && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    n
                  ),
                  style: {
                    width: X,
                    left: (C ? z : 0) + (P ? B : 0)
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: Q && /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => U(r.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": h ? "행 접기" : "행 펼치기",
                      "aria-expanded": h,
                      children: h ? /* @__PURE__ */ e(Tt, { size: 24 }) : /* @__PURE__ */ e(Kt, { size: 24 })
                    }
                  )
                }
              ),
              ot && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    n
                  ),
                  style: { width: at, left: nt },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => N == null ? void 0 : N(r),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": "행 삭제",
                      children: /* @__PURE__ */ e(Rt, { size: 20 })
                    }
                  )
                }
              ),
              b.map((t, i) => {
                const m = t.id ?? String(t.accessorKey), M = r[t.accessorKey], kt = t.cell ? t.cell(M, r) : M, l = typeof t.width == "number" ? t.width : void 0, A = typeof t.minWidth == "number" ? t.minWidth : void 0, D = t.pinned === "left", T = t.pinned === "right", _ = D || T, pt = i === v, yt = i === f, E = i === f, K = Z === t.accessorKey, R = ct(a, t.accessorKey);
                if (R === 0)
                  return /* @__PURE__ */ e(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: o(
                        l !== void 0 && "shrink-0",
                        _ && "sticky z-10",
                        E && "ml-auto"
                      ),
                      style: {
                        width: l,
                        minWidth: A,
                        flex: l === void 0 ? "1 1 0" : void 0,
                        left: D ? d[i] : void 0,
                        right: T ? u[i] : void 0
                      }
                    },
                    m
                  );
                const G = R !== void 0 && R > 1 ? dt(a, t.accessorKey) : void 0, I = G !== void 0, xt = o(
                  "flex min-h-9",
                  l !== void 0 && "shrink-0",
                  _ && "sticky z-10 transition-colors",
                  _ && n,
                  E && "ml-auto",
                  pt && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  yt && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
                  // (그룹 middle rows 의 bg 위에 얹혀야 함)
                  I && "relative z-[5]"
                ), Nt = o(
                  "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
                  Bt[t.align ?? "left"],
                  t.editable && !K && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
                ), Ct = t.editable ? (F) => {
                  F.stopPropagation(), K || et(r, t);
                } : void 0, $ = K ? /* @__PURE__ */ e(
                  Pt,
                  {
                    row: r,
                    column: t,
                    error: tt,
                    onComplete: rt,
                    onCancel: it,
                    onClearError: st
                  }
                ) : /* @__PURE__ */ e("div", { className: Nt, onClick: Ct, children: kt });
                return /* @__PURE__ */ e(
                  "div",
                  {
                    role: "gridcell",
                    className: xt,
                    style: {
                      width: l,
                      minWidth: A,
                      flex: l === void 0 ? "1 1 0" : void 0,
                      left: D ? d[i] : void 0,
                      right: T ? u[i] : void 0
                    },
                    ...t.editable ? { "data-no-row-click": !0 } : {},
                    children: I ? (
                      // Head 셀 (rowGrouping span > 1) — 컨텐츠를 absolute 로 세로 확장.
                      // outer 는 row height 유지 (다른 셀 정렬 흔들림 방지), content 만 spanHeight 만큼 뻗음.
                      // border-b 로 그룹 하단 경계 표시 + bg 로 middle rows 위에 opaque 커버.
                      // headBgClass: 그룹 내 어떤 row 라도 hover 중이면 hover bg. head row 자체 selected 면 selected bg.
                      // row 자체의 bgClass 와 분리 — head row (span 시작 row) 가 hover 안 됐어도 middle row hover 시 head 셀은 hover 표시돼야 함.
                      (() => {
                        const zt = ut(a, t.accessorKey) ? "bg-slate-100 dark:bg-slate-800" : x ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-slate-900";
                        return /* @__PURE__ */ e(
                          "div",
                          {
                            className: o(
                              "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
                              zt
                            ),
                            style: { height: G },
                            children: $
                          }
                        );
                      })()
                    ) : $
                  },
                  m
                );
              })
            ]
          }
        ),
        h && L && /* @__PURE__ */ e(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700",
            children: L
          }
        )
      ]
    }
  );
}
function Lt(r) {
  const { setNodeRef: a, setActivatorNodeRef: b, listeners: d, attributes: u, transform: v, transition: f, isDragging: k } = jt({ id: `row-${r.row.id}` }), y = c.useMemo(
    () => ({
      setNodeRef: a,
      setActivatorNodeRef: b,
      listeners: d,
      attributes: u,
      transform: wt.Transform.toString(v) ?? void 0,
      transition: f,
      isDragging: k
    }),
    [a, b, d, u, v, f, k]
  );
  return /* @__PURE__ */ e(O, { ...r, sortable: y });
}
const St = { isDragging: !1 };
function Vt(r) {
  return r.rowReorderable ? /* @__PURE__ */ e(Lt, { ...r }) : /* @__PURE__ */ e(O, { ...r, sortable: St });
}
const qt = c.memo(Vt);
export {
  qt as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
