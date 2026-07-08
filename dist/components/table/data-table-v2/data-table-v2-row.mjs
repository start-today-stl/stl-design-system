import { jsxs as N, jsx as r } from "react/jsx-runtime";
import * as c from "react";
import { cn as o } from "../../../lib/utils.mjs";
import { Checkbox as J } from "../../ui/checkbox.mjs";
import { DownIcon as Q } from "../../../icons/DownIcon.mjs";
import { RightIcon as S } from "../../../icons/RightIcon.mjs";
const U = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function X({
  row: t,
  rowIndex: R,
  columns: _,
  leftOffsets: w,
  rightOffsets: z,
  lastLeftPinnedIdx: C,
  firstRightPinnedIdx: h,
  showLeftShadow: L,
  showRightShadow: B,
  totalWidth: K,
  translateY: P,
  isHovered: D,
  onHover: u,
  onHeightChange: I,
  selectable: b,
  isSelected: m,
  onToggleSelect: M,
  checkboxColWidth: g,
  expandable: W,
  isExpanded: i,
  canExpand: F,
  onToggleExpand: T,
  expandedContent: x,
  expandColWidth: V,
  onRowClick: n,
  extraClassName: $
}) {
  const y = c.useRef(null);
  c.useLayoutEffect(() => {
    const e = y.current;
    if (!e) return;
    const s = () => I(t.id, e.offsetHeight);
    s();
    const l = new ResizeObserver(s);
    return l.observe(e), () => l.disconnect();
  }, [t.id, i]);
  const a = D ? "bg-slate-100 dark:bg-slate-800" : m ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-slate-900", d = c.useRef(!1), O = (e) => {
    e.target.closest("[data-no-row-click]") || n == null || n(t);
  };
  return /* @__PURE__ */ N(
    "div",
    {
      ref: y,
      role: "row",
      className: "absolute left-0 top-0 right-0 flex flex-col",
      style: {
        minWidth: K,
        transform: `translate3d(0, ${Math.round(P)}px, 0)`
      },
      children: [
        /* @__PURE__ */ N(
          "div",
          {
            className: o(
              "flex transition-colors",
              a,
              n && "cursor-pointer",
              $
            ),
            onMouseEnter: () => u(t.id),
            onMouseLeave: () => u(null),
            onClick: n ? O : void 0,
            children: [
              b && /* @__PURE__ */ r(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    a
                  ),
                  style: { width: g, left: 0 },
                  onClick: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ r(
                    J,
                    {
                      checked: m,
                      onClick: (e) => {
                        d.current = e.shiftKey;
                      },
                      onCheckedChange: () => {
                        M(t.id, R, d.current), d.current = !1;
                      },
                      "aria-label": `행 ${t.id} 선택`
                    }
                  )
                }
              ),
              W && /* @__PURE__ */ r(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: o(
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    a
                  ),
                  style: {
                    width: V,
                    left: b ? g : 0
                  },
                  onClick: (e) => e.stopPropagation(),
                  children: F && /* @__PURE__ */ r(
                    "button",
                    {
                      type: "button",
                      onClick: () => T(t.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": i ? "행 접기" : "행 펼치기",
                      "aria-expanded": i,
                      children: i ? /* @__PURE__ */ r(Q, { size: 24 }) : /* @__PURE__ */ r(S, { size: 24 })
                    }
                  )
                }
              ),
              _.map((e, s) => {
                const l = e.id ?? String(e.accessorKey), p = t[e.accessorKey], q = e.cell ? e.cell(p, t) : p, f = typeof e.width == "number" ? e.width : void 0, A = typeof e.minWidth == "number" ? e.minWidth : void 0, k = e.pinned === "left", v = e.pinned === "right", j = k || v, G = o(
                  "flex min-h-9 border-b border-slate-200 dark:border-slate-700",
                  f !== void 0 && "shrink-0",
                  j && "sticky z-10 transition-colors",
                  j && a,
                  s === h && "ml-auto",
                  s === C && L && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  s === h && B && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
                ), H = o(
                  "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
                  U[e.align ?? "left"]
                );
                return /* @__PURE__ */ r(
                  "div",
                  {
                    role: "gridcell",
                    className: G,
                    style: {
                      width: f,
                      minWidth: A,
                      flex: f === void 0 ? "1 1 0" : void 0,
                      left: k ? w[s] : void 0,
                      right: v ? z[s] : void 0
                    },
                    children: /* @__PURE__ */ r("div", { className: H, children: q })
                  },
                  l
                );
              })
            ]
          }
        ),
        i && x && /* @__PURE__ */ r(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700",
            children: x
          }
        )
      ]
    }
  );
}
const ne = c.memo(X);
export {
  ne as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
