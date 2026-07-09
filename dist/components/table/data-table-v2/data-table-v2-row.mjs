import { jsxs as _, jsx as r } from "react/jsx-runtime";
import * as d from "react";
import { cn as a } from "../../../lib/utils.mjs";
import { Checkbox as ne } from "../../ui/checkbox.mjs";
import { DownIcon as ae } from "../../../icons/DownIcon.mjs";
import { RightIcon as oe } from "../../../icons/RightIcon.mjs";
import { DataTableV2DefaultEdit as le } from "./data-table-v2-default-edit.mjs";
const ce = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function de({
  row: t,
  rowIndex: z,
  columns: R,
  leftOffsets: D,
  rightOffsets: K,
  lastLeftPinnedIdx: w,
  firstRightPinnedIdx: u,
  showLeftShadow: L,
  showRightShadow: P,
  totalWidth: V,
  translateY: I,
  isHovered: M,
  onHover: m,
  onHeightChange: T,
  selectable: p,
  isSelected: g,
  onToggleSelect: W,
  checkboxColWidth: x,
  expandable: B,
  isExpanded: i,
  canExpand: E,
  onToggleExpand: $,
  expandedContent: k,
  expandColWidth: F,
  onRowClick: n,
  extraClassName: O,
  editingColumnKey: q,
  editingState: o,
  onStartEdit: A,
  onChangeEditValue: G,
  onCompleteEdit: H,
  onCancelEdit: J
}) {
  const v = d.useRef(null);
  d.useLayoutEffect(() => {
    const e = v.current;
    if (!e) return;
    const s = () => T(t.id, e.offsetHeight);
    s();
    const c = new ResizeObserver(s);
    return c.observe(e), () => c.disconnect();
  }, [t.id, i]);
  const l = M ? "bg-slate-100 dark:bg-slate-800" : g ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-slate-900", f = d.useRef(!1), Q = (e) => {
    e.target.closest("[data-no-row-click]") || n == null || n(t);
  };
  return /* @__PURE__ */ _(
    "div",
    {
      ref: v,
      role: "row",
      className: "absolute left-0 top-0 right-0 flex flex-col",
      style: {
        minWidth: V,
        transform: `translate3d(0, ${Math.round(I)}px, 0)`
      },
      children: [
        /* @__PURE__ */ _(
          "div",
          {
            className: a(
              "flex transition-colors",
              l,
              n && "cursor-pointer",
              O
            ),
            onMouseEnter: () => m(t.id),
            onMouseLeave: () => m(null),
            onClick: n ? Q : void 0,
            children: [
              p && /* @__PURE__ */ r(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: a(
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    l
                  ),
                  style: { width: x, left: 0 },
                  onClick: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ r(
                    ne,
                    {
                      checked: g,
                      onClick: (e) => {
                        f.current = e.shiftKey;
                      },
                      onCheckedChange: () => {
                        W(t.id, z, f.current), f.current = !1;
                      },
                      "aria-label": `행 ${t.id} 선택`
                    }
                  )
                }
              ),
              B && /* @__PURE__ */ r(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: a(
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    l
                  ),
                  style: {
                    width: F,
                    left: p ? x : 0
                  },
                  onClick: (e) => e.stopPropagation(),
                  children: E && /* @__PURE__ */ r(
                    "button",
                    {
                      type: "button",
                      onClick: () => $(t.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": i ? "행 접기" : "행 펼치기",
                      "aria-expanded": i,
                      children: i ? /* @__PURE__ */ r(ae, { size: 24 }) : /* @__PURE__ */ r(oe, { size: 24 })
                    }
                  )
                }
              ),
              R.map((e, s) => {
                const c = e.id ?? String(e.accessorKey), y = t[e.accessorKey], U = e.cell ? e.cell(y, t) : y, b = typeof e.width == "number" ? e.width : void 0, X = typeof e.minWidth == "number" ? e.minWidth : void 0, C = e.pinned === "left", N = e.pinned === "right", j = C || N, Y = s === w && L, Z = s === u && P, S = s === u, h = !!o && q === e.accessorKey, ee = a(
                  "flex min-h-9 border-b border-slate-200 dark:border-slate-700",
                  b !== void 0 && "shrink-0",
                  j && "sticky z-10 transition-colors",
                  j && l,
                  S && "ml-auto",
                  Y && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  Z && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
                ), te = a(
                  "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
                  ce[e.align ?? "left"],
                  e.editable && !h && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
                ), re = e.editComponent ?? le, se = e.editable ? (ie) => {
                  ie.stopPropagation(), h || A(t, e);
                } : void 0;
                return /* @__PURE__ */ r(
                  "div",
                  {
                    role: "gridcell",
                    className: ee,
                    style: {
                      width: b,
                      minWidth: X,
                      flex: b === void 0 ? "1 1 0" : void 0,
                      left: C ? D[s] : void 0,
                      right: N ? K[s] : void 0
                    },
                    ...e.editable ? { "data-no-row-click": !0 } : {},
                    children: h && o ? /* @__PURE__ */ r("div", { className: "flex-1 flex items-center px-1 py-1", children: /* @__PURE__ */ r(
                      re,
                      {
                        value: o.editValue,
                        onChange: G,
                        onComplete: () => H(e, t),
                        onCancel: J,
                        row: t,
                        error: o.error
                      }
                    ) }) : /* @__PURE__ */ r("div", { className: te, onClick: se, children: U })
                  },
                  c
                );
              })
            ]
          }
        ),
        i && k && /* @__PURE__ */ r(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700",
            children: k
          }
        )
      ]
    }
  );
}
const ge = d.memo(de);
export {
  ge as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
