/**
 * @description From an array of object, group elements by a key in an array
 * @param arr
 * @param key
 */
export function groupBy<T, K extends string>(arr: T[], key: K & keyof T): Record<K, T[]> {
  return arr.reduce((acc: Record<string, T[]>, item) => {
    (acc[item[key] as string] = acc[item[key] as string] || []).push(item);
    return acc;
  }, {});
}
/**
 * @description From an array of object, group elements by a key in an object
 * @param arr
 * @param key
 */
export const groupByObject = <T, K>(arr: T[], key: K & keyof T) => {
  return arr.reduce((acc: Record<string, T>, item) => {
    acc[item[key] as string] = item;
    return acc;
  }, {});
};
