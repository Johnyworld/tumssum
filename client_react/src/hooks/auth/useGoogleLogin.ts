import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "~/utils/reduxHooks";
import { setUser } from "~/stores/userSlice";


export default () => {

  const id = 'google-jssdk';
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
	const navigate = useNavigate();

  useEffect(() => {
    createScript();
    return () => removeScript();
  }, [googleButtonRef.current])

  const googleSDK = useCallback(() => {
    let { gapi } = window as any;
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'profile email',
      });
      //버튼 클릭시 사용자 정보 불러오기
      auth2.attachClickHandler(googleButtonRef.current, {}, (googleUser: any) => {
        const authResponse = googleUser.getAuthResponse();
        const basicProfile = googleUser.getBasicProfile();

        const name = basicProfile.getName();
        const email = basicProfile.getEmail();
        const access_token = authResponse.access_token;

        axios.post('/api/login/google/', {
          access_token,
          email,
          name,
        })
        .then((res: any) => {
          if ( res.ok && !res.code ) {
            dispatch(setUser(res.data));
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }, (error: any) => { alert(JSON.stringify(error, undefined, 2)) });
    });
  }, [])

  const createScript = useCallback(() => {
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
  }, []);

  const removeScript = useCallback(() => {
    const script = document.getElementById(id);
    script?.remove();
  }, []);
	
	return googleButtonRef;
}
