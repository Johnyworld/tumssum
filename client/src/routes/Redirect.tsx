import { FunctionalComponent } from 'preact';
import { route } from 'preact-router';

export interface RedirectProps {
	to: string;
}

const Redirect: FunctionalComponent<RedirectProps> = ({ to }) => {
	route(to);
	return null;
}

export default Redirect;
