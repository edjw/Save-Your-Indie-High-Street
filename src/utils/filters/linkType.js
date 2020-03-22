module.exports = function (link) {

    if (link.startsWith("+") || link.startsWith("0")) {
        return "phone";
    }

    else {
        return "dunno";
    }
}