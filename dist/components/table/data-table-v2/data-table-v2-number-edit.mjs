import { jsxs as d, jsx as c } from "react/jsx-runtime";
import * as u from "react";
import { Input as x } from "../../ui/input.mjs";
const i = (e) => {
  if (e === "" || e === null || e === void 0) return "";
  const n = String(e).replace(/,/g, "");
  return isNaN(Number(n)) ? String(e) : Number(n).toLocaleString();
}, g = (e) => e.replace(/,/g, "");
function b({
  value: e,
  onChange: n,
  onComplete: o,
  onCancel: f,
  error: s
}) {
  const l = u.useRef(null), [m, p] = u.useState(
    () => i(e)
  );
  return u.useEffect(() => {
    var t, r;
    (t = l.current) == null || t.focus(), (r = l.current) == null || r.select();
  }, []), /* @__PURE__ */ d("div", { className: "flex flex-col gap-0.5 w-full", children: [
    /* @__PURE__ */ c(
      x,
      {
        ref: l,
        value: m,
        onChange: (t) => {
          const r = t.target.value, a = g(r);
          a !== "" && isNaN(Number(a)) || (p(i(a)), n(a));
        },
        onKeyDown: (t) => {
          t.key === "Enter" ? (t.preventDefault(), o()) : t.key === "Escape" && (t.preventDefault(), f());
        },
        onBlur: o,
        error: !!s,
        tableMode: !0,
        className: "w-full px-2 text-xs text-right"
      }
    ),
    s && /* @__PURE__ */ c("span", { className: "text-[10px] text-destructive dark:text-red-400", children: s })
  ] });
}
export {
  b as DataTableV2NumberEdit
};
//# sourceMappingURL=data-table-v2-number-edit.mjs.map
