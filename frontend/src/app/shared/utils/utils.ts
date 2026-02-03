export function getFilledValues(obj: any): any {
  return Object.keys(obj).reduce((acc: any, key) => {
    const value = obj[key];

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const deep = getFilledValues(value);
      if (Object.keys(deep).length > 0) acc[key] = deep;
    } else if (value !== null && value !== undefined && value !== '') {
      acc[key] = value;
    }

    return acc;
  }, {});
}
