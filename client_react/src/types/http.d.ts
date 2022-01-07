declare module 'types' {
	interface ApiResponse<T> {
		ok: boolean;
		code: number;
		data: T;
		message: string;
	}
}