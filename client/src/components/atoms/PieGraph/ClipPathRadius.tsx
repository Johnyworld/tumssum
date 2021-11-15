import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import useInterval from '~hooks/useInterval';
import trigonometricFunctions from '~utils/trigonometricFunctions';
import { BASE_RADIUS } from './PieGraph';
import './PieGraph.scss';

const DEG_START = 0.1;
const DEG_MAX = 359.9;
const VEL_MIN = 0.1;
const VEL_START = 20;
const VEL_DRAG = 18;

const ClipPathRadius: FunctionalComponent = () => {

	const [deg, setDeg] = useState(DEG_START);
	const [vel, setVel] = useState(VEL_START);

	const coords = trigonometricFunctions.getLocationFromRangeAndAngle(deg + 90, BASE_RADIUS);

	useInterval(() => {
		const nextValue = deg + vel;
		const nextVel = vel - vel/VEL_DRAG;
		if (nextValue < DEG_MAX) setDeg(nextValue);
		else if (nextValue > DEG_MAX) setDeg(DEG_MAX);
		if (nextVel > VEL_MIN) setVel(nextVel);
		else if (nextVel < VEL_MIN) setVel(VEL_MIN);
	}, 10);

	return (
		<clipPath id='container'>
			<path class='pie-graph__mask' d={`
				M 100 50
				A ${BASE_RADIUS} ${BASE_RADIUS}, 0, ${deg > 180 ? 1 : 0}, 1, ${coords.x + BASE_RADIUS} ${coords.y + BASE_RADIUS}
				L ${BASE_RADIUS} ${BASE_RADIUS}
				`}
			/>
		</clipPath>
	)
}

export default ClipPathRadius;
