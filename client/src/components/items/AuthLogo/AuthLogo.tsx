import { h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router';


const AuthLogo: FunctionalComponent = () => {
	return (
		<div>
			<Link href='/'>
				<h1 class='c-primary f-italic t-center'>tumssum</h1>
			</Link>
			<p class='c-gray t-center'>직접 쓰는 가계부</p>
		</div>
	)
}

export default AuthLogo;
