module.exports = function (link) {
    var linkType = "";
    // Super hacky way to detect if it's a phone number or not. But do any other kinds of links start with a + or a 0?
    if (link.startsWith("+") || link.startsWith("0")) {
        linkType = "phone";
    }

    // Super hacky way to detect if it's an email or not. But do any other kinds of links include an @ symbol?
    else if (link.includes("@")) {
        linkType = "email";
    }
    else {
        linkType = "webpage";
    }
    return linkType;
}