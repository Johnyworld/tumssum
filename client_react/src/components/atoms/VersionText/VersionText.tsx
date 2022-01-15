import packageInfo from '../../../../package.json';
import './VersionText.scss';


const VersionText: React.FC = () => {
	return (
		<a className='version-text' target='_blank' href='https://github.com/Johnyworld/tumssum/blob/master/CHANGELOG.md'>
			Version. {packageInfo.version}
		</a>
	)
}

export default VersionText;
