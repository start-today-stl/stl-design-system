import { jsxs as x, jsx as i } from "react/jsx-runtime";
import * as y from "react";
import { cn as c } from "../../lib/utils.mjs";
import { DuplicationIcon as R } from "../../icons/DuplicationIcon.mjs";
const j = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, E = (t, s = {}) => {
  const { type: d, prefix: n, suffix: l } = s;
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
}, I = y.forwardRef(
  ({
    label: t,
    value: s,
    emptyText: d = "-",
    size: n = "full",
    type: l = "text",
    prefix: a,
    suffix: e,
    textOverflow: r = "wrap",
    copyable: k = !1,
    onCopy: p,
    required: b,
    helper: f,
    className: N,
    labelClassName: $,
    reserveLabelSpace: S,
    renderValue: m
  }, D) => {
    const [u, g] = y.useState(!1), o = s == null || s === "", h = o ? d : E(s, { type: l, prefix: a, suffix: e }), F = m ? m(h) : h, V = async () => {
      if (o || typeof s != "string" && typeof s != "number") return;
      const w = String(s);
      try {
        await navigator.clipboard.writeText(w), g(!0), p == null || p(w), setTimeout(() => g(!1), 2e3);
      } catch (z) {
        console.error("Failed to copy:", z);
      }
    }, T = {
      wrap: "whitespace-normal break-words",
      ellipsis: "whitespace-nowrap overflow-hidden text-ellipsis",
      truncate: "truncate"
    };
    return /* @__PURE__ */ x(
      "div",
      {
        ref: D,
        className: c("flex flex-col gap-1", j[n]),
        children: [
          (t || S) && /* @__PURE__ */ x(
            "span",
            {
              className: c(
                "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400",
                !t && "invisible",
                $
              ),
              children: [
                b && /* @__PURE__ */ i("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
                t || " "
              ]
            }
          ),
          /* @__PURE__ */ x("div", { className: "relative flex items-center gap-2", children: [
            /* @__PURE__ */ i(
              "span",
              {
                className: c(
                  "text-sm text-slate-900 dark:text-slate-100",
                  // 최소 높이 확보 (InputField와 동일한 높이감) + 너비 채우기
                  "min-h-[36px] flex items-center flex-1",
                  o && "text-slate-400 dark:text-slate-500",
                  T[r],
                  N
                ),
                children: F
              }
            ),
            k && !o && /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                onClick: V,
                className: c(
                  "shrink-0 p-1 rounded transition-colors cursor-pointer",
                  "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300",
                  u && "text-green-500 dark:text-green-400"
                ),
                "aria-label": u ? "복사됨" : "복사",
                children: /* @__PURE__ */ i(R, { size: 20 })
              }
            )
          ] }),
          f && /* @__PURE__ */ i("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: f })
        ]
      }
    );
  }
);
I.displayName = "DisplayField";
export {
  I as DisplayField
};
//# sourceMappingURL=display-field.mjs.map
