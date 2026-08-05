import { jsx as C } from "react/jsx-runtime";
import * as e from "react";
import { DataTableV2DefaultEdit as V } from "./data-table-v2-default-edit.mjs";
function L({
  row: n,
  column: r,
  error: c,
  onComplete: o,
  onCancel: h,
  onClearError: f
}) {
  const [l, x] = e.useState(n[r.accessorKey]), i = e.useRef(l), d = e.useRef(c);
  d.current = c;
  const u = e.useRef(!1), E = e.useCallback(
    (t) => {
      i.current = t, u.current = !1, x(t), d.current !== void 0 && f();
    },
    [f]
  ), a = e.useCallback(() => {
    u.current || (u.current = !0, o(r, n, i.current));
  }, [o, r, n]), m = e.useRef(null), p = e.useRef(a);
  p.current = a, e.useEffect(() => {
    const t = (D) => {
      var R, v;
      const s = D.target;
      (R = m.current) != null && R.contains(s) || (v = s.closest) != null && v.call(s, "[data-radix-popper-content-wrapper]") || p.current();
    };
    return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
  }, []);
  const b = r.editComponent ?? V;
  return /* @__PURE__ */ C("div", { ref: m, className: "flex-1 flex items-center px-1", children: /* @__PURE__ */ C(
    b,
    {
      value: l,
      onChange: E,
      onComplete: a,
      onCancel: h,
      row: n,
      error: c
    }
  ) });
}
export {
  L as DataTableV2EditCell
};
//# sourceMappingURL=data-table-v2-edit-cell.mjs.map
