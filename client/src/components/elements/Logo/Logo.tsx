import { h, FunctionalComponent } from 'preact';
import './Logo.scss';

export interface LogoProps {

}

const Logo: FunctionalComponent<LogoProps> = ({  }) => {
	return (
		<p class='logo'>
			tumssum
		</p>
	)
}

export default Logo;
