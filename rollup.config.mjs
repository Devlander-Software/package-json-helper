import auto from '@rollup/plugin-auto-install';
import babel from "@rollup/plugin-babel";
import commonjs from '@rollup/plugin-commonjs';
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from "fs";
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import swcPreserveDirectives from "rollup-swc-preserve-directives";
// rollup.config.js
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import packageJson from './package.json' assert { type: 'json' };
const pkg = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }));
const tsConfig = JSON.parse(readFileSync('tsconfig.json', { encoding: 'utf8' }));
const { compilerOptions } = tsConfig;

const dev = process.env.NODE_ENV !== "production";
const dependenciesArray = Object.keys(pkg.dependencies || {});
const devDependenciesArray = Object.keys(pkg.devDependencies || {});
const allDependencies = [...dependenciesArray, ...devDependenciesArray];

// const globals = {
//     'fs': 'fs',
//     'path': 'path',
//     'picocolors': 'pc',
//     "child_process": "child_process",
// };

const treeshake = {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false
};

const nodePlugins = [
    nodeResolve({
        preferBuiltins: true, // Prefer to use Node.js built-ins if available
      }),
      commonjs(),
      globals(), // Add Node globals (process, global, etc.)
      builtins(),
   

    json(),
    commonjs({
        ignoreTryCatch: false,
        include: 'node_modules/**'
    }),
    typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        inlineSources: true,
    }),
];

const generalPlugins = [
    auto(),
    peerDepsExternal(),
    ...nodePlugins,
    swcPreserveDirectives(),

    babel({
        babelHelpers: 'runtime',
        plugins: ["@babel/plugin-transform-runtime"],
        extensions: [".ts", ".d.ts"],
        exclude: "node_modules/**",
        presets: ["@babel/preset-typescript"],
    }),
    terser({
        ecma: 2020,
        mangle: { toplevel: true },
        compress: {
            toplevel: true,
            drop_console: !dev,
            drop_debugger: !dev,
        },
        output: { quote_style: 1 },
    }),
  
   
];

const config = [
    {
        treeshake,
        input: './src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
                name: "PackageJsonTypeHelper",

                globals
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
                exports: 'named',
                globals
            },
        
        ],
        plugins: generalPlugins,
        external: ['fs', 'child_process'], // Tell Rollup 'fs' and 'child_process' are external and will be available at runtime
    

    },
    {
        treeshake,
        input: `${compilerOptions.declarationDir}/index.d.ts`,
        output: [{ file: pkg.types, format: 'esm' }],
        plugins: [dts()],
    },
];

export default config;
