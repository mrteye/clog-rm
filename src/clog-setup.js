#!/usr/bin/env node
import { spawn } from "child_process";
import { realpathSync } from "fs";
import { accessSync, constants } from "fs"

const cmd = "clog-setup"
const check = [
  'node_modules/clog-rm',
  '.',
  process.cwd(),
  process.cwd() + '/..'
]

let path = ''
console.log(` - Locating ./${cmd}`)
for (let i = 0; i < check.length; i++) {
  try {
    path = check[i]
    accessSync(`${path}/${cmd}`, constants.F_OK)
    break
  } catch(err) {
    console.log(' - %s', err.message)
    path = false
  }
}

if (! path) {
  throw new Error(` - Path not found for ./${cmd}`)
}

console.log(' - Found: %s/%s', path, cmd);

const args = [];
const options = {
    shell: true,
};
const proc = spawn(`${path}/${cmd}`, args, options);
proc.stdout.on('data', data => console.log(data.toString()));
proc.stderr.on('data', data => console.log(' - Error: %s', data.toString()));

