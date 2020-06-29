export default function addZeroPadding(num, length = 2) {
  return `${num}`.padStart(length, '0');
}
