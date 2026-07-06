import { jsx as u } from "react/jsx-runtime";
import * as i from "react";
import { cn as p } from "../../../lib/utils.mjs";
const B = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function C({
  row: s,
  columns: m,
  leftOffsets: b,
  rightOffsets: g,
  lastLeftPinnedIdx: x,
  firstRightPinnedIdx: y,
  showLeftShadow: v,
  showRightShadow: R,
  totalWidth: _,
  translateY: w,
  isHovered: k,
  onHover: o,
  onHeightChange: j
}) {
  const a = i.useRef(null);
  i.useLayoutEffect(() => {
    const t = a.current;
    if (!t) return;
    const e = () => j(s.id, t.offsetHeight);
    e();
    const r = new ResizeObserver(e);
    return r.observe(t), () => r.disconnect();
  }, [s.id]);
  const d = k ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900";
  return /* @__PURE__ */ u(
    "div",
    {
      ref: a,
      role: "row",
      className: p("absolute left-0 top-0 right-0 flex transition-colors", d),
      style: {
        minWidth: _,
        transform: `translate3d(0, ${Math.round(w)}px, 0)`
      },
      onMouseEnter: () => o(s.id),
      onMouseLeave: () => o(null),
      children: m.map((t, e) => {
        const r = t.id ?? String(t.accessorKey), l = s[t.accessorKey], L = t.cell ? t.cell(l, s) : l, n = typeof t.width == "number" ? t.width : void 0, W = typeof t.minWidth == "number" ? t.minWidth : void 0, c = t.pinned === "left", f = t.pinned === "right", h = c || f, M = e === x && v, z = e === y && R;
        return /* @__PURE__ */ u(
          "div",
          {
            role: "gridcell",
            className: p(
              "flex min-h-9 items-center pl-3 pr-1.5 py-1.5 text-xs text-slate-900 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700",
              n !== void 0 && "shrink-0",
              B[t.align ?? "left"],
              h && "sticky z-10 transition-colors",
              h && d,
              M && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
              z && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
            ),
            style: {
              width: n,
              minWidth: W,
              flex: n === void 0 ? "1 1 0" : void 0,
              left: c ? b[e] : void 0,
              right: f ? g[e] : void 0
            },
            children: L
          },
          r
        );
      })
    }
  );
}
const I = i.memo(C);
export {
  I as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
