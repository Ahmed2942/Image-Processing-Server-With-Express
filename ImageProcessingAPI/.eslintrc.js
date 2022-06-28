module.exports = {
    "root": true,
    "plugins": [
      "prettier",
      "@typescript-eslint"
    ],
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    ],
    "rules": {
      quotes: ['error', 'single'],
      'prettier/prettier': 2, // Means error
      'no-console': 1, // Means warning
      'prefer-const': 'error',
      "no-use-before-define": ["error", { "functions": true, "classes": true }],
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 2017,
      "sourceType": "module"
    },
    "env": {
      "node": true,
      "es6": true,
      "commonjs": true,
      "jasmine": true
    }
}
