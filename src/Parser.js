const data = require('./Data');
const lodash = require('lodash');
function parser(data) {
    if (data.included) {
        Object.entries(data.included).forEach(([key, value]) => {
            if (lodash.isObject(value)) {
                if (isHasIncluded(value)) {
                    return Object.assign({}, data.attributes, parser(value));
                }
            }
        });
    }
    return data;
}
function isHasIncluded(obj) {
    return obj.hasOwnProperty('included');
}
function displayData(data) {
    console.log(data.included.bg_image.attributes.url);
    console.log(data.included.logo.attributes.url);
}
const result = parser(data);
console.log(result);
//# sourceMappingURL=Parser.js.map