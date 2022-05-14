module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: [],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    'max-len': ['error', 120],
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 4 },
      multiline: { max: 2 },
    }],
    'vue/singleline-html-element-content-newline': ['off', {}],
    'vue/html-self-closing': ['warn', {
      html: {
        normal: 'never',
        void: 'always',
      },
    }],
  },
  overrides: [
    {
      files: ['vite.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['off', {}],
      },
    },
  ],
};
