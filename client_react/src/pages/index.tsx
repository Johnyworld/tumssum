import React, { useState } from 'react';
import ContentText from '~/components/atoms/ContentText';
import GlobalHeader from '~/components/organisms/headers/GlobalHeader';


const IndexPage: React.FC = () => {

	const [ value, setValue ] = useState('');

	return (
		<div>
			<GlobalHeader />
			<ContentText
				value={value}
				placeholder='Hello world'
				onChange={setValue}
			/>
		</div>
	)
}

export default IndexPage;
