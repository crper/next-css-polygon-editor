import dayjs from 'dayjs';
import { chunk, difference } from 'es-toolkit/array';

/**
 * 格式化日期
 * @param {Date | string | number} date - 日期
 * @param {string} format - 格式化模式
 * @returns {string} 格式化后的日期字符串
 */
export const formatDate = (date: Date | string | number, format = 'YYYY-MM-DD'): string => {
  return dayjs(date).format(format);
};

/**
 * 获取当前年份
 * @returns {number} 当前年份
 */
export const getCurrentYear = (): number => {
  return dayjs().year();
};

/**
 * 计算两个日期之间的天数差
 * @param {Date | string | number} startDate - 开始日期
 * @param {Date | string | number} endDate - 结束日期
 * @returns {number} 天数差
 */
export const getDaysDiff = (
  startDate: Date | string | number,
  endDate: Date | string | number
): number => {
  return dayjs(endDate).diff(dayjs(startDate), 'day');
};

/**
 * 数组分块
 * @param {T[]} array - 要分块的数组
 * @param {number} size - 每个块的大小
 * @returns {T[][]} 分块后的二维数组
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return chunk(array, size);
};

/**
 * 数组差集
 * @param {T[]} arr1 - 第一个数组
 * @param {T[]} arr2 - 第二个数组
 * @returns {T[]} 差集数组
 */
export const getDifference = <T>(arr1: T[], arr2: T[]): T[] => {
  return difference(arr1, arr2);
};

/**
 * 分组数组对象
 * @param {T[]} array - 要分组的数组对象
 * @param {K} key - 分组的键
 * @returns {Record<string, T[]>} 分组后的对象
 */
export const groupBy = <T extends Record<string, unknown>, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> => {
  return array.reduce((result: Record<string, T[]>, item: T) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};
