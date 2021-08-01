import { h, FunctionalComponent } from 'preact';
import './Header.scss';


const Header: FunctionalComponent = ({ children }) => {
	return (
		<header class='header'>
			{children}
		</header>
	)
}

export default Header;
