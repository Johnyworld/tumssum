import { h, FunctionalComponent } from 'preact';
import Portal from '~components/Portal';
import { useSelector } from '~utils/redux/hooks';
import Dim from '../Dim';

interface Props {

}

const FullLoader: FunctionalComponent<Props> = ({  }) => {

  const fullLoading = useSelector(state=> state.mode.fullLoading);

	return (
		!fullLoading ? null :
			<Portal>
				<Dim>
					<p class='position-center'>Loading...</p>
				</Dim>
			</Portal>
	)
}

export default FullLoader;
