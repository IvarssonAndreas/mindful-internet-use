module.exports = {
  'src/*.+(js|ts|tsx|jsx)': ['eslint --max-warnings 28'],
  'src/**/*.(js|ts|tsx|jsx)': ['prettier --write'],
}
