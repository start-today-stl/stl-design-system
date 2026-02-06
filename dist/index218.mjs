import * as f from "./index236.mjs";
function i(n) {
  return n != null && n.formatMonthCaption && !n.formatCaption && (n.formatCaption = n.formatMonthCaption), n != null && n.formatYearCaption && !n.formatYearDropdown && (n.formatYearDropdown = n.formatYearCaption), {
    ...f,
    ...n
  };
}
export {
  i as getFormatters
};
//# sourceMappingURL=index218.mjs.map
