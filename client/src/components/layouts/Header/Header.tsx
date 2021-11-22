import { h, FunctionalComponent } from 'preact';
import './Header.scss';


export interface HeaderProps {
	title?: string;
}


const Header: FunctionalComponent<HeaderProps> = ({ title, children }) => {

	return (
		<header class='header'>
			{/* <div class='header__hamburger'>
				<Icon as='calendar' />
			</div> */}
			{ title && <h2 class='header__title'>{title}</h2> }
			{children}
		</header>
	)
}

export default Header;
