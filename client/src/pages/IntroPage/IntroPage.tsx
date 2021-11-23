import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';

const IntroPage: FunctionalComponent = () => {
  return (
    <div>
      <h1>IntroPage</h1>
      <p>This is the IntroPage component.</p>
      <Link style={{ padding: '4px 0', display: 'inline-block', marginRight: '4px' }} href='/register'>Register</Link>
      <Link style={{ padding: '4px 0', display: 'inline-block' }} href='/login'>Login</Link>
    </div>
  );
};

export default IntroPage;
