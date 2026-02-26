import { jsxs as E, Fragment as F, jsx as i } from "react/jsx-runtime";
import * as o from "react";
import { createPortal as K } from "react-dom";
import { cn as u } from "../lib/utils.mjs";
import { SearchIcon as O } from "../icons/SearchIcon.mjs";
import { STLArrowIcon as H } from "../icons/STLArrowIcon.mjs";
const M = o.forwardRef(
  ({
    placeholder: I = "검색어를 입력하세요",
    value: f,
    onChange: n,
    onSearch: c,
    recentSearches: d = [],
    onRecentSearchClick: x,
    className: R,
    disabled: m
  }, z) => {
    const [s, l] = o.useState(!1), [V, h] = o.useState(""), [p, r] = o.useState(-1), [w, _] = o.useState({ top: 0, left: 0, width: 0 }), k = o.useRef(null), b = o.useRef(null), g = o.useRef(null), v = f !== void 0 ? f : V, A = (t) => {
      const e = t.target.value;
      f === void 0 && h(e), n == null || n(e), r(-1);
    }, B = (t) => {
      const e = d.length;
      t.key === "ArrowDown" && (t.preventDefault(), !s && e > 0 ? (l(!0), r(0)) : s && e > 0 && r((a) => (a + 1) % e)), t.key === "ArrowUp" && (t.preventDefault(), s && e > 0 && r((a) => (a - 1 + e) % e)), t.key === "Enter" && (s && p >= 0 && d[p] ? y(d[p]) : (c == null || c(v), l(!1))), t.key === "Escape" && (l(!1), r(-1));
    }, y = (t) => {
      f === void 0 && h(t.text), n == null || n(t.text), x == null || x(t), l(!1), r(-1);
    };
    o.useEffect(() => {
      if (s && b.current) {
        const t = b.current.getBoundingClientRect();
        _({
          top: t.bottom + 13,
          left: t.left,
          width: t.width
        });
      }
    }, [s]), o.useEffect(() => {
      const t = (e) => {
        var D, N;
        const a = e.target, P = (D = k.current) == null ? void 0 : D.contains(a), j = (N = g.current) == null ? void 0 : N.contains(a);
        !P && !j && (l(!1), r(-1));
      };
      return s && document.addEventListener("mousedown", t), () => {
        document.removeEventListener("mousedown", t);
      };
    }, [s]);
    const L = s && d.length > 0;
    return /* @__PURE__ */ E(F, { children: [
      /* @__PURE__ */ i("div", { ref: k, className: "relative", children: /* @__PURE__ */ E(
        "div",
        {
          ref: b,
          className: u(
            "relative flex h-9 items-center gap-2 rounded-[20px] border",
            "bg-white dark:bg-slate-800",
            "border-slate-100 dark:border-slate-600",
            "px-3 cursor-text",
            "focus-within:border-slate-500 dark:focus-within:border-slate-100",
            "transition-colors",
            m && "opacity-50 cursor-not-allowed",
            R
          ),
          children: [
            /* @__PURE__ */ i(O, { size: 20, className: "text-slate-500 dark:text-slate-50 shrink-0" }),
            /* @__PURE__ */ i(
              "input",
              {
                ref: z,
                type: "text",
                value: v,
                onChange: A,
                onKeyDown: B,
                onFocus: () => !m && l(!0),
                placeholder: I,
                disabled: m,
                className: u(
                  "flex-1 bg-transparent text-xs outline-none",
                  "text-slate-900 dark:text-slate-50",
                  "placeholder:text-slate-300 dark:placeholder:text-slate-50",
                  "disabled:cursor-not-allowed"
                )
              }
            ),
            /* @__PURE__ */ i(H, { size: 24, className: "text-blue-500 dark:text-slate-50 shrink-0" })
          ]
        }
      ) }),
      L && K(
        /* @__PURE__ */ i(
          "div",
          {
            ref: g,
            style: {
              position: "fixed",
              top: w.top,
              left: w.left,
              width: w.width
            },
            className: u(
              "z-50",
              "overflow-hidden rounded-[5px] border",
              "border-slate-100 dark:border-slate-600",
              "bg-white/90 dark:bg-slate-800/90 backdrop-blur-[12px]",
              "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
              "p-[5px]",
              "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
            ),
            children: d.map((t, e) => /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                onClick: () => y(t),
                onMouseEnter: () => r(e),
                className: u(
                  "flex h-[29px] w-full cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                  "text-xs text-slate-500 dark:text-slate-300 text-left",
                  "hover:bg-slate-100 dark:hover:bg-slate-700",
                  "focus:bg-slate-100 dark:focus:bg-slate-700 outline-none",
                  "transition-colors",
                  p === e && "bg-slate-100 dark:bg-slate-700"
                ),
                children: t.text
              },
              t.id
            ))
          }
        ),
        document.body
      )
    ] });
  }
);
M.displayName = "SearchBar";
export {
  M as SearchBar
};
//# sourceMappingURL=search-bar.mjs.map
