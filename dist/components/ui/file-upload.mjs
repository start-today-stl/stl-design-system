import { jsxs as a, jsx as l } from "react/jsx-runtime";
import * as u from "react";
import { cn as N } from "../../lib/utils.mjs";
import { Input as A, inputSizeStyles as C } from "./input.mjs";
import { Button as I } from "./button.mjs";
import { UploadIcon as U } from "../../icons/UploadIcon.mjs";
import { XIcon as S } from "../../icons/XIcon.mjs";
const k = (s) => {
  if (s === 0) return "0 B";
  const e = 1024, o = ["B", "KB", "MB", "GB"], n = Math.floor(Math.log(s) / Math.log(e));
  return `${parseFloat((s / Math.pow(e, n)).toFixed(1))}${o[n]}`;
}, b = (s) => s.split(",").map((e) => e.trim().split("/")[1] || e).join(", "), D = u.forwardRef(
  ({
    label: s,
    files: e,
    onChange: o,
    maxFiles: n = 1,
    maxSize: p = 10 * 1024 * 1024,
    // 10MB
    accept: i = "image/*",
    helperText: h,
    error: f,
    errorMessage: x,
    size: y = "full",
    disabled: c,
    className: B
  }, $) => {
    const g = u.useRef(null), z = () => {
      var t;
      c || (t = g.current) == null || t.click();
    }, M = (t) => {
      const r = Array.from(t.target.files || []);
      if (r.length === 0) return;
      const m = r.filter((d) => d.size <= p);
      if (m.length > 0)
        if (n === 1)
          o([m[0]]);
        else {
          const d = n - e.length, R = m.slice(0, d);
          o([...e, ...R]);
        }
      t.target.value = "";
    }, j = (t) => {
      const r = e.filter((m, d) => d !== t);
      o(r);
    }, v = u.useMemo(() => {
      if (h) return h;
      const t = [];
      return t.push(`*파일 크기 ${k(p)} 이하`), i && i !== "*" && t.push(`*업로드 가능한 확장자 : ${b(i)}`), t.join(`
`);
    }, [h, p, i]), w = n === 1 || e.length < n, F = n === 1 && e.length > 0 ? e[0].name : "";
    return /* @__PURE__ */ a(
      "div",
      {
        ref: $,
        className: N("flex flex-col gap-2", C[y], B),
        children: [
          s && /* @__PURE__ */ l("label", { className: "text-xs text-slate-600 dark:text-slate-50", children: s }),
          /* @__PURE__ */ a(
            "div",
            {
              className: N(
                "flex",
                "[&>*:first-child]:rounded-r-none",
                "[&>*:last-child]:rounded-l-none",
                "[&>*:not(:first-child):not(:last-child)]:rounded-none",
                "[&>*:not(:last-child)]:border-r-0"
              ),
              children: [
                /* @__PURE__ */ l(
                  A,
                  {
                    value: F,
                    placeholder: "",
                    readOnly: !0,
                    disabled: c,
                    error: f,
                    className: "flex-1"
                  }
                ),
                /* @__PURE__ */ a(
                  I,
                  {
                    variant: "primary",
                    size: "default",
                    onClick: z,
                    disabled: c || !w,
                    children: [
                      /* @__PURE__ */ l(U, { size: 20 }),
                      "파일 선택"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ l(
            "input",
            {
              ref: g,
              type: "file",
              accept: i,
              multiple: n > 1,
              onChange: M,
              className: "hidden",
              disabled: c
            }
          ),
          f && x && /* @__PURE__ */ l("span", { className: "text-xs text-destructive dark:text-red-400", children: x }),
          v && /* @__PURE__ */ l("div", { className: "text-xs text-slate-500 dark:text-slate-400 whitespace-pre-line leading-5", children: v }),
          n > 1 && e.length > 0 && /* @__PURE__ */ l("div", { className: "flex flex-col gap-1", children: e.map((t, r) => /* @__PURE__ */ a(
            "div",
            {
              className: "flex items-center justify-between py-1",
              children: [
                /* @__PURE__ */ a("span", { className: "text-xs text-slate-700 dark:text-slate-300", children: [
                  r + 1,
                  ". ",
                  t.name
                ] }),
                /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ a("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: [
                    "[",
                    k(t.size),
                    "]"
                  ] }),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      onClick: () => j(r),
                      disabled: c,
                      className: "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-50",
                      "aria-label": `${t.name} 삭제`,
                      children: /* @__PURE__ */ l(S, { size: 18 })
                    }
                  )
                ] })
              ]
            },
            `${t.name}-${r}`
          )) })
        ]
      }
    );
  }
);
D.displayName = "FileUpload";
export {
  D as FileUpload
};
//# sourceMappingURL=file-upload.mjs.map
