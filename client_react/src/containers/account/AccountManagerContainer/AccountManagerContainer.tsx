import React, { useMemo } from 'react';
import { BankTree, CategoryTree } from 'types';
import Button from '~/components/atoms/Button';
import IconMenu from '~/components/molecules/menus/IconMenu';
import AccountFormModal from '~/components/organisms/account/AccountFormModal';
import AccountList from '~/components/organisms/account/AccountList';
import Calendar from '~/components/organisms/calendar/Calendar';
import Modal from '~/components/organisms/modals/Modal';
import useAccountForm from '~/hooks/account/useAccountForm';
import useAccountManagerMenu from '~/hooks/account/useAccountManagerMenu';
import CalendarBase from '~/utils/CalendarBase';
import { useSelector } from '~/utils/reduxHooks';
import './AccountManagerContainer.scss';

interface Props {
  categoryTree: CategoryTree;
  bankTree: BankTree;
}

const AccountManagerContainer: React.FC<Props> = ({ categoryTree, bankTree }) => {
  const yyyymm = useSelector(state => state.calendar.yyyymm);
  const accounts = useSelector(state => state.account.accounts);

  const accountForm = useAccountForm();

  const accountManagerMenu = useAccountManagerMenu();
  const calendarBase = useMemo(() => new CalendarBase(yyyymm, accounts).getCalendar(), [yyyymm, accounts]);

  return (
    <div className='account-manager-container'>
      <div className='account-manager-container__topbar'>
        <IconMenu
          list={accountManagerMenu.list}
          selected={accountManagerMenu.selected}
          onSelect={accountManagerMenu.onSelect}
        />
        <Button size='small' onClick={accountForm.onOpenModal}>
          + 새로 추가
        </Button>
      </div>

      {accountManagerMenu.selected === 'calendar' && (
        <Calendar weeks={calendarBase} onClickAccount={accountForm.onSelect} onDrop={accountForm.onPatch} />
      )}

      {accountManagerMenu.selected === 'list' && (
        <AccountList
          accounts={accounts}
          categoryTree={categoryTree}
          bankTree={bankTree}
          onChange={accountForm.onPatch}
        />
      )}

      <Modal
        isOpen={accountForm.isOpenModal}
        onClose={accountForm.onCloseModal}
        children={
          <AccountFormModal
            categoryTree={categoryTree}
            bankTree={bankTree}
            isUpdating={accountForm.isUpdating}
            initAccount={accountForm.selected}
            onSubmit={accountForm.onSubmit}
            onDelete={accountForm.onDelete}
          />
        }
      />
    </div>
  );
};

export default AccountManagerContainer;
