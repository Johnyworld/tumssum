import { h, FunctionalComponent } from 'preact';
import './DashboardContainer.scss';

export interface DashboardContainerProps {

}

const DashboardContainer: FunctionalComponent<DashboardContainerProps> = ({ children }) => {
	return (
		<div class='page-container'>
			{children}
		</div>
	)
}

export default DashboardContainer;
