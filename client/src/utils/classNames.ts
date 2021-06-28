export const getClassNames = (arr: any[]) => {
	return arr.reduce((prev, curr) => {
		if (curr === undefined) return prev;
		if (typeof curr === 'string') return [...prev, curr];
		if (curr.length) {
			if (curr[0]) return [...prev, curr[1]];
			else return prev;
		}
	}, []).join(' ')
}
