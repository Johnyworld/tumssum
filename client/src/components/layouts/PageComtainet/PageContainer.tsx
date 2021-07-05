import { h, FunctionalComponent, Fragment } from 'preact';
import Logo from '~components/elements/Logo';
import NavigationMenu from '~components/items/NavigationMenu';
import Aside from '~components/layouts/Aside';
import Header from '~components/partials/Header';
import { getCalendar } from '~hooks/useCalendar';
import './PageContainer.scss';


const PageContainer: FunctionalComponent = ({ children }) => {

	const path = window.location.pathname.split('/')[1] || 'home';

	console.log('===== Calendar', getCalendar(2021, 6));

	return (
		<Fragment>
			<Header />
			<Aside class='hide-tablet p-big'>
				<Logo />
				<NavigationMenu
					class='mv-large'
					selected={path}
					list={[
						{ id: 'home', text: 'Home', icon: 'home' },
						{ id: 'budget', text: 'Budget', icon: 'card' },
						{ id: 'category', text: 'Category', icon: 'menu' },
						{ id: 'bank', text: 'Bank', icon: 'storage' },
					]}
				/>
			</Aside>
			<main class='page-container'>
				{children}
			</main>
		</Fragment>
	)
}

export default PageContainer;
