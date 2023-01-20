# postcss-pxrem-function

[PostCSS] plugin to use rem() function to convert pixels to rem.

[PostCSS]: https://github.com/postcss/postcss

```css
.foo {
  font-size: remPx(16px); // font-size: 1rem;
}
```

```css
.foo {
  padding: remPx(16px) remPx(20px); // padding: 1rem 1.25rem;
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-pxrem-function
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-pxrem-function'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
