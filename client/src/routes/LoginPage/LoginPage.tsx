import { h, FunctionalComponent } from 'preact';
import useInput from '~hooks/useInput';
import { useTranslation } from 'preact-i18next';
import { useState } from 'preact/hooks';
import { getQueryObj } from '~utils/location';
import { Link } from 'preact-router';
import Card from '~components/elements/Card';
import Button from '~components/elements/Button';
import Input from '~components/elements/Input';
import AuthLogo from '~components/items/AuthLogo';
import SocialLogin from '~features/socialLogin/SocialLogin';
import useFetch from '~hooks/useFetch';


const LoginPage: FunctionalComponent = () => {
	const queryObj = getQueryObj<{ email: string }>();
  const { t } = useTranslation();
  const [ email, changeEmail, setEmail ] = useInput(queryObj.email || '');
  const [ sent, setSent ] = useState(false);

  const login = useFetch({
    method: 'GET',
    url: `/api/login/send?email=${email}`,
    onSuccess: () => {
      setEmail('');
      setSent(true);
    }
  });

  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ( !login.loading ) {
      setSent(false);
      login.call();
    }
  }


  return (
    <form class='page-login auth-page t-center wrap wrap-narrow' onSubmit={handleSubmit}>
      <AuthLogo />
      <div class='mv-big gap-regular'>
        <h3 class='c-pencel'>{t('auth_word_login')}</h3>
        <Card class='gap-regular hide-mobile'>
          <Input name='email' value={email} onChange={changeEmail} label={t('auth_word_email')} placeholder={t('auth_word_email_placeholder')} fluid type='email' />
          <Button fluid disabled={login.loading} type='submit'>login</Button>
          { login.loading &&
            <p>{t('LOADING_SEND_EMAIL')}</p>
          }
          { sent &&
            <p class='c-green'>{t('OK_SENT_EMAIL')}</p>
          }
          { login.error.message &&
            <p class='c-red'>{login.error.message}</p>
          }
        </Card>
        <Card class='gap-regular hide-mobile'>
          {t('auth_register_is_aleady_user')} <Link class='t-underline' href='/register'>{t('auth_word_register')}</Link>
        </Card>
      </div>

      <SocialLogin /> 

    </form>
  )
}

export default LoginPage;