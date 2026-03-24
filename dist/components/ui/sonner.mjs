import { jsx as t, jsxs as a, Fragment as d } from "react/jsx-runtime";
import { toast as s, Toaster as i } from "sonner";
import { ToastOIcon as n } from "../../icons/ToastOIcon.mjs";
import { ToastXIcon as u } from "../../icons/ToastXIcon.mjs";
import { Spinner as x } from "./spinner.mjs";
import { cn as p } from "../../lib/utils.mjs";
const y = ({ ...r }) => /* @__PURE__ */ t(
  i,
  {
    className: "toaster group",
    toastOptions: {
      unstyled: !0
    },
    ...r
  }
), c = ({ type: r, title: e, description: l }) => {
  const m = !!l, o = () => {
    switch (r) {
      case "success":
        return /* @__PURE__ */ t(n, { size: 26 });
      case "error":
        return /* @__PURE__ */ t(u, { size: 26 });
      case "loading":
        return /* @__PURE__ */ t(x, { className: "size-[26px]" });
    }
  };
  return /* @__PURE__ */ t(
    "div",
    {
      className: p(
        "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl w-[368px] shadow-lg",
        m ? "flex flex-col items-start p-3 gap-8 mt-1" : "flex flex-row items-center justify-between h-12 py-3 pl-3 pr-4"
      ),
      children: m ? /* @__PURE__ */ a(d, { children: [
        /* @__PURE__ */ t(o, {}),
        /* @__PURE__ */ a("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ t("p", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: e }),
          /* @__PURE__ */ t("p", { className: "text-xs text-slate-600 dark:text-slate-400", children: l })
        ] })
      ] }) : /* @__PURE__ */ a(d, { children: [
        /* @__PURE__ */ t(o, {}),
        /* @__PURE__ */ t("p", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: e })
      ] })
    }
  );
}, T = {
  success: (r, e) => s.custom(() => /* @__PURE__ */ t(c, { type: "success", title: r, description: e == null ? void 0 : e.description })),
  error: (r, e) => s.custom(() => /* @__PURE__ */ t(c, { type: "error", title: r, description: e == null ? void 0 : e.description })),
  loading: (r, e) => s.custom(() => /* @__PURE__ */ t(c, { type: "loading", title: r, description: e == null ? void 0 : e.description })),
  dismiss: s.dismiss
};
export {
  y as Toaster,
  T as toast
};
//# sourceMappingURL=sonner.mjs.map
