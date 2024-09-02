import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  skipNodeModulesBundle:true,
  "format": ["cjs", "esm"],
  clean: true,
  dts: {
    resolve: true,
    entry: './src/index.ts', // Specify the entry point for type declarations
  },
  platform:'neutral',
  cjsInterop:false
})