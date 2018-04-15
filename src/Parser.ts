const data: IEntity = require('./Data');
const lodash        = require('lodash');

interface IEntity {
  attributes: object;
  included: { [key: string]: IEntity } | undefined | null
}

function parser(data: IEntity): object {
  if (data.included) {
    Object.entries(data.included).forEach(([key, value]) => {
      if (lodash.isObject(value)) {
        if (isHasIncluded(value)) {
          return { ...data.attributes, ...parser(value) };
        }
      }
    });
  }
  return data;
}

function isHasIncluded(obj: object): boolean {
  return obj.hasOwnProperty('included');
}


function displayData(data) {
  console.log(data.included.bg_image.attributes.url);
  console.log(data.included.logo.attributes.url);
}

const result = parser(data);
console.log(result);



