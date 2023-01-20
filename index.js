/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: 'postcss-pxrem-function',

    Declaration (decl) {
      const rgx = new RegExp(/pxRem\((\d+\.?\d*)px\)/, 'g');
      if (!rgx.test(decl.value)) return;
      const declValue = decl.value;
      const cssString = declValue.replace(rgx, (match, n) => (n / 16) + 'rem');
      console.log(cssString);
      if (cssString) {
        decl.value = cssString.toString()
      }
    }

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  }
}

module.exports.postcss = true
