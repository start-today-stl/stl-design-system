import * as n from "react";
function g({
  resizable: v,
  columnWidths: o,
  onColumnResize: u
}) {
  const [c, b] = n.useState({}), [r, m] = n.useState(null), f = n.useRef(0), y = n.useRef(0), i = n.useCallback(
    (e) => {
      const t = String(e.accessorKey);
      if (o && t in o) return o[t];
      if (t in c) return c[t];
      if (typeof e.width == "number") return e.width;
    },
    [o, c]
  ), h = n.useCallback(
    (e, t) => {
      e.preventDefault(), e.stopPropagation(), m(t.accessorKey), f.current = e.clientX;
      const s = e.currentTarget.parentElement, l = s == null ? void 0 : s.offsetWidth;
      y.current = l ?? i(t) ?? 150;
    },
    [i]
  ), a = n.useCallback(
    (e) => {
      if (!r) return;
      const t = e.clientX - f.current, s = Math.max(50, y.current + t), l = String(r);
      u ? u(r, s) : b((p) => ({ ...p, [l]: s }));
    },
    [r, u]
  ), d = n.useCallback(() => m(null), []);
  return n.useEffect(() => {
    if (r)
      return document.addEventListener("mousemove", a), document.addEventListener("mouseup", d), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", a), document.removeEventListener("mouseup", d), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [r, a, d]), {
    resizingKey: r,
    getColumnWidth: v ? i : () => {
    },
    handleResizeStart: h
  };
}
export {
  g as useColumnResize
};
//# sourceMappingURL=use-column-resize.mjs.map
