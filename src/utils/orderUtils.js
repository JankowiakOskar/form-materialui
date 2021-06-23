export const dishType = {
  pizza: 'pizza',
  soup: 'soup',
  sandwich: 'sandwich',
};

export const hasTimeMoreThanZero = (timeStr) =>
  timeStr.split(':').some((val) => +val > 0);

export const formatSeconds = (timeStr) => {
  const defaultTimeStr = '00:00:00';
  if (defaultTimeStr.length !== timeStr.length) {
    return `${timeStr}:00`;
  }
  return timeStr;
};

export const parseValuesToNums = (data, keysToParse) => {
  const parsedData = Object.keys(data).reduce((acc, key) => {
    const isMatchedKey = keysToParse.includes(key);
    if (isMatchedKey) {
      acc[key] = parseFloat(data[key]);
    } else {
      acc[key] = data[key];
    }
    return acc;
  }, {});
  return parsedData;
};
