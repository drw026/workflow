# Workflow
> A workflow created with Gulp taskrunner.

## Getting started
For using this Gulp workflow you need to have node.js, npm and Gulp (globally) installed.

##### Clone or download
Clone or download this repo into your folder.
##### Install dependencies
Run the following terminal command in the folder where you have placed the repo.
```sh
npm install
```
It will automaticly install all used dev dependencies.
##### Paths
Create your folder structure and edit te paths in the gulp-config.json file.
##### Run Gulp
After you have setup the paths and created some scripts and sass files you can run the following command in the terminal:
```sh
gulp
```
This will run the default Gulp task which will watch your SASS and scripts folder.
##### Deployment
Run the following command to create a deployment ready app/website.
``` sh
gulp deploy
```
This will create a new folder with concatonated and minified scripts and stylesheets. (Foldername depends how you have configured your dist path in the gulp-config.json)

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/drw026/workflow/issues)

## Todos
1. ~~Style (SASS) task~~
  * ~~Autoprefixer~~
2. ~~Javascript task~~
3. ~~Browser Sync~~
4. ~~Clean dist folder for new deploys~~
5. ~~Style deploy task~~
7. ~~Javascript deploy task~~
8. ~~Images deploy task (image optimization)~~
9. ~~Cache busting assets (css & js)~~
10. SASSdoc integration
11. Bower integration
12. HTML optimization