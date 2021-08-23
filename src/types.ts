"use strict";
interface VariationConfig {
  /**
   * Regex used to detect a variation group. Defaults to `/\{(.*?)\}/g`.
   */
  variationRegex?: RegExp;
  /**
   * Character that separates variations inside a group. Defaults to `|`.
   */
  variationChar?: string;
}

export { VariationConfig };
