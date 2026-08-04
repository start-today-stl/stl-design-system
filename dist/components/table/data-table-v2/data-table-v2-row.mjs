import { jsxs as H, jsx as e } from "react/jsx-runtime";
import * as u from "react";
import { useSortable as jt } from "@dnd-kit/sortable";
import { CSS as Kt } from "@dnd-kit/utilities";
import { cn as i } from "../../../lib/utils.mjs";
import { Checkbox as _t } from "../../ui/checkbox.mjs";
import { DownIcon as Pt } from "../../../icons/DownIcon.mjs";
import { DragHandleIcon as Tt } from "../../../icons/DragHandleIcon.mjs";
import { RightIcon as Dt } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as Bt } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2DefaultEdit as Lt } from "./data-table-v2-default-edit.mjs";
const Vt = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function Mt({
  row: r,
  rowIndex: f,
  columns: W,
  leftOffsets: K,
  rightOffsets: _,
  lastLeftPinnedIdx: q,
  firstRightPinnedIdx: P,
  totalWidth: J,
  translateY: Q,
  onHover: g,
  onHeightChange: S,
  selectable: T,
  isSelected: b,
  onToggleSelect: U,
  checkboxColWidth: D,
  expandable: X,
  isExpanded: c,
  canExpand: Y,
  onToggleExpand: Z,
  expandedContent: B,
  expandColWidth: O,
  onRowClick: d,
  extraClassName: w,
  editingColumnKey: R,
  editingState: m,
  onStartEdit: tt,
  onChangeEditValue: et,
  onCompleteEdit: rt,
  onCancelEdit: st,
  showRowDelete: it,
  onRowDelete: v,
  rowActionsColWidth: ot,
  rowActionsColLeftOffset: at,
  rowReorderable: o,
  dragHandleColWidth: p,
  isLast: nt,
  getRowSpan: lt,
  getRowSpanHeight: ct,
  getGroupHovered: dt,
  measureRef: k,
  dataIndex: ht,
  ariaRowIndex: ut
}) {
  const L = u.useRef(null), a = jt({ id: `row-${r.id}` }), ft = o ? Kt.Transform.toString(a.transform) : void 0, gt = o ? a.transition : void 0, V = o && a.isDragging;
  u.useLayoutEffect(() => {
    const t = L.current;
    if (!t) return;
    const s = () => S(r.id, t.offsetHeight);
    s();
    const h = new ResizeObserver(s);
    return h.observe(t), () => h.disconnect();
  }, [r.id, c]);
  const n = b ? "bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-950 group-hover:bg-blue-100 dark:group-hover:bg-blue-950" : "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-800", y = u.useRef(!1), mt = (t) => {
    t.target.closest("[data-no-row-click]") || d == null || d(r);
  }, bt = u.useCallback(
    (t) => {
      L.current = t, o && a.setNodeRef(t), k && k(t);
    },
    [o, a, k]
  );
  return /* @__PURE__ */ H(
    "div",
    {
      ref: bt,
      role: "row",
      "data-index": ht,
      "aria-rowindex": ut,
      className: i(
        "absolute left-0 right-0 flex flex-col",
        V && "z-30"
      ),
      style: {
        minWidth: J,
        top: Math.round(Q),
        transform: ft,
        transition: gt,
        opacity: V ? 0.6 : void 0
      },
      children: [
        /* @__PURE__ */ H(
          "div",
          {
            className: i(
              // border-b 를 row 자체에 두어서 우측 empty 영역 (셀 미커버) 에도 하단 line 이 이어지게 함.
              // 마지막 row 는 외곽 컨테이너 border-bottom 과 겹쳐 2px 로 보이므로 생략.
              // rowGrouping 병합 셀 위엔 head 셀의 absolute wrapper (opaque bg) 가 border 를 자동으로 가림 → 별도 middle row 스킵 불필요.
              // `group` 클래스 — sticky 셀들이 `group-hover:` 로 row hover 반응 (state 없이 CSS 만)
              "group flex transition-colors",
              !nt && "border-b border-slate-200 dark:border-slate-700",
              n,
              d && "cursor-pointer",
              w
            ),
            onMouseEnter: g ? () => g(r.id) : void 0,
            onMouseLeave: g ? () => g(null) : void 0,
            onClick: d ? mt : void 0,
            children: [
              o && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    n
                  ),
                  style: { width: p, left: 0 },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    "div",
                    {
                      ref: a.setActivatorNodeRef,
                      className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": "행 순서 변경",
                      ...a.listeners,
                      ...a.attributes,
                      children: /* @__PURE__ */ e(Tt, { size: 16 })
                    }
                  )
                }
              ),
              T && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    n
                  ),
                  style: {
                    width: D,
                    left: o ? p : 0
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    _t,
                    {
                      checked: b,
                      onClick: (t) => {
                        y.current = t.shiftKey;
                      },
                      onCheckedChange: () => {
                        U(r.id, f, y.current), y.current = !1;
                      },
                      "aria-label": `행 ${r.id} 선택`
                    }
                  )
                }
              ),
              X && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    n
                  ),
                  style: {
                    width: O,
                    left: (o ? p : 0) + (T ? D : 0)
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: Y && /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => Z(r.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": c ? "행 접기" : "행 펼치기",
                      "aria-expanded": c,
                      children: c ? /* @__PURE__ */ e(Pt, { size: 24 }) : /* @__PURE__ */ e(Dt, { size: 24 })
                    }
                  )
                }
              ),
              it && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    n
                  ),
                  style: { width: ot, left: at },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => v == null ? void 0 : v(r),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": "행 삭제",
                      children: /* @__PURE__ */ e(Bt, { size: 20 })
                    }
                  )
                }
              ),
              W.map((t, s) => {
                const h = t.id ?? String(t.accessorKey), M = r[t.accessorKey], vt = t.cell ? t.cell(M, r) : M, l = typeof t.width == "number" ? t.width : void 0, E = typeof t.minWidth == "number" ? t.minWidth : void 0, x = t.pinned === "left", C = t.pinned === "right", N = x || C, pt = s === q, kt = s === P, G = s === P, z = !!m && R === t.accessorKey, j = lt(f, t.accessorKey);
                if (j === 0)
                  return /* @__PURE__ */ e(
                    "div",
                    {
                      "aria-hidden": !0,
                      className: i(
                        l !== void 0 && "shrink-0",
                        N && "sticky z-10",
                        G && "ml-auto"
                      ),
                      style: {
                        width: l,
                        minWidth: E,
                        flex: l === void 0 ? "1 1 0" : void 0,
                        left: x ? K[s] : void 0,
                        right: C ? _[s] : void 0
                      }
                    },
                    h
                  );
                const I = j !== void 0 && j > 1 ? ct(f, t.accessorKey) : void 0, $ = I !== void 0, yt = i(
                  "flex min-h-9",
                  l !== void 0 && "shrink-0",
                  N && "sticky z-10 transition-colors",
                  N && n,
                  G && "ml-auto",
                  pt && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  kt && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
                  // (그룹 middle rows 의 bg 위에 얹혀야 함)
                  $ && "relative z-[5]"
                ), xt = i(
                  "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
                  Vt[t.align ?? "left"],
                  t.editable && !z && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
                ), Ct = t.editComponent ?? Lt, Nt = t.editable ? (F) => {
                  F.stopPropagation(), z || tt(r, t);
                } : void 0, A = z && m ? /* @__PURE__ */ e("div", { className: "flex-1 flex items-center px-1 py-1", children: /* @__PURE__ */ e(
                  Ct,
                  {
                    value: m.editValue,
                    onChange: et,
                    onComplete: () => rt(t, r),
                    onCancel: st,
                    row: r,
                    error: m.error
                  }
                ) }) : /* @__PURE__ */ e("div", { className: xt, onClick: Nt, children: vt });
                return /* @__PURE__ */ e(
                  "div",
                  {
                    role: "gridcell",
                    className: yt,
                    style: {
                      width: l,
                      minWidth: E,
                      flex: l === void 0 ? "1 1 0" : void 0,
                      left: x ? K[s] : void 0,
                      right: C ? _[s] : void 0
                    },
                    ...t.editable ? { "data-no-row-click": !0 } : {},
                    children: $ ? (
                      // Head 셀 (rowGrouping span > 1) — 컨텐츠를 absolute 로 세로 확장.
                      // outer 는 row height 유지 (다른 셀 정렬 흔들림 방지), content 만 spanHeight 만큼 뻗음.
                      // border-b 로 그룹 하단 경계 표시 + bg 로 middle rows 위에 opaque 커버.
                      // headBgClass: 그룹 내 어떤 row 라도 hover 중이면 hover bg. head row 자체 selected 면 selected bg.
                      // row 자체의 bgClass 와 분리 — head row (span 시작 row) 가 hover 안 됐어도 middle row hover 시 head 셀은 hover 표시돼야 함.
                      (() => {
                        const zt = dt(f, t.accessorKey) ? "bg-slate-100 dark:bg-slate-800" : b ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-slate-900";
                        return /* @__PURE__ */ e(
                          "div",
                          {
                            className: i(
                              "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
                              zt
                            ),
                            style: { height: I },
                            children: A
                          }
                        );
                      })()
                    ) : A
                  },
                  h
                );
              })
            ]
          }
        ),
        c && B && /* @__PURE__ */ e(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700",
            children: B
          }
        )
      ]
    }
  );
}
const Qt = u.memo(Mt);
export {
  Qt as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
