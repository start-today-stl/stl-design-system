import { jsxs as c, jsx as a } from "react/jsx-runtime";
import * as g from "react";
import { cn as l } from "../../lib/utils.mjs";
import { DuplicationIcon as V } from "../../icons/DuplicationIcon.mjs";
const z = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, R = (t, e) => {
  if (t == null || t === "") return null;
  if (typeof t != "string" && typeof t != "number") return t;
  const r = String(t);
  switch (e) {
    case "phone":
      return r.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    case "money":
      const n = typeof t == "number" ? t : parseFloat(r.replace(/[^0-9.-]/g, ""));
      return isNaN(n) ? r : `${n.toLocaleString("ko-KR")}원`;
    case "date":
      const s = new Date(r);
      return isNaN(s.getTime()) ? r : `${s.getFullYear()}.${String(s.getMonth() + 1).padStart(2, "0")}.${String(s.getDate()).padStart(2, "0")}`;
    case "email":
    case "text":
    default:
      return r;
  }
}, j = g.forwardRef(
  ({
    label: t,
    value: e,
    emptyText: r = "-",
    size: n = "full",
    type: s = "text",
    textOverflow: h = "wrap",
    copyable: w = !1,
    onCopy: o,
    required: y,
    helper: d,
    className: N,
    labelClassName: k,
    reserveLabelSpace: S,
    renderValue: p
  }, b) => {
    const [x, m] = g.useState(!1), i = e == null || e === "", f = i ? r : R(e, s), $ = p ? p(f) : f, D = async () => {
      if (i || typeof e != "string" && typeof e != "number") return;
      const u = String(e);
      try {
        await navigator.clipboard.writeText(u), m(!0), o == null || o(u), setTimeout(() => m(!1), 2e3);
      } catch (T) {
        console.error("Failed to copy:", T);
      }
    }, F = {
      wrap: "whitespace-normal break-words",
      ellipsis: "whitespace-nowrap overflow-hidden text-ellipsis",
      truncate: "truncate"
    };
    return /* @__PURE__ */ c(
      "div",
      {
        ref: b,
        className: l("flex flex-col gap-1", z[n]),
        children: [
          (t || S) && /* @__PURE__ */ c(
            "span",
            {
              className: l(
                "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50",
                !t && "invisible",
                k
              ),
              children: [
                y && /* @__PURE__ */ a("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
                t || " "
              ]
            }
          ),
          /* @__PURE__ */ c("div", { className: "relative flex items-center gap-2", children: [
            /* @__PURE__ */ a(
              "span",
              {
                className: l(
                  "text-sm text-slate-900 dark:text-slate-100",
                  // 최소 높이 확보 (InputField와 동일한 높이감) + 너비 채우기
                  "min-h-[36px] flex items-center flex-1",
                  i && "text-slate-400 dark:text-slate-500",
                  F[h],
                  N
                ),
                children: $
              }
            ),
            w && !i && /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: D,
                className: l(
                  "shrink-0 p-1 rounded transition-colors",
                  "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300",
                  x && "text-green-500 dark:text-green-400"
                ),
                "aria-label": x ? "복사됨" : "복사",
                children: /* @__PURE__ */ a(V, { size: 16 })
              }
            )
          ] }),
          d && /* @__PURE__ */ a("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: d })
        ]
      }
    );
  }
);
j.displayName = "DisplayField";
export {
  j as DisplayField
};
//# sourceMappingURL=display-field.mjs.map
