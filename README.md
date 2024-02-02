# Commit Log Release Management: clog-rm
Simplify versions, logs, and releases. Standardize git commits with industry
templates, automate version advancements using SemVer, maintain changelogs, and
generate git host releases. Fully customizable with common defaults.


## Supports
 - Releases: github(default), gitea
 - Linting: Angular commit conventions by default
 - Versions: bumping with conventional-recommended-bump and SemVer
 - Configurable: fully configurable with *.clog/ext/[lib]-[func]*


# Install
```
    pnpm i -D clog-rm
```

## .npmrc for pnpm
Add this file before installing or reinstalling if husky is not found or
other problems occur.

The following .npmrc forces a flat file structure which will hoist all
dependencies to the root node_modules folder.
``` .npmrc
node-linker=hoisted
```


# Setup
Create override examples, copy commitlint config, setup commit-msg hook
```
npx clog-setup
```


# Usage
Bump the version, update the changelog, and create & push a release to
github or gitea.  More git hosts to come.
```
npx release
```


# Config: clog.env
A token is required for pushing releases.  Add a token and any overrides vari
to *clog.env* in the project root.
```
# see github or gitea documentation for creating a token.
# Ref:github https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

# Ref:gitea API doc is the only ref I can find in the docs for creating a token
#  - https://docs.gitea.com/development/api-usage
#  - In the web interface try: .../user/settings/applications

GIT_TOKEN="personal access token"
SERVICE=""  # Set the git host: github|gitea; defaults to github
```


# Contributing
...
## Pending Features
 - override config w/ `npx release $TOKEN $API $SERVICE`
 - *commit-lint config is currently hard coded*
 - Monorepo support.
 - Pre-release version support v1.0.1-beta.1, v1.2.1-rc.3


# Resources
## Package Build
Built with dnt.

## Conventional Changelog
[Changelog Ecosystem](https://github.com/conventional-changelog/conventional-changelog?tab=readme-ov-file#modules-important-to-conventional-changelog-ecosystem)
The following modules are included.
 - conventional-changelog-cli - changelog management interface
 - standard-changelog - angular commit linting rules
 - conventional-recommended-bump - commit log based recommended version bump
 - commitlint - lint commit messages

## husky
 - for git hook management

## Version Control (git)
### Commit Guidelines
From [angular.js/DEVELOPERS.md](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type)
All commits should start with a type and a colon - ex. ```git commit -m 'type: message'```

Types must be one of the following:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

