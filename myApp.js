const validUrl = require('valid-url');

const validateUrl = (url) => {
    //should add https:// to the url if it doesnt have it
    //also check if the url really exists in the internet
    if (validUrl.isUri(url)) {
       return true; 
    }
    return false;
}

exports.validateUrl = validateUrl;