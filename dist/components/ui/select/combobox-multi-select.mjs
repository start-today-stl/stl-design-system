import { jsxs as c, jsx as a, Fragment as te } from "react/jsx-runtime";
import * as s from "react";
import * as k from "@radix-ui/react-popover";
import { cn as p } from "../../../lib/utils.mjs";
import { UpIcon as re } from "../../../icons/UpIcon.mjs";
import { XIcon as S } from "../../../icons/XIcon.mjs";
import { Checkbox as ae } from "../checkbox.mjs";
import { Spinner as ne } from "../spinner.mjs";
const se = s.forwardRef(
  ({
    id: B,
    placeholder: T = "입력 또는 선택",
    options: D,
    value: y,
    defaultValue: j,
    onValueChange: C,
    error: A,
    disabled: M,
    ariaLabel: H,
    tableMode: U,
    overflowMode: z = "truncate",
    maxDisplayCount: E = 2,
    clearable: K = !0,
    loading: N
  }, b) => {
    const R = typeof E == "number" ? E : 2, [d, f] = s.useState(!1), [i, x] = s.useState(""), [$, F] = s.useState(!1), [X, q] = s.useState(j || []), [o, m] = s.useState(-1), g = s.useRef(null), _ = s.useRef(null), v = s.useRef(!1), I = s.useRef(!1), n = y !== void 0 ? y : X, u = D.filter(
      (e) => !i || e.label.toLowerCase().includes(i.toLowerCase())
    );
    s.useEffect(() => {
      d && u.length > 0 && m(0);
    }, [d]), s.useEffect(() => {
      if (d && o >= 0 && _.current) {
        const e = _.current.children[o];
        e == null || e.scrollIntoView({ block: "nearest" });
      }
    }, [o, d]);
    const h = (e) => {
      y === void 0 && q(e), C == null || C(e);
    }, L = (e) => {
      v.current = !0;
      const t = n.includes(e) ? n.filter((r) => r !== e) : [...n, e];
      h(t), x(""), setTimeout(() => {
        var r;
        (r = g.current) == null || r.focus(), v.current = !1;
      }, 0);
    }, O = (e) => {
      if (!e.trim()) return;
      if (n.includes(e)) {
        x("");
        return;
      }
      const t = D.find(
        (l) => l.label.toLowerCase() === e.toLowerCase()
      ), r = t ? t.value : e;
      n.includes(r) || h([...n, r]), x("");
    }, P = (e, t) => {
      t.stopPropagation(), h(n.filter((r) => r !== e));
    }, G = (e) => {
      e.stopPropagation(), h([]), x("");
    }, J = (e) => {
      x(e.target.value), d || f(!0), m(0);
    }, Q = () => {
      v.current || f(!0);
    }, W = () => {
      v.current || (i && O(i), f(!1));
    }, Y = (e) => {
      var r;
      if (I.current) return;
      if (e.key === "Backspace" && !i && n.length > 0) {
        h(n.slice(0, -1));
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
          m(t[(l + 1) % t.length]);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const l = t.indexOf(o);
          m(t[(l - 1 + t.length) % t.length]);
          break;
        }
        case "Enter": {
          e.preventDefault(), o >= 0 && u[o] && !u[o].disabled ? L(u[o].value) : i && O(i);
          break;
        }
        case "Escape": {
          e.preventDefault(), f(!1), (r = g.current) == null || r.blur();
          break;
        }
      }
    }, Z = K && n.length > 0 && $ && !M && !N, V = (e) => {
      const t = D.find((r) => r.value === e);
      return t ? t.label : e;
    }, w = n.map((e) => ({
      value: e,
      label: V(e)
    }));
    return /* @__PURE__ */ c(k.Root, { open: d, children: [
      /* @__PURE__ */ a(k.Anchor, { asChild: !0, children: /* @__PURE__ */ c(
        "div",
        {
          className: p(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors",
            "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
            A ? "border-red-500 dark:border-red-500 focus-within:border-red-500 focus-within:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : U ? "border-slate-300 dark:border-slate-500 focus-within:border-slate-500 focus-within:border-[1.5px] dark:focus-within:border-slate-300" : "border-slate-200 dark:border-slate-600 focus-within:border-blue-500 focus-within:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          onMouseEnter: () => F(!0),
          onMouseLeave: () => F(!1),
          onClick: () => {
            var e;
            return (e = g.current) == null ? void 0 : e.focus();
          },
          children: [
            /* @__PURE__ */ c("div", { className: p(
              "flex flex-1 items-center gap-1",
              z === "wrap" ? "flex-wrap" : "flex-nowrap overflow-hidden"
            ), children: [
              z === "truncate" ? /* @__PURE__ */ c(te, { children: [
                w.slice(0, R).map((e) => /* @__PURE__ */ c(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0",
                    children: [
                      /* @__PURE__ */ a("span", { className: "truncate max-w-[80px]", children: e.label }),
                      /* @__PURE__ */ a(
                        "span",
                        {
                          role: "img",
                          "aria-label": `${e.label} 삭제`,
                          onMouseDown: (t) => t.preventDefault(),
                          onClick: (t) => P(e.value, t),
                          className: "cursor-pointer flex-shrink-0",
                          children: /* @__PURE__ */ a(S, { size: 18 })
                        }
                      )
                    ]
                  },
                  e.value
                )),
                w.length > R && /* @__PURE__ */ c("span", { className: "inline-flex items-center rounded bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 text-xs flex-shrink-0", children: [
                  "+",
                  w.length - R
                ] })
              ] }) : w.map((e) => /* @__PURE__ */ c(
                "span",
                {
                  className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs",
                  children: [
                    e.label,
                    /* @__PURE__ */ a(
                      "span",
                      {
                        role: "img",
                        "aria-label": `${e.label} 삭제`,
                        onMouseDown: (t) => t.preventDefault(),
                        onClick: (t) => P(e.value, t),
                        className: "cursor-pointer",
                        children: /* @__PURE__ */ a(S, { size: 18 })
                      }
                    )
                  ]
                },
                e.value
              )),
              /* @__PURE__ */ a(
                "input",
                {
                  ref: (e) => {
                    g.current = e, typeof b == "function" ? b(e) : b && (b.current = e);
                  },
                  id: B,
                  type: "text",
                  disabled: M || N,
                  value: i,
                  placeholder: n.length === 0 ? T : "",
                  onChange: J,
                  onFocus: Q,
                  onBlur: W,
                  onKeyDown: Y,
                  onCompositionStart: () => {
                    I.current = !0;
                  },
                  onCompositionEnd: () => {
                    I.current = !1;
                  },
                  className: p(
                    "flex-1 bg-transparent text-xs outline-none min-w-[60px]",
                    "placeholder:text-slate-500 dark:placeholder:text-slate-500",
                    "text-slate-900 dark:text-slate-50"
                  ),
                  "aria-invalid": A,
                  "aria-label": H,
                  autoComplete: "off"
                }
              )
            ] }),
            /* @__PURE__ */ c("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              Z && /* @__PURE__ */ a(
                "span",
                {
                  role: "button",
                  "aria-label": "전체 선택 초기화",
                  onMouseDown: (e) => e.preventDefault(),
                  onClick: G,
                  className: "flex items-center",
                  children: /* @__PURE__ */ a("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ a(S, { size: 20 }) })
                }
              ),
              N ? /* @__PURE__ */ a(ne, { size: "sm" }) : /* @__PURE__ */ a(
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
      /* @__PURE__ */ a(k.Portal, { children: /* @__PURE__ */ a(
        k.Content,
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
          children: /* @__PURE__ */ a("div", { ref: _, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto", role: "listbox", children: u.length === 0 ? /* @__PURE__ */ a("div", { className: "py-2 text-center text-xs text-slate-500", children: i ? "검색 결과가 없습니다. Enter로 직접 추가" : "옵션이 없습니다." }) : u.map((e, t) => {
            const r = n.includes(e.value);
            return /* @__PURE__ */ c(
              "div",
              {
                role: "option",
                "aria-selected": r,
                "aria-disabled": e.disabled,
                onMouseDown: (l) => l.preventDefault(),
                onClick: () => !e.disabled && L(e.value),
                className: p(
                  "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                  "text-xs text-slate-800 dark:text-slate-50 outline-none",
                  "hover:bg-slate-100 dark:hover:bg-slate-700",
                  e.disabled && "pointer-events-none opacity-50",
                  o === t && "bg-slate-100 dark:bg-slate-700"
                ),
                children: [
                  /* @__PURE__ */ a(
                    ae,
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
se.displayName = "ComboboxMultiSelect";
export {
  se as ComboboxMultiSelect
};
//# sourceMappingURL=combobox-multi-select.mjs.map
