declare module 'types' {

	interface ValidOption {
		required?: boolean;
		maxLength?: number;
		pattern?: RegExp;
	}
	
	interface RegisterForm extends ValidOption {
		name: string;
		init?: string;
	}

}