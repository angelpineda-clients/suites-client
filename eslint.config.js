import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-multiple-empty-lines": ["warn", { max: 1, maxBOF: 0, maxEOF: 1 }],
      "padding-line-between-statements": [
        "warn",
        {
          blankLine: "never",
          prev: "import",
          next: "import",
        },
      ],
      "prettier/prettier": "warn",
    },
  }
);
