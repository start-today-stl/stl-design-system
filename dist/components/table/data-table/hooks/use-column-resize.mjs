import * as n from "react";
function C({
  resizable: y,
  columnWidths: s,
  onColumnResize: u
}) {
  const [i, h] = n.useState({}), [r, l] = n.useState(null), m = n.useRef(0), f = n.useRef(0), c = n.useCallback(
    (e) => {
      const t = String(e.accessorKey);
      if (s && t in s)
        return s[t];
      if (t in i)
        return i[t];
      if (e.width)
        return typeof e.width == "number" ? e.width : parseInt(e.width, 10);
    },
    [s, i]
  ), v = n.useCallback(
    (e, t) => {
      e.preventDefault(), e.stopPropagation(), l(t.accessorKey), m.current = e.clientX;
      const o = c(t) ?? 150;
      f.current = o;
    },
    [c]
  ), a = n.useCallback(
    (e) => {
      if (!r) return;
      const t = e.clientX - m.current, o = Math.max(50, f.current + t), b = String(r);
      u ? u(r, o) : h((p) => ({ ...p, [b]: o }));
    },
    [r, u]
  ), d = n.useCallback(() => {
    l(null);
  }, []);
  return n.useEffect(() => {
    if (r)
      return document.addEventListener("mousemove", a), document.addEventListener("mouseup", d), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", a), document.removeEventListener("mouseup", d), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [r, a, d]), {
    resizingColumn: r,
    getColumnWidth: y ? c : () => {
    },
    handleResizeStart: v
  };
}
export {
  C as useColumnResize
};
//# sourceMappingURL=use-column-resize.mjs.map
