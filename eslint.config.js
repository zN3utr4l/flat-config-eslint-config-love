import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import eslintLove from 'eslint-config-love'

import path from 'path'
import { fileURLToPath } from 'url'

// mimic CommonJS variables -- not needed if using CommonJS
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)
const compat = new FlatCompat({ baseDirectory: _dirname, recommendedConfig: pluginJs.configs.recommended, allConfig: pluginJs.configs.all })

export default [
  {
    languageOptions: {
      globals: {
        __statics: 'readonly',
        __QUASAR_SSR__: 'readonly',
        __QUASAR_SSR_SERVER__: 'readonly',
        __QUASAR_SSR_CLIENT__: 'readonly',
        __QUASAR_SSR_PWA__: 'readonly',
        ...globals.browser
      },
      parserOptions: {
        extraFileExtensions: ['.vue']
      }
    },
    ignores: [
      './dist/*',
      './.quasar/*',
      './node_modules/*',
      './src-capacitor/*',
      './src-cordova/*',
      './src-electron/*',
      './quasar.config.*.temporary.compiled*'
    ]
  },
  ...compat.extends('prettier'),
  ...pluginVue.configs['flat/recommended'],
  eslintLove
]
