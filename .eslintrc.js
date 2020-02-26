module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'semi': process.env.NODE_ENV === 'production' ? ['error', 'never'] : ['warn', 'never']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
