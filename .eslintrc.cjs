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
        '*.config.js',
        'setupTests.ts',
    ],
    rules: {
        'import/export': 'off',
        'no-restricted-syntax': 'off',
        'max-classes-per-file': 'off',
    }
}