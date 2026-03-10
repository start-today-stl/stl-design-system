import { jsx as i, jsxs as m } from "react/jsx-runtime";
import * as r from "react";
import { cn as v } from "../lib/utils.mjs";
import { Sidebar as N } from "./sidebar.mjs";
import { Header as w } from "./header.mjs";
import { Content as k } from "./content.mjs";
import { Button as z } from "../components/ui/button.mjs";
import { MenuHorizontalIcon as H } from "../icons/MenuHorizontalIcon.mjs";
const p = r.createContext(null);
function d(l, a) {
  return r.Children.toArray(l).find(
    (e) => {
      var t;
      return r.isValidElement(e) && ((t = e.type) == null ? void 0 : t.displayName) === a;
    }
  ) || null;
}
const c = r.forwardRef(
  ({ className: l, children: a, ...n }, e) => {
    const t = d(a, "AppShell.Sidebar"), s = d(a, "AppShell.Header"), o = d(a, "AppShell.Content"), [u, A] = r.useState({}), y = r.useRef(), h = r.useCallback((R) => {
      A(R);
    }, []), g = r.useMemo(() => ({
      ...u,
      onCollapsedChangeRef: y,
      _registerSidebar: h
    }), [u, h]);
    return /* @__PURE__ */ i(p.Provider, { value: g, children: /* @__PURE__ */ m(
      "div",
      {
        ref: e,
        className: v(
          "flex h-screen w-full bg-slate-50 dark:bg-slate-950",
          l
        ),
        ...n,
        children: [
          t && /* @__PURE__ */ i("aside", { className: "flex-shrink-0 h-full relative z-40", children: t }),
          /* @__PURE__ */ m("div", { className: "flex flex-col flex-1 min-w-0 bg-slate-50 dark:bg-slate-950 rounded-tl-[20px] relative z-0", children: [
            s && /* @__PURE__ */ i("header", { className: "flex-shrink-0 relative z-30", children: s }),
            /* @__PURE__ */ i("main", { className: "flex-1 overflow-auto", children: o })
          ] })
        ]
      }
    ) });
  }
);
c.displayName = "AppShell";
const S = r.forwardRef(
  ({ collapseMode: l, collapsed: a, onCollapsedChange: n, ...e }, t) => {
    const s = r.useContext(p);
    return r.useLayoutEffect(() => {
      s && (s.onCollapsedChangeRef.current = n);
    }), r.useEffect(() => {
      var o;
      (o = s == null ? void 0 : s._registerSidebar) == null || o.call(s, { collapseMode: l, collapsed: a });
    }, [l, a]), /* @__PURE__ */ i(
      N,
      {
        ref: t,
        collapseMode: l,
        collapsed: a,
        onCollapsedChange: n,
        ...e
      }
    );
  }
);
S.displayName = "AppShell.Sidebar";
const C = r.forwardRef(
  ({ menuButton: l, ...a }, n) => {
    const e = r.useContext(p), t = r.useMemo(() => {
      if (l) return l;
      if ((e == null ? void 0 : e.collapseMode) === "hidden")
        return /* @__PURE__ */ i(
          z,
          {
            variant: "text",
            size: "icon-sm",
            onClick: () => {
              var s, o;
              return (o = e == null ? void 0 : (s = e.onCollapsedChangeRef).current) == null ? void 0 : o.call(s, !(e != null && e.collapsed));
            },
            "aria-label": e != null && e.collapsed ? "메뉴 열기" : "메뉴 닫기",
            children: /* @__PURE__ */ i(H, { size: 24 })
          }
        );
    }, [l, e == null ? void 0 : e.collapseMode, e == null ? void 0 : e.collapsed, e == null ? void 0 : e.onCollapsedChangeRef]);
    return /* @__PURE__ */ i(w, { ref: n, menuButton: t, ...a });
  }
);
C.displayName = "AppShell.Header";
const b = r.forwardRef(
  (l, a) => /* @__PURE__ */ i(k, { ref: a, ...l })
);
b.displayName = "AppShell.Content";
const f = c;
f.Sidebar = S;
f.Header = C;
f.Content = b;
export {
  f as AppShell
};
//# sourceMappingURL=app-shell.mjs.map
