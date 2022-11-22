export const getIntent = (data) => {
  if (data && Object.keys(data).length > 0) {
    return data[0]
  }
  return null;
};
