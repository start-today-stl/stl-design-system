import * as r from "react";
const E = 50;
function g({
  resizable: W,
  columnWidths: i,
  onColumnResize: c
}) {
  const [d, h] = r.useState({}), [s, b] = r.useState(null), p = r.useRef(0), v = r.useRef(0), f = r.useRef(E), l = r.useCallback(
    (n) => {
      const t = String(n.accessorKey);
      if (i && t in i) return i[t];
      if (t in d) return d[t];
      if (typeof n.width == "number") return n.width;
    },
    [i, d]
  ), S = r.useCallback(
    (n, t) => {
      n.preventDefault(), n.stopPropagation();
      const e = n.currentTarget.parentElement, u = e == null ? void 0 : e.parentElement;
      if (b(t.accessorKey), p.current = n.clientX, v.current = (e == null ? void 0 : e.offsetWidth) ?? l(t) ?? 150, f.current = Math.max(
        E,
        typeof t.minWidth == "number" ? t.minWidth : 0
      ), !c && u) {
        const o = {};
        u.querySelectorAll("[data-column-key]").forEach((a) => {
          const k = a.getAttribute("data-column-key");
          k && (o[k] = a.offsetWidth);
        }), h((a) => ({ ...o, ...a }));
      }
    },
    [l, c]
  ), y = r.useCallback(
    (n) => {
      if (!s) return;
      const t = n.clientX - p.current;
      let e = v.current + t;
      e < f.current && (e = f.current);
      const u = String(s);
      c ? c(s, e) : h(
        (o) => o[u] === e ? o : { ...o, [u]: e }
      );
    },
    [s, c]
  ), m = r.useCallback(() => b(null), []);
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
