import { jsxs as k, jsx as p } from "react/jsx-runtime";
import * as r from "react";
import { cn as u } from "../../lib/utils.mjs";
import { Chip as W } from "./chip.mjs";
const X = [
  "flex flex-wrap items-center gap-1.5 rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "min-h-9 px-2 py-1 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors cursor-text"
].join(" "), Y = [
  "border-slate-200 dark:border-slate-500",
  "focus-within:border-blue-500 focus-within:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), Z = [
  "border-destructive dark:border-red-500",
  "focus-within:border-destructive focus-within:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus-within:border-red-500"
].join(" "), H = "opacity-50 cursor-not-allowed pointer-events-none", P = {
  sm: "w-[180px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, V = r.forwardRef(
  ({
    value: D,
    defaultValue: z,
    onValueChange: f,
    label: x,
    placeholder: B,
    error: v,
    errorMessage: I,
    size: E = "full",
    required: _,
    disabled: h,
    reserveLabelSpace: T,
    maxTags: a,
    delimiterPattern: l = /[,\n]/,
    normalize: $ = (w) => w.trim(),
    allowDuplicates: C = !1,
    maxHeight: i,
    id: K,
    name: M,
    className: A
  }, F) => {
    const w = r.useId(), S = K || w, N = D !== void 0, [q, G] = r.useState(
      z ?? []
    ), s = N ? D : q, c = r.useRef(null);
    r.useImperativeHandle(
      F,
      () => c.current
    );
    const [o, b] = r.useState(""), j = (t) => {
      N || G(t), f == null || f(t);
    }, m = (t) => {
      const e = [];
      for (const y of t) {
        const d = $(y);
        d && (!C && s.includes(d) || e.includes(d) || e.push(d));
      }
      if (e.length === 0) return;
      let n = [...s, ...e];
      a !== void 0 && n.length > a && (n = n.slice(0, a)), j(n);
    }, R = (t) => {
      j(s.filter((e, n) => n !== t));
    }, g = () => {
      if (!o) return;
      const t = o.split(l);
      m(t), b("");
    }, J = (t) => {
      if (!t.nativeEvent.isComposing) {
        if (t.key === "Enter" || t.key === ",") {
          o && (t.preventDefault(), g());
          return;
        }
        if (t.key === "Tab" && o) {
          t.preventDefault(), g();
          return;
        }
        t.key === "Backspace" && o === "" && s.length > 0 && (t.preventDefault(), R(s.length - 1));
      }
    }, L = (t) => {
      const e = t.target.value;
      if (l.test(e)) {
        const n = e.split(l), y = n.pop() ?? "";
        m(n), b(y);
      } else
        b(e);
    }, O = (t) => {
      const e = t.clipboardData.getData("text");
      if (l.test(e)) {
        t.preventDefault();
        const n = e.split(l);
        m(n);
      }
    }, Q = (t) => {
      var e;
      t.target.closest("button") || t.target !== c.current && (t.preventDefault(), (e = c.current) == null || e.focus());
    }, U = a !== void 0 && s.length >= a;
    return /* @__PURE__ */ k("div", { className: u("flex flex-col gap-1", P[E]), children: [
      (x || T) && /* @__PURE__ */ k(
        "label",
        {
          htmlFor: S,
          className: u(
            "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400",
            !x && "invisible"
          ),
          children: [
            _ && /* @__PURE__ */ p(
              "span",
              {
                className: "size-2 rounded-full bg-red-400",
                "aria-hidden": "true"
              }
            ),
            x || " "
          ]
        }
      ),
      /* @__PURE__ */ k(
        "div",
        {
          className: u(
            X,
            v ? Z : Y,
            h && H,
            i !== void 0 && "overflow-y-auto",
            A
          ),
          style: i !== void 0 ? {
            maxHeight: typeof i == "number" ? `${i}px` : i
          } : void 0,
          onMouseDown: Q,
          "aria-invalid": v,
          children: [
            s.map((t, e) => /* @__PURE__ */ p(
              W,
              {
                size: "sm",
                removable: !h,
                onRemove: () => R(e),
                children: t
              },
              `${t}-${e}`
            )),
            /* @__PURE__ */ p(
              "input",
              {
                ref: c,
                id: S,
                name: M,
                type: "text",
                required: _ && s.length === 0,
                disabled: h || U,
                value: o,
                onChange: L,
                onKeyDown: J,
                onPaste: O,
                onBlur: g,
                placeholder: s.length === 0 ? B : "",
                className: u(
                  "flex-1 min-w-[80px] border-0 bg-transparent p-0 outline-none",
                  "placeholder:text-slate-500 dark:placeholder:text-slate-500",
                  "disabled:cursor-not-allowed"
                )
              }
            )
          ]
        }
      ),
      v && I && /* @__PURE__ */ p("span", { className: "text-xs text-destructive dark:text-red-400", children: I })
    ] });
  }
);
V.displayName = "TagsInput";
export {
  V as TagsInput,
  P as tagsInputSizeStyles
};
//# sourceMappingURL=tags-input.mjs.map
