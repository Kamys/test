const data: IEntity = require('./Data');
const lodash        = require('lodash');

interface IEntity {
  attributes: object;
  included: { [key: string]: IEntity } | undefined | null
}

function parse(value: IEntity | IEntity[]) {
  return value instanceof Array
    ? value.map(parserIEntity)
    : parserIEntity(value);
}

export function parserIEntity(data: IEntity): any {
  if (data.included) {
    const newIncluded = Object.entries(data.included).reduce((result, [key, value]: any) => {
      result[key] = parse(value);
      return result;
    }, {});
    return {...data.attributes, ...newIncluded};
  }
  return {...data.attributes};
}

function isIEntity(obj: object): boolean {
  return isHasAttributes(obj);
}

function isHasIncluded(obj: object): boolean {
  return obj.hasOwnProperty('included');
}

function isHasAttributes(obj: object): boolean {
  return obj.hasOwnProperty('attributes');
}


function displayData(data) {
  console.log(data.included.bg_image.attributes.url);
  console.log(data.included.logo.attributes.url);
}

const result = parse(data);
console.log(result);



