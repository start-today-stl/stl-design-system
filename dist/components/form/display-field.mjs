import { jsxs as m, jsx as n } from "react/jsx-runtime";
import * as $ from "react";
import { cn as l } from "../../lib/utils.mjs";
import { DuplicationIcon as I } from "../../icons/DuplicationIcon.mjs";
const K = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, L = (t, s = {}) => {
  const { type: d, prefix: o, suffix: c } = s;
  if (t == null || t === "") return null;
  if (typeof t != "string" && typeof t != "number") return t;
  const a = String(t);
  let e;
  switch (d) {
    case "phone":
      e = a.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      break;
    case "number": {
      const r = typeof t == "number" ? t : parseFloat(a.replace(/[^0-9.-]/g, ""));
      if (isNaN(r))
        e = a;
      else
        return e = `${o || ""}${r.toLocaleString("ko-KR")}${c || ""}`, e;
      break;
    }
    case "date": {
      const r = new Date(a);
      isNaN(r.getTime()) ? e = a : e = `${r.getFullYear()}.${String(r.getMonth() + 1).padStart(2, "0")}.${String(r.getDate()).padStart(2, "0")}`;
      break;
    }
    case "email":
    case "text":
    default:
      e = a;
  }
  return `${o || ""}${e}${c || ""}`;
}, M = $.forwardRef(
  ({
    label: t,
    value: s,
    emptyText: d = "-",
    size: o = "full",
    type: c = "text",
    prefix: a,
    suffix: e,
    textOverflow: r = "wrap",
    copyable: b = !1,
    onCopy: x,
    required: N,
    helper: u,
    className: S,
    labelClassName: z,
    reserveLabelSpace: D,
    renderValue: w,
    layout: F = "vertical",
    labelWidth: f = 100
  }, V) => {
    const i = F === "horizontal", T = typeof f == "number" ? `${f}px` : f, [g, h] = $.useState(!1), p = s == null || s === "", y = p ? d : L(s, { type: c, prefix: a, suffix: e }), R = w ? w(y) : y, j = async () => {
      if (p || typeof s != "string" && typeof s != "number") return;
      const k = String(s);
      try {
        await navigator.clipboard.writeText(k), h(!0), x == null || x(k), setTimeout(() => h(!1), 2e3);
      } catch (H) {
        console.error("Failed to copy:", H);
      }
    }, E = {
      wrap: "whitespace-pre-wrap break-words",
      ellipsis: "whitespace-nowrap overflow-hidden text-ellipsis",
      truncate: "truncate"
    };
    return /* @__PURE__ */ m(
      "div",
      {
        ref: V,
        className: l(
          "flex gap-1",
          i ? "flex-row items-center" : "flex-col",
          K[o]
        ),
        children: [
          (t || D) && /* @__PURE__ */ m(
            "span",
            {
              className: l(
                "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400",
                !t && "invisible",
                i && "shrink-0",
                z
              ),
              style: i ? { width: T } : void 0,
              children: [
                N && /* @__PURE__ */ n("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
                t || " "
              ]
            }
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: l(
                "min-w-0 min-h-[36px] py-[8px] flex items-center gap-1",
                i && "flex-1"
              ),
              children: [
                /* @__PURE__ */ n(
                  "span",
                  {
                    className: l(
                      "text-sm text-slate-900 dark:text-slate-100 min-w-0",
                      p && "text-slate-400 dark:text-slate-500",
                      E[r],
                      S
                    ),
                    children: R
                  }
                ),
                b && !p && /* @__PURE__ */ n(
                  "button",
                  {
                    type: "button",
                    onClick: j,
                    className: l(
                      "inline-flex p-1 rounded transition-colors cursor-pointer shrink-0",
                      "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300",
                      g && "text-green-500 dark:text-green-400"
                    ),
                    "aria-label": g ? "복사됨" : "복사",
                    children: /* @__PURE__ */ n(I, { size: 20 })
                  }
                )
              ]
            }
          ),
          u && !i && /* @__PURE__ */ n("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: u })
        ]
      }
    );
  }
);
M.displayName = "DisplayField";
export {
  M as DisplayField
};
//# sourceMappingURL=display-field.mjs.map
