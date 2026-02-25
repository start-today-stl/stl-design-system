import { jsxs as r, jsx as s } from "react/jsx-runtime";
import * as h from "react";
import { cn as v } from "../../lib/utils.mjs";
import { Input as C, inputSizeStyles as I } from "./input.mjs";
import { Button as U } from "./button.mjs";
import { UploadIcon as b } from "../../icons/UploadIcon.mjs";
import { XIcon as S } from "../../icons/XIcon.mjs";
const k = (n) => {
  if (n === 0) return "0 B";
  const t = 1024, i = ["B", "KB", "MB", "GB"], l = Math.floor(Math.log(n) / Math.log(t));
  return `${parseFloat((n / Math.pow(t, l)).toFixed(1))}${i[l]}`;
}, D = (n) => n.split(",").map((t) => t.trim().split("/")[1] || t).join(", "), E = h.forwardRef(
  ({
    label: n,
    files: t,
    onChange: i,
    maxFiles: l = 1,
    maxSize: p = 10 * 1024 * 1024,
    // 10MB
    accept: o = "image/*",
    helperText: u,
    error: f,
    errorMessage: x,
    size: y = "full",
    disabled: c,
    required: z,
    className: B
  }, $) => {
    const g = h.useRef(null), M = () => {
      var e;
      c || (e = g.current) == null || e.click();
    }, j = (e) => {
      const a = Array.from(e.target.files || []);
      if (a.length === 0) return;
      const m = a.filter((d) => d.size <= p);
      if (m.length > 0)
        if (l === 1)
          i([m[0]]);
        else {
          const d = l - t.length, A = m.slice(0, d);
          i([...t, ...A]);
        }
      e.target.value = "";
    }, w = (e) => {
      const a = t.filter((m, d) => d !== e);
      i(a);
    }, N = h.useMemo(() => {
      if (u) return u;
      const e = [];
      return e.push(`*파일 크기 ${k(p)} 이하`), o && o !== "*" && e.push(`*업로드 가능한 확장자 : ${D(o)}`), e.join(`
`);
    }, [u, p, o]), F = l === 1 || t.length < l, R = l === 1 && t.length > 0 ? t[0].name : "";
    return /* @__PURE__ */ r(
      "div",
      {
        ref: $,
        className: v("flex flex-col gap-2", I[y], B),
        children: [
          n && /* @__PURE__ */ r("label", { className: "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50", children: [
            z && /* @__PURE__ */ s("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
            n
          ] }),
          /* @__PURE__ */ r(
            "div",
            {
              className: v(
                "flex",
                "[&>*:first-child]:rounded-r-none",
                "[&>*:last-child]:rounded-l-none",
                "[&>*:not(:first-child):not(:last-child)]:rounded-none",
                "[&>*:not(:last-child)]:border-r-0"
              ),
              children: [
                /* @__PURE__ */ s(
                  C,
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
                /* @__PURE__ */ r(
                  U,
                  {
                    variant: "primary",
                    size: "default",
                    onClick: M,
                    disabled: c || !F,
                    children: [
                      /* @__PURE__ */ s(b, { size: 20 }),
                      "파일 선택"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s(
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
          f && x && /* @__PURE__ */ s("span", { className: "text-xs text-destructive dark:text-red-400", children: x }),
          N && /* @__PURE__ */ s("div", { className: "text-xs text-slate-500 dark:text-slate-400 whitespace-pre-line leading-5", children: N }),
          l > 1 && t.length > 0 && /* @__PURE__ */ s("div", { className: "flex flex-col gap-1", children: t.map((e, a) => /* @__PURE__ */ r(
            "div",
            {
              className: "flex items-center justify-between py-1",
              children: [
                /* @__PURE__ */ r("span", { className: "text-xs text-slate-700 dark:text-slate-300", children: [
                  a + 1,
                  ". ",
                  e.name
                ] }),
                /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ r("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: [
                    "[",
                    k(e.size),
                    "]"
                  ] }),
                  /* @__PURE__ */ s(
                    "button",
                    {
                      type: "button",
                      onClick: () => w(a),
                      disabled: c,
                      className: "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-50",
                      "aria-label": `${e.name} 삭제`,
                      children: /* @__PURE__ */ s(S, { size: 18 })
                    }
                  )
                ] })
              ]
            },
            `${e.name}-${a}`
          )) })
        ]
      }
    );
  }
);
E.displayName = "FileUpload";
export {
  E as FileUpload
};
//# sourceMappingURL=file-upload.mjs.map
