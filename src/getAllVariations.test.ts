import getAllVariations from "./getAllVariations";

test("returns a list", () => {
  const template = "{Hey|Hello} Mike, {how are you?|nice to meet you!}";
  const result = getAllVariations(template);
  expect(Array.isArray(result)).toBe(true);
});

test("returns the template if no variations exist", () => {
  const template = "Hey Mike, how are you?";
  const result = getAllVariations(template);
  expect(result).toEqual(["Hey Mike, how are you?"]);
});

test("returns the template with replaced values, if no variations exist inside the groups", () => {
  const template = "Hey {Mike}, {how are you?}";
  const result = getAllVariations(template);
  expect(result).toEqual(["Hey Mike, how are you?"]);
});

test("returns all variations of a template", () => {
  const template =
    "{Hey|Hello} Mike, {how are you?|nice to meet you!} I'm {Todd|Rod}";
  const result = getAllVariations(template);
  expect(result).toEqual([
    "Hey Mike, how are you? I'm Todd",
    "Hey Mike, how are you? I'm Rod",
    "Hey Mike, nice to meet you! I'm Todd",
    "Hey Mike, nice to meet you! I'm Rod",
    "Hello Mike, how are you? I'm Todd",
    "Hello Mike, how are you? I'm Rod",
    "Hello Mike, nice to meet you! I'm Todd",
    "Hello Mike, nice to meet you! I'm Rod",
  ]);
});

test("uses a custom `variationRegex` if provided", () => {
  const customVariationRegex = /\[(.*?)\]/g;
  const template = "[Hey|Hello] Mike, care for some {braces}?";
  const result = getAllVariations(template, {
    variationRegex: customVariationRegex,
  });
  expect(result).toEqual([
    "Hey Mike, care for some {braces}?",
    "Hello Mike, care for some {braces}?",
  ]);
});

test("uses a custom `variationChar` if provided", () => {
  const customVariationChar = "/";
  const template =
    "{Hey/Hello} Mike, {check out this | pipe!/look at this | vertical bar!}";
  const result = getAllVariations(template, {
    variationChar: customVariationChar,
  });
  expect(result).toEqual([
    "Hey Mike, check out this | pipe!",
    "Hey Mike, look at this | vertical bar!",
    "Hello Mike, check out this | pipe!",
    "Hello Mike, look at this | vertical bar!",
  ]);
});
