export function frasalArrayListing(array: string[]) {
  const arrayLength = array.length;

  if (arrayLength === 1) return array[0];

  const frase = array.reduce((acc, item, index) => {
    if (index === arrayLength - 1) {
      return `${acc} and ${item}`;
    }

    if (index + 1 === arrayLength - 1) {
      return `${acc}${item}`;
    }

    return `${acc}${item}, `;
  }, '');

  return frase;
}
