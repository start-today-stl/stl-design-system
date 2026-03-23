import { jsxs as m, jsx as i } from "react/jsx-runtime";
import * as $ from "react";
import { cn as d } from "../../lib/utils.mjs";
import { DuplicationIcon as I } from "../../icons/DuplicationIcon.mjs";
const K = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, L = (t, s = {}) => {
  const { type: p, prefix: n, suffix: l } = s;
  if (t == null || t === "") return null;
  if (typeof t != "string" && typeof t != "number") return t;
  const a = String(t);
  let e;
  switch (p) {
    case "phone":
      e = a.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      break;
    case "number": {
      const r = typeof t == "number" ? t : parseFloat(a.replace(/[^0-9.-]/g, ""));
      if (isNaN(r))
        e = a;
      else
        return e = `${n || ""}${r.toLocaleString("ko-KR")}${l || ""}`, e;
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
  return `${n || ""}${e}${l || ""}`;
}, M = $.forwardRef(
  ({
    label: t,
    value: s,
    emptyText: p = "-",
    size: n = "full",
    type: l = "text",
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
    renderValue: g,
    layout: F = "vertical",
    labelWidth: f = 100
  }, V) => {
    const o = F === "horizontal", T = typeof f == "number" ? `${f}px` : f, [h, w] = $.useState(!1), c = s == null || s === "", y = c ? p : L(s, { type: l, prefix: a, suffix: e }), R = g ? g(y) : y, j = async () => {
      if (c || typeof s != "string" && typeof s != "number") return;
      const k = String(s);
      try {
        await navigator.clipboard.writeText(k), w(!0), x == null || x(k), setTimeout(() => w(!1), 2e3);
      } catch (H) {
        console.error("Failed to copy:", H);
      }
    }, E = {
      wrap: "whitespace-normal break-words",
      ellipsis: "whitespace-nowrap overflow-hidden text-ellipsis",
      truncate: "truncate"
    };
    return /* @__PURE__ */ m(
      "div",
      {
        ref: V,
        className: d(
          "flex gap-1",
          o ? "flex-row items-center" : "flex-col",
          K[n]
        ),
        children: [
          (t || D) && /* @__PURE__ */ m(
            "span",
            {
              className: d(
                "flex items-center gap-1 text-xs text-slate-700 dark:text-slate-400",
                !t && "invisible",
                o && "shrink-0",
                z
              ),
              style: o ? { width: T } : void 0,
              children: [
                N && /* @__PURE__ */ i("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
                t || " "
              ]
            }
          ),
          /* @__PURE__ */ m("div", { className: "relative flex items-center gap-2 flex-1", children: [
            /* @__PURE__ */ i(
              "span",
              {
                className: d(
                  "text-sm text-slate-900 dark:text-slate-100",
                  // 최소 높이 확보 (InputField와 동일한 높이감) + 너비 채우기
                  "min-h-[36px] flex items-center flex-1",
                  c && "text-slate-400 dark:text-slate-500",
                  E[r],
                  S
                ),
                children: R
              }
            ),
            b && !c && /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                onClick: j,
                className: d(
                  "shrink-0 p-1 rounded transition-colors cursor-pointer",
                  "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300",
                  h && "text-green-500 dark:text-green-400"
                ),
                "aria-label": h ? "복사됨" : "복사",
                children: /* @__PURE__ */ i(I, { size: 20 })
              }
            )
          ] }),
          u && !o && /* @__PURE__ */ i("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: u })
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
