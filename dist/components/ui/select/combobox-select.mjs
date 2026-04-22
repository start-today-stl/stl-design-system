import { jsxs as E, jsx as s } from "react/jsx-runtime";
import * as r from "react";
import * as C from "@radix-ui/react-popover";
import { cn as b } from "../../../lib/utils.mjs";
import { UpIcon as Z } from "../../../icons/UpIcon.mjs";
import { XIcon as $ } from "../../../icons/XIcon.mjs";
import { Spinner as ee } from "../spinner.mjs";
const te = r.forwardRef(
  ({
    id: P,
    placeholder: T = "입력 또는 선택",
    options: h,
    value: D,
    defaultValue: j,
    onValueChange: y,
    error: A,
    disabled: L,
    ariaLabel: B,
    tableMode: H,
    clearable: O = !0,
    loading: I
  }, m) => {
    const [l, c] = r.useState(!1), [o, p] = r.useState(""), [U, z] = r.useState(!1), [K, V] = r.useState(j || ""), [a, v] = r.useState(-1), S = r.useRef(null), _ = r.useRef(null), w = r.useRef(!1), N = r.useRef(!1), d = D !== void 0 ? D : K, f = h.find((e) => e.value === d), [g, u] = r.useState(!1), X = g ? o : (f == null ? void 0 : f.label) || d || "", i = h.filter(
      (e) => !g || e.label.toLowerCase().includes(o.toLowerCase())
    );
    r.useEffect(() => {
      if (l && i.length > 0) {
        const e = i.findIndex((t) => t.value === d);
        v(e >= 0 ? e : 0);
      }
    }, [l]), r.useEffect(() => {
      if (l && a >= 0 && _.current) {
        const e = _.current.children[a];
        e == null || e.scrollIntoView({ block: "nearest" });
      }
    }, [a, l]);
    const x = (e) => {
      D === void 0 && V(e), y == null || y(e);
    }, M = (e) => {
      w.current = !0, x(e), u(!1), p(""), c(!1), setTimeout(() => {
        w.current = !1;
      }, 0);
    }, q = (e) => {
      e.stopPropagation(), x(""), p(""), u(!1);
    }, G = (e) => {
      p(e.target.value), u(!0), l || c(!0), v(0);
    }, J = () => {
      w.current || (u(!0), p((f == null ? void 0 : f.label) || d || ""), c(!0));
    }, Q = () => {
      if (!w.current) {
        if (g && o) {
          const e = h.find(
            (t) => t.label.toLowerCase() === o.toLowerCase()
          );
          x(e ? e.value : o);
        } else g && !o && x("");
        u(!1), c(!1);
      }
    }, W = (e) => {
      var k, F;
      if (N.current) return;
      if (!l) {
        (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), c(!0));
        return;
      }
      const t = i.map((n, R) => n.disabled ? -1 : R).filter((n) => n !== -1);
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const n = t.indexOf(a);
          v(t[(n + 1) % t.length]);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const n = t.indexOf(a);
          v(t[(n - 1 + t.length) % t.length]);
          break;
        }
        case "Enter": {
          if (e.preventDefault(), a >= 0 && i[a] && !i[a].disabled)
            M(i[a].value);
          else if (o) {
            const n = h.find(
              (R) => R.label.toLowerCase() === o.toLowerCase()
            );
            x(n ? n.value : o), u(!1), c(!1);
          }
          (k = S.current) == null || k.blur();
          break;
        }
        case "Escape": {
          e.preventDefault(), u(!1), p(""), c(!1), (F = S.current) == null || F.blur();
          break;
        }
      }
    }, Y = O && d && U && !L && !I;
    return /* @__PURE__ */ E(C.Root, { open: l, children: [
      /* @__PURE__ */ s(C.Anchor, { asChild: !0, children: /* @__PURE__ */ E(
        "div",
        {
          className: b(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors",
            "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
            A ? "border-red-500 dark:border-red-500 focus-within:border-red-500 focus-within:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : H ? "border-slate-300 dark:border-slate-500 focus-within:border-slate-500 focus-within:border-[1.5px] dark:focus-within:border-slate-300" : "border-slate-200 dark:border-slate-600 focus-within:border-blue-500 focus-within:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          onMouseEnter: () => z(!0),
          onMouseLeave: () => z(!1),
          children: [
            /* @__PURE__ */ s(
              "input",
              {
                ref: (e) => {
                  S.current = e, typeof m == "function" ? m(e) : m && (m.current = e);
                },
                id: P,
                type: "text",
                disabled: L || I,
                value: X,
                placeholder: T,
                onChange: G,
                onFocus: J,
                onBlur: Q,
                onKeyDown: W,
                onCompositionStart: () => {
                  N.current = !0;
                },
                onCompositionEnd: () => {
                  N.current = !1;
                },
                className: b(
                  "flex-1 bg-transparent text-xs outline-none min-w-0",
                  "placeholder:text-slate-500 dark:placeholder:text-slate-500",
                  "text-slate-900 dark:text-slate-50"
                ),
                "aria-invalid": A,
                "aria-label": B,
                autoComplete: "off"
              }
            ),
            /* @__PURE__ */ E("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              Y && /* @__PURE__ */ s(
                "span",
                {
                  role: "button",
                  "aria-label": "선택 초기화",
                  onMouseDown: (e) => e.preventDefault(),
                  onClick: q,
                  className: "flex items-center",
                  children: /* @__PURE__ */ s("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ s($, { size: 20 }) })
                }
              ),
              I ? /* @__PURE__ */ s(ee, { size: "sm" }) : /* @__PURE__ */ s(
                Z,
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
      /* @__PURE__ */ s(C.Portal, { children: /* @__PURE__ */ s(
        C.Content,
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
          children: /* @__PURE__ */ s("div", { ref: _, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto", role: "listbox", children: i.length === 0 ? /* @__PURE__ */ s("div", { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }) : i.map((e, t) => /* @__PURE__ */ s(
            "div",
            {
              role: "option",
              "aria-selected": d === e.value,
              "aria-disabled": e.disabled,
              onMouseDown: (k) => k.preventDefault(),
              onClick: () => !e.disabled && M(e.value),
              className: b(
                "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                "text-xs text-slate-800 dark:text-slate-50 outline-none",
                "hover:bg-slate-100 dark:hover:bg-slate-700",
                e.disabled && "pointer-events-none opacity-50",
                d === e.value && "bg-accent text-accent-foreground",
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
te.displayName = "ComboboxSelect";
export {
  te as ComboboxSelect
};
//# sourceMappingURL=combobox-select.mjs.map
