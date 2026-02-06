import { jsxs as o, jsx as r } from "react/jsx-runtime";
import * as l from "react";
import { cn as w } from "./index105.mjs";
import { LeftIcon as y } from "./index40.mjs";
import { RightIcon as N } from "./index68.mjs";
const R = l.forwardRef(
  ({ className: x, search: m, recentVisits: s, actions: i, children: h, ...d }, p) => {
    const c = l.useRef(null), [u, g] = l.useState(!1), [b, v] = l.useState(!1), a = l.useCallback(() => {
      const t = c.current;
      if (!t) return;
      const { scrollLeft: e, scrollWidth: n, clientWidth: k } = t;
      g(e > 0), v(e < n - k - 1);
    }, []);
    l.useEffect(() => {
      a();
      const t = c.current;
      if (!t) return;
      const e = new ResizeObserver(a);
      return e.observe(t), () => e.disconnect();
    }, [a, s]);
    const f = (t) => {
      const e = c.current;
      if (!e) return;
      const n = 100;
      e.scrollBy({
        left: t === "left" ? -n : n,
        behavior: "smooth"
      });
    };
    return /* @__PURE__ */ o(
      "div",
      {
        ref: p,
        className: w(
          "flex items-center gap-4 w-full h-[100px] px-6 pt-8 pb-4",
          "bg-cool-50 dark:bg-dark-400 backdrop-blur-[16px]",
          x
        ),
        ...d,
        children: [
          /* @__PURE__ */ r("div", { className: "flex-1 min-w-[200px] max-w-[593px]", children: m || h }),
          s && /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 flex-1 min-w-[150px] max-w-[400px]", children: [
            /* @__PURE__ */ r("span", { className: "text-xs text-gray-700 dark:text-gray-300 tracking-[-0.12px] whitespace-nowrap", children: "최근 방문" }),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 flex-1 min-w-0", children: [
              u && /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => f("left"),
                  className: "flex-shrink-0 flex items-center justify-center w-6 h-6 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                  "aria-label": "스크롤 왼쪽",
                  children: /* @__PURE__ */ r(y, { size: 24 })
                }
              ),
              /* @__PURE__ */ r(
                "div",
                {
                  ref: c,
                  onScroll: a,
                  className: "flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 min-w-0",
                  children: s
                }
              ),
              b && /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => f("right"),
                  className: "flex-shrink-0 flex items-center justify-center w-6 h-6 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                  "aria-label": "스크롤 오른쪽",
                  children: /* @__PURE__ */ r(N, { size: 24 })
                }
              )
            ] })
          ] }),
          i && /* @__PURE__ */ r("div", { className: "flex items-center gap-2 flex-shrink-0 ml-auto", children: i })
        ]
      }
    );
  }
);
R.displayName = "Header";
export {
  R as Header
};
//# sourceMappingURL=index32.mjs.map
