import { h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router';
import { c } from '~utils/classNames';
import './Logo.scss';

export interface LogoProps {
	size?: 'regular' | 'large';
	href?: string;
}

const Logo: FunctionalComponent<LogoProps> = ({ size='regular', href }) => {
	const component = <p class={c('logo', [size, `$--${size}`])}>
		tumssum
	</p>;
	return (
		href ? <Link href={href}>{component}</Link> : component
	)
}

export default Logo;
