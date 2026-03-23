import { jsxs as a, jsx as r } from "react/jsx-runtime";
import * as m from "react";
import { cn as v } from "../../lib/utils.mjs";
import { Input as b, inputSizeStyles as A } from "./input.mjs";
import { Button as C } from "./button.mjs";
import { UploadIcon as I } from "../../icons/UploadIcon.mjs";
import { XIcon as U } from "../../icons/XIcon.mjs";
const k = (n) => {
  if (n === 0) return "0 B";
  const e = 1024, i = ["B", "KB", "MB", "GB"], l = Math.floor(Math.log(n) / Math.log(e));
  return `${parseFloat((n / Math.pow(e, l)).toFixed(1))}${i[l]}`;
}, S = (n) => n.split(",").map((e) => e.trim().split("/")[1] || e).join(", "), D = m.forwardRef(
  ({
    label: n,
    files: e,
    onChange: i,
    maxFiles: l = 1,
    maxSize: p = 10 * 1024 * 1024,
    // 10MB
    accept: o = "image/*",
    helperText: h,
    error: f,
    errorMessage: x,
    size: y = "full",
    disabled: c,
    required: z,
    className: B
  }, $) => {
    const g = m.useRef(null), M = () => {
      var t;
      c || (t = g.current) == null || t.click();
    }, j = (t) => {
      const s = Array.from(t.target.files || []);
      if (s.length === 0) return;
      const u = s.filter((d) => d.size <= p);
      if (u.length > 0)
        if (l === 1)
          i([u[0]]);
        else {
          const d = l - e.length, _ = u.slice(0, d);
          i([...e, ..._]);
        }
      t.target.value = "";
    }, w = (t) => {
      const s = e.filter((u, d) => d !== t);
      i(s);
    }, N = m.useMemo(() => {
      if (h) return h;
      const t = [];
      return t.push(`*파일 크기 ${k(p)} 이하`), o && o !== "*" && t.push(`*업로드 가능한 확장자 : ${S(o)}`), t.join(`
`);
    }, [h, p, o]), F = l === 1 || e.length < l, R = l === 1 && e.length > 0 ? e[0].name : "";
    return /* @__PURE__ */ a(
      "div",
      {
        ref: $,
        className: v("flex flex-col gap-2", A[y], B),
        children: [
          n && /* @__PURE__ */ a("label", { className: "flex items-center gap-1 text-xs text-slate-700 dark:text-slate-400", children: [
            z && /* @__PURE__ */ r("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
            n
          ] }),
          /* @__PURE__ */ a(
            "div",
            {
              className: v(
                "flex",
                // 첫 번째 자식: 오른쪽 radius 제거
                "[&>*:first-child]:rounded-r-none",
                "[&>*:first-child_input]:rounded-r-none",
                // 마지막 자식: 왼쪽 radius 제거
                "[&>*:last-child]:rounded-l-none",
                "[&>*:last-child_input]:rounded-l-none",
                // 중간 자식들: 모든 radius 제거
                "[&>*:not(:first-child):not(:last-child)]:rounded-none",
                "[&>*:not(:first-child):not(:last-child)_input]:rounded-none",
                // 마지막 자식 제외: 오른쪽 border 제거
                "[&>*:not(:last-child)]:border-r-0",
                "[&>*:not(:last-child)_input]:border-r-0"
              ),
              children: [
                /* @__PURE__ */ r(
                  b,
                  {
                    value: R,
                    placeholder: "",
                    readOnly: !0,
                    disabled: c,
                    error: f,
                    className: "flex-1",
                    "aria-label": n || "선택된 파일"
                  }
                ),
                /* @__PURE__ */ a(
                  C,
                  {
                    type: "button",
                    variant: "primary",
                    size: "default",
                    onClick: M,
                    disabled: c || !F,
                    children: [
                      /* @__PURE__ */ r(I, { size: 20 }),
                      "파일 선택"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ r(
            "input",
            {
              ref: g,
              type: "file",
              accept: o,
              multiple: l > 1,
              onChange: j,
              className: "hidden",
              disabled: c,
              "aria-label": n || "파일 선택"
            }
          ),
          f && x && /* @__PURE__ */ r("span", { className: "text-xs text-destructive dark:text-red-400", children: x }),
          N && /* @__PURE__ */ r("div", { className: "text-xs text-slate-500 dark:text-slate-400 whitespace-pre-line leading-5", children: N }),
          l > 1 && e.length > 0 && /* @__PURE__ */ r("div", { className: "flex flex-col gap-1", children: e.map((t, s) => /* @__PURE__ */ a(
            "div",
            {
              className: "flex items-center justify-between py-1",
              children: [
                /* @__PURE__ */ a("span", { className: "text-xs text-slate-700 dark:text-slate-300", children: [
                  s + 1,
                  ". ",
                  t.name
                ] }),
                /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ a("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: [
                    "[",
                    k(t.size),
                    "]"
                  ] }),
                  /* @__PURE__ */ r(
                    "button",
                    {
                      type: "button",
                      onClick: () => w(s),
                      disabled: c,
                      className: "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-50",
                      "aria-label": `${t.name} 삭제`,
                      children: /* @__PURE__ */ r(U, { size: 18 })
                    }
                  )
                ] })
              ]
            },
            `${t.name}-${s}`
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
