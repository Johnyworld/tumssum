import { h, FunctionalComponent, Fragment } from 'preact';
import Logo from '~components/elements/Logo';
import NavigationMenu from '~components/items/NavigationMenu';
import Aside from '~components/layouts/Aside';
import Header from '~components/partials/Header';
import './PageContainer.scss';


const PageContainer: FunctionalComponent = ({ children }) => {

	const path = window.location.pathname.split('/')[1] || 'home';

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
						{ id: 'budget', text: 'Budget', icon: 'home' },
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
