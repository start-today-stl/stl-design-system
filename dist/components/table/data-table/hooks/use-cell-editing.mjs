import * as n from "react";
function K({
  columns: E,
  data: p,
  onCellChange: R
}) {
  const [d, l] = n.useState(null), [b, o] = n.useState(null), u = n.useRef(null), g = n.useRef(null), f = n.useRef(d);
  f.current = d;
  const w = n.useRef(E);
  w.current = E;
  const k = n.useRef(p);
  k.current = p;
  const s = n.useRef(R);
  s.current = R;
  const x = n.useCallback(
    (e, c, t) => {
      l({ rowId: e, columnKey: c }), o(t), u.current = t;
    },
    []
  ), m = n.useCallback(
    (e, c) => {
      var r;
      const t = f.current, i = u.current;
      if (!t || i === null) {
        l(null), o(null), u.current = null;
        return;
      }
      if (e.validate) {
        const a = e.validate(i, c);
        if (a !== !0) {
          l({ ...t, error: a });
          return;
        }
      }
      (r = s.current) == null || r.call(s, t.rowId, t.columnKey, i), l(null), o(null), u.current = null;
    },
    []
  ), v = n.useCallback(() => {
    var i;
    const e = f.current;
    if (!e) return;
    const c = w.current.find((r) => r.accessorKey === e.columnKey), t = k.current.find((r) => r.id === e.rowId);
    if (c && t)
      m(c, t);
    else {
      const r = u.current;
      r !== null && ((i = s.current) == null || i.call(s, e.rowId, e.columnKey, r)), l(null), o(null), u.current = null;
    }
  }, [m]), y = n.useCallback(() => {
    l(null), o(null), u.current = null;
  }, []);
  return n.useEffect(() => {
    if (!d) return;
    const e = (c) => {
      var r, a;
      const t = c.target;
      (r = g.current) != null && r.contains(t) || (a = t.closest) != null && a.call(t, "[data-radix-popper-content-wrapper]") || v();
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [d, v]), {
    editingCell: d,
    editValue: b,
    editValueRef: u,
    editingCellRef: g,
    setEditingCell: l,
    setEditValue: o,
    startEditing: x,
    completeEditing: m,
    cancelEditing: y
  };
}
export {
  K as useCellEditing
};
//# sourceMappingURL=use-cell-editing.mjs.map
