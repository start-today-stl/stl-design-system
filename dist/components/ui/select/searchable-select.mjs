import { jsxs as n, jsx as r } from "react/jsx-runtime";
import * as s from "react";
import { Command as c } from "cmdk";
import * as m from "@radix-ui/react-popover";
import { cn as p } from "../../../lib/utils.mjs";
import { SearchIcon as X } from "../../../icons/SearchIcon.mjs";
import { UpIcon as $ } from "../../../icons/UpIcon.mjs";
import { XIcon as F } from "../../../icons/XIcon.mjs";
import { Spinner as G } from "../spinner.mjs";
const J = s.forwardRef(
  ({
    id: z,
    placeholder: E = "선택하세요",
    searchPlaceholder: H = "검색...",
    options: g,
    value: d,
    defaultValue: O,
    onValueChange: l,
    error: w,
    disabled: k,
    ariaLabel: P,
    tableMode: j,
    clearable: C = !1,
    loading: h
  }, A) => {
    const [b, _] = s.useState(!1), [y, N] = s.useState(""), [K, S] = s.useState(!1), [M, I] = s.useState(O || ""), [L, o] = s.useState(""), v = s.useRef(null), D = s.useRef(d !== void 0);
    d !== void 0 && (D.current = !0);
    const x = D.current ? d ?? "" : M, f = g.find((e) => e.value === x), i = g.filter(
      (e) => e.label.toLowerCase().includes(y.toLowerCase())
    );
    s.useEffect(() => {
      if (b && i.length > 0) {
        const e = i.find((t) => t.value === x);
        o((e == null ? void 0 : e.label) || i[0].label);
      }
    }, [b]);
    const u = (e) => {
      if (v.current) {
        const t = v.current.querySelector(`[data-value="${e.toLowerCase()}"]`);
        t == null || t.scrollIntoView({ block: "nearest" });
      }
    }, T = (e) => {
      d === void 0 && I(e), l == null || l(e), _(!1), N("");
    }, U = (e) => {
      e.stopPropagation(), d === void 0 && I(""), l == null || l("");
    }, q = (e) => {
      const t = i.filter((a) => !a.disabled);
      if (t.length === 0) return;
      const R = t.findIndex((a) => a.label === L);
      if (e.key === "Home") {
        e.preventDefault();
        const a = t[0].label;
        o(a), u(a);
      } else if (e.key === "End") {
        e.preventDefault();
        const a = t[t.length - 1].label;
        o(a), u(a);
      } else if (e.key === "ArrowDown") {
        if (R === t.length - 1) {
          e.preventDefault();
          const a = t[0].label;
          o(a), u(a);
        }
      } else if (e.key === "ArrowUp" && R === 0) {
        e.preventDefault();
        const a = t[t.length - 1].label;
        o(a), u(a);
      }
    }, B = C && x && K && !k && !h;
    return /* @__PURE__ */ n(m.Root, { open: b, onOpenChange: _, children: [
      /* @__PURE__ */ n(
        m.Trigger,
        {
          ref: A,
          id: z,
          disabled: k || h,
          className: p(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            w ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : j ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-200 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": w,
          "aria-label": P,
          onMouseEnter: () => S(!0),
          onMouseLeave: () => S(!1),
          children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: p(
                  "truncate",
                  !f && "text-slate-500 dark:text-slate-500"
                ),
                children: (f == null ? void 0 : f.label) || E
              }
            ),
            /* @__PURE__ */ n("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              B && /* @__PURE__ */ r(
                "span",
                {
                  role: "button",
                  "aria-label": "선택 초기화",
                  onClick: U,
                  className: "flex items-center",
                  children: /* @__PURE__ */ r("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ r(F, { size: 20 }) })
                }
              ),
              h ? /* @__PURE__ */ r(G, { size: "sm" }) : /* @__PURE__ */ r(
                $,
                {
                  size: 24,
                  className: p(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    b && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ r(m.Portal, { children: /* @__PURE__ */ r(
        m.Content,
        {
          className: p(
            "z-50 rounded-[5px] border border-slate-200 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          children: /* @__PURE__ */ n(
            c,
            {
              className: "flex flex-col",
              value: L,
              onValueChange: o,
              children: [
                /* @__PURE__ */ n("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-200 dark:border-slate-600", children: [
                  /* @__PURE__ */ r(X, { size: 20, className: "text-slate-400" }),
                  /* @__PURE__ */ r(
                    c.Input,
                    {
                      value: y,
                      onValueChange: N,
                      placeholder: H,
                      className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400",
                      onKeyDown: q
                    }
                  )
                ] }),
                /* @__PURE__ */ n(c.List, { ref: v, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
                  /* @__PURE__ */ r(c.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
                  i.map((e) => /* @__PURE__ */ r(
                    c.Item,
                    {
                      value: e.label,
                      disabled: e.disabled,
                      onSelect: () => T(e.value),
                      className: p(
                        "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                        "text-xs text-slate-800 dark:text-slate-50 outline-none",
                        "hover:bg-slate-100 dark:hover:bg-slate-700",
                        "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                        x === e.value && "bg-accent text-accent-foreground"
                      ),
                      children: e.label
                    },
                    e.value
                  ))
                ] })
              ]
            }
          )
        }
      ) })
    ] });
  }
);
J.displayName = "SearchableSelect";
export {
  J as SearchableSelect
};
//# sourceMappingURL=searchable-select.mjs.map
