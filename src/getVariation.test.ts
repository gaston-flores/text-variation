import getVariation from "./getVariation";
import seedrandom from "seedrandom";

test("returns a string", () => {
  const template = "{Hey|Hello} Mike, {how are you?|nice to meet you!}";
  const result = getVariation(template);
  expect(typeof result).toBe("string");
});

test("calls `randomFn` if provided", () => {
  const mockRandom = jest.fn(() => 0);
  const template = "{Hey|Hello} Mike, {how are you?|nice to meet you!}";
  const result = getVariation(template, { randomFn: mockRandom });
  expect(result).toBe("Hey Mike, how are you?");
  expect(mockRandom).toHaveBeenCalledTimes(2);
});

test("returns a consistent string when using a seeded generator", () => {
  const seeded = seedrandom("varying-text-test");
  const template = "{Hey|Hello} Mike, {how are you?|nice to meet you!}";
  const result = getVariation(template, { randomFn: seeded });
  expect(result).toBe("Hey Mike, nice to meet you!");
});

test("uses a custom `variationRegex` if provided", () => {
  const randomFn = seedrandom("varying-text-test");
  const customVariationRegex = /\[(.*?)\]/g;
  const template = "[Hey|Hello] Mike, care for some {braces}?";
  const result = getVariation(template, {
    randomFn,
    variationRegex: customVariationRegex,
  });
  expect(result).toBe("Hey Mike, care for some {braces}?");
});

test("uses a custom `variationChar` if provided", () => {
  const randomFn = seedrandom("varying-text-test");
  const customVariationChar = "/";
  const template =
    "{Hey/Hello} Mike, {check out this | pipe!/look at this | vertical bar!}";
  const result = getVariation(template, {
    randomFn,
    variationChar: customVariationChar,
  });
  expect(result).toBe("Hey Mike, look at this | vertical bar!");
});
