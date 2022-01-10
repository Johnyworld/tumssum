import React from 'react';
import Logo from '~/components/atoms/Logo';
import './LogoSlogan.scss';

export interface LogoSloganProps {
	logoHref: string;
}

const LogoSlogan: React.FC<LogoSloganProps> = ({ logoHref }) => {
	return (
		<div className='logo-slogan'>
			<Logo href={logoHref} />
			<p className='logo-slogan__slogan'>직접 쓰는 가계부</p>
		</div>
	)
}

export default LogoSlogan;
