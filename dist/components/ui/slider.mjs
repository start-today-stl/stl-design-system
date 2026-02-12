import { jsxs as r, jsx as e } from "react/jsx-runtime";
import * as i from "react";
import * as a from "@radix-ui/react-slider";
import { cn as k } from "../../lib/utils.mjs";
const y = i.forwardRef(({ className: b, showTooltip: u, showLabels: h, label: t, min: s = 0, max: n = 100, value: o, defaultValue: d, ...l }, g) => {
  const [m, f] = i.useState(d ?? [s]), v = o ?? m, c = i.useId(), N = (x) => {
    var p;
    o || f(x), (p = l.onValueChange) == null || p.call(l, x);
  };
  return /* @__PURE__ */ r("div", { className: "flex flex-col gap-1.5 w-full", children: [
    t && /* @__PURE__ */ e(
      "span",
      {
        id: c,
        className: "text-[length:var(--text-body-2)] text-slate-600 dark:text-slate-50",
        children: t
      }
    ),
    /* @__PURE__ */ r("div", { className: "relative", children: [
      /* @__PURE__ */ r(
        a.Root,
        {
          ref: g,
          min: s,
          max: n,
          value: o,
          defaultValue: d,
          onValueChange: N,
          className: k(
            "relative flex w-full touch-none select-none items-center",
            b
          ),
          ...l,
          children: [
            /* @__PURE__ */ e(a.Track, { className: "relative h-1 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-400", children: /* @__PURE__ */ e(a.Range, { className: "absolute h-full bg-gradient-to-r from-blue-300 to-blue-500" }) }),
            /* @__PURE__ */ e(
              a.Thumb,
              {
                "aria-labelledby": t ? c : void 0,
                "aria-label": t ? void 0 : "슬라이더",
                className: "group relative block h-[22px] w-[22px] rounded-full bg-blue-500 border-[3px] border-slate-200 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing dark:border-slate-400",
                children: u && /* @__PURE__ */ e("div", { className: "absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity", children: /* @__PURE__ */ e("div", { className: "backdrop-blur-[12px] bg-white/50 dark:bg-slate-800/50 border-[0.5px] border-slate-200 dark:border-slate-600 rounded-[5px] px-1.5 py-0.5 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]", children: /* @__PURE__ */ e("span", { className: "text-[8px] text-slate-500 dark:text-slate-300 tracking-[-0.12px]", children: v[0] }) }) })
              }
            )
          ]
        }
      ),
      h && /* @__PURE__ */ r("div", { className: "flex justify-between mt-1", children: [
        /* @__PURE__ */ e("span", { className: "text-[8px] text-slate-500 dark:text-slate-400 tracking-[-0.12px]", children: s }),
        /* @__PURE__ */ e("span", { className: "text-[8px] text-slate-500 dark:text-slate-400 tracking-[-0.12px]", children: n })
      ] })
    ] })
  ] });
});
y.displayName = a.Root.displayName;
export {
  y as Slider
};
//# sourceMappingURL=slider.mjs.map
