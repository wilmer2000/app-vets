import * as globals from "globals"
import * as js from "@eslint/js"
import * as tseslint from "typescript-eslint"
import * as pluginReact from "eslint-plugin-react"
import * as pluginReactHooks from "eslint-plugin-react-hooks"
import * as pluginJsxA11y from "eslint-plugin-jsx-a11y"
import * as pluginImport from "eslint-plugin-import"

export default [js.configs.recommended, // base JS rules
  ...tseslint.configs.recommended, {
    files: ["**/*.{js,jsx,ts,tsx}"], languageOptions: {
      ecmaVersion: "latest", sourceType: "module", globals: globals.browser, parser: tseslint.parser, parserOptions: {
        ecmaFeatures: {
          jsx: true, // This enables JSX parsing
        },
      },
    }, plugins: {
      react: pluginReact, "react-hooks": pluginReactHooks, "jsx-a11y": pluginJsxA11y, import: pluginImport,
    }, rules: {
      ...pluginReact.configs.recommended.rules, ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // not needed with React 17+
      "react/prop-types": "off", // disable if using TS
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    }, settings: {
      react: {version: "detect"},
    },
  },]
