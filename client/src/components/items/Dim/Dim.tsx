import { h, FunctionalComponent } from 'preact';
import './Dim.scss';

interface Props {

}

const Dim: FunctionalComponent<Props> = ({ children }) => {
	return (
		<div class='dim'>
			{children}
		</div>
	)
}

export default Dim;
