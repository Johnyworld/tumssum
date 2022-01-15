import React from 'react';
import Icon from '~/components/atoms/Icon';
import { IconProps } from '~/components/atoms/Icon/Icon';
import { c } from '~/utils/classNames';
import './IconArea.scss';

export interface IconAreaProps extends IconProps {
	areaSize?: string;
}

/**
 * ### 아이콘 주변에 투명한 정사각형 영역을 부여합니다.
 * - `areaSize`: 정사각형 영역의 너비를 string으로 입력합니다. ex) `48px`, `3rem`, `var(--header-height)`
 */
const IconArea: React.FC<IconAreaProps> = ({ className, style, areaSize='48px', onClick, ...props }) => {
	return (
		<div className={c('icon-area', className, [!!onClick, '&--clickable'])} style={{ ...style, width: areaSize, height: areaSize }} onClick={onClick}>
			<Icon {...props} />
		</div>
	)
}

export default IconArea;
