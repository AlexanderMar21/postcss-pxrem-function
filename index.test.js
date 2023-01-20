const postcss = require("postcss");

const plugin = require("./");

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

const input = ".test{font-size: pxRem(16px);padding: pxRem(16px) pxRem(20px)}";
const output = ".test{font-size: 1rem;padding: 1rem 1.25rem}";
const outputTwo = ".test{font-size: 1.6rem;padding: 1.6rem 2rem}";
const missSpelled = ".test{font-size: pxRem(16p)}";

it(`takes as input "${input}" and returns this "${output}" with default options`, async () => {
  await run(input, output, {});
});

it(`takes as input "${input}" and returns this "${output}" with divider option set to 0`, async () => {
  await run(input, output, { divider: 0 });
});

it(`takes as input "${input}" and returns this "${outputTwo}" with divider option set to 10`, async () => {
  await run(input, outputTwo, { divider: 10 });
});

it(`takes as input "${missSpelled}" and returns the same when there is a miss spell in string`, async () => {
  await run(missSpelled, missSpelled);
});
