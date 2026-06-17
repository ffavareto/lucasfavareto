const nx = require('@nx/eslint-plugin');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  // --- Nx base configs (TypeScript parser, Angular rules, template rules) ---
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],

  // --- Global ignores ---
  {
    ignores: [
      'dist/**',
      'coverage/**',
      '.nx/**',
      '.angular/**',
      'src/assets/blog/**', // arquivos gerados em build-time
    ],
  },

  // --- TypeScript source ---
  {
    files: ['**/*.ts'],
    rules: {
      // Seletores Angular
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],

      // Padrões Angular — o projeto usa standalone exclusivamente
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/prefer-inject': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',

      // TypeScript — sem any, sem vars não usadas, imports de tipo explícitos
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // Qualidade geral
      'prefer-const': 'error',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },

  // --- Templates HTML ---
  {
    files: ['**/*.html'],
    rules: {
      // Acessibilidade — elevamos a error (Nx já inclui, mas com severidade padrão)
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/click-events-have-key-events': 'error',
      '@angular-eslint/template/interactive-supports-focus': 'error',
      '@angular-eslint/template/role-has-required-aria': 'error',
      '@angular-eslint/template/valid-aria': 'error',
      '@angular-eslint/template/label-has-associated-control': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
      // Enforce novo control flow (@for, @if) sobre *ngFor/*ngIf
      '@angular-eslint/template/prefer-control-flow': 'error',
    },
  },

  // --- Specs — regras relaxadas ---
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },

  // --- Entry point — console.log do easter egg é intencional ---
  {
    files: ['src/main.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // --- Scripts Node (build-blog, etc.) ---
  {
    files: ['scripts/**/*.mjs', 'scripts/**/*.js'],
    rules: {
      'no-console': 'off',
    },
  },

  // --- Prettier DEVE ser o último — desativa regras de formatação conflitantes ---
  prettierConfig,
];
