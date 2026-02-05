function r(s, t) {
  const e = t.startOfMonth(s), n = e.getDay() > 0 ? e.getDay() : 7, a = t.addDays(s, -n + 1), o = t.addDays(a, 5 * 7 - 1);
  return t.getMonth(s) === t.getMonth(o) ? 5 : 4;
}
export {
  r as getBroadcastWeeksInMonth
};
//# sourceMappingURL=index338.mjs.map
