#!/usr/bin/env node
import { spawn } from "child_process";
// import { fileURLToPath } from "url";
import { realpathSync } from "fs";

import { accessSync, constants } from "fs"
const check = [
  'node_modules/clog-rm',
  '.',
  process.cwd(),
  process.cwd() + '/..'
]

let path = ''
console.log(' - Locating ./release')
for (let i = 0; i < check.length; i++) {
  try {
    path = check[i]
    accessSync(`${path}/release`, constants.F_OK)
    break
  } catch(err) {
    console.log(' - %s', err.message)
    path = false
  }
}

if (! path) {
  throw new Error(' - Path not found for ./release')
}
// const path = fileURLToPath(new URL('..', import.meta.url));

console.log(' - Found: %s/release', path);

const cmd = 'release';
const args = [];
const options = {
    shell: true,
};
const proc = spawn(`${path}/${cmd}`, args, options);
proc.stdout.on('data', data => console.log(data.toString()));
proc.stderr.on('data', data => console.log(' - Error: %s', data.toString()));
