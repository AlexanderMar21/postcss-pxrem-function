const postcss = require("postcss");

const plugin = require("./");

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

async function runWithWarning(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(1);
}

const input = ".test{font-size: pxRem(16px);padding: pxRem(16px) pxrem(20px)}";
const output = ".test{font-size: 1rem;padding: 1rem 1.25rem}";
const outputTwo = ".test{font-size: 1.6rem;padding: 1.6rem 2rem}";
const missSpelled = ".test{font-size: pxRem(16p);}";

const strictRegex = ".test{font-size: pXRem(16px);padding: PxRem(16px) pxrEm(20px)}";

it(`takes as input "${input}" and returns this "${output}" with default options`, async () => {
  await run(input, output, {});
});

it(`takes as input "${input}" and returns this "${output}" with divider option set to 0`, async () => {
  await run(input, output, { divider: 0 });
});

it(`takes as input "${input}" and returns this "${outputTwo}" with divider option set to 10`, async () => {
  await run(input, outputTwo, { divider: 10 });
});

it(`should be strict with casing of with the function call ${strictRegex}`, async () => {
  await run(strictRegex, strictRegex);
});

it(`takes as input "${missSpelled}" and returns the same and a warning when there is a miss spell in string. `, async () => {
  await runWithWarning(missSpelled, missSpelled);
});
