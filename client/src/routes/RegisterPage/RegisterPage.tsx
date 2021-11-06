import { h } from 'preact';
import { useTranslation } from 'preact-i18next';
import { Link, route } from 'preact-router';
import Button from '~components/atoms/Button';
import Card from '~components/atoms/Card';
import Input from '~components/atoms/Input';
import AuthLogo from '~components/molecules/AuthLogo';
import SocialLogin from '~features/socialLogin/SocialLogin';
import useFetch from '~hooks/useFetch';
import useInput from '~hooks/useInput';


const RegisterPage = () => {

  const { t } = useTranslation();
  const [ name, changeName ] = useInput('');
  const [ email, changeEmail ] = useInput('');

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
    if ( !register.loading ) {
      register.call({ name, email });
    }
  }


  return (
    <form class='page-register auth-page t-center wrap wrap-narrow' onSubmit={handleSubmit}>
      <AuthLogo />
      <div class='gap-mv-regular mv-big'>
        <h3 class='c-pencel'>{t('auth_word_register')}</h3>
        <Card class='gap-mv-regular' hideBorderOnMobile>
          <Input name='name' value={name} onChange={changeName} label={t('auth_word_name')} placeholder={t('auth_word_name_placeholder')} fluid />
          <Input name='email' value={email} onChange={changeEmail} label={t('auth_word_email')} placeholder={t('auth_word_email_placeholder')} fluid type='email' />
          <Button disabled={register.loading} fluid type='submit' children='Submit' />
          { register.error.code &&
            <p class='c-red f-bold'>{register.error.message}</p>
          }
        </Card>
        <Card class='gap-mv-regular' hideBorderOnMobile>
          {t('auth_register_is_first_visit')} <Link class='t-underline' href='/login'>{t('auth_word_login')}</Link>
        </Card>
      </div>

      <SocialLogin /> 

    </form>
  )
}

export default RegisterPage;
