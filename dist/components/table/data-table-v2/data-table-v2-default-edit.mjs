import { jsxs as i, jsx as r } from "react/jsx-runtime";
import * as s from "react";
import { Input as p } from "../../ui/input.mjs";
function m({
  value: u,
  onChange: f,
  onComplete: l,
  onCancel: c,
  error: t
}) {
  const a = s.useRef(null);
  s.useEffect(() => {
    var e, n;
    (e = a.current) == null || e.focus(), (n = a.current) == null || n.select();
  }, []);
  const o = (e) => {
    e.key === "Enter" ? (e.preventDefault(), l()) : e.key === "Escape" && (e.preventDefault(), c());
  };
  return /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5 w-full", children: [
    /* @__PURE__ */ r(
      p,
      {
        ref: a,
        value: String(u ?? ""),
        onChange: (e) => f(e.target.value),
        onKeyDown: o,
        onBlur: l,
        error: !!t,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    t && /* @__PURE__ */ r("span", { className: "text-[10px] text-destructive dark:text-red-400", children: t })
  ] });
}
export {
  m as DataTableV2DefaultEdit
};
//# sourceMappingURL=data-table-v2-default-edit.mjs.map
