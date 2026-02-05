import * as d from "./index248.mjs";
import { labelWeekday as p } from "./index256.mjs";
import { labelWeekNumberHeader as f } from "./index258.mjs";
import { labelNav as N } from "./index253.mjs";
import { labelGridcell as k } from "./index251.mjs";
import { labelGrid as D } from "./index250.mjs";
import { labelYearDropdown as W } from "./index259.mjs";
import { labelWeekNumber as a } from "./index257.mjs";
import { labelPrevious as v } from "./index255.mjs";
import { labelNext as y } from "./index254.mjs";
import { labelMonthDropdown as w } from "./index252.mjs";
import { labelDayButton as G } from "./index249.mjs";
const l = (r, i, e) => i || (e ? typeof e == "function" ? e : (...n) => e : r);
function q(r, i) {
  var n;
  const e = ((n = i.locale) == null ? void 0 : n.labels) ?? {};
  return {
    ...d,
    ...r ?? {},
    labelDayButton: l(G, r == null ? void 0 : r.labelDayButton, e.labelDayButton),
    labelMonthDropdown: l(w, r == null ? void 0 : r.labelMonthDropdown, e.labelMonthDropdown),
    labelNext: l(y, r == null ? void 0 : r.labelNext, e.labelNext),
    labelPrevious: l(v, r == null ? void 0 : r.labelPrevious, e.labelPrevious),
    labelWeekNumber: l(a, r == null ? void 0 : r.labelWeekNumber, e.labelWeekNumber),
    labelYearDropdown: l(W, r == null ? void 0 : r.labelYearDropdown, e.labelYearDropdown),
    labelGrid: l(D, r == null ? void 0 : r.labelGrid, e.labelGrid),
    labelGridcell: l(k, r == null ? void 0 : r.labelGridcell, e.labelGridcell),
    labelNav: l(N, r == null ? void 0 : r.labelNav, e.labelNav),
    labelWeekNumberHeader: l(f, r == null ? void 0 : r.labelWeekNumberHeader, e.labelWeekNumberHeader),
    labelWeekday: l(p, r == null ? void 0 : r.labelWeekday, e.labelWeekday)
  };
}
export {
  q as getLabels
};
//# sourceMappingURL=index223.mjs.map
