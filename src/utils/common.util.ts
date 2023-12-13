export function arrayToString(array: any[]) {
  return array.reduce((accumulator, currentValue, currentIndex) => {
    if (currentIndex != 0) {
      return accumulator + "," + currentValue.toString();
    } else {
      return currentValue.toString();
    }
  });
}