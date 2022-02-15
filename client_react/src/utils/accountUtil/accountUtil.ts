import { Account } from 'types';

/**
 * 날짜별로 데이터를 정렬합니다.
 * @returns ; {'2022-02-10': [ ... ], '2022-02-11': [ ... ]}
 */
export const getDataAligned = (data: Account[]) => {
  const results: { [x: string]: Account[] } = {};
  for (const item of data) {
    const date = item.datetime.split('T')[0];
    if (!results[date]) results[date] = [];
    results[date].push(item);
  }
  return results;
};

const accountUtil = { getDataAligned };

export default accountUtil;
