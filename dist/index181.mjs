/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e = (t) => {
  for (const r in t)
    if (r.startsWith("aria-") || r === "role" || r === "title")
      return !0;
  return !1;
};
export {
  e as hasA11yProp
};
//# sourceMappingURL=index181.mjs.map
