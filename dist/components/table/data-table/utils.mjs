function n(t) {
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
  const e = t.width ?? t.minWidth;
  if (typeof e == "number") return e;
  const r = parseInt(String(e ?? ""), 10);
  return Number.isFinite(r) ? r : 150;
}
export {
  n as getAlignClass,
  i as getNumericColumnWidth
};
//# sourceMappingURL=utils.mjs.map
