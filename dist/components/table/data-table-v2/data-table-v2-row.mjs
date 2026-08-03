import { jsxs as _, jsx as t } from "react/jsx-runtime";
import * as d from "react";
import { cn as i } from "../../../lib/utils.mjs";
import { Checkbox as ce } from "../../ui/checkbox.mjs";
import { DownIcon as de } from "../../../icons/DownIcon.mjs";
import { RightIcon as fe } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as he } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2DefaultEdit as be } from "./data-table-v2-default-edit.mjs";
const ue = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function me({
  row: r,
  rowIndex: K,
  columns: P,
  leftOffsets: I,
  rightOffsets: L,
  lastLeftPinnedIdx: V,
  firstRightPinnedIdx: m,
  showLeftShadow: w,
  showRightShadow: M,
  totalWidth: R,
  translateY: T,
  isHovered: W,
  onHover: p,
  onHeightChange: B,
  selectable: x,
  isSelected: g,
  onToggleSelect: D,
  checkboxColWidth: k,
  expandable: E,
  isExpanded: a,
  canExpand: $,
  onToggleExpand: F,
  expandedContent: y,
  expandColWidth: O,
  onRowClick: n,
  extraClassName: q,
  editingColumnKey: A,
  editingState: l,
  onStartEdit: G,
  onChangeEditValue: H,
  onCompleteEdit: J,
  onCancelEdit: Q,
  showRowDelete: U,
  onRowDelete: f,
  rowActionsColWidth: X,
  rowActionsColLeftOffset: Y
}) {
  const v = d.useRef(null);
  d.useLayoutEffect(() => {
    const e = v.current;
    if (!e) return;
    const s = () => B(r.id, e.offsetHeight);
    s();
    const c = new ResizeObserver(s);
    return c.observe(e), () => c.disconnect();
  }, [r.id, a]);
  const o = W ? "bg-slate-100 dark:bg-slate-800" : g ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-slate-900", h = d.useRef(!1), Z = (e) => {
    e.target.closest("[data-no-row-click]") || n == null || n(r);
  };
  return /* @__PURE__ */ _(
    "div",
    {
      ref: v,
      role: "row",
      className: "absolute left-0 top-0 right-0 flex flex-col",
      style: {
        minWidth: R,
        transform: `translate3d(0, ${Math.round(T)}px, 0)`
      },
      children: [
        /* @__PURE__ */ _(
          "div",
          {
            className: i(
              "flex transition-colors",
              o,
              n && "cursor-pointer",
              q
            ),
            onMouseEnter: () => p(r.id),
            onMouseLeave: () => p(null),
            onClick: n ? Z : void 0,
            children: [
              x && /* @__PURE__ */ t(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    o
                  ),
                  style: { width: k, left: 0 },
                  onClick: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ t(
                    ce,
                    {
                      checked: g,
                      onClick: (e) => {
                        h.current = e.shiftKey;
                      },
                      onCheckedChange: () => {
                        D(r.id, K, h.current), h.current = !1;
                      },
                      "aria-label": `행 ${r.id} 선택`
                    }
                  )
                }
              ),
              E && /* @__PURE__ */ t(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    o
                  ),
                  style: {
                    width: O,
                    left: x ? k : 0
                  },
                  onClick: (e) => e.stopPropagation(),
                  children: $ && /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: () => F(r.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": a ? "행 접기" : "행 펼치기",
                      "aria-expanded": a,
                      children: a ? /* @__PURE__ */ t(de, { size: 24 }) : /* @__PURE__ */ t(fe, { size: 24 })
                    }
                  )
                }
              ),
              U && /* @__PURE__ */ t(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    o
                  ),
                  style: { width: X, left: Y },
                  onClick: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: () => f == null ? void 0 : f(r),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": "행 삭제",
                      children: /* @__PURE__ */ t(he, { size: 20 })
                    }
                  )
                }
              ),
              P.map((e, s) => {
                const c = e.id ?? String(e.accessorKey), C = r[e.accessorKey], S = e.cell ? e.cell(C, r) : C, b = typeof e.width == "number" ? e.width : void 0, ee = typeof e.minWidth == "number" ? e.minWidth : void 0, N = e.pinned === "left", j = e.pinned === "right", z = N || j, te = s === V && w, re = s === m && M, se = s === m, u = !!l && A === e.accessorKey, ie = i(
                  "flex min-h-9 border-b border-slate-200 dark:border-slate-700",
                  b !== void 0 && "shrink-0",
                  z && "sticky z-10 transition-colors",
                  z && o,
                  se && "ml-auto",
                  te && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  re && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
                ), ae = i(
                  "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
                  ue[e.align ?? "left"],
                  e.editable && !u && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
                ), ne = e.editComponent ?? be, oe = e.editable ? (le) => {
                  le.stopPropagation(), u || G(r, e);
                } : void 0;
                return /* @__PURE__ */ t(
                  "div",
                  {
                    role: "gridcell",
                    className: ie,
                    style: {
                      width: b,
                      minWidth: ee,
                      flex: b === void 0 ? "1 1 0" : void 0,
                      left: N ? I[s] : void 0,
                      right: j ? L[s] : void 0
                    },
                    ...e.editable ? { "data-no-row-click": !0 } : {},
                    children: u && l ? /* @__PURE__ */ t("div", { className: "flex-1 flex items-center px-1 py-1", children: /* @__PURE__ */ t(
                      ne,
                      {
                        value: l.editValue,
                        onChange: H,
                        onComplete: () => J(e, r),
                        onCancel: Q,
                        row: r,
                        error: l.error
                      }
                    ) }) : /* @__PURE__ */ t("div", { className: ae, onClick: oe, children: S })
                  },
                  c
                );
              })
            ]
          }
        ),
        a && y && /* @__PURE__ */ t(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700",
            children: y
          }
        )
      ]
    }
  );
}
const Ne = d.memo(me);
export {
  Ne as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
