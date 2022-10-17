/* global module */

module.exports = {
  "src/**/*": ["prettier --write --ignore-unknown", "eslint", () => "tsc"],
};
