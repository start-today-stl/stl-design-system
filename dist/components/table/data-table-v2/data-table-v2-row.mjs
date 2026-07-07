import { jsx as i } from "react/jsx-runtime";
import * as a from "react";
import { cn as o } from "../../../lib/utils.mjs";
const M = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function N({
  row: s,
  columns: x,
  leftOffsets: p,
  rightOffsets: b,
  lastLeftPinnedIdx: y,
  firstRightPinnedIdx: d,
  showLeftShadow: v,
  showRightShadow: R,
  totalWidth: _,
  translateY: w,
  isHovered: k,
  onHover: l,
  onHeightChange: L
}) {
  const c = a.useRef(null);
  a.useLayoutEffect(() => {
    const t = c.current;
    if (!t) return;
    const e = () => L(s.id, t.offsetHeight);
    e();
    const n = new ResizeObserver(e);
    return n.observe(t), () => n.disconnect();
  }, [s.id]);
  const f = k ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900";
  return /* @__PURE__ */ i(
    "div",
    {
      ref: c,
      role: "row",
      className: o("absolute left-0 top-0 right-0 flex transition-colors", f),
      style: {
        minWidth: _,
        transform: `translate3d(0, ${Math.round(w)}px, 0)`
      },
      onMouseEnter: () => l(s.id),
      onMouseLeave: () => l(null),
      children: x.map((t, e) => {
        const n = t.id ?? String(t.accessorKey), u = s[t.accessorKey], j = t.cell ? t.cell(u, s) : u, r = typeof t.width == "number" ? t.width : void 0, B = typeof t.minWidth == "number" ? t.minWidth : void 0, h = t.pinned === "left", m = t.pinned === "right", g = h || m, C = o(
          "flex min-h-9 border-b border-slate-200 dark:border-slate-700",
          r !== void 0 && "shrink-0",
          g && "sticky z-10 transition-colors",
          g && f,
          e === d && "ml-auto",
          e === y && v && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          e === d && R && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        ), W = o(
          "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
          M[t.align ?? "left"]
        );
        return /* @__PURE__ */ i(
          "div",
          {
            role: "gridcell",
            className: C,
            style: {
              width: r,
              minWidth: B,
              flex: r === void 0 ? "1 1 0" : void 0,
              left: h ? p[e] : void 0,
              right: m ? b[e] : void 0
            },
            children: /* @__PURE__ */ i("div", { className: W, children: j })
          },
          n
        );
      })
    }
  );
}
const P = a.memo(N);
export {
  P as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
