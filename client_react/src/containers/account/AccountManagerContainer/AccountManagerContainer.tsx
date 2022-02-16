import React from 'react';
import Button from '~/components/atoms/Button';
import IconMenu from '~/components/molecules/menus/IconMenu';
import Calendar from '~/components/organisms/calendar/Calendar';
import useAccountManagerMenu from '~/hooks/account/useAccountManagerMenu';
import CalendarBase from '~/utils/CalendarBase';
import { useSelector } from '~/utils/reduxHooks';
import './AccountManagerContainer.scss';

const AccountManagerContainer: React.FC = () => {
  const yyyymm = useSelector(state => state.calendar.yyyymm);
  const accounts = useSelector(state => state.account.accounts);

  const accountManagerMenu = useAccountManagerMenu();

  return (
    <div className='account-manager-container'>
      <div className='account-manager-container__topbar'>
        <IconMenu
          list={accountManagerMenu.list}
          selected={accountManagerMenu.selected}
          onSelect={accountManagerMenu.onSelect}
        />
        <Button size='small'>+ 새로 추가</Button>
      </div>
      <Calendar weeks={new CalendarBase(yyyymm, accounts).getCalendar()} />
    </div>
  );
};

export default AccountManagerContainer;
