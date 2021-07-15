/* eslint-disable import/prefer-default-export */
export const firstEntityValue = (entities, entity) => {
  const val = entities
    && entities[entity]
    && Array.isArray(entities[entity])
    && entities[entity].length > 0
    && entities[entity][0];

  if (!val) {
    return null;
  }

  return val;
};

export const childEntityValue = (entities, entity) => {
  const val = entities
    && entities[entity]
    && Array.isArray(entities[entity])
    && entities[entity].length > 0
    && entities[entity][0].entities.length > 0
    && entities[entity][0].entities[0];

  if (!val) {
    return null;
  }

  return val;
};
