import { constructFrom as r } from "./index350.mjs";
function i(e, ...o) {
  const n = r.bind(
    null,
    o.find((t) => typeof t == "object")
  );
  return o.map(n);
}
export {
  i as normalizeDates
};
//# sourceMappingURL=index354.mjs.map
