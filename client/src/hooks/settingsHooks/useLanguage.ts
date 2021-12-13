import { useTranslation } from "preact-i18next";
import { Lang } from "types";
import useToast from "~hooks/useToast";


export default () => {
	
	const { i18n } = useTranslation();

	const toast = useToast();

	const onChangeLanguage = (lang: Lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute("lang", lang);
		toast(`언어를 ${lang === 'ko' ? '한국어' : '영어'}로 변경했습니다.`, 'green')
  }

	return {
		onChangeLanguage,
	};
}