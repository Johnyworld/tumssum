import { useCallback, useState } from 'react';
import { IconMenuItemType } from 'types';
import CustomLocalStorage from '~/utils/CustomLocalStorage';

const customLocalStorage = new CustomLocalStorage();

const useAccountManagerMenu = () => {
  const [selected, setSelected] = useState(customLocalStorage.getAccountManagerMenu() || 'calendar');

  const list: IconMenuItemType[] = [
    { id: 'calendar', text: 'Calendar', icon: 'calendar' },
    { id: 'category', text: 'Category', icon: 'category' },
    { id: 'list', text: 'List', icon: 'menu' },
  ];

  const onSelect = useCallback((select: string) => {
    setSelected(select);
    customLocalStorage.setAccountManagerMenu(select);
  }, []);

  return {
    list,
    selected,
    onSelect,
  };
};

export default useAccountManagerMenu;
