import { h, FunctionalComponent, Fragment } from 'preact';
import Aside from '~components/layouts/Aside';
import Header from '~components/partials/Header';


const PageContainer: FunctionalComponent = ({ children }) => {
	return (
		<Fragment>
			<Header />
			<Aside class='hide-tablet'>

			</Aside>
			<main style={{ paddingLeft: '250px' }}>
				{children}
			</main>
		</Fragment>
	)
}

export default PageContainer;
