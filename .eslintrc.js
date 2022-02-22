module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  plugins: ['vue'],
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
  env: {
    amd: true,
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/no-mutating-props': 'off',
  },
};
