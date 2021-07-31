import { h, FunctionalComponent } from 'preact';
import Aside from '~components/layouts/Aside';
import PageContainer from '~components/layouts/PageComtainet/PageContainer';
import MonthlyCalendar from '~features/month/MonthlyCalendar';

const HomePage: FunctionalComponent = ({  }) => {
	return (
		<PageContainer>
			<div class='home-page'>
				<div class='home-page-contents'>
					<MonthlyCalendar />
				</div>
				<Aside class='hide-desktop' alignRight wide />
			</div>
		</PageContainer>
	)
}

export default HomePage;
