import { TZDate as f } from "./index261.mjs";
import "./index263.mjs";
import { endOfBroadcastWeek as d } from "./index268.mjs";
import { startOfBroadcastWeek as m } from "./index269.mjs";
import { enUS as v } from "./index231.mjs";
import { addDays as p } from "./index270.mjs";
import { addMonths as O } from "./index271.mjs";
import { addWeeks as u } from "./index272.mjs";
import { addYears as c } from "./index273.mjs";
import { differenceInCalendarDays as l } from "./index274.mjs";
import { differenceInCalendarMonths as M } from "./index275.mjs";
import { eachMonthOfInterval as k } from "./index276.mjs";
import { eachYearOfInterval as W } from "./index277.mjs";
import { endOfISOWeek as D } from "./index278.mjs";
import { endOfMonth as Y } from "./index279.mjs";
import { endOfWeek as S } from "./index280.mjs";
import { endOfYear as y } from "./index281.mjs";
import { getISOWeek as g } from "./index282.mjs";
import { getMonth as I } from "./index283.mjs";
import { getYear as w } from "./index284.mjs";
import { getWeek as B } from "./index285.mjs";
import { isAfter as L } from "./index286.mjs";
import { isBefore as C } from "./index287.mjs";
import { isDate as z } from "./index288.mjs";
import { isSameDay as Z } from "./index289.mjs";
import { isSameMonth as b } from "./index290.mjs";
import { isSameYear as A } from "./index291.mjs";
import { max as F } from "./index292.mjs";
import { min as N } from "./index293.mjs";
import { setMonth as _ } from "./index294.mjs";
import { setYear as j } from "./index295.mjs";
import { startOfDay as x } from "./index296.mjs";
import { startOfISOWeek as H } from "./index297.mjs";
import { startOfMonth as K } from "./index298.mjs";
import { startOfWeek as T } from "./index299.mjs";
import { startOfYear as U } from "./index300.mjs";
import { format as q } from "./index301.mjs";
class h {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(s, i) {
    this.Date = Date, this.today = () => {
      var r;
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? f.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, e, t) => {
      var o;
      return (o = this.overrides) != null && o.newDate ? this.overrides.newDate(r, e, t) : this.options.timeZone ? new f(r, e, t, this.options.timeZone) : new Date(r, e, t);
    }, this.addDays = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.addDays ? this.overrides.addDays(r, e) : p(r, e);
    }, this.addMonths = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.addMonths ? this.overrides.addMonths(r, e) : O(r, e);
    }, this.addWeeks = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.addWeeks ? this.overrides.addWeeks(r, e) : u(r, e);
    }, this.addYears = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.addYears ? this.overrides.addYears(r, e) : c(r, e);
    }, this.differenceInCalendarDays = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, e) : l(r, e);
    }, this.differenceInCalendarMonths = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, e) : M(r, e);
    }, this.eachMonthOfInterval = (r) => {
      var e;
      return (e = this.overrides) != null && e.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : k(r);
    }, this.eachYearOfInterval = (r) => {
      var n;
      const e = (n = this.overrides) != null && n.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : W(r), t = new Set(e.map((a) => this.getYear(a)));
      if (t.size === e.length)
        return e;
      const o = [];
      return t.forEach((a) => {
        o.push(new Date(a, 0, 1));
      }), o;
    }, this.endOfBroadcastWeek = (r) => {
      var e;
      return (e = this.overrides) != null && e.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : d(r, this);
    }, this.endOfISOWeek = (r) => {
      var e;
      return (e = this.overrides) != null && e.endOfISOWeek ? this.overrides.endOfISOWeek(r) : D(r);
    }, this.endOfMonth = (r) => {
      var e;
      return (e = this.overrides) != null && e.endOfMonth ? this.overrides.endOfMonth(r) : Y(r);
    }, this.endOfWeek = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.endOfWeek ? this.overrides.endOfWeek(r, e) : S(r, this.options);
    }, this.endOfYear = (r) => {
      var e;
      return (e = this.overrides) != null && e.endOfYear ? this.overrides.endOfYear(r) : y(r);
    }, this.format = (r, e, t) => {
      var n;
      const o = (n = this.overrides) != null && n.format ? this.overrides.format(r, e, this.options) : q(r, e, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(o) : o;
    }, this.getISOWeek = (r) => {
      var e;
      return (e = this.overrides) != null && e.getISOWeek ? this.overrides.getISOWeek(r) : g(r);
    }, this.getMonth = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.getMonth ? this.overrides.getMonth(r, this.options) : I(r, this.options);
    }, this.getYear = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.getYear ? this.overrides.getYear(r, this.options) : w(r, this.options);
    }, this.getWeek = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.getWeek ? this.overrides.getWeek(r, this.options) : B(r, this.options);
    }, this.isAfter = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.isAfter ? this.overrides.isAfter(r, e) : L(r, e);
    }, this.isBefore = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.isBefore ? this.overrides.isBefore(r, e) : C(r, e);
    }, this.isDate = (r) => {
      var e;
      return (e = this.overrides) != null && e.isDate ? this.overrides.isDate(r) : z(r);
    }, this.isSameDay = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.isSameDay ? this.overrides.isSameDay(r, e) : Z(r, e);
    }, this.isSameMonth = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.isSameMonth ? this.overrides.isSameMonth(r, e) : b(r, e);
    }, this.isSameYear = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.isSameYear ? this.overrides.isSameYear(r, e) : A(r, e);
    }, this.max = (r) => {
      var e;
      return (e = this.overrides) != null && e.max ? this.overrides.max(r) : F(r);
    }, this.min = (r) => {
      var e;
      return (e = this.overrides) != null && e.min ? this.overrides.min(r) : N(r);
    }, this.setMonth = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.setMonth ? this.overrides.setMonth(r, e) : _(r, e);
    }, this.setYear = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.setYear ? this.overrides.setYear(r, e) : j(r, e);
    }, this.startOfBroadcastWeek = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : m(r, this);
    }, this.startOfDay = (r) => {
      var e;
      return (e = this.overrides) != null && e.startOfDay ? this.overrides.startOfDay(r) : x(r);
    }, this.startOfISOWeek = (r) => {
      var e;
      return (e = this.overrides) != null && e.startOfISOWeek ? this.overrides.startOfISOWeek(r) : H(r);
    }, this.startOfMonth = (r) => {
      var e;
      return (e = this.overrides) != null && e.startOfMonth ? this.overrides.startOfMonth(r) : K(r);
    }, this.startOfWeek = (r, e) => {
      var t;
      return (t = this.overrides) != null && t.startOfWeek ? this.overrides.startOfWeek(r, this.options) : T(r, this.options);
    }, this.startOfYear = (r) => {
      var e;
      return (e = this.overrides) != null && e.startOfYear ? this.overrides.startOfYear(r) : U(r);
    }, this.options = { locale: v, ...s }, this.overrides = i;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals: s = "latn" } = this.options, i = new Intl.NumberFormat("en-US", {
      numberingSystem: s
    }), r = {};
    for (let e = 0; e < 10; e++)
      r[e.toString()] = i.format(e);
    return r;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(s) {
    const i = this.getDigitMap();
    return s.replace(/\d/g, (r) => i[r] || r);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(s) {
    return this.replaceDigits(s.toString());
  }
  /**
   * Returns the preferred ordering for month and year labels for the current
   * locale.
   */
  getMonthYearOrder() {
    var i;
    const s = (i = this.options.locale) == null ? void 0 : i.code;
    return s && h.yearFirstLocales.has(s) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(s) {
    const { locale: i, timeZone: r, numerals: e } = this.options, t = i == null ? void 0 : i.code;
    if (t && h.yearFirstLocales.has(t))
      try {
        return new Intl.DateTimeFormat(t, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: e
        }).format(s);
      } catch {
      }
    const o = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(s, o);
  }
}
h.yearFirstLocales = /* @__PURE__ */ new Set([
  "eu",
  "hu",
  "ja",
  "ja-Hira",
  "ja-JP",
  "ko",
  "ko-KR",
  "lt",
  "lt-LT",
  "lv",
  "lv-LV",
  "mn",
  "mn-MN",
  "zh",
  "zh-CN",
  "zh-HK",
  "zh-TW"
]);
const Br = new h();
export {
  h as DateLib,
  Br as defaultDateLib,
  v as defaultLocale
};
//# sourceMappingURL=index209.mjs.map
