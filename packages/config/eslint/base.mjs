import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

const sharedRules = {
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-floating-promises': 'warn',
  '@typescript-eslint/no-unsafe-argument': 'warn',
  'prettier/prettier': ['error', { endOfLine: 'auto' }],
};

/**
 * @typedef {object} TypeScriptEslintConfigOptions
 * @property {string[]} [ignores]
 * @property {Record<string, boolean>} [globals]
 * @property {'module' | 'commonjs'} [sourceType]
 * @property {string} [tsconfigRootDir]
 * @property {Array<any>} [extraConfigs]
 * @property {Record<string, any>} [extraRules]
 */

/**
 * @param {TypeScriptEslintConfigOptions} [options]
 */
export function createTypeScriptEslintConfig(options = {}) {
  const {
    ignores = [],
    globals = {},
    sourceType = 'module',
    tsconfigRootDir,
    extraConfigs = [],
    extraRules = {},
  } = options;

  return tseslint.config(
    { ignores },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    ...extraConfigs,
    {
      languageOptions: {
        globals,
        sourceType,
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
    {
      rules: /** @type {any} */ ({
        ...sharedRules,
        ...extraRules,
      }),
    },
  );
}