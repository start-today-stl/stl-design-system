const e = 120, t = 32, a = 40, s = 40, r = 40, l = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
}, o = [
  "bg-white dark:bg-slate-900",
  "hover:bg-slate-100 dark:hover:bg-slate-800",
  "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
  "data-[state=selected]:hover:bg-blue-100 dark:data-[state=selected]:hover:bg-blue-950"
].join(" "), d = [
  "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
  "group-[[data-state=selected]]:bg-blue-50 dark:group-[[data-state=selected]]:bg-blue-900",
  "group-[[data-state=selected]:hover]:bg-blue-100 dark:group-[[data-state=selected]:hover]:bg-blue-950"
].join(" "), g = "bg-white dark:bg-slate-900";
export {
  a as CHECKBOX_COL_WIDTH,
  e as DEFAULT_COL_WIDTH,
  t as DRAG_HANDLE_COL_WIDTH,
  s as EXPAND_COL_WIDTH,
  r as ROW_ACTIONS_WIDTH,
  d as ROW_BG_DESCENDANT,
  o as ROW_BG_SELF,
  g as STICKY_CELL_BASE_BG,
  l as alignClass
};
//# sourceMappingURL=constants.mjs.map
