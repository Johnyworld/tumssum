import { h, FunctionalComponent } from 'preact';
import AccountManagerContainer from '~features/accountManager';
import MonthSelectorContainer from '~features/monthSelector';
import StatisticsContainer from '~features/statistics';
import useResizeSide from '~hooks/useResizeSide';
import './HomePage.scss';

const HomePage: FunctionalComponent = () => {

	const {
		borderRef,
		sideWidth,
		handleBorderMouseDown,
		handleContainerMouseUp,
		handleContainerDrag,
	} = useResizeSide();

	return (
		<main class='home-page' onMouseUp={handleContainerMouseUp} onMouseLeave={handleContainerMouseUp} onMouseMove={handleContainerDrag}>
			<MonthSelectorContainer />

			<div class='home-page__container'>
				<section class='home-page__content'>
					<AccountManagerContainer />
				</section>

				<section class='home-page__side never-drag' style={{ minWidth: sideWidth }}>
					<div class='home-page__side-inner gap-mv-small' >
						<StatisticsContainer />
					</div>
					<div ref={borderRef} class='home-page__side-border' onMouseDown={handleBorderMouseDown} />
				</section>
			</div>
		</main>
	)
}

export default HomePage;

