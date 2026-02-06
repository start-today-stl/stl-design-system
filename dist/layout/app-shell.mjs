import { jsx as l, jsxs as s } from "react/jsx-runtime";
import * as a from "react";
import { cn as A } from "../lib/utils.mjs";
import { Sidebar as u } from "./sidebar.mjs";
import { Header as x } from "./header.mjs";
import { Content as y } from "./content.mjs";
const b = a.createContext(null);
function n(r, e) {
  return a.Children.toArray(r).find(
    (t) => {
      var o;
      return a.isValidElement(t) && ((o = t.type) == null ? void 0 : o.displayName) === e;
    }
  ) || null;
}
const c = a.forwardRef(
  ({ className: r, children: e, ...p }, t) => {
    const o = n(e, "AppShell.Sidebar"), i = n(e, "AppShell.Header"), S = n(e, "AppShell.Content");
    return /* @__PURE__ */ l(b.Provider, { value: {}, children: /* @__PURE__ */ s(
      "div",
      {
        ref: t,
        className: A(
          "flex h-screen w-full bg-cool-50 dark:bg-dark-400",
          r
        ),
        ...p,
        children: [
          o && /* @__PURE__ */ l("aside", { className: "flex-shrink-0 h-full", children: o }),
          /* @__PURE__ */ s("div", { className: "flex flex-col flex-1 min-w-0 bg-cool-50 dark:bg-dark-400 rounded-tl-[20px]", children: [
            i && /* @__PURE__ */ l("header", { className: "flex-shrink-0", children: i }),
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
