function r(t) {
  switch (t) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
}
function i(t) {
  return typeof t == "number" ? `${t}px` : t;
}
function u(t) {
  const e = t.width ?? t.minWidth;
  if (typeof e == "number") return e;
  const n = parseInt(String(e ?? ""), 10);
  return Number.isFinite(n) ? n : 150;
}
export {
  r as getAlignClass,
  u as getNumericColumnWidth,
  i as toPxString
};
//# sourceMappingURL=utils.mjs.map
