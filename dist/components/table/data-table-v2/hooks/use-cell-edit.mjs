import * as i from "react";
function E({
  onCellChange: c
}) {
  const [d, r] = i.useState(null), o = i.useCallback(
    (t, s) => {
      s.editable && r({ rowId: t.id, columnKey: s.accessorKey });
    },
    []
  ), l = i.useCallback(() => {
    r(
      (t) => t && t.error !== void 0 ? { ...t, error: void 0 } : t
    );
  }, []), n = i.useCallback(
    (t, s, e) => {
      if (e === s[t.accessorKey]) {
        r(null);
        return;
      }
      if (t.validate) {
        const a = t.validate(e, s);
        if (a !== !0) {
          r((u) => u && { ...u, error: a });
          return;
        }
      }
      r(null), c == null || c(s.id, t.accessorKey, e);
    },
    [c]
  ), f = i.useCallback(() => r(null), []);
  return {
    editing: d,
    startEdit: o,
    clearError: l,
    completeEdit: n,
    cancelEdit: f
  };
}
export {
  E as useCellEdit
};
//# sourceMappingURL=use-cell-edit.mjs.map
