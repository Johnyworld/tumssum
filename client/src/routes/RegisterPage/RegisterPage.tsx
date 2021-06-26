import { h } from 'preact';
import { useTranslation } from 'preact-i18next';
import { Link, route } from 'preact-router';
import { useState } from 'preact/hooks';
import Button from '~components/elements/Button';
import Card from '~components/elements/Card';
import Input from '~components/elements/Input';
import AuthLogo from '~components/items/AuthLogo';
import SocialLogin from '~features/socialLogin/SocialLogin';
import useFetch from '~hooks/useFetch';
import useInput from '~hooks/useInput';


const RegisterPage = () => {

  const { t } = useTranslation();
  const [ name, changeName ] = useInput('');
  const [ email, changeEmail ] = useInput('');
  const [ loading, setLoading ] = useState(false); // SNS 로그인 로딩


  const register = useFetch({
    method: 'POST',
    url: '/api/register/',
    onSuccess: () => {
      alert(t('OK_USER_REGISTERED'));
      route(`/login?email=${email}`);
    }
  });


  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ( !loading ) {
      register.call({ name, email });
    }
  }

  return (
    <form class='page-register t-center wrap wrap-narrow' onSubmit={handleSubmit}>
      <AuthLogo />
      <div class='gap-regular mv-big'>
        <h3 class='c-pencel'>{t('hello')}</h3>
        <Card class='gap-regular'>
          <Input name='name' value={name} onChange={changeName} label='이름' placeholder='이름을 입력하세요...' fluid />
          <Input name='email' value={email} onChange={changeEmail} label='이메일' placeholder='이메일을 입력하세요...' fluid type='email' />
          <Button fluid type='submit' children='Submit' />
          { register.error.code &&
            <p class='c-red t-bold'>{register.error.message}</p>
          }
        </Card>
        <Card class='gap-regular'>
          <Link href='/login'>로그인</Link>
        </Card>
      </div>
      {( loading || register.loading ) && <p>Loading...</p>}

      <SocialLogin disabled={loading} setLoading={setLoading} /> 

    </form>
  )
}

export default RegisterPage;
