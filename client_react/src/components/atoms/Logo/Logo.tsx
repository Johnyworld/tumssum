import React from 'react';
import { ThreeSize } from 'types';
import { c } from '~/utils/classNames';
import LinkTo from '../LinkTo';
import './Logo.scss';

export interface LogoProps {
	href: string;
	size?: ThreeSize;
}

const Logo: React.FC<LogoProps> = ({ href, size }) => {
	return (
		<LinkTo to={href}>
			<p className={c('logo', [size, `&--${size}`])}>
				tumssum
			</p>
		</LinkTo>
	)
}

export default Logo;
