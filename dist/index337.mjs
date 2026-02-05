import * as f from "react";
import { assignRef as o } from "./index373.mjs";
import { useCallbackRef as l } from "./index374.mjs";
var s = typeof window < "u" ? f.useLayoutEffect : f.useEffect, c = /* @__PURE__ */ new WeakMap();
function v(e, m) {
  var t = l(null, function(n) {
    return e.forEach(function(u) {
      return o(u, n);
    });
  });
  return s(function() {
    var n = c.get(t);
    if (n) {
      var u = new Set(n), r = new Set(e), i = t.current;
      u.forEach(function(a) {
        r.has(a) || o(a, null);
      }), r.forEach(function(a) {
        u.has(a) || o(a, i);
      });
    }
    c.set(t, e);
  }, [e]), t;
}
export {
  v as useMergeRefs
};
//# sourceMappingURL=index337.mjs.map
