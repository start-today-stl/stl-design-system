import { jsxs as m, jsx as i } from "react/jsx-runtime";
import * as $ from "react";
import { cn as p } from "../../lib/utils.mjs";
import { DuplicationIcon as I } from "../../icons/DuplicationIcon.mjs";
const K = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, L = (e, r = {}) => {
  const { type: d, prefix: n, suffix: l } = r;
  if (e == null || e === "") return null;
  if (typeof e != "string" && typeof e != "number") return e;
  const a = String(e);
  let t;
  switch (d) {
    case "phone":
      t = a.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      break;
    case "number": {
      const s = typeof e == "number" ? e : parseFloat(a.replace(/[^0-9.-]/g, ""));
      if (isNaN(s))
        t = a;
      else
        return t = `${n || ""}${s.toLocaleString("ko-KR")}${l || ""}`, t;
      break;
    }
    case "date": {
      const s = new Date(a);
      isNaN(s.getTime()) ? t = a : t = `${s.getFullYear()}.${String(s.getMonth() + 1).padStart(2, "0")}.${String(s.getDate()).padStart(2, "0")}`;
      break;
    }
    case "email":
    case "text":
    default:
      t = a;
  }
  return `${n || ""}${t}${l || ""}`;
}, M = $.forwardRef(
  ({
    label: e,
    value: r,
    emptyText: d = "-",
    size: n = "full",
    type: l = "text",
    prefix: a,
    suffix: t,
    textOverflow: s = "wrap",
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
    const o = F === "horizontal", T = typeof f == "number" ? `${f}px` : f, [g, h] = $.useState(!1), c = r == null || r === "", y = c ? d : L(r, { type: l, prefix: a, suffix: t }), R = w ? w(y) : y, j = async () => {
      if (c || typeof r != "string" && typeof r != "number") return;
      const k = String(r);
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
        className: p(
          "flex gap-1",
          o ? "flex-row items-center" : "flex-col",
          K[n]
        ),
        children: [
          (e || D) && /* @__PURE__ */ m(
            "span",
            {
              className: p(
                "flex items-center gap-1 text-xs text-slate-700 dark:text-slate-400",
                !e && "invisible",
                o && "shrink-0",
                z
              ),
              style: o ? { width: T } : void 0,
              children: [
                N && /* @__PURE__ */ i("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
                e || " "
              ]
            }
          ),
          /* @__PURE__ */ m("div", { className: "relative flex items-center gap-2 flex-1 min-w-0", children: [
            /* @__PURE__ */ i(
              "span",
              {
                className: p(
                  "text-sm text-slate-900 dark:text-slate-100",
                  // 최소 높이 확보 (InputField와 동일한 높이감) + 너비 채우기
                  "min-h-[36px] flex items-center flex-1 min-w-0",
                  c && "text-slate-400 dark:text-slate-500",
                  E[s],
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
                className: p(
                  "shrink-0 p-1 rounded transition-colors cursor-pointer",
                  "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300",
                  g && "text-green-500 dark:text-green-400"
                ),
                "aria-label": g ? "복사됨" : "복사",
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
