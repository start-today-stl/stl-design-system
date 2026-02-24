import { jsxs as s, jsx as e } from "react/jsx-runtime";
import * as n from "react";
import * as t from "@radix-ui/react-slider";
import { cn as d } from "../../lib/utils.mjs";
const y = n.forwardRef(({ className: h, showTooltip: m, showLabels: g, label: l, min: i = 0, max: c = 100, value: o, defaultValue: x, readonly: a = !1, showThumb: f = !0, ...r }, v) => {
  const [N, k] = n.useState(x ?? [i]), w = o ?? N, p = n.useId(), _ = (b) => {
    var u;
    o || k(b), (u = r.onValueChange) == null || u.call(r, b);
  };
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 w-full", children: [
    l && /* @__PURE__ */ e(
      "span",
      {
        id: p,
        className: "text-xs text-slate-600 dark:text-slate-50",
        children: l
      }
    ),
    /* @__PURE__ */ s("div", { className: "relative", children: [
      /* @__PURE__ */ s(
        t.Root,
        {
          ref: v,
          min: i,
          max: c,
          value: o,
          defaultValue: x,
          onValueChange: a ? void 0 : _,
          disabled: a,
          className: d(
            "relative flex w-full touch-none select-none items-center",
            a && "pointer-events-none",
            h
          ),
          ...r,
          children: [
            /* @__PURE__ */ e(t.Track, { className: "relative h-1 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-400", children: /* @__PURE__ */ e(t.Range, { className: "absolute h-full bg-gradient-to-r from-blue-300 to-blue-500" }) }),
            f && /* @__PURE__ */ e(
              t.Thumb,
              {
                "aria-labelledby": l ? p : void 0,
                "aria-label": l ? void 0 : "슬라이더",
                className: d(
                  "group relative block rounded-full bg-blue-500 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                  a ? "h-4 w-4" : "h-[22px] w-[22px] border-[3px] border-slate-200 dark:border-slate-400 cursor-grab active:cursor-grabbing"
                ),
                children: m && /* @__PURE__ */ e("div", { className: d(
                  "absolute -top-10 left-1/2 -translate-x-1/2 transition-opacity",
                  a ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-active:opacity-100"
                ), children: /* @__PURE__ */ e("div", { className: "backdrop-blur-[12px] bg-white/50 dark:bg-slate-800/50 border-[0.5px] border-slate-200 dark:border-slate-600 rounded-[5px] px-1.5 py-0.5 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]", children: /* @__PURE__ */ e("span", { className: "text-[8px] text-slate-500 dark:text-slate-300 tracking-[-0.12px]", children: w[0] }) }) })
              }
            )
          ]
        }
      ),
      g && /* @__PURE__ */ s("div", { className: "flex justify-between mt-1", children: [
        /* @__PURE__ */ e("span", { className: "text-[8px] text-slate-500 dark:text-slate-400 tracking-[-0.12px]", children: i }),
        /* @__PURE__ */ e("span", { className: "text-[8px] text-slate-500 dark:text-slate-400 tracking-[-0.12px]", children: c })
      ] })
    ] })
  ] });
});
y.displayName = t.Root.displayName;
export {
  y as Slider
};
//# sourceMappingURL=slider.mjs.map
