import { jsxs as b, jsx as s } from "react/jsx-runtime";
import * as o from "react";
import { cn as n } from "../lib/utils.mjs";
import { SearchIcon as z } from "../icons/SearchIcon.mjs";
import { STLArrowIcon as V } from "../icons/STLArrowIcon.mjs";
const _ = o.forwardRef(
  ({
    placeholder: w = "검색어를 입력하세요",
    value: a,
    onChange: t,
    onSearch: d,
    recentSearches: u = [],
    onRecentSearchClick: i,
    className: k,
    disabled: c
  }, h) => {
    const [p, r] = o.useState(!1), [v, f] = o.useState(""), x = o.useRef(null), m = a !== void 0 ? a : v, y = (e) => {
      const l = e.target.value;
      a === void 0 && f(l), t == null || t(l);
    }, g = (e) => {
      e.key === "Enter" && (d == null || d(m), r(!1)), e.key === "Escape" && r(!1);
    }, N = (e) => {
      a === void 0 && f(e.text), t == null || t(e.text), i == null || i(e), r(!1);
    };
    o.useEffect(() => {
      const e = (l) => {
        x.current && !x.current.contains(l.target) && r(!1);
      };
      return p && document.addEventListener("mousedown", e), () => {
        document.removeEventListener("mousedown", e);
      };
    }, [p]);
    const E = p && u.length > 0;
    return /* @__PURE__ */ b("div", { ref: x, className: "relative", children: [
      /* @__PURE__ */ b(
        "div",
        {
          className: n(
            "relative flex h-9 items-center gap-2 rounded-[20px] border",
            "bg-white dark:bg-slate-800",
            "border-slate-100 dark:border-slate-600",
            "px-3 cursor-text",
            "focus-within:border-slate-500 dark:focus-within:border-slate-100",
            "transition-colors",
            c && "opacity-50 cursor-not-allowed",
            k
          ),
          children: [
            /* @__PURE__ */ s(z, { size: 20, className: "text-slate-500 dark:text-slate-50 shrink-0" }),
            /* @__PURE__ */ s(
              "input",
              {
                ref: h,
                type: "text",
                value: m,
                onChange: y,
                onKeyDown: g,
                onFocus: () => !c && r(!0),
                placeholder: w,
                disabled: c,
                className: n(
                  "flex-1 bg-transparent text-xs outline-none",
                  "text-slate-900 dark:text-slate-50",
                  "placeholder:text-slate-300 dark:placeholder:text-slate-50",
                  "disabled:cursor-not-allowed"
                )
              }
            ),
            /* @__PURE__ */ s(V, { size: 24, className: "text-blue-500 dark:text-slate-50 shrink-0" })
          ]
        }
      ),
      E && /* @__PURE__ */ s(
        "div",
        {
          className: n(
            "absolute left-0 right-0 top-full mt-[13px] z-[100]",
            "overflow-hidden rounded-[5px] border",
            "border-slate-100 dark:border-slate-600",
            "bg-white/90 dark:bg-slate-800/90 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
          ),
          children: u.map((e) => /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              onClick: () => N(e),
              className: n(
                "flex h-[29px] w-full cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                "text-xs text-slate-500 dark:text-slate-300 text-left",
                "hover:bg-slate-100 dark:hover:bg-slate-700",
                "focus:bg-slate-100 dark:focus:bg-slate-700 outline-none",
                "transition-colors"
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
_.displayName = "SearchBar";
export {
  _ as SearchBar
};
//# sourceMappingURL=search-bar.mjs.map
