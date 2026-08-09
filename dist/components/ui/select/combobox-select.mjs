import { jsxs as E, jsx as s } from "react/jsx-runtime";
import * as t from "react";
import * as D from "@radix-ui/react-popover";
import { cn as b } from "../../../lib/utils.mjs";
import { UpIcon as $ } from "../../../icons/UpIcon.mjs";
import { XIcon as ee } from "../../../icons/XIcon.mjs";
import { Spinner as te } from "../spinner.mjs";
const re = t.forwardRef(
  ({
    id: T,
    placeholder: j = "입력 또는 선택",
    options: h,
    value: m,
    defaultValue: B,
    onValueChange: y,
    error: A,
    disabled: L,
    ariaLabel: H,
    tableMode: O,
    clearable: U = !1,
    loading: I
  }, v) => {
    const [l, c] = t.useState(!1), [o, p] = t.useState(""), [K, z] = t.useState(!1), [V, X] = t.useState(B || ""), [a, w] = t.useState(-1), R = t.useRef(null), S = t.useRef(null), g = t.useRef(!1), _ = t.useRef(!1), M = t.useRef(m !== void 0);
    m !== void 0 && (M.current = !0);
    const d = M.current ? m ?? "" : V, f = h.find((e) => e.value === d), [k, u] = t.useState(!1), q = k ? o : (f == null ? void 0 : f.label) || d || "", i = h.filter(
      (e) => !k || e.label.toLowerCase().includes(o.toLowerCase())
    );
    t.useEffect(() => {
      if (l && i.length > 0) {
        const e = i.findIndex((r) => r.value === d);
        w(e >= 0 ? e : 0);
      }
    }, [l]), t.useEffect(() => {
      if (l && a >= 0 && S.current) {
        const e = S.current.children[a];
        e == null || e.scrollIntoView({ block: "nearest" });
      }
    }, [a, l]);
    const x = (e) => {
      m === void 0 && X(e), y == null || y(e);
    }, F = (e) => {
      g.current = !0, x(e), u(!1), p(""), c(!1), setTimeout(() => {
        g.current = !1;
      }, 0);
    }, G = (e) => {
      e.stopPropagation(), x(""), p(""), u(!1);
    }, J = (e) => {
      p(e.target.value), u(!0), l || c(!0), w(0);
    }, Q = () => {
      g.current || (u(!0), p((f == null ? void 0 : f.label) || d || ""), c(!0));
    }, W = () => {
      if (!g.current) {
        if (k && o) {
          const e = h.find(
            (r) => r.label.toLowerCase() === o.toLowerCase()
          );
          x(e ? e.value : o);
        } else k && !o && x("");
        u(!1), c(!1);
      }
    }, Y = (e) => {
      var C, P;
      if (_.current) return;
      if (!l) {
        (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), c(!0));
        return;
      }
      const r = i.map((n, N) => n.disabled ? -1 : N).filter((n) => n !== -1);
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const n = r.indexOf(a);
          w(r[(n + 1) % r.length]);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const n = r.indexOf(a);
          w(r[(n - 1 + r.length) % r.length]);
          break;
        }
        case "Enter": {
          if (e.preventDefault(), a >= 0 && i[a] && !i[a].disabled)
            F(i[a].value);
          else if (o) {
            const n = h.find(
              (N) => N.label.toLowerCase() === o.toLowerCase()
            );
            x(n ? n.value : o), u(!1), c(!1);
          }
          (C = R.current) == null || C.blur();
          break;
        }
        case "Escape": {
          e.preventDefault(), u(!1), p(""), c(!1), (P = R.current) == null || P.blur();
          break;
        }
      }
    }, Z = U && d && K && !L && !I;
    return /* @__PURE__ */ E(D.Root, { open: l, children: [
      /* @__PURE__ */ s(D.Anchor, { asChild: !0, children: /* @__PURE__ */ E(
        "div",
        {
          className: b(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors",
            "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
            A ? "border-red-500 dark:border-red-500 focus-within:border-red-500 focus-within:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : O ? "border-slate-300 dark:border-slate-500 focus-within:border-slate-500 focus-within:border-[1.5px] dark:focus-within:border-slate-300" : "border-slate-200 dark:border-slate-600 focus-within:border-blue-500 focus-within:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          onMouseEnter: () => z(!0),
          onMouseLeave: () => z(!1),
          children: [
            /* @__PURE__ */ s(
              "input",
              {
                ref: (e) => {
                  R.current = e, typeof v == "function" ? v(e) : v && (v.current = e);
                },
                id: T,
                type: "text",
                disabled: L || I,
                value: q,
                placeholder: j,
                onChange: J,
                onFocus: Q,
                onBlur: W,
                onKeyDown: Y,
                onCompositionStart: () => {
                  _.current = !0;
                },
                onCompositionEnd: () => {
                  _.current = !1;
                },
                className: b(
                  "flex-1 bg-transparent text-xs outline-none min-w-0",
                  "placeholder:text-slate-500 dark:placeholder:text-slate-500",
                  "text-slate-900 dark:text-slate-50"
                ),
                "aria-invalid": A,
                "aria-label": H,
                autoComplete: "off"
              }
            ),
            /* @__PURE__ */ E("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              Z && /* @__PURE__ */ s(
                "span",
                {
                  role: "button",
                  "aria-label": "선택 초기화",
                  onMouseDown: (e) => e.preventDefault(),
                  onClick: G,
                  className: "flex items-center",
                  children: /* @__PURE__ */ s("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ s(ee, { size: 20 }) })
                }
              ),
              I ? /* @__PURE__ */ s(te, { size: "sm" }) : /* @__PURE__ */ s(
                $,
                {
                  size: 24,
                  className: b(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    l && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ s(D.Portal, { children: /* @__PURE__ */ s(
        D.Content,
        {
          className: b(
            "z-50 rounded-[5px] border border-slate-200 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          onMouseDown: (e) => e.preventDefault(),
          children: /* @__PURE__ */ s("div", { ref: S, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto", role: "listbox", children: i.length === 0 ? /* @__PURE__ */ s("div", { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }) : i.map((e, r) => /* @__PURE__ */ s(
            "div",
            {
              role: "option",
              "aria-selected": d === e.value,
              "aria-disabled": e.disabled,
              onMouseDown: (C) => C.preventDefault(),
              onClick: () => !e.disabled && F(e.value),
              className: b(
                "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                "text-xs text-slate-800 dark:text-slate-50 outline-none",
                "hover:bg-slate-100 dark:hover:bg-slate-700",
                e.disabled && "pointer-events-none opacity-50",
                d === e.value && "bg-accent text-accent-foreground",
                a === r && "bg-slate-100 dark:bg-slate-700"
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
re.displayName = "ComboboxSelect";
export {
  re as ComboboxSelect
};
//# sourceMappingURL=combobox-select.mjs.map
