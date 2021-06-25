import { h, FunctionalComponent, Fragment } from 'preact';
import { useSelector, useDispatch } from '~utils/redux/hooks'
import useInput from '~hooks/useInput';
import { logout } from '~features/user/userSlice';
import { useTranslation } from 'preact-i18next';
import axios from 'axios';
import { useState } from 'preact/hooks';
import KakaoLogin from '~features/socialLogin/KakaoLogin';
import GoogleLogin from '~features/socialLogin/GoogleLogin';
import { getQueryObj } from '~utils/location';
import { Link } from 'preact-router';
import Card from '~components/elements/Card';
import Button from '~components/elements/Button';


const Login: FunctionalComponent = () => {
	const queryObj = getQueryObj<{ email: string }>();
  const { t } = useTranslation();
  const { userInfo } = useSelector(state=> state.user);
  const [ email, changeEmail, setEmail ] = useInput(queryObj.email || '');
  const dispatch = useDispatch();
  const [ sent, setSent ] = useState(false);
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ( !loading ) {
      if ( userInfo ) {
        dispatch(logout());
  
      } else {
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
  }

  return (
    <form class='page-login text-center wrap narrow' onSubmit={handleSubmit}>
			<Link style={{ padding: '4px 0', display: 'inline-block', marginRight: '4px' }} href='/'>Home</Link>
      <div class='gap-big'>
        <Card class='gap-regular'>
          { userInfo
            ? <Button fluid class='gap-regular' disabled={loading} type='submit'>logout</Button>
            : <Fragment>
                <p>이메일</p>
                <input value={email} onChange={changeEmail} ></input>
                <Button fluid class='gap-regular' disabled={loading} type='submit'>login</Button>
              </Fragment>
          }
        </Card>
        <Card class='gap-regular'>
          <Link href='/register'>가입하기</Link>
        </Card>
      </div>
      <KakaoLogin disabled={loading} setLoading={setLoading} />
      <GoogleLogin disabled={loading} setLoading={setLoading} />
      {loading && <p>Loading...</p>}
      {error && <p>{t(error)}</p>}
      {sent && <p>{'이메일을 전송했습니다.'}</p>}
    </form>
  )
}

export default Login;