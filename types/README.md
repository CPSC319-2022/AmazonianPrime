# (Types Package)[https://www.npmjs.com/package/amazonian-prime-types]
This package encapsulates the types used in the frontend and backend.

Version will run after a new version has been bumped. If your package has a git repository, like in our case, a commit and a new version-tag will be made every time you bump a new version. This command will run BEFORE the commit is made. One idea is to run the formatter here so no ugly code will pass into the new version:

`"version" : "npm run format && git add -A src"`
Postversion will run after the commit has been made. A perfect place for pushing the commit as well as the tag.

`"postversion" : "git push && git push --tags"`

## Adding new types
When adding new types, be sure to add it under `./src` folder, and include it in the `index.ts`. Be sure to run above steps according to the instruction. In order to publish the package, contact @Josh.