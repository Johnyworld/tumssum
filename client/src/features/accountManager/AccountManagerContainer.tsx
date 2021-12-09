import { h, FunctionalComponent, Fragment } from 'preact';
import { memo } from 'preact/compat';
import Button from '~components/atoms/Button';
import Calendar from '~components/molecules/Calendar';
import CategoryBoard from '~components/molecules/CategoryBoard';
import NavigationMenu from '~components/molecules/NavigationMenu';
import Modal from '~components/layouts/Modal';
import AccountFormModal from '~components/organisms/AccountFormModal';
import { useSelector } from '~utils/redux/hooks';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { IconType } from 'types';
import useAccount from '~hooks/useAccount';
import useDrag from '~hooks/useDrag';
import { combineCategoriesWithGroups } from '~pages/CategoryPage/CategoryPage';
import AccountList from '~components/organisms/AccountList';
import { combineBanksWithGroups } from '~pages/BankPage/BankPage';
import useSaperatedValues from '~hooks/useSaperatedValues';
import IconText from '~components/molecules/IconText';
import Card from '~components/atoms/Card';
import AccountTSVModal from '~components/organisms/AccountTSVModal/AccountTSVModal';
import AccountPickerModal from '~components/organisms/AccountPickerModal';
import useConfirm from '~hooks/useConfirm';
import { NavigationMenuProps } from '~components/molecules/NavigationMenu/NavigationMenu';
import { NavigationMenuItem } from '~hooks/useNavigationMenu';
import AccountItem from '~components/molecules/AccountItem';

type AccountManagerMenuType = 'calendar' | 'category' | 'list';

const MENUS = [
	{ id: 'calendar', text: 'Calendar', icon: 'calendar' as IconType },
	{ id: 'category', text: 'Category', icon: 'category' as IconType },
	{ id: 'list', text: 'List', icon: 'menu' as IconType },
] as NavigationMenuItem<AccountManagerMenuType>[];

