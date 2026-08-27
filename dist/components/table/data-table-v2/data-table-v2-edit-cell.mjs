import { jsx as v } from "react/jsx-runtime";
import * as e from "react";
import { DataTableV2DefaultEdit as T } from "./data-table-v2-default-edit.mjs";
import { DataTableV2NumberEdit as V } from "./data-table-v2-number-edit.mjs";
function L({
  row: r,
  column: t,
  error: a,
  onComplete: o,
  onCancel: C,
  onClearError: f
}) {
  const [l, h] = e.useState(r[t.accessorKey]), i = e.useRef(l), d = e.useRef(a);
  d.current = a;
  const c = e.useRef(!1), E = e.useCallback(
    (n) => {
      i.current = n, c.current = !1, h(n), d.current !== void 0 && f();
    },
    [f]
  ), u = e.useCallback(() => {
    c.current || (c.current = !0, o(t, r, i.current));
  }, [o, t, r]), m = e.useRef(null), p = e.useRef(u);
  p.current = u, e.useEffect(() => {
    const n = (D) => {
      var R, b;
      const s = D.target;
      (R = m.current) != null && R.contains(s) || (b = s.closest) != null && b.call(s, "[data-radix-popper-content-wrapper]") || p.current();
    };
    return document.addEventListener("mousedown", n), () => document.removeEventListener("mousedown", n);
  }, []);
  const x = t.editComponent ?? (t.editType === "number" ? V : T);
  return /* @__PURE__ */ v("div", { ref: m, className: "flex-1 flex items-center px-1", children: /* @__PURE__ */ v(
    x,
    {
      value: l,
      onChange: E,
      onComplete: u,
      onCancel: C,
      row: r,
      error: a
    }
  ) });
}
export {
  L as DataTableV2EditCell
};
//# sourceMappingURL=data-table-v2-edit-cell.mjs.map
