import { jsx as e, jsxs as c } from "react/jsx-runtime";
import * as u from "react";
import { cva as o } from "class-variance-authority";
import { cn as r } from "../../lib/utils.mjs";
const m = o(
  "flex items-center justify-center size-7 rounded-full transition-colors",
  {
    variants: {
      status: {
        completed: "bg-blue-500 text-white",
        active: "bg-blue-500 text-white",
        pending: "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
      }
    },
    defaultVariants: {
      status: "pending"
    }
  }
), f = o(
  "text-base font-semibold tracking-[-0.16px] leading-[1.3] text-center whitespace-nowrap",
  {
    variants: {
      status: {
        completed: "text-gray-900 dark:text-gray-100",
        active: "text-gray-900 dark:text-gray-100",
        pending: "text-gray-400 dark:text-gray-500"
      }
    },
    defaultVariants: {
      status: "pending"
    }
  }
), x = o("h-px flex-1 transition-colors", {
  variants: {
    completed: {
      true: "bg-blue-500",
      false: "bg-gray-200 dark:bg-gray-700"
    }
  },
  defaultVariants: {
    completed: !1
  }
});
function v({ className: t }) {
  return /* @__PURE__ */ e(
    "svg",
    {
      className: r("size-4", t),
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ e(
        "path",
        {
          d: "M3 8L6.5 11.5L13 5",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
}
function h(t, n, s) {
  return s || (t < n ? "completed" : t === n ? "active" : "pending");
}
function b({
  steps: t,
  currentStep: n = 0,
  showCheckOnCompleted: s = !0,
  className: d,
  ...g
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: r("flex items-start w-full", d),
      role: "navigation",
      "aria-label": "Progress",
      ...g,
      children: t.map((i, l) => {
        const a = h(l, n, i.status), p = l === t.length - 1;
        return /* @__PURE__ */ c(u.Fragment, { children: [
          /* @__PURE__ */ c("div", { className: "flex flex-col items-center gap-3.5", children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: r(m({ status: a })),
                "aria-current": a === "active" ? "step" : void 0,
                children: a === "completed" && s ? /* @__PURE__ */ e(v, {}) : i.icon ? i.icon : null
              }
            ),
            /* @__PURE__ */ e("span", { className: r(f({ status: a })), children: i.label })
          ] }),
          !p && /* @__PURE__ */ e("div", { className: "flex-1 flex items-center pt-3.5 px-2", children: /* @__PURE__ */ e(
            "div",
            {
              className: r(
                x({ completed: a === "completed" })
              )
            }
          ) })
        ] }, l);
      })
    }
  );
}
b.displayName = "Stepper";
export {
  b as Stepper,
  m as stepCircleVariants,
  f as stepLabelVariants,
  x as stepLineVariants
};
//# sourceMappingURL=stepper.mjs.map
