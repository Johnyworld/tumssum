import { Bank, BankGroup } from 'types';

type BankAligned = { [x: string]: Bank[] };

/**
 * @returns BankTree
 * 그룹 미지정의 Bank[]는 id와 items만 존재하는 { id: 0, items: Bank[] } 로 저장 됩니다.
 */
export const getBankTree = (groups: BankGroup[], banks: Bank[]) => {
  if (groups.length === 0 && banks.length === 0) return [];
  const aligned = getBankAligned(banks);
  const noGroupItems = { id: 0, items: aligned.EMPTY || [] } as BankGroup;
  const bankGroups: BankGroup[] = groups.map((group) => ({ ...group, items: aligned[group.id] || [] }));
  return [...bankGroups, noGroupItems];
};

/**
 * bank_id 로 Bank들을 정렬합니다.
 * @returns {[bank_id]: Bank[]}
 */
export const getBankAligned = (banks: Bank[]) => {
  const results: BankAligned = {};
  for (const item of banks) {
    const key = item.group || 'EMPTY';
    if (!results[key]) results[key] = [];
    results[key].push(item);
  }
  return results;
};

const bankUtil = {
  getBankTree,
};

export default bankUtil;
