shellwords = require "shellwords"

describe "Shellwords", ->
  describe "#shellsplit", ->
    it "splits normal words", ->
      results = shellwords.shellsplit "foo bar baz"
      (expect results).toEqual ["foo", "bar", "baz"]

    it "splits single quoted phrases", ->
      results = shellwords.shellsplit "foo 'bar baz'"
      (expect results).toEqual ["foo", "bar baz"]

    it "splits double quoted phrases", ->
      results = shellwords.shellsplit '"foo bar" baz'
      (expect results).toEqual ["foo bar", "baz"]

    it "respects escaped characters", ->
      results = shellwords.shellsplit "foo\\ bar baz"
      (expect results).toEqual ["foo bar", "baz"]

    it "throws when quotes are mismatched", ->
      fn = ->
        shellwords.shellsplit "foo 'bar baz"

      (expect fn).toThrow()
