import { jsx as r, jsxs as i } from "react/jsx-runtime";
import * as a from "react";
import { cn as A } from "../lib/utils.mjs";
import { Sidebar as u } from "./sidebar.mjs";
import { Header as x } from "./header.mjs";
import { Content as y } from "./content.mjs";
const b = a.createContext(null);
function o(l, e) {
  return a.Children.toArray(l).find(
    (n) => {
      var t;
      return a.isValidElement(n) && ((t = n.type) == null ? void 0 : t.displayName) === e;
    }
  ) || null;
}
const c = a.forwardRef(
  ({ className: l, children: e, ...d }, n) => {
    const t = o(e, "AppShell.Sidebar"), s = o(e, "AppShell.Header"), S = o(e, "AppShell.Content");
    return /* @__PURE__ */ r(b.Provider, { value: {}, children: /* @__PURE__ */ i(
      "div",
      {
        ref: n,
        className: A(
          "flex h-screen w-full bg-slate-50 dark:bg-slate-950",
          l
        ),
        ...d,
        children: [
          t && /* @__PURE__ */ r("aside", { className: "flex-shrink-0 h-full relative z-20", children: t }),
          /* @__PURE__ */ i("div", { className: "flex flex-col flex-1 min-w-0 bg-slate-50 dark:bg-slate-950 rounded-tl-[20px]", children: [
            s && /* @__PURE__ */ r("header", { className: "flex-shrink-0 relative z-10", children: s }),
            /* @__PURE__ */ r("main", { className: "flex-1 overflow-auto", children: S })
          ] })
        ]
      }
    ) });
  }
);
c.displayName = "AppShell";
const f = a.forwardRef(
  (l, e) => /* @__PURE__ */ r(u, { ref: e, ...l })
);
f.displayName = "AppShell.Sidebar";
const h = a.forwardRef(
  (l, e) => /* @__PURE__ */ r(x, { ref: e, ...l })
);
h.displayName = "AppShell.Header";
const m = a.forwardRef(
  (l, e) => /* @__PURE__ */ r(y, { ref: e, ...l })
);
m.displayName = "AppShell.Content";
const p = c;
p.Sidebar = f;
p.Header = h;
p.Content = m;
export {
  p as AppShell
};
//# sourceMappingURL=app-shell.mjs.map
