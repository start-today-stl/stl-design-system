import * as n from "react";
function g({
  resizable: f,
  columnWidths: s,
  onColumnResize: o
}) {
  const [u, v] = n.useState({}), [r, d] = n.useState(null), l = n.useRef(0), m = n.useRef(0), c = n.useCallback(
    (e) => {
      const t = String(e.accessorKey);
      if (s && t in s) return s[t];
      if (t in u) return u[t];
      if (typeof e.width == "number") return e.width;
    },
    [s, u]
  ), b = n.useCallback(
    (e, t) => {
      e.preventDefault(), e.stopPropagation(), d(t.accessorKey), l.current = e.clientX, m.current = c(t) ?? 150;
    },
    [c]
  ), i = n.useCallback(
    (e) => {
      if (!r) return;
      const t = e.clientX - l.current, y = Math.max(50, m.current + t), h = String(r);
      o ? o(r, y) : v((p) => ({ ...p, [h]: y }));
    },
    [r, o]
  ), a = n.useCallback(() => d(null), []);
  return n.useEffect(() => {
    if (r)
      return document.addEventListener("mousemove", i), document.addEventListener("mouseup", a), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", i), document.removeEventListener("mouseup", a), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [r, i, a]), {
    resizingKey: r,
    getColumnWidth: f ? c : () => {
    },
    handleResizeStart: b
  };
}
export {
  g as useColumnResize
};
//# sourceMappingURL=use-column-resize.mjs.map
