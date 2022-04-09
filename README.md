# text-variation

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/gaston-flores/text-variation/CI)](https://github.com/gaston-flores/text-variation/actions/workflows/release.yml)
[![npm](https://img.shields.io/npm/v/text-variation)](https://www.npmjs.com/package/text-variation)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/text-variation)](https://bundlephobia.com/package/text-variation)

Generate random variations of a string template.

```ts
import getVariation from "text-variation";

getVariation("{Hey|Hello} Mike, {how are you?|nice to meet you!}"); // Will return one of:
// Hey Mike, how are you?
// Hey Mike, nice to meet you!
// Hello Mike, how are you?
// Hello Mike, nice to meet you!
```

## Installation

Using npm

```bash
npm install text-variation
```

Using yarn

```bash
yarn add text-variation
```

## Usage

The `getVariation` function is available as a default and named export. It accepts two parameters, `template` and `config`.

### `template`

Required. The template with variations. By default the variation group is marked with braces and the variations inside it are separated by pipes. For example the template:

```
Hey {John|Mike|Mark}, my name is {Jake|Todd}, nice to {meet you.|meetcha!}
```

Can result in 12 different variations.

### `config`

Optional. Must be an object. Configuration that can change how the function parses the template and chooses the variations. All properties are optional:

#### `config.randomFn: () => number`

Used to choose a variation inside each group. Useful if you'd like to use a seeded generator for consistent results or testing. Defaults to `Math.random`.

```js
import getVariation from "text-variation";
import seedrandom from "seedrandom";

const seeded = seedrandom("varying-text-test");
const template = "{Hey|Hello} Mike, {how are you?|nice to meet you!}";
getVariation(template, { randomFn: seeded }); // Will always return "Hey Mike, nice to meet you!"
```

#### `config.variationRegex: RegExp`

Used to find the variation groups inside the template. Defaults to `/\{(.*?)\}/g`.

To work properly, it needs a single capturing group and the global `g` flag. If no capturing group is provided, the function will throw an error when trying to split the possible variations. If the global flag is not passed, only the first occurrance in the template will be replaced.

```ts
/\{(.*?)\}/g // Default, valid
/\[(.*?)\]/g // With brackets instead of braces, valid
/\{.*?\}/g   // No capturing group, will throw an error
/\{(.*?)\}/  // No global flag, will not match all occurrances in the template
```

#### `config.variationChar: string`

The character that separates variations inside a group. Defaults to `|`.

### Generating all variations of a template

When creating a new template, it can be useful to know all possible variations. You can use `getAllVariations` to generate every possible variation of a template. Accepts the same config options as `getVariation`.

```js
import { getAllVariations } from "text-variation";

const template = "{Hey|Hello} Mike, {how are you?|nice to meet you!}";
getAllVariations(template); // ["Hey Mike, how are you?", "Hey Mike, nice to meet you!", "Hello Mike, how are you?", "Hello Mike, nice to meet you!"]
```

Note that depending on the amount of variation groups and the variations inside them, this can result in **huge** lists. For example, the template:

```
{Hey|Hello|Howdy} {Mike|John|Luke|Todd}! Did you {see|view|look} the {file|document} I send you {yesterday|Friday|last weekend}? It's {very relevant|important|critical|classified}
```

Will result in 3 \* 4 \* 3 \* 2 \* 3 \* 4 = **864** possible variations.
