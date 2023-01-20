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

    Declaration(decl, { result }) {
      const rgxOne = new RegExp(/pxRem\(([a-zA-Z0-9_.-]*)\)/, 'g')
      const rgxTwo = new RegExp(/pxRem\((\d+\.?\d*)px\)/, 'g');
      if (!rgxOne.test(decl.value)) return;
      if (!rgxTwo.test(decl.value)) {
        result.warn(`An error found in declaration: ${decl.toString()}`);
        return;
      }
      const declValue = decl.value;
      const _divider = validateDivider(opts.divider);
      const cssString = declValue.replace(rgxTwo, (match, n) => (n / _divider) + 'rem');
      decl.value = cssString.toString()
    }
  }
}

module.exports.postcss = true
