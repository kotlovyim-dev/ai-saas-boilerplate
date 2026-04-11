import { globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import globals from 'globals';

import { createTypeScriptEslintConfig } from './base.mjs';

/**
 * @param {string} tsconfigRootDir
 */
export function createNextEslintConfig(tsconfigRootDir) {
  return createTypeScriptEslintConfig({
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    sourceType: 'module',
    tsconfigRootDir,
    extraConfigs: [
      ...nextVitals,
      ...nextTs,
      globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
    ],
  });
}