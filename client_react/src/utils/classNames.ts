const replaceDefaultClassName = (defaultClassName: string, str: string) => {
	if (str[0] !== '&') return str;
	return str.replace('&', defaultClassName);
}

export const c = (...arr: any[]) => {
	const defaultClassName = arr[0];
	return arr.reduce((prev, curr) => {
		if (curr === undefined) return prev;
		if (typeof curr === 'string') return [...prev, replaceDefaultClassName(defaultClassName, curr)];
		if (curr.length) {
			if (!!curr[0]) return [...prev, replaceDefaultClassName(defaultClassName, curr[1])];
			else return prev;
		}
	}, []).join(' ')
}
