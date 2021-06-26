import { h, FunctionalComponent, Fragment } from 'preact';
import useInput from '~hooks/useInput';
import { useTranslation } from 'preact-i18next';
import axios from 'axios';
import { useState } from 'preact/hooks';
import KakaoLogin from '~features/socialLogin/KakaoLogin';
import GoogleLogin from '~features/socialLogin/GoogleLogin';
import { getQueryObj } from '~utils/location';
import { Link, route } from 'preact-router';
import Card from '~components/elements/Card';
import Button from '~components/elements/Button';
import Input from '~components/elements/Input';
import AuthLogo from '~components/items/AuthLogo';


const Login: FunctionalComponent = () => {
	const queryObj = getQueryObj<{ email: string }>();
  const { t } = useTranslation();
  const [ email, changeEmail, setEmail ] = useInput(queryObj.email || '');
  const [ sent, setSent ] = useState(false);
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ( !loading ) {
      setLoading(true);
      axios.get(`/api/login/send?email=${email}`).then(res => {
        if ( res.status === 200 ) {
          setSent(true);
          setEmail('');
          setError('');
          setLoading(false);
        } else {
          setSent(false);
          setError('error_user_does_not_exists');
          setLoading(false);
        }
      }).catch(res => {
        setSent(false);
        setLoading(false);
      })
    }
  }

  return (
    <form class='page-login t-center wrap wrap-narrow' onSubmit={handleSubmit}>
      <AuthLogo />
      <div class='mv-big gap-regular'>
        <h2 class='c-pencel'>로그인</h2>
        <Card class='gap-regular'>
          <Fragment>
            <Input name='email' value={email} onChange={changeEmail} label='이메일' placeholder='이메일을 입력하세요...' fluid type='email' />
            <Button fluid disabled={loading} type='submit'>login</Button>
          </Fragment>
        </Card>
        <Card class='gap-regular'>
          <Link href='/register'>회원가입</Link>
        </Card>
      </div>

      <div class='gap-small'>
        <KakaoLogin disabled={loading} setLoading={setLoading} />
        <GoogleLogin disabled={loading} setLoading={setLoading} />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{t(error)}</p>}
      {sent && <p>{'이메일을 전송했습니다.'}</p>}
    </form>
  )
}

export default Login;