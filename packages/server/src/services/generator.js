import YAML from 'json2yaml';

export const generator = (jsonObj) => {
  return YAML.stringify(jsonObj);
};
