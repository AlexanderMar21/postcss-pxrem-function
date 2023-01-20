/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = { }) => {
  // Work with options here

  const DEFAULT_DIVIDER = 16;

  const validateDivider = (divider) => {
    if (typeof divider !== 'number' || divider <= 0) return DEFAULT_DIVIDER;
    return divider;
  }

  return {
    postcssPlugin: 'postcss-pxrem-function',

    Declaration(decl) {
      const rgxTwo = new RegExp(/pxRem\((\d+\.?\d*)px\)/, 'g');
      if (!rgxTwo.test(decl.value)) return;
      const declValue = decl.value;
      const _divider = validateDivider(opts.divider);
      const cssString = declValue.replace(rgxTwo, (match, n) => (n / _divider) + 'rem');
      decl.value = cssString.toString()
    }
  }
}

module.exports.postcss = true
