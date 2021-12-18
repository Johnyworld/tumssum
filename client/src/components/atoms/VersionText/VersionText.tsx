import { h, FunctionalComponent } from 'preact';
import { version } from '../../../../package.json';


const VersionText: FunctionalComponent = ({  }) => {
	return (
		<p class='f-small c-gray mv-regular'>Version. {version}</p>
	)
}

export default VersionText;
