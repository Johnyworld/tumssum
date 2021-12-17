import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { useSelector } from '~utils/redux/hooks';
import './NotFoundPage.scss';

const NotFoundPage: FunctionalComponent = () => {

  const userInfo = useSelector(state=> state.user.userInfo);

  return (
    <main class='not-found-page'>
      <div class='gap-mv-regular'>
        <h1 class='not-found-page__title'>404</h1>
        <div>
          <p>죄송합니다.</p>
          <h3>찾을 수 없는 페이지입니다.</h3>
        </div>
        <p>존재하지 않는 주소를 입력하셨거나, 페이지의 주소가 변경 또는 삭제되었습니다.</p>
        <Link href="/">
          <h4>{userInfo ? '가계부 화면으로' : '로그인 화면으로'} 돌아가기</h4>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
