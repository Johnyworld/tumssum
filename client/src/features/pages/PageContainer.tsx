import { h, FunctionalComponent, Fragment } from 'preact';
import Aside from '~components/layouts/Aside';


const PageContainer: FunctionalComponent = ({ children }) => {
	return (
		<Fragment>
			<Aside />
			<main style={{ paddingLeft: '250px' }}>
				{children}
			</main>
		</Fragment>
	)
}

export default PageContainer;
