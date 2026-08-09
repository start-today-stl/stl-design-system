const e = 120, t = 32, a = 40, s = 40, r = 40, g = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
}, l = [
  "bg-white dark:bg-slate-900",
  "hover:bg-slate-100 dark:hover:bg-slate-800",
  "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
  "data-[state=selected]:hover:bg-blue-100 dark:data-[state=selected]:hover:bg-blue-950"
].join(" "), b = [
  "bg-white dark:bg-slate-900",
  "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
  "group-[[data-state=selected]]:bg-blue-50 dark:group-[[data-state=selected]]:bg-blue-900",
  "group-[[data-state=selected]:hover]:bg-blue-100 dark:group-[[data-state=selected]:hover]:bg-blue-950"
].join(" "), d = "bg-white dark:bg-slate-900";
export {
  a as CHECKBOX_COL_WIDTH,
  e as DEFAULT_COL_WIDTH,
  t as DRAG_HANDLE_COL_WIDTH,
  s as EXPAND_COL_WIDTH,
  r as ROW_ACTIONS_WIDTH,
  b as ROW_BG_DESCENDANT,
  l as ROW_BG_SELF,
  d as STICKY_CELL_BASE_BG,
  g as alignClass
};
//# sourceMappingURL=constants.mjs.map
