import * as r from "react";
const E = 50;
function g({
  resizable: W,
  columnWidths: c,
  onColumnResize: o
}) {
  const [d, h] = r.useState({}), [s, p] = r.useState(null), v = r.useRef(0), b = r.useRef(0), f = r.useRef(E), l = r.useCallback(
    (n) => {
      const e = String(n.accessorKey);
      if (c && e in c) return c[e];
      if (e in d) return d[e];
      if (typeof n.width == "number") return n.width;
    },
    [c, d]
  ), S = r.useCallback(
    (n, e) => {
      n.preventDefault(), n.stopPropagation();
      const t = n.currentTarget.parentElement, u = t == null ? void 0 : t.parentElement;
      if (p(e.accessorKey), v.current = n.clientX, b.current = (t == null ? void 0 : t.offsetWidth) ?? l(e) ?? 150, f.current = Math.max(
        E,
        typeof e.minWidth == "number" ? e.minWidth : 0
      ), !o && u) {
        const i = {};
        u.querySelectorAll("[data-column-key]").forEach((a) => {
          const k = a.getAttribute("data-column-key");
          k && (i[k] = a.offsetWidth);
        }), h((a) => ({ ...i, ...a }));
      }
    },
    [l, o]
  ), y = r.useCallback(
    (n) => {
      if (!s) return;
      const e = n.clientX - v.current;
      let t = b.current + e;
      t < f.current && (t = f.current);
      const u = String(s);
      o ? o(s, t) : h((i) => ({ ...i, [u]: t }));
    },
    [s, o]
  ), m = r.useCallback(() => p(null), []);
  return r.useEffect(() => {
    if (s)
      return document.addEventListener("mousemove", y), document.addEventListener("mouseup", m), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
        document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", m), document.body.style.userSelect = "", document.body.style.cursor = "";
      };
  }, [s, y, m]), {
    resizingKey: s,
    getColumnWidth: W ? l : () => {
    },
    handleResizeStart: S
  };
}
export {
  g as useColumnResize
};
//# sourceMappingURL=use-column-resize.mjs.map
