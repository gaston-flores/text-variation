"use strict";

export type VariationConfig = {
  /**
   * Regex used to detect a variation group. Defaults to `/\{(.*?)\}/g`.
   */
  variationRegex: RegExp;
  /**
   * Character that separates variations inside a group. Defaults to `|`.
   */
  variationChar: string;
};

const configDefaults = {
  variationRegex: /\{(.*?)\}/g,
  variationChar: "|",
};

function recursiveGeneration(
  template: string,
  config: VariationConfig
): string[] {
  const match = config.variationRegex.exec(template);
  if (match) {
    const variants = match[1].split(config.variationChar);
    return variants.reduce<string[]>(
      (acc, variant) => [
        ...acc,
        ...recursiveGeneration(
          template.replace(config.variationRegex, variant),
          config
        ),
      ],
      []
    );
  } else {
    return [template];
  }
}

export function getAllVariations(
  template: string,
  config: Partial<VariationConfig> = {}
): string[] {
  const { variationRegex, variationChar } = {
    ...configDefaults,
    ...config,
  };
  const noGlobalRegex = new RegExp(variationRegex.source);
  return recursiveGeneration(template, {
    variationRegex: noGlobalRegex,
    variationChar,
  });
}

export default getAllVariations;
