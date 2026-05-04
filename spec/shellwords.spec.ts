import { escape, join, split } from "../src/shellwords";

describe("Shellwords", () => {
  describe("#split", () => {
    it("splits normal words", () => {
      const results = split("foo bar baz");
      expect(results).toEqual(["foo", "bar", "baz"]);
    });

    it("splits single quoted phrases", () => {
      const results = split("foo 'bar baz'");
      expect(results).toEqual(["foo", "bar baz"]);
    });

    it("splits double quoted phrases", () => {
      const results = split('"foo bar" baz');
      expect(results).toEqual(["foo bar", "baz"]);
    });

    it("respects escaped characters", () => {
      const results = split("foo\\ bar baz");
      expect(results).toEqual(["foo bar", "baz"]);
    });

    it("preserves backslashes within single quotes (POSIX: single quotes are fully literal)", () => {
      const results = split("foo 'bar\\ baz'");
      expect(results).toEqual(["foo", "bar\\ baz"]);
    });

    it("preserves multiple backslashes within single quotes", () => {
      // actual string passed to split: 'a\\b'  (single-quoted, two backslashes)
      const results = split("'a\\\\b'");
      expect(results).toEqual(["a\\\\b"]);
    });

    it("preserves escaped double-quotes inside single quotes", () => {
      // the original bug: only the first \" was unescaped, leaving later ones intact
      const results = split(`'{"key":"\\"value\\""}'`);
      expect(results).toEqual(['{"key":"\\"value\\""}']);
    });

    it("handles empty single-quoted string", () => {
      const results = split("foo '' bar");
      expect(results).toEqual(["foo", "", "bar"]);
    });

    it("respects escaped characters within double quotes", () => {
      const results = split('foo "bar\\ baz"');
      expect(results).toEqual(["foo", "bar baz"]);
    });

    it("respects escaped quotes within double quotes", () => {
      const results = split('foo "bar\\" baz"');
      expect(results).toEqual(["foo", 'bar" baz']);
    });

    it("throws when single-quoted string contains apparent escaped quote (POSIX: no escapes in single quotes)", () => {
      const fn = () => split("foo 'bar\\' baz'");
      expect(fn).toThrow();
    });

    it("throws on unmatched single quotes", () => {
      const fn = () => split("foo 'bar baz");

      expect(fn).toThrow();
    });

    it("throws on unmatched double quotes", () => {
      const fn = () => split('foo "bar baz');

      expect(fn).toThrow();
    });
  });

  describe("#join", () => {
    it("escapes and joins each array element into a space-separated string", () => {
      const results = join(["foo", "'\"'", "bar"]);
      expect(results).toEqual("foo \\'\\\"\\' bar");
    });
  });

  describe("#escape", () => {
    it("escapes a string to be safe for shell command line", () => {
      const results = escape("foo '\"' bar");
      expect(results).toEqual("foo\\ \\'\\\"\\'\\ bar");
    });

    it("dummy escapes any multibyte chars", () => {
      const results = escape("あい");
      expect(results).toEqual("\\あ\\い");
    });
  });
});
