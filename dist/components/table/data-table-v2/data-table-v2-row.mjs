import { jsxs as $, jsx as e } from "react/jsx-runtime";
import * as h from "react";
import { useSortable as jt } from "@dnd-kit/sortable";
import { CSS as Kt } from "@dnd-kit/utilities";
import { cn as i } from "../../../lib/utils.mjs";
import { Checkbox as _t } from "../../ui/checkbox.mjs";
import { DownIcon as Pt } from "../../../icons/DownIcon.mjs";
import { DragHandleIcon as Tt } from "../../../icons/DragHandleIcon.mjs";
import { RightIcon as Dt } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as It } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2DefaultEdit as Bt } from "./data-table-v2-default-edit.mjs";
const Lt = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function Vt({
  row: s,
  rowIndex: A,
  columns: F,
  leftOffsets: N,
  rightOffsets: z,
  lastLeftPinnedIdx: W,
  firstRightPinnedIdx: j,
  showLeftShadow: q,
  showRightShadow: w,
  totalWidth: J,
  translateY: Q,
  isHovered: S,
  onHover: K,
  onHeightChange: U,
  selectable: _,
  isSelected: m,
  onToggleSelect: X,
  checkboxColWidth: P,
  expandable: Y,
  isExpanded: c,
  canExpand: Z,
  onToggleExpand: O,
  expandedContent: T,
  expandColWidth: R,
  onRowClick: d,
  extraClassName: tt,
  editingColumnKey: et,
  editingState: u,
  onStartEdit: st,
  onChangeEditValue: rt,
  onCompleteEdit: it,
  onCancelEdit: nt,
  showRowDelete: ot,
  onRowDelete: b,
  rowActionsColWidth: at,
  rowActionsColLeftOffset: lt,
  rowReorderable: n,
  dragHandleColWidth: g,
  isLast: ct,
  getRowSpan: dt,
  getRowSpanHeight: ft,
  getGroupHovered: ht
}) {
  const D = h.useRef(null), o = jt({ id: `row-${s.id}` }), ut = n ? Kt.Transform.toString(o.transform) : void 0, mt = n ? o.transition : void 0, I = n && o.isDragging;
  h.useLayoutEffect(() => {
    const t = D.current;
    if (!t) return;
    const r = () => U(s.id, t.offsetHeight);
    r();
    const f = new ResizeObserver(r);
    return f.observe(t), () => f.disconnect();
  }, [s.id, c]);
  const a = S ? "bg-slate-100 dark:bg-slate-800" : m ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-slate-900", v = h.useRef(!1), bt = (t) => {
    t.target.closest("[data-no-row-click]") || d == null || d(s);
  }, gt = h.useCallback(
    (t) => {
      D.current = t, n && o.setNodeRef(t);
    },
    [n, o]
  );
  return /* @__PURE__ */ $(
    "div",
    {
      ref: gt,
      role: "row",
      className: i(
        "absolute left-0 right-0 flex flex-col",
        I && "z-30"
      ),
      style: {
        minWidth: J,
        top: Math.round(Q),
        transform: ut,
        transition: mt,
        opacity: I ? 0.6 : void 0
      },
      children: [
        /* @__PURE__ */ $(
          "div",
          {
            className: i(
              // border-b 를 row 자체에 두어서 우측 empty 영역 (셀 미커버) 에도 하단 line 이 이어지게 함.
              // 마지막 row 는 외곽 컨테이너 border-bottom 과 겹쳐 2px 로 보이므로 생략.
              // rowGrouping 병합 셀 위엔 head 셀의 absolute wrapper (opaque bg) 가 border 를 자동으로 가림 → 별도 middle row 스킵 불필요.
              "flex transition-colors",
              !ct && "border-b border-slate-200 dark:border-slate-700",
              a,
              d && "cursor-pointer",
              tt
            ),
            onMouseEnter: () => K(s.id),
            onMouseLeave: () => K(null),
            onClick: d ? bt : void 0,
            children: [
              n && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    a
                  ),
                  style: { width: g, left: 0 },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    "div",
                    {
                      ref: o.setActivatorNodeRef,
                      className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": "행 순서 변경",
                      ...o.listeners,
                      ...o.attributes,
                      children: /* @__PURE__ */ e(Tt, { size: 16 })
                    }
                  )
                }
              ),
              _ && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    a
                  ),
                  style: {
                    width: P,
                    left: n ? g : 0
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    _t,
                    {
                      checked: m,
                      onClick: (t) => {
                        v.current = t.shiftKey;
                      },
                      onCheckedChange: () => {
                        X(s.id, A, v.current), v.current = !1;
                      },
                      "aria-label": `행 ${s.id} 선택`
                    }
                  )
                }
              ),
              Y && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    a
                  ),
                  style: {
                    width: R,
                    left: (n ? g : 0) + (_ ? P : 0)
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: Z && /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => O(s.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": c ? "행 접기" : "행 펼치기",
                      "aria-expanded": c,
                      children: c ? /* @__PURE__ */ e(Pt, { size: 24 }) : /* @__PURE__ */ e(Dt, { size: 24 })
                    }
                  )
                }
              ),
              ot && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    a
                  ),
                  style: { width: at, left: lt },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => b == null ? void 0 : b(s),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": "행 삭제",
                      children: /* @__PURE__ */ e(It, { size: 20 })
                    }
                  )
                }
              ),
              F.map((t, r) => {
                const f = t.id ?? String(t.accessorKey), B = s[t.accessorKey], vt = t.cell ? t.cell(B, s) : B, l = typeof t.width == "number" ? t.width : void 0, L = typeof t.minWidth == "number" ? t.minWidth : void 0, p = t.pinned === "left", y = t.pinned === "right", k = p || y, pt = r === W && q, yt = r === j && w, V = r === j, x = !!u && et === t.accessorKey, C = dt(t.accessorKey);
                if (C === 0)
                  return /* @__PURE__ */ e(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: i(
                        l !== void 0 && "shrink-0",
                        k && "sticky z-10",
                        V && "ml-auto"
                      ),
                      style: {
                        width: l,
                        minWidth: L,
                        flex: l === void 0 ? "1 1 0" : void 0,
                        left: p ? N[r] : void 0,
                        right: y ? z[r] : void 0
                      }
                    },
                    f
                  );
                const H = C !== void 0 && C > 1 ? ft(t.accessorKey) : void 0, M = H !== void 0, kt = i(
                  "flex min-h-9",
                  l !== void 0 && "shrink-0",
                  k && "sticky z-10 transition-colors",
                  k && a,
                  V && "ml-auto",
                  pt && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  yt && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
                  // (그룹 middle rows 의 bg 위에 얹혀야 함)
                  M && "relative z-[5]"
                ), xt = i(
                  "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
                  Lt[t.align ?? "left"],
                  t.editable && !x && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
                ), Ct = t.editComponent ?? Bt, Nt = t.editable ? (G) => {
                  G.stopPropagation(), x || st(s, t);
                } : void 0, E = x && u ? /* @__PURE__ */ e("div", { className: "flex-1 flex items-center px-1 py-1", children: /* @__PURE__ */ e(
                  Ct,
                  {
                    value: u.editValue,
                    onChange: rt,
                    onComplete: () => it(t, s),
                    onCancel: nt,
                    row: s,
                    error: u.error
                  }
                ) }) : /* @__PURE__ */ e("div", { className: xt, onClick: Nt, children: vt });
                return /* @__PURE__ */ e(
                  "div",
                  {
                    role: "gridcell",
                    className: kt,
                    style: {
                      width: l,
                      minWidth: L,
                      flex: l === void 0 ? "1 1 0" : void 0,
                      left: p ? N[r] : void 0,
                      right: y ? z[r] : void 0
                    },
                    ...t.editable ? { "data-no-row-click": !0 } : {},
                    children: M ? (
                      // Head 셀 (rowGrouping span > 1) — 컨텐츠를 absolute 로 세로 확장.
                      // outer 는 row height 유지 (다른 셀 정렬 흔들림 방지), content 만 spanHeight 만큼 뻗음.
                      // border-b 로 그룹 하단 경계 표시 + bg 로 middle rows 위에 opaque 커버.
                      // headBgClass: 그룹 내 어떤 row 라도 hover 중이면 hover bg. head row 자체 selected 면 selected bg.
                      // row 자체의 bgClass 와 분리 — head row (span 시작 row) 가 hover 안 됐어도 middle row hover 시 head 셀은 hover 표시돼야 함.
                      (() => {
                        const zt = ht(t.accessorKey) ? "bg-slate-100 dark:bg-slate-800" : m ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-slate-900";
                        return /* @__PURE__ */ e(
                          "div",
                          {
                            className: i(
                              "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
                              zt
                            ),
                            style: { height: H },
                            children: E
                          }
                        );
                      })()
                    ) : E
                  },
                  f
                );
              })
            ]
          }
        ),
        c && T && /* @__PURE__ */ e(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700",
            children: T
          }
        )
      ]
    }
  );
}
const Jt = h.memo(Vt);
export {
  Jt as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
