import { jsxs as g, jsx as i } from "react/jsx-runtime";
import * as l from "react";
import { cn as f } from "../lib/utils.mjs";
import { SearchIcon as V } from "../icons/SearchIcon.mjs";
import { STLArrowIcon as _ } from "../icons/STLArrowIcon.mjs";
const A = l.forwardRef(
  ({
    placeholder: v = "검색어를 입력하세요",
    value: d,
    onChange: o,
    onSearch: p,
    recentSearches: n = [],
    onRecentSearchClick: x,
    className: y,
    disabled: c
  }, N) => {
    const [r, a] = l.useState(!1), [D, w] = l.useState(""), [u, s] = l.useState(-1), m = l.useRef(null), k = d !== void 0 ? d : D, E = (e) => {
      const t = e.target.value;
      d === void 0 && w(t), o == null || o(t), s(-1);
    }, I = (e) => {
      const t = n.length;
      e.key === "ArrowDown" && (e.preventDefault(), !r && t > 0 ? (a(!0), s(0)) : r && t > 0 && s((b) => (b + 1) % t)), e.key === "ArrowUp" && (e.preventDefault(), r && t > 0 && s((b) => (b - 1 + t) % t)), e.key === "Enter" && (r && u >= 0 && n[u] ? h(n[u]) : (p == null || p(k), a(!1))), e.key === "Escape" && (a(!1), s(-1));
    }, h = (e) => {
      d === void 0 && w(e.text), o == null || o(e.text), x == null || x(e), a(!1), s(-1);
    };
    l.useEffect(() => {
      const e = (t) => {
        m.current && !m.current.contains(t.target) && (a(!1), s(-1));
      };
      return r && document.addEventListener("mousedown", e), () => {
        document.removeEventListener("mousedown", e);
      };
    }, [r]);
    const z = r && n.length > 0;
    return /* @__PURE__ */ g("div", { ref: m, className: "relative", children: [
      /* @__PURE__ */ g(
        "div",
        {
          className: f(
            "relative flex h-9 items-center gap-2 rounded-[20px] border",
            "bg-white dark:bg-slate-800",
            "border-slate-100 dark:border-slate-600",
            "px-3 cursor-text",
            "focus-within:border-slate-500 dark:focus-within:border-slate-100",
            "transition-colors",
            c && "opacity-50 cursor-not-allowed",
            y
          ),
          children: [
            /* @__PURE__ */ i(V, { size: 20, className: "text-slate-500 dark:text-slate-50 shrink-0" }),
            /* @__PURE__ */ i(
              "input",
              {
                ref: N,
                type: "text",
                value: k,
                onChange: E,
                onKeyDown: I,
                onFocus: () => !c && a(!0),
                placeholder: v,
                disabled: c,
                className: f(
                  "flex-1 bg-transparent text-xs outline-none",
                  "text-slate-900 dark:text-slate-50",
                  "placeholder:text-slate-300 dark:placeholder:text-slate-50",
                  "disabled:cursor-not-allowed"
                )
              }
            ),
            /* @__PURE__ */ i(_, { size: 24, className: "text-blue-500 dark:text-slate-50 shrink-0" })
          ]
        }
      ),
      z && /* @__PURE__ */ i(
        "div",
        {
          className: f(
            "absolute left-0 right-0 top-full mt-[13px] z-[100]",
            "overflow-hidden rounded-[5px] border",
            "border-slate-100 dark:border-slate-600",
            "bg-white/90 dark:bg-slate-800/90 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
          ),
          children: n.map((e, t) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: () => h(e),
              onMouseEnter: () => s(t),
              className: f(
                "flex h-[29px] w-full cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                "text-xs text-slate-500 dark:text-slate-300 text-left",
                "hover:bg-slate-100 dark:hover:bg-slate-700",
                "focus:bg-slate-100 dark:focus:bg-slate-700 outline-none",
                "transition-colors",
                u === t && "bg-slate-100 dark:bg-slate-700"
              ),
              children: e.text
            },
            e.id
          ))
        }
      )
    ] });
  }
);
A.displayName = "SearchBar";
export {
  A as SearchBar
};
//# sourceMappingURL=search-bar.mjs.map
