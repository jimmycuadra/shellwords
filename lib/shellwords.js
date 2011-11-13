(function() {
  var gsub, interpret, scan, shellsplit;

  interpret = function(value) {
    if (value != null) {
      return '';
    } else {
      return String(value);
    }
  };

  gsub = function(string, pattern, replacement) {
    var match, result, source;
    result = '';
    source = string;
    match = null;
    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += interpret(replacement(match));
        source = source.slice(match.index + match[0].length);
      } else {
        result += source;
        source = '';
      }
    }
    return result;
  };

  scan = function(string, pattern, iterator) {
    string = gsub(string, pattern, iterator);
    return String(string);
  };

  shellsplit = function(line) {
    var field, words;
    if (line == null) line = "";
    words = [];
    field = "";
    scan(line, /\s*(?:([^\s\\\'\"]+)|'([^\']*)'|"((?:[^\"\\]|\\.)*)"|(\\.?)|(\S))(\s|$)?/, function(match) {
      var dq, esc, garbage, raw, sep, sq, word;
      raw = match[0], word = match[1], sq = match[2], dq = match[3], esc = match[4], garbage = match[5], sep = match[6];
      if (garbage != null) throw new Error("garbage found");
      field += word || sq || gsub(dq || esc, /\\(?=.)/, "");
      if (sep != null) {
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
