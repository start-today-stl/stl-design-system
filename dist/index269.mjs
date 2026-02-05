function n(s, e) {
  const t = e.startOfMonth(s), r = t.getDay();
  return r === 1 ? t : r === 0 ? e.addDays(t, -1 * 6) : e.addDays(t, -1 * (r - 1));
}
export {
  n as startOfBroadcastWeek
};
//# sourceMappingURL=index269.mjs.map
