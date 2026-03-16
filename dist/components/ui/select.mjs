import { jsxs as o, jsx as t, Fragment as V } from "react/jsx-runtime";
import * as s from "react";
import { Command as R } from "cmdk";
import * as y from "@radix-ui/react-popover";
import { cn as p } from "../../lib/utils.mjs";
import { SearchIcon as W } from "../../icons/SearchIcon.mjs";
import { UpIcon as J } from "../../icons/UpIcon.mjs";
import { XIcon as X } from "../../icons/XIcon.mjs";
import { Checkbox as ee } from "./checkbox.mjs";
import { Spinner as Q } from "./spinner.mjs";
import { inputSizeStyles as te } from "./input.mjs";
const Y = s.forwardRef(
  ({
    id: j,
    placeholder: H = "선택하세요",
    options: b,
    value: _,
    defaultValue: u,
    onValueChange: v,
    error: d,
    disabled: N,
    ariaLabel: P,
    tableMode: B,
    clearable: U = !0,
    loading: z
  }, h) => {
    const [g, k] = s.useState(!1), [D, L] = s.useState(!1), [F, $] = s.useState(u || ""), [m, A] = s.useState(-1), M = s.useRef(null), S = _ !== void 0 ? _ : F, x = b.find((a) => a.value === S);
    s.useEffect(() => {
      if (g) {
        const a = b.findIndex((n) => n.value === S);
        A(a >= 0 ? a : 0);
      }
    }, [g, S, b]), s.useEffect(() => {
      if (g && m >= 0 && M.current) {
        const a = M.current.children[m];
        a && a.scrollIntoView({ block: "nearest" });
      }
    }, [m, g]);
    const K = (a) => {
      _ === void 0 && $(a), v == null || v(a), k(!1);
    }, w = (a) => {
      a.stopPropagation(), _ === void 0 && $(""), v == null || v("");
    }, E = (a) => {
      var T;
      if (!g) return;
      const n = b.map((I, O) => I.disabled ? -1 : O).filter((I) => I !== -1);
      switch (a.key) {
        case "ArrowDown": {
          a.preventDefault();
          const I = n.indexOf(m), O = n[(I + 1) % n.length];
          A(O);
          break;
        }
        case "ArrowUp": {
          a.preventDefault();
          const I = n.indexOf(m), O = n[(I - 1 + n.length) % n.length];
          A(O);
          break;
        }
        case "Enter":
        case " ": {
          a.preventDefault(), m >= 0 && !((T = b[m]) != null && T.disabled) && K(b[m].value);
          break;
        }
        case "Escape": {
          a.preventDefault(), k(!1);
          break;
        }
        case "Home": {
          a.preventDefault(), n.length > 0 && A(n[0]);
          break;
        }
        case "End": {
          a.preventDefault(), n.length > 0 && A(n[n.length - 1]);
          break;
        }
      }
    }, f = U && S && D && !N && !z;
    return /* @__PURE__ */ o(y.Root, { open: g, onOpenChange: k, children: [
      /* @__PURE__ */ o(
        y.Trigger,
        {
          ref: h,
          id: j,
          disabled: N || z,
          className: p(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            d ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : B ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": d,
          "aria-label": P,
          onMouseEnter: () => L(!0),
          onMouseLeave: () => L(!1),
          onKeyDown: E,
          children: [
            /* @__PURE__ */ t(
              "span",
              {
                className: p(
                  "truncate",
                  !x && "text-slate-300 dark:text-slate-500"
                ),
                children: (x == null ? void 0 : x.label) || H
              }
            ),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              f && /* @__PURE__ */ t(
                "span",
                {
                  role: "button",
                  "aria-label": "선택 초기화",
                  onClick: w,
                  className: "flex items-center",
                  children: /* @__PURE__ */ t("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ t(X, { size: 20 }) })
                }
              ),
              z ? /* @__PURE__ */ t(Q, { size: "sm" }) : /* @__PURE__ */ t(
                J,
                {
                  size: 24,
                  className: p(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    g && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ t(y.Portal, { children: /* @__PURE__ */ t(
        y.Content,
        {
          className: p(
            "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          onOpenAutoFocus: (a) => a.preventDefault(),
          children: /* @__PURE__ */ t("div", { ref: M, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto", role: "listbox", children: b.map((a, n) => /* @__PURE__ */ t(
            "div",
            {
              role: "option",
              "aria-selected": S === a.value,
              "aria-disabled": a.disabled,
              onClick: () => !a.disabled && K(a.value),
              className: p(
                "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                "text-xs text-slate-700 dark:text-slate-50 outline-none",
                "hover:bg-slate-100 dark:hover:bg-slate-700",
                a.disabled && "pointer-events-none opacity-50",
                S === a.value && "bg-accent text-accent-foreground",
                m === n && "bg-slate-100 dark:bg-slate-700"
              ),
              children: a.label
            },
            a.value
          )) })
        }
      ) })
    ] });
  }
);
Y.displayName = "BasicSelect";
const Z = s.forwardRef(
  ({
    id: j,
    placeholder: H = "선택하세요",
    searchPlaceholder: b = "검색...",
    options: _,
    value: u,
    defaultValue: v,
    onValueChange: d,
    error: N,
    disabled: P,
    ariaLabel: B,
    tableMode: U,
    clearable: z = !0,
    loading: h
  }, g) => {
    const [k, D] = s.useState(!1), [L, F] = s.useState(""), [$, m] = s.useState(!1), [A, M] = s.useState(v || ""), [S, x] = s.useState(""), K = s.useRef(null), w = u !== void 0 ? u : A, E = _.find((r) => r.value === w), f = _.filter(
      (r) => r.label.toLowerCase().includes(L.toLowerCase())
    );
    s.useEffect(() => {
      if (k && f.length > 0) {
        const r = f.find((i) => i.value === w);
        x((r == null ? void 0 : r.label) || f[0].label);
      }
    }, [k]);
    const a = (r) => {
      if (K.current) {
        const i = K.current.querySelector(`[data-value="${r.toLowerCase()}"]`);
        i == null || i.scrollIntoView({ block: "nearest" });
      }
    }, n = (r) => {
      u === void 0 && M(r), d == null || d(r), D(!1), F("");
    }, T = (r) => {
      r.stopPropagation(), u === void 0 && M(""), d == null || d("");
    }, I = (r) => {
      const i = f.filter((e) => !e.disabled);
      if (i.length === 0) return;
      const G = i.findIndex((e) => e.label === S);
      if (r.key === "Home") {
        r.preventDefault();
        const e = i[0].label;
        x(e), a(e);
      } else if (r.key === "End") {
        r.preventDefault();
        const e = i[i.length - 1].label;
        x(e), a(e);
      } else if (r.key === "ArrowDown") {
        if (G === i.length - 1) {
          r.preventDefault();
          const e = i[0].label;
          x(e), a(e);
        }
      } else if (r.key === "ArrowUp" && G === 0) {
        r.preventDefault();
        const e = i[i.length - 1].label;
        x(e), a(e);
      }
    }, O = z && w && $ && !P && !h;
    return /* @__PURE__ */ o(y.Root, { open: k, onOpenChange: D, children: [
      /* @__PURE__ */ o(
        y.Trigger,
        {
          ref: g,
          id: j,
          disabled: P || h,
          className: p(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            N ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : U ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": N,
          "aria-label": B,
          onMouseEnter: () => m(!0),
          onMouseLeave: () => m(!1),
          children: [
            /* @__PURE__ */ t(
              "span",
              {
                className: p(
                  "truncate",
                  !E && "text-slate-300 dark:text-slate-500"
                ),
                children: (E == null ? void 0 : E.label) || H
              }
            ),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              O && /* @__PURE__ */ t(
                "span",
                {
                  role: "button",
                  "aria-label": "선택 초기화",
                  onClick: T,
                  className: "flex items-center",
                  children: /* @__PURE__ */ t("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ t(X, { size: 20 }) })
                }
              ),
              h ? /* @__PURE__ */ t(Q, { size: "sm" }) : /* @__PURE__ */ t(
                J,
                {
                  size: 24,
                  className: p(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    k && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ t(y.Portal, { children: /* @__PURE__ */ t(
        y.Content,
        {
          className: p(
            "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          children: /* @__PURE__ */ o(
            R,
            {
              className: "flex flex-col",
              value: S,
              onValueChange: x,
              children: [
                /* @__PURE__ */ o("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600", children: [
                  /* @__PURE__ */ t(W, { size: 20, className: "text-slate-400" }),
                  /* @__PURE__ */ t(
                    R.Input,
                    {
                      value: L,
                      onValueChange: F,
                      placeholder: b,
                      className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400",
                      onKeyDown: I
                    }
                  )
                ] }),
                /* @__PURE__ */ o(R.List, { ref: K, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
                  /* @__PURE__ */ t(R.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
                  f.map((r) => /* @__PURE__ */ t(
                    R.Item,
                    {
                      value: r.label,
                      disabled: r.disabled,
                      onSelect: () => n(r.value),
                      className: p(
                        "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                        "text-xs text-slate-700 dark:text-slate-50 outline-none",
                        "hover:bg-slate-100 dark:hover:bg-slate-700",
                        "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                        w === r.value && "bg-accent text-accent-foreground"
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
Z.displayName = "SearchableSelect";
const C = s.forwardRef(
  ({
    id: j,
    placeholder: H = "선택하세요",
    searchPlaceholder: b = "검색...",
    options: _,
    value: u,
    defaultValue: v,
    onValueChange: d,
    error: N,
    disabled: P,
    ariaLabel: B,
    tableMode: U,
    overflowMode: z = "truncate",
    maxDisplayCount: h = 2,
    clearable: g = !0,
    loading: k
  }, D) => {
    const [L, F] = s.useState(!1), [$, m] = s.useState(""), [A, M] = s.useState(!1), [S, x] = s.useState(
      v || []
    ), [K, w] = s.useState(""), E = s.useRef(null), f = u !== void 0 ? u : S, a = _.filter(
      (e) => f.includes(e.value)
    ), n = _.filter(
      (e) => e.label.toLowerCase().includes($.toLowerCase())
    );
    s.useEffect(() => {
      L && n.length > 0 && w(n[0].label);
    }, [L]);
    const T = (e) => {
      if (E.current) {
        const l = E.current.querySelector(`[data-value="${e.toLowerCase()}"]`);
        l == null || l.scrollIntoView({ block: "nearest" });
      }
    }, I = (e) => {
      const l = f.includes(e) ? f.filter((q) => q !== e) : [...f, e];
      u === void 0 && x(l), d == null || d(l);
    }, O = (e, l) => {
      l.stopPropagation();
      const q = f.filter((c) => c !== e);
      u === void 0 && x(q), d == null || d(q);
    }, r = (e) => {
      e.stopPropagation(), u === void 0 && x([]), d == null || d([]);
    }, i = (e) => {
      const l = n.filter((c) => !c.disabled);
      if (l.length === 0) return;
      const q = l.findIndex((c) => c.label === K);
      if (e.key === "Home") {
        e.preventDefault();
        const c = l[0].label;
        w(c), T(c);
      } else if (e.key === "End") {
        e.preventDefault();
        const c = l[l.length - 1].label;
        w(c), T(c);
      } else if (e.key === "ArrowDown") {
        if (q === l.length - 1) {
          e.preventDefault();
          const c = l[0].label;
          w(c), T(c);
        }
      } else if (e.key === "ArrowUp" && q === 0) {
        e.preventDefault();
        const c = l[l.length - 1].label;
        w(c), T(c);
      }
    }, G = g && f.length > 0 && A && !P && !k;
    return /* @__PURE__ */ o(y.Root, { open: L, onOpenChange: F, children: [
      /* @__PURE__ */ o(
        y.Trigger,
        {
          ref: D,
          id: j,
          disabled: P || k,
          className: p(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            N ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : U ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": N,
          "aria-label": B,
          onMouseEnter: () => M(!0),
          onMouseLeave: () => M(!1),
          children: [
            /* @__PURE__ */ t("div", { className: p(
              "flex flex-1 gap-1",
              z === "wrap" ? "flex-wrap" : "flex-nowrap overflow-hidden"
            ), children: a.length === 0 ? /* @__PURE__ */ t("span", { className: "text-slate-500 dark:text-slate-50", children: H }) : z === "truncate" ? /* @__PURE__ */ o(V, { children: [
              a.slice(0, h).map((e) => /* @__PURE__ */ o(
                "span",
                {
                  className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0",
                  children: [
                    /* @__PURE__ */ t("span", { className: "truncate max-w-[80px]", children: e.label }),
                    /* @__PURE__ */ t(
                      "span",
                      {
                        role: "img",
                        "aria-label": `${e.label} 삭제`,
                        onClick: (l) => O(e.value, l),
                        className: "cursor-pointer flex-shrink-0",
                        children: /* @__PURE__ */ t(X, { size: 18 })
                      }
                    )
                  ]
                },
                e.value
              )),
              a.length > h && /* @__PURE__ */ o("span", { className: "inline-flex items-center rounded bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 text-xs flex-shrink-0", children: [
                "+",
                a.length - h
              ] })
            ] }) : a.map((e) => /* @__PURE__ */ o(
              "span",
              {
                className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs",
                children: [
                  e.label,
                  /* @__PURE__ */ t(
                    "span",
                    {
                      role: "img",
                      "aria-label": `${e.label} 삭제`,
                      onClick: (l) => O(e.value, l),
                      className: "cursor-pointer",
                      children: /* @__PURE__ */ t(X, { size: 18 })
                    }
                  )
                ]
              },
              e.value
            )) }),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              G && /* @__PURE__ */ t(
                "span",
                {
                  role: "button",
                  "aria-label": "전체 선택 초기화",
                  onClick: r,
                  className: "flex items-center",
                  children: /* @__PURE__ */ t("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ t(X, { size: 20 }) })
                }
              ),
              k ? /* @__PURE__ */ t(Q, { size: "sm" }) : /* @__PURE__ */ t(
                J,
                {
                  size: 24,
                  className: p(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    L && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ t(y.Portal, { children: /* @__PURE__ */ t(
        y.Content,
        {
          className: p(
            "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          children: /* @__PURE__ */ o(
            R,
            {
              className: "flex flex-col",
              value: K,
              onValueChange: w,
              children: [
                /* @__PURE__ */ o("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600", children: [
                  /* @__PURE__ */ t(W, { size: 20, className: "text-slate-400" }),
                  /* @__PURE__ */ t(
                    R.Input,
                    {
                      value: $,
                      onValueChange: m,
                      placeholder: b,
                      className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400",
                      onKeyDown: i
                    }
                  )
                ] }),
                /* @__PURE__ */ o(R.List, { ref: E, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
                  /* @__PURE__ */ t(R.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
                  n.map((e) => {
                    const l = f.includes(e.value);
                    return /* @__PURE__ */ o(
                      R.Item,
                      {
                        value: e.label,
                        disabled: e.disabled,
                        onSelect: () => I(e.value),
                        className: p(
                          "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                          "text-xs text-slate-700 dark:text-slate-50 outline-none",
                          "hover:bg-slate-100 dark:hover:bg-slate-700",
                          "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                        ),
                        children: [
                          /* @__PURE__ */ t(
                            ee,
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
C.displayName = "MultiSelect";
const ae = s.forwardRef(
  (j, H) => {
    const {
      label: b,
      size: _ = "full",
      error: u,
      errorMessage: v,
      className: d,
      "aria-label": N,
      reserveLabelSpace: P,
      required: B,
      searchable: U = !1,
      multiple: z = !1
    } = j, h = s.useId(), g = () => {
      const { "aria-label": k, ...D } = j;
      return z ? /* @__PURE__ */ t(
        C,
        {
          ref: H,
          id: h,
          ariaLabel: N,
          ...D
        }
      ) : U ? /* @__PURE__ */ t(
        Z,
        {
          ref: H,
          id: h,
          ariaLabel: N,
          ...D
        }
      ) : /* @__PURE__ */ t(
        Y,
        {
          ref: H,
          id: h,
          ariaLabel: N,
          ...D
        }
      );
    };
    return /* @__PURE__ */ o(
      "div",
      {
        className: p(
          "flex flex-col gap-1",
          te[_],
          d
        ),
        children: [
          (b || P) && /* @__PURE__ */ o(
            "label",
            {
              htmlFor: h,
              className: p(
                "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400",
                !b && "invisible"
              ),
              children: [
                B && /* @__PURE__ */ t("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
                b || " "
              ]
            }
          ),
          g(),
          u && v && /* @__PURE__ */ t("span", { className: "text-xs text-destructive dark:text-red-400", children: v })
        ]
      }
    );
  }
);
ae.displayName = "Select";
export {
  ae as Select,
  te as inputSizeStyles
};
//# sourceMappingURL=select.mjs.map
