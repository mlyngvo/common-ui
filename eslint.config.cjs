const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const mlyngvoReact = require("@mlyngvo/eslint-config/react");

module.exports = defineConfig([
    ...mlyngvoReact,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },

            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {},
        },

        settings: {
            react: {
                version: "detect",
            }
        },

        rules: {
            "import/export": "off",
            "no-restricted-syntax": "off",
            "max-classes-per-file": "off",
        },
    },
    globalIgnores([
        "**/*.config.js",
        "**/*.config.cjs",
        "**/*.config.mjs",
        "**/setupTests.ts",
        "**/esm/**",
        "**/legacy/**",
    ])
]);
