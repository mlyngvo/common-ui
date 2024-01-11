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
        'import/prefer-default-export': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-prototype-builtins': 'off',
    }
}