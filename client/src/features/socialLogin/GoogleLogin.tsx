import { h, FunctionalComponent } from 'preact';
import { StateUpdater, useEffect, useRef } from 'preact/hooks';
import axios from 'axios';
import { setUser } from '~features/user/userSlice';
import { useDispatch } from '~utils/redux/hooks';
import Button from '~components/elements/Button';
import { route } from 'preact-router';
import { useTranslation } from 'preact-i18next';


const GoogleLogin: FunctionalComponent<{disabled?: boolean; setLoading: StateUpdater<boolean>}> = ({ disabled, setLoading }) => {
  
  const { t } = useTranslation();
  const id = 'google-jssdk';
  const googleLoginBtn = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    createScript();
    return () => removeScript();
  }, [googleLoginBtn.current])

  const googleSDK = () => {
    let { gapi } = window as any;
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: process.env.GOOGLE_CLIENT_ID,
        scope: 'profile email',
      });
      //버튼 클릭시 사용자 정보 불러오기
      auth2.attachClickHandler(googleLoginBtn.current, {}, (googleUser: any) => {
        setLoading(true);
        axios.post('/api/login/google/', {
          access_token: googleUser.mc.access_token,
          email: googleUser.dt.Nt,
          name: googleUser.dt.Ue,
        })
        .then((res) => {
          if (res.status === 203) { // 가입되지 않은 사용자일 경우 회원가입 부분으로 넘김
          } else if (res.status === 200) { // 가입된 사용자일 경우 로그인 성공 처리
            dispatch(setUser(res.data));
            route('/');
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err)
          setLoading(false);
        })
      }, (error: any) => { alert(JSON.stringify(error, undefined, 2)) });
    });
  }

  const createScript = () => {
    const id = 'google-jssdk';
    if (!document.getElementById(id)) {
      let js;
      const fjs = document.getElementsByTagName('script')[0];
      if (document.getElementById(id)) {
        return;
      }
      js = document.createElement('script');
      js.id = id;
      js.onload = () => {
        googleSDK();
      }
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      if ( fjs && fjs.parentNode ) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    }
  }

  const removeScript = () => {
    const script = document.getElementById(id);
    script?.remove();
  }

  return (
    <Button fluid color='paper' style={{ color: 'var(--color-pen)', border: '1px solid var(--color-gray_weak)' }} ref={googleLoginBtn} disabled={disabled} type='button'>
      <svg style={{ marginRight: '.25rem' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.8617 8.54065H10.1665V11.6369H14.5624C14.4758 12.1074 14.293 12.5309 14.0429 12.9168C13.764 13.3591 13.3889 13.745 12.9271 14.0461L15.5627 16.0507C16.4862 15.2225 17.1691 14.1591 17.5731 12.9168C17.8521 12.0792 17.9963 11.1569 17.9963 10.1782C18.0156 9.6041 17.9579 9.05826 17.8617 8.54065Z" fill="#3E82F1"/>
        <path d="M12.9368 14.0461C12.2057 14.5261 11.2727 14.8084 10.1665 14.8084C10.1569 14.8084 10.1473 14.8084 10.1377 14.8084C8.59862 14.799 7.24235 14.0461 6.36702 12.9168C6.05922 12.5121 5.80912 12.0698 5.63598 11.5898C5.62636 11.5616 5.61674 11.5428 5.60712 11.5145L3.75067 12.9168L2.86572 13.585C3.50057 14.8178 4.46247 15.8624 5.62636 16.6247C6.9153 17.4717 8.46395 17.9799 10.128 17.9799C10.1377 17.9799 10.1473 17.9799 10.1569 17.9799C12.3596 17.9799 14.2161 17.2647 15.5627 16.0413L12.9368 14.0461Z" fill="#32A753"/>
        <path d="M5.59749 8.47485L3.75065 7.07261L2.86571 6.40442C2.7599 6.62087 2.66371 6.84674 2.57714 7.07261C2.21162 7.97607 2 8.96423 2 9.99004C2 11.0158 2.21162 12.004 2.57714 12.9075C2.66371 13.1333 2.7599 13.3592 2.87533 13.5757L3.75065 12.9075L5.59749 11.5052C5.43397 11.0347 5.33778 10.5171 5.33778 9.99004C5.33778 9.46302 5.43397 8.95482 5.59749 8.47485Z" fill="#F9BB00"/>
        <path d="M10.1665 2C10.1569 2 10.1473 2 10.1377 2C6.95378 2.01882 4.21238 3.79751 2.86572 6.40438L3.74105 7.07257L5.58789 8.47482C5.60713 8.44658 5.62636 8.42776 5.62636 8.39953C5.7995 7.91956 6.0496 7.46783 6.3574 7.07257C7.23273 5.94324 8.589 5.19035 10.128 5.18094C10.1377 5.18094 10.1473 5.18094 10.1569 5.18094C11.3593 5.18094 12.4366 5.58562 13.2831 6.37615L15.6108 4.09867L15.6301 4.07985C14.2257 2.79053 12.3693 2 10.1665 2Z" fill="#E74133"/>
      </svg>
      {t('auth_social_google')}
    </Button>
  )
}





export default GoogleLogin;
