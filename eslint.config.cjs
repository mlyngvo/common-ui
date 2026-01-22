const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const react = require("eslint-plugin-react");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },

            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {},
        },

        extends: compat.extends("@mlyngvo/eslint-config/react"),

        plugins: {
            react,
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
        "**/setupTests.ts",
        "**/esm/**",
        "**/legacy/**",
    ])
]);