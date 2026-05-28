import * as l from "react";
function b({
  columns: a,
  data: f,
  onCellChange: i
}) {
  const [e, c] = l.useState(null), [k, s] = l.useState(null), r = l.useRef(null), m = l.useRef(null), v = l.useCallback(
    (n, u, t) => {
      c({ rowId: n, columnKey: u }), s(t), r.current = t;
    },
    []
  ), o = l.useCallback(
    (n, u) => {
      const t = r.current;
      if (!e || t === null) {
        c(null), s(null), r.current = null;
        return;
      }
      if (n.validate) {
        const d = n.validate(t, u);
        if (d !== !0) {
          c({ ...e, error: d });
          return;
        }
      }
      i && i(e.rowId, e.columnKey, t), c(null), s(null), r.current = null;
    },
    [e, i]
  ), E = l.useCallback(() => {
    if (!e) return;
    const n = a.find((t) => t.accessorKey === e.columnKey), u = f.find((t) => t.id === e.rowId);
    if (n && u)
      o(n, u);
    else {
      const t = r.current;
      t !== null && i && i(e.rowId, e.columnKey, t), c(null), s(null), r.current = null;
    }
  }, [e, a, f, i, o]), R = l.useCallback(() => {
    c(null), s(null), r.current = null;
  }, []);
  return l.useEffect(() => {
    if (!e) return;
    const n = (u) => {
      var p, w;
      const t = u.target;
      (p = m.current) != null && p.contains(t) || (w = t.closest) != null && w.call(t, "[data-radix-popper-content-wrapper]") || E();
    };
    return document.addEventListener("mousedown", n), () => document.removeEventListener("mousedown", n);
  }, [e, E]), {
    editingCell: e,
    editValue: k,
    editValueRef: r,
    editingCellRef: m,
    setEditingCell: c,
    setEditValue: s,
    startEditing: v,
    completeEditing: o,
    cancelEditing: R
  };
}
export {
  b as useCellEditing
};
//# sourceMappingURL=use-cell-editing.mjs.map
