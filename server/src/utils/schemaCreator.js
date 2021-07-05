export default function schemaCreator(index, data, value) {
  const result = data;
  result[Object.keys(result)[index]] = value;
  return data;
}
