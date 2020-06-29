module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'prettier/vue',
  ],
  env: {
    'browser': true,
    'node': true
  },
  rules: {
    // vuexのstateは引数変更を許可変更しないと書きづらい
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['state'],
    }],

    // 登録されたコンポーネントはPascalCaseを強制する
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: true,
    }],

    // 属性値にはハイフン付きの名前を強制する
    'vue/attribute-hyphenation': ['error', 'always'],
  },
  settings: {
    'import/resolver': 'webpack'
  },
};
