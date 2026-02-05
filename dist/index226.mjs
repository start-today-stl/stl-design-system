import { useMulti as i } from "./index315.mjs";
import { useRange as o } from "./index316.mjs";
import { useSingle as s } from "./index317.mjs";
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
//# sourceMappingURL=index226.mjs.map
