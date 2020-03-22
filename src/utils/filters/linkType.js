module.exports = function (link) {

    // Super hacky way to detect if it's a phone number or not
    if (link.startsWith("+") || link.startsWith("0")) {
        return "phone";
    }
    else {
        var emailAddressRegex = new RegExp(`/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`);
        var lowerCaseLink = String(link).toLowerCase();
        if (emailAddressRegex.test(lowerCaseLink)) {
            return "email";
        }
    }
}