import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },

  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      // Best practices
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-debugger": "warn",
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: "error",
      curly: "error",

      // Style
      quotes: ["error", "single"],
      semi: ["error", "always"],
      indent: ["error", 2],
    },
  },
];
