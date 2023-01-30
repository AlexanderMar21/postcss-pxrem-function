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

  const rgxOne = new RegExp(/(pxRem|pxrem)\(([a-zA-Z0-9_.-]*)\)/, 'g')
  const rgxTwo = new RegExp(/(pxRem|pxrem)\((\d+\.?\d*)px\)/, 'g');

  return {
    postcssPlugin: 'postcss-pxrem-function',

    Declaration(decl, { result }) {
      if (!rgxOne.test(decl.value)) return;
      if (!rgxTwo.test(decl.value)) {
        result.warn(`An invalid value found when using pxRem function in declaration: ${decl.toString()}`);
        return;
      }
      const declValue = decl.value;
      const _divider = validateDivider(opts.divider);
      const cssString = declValue.replace(rgxTwo, (match, _, n) => (n / _divider) + 'rem');
      decl.value = cssString.toString()
    }
  }
}

module.exports.postcss = true
