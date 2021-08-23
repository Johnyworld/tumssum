import { h, FunctionalComponent } from 'preact';
import { DefaultProps } from 'types';
import AsideMenu from '~components/molecules/AsideMenu';
import { AsideMenuItem } from '~components/molecules/AsideMenu/AsideMenu';
import { getClassNames } from '~utils/classNames';
import Indicator from '../../layouts/Indicator';
import './Aside.scss';

interface Props extends DefaultProps {
	path: string;
	gnbMenuList: AsideMenuItem[];
	bottomMenuList: AsideMenuItem[];
	isNarrow?: boolean;
	onToggleAside: () => void;
}

const Aside: FunctionalComponent<Props> = ({ class: className, path, gnbMenuList, bottomMenuList, isNarrow, onToggleAside }) => {
	return (
		<aside
			class={getClassNames(['aside', className, [isNarrow, 'aside--narrow']])}
		>
			<div class='aside__content'>
				<div class='header'>
					<button onClick={onToggleAside}>Test</button>
					{/* <Logo /> */}
				</div>
				<Indicator>

				</Indicator>
				<AsideMenu
					selected={path}
					isOpen={!isNarrow}
					list={gnbMenuList}
				/>
				<div class='aside__bottom'>
					<AsideMenu
						isOpen={!isNarrow}
						list={bottomMenuList}
					/>
				</div>
			</div>
		</aside>
	)
}

export default Aside;
