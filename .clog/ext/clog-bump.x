#!/bin/bash

# Optionally disable clog bump
arg="$1"

function main() {
  [ -z "$arg" ] && { 
    version
  } || {
    bump
  }
}

# Shows the version
function version {
  echo "v$(npm pkg get version | sed 's/\"//g')"
}

# Bump and return new version
function bump {
  releaseType=$(npx conventional-recommended-bump -p angular)
  bumpVersion=$(npm version $releaseType --no-git-tag-version)

  echo "$bumpVersion"
}


main

