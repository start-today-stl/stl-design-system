import { jsx as o, jsxs as R } from "react/jsx-runtime";
import * as t from "react";
import { cn as h } from "../../lib/utils.mjs";
const S = [
  "flex w-full rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  // 높이는 `rows` prop 이 결정. 기본값은 컴포넌트 레벨에서 rows=3.
  // min-h 는 !important 로 지정 — resize-y 로 유저가 드래그해 min-h 이하로 축소하는
  // 브라우저 동작(일부 브라우저에서 min-h 무시)을 원천 차단.
  // 이전엔 min-h-[80px] 로 강제해 rows 프롭이 무력화되던 문제 있어 조정.
  "!min-h-9 px-3 py-2 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors resize-y",
  "disabled:cursor-not-allowed disabled:opacity-50"
].join(" "), M = [
  "border-slate-200 dark:border-slate-500",
  "placeholder:text-slate-500 dark:placeholder:text-slate-500",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
].join(" "), E = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500"
].join(" "), F = [
  "border-slate-300 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-500",
  "focus:border-slate-500 focus:border-[1.5px] focus:shadow-none dark:focus:border-slate-300"
].join(" "), T = t.forwardRef(
  ({
    className: b,
    label: a,
    error: s,
    errorMessage: d,
    id: z,
    reserveLabelSpace: m,
    required: n,
    tableMode: k,
    rows: y = 3,
    autoGrow: l,
    maxHeight: c,
    value: i,
    defaultValue: x,
    onInput: f,
    ...g
  }, r) => {
    const u = z || t.useId(), _ = t.useRef(null), j = t.useCallback(
      (e) => {
        _.current = e, typeof r == "function" ? r(e) : r && (r.current = e);
      },
      [r]
    ), p = t.useCallback(() => {
      if (!l) return;
      const e = _.current;
      if (!e) return;
      e.style.height = "auto";
      const C = c ? Math.min(e.scrollHeight, c) : e.scrollHeight;
      e.style.height = `${C}px`;
    }, [l, c]);
    t.useLayoutEffect(() => {
      p();
    }, [p, i, x]);
    const v = (e) => {
      l && p(), f == null || f(e);
    }, N = () => s ? E : k ? F : M, w = l ? "!resize-none overflow-y-auto" : "";
    return k && !a && !m && !d ? /* @__PURE__ */ o(
      "textarea",
      {
        id: u,
        ref: j,
        required: n,
        className: h(S, N(), w, b),
        "aria-invalid": s,
        rows: y,
        value: i,
        defaultValue: x,
        onInput: v,
        ...g
      }
    ) : /* @__PURE__ */ R("div", { className: "flex flex-col gap-1 w-full", children: [
      (a || m) && /* @__PURE__ */ R(
        "label",
        {
          htmlFor: u,
          className: h(
            "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400",
            !a && "invisible"
          ),
          children: [
            n && /* @__PURE__ */ o("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
            a || " "
          ]
        }
      ),
      /* @__PURE__ */ o(
        "textarea",
        {
          id: u,
          ref: j,
          required: n,
          className: h(S, N(), w, b),
          "aria-invalid": s,
          rows: y,
          value: i,
          defaultValue: x,
          onInput: v,
          ...g
        }
      ),
      s && d && /* @__PURE__ */ o("span", { className: "text-xs text-destructive dark:text-red-400", children: d })
    ] });
  }
);
T.displayName = "Textarea";
const I = T;
export {
  T as Textarea,
  I as TextareaField
};
//# sourceMappingURL=textarea.mjs.map
