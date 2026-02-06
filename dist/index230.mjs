import { useMulti as i } from "./index330.mjs";
import { useRange as o } from "./index331.mjs";
import { useSingle as s } from "./index332.mjs";
function f(e, n) {
  const t = s(e, n), r = i(e, n), u = o(e, n);
  switch (e.mode) {
    case "single":
      return t;
    case "multiple":
      return r;
    case "range":
      return u;
    default:
      return;
  }
}
export {
  f as useSelection
};
//# sourceMappingURL=index230.mjs.map
