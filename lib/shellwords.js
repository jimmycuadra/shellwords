(function() {
  var scan, shellsplit;

  scan = function(string, pattern, callback) {
    var match, result;
    result = "";
    while (string.length > 0) {
      match = string.match(pattern);
      if (match) {
        result += string.slice(0, match.index);
        result += callback(match);
        string = string.slice(match.index + match[0].length);
      } else {
        result += string;
        string = "";
      }
    }
    return result;
  };

  shellsplit = function(line) {
    var field, words;
    if (line == null) line = "";
    words = [];
    field = "";
    scan(line, /\s*(?:([^\s\\\'\"]+)|'([^\']*)'|"((?:[^\"\\]|\\.)*)"|(\\.?)|(\S))(\s|$)?/, function(match) {
      var dq, escape, garbage, raw, seperator, sq, word;
      raw = match[0], word = match[1], sq = match[2], dq = match[3], escape = match[4], garbage = match[5], seperator = match[6];
      if (garbage != null) throw new Error("Unmatched quote");
      field += word || (sq || dq || escape).replace(/\\(?=.)/, "");
      if (seperator != null) {
        words.push(field);
        return field = "";
      }
    });
    if (field) words.push(field);
    return words;
  };

  module.exports = {
    shellsplit: shellsplit,
    shellwords: shellsplit,
    split: shellsplit
  };

}).call(this);
