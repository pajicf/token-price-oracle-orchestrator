module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "object-curly-spacing": ["warn", "always"],
        "semi": "warn",
        "quotes": ["warn", "double"]
    }
};