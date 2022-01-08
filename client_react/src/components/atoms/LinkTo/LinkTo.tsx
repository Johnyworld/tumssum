import React from 'react';
import { Link } from 'react-router-dom';
import { c } from '~/utils/classNames';
import './LinkTo.scss';

export interface LinkToProps {
	to?: string;
	underline?: boolean;
}

/**
 * #### 외부링크 또는 앱 내부 링크를 자동으로 라우팅 해주는 컴포넌트 입니다.
 * - **to** props에 `http` 단어가 포함 된 경우, 외부 링크로 인식합니다.
 * - `/profile`과 같이 라우팅만 해주는 경우 react-router-dom의 `<Link />` 컴포넌트와 똑같이 동작합니다.
 */
const LinkTo: React.FC<LinkToProps> = ({ children, to, underline }) => {

	const isExternal = to?.includes('http');

	const classNames = c(
		'link-to',
		[underline, '&--underline'],
	)

	return (
		!to
		? <a className={classNames}>
				{children}
			</a>
		: isExternal
		? <a className={classNames} href={to} target='_blank'>
				{children}
			</a>
		: <Link className={classNames} to={to}>
				{children}
			</Link>
	)
}

export default LinkTo;
