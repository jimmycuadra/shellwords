interpret = (value) ->
  if value? then '' else String value

gsub = (string, pattern, replacement) ->
  result = ''
  source = string
  match = null

  while source.length > 0
    if match = source.match pattern
      result += source.slice 0, match.index
      result += interpret replacement match
      source  = source.slice(match.index + match[0].length)
    else
      result += source
      source = ''

  result

scan = (string, pattern, iterator) ->
  string = gsub string, pattern, iterator
  String string

shellsplit = (line = "") ->
  words = []
  field = ""
  scan line, ///
    \s*                     # Leading whitespace
    (?:                       #
      ([^\s\\\'\"]+)          # Normal words
      |                       #
      '([^\']*)'              # Stuff in single quotes
      |                       #
      "((?:[^\"\\]|\\.)*)"    # Stuff in double quotes
      |                       #
      (\\.?)                  # Escaped character
      |                       #
      (\S)                    # Garbage
    )                         #
    (\s|$)?                 # Seperator
  ///, (match) ->
    [raw, word, sq, dq, esc, garbage, sep] = match

    throw new Error "garbage found" if garbage?

    field += (word or sq or gsub(dq or esc, /\\(?=.)/, ""))

    if sep?
      words.push field
      field = ""

  words.push field if field

  words

module.exports =
  shellsplit: shellsplit
  shellwords: shellsplit
  split: shellsplit
