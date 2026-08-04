import { jsxs as I, jsx as e } from "react/jsx-runtime";
import * as d from "react";
import { useSortable as pt } from "@dnd-kit/sortable";
import { CSS as xt } from "@dnd-kit/utilities";
import { cn as o } from "../../../lib/utils.mjs";
import { Checkbox as vt } from "../../ui/checkbox.mjs";
import { DownIcon as kt } from "../../../icons/DownIcon.mjs";
import { DragHandleIcon as yt } from "../../../icons/DragHandleIcon.mjs";
import { RightIcon as Ct } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as Nt } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2DefaultEdit as jt } from "./data-table-v2-default-edit.mjs";
const zt = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function _t({
  row: s,
  rowIndex: K,
  columns: L,
  leftOffsets: V,
  rightOffsets: M,
  lastLeftPinnedIdx: B,
  firstRightPinnedIdx: x,
  showLeftShadow: E,
  showRightShadow: $,
  totalWidth: A,
  translateY: F,
  isHovered: O,
  onHover: v,
  onHeightChange: S,
  selectable: k,
  isSelected: y,
  onToggleSelect: W,
  checkboxColWidth: C,
  expandable: q,
  isExpanded: l,
  canExpand: G,
  onToggleExpand: J,
  expandedContent: N,
  expandColWidth: Q,
  onRowClick: c,
  extraClassName: U,
  editingColumnKey: X,
  editingState: f,
  onStartEdit: Y,
  onChangeEditValue: Z,
  onCompleteEdit: w,
  onCancelEdit: H,
  showRowDelete: R,
  onRowDelete: h,
  rowActionsColWidth: tt,
  rowActionsColLeftOffset: et,
  rowReorderable: r,
  dragHandleColWidth: u,
  isLast: st
}) {
  const j = d.useRef(null), i = pt({ id: `row-${s.id}` }), rt = r ? xt.Transform.toString(i.transform) : void 0, it = r ? i.transition : void 0, z = r && i.isDragging;
  d.useLayoutEffect(() => {
    const t = j.current;
    if (!t) return;
    const n = () => S(s.id, t.offsetHeight);
    n();
    const m = new ResizeObserver(n);
    return m.observe(t), () => m.disconnect();
  }, [s.id, l]);
  const a = O ? "bg-slate-100 dark:bg-slate-800" : y ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-slate-900", b = d.useRef(!1), nt = (t) => {
    t.target.closest("[data-no-row-click]") || c == null || c(s);
  }, ot = d.useCallback(
    (t) => {
      j.current = t, r && i.setNodeRef(t);
    },
    [r, i]
  );
  return /* @__PURE__ */ I(
    "div",
    {
      ref: ot,
      role: "row",
      className: o(
        "absolute left-0 right-0 flex flex-col",
        z && "z-30"
      ),
      style: {
        minWidth: A,
        top: Math.round(F),
        transform: rt,
        transition: it,
        opacity: z ? 0.6 : void 0
      },
      children: [
        /* @__PURE__ */ I(
          "div",
          {
            className: o(
              // border-b 를 row 자체에 두어서 우측 empty 영역 (셀 미커버) 에도 하단 line 이 이어지게 함.
              // 마지막 row 는 외곽 컨테이너 border-bottom 과 겹쳐 2px 로 보이므로 생략.
              "flex transition-colors",
              !st && "border-b border-slate-200 dark:border-slate-700",
              a,
              c && "cursor-pointer",
              U
            ),
            onMouseEnter: () => v(s.id),
            onMouseLeave: () => v(null),
            onClick: c ? nt : void 0,
            children: [
              r && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    a
                  ),
                  style: { width: u, left: 0 },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    "div",
                    {
                      ref: i.setActivatorNodeRef,
                      className: "flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": "행 순서 변경",
                      ...i.listeners,
                      ...i.attributes,
                      children: /* @__PURE__ */ e(yt, { size: 16 })
                    }
                  )
                }
              ),
              k && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    a
                  ),
                  style: {
                    width: C,
                    left: r ? u : 0
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    vt,
                    {
                      checked: y,
                      onClick: (t) => {
                        b.current = t.shiftKey;
                      },
                      onCheckedChange: () => {
                        W(s.id, K, b.current), b.current = !1;
                      },
                      "aria-label": `행 ${s.id} 선택`
                    }
                  )
                }
              ),
              q && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    a
                  ),
                  style: {
                    width: Q,
                    left: (r ? u : 0) + (k ? C : 0)
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: G && /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => J(s.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": l ? "행 접기" : "행 펼치기",
                      "aria-expanded": l,
                      children: l ? /* @__PURE__ */ e(kt, { size: 24 }) : /* @__PURE__ */ e(Ct, { size: 24 })
                    }
                  )
                }
              ),
              R && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
                    a
                  ),
                  style: { width: tt, left: et },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => h == null ? void 0 : h(s),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": "행 삭제",
                      children: /* @__PURE__ */ e(Nt, { size: 20 })
                    }
                  )
                }
              ),
              L.map((t, n) => {
                const m = t.id ?? String(t.accessorKey), _ = s[t.accessorKey], at = t.cell ? t.cell(_, s) : _, g = typeof t.width == "number" ? t.width : void 0, lt = typeof t.minWidth == "number" ? t.minWidth : void 0, P = t.pinned === "left", T = t.pinned === "right", D = P || T, ct = n === B && E, dt = n === x && $, ft = n === x, p = !!f && X === t.accessorKey, mt = o(
                  "flex min-h-9",
                  g !== void 0 && "shrink-0",
                  D && "sticky z-10 transition-colors",
                  D && a,
                  ft && "ml-auto",
                  ct && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  dt && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
                ), ht = o(
                  "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
                  zt[t.align ?? "left"],
                  t.editable && !p && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
                ), ut = t.editComponent ?? jt, bt = t.editable ? (gt) => {
                  gt.stopPropagation(), p || Y(s, t);
                } : void 0;
                return /* @__PURE__ */ e(
                  "div",
                  {
                    role: "gridcell",
                    className: mt,
                    style: {
                      width: g,
                      minWidth: lt,
                      flex: g === void 0 ? "1 1 0" : void 0,
                      left: P ? V[n] : void 0,
                      right: T ? M[n] : void 0
                    },
                    ...t.editable ? { "data-no-row-click": !0 } : {},
                    children: p && f ? /* @__PURE__ */ e("div", { className: "flex-1 flex items-center px-1 py-1", children: /* @__PURE__ */ e(
                      ut,
                      {
                        value: f.editValue,
                        onChange: Z,
                        onComplete: () => w(t, s),
                        onCancel: H,
                        row: s,
                        error: f.error
                      }
                    ) }) : /* @__PURE__ */ e("div", { className: ht, onClick: bt, children: at })
                  },
                  m
                );
              })
            ]
          }
        ),
        l && N && /* @__PURE__ */ e(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700",
            children: N
          }
        )
      ]
    }
  );
}
const $t = d.memo(_t);
export {
  $t as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
