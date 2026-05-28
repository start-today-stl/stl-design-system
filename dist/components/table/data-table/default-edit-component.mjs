import { jsxs as i, jsx as l } from "react/jsx-runtime";
import * as s from "react";
import { Input as p } from "../../ui/input.mjs";
function m({
  value: u,
  onChange: f,
  onComplete: r,
  onCancel: c,
  error: t
}) {
  const n = s.useRef(null);
  s.useEffect(() => {
    var e, a;
    (e = n.current) == null || e.focus(), (a = n.current) == null || a.select();
  }, []);
  const o = (e) => {
    e.key === "Enter" ? (e.preventDefault(), r()) : e.key === "Escape" && (e.preventDefault(), c());
  };
  return /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ l(
      p,
      {
        ref: n,
        value: String(u ?? ""),
        onChange: (e) => f(e.target.value),
        onKeyDown: o,
        onBlur: r,
        error: !!t,
        tableMode: !0,
        className: "w-full px-2 text-xs"
      }
    ),
    t && /* @__PURE__ */ l("span", { className: "text-[10px] text-destructive dark:text-red-400", children: t })
  ] });
}
export {
  m as DefaultEditComponent
};
//# sourceMappingURL=default-edit-component.mjs.map
