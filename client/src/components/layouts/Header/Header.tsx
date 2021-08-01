import { h, FunctionalComponent } from 'preact';
import './Header.scss';

interface Props {

}

const Header: FunctionalComponent<Props> = ({ children }) => {
	return (
		<header class='header'>
			{children}
		</header>
	)
}

export default Header;
