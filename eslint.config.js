import { fixupPluginRules } from '@eslint/compat';
import eslintJS from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginTestingLib from 'eslint-plugin-testing-library';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const appFiles = ['src/**/*.ts', 'src/**/*.tsx'];

const testFiles = [
	'**/tests/**',
	'**/__tests__/**/*',
	'src/**/*.{spec,test}.*',
];

const patchedReactHooksPlugin = fixupPluginRules(eslintPluginReactHooks);
const patchedImportPlugin = fixupPluginRules(eslintPluginImport);

const baseESLintConfig = {
	name: 'eslint',
	files: appFiles,
	extends: [eslintJS.configs.recommended, eslintConfigPrettier],
	rules: {
		'no-await-in-loop': 'error',
		'no-constant-binary-expression': 'error',
		'no-duplicate-imports': 'error',
		'no-new-native-nonconstructor': 'error',
		'no-promise-executor-return': 'error',
		'no-self-compare': 'error',
		'no-template-curly-in-string': 'error',
		'no-unmodified-loop-condition': 'error',
		'no-unreachable-loop': 'error',
		'no-unused-private-class-members': 'error',
		'require-atomic-updates': 'error',
		camelcase: 'error',
	},
};

const typescriptConfig = {
	name: 'typescript',
	files: appFiles,
	extends: [...typescriptEslint.configs.recommendedTypeChecked],
	languageOptions: {
		parser: tsParser,
		parserOptions: {
			ecmaFeatures: { modules: true },
			ecmaVersion: 'latest',
			project: './tsconfig.json',
		},
		globals: {
			...globals.builtin,
			...globals.browser,
			...globals.es2025,
		},
	},
	linterOptions: {
		reportUnusedDisableDirectives: 'error',
	},
	plugins: {
		import: patchedImportPlugin,
	},
	rules: {
		'@typescript-eslint/adjacent-overload-signatures': 'error',
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/explicit-member-accessibility': 'error',
		'@typescript-eslint/no-confusing-void-expression': 'error',
		'@typescript-eslint/no-import-type-side-effects': 'error',
		'@typescript-eslint/no-require-imports': 'error',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-useless-empty-export': 'error',
		'@typescript-eslint/prefer-enum-initializers': 'error',
		'@typescript-eslint/prefer-readonly': 'error',
		'no-return-await': 'off',
		'@typescript-eslint/return-await': 'error',
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
	},
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: './tsconfig.json',
			},
		},
	},
};

const reactConfig = {
	name: 'react',
	files: appFiles,
	extends: [eslintPluginReact.configs.flat['jsx-runtime']],
	plugins: {
		'react-hooks': patchedReactHooksPlugin,
		'react-refresh': eslintPluginReactRefresh,
	},
	rules: {
		'import/no-anonymous-default-export': 'error',
		'react/jsx-boolean-value': 'error',
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] },
		],
		'react/jsx-no-target-blank': 'off',
		'react/jsx-max-props-per-line': 'off',
		'react/jsx-sort-props': [
			'error',
			{
				callbacksLast: true,
				shorthandFirst: true,
				reservedFirst: true,
				multiline: 'last',
			},
		],
		'react/no-unknown-property': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/exhaustive-deps': 'error',
		...patchedReactHooksPlugin.configs.recommended.rules,
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},
};

const jsxA11yConfig = {
	name: 'jsxA11y',
	files: appFiles,
	...jsxA11yPlugin.flatConfigs.recommended,
	plugins: {
		'jsx-a11y': jsxA11yPlugin,
	},
	rules: {
		'jsx-a11y/alt-text': ['error', { elements: ['img'], img: ['Image'] }],
		'jsx-a11y/aria-props': 'error',
		'jsx-a11y/aria-proptypes': 'error',
		'jsx-a11y/aria-unsupported-elements': 'error',
		'jsx-a11y/role-has-required-aria-props': 'error',
		'jsx-a11y/role-supports-aria-props': 'error',
	},
};

const unicornConfig = {
	name: 'unicorn',
	files: appFiles,
	plugins: {
		unicorn: eslintPluginUnicorn,
	},
	rules: {
		'unicorn/custom-error-definition': 'error',
		'unicorn/empty-brace-spaces': 'error',
		'unicorn/no-array-for-each': 'off',
		'unicorn/no-array-reduce': 'off',
		'unicorn/no-console-spaces': 'error',
		'unicorn/no-null': 'off',
		'unicorn/filename-case': 'off',
	},
};

const testConfig = {
	name: 'testingLibrary',
	plugins: {
		'testing-library': eslintPluginTestingLib,
	},
	files: testFiles,
	settings: {
		jest: {
			version: 28,
		},
	},
};

const eslintConfig = typescriptEslint.config(
	baseESLintConfig,
	typescriptConfig,
	eslintConfigPrettier,
	reactConfig,
	jsxA11yConfig,
	unicornConfig,
	testConfig,
);

export default eslintConfig;
