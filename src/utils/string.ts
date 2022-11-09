export const toCamelCaseKeyinDict = (T: {
  [key: string]: any;
}): { [key: string]: any } => {
  const ret = {};
  for (let key in T) {
    const camelKey = key[0].toLowerCase + key.slice(1);
    ret[camelKey] = T[key];
  }

  return ret;
};
