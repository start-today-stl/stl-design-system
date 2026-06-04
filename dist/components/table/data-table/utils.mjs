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
function c(t) {
  return t.id ?? String(t.accessorKey);
}
export {
  r as getAlignClass,
  c as getColumnKey,
  u as getNumericColumnWidth,
  i as toPxString
};
//# sourceMappingURL=utils.mjs.map
