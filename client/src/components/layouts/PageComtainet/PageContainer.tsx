import { h, FunctionalComponent, Fragment } from 'preact';
import Aside from '~components/layouts/Aside';
import Header from '~components/partials/Header';
import './PageContainer.scss';


const PageContainer: FunctionalComponent = ({ children }) => {
	return (
		<Fragment>
			<Header />
			<Aside class='hide-tablet'>

			</Aside>
			<main class='page-container'>
				{children}
			</main>
		</Fragment>
	)
}

export default PageContainer;
