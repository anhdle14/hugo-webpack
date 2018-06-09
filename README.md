# GoHugo + Webpack 4 Boilerplate

As much as i love Victor-Hugo. From the recent talks on Webpack, it is just too good to be true, so i think let's combine two things that i loved: Hugo and Webpack. So this is my answer!

## GoHugo
> A big thank to all the devs on GoHugo. You guys are awesome.

Well, let's get straight to business. The only problem for me with Hugo is that, i can't bundle css and js easily, and adding all the features of PWA, minify, uglify, etc... To be honest, as much as i love the minimal of GoHugo, it is just too much pain to not include js. So that is why i think webpack should be included in.

> Trying to get 100 point for all lighthouse audit.

## Methodology

So, the process is going to bundle everything from folder `./src/` into `./static/`. All being minified, gzip, and uglify. With ES5 features.

Make a `./data/manifest.json` file to integrate with GoHugo template.

## Features
* Using webpack 4, Hugo 0.41.
* Service Worker for caching.
* Auto bundle from the src folder.
* PostCSS with Sass compiler.
* Dev with hugo serve and webpack --watch.
* UglifyJS and MiniCSS plugins with webpack.
* Auto bundle manifest.json from config.toml

## Upcoming features
* HTTPS/2 for testing with lighthouse audit.
* Setting up a good theme with materialui so people can easy start.

## Example config.toml for manifest.json
```toml
[manifest]
  name = ""
  short_name = ""
  description = ""
  iconsSrc = ""
  theme_color = ""
  background_color = ""
```

## Quick-start
> For Production [IN PROGRESS]

```
npm run prod
```

> For Development
```
npm run dev
```
