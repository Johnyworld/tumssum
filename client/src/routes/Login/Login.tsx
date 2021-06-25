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
    <form onSubmit={handleSubmit}>
			<Link style={{ padding: '4px 0', display: 'inline-block', marginRight: '4px' }} href='/'>Home</Link>
      { userInfo
        ? <button disabled={loading} type='submit'>logout</button>
        : <Fragment>
            <input value={email} onChange={changeEmail} ></input>
            <button disabled={loading} type='submit'>login</button>
            <KakaoLogin disabled={loading} setLoading={setLoading} />
            <GoogleLogin disabled={loading} setLoading={setLoading} />
          </Fragment>
      }
      {loading && <p>Loading...</p>}
      {error && <p>{t(error)}</p>}
      {sent && <p>{'이메일을 전송했습니다.'}</p>}
    </form>
  )
}

export default Login;