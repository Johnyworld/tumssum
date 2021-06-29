import { h, FunctionalComponent } from 'preact';
import { getClassNames } from '~utils/classNames';
import './Content.scss';

interface Props {

}

const Content: FunctionalComponent<Props> = ({ children }) => {
	return (
		<div class={getClassNames(['content'])}>
			{children}
		</div>
	)
}

export default Content;
