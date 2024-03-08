const base = require('../.eslintrc.cjs')

module.exports = {
    ...base,
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/consistent-type-imports': 'off'
    }
}