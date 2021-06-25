import { h, FunctionalComponent } from 'preact';
import { StateUpdater, useEffect, useRef } from 'preact/hooks';
import axios from 'axios';
import { setUser } from '~features/user/userSlice';
import { useDispatch } from '~utils/redux/hooks';


const GoogleLogin: FunctionalComponent<{disabled?: boolean; setLoading: StateUpdater<boolean>}> = ({ disabled, setLoading }) => {
  
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
    <button ref={googleLoginBtn} disabled={disabled} type='button'>Google Login</button>
  )
}


export default GoogleLogin;
