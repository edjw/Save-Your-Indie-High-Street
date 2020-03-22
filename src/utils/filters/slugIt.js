const slugify = require("slugify");

module.exports = function (text) {

    return slugify(text, {
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: true
    })
}