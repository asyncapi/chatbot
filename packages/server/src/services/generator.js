/* eslint-disable import/prefer-default-export */
import YAML from 'json2yaml';

export const generator = (jsonObj) => {
  return YAML.stringify(jsonObj);
};
