export const isDuplicated = <T extends object>(
  array: T[],
  values: Partial<T>,
): (keyof T)[] | false => {
  const valuesKeys = Object.keys(values) as (keyof typeof values)[];

  const findResponse = valuesKeys.reduce<(keyof T)[]>(
    (acc, key) =>
      array.find((val) => val[key] === values[key]) ? [...acc, key] : acc,
    [],
  );

  return findResponse.length > 0 ? findResponse : false;
};
