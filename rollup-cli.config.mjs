import auto from '@rollup/plugin-auto-install';
import babel from "@rollup/plugin-babel";
import commonjs from '@rollup/plugin-commonjs';
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from "fs";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import swcPreserveDirectives from "rollup-swc-preserve-directives";

// Read package.json and tsconfig.json files
const pkg = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }));
const tsConfig = JSON.parse(readFileSync('tsconfig.json', { encoding: 'utf8' }));
const { compilerOptions } = tsConfig;

const dev = process.env.NODE_ENV !== "production";

// Plugin configurations
const nodePlugins = [
    nodeResolve({
        preferBuiltins: true,
    }),
    commonjs({
        include: 'node_modules/**'
    }),
    json(),
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
];

// Rollup configuration
const config = [
    {
        input: './src/cli/pkg-helper.ts',
        output: [
            {
                file: pkg.bin['pkg-helper'],
                format: 'cjs',
                sourcemap: true,
                name: "PackageJsonTypeHelper",
            },
        ],
        plugins: generalPlugins,
        external: ['fs', 'child_process', "yargs"],
    }
];

export default config;
