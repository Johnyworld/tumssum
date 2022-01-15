declare module 'types' {

	interface MenuItem<T> {
		id: T;
		text: string;
		href?: string;
	}

}