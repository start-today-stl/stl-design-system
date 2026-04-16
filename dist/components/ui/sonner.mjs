import { jsx as r, jsxs as a, Fragment as d } from "react/jsx-runtime";
import { toast as t, Toaster as i } from "sonner";
import { ToastOIcon as n } from "../../icons/ToastOIcon.mjs";
import { ToastXIcon as x } from "../../icons/ToastXIcon.mjs";
import { Spinner as u } from "./spinner.mjs";
import { cn as p } from "../../lib/utils.mjs";
const b = ({ ...s }) => /* @__PURE__ */ r(
  i,
  {
    className: "toaster group",
    toastOptions: {
      unstyled: !0
    },
    ...s
  }
), c = ({ type: s, title: e, description: l }) => {
  const m = !!l, o = () => {
    switch (s) {
      case "success":
        return /* @__PURE__ */ r(n, { size: 26 });
      case "error":
        return /* @__PURE__ */ r(x, { size: 26 });
      case "loading":
        return /* @__PURE__ */ r(u, { className: "size-[26px]" });
    }
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: p(
        "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl w-[368px] shadow-lg",
        m ? "flex flex-col items-start p-3 gap-8 mt-1" : "flex flex-row items-center gap-3 min-h-12 py-3 pl-3 pr-4"
      ),
      children: m ? /* @__PURE__ */ a(d, { children: [
        /* @__PURE__ */ r(o, {}),
        /* @__PURE__ */ a("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ r("p", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: e }),
          /* @__PURE__ */ r("p", { className: "text-xs text-slate-600 dark:text-slate-400", children: l })
        ] })
      ] }) : /* @__PURE__ */ a(d, { children: [
        /* @__PURE__ */ r("span", { className: "shrink-0", children: /* @__PURE__ */ r(o, {}) }),
        /* @__PURE__ */ r("p", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: e })
      ] })
    }
  );
}, w = {
  success: (s, e) => t.custom(() => /* @__PURE__ */ r(c, { type: "success", title: s, description: e == null ? void 0 : e.description })),
  error: (s, e) => t.custom(() => /* @__PURE__ */ r(c, { type: "error", title: s, description: e == null ? void 0 : e.description })),
  loading: (s, e) => t.custom(() => /* @__PURE__ */ r(c, { type: "loading", title: s, description: e == null ? void 0 : e.description })),
  dismiss: t.dismiss
};
export {
  b as Toaster,
  w as toast
};
//# sourceMappingURL=sonner.mjs.map
