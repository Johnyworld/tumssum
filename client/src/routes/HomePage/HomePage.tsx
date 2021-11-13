import { h, FunctionalComponent } from 'preact';
import MonthSelector from '~components/molecules/MonthSelector';
import Header from '~components/layouts/Header';
import Button from '~components/atoms/Button';
import Calendar from '~components/molecules/Calendar';
import CategoryBoard from '~components/molecules/CategoryBoard';
import NavigationMenu from '~components/molecules/NavigationMenu';
import Modal from '~components/layouts/Modal';
import AccountFormModal from '~components/organisms/AccountFormModal';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { changeMonthNext, changeMonthPrev, changeMonthToday } from '~stores/dateSlice';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { IconType } from 'types';
import useAccount from '~hooks/useAccount';
import useDrag from '~hooks/useDrag';
import { combineCategoriesWithBudgets, combineCategoriesWithGroups } from '~routes/CategoryPage/CategoryPage';
import AccountList from '~components/organisms/AccountList';
import { combineBanksWithGroups } from '~routes/BankPage/BankPage';
import useSaperatedValues from '~hooks/useSaperatedValues';
import useResizeSide from '~hooks/useResizeSide';
import IconText from '~components/molecules/IconText';
import Statistics from './Statistics';
import Card from '~components/atoms/Card';
import useToggle from '~hooks/useToggle';
import AccountTSVModal from '~components/organisms/AccountTSVModal/AccountTSVModal';
import AccountPickerModal from '~components/organisms/AccountPickerModal';


const MENUS = [
	{ id: 'calendar', text: 'Calendar', icon: 'calendar' as IconType  },
	{ id: 'category', text: 'Category', icon: 'category' as IconType },
	{ id: 'list', text: 'List', icon: 'menu' as IconType },
];

const HomePage: FunctionalComponent = ({  }) => {

	const currentDate = useSelector(state=> state.date.currentDate);
	const accounts = useSelector(state=> state.account.accounts);
	const { categories, categoryGroups } = useSelector(state=> state.category);
	const { banks, bankGroups } = useSelector(state=> state.bank);
	const { monthes } = useSelector(state=> state.month);
	const { budgets } = useSelector(state=> state.budget);
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const accountsThisMonth = useMemo(() => accounts.filter(account => account.datetime.substr(0, 7) === currentDate.substr(0, 7)), [accounts, currentDate]);

	const [view, setView] = useState(localStorage.getItem('home_view') || 'calendar');
	const handleChangeView = (newView: string) => {
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

	// console.table(uploadingAccounts);

	const categoriesCombined = useMemo(() => combineCategoriesWithGroups(categories, categoryGroups), [categories, categoryGroups]);
	const categoriesCombinedWithBudgets = useMemo(() => combineCategoriesWithBudgets(categoriesCombined, budgets, currentDate), [categoriesCombined, budgets, currentDate]);
	const banksCombined = useMemo(() => combineBanksWithGroups(banks, bankGroups), [banks, bankGroups]);

	const {
		grabbing,
		grabbingPos,
		handleGrap,
		handleDrop,
		handleDragging,
	} = useDrag(accounts);

	const {
		borderRef,
		sideWidth,
		handleBorderMouseDown,
		handleContainerMouseUp,
		handleContainerDrag,
	} = useResizeSide();

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
	}, [view]);

	useEffect(() => {
		if (inputRef.current && isOpenCreateModal) {
			inputRef.current.focus();
		}
	}, [inputRef.current, isOpenCreateModal]);

	return (
		<main class='home-page' onMouseUp={handleContainerMouseUp} onMouseLeave={handleContainerMouseUp} onMouseMove={handleContainerDrag}>

			<Header>
				<MonthSelector
					date={currentDate}
					onPrev={() => dispatch(changeMonthPrev())}
					onNext={() => dispatch(changeMonthNext())}
				/>
			</Header>

			<div class='home-page__container'>
				<section class='home-page__content'>
					<Card style={{ paddingBottom: '1rem' }} padding='none' class='overflow-hidden'>
						<div class='flex p-regular'>
							<NavigationMenu
								selected={view}
								onChange={handleChangeView}
								list={MENUS}
							/>
							<div class='flex gap-regular'>
								<IconText text='Download' icon='download' isHideTextForMobile onClick={toggleTSVModal.handleOn} />
								{/* <p class='pointer' onClick={() => dispatch(changeMonthToday())} >Today</p> */}
								<Button class='hide-mobile' size='small' onClick={handleOpenCreateModal} children='+ 새로 추가' />
							</div>
						</div>

						{ view === 'calendar' &&
							<Calendar
								date={currentDate}
								data={accounts}
								grabbing={grabbing}
								grabbingPos={grabbingPos}
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
								data={accountsThisMonth}
								grabbing={grabbing}
								grabbingPos={grabbingPos}
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
								list={accountsThisMonth}
								categoriesCombined={categoriesCombined}
								banksCombined={banksCombined}
								onChange={handlePatchAccount}
								onClickEdit={handleSelectItem}
							/>
						}
					</Card>
				</section>

				<section class='home-page__side never-drag' style={{ minWidth: sideWidth }}>
					<div class='home-page__side-inner gap-mv-small' >
						<Statistics
							date={currentDate}
							accounts={accountsThisMonth}
							categoriesCombined={categoriesCombinedWithBudgets}
							banksCombined={banksCombined}
							monthes={monthes}
						/>
					</div>
					<div ref={borderRef} class='home-page__side-border' onMouseDown={handleBorderMouseDown} />
				</section>
			</div>



			<Modal
				isOpen={isOpenCreateModal}
				onClose={handleCloseCreateModal}
				children={
					<AccountFormModal
						currentDate={currentDate}
						initialValues={initialValuesForCreate}
						categoriesCombined={categoriesCombined}
						banksCombined={banksCombined}
						onConfirm={handleCreateAccount}
					/>
				}
			/>

			<Modal
				isOpen={!!selectedItem}
				onClose={handleClearSelectedItem}
				children={
					<AccountFormModal
						currentDate={currentDate}
						initialValues={selectedItem!}
						categoriesCombined={categoriesCombined}
						banksCombined={banksCombined}
						onConfirm={handleUpdateAccount}
						onDelete={handleDeleteAccount}
					/>
				}
			/>

			<Modal
				isOpen={toggleTSVModal.checked}
				onClose={toggleTSVModal.handleOff}
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
				onClose={resetUploading}
				children={
					<AccountPickerModal
						accounts={uploadingAccounts}
						onSubmit={handleCreateAccounts}
					/>
				}
			/>

		</main>
	)
}

export default HomePage;

