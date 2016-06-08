# Workflow
> A workflow created with Gulp taskrunner.

> **Features:**
> - SASS to CSS compiling, minifying, autoprefixing and sourcemap writing
> - Javascript concatonation and uglifying
> - Optimizing and minifying images (PNG, JPEG, GIF and SVG)
> - Cache busting
> - Live reload using BrowserSync

## Getting started
For using this Gulp workflow you need to have [node.js](https://nodejs.org/en/download/), npm and [Gulp (globally)](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) installed.

1. Clone or download this repo into your folder.
2. Run the following terminal command `npm install` in the folder where you have cloned or downloaded the repo. This will automaticly install all used dev dependencies.
3. Create your folder structure and edit te paths in the `gulp-config.json` file.
4. After you have setup the paths and created some scripts and sass files you can run `gulp` in the terminal. This will run the default Gulp task which will watch your SASS and scripts folder.

#### Deployment
Run the following command to create a deployment ready app/website.
``` sh
gulp deploy
```
This will create a new folder with concatonated and minified scripts and stylesheets. (Foldername depends how you have configured your dist path in the gulp-config.json)

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/drw026/workflow/issues)

## Todos
1. [x] ~~Style (SASS) task~~
  * [x] ~~Autoprefixer~~
2. [x] ~~Javascript task~~
3. [x] ~~Browser Sync~~
4. [x] ~~Clean dist folder for new deploys~~
5. [x] ~~Style deploy task~~
7. [x] ~~Javascript deploy task~~
8. [x] ~~Images deploy task (image optimization)~~
9. [x] ~~Cache busting assets (css & js)~~
10. [ ] SASSdoc integration
11. [ ] Bower integration
12. [ ] HTML optimization
13. [ ] Merge Media Queries

## Licence
The MIT License (MIT)
Copyright (c) 2016 Andrew Reasoa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.