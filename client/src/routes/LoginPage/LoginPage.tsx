import { h, FunctionalComponent, Fragment } from 'preact';
import useInput from '~hooks/useInput';
import { useTranslation } from 'preact-i18next';
import axios from 'axios';
import { useState } from 'preact/hooks';
import { getQueryObj } from '~utils/location';
import { Link } from 'preact-router';
import Card from '~components/elements/Card';
import Button from '~components/elements/Button';
import Input from '~components/elements/Input';
import AuthLogo from '~components/items/AuthLogo';
import SocialLogin from '~features/socialLogin/SocialLogin';


const LoginPage: FunctionalComponent = () => {
	const queryObj = getQueryObj<{ email: string }>();
  const { t } = useTranslation();
  const [ email, changeEmail, setEmail ] = useInput(queryObj.email || '');
  const [ code, setCode ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ( !loading ) {
      setLoading(true);
      axios.get(`/api/login/send?email=${email}`).then((res: any) => {
        if ( res.ok === true ) {
          setEmail('');
          setCode(res.code);
          setLoading(false);
        } else {
          setCode(res.code);
          setLoading(false);
        }
      }).catch(res => {
        setCode(res.code);
        setLoading(false);
      })
    }
  }

  return (
    <form class='page-login t-center wrap wrap-narrow' onSubmit={handleSubmit}>
      <AuthLogo />
      <div class='mv-big gap-regular'>
        <h3 class='c-pencel'>로그인</h3>
        <Card class='gap-regular'>
          <Input name='email' value={email} onChange={changeEmail} label='이메일' placeholder='이메일을 입력하세요...' fluid type='email' />
          <Button fluid disabled={loading} type='submit'>login</Button>
          {code && <p class={`c-${code.includes('ERR') ? 'red' : 'green'}`}>{t(code)}</p>}
        </Card>
        <Card class='gap-regular'>
          <Link href='/register'>회원가입</Link>
        </Card>
      </div>

      <SocialLogin disabled={loading} setLoading={setLoading} /> 

    </form>
  )
}

export default LoginPage;