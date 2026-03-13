import { jsxs as o, jsx as a, Fragment as Z } from "react/jsx-runtime";
import * as s from "react";
import { Command as z } from "cmdk";
import * as y from "@radix-ui/react-popover";
import { cn as b } from "../../lib/utils.mjs";
import { SearchIcon as J } from "../../icons/SearchIcon.mjs";
import { UpIcon as G } from "../../icons/UpIcon.mjs";
import { XIcon as F } from "../../icons/XIcon.mjs";
import { Checkbox as C } from "./checkbox.mjs";
import { inputSizeStyles as V } from "./input.mjs";
const Q = s.forwardRef(
  ({
    id: M,
    placeholder: E = "선택하세요",
    options: x,
    value: w,
    defaultValue: h,
    onValueChange: g,
    error: d,
    disabled: _,
    ariaLabel: O,
    tableMode: T,
    clearable: j = !0
  }, K) => {
    const [i, N] = s.useState(!1), [B, m] = s.useState(!1), [q, U] = s.useState(h || ""), [v, R] = s.useState(-1), H = s.useRef(null), S = w !== void 0 ? w : q, f = x.find((t) => t.value === S);
    s.useEffect(() => {
      if (i) {
        const t = x.findIndex((n) => n.value === S);
        R(t >= 0 ? t : 0);
      }
    }, [i, S, x]), s.useEffect(() => {
      if (i && v >= 0 && H.current) {
        const t = H.current.children[v];
        t && t.scrollIntoView({ block: "nearest" });
      }
    }, [v, i]);
    const P = (t) => {
      w === void 0 && U(t), g == null || g(t), N(!1);
    }, k = (t) => {
      t.stopPropagation(), w === void 0 && U(""), g == null || g("");
    }, D = (t) => {
      var A;
      if (!i) return;
      const n = x.map((I, L) => I.disabled ? -1 : L).filter((I) => I !== -1);
      switch (t.key) {
        case "ArrowDown": {
          t.preventDefault();
          const I = n.indexOf(v), L = n[(I + 1) % n.length];
          R(L);
          break;
        }
        case "ArrowUp": {
          t.preventDefault();
          const I = n.indexOf(v), L = n[(I - 1 + n.length) % n.length];
          R(L);
          break;
        }
        case "Enter":
        case " ": {
          t.preventDefault(), v >= 0 && !((A = x[v]) != null && A.disabled) && P(x[v].value);
          break;
        }
        case "Escape": {
          t.preventDefault(), N(!1);
          break;
        }
        case "Home": {
          t.preventDefault(), n.length > 0 && R(n[0]);
          break;
        }
        case "End": {
          t.preventDefault(), n.length > 0 && R(n[n.length - 1]);
          break;
        }
      }
    }, u = j && S && B && !_;
    return /* @__PURE__ */ o(y.Root, { open: i, onOpenChange: N, children: [
      /* @__PURE__ */ o(
        y.Trigger,
        {
          ref: K,
          id: M,
          disabled: _,
          className: b(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            d ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : T ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": d,
          "aria-label": O,
          onMouseEnter: () => m(!0),
          onMouseLeave: () => m(!1),
          onKeyDown: D,
          children: [
            /* @__PURE__ */ a(
              "span",
              {
                className: b(
                  "truncate",
                  !f && "text-slate-300 dark:text-slate-500"
                ),
                children: (f == null ? void 0 : f.label) || E
              }
            ),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              u && /* @__PURE__ */ a(
                "span",
                {
                  role: "button",
                  "aria-label": "선택 초기화",
                  onClick: k,
                  className: "flex items-center",
                  children: /* @__PURE__ */ a("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ a(F, { size: 20 }) })
                }
              ),
              /* @__PURE__ */ a(
                G,
                {
                  size: 24,
                  className: b(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    i && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ a(y.Portal, { children: /* @__PURE__ */ a(
        y.Content,
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
          onOpenAutoFocus: (t) => t.preventDefault(),
          children: /* @__PURE__ */ a("div", { ref: H, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto", role: "listbox", children: x.map((t, n) => /* @__PURE__ */ a(
            "div",
            {
              role: "option",
              "aria-selected": S === t.value,
              "aria-disabled": t.disabled,
              onClick: () => !t.disabled && P(t.value),
              className: b(
                "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                "text-xs text-slate-700 dark:text-slate-50 outline-none",
                "hover:bg-slate-100 dark:hover:bg-slate-700",
                t.disabled && "pointer-events-none opacity-50",
                S === t.value && "bg-accent text-accent-foreground",
                v === n && "bg-slate-100 dark:bg-slate-700"
              ),
              children: t.label
            },
            t.value
          )) })
        }
      ) })
    ] });
  }
);
Q.displayName = "BasicSelect";
const W = s.forwardRef(
  ({
    id: M,
    placeholder: E = "선택하세요",
    searchPlaceholder: x = "검색...",
    options: w,
    value: h,
    defaultValue: g,
    onValueChange: d,
    error: _,
    disabled: O,
    ariaLabel: T,
    tableMode: j,
    clearable: K = !0
  }, i) => {
    const [N, B] = s.useState(!1), [m, q] = s.useState(""), [U, v] = s.useState(!1), [R, H] = s.useState(g || ""), [S, f] = s.useState(""), P = s.useRef(null), k = h !== void 0 ? h : R, D = w.find((r) => r.value === k), u = w.filter(
      (r) => r.label.toLowerCase().includes(m.toLowerCase())
    );
    s.useEffect(() => {
      if (N && u.length > 0) {
        const r = u.find((c) => c.value === k);
        f((r == null ? void 0 : r.label) || u[0].label);
      }
    }, [N]);
    const t = (r) => {
      if (P.current) {
        const c = P.current.querySelector(`[data-value="${r.toLowerCase()}"]`);
        c == null || c.scrollIntoView({ block: "nearest" });
      }
    }, n = (r) => {
      h === void 0 && H(r), d == null || d(r), B(!1), q("");
    }, A = (r) => {
      r.stopPropagation(), h === void 0 && H(""), d == null || d("");
    }, I = (r) => {
      const c = u.filter((e) => !e.disabled);
      if (c.length === 0) return;
      const X = c.findIndex((e) => e.label === S);
      if (r.key === "Home") {
        r.preventDefault();
        const e = c[0].label;
        f(e), t(e);
      } else if (r.key === "End") {
        r.preventDefault();
        const e = c[c.length - 1].label;
        f(e), t(e);
      } else if (r.key === "ArrowDown") {
        if (X === c.length - 1) {
          r.preventDefault();
          const e = c[0].label;
          f(e), t(e);
        }
      } else if (r.key === "ArrowUp" && X === 0) {
        r.preventDefault();
        const e = c[c.length - 1].label;
        f(e), t(e);
      }
    }, L = K && k && U && !O;
    return /* @__PURE__ */ o(y.Root, { open: N, onOpenChange: B, children: [
      /* @__PURE__ */ o(
        y.Trigger,
        {
          ref: i,
          id: M,
          disabled: O,
          className: b(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            _ ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : j ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": _,
          "aria-label": T,
          onMouseEnter: () => v(!0),
          onMouseLeave: () => v(!1),
          children: [
            /* @__PURE__ */ a(
              "span",
              {
                className: b(
                  "truncate",
                  !D && "text-slate-300 dark:text-slate-500"
                ),
                children: (D == null ? void 0 : D.label) || E
              }
            ),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              L && /* @__PURE__ */ a(
                "span",
                {
                  role: "button",
                  "aria-label": "선택 초기화",
                  onClick: A,
                  className: "flex items-center",
                  children: /* @__PURE__ */ a("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ a(F, { size: 20 }) })
                }
              ),
              /* @__PURE__ */ a(
                G,
                {
                  size: 24,
                  className: b(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    N && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ a(y.Portal, { children: /* @__PURE__ */ a(
        y.Content,
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
          children: /* @__PURE__ */ o(
            z,
            {
              className: "flex flex-col",
              value: S,
              onValueChange: f,
              children: [
                /* @__PURE__ */ o("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600", children: [
                  /* @__PURE__ */ a(J, { size: 20, className: "text-slate-400" }),
                  /* @__PURE__ */ a(
                    z.Input,
                    {
                      value: m,
                      onValueChange: q,
                      placeholder: x,
                      className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400",
                      onKeyDown: I
                    }
                  )
                ] }),
                /* @__PURE__ */ o(z.List, { ref: P, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
                  /* @__PURE__ */ a(z.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
                  u.map((r) => /* @__PURE__ */ a(
                    z.Item,
                    {
                      value: r.label,
                      disabled: r.disabled,
                      onSelect: () => n(r.value),
                      className: b(
                        "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                        "text-xs text-slate-700 dark:text-slate-50 outline-none",
                        "hover:bg-slate-100 dark:hover:bg-slate-700",
                        "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                        k === r.value && "bg-accent text-accent-foreground"
                      ),
                      children: r.label
                    },
                    r.value
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
W.displayName = "SearchableSelect";
const Y = s.forwardRef(
  ({
    id: M,
    placeholder: E = "선택하세요",
    searchPlaceholder: x = "검색...",
    options: w,
    value: h,
    defaultValue: g,
    onValueChange: d,
    error: _,
    disabled: O,
    ariaLabel: T,
    tableMode: j,
    overflowMode: K = "truncate",
    maxDisplayCount: i = 2,
    clearable: N = !0
  }, B) => {
    const [m, q] = s.useState(!1), [U, v] = s.useState(""), [R, H] = s.useState(!1), [S, f] = s.useState(
      g || []
    ), [P, k] = s.useState(""), D = s.useRef(null), u = h !== void 0 ? h : S, t = w.filter(
      (e) => u.includes(e.value)
    ), n = w.filter(
      (e) => e.label.toLowerCase().includes(U.toLowerCase())
    );
    s.useEffect(() => {
      m && n.length > 0 && k(n[0].label);
    }, [m]);
    const A = (e) => {
      if (D.current) {
        const l = D.current.querySelector(`[data-value="${e.toLowerCase()}"]`);
        l == null || l.scrollIntoView({ block: "nearest" });
      }
    }, I = (e) => {
      const l = u.includes(e) ? u.filter(($) => $ !== e) : [...u, e];
      h === void 0 && f(l), d == null || d(l);
    }, L = (e, l) => {
      l.stopPropagation();
      const $ = u.filter((p) => p !== e);
      h === void 0 && f($), d == null || d($);
    }, r = (e) => {
      e.stopPropagation(), h === void 0 && f([]), d == null || d([]);
    }, c = (e) => {
      const l = n.filter((p) => !p.disabled);
      if (l.length === 0) return;
      const $ = l.findIndex((p) => p.label === P);
      if (e.key === "Home") {
        e.preventDefault();
        const p = l[0].label;
        k(p), A(p);
      } else if (e.key === "End") {
        e.preventDefault();
        const p = l[l.length - 1].label;
        k(p), A(p);
      } else if (e.key === "ArrowDown") {
        if ($ === l.length - 1) {
          e.preventDefault();
          const p = l[0].label;
          k(p), A(p);
        }
      } else if (e.key === "ArrowUp" && $ === 0) {
        e.preventDefault();
        const p = l[l.length - 1].label;
        k(p), A(p);
      }
    }, X = N && u.length > 0 && R && !O;
    return /* @__PURE__ */ o(y.Root, { open: m, onOpenChange: q, children: [
      /* @__PURE__ */ o(
        y.Trigger,
        {
          ref: B,
          id: M,
          disabled: O,
          className: b(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            _ ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : j ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": _,
          "aria-label": T,
          onMouseEnter: () => H(!0),
          onMouseLeave: () => H(!1),
          children: [
            /* @__PURE__ */ a("div", { className: b(
              "flex flex-1 gap-1",
              K === "wrap" ? "flex-wrap" : "flex-nowrap overflow-hidden"
            ), children: t.length === 0 ? /* @__PURE__ */ a("span", { className: "text-slate-500 dark:text-slate-50", children: E }) : K === "truncate" ? /* @__PURE__ */ o(Z, { children: [
              t.slice(0, i).map((e) => /* @__PURE__ */ o(
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
                        onClick: (l) => L(e.value, l),
                        className: "cursor-pointer flex-shrink-0",
                        children: /* @__PURE__ */ a(F, { size: 18 })
                      }
                    )
                  ]
                },
                e.value
              )),
              t.length > i && /* @__PURE__ */ o("span", { className: "inline-flex items-center rounded bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 text-xs flex-shrink-0", children: [
                "+",
                t.length - i
              ] })
            ] }) : t.map((e) => /* @__PURE__ */ o(
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
                      onClick: (l) => L(e.value, l),
                      className: "cursor-pointer",
                      children: /* @__PURE__ */ a(F, { size: 18 })
                    }
                  )
                ]
              },
              e.value
            )) }),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              X && /* @__PURE__ */ a(
                "span",
                {
                  role: "button",
                  "aria-label": "전체 선택 초기화",
                  onClick: r,
                  className: "flex items-center",
                  children: /* @__PURE__ */ a("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ a(F, { size: 20 }) })
                }
              ),
              /* @__PURE__ */ a(
                G,
                {
                  size: 24,
                  className: b(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    m && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ a(y.Portal, { children: /* @__PURE__ */ a(
        y.Content,
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
          children: /* @__PURE__ */ o(
            z,
            {
              className: "flex flex-col",
              value: P,
              onValueChange: k,
              children: [
                /* @__PURE__ */ o("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600", children: [
                  /* @__PURE__ */ a(J, { size: 20, className: "text-slate-400" }),
                  /* @__PURE__ */ a(
                    z.Input,
                    {
                      value: U,
                      onValueChange: v,
                      placeholder: x,
                      className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400",
                      onKeyDown: c
                    }
                  )
                ] }),
                /* @__PURE__ */ o(z.List, { ref: D, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
                  /* @__PURE__ */ a(z.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
                  n.map((e) => {
                    const l = u.includes(e.value);
                    return /* @__PURE__ */ o(
                      z.Item,
                      {
                        value: e.label,
                        disabled: e.disabled,
                        onSelect: () => I(e.value),
                        className: b(
                          "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                          "text-xs text-slate-700 dark:text-slate-50 outline-none",
                          "hover:bg-slate-100 dark:hover:bg-slate-700",
                          "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                        ),
                        children: [
                          /* @__PURE__ */ a(
                            C,
                            {
                              checked: l,
                              className: "pointer-events-none h-4 w-4"
                            }
                          ),
                          e.label
                        ]
                      },
                      e.value
                    );
                  })
                ] })
              ]
            }
          )
        }
      ) })
    ] });
  }
);
Y.displayName = "MultiSelect";
const ee = s.forwardRef(
  (M, E) => {
    const {
      label: x,
      size: w = "full",
      error: h,
      errorMessage: g,
      className: d,
      "aria-label": _,
      reserveLabelSpace: O,
      required: T,
      searchable: j = !1,
      multiple: K = !1
    } = M, i = s.useId(), N = () => {
      const { "aria-label": B, ...m } = M;
      return K ? /* @__PURE__ */ a(
        Y,
        {
          ref: E,
          id: i,
          ariaLabel: _,
          ...m
        }
      ) : j ? /* @__PURE__ */ a(
        W,
        {
          ref: E,
          id: i,
          ariaLabel: _,
          ...m
        }
      ) : /* @__PURE__ */ a(
        Q,
        {
          ref: E,
          id: i,
          ariaLabel: _,
          ...m
        }
      );
    };
    return /* @__PURE__ */ o(
      "div",
      {
        className: b(
          "flex flex-col gap-1",
          V[w],
          d
        ),
        children: [
          (x || O) && /* @__PURE__ */ o(
            "label",
            {
              htmlFor: i,
              className: b(
                "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400",
                !x && "invisible"
              ),
              children: [
                T && /* @__PURE__ */ a("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
                x || " "
              ]
            }
          ),
          N(),
          h && g && /* @__PURE__ */ a("span", { className: "text-xs text-destructive dark:text-red-400", children: g })
        ]
      }
    );
  }
);
ee.displayName = "Select";
export {
  ee as Select,
  V as inputSizeStyles
};
//# sourceMappingURL=select.mjs.map
