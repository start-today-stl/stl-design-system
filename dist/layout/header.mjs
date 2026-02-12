import { jsxs as o, jsx as e } from "react/jsx-runtime";
import * as l from "react";
import { cn as w } from "../lib/utils.mjs";
import { LeftIcon as N } from "../icons/LeftIcon.mjs";
import { RightIcon as R } from "../icons/RightIcon.mjs";
const S = l.forwardRef(
  ({ className: m, search: x, recentVisits: c, actions: i, children: h, ...d }, p) => {
    const s = l.useRef(null), [u, b] = l.useState(!1), [v, g] = l.useState(!1), a = l.useCallback(() => {
      const r = s.current;
      if (!r) return;
      const { scrollLeft: t, scrollWidth: n, clientWidth: k } = r;
      b(t > 0), g(t < n - k - 1);
    }, []);
    l.useEffect(() => {
      a();
      const r = s.current;
      if (!r) return;
      const t = new ResizeObserver(a);
      return t.observe(r), () => t.disconnect();
    }, [a, c]);
    const f = (r) => {
      const t = s.current;
      if (!t) return;
      const n = 100;
      t.scrollBy({
        left: r === "left" ? -n : n,
        behavior: "smooth"
      });
    };
    return /* @__PURE__ */ o(
      "div",
      {
        ref: p,
        className: w(
          "relative flex items-center gap-4 w-full h-[72px] px-6 py-4",
          "bg-slate-50 dark:bg-slate-950 backdrop-blur-[16px]",
          m
        ),
        ...d,
        children: [
          /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 right-0 h-4 -mb-4 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-950 pointer-events-none" }),
          /* @__PURE__ */ e("div", { className: "flex-1 min-w-[200px] max-w-[593px]", children: x || h }),
          c && /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 flex-1 min-w-[150px] max-w-[400px]", children: [
            /* @__PURE__ */ e("span", { className: "text-xs text-slate-700 dark:text-slate-300 tracking-[-0.12px] whitespace-nowrap", children: "최근 방문" }),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 flex-1 min-w-0", children: [
              u && /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: () => f("left"),
                  className: "flex-shrink-0 flex items-center justify-center w-6 h-6 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
                  "aria-label": "스크롤 왼쪽",
                  children: /* @__PURE__ */ e(N, { size: 24 })
                }
              ),
              /* @__PURE__ */ e(
                "div",
                {
                  ref: s,
                  onScroll: a,
                  className: "flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 min-w-0",
                  children: c
                }
              ),
              v && /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: () => f("right"),
                  className: "flex-shrink-0 flex items-center justify-center w-6 h-6 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
                  "aria-label": "스크롤 오른쪽",
                  children: /* @__PURE__ */ e(R, { size: 24 })
                }
              )
            ] })
          ] }),
          i && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 flex-shrink-0 ml-auto", children: i })
        ]
      }
    );
  }
);
S.displayName = "Header";
export {
  S as Header
};
//# sourceMappingURL=header.mjs.map
