import { jsxs as I, jsx as e } from "react/jsx-runtime";
import * as d from "react";
import { useSortable as gt } from "@dnd-kit/sortable";
import { CSS as pt } from "@dnd-kit/utilities";
import { cn as o } from "../../../lib/utils.mjs";
import { Checkbox as kt } from "../../ui/checkbox.mjs";
import { DownIcon as xt } from "../../../icons/DownIcon.mjs";
import { DragHandleIcon as vt } from "../../../icons/DragHandleIcon.mjs";
import { RightIcon as yt } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as Ct } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2DefaultEdit as Nt } from "./data-table-v2-default-edit.mjs";
const jt = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function zt({
  row: r,
  rowIndex: K,
  columns: L,
  leftOffsets: V,
  rightOffsets: M,
  lastLeftPinnedIdx: B,
  firstRightPinnedIdx: k,
  showLeftShadow: E,
  showRightShadow: $,
  totalWidth: A,
  translateY: F,
  isHovered: O,
  onHover: x,
  onHeightChange: S,
  selectable: v,
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
  rowReorderable: s,
  dragHandleColWidth: u
}) {
  const j = d.useRef(null), i = gt({ id: `row-${r.id}` }), rt = s ? pt.Transform.toString(i.transform) : void 0, st = s ? i.transition : void 0, z = s && i.isDragging;
  d.useLayoutEffect(() => {
    const t = j.current;
    if (!t) return;
    const n = () => S(r.id, t.offsetHeight);
    n();
    const m = new ResizeObserver(n);
    return m.observe(t), () => m.disconnect();
  }, [r.id, l]);
  const a = O ? "bg-slate-100 dark:bg-slate-800" : y ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-slate-900", b = d.useRef(!1), it = (t) => {
    t.target.closest("[data-no-row-click]") || c == null || c(r);
  }, nt = d.useCallback(
    (t) => {
      j.current = t, s && i.setNodeRef(t);
    },
    [s, i]
  );
  return /* @__PURE__ */ I(
    "div",
    {
      ref: nt,
      role: "row",
      className: o(
        "absolute left-0 right-0 flex flex-col",
        z && "z-30"
      ),
      style: {
        minWidth: A,
        top: Math.round(F),
        transform: rt,
        transition: st,
        opacity: z ? 0.6 : void 0
      },
      children: [
        /* @__PURE__ */ I(
          "div",
          {
            className: o(
              "flex transition-colors",
              a,
              c && "cursor-pointer",
              U
            ),
            onMouseEnter: () => x(r.id),
            onMouseLeave: () => x(null),
            onClick: c ? it : void 0,
            children: [
              s && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
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
                      children: /* @__PURE__ */ e(vt, { size: 16 })
                    }
                  )
                }
              ),
              v && /* @__PURE__ */ e(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    a
                  ),
                  style: {
                    width: C,
                    left: s ? u : 0
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    kt,
                    {
                      checked: y,
                      onClick: (t) => {
                        b.current = t.shiftKey;
                      },
                      onCheckedChange: () => {
                        W(r.id, K, b.current), b.current = !1;
                      },
                      "aria-label": `행 ${r.id} 선택`
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
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    a
                  ),
                  style: {
                    width: Q,
                    left: (s ? u : 0) + (v ? C : 0)
                  },
                  onClick: (t) => t.stopPropagation(),
                  children: G && /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => J(r.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": l ? "행 접기" : "행 펼치기",
                      "aria-expanded": l,
                      children: l ? /* @__PURE__ */ e(xt, { size: 24 }) : /* @__PURE__ */ e(yt, { size: 24 })
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
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    a
                  ),
                  style: { width: tt, left: et },
                  onClick: (t) => t.stopPropagation(),
                  children: /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: () => h == null ? void 0 : h(r),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": "행 삭제",
                      children: /* @__PURE__ */ e(Ct, { size: 20 })
                    }
                  )
                }
              ),
              L.map((t, n) => {
                const m = t.id ?? String(t.accessorKey), _ = r[t.accessorKey], ot = t.cell ? t.cell(_, r) : _, g = typeof t.width == "number" ? t.width : void 0, at = typeof t.minWidth == "number" ? t.minWidth : void 0, P = t.pinned === "left", T = t.pinned === "right", D = P || T, lt = n === B && E, ct = n === k && $, dt = n === k, p = !!f && X === t.accessorKey, ft = o(
                  "flex min-h-9 border-b border-slate-200 dark:border-slate-700",
                  g !== void 0 && "shrink-0",
                  D && "sticky z-10 transition-colors",
                  D && a,
                  dt && "ml-auto",
                  lt && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  ct && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
                ), mt = o(
                  "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
                  jt[t.align ?? "left"],
                  t.editable && !p && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
                ), ht = t.editComponent ?? Nt, ut = t.editable ? (bt) => {
                  bt.stopPropagation(), p || Y(r, t);
                } : void 0;
                return /* @__PURE__ */ e(
                  "div",
                  {
                    role: "gridcell",
                    className: ft,
                    style: {
                      width: g,
                      minWidth: at,
                      flex: g === void 0 ? "1 1 0" : void 0,
                      left: P ? V[n] : void 0,
                      right: T ? M[n] : void 0
                    },
                    ...t.editable ? { "data-no-row-click": !0 } : {},
                    children: p && f ? /* @__PURE__ */ e("div", { className: "flex-1 flex items-center px-1 py-1", children: /* @__PURE__ */ e(
                      ht,
                      {
                        value: f.editValue,
                        onChange: Z,
                        onComplete: () => w(t, r),
                        onCancel: H,
                        row: r,
                        error: f.error
                      }
                    ) }) : /* @__PURE__ */ e("div", { className: mt, onClick: ut, children: ot })
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
const Et = d.memo(zt);
export {
  Et as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
