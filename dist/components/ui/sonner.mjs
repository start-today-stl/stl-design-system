import { jsx as r, jsxs as c, Fragment as l } from "react/jsx-runtime";
import { toast as t, Toaster as n } from "sonner";
import { ToastOIcon as d } from "../../icons/ToastOIcon.mjs";
import { ToastXIcon as u } from "../../icons/ToastXIcon.mjs";
import { Spinner as p } from "./spinner.mjs";
import { cn as x } from "../../lib/utils.mjs";
const w = ({ ...s }) => /* @__PURE__ */ r(
  n,
  {
    className: "toaster group",
    toastOptions: {
      unstyled: !0
    },
    ...s
  }
), a = ({ type: s, title: e, description: m }) => {
  const o = !!m, i = () => {
    switch (s) {
      case "success":
        return /* @__PURE__ */ r(d, { size: 26 });
      case "error":
        return /* @__PURE__ */ r(u, { size: 26 });
      case "loading":
        return /* @__PURE__ */ r(p, { className: "size-[26px]" });
    }
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: x(
        "bg-white border border-slate-200 rounded-xl w-[368px]",
        o ? "flex flex-col items-start p-3 gap-8 mt-1" : "flex flex-row items-center justify-between h-12 py-3 pl-3 pr-4"
      ),
      children: o ? /* @__PURE__ */ c(l, { children: [
        /* @__PURE__ */ r(i, {}),
        /* @__PURE__ */ c("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ r("p", { className: "text-sm font-medium text-slate-900", children: e }),
          /* @__PURE__ */ r("p", { className: "text-[10px] text-slate-600", children: m })
        ] })
      ] }) : /* @__PURE__ */ c(l, { children: [
        /* @__PURE__ */ r(i, {}),
        /* @__PURE__ */ r("p", { className: "text-sm font-medium text-slate-900", children: e })
      ] })
    }
  );
}, b = {
  success: (s, e) => t.custom(() => /* @__PURE__ */ r(a, { type: "success", title: s, description: e == null ? void 0 : e.description })),
  error: (s, e) => t.custom(() => /* @__PURE__ */ r(a, { type: "error", title: s, description: e == null ? void 0 : e.description })),
  loading: (s, e) => t.custom(() => /* @__PURE__ */ r(a, { type: "loading", title: s, description: e == null ? void 0 : e.description })),
  // 기존 sonner 기능 유지
  dismiss: t.dismiss,
  promise: t.promise
};
export {
  w as Toaster,
  b as toast
};
//# sourceMappingURL=sonner.mjs.map
