import { h, FunctionalComponent } from 'preact';
import { version } from '../../../../package.json';
import './VersionText.scss';


const VersionText: FunctionalComponent = ({  }) => {
	return (
		<a class='version-text' target='_blank' href='https://github.com/Johnyworld/tumssum/blob/master/CHANGELOG.md'>
			Version. {version}
		</a>
	)
}

export default VersionText;
