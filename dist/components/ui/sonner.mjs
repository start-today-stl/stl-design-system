import { jsx as o } from "react/jsx-runtime";
import { useTheme as e } from "../../node_modules/next-themes/dist/index.mjs";
import { Toaster as s } from "../../node_modules/sonner/dist/index.mjs";
import a from "../../node_modules/lucide-react/dist/esm/icons/loader-circle.mjs";
import m from "../../node_modules/lucide-react/dist/esm/icons/octagon-x.mjs";
import p from "../../node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs";
import g from "../../node_modules/lucide-react/dist/esm/icons/info.mjs";
import n from "../../node_modules/lucide-react/dist/esm/icons/circle-check.mjs";
const N = ({ ...r }) => {
  const { theme: t = "system" } = e();
  return /* @__PURE__ */ o(
    s,
    {
      theme: t,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ o(n, { className: "h-4 w-4" }),
        info: /* @__PURE__ */ o(g, { className: "h-4 w-4" }),
        warning: /* @__PURE__ */ o(p, { className: "h-4 w-4" }),
        error: /* @__PURE__ */ o(m, { className: "h-4 w-4" }),
        loading: /* @__PURE__ */ o(a, { className: "h-4 w-4 animate-spin" })
      },
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...r
    }
  );
};
export {
  N as Toaster
};
//# sourceMappingURL=sonner.mjs.map
