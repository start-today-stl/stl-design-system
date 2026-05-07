import { jsx as r, jsxs as c, Fragment as l } from "react/jsx-runtime";
import { toast as t, Toaster as d } from "sonner";
import { ToastOIcon as o } from "../../icons/ToastOIcon.mjs";
import { ToastWarningIcon as u } from "../../icons/ToastWarningIcon.mjs";
import { ToastXIcon as x } from "../../icons/ToastXIcon.mjs";
import { Spinner as p } from "./spinner.mjs";
import { cn as g } from "../../lib/utils.mjs";
const b = ({ ...s }) => /* @__PURE__ */ r(
  d,
  {
    className: "toaster group",
    toastOptions: {
      unstyled: !0
    },
    ...s
  }
), a = ({ type: s, title: e, description: n }) => {
  const i = !!n, m = () => {
    switch (s) {
      case "success":
        return /* @__PURE__ */ r(o, { size: 26 });
      case "error":
        return /* @__PURE__ */ r(x, { size: 26 });
      case "warning":
        return /* @__PURE__ */ r(u, { size: 26 });
      case "loading":
        return /* @__PURE__ */ r(p, { className: "size-[26px]" });
    }
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: g(
        "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl w-[368px] shadow-lg",
        i ? "flex flex-col items-start p-3 gap-8 mt-1" : "flex flex-row items-center gap-3 min-h-12 py-3 pl-3 pr-4"
      ),
      children: i ? /* @__PURE__ */ c(l, { children: [
        /* @__PURE__ */ r(m, {}),
        /* @__PURE__ */ c("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ r("p", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: e }),
          /* @__PURE__ */ r("p", { className: "text-xs text-slate-600 dark:text-slate-400", children: n })
        ] })
      ] }) : /* @__PURE__ */ c(l, { children: [
        /* @__PURE__ */ r("span", { className: "shrink-0", children: /* @__PURE__ */ r(m, {}) }),
        /* @__PURE__ */ r("p", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: e })
      ] })
    }
  );
}, z = {
  success: (s, e) => t.custom(() => /* @__PURE__ */ r(a, { type: "success", title: s, description: e == null ? void 0 : e.description })),
  error: (s, e) => t.custom(() => /* @__PURE__ */ r(a, { type: "error", title: s, description: e == null ? void 0 : e.description })),
  warning: (s, e) => t.custom(() => /* @__PURE__ */ r(a, { type: "warning", title: s, description: e == null ? void 0 : e.description })),
  loading: (s, e) => t.custom(() => /* @__PURE__ */ r(a, { type: "loading", title: s, description: e == null ? void 0 : e.description })),
  dismiss: t.dismiss
};
export {
  b as Toaster,
  z as toast
};
//# sourceMappingURL=sonner.mjs.map
