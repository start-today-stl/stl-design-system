import { jsx as o } from "react/jsx-runtime";
import { LoaderCircle as e, OctagonX as s, TriangleAlert as a, Info as g, CircleCheck as m } from "lucide-react";
import { useTheme as n } from "next-themes";
import { Toaster as u } from "sonner";
const l = ({ ...t }) => {
  const { theme: r = "system" } = n();
  return /* @__PURE__ */ o(
    u,
    {
      theme: r,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ o(m, { className: "h-4 w-4" }),
        info: /* @__PURE__ */ o(g, { className: "h-4 w-4" }),
        warning: /* @__PURE__ */ o(a, { className: "h-4 w-4" }),
        error: /* @__PURE__ */ o(s, { className: "h-4 w-4" }),
        loading: /* @__PURE__ */ o(e, { className: "h-4 w-4 animate-spin" })
      },
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...t
    }
  );
};
export {
  l as Toaster
};
//# sourceMappingURL=sonner.mjs.map
