import React, { useCallback } from 'react';
import { Account, BankTree, CategoryTree } from 'types';
import ContentDate from '~/components/atoms/ContentDate';
import ContentDropdown from '~/components/atoms/ContentDropdown';
import ContentNumber from '~/components/atoms/ContentNumber';
import ContentText from '~/components/atoms/ContentText';
import ContentTime from '~/components/atoms/ContentTime';
import CustomDate from '~/utils/CustomDate';

export interface AccountListItemProps {
  index: number;
  account: Account;
  categoryTree: CategoryTree;
  bankTree: BankTree;
  onChange: (account: Account) => void;
}

const AccountListItem: React.FC<AccountListItemProps> = ({
  index,
  account: accountData,
  categoryTree,
  bankTree,
  onChange,
}) => {
  const { id, title, account, datetime, category, bank } = accountData;
  const customDate = new CustomDate(datetime);

  const handleChange = useCallback(
    (dataKey: keyof Account, isNumber?: boolean) => (value: string | number) => {
      onChange({ id, [dataKey]: isNumber ? +value : value } as any);
    },
    [id, onChange]
  );

  const handleChangeDate = useCallback(
    (value: string) => {
      const [_, time] = datetime.split('T');
      handleChange('datetime')(time ? `${value}T${time}` : value);
    },
    [datetime, handleChange]
  );

  const handleChangeTime = useCallback(
    (value: string) => {
      const [date] = datetime.split('T');
      handleChange('datetime')(`${date}T${value}`);
    },
    [datetime, handleChange]
  );

  return (
    <tr>
      <td className='t-center'>{index + 1}</td>
      <td>{<ContentDate yyyymmdd={customDate.getLocalYYYYMMDD()} placeholder='비어있음' onChange={handleChangeDate} />}</td>
      <td>
        {
          <ContentTime
            time={customDate.getLocalHHmm()}
            placeholder='비어있음'
            onChange={handleChangeTime}
          />
        }
      </td>
      <td>{<ContentText value={title} placeholder='비어있음' onChange={handleChange('title')} isChangeOnBlur />}</td>
      <td className='t-right'>
        {
          <ContentNumber
            value={account || 0}
            placeholder='0'
            onChange={handleChange('account', true)}
            isHideIcon
            isChangeOnBlur
          />
        }
      </td>
      <td>
        <ContentDropdown
          list={[
            { id: 0, text: '미분류' },
            ...categoryTree.map(group => ({
              id: group.id,
              text: group.title || '이름 없음',
              children: group.items?.map(category => ({ id: category.id, text: category.title || '이름 없음' })),
            })),
          ]}
          selected={category || ''}
          onSelect={handleChange('category', true)}
        />
      </td>
      <td>
        <ContentDropdown
          list={[
            { id: 0, text: '미분류' },
            ...bankTree.map(group => ({
              id: group.id,
              text: group.title || '이름 없음',
              children: group.items?.map(bank => ({ id: bank.id, text: bank.title || '이름 없음' })),
            })),
          ]}
          selected={bank || ''}
          onSelect={handleChange('bank', true)}
        />
      </td>
    </tr>
  );
};

export default AccountListItem;
