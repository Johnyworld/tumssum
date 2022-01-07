export const replaceDefaultClassName = (defaultClassName: string | null, str: string) => {
	if (str[0] !== '&' || !defaultClassName) return str;
	return str.replace('&', defaultClassName);
}

export const c = (...arr: (string | [any, string] | undefined)[]) => {
	const defaultClassName = typeof arr[0] === 'string' ? arr[0] : null;
	return arr.reduce<string[]>((prev, curr) => {
		if (!curr) return prev;
		if (typeof curr === 'string') return [...prev, replaceDefaultClassName(defaultClassName, curr)];
		if (curr.length) {
			if (!!curr[0]) return [...prev, replaceDefaultClassName(defaultClassName, curr[1])];
		}
		return prev;
	}, []).join(' ')
}
