module.exports = function (eleventyConfig) {

  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Layout aliases can make templates more portable
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');

  // Add some utility filters
  eleventyConfig.addFilter("squash", require("./src/utils/filters/squash.js"));

  // minify the html output
  eleventyConfig.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // pass some assets right through
  eleventyConfig.addPassthroughCopy("./src/site/images");

  const CleanCSS = require("clean-css");
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  const Terser = require("terser");
  eleventyConfig.addFilter("jsmin", function (code) {
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log("Terser error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: "_data"
    },
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };

};
