/* eslint-disable import/prefer-default-export */
import YAML from 'json2yaml';

export const generator = (jsonObj) => {
  const yml = YAML.stringify(jsonObj);
  return yml;
};
