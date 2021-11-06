import { h, FunctionalComponent } from 'preact';
import Icon from '~components/atoms/Icon';
import './Header.scss';


export interface HeaderProps {
	title?: string;
}


const Header: FunctionalComponent<HeaderProps> = ({ title, children }) => {

	return (
		<header class='header'>
			<div class='header__hamburger'>
				<Icon as='calendar' />
			</div>
			{ title && <h1 class='header__title'>{title}</h1> }
			{children}
		</header>
	)
}

export default Header;
