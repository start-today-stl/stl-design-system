import { jsx as l, jsxs as s } from "react/jsx-runtime";
import * as a from "react";
import { cn as A } from "../lib/utils.mjs";
import { Sidebar as u } from "./sidebar.mjs";
import { Header as x } from "./header.mjs";
import { Content as y } from "./content.mjs";
const b = a.createContext(null);
function n(r, e) {
  return a.Children.toArray(r).find(
    (o) => {
      var t;
      return a.isValidElement(o) && ((t = o.type) == null ? void 0 : t.displayName) === e;
    }
  ) || null;
}
const c = a.forwardRef(
  ({ className: r, children: e, ...p }, o) => {
    const t = n(e, "AppShell.Sidebar"), i = n(e, "AppShell.Header"), S = n(e, "AppShell.Content");
    return /* @__PURE__ */ l(b.Provider, { value: {}, children: /* @__PURE__ */ s(
      "div",
      {
        ref: o,
        className: A(
          "flex h-screen w-full bg-cool-50 dark:bg-dark-600",
          r
        ),
        ...p,
        children: [
          t && /* @__PURE__ */ l("aside", { className: "flex-shrink-0 h-full relative z-20", children: t }),
          /* @__PURE__ */ s("div", { className: "flex flex-col flex-1 min-w-0 bg-cool-50 dark:bg-dark-600 rounded-tl-[20px]", children: [
            i && /* @__PURE__ */ l("header", { className: "flex-shrink-0 relative z-10", children: i }),
            /* @__PURE__ */ l("main", { className: "flex-1 overflow-auto", children: S })
          ] })
        ]
      }
    ) });
  }
);
c.displayName = "AppShell";
const f = a.forwardRef(
  (r, e) => /* @__PURE__ */ l(u, { ref: e, ...r })
);
f.displayName = "AppShell.Sidebar";
const h = a.forwardRef(
  (r, e) => /* @__PURE__ */ l(x, { ref: e, ...r })
);
h.displayName = "AppShell.Header";
const m = a.forwardRef(
  (r, e) => /* @__PURE__ */ l(y, { ref: e, ...r })
);
m.displayName = "AppShell.Content";
const d = c;
d.Sidebar = f;
d.Header = h;
d.Content = m;
export {
  d as AppShell
};
//# sourceMappingURL=app-shell.mjs.map
