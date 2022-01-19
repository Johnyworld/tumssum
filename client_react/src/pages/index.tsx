import React, { useState } from 'react';
import ContentNumber from '~/components/atoms/ContentNumber';
import ContentText from '~/components/atoms/ContentText';
import GlobalHeader from '~/components/organisms/headers/GlobalHeader';


const IndexPage: React.FC = () => {

	const [ value, setValue ] = useState('');
	const [ num, setNum ] = useState(13);

	return (
		<div>
			<GlobalHeader />
			<ContentText
				value={value}
				placeholder='Hello world'
				onChange={setValue}
			/>
			<ContentNumber
				value={num}
				placeholder='Hello world'
				onChange={setNum}
			/>
		</div>
	)
}

export default IndexPage;
