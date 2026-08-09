import { jsxs as c, jsx as n, Fragment as te } from "react/jsx-runtime";
import * as a from "react";
import * as D from "@radix-ui/react-popover";
import { cn as p } from "../../../lib/utils.mjs";
import { UpIcon as re } from "../../../icons/UpIcon.mjs";
import { XIcon as I } from "../../../icons/XIcon.mjs";
import { Checkbox as ne } from "../checkbox.mjs";
import { Spinner as se } from "../spinner.mjs";
const ae = [], le = a.forwardRef(
  ({
    id: T,
    placeholder: B = "입력 또는 선택",
    options: y,
    value: b,
    defaultValue: U,
    onValueChange: N,
    error: A,
    disabled: E,
    ariaLabel: j,
    tableMode: H,
    overflowMode: M = "truncate",
    maxDisplayCount: C = 2,
    clearable: K = !0,
    loading: R
  }, m) => {
    const [d, f] = a.useState(!1), [i, x] = a.useState(""), [$, z] = a.useState(!1), [X, Y] = a.useState(U || []), [o, g] = a.useState(-1), v = a.useRef(null), _ = a.useRef(null), w = a.useRef(!1), S = a.useRef(!1), L = a.useRef(b !== void 0);
    b !== void 0 && (L.current = !0);
    const s = L.current ? b ?? ae : X, u = y.filter(
      (e) => !i || e.label.toLowerCase().includes(i.toLowerCase())
    );
    a.useEffect(() => {
      d && u.length > 0 && g(0);
    }, [d]), a.useEffect(() => {
      if (d && o >= 0 && _.current) {
        const e = _.current.children[o];
        e == null || e.scrollIntoView({ block: "nearest" });
      }
    }, [o, d]);
    const h = (e) => {
      b === void 0 && Y(e), N == null || N(e);
    }, F = (e) => {
      w.current = !0;
      const t = s.includes(e) ? s.filter((r) => r !== e) : [...s, e];
      h(t), x(""), setTimeout(() => {
        var r;
        (r = v.current) == null || r.focus(), w.current = !1;
      }, 0);
    }, O = (e) => {
      if (!e.trim()) return;
      if (s.includes(e)) {
        x("");
        return;
      }
      const t = y.find(
        (l) => l.label.toLowerCase() === e.toLowerCase()
      ), r = t ? t.value : e;
      s.includes(r) || h([...s, r]), x("");
    }, P = (e, t) => {
      t.stopPropagation(), h(s.filter((r) => r !== e));
    }, q = (e) => {
      e.stopPropagation(), h([]), x("");
    }, G = (e) => {
      x(e.target.value), d || f(!0), g(0);
    }, J = () => {
      w.current || f(!0);
    }, Q = () => {
      w.current || (i && O(i), f(!1));
    }, V = (e) => {
      var r;
      if (S.current) return;
      if (e.key === "Backspace" && !i && s.length > 0) {
        h(s.slice(0, -1));
        return;
      }
      if (!d) {
        (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), f(!0));
        return;
      }
      const t = u.map((l, ee) => l.disabled ? -1 : ee).filter((l) => l !== -1);
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const l = t.indexOf(o);
          g(t[(l + 1) % t.length]);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const l = t.indexOf(o);
          g(t[(l - 1 + t.length) % t.length]);
          break;
        }
        case "Enter": {
          e.preventDefault(), o >= 0 && u[o] && !u[o].disabled ? F(u[o].value) : i && O(i);
          break;
        }
        case "Escape": {
          e.preventDefault(), f(!1), (r = v.current) == null || r.blur();
          break;
        }
      }
    }, W = K && s.length > 0 && $ && !E && !R, Z = (e) => {
      const t = y.find((r) => r.value === e);
      return t ? t.label : e;
    }, k = s.map((e) => ({
      value: e,
      label: Z(e)
    }));
    return /* @__PURE__ */ c(D.Root, { open: d, children: [
      /* @__PURE__ */ n(D.Anchor, { asChild: !0, children: /* @__PURE__ */ c(
        "div",
        {
          className: p(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors",
            "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
            A ? "border-red-500 dark:border-red-500 focus-within:border-red-500 focus-within:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : H ? "border-slate-300 dark:border-slate-500 focus-within:border-slate-500 focus-within:border-[1.5px] dark:focus-within:border-slate-300" : "border-slate-200 dark:border-slate-600 focus-within:border-blue-500 focus-within:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          onMouseEnter: () => z(!0),
          onMouseLeave: () => z(!1),
          onClick: () => {
            var e;
            return (e = v.current) == null ? void 0 : e.focus();
          },
          children: [
            /* @__PURE__ */ c("div", { className: p(
              "flex flex-1 items-center gap-1",
              M === "wrap" ? "flex-wrap" : "flex-nowrap overflow-hidden"
            ), children: [
              M === "truncate" ? /* @__PURE__ */ c(te, { children: [
                k.slice(0, C).map((e) => /* @__PURE__ */ c(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0",
                    children: [
                      /* @__PURE__ */ n("span", { className: "truncate max-w-[80px]", children: e.label }),
                      /* @__PURE__ */ n(
                        "span",
                        {
                          role: "img",
                          "aria-label": `${e.label} 삭제`,
                          onMouseDown: (t) => t.preventDefault(),
                          onClick: (t) => P(e.value, t),
                          className: "cursor-pointer flex-shrink-0",
                          children: /* @__PURE__ */ n(I, { size: 18 })
                        }
                      )
                    ]
                  },
                  e.value
                )),
                k.length > C && /* @__PURE__ */ c("span", { className: "inline-flex items-center rounded bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 text-xs flex-shrink-0", children: [
                  "+",
                  k.length - C
                ] })
              ] }) : k.map((e) => /* @__PURE__ */ c(
                "span",
                {
                  className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs",
                  children: [
                    e.label,
                    /* @__PURE__ */ n(
                      "span",
                      {
                        role: "img",
                        "aria-label": `${e.label} 삭제`,
                        onMouseDown: (t) => t.preventDefault(),
                        onClick: (t) => P(e.value, t),
                        className: "cursor-pointer",
                        children: /* @__PURE__ */ n(I, { size: 18 })
                      }
                    )
                  ]
                },
                e.value
              )),
              /* @__PURE__ */ n(
                "input",
                {
                  ref: (e) => {
                    v.current = e, typeof m == "function" ? m(e) : m && (m.current = e);
                  },
                  id: T,
                  type: "text",
                  disabled: E || R,
                  value: i,
                  placeholder: s.length === 0 ? B : "",
                  onChange: G,
                  onFocus: J,
                  onBlur: Q,
                  onKeyDown: V,
                  onCompositionStart: () => {
                    S.current = !0;
                  },
                  onCompositionEnd: () => {
                    S.current = !1;
                  },
                  className: p(
                    "flex-1 bg-transparent text-xs outline-none min-w-[60px]",
                    "placeholder:text-slate-500 dark:placeholder:text-slate-500",
                    "text-slate-900 dark:text-slate-50"
                  ),
                  "aria-invalid": A,
                  "aria-label": j,
                  autoComplete: "off"
                }
              )
            ] }),
            /* @__PURE__ */ c("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              W && /* @__PURE__ */ n(
                "span",
                {
                  role: "button",
                  "aria-label": "전체 선택 초기화",
                  onMouseDown: (e) => e.preventDefault(),
                  onClick: q,
                  className: "flex items-center",
                  children: /* @__PURE__ */ n("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ n(I, { size: 20 }) })
                }
              ),
              R ? /* @__PURE__ */ n(se, { size: "sm" }) : /* @__PURE__ */ n(
                re,
                {
                  size: 24,
                  className: p(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    d && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ n(D.Portal, { children: /* @__PURE__ */ n(
        D.Content,
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
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          onMouseDown: (e) => e.preventDefault(),
          children: /* @__PURE__ */ n("div", { ref: _, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto", role: "listbox", children: u.length === 0 ? /* @__PURE__ */ n("div", { className: "py-2 text-center text-xs text-slate-500", children: i ? "검색 결과가 없습니다. Enter로 직접 추가" : "옵션이 없습니다." }) : u.map((e, t) => {
            const r = s.includes(e.value);
            return /* @__PURE__ */ c(
              "div",
              {
                role: "option",
                "aria-selected": r,
                "aria-disabled": e.disabled,
                onMouseDown: (l) => l.preventDefault(),
                onClick: () => !e.disabled && F(e.value),
                className: p(
                  "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                  "text-xs text-slate-800 dark:text-slate-50 outline-none",
                  "hover:bg-slate-100 dark:hover:bg-slate-700",
                  e.disabled && "pointer-events-none opacity-50",
                  o === t && "bg-slate-100 dark:bg-slate-700"
                ),
                children: [
                  /* @__PURE__ */ n(
                    ne,
                    {
                      checked: r,
                      className: "pointer-events-none h-4 w-4"
                    }
                  ),
                  e.label
                ]
              },
              e.value
            );
          }) })
        }
      ) })
    ] });
  }
);
le.displayName = "ComboboxMultiSelect";
export {
  le as ComboboxMultiSelect
};
//# sourceMappingURL=combobox-multi-select.mjs.map
