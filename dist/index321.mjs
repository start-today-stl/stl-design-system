import { rangeIncludesDate as m } from "./index228.mjs";
import { defaultDateLib as r } from "./index209.mjs";
function u(o, f, l = r) {
  return m(o, f.from, !1, l) || m(o, f.to, !1, l) || m(f, o.from, !1, l) || m(f, o.to, !1, l);
}
export {
  u as rangeOverlaps
};
//# sourceMappingURL=index321.mjs.map
