// sort an array of mix values (string as number & string)
export function sortArr(arr) {
  const numArr = arr.filter((el) => typeof el === 'number').sort((a, b) => a - b);
  const strArr = arr.filter((el) => typeof el === 'string').sort((a, b) => a - b);
  return numArr.concat(strArr);
}
