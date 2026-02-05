import { enUS as n } from "./index339.mjs";
import { format as f } from "./index312.mjs";
const b = {
  ...n,
  labels: {
    labelDayButton: (r, a, l, e) => {
      let t;
      e && typeof e.format == "function" ? t = e.format.bind(e) : t = (c, m) => f(c, m, { locale: n, ...l });
      let o = t(r, "PPPP");
      return a.today && (o = `Today, ${o}`), a.selected && (o = `${o}, selected`), o;
    },
    labelMonthDropdown: "Choose the Month",
    labelNext: "Go to the Next Month",
    labelPrevious: "Go to the Previous Month",
    labelWeekNumber: (r) => `Week ${r}`,
    labelYearDropdown: "Choose the Year",
    labelGrid: (r, a, l) => {
      let e;
      return l && typeof l.format == "function" ? e = l.format.bind(l) : e = (t, o) => f(t, o, { locale: n, ...a }), e(r, "LLLL yyyy");
    },
    labelGridcell: (r, a, l, e) => {
      let t;
      e && typeof e.format == "function" ? t = e.format.bind(e) : t = (c, m) => f(c, m, { locale: n, ...l });
      let o = t(r, "PPPP");
      return a != null && a.today && (o = `Today, ${o}`), o;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (r, a, l) => {
      let e;
      return l && typeof l.format == "function" ? e = l.format.bind(l) : e = (t, o) => f(t, o, { locale: n, ...a }), e(r, "cccc");
    }
  }
};
export {
  b as enUS
};
//# sourceMappingURL=index239.mjs.map
