const { DateTime } = require("luxon");
module.exports = function (eleventyConfig) {

  let markdownIt = require("markdown-it");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let markdownLib = markdownIt(options);
  eleventyConfig.setLibrary("md", markdownLib);

  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Layout aliases can make templates more portable
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');

  // Add some utility filters
  eleventyConfig.addFilter("squash", require("./src/utils/filters/squash.js"));

  eleventyConfig.addFilter("linkType", require("./src/utils/filters/linkType.js"));

  // eleventyConfig.addFilter("linkType", function (link) {
  //   if (link.startsWith("+") || link.startsWith("0")) {
  //     return "phone";
  //   }

  //   else {
  //     return "dunno";
  //   }
  // });


  const CleanCSS = require("clean-css");
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  const linkifyHtml = require('linkifyjs/html');
  eleventyConfig.addFilter("linkify", function (text) {
    var options = { nl2br: true, };
    return linkifyHtml(new String(text), options);
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

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  // minify the html output
  eleventyConfig.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // pass some assets right through
  eleventyConfig.addPassthroughCopy("./src/site/assets");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("_headers");

  eleventyConfig.addPassthroughCopy({ "./src/site/assets/images/favicons": "/" });


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
