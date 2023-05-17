const { default: postcss } = require("postcss");

postcss([require("postcss-flexbugs-fixes")]);

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
