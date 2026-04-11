import globals from 'globals';

import { createTypeScriptEslintConfig } from './base.mjs';

/**
 * @param {string} tsconfigRootDir
 */
export function createNestEslintConfig(tsconfigRootDir) {
  return createTypeScriptEslintConfig({
    ignores: ['eslint.config.mjs'],
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    sourceType: 'commonjs',
    tsconfigRootDir,
  });
}