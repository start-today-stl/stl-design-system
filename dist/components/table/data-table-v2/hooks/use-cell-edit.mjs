import * as r from "react";
function V({
  onCellChange: a
}) {
  const [i, s] = r.useState(null), c = r.useCallback(
    (e, t) => {
      t.editable && s({
        rowId: e.id,
        columnKey: t.accessorKey,
        editValue: e[t.accessorKey]
      });
    },
    []
  ), l = r.useCallback((e) => {
    s((t) => t && { ...t, editValue: e, error: void 0 });
  }, []), n = r.useCallback(
    (e, t) => {
      s((u) => {
        if (!u) return u;
        if (u.editValue === t[e.accessorKey]) return null;
        if (e.validate) {
          const d = e.validate(u.editValue, t);
          if (d !== !0)
            return { ...u, error: d };
        }
        return a == null || a(t.id, e.accessorKey, u.editValue), null;
      });
    },
    [a]
  ), o = r.useCallback(() => s(null), []), E = r.useCallback(
    (e, t) => !!i && i.rowId === e && i.columnKey === t,
    [i]
  );
  return {
    editing: i,
    isEditing: E,
    getEditingState: (e, t) => !i || i.rowId !== e || i.columnKey !== t ? null : { editValue: i.editValue, error: i.error },
    startEdit: c,
    changeEditValue: l,
    completeEdit: n,
    cancelEdit: o
  };
}
export {
  V as useCellEdit
};
//# sourceMappingURL=use-cell-edit.mjs.map
