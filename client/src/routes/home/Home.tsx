import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';

const Home: FunctionalComponent = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <Link style={{ padding: '4px 0', display: 'inline-block', marginRight: '4px' }} href='/register'>Register</Link>
      <Link style={{ padding: '4px 0', display: 'inline-block' }} href='/login'>Login</Link>
    </div>
  );
};

export default Home;
