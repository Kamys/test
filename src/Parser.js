"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = require('./Data');
const lodash = require('lodash');
function mainParse(value) {
    return lodash.isArray(value)
        ? value.map(parser)
        : parser(value);
}
function parser(data) {
    if (data.included) {
        const newIncluded = Object.entries(data.included).reduce((result, [key, value]) => {
            result[key] = mainParse(value);
            return result;
        }, {});
        return Object.assign({}, data.attributes, newIncluded);
    }
    return Object.assign({}, data.attributes);
}
exports.parser = parser;
function isIEntity(obj) {
    return isHasAttributes(obj);
}
function isHasIncluded(obj) {
    return obj.hasOwnProperty('included');
}
function isHasAttributes(obj) {
    return obj.hasOwnProperty('attributes');
}
function displayData(data) {
    console.log(data.included.bg_image.attributes.url);
    console.log(data.included.logo.attributes.url);
}
const result = parser(data);
console.log(result);
//# sourceMappingURL=Parser.js.map