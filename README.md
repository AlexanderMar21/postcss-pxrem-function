# postcss-pxrem-function

[PostCSS] plugin to use pxRem() or pxrem() function to convert pixels to rem.

[PostCSS]: https://github.com/postcss/postcss

```css
.foo {
  font-size: pxRem(16px); // font-size: 1rem;
  border-radious: pxrem(16px); // border-radious: 1rem;
}
```

```css
.foo {
  padding: pxRem(16px) pxrem(20px); // padding: 1rem 1.25rem;
}
```
## Migration from 0.0.x to 0.1.x
In version ```0.1.x``` the ```pxRem()``` is can also be used as ```pxrem()``` to solve stylelint compatibility. The changes are backwards compatible.


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

**Step 4:** Add configuration for pixels divider:

```diff
module.exports = {
  plugins: [
    require('postcss-pxrem-function')({
      divider: 10, // 16(px) / 10 => 1.6rem. Default is 16
    })
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
