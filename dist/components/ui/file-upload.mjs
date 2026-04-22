import { jsxs as a, jsx as l } from "react/jsx-runtime";
import * as m from "react";
import { cn as f } from "../../lib/utils.mjs";
import { Input as C, inputSizeStyles as F } from "./input.mjs";
import { Button as I } from "./button.mjs";
import { UploadIcon as U } from "../../icons/UploadIcon.mjs";
import { XIcon as y } from "../../icons/XIcon.mjs";
const z = (r) => {
  if (r === 0) return "0 B";
  const t = 1024, o = ["B", "KB", "MB", "GB"], n = Math.floor(Math.log(r) / Math.log(t));
  return `${parseFloat((r / Math.pow(t, n)).toFixed(1))}${o[n]}`;
}, S = (r) => r.split(",").map((t) => t.trim().split("/")[1] || t).join(", "), D = m.forwardRef(
  ({
    label: r,
    files: t,
    onChange: o,
    maxFiles: n = 1,
    maxSize: h = 10 * 1024 * 1024,
    // 10MB
    accept: c = "image/*",
    helperText: p,
    error: x,
    errorMessage: g,
    size: b = "full",
    disabled: i,
    required: B,
    className: $
  }, w) => {
    const v = m.useRef(null), M = () => {
      var e;
      i || (e = v.current) == null || e.click();
    }, j = (e) => {
      const s = Array.from(e.target.files || []);
      if (s.length === 0) return;
      const u = s.filter((d) => d.size <= h);
      if (u.length > 0)
        if (n === 1)
          o([u[0]]);
        else {
          const d = n - t.length, A = u.slice(0, d);
          o([...t, ...A]);
        }
      e.target.value = "";
    }, N = (e) => {
      const s = t.filter((u, d) => d !== e);
      o(s);
    }, k = m.useMemo(() => {
      if (p) return p;
      const e = [];
      return e.push(`*파일 크기 ${z(h)} 이하`), c && c !== "*" && e.push(`*업로드 가능한 확장자 : ${S(c)}`), e.join(`
`);
    }, [p, h, c]), R = n === 1 || t.length < n, _ = n === 1 && t.length > 0 ? t[0].name : "";
    return /* @__PURE__ */ a(
      "div",
      {
        ref: w,
        className: f("flex flex-col gap-2", F[b], $),
        children: [
          r && /* @__PURE__ */ a("label", { className: "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400", children: [
            B && /* @__PURE__ */ l("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
            r
          ] }),
          /* @__PURE__ */ a(
            "div",
            {
              className: f(
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
                /* @__PURE__ */ a("div", { className: "relative flex-1", children: [
                  /* @__PURE__ */ l(
                    C,
                    {
                      value: _,
                      placeholder: "",
                      readOnly: !0,
                      disabled: i,
                      error: x,
                      className: f("w-full", n === 1 && t.length > 0 && "pr-8"),
                      "aria-label": r || "선택된 파일"
                    }
                  ),
                  n === 1 && t.length > 0 && !i && /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      onClick: () => N(0),
                      className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200",
                      "aria-label": "파일 삭제",
                      children: /* @__PURE__ */ l(y, { size: 18 })
                    }
                  )
                ] }),
                /* @__PURE__ */ a(
                  I,
                  {
                    type: "button",
                    variant: "primary",
                    size: "default",
                    onClick: M,
                    disabled: i || !R,
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
              ref: v,
              type: "file",
              accept: c,
              multiple: n > 1,
              onChange: j,
              className: "hidden",
              disabled: i,
              "aria-label": r || "파일 선택"
            }
          ),
          x && g && /* @__PURE__ */ l("span", { className: "text-xs text-destructive dark:text-red-400", children: g }),
          k && /* @__PURE__ */ l("div", { className: "text-xs text-slate-600 dark:text-slate-400 whitespace-pre-line leading-5", children: k }),
          n > 1 && t.length > 0 && /* @__PURE__ */ l("div", { className: "flex flex-col gap-1", children: t.map((e, s) => /* @__PURE__ */ a(
            "div",
            {
              className: "flex items-center justify-between py-1",
              children: [
                /* @__PURE__ */ a("span", { className: "text-xs text-slate-800 dark:text-slate-300", children: [
                  s + 1,
                  ". ",
                  e.name
                ] }),
                /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ a("span", { className: "text-xs text-slate-600 dark:text-slate-400", children: [
                    "[",
                    z(e.size),
                    "]"
                  ] }),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      onClick: () => N(s),
                      disabled: i,
                      className: "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-50",
                      "aria-label": `${e.name} 삭제`,
                      children: /* @__PURE__ */ l(y, { size: 18 })
                    }
                  )
                ] })
              ]
            },
            `${e.name}-${s}`
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
