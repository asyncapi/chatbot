export default function schemaCreator(data, value, title, index, childIndex) {
  if (!title && index === null) {
    const newData = data;
    newData[value] = {};
    return newData;
  } if (index === null || index === undefined) {
    const newData = data;
    newData[title] = value;
    return newData;
  }
  if (childIndex === 0 || childIndex) {
    const newData = data[Object.keys(data)[childIndex]];
    newData[title] = value;
    return newData;
  }
  const newData = data[Object.keys(data)[index]];
  newData[title] = value;
  return newData;
}
