
/**
 * 원의 지름과 각도만 알고 있는 상태에서 원하는 지점의 좌표를 구합니다.
 */
export const getLocationFromRangeAndAngle = (dir: number, range: number) => {
  const degPi = dir * (Math.PI / 180);
  const x = range * Math.sin(degPi);
  const y = range * Math.cos(degPi);
  return { x, y: -y };
}

export default {
	getLocationFromRangeAndAngle,
}