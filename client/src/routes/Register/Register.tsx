import axios from 'axios';
import { h } from 'preact';
import { Link, route } from 'preact-router';
import { useState } from 'preact/hooks';
import Button from '~components/elements/Button';
import Card from '~components/elements/Card';
import Input from '~components/elements/Input';
import AuthLogo from '~components/items/AuthLogo';
import SocialLogin from '~features/socialLogin/SocialLogin';
import useInput from '~hooks/useInput';


const Register = () => {

  const [ name, changeName ] = useInput('');
  const [ email, changeEmail ] = useInput('');
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ( !loading ) {
      setLoading(true);
      axios.post('/api/register/', { name, email }).then(res => {
        alert('회원 가입 완료!')
        route(`/login?email=${email}`);
        setLoading(false);
      }).catch(err => {
        setError(err);
        setLoading(false);
      })
    }
  }

  return (
    <form class='page-register t-center wrap wrap-narrow' onSubmit={handleSubmit}>
      <AuthLogo />
      <div class='gap-regular mv-big'>
        <h3 class='c-pencel'>회원가입</h3>
        <Card class='gap-regular'>
          <Input name='name' value={name} onChange={changeName} label='이름' placeholder='이름을 입력하세요...' fluid />
          <Input name='email' value={email} onChange={changeEmail} label='이메일' placeholder='이메일을 입력하세요...' fluid type='email' />
          <Button fluid type='submit' children='Submit' />
        </Card>
        <Card class='gap-regular'>
          <Link href='/login'>로그인</Link>
        </Card>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <SocialLogin disabled={loading} setLoading={setLoading} /> 

    </form>
  )
}

export default Register;
