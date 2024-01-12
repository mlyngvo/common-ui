module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        '@mlyngvo/eslint-config/react'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react'
    ],
    ignorePatterns: [
        '*.config.js'
    ],
    rules: {
        'import/export': 'off',
    }
}