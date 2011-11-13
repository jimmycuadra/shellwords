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

    it "respects escaped characters within single quotes", ->
      results = shellwords.shellsplit "foo 'bar\\ baz'"
      (expect results).toEqual ["foo", "bar baz"]

    it "respects escaped characters within double quotes", ->
      results = shellwords.shellsplit 'foo "bar\\ baz"'
      (expect results).toEqual ["foo", "bar baz"]

    it "throws on unmatched single quotes", ->
      fn = ->
        shellwords.shellsplit "foo 'bar baz"

      (expect fn).toThrow()

    it "throws on unmatched double quotes", ->
      fn = ->
        shellwords.shellsplit 'foo "bar baz'

      (expect fn).toThrow()
