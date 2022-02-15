import React from 'react';
import IconMenu from '~/components/molecules/menus/IconMenu';
import Calendar from '~/components/organisms/calendar/Calendar';
import CalendarBase from '~/utils/CalendarBase';
import { useSelector } from '~/utils/reduxHooks';

const AccountManagerContainer: React.FC = () => {
  const yyyymm = useSelector(state => state.calendar.yyyymm);
  const accounts = useSelector(state => state.account.accounts);
  return (
    <div>
      <IconMenu
        list={[
          { id: 'calendar', text: 'Calendar', icon: 'calendar' },
          { id: 'category', text: 'Category', icon: 'category' },
          { id: 'list', text: 'List', icon: 'menu' },
        ]}
      />
      <Calendar weeks={new CalendarBase(yyyymm, accounts).getCalendar()} />
    </div>
  );
};

export default AccountManagerContainer;
