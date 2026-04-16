import { jsxs as g, jsx as r } from "react/jsx-runtime";
import * as s from "react";
import * as u from "@radix-ui/react-popover";
import { cn as b } from "../../../lib/utils.mjs";
import { UpIcon as M } from "../../../icons/UpIcon.mjs";
import { XIcon as U } from "../../../icons/XIcon.mjs";
import { Spinner as F } from "../spinner.mjs";
const L = s.forwardRef(
  ({
    id: N,
    placeholder: y = "선택하세요",
    options: l,
    value: x,
    defaultValue: S,
    onValueChange: n,
    error: k,
    disabled: w,
    ariaLabel: z,
    tableMode: O,
    clearable: R = !0,
    loading: v
  }, H) => {
    const [o, h] = s.useState(!1), [P, _] = s.useState(!1), [j, I] = s.useState(S || ""), [a, c] = s.useState(-1), m = s.useRef(null), i = x !== void 0 ? x : j, f = l.find((e) => e.value === i);
    s.useEffect(() => {
      if (o) {
        const e = l.findIndex((t) => t.value === i);
        c(e >= 0 ? e : 0);
      }
    }, [o, i, l]), s.useEffect(() => {
      if (o && a >= 0 && m.current) {
        const e = m.current.children[a];
        e && e.scrollIntoView({ block: "nearest" });
      }
    }, [a, o]);
    const E = (e) => {
      x === void 0 && I(e), n == null || n(e), h(!1);
    }, A = (e) => {
      e.stopPropagation(), x === void 0 && I(""), n == null || n("");
    }, B = (e) => {
      var D;
      if (!o) return;
      const t = l.map((d, p) => d.disabled ? -1 : p).filter((d) => d !== -1);
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const d = t.indexOf(a), p = t[(d + 1) % t.length];
          c(p);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const d = t.indexOf(a), p = t[(d - 1 + t.length) % t.length];
          c(p);
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault(), a >= 0 && !((D = l[a]) != null && D.disabled) && E(l[a].value);
          break;
        }
        case "Escape": {
          e.preventDefault(), h(!1);
          break;
        }
        case "Home": {
          e.preventDefault(), t.length > 0 && c(t[0]);
          break;
        }
        case "End": {
          e.preventDefault(), t.length > 0 && c(t[t.length - 1]);
          break;
        }
      }
    }, K = R && i && P && !w && !v;
    return /* @__PURE__ */ g(u.Root, { open: o, onOpenChange: h, children: [
      /* @__PURE__ */ g(
        u.Trigger,
        {
          ref: H,
          id: N,
          disabled: w || v,
          className: b(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            k ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : O ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": k,
          "aria-label": z,
          onMouseEnter: () => _(!0),
          onMouseLeave: () => _(!1),
          onKeyDown: B,
          children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: b(
                  "truncate",
                  !f && "text-slate-300 dark:text-slate-500"
                ),
                children: (f == null ? void 0 : f.label) || y
              }
            ),
            /* @__PURE__ */ g("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              K && /* @__PURE__ */ r(
                "span",
                {
                  role: "button",
                  "aria-label": "선택 초기화",
                  onClick: A,
                  className: "flex items-center",
                  children: /* @__PURE__ */ r("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ r(U, { size: 20 }) })
                }
              ),
              v ? /* @__PURE__ */ r(F, { size: "sm" }) : /* @__PURE__ */ r(
                M,
                {
                  size: 24,
                  className: b(
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
          className: b(
            "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
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
              onClick: () => !e.disabled && E(e.value),
              className: b(
                "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                "text-xs text-slate-700 dark:text-slate-50 outline-none",
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
L.displayName = "BasicSelect";
export {
  L as BasicSelect
};
//# sourceMappingURL=basic-select.mjs.map
