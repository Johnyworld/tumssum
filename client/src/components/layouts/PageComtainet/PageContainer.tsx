import { h, FunctionalComponent, Fragment } from 'preact';
import Logo from '~components/elements/Logo';
import Aside from '~components/layouts/Aside';
import Header from '~components/partials/Header';
import './PageContainer.scss';


const PageContainer: FunctionalComponent = ({ children }) => {
	return (
		<Fragment>
			<Header />
			<Aside class='hide-tablet p-big'>
				<Logo />

			</Aside>
			<main class='page-container'>
				{children}
			</main>
		</Fragment>
	)
}

export default PageContainer;
