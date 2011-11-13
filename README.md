# Shellwords

Shellwords provides a function to manipulate strings according to the word parsing rules of the UNIX Bourne shell.

## Installation

Add "shellwords" to your `package.json` file and run `npm install`.

## Example

``` javascript
var split = require("shellwords").split;

console.log(split("foo 'bar baz'"));
// ["foo", "bar baz"]
```
