import { jsxs as g, jsx as r } from "react/jsx-runtime";
import * as s from "react";
import * as u from "@radix-ui/react-popover";
import { cn as x } from "../../../lib/utils.mjs";
import { UpIcon as U } from "../../../icons/UpIcon.mjs";
import { XIcon as F } from "../../../icons/XIcon.mjs";
import { Spinner as L } from "../spinner.mjs";
const T = s.forwardRef(
  ({
    id: y,
    placeholder: S = "선택하세요",
    options: l,
    value: c,
    defaultValue: R,
    onValueChange: d,
    error: k,
    disabled: w,
    ariaLabel: z,
    tableMode: O,
    clearable: H = !1,
    loading: v
  }, P) => {
    const [o, h] = s.useState(!1), [j, _] = s.useState(!1), [A, I] = s.useState(R || ""), [a, p] = s.useState(-1), m = s.useRef(null), E = s.useRef(c !== void 0);
    c !== void 0 && (E.current = !0);
    const i = E.current ? c ?? "" : A, f = l.find((e) => e.value === i);
    s.useEffect(() => {
      if (o) {
        const e = l.findIndex((t) => t.value === i);
        p(e >= 0 ? e : 0);
      }
    }, [o, i, l]), s.useEffect(() => {
      if (o && a >= 0 && m.current) {
        const e = m.current.children[a];
        e && e.scrollIntoView({ block: "nearest" });
      }
    }, [a, o]);
    const D = (e) => {
      c === void 0 && I(e), d == null || d(e), h(!1);
    }, B = (e) => {
      e.stopPropagation(), c === void 0 && I(""), d == null || d("");
    }, K = (e) => {
      var N;
      if (!o) return;
      const t = l.map((n, b) => n.disabled ? -1 : b).filter((n) => n !== -1);
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const n = t.indexOf(a), b = t[(n + 1) % t.length];
          p(b);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const n = t.indexOf(a), b = t[(n - 1 + t.length) % t.length];
          p(b);
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault(), a >= 0 && !((N = l[a]) != null && N.disabled) && D(l[a].value);
          break;
        }
        case "Escape": {
          e.preventDefault(), h(!1);
          break;
        }
        case "Home": {
          e.preventDefault(), t.length > 0 && p(t[0]);
          break;
        }
        case "End": {
          e.preventDefault(), t.length > 0 && p(t[t.length - 1]);
          break;
        }
      }
    }, M = H && i && j && !w && !v;
    return /* @__PURE__ */ g(u.Root, { open: o, onOpenChange: h, children: [
      /* @__PURE__ */ g(
        u.Trigger,
        {
          ref: P,
          id: y,
          disabled: w || v,
          className: x(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            k ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : O ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-200 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": k,
          "aria-label": z,
          onMouseEnter: () => _(!0),
          onMouseLeave: () => _(!1),
          onKeyDown: K,
          children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: x(
                  "truncate",
                  !f && "text-slate-500 dark:text-slate-500"
                ),
                children: (f == null ? void 0 : f.label) || S
              }
            ),
            /* @__PURE__ */ g("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              M && /* @__PURE__ */ r(
                "span",
                {
                  role: "button",
                  "aria-label": "선택 초기화",
                  onClick: B,
                  className: "flex items-center",
                  children: /* @__PURE__ */ r("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ r(F, { size: 20 }) })
                }
              ),
              v ? /* @__PURE__ */ r(L, { size: "sm" }) : /* @__PURE__ */ r(
                U,
                {
                  size: 24,
                  className: x(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    o && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ r(u.Portal, { children: /* @__PURE__ */ r(
        u.Content,
        {
          className: x(
            "z-50 rounded-[5px] border border-slate-200 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          onOpenAutoFocus: (e) => e.preventDefault(),
          children: /* @__PURE__ */ r("div", { ref: m, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto", role: "listbox", children: l.map((e, t) => /* @__PURE__ */ r(
            "div",
            {
              role: "option",
              "aria-selected": i === e.value,
              "aria-disabled": e.disabled,
              onClick: () => !e.disabled && D(e.value),
              className: x(
                "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                "text-xs text-slate-800 dark:text-slate-50 outline-none",
                "hover:bg-slate-100 dark:hover:bg-slate-700",
                e.disabled && "pointer-events-none opacity-50",
                i === e.value && "bg-accent text-accent-foreground",
                a === t && "bg-slate-100 dark:bg-slate-700"
              ),
              children: e.label
            },
            e.value
          )) })
        }
      ) })
    ] });
  }
);
T.displayName = "BasicSelect";
export {
  T as BasicSelect
};
//# sourceMappingURL=basic-select.mjs.map