const AccountManagerContainer: FunctionalComponent = ({  }) => {

	const { currentDate } = useSelector(state=> state.date);
	const { accounts } = useSelector(state=> state.account);
	const { categories, categoryGroups } = useSelector(state=> state.category);
	const { banks, bankGroups } = useSelector(state=> state.bank);
	const inputRef = useRef<HTMLInputElement>(null);
	const confirm = useConfirm();

	const accountsThisMonth = useMemo(() => accounts.filter(account => account.datetime.substr(0, 7) === currentDate.substr(0, 7)), [accounts, currentDate]);

	const [view, setView] = useState<AccountManagerMenuType>(localStorage.getItem('home_view') as AccountManagerMenuType || 'calendar');
	const handleChangeView = (newView: AccountManagerMenuType) => {
		localStorage.setItem('home_view', newView);
		setView(newView);
	}

	const {
		toggleTSVModal,
		uploadingAccounts,
		download: downloadCSVfile,
		upload: uploadCSVfile,
		resetUploading,
	} = useSaperatedValues({ fileType: 'CSV', accounts, banks, categories });


	const categoriesCombined = useMemo(() => combineCategoriesWithGroups(categories, categoryGroups), [categories, categoryGroups]);
	const banksCombined = useMemo(() => combineBanksWithGroups(banks, bankGroups), [banks, bankGroups]);

	const {
		grabbing,
		grabbingPos,
		handleGrap,
		handleDrop,
		handleDragging,
	} = useDrag(accounts);

	const { 
		initialValuesForCreate,
		selectedItem,
		handleSelectItem,
		handleClearSelectedItem,
		isOpenCreateModal,
		handleOpenCreateModal,
		handleOpenCreateModalWithDate,
		handleOpenCreateModalWithCategory,
		handleCloseCreateModal,
		handleCreateAccount,
		handleCreateAccounts,
		handleUpdateAccount,
		handlePatchAccount,
		handleDeleteAccount,
		handleDropToUpdateDate,
		handleDropToUpdateCategory
	} = useAccount({
		grabbing,
		handleDrop,
	});

	useEffect(() => {
		if (inputRef.current && isOpenCreateModal) {
			inputRef.current.focus();
		}
	}, [inputRef.current, isOpenCreateModal]);


	const navigationMenuProps: NavigationMenuProps<AccountManagerMenuType> = {
		selected: view,
		onChange: handleChangeView,
		hideText: 'max-mobile',
		list: MENUS,
	}

	return (
		<Fragment>
			<Card style={{ paddingBottom: '1rem' }} padding='none' class='overflow-hidden'>
				<div class='home-page__board'>
					<NavigationMenu {...navigationMenuProps} />
					<div class='flex gap-regular'>
						<IconText text='Download' icon='download' onClick={toggleTSVModal.handleOn} />
						{/* <p class='pointer' onClick={() => dispatch(changeMonthToday())} >Today</p> */}
						<Button class='hide-mobile' size='small' onClick={handleOpenCreateModal} children='+ 새로 추가' />
					</div>
				</div>

				{ view === 'calendar' &&
					<Calendar
						date={currentDate}
						data={accounts}
						banks={banks}
						grabbing={grabbing}
						onGrap={handleGrap}
						onDropToUpdate={handleDropToUpdateDate}
						onDragging={handleDragging}
						onClick={handleSelectItem}
						onClickPlus={handleOpenCreateModalWithDate}
					/>
				}

				{ view === 'category' &&
					<CategoryBoard
						categoriesCombined={categoriesCombined}
						data={accountsThisMonth.filter(item => !item.to)}
						grabbing={grabbing}
						onGrap={handleGrap}
						onDrop={handleDrop}
						onDropToUpdate={handleDropToUpdateCategory}
						onDragging={handleDragging}
						onClick={handleSelectItem}
						onClickPlus={handleOpenCreateModalWithCategory}
					/>
				}

				{ view === 'list' &&
					<AccountList
						list={accountsThisMonth.filter(item => !item.to)}
						categoriesCombined={categoriesCombined}
						banksCombined={banksCombined}
						onChange={handlePatchAccount}
						onClickEdit={handleSelectItem}
					/>
				}
			</Card>

			{ grabbing && grabbingPos &&
				<AccountItem
					data={grabbing.data}
					banks={banks}
					class='calendar__grabbing'
					style={{ left: grabbingPos.x, top: grabbingPos.y, width: grabbing.width, height: grabbing.height }} 
				/>
			}

			<Modal
				isOpen={isOpenCreateModal}
				children={
					<AccountFormModal
						currentDate={currentDate}
						initialValues={initialValuesForCreate}
						isCreateMode
						categoriesCombined={categoriesCombined}
						banksCombined={banksCombined}
						confirm={confirm}
						onConfirm={handleCreateAccount}
						onClose={handleCloseCreateModal}
					/>
				}
			/>

			<Modal
				isOpen={!!selectedItem}
				children={
					<AccountFormModal
						currentDate={currentDate}
						initialValues={selectedItem!}
						categoriesCombined={categoriesCombined}
						banksCombined={banksCombined}
						confirm={confirm}
						onConfirm={handleUpdateAccount}
						onDelete={handleDeleteAccount}
						onClose={handleClearSelectedItem}
					/>
				}
			/>

			<Modal
				isOpen={toggleTSVModal.checked}
				children={
					<AccountTSVModal
						onDownload={() => downloadCSVfile('CSV')}
						onUpload={uploadCSVfile}
						onClose={toggleTSVModal.handleOff}
					/>
				}
			/>

			<Modal
				isOpen={!!uploadingAccounts.length}
				children={
					<AccountPickerModal
						accounts={uploadingAccounts}
						onSubmit={handleCreateAccounts}
						onClose={resetUploading}
					/>
				}
			/>

		</Fragment>
	)
}

export default memo(AccountManagerContainer);

