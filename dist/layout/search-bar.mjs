import { jsxs as y, jsx as a } from "react/jsx-runtime";
import * as o from "react";
import { cn as n } from "../lib/utils.mjs";
import { SearchIcon as z } from "../icons/SearchIcon.mjs";
import { STLArrowIcon as V } from "../icons/STLArrowIcon.mjs";
const _ = o.forwardRef(
  ({
    placeholder: g = "검색어를 입력하세요",
    value: s,
    onChange: e,
    onSearch: i,
    recentSearches: u = [],
    onRecentSearchClick: l,
    className: b,
    disabled: c
  }, k) => {
    const [p, t] = o.useState(!1), [w, f] = o.useState(""), x = o.useRef(null), m = s !== void 0 ? s : w, h = (r) => {
      const d = r.target.value;
      s === void 0 && f(d), e == null || e(d);
    }, v = (r) => {
      r.key === "Enter" && (i == null || i(m), t(!1)), r.key === "Escape" && t(!1);
    }, N = (r) => {
      s === void 0 && f(r.text), e == null || e(r.text), l == null || l(r), t(!1);
    };
    o.useEffect(() => {
      const r = (d) => {
        x.current && !x.current.contains(d.target) && t(!1);
      };
      return p && document.addEventListener("mousedown", r), () => {
        document.removeEventListener("mousedown", r);
      };
    }, [p]);
    const E = p && u.length > 0;
    return /* @__PURE__ */ y("div", { ref: x, className: "relative", children: [
      /* @__PURE__ */ y(
        "div",
        {
          className: n(
            "relative flex h-9 items-center gap-2 rounded-[20px] border",
            "bg-white dark:bg-dark-400",
            "border-gray-100 dark:border-dark-200",
            "px-3 cursor-text",
            "focus-within:border-gray-500 dark:focus-within:border-gray-100",
            "transition-colors",
            c && "opacity-50 cursor-not-allowed",
            b
          ),
          children: [
            /* @__PURE__ */ a(z, { size: 20, className: "text-gray-500 dark:text-gray-50 shrink-0" }),
            /* @__PURE__ */ a(
              "input",
              {
                ref: k,
                type: "text",
                value: m,
                onChange: h,
                onKeyDown: v,
                onFocus: () => !c && t(!0),
                placeholder: g,
                disabled: c,
                className: n(
                  "flex-1 bg-transparent text-xs outline-none",
                  "text-gray-900 dark:text-gray-50",
                  "placeholder:text-gray-300 dark:placeholder:text-gray-50",
                  "disabled:cursor-not-allowed"
                )
              }
            ),
            /* @__PURE__ */ a(V, { size: 24, className: "text-primary dark:text-gray-50 shrink-0" })
          ]
        }
      ),
      E && /* @__PURE__ */ a(
        "div",
        {
          className: n(
            "absolute left-0 right-0 top-full mt-[13px] z-[100]",
            "overflow-hidden rounded-[5px] border",
            "border-gray-100 dark:border-dark-200",
            "bg-white/50 dark:bg-dark-400/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
          ),
          children: u.map((r) => /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: () => N(r),
              className: n(
                "flex h-[29px] w-full cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                "text-xs text-gray-500 dark:text-gray-300 text-left",
                "hover:bg-gray-100 dark:hover:bg-dark-300",
                "focus:bg-gray-100 dark:focus:bg-dark-300 outline-none",
                "transition-colors"
              ),
              children: r.text
            },
            r.id
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
