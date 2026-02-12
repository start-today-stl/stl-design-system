import { jsxs as e, jsx as r } from "react/jsx-runtime";
function n({ size: c = 24, className: l, ...o }) {
  return /* @__PURE__ */ e(
    "svg",
    {
      width: c,
      height: c,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: l,
      ...o,
      children: [
        /* @__PURE__ */ r("circle", { cx: "9", cy: "6", r: "1.5", fill: "currentColor" }),
        /* @__PURE__ */ r("circle", { cx: "15", cy: "6", r: "1.5", fill: "currentColor" }),
        /* @__PURE__ */ r("circle", { cx: "9", cy: "12", r: "1.5", fill: "currentColor" }),
        /* @__PURE__ */ r("circle", { cx: "15", cy: "12", r: "1.5", fill: "currentColor" }),
        /* @__PURE__ */ r("circle", { cx: "9", cy: "18", r: "1.5", fill: "currentColor" }),
        /* @__PURE__ */ r("circle", { cx: "15", cy: "18", r: "1.5", fill: "currentColor" })
      ]
    }
  );
}
export {
  n as DragHandleIcon
};
//# sourceMappingURL=DragHandleIcon.mjs.map
