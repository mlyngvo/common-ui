const {defineConfig} = require("eslint/config");

module.exports = defineConfig([
    {
        extends: '../eslint.config.cjs',
        rules: {
            'import/no-extraneous-dependencies': 'off',
            '@typescript-eslint/consistent-type-imports': 'off'
        }
    }
]);