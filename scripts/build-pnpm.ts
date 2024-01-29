// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";
import { copySync } from "https://deno.land/std@0.212.0/fs/copy.ts";

const buildCmd = "pnpm";

// Pre Build
await emptyDir(`./${buildCmd}`);

// Copy scripts: required during build for npm postinstall - clog-init chmods
Deno.copyFileSync(".npmrc", `${buildCmd}/.npmrc`);
Deno.copyFileSync("clog-init", `${buildCmd}/clog-init`);
Deno.copyFileSync("clog-setup", `${buildCmd}/clog-setup`);
Deno.copyFileSync("release", `${buildCmd}/release`);
copySync("src", `${buildCmd}/src`);

// Build
await build({
  entryPoints: [{
    kind: "bin",
    name: "release", // command name
    path: "src/release.js",
  }, {
    kind: "bin",
    name: "clog-setup",
    path: "src/clog-setup.js"
  }],
  
  // Settings
  // typeCheck: false,
  // test: false,
  // declaration: false,
  scriptModule: false, // common js module
  testPattern: ".do.not.test.yet",
  rootTestDir: ".",
  // Filter Diagnostics
  // filterDiagnostics(diagnostic) {
  //   if (diagnostic.file?.fileName.endsWith('colors.ts') {
  //     return false;    // ignore errors
  //   }
  //   return true;
  // }

  // Settings
  packageManager: buildCmd,
  outDir: `./${buildCmd}`,
  shims: {
    // see JS docs for overview and more options
    deno: false,
  },

  // Package JSON
  package: {
    name: "clog-rm",
    version: Deno.args[0].replace('v', ''),
    description: "Simplify versions, logs, and releases. Standardize git commits with industry templates, automate version advancements using SemVer, maintain changelogs, and generate git host releases. Fully customizable with common defaults.",
    scripts: {
      postinstall: "bash clog-init",
    },
    publishConfig: {
      registry: "https://registry.npmjs.org/",
    },
    repository: {
      type: "git",
      url: "git+https://github.com/mrteye/clog-rm.git",
    },
    keywords: [
      "clog-rm",
      "changelog",
      "release",
      "tool",
      "commitlint",
      "SemVer"
    ],
    author: "Tyler Gillispie",
    license: "MIT",
    homepage: "https://github.com/mrteye/clog-rm",
    bugs: {
      url: "https://github.com/mrteye/clog-rm/issues",
    },
    dependencies: {
      "@commitlint/cli": "^18.6.0",
      "@commitlint/config-conventional": "^18.6.0",
      "conventional-changelog-cli": "^4.1.0",
      "conventional-recommended-bump": "^9.0.0",
      "husky": "^9.0.5",
    },
  },

  // Post Build & Pre Test
  postBuild() {
  },
});

// Post Build
copySync("ext", `${buildCmd}/ext`);
// Track: Cosmic config appears to have regressed (used in commit lint)
// Ref: https://github.com/cosmiconfig/cosmiconfig/issues/224
// Ref: https://github.com/conventional-changelog/commitlint/issues/902
// ToDo: replace cjs with js (prefer ESM)
Deno.copyFileSync("commitlint.config.cjs", `${buildCmd}/commitlint.config.cjs`);
// Deno.copyFileSync("commitlint.config.js", `${buildCmd}/commitlint.config.js`);

Deno.copyFileSync("LICENSE", `${buildCmd}/LICENSE`);
Deno.copyFileSync("README.md", `${buildCmd}/README.md`);


// Don't ignore src; dnt is hardcoded to add the 'src/' to .npmignore
const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile(`${buildCmd}/.npmignore`);
let txt = decoder.decode(data).replace('src/\n', '');
await Deno.writeTextFile(`${buildCmd}/.npmignore`, txt);

