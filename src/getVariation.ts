"use strict";

export type VariationConfig = {
  /**
   * Function used to generate random numbers. Used to choose a variation inside
   * each group. Defaults to `Math.random`.
   */
  randomFn?: () => number;
  /**
   * Regex used to detect a variation group. Defaults to `/\{(.*?)\}/g`.
   */
  variationRegex?: RegExp;
  /**
   * Character that separates variations inside a group. Defaults to `|`.
   */
  variationChar?: string;
};

const configDefaults = {
  randomFn: Math.random,
  variationRegex: /\{(.*?)\}/g,
  variationChar: "|",
};

/**
 * Returns a random variation of the provided template
 *
 * @function
 * @param {VariationConfig} template The template with variation groups
 * @param {object} config A configuration object to change the behaviour of the function
 * @param {Function} config.randomFn Used to choose a variation inside each group. Defaults to `Math.random`.
 * @param {RegExp} config.variationRegex Regex used to detect a variation group. Defaults to `/\{(.*?)\}/g`.
 * @param {string} config.variationChar Character that separates variations inside a group. Defaults to `|`.
 * @returns {string} A random variation of the template
 */
export function getVariation(
  template: string,
  config: VariationConfig = {}
): string {
  const { randomFn, variationRegex, variationChar } = {
    ...configDefaults,
    ...config,
  };
  return template.replace(variationRegex, (match, group: string) => {
    const variations = group.split(variationChar);
    return variations[Math.floor(randomFn() * variations.length)];
  });
}

export default getVariation;
