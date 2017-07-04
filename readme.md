# Styleguide

A styleguide pattern to test color scheme, typography, grids, layout & button before coding a website.
It can be share with customers if they don't have visual guideline to make documents.

This project is built with html, sass and javscript. Sass files, images & javascript are processed to make
the guideline, when you have finished to work on it, you can remove everything except the folder styleguide/
with processed files.

## Installation
To make a local copy : `git clone https://github.com/nclslbrn/styleguide.git`

To install dependancies : `npm install`

## Usage
To run gulp tasks : `gulp`

Specific gulp task :
- HTML include `gulp fileinclude`
- Sass processing `gulp styles`
- javascript linting and minifying `gulp scripts`
- images minifying (jpg, png, gif & svg) `gulp images`
- zip the guideline folder `gulp build`
- remove all processed file `gulp clean`
- launch browserSync `gulp sync`
- watching for file save and trigger the right automation `gulp watch` (an alias of `gulp`)
