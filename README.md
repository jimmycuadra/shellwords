# Shellwords

Shellwords provides functions to manipulate strings according to the word parsing rules of the UNIX Bourne shell. It is based on [the Ruby module of the same name](https://docs.ruby-lang.org/en/3.1/Shellwords.html).

## Installation

With npm:

```
npm install shellwords
```

With Yarn:

```
yarn add shellwords
```

## API

Shellwords exports the following functions, shown here in the TypeScript declaration file format.

``` typescript
/**
 * Splits a string into an array of tokens in the same way the UNIX Bourne shell does.
 *
 * @param line A string to split.
 * @returns An array of the split tokens.
 */
export declare const split: (line?: string) => string[];

/**
 * Escapes a string so that it can be safely used in a Bourne shell command line.
 *
 * @param str A string to escape.
 * @returns The escaped string.
 */
export declare const escape: (str?: string) => string;
```

## Example

``` typescript
import { escape, split } from "shellwords";

split("foo 'bar baz'");
// ["foo", "bar baz"]

escape("What's up, yo?");
// 'What\\\'s\\ up,\\ yo\\?'
```

## Legal

shellwords is released under the MIT license. See `LICENSE`.
