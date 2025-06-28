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

    it("respects escaped characters within single quotes", () => {
      const results = split("foo 'bar\\ baz'");
      expect(results).toEqual(["foo", "bar baz"]);
    });

    it("respects escaped characters within double quotes", () => {
      const results = split('foo "bar\\ baz"');
      expect(results).toEqual(["foo", "bar baz"]);
    });

    it("respects escaped quotes within quotes", () => {
      let results = split('foo "bar\\" baz"');
      expect(results).toEqual(["foo", 'bar" baz']);

      results = split("foo 'bar\\' baz'");
      expect(results).toEqual(["foo", "bar' baz"]);
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
