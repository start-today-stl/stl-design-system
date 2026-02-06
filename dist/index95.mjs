import { jsx as o } from "react/jsx-runtime";
import { useTheme as e } from "./index130.mjs";
import { Toaster as s } from "./index131.mjs";
import a from "./index132.mjs";
import m from "./index133.mjs";
import p from "./index134.mjs";
import g from "./index135.mjs";
import n from "./index136.mjs";
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
//# sourceMappingURL=index95.mjs.map
